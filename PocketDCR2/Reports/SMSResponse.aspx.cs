using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using DatabaseLayer.SQL;
using PocketDCR.CustomMembershipProvider;
using System.Data;
using System.Collections.Specialized;

namespace PocketDCR2.Reports
{
    public partial class SMSResponse : System.Web.UI.Page
    {
        #region Private Members

        private DatabaseDataContext _dataContext;
        private SystemUser _currentUser;
        List<SMSInbound> _getMobileNumbers;
        List<PreSalesCall> _getPreSaleCalls;
        private DateTime _startingDate, _endingDate;
        private readonly DataTable _smsResponseDataTable = new DataTable();
        List<Employee> getEmployee;
        string mobno = "";



        #region Private Members


        private int _currentLevelId = 0, _level1Id = 0, _level2Id = 0, _level3Id = 0, _level4Id = 0, _level5Id = 0, _level6Id = 0;
        private NameValueCollection _nvCollection = new NameValueCollection();
        private string _currentRole = "", _hierarchyName = "";
        private List<DatabaseLayer.SQL.AppConfiguration> _getHierarchy;
        private int _dataFound = 0;
        private long _employeeId = 0;
        private DateTime _currentDate = DateTime.Today;

        #endregion
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
                lblError.Text = "While checking user, it shows " + exception.Message;
            }

