using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using DatabaseLayer.SQL;
using PocketDCR.CustomMembershipProvider;
using System.Collections.Specialized;
using System.Data.SqlClient;
using System.Configuration;

namespace PocketDCR2.Reports
{
    public partial class Report_MIO : System.Web.UI.Page
    {
        private DatabaseDataContext _dataContext;
        private SystemUser _currentUser;
        List<SMSInbound> _getMobileNumbers;
        List<PreSalesCall> _getPreSaleCalls;
        private DateTime _startingDate, _endingDate;
        private DataTable _smsSuccessDataTable = new DataTable();
        private readonly DataTable _smsErrorDataTable = new DataTable();
        Classes.DAL dl = new Classes.DAL();
        NameValueCollection nv = new NameValueCollection();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                DateTime dtReportDate = DateTime.Now;
                string date = Convert.ToDateTime(Request.QueryString["Month"]).Month + "/" + Request.QueryString["Day"] + "/" + Convert.ToDateTime(Request.QueryString["Month"]).Year.ToString();
                string level1id = "", level2id = "", level3id = "", level4id = "", level5id = "", level6id = "", Employeeid = "", Flag="";
                string roleType = Convert.ToString(Session["CurrentUserRole"]);
                if (roleType == "rl6")
                {
                    level1id = Request.QueryString["Level1"].ToString();
                    level2id = Request.QueryString["Level2"].ToString();
                    level3id = Request.QueryString["Level3"].ToString();
                    level4id = Request.QueryString["Level4"].ToString();
                    level5id = Request.QueryString["Level5"].ToString();
                    level6id = Request.QueryString["Level6"].ToString();
                    Employeeid = Request.QueryString["employeeid"].ToString();
                    Flag = Request.QueryString["flag"].ToString();
                }
                else
                {
                    level1id = Request.QueryString["Level1"].ToString();
                    level2id = Request.QueryString["Level2"].ToString();
                    level3id = Request.QueryString["Level3"].ToString();
                    level4id = Request.QueryString["Level4"].ToString();
                    level5id = Request.QueryString["Level5"].ToString();
                    level6id = Request.QueryString["Level6"].ToString();
                    Employeeid = "0";
                    Flag = Request.QueryString["flag"].ToString();
                }
                LoadSuccessDCRData(Convert.ToDateTime(date), level1id, level2id, level3id, level4id, level5id, level6id, Employeeid, Flag);
            }
        }


        private void LoadSuccessDCRData1(DateTime dt, string Leve3id, string Level4id, string Level5id, string Level6id, string Employid)
        {
            try
            {
                #region Initialization

                string employeeName = "", designation = "", level1Name = "", level2Name = "", mobileNumber = "", doctorName = "", className = "",
                    DT = "", P1 = "", P2 = "", visitFeedBack = "", smsRecDate = "",
                    P3 = "", P4 = "", S1 = "", Q1 = "", S2 = "", Q2 = "", S3 = "", Q3 = "", G1 = "", QG1 = "", G2 = "", QG2 = "", R1 = "", R2 = "", R3 = "", JV = "", VT = "",
                    hierarchyName = "";

                List<HierarchyLevel1> getLevel1Name;
                List<HierarchyLevel2> getLevel2Name;
                List<HierarchyLevel3> getLevel3Name;
                List<HierarchyLevel4> getLevel4Name;
                List<HierarchyLevel5> getLevel5Name;
                List<HierarchyLevel6> getLevel6Name;

                #endregion

                #region Initialization of Custom DataTable columns

                _smsSuccessDataTable.Columns.Add(new DataColumn("SMS_No", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("MR_Name", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("Designation", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("Region", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("Dr_Name", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("class", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("VisitDate", Type.GetType("System.DateTime")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("VisitTime", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("SMSRcvAt", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("P1", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("P2", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("P3", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("P4", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("S1", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("S2", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("S3", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("Q1", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("Q2", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("Q3", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("JV", Type.GetType("System.String")));

                #endregion

                #region Get Active Hierarchy Level

                List<DatabaseLayer.SQL.AppConfiguration> getLevelName =
                    _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

                #endregion

                #region Filter Record on the basis of Active Level

                if (getLevelName.Count != 0)
                {
                    hierarchyName = Convert.ToString(getLevelName[0].SettingName);

                    #region Select Record on the basis of Days Select

                    _getPreSaleCalls = _dataContext.sp_DailyReport(dt, Convert.ToInt32(Leve3id), Convert.ToInt32(Level4id), Convert.ToInt32(Level5id), Convert.ToInt32(Level6id), Convert.ToInt32(Employid)).ToList();

                    #endregion

                    if (_getPreSaleCalls.Count != 0)
                    {
                        int counter = 0;
                        List<DatabaseLayer.SQL.ProductSku> getProductSKU;

                        foreach (var preSaleCallItem in _getPreSaleCalls)
                        {
                            #region Get MR Name + Zone Name + MobileNumber + Designation

                            var getEmployeesBioData =
                                _dataContext.sp_EmplyeeHierarchySelectByMR(Convert.ToInt32(preSaleCallItem.Level6LevelId), Convert.ToInt64(preSaleCallItem.EmployeeId)).ToList();

                            if (getEmployeesBioData.Count != 0)
                            {
                                employeeName = getEmployeesBioData[0].FirstName + " " + getEmployeesBioData[0].MiddleName + " " + getEmployeesBioData[0].LastName;
                                mobileNumber = getEmployeesBioData[0].MobileNumber;

                                var getBioData = _dataContext.sp_EmployeeDetailWithDesignation(Convert.ToInt64(preSaleCallItem.EmployeeId)).ToList();

                                if (getBioData.Count > 0)
                                {
                                    designation = getBioData[0].Designation;
                                    level2Name = getBioData[0].Zone;
                                }
                            }

                            #endregion

                            #region Get Doctor Code + Name + Class

                            var getDoctorBioData =
                                    _dataContext.sp_DoctorsSelect(Convert.ToInt64(preSaleCallItem.DoctorId), null, null, null).ToList();

                            if (getDoctorBioData.Count != 0)
                            {
                                doctorName = getDoctorBioData[0].FirstName + " " + getDoctorBioData[0].MiddleName + " " + getDoctorBioData[0].LastName;
                            }

                            var getClass = _dataContext.sp_DoctorClassSelectByDoctor(Convert.ToInt64(preSaleCallItem.DoctorId)).ToList();

                            if (getClass.Count > 0)
                            {
                                className = getClass[0].ClassName;
                            }

                            #endregion

                            #region Get P1, P2, P3, P4

                            var getCallProducts = _dataContext.sp_CallProductsSelect(Convert.ToInt64(preSaleCallItem.SalesCallId)).ToList();

                            if (getCallProducts.Count != 0)
                            {
                                counter = 0;

                                foreach (var callProductItem in getCallProducts)
                                {
                                    if (counter == 0)
                                    {
                                        getProductSKU = _dataContext.sp_ProductSkuSelect(Convert.ToInt32(callProductItem.SkuId), null, null).ToList();

                                        if (getProductSKU.Count != 0)
                                        {
                                            P1 = Convert.ToString(getProductSKU[0].SkuName);
                                            counter = 1;
                                        }
                                    }
                                    else if (counter == 1)
                                    {
                                        getProductSKU = _dataContext.sp_ProductSkuSelect(Convert.ToInt32(callProductItem.SkuId), null, null).ToList();

                                        if (getProductSKU.Count != 0)
                                        {
                                            P2 = Convert.ToString(getProductSKU[0].SkuName);
                                            counter = 2;
                                        }
                                    }
                                    else if (counter == 2)
                                    {
                                        getProductSKU = _dataContext.sp_ProductSkuSelect(Convert.ToInt32(callProductItem.SkuId), null, null).ToList();

                                        if (getProductSKU.Count != 0)
                                        {
                                            P3 = Convert.ToString(getProductSKU[0].SkuName);
                                            counter = 3;
                                        }
                                    }
                                    else if (counter == 3)
                                    {
                                        getProductSKU = _dataContext.sp_ProductSkuSelect(Convert.ToInt32(callProductItem.SkuId), null, null).ToList();

                                        if (getProductSKU.Count != 0)
                                        {
                                            P4 = Convert.ToString(getProductSKU[0].SkuName);
                                            counter = 4;
                                        }
                                    }
                                }
                            }

                            #endregion

                            #region Get S1, S2, S3

                            counter = 0;
                            var getCallProductSamples =
                                _dataContext.sp_CallProductSamplesSelect(Convert.ToInt64(preSaleCallItem.SalesCallId)).ToList();

                            foreach (var callProductSampleItem in getCallProductSamples)
                            {
                                if (counter == 0)
                                {
                                    getProductSKU = _dataContext.sp_ProductSkuSelect(Convert.ToInt32(callProductSampleItem.ProductSkuId), null, null).ToList();

                                    if (getProductSKU.Count != 0)
                                    {
                                        S1 = Convert.ToString(getProductSKU[0].SkuName);
                                        Q1 = Convert.ToString(callProductSampleItem.SampleQuantity);
                                        counter = 1;
                                    }
                                }
                                else if (counter == 1)
                                {
                                    getProductSKU = _dataContext.sp_ProductSkuSelect(Convert.ToInt32(callProductSampleItem.ProductSkuId), null, null).ToList();

                                    if (getProductSKU.Count != 0)
                                    {
                                        S2 = Convert.ToString(getProductSKU[0].SkuName);
                                        Q2 = Convert.ToString(callProductSampleItem.SampleQuantity);
                                        counter = 2;
                                    }
                                }
                                else if (counter == 2)
                                {
                                    getProductSKU = _dataContext.sp_ProductSkuSelect(Convert.ToInt32(callProductSampleItem.ProductSkuId), null, null).ToList();

                                    if (getProductSKU.Count != 0)
                                    {
                                        S3 = Convert.ToString(getProductSKU[0].SkuName);
                                        Q3 = Convert.ToString(callProductSampleItem.SampleQuantity);
                                        counter = 3;
                                    }
                                }
                            }

                            #endregion

                            #region Get JV

                            var getCallVisitor =
                                _dataContext.sp_CalVisitorsSelect(Convert.ToInt64(preSaleCallItem.SalesCallId)).ToList();

                            if (getCallVisitor.Count > 0)
                            {
                                JV = "Yes";
                            }
                            else
                            {
                                JV = "No";
                            }

                            #endregion

                            #region Get DT + VT

                            DT = Convert.ToDateTime(preSaleCallItem.VisitDateTime).ToString("MM/dd/yyyy");
                            smsRecDate = Convert.ToDateTime(preSaleCallItem.CreationDateTime).ToString("MM/dd/yyyy");
                            VT = Convert.ToString(preSaleCallItem.VisitShift);

                            if (VT != "1")
                            {
                                VT = VT.Replace(Convert.ToString(preSaleCallItem.VisitShift), "E");
                            }
                            else
                            {
                                VT = VT.Replace(Convert.ToString(preSaleCallItem.VisitShift), "M");
                            }

                            #endregion

                            #region Insert Row to DataTable

                            _smsSuccessDataTable.Rows.Add(preSaleCallItem.SalesCallId, employeeName, designation, level2Name, doctorName, className, DT, VT, smsRecDate,
                                P1, P2, P3, P4, S1, S2, S3, Q1, Q2, Q3,
                                JV);

                            #endregion
                        }

                        #region Load Success Messages Grid

                        ReportViewer1.ProcessingMode = Microsoft.Reporting.WebForms.ProcessingMode.Local;
                        ReportViewer1.LocalReport.ReportPath = Server.MapPath("./Reports_Dashboard/NewCallDetails.rdlc");
                        ReportViewer1.LocalReport.DataSources.Clear();
                        ReportViewer1.LocalReport.DataSources.Add(new Microsoft.Reporting.WebForms.ReportDataSource("PocketDCRDataSet_MR_Count_vw_MR_Count", _smsSuccessDataTable));
                        ReportViewer1.LocalReport.DataSources.Add(new Microsoft.Reporting.WebForms.ReportDataSource("DailyReportDetails", _smsSuccessDataTable));
                        //ReportViewer1.DocumentMapCollapsed = true;
                        ReportViewer1.DocumentMapCollapsed = true;
                        ReportViewer1.ShowToolBar = true;
                        #endregion
                    }
                }

                #endregion
            }
            catch (Exception exception)
            {

            }
        }

        private void LoadSuccessDCRData(DateTime dt, string Leve1id, string Leve2id, string Leve3id, string Level4id, string Level5id, string Level6id, string Employid, string Flag)
        {
            try
            {
                #region Initialization

                string employeeName = "", designation = "", level1Name = "", level2Name = "", mobileNumber = "", doctorName = "", className = "",
                    DT = "", P1 = "", P2 = "", visitFeedBack = "", smsRecDate = "",
                    P3 = "", P4 = "", S1 = "", Q1 = "", S2 = "", Q2 = "", S3 = "", Q3 = "", G1 = "", QG1 = "", G2 = "", QG2 = "", R1 = "", R2 = "", R3 = "", JV = "", VT = "",
                    hierarchyName = "";

                List<HierarchyLevel1> getLevel1Name;
                List<HierarchyLevel2> getLevel2Name;
                List<HierarchyLevel3> getLevel3Name;
                List<HierarchyLevel4> getLevel4Name;
                List<HierarchyLevel5> getLevel5Name;
                List<HierarchyLevel6> getLevel6Name;

                #endregion              

                #region Get Active Hierarchy Level

                List<DatabaseLayer.SQL.AppConfiguration> getLevelName =
                    _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

                #endregion

                #region Filter Record on the basis of Active Level

                if (getLevelName.Count != 0)
                {
                    hierarchyName = Convert.ToString(getLevelName[3].SettingValue);

                    #region Initialization of Custom DataTable columns

                    _smsSuccessDataTable.Columns.Add(new DataColumn("SMS_No", Type.GetType("System.String")));
                    _smsSuccessDataTable.Columns.Add(new DataColumn(Convert.ToString(getLevelName[5].SettingValue), Type.GetType("System.String")));
                    _smsSuccessDataTable.Columns.Add(new DataColumn("Designation", Type.GetType("System.String")));
                    _smsSuccessDataTable.Columns.Add(new DataColumn(Convert.ToString(getLevelName[3].SettingValue), Type.GetType("System.String")));
                    _smsSuccessDataTable.Columns.Add(new DataColumn("Dr_Name", Type.GetType("System.String")));
                    _smsSuccessDataTable.Columns.Add(new DataColumn("class", Type.GetType("System.String")));
                    _smsSuccessDataTable.Columns.Add(new DataColumn("VisitDate", Type.GetType("System.DateTime")));
                    _smsSuccessDataTable.Columns.Add(new DataColumn("VisitTime", Type.GetType("System.String")));
                    _smsSuccessDataTable.Columns.Add(new DataColumn("SMSRcvAt", Type.GetType("System.String")));
                    _smsSuccessDataTable.Columns.Add(new DataColumn("P1", Type.GetType("System.String")));
                    _smsSuccessDataTable.Columns.Add(new DataColumn("P2", Type.GetType("System.String")));
                    _smsSuccessDataTable.Columns.Add(new DataColumn("P3", Type.GetType("System.String")));
                    _smsSuccessDataTable.Columns.Add(new DataColumn("P4", Type.GetType("System.String")));
                    _smsSuccessDataTable.Columns.Add(new DataColumn("S1", Type.GetType("System.String")));
                    _smsSuccessDataTable.Columns.Add(new DataColumn("S2", Type.GetType("System.String")));
                    _smsSuccessDataTable.Columns.Add(new DataColumn("S3", Type.GetType("System.String")));
                    _smsSuccessDataTable.Columns.Add(new DataColumn("Q1", Type.GetType("System.String")));
                    _smsSuccessDataTable.Columns.Add(new DataColumn("Q2", Type.GetType("System.String")));
                    _smsSuccessDataTable.Columns.Add(new DataColumn("Q3", Type.GetType("System.String")));
                    _smsSuccessDataTable.Columns.Add(new DataColumn("JV", Type.GetType("System.String")));

                    #endregion

                    string URL = ConfigurationManager.AppSettings["DomainURLForMapView"];


                    nv.Clear();
                    nv.Add("@date-datetime", dt.ToString());
                    nv.Add("@Level1ID-int", Leve1id);
                    nv.Add("@Level2ID-int", Leve2id);
                    nv.Add("@Level3ID-int", Leve3id);
                    nv.Add("@Level4ID-int", Level4id);
                    nv.Add("@Level5ID-int", Level5id);
                    nv.Add("@Level6ID-int", Level6id);
                    nv.Add("@EmployeeID-int", Employid);
                    nv.Add("@URL-nvarchar(max)", URL);
                    nv.Add("@flag-nvarchar(max)", Flag);
                    _smsSuccessDataTable = dl.GetData("Report_MIOs_RDLC", nv).Tables[0];

                    #region Load Success Messages Grid

                    ReportViewer1.ProcessingMode = Microsoft.Reporting.WebForms.ProcessingMode.Local;
                    ReportViewer1.LocalReport.ReportPath = Server.MapPath("./Reports_Dashboard/NewCallDetails.rdlc");
                    ReportViewer1.LocalReport.DataSources.Clear();
                    //  ReportViewer1.LocalReport.DataSources.Add(new Microsoft.Reporting.WebForms.ReportDataSource("PocketDCRDataSet_MR_Count_vw_MR_Count", _smsSuccessDataTable));
                    ReportViewer1.LocalReport.DataSources.Add(new Microsoft.Reporting.WebForms.ReportDataSource("DailyReportDetails", _smsSuccessDataTable));
                    //ReportViewer1.DocumentMapCollapsed = true;
                    ReportViewer1.DocumentMapCollapsed = true;
                    ReportViewer1.ShowToolBar = true;
                    #endregion

                }

                #endregion
            }
            catch (Exception exception)
            {

            }
        }
    }
}