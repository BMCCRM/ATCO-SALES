using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using DatabaseLayer.SQL;
using PocketDCR.CustomMembershipProvider;
using CrystalDecisions.CrystalReports.Engine;
using System.Drawing;
using System.Data.SqlClient;
using System.Collections.Specialized;
using PocketDCR2.Classes;
using CrystalDecisions.Shared;
using System.Diagnostics;
using System.Net;
using System.Net.Mail;
using System.Configuration;


namespace PocketDCR2.Reports
{
    public partial class newReports : System.Web.UI.Page
    {

        #region Database Layer

        private System.Data.DataSet GetData(String SpName, NameValueCollection NV)
        {
            var connection = new SqlConnection();
            string dbTyper = "";

            try
            {
                connection.ConnectionString = Classes.Constants.GetConnectionString();
                var dataSet = new System.Data.DataSet();
                connection.Open();

                var command = new SqlCommand();
                command.CommandType = CommandType.StoredProcedure;
                command.Connection = connection;
                command.CommandText = SpName;
                command.CommandTimeout = 20000;

                if (NV != null)
                {
                    //New code implemented for retrieving data
                    for (int i = 0; i < NV.Count; i++)
                    {
                        string[] arraySplit = NV.Keys[i].Split('-');

                        if (arraySplit.Length > 2)
                        {
                            dbTyper = "SqlDbType." + arraySplit[1].ToString() + "," + arraySplit[2].ToString();

                            if (NV[i].ToString() == "NULL")
                            {
                                command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = DBNull.Value;
                            }
                            else
                            {
                                command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = NV[i].ToString();
                            }
                        }
                        else
                        {
                            dbTyper = "SqlDbType." + arraySplit[1].ToString();

                            if (NV[i].ToString() == "NULL")
                            {
                                command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = DBNull.Value;
                            }
                            else
                            {
                                command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = NV[i].ToString();
                            }
                        }
                    }
                }

                var dataAdapter = new SqlDataAdapter();
                dataAdapter.SelectCommand = command;
                dataAdapter.Fill(dataSet);

                return dataSet;
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
                return null;
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                {
                    connection.Close();
                }
            }
        }

        #endregion

        #region Private Members

        private DatabaseDataContext _dataContext;
        private SystemUser _currentUser;
        private int _level1Id = 0, _level2Id = 0, _level3Id = 0, _level4Id = 0, _level5Id = 0, _level6Id = 0;
        private string _currentUserRole = "", _glbVarLevelName = "", _hierarchyLevel3 = null, _hierarchyLevel4 = null, _hierarchyLevel5 = null, _hierarchyLevel6 = null;
        private List<DatabaseLayer.SQL.v_EmployeeWithJV> _getJointRecord;
        private List<DatabaseLayer.SQL.PreSalesCall> _getUnJointRecord;
        private List<DatabaseLayer.SQL.PreSalesCall> _getVisitShiftM;
        private List<DatabaseLayer.SQL.PreSalesCall> _getVisitShiftE;
        private List<DatabaseLayer.SQL.v_SamplesIssuedToDoc> _sampleIssuedToDoc;
        private List<DatabaseLayer.SQL.v_EmployeeHierarchyWithType> _getEmployee;
        private List<DatabaseLayer.SQL.v_EmployeeDetailWithType> _mrList;

        private List<DatabaseLayer.SQL.SMSInbound> _getSmsStatus;
        private List<DatabaseLayer.SQL.Product> _getProducts;
        private List<DatabaseLayer.SQL.ProductSku> _getSamples;
        private List<DatabaseLayer.SQL.ProductSku> _getSamplesRem;
        private List<DatabaseLayer.SQL.Employee> _getEmployeeName;
        private List<DatabaseLayer.SQL.v_EmployeeHierarchy> _getEmployeesBioData;
        private List<DatabaseLayer.SQL.Doctor> _getDoctorName;
        private List<DatabaseLayer.SQL.v_DoctorClass> _getDoctorClass;
        private List<DatabaseLayer.SQL.DoctorHierarchy> _getDoctorHierarchy;
        private List<DatabaseLayer.SQL.Parameter> _getParameterValue;
        private List<DatabaseLayer.SQL.CallProduct> _getCallProducts;
        private List<DatabaseLayer.SQL.CallProductSample> _getCallProductSamples;
        private List<DatabaseLayer.SQL.CallGift> _getCallGift;
        private List<DatabaseLayer.SQL.GiftItem> _getGiftItems;
        private List<DatabaseLayer.SQL.Employee> _getMobileNumber;
        private List<DatabaseLayer.SQL.v_DoctorBrick> _getDoctorBrick;
        private NameValueCollection _nvCollection = new NameValueCollection();
        private ReportDocument rpt = new ReportDocument();
        private List<DatabaseLayer.SQL.PreSalesCall> subQuery2;
        private DataRow[] _sample1;
        private DataRow[] _sample2;
        private DataRow[] _sample3;
        string pdfFile1 = Constants.GetPDFPath;
        string ActiveReport = string.Empty;
        string QMonth1, QMonth2, QMonth3;
        DateTime Cfirstdate, Csecdate, CmonthFdate, CmonthLdate;




