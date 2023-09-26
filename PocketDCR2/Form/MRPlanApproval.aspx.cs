using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.UI.WebControls;
using DatabaseLayer.SQL;
using PocketDCR.CustomMembershipProvider;
using System.Data.SqlClient;
using System.Data;
using System.Collections.Specialized;
using System.Web.UI.HtmlControls;
using System.Drawing;
using Obout.Grid;
using PocketDCR2.Classes;

namespace PocketDCR2.Form
{
    public partial class MRPlanApproval : System.Web.UI.Page
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
        private string _currentLoginId = "", _currentRole = "", _hierarchyName = "", _smsResponse = "", _mrid;
        private int _currentYear = 0, _currentMonth = 0, _currentDay = 0, _daysOfMonth = 0, _level1Id = 0, _level2Id = 0, _smsType = 0,
            _level3Id = 0, _level4Id = 0, _level5Id = 0, _level6Id = 0, _isApproved = 0;
        private int _status = 0, lab = 0;
        private SmsApi _sendSMS;
        private long _employeeId = 0;
        private DateTime _currentDateTime;
        private List<DatabaseLayer.SQL.AppConfiguration> _getHierarchy;
        List<MRPlanning> _insertPlan;
        List<MRPlanning> _updatePlan;
        private NameValueCollection nv = new NameValueCollection();

        #endregion

        #region Private Functions

        private void HideCon()
        {
            Grid1.Visible = false;
            pared.Visible = false;
            payellow.Visible = false;
            pangreen.Visible = false;
            labstatus.Visible = false;
            btnApprove.Visible = false;
            btnReject.Visible = false;
            txtReason.Text = "";
            txtReason.Visible = false;
            lblReason.Visible = false;
            btnShowPlan.Visible = true;
            btncancel.Visible = true;
        }

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

        private void FillYear()
        {
            try
            {
                #region Set Number of Years

                int currentYear = DateTime.Today.AddYears(50).Year;
                int firstDayOfYear = 2000;
                int lastDayOfYear = currentYear;

                int cYear = 2000;
                int tempDate = firstDayOfYear;

                for (int i = 1; i <= 50; i++)
                {
                    cYear = Convert.ToInt32(cYear) + 1;
                    ddlYear.Items.Add(new ListItem(cYear.ToString(), cYear.ToString()));
                }

                #endregion

                #region Set Default Values

                ddlYear.Items.Insert(0, new ListItem("Select Year", "-1"));

                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = exception.Message;
            }
        }

        private void SetYearMonth()
        {
            try
            {
                string currentDate = "";

                if (ddlYear.SelectedValue == "-1" && ddlMonth.SelectedValue == "-1")
                {
                    #region Get Current Year + Month + DaysInMonth

                    _currentYear = Convert.ToInt32(DateTime.Now.Year);
                    _currentMonth = Convert.ToInt32(DateTime.Now.Month);
                    _currentDay = Convert.ToInt32(DateTime.Now.Day);
                    _daysOfMonth = DateTime.DaysInMonth(_currentYear, _currentMonth);
                    noday.Value = Convert.ToString(DateTime.DaysInMonth(_currentYear, _currentMonth));
                    #endregion

                    #region Set Year +  Month to DropdownList

                    ddlYear.SelectedValue = _currentYear.ToString();
                    ddlMonth.SelectedValue = _currentMonth.ToString();

                    #endregion

                    #region Get Date from Selected Year + Month

                    currentDate = _currentMonth + "-" + _currentDay + "-" + _currentYear;
                    _currentDateTime = Convert.ToDateTime(currentDate);

                    #endregion
                }
                else if (ddlYear.SelectedValue != "-1" && ddlMonth.SelectedValue != "-1")
                {
                    #region Get Current Year + Month + DaysInMonth

                    _currentYear = Convert.ToInt32(ddlYear.SelectedValue);
                    _currentMonth = Convert.ToInt32(ddlMonth.SelectedValue);
                    _currentDay = 1;
                    _daysOfMonth = DateTime.DaysInMonth(_currentYear, _currentMonth);
                    noday.Value = Convert.ToString(DateTime.DaysInMonth(_currentYear, _currentMonth));
                    #endregion

                    #region Get Date from Selected Year + Month

                    currentDate = _currentMonth + "-" + _currentDay + "-" + _currentYear;
                    _currentDateTime = Convert.ToDateTime(currentDate);

                    #endregion
                }
                hfdate.Value = _currentDateTime.ToString();
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from SetYearMonth is " + exception.Message;
            }
        }