            return false;
        }

        private void LoadResponseSms()
        {
            try
            {
                #region Initialization

                string senderName = "", destinationName = "";

                List<Employee> getEmployeeDetail;
                List<SmsSent> getSmsSent;


                #endregion

                #region Initialization of Custom DataTable columns

                _smsResponseDataTable.Columns.Add(new DataColumn("SenderName", Type.GetType("System.String")));
                _smsResponseDataTable.Columns.Add(new DataColumn("SenderNo", Type.GetType("System.String")));
                _smsResponseDataTable.Columns.Add(new DataColumn("DestinationName", Type.GetType("System.String")));
                _smsResponseDataTable.Columns.Add(new DataColumn("DestinationNo", Type.GetType("System.String")));
                _smsResponseDataTable.Columns.Add(new DataColumn("SmsText", Type.GetType("System.String")));
                _smsResponseDataTable.Columns.Add(new DataColumn("SmsStatus", Type.GetType("System.String")));
                _smsResponseDataTable.Columns.Add(new DataColumn("SendingDate", Type.GetType("System.DateTime")));

                #endregion

                #region Get Record From SMS Sent

                getSmsSent = (from smsSent in _dataContext.SmsSents where smsSent.DesitnationNo == mobno.ToString() orderby smsSent.TiemStamp descending select smsSent).ToList();




                #endregion

                #region Extract employee name  of sender + destination and fill data table

                if (getSmsSent.Count > 0)
                {
                    foreach (var sms in getSmsSent)
                    {
                        #region Get Sender Name

                        getEmployeeDetail = (from employee in _dataContext.Employees
                                             where employee.MobileNumber == sms.SenderNo
                                             select employee).ToList();

                        if (getEmployeeDetail.Count > 0)
                        {
                            senderName =
                                Convert.ToString(getEmployeeDetail[0].FirstName + " " + getEmployeeDetail[0].MiddleName +
                                getEmployeeDetail[0].LastName);
                        }
                        else
                        {
                            if (sms.SenderNo.ToLower() == "mycrm")
                            {
                                senderName = "System Generator";
                            }
                        }

                        #endregion

                        #region Get Destination Name

                        getEmployeeDetail = (from employee in _dataContext.Employees
                                             where employee.MobileNumber == sms.DesitnationNo
                                             select employee).ToList();

                        if (getEmployeeDetail.Count > 0)
                        {
                            destinationName =
                                Convert.ToString(getEmployeeDetail[0].FirstName + " " + getEmployeeDetail[0].MiddleName +
                                getEmployeeDetail[0].LastName);
                        }

                        #endregion

                        #region Insert Row to DataTable

                        _smsResponseDataTable.Rows.Add(senderName, sms.SenderNo, destinationName, sms.DesitnationNo, sms.MessageText,
                            sms.Status, Convert.ToDateTime(sms.TiemStamp));

                        #endregion
                    }
                }

                #endregion

                #region Load Success Messages Grid

                Grid1.DataSource = _smsResponseDataTable;
                Grid1.DataBind();

                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is " + exception.Message;
            }
        }

        private void ClearField()
        {
            lblError.Text = "";
        }






        private void GetCurrentLevelId(long type)
        {
            try
            {
                _getHierarchy =
                    _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

                if (_getHierarchy.Count != 0)
                {
                    _hierarchyName = _getHierarchy[0].SettingName;
                    var currentRole = Convert.ToString(Session["CurrentUserRole"]);
                    _currentRole = currentRole;

                    #region Check ID Present ?

                    long employeeId = 0;

                    if (type != 0)
                    {
                        employeeId = type;
                    }
                    else
                    {
                        employeeId = Convert.ToInt64(_currentUser.EmployeeId);
                    }

                    _employeeId = employeeId;

                    #endregion

                    var getCurrentMembershipId =
                        _dataContext.sp_EmployeeMembershipSelectByEmployee(employeeId).ToList();

                    if (getCurrentMembershipId.Count != 0)
                    {
                        var getCurrentLevelId =
                            _dataContext.sp_EmployeeHierarchySelectByMembership(Convert.ToInt64(getCurrentMembershipId[0].SystemUserID)).ToList();

                        if (getCurrentLevelId.Count != 0)
                        {
                            _level1Id = Convert.ToInt32(getCurrentLevelId[0].LevelId1); _level2Id = Convert.ToInt32(getCurrentLevelId[0].LevelId2);
                            _level3Id = Convert.ToInt32(getCurrentLevelId[0].LevelId3); _level4Id = Convert.ToInt32(getCurrentLevelId[0].LevelId4);
                            _level5Id = Convert.ToInt32(getCurrentLevelId[0].LevelId5); _level6Id = Convert.ToInt32(getCurrentLevelId[0].LevelId6);

                            #region Set Currennt Level Id

                            if (_hierarchyName == "Level1")
                            {
                                if (currentRole == "rl1")
                                {
                                    _currentLevelId = _level1Id;
                                }
                                else if (currentRole == "rl2")
                                {
                                    _currentLevelId = _level2Id;
                                }
                                else if (currentRole == "rl3")
                                {
                                    _currentLevelId = _level3Id;
                                }
                                else if (currentRole == "rl4")
                                {
                                    _currentLevelId = _level4Id;
                                }
                                else if (currentRole == "rl5")
                                {
                                    _currentLevelId = _level5Id;
                                }
                                else if (currentRole == "rl6")
                                {
                                    _currentLevelId = _level6Id;
                                }
                            }
                            else if (_hierarchyName == "Level2")
                            {
                                if (currentRole == "rl2")
                                {
                                    _currentLevelId = _level2Id;
                                }
                                else if (currentRole == "rl3")
                                {
                                    _currentLevelId = _level3Id;
                                }
                                else if (currentRole == "rl4")
                                {
                                    _currentLevelId = _level4Id;
                                }
                                else if (currentRole == "rl5")
                                {
                                    _currentLevelId = _level5Id;
                                }
                                else if (currentRole == "rl6")
                                {
                                    _currentLevelId = _level6Id;
                                }
                            }
                            else if (_hierarchyName == "Level3")
                            {
                                if (currentRole == "rl3")
                                {
                                    _currentLevelId = _level3Id;
                                }
                                else if (currentRole == "rl4")
                                {
                                    _currentLevelId = _level4Id;
                                }
                                else if (currentRole == "rl5")
                                {
                                    _currentLevelId = _level5Id;
                                }
                                else if (currentRole == "rl6")
                                {
                                    _currentLevelId = _level6Id;
                                }
                            }
                            else if (_hierarchyName == "Level4")
                            {
                                if (currentRole == "rl4")
                                {
                                    _currentLevelId = _level4Id;
                                }
                                else if (currentRole == "rl5")
                                {
                                    _currentLevelId = _level5Id;
                                }
                                else if (currentRole == "rl6")
                                {
                                    _currentLevelId = _level6Id;
                                }
                            }
                            else if (_hierarchyName == "Level5")
                            {
                                if (currentRole == "rl5")
                                {
                                    _currentLevelId = _level5Id;
                                }
                                else if (currentRole == "rl6")
                                {
                                    _currentLevelId = _level6Id;
                                }
                            }
                            else if (_hierarchyName == "Level6")
                            {
                                if (currentRole == "rl6")
                                {
                                    _currentLevelId = _level6Id;
                                }
                            }

                            #endregion
                        }

                    }
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from GetCurrentLevelId is " + exception.Message;
            }
        }

        private void LoadDropDownHeader()
        {
            try
            {
                if (_getHierarchy.Count != 0)
                {
                    int counter = 0;

                    foreach (var level in _getHierarchy)
                    {
                        #region Hierarchy Level Customization

                        if (_hierarchyName == "Level1")
                        {

                        }
                        else if (_hierarchyName == "Level2")
                        {

                        }
                        else if (_hierarchyName == "Level3")
                        {
                            #region Level3 Success Customization

                            if (_currentRole == "admin" || _currentRole == "headoffice")
                            {
                                if (counter == 0)
                                {
                                    lblLevel1.Text = level.SettingValue;
                                    counter++;
                                }
                                else if (counter == 1)
                                {
                                    lblLevel2.Text = level.SettingValue;
                                    counter++;
                                }
                                else if (counter == 2)
                                {
                                    lblLevel3.Text = level.SettingValue;
                                    counter++;
                                }
                                else if (counter == 3)
                                {
                                    lblLevel4.Text = level.SettingValue;
                                    counter++;

                                    if (counter == 4)
                                    {
                                        lblLevel5.Visible = false;
                                        ddlLevel5.Visible = false;
                                        lblLevel6.Visible = false;
                                        ddlLevel6.Visible = false;
                                        counter++;
                                    }
                                }
                            }
                            else if (_currentRole == "rl3")
                            {
                                if (counter == 0)
                                {
                                    counter++;
                                }
                                else if (counter == 1)
                                {
                                    lblLevel1.Text = level.SettingValue;
                                    counter++;
                                }
                                else if (counter == 2)
                                {
                                    lblLevel2.Text = level.SettingValue;
                                    counter++;
                                }
                                else if (counter == 3)
                                {
                                    lblLevel3.Text = level.SettingValue;
                                    counter++;

                                    if (counter == 4)
                                    {
                                        lblLevel4.Visible = false;
                                        ddlLevel4.Visible = false;
                                        lblLevel5.Visible = false;
                                        ddlLevel5.Visible = false;
                                        lblLevel6.Visible = false;
                                        ddlLevel6.Visible = false;
                                        counter++;
                                    }
                                }
                            }
                            else if (_currentRole == "rl4")
                            {
                                if (counter == 0)
                                {
                                    counter++;
                                }
                                else if (counter == 1)
                                {
                                    counter++;
                                }
                                else if (counter == 2)
                                {
                                    lblLevel1.Text = level.SettingValue;
                                    counter++;
                                }
                                else if (counter == 3)
                                {
                                    lblLevel2.Text = level.SettingValue;
                                    counter++;

                                    if (counter == 4)
                                    {
                                        lblLevel3.Visible = false;
                                        ddlLevel3.Visible = false;
                                        lblLevel4.Visible = false;
                                        ddlLevel4.Visible = false;
                                        lblLevel5.Visible = false;
                                        ddlLevel5.Visible = false;
                                        lblLevel6.Visible = false;
                                        ddlLevel6.Visible = false;
                                        counter++;
                                    }
                                }
                            }
                            else if (_currentRole == "rl5")
                            {
                                if (counter == 0)
                                {
                                    counter++;
                                }
                                else if (counter == 1)
                                {
                                    counter++;
                                }
                                else if (counter == 2)
                                {
                                    counter++;
                                }
                                else if (counter == 3)
                                {
                                    lblLevel1.Text = level.SettingValue;
                                    counter++;

                                    if (counter == 4)
                                    {
                                        lblLevel2.Visible = false;
                                        ddlLevel2.Visible = false;
                                        lblLevel3.Visible = false;
                                        ddlLevel3.Visible = false;
                                        lblLevel4.Visible = false;
                                        ddlLevel4.Visible = false;
                                        lblLevel5.Visible = false;
                                        ddlLevel5.Visible = false;
                                        lblLevel6.Visible = false;
                                        ddlLevel6.Visible = false;
                                        counter++;
                                    }
                                }
                            }
                            else if (_currentRole == "rl6")
                            {
                                HideDropDownList();
                            }

                            #endregion
                        }
                        else if (_hierarchyName == "Level4")
                        {

                        }
                        else if (_hierarchyName == "Level5")
                        {

                        }
                        else if (_hierarchyName == "Level6")
                        {

                        }

                        #endregion
                    }
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from LoadDropDownHeader is " + exception.Message;
            }
        }

        private void HideDropDownList()
        {
            lblLevel1.Visible = false;
            ddlLevel1.Visible = false;
            lblLevel2.Visible = false;
            ddlLevel2.Visible = false;
            lblLevel3.Visible = false;
            ddlLevel3.Visible = false;
            lblLevel4.Visible = false;
            ddlLevel4.Visible = false;
            lblLevel5.Visible = false;
            ddlLevel5.Visible = false;
            lblLevel6.Visible = false;
            ddlLevel6.Visible = false;
        }

        private void LoadDefaultDropDownByHierarchy()
        {
            try
            {
                #region Hierarchy Levels

                if (_hierarchyName == "Level1")
                {
                }
                else if (_hierarchyName == "Level2")
                {
                }
                else if (_hierarchyName == "Level3")
                {
                    #region WebSite of Admin / HeadOffice

                    if (_currentRole == "admin" || _currentRole == "headoffice")
                    {
                        ddlLevel1.DataSource =
                            _dataContext.sp_EmployeesSelectByLevel(_hierarchyName, _currentRole, 0, 0, 0, 0, 0, 0).ToList();
                        ddlLevel1.DataBind();
                    }

                    #endregion

                    #region Employee of Role3

                    if (_currentRole == "rl3")
                    {
                        ddlLevel1.DataSource =
                            _dataContext.sp_EmployeesSelectByLevel(_hierarchyName, _currentRole, 0, 0, _level3Id, 0, 0, 0).ToList();
                        ddlLevel1.DataBind();
                    }

                    #endregion

                    #region Employee of Role4

                    if (_currentRole == "rl4")
                    {
                        ddlLevel1.DataSource =
                            _dataContext.sp_EmployeesSelectByLevel(_hierarchyName, _currentRole, 0, 0, _level3Id, _level4Id, 0, 0).ToList();
                        ddlLevel1.DataBind();
                    }

                    #endregion

                    #region Employee of Role5

                    if (_currentRole == "rl5")
                    {
                        ddlLevel1.DataSource =
                            _dataContext.sp_EmployeesSelectByLevel(_hierarchyName, _currentRole, 0, 0, _level3Id, _level4Id, _level5Id, 0).ToList();
                        ddlLevel1.DataBind();
                    }

                    #endregion
                }
                else if (_hierarchyName == "Level4")
                {
                }
                else if (_hierarchyName == "Level5")
                {
                }
                else if (_hierarchyName == "Level6")
                {
                }

                #endregion

                #region Placing Default Value in DropDownlist

                ddlLevel1.Items.Insert(0, new ListItem("Select Employee", "-1"));

                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from LoadEmployee Method is " + exception.Message;
            }
        }

        #endregion

        #region Events

        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (IsValidUser())
                {
                    _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());


                    ClearField();
                    GetCurrentLevelId(0);



                    if (!IsPostBack)
                    {
                        long empid = Convert.ToInt32(_employeeId);
                        getEmployee = _dataContext.sp_EmployeesSelect(empid).ToList();
                        if (getEmployee.Count != 0)
                        {
                            mobno = getEmployee[0].MobileNumber.ToString();
                        }
                        _currentDate = DateTime.Today;
                        LoadDropDownHeader();
                        LoadDefaultDropDownByHierarchy();
                        string roleType = Convert.ToString(Session["CurrentUserRole"]);
                    }
                    this.LoadResponseSms();
                }
                else
                {
                    Response.Redirect("../Form/Login.aspx");
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from Page Load is " + exception.Message;
            }
        }

        protected void txtDate_TextChanged(object sender, EventArgs e)
        {
            #region Get Hierarchical Level

            if (ddlLevel1.SelectedValue == "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") &&
                            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
            {
                _employeeId = Convert.ToInt64(_currentUser.EmployeeId);
            }
            else if (ddlLevel1.SelectedValue != "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") &&
                (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
            {
                _employeeId = Convert.ToInt64(ddlLevel1.SelectedValue);
            }
            else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" &&
                (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
            {
                _employeeId = Convert.ToInt64(ddlLevel2.SelectedValue);
            }
            else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1" &&
                (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
            {
                _employeeId = Convert.ToInt64(ddlLevel3.SelectedValue);
            }
            else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1" && ddlLevel4.SelectedValue != "-1")
            {
                _employeeId = Convert.ToInt64(ddlLevel4.SelectedValue);
            }

            GetCurrentLevelId(_employeeId);

            #endregion

            #region Load Charts


            #endregion
        }

        protected void ddlLevel1_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                if (ddlLevel1.SelectedValue != "-1")
                {
                    #region Get Employee Id

                    _employeeId = Convert.ToInt64(ddlLevel1.SelectedValue);

                    #endregion

                    #region Get Hierarchical Level

                    GetCurrentLevelId(_employeeId);

                    #endregion

                    #region Set Employees

                    ddlLevel2.Items.Clear();
                    ddlLevel2.DataSource = _dataContext.sp_EmployeesSelectByManager(_employeeId).ToList();
                    ddlLevel2.DataBind();

                    #endregion

                    #region Placing Default Value in DropDownlist

                    ddlLevel2.Items.Insert(0, new ListItem("Select Employee", "-1"));

                    #endregion

                    #region Load Charts

                    lblError.Text = "";
                    //LoadCharts();

                    #endregion
                }
                else
                {
                    #region Load Charts

                    //LoadCharts();

                    #endregion

                    lblError.Text = "";
                    ddlLevel2.Items.Clear();
                    ddlLevel3.Items.Clear();
                    ddlLevel4.Items.Clear();
                    ddlLevel5.Items.Clear();
                    ddlLevel6.Items.Clear();
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from Level1_SelectedIndexChanged Event is " + exception.Message;
            }
        }

        protected void ddlLevel2_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                if (ddlLevel2.SelectedValue != "-1")
                {
                    #region Get Employee Id

                    _employeeId = Convert.ToInt64(ddlLevel2.SelectedValue);

                    #endregion

                    #region Get Hierarchical Level

                    GetCurrentLevelId(_employeeId);

                    #endregion

                    #region Set Employees

                    ddlLevel3.Items.Clear();
                    ddlLevel3.DataSource = _dataContext.sp_EmployeesSelectByManager(_employeeId).ToList();
                    ddlLevel3.DataBind();

                    #endregion

                    #region Placing Default Value in DropDownlist

                    ddlLevel3.Items.Insert(0, new ListItem("Select Employee", "-1"));

                    #endregion

                    #region Load Charts

                    lblError.Text = "";
                    //LoadCharts();

                    #endregion
                }
                else
                {
                    #region Load Charts

                    //LoadCharts();

                    #endregion

                    lblError.Text = "";
                    ddlLevel3.Items.Clear();
                    ddlLevel4.Items.Clear();
                    ddlLevel5.Items.Clear();
                    ddlLevel6.Items.Clear();
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from Level2_SelectedIndexChanged Event is " + exception.Message;
            }
        }

        protected void ddlLevel3_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                if (ddlLevel3.SelectedValue != "-1")
                {
                    #region Get Employee Id

                    _employeeId = Convert.ToInt64(ddlLevel3.SelectedValue);

                    #endregion

                    #region Get Hierarchical Level

                    GetCurrentLevelId(_employeeId);

                    #endregion

                    #region Set Employees

                    ddlLevel4.Items.Clear();
                    ddlLevel4.DataSource = _dataContext.sp_EmployeesSelectByManager(_employeeId).ToList();
                    ddlLevel4.DataBind();

                    #endregion

                    #region Placing Default Value in DropDownlist

                    ddlLevel4.Items.Insert(0, new ListItem("Select Employee", "-1"));

                    #endregion

                    #region Load Charts

                    lblError.Text = "";
                    //LoadCharts();

                    #endregion
                }
                else
                {
                    #region Load Charts

                    //LoadCharts();

                    #endregion

                    lblError.Text = "";
                    ddlLevel4.Items.Clear();
                    ddlLevel5.Items.Clear();
                    ddlLevel6.Items.Clear();
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from Level3_SelectedIndexChanged Event is " + exception.Message;
            }
        }

        protected void ddlLevel4_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                if (ddlLevel4.SelectedValue != "-1")
                {
                    #region Get Employee Id

                    _employeeId = Convert.ToInt64(ddlLevel4.SelectedValue);

                    #endregion

                    #region Get Hierarchical Level

                    GetCurrentLevelId(_employeeId);

                    #endregion

                    #region Set Employees

                    ddlLevel5.Items.Clear();
                    ddlLevel5.DataSource = _dataContext.sp_EmployeesSelectByManager(_employeeId).ToList();
                    ddlLevel5.DataBind();

                    #endregion

                    #region Placing Default Value in DropDownlist

                    ddlLevel5.Items.Insert(0, new ListItem("Select Employee", "-1"));

                    #endregion

                    #region Load Charts

                    lblError.Text = "";
                    //LoadCharts();

                    #endregion
                }
                else
                {
                    #region Load Charts

                    //LoadCharts();

                    #endregion

                    lblError.Text = "";
                    ddlLevel5.Items.Clear();
                    ddlLevel6.Items.Clear();
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from Level4_SelectedIndexChanged Event is " + exception.Message;
            }
        }

        protected void ddlLevel5_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                #region Get Employee Id

                _employeeId = Convert.ToInt64(ddlLevel5.SelectedValue);

                #endregion

                #region Get Hierarchical Level

                GetCurrentLevelId(_employeeId);

                #endregion

                #region Set Employees

                ddlLevel6.Items.Clear();
                ddlLevel6.DataSource = _dataContext.sp_EmployeesSelectByManager(_employeeId).ToList();
                ddlLevel6.DataBind();

                #endregion

                #region Placing Default Value in DropDownlist

                ddlLevel6.Items.Insert(0, new ListItem("Select Employee", "-1"));

                #endregion

                #region Load Charts

                //LoadCharts();

                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from Level5_SelectedIndexChanged Event is " + exception.Message;
            }
        }

        protected void ddlLevel6_SelectedIndexChanged(object sender, EventArgs e)
        {
            #region Get Employee Id

            _employeeId = Convert.ToInt64(ddlLevel6.SelectedValue);

            #endregion

            #region Get Hierarchical Level

            GetCurrentLevelId(_employeeId);

            #endregion

            #region Load Charts

            //LoadCharts();

            #endregion
        }

        #endregion
    }
}