        DataTable dtDailyCallReport = new DataTable();
        CrystalReports.XSDDatatable.Dsreports dsc = new CrystalReports.XSDDatatable.Dsreports();

        #endregion

        #region Private Functions
        private bool IsValidUser()
        {
            try
            {
                _currentUser = (SystemUser)Session["SystemUser"];
                return _currentUser != null;
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from IsValidUser is " + exception.Message;
            }

            return false;
        }
        private void RetrieveAppConfig()
        {
            try
            {
                var getHierarchyDetail = _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

                if (getHierarchyDetail.Count > 0)
                {
                    _glbVarLevelName = getHierarchyDetail[0].SettingName;

                    if (_glbVarLevelName == "Level3")
                    {
                        _hierarchyLevel3 = getHierarchyDetail[0].SettingValue;
                        _hierarchyLevel4 = getHierarchyDetail[1].SettingValue;
                        _hierarchyLevel5 = getHierarchyDetail[2].SettingValue;
                        _hierarchyLevel6 = getHierarchyDetail[3].SettingValue;
                    }
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from RetrieveAppConfig is " + exception.Message;
            }
        }

        private void GetCurrentUserDetail(long type)
        {
            try
            {
                _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                long employeeId = 0;

                if (type == 0)
                {
                    employeeId = Convert.ToInt64(_currentUser.EmployeeId);
                }
                else
                {
                    employeeId = type;
                }

                var getEmployeeMembership =
                    _dataContext.sp_EmployeeMembershipSelectByEmployee(employeeId).ToList();

                if (getEmployeeMembership.Count > 0)
                {
                    var getEmployeeHierarchy =
                        _dataContext.sp_EmployeeHierarchySelectByMembership(Convert.ToInt64(getEmployeeMembership[0].SystemUserID)).ToList();

                    if (getEmployeeHierarchy.Count > 0)
                    {
                        _level3Id = Convert.ToInt32(getEmployeeHierarchy[0].LevelId3);
                        _level4Id = Convert.ToInt32(getEmployeeHierarchy[0].LevelId4);
                        _level5Id = Convert.ToInt32(getEmployeeHierarchy[0].LevelId5);
                        _level6Id = Convert.ToInt32(getEmployeeHierarchy[0].LevelId6);
                    }
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from GetCurrentUser is " + exception.Message;
            }
        }

        private void DailyCallReport(int level1Id, int level2Id, int level3Id, int level4Id, int level5Id, int level6Id,
            int skuid, int empid, int drid, int clid, int vsid, int jv, DateTime dt1, DateTime dt2)
        {
            try
            {

                #region Initialization of Custom DataTable columns

                dsc.Clear();
                dtDailyCallReport.Clear();
                dtDailyCallReport = dsc.Tables["DcrDetails"];

                #endregion

                #region NV Collection
                _nvCollection.Clear();
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                _nvCollection.Add("@DoctorId-int", drid.ToString());
                _nvCollection.Add("@DoctorClass-int", clid.ToString());
                _nvCollection.Add("@VisitShift-INT", vsid.ToString());
                _nvCollection.Add("@StartingDate-datetime", dt1.ToString());
                _nvCollection.Add("@EndingDate-datetime", dt2.ToString());
                #endregion

                #region Select Record on the basis of Days Select

                if (jv == 1)
                { //Joint ProcedureCall
                    dtDailyCallReport = GetData("DailyCallReportSelectjoin1", _nvCollection).Tables[0];

                }
                else if (jv == 2)
                { //UNJoint ProcedureCall
                    dtDailyCallReport = GetData("DailyCallReportSelectUNjoin1", _nvCollection).Tables[0];

                }
                else
                { //UNJOIN ProcedureCall
                    dtDailyCallReport = GetData("DailyCallReportSelectUNjoin1", _nvCollection).Tables[0];

                }

                #endregion

                #region Display Report

                DataView dv = new DataView();
                dv = dtDailyCallReport.DefaultView;
                dv.Sort = "DocRefID";
                rpt.Load(Server.MapPath("CrystalReports/DailyCallReport/CrystalReport41.rpt"));
                rpt.SetDataSource(dv);

                Session["reportdoc"] = rpt;

               // CrystalReportViewer1.ReportSource = rpt;
                rpt.ExportToDisk(ExportFormatType.PortableDocFormat, pdfFile1);

                #endregion

            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from LoadDailyCallReport is " + exception.Message;
            }

        }


        private void DescribedProducts(int level1Id, int level2Id, int level3Id, int level4Id, int level5Id, int level6Id,
            int skuid, int empid, int drid, int clid, int vsid, int jv, DateTime dt1, DateTime dt2)
        {

            #region Initialization of Custom DataTable columns
            var dtDescribedProduct = new DataTable();

            //XSDDatatable.Dsreports dsc = new XSDDatatable.Dsreports();
            //dtDescribedProduct = dsc.Tables["DescribedProducts"];

            #endregion
            #region Select Record on the basis of Days Select

            _nvCollection.Clear();
            _nvCollection.Add("@Level3Id-int", level3Id.ToString());
            _nvCollection.Add("@Level4Id-int", level4Id.ToString());
            _nvCollection.Add("@Level5Id-int", level5Id.ToString());
            _nvCollection.Add("@Level6Id-int", level6Id.ToString());
            _nvCollection.Add("@EmployeeId-int", empid.ToString());
            _nvCollection.Add("@DoctorId-int", drid.ToString());
            _nvCollection.Add("@DoctorClass-int", clid.ToString());
            _nvCollection.Add("@VisitShift-INT", vsid.ToString());
            _nvCollection.Add("@StartingDate-datetime", dt1.ToString());
            _nvCollection.Add("@EndingDate-datetime", dt2.ToString());


            if (jv == 1)
            {
                dtDescribedProduct = GetData("DescribedProductSelectjoin1", _nvCollection).Tables[0];
                //Joint ProcedureCall
            }
            else if (jv == 2)
            {
                dtDescribedProduct = GetData("DescribedProductSelectUNjoin1", _nvCollection).Tables[0];
                //UNJoint ProcedureCall
            }
            else
            {
                dtDescribedProduct = GetData("DescribedProductSelectUNjoin1", _nvCollection).Tables[0];
                //UNJOIN ProcedureCall
            }


            #endregion


            #region Display Report

            rpt.Load(Server.MapPath("CrystalReports/DescribedProducts/DescribedProducts.rpt"));
            rpt.SetDataSource(dtDescribedProduct);
            Session["reportdoc"] = rpt;
           // CrystalReportViewer1.ReportSource = rpt;
            rpt.ExportToDisk(ExportFormatType.PortableDocFormat, pdfFile1);


            #endregion
        }

        private void DetailedProductFrequency(int level1Id, int level2Id, int level3Id, int level4Id, int level5Id, int level6Id,
           int skuid, int empid, int drid, int clid, int vsid, int jv, DateTime dt1, DateTime dt2)
        {


        }

        private void IncomingSMSSummary(int level1Id, int level2Id, int level3Id, int level4Id, int level5Id, int level6Id,
           int skuid, int empid, int drid, int clid, int vsid, int jv, DateTime dt1, DateTime dt2)
        {


        }

        private void JVByClass(int level1Id, int level2Id, int level3Id, int level4Id, int level5Id, int level6Id,
           int skuid, int empid, int drid, int clid, int vsid, int jv, DateTime dt1, DateTime dt2)
        {


        }

        private void KPIByClass(int level1Id, int level2Id, int level3Id, int level4Id, int level5Id, int level6Id,
           int skuid, int empid, int drid, int clid, int vsid, int jv, DateTime dt1, DateTime dt2)
        {


        }

        private void MessageCount(int level1Id, int level2Id, int level3Id, int level4Id, int level5Id, int level6Id,
           int skuid, int empid, int drid, int clid, int vsid, int jv, DateTime dt1, DateTime dt2)
        {


        }

        private void MonthlyVisitAnalysis(int level1Id, int level2Id, int level3Id, int level4Id, int level5Id, int level6Id,
           int skuid, int empid, int drid, int clid, int vsid, int jv, DateTime dt1, DateTime dt2)
        {


        }

        private void MRSMSAccuracy(int level1Id, int level2Id, int level3Id, int level4Id, int level5Id, int level6Id,
           int skuid, int empid, int drid, int clid, int vsid, int jv, DateTime dt1, DateTime dt2)
        {


        }

        private void MrDrList(int level1Id, int level2Id, int level3Id, int level4Id, int level5Id, int level6Id,
           int skuid, int empid, int drid, int clid, int vsid, int jv, DateTime dt1, DateTime dt2)
        {


        }

        private void MrList(int level1Id, int level2Id, int level3Id, int level4Id, int level5Id, int level6Id,
           int skuid, int empid, int drid, int clid, int vsid, int jv, DateTime dt1, DateTime dt2)
        {


        }
 

        private void SampleIssuedToDoc(int level1Id, int level2Id, int level3Id, int level4Id, int level5Id, int level6Id,
           int skuid, int empid, int drid, int clid, int vsid, int jv, DateTime dt1, DateTime dt2)
        {


        }

        private void SmsStatus(int level1Id, int level2Id, int level3Id, int level4Id, int level5Id, int level6Id,
           int skuid, int empid, int drid, int clid, int vsid, int jv, DateTime dt1, DateTime dt2)
        {


        }

        private void VisitByTime(int level1Id, int level2Id, int level3Id, int level4Id, int level5Id, int level6Id,
           int skuid, int empid, int drid, int clid, int vsid, int jv, DateTime dt1, DateTime dt2)
        {


        }

        private void JVReport(int level1Id, int level2Id, int level3Id, int level4Id, int level5Id, int level6Id,
           int skuid, int empid, int drid, int clid, int vsid, int jv, DateTime dt1, DateTime dt2)
        {


        }

        private void JVByRegion(int level1Id, int level2Id, int level3Id, int level4Id, int level5Id, int level6Id,
           int skuid, int empid, int drid, int clid, int vsid, int jv, DateTime dt1, DateTime dt2)
        {


        }

        private void DetailedProductFrequencyByDivision(int level1Id, int level2Id, int level3Id, int level4Id, int level5Id, int level6Id,
           int skuid, int empid, int drid, int clid, int vsid, int jv, DateTime dt1, DateTime dt2)
        {


        }



        #endregion


        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["CurrentUserId"] != null)
            {
                int employeeID = int.Parse(HttpContext.Current.Session["CurrentUserId"].ToString());
                int roleID = 0;
                //string test = Server.HtmlEncode(Request.UserHostName);
                DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
                var roleId = _dataContext.sp_EmploeesInRolesSelect(null, employeeID).ToList();
                if (roleId.Count != 0)
                {
                    roleID = roleId[0].RoleId;
                    string ip = Server.HtmlEncode(Request.UserHostAddress);
                    Constants.GetClientIP("Reports", roleID.ToString(), ip,employeeID.ToString());
                }
            }
        }

