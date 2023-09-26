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


namespace PocketDCR2.Reports.CrystalReports
{
    public partial class ReportInvoker : System.Web.UI.Page
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

        private void EnableHierarchyViaLevel()
        {
            try
            {
                if (_glbVarLevelName == "Level3")
                {
                    if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
                    {
                        col1.Visible = true;
                        col2.Visible = true;
                        col3.Visible = true;
                        col4.Visible = true;

                        lblLevel1.Text = "National :";
                        lblLevel11.Text = "National Manager :";
                        lblLevel2.Text = "Region :";
                        lblLevel22.Text = "Region Manager :";
                        lblLevel3.Text = "Zone :";
                        lblLevel33.Text = "Zone Manager :";
                        lblLevel4.Text = "Territory  :";
                        lblLevel44.Text = "MIO :";


                    }
                    else if (_currentUserRole == "rl3")
                    {
                        col1.Visible = true;
                        col2.Visible = true;
                        col3.Visible = true;


                        lblLevel1.Text = "Region :";
                        lblLevel11.Text = "Region Manager :";
                        lblLevel2.Text = "Zone :";
                        lblLevel22.Text = "Zone Manager :";
                        lblLevel3.Text = "Territory  :";
                        lblLevel33.Text = "MIO :";
                    }
                    else if (_currentUserRole == "rl4")
                    {
                        col1.Visible = true;
                        col2.Visible = true;


                        lblLevel1.Text = "Zone :";
                        lblLevel11.Text = "Zone Manager :";
                        lblLevel2.Text = "Territory  :";
                        lblLevel22.Text = "MIO :";
                    }
                    else if (_currentUserRole == "rl5")
                    {
                        col1.Visible = true;
                        lblLevel1.Text = "Territory  :";
                        lblLevel11.Text = "MIO :";
                    }
                }

                this.FillDropDownList();
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from EnableHierarchyViaLevel is " + exception.Message;
            }
        }

        private void FillDropDownList()
        {
            try
            {
                if (_glbVarLevelName == "Level3")
                {
                    _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                    ddl1.Items.Clear(); ddl2.Items.Clear(); ddl3.Items.Clear(); ddl4.Items.Clear();
                    ddl11.Items.Clear(); ddl22.Items.Clear(); ddl33.Items.Clear(); ddl44.Items.Clear();

                    if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
                    {
                        ddl1.DataSource = _dataContext.sp_HierarchyLevels3Select(null, null).ToList();
                        ddl1.DataBind();
                        ddl1.Items.Insert(0, new ListItem("Select " + _hierarchyLevel3, "-1"));
                    }
                    else if (_currentUserRole == "rl3")
                    {
                        this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));

                        ddl1.DataSource = _dataContext.sp_Levels4SelectByLevel3(_level3Id).ToList();
                        ddl1.DataBind();
                        ddl1.Items.Insert(0, new ListItem("Select " + _hierarchyLevel4, "-1"));
                    }
                    else if (_currentUserRole == "rl4")
                    {
                        this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));