        private void GetCurrentDetail()
        {
            try
            {
                var getHierarchy =
                    _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

                if (getHierarchy.Count != 0)
                {
                    _hierarchyName = getHierarchy[0].SettingName;
                    _employeeId = Convert.ToInt64(hfmioId.Value);
                    _currentLoginId = Session["CurrentUserLoginID"].ToString();
                    _currentRole = Session["CurrentUserRole"].ToString();

                    var getCurrentMembershipId =
                        _dataContext.sp_EmployeeMembershipSelectByEmployee(_employeeId).ToList();

                    if (getCurrentMembershipId.Count != 0)
                    {
                        var getCurrentLevelId =
                            _dataContext.sp_EmployeeHierarchySelectByMembership(Convert.ToInt64(getCurrentMembershipId[0].SystemUserID)).ToList();

                        if (getCurrentLevelId.Count != 0)
                        {
                            #region Get Hierarchy Levels

                            if (_hierarchyName == "Level1")
                            {
                                _level1Id = Convert.ToInt32(getCurrentLevelId[0].LevelId1); _level2Id = Convert.ToInt32(getCurrentLevelId[0].LevelId2);
                                _level3Id = Convert.ToInt32(getCurrentLevelId[0].LevelId3); _level4Id = Convert.ToInt32(getCurrentLevelId[0].LevelId4);
                                _level5Id = Convert.ToInt32(getCurrentLevelId[0].LevelId5); _level6Id = Convert.ToInt32(getCurrentLevelId[0].LevelId6);
                            }
                            else if (_hierarchyName == "Level2")
                            {
                                _level2Id = Convert.ToInt32(getCurrentLevelId[0].LevelId2); _level3Id = Convert.ToInt32(getCurrentLevelId[0].LevelId3);
                                _level4Id = Convert.ToInt32(getCurrentLevelId[0].LevelId4); _level5Id = Convert.ToInt32(getCurrentLevelId[0].LevelId5);
                                _level6Id = Convert.ToInt32(getCurrentLevelId[0].LevelId6);
                            }
                            else if (_hierarchyName == "Level3")
                            {
                                _level3Id = Convert.ToInt32(getCurrentLevelId[0].LevelId3); _level4Id = Convert.ToInt32(getCurrentLevelId[0].LevelId4);
                                _level5Id = Convert.ToInt32(getCurrentLevelId[0].LevelId5); _level6Id = Convert.ToInt32(getCurrentLevelId[0].LevelId6);
                            }
                            else if (_hierarchyName == "Level4")
                            {
                                _level4Id = Convert.ToInt32(getCurrentLevelId[0].LevelId4); _level5Id = Convert.ToInt32(getCurrentLevelId[0].LevelId5);
                                _level6Id = Convert.ToInt32(getCurrentLevelId[0].LevelId6);
                            }
                            else if (_hierarchyName == "Level5")
                            {
                                _level5Id = Convert.ToInt32(getCurrentLevelId[0].LevelId5); _level6Id = Convert.ToInt32(getCurrentLevelId[0].LevelId6);
                            }
                            else if (_hierarchyName == "Level6")
                            {
                                _level6Id = Convert.ToInt32(getCurrentLevelId[0].LevelId6);
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
                            #region Level3 Customization

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
                                        lblLevel1.Visible = false;
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
                checkIsEmpappPlan();
                ddlLevel1.Items.Insert(0, new ListItem("Select Employee", "-1"));

                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from LoadEmployee Method is " + exception.Message;
            }
        }

        private void checkIsEmpappPlan()
        {
            try
            {
                // GridView1.DataSource = "";
                DataTable dt = new DataTable();
                dt.Columns.Add("EmployeeId");
                dt.Columns.Add("EmployeeName");
                dt.Columns.Add("TiemStamp");
                dt.Columns.Add("TiemStamp2");
                //dt.Columns.Add("PlanStatus");

                for (int i = 0; i < ddlLevel1.Items.Count; i++)
                {
                    string EmpId = ddlLevel1.Items[i].Value;
                    var isPlanPresent = _dataContext.sp_MRApprovalPlanSelect(Convert.ToInt32(EmpId), Convert.ToDateTime(hfdate.Value), 3).ToList();
                    if (isPlanPresent.Count != 0)
                    {
                        for (int ii = 0; ii < isPlanPresent.Count; ii++)
                        {
                            string empidi = isPlanPresent[ii].EmployeeId.ToString();
                            string empNamei = isPlanPresent[ii].EmployeeName.ToString();
                            string datei = isPlanPresent[ii].TiemStamp.ToString("dd-MMMM-yyyy");
                            string TiemStamp2 = isPlanPresent[ii].TiemStamp.ToString();
                            // string statusia = "Pendeing Plan";
                            dt.Rows.Add(empidi, empNamei, datei, TiemStamp2);
                        }
                    }
                }
                GridView1.DataSource = dt;
                GridView1.DataBind();

            }
            catch { }


        }

        private void CheckIsPlanApproved()
        {
            lblError.ForeColor = Color.Red;
            long employeeId = Convert.ToInt64(hfmioId.Value);

            int year = Convert.ToInt32(Convert.ToDateTime(hfdate.Value).Year);
            int month = Convert.ToInt32(Convert.ToDateTime(hfdate.Value).Month);

            var checkIsPlanApproved = _dataContext.sp_PlanApprovalSelect(employeeId, year, month).ToList();

            if (checkIsPlanApproved.Count > 0)
            {
                lblError.Text = "";
                _status = checkIsPlanApproved[0].PlanStatus;
                Grid1.DataSource = null;
                Grid1.Visible = true;

                #region set _status
                if (_status == 1)
                {
                    txtReason.Text = checkIsPlanApproved[0].Reason;
                    txtReason.Visible = true;
                    lblReason.Visible = true;
                    btnApprove.Visible = true;
                    btnReject.Visible = true;
                    btnShowPlan.Visible = false;
                    payellow.Visible = false;
                    pared.Visible = false;
                    pangreen.Visible = true;
                    labstatus.Visible = true;
                }
                else if (_status == 2)
                {
                    txtReason.Text = checkIsPlanApproved[0].Reason;
                    txtReason.Visible = true;
                    lblReason.Visible = true;
                    btnApprove.Visible = true;
                    btnReject.Visible = true;
                    btnShowPlan.Visible = false;
                    payellow.Visible = false;
                    pared.Visible = true;
                    pangreen.Visible = false;
                    labstatus.Visible = true;
                }
                else if (_status == 3)
                {
                    txtReason.Visible = true;
                    lblReason.Visible = true;
                    btnApprove.Visible = true;
                    btnReject.Visible = true;
                    btnShowPlan.Visible = false;
                    pared.Visible = false;
                    pangreen.Visible = false;
                    payellow.Visible = true;
                    labstatus.Visible = true;
                }

                #endregion

                _isApproved = 1;

                #region Display Plan

                //BindGrid(1, 500, Convert.ToString(hfmioId.Value), "NULL", Convert.ToDateTime(hfdate.Value).ToString());
                //Session["employeeid"] = Convert.ToString(hfmioId.Value);
                //Session["brickid"] = "NULL";
                //Session["currentdatetime"] = Convert.ToDateTime(hfdate.Value).ToString();

                var isPlanPresent = _dataContext.sp_MRPlanningSelectByView(Convert.ToInt32(hfmioId.Value), null, null, null, Convert.ToDateTime(hfdate.Value)).ToList();

                #region 30 29 28 day

                if (_daysOfMonth == 30)
                {
                    Grid1.Columns[43].Visible = false;
                }
                else if (_daysOfMonth == 29)
                {
                    Grid1.Columns[43].Visible = false;
                    Grid1.Columns[42].Visible = false;
                }
                else if (_daysOfMonth == 28)
                {
                    Grid1.Columns[43].Visible = false;
                    Grid1.Columns[42].Visible = false;
                    Grid1.Columns[41].Visible = false;
                }

                #endregion


                #endregion
            }
            else
            {
                Grid1.Visible = false;
                lblError.Text = "Plan not Available";
            }


        }

        private void UpdatePlan()
        {
            try
            {

                #region Initialize

                int planningId = 0, targetCall = 0, actualCall = 0, pendingCall = 0, total = 0, fill = 0;
                long doctorId = 0;
                CheckBox chk1, chk2, chk3, chk4, chk5, chk6, chk7, chk8, chk9, chk10, chk11, chk12, chk13, chk14, chk15, chk16, chk17, chk18, chk19, chk20,
                    chk21, chk22, chk23, chk24, chk25, chk26, chk27, chk28, chk29, chk30, chk31;
                bool Chk1 = false, Chk2 = false, Chk3 = false, Chk4 = false, Chk5 = false, Chk6 = false, Chk7 = false, Chk8 = false, Chk9 = false,
                    Chk10 = false, Chk11 = false, Chk12 = false, Chk13 = false, Chk14 = false, Chk15 = false, Chk16 = false, Chk17 = false, Chk18 = false,
                    Chk19 = false, Chk20 = false, Chk21 = false, Chk22 = false, Chk23 = false, Chk24 = false, Chk25 = false, Chk26 = false, Chk27 = false,
                    Chk28 = false, Chk29 = false, Chk30 = false, Chk31 = false;

                Label lab1, lab2, lab3, lab4, lab5;



                bool upda = false;
                #endregion

                #region Current MR Detail

                GetCurrentDetail();
                _currentDateTime = Convert.ToDateTime(hfdate.Value);
                #endregion

                #region Update Plan

                var mrName = "";
                if (Grid1.Rows.Count != 0)
                {
                    for (int i = 0; i < Grid1.Rows.Count; i++)
                    {
                        #region Place Columns Into Variable

                        lab1 = Grid1.Rows[i].FindControl("LabPlanningid") as Label;
                        lab2 = Grid1.Rows[i].FindControl("labDoctorId") as Label;
                        lab3 = Grid1.Rows[i].FindControl("lblTargetcall") as Label;
                        lab4 = Grid1.Rows[i].FindControl("labActualcall") as Label;
                        lab5 = Grid1.Rows[i].FindControl("lblpending") as Label;

                        planningId = Convert.ToInt32(lab1.Text);
                        doctorId = Convert.ToInt64(lab2.Text);
                        targetCall = Convert.ToInt32(lab3.Text);
                        actualCall = Convert.ToInt32(lab4.Text);
                        pendingCall = Convert.ToInt32(lab5.Text);
                        total = 0; fill = 0;






                        #region checkbox false
                        Chk1 = false; Chk2 = false; Chk3 = false; Chk4 = false; Chk5 = false; Chk6 = false; Chk7 = false; Chk8 = false;
                        Chk9 = false; Chk10 = false; Chk11 = false; Chk12 = false; Chk13 = false; Chk14 = false; Chk15 = false;
                        Chk16 = false; Chk17 = false; Chk18 = false; Chk19 = false; Chk20 = false; Chk21 = false; Chk22 = false;
                        Chk23 = false; Chk24 = false; Chk25 = false; Chk26 = false; Chk27 = false; Chk28 = false; Chk29 = false;
                        Chk30 = false; Chk31 = false;
                        #endregion

                        chk1 = Grid1.Rows[i].FindControl("chk1") as CheckBox;
                        chk2 = Grid1.Rows[i].FindControl("chk2") as CheckBox;
                        chk3 = Grid1.Rows[i].FindControl("chk3") as CheckBox;
                        chk4 = Grid1.Rows[i].FindControl("chk4") as CheckBox;
                        chk5 = Grid1.Rows[i].FindControl("chk5") as CheckBox;
                        chk6 = Grid1.Rows[i].FindControl("chk6") as CheckBox;
                        chk7 = Grid1.Rows[i].FindControl("chk7") as CheckBox;
                        chk8 = Grid1.Rows[i].FindControl("chk8") as CheckBox;
                        chk9 = Grid1.Rows[i].FindControl("chk9") as CheckBox;
                        chk10 = Grid1.Rows[i].FindControl("chk10") as CheckBox;
                        chk11 = Grid1.Rows[i].FindControl("chk11") as CheckBox;
                        chk12 = Grid1.Rows[i].FindControl("chk12") as CheckBox;
                        chk13 = Grid1.Rows[i].FindControl("chk13") as CheckBox;
                        chk14 = Grid1.Rows[i].FindControl("chk14") as CheckBox;
                        chk15 = Grid1.Rows[i].FindControl("chk15") as CheckBox;
                        chk16 = Grid1.Rows[i].FindControl("chk16") as CheckBox;
                        chk17 = Grid1.Rows[i].FindControl("chk17") as CheckBox;
                        chk18 = Grid1.Rows[i].FindControl("chk18") as CheckBox;
                        chk19 = Grid1.Rows[i].FindControl("chk19") as CheckBox;
                        chk20 = Grid1.Rows[i].FindControl("chk20") as CheckBox;
                        chk21 = Grid1.Rows[i].FindControl("chk21") as CheckBox;
                        chk22 = Grid1.Rows[i].FindControl("chk22") as CheckBox;
                        chk23 = Grid1.Rows[i].FindControl("chk23") as CheckBox;
                        chk24 = Grid1.Rows[i].FindControl("chk24") as CheckBox;
                        chk25 = Grid1.Rows[i].FindControl("chk25") as CheckBox;
                        chk26 = Grid1.Rows[i].FindControl("chk26") as CheckBox;
                        chk27 = Grid1.Rows[i].FindControl("chk27") as CheckBox;
                        chk28 = Grid1.Rows[i].FindControl("chk28") as CheckBox;
                        chk29 = Grid1.Rows[i].FindControl("chk29") as CheckBox;
                        chk30 = Grid1.Rows[i].FindControl("chk30") as CheckBox;
                        chk31 = Grid1.Rows[i].FindControl("chk31") as CheckBox;

                        #endregion

                        #region Update

                        pendingCall = targetCall - actualCall;

                        #region Checkbox With Respect To Active Month

                        #region for all months
                        if (chk1.Checked)
                        {
                            total++;
                            Chk1 = true;
                        }

                        if (chk2.Checked)
                        {
                            total++;
                            Chk2 = true;
                        }

                        if (chk3.Checked)
                        {
                            total++;
                            Chk3 = true;
                        }

                        if (chk4.Checked)
                        {
                            total++;
                            Chk4 = true;
                        }

                        if (chk5.Checked)
                        {
                            total++;
                            Chk5 = true;
                        }

                        if (chk6.Checked)
                        {
                            total++;
                            Chk6 = true;
                        }

                        if (chk7.Checked)
                        {
                            total++;
                            Chk7 = true;
                        }

                        if (chk8.Checked)
                        {
                            total++;
                            Chk8 = true;
                        }

                        if (chk9.Checked)
                        {
                            total++;
                            Chk9 = true;
                        }

                        if (chk10.Checked)
                        {
                            total++;
                            Chk10 = true;
                        }

                        if (chk11.Checked)
                        {
                            total++;
                            Chk11 = true;
                        }

                        if (chk12.Checked)
                        {
                            total++;
                            Chk12 = true;
                        }

                        if (chk13.Checked)
                        {
                            total++;
                            Chk13 = true;
                        }

                        if (chk14.Checked)
                        {
                            total++;
                            Chk14 = true;
                        }

                        if (chk15.Checked)
                        {
                            total++;
                            Chk15 = true;
                        }

                        if (chk16.Checked)
                        {
                            total++;
                            Chk16 = true;
                        }

                        if (chk17.Checked)
                        {
                            total++;
                            Chk17 = true;
                        }

                        if (chk18.Checked)
                        {
                            total++;
                            Chk18 = true;
                        }

                        if (chk19.Checked)
                        {
                            total++;
                            Chk19 = true;
                        }

                        if (chk20.Checked)
                        {
                            total++;
                            Chk20 = true;
                        }

                        if (chk21.Checked)
                        {
                            total++;
                            Chk21 = true;
                        }

                        if (chk22.Checked)
                        {
                            total++;
                            Chk22 = true;
                        }

                        if (chk23.Checked)
                        {
                            total++;
                            Chk23 = true;
                        }

                        if (chk24.Checked)
                        {
                            total++;
                            Chk24 = true;
                        }

                        if (chk25.Checked)
                        {
                            total++;
                            Chk25 = true;
                        }

                        if (chk26.Checked)
                        {
                            total++;
                            Chk26 = true;
                        }

                        if (chk27.Checked)
                        {
                            total++;
                            Chk27 = true;
                        }

                        #endregion

                        if (_daysOfMonth == 31)
                        {
                            #region CheckBox

                            if (chk28.Checked)
                            {
                                total++;
                                Chk28 = true;
                            }

                            if (chk29.Checked)
                            {
                                total++;
                                Chk29 = true;
                            }

                            if (chk30.Checked)
                            {
                                total++;
                                Chk30 = true;
                            }

                            if (chk31.Checked)
                            {
                                total++;
                                Chk31 = true;
                            }

                            #endregion
                        }
                        else if (_daysOfMonth == 30)
                        {
                            #region CheckBox

                            if (chk28.Checked)
                            {
                                total++;
                                Chk28 = true;
                            }

                            if (chk29.Checked)
                            {
                                total++;
                                Chk29 = true;
                            }

                            if (chk30.Checked)
                            {
                                total++;
                                Chk30 = true;
                            }

                            #endregion
                        }
                        else if (_daysOfMonth == 29)
                        {
                            #region CheckBox

                            if (chk28.Checked)
                            {
                                total++;
                                Chk28 = true;
                            }

                            if (chk29.Checked)
                            {
                                total++;
                                Chk29 = true;
                            }

                            #endregion
                        }
                        else if (_daysOfMonth == 28)
                        {
                            #region CheckBox

                            if (chk28.Checked)
                            {
                                total++;
                                Chk28 = true;
                            }

                            #endregion
                        }

                        #endregion

                        #region Update Plan Filter With Hierarchy

                        #region Add Default Value To Hierarchy

                        if (_level1Id == -1)
                        {
                            _level1Id = 0;
                        }

                        if (_level2Id == -1)
                        {
                            _level2Id = 0;
                        }

                        if (_level3Id == -1)
                        {
                            _level3Id = 0;
                        }

                        if (_level4Id == -1)
                        {
                            _level4Id = 0;
                        }

                        if (_level5Id == -1)
                        {
                            _level5Id = 0;
                        }

                        if (_level6Id == -1)
                        {
                            _level6Id = 0;
                        }

                        #endregion

                        _updatePlan = _dataContext.sp_MRPlanningUpdate(planningId, _employeeId, doctorId, targetCall, actualCall, total, _currentDateTime,
                                Chk1, Chk2, Chk3, Chk4, Chk5, Chk6, Chk7, Chk8, Chk9, Chk10, Chk11, Chk12, Chk13, Chk14, Chk15, Chk16, Chk17, Chk18, Chk19,
                                Chk20, Chk21, Chk22, Chk23, Chk24, Chk25, Chk26, Chk27, Chk28, Chk29, Chk30, Chk31, _level1Id, _level2Id, _level3Id,
                                _level4Id, _level5Id, _level6Id).ToList();

                        #endregion
                        List<PlanApproval> updatePlan;

                        #region Display Success

                        if (_updatePlan.Count != 0 && upda == false)
                        {
                            int year = Convert.ToInt32(Convert.ToDateTime(hfdate.Value).Year);
                            int month = Convert.ToInt32(Convert.ToDateTime(hfdate.Value).Month);



                            if (txtReason.Text != "")
                            {
                                updatePlan = _dataContext.sp_PlanApprovalUpdate(Convert.ToInt32(hfmioId.Value), 1, txtReason.Text, year, month).ToList();
                            }
                            else
                            {
                                updatePlan = _dataContext.sp_PlanApprovalUpdate(Convert.ToInt32(hfmioId.Value), 1, "", year, month).ToList();
                            }

                            if (updatePlan.Count > 0 && upda == false)
                            {
                                upda = true;
                            }

                        }

                        #endregion

                        #endregion
                    }

                    if (upda == true)
                    {
                        lblError.ForeColor = Color.Green;
                        lblError.Text = "Planning has been approved successfully!";

                        #region Send SMS to MR after approval

                        var getMr = _dataContext.sp_EmployeesSelect(Convert.ToInt32(hfmioId.Value)).ToList();

                        if (getMr.Count > 0)
                        {
                            // var mrName = (getMr[0].FirstName + " " + getMr[0].MiddleName + " " + getMr[0].LastName;

                            string Fname = (getMr[0].FirstName == "-") ? "" : getMr[0].FirstName;
                            string Mname = (getMr[0].MiddleName == "-") ? "" : getMr[0].MiddleName;
                            string Lname = (getMr[0].LastName == "-") ? "" : getMr[0].LastName; ;

                            mrName = Fname + " " + Mname + " " + Lname;

                            var mrMobileNo = getMr[0].MobileNumber;
                            long managerId = Convert.ToInt64(getMr[0].ManagerId);

                            if (managerId > 0)
                            {
                                var getMobileNumber = _dataContext.sp_EmployeesSelect(managerId).ToList();

                                if (getMobileNumber.Count > 0)
                                {
                                    var managerMobileNo = getMobileNumber[0].MobileNumber;
                                    var messageText = "Dear " + mrName + ",\r\n Your monthly plan for " +
                                        _currentDateTime.ToString("MMMM") + " " + _currentDateTime.ToString("yyyy") + " has been approved.";

                                    var insertSentMessage = _dataContext.sp_SmsSentInsert(mrMobileNo, managerMobileNo, messageText, DateTime.Now).ToList();

                                    if (insertSentMessage.Count > 0)
                                    {
                                        long smsId = Convert.ToInt64(insertSentMessage[0].SmsId);
                                        _smsResponse = "";
                                        _smsResponse = _sendSMS.SendMessage(managerMobileNo, messageText);
                                        var updateSentMessage = _dataContext.sp_SmsSentUpdate(smsId, _smsResponse).ToList();

                                    }
                                }
                            }
                        }

                        #endregion
                    }


                    if (_smsResponse != "")
                    {
                        _smsType = 1;
                        lblError.Text = "Planning has been approved successfully! & SMS send to " + mrName;
                    }

                    Grid1.Visible = false;
                    pared.Visible = false;
                    payellow.Visible = false;
                    pangreen.Visible = false;
                    labstatus.Visible = false;
                    btnApprove.Visible = false;
                    btnReject.Visible = false;
                    txtReason.Text = "";
                    txtReason.Visible = false;
                    lblReason.Visible = false;
                    btnShowPlan.Visible = true;
                    btncancel.Visible = true;

                    checkIsEmpappPlan();
                }

                #endregion


            }
            catch (Exception exception)
            {
                lblError.ForeColor = Color.Red;
                lblError.Text = "Exception is raised from UpdatePlan is " + exception.Message;
            }
        }

        #region Paging Function

        private void BindGrid(int CurrentPageIndex, int PageSize, string employeeid, string brickid, string currntdatteim)
        {
            DlstNews(CurrentPageIndex, PageSize, employeeid, brickid, currntdatteim);
        }

        private void DlstNews(int CurrentPageIndex, int PageSize, string employeeid, string brickid, string currntdatteim)
        {
            nv.Clear();
            nv.Add("@EmployeeId-bigint", employeeid);
            nv.Add("@DoctorId-bigint", "NULL");
            nv.Add("@ClassId-int", "NULL");
            nv.Add("@BrickId-int", brickid);
            nv.Add("@TiemStamp-datetime", currntdatteim);
            nv.Add("@PageSize-int", PageSize.ToString());
            nv.Add("@CurrentPage-int", CurrentPageIndex.ToString());

            System.Data.DataSet ds = GetData("sp_MRPlanningSelectByViewWithPaging", nv);

            if (ds != null)
                if (ds.Tables[0].Rows.Count != 0)
                {
                    PagerV2_1.ItemCount = Convert.ToInt32(ds.Tables[0].Rows[0]["TotalRecord"].ToString());
                    Grid1.DataSource = ds;
                    Grid1.DataBind();
                }


        }

        #endregion

        #endregion

        #region Events

        protected void Page_Load(object sender, EventArgs e)
        {
            if (IsValidUser())
            {
                _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                _sendSMS = new SmsApi();
                GetCurrentLevelId(0);

                if (!IsPostBack)
                {
                    string roleType = Context.Session["CurrentUserRole"].ToString();

                    if (roleType != "rl5")
                    {
                        Response.Redirect("../Reports/Dashboard.aspx");
                    }

                    FillYear();
                    SetYearMonth();
                    HideCon();
                    LoadDropDownHeader();
                    LoadDefaultDropDownByHierarchy();
                }
            }
            else
            {
                Response.Redirect("/Form/Login.aspx");
            }
        }

        protected void Grid1_RowDataBound(object sender, Obout.Grid.GridRowEventArgs e)
        {
            try
            {
                //  lblError.Text = hfdate.Value + "  |  " + hfmioId.Value + "  |  " + noday.Value;

                lab = 0;
                int mm = Convert.ToInt32(Convert.ToDateTime(hfdate.Value).Month);
                int yy = Convert.ToInt32(Convert.ToDateTime(hfdate.Value).Year);

                if (e.Row.RowType == GridRowType.DataRow)
                {

                    GridDataControlFieldCell targetCell = e.Row.Cells[8] as GridDataControlFieldCell;
                    GridDataControlFieldCell totalCell = e.Row.Cells[11] as GridDataControlFieldCell;

                    int targetCall = Convert.ToInt16(targetCell.Value);
                    int total = Convert.ToInt16(totalCell.Value);

                    #region targetCall and total color
                    if (targetCall != total)
                    {
                        //e.Row.Cells[11].BackColor = System.Drawing.Color.Red;
                        //e.Row.Cells[11].ForeColor = System.Drawing.Color.White;
                        //e.Row.Cells[11].Font.Bold = true;
                        e.Row.Cells[11].CssClass = "colred";
                    }
                    else if (targetCall == total)
                    {
                        //e.Row.Cells[11].BackColor = System.Drawing.Color.Green;
                        //e.Row.Cells[11].ForeColor = System.Drawing.Color.White;
                        //e.Row.Cells[11].Font.Bold = true;
                        e.Row.Cells[11].CssClass = "colgreen";
                    }

                    #endregion

                    for (int i = 13; i <= 43; i++)
                    {
                        lab = lab + 1;

                        #region CheckBox

                        //GridDataControlFieldCell cell = e.Row.Cells[i] as GridDataControlFieldCell;
                        //CheckBox chk = cell.FindControl("chk" + lab) as CheckBox;

                        //GridDataControlFieldCell targetCell = e.Row.Cells[8] as GridDataControlFieldCell;
                        //GridDataControlFieldCell totalCell = e.Row.Cells[11] as GridDataControlFieldCell;

                        //int targetCall = Convert.ToInt16(targetCell.Value);
                        //int total = Convert.ToInt16(totalCell.Value);

                        //if (chk.ToolTip == "True")
                        //{
                        //    chk.Checked = true;
                        //}
                        //else { chk.Checked = false; }
                        #endregion

                    }
                }



            }
            catch (Exception ex)
            {
                lblError.Text = "Exception is raised from Grid Data Bound is " + ex.Message;
            }
        }
        protected void Grid1_DataBound(object sender, EventArgs e)
        {
            try
            {
                lab = 0;
                int mm = Convert.ToInt32(_currentDateTime.Month);
                int yy = Convert.ToInt32(_currentDateTime.Year);

                for (int i = 13; i <= 43; i++)
                {
                    lab = lab + 1;

                    HtmlGenericControl div = new HtmlGenericControl("div");
                    DateTime dt2 = new DateTime(yy, mm, lab);
                    string dayname = dt2.ToString("ddd").Substring(0, 2).ToString();

                    if (lab <= 9)
                    {
                        Grid1.Columns[i].HeaderText = "0" + lab + " " + dayname;
                    }
                    else
                    {
                        Grid1.Columns[i].HeaderText = lab + " " + dayname;
                    }

                    Grid1.Columns[i].ItemStyle.Width = 22;

                }
                Grid1.Columns[43].ItemStyle.Width = 30;
            }
            catch
            { }
        }

        #region  ddlLevel1 to ddlLevel6

        //protected void ddlLevel1_SelectedIndexChanged(object sender, EventArgs e)
        //{
        //    lblError.Text = "";

        //    try
        //    {
        //        #region Get Employee Id

        //        _employeeId = Convert.ToInt64(ddlLevel1.SelectedValue);

        //        #endregion

        //        #region Display Plan

        //        if (ddlYear.SelectedValue != "-1")
        //        {
        //            if (ddlMonth.SelectedValue != "-1")
        //            {
        //                if (ddlLevel4.SelectedValue != "-1")
        //                {
        //                    CheckIsPlanApproved();
        //                }
        //                else
        //                {
        //                    // lblError.Text = "Please select 4th Dropdownlist of Geographical Hierarchy!";
        //                }
        //            }
        //            else
        //            {
        //                lblError.Text = "Please select month!";
        //            }
        //        }
        //        else
        //        {
        //            lblError.Text = "Please select year!";
        //        }

        //        #endregion
        //    }
        //    catch (Exception exception)
        //    {
        //        lblError.Text = "Exception is raised from Level1_SelectedIndexChanged Event is " + exception.Message;
        //    }
        //}

        protected void ddlLevel2_SelectedIndexChanged(object sender, EventArgs e)
        {
            lblError.Text = "";

            try
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
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from Level5_SelectedIndexChanged Event is " + exception.Message;
            }
        }

        protected void ddlLevel6_SelectedIndexChanged(object sender, EventArgs e)
        {
            lblError.Text = "";

            #region Get Employee Id

            _employeeId = Convert.ToInt64(ddlLevel6.SelectedValue);

            #endregion

            #region Get Hierarchical Level

            GetCurrentLevelId(_employeeId);

            #endregion
        }
        #endregion

        protected void btnApprove_Click(object sender, EventArgs e)
        {

            if (txtReason.Text != "")
            {
                UpdatePlan();

            }
            else
            {
                lblError.ForeColor = Color.Red;
                lblError.Text = "Enter comment!";
            }
        }

        protected void btnReject_Click(object sender, EventArgs e)
        {
            try
            {
                lblError.Text = "";
                lblError.ForeColor = Color.Green;

                if (txtReason.Text != "")
                {
                    int year = Convert.ToInt32(Convert.ToDateTime(hfdate.Value).Year);
                    int month = Convert.ToInt32(Convert.ToDateTime(hfdate.Value).Month);

                    var updatePlan =
                        _dataContext.sp_PlanApprovalUpdate(Convert.ToInt32(hfmioId.Value), 2, txtReason.Text, year, month).ToList();

                    if (updatePlan.Count > 0)
                    {
                        lblError.Text = "Planning has been reject";

                        #region Send SMS to MR after reject

                        var getMr = _dataContext.sp_EmployeesSelect(Convert.ToInt32(hfmioId.Value)).ToList();

                        if (getMr.Count > 0)
                        {
                            string Fname = (getMr[0].FirstName == "-") ? "" : getMr[0].FirstName;
                            string Mname = (getMr[0].MiddleName == "-") ? "" : getMr[0].MiddleName;
                            string Lname = (getMr[0].LastName == "-") ? "" : getMr[0].LastName; ;

                            var mrName = Fname + " " + Mname + " " + Lname;
                            var mrMobileNo = getMr[0].MobileNumber;
                            long managerId = Convert.ToInt64(getMr[0].ManagerId);

                            if (managerId > 0)
                            {
                                var getMobileNumber = _dataContext.sp_EmployeesSelect(managerId).ToList();

                                if (getMobileNumber.Count > 0)
                                {
                                    var managerMobileNo = getMobileNumber[0].MobileNumber;
                                    //var messageText = "Dear " + mrName + ", Your monthly plan of, Year: " + _currentDateTime.Year
                                    //    + " Month: " + _currentDateTime.Month + " has been reject!";

                                    var messageText = "Dear " + mrName + ",\r\n Your monthly plan for " +
                                       _currentDateTime.ToString("MMMM") + " " + _currentDateTime.ToString("yyyy") + " has NOT been approved.";

                                    var insertSentMessage = _dataContext.sp_SmsSentInsert(mrMobileNo, managerMobileNo, messageText, DateTime.Now).ToList();

                                    if (insertSentMessage.Count > 0)
                                    {
                                        long smsId = Convert.ToInt64(insertSentMessage[0].SmsId);
                                        _smsResponse = "";
                                        _smsResponse = _sendSMS.SendMessage(managerMobileNo, messageText);
                                        var updateSentMessage = _dataContext.sp_SmsSentUpdate(smsId, _smsResponse).ToList();
                                        //var insertSMS = _dataContext.sp_SMSOutboundInsert(managerMobileNo, messageText, true, DateTime.Now).ToList();

                                        #region Show SMS Respnse
                                        if (_smsResponse != "")
                                        {
                                            _smsType = 2;
                                            lblError.ForeColor = Color.Green;
                                            lblError.Text = "Planning has been reject & SMS send successfully to " + mrName;
                                            //  lblResponse.Text = _smsResponse.ToString(); ahmer
                                            //  mpeSMSAlert.Show();
                                        }

                                        #endregion
                                    }
                                }
                            }
                        }

                        #endregion
                    }

                    checkIsEmpappPlan(); HideCon();
                }
                else
                {
                    lblError.Text = "Please enter Comments";
                }

            }
            catch (Exception exception)
            {
                // Console.Out.WriteLine(exception.Message);
            }


        }

        protected void btnRefresh_Click(object sender, EventArgs e)
        {
            CheckIsPlanApproved();
        }

        protected void GridView1_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            try
            {

                if (e.CommandName != "Page")
                {
                    int inRowIndex = Convert.ToInt32(e.CommandArgument);

                    if (GridView1.PageIndex != 0)
                    {
                        if (inRowIndex >= GridView1.PageSize)
                        {
                            inRowIndex = inRowIndex - (GridView1.PageSize * GridView1.PageIndex);
                        }
                    }
                    _mrid = GridView1.DataKeys[inRowIndex][0].ToString();
                    string datetime = GridView1.DataKeys[inRowIndex][1].ToString();

                    hfdate.Value = datetime;
                    hfmioId.Value = _mrid;
                    _currentDateTime = Convert.ToDateTime(hfdate.Value);
                    //   var isPlanPresent =
                    Grid1.DataSource = Grid1.DataSource = _dataContext.sp_MRPlanningSelectByView(Convert.ToInt32(_mrid), null, null, null, _currentDateTime).ToList();
                    Grid1.DataBind();

                    //BindGrid(1, 500, Convert.ToString(hfmioId.Value), "NULL", Convert.ToDateTime(hfdate.Value).ToString());
                    //Session["employeeid"] = Convert.ToString(hfmioId.Value);
                    //Session["brickid"] = "NULL";
                    //Session["currentdatetime"] = Convert.ToDateTime(hfdate.Value).ToString();
                    payellow.Visible = true;
                    pangreen.Visible = false;
                    pared.Visible = false;
                    labstatus.Visible = true;
                    Grid1.Visible = true;
                    txtReason.Visible = true;
                    lblReason.Visible = true;
                    btnApprove.Visible = true;
                    btnReject.Visible = true;
                    btnShowPlan.Visible = false;


                }


            }
            catch
            { }
        }

        protected void btnShowPlan_Click(object sender, EventArgs e)
        {
            lblError.ForeColor = Color.Red;
            if (ddlYear.SelectedValue != "-1")
            {
                if (ddlMonth.SelectedValue != "-1")
                {
                    if (ddlLevel1.SelectedValue != "-1" && ddlLevel1.SelectedValue != "")
                    {
                        hfmioId.Value = ddlLevel1.SelectedValue;
                        SetYearMonth();
                        CheckIsPlanApproved();
                        Grid1.Visible = true;
                    }
                    else
                    {
                        lblError.Text = "Please select MIO!";
                    }
                }
                else
                {
                    lblError.Text = "Please select month!";
                }
            }
            else
            {
                lblError.Text = "Please select year!";
            }
        }

        protected void btncancel_Click(object sender, EventArgs e)
        {
            HideCon();
            checkIsEmpappPlan(); lblError.Text = "";
        }

        protected void ddlLevel1_SelectedIndexChanged(object sender, EventArgs e)
        {
            HideCon();
        }

        protected void ddlYear_SelectedIndexChanged(object sender, EventArgs e)
        {
            HideCon();
        }

        protected void ddlMonth_SelectedIndexChanged(object sender, EventArgs e)
        {
            HideCon();
        }

        protected void PagerV2_1_Command(object sender, CommandEventArgs e)
        {
            int currnetPageIndx = Convert.ToInt32(e.CommandArgument);
            PagerV2_1.CurrentIndex = currnetPageIndx;
            BindGrid(currnetPageIndx, 500, Session["employeeid"].ToString(), Session["brickid"].ToString(), Session["currentdatetime"].ToString());
        }

        protected void Grid1_RowDataBound1(object sender, GridViewRowEventArgs e)
        {
            try
            {
                lab = 0;
                int mm = Convert.ToInt32(Convert.ToDateTime(hfdate.Value).Month);
                int yy = Convert.ToInt32(Convert.ToDateTime(hfdate.Value).Year);
                #region

                if (e.Row.RowType == DataControlRowType.DataRow)
                {

                    //GridDataControlFieldCell targetCell = e.Row.Cells[8] as GridDataControlFieldCell;
                    //GridDataControlFieldCell totalCell = e.Row.Cells[11] as GridDataControlFieldCell;


                    Label targetCall = (Label)e.Row.FindControl("lblTargetcall");
                    Label total = (Label)e.Row.FindControl("lblTotal");

                    if (targetCall.Text != total.Text)
                    {
                        e.Row.Cells[11].CssClass = "colred";
                    }
                    else if (targetCall.Text == total.Text)
                    {
                        e.Row.Cells[11].CssClass = "colgreen";
                    }


                }
                #endregion
            }
            catch (Exception ex)
            {
                lblError.Text = "Exception is raised from Grid Row Data Bound is " + ex.Message;
            }
        }
        #endregion
    }
}