        //protected void btnGreport_Click(object sender, EventArgs e)
        //{
        //    int level1Id, level2Id, level3Id, level4Id, level5Id, level6Id, skuid, empid, drid, clid, vsid, jv, reporttype;
        //    DateTime dt1; DateTime dt2;
        //    #region Initialization
        //    reporttype = Convert.ToInt32(h1.Value);
        //    lblError.Text = "";

        //    level1Id = 0; level2Id = 0;
        //    level3Id = h2.Value == "-1" ? 0 : Convert.ToInt32(h2.Value);
        //    level4Id = h3.Value == "-1" ? 0 : Convert.ToInt32(h3.Value);
        //    level5Id = h4.Value == "-1" ? 0 : Convert.ToInt32(h4.Value);
        //    level6Id = h5.Value == "-1" ? 0 : Convert.ToInt32(h5.Value);
        //    empid = h6.Value == "-1" ? 0 : Convert.ToInt32(h6.Value);
        //    drid = h7.Value == "-1" ? 0 : Convert.ToInt32(h7.Value);
        //    skuid = h8.Value == "-1" ? 0 : Convert.ToInt32(h8.Value);
        //    vsid = h9.Value == "-1" ? 0 : Convert.ToInt32(h9.Value);
        //    jv = h10.Value == "-1" ? 0 : Convert.ToInt32(h10.Value);
        //    clid = h11.Value == "-1" ? 0 : Convert.ToInt32(h11.Value);
        //    dt1 = Convert.ToDateTime(stdate.Value).Date;
        //    dt2 = Convert.ToDateTime(enddate.Value).Date;
        //    #endregion

