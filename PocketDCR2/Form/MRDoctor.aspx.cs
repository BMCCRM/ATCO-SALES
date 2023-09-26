using System;
using System.Collections.Generic;
using System.Linq;
using DatabaseLayer.SQL;
using PocketDCR.CustomMembershipProvider;
using System.Web.UI.WebControls;
using Obout.Grid;
using System.Drawing;

namespace PocketDCR2.Form
{
    public partial class MRDoctor : System.Web.UI.Page
    {
        #region Private Members

        private DatabaseDataContext _dataContext;
        private SystemUser _currentUser;
        private string selectedEmp;
        private int _doctorLevel = 0, _level1Id = 0, _level2Id = 0, _level3Id = 0, _level4Id = 0, _level5Id = 0, _level6Id = 0;
        private long _employeeId = 0;
        private string _hierarchyName = "", _level3Name = "", _level4Name = "", _currentRole = "", drcode = "";
        private List<DatabaseLayer.SQL.AppConfiguration> _getWebSetting;
        private List<DatabaseLayer.SQL.Parameter> _getParameter;
        private List<DatabaseLayer.SQL.DoctorsOfSpo> _insertMRDr;
        private List<DatabaseLayer.SQL.DoctorsOfSpo> _getMRDr;
        private List<DatabaseLayer.SQL.DoctorsOfSpo> _updateMRDr;

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