                        ddl1.DataSource = _dataContext.sp_Levels5SelectByLevel4(_level4Id).ToList();
                        ddl1.DataBind();
                        ddl1.Items.Insert(0, new ListItem("Select " + _hierarchyLevel5, "-1"));
                    }
                    else if (_currentUserRole == "rl5")
                    {
                        this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));

                        ddl1.DataSource = _dataContext.sp_Levels6SelectByLevel5(_level5Id).ToList();
                        ddl1.DataBind();
                        ddl1.Items.Insert(0, new ListItem("Select " + _hierarchyLevel6, "-1"));
                    }
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from FillDropDownList is " + exception.Message;
            }
        }




        private void DailyCallReport1()
        {
            try
            {
                #region Initialization

                long employeeId = 0, managerId = 0, doctorId = 0;
                int level3Id = 0, level4Id = 0, level5Id = 0, level6Id = 0, classId = 0, visitShiftId = 0, jointVisit = 0;
                string hierarchyName = "", level1Name = "", level2Name = "", level3Name = "", level4Name = "", level5Name = "", level6Name = "", managerName = "",
                    employeeName = "", mobileNumber = "", doctorName = "", doctorClass = "", speciality = "", doctorBrick = "", P1 = "", P2 = "", P3 = "", P4 = "",
                    R1 = "", R2 = "", R3 = "", S1 = "", SQ1 = "", S2 = "", SQ2 = "", S3 = "", SQ3 = "", G1 = "", QG1 = "", G2 = "", QG2 = "", JV = "", VT = "", employeeCode = "";
                DateTime creationDate;
                DateTime VisitedDate;

                List<HierarchyLevel3> getLevel3Name;
                List<HierarchyLevel4> getLevel4Name;
                List<HierarchyLevel5> getLevel5Name;
                List<HierarchyLevel6> getLevel6Name;

                var dtDailyCallReport = new DataTable();

                #endregion

                #region Initialization of Custom DataTable columns

                XSDDatatable.Dsreports dsc = new XSDDatatable.Dsreports();

                dtDailyCallReport = dsc.Tables["DcrDetails"];

                #endregion

                #region Get Active Hierarchy Level

                List<DatabaseLayer.SQL.AppConfiguration> getLevelName =
                    _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

                #endregion

                #region Filter Record on the basis of Active Level

                if (getLevelName.Count != 0)
                {
                    hierarchyName = Convert.ToString(getLevelName[0].SettingName);
                    _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                    if (hierarchyName == "Level3")
                    {
                        #region Common Features

                        if (ddlDoctor.SelectedValue == "-1" || ddlDoctor.SelectedValue == "")
                        {
                            doctorId = 0;
                        }
                        else
                        {
                            doctorId = Convert.ToInt32(ddlDoctor.SelectedValue);
                        }

                        if (ddlClass.SelectedValue == "-1" || ddlClass.SelectedValue == "")
                        {
                            classId = 0;
                        }
                        else
                        {
                            classId = Convert.ToInt32(ddlClass.SelectedValue);
                        }

                        if (ddlVisitShift.SelectedValue == "-1" || ddlVisitShift.SelectedValue == "")
                        {
                            visitShiftId = 0;
                        }
                        else
                        {
                            visitShiftId = Convert.ToInt32(ddlVisitShift.SelectedValue);
                        }

                        if (ddlJointVisit.SelectedValue == "-1" || ddlJointVisit.SelectedValue == "0")
                        {
                            jointVisit = 0;
                        }
                        else
                        {
                            jointVisit = Convert.ToInt32(ddlJointVisit.SelectedValue);
                        }

                        int counter = 0;

                        #endregion

                        #region Get Record Via Roles

                        if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level3Id = 0;
                            }
                            else
                            {
                                _level3Id = Convert.ToInt32(ddl1.SelectedValue);
                            }


                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level4Id = 0;
                            }
                            else
                            {
                                _level4Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl3.SelectedValue);
                            }

                            if (ddl4.SelectedValue == "-1" || ddl4.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl4.SelectedValue);
                            }

                            if (ddl44.SelectedValue == "-1" || ddl44.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl44.SelectedValue);
                            }

                            #endregion

                            #region Select Record on the basis of Days Select

                            if (txtStartingDate.Text != "" && txtEndingDate.Text != "")
                            {
                                if (jointVisit == 1)
                                {
                                    _getJointRecord =
                                        _dataContext.sp_PreSalesCallsSelectWithLevelJoint(_level3Id, _level4Id, _level5Id, _level6Id, employeeId, doctorId,
                                        classId, visitShiftId, Convert.ToDateTime(txtStartingDate.Text), Convert.ToDateTime(txtEndingDate.Text)).ToList();
                                }
                                else if (jointVisit == 2)
                                {
                                    _getUnJointRecord =
                                        _dataContext.sp_PreSalesCallsSelectWithLevelUnJoint(_level3Id, _level4Id, _level5Id, _level6Id, employeeId, doctorId,
                                        classId, visitShiftId, Convert.ToDateTime(txtStartingDate.Text), Convert.ToDateTime(txtEndingDate.Text)).ToList();
                                }
                                else
                                {
                                    _getUnJointRecord =
                                        _dataContext.sp_PreSalesCallsSelectWithLevelUnJoint(_level3Id, _level4Id, _level5Id, _level6Id, employeeId, doctorId,
                                        classId, visitShiftId, Convert.ToDateTime(txtStartingDate.Text), Convert.ToDateTime(txtEndingDate.Text)).ToList();
                                }
                            }
                            else
                            {
                                if (jointVisit == 1)
                                {
                                    _getJointRecord =
                                        _dataContext.sp_PreSalesCallsSelectWithLevelJoint(level3Id, level4Id, level5Id, level6Id, employeeId, doctorId,
                                        classId, visitShiftId, DateTime.Now, DateTime.Now).ToList();
                                }
                                else if (jointVisit == 2)
                                {
                                    _getUnJointRecord =
                                        _dataContext.sp_PreSalesCallsSelectWithLevelUnJoint(level3Id, level4Id, level5Id, level6Id, employeeId, doctorId,
                                        classId, visitShiftId, DateTime.Now, DateTime.Now).ToList();
                                }
                                else
                                {
                                    _getUnJointRecord =
                                        _dataContext.sp_PreSalesCallsSelectWithLevelUnJoint(_level3Id, _level4Id, _level5Id, _level6Id, employeeId, doctorId,
                                        classId, visitShiftId, Convert.ToDateTime(txtStartingDate.Text), Convert.ToDateTime(txtEndingDate.Text)).ToList();
                                }
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl3")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level4Id = 0;
                            }
                            else
                            {
                                _level4Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl3.SelectedValue);
                            }

                            if (ddl33.SelectedValue == "-1" || ddl33.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl33.SelectedValue);
                            }

                            #endregion

                            #region Select Record on the basis of Days Select

                            if (txtStartingDate.Text != "" && txtEndingDate.Text != "")
                            {
                                if (jointVisit == 1)
                                {
                                    _getJointRecord =
                                        _dataContext.sp_PreSalesCallsSelectWithLevelJoint(_level3Id, _level4Id, _level5Id, _level6Id, employeeId, doctorId,
                                        classId, visitShiftId, Convert.ToDateTime(txtStartingDate.Text),
                                        Convert.ToDateTime(txtEndingDate.Text)).ToList();
                                }
                                else if (jointVisit == 2)
                                {
                                    _getUnJointRecord =
                                        _dataContext.sp_PreSalesCallsSelectWithLevelUnJoint(_level3Id, _level4Id, _level5Id, _level6Id, employeeId, doctorId,
                                        classId, visitShiftId, Convert.ToDateTime(txtStartingDate.Text),
                                        Convert.ToDateTime(txtEndingDate.Text)).ToList();
                                }
                                else
                                {
                                    _getUnJointRecord =
                                        _dataContext.sp_PreSalesCallsSelectWithLevelUnJoint(_level3Id, _level4Id, _level5Id, _level6Id, employeeId, doctorId,
                                        classId, visitShiftId, Convert.ToDateTime(txtStartingDate.Text), Convert.ToDateTime(txtEndingDate.Text)).ToList();
                                }
                            }
                            else
                            {
                                if (jointVisit == 1)
                                {
                                    _getJointRecord =
                                        _dataContext.sp_PreSalesCallsSelectWithLevelJoint(_level3Id, _level4Id, _level5Id, _level6Id, employeeId, doctorId,
                                        classId, visitShiftId, DateTime.Now, DateTime.Now).ToList();
                                }
                                else if (jointVisit == 2)
                                {
                                    _getUnJointRecord =
                                        _dataContext.sp_PreSalesCallsSelectWithLevelUnJoint(_level3Id, _level4Id, _level5Id, _level6Id, employeeId, doctorId,
                                        classId, visitShiftId, DateTime.Now, DateTime.Now).ToList();
                                }
                                else
                                {
                                    _getUnJointRecord =
                                        _dataContext.sp_PreSalesCallsSelectWithLevelUnJoint(_level3Id, _level4Id, _level5Id, _level6Id, employeeId, doctorId,
                                        classId, visitShiftId, Convert.ToDateTime(txtStartingDate.Text), Convert.ToDateTime(txtEndingDate.Text)).ToList();
                                }
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl4")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl22.SelectedValue == "-1" || ddl22.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl22.SelectedValue);
                            }

                            #endregion

                            #region Select Record on the basis of Days Select

                            if (txtStartingDate.Text != "" && txtEndingDate.Text != "")
                            {
                                if (jointVisit == 1)
                                {
                                    _getJointRecord =
                                        _dataContext.sp_PreSalesCallsSelectWithLevelJoint(_level3Id, _level4Id, _level5Id, _level6Id, employeeId, doctorId,
                                        classId, visitShiftId, Convert.ToDateTime(txtStartingDate.Text),
                                        Convert.ToDateTime(txtEndingDate.Text)).ToList();
                                }
                                else if (jointVisit == 2)
                                {
                                    _getUnJointRecord =
                                        _dataContext.sp_PreSalesCallsSelectWithLevelUnJoint(_level3Id, _level4Id, _level5Id, _level6Id, employeeId, doctorId,
                                        classId, visitShiftId, Convert.ToDateTime(txtStartingDate.Text),
                                        Convert.ToDateTime(txtEndingDate.Text)).ToList();
                                }
                                else
                                {
                                    _getUnJointRecord =
                                        _dataContext.sp_PreSalesCallsSelectWithLevelUnJoint(_level3Id, _level4Id, _level5Id, _level6Id, employeeId, doctorId,
                                        classId, visitShiftId, Convert.ToDateTime(txtStartingDate.Text), Convert.ToDateTime(txtEndingDate.Text)).ToList();
                                }
                            }
                            else
                            {
                                if (jointVisit == 1)
                                {
                                    _getJointRecord =
                                        _dataContext.sp_PreSalesCallsSelectWithLevelJoint(_level3Id, _level4Id, _level5Id, _level6Id, employeeId, doctorId,
                                        classId, visitShiftId, DateTime.Now, DateTime.Now).ToList();
                                }
                                else if (jointVisit == 2)
                                {
                                    _getUnJointRecord =
                                        _dataContext.sp_PreSalesCallsSelectWithLevelUnJoint(_level3Id, _level4Id, _level5Id, _level6Id, employeeId, doctorId,
                                        classId, visitShiftId, DateTime.Now, DateTime.Now).ToList();
                                }
                                else
                                {
                                    _getUnJointRecord =
                                        _dataContext.sp_PreSalesCallsSelectWithLevelUnJoint(_level3Id, _level4Id, _level5Id, _level6Id, employeeId, doctorId,
                                        classId, visitShiftId, Convert.ToDateTime(txtStartingDate.Text), Convert.ToDateTime(txtEndingDate.Text)).ToList();
                                }
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl5")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));

                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl11.SelectedValue == "-1" || ddl11.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl11.SelectedValue);
                            }

                            #endregion

                            #region Select Record on the basis of Days Select

                            if (txtStartingDate.Text != "" && txtEndingDate.Text != "")
                            {
                                if (jointVisit == 1)
                                {
                                    _getJointRecord =
                                        _dataContext.sp_PreSalesCallsSelectWithLevelJoint(_level3Id, _level4Id, _level5Id, _level6Id, employeeId, doctorId,
                                        classId, visitShiftId, Convert.ToDateTime(txtStartingDate.Text),
                                        Convert.ToDateTime(txtEndingDate.Text)).ToList();
                                }
                                else if (jointVisit == 2)
                                {
                                    _getUnJointRecord =
                                        _dataContext.sp_PreSalesCallsSelectWithLevelUnJoint(_level3Id, _level4Id, _level5Id, _level6Id, employeeId, doctorId,
                                        classId, visitShiftId, Convert.ToDateTime(txtStartingDate.Text),
                                        Convert.ToDateTime(txtEndingDate.Text)).ToList();
                                }
                                else
                                {
                                    _getUnJointRecord =
                                        _dataContext.sp_PreSalesCallsSelectWithLevelUnJoint(_level3Id, _level4Id, _level5Id, _level6Id, employeeId, doctorId,
                                        classId, visitShiftId, Convert.ToDateTime(txtStartingDate.Text), Convert.ToDateTime(txtEndingDate.Text)).ToList();
                                }
                            }
                            else
                            {
                                if (jointVisit == 1)
                                {
                                    _getJointRecord =
                                        _dataContext.sp_PreSalesCallsSelectWithLevelJoint(_level3Id, _level4Id, _level5Id, _level6Id, employeeId, doctorId,
                                        classId, visitShiftId, DateTime.Now, DateTime.Now).ToList();
                                }
                                else if (jointVisit == 2)
                                {
                                    _getUnJointRecord =
                                        _dataContext.sp_PreSalesCallsSelectWithLevelUnJoint(_level3Id, _level4Id, _level5Id, _level6Id, employeeId, doctorId,
                                        classId, visitShiftId, DateTime.Now, DateTime.Now).ToList();
                                }
                                else
                                {
                                    _getUnJointRecord =
                                        _dataContext.sp_PreSalesCallsSelectWithLevelUnJoint(_level3Id, _level4Id, _level5Id, _level6Id, employeeId, doctorId,
                                        classId, visitShiftId, Convert.ToDateTime(txtStartingDate.Text), Convert.ToDateTime(txtEndingDate.Text)).ToList();
                                }

                            }

                            #endregion
                        }

                        else if (_currentUserRole == "rl6")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));



                            #endregion

                            #region Select Record on the basis of Days Select

                            if (txtStartingDate.Text != "" && txtEndingDate.Text != "")
                            {
                                if (jointVisit == 1)
                                {
                                    _getJointRecord =
                                        _dataContext.sp_PreSalesCallsSelectWithLevelJoint(_level3Id, _level4Id, _level5Id, _level6Id, employeeId, doctorId,
                                        classId, visitShiftId, Convert.ToDateTime(txtStartingDate.Text),
                                        Convert.ToDateTime(txtEndingDate.Text)).ToList();
                                }
                                else if (jointVisit == 2)
                                {
                                    _getUnJointRecord =
                                        _dataContext.sp_PreSalesCallsSelectWithLevelUnJoint(_level3Id, _level4Id, _level5Id, _level6Id, employeeId, doctorId,
                                        classId, visitShiftId, Convert.ToDateTime(txtStartingDate.Text),
                                        Convert.ToDateTime(txtEndingDate.Text)).ToList();
                                }
                                else
                                {
                                    _getUnJointRecord =
                                        _dataContext.sp_PreSalesCallsSelectWithLevelUnJoint(_level3Id, _level4Id, _level5Id, _level6Id, employeeId, doctorId,
                                        classId, visitShiftId, Convert.ToDateTime(txtStartingDate.Text), Convert.ToDateTime(txtEndingDate.Text)).ToList();
                                }
                            }
                            else
                            {
                                if (jointVisit == 1)
                                {
                                    _getJointRecord =
                                        _dataContext.sp_PreSalesCallsSelectWithLevelJoint(_level3Id, _level4Id, _level5Id, _level6Id, employeeId, doctorId,
                                        classId, visitShiftId, DateTime.Now, DateTime.Now).ToList();
                                }
                                else if (jointVisit == 2)
                                {
                                    _getUnJointRecord =
                                        _dataContext.sp_PreSalesCallsSelectWithLevelUnJoint(_level3Id, _level4Id, _level5Id, _level6Id, employeeId, doctorId,
                                        classId, visitShiftId, DateTime.Now, DateTime.Now).ToList();
                                }
                                else
                                {
                                    _getUnJointRecord =
                                        _dataContext.sp_PreSalesCallsSelectWithLevelUnJoint(_level3Id, _level4Id, _level5Id, _level6Id, employeeId, doctorId,
                                        classId, visitShiftId, Convert.ToDateTime(txtStartingDate.Text), Convert.ToDateTime(txtEndingDate.Text)).ToList();
                                }
                            }

                            #endregion
                        }
                        #endregion

                        #region Extract Data from Source

                        if (jointVisit == 1)
                        {
                            foreach (var jointItem in _getJointRecord)
                            {
                                #region Get Manager Name + Hierarchy Levels Name + MR Name + Mobile Number + Joint Visitor Name

                                _getEmployeeName = _dataContext.sp_EmployeesSelect(managerId).ToList();

                                if (_getEmployeeName.Count > 0)
                                {
                                    managerName = _getEmployeeName[0].FirstName + " " + _getEmployeeName[0].MiddleName + " " + _getEmployeeName[0].LastName;
                                }

                                _getEmployeeName = _dataContext.sp_EmployeesSelect(Convert.ToInt64(jointItem.JV)).ToList();

                                if (_getEmployeeName.Count > 0)
                                {
                                    JV = _getEmployeeName[0].FirstName + " " + _getEmployeeName[0].MiddleName + " " + _getEmployeeName[0].LastName;
                                }

                                JV = jointItem.JV.ToString();

                                _getEmployeesBioData =
                                    _dataContext.sp_EmplyeeHierarchySelectByMR(Convert.ToInt32(jointItem.Level6LevelId), Convert.ToInt64(jointItem.EmployeeId)).ToList();

                                if (_getEmployeesBioData.Count != 0)
                                {
                                    employeeName = _getEmployeesBioData[0].FirstName + " " + _getEmployeesBioData[0].MiddleName + " " + _getEmployeesBioData[0].LastName;
                                    employeeCode = _getEmployeesBioData[0].EmployeeCode;
                                    mobileNumber = _getEmployeesBioData[0].MobileNumber;

                                    if (hierarchyName == "Level3")
                                    {
                                        getLevel3Name = _dataContext.sp_HierarchyLevel3Select(Convert.ToInt32(_getEmployeesBioData[0].LevelId3), null).ToList();
                                        getLevel4Name = _dataContext.sp_HierarchyLevel4Select(Convert.ToInt32(_getEmployeesBioData[0].LevelId4), null).ToList();
                                        getLevel5Name = _dataContext.sp_HierarchyLevel5Select(Convert.ToInt32(_getEmployeesBioData[0].LevelId5), null).ToList();
                                        getLevel6Name = _dataContext.sp_HierarchyLevel6Select(Convert.ToInt32(_getEmployeesBioData[0].LevelId6), null).ToList();

                                        if (getLevel3Name.Count != 0 && getLevel4Name.Count != 0 && getLevel5Name.Count != 0 && getLevel6Name.Count != 0)
                                        {
                                            level3Name = getLevel3Name[0].LevelName;
                                            level4Name = getLevel4Name[0].LevelName;
                                            level5Name = getLevel5Name[0].LevelName;
                                            level6Name = getLevel6Name[0].LevelName;
                                        }
                                    }
                                }

                                #endregion

                                #region Get Doctor Name + Class + Brick

                                var getMRDrCode =
                                        _dataContext.sp_DoctorsOfSpoSelectByEmployee(Convert.ToInt64(jointItem.EmployeeId), Convert.ToInt64(jointItem.DoctorId), null, null).ToList();

                                if (getMRDrCode.Count > 0)
                                {
                                    doctorId = Convert.ToInt64(getMRDrCode[0].DoctorCode);
                                }



                                _getDoctorName = _dataContext.sp_DoctorsSelect(Convert.ToInt64(jointItem.DoctorId), null, null, null).ToList();

                                if (_getDoctorName.Count != 0)
                                {
                                    doctorName = _getDoctorName[0].FirstName + " " + _getDoctorName[0].MiddleName + " " + _getDoctorName[0].LastName;
                                }

                                _getDoctorClass = _dataContext.sp_DoctorClassSelectByDoctor(Convert.ToInt64(jointItem.DoctorId)).ToList();

                                if (_getDoctorClass.Count > 0)
                                {
                                    doctorClass = _getDoctorClass[0].ClassName;
                                }

                                var getSpeciality = _dataContext.sp_DoctorSpecialitySelect(Convert.ToInt64(jointItem.DoctorId)).ToList();

                                if (getSpeciality.Count > 0)
                                {
                                    speciality = getSpeciality[0].SpecialityName;

                                }

                                _getDoctorBrick = _dataContext.sp_DoctorInBrickSelect(null, Convert.ToInt64(jointItem.DoctorId)).ToList();

                                if (_getDoctorBrick.Count > 0)
                                {
                                    doctorBrick = _getDoctorBrick[0].LevelName;
                                }

                                #endregion

                                #region Get P1, P2, P3, P4

                                _getCallProducts = _dataContext.sp_CallProductsSelect(Convert.ToInt64(jointItem.SalesCallId)).ToList();
                                counter = 0;

                                if (_getCallProducts.Count != 0)
                                {
                                    foreach (var callProductItem in _getCallProducts)
                                    {
                                        if (counter == 0)
                                        {
                                            _getSamples = _dataContext.sp_ProductSkuSelect(Convert.ToInt32(callProductItem.SkuId), Convert.ToInt32(callProductItem.ProductId), null).ToList();


                                            if (_getSamples.Count != 0)
                                            {
                                                P1 = Convert.ToString(_getSamples[0].SkuName);
                                                R1 = Convert.ToString(callProductItem.DetailReminder);
                                                counter = 1;
                                            }
                                        }
                                        else if (counter == 1)
                                        {
                                            _getSamples = _dataContext.sp_ProductSkuSelect(Convert.ToInt32(callProductItem.SkuId), Convert.ToInt32(callProductItem.ProductId), null).ToList();
                                            if (_getSamples.Count != 0)
                                            {
                                                P2 = Convert.ToString(_getSamples[0].SkuName);
                                                R2 = Convert.ToString(callProductItem.DetailReminder);
                                                counter = 2;
                                            }
                                        }
                                        else if (counter == 2)
                                        {
                                            _getSamples = _dataContext.sp_ProductSkuSelect(Convert.ToInt32(callProductItem.SkuId), Convert.ToInt32(callProductItem.ProductId), null).ToList();


                                            if (_getSamples.Count != 0)
                                            {
                                                P3 = Convert.ToString(_getSamples[0].SkuName);
                                                R3 = Convert.ToString(callProductItem.DetailReminder);
                                                counter = 3;
                                            }
                                        }
                                        else if (counter == 3)
                                        {
                                            _getSamples = _dataContext.sp_ProductSkuSelect(Convert.ToInt32(callProductItem.SkuId), Convert.ToInt32(callProductItem.ProductId), null).ToList();

                                            if (_getSamples.Count != 0)
                                            {
                                                P4 = Convert.ToString(_getSamples[0].SkuName);
                                                counter = 4;
                                            }
                                        }
                                    }
                                }

                                #endregion

                                #region Get S1, S2, S3 + Q1, Q2, Q3

                                _getCallProductSamples = _dataContext.sp_CallProductSamplesSelect(Convert.ToInt64(jointItem.SalesCallId)).ToList();
                                counter = 0;

                                foreach (var callProductSampleItem in _getCallProductSamples)
                                {
                                    if (counter == 0)
                                    {
                                        _getSamples = _dataContext.sp_ProductSkuSelect(Convert.ToInt32(callProductSampleItem.ProductSkuId), null, null).ToList();

                                        if (_getSamples.Count != 0)
                                        {
                                            S1 = Convert.ToString(_getSamples[0].SkuName);
                                            SQ1 = Convert.ToString(callProductSampleItem.SampleQuantity);
                                            counter = 1;
                                        }
                                    }
                                    else if (counter == 1)
                                    {
                                        _getSamples = _dataContext.sp_ProductSkuSelect(Convert.ToInt32(callProductSampleItem.ProductSkuId), null, null).ToList();

                                        if (_getSamples.Count != 0)
                                        {
                                            S2 = Convert.ToString(_getSamples[0].SkuName);
                                            SQ2 = Convert.ToString(callProductSampleItem.SampleQuantity);
                                            counter = 2;
                                        }
                                    }
                                    else if (counter == 2)
                                    {
                                        _getSamples = _dataContext.sp_ProductSkuSelect(Convert.ToInt32(callProductSampleItem.ProductSkuId), null, null).ToList();

                                        if (_getSamples.Count != 0)
                                        {
                                            S3 = Convert.ToString(_getSamples[0].SkuName);
                                            SQ3 = Convert.ToString(callProductSampleItem.SampleQuantity);
                                            counter = 3;
                                        }
                                    }
                                }

                                #endregion

                                #region Get G1, G2 + QG1, QG2

                                _getCallGift = _dataContext.sp_CallGiftsSelect(Convert.ToInt64(jointItem.SalesCallId)).ToList();
                                counter = 0;

                                foreach (var callGiftItems in _getCallGift)
                                {
                                    if (counter == 0)
                                    {
                                        _getGiftItems = _dataContext.sp_GiftItemsSelect(Convert.ToInt64(callGiftItems.GiftId), null, null).ToList();

                                        if (_getGiftItems.Count != 0)
                                        {
                                            G1 = Convert.ToString(_getGiftItems[0].GiftName);
                                            QG1 = Convert.ToString(callGiftItems.Quanitity);
                                            counter = 1;
                                        }
                                    }
                                    else if (counter == 1)
                                    {
                                        _getGiftItems = _dataContext.sp_GiftItemsSelect(Convert.ToInt64(callGiftItems.GiftId), null, null).ToList();

                                        if (_getGiftItems.Count != 0)
                                        {
                                            G2 = Convert.ToString(_getGiftItems[0].GiftName);
                                            QG2 = Convert.ToString(callGiftItems.Quanitity);
                                            counter = 2;
                                        }
                                    }
                                }

                                #endregion

                                #region Get DT + VT

                                creationDate = Convert.ToDateTime(jointItem.CreationDateTime);
                                VisitedDate = Convert.ToDateTime(jointItem.VisitDateTime.ToString("MM/dd/yyyy")).Date;
                                VT = Convert.ToString(jointItem.VisitShift);

                                if (VT != "1")
                                {
                                    VT = VT.Replace(Convert.ToString(jointItem.VisitShift), "E");
                                }
                                else
                                {
                                    VT = VT.Replace(Convert.ToString(jointItem.VisitShift), "M");
                                }

                                #endregion


                                #region Insert Row to DataTable

                                dtDailyCallReport.Rows.Add(level1Name, level2Name, level3Name, level4Name, level5Name, level6Name, employeeName, mobileNumber,
                                   creationDate, doctorName, doctorClass, speciality, P1, P2, P3, P4, S1, SQ1, S2, SQ2, S3, SQ3, G1, G2, JV,
                                   visitShiftId, VT, doctorId, VisitedDate.ToString("MM-dd-yyyy"), creationDate.ToString("MM-dd-yyyy"), employeeId, employeeCode + "-" +
                                   employeeName, doctorBrick, R1, R2, R3, Convert.ToDateTime(txtStartingDate.Text), Convert.ToDateTime(txtEndingDate.Text));
                                //managerName,doctorBrick, QG1,QG2, 
                                #endregion
                            }
                        }
                        else if (jointVisit == 2 || jointVisit == 0)
                        {
                            foreach (var unJointItem in _getUnJointRecord)
                            {
                                #region Get Manager Name + Hierarchy Levels Name + MR Name + Mobile Number

                                _getEmployeeName = _dataContext.sp_EmployeesSelect(managerId).ToList();

                                if (_getEmployeeName.Count > 0)
                                {
                                    managerName = _getEmployeeName[0].FirstName + " " + _getEmployeeName[0].MiddleName + " " + _getEmployeeName[0].LastName;
                                }

                                _getEmployeesBioData =
                                    _dataContext.sp_EmplyeeHierarchySelectByMR(Convert.ToInt32(unJointItem.Level6LevelId), Convert.ToInt64(unJointItem.EmployeeId)).ToList();

                                if (_getEmployeesBioData.Count != 0)
                                {
                                    employeeName = _getEmployeesBioData[0].FirstName + " " + _getEmployeesBioData[0].MiddleName + " " + _getEmployeesBioData[0].LastName;
                                    employeeCode = _getEmployeesBioData[0].EmployeeCode;
                                    mobileNumber = _getEmployeesBioData[0].MobileNumber;

                                    if (hierarchyName == "Level3")
                                    {
                                        getLevel3Name = _dataContext.sp_HierarchyLevel3Select(Convert.ToInt32(_getEmployeesBioData[0].LevelId3), null).ToList();
                                        getLevel4Name = _dataContext.sp_HierarchyLevel4Select(Convert.ToInt32(_getEmployeesBioData[0].LevelId4), null).ToList();
                                        getLevel5Name = _dataContext.sp_HierarchyLevel5Select(Convert.ToInt32(_getEmployeesBioData[0].LevelId5), null).ToList();
                                        getLevel6Name = _dataContext.sp_HierarchyLevel6Select(Convert.ToInt32(_getEmployeesBioData[0].LevelId6), null).ToList();

                                        if (getLevel3Name.Count != 0 && getLevel4Name.Count != 0 && getLevel5Name.Count != 0 && getLevel6Name.Count != 0)
                                        {
                                            level3Name = getLevel3Name[0].LevelName;
                                            level4Name = getLevel4Name[0].LevelName;
                                            level5Name = getLevel5Name[0].LevelName;
                                            level6Name = getLevel6Name[0].LevelName;
                                        }
                                    }
                                }

                                #endregion

                                #region Get Doctor Name + Class + Brick

                                var getMRDrCode =
                                        _dataContext.sp_DoctorsOfSpoSelectByEmployee(Convert.ToInt64(unJointItem.EmployeeId), Convert.ToInt64(unJointItem.DoctorId), null, null).ToList();

                                if (getMRDrCode.Count > 0)
                                {
                                    doctorId = Convert.ToInt64(getMRDrCode[0].DoctorCode);
                                }



                                _getDoctorName = _dataContext.sp_DoctorsSelect(Convert.ToInt64(unJointItem.DoctorId), null, null, null).ToList();

                                if (_getDoctorName.Count != 0)
                                {
                                    doctorName = _getDoctorName[0].FirstName + " " + _getDoctorName[0].MiddleName + " " + _getDoctorName[0].LastName;
                                }

                                _getDoctorClass = _dataContext.sp_DoctorClassSelectByDoctor(Convert.ToInt64(unJointItem.DoctorId)).ToList();

                                if (_getDoctorClass.Count > 0)
                                {
                                    doctorClass = _getDoctorClass[0].ClassName;
                                }

                                var getSpeciality = _dataContext.sp_DoctorSpecialitySelect(Convert.ToInt64(unJointItem.DoctorId)).ToList();

                                if (getSpeciality.Count > 0)
                                {
                                    speciality = getSpeciality[0].SpecialityName;
                                }

                                _getDoctorBrick = _dataContext.sp_DoctorInBrickSelect(null, Convert.ToInt64(unJointItem.DoctorId)).ToList();

                                if (_getDoctorBrick.Count > 0)
                                {
                                    doctorBrick = _getDoctorBrick[0].LevelName;
                                }

                                #endregion

                                #region Get P1, P2, P3, P4

                                _getCallProducts = _dataContext.sp_CallProductsSelect(Convert.ToInt64(unJointItem.SalesCallId)).ToList();
                                counter = 0;

                                if (_getCallProducts.Count != 0)
                                {
                                    foreach (var callProductItem in _getCallProducts)
                                    {
                                        if (counter == 0)
                                        {
                                            _getSamples = _dataContext.sp_ProductSkuSelect(Convert.ToInt32(callProductItem.SkuId), Convert.ToInt32(callProductItem.ProductId), null).ToList();
                                            if (_getSamples.Count != 0)
                                            {
                                                P1 = Convert.ToString(_getSamples[0].SkuName);
                                                R1 = Convert.ToString(callProductItem.DetailReminder);
                                                counter = 1;
                                            }
                                        }
                                        else if (counter == 1)
                                        {
                                            _getSamples = _dataContext.sp_ProductSkuSelect(Convert.ToInt32(callProductItem.SkuId), Convert.ToInt32(callProductItem.ProductId), null).ToList();
                                            if (_getSamples.Count != 0)
                                            {
                                                P2 = Convert.ToString(_getSamples[0].SkuName);
                                                R2 = Convert.ToString(callProductItem.DetailReminder);
                                                counter = 2;
                                            }
                                        }
                                        else if (counter == 2)
                                        {
                                            _getSamples = _dataContext.sp_ProductSkuSelect(Convert.ToInt32(callProductItem.SkuId), Convert.ToInt32(callProductItem.ProductId), null).ToList();
                                            if (_getSamples.Count != 0)
                                            {
                                                P3 = Convert.ToString(_getSamples[0].SkuName);
                                                R3 = Convert.ToString(callProductItem.DetailReminder);
                                                counter = 3;
                                            }
                                        }
                                        else if (counter == 3)
                                        {
                                            _getSamples = _dataContext.sp_ProductSkuSelect(Convert.ToInt32(callProductItem.SkuId), Convert.ToInt32(callProductItem.ProductId), null).ToList();

                                            if (_getSamples.Count != 0)
                                            {
                                                P4 = Convert.ToString(_getSamples[0].SkuName);
                                                counter = 4;
                                            }
                                        }
                                    }
                                }

                                #endregion

                                #region Get S1, S2, S3 + Q1, Q2, Q3

                                _getCallProductSamples = _dataContext.sp_CallProductSamplesSelect(Convert.ToInt64(unJointItem.SalesCallId)).ToList();
                                counter = 0;

                                foreach (var callProductSampleItem in _getCallProductSamples)
                                {
                                    if (counter == 0)
                                    {
                                        _getSamples = _dataContext.sp_ProductSkuSelect(Convert.ToInt32(callProductSampleItem.ProductSkuId), null, null).ToList();

                                        if (_getSamples.Count != 0)
                                        {
                                            S1 = Convert.ToString(_getSamples[0].SkuName);
                                            SQ1 = Convert.ToString(callProductSampleItem.SampleQuantity);
                                            counter = 1;
                                        }
                                    }
                                    else if (counter == 1)
                                    {
                                        _getSamples = _dataContext.sp_ProductSkuSelect(Convert.ToInt32(callProductSampleItem.ProductSkuId), null, null).ToList();

                                        if (_getSamples.Count != 0)
                                        {
                                            S2 = Convert.ToString(_getSamples[0].SkuName);
                                            SQ2 = Convert.ToString(callProductSampleItem.SampleQuantity);
                                            counter = 2;
                                        }
                                    }
                                    else if (counter == 2)
                                    {
                                        _getSamples = _dataContext.sp_ProductSkuSelect(Convert.ToInt32(callProductSampleItem.ProductSkuId), null, null).ToList();

                                        if (_getSamples.Count != 0)
                                        {
                                            S3 = Convert.ToString(_getSamples[0].SkuName);
                                            SQ3 = Convert.ToString(callProductSampleItem.SampleQuantity);
                                            counter = 3;
                                        }
                                    }
                                }

                                #endregion

                                #region Get G1, G2 + QG1, QG2

                                _getCallGift = _dataContext.sp_CallGiftsSelect(Convert.ToInt64(unJointItem.SalesCallId)).ToList();
                                counter = 0;

                                foreach (var callGiftItems in _getCallGift)
                                {
                                    if (counter == 0)
                                    {
                                        _getGiftItems = _dataContext.sp_GiftItemsSelect(Convert.ToInt64(callGiftItems.GiftId), null, null).ToList();

                                        if (_getGiftItems.Count != 0)
                                        {
                                            G1 = Convert.ToString(_getGiftItems[0].GiftName);
                                            QG1 = Convert.ToString(callGiftItems.Quanitity);
                                            counter = 1;
                                        }
                                    }
                                    else if (counter == 1)
                                    {
                                        _getGiftItems = _dataContext.sp_GiftItemsSelect(Convert.ToInt64(callGiftItems.GiftId), null, null).ToList();

                                        if (_getGiftItems.Count != 0)
                                        {
                                            G2 = Convert.ToString(_getGiftItems[0].GiftName);
                                            QG2 = Convert.ToString(callGiftItems.Quanitity);
                                            counter = 2;
                                        }
                                    }
                                }

                                #endregion

                                #region Get DT + VT

                                creationDate = Convert.ToDateTime(unJointItem.CreationDateTime);
                                VisitedDate = Convert.ToDateTime(unJointItem.VisitDateTime.ToString("MM/dd/yyyy")).Date;
                                VT = Convert.ToString(unJointItem.VisitShift);

                                if (VT != "1")
                                {
                                    VT = VT.Replace(Convert.ToString(unJointItem.VisitShift), "E");
                                }
                                else
                                {
                                    VT = VT.Replace(Convert.ToString(unJointItem.VisitShift), "M");
                                }

                                #endregion

                                #region Placing Default Values

                                if (P2 == "")
                                {
                                    P2 = "-";
                                }

                                if (P3 == "")
                                {
                                    P3 = "-";
                                }

                                if (P4 == "")
                                {
                                    P4 = "-";
                                }

                                if (S2 == "")
                                {
                                    S2 = "-";
                                }

                                if (SQ2 == "")
                                {
                                    SQ2 = "-";
                                }

                                if (S3 == "")
                                {
                                    S3 = "-";
                                }

                                if (SQ3 == "")
                                {
                                    SQ3 = "-";
                                }

                                if (QG1 == "")
                                {
                                    QG1 = "-";
                                }

                                if (G2 == "")
                                {
                                    G2 = "-";
                                }

                                if (QG2 == "")
                                {
                                    QG2 = "-";
                                }

                                if (JV == "" || JV == "0")
                                {
                                    JV = "-";
                                }

                                #endregion

                                #region Insert Row to DataTable

                                dtDailyCallReport.Rows.Add(level1Name, level2Name, level3Name, level4Name, level5Name, level6Name, employeeName, mobileNumber,
                                    creationDate, doctorName, doctorClass, speciality, P1, P2, P3, P4, S1, SQ1, S2, SQ2, S3, SQ3, G1, G2, JV,
                                    visitShiftId, VT, doctorId, VisitedDate.ToString("MM-dd-yyyy"), creationDate, employeeId, employeeCode + "-" +
                                    employeeName, doctorBrick, R1, R2, R3, Convert.ToDateTime(txtStartingDate.Text), Convert.ToDateTime(txtEndingDate.Text));

                                #endregion
                            }
                        }

                        #endregion

                        #region Display Report
                        DataView dv = new DataView();
                        dv = dtDailyCallReport.DefaultView;
                        dv.Sort = "DocRefID";
                        rpt.Load(Server.MapPath("DailyCallReport/CrystalReport41.rpt"));
                        rpt.SetDataSource(dv);
                        Session["reportdoc"] = rpt;
                        CrystalReportViewer1.ReportSource = rpt;
                        rpt.ExportToDisk(ExportFormatType.PortableDocFormat, pdfFile1);
                        BtnEmail.Visible = true;
                        #endregion
                    }
                }

                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from LoadDailyCallReport is " + exception.Message;
            }
        }

        private void DailyCallReport()
        {
            try
            {
                #region Initialization

                long employeeId = 0, managerId = 0, doctorId = 0;
                int level3Id = 0, level4Id = 0, level5Id = 0, level6Id = 0, classId = 0, visitShiftId = 0, jointVisit = 0;
                string hierarchyName = "", level1Name = "", level2Name = "", level3Name = "", level4Name = "", level5Name = "", level6Name = "", managerName = "",
                    employeeName = "", mobileNumber = "", doctorName = "", doctorClass = "", speciality = "", doctorBrick = "", P1 = "", P2 = "", P3 = "", P4 = "",
                    R1 = "", R2 = "", R3 = "", S1 = "", SQ1 = "", S2 = "", SQ2 = "", S3 = "", SQ3 = "", G1 = "", QG1 = "", G2 = "", QG2 = "", JV = "", VT = "", employeeCode = "";
                DateTime creationDate;
                DateTime VisitedDate;

                List<HierarchyLevel3> getLevel3Name;
                List<HierarchyLevel4> getLevel4Name;
                List<HierarchyLevel5> getLevel5Name;
                List<HierarchyLevel6> getLevel6Name;

                var dtDailyCallReport = new DataTable();

                #endregion

                #region Initialization of Custom DataTable columns

                XSDDatatable.Dsreports dsc = new XSDDatatable.Dsreports();

                dtDailyCallReport = dsc.Tables["DcrDetails"];

                #endregion

                #region Get Active Hierarchy Level

                List<DatabaseLayer.SQL.AppConfiguration> getLevelName =
                    _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

                #endregion

                #region Filter Record on the basis of Active Level

                if (getLevelName.Count != 0)
                {
                    hierarchyName = Convert.ToString(getLevelName[0].SettingName);
                    _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                    if (hierarchyName == "Level3")
                    {
                        #region Common Features

                        if (ddlDoctor.SelectedValue == "-1" || ddlDoctor.SelectedValue == "")
                        {
                            doctorId = 0;
                        }
                        else
                        {
                            doctorId = Convert.ToInt32(ddlDoctor.SelectedValue);
                        }

                        if (ddlClass.SelectedValue == "-1" || ddlClass.SelectedValue == "")
                        {
                            classId = 0;
                        }
                        else
                        {
                            classId = Convert.ToInt32(ddlClass.SelectedValue);
                        }

                        if (ddlVisitShift.SelectedValue == "-1" || ddlVisitShift.SelectedValue == "")
                        {
                            visitShiftId = 0;
                        }
                        else
                        {
                            visitShiftId = Convert.ToInt32(ddlVisitShift.SelectedValue);
                        }

                        if (ddlJointVisit.SelectedValue == "-1" || ddlJointVisit.SelectedValue == "0")
                        {
                            jointVisit = 0;
                        }
                        else
                        {
                            jointVisit = Convert.ToInt32(ddlJointVisit.SelectedValue);
                        }

                        int counter = 0;

                        #endregion

                        #region Get Record Via Roles

                        if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level3Id = 0;
                            }
                            else
                            {
                                _level3Id = Convert.ToInt32(ddl1.SelectedValue);
                            }


                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level4Id = 0;
                            }
                            else
                            {
                                _level4Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl3.SelectedValue);
                            }

                            if (ddl4.SelectedValue == "-1" || ddl4.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl4.SelectedValue);
                            }

                            if (ddl44.SelectedValue == "-1" || ddl44.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl44.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl3")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level4Id = 0;
                            }
                            else
                            {
                                _level4Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl3.SelectedValue);
                            }

                            if (ddl33.SelectedValue == "-1" || ddl33.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl33.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl4")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl22.SelectedValue == "-1" || ddl22.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl22.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl5")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));

                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl11.SelectedValue == "-1" || ddl11.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl11.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl6")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));



                            #endregion
                        }
                        #endregion

                        #region Extract Data from Source


                        #region Select Record on the basis of Days Select

                        _nvCollection.Clear();
                        _nvCollection.Add("@Level3Id-int", _level3Id.ToString());
                        _nvCollection.Add("@Level4Id-int", _level4Id.ToString());
                        _nvCollection.Add("@Level5Id-int", _level5Id.ToString());
                        _nvCollection.Add("@Level6Id-int", _level6Id.ToString());
                        _nvCollection.Add("@EmployeeId-int", employeeId.ToString());
                        _nvCollection.Add("@DoctorId-int", doctorId.ToString());
                        _nvCollection.Add("@DoctorClass-int", classId.ToString());
                        _nvCollection.Add("@VisitShift-INT", visitShiftId.ToString());


                        if (txtStartingDate.Text != "" && txtEndingDate.Text != "")
                        {
                            _nvCollection.Add("@StartingDate-datetime", Convert.ToDateTime(txtStartingDate.Text).ToString());
                            _nvCollection.Add("@EndingDate-datetime", Convert.ToDateTime(txtEndingDate.Text).ToString());
                            if (jointVisit == 1)
                            {
                                dtDailyCallReport = GetData("DailyCallReportSelectjoin1", _nvCollection).Tables[0];
                                //Joint ProcedureCall
                            }
                            else if (jointVisit == 2)
                            {
                                dtDailyCallReport = GetData("DailyCallReportSelectUNjoin1", _nvCollection).Tables[0];
                                //UNJoint ProcedureCall
                            }
                            else
                            {
                                dtDailyCallReport = GetData("DailyCallReportSelectUNjoin1", _nvCollection).Tables[0];
                                //UNJOIN ProcedureCall
                            }
                        }
                        else
                        {
                            _nvCollection.Add("@StartingDate-datetime", DateTime.Now.ToString());
                            _nvCollection.Add("@EndingDate-datetime", DateTime.Now.ToString());
                            if (jointVisit == 1)
                            {
                                dtDailyCallReport = GetData("DailyCallReportSelectjoin1", _nvCollection).Tables[0];
                                //Joint ProcedureCall
                            }
                            else if (jointVisit == 2)
                            {
                                dtDailyCallReport = GetData("DailyCallReportSelectUNjoin1", _nvCollection).Tables[0];
                                //UNJoint ProcedureCall
                            }
                            else
                            {
                                dtDailyCallReport = GetData("DailyCallReportSelectUNjoin1", _nvCollection).Tables[0];
                                //UNJOIN ProcedureCall
                            }
                        }

                        #endregion

                        #endregion

                        #region Display Report
                        DataView dv = new DataView();
                        dv = dtDailyCallReport.DefaultView;
                        dv.Sort = "DocRefID";
                        rpt.Load(Server.MapPath("DailyCallReport/CrystalReport41.rpt"));
                        rpt.SetDataSource(dv);
                        Session["reportdoc"] = rpt;
                        CrystalReportViewer1.ReportSource = rpt;
                        rpt.ExportToDisk(ExportFormatType.PortableDocFormat, pdfFile1);
                        BtnEmail.Visible = true;
                        #endregion
                    }
                }

                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from LoadDailyCallReport is " + exception.Message;
            }

        }

        private void DescribedProducts()
        {
            try
            {
                #region Initialization

                long employeeId = 0, managerId = 0, doctorId = 0;
                int level3Id = 0, level4Id = 0, level5Id = 0, level6Id = 0, classId = 0, visitShiftId = 0, jointVisit = 0;
                string hierarchyName = "", level1Name = "", level2Name = "", level3Name = "", level4Name = "", level5Name = "", level6Name = "",
                    doctorCode = "", doctorName = "", speciality = "", P1 = "", P2 = "", P3 = "", P4 = "";
                DateTime visitDate;

                List<HierarchyLevel3> getLevel3Name;
                List<HierarchyLevel4> getLevel4Name;
                List<HierarchyLevel5> getLevel5Name;
                List<HierarchyLevel6> getLevel6Name;

                var dtDescribedProduct = new DataTable();

                #endregion

                #region Initialization of Custom DataTable columns
                XSDDatatable.Dsreports dsc = new XSDDatatable.Dsreports();
                dtDescribedProduct = dsc.Tables["DescribedProducts"];
                #endregion

                #region Get Active Hierarchy Level

                List<DatabaseLayer.SQL.AppConfiguration> getLevelName =
                    _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

                #endregion

                #region Filter Record on the basis of Active Level

                if (getLevelName.Count != 0)
                {
                    hierarchyName = Convert.ToString(getLevelName[0].SettingName);
                    _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                    if (hierarchyName == "Level3")
                    {
                        #region Common Features

                        if (ddlDoctor.SelectedValue == "-1" || ddlDoctor.SelectedValue == "")
                        {
                            doctorId = 0;
                        }
                        else
                        {
                            doctorId = Convert.ToInt32(ddlDoctor.SelectedValue);
                        }

                        if (ddlClass.SelectedValue == "-1" || ddlClass.SelectedValue == "")
                        {
                            classId = 0;
                        }
                        else
                        {
                            classId = Convert.ToInt32(ddlClass.SelectedValue);
                        }

                        if (ddlVisitShift.SelectedValue == "-1" || ddlVisitShift.SelectedValue == "")
                        {
                            visitShiftId = 0;
                        }
                        else
                        {
                            visitShiftId = Convert.ToInt32(ddlVisitShift.SelectedValue);
                        }

                        if (ddlJointVisit.SelectedValue == "-1" || ddlJointVisit.SelectedValue == "0")
                        {
                            jointVisit = 0;
                        }
                        else
                        {
                            jointVisit = Convert.ToInt32(ddlJointVisit.SelectedValue);
                        }

                        int counter = 0;

                        #endregion

                        #region Get Record Via Roles

                        if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level3Id = 0;
                            }
                            else
                            {
                                _level3Id = Convert.ToInt32(ddl1.SelectedValue);
                            }


                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level4Id = 0;
                            }
                            else
                            {
                                _level4Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl3.SelectedValue);
                            }

                            if (ddl4.SelectedValue == "-1" || ddl4.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl4.SelectedValue);
                            }

                            if (ddl44.SelectedValue == "-1" || ddl44.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl44.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl3")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level4Id = 0;
                            }
                            else
                            {
                                _level4Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl3.SelectedValue);
                            }

                            if (ddl33.SelectedValue == "-1" || ddl33.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl33.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl4")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl22.SelectedValue == "-1" || ddl22.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl22.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl5")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));

                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl11.SelectedValue == "-1" || ddl11.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl11.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl6")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));



                            #endregion
                        }
                        #endregion

                        #region Extract Data from Source


                        #region Select Record on the basis of Days Select

                        _nvCollection.Clear();
                        _nvCollection.Add("@Level3Id-int", _level3Id.ToString());
                        _nvCollection.Add("@Level4Id-int", _level4Id.ToString());
                        _nvCollection.Add("@Level5Id-int", _level5Id.ToString());
                        _nvCollection.Add("@Level6Id-int", _level6Id.ToString());
                        _nvCollection.Add("@EmployeeId-int", employeeId.ToString());
                        _nvCollection.Add("@DoctorId-int", doctorId.ToString());
                        _nvCollection.Add("@DoctorClass-int", classId.ToString());
                        _nvCollection.Add("@VisitShift-INT", visitShiftId.ToString());


                        if (txtStartingDate.Text != "" && txtEndingDate.Text != "")
                        {
                            _nvCollection.Add("@StartingDate-datetime", Convert.ToDateTime(txtStartingDate.Text).ToString());
                            _nvCollection.Add("@EndingDate-datetime", Convert.ToDateTime(txtEndingDate.Text).ToString());
                            if (jointVisit == 1)
                            {
                                dtDescribedProduct = GetData("DescribedProductSelectjoin1", _nvCollection).Tables[0];
                                //Joint ProcedureCall
                            }
                            else if (jointVisit == 2)
                            {
                                dtDescribedProduct = GetData("DescribedProductSelectUNjoin1", _nvCollection).Tables[0];
                                //UNJoint ProcedureCall
                            }
                            else
                            {
                                dtDescribedProduct = GetData("DescribedProductSelectUNjoin1", _nvCollection).Tables[0];
                                //UNJOIN ProcedureCall
                            }
                        }
                        else
                        {
                            _nvCollection.Add("@StartingDate-datetime", DateTime.Now.ToString());
                            _nvCollection.Add("@EndingDate-datetime", DateTime.Now.ToString());
                            if (jointVisit == 1)
                            {
                                dtDescribedProduct = GetData("DescribedProductSelectjoin1", _nvCollection).Tables[0];
                                //Joint ProcedureCall
                            }
                            else if (jointVisit == 2)
                            {
                                dtDescribedProduct = GetData("DescribedProductSelectUNjoin1", _nvCollection).Tables[0];
                                //UNJoint ProcedureCall
                            }
                            else
                            {
                                dtDescribedProduct = GetData("DescribedProductSelectUNjoin1", _nvCollection).Tables[0];
                                //UNJOIN ProcedureCall
                            }
                        }

                        #endregion

                        #endregion

                        #region Display Report

                        rpt.Load(Server.MapPath("DescribedProducts/DescribedProducts.rpt"));
                        rpt.SetDataSource(dtDescribedProduct);
                        Session["reportdoc"] = rpt;
                        CrystalReportViewer1.ReportSource = rpt;
                        rpt.ExportToDisk(ExportFormatType.PortableDocFormat, pdfFile1);
                        BtnEmail.Visible = true;
                        #endregion
                    }
                }

                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from DescribedProducts is " + exception.Message;
            }
        }

        private void SampleIssuedToDoc()
        {
            try
            {
                #region Initialization

                long employeeId = 0, doctorId = 0;
                int level3Id = 0, level4Id = 0, level5Id = 0, level6Id = 0, productId = 0, visitShiftId = 0, sampleQuantity = 0;
                string hierarchyName = "", level1Name = "", level2Name = "", level3Name = "", level4Name = "", level5Name = "", level6Name = "",
                    employeeName = "", mobileNumber = "", doctorName = "", sample = "";
                DateTime visitDate;

                List<HierarchyLevel3> getLevel3Name;
                List<HierarchyLevel4> getLevel4Name;
                List<HierarchyLevel5> getLevel5Name;
                List<HierarchyLevel6> getLevel6Name;

                var dtSampleIssuedToDoc = new DataTable();

                #endregion

                #region Initialization of Custom DataTable columns

                XSDDatatable.Dsreports dsc = new XSDDatatable.Dsreports();
                dtSampleIssuedToDoc = dsc.Tables["SamplesIssuedToDoctor"];


                #endregion

                #region Get Active Hierarchy Level

                List<DatabaseLayer.SQL.AppConfiguration> getLevelName =
                    _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

                #endregion

                #region Filter Record on the basis of Active Level

                if (getLevelName.Count != 0)
                {
                    hierarchyName = Convert.ToString(getLevelName[0].SettingName);
                    _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                    if (hierarchyName == "Level3")
                    {
                        #region Common Features
                        if (ddlDoctor.SelectedValue != "")
                            if (ddlDoctor.SelectedValue != "-1")
                            {
                                doctorId = Convert.ToInt64(ddlDoctor.SelectedValue);
                            }
                            else
                            {
                                doctorId = 0;
                            }
                        else
                        {
                            doctorId = 0;
                        }
                        if (ddlProduct.SelectedValue != "")
                            if (ddlProduct.SelectedValue != "-1")
                            {
                                productId = Convert.ToInt32(ddlProduct.SelectedValue);
                            }
                            else
                            {
                                productId = 0;
                            }
                        else
                        {
                            productId = 0;
                        }

                        if (ddlVisitShift.SelectedValue != "")
                            if (ddlVisitShift.SelectedValue != "-1")
                            {
                                visitShiftId = Convert.ToInt32(ddlVisitShift.SelectedValue);
                            }
                            else
                            {
                                visitShiftId = 0;
                            }
                        else
                        {
                            visitShiftId = 0;
                        }
                        #endregion

                        #region Get Record Via Roles
                        if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level3Id = 0;
                            }
                            else
                            {
                                _level3Id = Convert.ToInt32(ddl1.SelectedValue);
                            }


                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level4Id = 0;
                            }
                            else
                            {
                                _level4Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl3.SelectedValue);
                            }

                            if (ddl4.SelectedValue == "-1" || ddl4.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl4.SelectedValue);
                            }

                            if (ddl44.SelectedValue == "-1" || ddl44.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl44.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl3")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level4Id = 0;
                            }
                            else
                            {
                                _level4Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl3.SelectedValue);
                            }

                            if (ddl33.SelectedValue == "-1" || ddl33.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl33.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl4")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl22.SelectedValue == "-1" || ddl22.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl22.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl5")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));

                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl11.SelectedValue == "-1" || ddl11.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl11.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl6")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                            employeeId = _currentUser.EmployeeId;

                            #endregion
                        }

                        #endregion

                        _nvCollection.Clear();
                        _nvCollection.Add("@Level3ID-int", _level3Id.ToString());
                        _nvCollection.Add("@Level4ID-int", _level4Id.ToString());
                        _nvCollection.Add("@Level5ID-int", _level5Id.ToString());
                        _nvCollection.Add("@Level6ID-int", _level6Id.ToString());
                        _nvCollection.Add("@EmployeeID-int", employeeId.ToString());
                        _nvCollection.Add("@DoctorID-int", doctorId.ToString());
                        _nvCollection.Add("@VisitShift-int", visitShiftId.ToString());
                        _nvCollection.Add("@productID-int", productId.ToString());

                        #region Extract Data from Source
                        if (txtStartingDate.Text != "" && txtEndingDate.Text != "")
                        {
                            _nvCollection.Add("@DateStart-datetime", Convert.ToDateTime(txtStartingDate.Text).ToString());
                            _nvCollection.Add("@DateEnd-datetime", Convert.ToDateTime(txtEndingDate.Text).ToString());
                        }
                        else
                        {
                            _nvCollection.Add("@DateStart-datetime", DateTime.Now.ToString());
                            _nvCollection.Add("@DateEnd-datetime", DateTime.Now.ToString());
                        }

                        DataSet ds = GetData("sp_SampleIssuedTodoc", _nvCollection);
                        dtSampleIssuedToDoc = ds.Tables[0];

                        #endregion

                        #region Display Report

                        rpt.Load(Server.MapPath("SampleIssuedToDoc/SampleToDoctor.rpt"));
                        rpt.SetDataSource(dtSampleIssuedToDoc);
                        Session["reportdoc"] = rpt;
                        CrystalReportViewer1.ReportSource = rpt;
                        rpt.ExportToDisk(ExportFormatType.PortableDocFormat, pdfFile1);
                        BtnEmail.Visible = true;

                        #endregion

                    }
                }

                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from SampleIssuedToDoc is " + exception.Message;
            }
        }

        private void MrList()
        {
            try
            {
                #region Initialization

                long employeeId = 0;
                int level3Id = 0, level4Id = 0, level5Id = 0, level6Id = 0;
                string hierarchyName = "", level1Name = "", level2Name = "";

                var dtMrList = new DataTable();

                #endregion

                #region Initialization of Custom DataTable columns

                dtMrList.Columns.Add(new DataColumn("ID", Type.GetType("System.String")));
                dtMrList.Columns.Add(new DataColumn("Name", Type.GetType("System.String")));
                dtMrList.Columns.Add(new DataColumn("Designation", Type.GetType("System.String")));
                dtMrList.Columns.Add(new DataColumn("Level1Name", Type.GetType("System.String")));
                dtMrList.Columns.Add(new DataColumn("Level2Name", Type.GetType("System.String")));
                dtMrList.Columns.Add(new DataColumn("Level3Name", Type.GetType("System.String")));
                dtMrList.Columns.Add(new DataColumn("Level4Name", Type.GetType("System.String")));
                dtMrList.Columns.Add(new DataColumn("Level5Name", Type.GetType("System.String")));
                dtMrList.Columns.Add(new DataColumn("Level6Name", Type.GetType("System.String")));
                dtMrList.Columns.Add(new DataColumn("MobileNumber", Type.GetType("System.String")));
                dtMrList.Columns.Add(new DataColumn("Status", Type.GetType("System.Boolean")));

                #endregion

                #region Get Active Hierarchy Level

                List<DatabaseLayer.SQL.AppConfiguration> getLevelName =
                    _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

                #endregion

                #region Filter Record on the basis of Active Level

                if (getLevelName.Count != 0)
                {
                    hierarchyName = Convert.ToString(getLevelName[0].SettingName);
                    _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                    if (hierarchyName == "Level3")
                    {
                        #region Get Record Via Roles

                        if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level3Id = 0;
                            }
                            else
                            {
                                _level3Id = Convert.ToInt32(ddl1.SelectedValue);
                            }


                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level4Id = 0;
                            }
                            else
                            {
                                _level4Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl3.SelectedValue);
                            }

                            if (ddl4.SelectedValue == "-1" || ddl4.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl4.SelectedValue);
                            }

                            if (ddl44.SelectedValue == "-1" || ddl44.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl44.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl3")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level4Id = 0;
                            }
                            else
                            {
                                _level4Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl3.SelectedValue);
                            }

                            if (ddl33.SelectedValue == "-1" || ddl33.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl33.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl4")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl22.SelectedValue == "-1" || ddl22.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl22.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl5")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));

                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl11.SelectedValue == "-1" || ddl11.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl11.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl6")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                            employeeId = _currentUser.EmployeeId;

                            #endregion
                        }

                        #region Select Record on the basis of Days Select

                        _mrList = _dataContext.sp_MRList(_level3Id, _level4Id, _level5Id, _level6Id, employeeId).ToList();

                        #endregion

                        #endregion

                        #region Extract Data from Source

                        foreach (var mr in _mrList)
                        {
                            #region Get Hierarchy Levels Name + MR Name + Designation + Mobile Number + Status + LastUpdate Date

                            #region Insert Row to DataTable

                            dtMrList.Rows.Add(mr.EmployeeId, mr.EmployeeName, mr.DesignationName, level1Name, level2Name, mr.Level3Name, mr.Level4Name,
                                mr.Level5Name, mr.Level6Name, mr.MobileNumber, Convert.ToBoolean(mr.IsActive));

                            #endregion

                            #endregion
                        }

                        #endregion

                        #region Display Report

                        rpt.Load(Server.MapPath("MRs/MRs.rpt"));
                        rpt.SetDataSource(dtMrList);
                        Session["reportdoc"] = rpt;
                        CrystalReportViewer1.ReportSource = rpt;
                        rpt.ExportToDisk(ExportFormatType.PortableDocFormat, pdfFile1);
                        BtnEmail.Visible = true;
                        #endregion
                    }
                }

                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from MedicalRepresentativesList is " + exception.Message;
            }
        }

        private void MrDrList()
        {
            try
            {
                #region Initialization

                long employeeId = 0;
                int level3Id = 0, level4Id = 0, level5Id = 0, level6Id = 0;
                string hierarchyName = "", level1Name = "", level2Name = "";

                var dtMrDoctorList = new DataTable();

                #endregion

                #region Initialization of Custom DataTable columns
                XSDDatatable.Dsreports dsr = new XSDDatatable.Dsreports();

                dtMrDoctorList = dsr.Tables["MRDoctors"];
                #endregion

                #region Get Active Hierarchy Level

                List<DatabaseLayer.SQL.AppConfiguration> getLevelName =
                    _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

                #endregion

                #region Filter Record on the basis of Active Level

                if (getLevelName.Count != 0)
                {
                    hierarchyName = Convert.ToString(getLevelName[0].SettingName);
                    _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                    if (hierarchyName == "Level3")
                    {
                        #region Get Record Via Roles

                        if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level3Id = 0;
                            }
                            else
                            {
                                _level3Id = Convert.ToInt32(ddl1.SelectedValue);
                            }


                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level4Id = 0;
                            }
                            else
                            {
                                _level4Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl3.SelectedValue);
                            }

                            if (ddl4.SelectedValue == "-1" || ddl4.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl4.SelectedValue);
                            }

                            if (ddl44.SelectedValue == "-1" || ddl44.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl44.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl3")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level4Id = 0;
                            }
                            else
                            {
                                _level4Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl3.SelectedValue);
                            }

                            if (ddl33.SelectedValue == "-1" || ddl33.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl33.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl4")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl22.SelectedValue == "-1" || ddl22.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl22.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl5")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));

                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl11.SelectedValue == "-1" || ddl11.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl11.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl6")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                            employeeId = _currentUser.EmployeeId;

                            #endregion
                        }

                        #region Select Record on the basis of Days Select

                        _mrList = _dataContext.sp_MRList(_level3Id, _level4Id, _level5Id, _level6Id, employeeId).ToList();

                        #endregion

                        #endregion

                        #region Extract Data from Source

                        foreach (var mr in _mrList)
                        {
                            var getDoctorDetail = _dataContext.sp_DoctorsOfSpoSelectByEmployee(Convert.ToInt64(mr.EmployeeId), null, null, null).ToList();

                            if (getDoctorDetail.Count > 0)
                            {
                                foreach (var dr in getDoctorDetail)
                                {
                                    var getDoctor = _dataContext.sp_DoctorsSelect(Convert.ToInt64(dr.DoctorId), null, null, null).ToList();

                                    if (getDoctor.Count > 0)
                                    {
                                        var getDoctorLevel = _dataContext.sp_ParameterSelect("DoctorLevel").ToList();

                                        if (getDoctorLevel.Count > 0)
                                        {
                                            int level = Convert.ToInt32(getDoctorLevel[0].ParameterValue);

                                            if (level == 4)
                                            {
                                                string qualification = "", speciality = "";

                                                #region Qualification

                                                var getQualification = _dataContext.sp_QualificationsOfDoctorsSelect(Convert.ToInt64(dr.DoctorId)).ToList();

                                                if (getQualification.Count > 0)
                                                {
                                                    foreach (var qualifition in getQualification)
                                                    {
                                                        qualification += qualifition.QualificationName + ", ";
                                                    }
                                                }

                                                #endregion

                                                #region Speciality

                                                var getSpeciality = _dataContext.sp_DoctorSpecialitySelect(Convert.ToInt64(dr.DoctorId)).ToList();

                                                if (getSpeciality.Count > 0)
                                                {
                                                    speciality = getSpeciality[0].SpecialityName;

                                                }

                                                #endregion

                                                _getDoctorBrick = _dataContext.sp_DoctorInBrickSelect(null, Convert.ToInt64(dr.DoctorId)).ToList();

                                                if (_getDoctorBrick.Count > 0)
                                                {
                                                    dtMrDoctorList.Rows.Add(mr.EmployeeId, mr.EmployeeName, mr.DesignationName, level1Name, level2Name, mr.Level3Name, mr.Level4Name, mr.Level5Name, mr.Level6Name,
                                                        mr.MobileNumber, dr.DoctorCode, dr.DoctorName, qualification, dr.City, speciality, dr.Address1, dr.ClassName, "", _getDoctorBrick[0].LevelName, mr.EmployeeId + "- " + mr.EmployeeName,
                                                         Convert.ToBoolean(mr.IsActive));
                                                }
                                                else
                                                {
                                                    dtMrDoctorList.Rows.Add(mr.EmployeeId, mr.EmployeeName, mr.DesignationName, level1Name, level2Name, mr.Level3Name, mr.Level4Name, mr.Level5Name, mr.Level6Name,
                                                        mr.MobileNumber, dr.DoctorCode, dr.DoctorName, qualification, dr.City, speciality, dr.Address1, dr.ClassName, "", "-", mr.EmployeeId + "- " + mr.EmployeeName,
                                                         Convert.ToBoolean(mr.IsActive));
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        #endregion

                        #region Display Report

                        rpt.Load(Server.MapPath("MRDoctors/MRDoctors.rpt"));
                        rpt.SetDataSource(dtMrDoctorList);
                        Session["reportdoc"] = rpt;
                        CrystalReportViewer1.ReportSource = rpt;
                        rpt.ExportToDisk(ExportFormatType.PortableDocFormat, pdfFile1);
                        BtnEmail.Visible = true;
                        #endregion
                    }
                }

                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from MedicalRepresentatorDoctorList is " + exception.Message;
            }
        }

        private void DetailedProductFrequency()
        {

            long employeeId = 0, managerId = 0, doctorId = 0;
            int level3Id = 0, level4Id = 0, level5Id = 0, level6Id = 0, classId = 0, visitShiftId = 0, jointVisit = 0, currentDay = 0;
            string hierarchyName = "";
            NameValueCollection nv = new NameValueCollection();

            #region Get Active Hierarchy Level

            List<DatabaseLayer.SQL.AppConfiguration> getLevelName =
                _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

            #endregion

            XSDDatatable.Dsreports dsDcr = new XSDDatatable.Dsreports();
            DataTable dtDetailedProducts = dsDcr.Tables["DetailedProductsFrequency"];

            if (getLevelName.Count != 0)
            {
                hierarchyName = Convert.ToString(getLevelName[0].SettingName);
                _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                if (hierarchyName == "Level3")
                {
                    #region Common Features

                    visitShiftId = Convert.ToInt32(ddlVisitShift.SelectedValue);
                    jointVisit = Convert.ToInt32(ddlJointVisit.SelectedValue);
                    int counter = 0;

                    #endregion

                    #region Get Record Via Roles
                    if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
                    {
                        #region Employee Detail + Hierarchy Levels + Date

                        if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                        {
                            _level3Id = 0;
                        }
                        else
                        {
                            _level3Id = Convert.ToInt32(ddl1.SelectedValue);
                        }


                        if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                        {
                            _level4Id = 0;
                        }
                        else
                        {
                            _level4Id = Convert.ToInt32(ddl2.SelectedValue);
                        }

                        if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                        {
                            _level5Id = 0;
                        }
                        else
                        {
                            _level5Id = Convert.ToInt32(ddl3.SelectedValue);
                        }

                        if (ddl4.SelectedValue == "-1" || ddl4.SelectedValue == "")
                        {
                            _level6Id = 0;
                        }
                        else
                        {
                            _level6Id = Convert.ToInt32(ddl4.SelectedValue);
                        }

                        if (ddl44.SelectedValue == "-1" || ddl44.SelectedValue == "")
                        {
                            employeeId = 0;
                        }
                        else
                        {
                            employeeId = Convert.ToInt32(ddl44.SelectedValue);
                        }

                        #endregion
                    }
                    else if (_currentUserRole == "rl3")
                    {
                        #region Employee Detail + Hierarchy Levels + Date

                        this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                        if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                        {
                            _level4Id = 0;
                        }
                        else
                        {
                            _level4Id = Convert.ToInt32(ddl1.SelectedValue);
                        }

                        if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                        {
                            _level5Id = 0;
                        }
                        else
                        {
                            _level5Id = Convert.ToInt32(ddl2.SelectedValue);
                        }

                        if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                        {
                            _level6Id = 0;
                        }
                        else
                        {
                            _level6Id = Convert.ToInt32(ddl3.SelectedValue);
                        }

                        if (ddl33.SelectedValue == "-1" || ddl33.SelectedValue == "")
                        {
                            employeeId = 0;
                        }
                        else
                        {
                            employeeId = Convert.ToInt32(ddl33.SelectedValue);
                        }

                        #endregion
                    }
                    else if (_currentUserRole == "rl4")
                    {
                        #region Employee Detail + Hierarchy Levels + Date

                        this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                        if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                        {
                            _level5Id = 0;
                        }
                        else
                        {
                            _level5Id = Convert.ToInt32(ddl1.SelectedValue);
                        }

                        if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                        {
                            _level6Id = 0;
                        }
                        else
                        {
                            _level6Id = Convert.ToInt32(ddl2.SelectedValue);
                        }

                        if (ddl22.SelectedValue == "-1" || ddl22.SelectedValue == "")
                        {
                            employeeId = 0;
                        }
                        else
                        {
                            employeeId = Convert.ToInt32(ddl22.SelectedValue);
                        }

                        #endregion
                    }
                    else if (_currentUserRole == "rl5")
                    {
                        #region Employee Detail + Hierarchy Levels + Date

                        this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));

                        if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                        {
                            _level6Id = 0;
                        }
                        else
                        {
                            _level6Id = Convert.ToInt32(ddl1.SelectedValue);
                        }

                        if (ddl11.SelectedValue == "-1" || ddl11.SelectedValue == "")
                        {
                            employeeId = 0;
                        }
                        else
                        {
                            employeeId = Convert.ToInt32(ddl11.SelectedValue);
                        }

                        #endregion
                    }
                    else if (_currentUserRole == "rl6")
                    {
                        #region Employee Detail + Hierarchy Levels + Date

                        this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                        employeeId = _currentUser.EmployeeId;

                        #endregion
                    }

                    #endregion

                    #region Extract Records

                    nv.Add("@Level3ID-INT", _level3Id.ToString());
                    nv.Add("@Level4ID-INT", _level4Id.ToString());
                    nv.Add("@Level5ID-INT", _level5Id.ToString());
                    nv.Add("@Level6ID-INT", _level6Id.ToString());
                    nv.Add("@EmployeeID-INT", employeeId.ToString());
                    nv.Add("@DocID-INT", doctorId.ToString());
                    nv.Add("@vistTime-varchar-5", ddlVisitShift.SelectedValue.ToString());
                    nv.Add("@JV-varchar-5", jointVisit.ToString());
                    if (txtStartingDate.Text == "")
                    {
                        nv.Add("@Date-date", "NULL");
                    }
                    else
                    {
                        nv.Add("@Date-date", txtStartingDate.Text.ToString());
                    }

                    DataSet ds = GetData("sp_DetailedProductfreq", nv);

                    int dayOfMonth = 0;
                    int flagBegin = 0;
                    int flag = 0;
                    int flag2 = 0;
                    int qty = 0;
                    int total = 0;
                    string strRegion = "";
                    string mrName = "";
                    string product = "";
                    DataRow dr = null;

                    if (ds != null)
                        if (ds.Tables[0].Rows.Count != 0)
                        {
                            foreach (DataRow drw in ds.Tables[0].Rows)
                            {
                                if (strRegion == Convert.ToString(drw["Region"])
                   && mrName == Convert.ToString(drw["MR_Name"])
                   && product == Convert.ToString(drw["Product"])
                   )
                                {
                                    dayOfMonth = Convert.ToInt32(drw["DayOfMonth"]);
                                    strRegion = Convert.ToString(drw["Region"]);
                                    mrName = Convert.ToString(drw["MR_Name"]);
                                    product = Convert.ToString(drw["Product"]);
                                    qty = Convert.ToInt32(drw["Qty"]);
                                    total = total + qty;
                                    dr["Region"] = strRegion;
                                    dr["MR_Name"] = mrName;
                                    dr["Dateofdata"] = Convert.ToDateTime(txtStartingDate.Text);
                                    dr["Product"] = product;
                                    dr["Division"] = Convert.ToString(drw["Division"]);
                                    dr["Zone"] = Convert.ToString(drw["Zone"]);
                                    dr["MRIdName"] = Convert.ToString(drw["MRIdName"]);
                                    dr["MRCell"] = Convert.ToString(drw["MRCell"]);
                                    dr["Qty" + dayOfMonth] = Convert.ToString(qty);
                                    flag = 1;
                                    flag2 = 0;
                                }
                                else
                                {
                                    if ((flagBegin == 1 && flag == 1) || (flag2 == 1))
                                    {
                                        dr["Total"] = Convert.ToInt32(total);
                                        dtDetailedProducts.Rows.Add(dr);
                                        flag = 0;
                                        total = 0;
                                    }
                                    flagBegin = 1;
                                    flag2 = 1;
                                    dr = dtDetailedProducts.NewRow();
                                    dayOfMonth = Convert.ToInt32(drw["DayOfMonth"]);
                                    strRegion = Convert.ToString(drw["Region"]);
                                    mrName = Convert.ToString(drw["MR_Name"]);
                                    product = Convert.ToString(drw["Product"]);

                                    qty = Convert.ToInt32(drw["Qty"]);
                                    total = total + qty;
                                    dr["Region"] = strRegion;
                                    dr["MR_Name"] = mrName;
                                    dr["Dateofdata"] = Convert.ToDateTime(txtStartingDate.Text);
                                    dr["Product"] = product;
                                    dr["Division"] = Convert.ToString(drw["Division"]);
                                    dr["Zone"] = Convert.ToString(drw["Zone"]);
                                    dr["MRIdName"] = Convert.ToString(drw["MRIdName"]);
                                    dr["MRCell"] = Convert.ToString(drw["MRCell"]);
                                    dr["Qty" + dayOfMonth] = Convert.ToString(qty);
                                }


                            }
                            if (flag == 1 || flag2 == 1)
                            {
                                dr["Total"] = Convert.ToString(total);
                                dtDetailedProducts.Rows.Add(dr);
                            }


                        }

                    rpt.Load(Server.MapPath("DetailedProductFrequency/DetailedProductFreq.rpt"));
                    rpt.SetDataSource(dtDetailedProducts);
                    Session["reportdoc"] = rpt;
                    CrystalReportViewer1.ReportSource = rpt;
                    rpt.ExportToDisk(ExportFormatType.PortableDocFormat, pdfFile1);
                    BtnEmail.Visible = true;
                    #endregion
                }
            }
        }

        private void DetailedProductFrequencyByDivision()
        {

            long employeeId = 0, managerId = 0, doctorId = 0;
            int level3Id = 0, level4Id = 0, level5Id = 0, level6Id = 0, classId = 0, visitShiftId = 0, jointVisit = 0, currentDay = 0;
            string hierarchyName = "";
            NameValueCollection nv = new NameValueCollection();

            #region Get Active Hierarchy Level

            List<DatabaseLayer.SQL.AppConfiguration> getLevelName =
                _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

            #endregion

            XSDDatatable.Dsreports dsDcr = new XSDDatatable.Dsreports();
            DataTable dtDetailedProducts = dsDcr.Tables["DetailedProductsFrequency"];

            if (getLevelName.Count != 0)
            {
                hierarchyName = Convert.ToString(getLevelName[0].SettingName);
                _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                if (hierarchyName == "Level3")
                {
                    #region Common Features

                    visitShiftId = Convert.ToInt32(ddlVisitShift.SelectedValue);
                    jointVisit = Convert.ToInt32(ddlJointVisit.SelectedValue);
                    int counter = 0;

                    #endregion

                    #region Get Record Via Roles
                    if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
                    {
                        #region Employee Detail + Hierarchy Levels + Date

                        if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                        {
                            _level3Id = 0;
                        }
                        else
                        {
                            _level3Id = Convert.ToInt32(ddl1.SelectedValue);
                        }


                        if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                        {
                            _level4Id = 0;
                        }
                        else
                        {
                            _level4Id = Convert.ToInt32(ddl2.SelectedValue);
                        }

                        if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                        {
                            _level5Id = 0;
                        }
                        else
                        {
                            _level5Id = Convert.ToInt32(ddl3.SelectedValue);
                        }

                        if (ddl4.SelectedValue == "-1" || ddl4.SelectedValue == "")
                        {
                            _level6Id = 0;
                        }
                        else
                        {
                            _level6Id = Convert.ToInt32(ddl4.SelectedValue);
                        }

                        if (ddl44.SelectedValue == "-1" || ddl44.SelectedValue == "")
                        {
                            employeeId = 0;
                        }
                        else
                        {
                            employeeId = Convert.ToInt32(ddl44.SelectedValue);
                        }

                        #endregion
                    }
                    else if (_currentUserRole == "rl3")
                    {
                        #region Employee Detail + Hierarchy Levels + Date

                        this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                        if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                        {
                            _level4Id = 0;
                        }
                        else
                        {
                            _level4Id = Convert.ToInt32(ddl1.SelectedValue);
                        }

                        if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                        {
                            _level5Id = 0;
                        }
                        else
                        {
                            _level5Id = Convert.ToInt32(ddl2.SelectedValue);
                        }

                        if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                        {
                            _level6Id = 0;
                        }
                        else
                        {
                            _level6Id = Convert.ToInt32(ddl3.SelectedValue);
                        }

                        if (ddl33.SelectedValue == "-1" || ddl33.SelectedValue == "")
                        {
                            employeeId = 0;
                        }
                        else
                        {
                            employeeId = Convert.ToInt32(ddl33.SelectedValue);
                        }

                        #endregion
                    }
                    else if (_currentUserRole == "rl4")
                    {
                        #region Employee Detail + Hierarchy Levels + Date

                        this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                        if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                        {
                            _level5Id = 0;
                        }
                        else
                        {
                            _level5Id = Convert.ToInt32(ddl1.SelectedValue);
                        }

                        if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                        {
                            _level6Id = 0;
                        }
                        else
                        {
                            _level6Id = Convert.ToInt32(ddl2.SelectedValue);
                        }

                        if (ddl22.SelectedValue == "-1" || ddl22.SelectedValue == "")
                        {
                            employeeId = 0;
                        }
                        else
                        {
                            employeeId = Convert.ToInt32(ddl22.SelectedValue);
                        }

                        #endregion
                    }
                    else if (_currentUserRole == "rl5")
                    {
                        #region Employee Detail + Hierarchy Levels + Date

                        this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));

                        if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                        {
                            _level6Id = 0;
                        }
                        else
                        {
                            _level6Id = Convert.ToInt32(ddl1.SelectedValue);
                        }

                        if (ddl11.SelectedValue == "-1" || ddl11.SelectedValue == "")
                        {
                            employeeId = 0;
                        }
                        else
                        {
                            employeeId = Convert.ToInt32(ddl11.SelectedValue);
                        }

                        #endregion
                    }
                    else if (_currentUserRole == "rl6")
                    {
                        #region Employee Detail + Hierarchy Levels + Date

                        this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                        employeeId = _currentUser.EmployeeId;

                        #endregion
                    }

                    #endregion

                    #region Extract Records

                    nv.Add("@Level3ID-INT", _level3Id.ToString());
                    nv.Add("@Level4ID-INT", _level4Id.ToString());
                    nv.Add("@Level5ID-INT", _level5Id.ToString());
                    nv.Add("@Level6ID-INT", _level6Id.ToString());
                    nv.Add("@EmployeeID-INT", employeeId.ToString());
                    nv.Add("@DocID-INT", doctorId.ToString());
                    nv.Add("@vistTime-varchar-5", ddlVisitShift.SelectedValue.ToString());
                    nv.Add("@JV-varchar-5", jointVisit.ToString());
                    if (txtStartingDate.Text == "")
                    {
                        nv.Add("@Date-date", "NULL");
                    }
                    else
                    {
                        nv.Add("@Date-date", txtStartingDate.Text.ToString());
                    }

                    DataSet ds = GetData("sp_DetailProdctFreqByDivision", nv);

                    int dayOfMonth = 0;
                    int flagBegin = 0;
                    int flag = 0;
                    int flag2 = 0;
                    int qty = 0;
                    int total = 0;
                    string strRegion = "";
                    string mrName = "";
                    string product = "";
                    string division = "";
                    DataRow dr = null;

                    if (ds != null)
                        if (ds.Tables[0].Rows.Count != 0)
                        {
                            foreach (DataRow drw in ds.Tables[0].Rows)
                            {
                                if ((product == Convert.ToString(drw["Product"]))
                               && (division == Convert.ToString(drw["Division"]))
                              )
                                {
                                    dayOfMonth = Convert.ToInt32(drw["DayOfMonth"]);
                                    division = Convert.ToString(drw["Division"]);
                                    product = Convert.ToString(drw["Product"]);
                                    qty = Convert.ToInt32(drw["Qty"]);
                                    total = total + qty;
                                    dr["Product"] = product;
                                    dr["Division"] = division;
                                    dr["Qty" + dayOfMonth] = Convert.ToString(qty);
                                    flag = 1;
                                    flag2 = 0;
                                }
                                else
                                {
                                    if ((flagBegin == 1 && flag == 1) || (flag2 == 1))
                                    {
                                        dr["Total"] = Convert.ToInt32(total);
                                        dtDetailedProducts.Rows.Add(dr);
                                        flag = 0;
                                        total = 0;
                                    }
                                    flagBegin = 1;
                                    flag2 = 1;
                                    dr = dtDetailedProducts.NewRow();
                                    dayOfMonth = Convert.ToInt32(drw["DayOfMonth"]);
                                    division = Convert.ToString(drw["Division"]);
                                    product = Convert.ToString(drw["Product"]);

                                    qty = Convert.ToInt32(drw["Qty"]);
                                    total = total + qty;
                                    dr["Division"] = division;
                                    dr["Product"] = product;
                                    dr["Qty" + dayOfMonth] = Convert.ToString(qty);
                                }

                            }
                            if (flag == 1 || flag2 == 1)
                            {
                                dr["Total"] = Convert.ToString(total);
                                dtDetailedProducts.Rows.Add(dr);
                            }
                        }
                    rpt.Load(Server.MapPath("DetailedProductFrequency/DetailedProductFreq.rpt"));
                    
                    rpt.SetDataSource(dtDetailedProducts);
                    Session["reportdoc"] = rpt;
                    CrystalReportViewer1.ReportSource = rpt;
                    rpt.ExportToDisk(ExportFormatType.PortableDocFormat, pdfFile1);
                    BtnEmail.Visible = true;
                    #endregion
                }
            }
        }

        private void JVReport()
        {

            long employeeId = 0, managerId = 0, doctorId = 0;
            int level3Id = 0, level4Id = 0, level5Id = 0, level6Id = 0, classId = 0, visitShiftId = 0, jointVisit = 0, currentDay = 0;
            string hierarchyName = "";
            NameValueCollection nv = new NameValueCollection();

            #region Get Active Hierarchy Level

            List<DatabaseLayer.SQL.AppConfiguration> getLevelName =
                _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

            #endregion

            XSDDatatable.Dsreports dsDcr = new XSDDatatable.Dsreports();
            DataTable dtJVReport = dsDcr.Tables["JVReport"];

            if (getLevelName.Count != 0)
            {
                hierarchyName = Convert.ToString(getLevelName[0].SettingName);
                _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                if (hierarchyName == "Level3")
                {
                    #region Common Features

                    visitShiftId = Convert.ToInt32(ddlVisitShift.SelectedValue);
                    jointVisit = Convert.ToInt32(ddlJointVisit.SelectedValue);
                    int counter = 0;

                    #endregion

                    #region Get Record Via Roles
                    if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
                    {
                        #region Employee Detail + Hierarchy Levels + Date

                        if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                        {
                            _level3Id = 0;
                        }
                        else
                        {
                            _level3Id = Convert.ToInt32(ddl1.SelectedValue);
                        }


                        if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                        {
                            _level4Id = 0;
                        }
                        else
                        {
                            _level4Id = Convert.ToInt32(ddl2.SelectedValue);
                        }

                        if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                        {
                            _level5Id = 0;
                        }
                        else
                        {
                            _level5Id = Convert.ToInt32(ddl3.SelectedValue);
                        }

                        if (ddl4.SelectedValue == "-1" || ddl4.SelectedValue == "")
                        {
                            _level6Id = 0;
                        }
                        else
                        {
                            _level6Id = Convert.ToInt32(ddl4.SelectedValue);
                        }

                        if (ddl44.SelectedValue == "-1" || ddl44.SelectedValue == "")
                        {
                            employeeId = 0;
                        }
                        else
                        {
                            employeeId = Convert.ToInt32(ddl44.SelectedValue);
                        }

                        #endregion
                    }
                    else if (_currentUserRole == "rl3")
                    {
                        #region Employee Detail + Hierarchy Levels + Date

                        this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                        if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                        {
                            _level4Id = 0;
                        }
                        else
                        {
                            _level4Id = Convert.ToInt32(ddl1.SelectedValue);
                        }

                        if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                        {
                            _level5Id = 0;
                        }
                        else
                        {
                            _level5Id = Convert.ToInt32(ddl2.SelectedValue);
                        }

                        if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                        {
                            _level6Id = 0;
                        }
                        else
                        {
                            _level6Id = Convert.ToInt32(ddl3.SelectedValue);
                        }

                        if (ddl33.SelectedValue == "-1" || ddl33.SelectedValue == "")
                        {
                            employeeId = 0;
                        }
                        else
                        {
                            employeeId = Convert.ToInt32(ddl33.SelectedValue);
                        }

                        #endregion
                    }
                    else if (_currentUserRole == "rl4")
                    {
                        #region Employee Detail + Hierarchy Levels + Date

                        this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                        if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                        {
                            _level5Id = 0;
                        }
                        else
                        {
                            _level5Id = Convert.ToInt32(ddl1.SelectedValue);
                        }

                        if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                        {
                            _level6Id = 0;
                        }
                        else
                        {
                            _level6Id = Convert.ToInt32(ddl2.SelectedValue);
                        }

                        if (ddl22.SelectedValue == "-1" || ddl22.SelectedValue == "")
                        {
                            employeeId = 0;
                        }
                        else
                        {
                            employeeId = Convert.ToInt32(ddl22.SelectedValue);
                        }

                        #endregion
                    }
                    else if (_currentUserRole == "rl5")
                    {
                        #region Employee Detail + Hierarchy Levels + Date

                        this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));

                        if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                        {
                            _level6Id = 0;
                        }
                        else
                        {
                            _level6Id = Convert.ToInt32(ddl1.SelectedValue);
                        }

                        if (ddl11.SelectedValue == "-1" || ddl11.SelectedValue == "")
                        {
                            employeeId = 0;
                        }
                        else
                        {
                            employeeId = Convert.ToInt32(ddl11.SelectedValue);
                        }

                        #endregion
                    }
                    else if (_currentUserRole == "rl6")
                    {
                        #region Employee Detail + Hierarchy Levels + Date

                        this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                        employeeId = _currentUser.EmployeeId;

                        #endregion
                    }

                    #endregion

                    #region Extract Records

                    nv.Add("@Level3ID-INT", _level3Id.ToString());
                    nv.Add("@Level4ID-INT", _level4Id.ToString());
                    nv.Add("@Level5ID-INT", _level5Id.ToString());
                    nv.Add("@Level6ID-INT", _level6Id.ToString());
                    nv.Add("@EmployeeID-INT", employeeId.ToString());
                    nv.Add("@DocID-INT", doctorId.ToString());
                    nv.Add("@vistTime-varchar-5", ddlVisitShift.SelectedValue.ToString());
                    nv.Add("@JV-varchar-5", jointVisit.ToString());
                    if (txtStartingDate.Text == "")
                    {
                        nv.Add("@Date-date", "NULL");
                    }
                    else
                    {
                        nv.Add("@Date-date", txtStartingDate.Text.ToString());
                    }

                    DataSet ds = GetData("crmreport_JVReport", nv);

                    int dayOfMonth = 0;
                    int flagBegin = 0;
                    int flag = 0;
                    int flag2 = 0;
                    int qty = 0;
                    int total = 0;
                    string strRegion = "";
                    string mrName = "";
                    string ZSM = "";
                    DataRow dr = null;

                    if (ds != null)
                        if (ds.Tables[0].Rows.Count != 0)
                        {
                            foreach (DataRow drw in ds.Tables[0].Rows)
                            {
                                if (strRegion == Convert.ToString(drw["Region"])
                                    && mrName == Convert.ToString(drw["MR_Name"])
                                    && ZSM == Convert.ToString(drw["EmployeeId"]))
                                {
                                    dayOfMonth = Convert.ToInt32(drw["DayOfMonth"]);
                                    strRegion = Convert.ToString(drw["Region"]);
                                    mrName = Convert.ToString(drw["MR_Name"]);
                                    ZSM = Convert.ToString(drw["EmployeeId"]);
                                    qty = Convert.ToInt32(drw["Qty"]);
                                    total = total + qty;
                                    dr["Region"] = strRegion;
                                    dr["MR_Name"] = mrName;
                                    dr["Division"] = Convert.ToString(drw["Division"]);
                                    dr["Zone"] = Convert.ToString(drw["Zone"]);
                                    dr["MRIdName"] = Convert.ToString(drw["MRIdName"]);
                                    dr["MRCell"] = Convert.ToString(drw["MRCell"]);
                                    dr["Qty" + dayOfMonth] = Convert.ToString(qty);
                                    flag = 1;
                                    flag2 = 0;
                                }
                                else
                                {
                                    if ((flagBegin == 1 && flag == 1) || (flag2 == 1))
                                    {
                                        dr["Total"] = Convert.ToInt32(total);
                                        dtJVReport.Rows.Add(dr);
                                        flag = 0;
                                        total = 0;
                                    }
                                    flagBegin = 1;
                                    flag2 = 1;
                                    dr = dtJVReport.NewRow();
                                    dayOfMonth = Convert.ToInt32(drw["DayOfMonth"]);
                                    strRegion = Convert.ToString(drw["Region"]);
                                    mrName = Convert.ToString(drw["MR_Name"]);
                                    ZSM = Convert.ToString(drw["EmployeeId"]);
                                    qty = Convert.ToInt32(drw["Qty"]);
                                    total = total + qty;
                                    dr["Region"] = strRegion;
                                    dr["MR_Name"] = mrName;
                                    dr["Division"] = Convert.ToString(drw["Division"]);
                                    dr["Zone"] = Convert.ToString(drw["Zone"]);
                                    dr["MRIdName"] = Convert.ToString(drw["MRIdName"]);
                                    dr["MRCell"] = Convert.ToString(drw["MRCell"]);
                                    dr["Qty" + dayOfMonth] = Convert.ToString(qty);
                                }

                            }
                            if (flag == 1 || flag2 == 1)
                            {
                                dr["Total"] = Convert.ToString(total);
                                dtJVReport.Rows.Add(dr);
                            }


                        }
                    rpt.Load(Server.MapPath("JVReport/JVReport.rpt"));
                    rpt.SetDataSource(dtJVReport);
                    Session["reportdoc"] = rpt;
                    CrystalReportViewer1.ReportSource = rpt;
                    rpt.ExportToDisk(ExportFormatType.PortableDocFormat, pdfFile1);
                    BtnEmail.Visible = true;
                    #endregion
                }
            }
        }

        private void JVByRegion()
        {
            try
            {
                #region Initialization

                long employeeId = 0, doctorId = 0;
                int level3Id = 0, level4Id = 0, level5Id = 0, level6Id = 0, productId = 0, visitShiftId = 0, sampleQuantity = 0;
                string hierarchyName = "", level1Name = "", level2Name = "", level3Name = "", level4Name = "", level5Name = "", level6Name = "",
                    employeeName = "", mobileNumber = "", doctorName = "", sample = "";
                DateTime visitDate;

                List<HierarchyLevel3> getLevel3Name;
                List<HierarchyLevel4> getLevel4Name;
                List<HierarchyLevel5> getLevel5Name;
                List<HierarchyLevel6> getLevel6Name;

                var dtJVbyRegion = new DataTable();

                #endregion

                #region Initialization of Custom DataTable columns

                XSDDatatable.Dsreports dsc = new XSDDatatable.Dsreports();
                dtJVbyRegion = dsc.Tables["JVbyRegion"];


                #endregion

                #region Get Active Hierarchy Level

                List<DatabaseLayer.SQL.AppConfiguration> getLevelName =
                    _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

                #endregion

                #region Filter Record on the basis of Active Level

                if (getLevelName.Count != 0)
                {
                    hierarchyName = Convert.ToString(getLevelName[0].SettingName);
                    _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                    if (hierarchyName == "Level3")
                    {
                        #region Common Features
                        if (ddlDoctor.SelectedValue != "")
                            if (ddlDoctor.SelectedValue != "-1")
                            {
                                doctorId = Convert.ToInt64(ddlDoctor.SelectedValue);
                            }
                            else
                            {
                                doctorId = 0;
                            }
                        else
                        {
                            doctorId = 0;
                        }
                        if (ddlProduct.SelectedValue != "")
                            if (ddlProduct.SelectedValue != "-1")
                            {
                                productId = Convert.ToInt32(ddlProduct.SelectedValue);
                            }
                            else
                            {
                                productId = 0;
                            }
                        else
                        {
                            productId = 0;
                        }

                        if (ddlVisitShift.SelectedValue != "")
                            if (ddlVisitShift.SelectedValue != "-1")
                            {
                                visitShiftId = Convert.ToInt32(ddlVisitShift.SelectedValue);
                            }
                            else
                            {
                                visitShiftId = 0;
                            }
                        else
                        {
                            visitShiftId = 0;
                        }
                        #endregion

                        #region Get Record Via Roles
                        if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level3Id = 0;
                            }
                            else
                            {
                                _level3Id = Convert.ToInt32(ddl1.SelectedValue);
                            }


                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level4Id = 0;
                            }
                            else
                            {
                                _level4Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl3.SelectedValue);
                            }

                            if (ddl4.SelectedValue == "-1" || ddl4.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl4.SelectedValue);
                            }

                            if (ddl44.SelectedValue == "-1" || ddl44.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl44.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl3")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level4Id = 0;
                            }
                            else
                            {
                                _level4Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl3.SelectedValue);
                            }

                            if (ddl33.SelectedValue == "-1" || ddl33.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl33.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl4")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl22.SelectedValue == "-1" || ddl22.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl22.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl5")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));

                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl11.SelectedValue == "-1" || ddl11.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl11.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl6")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                            employeeId = _currentUser.EmployeeId;

                            #endregion
                        }

                        #endregion

                        _nvCollection.Clear();
                        _nvCollection.Add("@Level3ID-int", _level3Id.ToString());
                        _nvCollection.Add("@Level4ID-int", _level4Id.ToString());
                        _nvCollection.Add("@Level5ID-int", _level5Id.ToString());
                        _nvCollection.Add("@Level6ID-int", _level6Id.ToString());
                        _nvCollection.Add("@EmployeeID-int", employeeId.ToString());
                        _nvCollection.Add("@DocID-int", doctorId.ToString());
                        _nvCollection.Add("@vistTime-int", visitShiftId.ToString());
                        _nvCollection.Add("@JV-int", "1");
                        _nvCollection.Add("@Date-date", Convert.ToDateTime(txtStartingDate.Text).ToString());

                        #region Extract Data from Source
                        DataSet ds = GetData("SP_JVByRegion", _nvCollection);
                        dtJVbyRegion = ds.Tables[0];
                        #endregion

                        #region Display Report

                        rpt.Load(Server.MapPath("JVByRegion/JVByRegion.rpt"));
                        rpt.SetDataSource(dtJVbyRegion);
                        Session["reportdoc"] = rpt;
                        CrystalReportViewer1.ReportSource = rpt;
                        rpt.ExportToDisk(ExportFormatType.PortableDocFormat, pdfFile1);
                        BtnEmail.Visible = true;

                        #endregion

                    }
                }

                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from JV BY Region is " + exception.Message;
            }

        }

        #region Depot Report Work

        private void DepotReport()
        {
            try
            {
                getdate();
                getEmployeedata2();
            }
            catch (Exception ex)
            {

            }
        }

        private void getEmployeedata2()
        {

            long employeeId = 0, managerId = 0, doctorId = 0;
            int level3Id = 0, level4Id = 0, level5Id = 0, level6Id = 0, classId = 0, visitShiftId = 0, jointVisit = 0, currentDay = 0;
            string hierarchyName = "";


            #region Get Active Hierarchy Level

            List<DatabaseLayer.SQL.AppConfiguration> getLevelName =
                _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

            #endregion

            string secdate = DateTime.Today.ToShortDateString();

            #region
            string userid = "38", EMPname = "", SKUname = "", empAddress = "", DisDate = "", MIORec = "0";
            int? Qut_Qty = null, Planqty = null, MIOid = null, SKUID = null, IssueQty = null, DisQty = null, BalQty = null, RecNo = null;
            NameValueCollection nv = new NameValueCollection();
            DateTime QuaterDate1 = new DateTime(DateTime.Now.Year, Convert.ToInt32(QMonth1), 1);
            DateTime QuarterDate2 = new DateTime(DateTime.Now.Year, Convert.ToInt32(QMonth2), 1);
            DateTime QuarterDate3 = new DateTime(DateTime.Now.Year, Convert.ToInt32(QMonth3), 1);
            string planqty1, planqty2, Planqty3;
            string DistributedQty1 = "0", DistributedQty2 = "0", DistributedQty3 = "0";
            string CallQty1 = "0", CallQty2 = "0", CallQty3 = "0";
            #endregion

            XSDDatatable.Dsreports dsDcr = new XSDDatatable.Dsreports();
            DataTable dt = dsDcr.Tables["DepotReport"];


            if (getLevelName.Count != 0)
            {
                hierarchyName = Convert.ToString(getLevelName[0].SettingName);
                _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                if (hierarchyName == "Level3")
                {
                    #region Common Features

                    visitShiftId = Convert.ToInt32(ddlVisitShift.SelectedValue);
                    jointVisit = Convert.ToInt32(ddlJointVisit.SelectedValue);
                    int counter = 0;

                    #endregion

                    #region Get Record Via Roles
                    if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
                    {
                        #region Employee Detail + Hierarchy Levels + Date

                        if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                        {
                            _level3Id = 0;
                        }
                        else
                        {
                            _level3Id = Convert.ToInt32(ddl1.SelectedValue);
                        }


                        if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                        {
                            _level4Id = 0;
                        }
                        else
                        {
                            _level4Id = Convert.ToInt32(ddl2.SelectedValue);
                        }

                        if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                        {
                            _level5Id = 0;
                        }
                        else
                        {
                            _level5Id = Convert.ToInt32(ddl3.SelectedValue);
                        }

                        if (ddl4.SelectedValue == "-1" || ddl4.SelectedValue == "")
                        {
                            _level6Id = 0;
                        }
                        else
                        {
                            _level6Id = Convert.ToInt32(ddl4.SelectedValue);
                        }

                        if (ddl44.SelectedValue == "-1" || ddl44.SelectedValue == "")
                        {
                            employeeId = 0;
                        }
                        else
                        {
                            employeeId = Convert.ToInt32(ddl44.SelectedValue);
                        }

                        #endregion
                    }
                    else if (_currentUserRole == "rl3")
                    {
                        #region Employee Detail + Hierarchy Levels + Date

                        this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                        if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                        {
                            _level4Id = 0;
                        }
                        else
                        {
                            _level4Id = Convert.ToInt32(ddl1.SelectedValue);
                        }

                        if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                        {
                            _level5Id = 0;
                        }
                        else
                        {
                            _level5Id = Convert.ToInt32(ddl2.SelectedValue);
                        }

                        if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                        {
                            _level6Id = 0;
                        }
                        else
                        {
                            _level6Id = Convert.ToInt32(ddl3.SelectedValue);
                        }

                        if (ddl33.SelectedValue == "-1" || ddl33.SelectedValue == "")
                        {
                            employeeId = 0;
                        }
                        else
                        {
                            employeeId = Convert.ToInt32(ddl33.SelectedValue);
                        }

                        #endregion
                    }
                    else if (_currentUserRole == "rl4")
                    {
                        #region Employee Detail + Hierarchy Levels + Date

                        this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                        if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                        {
                            _level5Id = 0;
                        }
                        else
                        {
                            _level5Id = Convert.ToInt32(ddl1.SelectedValue);
                        }

                        if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                        {
                            _level6Id = 0;
                        }
                        else
                        {
                            _level6Id = Convert.ToInt32(ddl2.SelectedValue);
                        }

                        if (ddl22.SelectedValue == "-1" || ddl22.SelectedValue == "")
                        {
                            employeeId = 0;
                        }
                        else
                        {
                            employeeId = Convert.ToInt32(ddl22.SelectedValue);
                        }

                        #endregion
                    }
                    else if (_currentUserRole == "rl5")
                    {
                        #region Employee Detail + Hierarchy Levels + Date

                        this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));

                        if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                        {
                            _level6Id = 0;
                        }
                        else
                        {
                            _level6Id = Convert.ToInt32(ddl1.SelectedValue);
                        }

                        if (ddl11.SelectedValue == "-1" || ddl11.SelectedValue == "")
                        {
                            employeeId = 0;
                        }
                        else
                        {
                            employeeId = Convert.ToInt32(ddl11.SelectedValue);
                        }

                        #endregion
                    }
                    else if (_currentUserRole == "rl6")
                    {
                        #region Employee Detail + Hierarchy Levels + Date

                        this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                        employeeId = _currentUser.EmployeeId;

                        #endregion
                    }

                    #endregion

                    MIOid = Convert.ToInt32(userid);

                    DataSet ds1 = GetData("sp_ProductsSelect_all", null);

                    #region GET ALL SKU
                    if (ds1 != null)
                    {
                        if (ds1.Tables[0].Rows.Count > 0)
                        {
                            for (int ii = 0; ii <= ds1.Tables[0].Rows.Count - 2; ii++) // ALL SKU
                            {
                                SKUID = Convert.ToInt32(ds1.Tables[0].Rows[ii]["ProductId"]); // from Product Table
                                SKUname = ds1.Tables[0].Rows[ii]["Skuname"].ToString();
                                IssueQty = null; Planqty = null; Qut_Qty = null;

                                DisDate = DateTime.Today.Date.ToShortDateString();

                                #region GET ALL SKU + Markting Plan with Date
                                nv.Clear();
                                nv.Add("Skuid-int", SKUID.ToString());
                                nv.Add("FromDate-date", Cfirstdate.ToString());
                                nv.Add("ToDate-date", Csecdate.ToString());
                                DataSet ds3 = GetData("sp_M_Team_EnterySelect", nv);
                                if (ds3 != null)
                                {
                                    if (ds3.Tables[0].Rows.Count > 0)
                                    {
                                        Planqty = Convert.ToInt32(ds3.Tables[0].Rows[0]["Qty"]); // tbl_M_team_entery
                                        Qut_Qty = Convert.ToInt32(ds3.Tables[0].Rows[0]["Qty"]); // tbl_M_team_entery
                                        Planqty = Planqty / 3;
                                        planqty1 = Planqty.ToString();
                                        planqty2 = Planqty.ToString();
                                        Planqty3 = Planqty.ToString();
                                        BalQty = Qut_Qty;

                                        #region GET ALL issuance with Date
                                        nv.Clear();
                                        nv.Add("Skuid-int", SKUID.ToString());
                                        nv.Add("mioid-int", employeeId.ToString());
                                        nv.Add("FromDate-date", Cfirstdate.ToString());
                                        nv.Add("ToDate-date", Csecdate.ToString());
                                        nv.Add("Level3ID-int", _level3Id.ToString());
                                        nv.Add("Level4ID-int", _level4Id.ToString());
                                        nv.Add("Level5ID-int", _level5Id.ToString());
                                        nv.Add("Level6ID-int", _level6Id.ToString());
                                        nv.Add("EmployeeID-int", employeeId.ToString());

                                        DataSet ds4 = GetData("sp_SelectDistributedSample", nv);
                                        DataSet ds5 = GetData("sp_selectMIOSKUCall", nv);

                                        if (ds4 != null)
                                            if (ds5 != null)
                                            {
                                                string Fdate = "", Sdate = "", Tdate = "";
                                                int? FQty = 0, SQty = 0, TQty = 0, xyx = 0;
                                                RecNo = null;

                                                #region One Recored
                                                if (ds4.Tables[0].Rows.Count != 0)
                                                {
                                                    for (int i = 0; i <= ds4.Tables[0].Rows.Count - 1; i++)
                                                    {
                                                        if (QMonth1 == Convert.ToDateTime(ds4.Tables[0].Rows[i]["Dis_Date"]).Month.ToString())
                                                        {
                                                            Fdate = Convert.ToDateTime(ds4.Tables[0].Rows[i]["Dis_Date"]).Date.ToShortDateString();
                                                            EMPname = ds4.Tables[0].Rows[i]["MR_Name"].ToString();
                                                            DistributedQty1 = ds4.Tables[0].Rows[i]["TOTALQTYISSUED"].ToString();
                                                            if (ds5.Tables[0].Rows.Count != 0)
                                                            {
                                                                for (int j = 0; j <= ds5.Tables[0].Rows.Count - 1; j++)
                                                                {
                                                                    if (QMonth1 == ds5.Tables[0].Rows[j]["MONTHVST"].ToString())
                                                                    {
                                                                        CallQty1 = ds5.Tables[0].Rows[j]["TotalSampleDistributedbyMIO"].ToString();
                                                                    }
                                                                }
                                                            }
                                                            IssueQty = FQty;
                                                            DisDate = Fdate;
                                                        }

                                                        if (QMonth2 == Convert.ToDateTime(ds4.Tables[0].Rows[i]["Dis_Date"]).Month.ToString())
                                                        {
                                                            Fdate = Convert.ToDateTime(ds4.Tables[0].Rows[i]["Dis_Date"]).Date.ToShortDateString();
                                                            EMPname = ds4.Tables[0].Rows[i]["MR_Name"].ToString();
                                                            DistributedQty2 = ds4.Tables[0].Rows[i]["TOTALQTYISSUED"].ToString();
                                                            if (ds5.Tables[0].Rows.Count != 0)
                                                            {
                                                                for (int j = 0; j <= ds5.Tables[0].Rows.Count - 1; j++)
                                                                {
                                                                    if (QMonth2 == ds5.Tables[0].Rows[j]["MONTHVST"].ToString())
                                                                    {
                                                                        CallQty2 = ds5.Tables[0].Rows[j]["TotalSampleDistributedbyMIO"].ToString();
                                                                    }
                                                                }
                                                            }
                                                            IssueQty = FQty;
                                                            DisDate = Fdate;
                                                        }

                                                        if (QMonth3 == Convert.ToDateTime(ds4.Tables[0].Rows[i]["Dis_Date"]).Month.ToString())
                                                        {
                                                            Fdate = Convert.ToDateTime(ds4.Tables[0].Rows[i]["Dis_Date"]).Date.ToShortDateString();
                                                            EMPname = ds4.Tables[0].Rows[i]["MR_Name"].ToString();
                                                            DistributedQty3 = ds4.Tables[0].Rows[i]["TOTALQTYISSUED"].ToString();
                                                            if (ds5.Tables[0].Rows.Count != 0)
                                                            {
                                                                for (int j = 0; j <= ds5.Tables[0].Rows.Count - 1; j++)
                                                                {
                                                                    if (QMonth3 == ds5.Tables[0].Rows[j]["MONTHVST"].ToString())
                                                                    {
                                                                        CallQty3 = ds5.Tables[0].Rows[j]["TotalSampleDistributedbyMIO"].ToString();
                                                                    }
                                                                }
                                                            }
                                                            IssueQty = FQty;
                                                            DisDate = Fdate;
                                                        }

                                                    }

                                                }
                                                #endregion
                                            }
                                        dt.Rows.Add(RecNo, MIOid, EMPname, SKUID, SKUname, planqty1, planqty2, Planqty3, DistributedQty1, DistributedQty2, DistributedQty3, CallQty1, CallQty2, CallQty3
                                            , QuaterDate1.ToShortDateString(), QuarterDate2.ToShortDateString(), QuarterDate3.ToShortDateString(), BalQty, empAddress, MIORec);
                                        #endregion

                                    }
                                }
                                #endregion
                            }


                        }
                    }


                    #endregion


                    //DataSet final = new DataSet("aaa");
                    //final.Tables.Add(dt);

                    rpt.Load(Server.MapPath("DepotReport/DepotReport.rpt"));
                    rpt.SetDataSource(dt);
                    Session["reportdoc"] = rpt;
                    CrystalReportViewer1.ReportSource = rpt;
                    rpt.ExportToDisk(ExportFormatType.PortableDocFormat, pdfFile1);
                    BtnEmail.Visible = true;
                }
            }

        }

        private void getdate()
        {
            int CurrentMonth;
            if (txtStartingDate.Text == "")
            {
                CurrentMonth = System.DateTime.Today.Month;
            }
            else
            {
                CurrentMonth = Convert.ToDateTime(txtStartingDate.Text).Month;
            }

            string firstdate = DateTime.Today.ToShortDateString();
            string secdate = DateTime.Today.ToShortDateString();

            if (CurrentMonth >= 1 && CurrentMonth <= 3)
            {
                firstdate = Convert.ToDateTime("01/01/" + System.DateTime.Today.Year).ToShortDateString();
                secdate = Convert.ToDateTime("03/31/" + System.DateTime.Today.Year).ToShortDateString();
                QMonth1 = "1"; QMonth2 = "2"; QMonth3 = "3";
            }
            else if (CurrentMonth >= 4 && CurrentMonth <= 6)
            {
                firstdate = Convert.ToDateTime("04/01/" + System.DateTime.Today.Year).ToShortDateString();
                secdate = Convert.ToDateTime("06/30/" + System.DateTime.Today.Year).ToShortDateString();
                QMonth1 = "4"; QMonth2 = "5"; QMonth3 = "6";
            }
            else if (CurrentMonth >= 7 && CurrentMonth <= 9)
            {
                firstdate = Convert.ToDateTime("07/01/" + System.DateTime.Today.Year).ToShortDateString();
                secdate = Convert.ToDateTime("09/30/" + System.DateTime.Today.Year).ToShortDateString();
                QMonth1 = "7"; QMonth2 = "8"; QMonth3 = "9";
            }
            else if (CurrentMonth >= 10 && CurrentMonth <= 11)
            {
                firstdate = Convert.ToDateTime("10/01/" + System.DateTime.Today.Year).ToShortDateString();
                secdate = Convert.ToDateTime("12/31/" + System.DateTime.Today.Year).ToShortDateString();
                QMonth1 = "10"; QMonth2 = "11"; QMonth3 = "12";
            }

            Cfirstdate = Convert.ToDateTime(firstdate);
            Csecdate = Convert.ToDateTime(secdate);
        }

        #endregion

        private void MonthlyVisitAnalysis()
        {
            try
            {
                var CheckDate
                   = new List<string>(Constants.MonthsBetweenDateRange(Convert.ToDateTime(txtStartingDate.Text),
                       Convert.ToDateTime(txtEndingDate.Text)).Select(p => p.ToString("yyyy-MM-dd")));
                if (CheckDate.Count > 2)
                {
                    lblError.Text = "Select only two months range!";
                }
                else
                {
                    #region Initialization

                    lblError.Text = "";
                    long employeeId = 0, doctorId = 0;

                    //int level3Id = 0, level4Id = 0, level5Id = 0, level6Id = 0, counter = 0, monthNo = 0, year = 0, month = 0, firstTime = 0,
                    //    rowNumber = 0;
                    string hierarchyName = "", level1Name = "", level2Name = "", level3Name = "", level4Name = "", level5Name = "", level6Name = "",
                        employeeName = "", mobileNumber = "", doctorName = "", doctorCode = "", doctorClass = "", doctorDesignation = "", doctorBrick = "",
                        monthName = "", month1 = "", month2 = "", month3 = "", month4 = "", month5 = "", month6 = "";

                    DateTime from = Convert.ToDateTime(txtStartingDate.Text);
                    DateTime to = Convert.ToDateTime(txtEndingDate.Text);
                    int[] arr = new int[6];
                    int start = from.Month;
                    int stop = to.Month;

                    if (stop == start)
                    {
                        arr[0] = start;
                    }
                    else if (stop > start)
                    {
                        for (byte loopCounter = 0; loopCounter < (stop - start) + 1; loopCounter++)
                            arr[loopCounter] = start + loopCounter;
                    }
                    else
                    {
                        byte loopCounter = 0;
                        for (; start <= 12; loopCounter++)
                            arr[loopCounter] = start++;
                        start = 1;
                        for (; start <= stop; loopCounter++)
                            arr[loopCounter] = start++;
                    }

                    int lastDayOfMonth = 30;
                    switch (to.Month)
                    {
                        case 1: lastDayOfMonth = 31; break;
                        case 2: lastDayOfMonth = 28; break;
                        case 3: lastDayOfMonth = 31; break;
                        case 5: lastDayOfMonth = 31; break;
                        case 7: lastDayOfMonth = 31; break;
                        case 8: lastDayOfMonth = 31; break;
                        case 10: lastDayOfMonth = 31; break;
                        case 12: lastDayOfMonth = 31; break;
                    }
                    if (to.Month == 2 && (to.Year % 4) == 0)
                    {
                        lastDayOfMonth = 29;
                    }

                    //List<HierarchyLevel3> getLevel3Name;
                    //List<HierarchyLevel4> getLevel4Name;
                    //List<HierarchyLevel5> getLevel5Name;
                    //List<HierarchyLevel6> getLevel6Name;

                    DataSet ds = new DataSet();
                    var dsMonth1 = new DataSet();
                    var dsMonth2 = new DataSet();
                    var dsMonth3 = new DataSet();
                    var dsMonth4 = new DataSet();
                    var dsMonth5 = new DataSet();
                    var dsMonth6 = new DataSet();

                    #endregion

                    #region Get Active Hierarchy Level

                    List<DatabaseLayer.SQL.AppConfiguration> getLevelName =
                        _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

                    #endregion

                    #region Filter Record on the basis of Active Level

                    if (getLevelName.Count != 0)
                    {
                        hierarchyName = Convert.ToString(getLevelName[0].SettingName);
                        _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                        if (hierarchyName == "Level3")
                        {
                            #region Get Record Via Roles
                            if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
                            {
                                #region Employee Detail + Hierarchy Levels + Date

                                if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                                {
                                    _level3Id = 0;
                                }
                                else
                                {
                                    _level3Id = Convert.ToInt32(ddl1.SelectedValue);
                                }


                                if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                                {
                                    _level4Id = 0;
                                }
                                else
                                {
                                    _level4Id = Convert.ToInt32(ddl2.SelectedValue);
                                }

                                if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                                {
                                    _level5Id = 0;
                                }
                                else
                                {
                                    _level5Id = Convert.ToInt32(ddl3.SelectedValue);
                                }

                                if (ddl4.SelectedValue == "-1" || ddl4.SelectedValue == "")
                                {
                                    _level6Id = 0;
                                }
                                else
                                {
                                    _level6Id = Convert.ToInt32(ddl4.SelectedValue);
                                }

                                if (ddl44.SelectedValue == "-1" || ddl44.SelectedValue == "")
                                {
                                    employeeId = 0;
                                }
                                else
                                {
                                    employeeId = Convert.ToInt32(ddl44.SelectedValue);
                                }

                                #endregion
                            }
                            else if (_currentUserRole == "rl3")
                            {
                                #region Employee Detail + Hierarchy Levels + Date

                                this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                                if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                                {
                                    _level4Id = 0;
                                }
                                else
                                {
                                    _level4Id = Convert.ToInt32(ddl1.SelectedValue);
                                }

                                if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                                {
                                    _level5Id = 0;
                                }
                                else
                                {
                                    _level5Id = Convert.ToInt32(ddl2.SelectedValue);
                                }

                                if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                                {
                                    _level6Id = 0;
                                }
                                else
                                {
                                    _level6Id = Convert.ToInt32(ddl3.SelectedValue);
                                }

                                if (ddl33.SelectedValue == "-1" || ddl33.SelectedValue == "")
                                {
                                    employeeId = 0;
                                }
                                else
                                {
                                    employeeId = Convert.ToInt32(ddl33.SelectedValue);
                                }

                                #endregion
                            }
                            else if (_currentUserRole == "rl4")
                            {
                                #region Employee Detail + Hierarchy Levels + Date

                                this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                                if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                                {
                                    _level5Id = 0;
                                }
                                else
                                {
                                    _level5Id = Convert.ToInt32(ddl1.SelectedValue);
                                }

                                if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                                {
                                    _level6Id = 0;
                                }
                                else
                                {
                                    _level6Id = Convert.ToInt32(ddl2.SelectedValue);
                                }

                                if (ddl22.SelectedValue == "-1" || ddl22.SelectedValue == "")
                                {
                                    employeeId = 0;
                                }
                                else
                                {
                                    employeeId = Convert.ToInt32(ddl22.SelectedValue);
                                }

                                #endregion
                            }
                            else if (_currentUserRole == "rl5")
                            {
                                #region Employee Detail + Hierarchy Levels + Date

                                this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));

                                if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                                {
                                    _level6Id = 0;
                                }
                                else
                                {
                                    _level6Id = Convert.ToInt32(ddl1.SelectedValue);
                                }

                                if (ddl11.SelectedValue == "-1" || ddl11.SelectedValue == "")
                                {
                                    employeeId = 0;
                                }
                                else
                                {
                                    employeeId = Convert.ToInt32(ddl11.SelectedValue);
                                }

                                #endregion
                            }
                            else if (_currentUserRole == "rl6")
                            {
                                #region Employee Detail + Hierarchy Levels + Date

                                this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                                employeeId = _currentUser.EmployeeId;

                                #endregion
                            }

                            _nvCollection.Clear();
                            _nvCollection.Add("@Level3ID-INT", _level3Id.ToString());
                            _nvCollection.Add("@Level4ID-INT", _level4Id.ToString());
                            _nvCollection.Add("@Level5ID-INT", _level5Id.ToString());
                            _nvCollection.Add("@Level6ID-INT", _level6Id.ToString());
                            _nvCollection.Add("@EmployeeID-INT", employeeId.ToString());
                            if (txtStartingDate.Text != "" && txtEndingDate.Text != "")
                            {
                                _nvCollection.Add("@DateStart-date", Convert.ToDateTime(txtStartingDate.Text).ToString());
                                _nvCollection.Add("@DateEnd-date", Convert.ToDateTime(txtEndingDate.Text).ToString());
                            }
                            else
                            {
                                _nvCollection.Add("@DateStart-date", DateTime.Now.ToString());
                                _nvCollection.Add("@DateEnd-date", DateTime.Now.ToString());
                            }
                            ds = GetData("sp_MDVAReport", _nvCollection);
                            #endregion
                        }
                    }
                    #endregion

                    #region getting records

                    XSDDatatable.Dsreports dsc = new XSDDatatable.Dsreports();
                    DataTable dtVisitsByMonth = dsc.Tables["VisitsByMonth"];

                    int visitDateCount = 1;
                    int flagBegin = 0;
                    int flag = 0;
                    int flag2 = 0;
                    string MR_ID = "";
                    string docID = "";
                    int visitMonth = 0;
                    string monthDays = "";
                    int monthIndex = 0;
                    string monthDay = "";
                    DataRow dr = null;

                    if (ds != null)
                    {
                        #region FOR LOOP
                        for (int i = 0; i < ds.Tables[0].Rows.Count - 1; i++)
                        {
                            if ((docID == Convert.ToString(ds.Tables[0].Rows[i]["DocID"]))
                  && (MR_ID == Convert.ToString(ds.Tables[0].Rows[i]["MR_ID"])))
                            {
                                #region
                                if (Convert.ToDateTime(ds.Tables[0].Rows[i]["VisitDate"]).Year != 1900 && visitMonth == Convert.ToDateTime(ds.Tables[0].Rows[i]["VisitDate"]).Month)
                                {
                                    monthDay = Convert.ToString(Convert.ToDateTime(ds.Tables[0].Rows[i]["VisitDate"]).Day);
                                    if (monthDay.Length == 1)
                                    {
                                        monthDay = "0" + monthDay;
                                    }
                                    monthDays = monthDays + monthDay + ", ";
                                }
                                else
                                {
                                    if (Convert.ToDateTime(ds.Tables[0].Rows[i]["VisitDate"]).Year != 1900)
                                    {
                                        visitMonth = Convert.ToDateTime(ds.Tables[0].Rows[i]["VisitDate"]).Month;
                                        monthDay = Convert.ToString(Convert.ToDateTime(ds.Tables[0].Rows[i]["VisitDate"]).Day);
                                    }
                                    if (visitDateCount != 0)
                                    {
                                        dr["Month" + visitDateCount] = monthDays;
                                    }

                                    if (monthDay.Length == 1)
                                    {
                                        monthDay = "0" + monthDay;
                                    }
                                    monthDays = monthDays + monthDay + ", ";

                                    monthDays = monthDay + ", ";
                                    for (byte arrIndex = 0; arrIndex < arr.Length; arrIndex++)
                                    {
                                        if (Convert.ToString(ds.Tables[0].Rows[i]["VisitDate"]) != "" && arr[arrIndex] == Convert.ToDateTime(ds.Tables[0].Rows[i]["VisitDate"]).Month)
                                        {
                                            monthIndex = arrIndex + 1;
                                            break;
                                        }
                                    }
                                    visitDateCount = monthIndex;
                                }
                                flag = 1;
                                flag2 = 0;

                                #endregion
                            }
                            else
                            {
                                #region
                                if ((flagBegin == 1 && flag == 1) || (flag2 == 1))
                                {
                                    if (visitDateCount != 0)
                                    {
                                        dr["Month" + visitDateCount] = monthDays;
                                    }
                                    monthDays = "";
                                    dtVisitsByMonth.Rows.Add(dr);
                                    flag = 0;
                                    visitDateCount = 1;
                                    visitMonth = 0;
                                }
                                flagBegin = 1;
                                flag2 = 1;
                                dr = dtVisitsByMonth.NewRow();
                                docID = Convert.ToString(ds.Tables[0].Rows[i]["DocID"]);
                                MR_ID = Convert.ToString(ds.Tables[0].Rows[i]["MR_ID"]);
                                //string str = Convert.ToString(oleDbMainDataReader["VisitDate"]);
                                if (Convert.ToDateTime(ds.Tables[0].Rows[i]["VisitDate"]).Year != 1900)
                                {
                                    visitMonth = Convert.ToDateTime(ds.Tables[0].Rows[i]["VisitDate"]).Month;
                                }

                                dr["DivisionID"] = Convert.ToString(ds.Tables[0].Rows[i]["DivisionID"]);
                                dr["Division"] = Convert.ToString(ds.Tables[0].Rows[i]["Division"]);
                                dr["ZoneID"] = Convert.ToString(ds.Tables[0].Rows[i]["ZoneID"]);
                                dr["Zone"] = Convert.ToString(ds.Tables[0].Rows[i]["Zone"]);
                                dr["RegionID"] = Convert.ToString(ds.Tables[0].Rows[i]["RegionID"]);
                                dr["Region"] = Convert.ToString(ds.Tables[0].Rows[i]["Region"]);
                                dr["MR_Name"] = Convert.ToString(ds.Tables[0].Rows[i]["MR_Name"]);
                                dr["DocID"] = docID;
                                dr["DocRefID"] = Convert.ToString(ds.Tables[0].Rows[i]["DocRefID"]);
                                dr["DocName"] = Convert.ToString(ds.Tables[0].Rows[i]["DocName"]);
                                dr["Class"] = Convert.ToString(ds.Tables[0].Rows[i]["Class"]);
                                dr["Specialty"] = Convert.ToString(ds.Tables[0].Rows[i]["Specialty"]);
                                dr["Designation"] = Convert.ToString(ds.Tables[0].Rows[i]["Designation"]);
                                dr["MRCell"] = Convert.ToString(ds.Tables[0].Rows[i]["MRCell"]);
                                dr["MRIdName"] = Convert.ToString(ds.Tables[0].Rows[i]["MRIdName"]);
                                dr["FrmDate"] = Convert.ToDateTime(txtStartingDate.Text);
                                dr["toDate"] = Convert.ToDateTime(txtEndingDate.Text);

                                #endregion

                                #region
                                for (byte arrIndex = 0; arrIndex < arr.Length; arrIndex++)
                                {
                                    if (Convert.ToString(ds.Tables[0].Rows[i]["VisitDate"]) != "" && arr[arrIndex] == Convert.ToDateTime(ds.Tables[0].Rows[i]["VisitDate"]).Month)
                                    {
                                        monthIndex = arrIndex + 1;
                                        break;
                                    }
                                }
                                visitDateCount = monthIndex;

                                if (Convert.ToDateTime(ds.Tables[0].Rows[i]["VisitDate"]).Year != 1900)
                                {
                                    monthDay = Convert.ToString(Convert.ToDateTime(ds.Tables[0].Rows[i]["VisitDate"]).Day);
                                }
                                else
                                {
                                    monthDay = "";
                                }
                                if (monthDay.Length == 1)
                                {
                                    monthDay = "0" + monthDay;
                                }
                                monthDays = monthDays + monthDay + ", ";

                                monthDays = monthDay + ", ";
                                dr["MR_ID"] = MR_ID;

                                #endregion
                            }
                        }
                        #endregion

                        if (flag == 1 || flag2 == 1)
                        {
                            if (visitDateCount != 0)
                            {
                                dr["Month" + visitDateCount] = monthDays;
                            }
                            dtVisitsByMonth.Rows.Add(dr);
                        }
                    }

                   
                    #region Display Report
//rpt.Load(Server.MapPath("MonthlyVisitAnalysis/VisitsByMonth.rpt"));
                    Reports.CrystalReports.MonthlyVisitAnalysis2.VisitByMonth2 reportDocument = new MonthlyVisitAnalysis2.VisitByMonth2();
                    reportDocument.SetDataSource(dtVisitsByMonth);
                    Session["reportdoc"] = reportDocument;
                    CrystalReportViewer1.ReportSource = reportDocument;
                    rpt.ExportToDisk(ExportFormatType.PortableDocFormat, pdfFile1);
                    BtnEmail.Visible = true;

                    #endregion

                    #endregion

                }
            }
            catch (Exception ex)
            {

            }
        }

        private void VisitByTime()
        {
            try
            {
                #region Initialization

                int level3Id = 0, level4Id = 0, level5Id = 0, level6Id = 0;
                string hierarchyName = "", level1Name = "", level2Name = "", nullVT = "";

                var dtVisitByTime = new DataTable();
                var dsVisitShiftM = new DataSet();
                var dsVisitShiftE = new DataSet();

                #endregion

                #region Initialization of Custom DataTable columns

                dtVisitByTime.Columns.Add(new DataColumn("Level1Name", Type.GetType("System.String")));
                dtVisitByTime.Columns.Add(new DataColumn("Level2Name", Type.GetType("System.String")));
                dtVisitByTime.Columns.Add(new DataColumn("Level3Name", Type.GetType("System.String")));
                dtVisitByTime.Columns.Add(new DataColumn("Level4Name", Type.GetType("System.String")));
                dtVisitByTime.Columns.Add(new DataColumn("Level5Name", Type.GetType("System.String")));
                dtVisitByTime.Columns.Add(new DataColumn("Level6Name", Type.GetType("System.String")));
                dtVisitByTime.Columns.Add(new DataColumn("Morning", Type.GetType("System.String")));
                dtVisitByTime.Columns.Add(new DataColumn("Evening", Type.GetType("System.String")));
                dtVisitByTime.Columns.Add(new DataColumn("NullVT", Type.GetType("System.String")));

                #endregion

                #region Get Active Hierarchy Level

                List<DatabaseLayer.SQL.AppConfiguration> getLevelName =
                    _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

                #endregion

                #region Filter Record on the basis of Active Level

                if (getLevelName.Count != 0)
                {
                    hierarchyName = Convert.ToString(getLevelName[0].SettingName);
                    _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                    if (hierarchyName == "Level3")
                    {
                        #region Get Record Via Roles

                        if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
                        {
                            #region Hierarchy Levels

                            _level3Id = Convert.ToInt32(ddl1.SelectedValue);

                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level4Id = 0;
                            }
                            else
                            {
                                _level4Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl3.SelectedValue);
                            }

                            if (ddl4.SelectedValue == "-1" || ddl4.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl4.SelectedValue);
                            }

                            #endregion

                            #region Select Record on the basis of Days Select

                            if (txtStartingDate.Text != "" && txtEndingDate.Text != "")
                            {
                                _nvCollection.Clear();
                                _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                                _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                                _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                                _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                                _nvCollection.Add("@StartingDate-DateTime", Convert.ToString(Convert.ToDateTime(txtStartingDate.Text)));
                                _nvCollection.Add("@EndingDate-DateTime", Convert.ToString(Convert.ToDateTime(txtEndingDate.Text)));
                                _nvCollection.Add("@VisitShift-int", Convert.ToString(1));
                                dsVisitShiftM = GetData("sp_SummaryOfVisitByTime", _nvCollection);

                                _nvCollection.Clear();
                                _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                                _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                                _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                                _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                                _nvCollection.Add("@StartingDate-DateTime", Convert.ToString(Convert.ToDateTime(txtStartingDate.Text)));
                                _nvCollection.Add("@EndingDate-DateTime", Convert.ToString(Convert.ToDateTime(txtEndingDate.Text)));
                                _nvCollection.Add("@VisitShift-int", Convert.ToString(2));
                                dsVisitShiftE = GetData("sp_SummaryOfVisitByTime", _nvCollection);
                            }
                            else
                            {
                                _nvCollection.Clear();
                                _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                                _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                                _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                                _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                                _nvCollection.Add("@StartingDate-DateTime", Convert.ToString(DateTime.Now));
                                _nvCollection.Add("@EndingDate-DateTime", Convert.ToString(DateTime.Now));
                                _nvCollection.Add("@VisitShift-int", Convert.ToString(1));
                                dsVisitShiftM = GetData("sp_SummaryOfVisitByTime", _nvCollection);

                                _nvCollection.Clear();
                                _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                                _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                                _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                                _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                                _nvCollection.Add("@StartingDate-DateTime", Convert.ToString(DateTime.Now));
                                _nvCollection.Add("@EndingDate-DateTime", Convert.ToString(DateTime.Now));
                                _nvCollection.Add("@VisitShift-int", Convert.ToString(2));
                                dsVisitShiftE = GetData("sp_SummaryOfVisitByTime", _nvCollection);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl3")
                        {
                            #region Hierarchy Levels

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));

                            level3Id = _level3Id;

                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level4Id = 0;
                            }
                            else
                            {
                                _level4Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl3.SelectedValue);
                            }

                            #endregion

                            #region Select Record on the basis of Days Select

                            if (txtStartingDate.Text != "" && txtEndingDate.Text != "")
                            {
                                _nvCollection.Clear();
                                _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                                _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                                _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                                _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                                _nvCollection.Add("@StartingDate-DateTime", Convert.ToString(Convert.ToDateTime(txtStartingDate.Text)));
                                _nvCollection.Add("@EndingDate-DateTime", Convert.ToString(Convert.ToDateTime(txtEndingDate.Text)));
                                _nvCollection.Add("@VisitShift-int", Convert.ToString(1));
                                dsVisitShiftM = GetData("sp_SummaryOfVisitByTime", _nvCollection);

                                _nvCollection.Clear();
                                _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                                _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                                _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                                _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                                _nvCollection.Add("@StartingDate-DateTime", Convert.ToString(Convert.ToDateTime(txtStartingDate.Text)));
                                _nvCollection.Add("@EndingDate-DateTime", Convert.ToString(Convert.ToDateTime(txtEndingDate.Text)));
                                _nvCollection.Add("@VisitShift-int", Convert.ToString(2));
                                dsVisitShiftE = GetData("sp_SummaryOfVisitByTime", _nvCollection);
                            }
                            else
                            {
                                _nvCollection.Clear();
                                _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                                _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                                _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                                _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                                _nvCollection.Add("@StartingDate-DateTime", Convert.ToString(DateTime.Now));
                                _nvCollection.Add("@EndingDate-DateTime", Convert.ToString(DateTime.Now));
                                _nvCollection.Add("@VisitShift-int", Convert.ToString(1));
                                dsVisitShiftM = GetData("sp_SummaryOfVisitByTime", _nvCollection);

                                _nvCollection.Clear();
                                _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                                _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                                _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                                _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                                _nvCollection.Add("@StartingDate-DateTime", Convert.ToString(DateTime.Now));
                                _nvCollection.Add("@EndingDate-DateTime", Convert.ToString(DateTime.Now));
                                _nvCollection.Add("@VisitShift-int", Convert.ToString(2));
                                dsVisitShiftE = GetData("sp_SummaryOfVisitByTime", _nvCollection);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl4")
                        {
                            #region Hierarchy Levels

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));

                            level3Id = _level3Id;
                            level4Id = _level4Id;

                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            #endregion

                            #region Select Record on the basis of Days Select

                            if (txtStartingDate.Text != "" && txtEndingDate.Text != "")
                            {
                                _nvCollection.Clear();
                                _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                                _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                                _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                                _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                                _nvCollection.Add("@StartingDate-DateTime", Convert.ToString(Convert.ToDateTime(txtStartingDate.Text)));
                                _nvCollection.Add("@EndingDate-DateTime", Convert.ToString(Convert.ToDateTime(txtEndingDate.Text)));
                                _nvCollection.Add("@VisitShift-int", Convert.ToString(1));
                                dsVisitShiftM = GetData("sp_SummaryOfVisitByTime", _nvCollection);

                                _nvCollection.Clear();
                                _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                                _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                                _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                                _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                                _nvCollection.Add("@StartingDate-DateTime", Convert.ToString(Convert.ToDateTime(txtStartingDate.Text)));
                                _nvCollection.Add("@EndingDate-DateTime", Convert.ToString(Convert.ToDateTime(txtEndingDate.Text)));
                                _nvCollection.Add("@VisitShift-int", Convert.ToString(2));
                                dsVisitShiftE = GetData("sp_SummaryOfVisitByTime", _nvCollection);
                            }
                            else
                            {
                                _nvCollection.Clear();
                                _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                                _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                                _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                                _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                                _nvCollection.Add("@StartingDate-DateTime", Convert.ToString(DateTime.Now));
                                _nvCollection.Add("@EndingDate-DateTime", Convert.ToString(DateTime.Now));
                                _nvCollection.Add("@VisitShift-int", Convert.ToString(1));
                                dsVisitShiftM = GetData("sp_SummaryOfVisitByTime", _nvCollection);

                                _nvCollection.Clear();
                                _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                                _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                                _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                                _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                                _nvCollection.Add("@StartingDate-DateTime", Convert.ToString(DateTime.Now));
                                _nvCollection.Add("@EndingDate-DateTime", Convert.ToString(DateTime.Now));
                                _nvCollection.Add("@VisitShift-int", Convert.ToString(2));
                                dsVisitShiftE = GetData("sp_SummaryOfVisitByTime", _nvCollection);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl5")
                        {
                            #region Hierarchy Levels

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));

                            level3Id = _level3Id;
                            level4Id = _level4Id;
                            level5Id = _level5Id;

                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            #endregion

                            #region Select Record on the basis of Days Select

                            if (txtStartingDate.Text != "" && txtEndingDate.Text != "")
                            {
                                _nvCollection.Clear();
                                _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                                _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                                _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                                _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                                _nvCollection.Add("@StartingDate-DateTime", Convert.ToString(Convert.ToDateTime(txtStartingDate.Text)));
                                _nvCollection.Add("@EndingDate-DateTime", Convert.ToString(Convert.ToDateTime(txtEndingDate.Text)));
                                _nvCollection.Add("@VisitShift-int", Convert.ToString(1));
                                dsVisitShiftM = GetData("sp_SummaryOfVisitByTime", _nvCollection);

                                _nvCollection.Clear();
                                _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                                _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                                _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                                _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                                _nvCollection.Add("@StartingDate-DateTime", Convert.ToString(Convert.ToDateTime(txtStartingDate.Text)));
                                _nvCollection.Add("@EndingDate-DateTime", Convert.ToString(Convert.ToDateTime(txtEndingDate.Text)));
                                _nvCollection.Add("@VisitShift-int", Convert.ToString(2));
                                dsVisitShiftE = GetData("sp_SummaryOfVisitByTime", _nvCollection);
                            }
                            else
                            {
                                _nvCollection.Clear();
                                _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                                _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                                _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                                _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                                _nvCollection.Add("@StartingDate-DateTime", Convert.ToString(DateTime.Now));
                                _nvCollection.Add("@EndingDate-DateTime", Convert.ToString(DateTime.Now));
                                _nvCollection.Add("@VisitShift-int", Convert.ToString(1));
                                dsVisitShiftM = GetData("sp_SummaryOfVisitByTime", _nvCollection);

                                _nvCollection.Clear();
                                _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                                _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                                _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                                _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                                _nvCollection.Add("@StartingDate-DateTime", Convert.ToString(DateTime.Now));
                                _nvCollection.Add("@EndingDate-DateTime", Convert.ToString(DateTime.Now));
                                _nvCollection.Add("@VisitShift-int", Convert.ToString(2));
                                dsVisitShiftE = GetData("sp_SummaryOfVisitByTime", _nvCollection);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl6")
                        {
                            #region Hierarchy Levels
                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));

                            level3Id = _level3Id;
                            level4Id = _level4Id;
                            level5Id = _level5Id;
                            level6Id = _level6Id;
                            #endregion

                            #region Select Record on the basis of Days Select

                            if (txtStartingDate.Text != "" && txtEndingDate.Text != "")
                            {
                                _nvCollection.Clear();
                                _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                                _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                                _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                                _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                                _nvCollection.Add("@StartingDate-DateTime", Convert.ToString(Convert.ToDateTime(txtStartingDate.Text)));
                                _nvCollection.Add("@EndingDate-DateTime", Convert.ToString(Convert.ToDateTime(txtEndingDate.Text)));
                                _nvCollection.Add("@VisitShift-int", Convert.ToString(1));
                                dsVisitShiftM = GetData("sp_SummaryOfVisitByTime", _nvCollection);

                                _nvCollection.Clear();
                                _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                                _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                                _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                                _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                                _nvCollection.Add("@StartingDate-DateTime", Convert.ToString(Convert.ToDateTime(txtStartingDate.Text)));
                                _nvCollection.Add("@EndingDate-DateTime", Convert.ToString(Convert.ToDateTime(txtEndingDate.Text)));
                                _nvCollection.Add("@VisitShift-int", Convert.ToString(2));
                                dsVisitShiftE = GetData("sp_SummaryOfVisitByTime", _nvCollection);
                            }
                            else
                            {
                                _nvCollection.Clear();
                                _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                                _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                                _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                                _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                                _nvCollection.Add("@StartingDate-DateTime", Convert.ToString(DateTime.Now));
                                _nvCollection.Add("@EndingDate-DateTime", Convert.ToString(DateTime.Now));
                                _nvCollection.Add("@VisitShift-int", Convert.ToString(1));
                                dsVisitShiftM = GetData("sp_SummaryOfVisitByTime", _nvCollection);

                                _nvCollection.Clear();
                                _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                                _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                                _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                                _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                                _nvCollection.Add("@StartingDate-DateTime", Convert.ToString(DateTime.Now));
                                _nvCollection.Add("@EndingDate-DateTime", Convert.ToString(DateTime.Now));
                                _nvCollection.Add("@VisitShift-int", Convert.ToString(2));
                                dsVisitShiftE = GetData("sp_SummaryOfVisitByTime", _nvCollection);
                            }

                            #endregion
                        }
                        #endregion

                        #region Extract Data from Source

                        int counter = 0;
                        int evening = 0;

                        foreach (DataRow m in dsVisitShiftM.Tables[0].Rows)
                        {
                            foreach (DataRow e in dsVisitShiftE.Tables[0].Rows)
                            {
                                if (counter == 0)
                                {
                                    evening = Convert.ToInt32(e["Evening"]);
                                    counter = 1;
                                    break;
                                }
                            }
                            dtVisitByTime.Rows.Add(level1Name, level2Name, m["Level3Name"].ToString(), m["Level4Name"].ToString(), m["Level5Name"].ToString(),
                                m["Level6Name"].ToString(), m["Morning"].ToString(), evening.ToString(), nullVT);
                        }

                        #endregion

                        #region Display Report

                        rpt.Load(Server.MapPath("VisitByTime/VisitsByTime.rpt"));
                        rpt.SetDataSource(dtVisitByTime);
                        Session["reportdoc"] = rpt;
                        CrystalReportViewer1.ReportSource = rpt;
                        rpt.ExportToDisk(ExportFormatType.PortableDocFormat, pdfFile1);
                        BtnEmail.Visible = true;
                        #endregion
                    }
                }

                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from VisitByTime is " + exception.Message;
            }
        }

        private void SmsStatus()
        {
            try
            {
                #region Initialization

                var dtSmsStatus = new DataTable();

                #endregion

                #region Initialization of Custom DataTable columns

                dtSmsStatus.Columns.Add(new DataColumn("InsertDate", Type.GetType("System.String")));
                dtSmsStatus.Columns.Add(new DataColumn("SMS_Status", Type.GetType("System.String")));
                dtSmsStatus.Columns.Add(new DataColumn("Message", Type.GetType("System.String")));
                dtSmsStatus.Columns.Add(new DataColumn("Cell", Type.GetType("System.String")));

                #endregion

                #region Get Active Hierarchy Level

                List<DatabaseLayer.SQL.AppConfiguration> getLevelName =
                    _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

                #endregion

                #region Filter Record on the basis of Active Level

                if (getLevelName.Count != 0)
                {
                    _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                    if (getLevelName[0].SettingName.ToString() == "Level3")
                    {
                        #region Get Record Via Roles

                        if (txtStartingDate.Text != "" && txtEndingDate.Text != "")
                        {
                            _getSmsStatus = _dataContext.sp_SMSInboundSelect(Convert.ToDateTime(txtStartingDate.Text),
                                Convert.ToDateTime(txtEndingDate.Text), 1).ToList();
                        }
                        else
                        {
                            _getSmsStatus = _dataContext.sp_SMSInboundSelect(DateTime.Now, DateTime.Now, 1).ToList();
                        }

                        #endregion

                        #region Extract Data from Source

                        foreach (var sms in _getSmsStatus)
                        {
                            #region Insert Row to DataTable

                            dtSmsStatus.Rows.Add(sms.InsertedDate.ToShortDateString(), sms.MessageType, sms.MessageText, sms.MobileNumber);

                            #endregion
                        }

                        #endregion

                        #region Display Report

                        rpt.Load(Server.MapPath("SmsStatus/SMSStatus.rpt"));
                        rpt.SetDataSource(dtSmsStatus);
                        Session["reportdoc"] = rpt;
                        CrystalReportViewer1.ReportSource = rpt;
                        rpt.ExportToDisk(ExportFormatType.PortableDocFormat, pdfFile1);
                        BtnEmail.Visible = true;
                        #endregion
                    }
                }

                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from SmsStatus is " + exception.Message;
            }
        }

        private void KPIByClass()
        {
            try
            {
                #region Initialization
                long employeeId = 0, doctorId = 0;
                string hierarchyName = "", Month = "", Year = "";
                #endregion

                var dtKPIByClass = new DataTable();
                var dsKpiReport = new DataSet();

                #region Initialization of Custom DataTable columns
                XSDDatatable.Dsreports dsc = new XSDDatatable.Dsreports();
                dtKPIByClass = dsc.Tables["KPIbyClass"];

                #endregion

                #region Get Active Hierarchy Level

                List<DatabaseLayer.SQL.AppConfiguration> getLevelName =
                    _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

                #endregion

                #region Filter Record on the basis of Active Level

                if (getLevelName.Count != 0)
                {
                    hierarchyName = Convert.ToString(getLevelName[0].SettingName);
                    _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                    if (hierarchyName == "Level3")
                    {
                        #region Get Record Via Roles
                        if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level3Id = 0;
                            }
                            else
                            {
                                _level3Id = Convert.ToInt32(ddl1.SelectedValue);
                            }


                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level4Id = 0;
                            }
                            else
                            {
                                _level4Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl3.SelectedValue);
                            }

                            if (ddl4.SelectedValue == "-1" || ddl4.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl4.SelectedValue);
                            }

                            if (ddl44.SelectedValue == "-1" || ddl44.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl44.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl3")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level4Id = 0;
                            }
                            else
                            {
                                _level4Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl3.SelectedValue);
                            }

                            if (ddl33.SelectedValue == "-1" || ddl33.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl33.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl4")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl22.SelectedValue == "-1" || ddl22.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl22.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl5")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));

                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl11.SelectedValue == "-1" || ddl11.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl11.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl6")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                            employeeId = _currentUser.EmployeeId;

                            #endregion
                        }

                        #endregion

                        if (txtStartingDate.Text != "")
                        {
                            Month = Convert.ToDateTime(txtStartingDate.Text).Month.ToString();
                            Year = Convert.ToDateTime(txtStartingDate.Text).Year.ToString();
                        }
                        else
                        {
                            Month = "0";
                            Year = "0";
                        }

                        _nvCollection.Clear();
                        _nvCollection.Add("@Level3id-int", _level3Id.ToString());
                        _nvCollection.Add("@Level4id-int", _level4Id.ToString());
                        _nvCollection.Add("@Level5id-int", _level5Id.ToString());
                        _nvCollection.Add("@Level6id-int", _level6Id.ToString());
                        _nvCollection.Add("@EmployeeId-int", employeeId.ToString());
                        _nvCollection.Add("@Month-int", Month);
                        _nvCollection.Add("@Year-int", Year);

                        dsKpiReport = GetData("sp_NewKPIbyClass", _nvCollection);
                        if (dsKpiReport != null)
                        {
                            dtKPIByClass = dsKpiReport.Tables[0];
                            if (dtKPIByClass.Rows.Count == 0)
                            {
                                DataRow dr = dtKPIByClass.NewRow();
                                dtKPIByClass.Rows.Add(dr);
                                dtKPIByClass.Rows[0]["DateofrRprt"] = Convert.ToDateTime(txtStartingDate.Text).ToString("MMMM yyyy");
                            }

                            dtKPIByClass.Rows[0]["DateofrRprt"] = Convert.ToDateTime(txtStartingDate.Text).ToString("MMMM yyyy");

                            #region Display Report

                            rpt.Load(Server.MapPath("KPIByClass/KPIbyClass.rpt"));
                            rpt.SetDataSource(dtKPIByClass);
                            Session["reportdoc"] = rpt;
                            CrystalReportViewer1.ReportSource = rpt;
                            rpt.ExportToDisk(ExportFormatType.PortableDocFormat, pdfFile1);
                            BtnEmail.Visible = true;
                            #endregion
                        }
                    }
                }
                #endregion
            }
            catch (Exception ex)
            {
                lblError.Text = "Exception is raised from KPIByClass is " + ex.Message;
            }
        }

        private void JVByClass()
        {
            try
            {
                #region Initialization

                long employeeId = 0, managerId = 0, doctorId = 0;
                int level3Id = 0, level4Id = 0, level5Id = 0, level6Id = 0, classId = 0, visitShiftId = 0, jointVisit = 0, jvDay = 0;
                string hierarchyName = "", level1Name = "", level2Name = "", level3Name = "", level4Name = "", level5Name = "", level6Name = "", employeeCode = "",
                    employeeName = "", mobileNumber = "", totalVisits = "", jointVisits = "", doctorClass = "", Month = "", Year = "";

                List<HierarchyLevel3> getLevel3Name;
                List<HierarchyLevel4> getLevel4Name;
                List<HierarchyLevel5> getLevel5Name;
                List<HierarchyLevel6> getLevel6Name;

                var dtJVByClass = new DataTable();

                #endregion
                DataSet dsjvclass = new DataSet();

                #region Initialization of Custom DataTable columns
                XSDDatatable.Dsreports dcs = new XSDDatatable.Dsreports();
                dtJVByClass = dcs.Tables["JVbyClass"];
                #endregion

                #region Get Active Hierarchy Level

                List<DatabaseLayer.SQL.AppConfiguration> getLevelName =
                    _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

                #endregion

                #region Filter Record on the basis of Active Level

                if (getLevelName.Count != 0)
                {
                    hierarchyName = Convert.ToString(getLevelName[0].SettingName);
                    _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                    if (hierarchyName == "Level3")
                    {
                        #region Common Features

                        if (ddlDoctor.SelectedValue == "-1" || ddlDoctor.SelectedValue == "")
                        {
                            doctorId = 0;
                        }
                        else
                        {
                            doctorId = Convert.ToInt32(ddlDoctor.SelectedValue);
                        }

                        if (ddlClass.SelectedValue == "-1" || ddlClass.SelectedValue == "")
                        {
                            classId = 0;
                        }
                        else
                        {
                            classId = Convert.ToInt32(ddlClass.SelectedValue);
                        }

                        if (ddlVisitShift.SelectedValue == "-1" || ddlVisitShift.SelectedValue == "")
                        {
                            visitShiftId = 0;
                        }
                        else
                        {
                            visitShiftId = Convert.ToInt32(ddlVisitShift.SelectedValue);
                        }

                        if (ddlJointVisit.SelectedValue == "-1" || ddlJointVisit.SelectedValue == "")
                        {
                            jointVisit = 0;
                        }
                        else
                        {
                            jointVisit = Convert.ToInt32(ddlJointVisit.SelectedValue);
                        }

                        #endregion

                        #region Get Record Via Roles
                        if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level3Id = 0;
                            }
                            else
                            {
                                _level3Id = Convert.ToInt32(ddl1.SelectedValue);
                            }


                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level4Id = 0;
                            }
                            else
                            {
                                _level4Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl3.SelectedValue);
                            }

                            if (ddl4.SelectedValue == "-1" || ddl4.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl4.SelectedValue);
                            }

                            if (ddl44.SelectedValue == "-1" || ddl44.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl44.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl3")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level4Id = 0;
                            }
                            else
                            {
                                _level4Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl3.SelectedValue);
                            }

                            if (ddl33.SelectedValue == "-1" || ddl33.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl33.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl4")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl22.SelectedValue == "-1" || ddl22.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl22.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl5")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));

                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl11.SelectedValue == "-1" || ddl11.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl11.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl6")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                            employeeId = _currentUser.EmployeeId;

                            #endregion
                        }

                        #endregion

                        #region Extract Data from Source
                        if (txtStartingDate.Text != "")
                        {
                            Month = Convert.ToDateTime(txtStartingDate.Text).Month.ToString();
                            Year = Convert.ToDateTime(txtStartingDate.Text).Year.ToString();
                        }
                        else
                        {
                            Month = "0";
                            Year = "0";
                        }

                        _nvCollection.Clear();
                        _nvCollection.Add("@Level3Id-int", _level3Id.ToString());
                        _nvCollection.Add("@Level4Id-int", _level4Id.ToString());
                        _nvCollection.Add("@Level5Id-int", _level5Id.ToString());
                        _nvCollection.Add("@Level6Id-int", _level6Id.ToString());
                        _nvCollection.Add("@employeeid-int", employeeId.ToString());
                        _nvCollection.Add("@month-int", Month);
                        _nvCollection.Add("@year-int", Year);
                        _nvCollection.Add("@DocId-int", doctorId.ToString());



                        dsjvclass = GetData("sp_JVByClass", _nvCollection);


                        #endregion

                        if (dsjvclass != null)
                            if (dsjvclass.Tables[0].Rows.Count != 0)
                            {
                                #region Display Report
                                if (dsjvclass != null)
                                {
                                    dtJVByClass = dsjvclass.Tables[0];
                                    dtJVByClass.Rows[0]["DateofRprt"] = Convert.ToDateTime(txtStartingDate.Text).ToString("y");
                                    rpt.Load(Server.MapPath("JVByClass/JVbyClass.rpt"));
                                    rpt.SetDataSource(dtJVByClass);
                                    Session["reportdoc"] = rpt;
                                    CrystalReportViewer1.ReportSource = rpt;
                                    rpt.ExportToDisk(ExportFormatType.PortableDocFormat, pdfFile1);
                                    BtnEmail.Visible = true;
                                }
                                #endregion
                            }
                    }
                }

                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from JointVisitSummary is " + exception.Message;
            }
        }

        private void IncomingSMSSummary()
        {
            try
            {
                #region Initialization

                long employeeId = 0;
                int level3Id = 0, level4Id = 0, level5Id = 0, level6Id = 0;
                string hierarchyName = "", level1Name = "", level2Name = "", level3Name = "", level4Name = "", level5Name = "", level6Name = "",
                    employeeName = "", mobileNumber = "";

                List<HierarchyLevel3> getLevel3Name;
                List<HierarchyLevel4> getLevel4Name;
                List<HierarchyLevel5> getLevel5Name;
                List<HierarchyLevel6> getLevel6Name;

                var dtIncomingSummary = new DataTable();
                var dsDCR = new DataSet();
                var dsDuplicate = new DataSet();
                var dsError = new DataSet();
                var dsTemplate = new DataSet();
                var dsDelete = new DataSet();

                #endregion

                #region Initialization of Custom DataTable columns

                XSDDatatable.Dsreports dsr = new XSDDatatable.Dsreports();

                dtIncomingSummary = dsr.Tables["in_msgsSummary"];

                #endregion

                #region Get Active Hierarchy Level

                List<DatabaseLayer.SQL.AppConfiguration> getLevelName =
                    _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

                #endregion

                #region Filter Record on the basis of Active Level

                if (getLevelName.Count != 0)
                {
                    hierarchyName = Convert.ToString(getLevelName[0].SettingName);
                    _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                    if (hierarchyName == "Level3")
                    {
                        #region Get Record Via Roles
                        if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level3Id = 0;
                            }
                            else
                            {
                                _level3Id = Convert.ToInt32(ddl1.SelectedValue);
                            }


                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level4Id = 0;
                            }
                            else
                            {
                                _level4Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl3.SelectedValue);
                            }

                            if (ddl4.SelectedValue == "-1" || ddl4.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl4.SelectedValue);
                            }

                            if (ddl44.SelectedValue == "-1" || ddl44.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl44.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl3")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level4Id = 0;
                            }
                            else
                            {
                                _level4Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl3.SelectedValue);
                            }

                            if (ddl33.SelectedValue == "-1" || ddl33.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl33.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl4")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl22.SelectedValue == "-1" || ddl22.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl22.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl5")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));

                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl11.SelectedValue == "-1" || ddl11.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl11.SelectedValue);
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl6")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                            employeeId = _currentUser.EmployeeId;

                            #endregion
                        }

                        #endregion

                        #region Extract Data from Source
                        _nvCollection.Clear();
                        if (txtStartingDate.Text != "" && txtEndingDate.Text != "")
                        {
                            _nvCollection.Add("@DateStart-date", Convert.ToDateTime(txtStartingDate.Text).ToString());
                            _nvCollection.Add("@DateEND-date", Convert.ToDateTime(txtEndingDate.Text).ToString());
                        }
                        else
                        {
                            _nvCollection.Add("@DateStart-date", DateTime.Now.ToString());
                            _nvCollection.Add("@DateEND-date", DateTime.Now.ToString());
                        }

                        _nvCollection.Add("@Level3ID-int", _level3Id.ToString());
                        _nvCollection.Add("@Level4ID-int", _level4Id.ToString());
                        _nvCollection.Add("@Level5ID-int", _level5Id.ToString());
                        _nvCollection.Add("@Level6ID-int", _level6Id.ToString());
                        _nvCollection.Add("@EmployeeID-int", employeeId.ToString());

                        DataSet ds = GetData("sp_incomingSummary", _nvCollection);
                        dtIncomingSummary = ds.Tables[0];
                        #endregion

                        #region Display Report

                        rpt.Load(Server.MapPath("IncommingSmsSummary/IncomingSMSSummary.rpt"));
                        rpt.SetDataSource(dtIncomingSummary);
                        Session["reportdoc"] = rpt;
                        CrystalReportViewer1.ReportSource = rpt;
                        rpt.ExportToDisk(ExportFormatType.PortableDocFormat, pdfFile1);
                        BtnEmail.Visible = true;
                        #endregion
                    }
                }

                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from IncomingSMSSummary is " + exception.Message;
            }
        }

        private void MRSMSAccuracy()
        {
            try
            {
                #region Initialization

                long employeeId = 0, doctorId = 0;
                int level3Id = 0, level4Id = 0, level5Id = 0, level6Id = 0, totalSMS = 0;
                string hierarchyName = "", level1Name = "", level2Name = "", level3Name = "", level4Name = "", level5Name = "", level6Name = "",
                    code = "", employeeName = "", location = "", designation = "", mobileNumber = "";

                List<HierarchyLevel3> getLevel3Name;
                List<HierarchyLevel4> getLevel4Name;
                List<HierarchyLevel5> getLevel5Name;
                List<HierarchyLevel6> getLevel6Name;

                var dtMrSmsAccuracy = new DataTable();
                var dsAcceptedSMS = new DataSet();
                var dsRejectedSMS = new DataSet();

                #endregion

                #region Initialization of Custom DataTable columns

                dtMrSmsAccuracy.Columns.Add(new DataColumn("Level1Name", Type.GetType("System.String")));
                dtMrSmsAccuracy.Columns.Add(new DataColumn("Level2Name", Type.GetType("System.String")));
                dtMrSmsAccuracy.Columns.Add(new DataColumn("Level3Name", Type.GetType("System.String")));
                dtMrSmsAccuracy.Columns.Add(new DataColumn("Level4Name", Type.GetType("System.String")));
                dtMrSmsAccuracy.Columns.Add(new DataColumn("Level5Name", Type.GetType("System.String")));
                dtMrSmsAccuracy.Columns.Add(new DataColumn("Level6Name", Type.GetType("System.String")));
                dtMrSmsAccuracy.Columns.Add(new DataColumn("Code", Type.GetType("System.String")));
                dtMrSmsAccuracy.Columns.Add(new DataColumn("EmployeeName", Type.GetType("System.String")));
                dtMrSmsAccuracy.Columns.Add(new DataColumn("Location", Type.GetType("System.String")));
                dtMrSmsAccuracy.Columns.Add(new DataColumn("Designation", Type.GetType("System.String")));
                dtMrSmsAccuracy.Columns.Add(new DataColumn("MobileNumber", Type.GetType("System.String")));
                dtMrSmsAccuracy.Columns.Add(new DataColumn("AcceptedSMS", Type.GetType("System.String")));
                dtMrSmsAccuracy.Columns.Add(new DataColumn("RejectedSMS", Type.GetType("System.String")));
                dtMrSmsAccuracy.Columns.Add(new DataColumn("TotalSMS", Type.GetType("System.String")));

                #endregion

                #region Get Active Hierarchy Level

                List<DatabaseLayer.SQL.AppConfiguration> getLevelName =
                    _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

                #endregion

                #region Filter Record on the basis of Active Level

                if (getLevelName.Count != 0)
                {
                    hierarchyName = Convert.ToString(getLevelName[0].SettingName);
                    _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                    if (hierarchyName == "Level3")
                    {
                        #region Doctor Detail

                        if (ddlDoctor.SelectedValue == "-1" || ddlDoctor.SelectedValue == "")
                        {
                            doctorId = 0;
                        }
                        else
                        {
                            doctorId = Convert.ToInt64(ddlDoctor.SelectedValue);
                        }

                        #endregion

                        #region Get Record Via Roles

                        if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
                        {
                            #region Employee Detail + Hierarchy Levels + MR Mobile No

                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level3Id = 0;
                            }
                            else
                            {
                                _level3Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level4Id = 0;
                            }
                            else
                            {
                                _level4Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl3.SelectedValue);
                            }

                            if (ddl4.SelectedValue == "-1" || ddl4.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl4.SelectedValue);
                            }

                            if (ddl44.SelectedValue == "-1" || ddl44.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl44.SelectedValue);
                            }

                            _getMobileNumber = _dataContext.sp_EmployeesSelect(employeeId).ToList();

                            if (_getMobileNumber.Count > 0)
                            {
                                mobileNumber = _getMobileNumber[0].MobileNumber;
                            }
                            else
                            {
                                mobileNumber = "0";
                            }

                            #endregion

                            #region Select Record on the basis of Days Select

                            _getEmployee = _dataContext.sp_EmployeeSelectByHierarchy(hierarchyName, 0, 0, _level3Id, _level4Id,
                                _level5Id, _level6Id, Convert.ToInt32(employeeId)).ToList();

                            #endregion
                        }
                        else if (_currentUserRole == "rl3")
                        {
                            #region Employee Detail + Hierarchy Levels + MR Mobile No

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));

                            level3Id = _level3Id;

                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level4Id = 0;
                            }
                            else
                            {
                                _level4Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl3.SelectedValue);
                            }

                            if (ddl33.SelectedValue == "-1" || ddl33.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl33.SelectedValue);
                            }

                            _getMobileNumber = _dataContext.sp_EmployeesSelect(employeeId).ToList();

                            if (_getMobileNumber.Count > 0)
                            {
                                mobileNumber = _getMobileNumber[0].MobileNumber;
                            }
                            else
                            {
                                mobileNumber = "0";
                            }

                            #endregion

                            #region Select Record on the basis of Days Select

                            _getEmployee = _dataContext.sp_EmployeeSelectByHierarchy(hierarchyName, 0, 0, _level3Id, _level4Id,
                            _level5Id, _level6Id, Convert.ToInt32(employeeId)).ToList();

                            #endregion
                        }
                        else if (_currentUserRole == "rl4")
                        {
                            #region Employee Detail + Hierarchy Levels + Doctor + MR Mobile No

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));

                            level3Id = _level3Id;
                            level4Id = _level4Id;

                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level5Id = 0;
                            }
                            else
                            {
                                _level5Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl2.SelectedValue);
                            }

                            if (ddl22.SelectedValue == "-1" || ddl22.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl22.SelectedValue);
                            }

                            _getMobileNumber = _dataContext.sp_EmployeesSelect(employeeId).ToList();

                            if (_getMobileNumber.Count > 0)
                            {
                                mobileNumber = _getMobileNumber[0].MobileNumber;
                            }
                            else
                            {
                                mobileNumber = "0";
                            }

                            #endregion

                            #region Select Record on the basis of Days Select

                            _getEmployee = _dataContext.sp_EmployeeSelectByHierarchy(hierarchyName, 0, 0, _level3Id, _level4Id,
                             _level5Id, _level6Id, Convert.ToInt32(employeeId)).ToList();

                            #endregion
                        }
                        else if (_currentUserRole == "rl5")
                        {
                            #region Employee Detail + Hierarchy Levels + MR Mobile No

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));

                            level3Id = _level3Id;
                            level4Id = _level4Id;
                            level5Id = _level5Id;

                            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                            {
                                _level6Id = 0;
                            }
                            else
                            {
                                _level6Id = Convert.ToInt32(ddl1.SelectedValue);
                            }

                            if (ddl11.SelectedValue == "-1" || ddl11.SelectedValue == "")
                            {
                                employeeId = 0;
                            }
                            else
                            {
                                employeeId = Convert.ToInt32(ddl11.SelectedValue);
                            }

                            _getMobileNumber = _dataContext.sp_EmployeesSelect(employeeId).ToList();

                            if (_getMobileNumber.Count > 0)
                            {
                                mobileNumber = _getMobileNumber[0].MobileNumber;
                            }
                            else
                            {
                                mobileNumber = "0";
                            }

                            #endregion

                            #region Select Record on the basis of Days Select

                            _getEmployee = _dataContext.sp_EmployeeSelectByHierarchy(hierarchyName, 0, 0, _level3Id, _level4Id,
                             _level5Id, _level6Id, Convert.ToInt32(employeeId)).ToList();

                            #endregion
                        }
                        else if (_currentUserRole == "rl6")
                        {
                            #region Employee Detail + Hierarchy Levels + Date

                            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                            employeeId = _currentUser.EmployeeId;

                            _getMobileNumber = _dataContext.sp_EmployeesSelect(employeeId).ToList();

                            if (_getMobileNumber.Count > 0)
                            {
                                mobileNumber = _getMobileNumber[0].MobileNumber;
                            }
                            else
                            {
                                mobileNumber = "0";
                            }

                            #endregion

                            #region Select Record on the basis of Days Select

                            _getEmployee = _dataContext.sp_EmployeeSelectByHierarchy(hierarchyName, 0, 0, _level3Id, _level4Id,
                              _level5Id, _level6Id, Convert.ToInt32(employeeId)).ToList();

                            #endregion
                        }
                        #endregion

                        #region Extract Data from Source

                        foreach (var mr in _getEmployee)
                        {
                            #region Get Hierarchy Levels Name

                            if (hierarchyName == "Level3")
                            {
                                getLevel3Name = _dataContext.sp_HierarchyLevel3Select(Convert.ToInt32(mr.LevelId3), null).ToList();
                                getLevel4Name = _dataContext.sp_HierarchyLevel4Select(Convert.ToInt32(mr.LevelId4), null).ToList();
                                getLevel5Name = _dataContext.sp_HierarchyLevel5Select(Convert.ToInt32(mr.LevelId5), null).ToList();
                                getLevel6Name = _dataContext.sp_HierarchyLevel6Select(Convert.ToInt32(mr.LevelId6), null).ToList();

                                if (getLevel3Name.Count != 0 && getLevel4Name.Count != 0 && getLevel5Name.Count != 0 && getLevel6Name.Count != 0)
                                {
                                    level3Name = getLevel3Name[0].LevelName;
                                    level4Name = getLevel4Name[0].LevelName;
                                    level5Name = getLevel5Name[0].LevelName;
                                    level6Name = getLevel6Name[0].LevelName;
                                }
                            }

                            #endregion

                            #region Get Employee Name + Mobile Number + Location

                            _getEmployeesBioData =
                                    _dataContext.sp_EmplyeeHierarchySelectByMR(Convert.ToInt32(mr.LevelId6), Convert.ToInt64(mr.EmployeeId)).ToList();

                            if (_getEmployeesBioData.Count != 0)
                            {
                                employeeName = _getEmployeesBioData[0].FirstName + " " + _getEmployeesBioData[0].MiddleName + " " + _getEmployeesBioData[0].LastName;
                                mobileNumber = _getEmployeesBioData[0].MobileNumber;

                                var getAddress = _dataContext.sp_EmployeesAddressesSelectByEmployee(employeeId).ToList();

                                if (getAddress.Count > 0)
                                {
                                    location = getAddress[0].Address1;
                                }

                                var getDesginationId = _dataContext.sp_EmployeesSelect(employeeId).ToList();

                                if (getDesginationId.Count > 0)
                                {
                                    var getDesignation = _dataContext.sp_EmployeeDesignationsSelect(Convert.ToInt32(getDesginationId[0].DesignationId), null, null).ToList();

                                    if (getDesignation.Count > 0)
                                    {
                                        designation = getDesignation[0].DesignationName;
                                    }
                                }
                            }

                            #endregion

                            #region Get Doctor Code

                            var getMRDrCode =
                                        _dataContext.sp_DoctorsOfSpoSelectByEmployee(employeeId, doctorId, null, null).ToList();

                            if (getMRDrCode.Count > 0)
                            {
                                code = getMRDrCode[0].DoctorCode;
                            }


                            #endregion

                            #region Get Accepted SMS + Rejected SMS Count w.r.t Time Stamp

                            if (txtStartingDate.Text != "" && txtEndingDate.Text != "")
                            {
                                if (doctorId > 0)
                                {
                                    #region Accepted Messages

                                    _nvCollection.Clear();
                                    _nvCollection.Add("@AcceptedSMS-int", Convert.ToString(1));
                                    _nvCollection.Add("@RejectedSMS-int", Convert.ToString(0));
                                    _nvCollection.Add("@MobileNo-nvarchar(20)", Convert.ToString(mobileNumber));
                                    _nvCollection.Add("@Code-varchar(10)", Convert.ToString(code));
                                    _nvCollection.Add("@StartingDate-DateTime", Convert.ToString(Convert.ToDateTime(txtStartingDate.Text)));
                                    _nvCollection.Add("@EndingDate-DateTime", Convert.ToString(Convert.ToDateTime(txtEndingDate.Text)));
                                    _nvCollection.Add("@Type-int", Convert.ToString(1));
                                    dsAcceptedSMS = GetData("sp_SmsInboundsSummaryWithDcr", _nvCollection);

                                    #endregion

                                    #region Rejected Messages

                                    _nvCollection.Clear();
                                    _nvCollection.Add("@AcceptedSMS-int", Convert.ToString(0));
                                    _nvCollection.Add("@RejectedSMS-int", Convert.ToString(1));
                                    _nvCollection.Add("@MobileNo-nvarchar(20)", Convert.ToString(mobileNumber));
                                    _nvCollection.Add("@Code-varchar(10)", Convert.ToString(code));
                                    _nvCollection.Add("@StartingDate-DateTime", Convert.ToString(Convert.ToDateTime(txtStartingDate.Text)));
                                    _nvCollection.Add("@EndingDate-DateTime", Convert.ToString(Convert.ToDateTime(txtEndingDate.Text)));
                                    _nvCollection.Add("@Type-int", Convert.ToString(1));
                                    dsRejectedSMS = GetData("sp_SmsInboundsSummaryWithDcr", _nvCollection);

                                    #endregion
                                }
                                else
                                {
                                    #region Accepted Messages

                                    _nvCollection.Clear();
                                    _nvCollection.Add("@AcceptedSMS-int", Convert.ToString(1));
                                    _nvCollection.Add("@RejectedSMS-int", Convert.ToString(0));
                                    _nvCollection.Add("@MobileNo-nvarchar(20)", Convert.ToString(mobileNumber));
                                    _nvCollection.Add("@Code-varchar(10)", Convert.ToString(code));
                                    _nvCollection.Add("@StartingDate-DateTime", Convert.ToString(Convert.ToDateTime(txtStartingDate.Text)));
                                    _nvCollection.Add("@EndingDate-DateTime", Convert.ToString(Convert.ToDateTime(txtEndingDate.Text)));
                                    _nvCollection.Add("@Type-int", Convert.ToString(0));
                                    dsAcceptedSMS = GetData("sp_SmsInboundsSummaryWithDcr", _nvCollection);

                                    #endregion

                                    #region Rejected Messages

                                    _nvCollection.Clear();
                                    _nvCollection.Add("@AcceptedSMS-int", Convert.ToString(0));
                                    _nvCollection.Add("@RejectedSMS-int", Convert.ToString(1));
                                    _nvCollection.Add("@MobileNo-nvarchar(20)", Convert.ToString(mobileNumber));
                                    _nvCollection.Add("@Code-varchar(10)", Convert.ToString(code));
                                    _nvCollection.Add("@StartingDate-DateTime", Convert.ToString(Convert.ToDateTime(txtStartingDate.Text)));
                                    _nvCollection.Add("@EndingDate-DateTime", Convert.ToString(Convert.ToDateTime(txtEndingDate.Text)));
                                    _nvCollection.Add("@Type-int", Convert.ToString(0));
                                    dsRejectedSMS = GetData("sp_SmsInboundsSummaryWithDcr", _nvCollection);

                                    #endregion
                                }
                            }
                            else
                            {
                                if (doctorId > 0)
                                {
                                    #region Accepted Messages

                                    _nvCollection.Clear();
                                    _nvCollection.Add("@AcceptedSMS-int", Convert.ToString(1));
                                    _nvCollection.Add("@RejectedSMS-int", Convert.ToString(0));
                                    _nvCollection.Add("@MobileNo-nvarchar(20)", Convert.ToString(mobileNumber));
                                    _nvCollection.Add("@Code-varchar(10)", Convert.ToString(code));
                                    _nvCollection.Add("@StartingDate-DateTime", Convert.ToString(DateTime.Now));
                                    _nvCollection.Add("@EndingDate-DateTime", Convert.ToString(DateTime.Now));
                                    _nvCollection.Add("@Type-int", Convert.ToString(1));
                                    dsAcceptedSMS = GetData("sp_SmsInboundsSummaryWithDcr", _nvCollection);

                                    #endregion

                                    #region Rejected Messages

                                    _nvCollection.Clear();
                                    _nvCollection.Add("@AcceptedSMS-int", Convert.ToString(0));
                                    _nvCollection.Add("@RejectedSMS-int", Convert.ToString(1));
                                    _nvCollection.Add("@MobileNo-nvarchar(20)", Convert.ToString(mobileNumber));
                                    _nvCollection.Add("@Code-varchar(10)", Convert.ToString(code));
                                    _nvCollection.Add("@StartingDate-DateTime", Convert.ToString(DateTime.Now));
                                    _nvCollection.Add("@EndingDate-DateTime", Convert.ToString(DateTime.Now));
                                    _nvCollection.Add("@Type-int", Convert.ToString(1));
                                    dsRejectedSMS = GetData("sp_SmsInboundsSummaryWithDcr", _nvCollection);

                                    #endregion
                                }
                                else
                                {
                                    #region Accepted Messages

                                    _nvCollection.Clear();
                                    _nvCollection.Add("@AcceptedSMS-int", Convert.ToString(1));
                                    _nvCollection.Add("@RejectedSMS-int", Convert.ToString(0));
                                    _nvCollection.Add("@MobileNo-nvarchar(20)", Convert.ToString(mobileNumber));
                                    _nvCollection.Add("@Code-varchar(10)", Convert.ToString(code));
                                    _nvCollection.Add("@StartingDate-DateTime", Convert.ToString(DateTime.Now));
                                    _nvCollection.Add("@EndingDate-DateTime", Convert.ToString(DateTime.Now));
                                    _nvCollection.Add("@Type-int", Convert.ToString(0));
                                    dsAcceptedSMS = GetData("sp_SmsInboundsSummaryWithDcr", _nvCollection);

                                    #endregion

                                    #region Rejected Messages

                                    _nvCollection.Clear();
                                    _nvCollection.Add("@AcceptedSMS-int", Convert.ToString(0));
                                    _nvCollection.Add("@RejectedSMS-int", Convert.ToString(1));
                                    _nvCollection.Add("@MobileNo-nvarchar(20)", Convert.ToString(mobileNumber));
                                    _nvCollection.Add("@Code-varchar(10)", Convert.ToString(code));
                                    _nvCollection.Add("@StartingDate-DateTime", Convert.ToString(DateTime.Now));
                                    _nvCollection.Add("@EndingDate-DateTime", Convert.ToString(DateTime.Now));
                                    _nvCollection.Add("@Type-int", Convert.ToString(0));
                                    dsRejectedSMS = GetData("sp_SmsInboundsSummaryWithDcr", _nvCollection);

                                    #endregion
                                }
                            }

                            #endregion

                            #region Get Total SMS

                            totalSMS = Convert.ToInt32(dsAcceptedSMS.Tables[0].Rows[0][0]) + Convert.ToInt32(dsRejectedSMS.Tables[0].Rows[0][0]);

                            #endregion

                            #region Insert Row to DataTable

                            dtMrSmsAccuracy.Rows.Add(level1Name, level2Name, level3Name, level4Name, level5Name, level6Name, code,
                                employeeName, location, designation, mobileNumber, dsAcceptedSMS.Tables[0].Rows[0][0].ToString(),
                                dsRejectedSMS.Tables[0].Rows[0][0].ToString(), totalSMS);

                            #endregion
                        }

                        #endregion

                        #region Display Report

                        rpt.Load(Server.MapPath("MRSMSAccuracy/rptDivisionDateWiseAccuracyReport.rpt"));
                        rpt.SetDataSource(dtMrSmsAccuracy);
                        Session["reportdoc"] = rpt;
                        CrystalReportViewer1.ReportSource = rpt;
                        rpt.ExportToDisk(ExportFormatType.PortableDocFormat, pdfFile1);
                        BtnEmail.Visible = true;
                        #endregion
                    }
                }

                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from MRSMSAccuracy is " + exception.Message;
            }
        }

        private void MessageCount()
        {
            try
            {
                #region Initialization

                int acceptSMS = 0, rejectSMS = 0, totalSMS = 0;
                string hierarchyName = "";

                var dtMessageCount = new DataTable();
                List<SMSInbound> acceptedSMS;
                List<SMSInbound> rejectedSMS;

                #endregion

                #region Initialization of Custom DataTable columns

                dtMessageCount.Columns.Add(new DataColumn("receivedSMSdate", Type.GetType("System.String")));
                dtMessageCount.Columns.Add(new DataColumn("rejectedSMS", Type.GetType("System.Int32")));
                dtMessageCount.Columns.Add(new DataColumn("acceptedSMS", Type.GetType("System.Int32")));
                dtMessageCount.Columns.Add(new DataColumn("totalSMS", Type.GetType("System.Int32")));

                #endregion

                #region Get Active Hierarchy Level

                List<DatabaseLayer.SQL.AppConfiguration> getLevelName =
                    _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

                #endregion

                #region Filter Record on the basis of Active Level

                if (getLevelName.Count != 0)
                {
                    hierarchyName = Convert.ToString(getLevelName[0].SettingName);
                    _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                    if (hierarchyName == "Level3")
                    {
                        #region Get Accepted SMS + Rejected SMS Count w.r.t Time Stamp

                        if (txtStartingDate.Text != "" && txtEndingDate.Text != "")
                        {
                            #region Accepted Messages

                            acceptedSMS =
                                _dataContext.sp_SMSInboundSelect(Convert.ToDateTime(txtStartingDate.Text), Convert.ToDateTime(txtEndingDate.Text), 1).ToList();

                            #endregion

                            #region Rejected Messages

                            rejectedSMS =
                                _dataContext.sp_SMSInboundSelect(Convert.ToDateTime(txtStartingDate.Text), Convert.ToDateTime(txtEndingDate.Text), 2).ToList();

                            #endregion
                        }
                        else
                        {
                            #region Accepted Messages

                            acceptedSMS =
                                _dataContext.sp_SMSInboundSelect(DateTime.Now, DateTime.Now, 1).ToList();

                            #endregion

                            #region Rejected Messages

                            rejectedSMS =
                                _dataContext.sp_SMSInboundSelect(DateTime.Now, DateTime.Now, 2).ToList();

                            #endregion
                        }

                        #endregion

                        #region Get SMS Count

                        acceptSMS = Convert.ToInt32(acceptedSMS.Count);
                        rejectSMS = Convert.ToInt32(rejectedSMS.Count);
                        totalSMS = acceptSMS + rejectSMS;

                        #endregion

                        #region Insert Row to DataTable

                        if (acceptedSMS.Count != 0)
                        {
                            dtMessageCount.Rows.Add(acceptedSMS[0].CreatedDate.ToShortDateString(), rejectSMS, acceptSMS, totalSMS);
                        }
                        #endregion

                        #region Display Report

                        rpt.Load(Server.MapPath("MessageCount/MessageCount.rpt"));
                        rpt.SetDataSource(dtMessageCount);
                        Session["reportdoc"] = rpt;
                        CrystalReportViewer1.ReportSource = rpt;
                        rpt.ExportToDisk(ExportFormatType.PortableDocFormat, pdfFile1);
                        BtnEmail.Visible = true;
                        #endregion
                    }
                }

                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from IncomingSMSSummary is " + exception.Message;
            }
        }





        private void HideHierarchy()
        {
            tblGHL.Visible = false;
            col1.Visible = false;
            col2.Visible = false;
            col3.Visible = false;
            col4.Visible = false;
            tblUHL.Visible = false;
            col11.Visible = false;
            col22.Visible = false;
            col33.Visible = false;
            col44.Visible = false;
            tblFilter.Visible = false;
            tdDoctor.Visible = false;
            tdJointVisit.Visible = false;
            tdProduct.Visible = false;
            tdClass.Visible = false;
            tdVisitShift.Visible = false;
            btnGenerate.Visible = false;
            lblError.Text = "";
        }

        private void ClearField()
        {
            lblError.Text = "";
        }

        private void sendMail()
        {
            MailMessage msg = new MailMessage();
            try
            {

                msg.From = new MailAddress(_currentUser.Email);

                msg.To.Add(txtTo.Text);//Text Box for To Address  

                msg.Subject = ActiveReport + " uptil " + DateTime.Now.ToString() + " date"; //Text Box for subject  
                msg.Attachments.Add(new Attachment(pdfFile1));
                msg.IsBodyHtml = true;

                string strBody = ActiveReport;

                msg.Body = strBody;//Text Box for body  

                System.Net.NetworkCredential networkCredentials = new
                System.Net.NetworkCredential(_currentUser.Email, txtPass.Text);

                SmtpClient smtpClient = new SmtpClient();
                smtpClient.EnableSsl = true;
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = networkCredentials;

                smtpClient.Host = ConfigurationManager.AppSettings["Smtphost"].ToString(); ;

                smtpClient.Port = 587;
                smtpClient.Send(msg);
            }
            catch (Exception ex)
            {
                lblError.Text = "Exception is raised from JointVisitSummary is " + ex.Message;
            }
            finally
            {
                msg.Dispose();
            }
        }

        #endregion

        #region Events
        protected void Page_Load(object sender, EventArgs e)
        {
            if (IsValidUser())
            {
                lblError.ForeColor = Color.Red;
                _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());

                if (!IsPostBack)
                {
                    this.HideHierarchy();
                    this.ClearField();
                    cStartingDate.TextBoxId = txtStartingDate.ClientID;
                    cEndingDate.TextBoxId = txtEndingDate.ClientID;

                    ddlProduct.Items.Clear();
                    ddlProduct.DataSource = _dataContext.sp_SamplesSelectByMR1().ToList();
                    ddlProduct.DataBind();
                    ddlProduct.Items.Insert(0, new ListItem("ALL", "0"));

                    if (Convert.ToString(Session["CurrentUserRole"]) == "rl6")
                    {
                        ddlDoctor.Items.Clear();
                        ddlDoctor.DataSource = _dataContext.sp_DoctorsOfSpoSelectByEmployee(Convert.ToInt64(_currentUser.EmployeeId), null, null, null).ToList();
                        ddlDoctor.DataBind();
                        ddlDoctor.Items.Insert(0, new ListItem("ALL", "0"));
                        ddlReports.Items[11].Enabled = false;
                    }

                    cStartingDate.SelectedDate = DateTime.Now;
                    cEndingDate.SelectedDate = DateTime.Now;
                }



                if (Session["reportdoc"] != null)
                {
                    if (ddlReports.SelectedIndex != 0)
                    {
                        CrystalReportViewer1.ReportSource = (ReportDocument)Session["reportdoc"];
                        CrystalReportViewer1.RefreshReport();
                        CrystalReportViewer1.DataBind();
                    }
                }
            }
            else
            {
                Response.Redirect("../../Form/Login.aspx");
            }
        }

        protected void ddlReports_SelectedIndexChanged(object sender, EventArgs e)
        {
            Session["reportdoc"] = null;
            CrystalReportViewer1.ReportSource = (ReportDocument)Session["reportdoc"];
            CrystalReportViewer1.RefreshReport();
            CrystalReportViewer1.DataBind();

            //ddlDoctor.Items.Clear();
            //ddlDoctor.Items.Insert(0, new ListItem("ALL", "0")); ddlProduct.Items.Clear();
            //ddlProduct.Items.Insert(0, new ListItem("ALL", "0"));



            int reportType = Convert.ToInt32(ddlReports.SelectedValue);

            if (reportType > 0)
            {
                #region Initialize Settings

                this.RetrieveAppConfig();
                this.GetCurrentUserDetail(0);
                this.EnableHierarchyViaLevel();
                this.FillDropDownList();
                lblError.Text = "";
                tblGHL.Visible = true;
                tblFilter.Visible = true;
                btnGenerate.Visible = true;

                #endregion

                if (reportType == 1)
                {
                    #region Daily Calls Report

                    #region Enable / Disable Fields

                    tdDoctor.Visible = true;
                    tdJointVisit.Visible = true;
                    tdVisitShift.Visible = true;
                    tdendingdate.Visible = true;

                    #endregion

                    #endregion
                }
                else if (reportType == 2)
                {
                    #region Described Products

                    #region Enable / Disable Fields

                    tdDoctor.Visible = true;
                    tdJointVisit.Visible = true;
                    tdVisitShift.Visible = true;
                    tdendingdate.Visible = true;
                    #endregion

                    #endregion
                }
                else if (reportType == 3)
                {
                    #region Detailed Products Frequency

                    #region Enable / Disable Fields

                    tdDoctor.Visible = true;
                    tdJointVisit.Visible = true;
                    tdVisitShift.Visible = true;
                    tdendingdate.Visible = true;
                    #endregion

                    #endregion
                }
                else if (reportType == 4)
                {
                    #region Incoming SMS Summary

                    #region Enable / Disable Fields

                    tblFilter.Visible = true;
                    tdDoctor.Visible = false;
                    tdJointVisit.Visible = false;
                    tdProduct.Visible = false;
                    tdVisitShift.Visible = false;
                    tdClass.Visible = false;
                    tdendingdate.Visible = true;
                    #endregion

                    #endregion
                }
                else if (reportType == 5)
                {
                    #region JV By Class

                    #region Enable / Disable Fields

                    tdDoctor.Visible = false;
                    tdJointVisit.Visible = true;
                    tdVisitShift.Visible = true;
                    tdstartdate.Visible = true;
                    tdendingdate.Visible = false;


                    #endregion

                    #endregion
                }
                else if (reportType == 6)
                {
                    #region KPI By Class

                    #region Enable / Disable Fields

                    tdDoctor.Visible = true;
                    tdendingdate.Visible = true;
                    #endregion

                    #endregion
                }
                else if (reportType == 7)
                {
                    #region Message Count

                    #region Enable / Disable Fields

                    tblGHL.Visible = false;
                    tblUHL.Visible = false;
                    tdDoctor.Visible = false;
                    tdJointVisit.Visible = false;
                    tdProduct.Visible = false;
                    tdClass.Visible = false;
                    tdVisitShift.Visible = false;
                    tdendingdate.Visible = true;
                    #endregion

                    #endregion
                }
                else if (reportType == 8)
                {
                    #region Monthly Visit Analysis

                    #region Enable / Disable Fields

                    tdDoctor.Visible = false;
                    tdJointVisit.Visible = false;
                    tdProduct.Visible = false;
                    tdClass.Visible = false;
                    tdVisitShift.Visible = false;
                    tdendingdate.Visible = true;
                    #endregion

                    #endregion
                }
                else if (reportType == 9)
                {
                    #region MR SMS Accuracy

                    #region Enable / Disable Fields

                    tblFilter.Visible = false;

                    #endregion

                    #endregion
                }
                else if (reportType == 10)
                {
                    #region MR Doctors

                    #region Enable / Disable Fields

                    tblFilter.Visible = false;

                    #endregion

                    #endregion
                }
                else if (reportType == 11)
                {
                    #region MRs List

                    #region Enable / Disable Fields

                    tblFilter.Visible = false;

                    #endregion

                    #endregion
                }
                else if (reportType == 12)
                {
                    #region Sample Issued To Doctor

                    #region Enable / Disable Fields

                    tdDoctor.Visible = true;
                    tdJointVisit.Visible = false;
                    tdProduct.Visible = true;
                    tdClass.Visible = false;
                    tdVisitShift.Visible = true;
                    tdendingdate.Visible = true;
                    #endregion

                    #endregion
                }
                else if (reportType == 13)
                {
                    #region SMS Status

                    #region Enable / Disable Fields

                    tblGHL.Visible = false;
                    tblUHL.Visible = false;
                    tdDoctor.Visible = false;
                    tdJointVisit.Visible = false;
                    tdProduct.Visible = false;
                    tdClass.Visible = false;
                    tdVisitShift.Visible = false;
                    tdendingdate.Visible = true;
                    #endregion

                    #endregion
                }
                else if (reportType == 14)
                {
                    #region Visit By Time

                    #region Enable / Disable Fields

                    tblUHL.Visible = false;
                    tdDoctor.Visible = false;
                    tdJointVisit.Visible = false;
                    tdProduct.Visible = false;
                    tdClass.Visible = false;
                    tdVisitShift.Visible = false;
                    tdendingdate.Visible = true;
                    #endregion

                    #endregion
                }
                else if (reportType == 15)
                {
                    #region JV Detailed Frequency

                    #region Enable / Disable Fields

                    tdDoctor.Visible = false;
                    tdJointVisit.Visible = false;
                    tdVisitShift.Visible = true;
                    tdendingdate.Visible = true;
                    #endregion

                    #endregion
                }
                else if (reportType == 16)
                {
                    #region Sample Management Report
                    #region Enable / Disable Fields

                    tdDoctor.Visible = false;
                    tdJointVisit.Visible = true;
                    tdVisitShift.Visible = true;
                    tdstartdate.Visible = true;
                    tdendingdate.Visible = false;

                    #endregion
                    #endregion
                }
                else if (reportType == 17)
                {
                    #region JV By Region

                    #region Enable / Disable Fields

                    tdDoctor.Visible = false;
                    tdJointVisit.Visible = true;
                    tdVisitShift.Visible = true;
                    tdstartdate.Visible = true;
                    tdendingdate.Visible = false;

                    #endregion

                    #endregion
                }
                else if (reportType == 18)
                {
                    #region Detailed Products Frequency

                    #region Enable / Disable Fields

                    tdDoctor.Visible = true;
                    tdJointVisit.Visible = true;
                    tdVisitShift.Visible = true;
                    tdendingdate.Visible = true;
                    #endregion

                    #endregion
                }
            }
            else
            {
                HideHierarchy();
                lblError.Text = "Please select report type!";
                lblError.ForeColor = Color.Red;
            }
        }

        protected void btnGenerate_Click(object sender, EventArgs e)
        {
            Session["reportdoc"] = null;
            try
            {
                BtnEmail.Visible = true;
                if (ddlReports.SelectedValue != "-1")
                {
                    lblError.Text = "";

                    #region Get Employee Hierarchy

                    int reportType = Convert.ToInt32(ddlReports.SelectedValue);
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

                        this.GetCurrentUserDetail(0);
                    }

                    #endregion

                    if (_glbVarLevelName == "Level3")
                    {
                        if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
                        {
                            #region Admin / HeadOffice

                            if (reportType == 1)
                            {
                                #region Daily Calls Report

                                lblError.Text = "";
                                this.DailyCallReport();
                                ActiveReport = "Daily Calls Report";

                                #endregion
                            }
                            else if (reportType == 2)
                            {
                                #region Described Products

                                this.DescribedProducts();
                                ActiveReport = "Described Products";


                                #endregion
                            }
                            else if (reportType == 3)
                            {
                                #region Detailed Products Frequency

                                this.DetailedProductFrequency();
                                ActiveReport = "Detailed Products Frequency";


                                #endregion
                            }
                            else if (reportType == 4)
                            {
                                #region Incoming SMS Summary

                                this.IncomingSMSSummary();
                                ActiveReport = "Incoming SMS Summary";


                                #endregion
                            }
                            else if (reportType == 5)
                            {
                                #region JV By Class

                                this.JVByClass();
                                ActiveReport = "JV By Class";

                                #endregion
                            }
                            else if (reportType == 6)
                            {
                                #region KPI By Class

                                this.KPIByClass();
                                ActiveReport = "KPI By Class";


                                #endregion
                            }
                            else if (reportType == 7)
                            {
                                #region Message Count

                                this.MessageCount();
                                ActiveReport = "Message Count";

                                #endregion
                            }
                            else if (reportType == 8)
                            {
                                #region Monthly Visit Analysis

                                this.MonthlyVisitAnalysis();
                                ActiveReport = "Monthly Visit Analysis";

                                #endregion
                            }
                            else if (reportType == 9)
                            {
                                #region MR SMS Accuracy

                                this.MRSMSAccuracy();
                                ActiveReport = "Monthly Visit Analysis";

                                #endregion
                            }
                            else if (reportType == 10)
                            {
                                #region MR Doctor
                                this.MrDrList();
                                ActiveReport = "MR Doctor";
                                #endregion
                            }
                            else if (reportType == 11)
                            {
                                #region MRs List

                                this.MrList();
                                ActiveReport = "MRs List";

                                #endregion
                            }
                            else if (reportType == 12)
                            {
                                #region Samples Issued To Doctor

                                this.SampleIssuedToDoc();
                                ActiveReport = "Samples Issued To Doctor";

                                #endregion
                            }
                            else if (reportType == 13)
                            {
                                #region SMS Status

                                this.SmsStatus();
                                ActiveReport = "SMS Status";

                                #endregion
                            }
                            else if (reportType == 14)
                            {
                                #region Visit By Time

                                this.VisitByTime();
                                ActiveReport = "Visit By Time";

                                #endregion
                            }
                            else if (reportType == 15)
                            {
                                #region JV Detailed Frequency

                                this.JVReport();

                                #endregion
                            }
                            else if (reportType == 16)
                            {
                                #region Deport Report Work

                                this.DepotReport();

                                #endregion
                            }
                            else if (reportType == 17)
                            {
                                #region JV By Region
                                this.JVByRegion();
                                #endregion
                            }
                            else if (reportType == 18)
                            {
                                #region Detailed Products Frequency By Division
                                this.DetailedProductFrequencyByDivision();
                                #endregion
                            }


                            #endregion
                        }
                        else if (_currentUserRole == "rl3")
                        {
                            #region RL3

                            if (reportType == 1)
                            {
                                #region Daily Calls Report

                                if (ddl33.SelectedValue != "-1")
                                {
                                    lblError.Text = "";

                                    if (ddlDoctor.SelectedValue != "-1")
                                    {
                                        lblError.Text = "";

                                        if (ddlVisitShift.SelectedValue != "-1")
                                        {
                                            lblError.Text = "";

                                            if (ddlJointVisit.SelectedValue != "-1")
                                            {
                                                lblError.Text = "";
                                                this.DailyCallReport();
                                                ActiveReport = "Daily Calls Report";
                                            }
                                            else
                                            {
                                                lblError.Text = "Joint Visit must selected!";
                                                lblError.ForeColor = Color.Red;
                                            }
                                        }
                                        else
                                        {
                                            lblError.Text = "Visit Shift must selected!";
                                            lblError.ForeColor = Color.Red;
                                        }
                                    }
                                    else
                                    {
                                        lblError.Text = "Doctor must be selected!";
                                        lblError.ForeColor = Color.Red;
                                    }
                                }
                                else
                                {
                                    lblError.Text = "MIO must be selected!!";
                                    lblError.ForeColor = Color.Red;
                                }

                                #endregion
                            }
                            else if (reportType == 2)
                            {
                                #region Described Products

                                if (ddl33.SelectedValue != "-1")
                                {
                                    if (ddlDoctor.SelectedValue != "-1" || ddlClass.SelectedValue != "-1")
                                    {
                                        if (ddlVisitShift.SelectedValue != "-1")
                                        {
                                            if (ddlJointVisit.SelectedValue != "-1")
                                            {
                                                this.DescribedProducts();
                                                ActiveReport = "Described Products";
                                            }
                                            else
                                            {
                                                lblError.Text = "Joint Visit Must select!";
                                                lblError.ForeColor = Color.Red;
                                            }
                                        }
                                        else
                                        {
                                            lblError.Text = "Visit Shift Must select!";
                                            lblError.ForeColor = Color.Red;
                                        }
                                    }
                                    else
                                    {
                                        lblError.Text = "Select doctor or either class!";
                                        lblError.ForeColor = Color.Red;
                                    }
                                }
                                else
                                {
                                    lblError.Text = "Select Employee!";
                                    lblError.ForeColor = Color.Red;
                                }

                                #endregion
                            }
                            else if (reportType == 3)
                            {
                                #region Detailed Products Frequency

                                if (ddl33.SelectedValue != "-1")
                                {
                                    if (ddlDoctor.SelectedValue != "-1")
                                    {
                                        if (ddlVisitShift.SelectedValue != "-1")
                                        {
                                            if (ddlJointVisit.SelectedValue != "-1")
                                            {
                                                this.DetailedProductFrequency();
                                                ActiveReport = "Detailed Products Frequency";

                                            }
                                            else
                                            {
                                                lblError.Text = "Select Joint Visit!";
                                                lblError.ForeColor = Color.Red;
                                            }
                                        }
                                        else
                                        {
                                            lblError.Text = "Select Visit Shift!";
                                            lblError.ForeColor = Color.Red;
                                        }
                                    }
                                    else
                                    {
                                        lblError.Text = "Select Doctor!";
                                        lblError.ForeColor = Color.Red;
                                    }
                                }
                                else
                                {
                                    lblError.Text = "Select Employee!";
                                    lblError.ForeColor = Color.Red;
                                }

                                #endregion
                            }
                            else if (reportType == 4)
                            {
                                #region Incoming SMS Summary

                                if (ddl33.SelectedValue != "-1")
                                {
                                    this.IncomingSMSSummary();
                                    ActiveReport = "Incoming SMS Summary";

                                }
                                else
                                {
                                    lblError.Text = "Select Employee!";
                                    lblError.ForeColor = Color.Red;
                                }

                                #endregion
                            }
                            else if (reportType == 5)
                            {
                                #region JV By Class

                                if (ddl33.SelectedValue != "-1")
                                {
                                    if (ddlDoctor.SelectedValue != "-1" || ddlClass.SelectedValue != "-1")
                                    {
                                        if (ddlVisitShift.SelectedValue != "-1")
                                        {
                                            if (ddlJointVisit.SelectedValue != "-1")
                                            {
                                                this.JVByClass();
                                                ActiveReport = "JV By Class";

                                            }
                                            else
                                            {
                                                lblError.Text = "Joint Visit Must select!";
                                                lblError.ForeColor = Color.Red;
                                            }
                                        }
                                        else
                                        {
                                            lblError.Text = "Visit Shift Must select!";
                                            lblError.ForeColor = Color.Red;
                                        }
                                    }
                                    else
                                    {
                                        lblError.Text = "Select doctor or either class!";
                                        lblError.ForeColor = Color.Red;
                                    }
                                }
                                else
                                {
                                    lblError.Text = "Select Employee!";
                                    lblError.ForeColor = Color.Red;
                                }

                                #endregion
                            }
                            else if (reportType == 6)
                            {
                                #region KPI By Class

                                this.KPIByClass();
                                ActiveReport = "KPI By Class";


                                #endregion
                            }
                            else if (reportType == 7)
                            {
                                #region Message Count

                                this.MessageCount();
                                ActiveReport = "Message Count";

                                #endregion
                            }
                            else if (reportType == 8)
                            {
                                #region Monthly Visit Analysis

                                if (ddl44.SelectedValue != "-1")
                                {
                                    this.MonthlyVisitAnalysis();
                                    ActiveReport = "Monthly Visit Analysis";
                                }
                                else
                                {
                                    lblError.Text = "Select Employee!";
                                    lblError.ForeColor = Color.Red;
                                }

                                #endregion
                            }
                            else if (reportType == 9)
                            {
                                #region MR SMS Accuracy

                                this.MRSMSAccuracy();
                                ActiveReport = "MR SMS Accuracy";

                                #endregion
                            }
                            else if (reportType == 10)
                            {
                                #region MR Doctor

                                if (ddl33.SelectedValue != "-1" || ddl33.SelectedValue != "")
                                {
                                    lblError.Text = "";
                                    this.MrDrList();
                                    ActiveReport = "MR Doctor";

                                }
                                else
                                {
                                    lblError.Text = "MIO must be selected!";
                                    lblError.ForeColor = Color.Red;
                                }

                                #endregion
                            }
                            else if (reportType == 11)
                            {
                                #region MRs List

                                if (ddl33.SelectedValue != "-1")
                                {
                                    this.MrList();
                                    ActiveReport = "MRs List";

                                }
                                else
                                {
                                    lblError.Text = "Select Employee!";
                                    lblError.ForeColor = Color.Red;
                                }

                                #endregion
                            }
                            else if (reportType == 12)
                            {
                                #region Samples Issued To Doctor

                                if (ddl33.SelectedValue != "-1")
                                {
                                    if (ddlDoctor.SelectedValue != "-1" || ddlClass.SelectedValue != "-1")
                                    {
                                        if (ddlProduct.SelectedValue != "-1")
                                        {
                                            if (ddlVisitShift.SelectedValue != "-1")
                                            {
                                                this.SampleIssuedToDoc();
                                                ActiveReport = "Samples Issued To Doctor";

                                            }
                                            else
                                            {
                                                lblError.Text = "Visit Shift Must select!";
                                                lblError.ForeColor = Color.Red;
                                            }
                                        }
                                        else
                                        {
                                            lblError.Text = "Product Must select!";
                                            lblError.ForeColor = Color.Red;
                                        }
                                    }
                                    else
                                    {
                                        lblError.Text = "Select doctor or either class!";
                                        lblError.ForeColor = Color.Red;
                                    }
                                }
                                else
                                {
                                    lblError.Text = "Select Employee!";
                                    lblError.ForeColor = Color.Red;
                                }

                                #endregion
                            }
                            else if (reportType == 13)
                            {
                                #region SMS Status

                                this.SmsStatus();
                                ActiveReport = "SMS Status";

                                #endregion
                            }
                            else if (reportType == 14)
                            {
                                #region Visit By Time

                                if (ddl1.SelectedValue != "-1")
                                {
                                    this.VisitByTime();
                                    ActiveReport = "Visit By Time";
                                }
                                else
                                {
                                    lblError.Text = "Select Hierarchy!";
                                    lblError.ForeColor = Color.Red;
                                }


                                #endregion
                            }
                            else if (reportType == 15)
                            {
                                #region JV Detailed Frequency

                                this.JVReport();

                                #endregion
                            }
                            else if (reportType == 16)
                            {
                                #region Deport Report Work

                                this.DepotReport();

                                #endregion
                            }
                            else if (reportType == 17)
                            {
                                #region JV By Region
                                this.JVByRegion();
                                #endregion
                            }
                            else if (reportType == 18)
                            {
                                #region Detailed Products Frequency By Division
                                this.DetailedProductFrequencyByDivision();
                                #endregion
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl4")
                        {
                            #region RL4

                            if (reportType == 1)
                            {
                                #region Daily Calls Report

                                if (ddl22.SelectedValue != "-1")
                                {
                                    lblError.Text = "";

                                    if (ddlDoctor.SelectedValue != "-1" || ddlClass.SelectedValue != "-1")
                                    {
                                        lblError.Text = "";

                                        if (ddlVisitShift.SelectedValue != "-1")
                                        {
                                            lblError.Text = "";

                                            if (ddlJointVisit.SelectedValue != "-1")
                                            {
                                                lblError.Text = "";
                                                this.DailyCallReport();
                                                ActiveReport = "Daily Calls Report";

                                            }
                                            else
                                            {
                                                lblError.Text = "Joint Visit must be selected!";
                                                lblError.ForeColor = Color.Red;
                                            }
                                        }
                                        else
                                        {
                                            lblError.Text = "Visit Shift must be selected!";
                                            lblError.ForeColor = Color.Red;
                                        }
                                    }
                                    else
                                    {
                                        lblError.Text = "Doctor must be selected!";
                                        lblError.ForeColor = Color.Red;
                                    }
                                }
                                else
                                {
                                    lblError.Text = "MIO must be selected!!";
                                    lblError.ForeColor = Color.Red;
                                }

                                #endregion
                            }
                            else if (reportType == 2)
                            {
                                #region Described Products

                                if (ddl22.SelectedValue != "-1")
                                {
                                    if (ddlDoctor.SelectedValue != "-1" || ddlClass.SelectedValue != "-1")
                                    {
                                        if (ddlVisitShift.SelectedValue != "-1")
                                        {
                                            if (ddlJointVisit.SelectedValue != "-1")
                                            {
                                                this.DescribedProducts();
                                                ActiveReport = "Described Products";

                                            }
                                            else
                                            {
                                                lblError.Text = "Joint Visit Must select!";
                                                lblError.ForeColor = Color.Red;
                                            }
                                        }
                                        else
                                        {
                                            lblError.Text = "Visit Shift Must select!";
                                            lblError.ForeColor = Color.Red;
                                        }
                                    }
                                    else
                                    {
                                        lblError.Text = "Select doctor or either class!";
                                        lblError.ForeColor = Color.Red;
                                    }
                                }
                                else
                                {
                                    lblError.Text = "Select Employee!";
                                    lblError.ForeColor = Color.Red;
                                }

                                #endregion
                            }
                            else if (reportType == 3)
                            {
                                #region Detailed Products Frequency

                                if (ddl22.SelectedValue != "-1")
                                {
                                    if (ddlDoctor.SelectedValue != "-1")
                                    {
                                        if (ddlVisitShift.SelectedValue != "-1")
                                        {
                                            if (ddlJointVisit.SelectedValue != "-1")
                                            {
                                                this.DetailedProductFrequency();
                                                ActiveReport = "Detailed Products Frequency";

                                            }
                                            else
                                            {
                                                lblError.Text = "Select Joint Visit!";
                                                lblError.ForeColor = Color.Red;
                                            }
                                        }
                                        else
                                        {
                                            lblError.Text = "Select Visit Shift!";
                                            lblError.ForeColor = Color.Red;
                                        }
                                    }
                                    else
                                    {
                                        lblError.Text = "Select Doctor!";
                                        lblError.ForeColor = Color.Red;
                                    }
                                }
                                else
                                {
                                    lblError.Text = "Select Employee!";
                                    lblError.ForeColor = Color.Red;
                                }

                                #endregion
                            }
                            else if (reportType == 4)
                            {
                                #region Incoming SMS Summary

                                if (ddl22.SelectedValue != "-1")
                                {
                                    this.IncomingSMSSummary();
                                    ActiveReport = "Incoming SMS Summary";

                                }
                                else
                                {
                                    lblError.Text = "Select Employee!";
                                    lblError.ForeColor = Color.Red;
                                }

                                #endregion
                            }
                            else if (reportType == 5)
                            {
                                #region JV By Class

                                if (ddl22.SelectedValue != "-1")
                                {
                                    if (ddlDoctor.SelectedValue != "-1" || ddlClass.SelectedValue != "-1")
                                    {
                                        if (ddlVisitShift.SelectedValue != "-1")
                                        {
                                            if (ddlJointVisit.SelectedValue != "-1")
                                            {
                                                this.JVByClass();
                                                ActiveReport = "JV By Class";

                                            }
                                            else
                                            {
                                                lblError.Text = "Joint Visit Must select!";
                                                lblError.ForeColor = Color.Red;
                                            }
                                        }
                                        else
                                        {
                                            lblError.Text = "Visit Shift Must select!";
                                            lblError.ForeColor = Color.Red;
                                        }
                                    }
                                    else
                                    {
                                        lblError.Text = "Select doctor or either class!";
                                        lblError.ForeColor = Color.Red;
                                    }
                                }
                                else
                                {
                                    lblError.Text = "Select Employee!";
                                    lblError.ForeColor = Color.Red;
                                }

                                #endregion
                            }
                            else if (reportType == 6)
                            {
                                #region KPI By Class

                                this.KPIByClass();
                                ActiveReport = "KPI By Class";

                                #endregion
                            }
                            else if (reportType == 7)
                            {
                                #region Message Count

                                this.MessageCount();
                                ActiveReport = "Message Count";


                                #endregion
                            }
                            else if (reportType == 8)
                            {
                                #region Monthly Visit Analysis

                                if (ddl44.SelectedValue != "-1")
                                {
                                    this.MonthlyVisitAnalysis();
                                    ActiveReport = "Monthly Visit Analysis";

                                }
                                else
                                {
                                    lblError.Text = "Select Employee!";
                                    lblError.ForeColor = Color.Red;
                                }

                                #endregion
                            }
                            else if (reportType == 9)
                            {
                                #region MR SMS Accuracy

                                this.MRSMSAccuracy();
                                ActiveReport = "MR SMS Accuracy";

                                #endregion
                            }
                            else if (reportType == 10)
                            {
                                #region MR Doctor

                                if (ddl22.SelectedValue != "-1" || ddl22.SelectedValue != "")
                                {
                                    lblError.Text = "";
                                    this.MrDrList();
                                    ActiveReport = "MR Doctor";

                                }
                                else
                                {
                                    lblError.Text = "MIO must be selected!";
                                    lblError.ForeColor = Color.Red;
                                }

                                #endregion
                            }
                            else if (reportType == 11)
                            {
                                #region MRs List

                                if (ddl22.SelectedValue != "-1")
                                {
                                    this.MrList();
                                    ActiveReport = "MRs List";

                                }
                                else
                                {
                                    lblError.Text = "Select Employee!";
                                    lblError.ForeColor = Color.Red;
                                }

                                #endregion
                            }
                            else if (reportType == 12)
                            {
                                #region Samples Issued To Doctor

                                if (ddl22.SelectedValue != "-1")
                                {
                                    if (ddlDoctor.SelectedValue != "-1" || ddlClass.SelectedValue != "-1")
                                    {
                                        if (ddlProduct.SelectedValue != "-1")
                                        {
                                            if (ddlVisitShift.SelectedValue != "-1")
                                            {
                                                this.SampleIssuedToDoc();
                                                ActiveReport = "Samples Issued To Doctor";

                                            }
                                            else
                                            {
                                                lblError.Text = "Visit Shift Must select!";
                                                lblError.ForeColor = Color.Red;
                                            }
                                        }
                                        else
                                        {
                                            lblError.Text = "Product Must select!";
                                            lblError.ForeColor = Color.Red;
                                        }
                                    }
                                    else
                                    {
                                        lblError.Text = "Select doctor or either class!";
                                        lblError.ForeColor = Color.Red;
                                    }
                                }
                                else
                                {
                                    lblError.Text = "Select Employee!";
                                    lblError.ForeColor = Color.Red;
                                }

                                #endregion
                            }
                            else if (reportType == 13)
                            {
                                #region SMS Status

                                this.SmsStatus();
                                ActiveReport = "SMS Status";

                                #endregion
                            }
                            else if (reportType == 14)
                            {
                                #region Visit By Time

                                if (ddl1.SelectedValue != "-1")
                                {
                                    this.VisitByTime();
                                    ActiveReport = "Visit By Time";
                                }
                                else
                                {
                                    lblError.Text = "Select Hierarchy!";
                                    lblError.ForeColor = Color.Red;
                                }


                                #endregion
                            }
                            else if (reportType == 15)
                            {
                                #region JV Detailed Frequency

                                this.JVReport();

                                #endregion
                            }
                            else if (reportType == 16)
                            {
                                #region Deport Report Work

                                this.DepotReport();

                                #endregion
                            }
                            else if (reportType == 17)
                            {
                                #region JV By Region
                                this.JVByRegion();
                                #endregion
                            }
                            else if (reportType == 18)
                            {
                                #region Detailed Products Frequency By Division
                                this.DetailedProductFrequencyByDivision();
                                #endregion
                            }

                            #endregion
                        }
                        else if (_currentUserRole == "rl5")
                        {
                            #region RL5

                            if (reportType == 1)
                            {
                                #region Daily Calls Report

                                if (ddl11.SelectedValue != "-1")
                                {
                                    lblError.Text = "";

                                    if (ddlDoctor.SelectedValue != "-1" || ddlClass.SelectedValue != "-1")
                                    {
                                        lblError.Text = "";

                                        if (ddlVisitShift.SelectedValue != "-1")
                                        {
                                            lblError.Text = "";

                                            if (ddlJointVisit.SelectedValue != "-1")
                                            {
                                                lblError.Text = "";
                                                this.DailyCallReport();
                                                ActiveReport = "Daily Calls Report";
                                            }
                                            else
                                            {
                                                lblError.Text = "Joint Visit must be selected!";
                                                lblError.ForeColor = Color.Red;
                                            }
                                        }
                                        else
                                        {
                                            lblError.Text = "Visit Shift must be selected!";
                                            lblError.ForeColor = Color.Red;
                                        }
                                    }
                                    else
                                    {
                                        lblError.Text = "Doctor must be selected!";
                                        lblError.ForeColor = Color.Red;
                                    }
                                }
                                else
                                {
                                    lblError.Text = "MIO must be selected!!";
                                    lblError.ForeColor = Color.Red;
                                }

                                #endregion
                            }
                            else if (reportType == 2)
                            {
                                #region Described Products

                                if (ddl11.SelectedValue != "-1")
                                {
                                    if (ddlDoctor.SelectedValue != "-1" || ddlClass.SelectedValue != "-1")
                                    {
                                        if (ddlVisitShift.SelectedValue != "-1")
                                        {
                                            if (ddlJointVisit.SelectedValue != "-1")
                                            {
                                                this.DescribedProducts();
                                                ActiveReport = "Described Products";

                                            }
                                            else
                                            {
                                                lblError.Text = "Joint Visit Must select!";
                                                lblError.ForeColor = Color.Red;
                                            }
                                        }
                                        else
                                        {
                                            lblError.Text = "Visit Shift Must select!";
                                            lblError.ForeColor = Color.Red;
                                        }
                                    }
                                    else
                                    {
                                        lblError.Text = "Select doctor or either class!";
                                        lblError.ForeColor = Color.Red;
                                    }
                                }
                                else
                                {
                                    lblError.Text = "Select Employee!";
                                    lblError.ForeColor = Color.Red;
                                }

                                #endregion
                            }
                            else if (reportType == 3)
                            {
                                #region Detailed Products Frequency

                                if (ddl11.SelectedValue != "-1")
                                {
                                    if (ddlDoctor.SelectedValue != "-1")
                                    {
                                        if (ddlVisitShift.SelectedValue != "-1")
                                        {
                                            if (ddlJointVisit.SelectedValue != "-1")
                                            {
                                                this.DetailedProductFrequency();
                                                ActiveReport = "Detailed Products Frequency";
                                            }
                                            else
                                            {
                                                lblError.Text = "Select Joint Visit!";
                                                lblError.ForeColor = Color.Red;
                                            }
                                        }
                                        else
                                        {
                                            lblError.Text = "Select Visit Shift!";
                                            lblError.ForeColor = Color.Red;
                                        }
                                    }
                                    else
                                    {
                                        lblError.Text = "Select Doctor!";
                                        lblError.ForeColor = Color.Red;
                                    }
                                }
                                else
                                {
                                    lblError.Text = "Select Employee!";
                                    lblError.ForeColor = Color.Red;
                                }

                                #endregion
                            }
                            else if (reportType == 4)
                            {
                                #region Incoming SMS Summary

                                if (ddl11.SelectedValue != "-1")
                                {
                                    this.IncomingSMSSummary();
                                    ActiveReport = "Incoming SMS Summary";
                                }
                                else
                                {
                                    lblError.Text = "Select Employee!";
                                    lblError.ForeColor = Color.Red;
                                }

                                #endregion
                            }
                            else if (reportType == 5)
                            {
                                #region JV By Class

                                if (ddl11.SelectedValue != "-1")
                                {
                                    if (ddlDoctor.SelectedValue != "-1" || ddlClass.SelectedValue != "-1")
                                    {
                                        if (ddlVisitShift.SelectedValue != "-1")
                                        {
                                            if (ddlJointVisit.SelectedValue != "-1")
                                            {
                                                this.JVByClass();
                                                ActiveReport = "JV By Class";
                                            }
                                            else
                                            {
                                                lblError.Text = "Joint Visit Must select!";
                                                lblError.ForeColor = Color.Red;
                                            }
                                        }
                                        else
                                        {
                                            lblError.Text = "Visit Shift Must select!";
                                            lblError.ForeColor = Color.Red;
                                        }
                                    }
                                    else
                                    {
                                        lblError.Text = "Select doctor or either class!";
                                        lblError.ForeColor = Color.Red;
                                    }
                                }
                                else
                                {
                                    lblError.Text = "Select Employee!";
                                    lblError.ForeColor = Color.Red;
                                }

                                #endregion
                            }
                            else if (reportType == 6)
                            {
                                #region KPI By Class

                                this.KPIByClass();
                                ActiveReport = "KPI By Class";

                                #endregion
                            }
                            else if (reportType == 7)
                            {
                                #region Message Count

                                this.MessageCount();
                                ActiveReport = "Message Count";
                                #endregion
                            }
                            else if (reportType == 8)
                            {
                                #region Monthly Visit Analysis

                                if (ddl44.SelectedValue != "-1")
                                {
                                    this.MonthlyVisitAnalysis();
                                    ActiveReport = "Monthly Visit Analysis";

                                }
                                else
                                {
                                    lblError.Text = "Select Employee!";
                                    lblError.ForeColor = Color.Red;
                                }

                                #endregion
                            }
                            else if (reportType == 9)
                            {
                                #region MR SMS Accuracy

                                this.MRSMSAccuracy();
                                ActiveReport = "MR SMS Accuracy";
                                #endregion
                            }
                            else if (reportType == 10)
                            {
                                #region MR Doctor

                                if (ddl11.SelectedValue != "-1" || ddl11.SelectedValue != "")
                                {
                                    lblError.Text = "";
                                    this.MrDrList();
                                    ActiveReport = "MR Doctor";

                                }
                                else
                                {
                                    lblError.Text = "MIO must be selected!";
                                    lblError.ForeColor = Color.Red;
                                }

                                #endregion
                            }
                            else if (reportType == 11)
                            {
                                #region MRs List

                                if (ddl11.SelectedValue != "-1")
                                {
                                    this.MrList();
                                    ActiveReport = "MRs List";
                                }
                                else
                                {
                                    lblError.Text = "Select Employee!";
                                    lblError.ForeColor = Color.Red;
                                }

                                #endregion
                            }
                            else if (reportType == 12)
                            {
                                #region Samples Issued To Doctor

                                if (ddl11.SelectedValue != "-1")
                                {
                                    if (ddlDoctor.SelectedValue != "-1" || ddlClass.SelectedValue != "-1")
                                    {
                                        if (ddlProduct.SelectedValue != "-1")
                                        {
                                            if (ddlVisitShift.SelectedValue != "-1")
                                            {
                                                this.SampleIssuedToDoc();
                                                ActiveReport = "Samples Issued To Doctor";
                                            }
                                            else
                                            {
                                                lblError.Text = "Visit Shift Must select!";
                                                lblError.ForeColor = Color.Red;
                                            }
                                        }
                                        else
                                        {
                                            lblError.Text = "Product Must select!";
                                            lblError.ForeColor = Color.Red;
                                        }
                                    }
                                    else
                                    {
                                        lblError.Text = "Select doctor or either class!";
                                        lblError.ForeColor = Color.Red;
                                    }
                                }
                                else
                                {
                                    lblError.Text = "Select Employee!";
                                    lblError.ForeColor = Color.Red;
                                }

                                #endregion
                            }
                            else if (reportType == 13)
                            {
                                #region SMS Status

                                this.SmsStatus();
                                ActiveReport = "SMS Status";

                                #endregion
                            }
                            else if (reportType == 14)
                            {
                                #region Visit By Time

                                if (ddl1.SelectedValue != "-1")
                                {
                                    this.VisitByTime();
                                    ActiveReport = "Visit By Time";
                                }
                                else
                                {
                                    lblError.Text = "Select Hierarchy!";
                                    lblError.ForeColor = Color.Red;
                                }


                                #endregion
                            }
                            else if (reportType == 15)
                            {
                                #region JV Detailed Frequency

                                this.JVReport();

                                #endregion
                            }
                            else if (reportType == 16)
                            {
                                #region Deport Report Work

                                this.DepotReport();

                                #endregion
                            }
                            else if (reportType == 17)
                            {
                                #region JV By Region
                                this.JVByRegion();
                                #endregion
                            }
                            else if (reportType == 18)
                            {
                                #region Detailed Products Frequency By Division
                                this.DetailedProductFrequencyByDivision();
                                #endregion
                            }
                            #endregion
                        }
                        else if (_currentUserRole == "rl6")
                        {
                            #region RL6

                            if (reportType == 1)
                            {
                                #region Daily Calls Report


                                lblError.Text = "";

                                if (ddlDoctor.SelectedValue != "-1" || ddlClass.SelectedValue != "-1")
                                {
                                    lblError.Text = "";

                                    if (ddlVisitShift.SelectedValue != "-1")
                                    {
                                        lblError.Text = "";

                                        if (ddlJointVisit.SelectedValue != "-1")
                                        {
                                            lblError.Text = "";
                                            this.DailyCallReport();
                                            ActiveReport = "Daily Calls Report";
                                        }
                                        else
                                        {
                                            lblError.Text = "Joint Visit must be selected!";
                                            lblError.ForeColor = Color.Red;
                                        }
                                    }
                                    else
                                    {
                                        lblError.Text = "Visit Shift must be selected!";
                                        lblError.ForeColor = Color.Red;
                                    }
                                }
                                else
                                {
                                    lblError.Text = "Doctor must be selected!";
                                    lblError.ForeColor = Color.Red;
                                }


                                #endregion
                            }
                            else if (reportType == 2)
                            {
                                #region Described Products


                                if (ddlDoctor.SelectedValue != "-1" || ddlClass.SelectedValue != "-1")
                                {
                                    if (ddlVisitShift.SelectedValue != "-1")
                                    {
                                        if (ddlJointVisit.SelectedValue != "-1")
                                        {
                                            this.DescribedProducts();
                                            ActiveReport = "Described Products";

                                        }
                                        else
                                        {
                                            lblError.Text = "Joint Visit Must select!";
                                            lblError.ForeColor = Color.Red;
                                        }
                                    }
                                    else
                                    {
                                        lblError.Text = "Visit Shift Must select!";
                                        lblError.ForeColor = Color.Red;
                                    }
                                }
                                else
                                {
                                    lblError.Text = "Select doctor or either class!";
                                    lblError.ForeColor = Color.Red;
                                }


                                #endregion
                            }
                            else if (reportType == 3)
                            {
                                #region Detailed Products Frequency


                                if (ddlDoctor.SelectedValue != "-1")
                                {
                                    if (ddlVisitShift.SelectedValue != "-1")
                                    {
                                        if (ddlJointVisit.SelectedValue != "-1")
                                        {
                                            this.DetailedProductFrequency();
                                            ActiveReport = "Detailed Products Frequency";

                                        }
                                        else
                                        {
                                            lblError.Text = "Select Joint Visit!";
                                            lblError.ForeColor = Color.Red;
                                        }
                                    }
                                    else
                                    {
                                        lblError.Text = "Select Visit Shift!";
                                        lblError.ForeColor = Color.Red;
                                    }
                                }
                                else
                                {
                                    lblError.Text = "Select Doctor!";
                                    lblError.ForeColor = Color.Red;
                                }


                                #endregion
                            }
                            else if (reportType == 4)
                            {
                                #region Incoming SMS Summary

                                if (ddl11.SelectedValue != "-1")
                                {
                                    this.IncomingSMSSummary();
                                    ActiveReport = "Incoming SMS Summary";
                                }
                                else
                                {
                                    lblError.Text = "Select Employee!";
                                    lblError.ForeColor = Color.Red;
                                }

                                #endregion
                            }
                            else if (reportType == 5)
                            {
                                #region JV By Class


                                if (ddlDoctor.SelectedValue != "-1" || ddlClass.SelectedValue != "-1")
                                {
                                    if (ddlVisitShift.SelectedValue != "-1")
                                    {
                                        if (ddlJointVisit.SelectedValue != "-1")
                                        {
                                            this.JVByClass();
                                            ActiveReport = "JV By Class";
                                        }
                                        else
                                        {
                                            lblError.Text = "Joint Visit Must select!";
                                            lblError.ForeColor = Color.Red;
                                        }
                                    }
                                    else
                                    {
                                        lblError.Text = "Visit Shift Must select!";
                                        lblError.ForeColor = Color.Red;
                                    }
                                }
                                else
                                {
                                    lblError.Text = "Select doctor or either class!";
                                    lblError.ForeColor = Color.Red;
                                }


                                #endregion
                            }
                            else if (reportType == 6)
                            {
                                #region KPI By Class

                                this.KPIByClass();
                                ActiveReport = "KPI By Class";

                                #endregion
                            }
                            else if (reportType == 7)
                            {
                                #region Message Count

                                this.MessageCount();
                                ActiveReport = "Message Count";

                                #endregion
                            }
                            else if (reportType == 8)
                            {
                                #region Monthly Visit Analysis

                                this.MonthlyVisitAnalysis();
                                ActiveReport = "Monthly Visit Analysis";

                                #endregion
                            }
                            else if (reportType == 9)
                            {
                                #region MR SMS Accuracy

                                this.MRSMSAccuracy();
                                ActiveReport = "MR SMS Accuracy";

                                #endregion
                            }
                            else if (reportType == 10)
                            {
                                #region MR Doctor

                                lblError.Text = "";
                                this.MrDrList();
                                ActiveReport = "MR Doctor";


                                #endregion
                            }
                            else if (reportType == 11)
                            {
                                #region MRs List

                                //if (ddl11.SelectedValue != "-1")
                                //{
                                //    this.MrList();
                                //}
                                //else
                                //{
                                //    lblError.Text = "Select Employee!";
                                //    lblError.ForeColor = Color.Red;
                                //}

                                #endregion
                            }
                            else if (reportType == 12)
                            {
                                #region Samples Issued To Doctor


                                if (ddlDoctor.SelectedValue != "-1" || ddlClass.SelectedValue != "-1")
                                {
                                    if (ddlProduct.SelectedValue != "-1")
                                    {
                                        if (ddlVisitShift.SelectedValue != "-1")
                                        {
                                            this.SampleIssuedToDoc();
                                            ActiveReport = "Samples Issued To Doctor";

                                        }
                                        else
                                        {
                                            lblError.Text = "Visit Shift Must select!";
                                            lblError.ForeColor = Color.Red;
                                        }
                                    }
                                    else
                                    {
                                        lblError.Text = "Product Must select!";
                                        lblError.ForeColor = Color.Red;
                                    }
                                }
                                else
                                {
                                    lblError.Text = "Select doctor or either class!";
                                    lblError.ForeColor = Color.Red;
                                }


                                #endregion
                            }
                            else if (reportType == 13)
                            {
                                #region SMS Status

                                this.SmsStatus();
                                ActiveReport = "SMS Status";

                                #endregion
                            }
                            else if (reportType == 14)
                            {
                                #region Visit By Time

                                this.VisitByTime();
                                ActiveReport = "Visit By Time";

                                #endregion
                            }
                            else if (reportType == 15)
                            {
                                #region JV Detailed Frequency

                                this.JVReport();

                                #endregion
                            }
                            else if (reportType == 16)
                            {
                                #region Deport Report Work

                                this.DepotReport();

                                #endregion
                            }
                            else if (reportType == 17)
                            {
                                #region JV By Region
                                this.JVByRegion();
                                #endregion
                            }
                            else if (reportType == 18)
                            {
                                #region Detailed Products Frequency By Division
                                this.DetailedProductFrequencyByDivision();
                                #endregion
                            }

                            #endregion
                        }
                    }
                }
                else
                {
                    lblError.Text = "Please select report type!";
                    lblError.ForeColor = Color.Red;
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from btnGenerate is " + exception.Message;
            }
        }

        protected void ddl1_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                #region Get Employee Hierarchy

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

                    this.GetCurrentUserDetail(0);
                }

                #endregion

                if (_glbVarLevelName == "Level3")
                {
                    if (ddl1.SelectedValue != "-1")
                    {
                        lblError.Text = "";

                        #region Map Regions + Divison Level Employees

                        int ddl1Id = Convert.ToInt32(ddl1.SelectedValue);
                        ddl2.Items.Clear(); ddl3.Items.Clear(); ddl4.Items.Clear();
                        ddl11.Items.Clear(); ddl22.Items.Clear(); ddl33.Items.Clear(); ddl44.Items.Clear();

                        if (ddlReports.SelectedValue == "14")
                        {
                            tblUHL.Visible = false;
                            ddl2.DataSource = _dataContext.sp_Levels4SelectByLevel3(ddl1Id).ToList();
                            ddl2.DataBind();
                            ddl2.Items.Insert(0, new ListItem("Select " + _hierarchyLevel4, "-1"));
                        }
                        else
                        {
                            tblUHL.Visible = true;

                            if (ddlReports.SelectedValue == "10")
                            {
                                tblFilter.Visible = false;
                            }
                            else
                            {
                                tblFilter.Visible = true;
                            }

                            if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
                            {
                                ddl2.DataSource = _dataContext.sp_Levels4SelectByLevel3(ddl1Id).ToList();
                                ddl2.DataBind();
                                ddl2.Items.Insert(0, new ListItem("Select " + _hierarchyLevel4, "-1"));

                                col11.Visible = true;
                                ddl11.DataSource =
                                    _dataContext.sp_FilterEmployeeSelectByManager(_glbVarLevelName, _currentUserRole, 0, 0, ddl1Id, 0, 0, 0, 2).ToList();
                                ddl11.DataBind();
                                ddl11.Items.Insert(0, new ListItem("Select Employee", "-1"));
                            }
                            else if (_currentUserRole == "rl3")
                            {
                                ddl2.DataSource = _dataContext.sp_Levels5SelectByLevel4(ddl1Id).ToList();
                                ddl2.DataBind();
                                ddl2.Items.Insert(0, new ListItem("Select " + _hierarchyLevel5, "-1"));

                                col11.Visible = true;
                                ddl11.DataSource =
                                    _dataContext.sp_FilterEmployeeSelectByManager(_glbVarLevelName, _currentUserRole, 0, 0, 0, ddl1Id, 0, 0, 3).ToList();
                                ddl11.DataBind();
                                ddl11.Items.Insert(0, new ListItem("Select Employee", "-1"));
                            }
                            else if (_currentUserRole == "rl4")
                            {
                                ddl2.DataSource = _dataContext.sp_Levels6SelectByLevel5(ddl1Id).ToList();
                                ddl2.DataBind();
                                ddl2.Items.Insert(0, new ListItem("Select " + _hierarchyLevel6, "-1"));

                                col11.Visible = true;
                                ddl11.DataSource =
                                    _dataContext.sp_FilterEmployeeSelectByManager(_glbVarLevelName, _currentUserRole, 0, 0, 0, 0, ddl1Id, 0, 4).ToList();
                                ddl11.DataBind();
                                ddl11.Items.Insert(0, new ListItem("Select Employee", "-1"));
                            }
                            else if (_currentUserRole == "rl5")
                            {
                                col11.Visible = true;
                                ddl11.DataSource =
                                    _dataContext.sp_FilterEmployeeSelectByManager(_glbVarLevelName, _currentUserRole, 0, 0, 0, 0, 0, ddl1Id, 5).ToList();
                                ddl11.DataBind();
                                ddl11.Items.Insert(0, new ListItem("Select Employee", "-1"));
                                ddl11.Items.Insert(1, new ListItem("ALL", "0"));
                            }

                        }

                        #endregion
                    }
                    else
                    {
                        tblUHL.Visible = false;
                        tblFilter.Visible = false;
                        ddl2.Items.Clear(); ddl3.Items.Clear(); ddl4.Items.Clear(); ddlProduct.Items.Clear();
                        ddl11.Items.Clear(); ddl22.Items.Clear(); ddl33.Items.Clear(); ddl44.Items.Clear(); ddlDoctor.Items.Clear();
                    }
                }
                ddlDoctor.Items.Clear();
                ddlDoctor.Items.Insert(0, new ListItem("ALL", "0")); ddlProduct.Items.Clear();
                ddlProduct.Items.Insert(0, new ListItem("ALL", "0"));
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from ddl1_SelectedIndexChanged is " + exception.Message;
            }
        }

        protected void ddl2_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                #region Get Employee Hierarchy

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

                    this.GetCurrentUserDetail(0);
                }

                #endregion

                if (_glbVarLevelName == "Level3")
                {
                    if (ddl2.SelectedValue != "-1")
                    {
                        lblError.Text = "";

                        #region Map Zone + Region Level Employees

                        int ddl2Id = Convert.ToInt32(ddl2.SelectedValue);
                        ddl3.Items.Clear(); ddl4.Items.Clear();
                        ddl22.Items.Clear(); ddl33.Items.Clear(); ddl44.Items.Clear();

                        if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
                        {
                            ddl3.DataSource = _dataContext.sp_Levels5SelectByLevel4(ddl2Id).ToList();
                            ddl3.DataBind();
                            ddl3.Items.Insert(0, new ListItem("Select " + _hierarchyLevel5, "-1"));

                            col22.Visible = true;
                            ddl22.DataSource =
                                _dataContext.sp_FilterEmployeeSelectByManager(_glbVarLevelName, _currentUserRole, 0, 0, 0, ddl2Id, 0, 0, 3).ToList();
                            ddl22.DataBind();
                            ddl22.Items.Insert(0, new ListItem("Select Employee", "-1"));
                        }
                        else if (_currentUserRole == "rl3")
                        {
                            ddl3.DataSource = _dataContext.sp_Levels6SelectByLevel5(ddl2Id).ToList();
                            ddl3.DataBind();
                            ddl3.Items.Insert(0, new ListItem("Select " + _hierarchyLevel6, "-1"));

                            col22.Visible = true;
                            ddl22.DataSource =
                                _dataContext.sp_FilterEmployeeSelectByManager(_glbVarLevelName, _currentUserRole, 0, 0, 0, 0, ddl2Id, 0, 4).ToList();
                            ddl22.DataBind();
                            ddl22.Items.Insert(0, new ListItem("Select Employee", "-1"));
                        }
                        else if (_currentUserRole == "rl4")
                        {
                            col22.Visible = true;
                            ddl22.DataSource =
                                _dataContext.sp_FilterEmployeeSelectByManager(_glbVarLevelName, _currentUserRole, 0, 0, 0, 0, 0, ddl2Id, 5).ToList();
                            ddl22.DataBind();
                            ddl22.Items.Insert(0, new ListItem("Select Employee", "-1"));
                            ddl22.Items.Insert(1, new ListItem("ALL", "0"));
                        }

                        #endregion
                    }
                    else
                    {
                        ddl3.Items.Clear(); ddl4.Items.Clear(); ddlProduct.Items.Clear();
                        ddl22.Items.Clear(); ddl33.Items.Clear(); ddl44.Items.Clear(); ddlDoctor.Items.Clear();
                    }
                }
                ddlDoctor.Items.Clear();
                ddlDoctor.Items.Insert(0, new ListItem("ALL", "0")); ddlProduct.Items.Clear();
                ddlProduct.Items.Insert(0, new ListItem("ALL", "0"));
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from ddl2_SelectedIndexChanged is " + exception.Message;
            }
        }

        protected void ddl3_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                #region Get Employee Hierarchy

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

                    this.GetCurrentUserDetail(0);
                }

                #endregion

                if (_glbVarLevelName == "Level3")
                {
                    if (ddl3.SelectedValue != "-1")
                    {
                        lblError.Text = "";

                        #region Map Brick + Zone Level Employees

                        int ddl3Id = Convert.ToInt32(ddl3.SelectedValue);
                        ddl4.Items.Clear();
                        ddl33.Items.Clear(); ddl44.Items.Clear();

                        if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
                        {
                            ddl4.DataSource = _dataContext.sp_Levels6SelectByLevel5(ddl3Id).ToList();
                            ddl4.DataBind();
                            ddl4.Items.Insert(0, new ListItem("Select " + _hierarchyLevel6, "-1"));

                            col33.Visible = true;
                            ddl33.DataSource =
                                _dataContext.sp_FilterEmployeeSelectByManager(_glbVarLevelName, _currentUserRole, 0, 0, 0, 0, ddl3Id, 0, 4).ToList();
                            ddl33.DataBind();
                            ddl33.Items.Insert(0, new ListItem("Select Employee", "-1"));
                        }
                        else if (_currentUserRole == "rl3")
                        {
                            col33.Visible = true;
                            ddl33.DataSource =
                                _dataContext.sp_FilterEmployeeSelectByManager(_glbVarLevelName, _currentUserRole, 0, 0, 0, 0, 0, ddl3Id, 5).ToList();
                            ddl33.DataBind();
                            ddl33.Items.Insert(0, new ListItem("Select Employee", "-1"));
                            ddl33.Items.Insert(1, new ListItem("ALL", "0"));
                        }

                        #endregion
                    }
                    else
                    {
                        ddl4.Items.Clear(); ddlProduct.Items.Clear();
                        ddl33.Items.Clear(); ddl44.Items.Clear(); ddlDoctor.Items.Clear();
                    }
                }
                ddlDoctor.Items.Clear();
                ddlDoctor.Items.Insert(0, new ListItem("ALL", "0")); ddlProduct.Items.Clear();
                ddlProduct.Items.Insert(0, new ListItem("ALL", "0"));
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from ddl3_SelectedIndexChanged is " + exception.Message;
            }
        }

        protected void ddl4_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                #region Get Employee Hierarchy

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

                    this.GetCurrentUserDetail(0);
                }

                #endregion

                if (_glbVarLevelName == "Level3")
                {
                    lblError.Text = "";

                    #region Map Brick Level Employees

                    if (ddl4.SelectedValue != "-1")
                    {
                        int ddl4Id = Convert.ToInt32(ddl4.SelectedValue);
                        ddl44.Items.Clear();

                        if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
                        {
                            col44.Visible = true;
                            ddl44.DataSource =
                                _dataContext.sp_FilterEmployeeSelectByManager(_glbVarLevelName, _currentUserRole, 0, 0, 0, 0, 0, ddl4Id, 5).ToList();
                            ddl44.DataBind();
                            ddl44.Items.Insert(0, new ListItem("Select Employee", "-1"));
                            ddl44.Items.Insert(1, new ListItem("ALL", "0"));
                        }
                    }
                    else
                    {
                        ddl44.Items.Clear();
                    }

                    #endregion
                }
                ddlDoctor.Items.Clear();
                ddlDoctor.Items.Insert(0, new ListItem("ALL", "0")); ddlProduct.Items.Clear();
                ddlProduct.Items.Insert(0, new ListItem("ALL", "0"));
            }

            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from ddl4_SelectedIndexChanged is " + exception.Message;
            }
        }

        protected void ddl11_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                #region Get Employee Hierarchy

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

                    this.GetCurrentUserDetail(0);
                }

                #endregion

                if (_glbVarLevelName == "Level3")
                {
                    if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                    {
                        if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
                        {
                            lblError.Text = "Region Must be selected!";
                        }
                        else if (_currentUserRole == "rl3")
                        {
                            lblError.Text = "Zone Must be selected!";
                        }
                        else if (_currentUserRole == "rl4")
                        {
                            lblError.Text = "Territory Must be selected!";
                        }
                        else if (_currentUserRole == "rl5")
                        {
                            // lblError.Text = "Territory Must be selected!";

                            if (ddl11.SelectedValue != "-1" || ddl11.SelectedValue != "")
                            {
                                ddlDoctor.Items.Clear();
                                ddlDoctor.DataSource = _dataContext.sp_DoctorsOfSpoSelectByEmployee(Convert.ToInt64(ddl11.SelectedValue), null, null, null).ToList();
                                ddlDoctor.DataBind();
                                ddlDoctor.Items.Insert(0, new ListItem("ALL", "0"));
                            }
                        }
                        else
                        {
                            ddl11.SelectedValue = "-1";
                        }
                    }
                    else
                    {
                        if (ddl11.SelectedValue != "-1")
                        {
                            lblError.Text = "";

                            if (_currentUserRole == "rl5")
                            {
                                if (ddl22.SelectedValue != "0")
                                {
                                    ddlDoctor.Items.Clear();
                                    ddlDoctor.DataSource = _dataContext.sp_DoctorsOfSpoSelectByEmployee(Convert.ToInt64(ddl11.SelectedValue), null, null, null).ToList();
                                    ddlDoctor.DataBind();
                                    ddlDoctor.Items.Insert(0, new ListItem("ALL", "0"));

                                    ddlProduct.Items.Clear();
                                    ddlProduct.DataSource = _dataContext.sp_SamplesSelectByMR1().ToList();
                                    ddlProduct.DataBind();
                                    ddlProduct.Items.Insert(0, new ListItem("ALL", "0"));
                                }
                            }
                            else
                            {
                                ddl22.Items.Clear(); ddl33.Items.Clear(); ddl44.Items.Clear(); ddlDoctor.Items.Clear();

                                ddl22.DataSource = _dataContext.sp_EmployeeSelectByManager3(Convert.ToInt32(ddl1.SelectedValue), Convert.ToInt32(ddl2.SelectedValue),
                                    Convert.ToInt64(ddl11.SelectedValue)).ToList();


                                //ddl22.Items.Insert(0, new ListItem("ALL", "0")); 
                                //ddl22.DataSource = _dataContext.sp_FilterEmployeeSelectByManager(_glbVarLevelName, _currentUserRole, 0, 0, 0, 0, 0, Convert.ToInt32(ddl2.SelectedValue), 5).ToList();
                                //ddl22.DataBind();
                                //ddl22.Items.Insert(0, new ListItem("Select Employee", "-1"));

                                ddlDoctor.Items.Insert(0, new ListItem("ALL", "0"));


                                if (_currentUserRole == "rl4")
                                {
                                    ddlDoctor.Items.Insert(0, new ListItem("ALL", "0"));
                                }
                            }
                        }
                        else
                        {
                            lblError.Text = "";
                            ddl22.Items.Clear(); ddl33.Items.Clear(); ddl44.Items.Clear(); ddlDoctor.Items.Clear();
                            ddlDoctor.Items.Insert(0, new ListItem("ALL", "0")); ddlProduct.Items.Clear();
                            ddlProduct.Items.Insert(0, new ListItem("ALL", "0"));
                        }
                    }
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from ddl11_SelectedIndexChanged is " + exception.Message;
            }
        }

        protected void ddl22_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                #region Get Employee Hierarchy

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

                    this.GetCurrentUserDetail(0);
                }

                #endregion

                if (_glbVarLevelName == "Level3")
                {
                    if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                    {
                        if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
                        {
                            lblError.Text = "Zone Must be selected!";
                        }
                        else if (_currentUserRole == "rl3")
                        {
                            lblError.Text = "Territory Must be selected!";
                        }

                        //ddl22.SelectedValue = "-1";
                    }
                    else
                    {
                        if (ddl22.SelectedValue != "-1")
                        {
                            lblError.Text = "";

                            if (_currentUserRole == "rl4")
                            {
                                if (ddl22.SelectedValue != "0")
                                {
                                    ddlDoctor.Items.Clear();
                                    ddlDoctor.DataSource = _dataContext.sp_DoctorsOfSpoSelectByEmployee(Convert.ToInt64(ddl22.SelectedValue), null, null, null).ToList();
                                    ddlDoctor.DataBind();
                                    ddlDoctor.Items.Insert(0, new ListItem("ALL", "0"));

                                    ddlProduct.Items.Clear();
                                    ddlProduct.DataSource = _dataContext.sp_SamplesSelectByMR1().ToList();
                                    ddlProduct.DataBind();
                                    ddlProduct.Items.Insert(0, new ListItem("ALL", "0"));
                                }
                            }
                            else
                            {
                                ddl33.Items.Clear(); ddl44.Items.Clear(); ddlDoctor.Items.Clear();
                                ddl33.DataSource = _dataContext.sp_EmployeeSelectByManager4(Convert.ToInt32(ddl1.SelectedValue), Convert.ToInt32(ddl2.SelectedValue),
                                    Convert.ToInt32(ddl3.SelectedValue), Convert.ToInt64(ddl22.SelectedValue)).ToList();
                                ddl33.DataBind();
                                ddl33.Items.Insert(0, new ListItem("Select Employee", "-1"));
                                ddlDoctor.Items.Insert(0, new ListItem("ALL", "0"));
                                if (_currentUserRole == "rl3")
                                {
                                    ddl33.Items.Insert(0, new ListItem("ALL", "0"));
                                }
                            }
                        }
                        else
                        {
                            lblError.Text = "";
                            ddl22.SelectedValue = "-1"; ddl33.Items.Clear(); ddl44.Items.Clear(); ddlDoctor.Items.Clear();
                            ddlDoctor.Items.Insert(0, new ListItem("ALL", "0")); ddlProduct.Items.Clear();
                            ddlProduct.Items.Insert(0, new ListItem("ALL", "0"));
                        }
                    }
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from ddl22_SelectedIndexChanged is " + exception.Message;
            }
        }

        protected void ddl33_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                #region Get Employee Hierarchy

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

                    this.GetCurrentUserDetail(0);
                }

                #endregion

                if (_glbVarLevelName == "Level3")
                {
                    if (ddl4.SelectedValue == "-1" || ddl4.SelectedValue == "")
                    {
                        if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
                        {
                            lblError.Text = "Territory Must be selected!";
                        }

                        ddl33.SelectedValue = "-1";
                    }
                    else
                    {
                        if (ddl33.SelectedValue != "-1")
                        {
                            lblError.Text = "";

                            if (_currentUserRole == "rl3")
                            {
                                if (ddl33.SelectedValue != "0")
                                {
                                    ddlDoctor.Items.Clear();
                                    ddlDoctor.DataSource = _dataContext.sp_DoctorsOfSpoSelectByEmployee(Convert.ToInt64(ddl33.SelectedValue), null, null, null).ToList();
                                    ddlDoctor.DataBind();
                                    ddlDoctor.Items.Insert(0, new ListItem("ALL", "0"));

                                    ddlProduct.Items.Clear();
                                    ddlProduct.DataSource = _dataContext.sp_SamplesSelectByMR1().ToList();
                                    ddlProduct.DataBind();
                                    ddlProduct.Items.Insert(0, new ListItem("ALL", "0"));
                                }
                            }
                            else
                            {
                                ddl44.Items.Clear(); ddlDoctor.Items.Clear();
                                ddl44.DataSource = _dataContext.sp_EmployeeSelectByManager5(Convert.ToInt32(ddl1.SelectedValue), Convert.ToInt32(ddl2.SelectedValue),
                                    Convert.ToInt32(ddl3.SelectedValue), Convert.ToInt32(ddl4.SelectedValue), Convert.ToInt64(ddl33.SelectedValue)).ToList();
                                ddl44.DataBind();
                                //ddl44.Items.Insert(0, new ListItem("Select Employee", "-1"));
                                ddlDoctor.Items.Insert(0, new ListItem("ALL", "0")); ddlProduct.Items.Clear();
                                ddlProduct.Items.Insert(0, new ListItem("ALL", "0"));
                                if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
                                {
                                    ddl44.Items.Insert(0, new ListItem("ALL", "0"));
                                }
                            }
                        }
                        else
                        {
                            lblError.Text = "";
                            ddl33.SelectedValue = "-1"; ddl44.Items.Clear(); ddlDoctor.Items.Clear();
                            ddlDoctor.Items.Insert(0, new ListItem("ALL", "0")); ddlProduct.Items.Clear();
                            ddlProduct.Items.Insert(0, new ListItem("ALL", "0"));
                        }
                    }
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from ddl33_SelectedIndexChanged is " + exception.Message;
            }
        }

        protected void ddl44_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                #region Get Employee Hierarchy

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

                    this.GetCurrentUserDetail(0);
                }

                #endregion

                if (_glbVarLevelName == "Level3")
                {
                    if (ddl44.SelectedValue != "-1")
                    {
                        lblError.Text = "";
                        if (ddl44.SelectedValue != "0")
                        {
                            ddlDoctor.Items.Clear();
                            ddlDoctor.DataSource = _dataContext.sp_DoctorsOfSpoSelectByEmployee(Convert.ToInt64(ddl44.SelectedValue), null, null, null).ToList();
                            ddlDoctor.DataBind();
                            ddlDoctor.Items.Insert(0, new ListItem("ALL", "0"));

                            ddlProduct.Items.Clear();
                            ddlProduct.DataSource = _dataContext.sp_SamplesSelectByMR1().ToList();
                            ddlProduct.DataBind();
                            ddlProduct.Items.Insert(0, new ListItem("ALL", "0"));
                        }
                    }
                    else
                    {
                        ddlDoctor.Items.Clear(); ddlProduct.Items.Clear();
                        ddlProduct.Items.Insert(0, new ListItem("ALL", "0"));
                        ddlDoctor.Items.Insert(0, new ListItem("ALL", "0"));
                    }
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from ddl44_SelectedIndexChanged is " + exception.Message;
            }
        }

        protected void ButtonExport_Click(object sender, EventArgs e)
        {
            if (Session["reportdoc"] != null)
            {
                if (ddlReports.SelectedIndex != 0)
                {
                    sendMail();
                }
            }
            else
            {
                lblError.Text = "Generate Report First";
            }
        }

        protected void btnClose_Click(object sender, EventArgs e)
        {
            mpError.Hide();
        }

        protected void BtnEmail_Click(object sender, EventArgs e)
        {
            mpError.Show();
        }

        #endregion

    }
}