        //    if (reporttype > 0)
        //    {
        //        switch (reporttype)
        //        {
        //            case 1:
        //                #region Daily Calls Report
        //                this.DailyCallReport(level1Id, level2Id, level3Id, level4Id, level5Id, level6Id, skuid, empid, drid, clid, vsid, jv, dt1, dt2);
        //                ActiveReport = "Daily Calls Report";

        //                #endregion
        //                break;
        //            case 2:
        //                #region Described Products
        //                this.DailyCallReport(level1Id, level2Id, level3Id, level4Id, level5Id, level6Id, skuid, empid, drid, clid, vsid, jv, dt1, dt2);
        //                ActiveReport = "Described Products";

        //                #endregion
        //                break;
        //            case 3:
        //                #region Described Products
        //                this.DailyCallReport(level1Id, level2Id, level3Id, level4Id, level5Id, level6Id, skuid, empid, drid, clid, vsid, jv, dt1, dt2);
        //                ActiveReport = "Described Products";

        //                #endregion
        //                break;
        //            case 4:
        //                #region Described Products
        //                this.DailyCallReport(level1Id, level2Id, level3Id, level4Id, level5Id, level6Id, skuid, empid, drid, clid, vsid, jv, dt1, dt2);
        //                ActiveReport = "Described Products";