        private void GetWebSetting()
        {
            try
            {
                _getWebSetting = _dataContext.sp_AppConfigurationSelectHierarchy().ToList();
                _getParameter = _dataContext.sp_ParameterSelect("DoctorLevel").ToList();

                if (_getWebSetting.Count != 0)
                {
                    if (_getParameter.Count != 0)
                    {
                        _hierarchyName = _getWebSetting[0].SettingName;
                        _doctorLevel = Convert.ToInt32(_getParameter[0].ParameterValue);

                        if (_hierarchyName == "Level1")
                        {

                        }
                        else if (_hierarchyName == "Level2")
                        {

                        }
                        else if (_hierarchyName == "Level3")
                        {
                            #region Place Level Names to Global Variable

                            _level3Name = _getWebSetting[0].SettingValue; _level4Name = _getWebSetting[1].SettingValue;

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
                    }
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from GetWebSetting is " + exception.Message;
            }
        }

        private void GetCurrentLevelId(long type)
        {
            try
            {
                _getWebSetting =
                    _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

                if (_getWebSetting.Count != 0)
                {
                    _hierarchyName = _getWebSetting[0].SettingName;
                    var currentRole = Convert.ToString(Session["CurrentUserRole"]);
                    _currentRole = currentRole;

                    #region Check ID Present ?

                    long employeeId = 0;

                    employeeId = type != 0 ? type : Convert.ToInt64(_currentUser.EmployeeId);

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
                if (_getWebSetting.Count != 0)
                {
                    int counter = 0;

                    foreach (var level in _getWebSetting)
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

        private void LoadDropDownList()
        {
            try
            {
                if (_doctorLevel == 4)
                {
                    #region Map DropDownList

                    lblLevelG3.Text = _level3Name;
                    ddl3.DataSource = _dataContext.sp_HierarchyLevel3Select(null, null).ToList();
                    ddl3.DataBind();
                    ddl3.Items.Insert(0, new ListItem("Select Level", "0"));

                    lblLevelG4.Text = _level4Name;

                    #endregion
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from LoadDropDownList is " + exception.Message;
            }
        }

        private void LoadEmployeeDr()
        {
            try
            {
                #region Map GridView
                Grid1.Visible = true;
                if (ddlLevel4.SelectedValue != "")
                {
                    if (ddlLevel4.SelectedValue != "-1")
                    {
                        Grid1.DataSource = _dataContext.sp_DoctorsOfSpoSelectByEmployee(Convert.ToInt64(ddlLevel4.SelectedValue), null, null, null).ToList();

                    }
                }
                else
                {
                    if (_currentRole == "rl6")
                    {
                        Grid1.DataSource = _dataContext.sp_DoctorsOfSpoSelectByEmployee(Convert.ToInt64(_currentUser.EmployeeId), null, null, null).ToList();
                    }
                }


                Grid1.DataBind();

                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from LoadMRDr is " + exception.Message;
            }
        }

        private void UpdateList()
        {
            try
            {
                #region Initialize

                CheckBox chkSelect;
                TextBox mrCode;
                long employeeId = 0, doctorId = 0; drcode = "";

                #endregion

                #region Update List

                if (gvMRDoctor.Rows.Count > 0)
                {
                    for (int i = 0; i < gvMRDoctor.RowsInViewState.Count; i++)
                    {
                        var chkCell = gvMRDoctor.RowsInViewState[i].Cells[0] as GridDataControlFieldCell;
                        var mrCell = gvMRDoctor.RowsInViewState[i].Cells[2] as GridDataControlFieldCell;

                        chkSelect = chkCell.FindControl("chkSelect") as CheckBox;
                        doctorId = Convert.ToInt64(gvMRDoctor.Rows[i].Cells[1].Text);
                        mrCode = mrCell.FindControl("txtMrCode") as TextBox;

                        if (ddlLevel4.SelectedValue != "-1") employeeId = Convert.ToInt64(ddlLevel4.SelectedValue);

                        if (chkSelect.Checked == true && mrCode.Text.Trim() != "")
                        {
                            #region Is Doctor Present?

                            _getMRDr = _dataContext.sp_DoctorsOfSpoSelect(doctorId, employeeId).ToList();
                            var validateDoctor = _dataContext.sp_MRDoctorSelectByCode(employeeId, mrCode.Text).ToList();

                            #endregion

                            #region If Doctor Present Update It Or Otherwise Add It

                            if (_getMRDr.Count > 0)
                            {
                                #region Update Doctor

                                _updateMRDr = _dataContext.sp_DoctorsOfSpoUpdate(doctorId, employeeId, mrCode.Text).ToList();

                                #endregion
                            }
                            else
                            {
                                if (validateDoctor.Count == 0)
                                {
                                    #region Insert Doctor

                                    _insertMRDr = _dataContext.sp_DoctorsOfSpoInsert(doctorId, employeeId, mrCode.Text).ToList();

                                    #endregion
                                }
                                else
                                {
                                    drcode = drcode + "," + mrCode.Text;
                                }
                            }

                            #endregion

                        }
                        else if (!chkSelect.Checked && mrCode.Text.Trim() != "")
                        {
                            #region Is Doctor Present?

                            _getMRDr = _dataContext.sp_DoctorsOfSpoSelect(doctorId, employeeId).ToList();

                            #endregion

                            #region If Doctor Present Delete It

                            if (_getMRDr.Count > 0)
                            {
                                #region Delete Doctor

                                _dataContext.sp_DoctorsOfSpoDelete(doctorId);
                                

                                #endregion
                            }

                            #endregion
                        }
                    }
                }

                #endregion


                #region Send SMS to MR

                //var getmobileNumber = _dataContext.sp_EmployeesSelect(employeeId).ToList();

                //if (getmobileNumber.Count > 0)
                //{
                //    var employeeName = getmobileNumber[0].FirstName + " " + getmobileNumber[0].MiddleName + " " + getmobileNumber[0].LastName;
                //    var mobileNumber = getmobileNumber[0].MobileNumber;
                //    string doctorNamePlusCode = "", messageText = "";

                //    var getMrDoctor = _dataContext.sp_DoctorsOfSpoSelectByEmployee(employeeId, null, null, null).ToList();

                //    if (getMrDoctor.Count > 0)
                //    {
                //        foreach (var doctor in getMrDoctor)
                //        {
                //            doctorNamePlusCode += "Doctor Code: " + doctor.DoctorCode + ", Doctor Name: " + doctor.DoctorCode + "\r\n";
                //        }
                //        messageText = @"Dear " + employeeName + ", Your's doctor list is mentioned below. \r\n" + doctorNamePlusCode;
                //        var insertSMS = _dataContext.sp_SMSOutboundInsert(mobileNumber, messageText, true, DateTime.Now).ToList();
                //    }
                //}

                #endregion


                #region Refresh Grid

                int DrBrick = Convert.ToInt32(ddlBrick.SelectedItem.Value);
                getdr(DrBrick);
                #endregion

                #region Display Message
                if (drcode.Trim() == "")
                {
                    lblError.Text = "MR-Doctor List Updated Successfully!";
                    lblError.ForeColor = Color.Green;
                }
                else
                {
                    lblError.Text = "MR-Doctor List Updated Successfully!...Duplicate Doctors Code Not Saved..." + drcode.ToString();
                    lblError.ForeColor = Color.Green;
                }
                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from UpdateList is " + exception.Message;
            }
        }

        private void DefaultAction()
        {
            lblGhl.Visible = false; lblLevelG3.Visible = false; lblLevelG4.Visible = false; ddl3.Visible = false;
            ddl4.Visible = false; labbrick.Visible = false; ddlBrick.Visible = false; btnexport.Visible = false;

            ddlBrick1.Visible = false; labbrick1.Visible = false; ddlBrick1.SelectedIndex = -1;

            btnAdd.Visible = false; btnSave.Visible = false; gvMRDoctor.DataSource = null; gvMRDoctor.DataBind();
            ddlBrick.SelectedIndex = -1; ddl3.SelectedIndex = -1; btnall.Visible = false;
            gvMRDoctor.Visible = false; hldownload.Text = ""; hldownload.NavigateUrl = "";
            gvShowMRDoctor.Visible = false; Label2.Visible = false; Label1.Visible = false; Label3.Visible = false; Grid1.Visible = false;
        }

        private void AddAction()
        {
            lblGhl.Visible = true; lblLevelG3.Visible = true; lblLevelG4.Visible = true; ddl3.Visible = true; ddl3.SelectedIndex = -1;
            ddl4.Visible = true;
            btnAdd.Visible = false; btnSave.Visible = false;

            labbrick.Visible = true; ddlBrick.Visible = true; ddlBrick.SelectedIndex = -1;


            gvMRDoctor.Visible = true; btnexport.Visible = false;
            gvShowMRDoctor.Visible = true;
            Grid1.Visible = false; ddlBrick.Visible = false; labbrick.Visible = false;
            Label2.Visible = false; Label1.Visible = false; Label3.Visible = false; Grid1.Visible = false; gvMRDoctor.Visible = false; gvShowMRDoctor.Visible = false;
        }

        private void MRAction()
        {
            // pnlHierarchy.Visible = false;
            btnSave.Visible = false;

            gvShowMRDoctor.Visible = true;
        }

        private void LoadBrick(long empId)
        {
            try
            {
                ddlBrick1.Items.Clear();
                ddlBrick1.DataSource = _dataContext.sp_MrDrBrickSelect(Convert.ToInt64(empId)).ToList();
                ddlBrick1.DataBind();
                ddlBrick1.Items.Add("Select Brick");
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from LoadBrick is " + exception.Message;
            }
        }

        #endregion

        #region Events

        protected void Page_Load(object sender, EventArgs e)
        {
            if (IsValidUser())
            {
                _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                GetWebSetting();
                GetCurrentLevelId(0);

                if (!IsPostBack)
                {
                    _currentRole = Context.Session["CurrentUserRole"].ToString();

                    if (_currentRole != "admin")
                    {
                        if (_currentRole != "headoffice")
                        {
                            if (_currentRole != "rl6")
                            {
                                Response.Redirect("../Reports/Dashboard.aspx");
                            }
                        }
                    }

                    if (_currentRole == "admin" || _currentRole == "headoffice")
                    {
                        LoadDropDownList();
                        LoadDropDownHeader();
                        LoadDefaultDropDownByHierarchy();
                        DefaultAction();
                    }
                    else if (_currentRole == "rl6")
                    {
                        MRAction();
                        LoadEmployeeDr();
                    }

                    Grid1.ClientSideEvents.OnClientExportStart = "showLoadingMessage";
                    Grid1.ClientSideEvents.OnClientExportFinish = "hideLoadingMessage";
                }
            }
            else
            {
                Response.Redirect("Login.aspx");
            }
        }

        protected void gvMRDoctor_OnRowDataBound(object sender, GridRowEventArgs e)
        {
            if (e.Row.RowType == GridRowType.Header)
            {
                #region Set Level Headers Name

                var lbl3Cell = e.Row.Cells[8] as GridDataControlFieldCell;
                var lbl4Cell = e.Row.Cells[9] as GridDataControlFieldCell;

                var lbl3 = lbl3Cell.FindControl("lblLevel3Header") as Label;
                var lbl4 = lbl4Cell.FindControl("lblLevel4Header") as Label;

                if (_level3Name != null && _level4Name != null)
                {
                    lbl3.Text = _level3Name; lbl4.Text = _level4Name;
                }

                #endregion
            }

            if (e.Row.RowType == GridRowType.DataRow)
            {
                #region Display MR/BMD Code if DR is belong to MR, otherwise Show Master Doctor Code

                var chkCell0 = e.Row.Cells[0] as GridDataControlFieldCell;
                var chk0 = chkCell0.FindControl("chkSelect") as CheckBox;

                long doctorId = Convert.ToInt64(e.Row.Cells[1].Text);

                var txtCell3 = e.Row.Cells[2] as GridDataControlFieldCell;
                var txt3 = txtCell3.FindControl("txtMrCode") as TextBox;

                if (ddlLevel4.SelectedValue != "-1")
                    if (ddlLevel4.SelectedValue != "")
                    {
                        var isMRDr = _dataContext.sp_DoctorsOfSpoSelect(doctorId, Convert.ToInt64(ddlLevel4.SelectedValue)).ToList();

                        if (isMRDr.Count != 0)
                        {
                            chk0.Checked = true;
                            txt3.Text = isMRDr[0].DoctorCode;
                        }
                        else
                        {
                            // e.Row.Visible = false;
                            chk0.Checked = false;
                            txt3.Text = string.Empty;
                        }
                    }

                #endregion
            }
        }

        protected void ddl3_SelectedIndexChanged(object sender, EventArgs e)
        {
            lblError.Text = "";

            try
            {
                if (ddl3.SelectedValue == "0")
                {
                    #region Map GridView

                    ddl4.Items.Clear(); btnall.Visible = false; ddlBrick.SelectedIndex = -1;
                    ddlBrick.Visible = false; labbrick.Visible = false; btnSave.Visible = false; gvShowMRDoctor.Visible = false; gvMRDoctor.Visible = false; Label1.Visible = false; Label2.Visible = false;

                    #endregion
                }
                else
                {
                    #region Get Selected Text + Value

                    string level3Name = Convert.ToString(ddl3.SelectedItem);
                    int level3Id = Convert.ToInt32(ddl3.SelectedValue);

                    #endregion

                    #region Map DropDownList

                    ddl4.DataSource = _dataContext.sp_Level4SelectByLevel3(level3Id).ToList();
                    ddl4.DataBind();
                    ddl4.Items.Insert(0, new ListItem("Select Level", "0"));

                    #endregion

                    #region Map GridView

                    //gvMRDoctor.DataSource = _dataContext.sp_MRDoctorLevel3FourSelect(level3Name, null).ToList();
                    //gvMRDoctor.DataBind();

                    #endregion
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from ddl3_SelectedIndexChanged is " + exception.Message;
            }
        }

        protected void ddl4_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (ddl4.SelectedItem.Text == "Select Level")
            {
                ddlBrick.SelectedIndex = -1;
                btnall.Visible = false; ddlBrick.Visible = false; labbrick.Visible = false; btnSave.Visible = false; gvShowMRDoctor.Visible = false; gvMRDoctor.Visible = false; Label1.Visible = false; Label2.Visible = false;

                ddlBrick1.Visible = false; labbrick1.Visible = false; ddlBrick1.SelectedIndex = -1;
            }
            else
            {
                ddlBrick.SelectedIndex = -1;
                ddlBrick.Visible = true; labbrick.Visible = true;

                ddlBrick1.Visible = true; labbrick1.Visible = true; ddlBrick1.SelectedIndex = -1;
            }
        }

        protected void btnAdd_Click(object sender, EventArgs e)
        {
            AddAction();
        }

        protected void btnSave_Click(object sender, EventArgs e)
        {
            if (ddlLevel4.SelectedValue != "-1")
                if (ddlLevel4.SelectedValue != "")
                {
                    hldownload.Text = "";
                    hldownload.NavigateUrl = "";
                    UpdateList();
                }
                else
                {
                    lblError.Text = "First select employee type then name!";
                }
        }

        protected void btnRefresh_Click(object sender, EventArgs e)
        {
            gvMRDoctor.DataBind();
        }

        protected void ddlLevel1_SelectedIndexChanged(object sender, EventArgs e)
        {
            lblError.Text = "";

            try
            {
                if (ddlLevel1.SelectedValue != "-1")
                {
                    DefaultAction();
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
                }
                else
                {
                    DefaultAction();
                    ddlLevel2.Items.Clear(); ddlLevel3.Items.Clear(); ddlLevel4.Items.Clear(); ddlLevel5.Items.Clear(); ddlLevel6.Items.Clear();
                    lblError.Text = "Select Employee!";
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from Level1_SelectedIndexChanged Event is " + exception.Message;
            }
        }

        protected void ddlLevel2_SelectedIndexChanged(object sender, EventArgs e)
        {
            lblError.Text = "";

            try
            {
                if (ddlLevel2.SelectedValue != "-1")
                {
                    DefaultAction();
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
                }
                else
                {
                    DefaultAction();

                    ddlLevel3.Items.Clear(); ddlLevel4.Items.Clear(); ddlLevel5.Items.Clear(); ddlLevel6.Items.Clear();
                    lblError.Text = "Select Employee!";
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from Level2_SelectedIndexChanged Event is " + exception.Message;
            }
        }

        protected void ddlLevel3_SelectedIndexChanged(object sender, EventArgs e)
        {
            lblError.Text = "";

            try
            {
                if (ddlLevel3.SelectedValue != "-1")
                {
                    DefaultAction();

                    #region Get Employee Id

                    _employeeId = Convert.ToInt64(ddlLevel3.SelectedValue);

                    #endregion

                    #region Get Hierarchical Level

                    GetCurrentLevelId(_employeeId);

                    #endregion

                    #region Set Employees

                    ddlLevel4.Items.Clear();
                    ddlLevel4.DataSource = _dataContext.sp_EmployeesSelectByManager1(_employeeId).ToList();
                    ddlLevel4.DataBind();

                    #endregion

                    #region Placing Default Value in DropDownlist

                    ddlLevel4.Items.Insert(0, new ListItem("Select Employee", "-1"));

                    #endregion
                }
                else
                {
                    DefaultAction(); ddlLevel4.Items.Clear(); ddlLevel5.Items.Clear(); ddlLevel6.Items.Clear();
                    lblError.Text = "Select Employee!";
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from Level3_SelectedIndexChanged Event is " + exception.Message;
            }
        }

        protected void ddlLevel4_SelectedIndexChanged(object sender, EventArgs e)
        {
            lblError.Text = "";

            try
            {
                if (ddlLevel4.SelectedValue != "-1")
                {
                    DefaultAction();

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

                    #region Fill Grid

                    DefaultAction();
                    LoadEmployeeDr();

                    #endregion


                    LoadBrick(_employeeId);


                    btnAdd.Visible = true; Label3.Visible = true; Grid1.Visible = true; btnexport.Visible = true;
                }
                else
                {
                    DefaultAction(); ddlLevel5.Items.Clear(); ddlLevel6.Items.Clear();
                    lblError.Text = "Select Employee!";
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from Level4_SelectedIndexChanged Event is " + exception.Message;
            }
        }

        protected void ddlLevel5_SelectedIndexChanged(object sender, EventArgs e)
        {
            lblError.Text = "";

            try
            {
                if (ddlLevel5.SelectedValue != "-1")
                {
                    DefaultAction();
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
                }
                else
                {
                    DefaultAction(); ddlLevel6.Items.Clear();

                    lblError.Text = "Select Employee!";
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from Level5_SelectedIndexChanged Event is " + exception.Message;
            }
        }

        protected void ddlLevel6_SelectedIndexChanged(object sender, EventArgs e)
        {
            lblError.Text = "";

            try
            {
                if (ddlLevel6.SelectedValue != "-1")
                {
                    DefaultAction();
                    #region Get Employee Id

                    _employeeId = Convert.ToInt64(ddlLevel6.SelectedValue);

                    #endregion

                    #region Get Hierarchical Level

                    GetCurrentLevelId(_employeeId);

                    #endregion
                    btnAdd.Visible = true;
                }
                else
                {
                    DefaultAction();
                    lblError.Text = "Select Employee!";
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from Level6_SelectedIndexChanged Event is " + exception.Message;
            }
        }

        #endregion



        private void getdr(int brickid)
        {
            lblError.Text = "";
            try
            {
                #region Get Selected Text + Value

                string level3Name = Convert.ToString(ddl3.SelectedItem);
                string level4Name = Convert.ToString(ddl4.SelectedItem);
                //int DrBrick = Convert.ToInt32(ddlBrick.SelectedItem.Value);
                int DrBrick = Convert.ToInt32(brickid);
                #endregion

                #region Map GridView

                gvMRDoctor.DataSource = _dataContext.sp_MRDoctorLevel3FourSelect(level3Name, level4Name, DrBrick).ToList();
                gvMRDoctor.DataBind();

                gvShowMRDoctor.DataSource = _dataContext.sp_MRDoctorLevel3FourSelect(level3Name, level4Name, DrBrick).ToList();
                gvShowMRDoctor.DataBind();

                #endregion


                btnSave.Visible = true; Label2.Visible = true; Label1.Visible = true; gvMRDoctor.Visible = true; gvShowMRDoctor.Visible = true; btnall.Visible = true;

            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from ddl4_SelectedIndexChanged is " + exception.Message;
            }
        }

        protected void ddlBrick_SelectedIndexChanged(object sender, EventArgs e)
        {
            //try
            //{
            //    if (ddlBrick.SelectedValue == "0")
            //    {
            //        lblError.Text = "";
            //        btnall.Visible = false;
            //        ddlBrick.Visible = false; labbrick.Visible = false; btnSave.Visible = false; gvShowMRDoctor.Visible = false; gvMRDoctor.Visible = false; Label1.Visible = false; Label2.Visible = false;
            //    }
            //    else { getdr(); }
            //}
            //catch { }
        }

        protected void gvShowMRDoctor_RowDataBound(object sender, GridRowEventArgs e)
        {
            if (e.Row.RowType == GridRowType.DataRow)
            {
                #region Display MR/BMD Code if DR is belong to MR, otherwise Show Master Doctor Code


                long doctorId = Convert.ToInt64(e.Row.Cells[1].Text);

                var txtCell3 = e.Row.Cells[2] as GridDataControlFieldCell;
                var txt3 = txtCell3.FindControl("labMrcode") as Label;

                if (ddlLevel4.SelectedValue != "-1")
                    if (ddlLevel4.SelectedValue != "")
                    {
                        var isMRDr = _dataContext.sp_DoctorsOfSpoSelect(doctorId, Convert.ToInt64(ddlLevel4.SelectedValue)).ToList();

                        if (isMRDr.Count != 0)
                        {

                            txt3.Text = isMRDr[0].DoctorCode;
                        }
                        else
                        {
                            e.Row.Visible = false;

                        }
                    }

                #endregion
            }
        }

        protected void btnall_Click(object sender, EventArgs e)
        {
            ddlBrick.SelectedIndex = -1; ddl3.SelectedIndex = -1; ddl4.Items.Clear();
            btnall.Visible = false; ddlBrick.Visible = false; labbrick.Visible = false; btnSave.Visible = false; gvShowMRDoctor.Visible = false;
            gvMRDoctor.Visible = false; Label1.Visible = false; Label2.Visible = false; ddl4.Visible = false; ddl3.Visible = false;
            Grid1.Visible = true; Label3.Visible = true; btnAdd.Visible = true; lblLevelG4.Visible = false; lblLevelG3.Visible = false; lblGhl.Visible = false;
            ddlLevel4_SelectedIndexChanged(sender, e);
        }

        protected void btnexport_Click(object sender, EventArgs e)
        {
            Grid1.ExportingSettings.FileName = ddlLevel4.SelectedItem.Text.ToString();
            string fileName = Grid1.ExportToExcel();
            hldownload.Text = "Click here to download the file.";
            hldownload.NavigateUrl = "~\\resources\\" + fileName;
        }

        protected void ddlBrick_SelectedIndexChanged1(object sender, EventArgs e)
        {
            try
            {
                if (ddlBrick.SelectedValue == "0")
                {
                    lblError.Text = "";
                    btnall.Visible = false;
                    ddlBrick.Visible = false; labbrick.Visible = false; btnSave.Visible = false; gvShowMRDoctor.Visible = false; gvMRDoctor.Visible = false; Label1.Visible = false; Label2.Visible = false;
                    ddlBrick1.Visible = false; labbrick1.Visible = false;
                }
                else { int DrBrick = Convert.ToInt32(ddlBrick.SelectedItem.Value); getdr(DrBrick); }
            }
            catch { }
        }

        protected void ddlBrick1_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                if (ddlBrick1.SelectedValue == "0")
                {
                    lblError.Text = "";
                    btnall.Visible = false;
                    ddlBrick1.Visible = false; labbrick1.Visible = false; btnSave.Visible = false; gvShowMRDoctor.Visible = false; gvMRDoctor.Visible = false; Label1.Visible = false; Label2.Visible = false;
                    ddlBrick.Visible = false; labbrick.Visible = false;
                }
                else
                {
                    int DrBrick = Convert.ToInt32(ddlBrick1.SelectedItem.Value);
                    ddlBrick.SelectedItem.Text = ddlBrick1.SelectedItem.Text;
                    getdr(DrBrick);
                }
            }
            catch { }
        }


    }
}