        //                #endregion
        //                break;
        //            case 5:
        //                #region Described Products
        //                this.DailyCallReport(level1Id, level2Id, level3Id, level4Id, level5Id, level6Id, skuid, empid, drid, clid, vsid, jv, dt1, dt2);
        //                ActiveReport = "Described Products";

        //                #endregion
        //                break;
        //            case 6:
        //                #region Described Products
        //                this.DailyCallReport(level1Id, level2Id, level3Id, level4Id, level5Id, level6Id, skuid, empid, drid, clid, vsid, jv, dt1, dt2);
        //                ActiveReport = "Described Products";

        //                #endregion
        //                break;
        //            case 7:
        //                #region Described Products
        //                this.DailyCallReport(level1Id, level2Id, level3Id, level4Id, level5Id, level6Id, skuid, empid, drid, clid, vsid, jv, dt1, dt2);
        //                ActiveReport = "Described Products";

        //                #endregion
        //                break;
        //            case 8:
        //                #region Described Products
        //                this.DailyCallReport(level1Id, level2Id, level3Id, level4Id, level5Id, level6Id, skuid, empid, drid, clid, vsid, jv, dt1, dt2);
        //                ActiveReport = "Described Products";

        //                #endregion
        //                break;
        //            case 9:
        //                #region Described Products
        //                this.DailyCallReport(level1Id, level2Id, level3Id, level4Id, level5Id, level6Id, skuid, empid, drid, clid, vsid, jv, dt1, dt2);
        //                ActiveReport = "Described Products";

        //                #endregion
        //                break;
        //            case 10:
        //                #region Described Products
        //                this.DailyCallReport(level1Id, level2Id, level3Id, level4Id, level5Id, level6Id, skuid, empid, drid, clid, vsid, jv, dt1, dt2);
        //                ActiveReport = "Described Products";

        //                #endregion
        //                break;
        //            case 11:
        //                #region Described Products
        //                this.DailyCallReport(level1Id, level2Id, level3Id, level4Id, level5Id, level6Id, skuid, empid, drid, clid, vsid, jv, dt1, dt2);
        //                ActiveReport = "Described Products";

        //                #endregion
        //                break;
        //            case 12:
        //                #region Described Products
        //                this.DailyCallReport(level1Id, level2Id, level3Id, level4Id, level5Id, level6Id, skuid, empid, drid, clid, vsid, jv, dt1, dt2);
        //                ActiveReport = "Described Products";

        //                #endregion
        //                break;
        //            case 13:
        //                #region Described Products
        //                this.DailyCallReport(level1Id, level2Id, level3Id, level4Id, level5Id, level6Id, skuid, empid, drid, clid, vsid, jv, dt1, dt2);
        //                ActiveReport = "Described Products";

        //                #endregion
        //                break;
        //            case 14:
        //                #region Described Products
        //                this.DailyCallReport(level1Id, level2Id, level3Id, level4Id, level5Id, level6Id, skuid, empid, drid, clid, vsid, jv, dt1, dt2);
        //                ActiveReport = "Described Products";

        //                #endregion
        //                break;
        //            case 15:
        //                #region Described Products
        //                this.DailyCallReport(level1Id, level2Id, level3Id, level4Id, level5Id, level6Id, skuid, empid, drid, clid, vsid, jv, dt1, dt2);
        //                ActiveReport = "Described Products";
        //                #endregion
        //                break;
        //            case 16:
        //                #region Described Products
        //                this.DailyCallReport(level1Id, level2Id, level3Id, level4Id, level5Id, level6Id, skuid, empid, drid, clid, vsid, jv, dt1, dt2);
        //                ActiveReport = "Described Products";

        //                #endregion
        //                break;


        //        }

        //    }


        //}
    }
}