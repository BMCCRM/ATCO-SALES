using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.UI.WebControls;
using DatabaseLayer.SQL;
using PocketDCR.CustomMembershipProvider;
using System.Data;
using PocketDCR2.Classes;
using System.Drawing;
using System.Collections.Specialized;
using System.Data.SqlClient;
using System.IO;
using System.Configuration;

namespace PocketDCR2.Form
{
    public partial class MRPlan : System.Web.UI.Page
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
        private string _currentLoginId = "", _currentRole = "", _hierarchyName = "", _smsResponse = "";
        private int _currentYear = 0, _currentMonth = 0, _currentDay = 0, _daysOfMonth = 0, _level1Id = 0, _level2Id = 0,
            _level3Id = 0, _level4Id = 0, _level5Id = 0, _level6Id = 0, _sendToApproval = 0, _status = 0;
        private long _employeeId = 0;
        private DateTime _currentDateTime;
        List<MRPlanning> _insertPlan;
        List<MRPlanning> _updatePlan; int lab = 0;
        private SmsApi _sendSMS;
        private NameValueCollection nv = new NameValueCollection();
        int currnetPageIndx, itemCount;

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
                    //ddlYear.Items.Add(new ListItem(cYear.ToString(), cYear.ToString()));
                }

                #endregion

                #region Set Default Values

                //ddlYear.Items.Insert(0, new ListItem("Select Year", "-1"));

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

                if (txtDate.Text == "")
                {
                    #region Get Current Year + Month + DaysInMonth

                    _currentYear = Convert.ToInt32(DateTime.Now.Year);
                    _currentMonth = Convert.ToInt32(DateTime.Now.Month);
                    _currentDay = Convert.ToInt32(DateTime.Now.Day);
                    _daysOfMonth = DateTime.DaysInMonth(_currentYear, _currentMonth);

                    #endregion

                    #region Set Year +  Month to Date

                    txtDate.Text = DateTime.Now.ToString("MMMM-yyyy").ToString();

                    #endregion

                    #region Get Date from Selected Year + Month

                    currentDate = _currentMonth + "-" + _currentDay + "-" + _currentYear;
                    _currentDateTime = Convert.ToDateTime(currentDate);

                    #endregion
                }
                else if (txtDate.Text != "")
                {
                    #region Get Current Year + Month + DaysInMonth

                    _currentYear = Convert.ToInt32(Convert.ToDateTime(txtDate.Text).Year);
                    _currentMonth = Convert.ToInt32(Convert.ToDateTime(txtDate.Text).Month);
                    _currentDay = 1;
                    _daysOfMonth = DateTime.DaysInMonth(_currentYear, _currentMonth);

                    #endregion

                    #region Get Date from Selected Year + Month

                    currentDate = _currentMonth + "-" + _currentDay + "-" + _currentYear;
                    _currentDateTime = Convert.ToDateTime(currentDate);

                    #endregion
                }
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
                    _employeeId = Convert.ToInt64(_currentUser.EmployeeId);
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

        private void CheckIsPlanApproved()
        {
            SetYearMonth();

            long employeeId = Convert.ToInt64(_currentUser.EmployeeId);
            int year = Convert.ToInt32(_currentDateTime.Year);
            int month = Convert.ToInt32(_currentDateTime.Month);

            var checkIsPlanApproved =
                _dataContext.sp_PlanApprovalSelect(employeeId, year, month).ToList();

            if (checkIsPlanApproved.Count > 0)
            {
                HidePanel();
                _status = Convert.ToInt32(checkIsPlanApproved[0].PlanStatus);

                if (_status == 1)
                {
                    this.HidePanel();
                    btnSave.Visible = false;
                    btnSubmit.Visible = false;
                    txtReason.Text = checkIsPlanApproved[0].Reason;
                    txtReason.Visible = true;
                    lblReason.Visible = true;
                }
                else if (_status == 2)
                {
                    this.ShowPanel();
                    txtReason.ReadOnly = false;
                    txtReason.Text = checkIsPlanApproved[0].Reason;
                    txtReason.ReadOnly = true;
                    btnSave.Visible = true;
                    btnSubmit.Visible = true;
                    txtReason.Visible = true;
                    lblReason.Visible = true;
                }
                else if (_status == 3)
                {
                    this.HidePanel();
                    btnSave.Visible = false;
                    btnSubmit.Visible = false;
                    txtReason.Visible = false;
                    lblReason.Visible = false;
                }
            }
            GetPlan();
        }

        private void LoadBrick()
        {
            try
            {
                ddlBrick.DataSource = _dataContext.sp_MrDrBrickSelect(Convert.ToInt64(_currentUser.EmployeeId)).ToList();
                ddlBrick.DataBind();
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from LoadBrick is " + exception.Message;
            }
        }

        private void GetPlan()
        {
            try
            {
                #region Initialization

                List<DoctorsOfSpo> getDoctorId;
                List<Doctor> getDoctorName;
                List<DoctorClass> getObjectiveFrequency;
                List<v_DoctorClass> getDoctorClass;
                List<v_MRPlanning> isPlanPresent;
                int targetCall = 0, total = 0, noNewDr = 0;
                long doctorId = 0;
                string doctorName = "", className = "";

                #endregion

                #region Current MR Detail

                GetCurrentDetail();

                #endregion

                #region Get Selected Year + Month + Day + Date

                SetYearMonth();

                #endregion

                #region Check Is Plan Present?

                int brickId = Convert.ToInt32(ddlBrick.SelectedValue);
                List<v_MrDrBrick1> getDrId;

                if (brickId > 0)
                {
                    getDrId = _dataContext.sp_MrDrBrickSelect1(_employeeId, Convert.ToInt32(ddlBrick.SelectedValue)).ToList();
                }
                else
                {
                    getDrId = _dataContext.sp_MrDrBrickSelect1(_employeeId, null).ToList();
                }

                if (getDrId.Count > 0)
                {
                    //getDoctorId = _dataContext.sp_DoctorsOfSpoSelect(null, _employeeId).ToList();
                    //if (getDoctorId.Count != 0)
                    //{

                    #region Is Certain Doctor Plan Present? If not present then Add plan

                    foreach (var doctor in getDrId)
                    {
                        
                        doctorId = Convert.ToInt64(doctor.DoctorId);
                        getDoctorName = _dataContext.sp_DoctorsSelect(doctorId, null, null, null).ToList();

                        if (getDoctorName.Count != 0)
                        {
                            string Fname = (getDoctorName[0].FirstName == "-") ? " " : getDoctorName[0].FirstName;
                            string Mname = (getDoctorName[0].MiddleName == "-") ? " " : getDoctorName[0].MiddleName;
                            string Lname = (getDoctorName[0].LastName == "-") ? " " : getDoctorName[0].LastName;

                            doctorName = "";
                            isPlanPresent = _dataContext.sp_MRPlanningSelectByView(_employeeId, doctorId, null, null, _currentDateTime).ToList();

                            if (isPlanPresent.Count == 0)
                            {
                                #region Initialize Requirement

                                #region Get Doctor Class

                                getDoctorClass = _dataContext.sp_DoctorClassSelectByDoctor(doctorId).ToList();

                                if (getDoctorClass.Count != 0)
                                {
                                    className = getDoctorClass[0].ClassName;
                                }

                                #endregion

                                #region Get Target Frequency

                                getObjectiveFrequency = _dataContext.sp_DoctorClassesSelect(null, className).ToList();


                                if (getObjectiveFrequency.Count != 0)
                                {
                                    targetCall = Convert.ToInt32(getObjectiveFrequency[0].ClassFrequency);
                                }

                                #endregion

                                #endregion

                                #region Insert Plan

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

                                _insertPlan = _dataContext.sp_MRPlanningInsert(_employeeId, doctorId, targetCall, 0, 0, _currentDateTime, _level1Id, _level2Id, _level3Id,
                                        _level4Id, _level5Id, _level6Id).ToList();

                                #endregion
                            }
                        }
                    }

                    #endregion

                    //}
                }

                #endregion

                #region Display Plan

                Grid1.DataSource = null;

                if (brickId > 0)
                {
                    Grid1.DataSource = _dataContext.sp_MRPlanningSelectByView(_employeeId, null, null,
                         Convert.ToInt32(ddlBrick.SelectedValue), _currentDateTime).ToList();
                    //BindGrid(1, 500, _employeeId.ToString(), ddlBrick.SelectedValue, _currentDateTime.ToString());
                    //Session["employeeid"] = _employeeId.ToString();
                    //Session["brickid"] = ddlBrick.SelectedValue;
                    //Session["currentdatetime"] = _currentDateTime.ToString();
                }
                else
                {
                    Grid1.DataSource = _dataContext.sp_MRPlanningSelectByView(_employeeId, null, null,
                          null, _currentDateTime).ToList();
                    //BindGrid(1, 500, _employeeId.ToString(), "NULL", _currentDateTime.ToString());
                    //Session["employeeid"] = _employeeId.ToString();
                    //Session["brickid"] = "NULL";
                    //Session["currentdatetime"] = _currentDateTime.ToString();
                }

                Grid1.DataBind();

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

                #region Check if any new Doctor is entered or not

                int year = Convert.ToInt32(_currentDateTime.Year);
                int month = Convert.ToInt32(_currentDateTime.Month);

                #region plan Status

                var checkIsPlanApproved =
                _dataContext.sp_PlanApprovalSelect(Convert.ToInt64(_currentUser.EmployeeId), year, month).ToList();

                pared.Visible = false;
                payellow.Visible = false;
                pangreen.Visible = false;
                labstatus.Visible = false;
                txtReason.ReadOnly = false;


                if (checkIsPlanApproved.Count > 0)
                {
                    _status = Convert.ToInt32(checkIsPlanApproved[0].PlanStatus);
                    txtReason.Text = checkIsPlanApproved[0].Reason;
                    if (_status == 1)
                    {
                        pangreen.Visible = true;
                        payellow.Visible = false;
                        pared.Visible = false;
                        labstatus.Visible = true;

                        this.HidePanel();
                        btnSave.Visible = false;
                        btnSubmit.Visible = false;
                    }
                    else if (_status == 2)
                    {
                        pared.Visible = true;
                        payellow.Visible = false;
                        pangreen.Visible = false;
                        labstatus.Visible = true;

                        this.ShowPanel();
                        btnSave.Visible = true;
                        btnSubmit.Visible = true;
                    }
                    else if (_status == 3)
                    {
                        payellow.Visible = true;
                        pared.Visible = false;
                        pangreen.Visible = false;
                        labstatus.Visible = true;
                        this.HidePanel();
                        btnSave.Visible = false;
                        btnSubmit.Visible = false;
                    }
                }
                else
                {
                    this.HidePanel();
                    btnSave.Visible = true;
                    btnSubmit.Visible = true;
                }

                #endregion

                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from GetPlan is " + exception.Message;
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


                #endregion



                #region Current MR Detail

                GetCurrentDetail();

                #endregion



                #region Get Selected Year + Month + Day + Date

                SetYearMonth();

                #endregion



                #region Update Plan

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

                        ErrorLog("", "LOOP>>>>  Update Plan start" + i);

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


                        ErrorLog("", "LOOP>>>> Update Plan End" + i);
                        #endregion

                        #region Display Success

                        if (_updatePlan.Count != 0)
                        {
                            if (_sendToApproval > 0)
                            {
                                lblError.Text = "Planning has been transfer for approval!";
                            }
                            else if (_sendToApproval == 0)
                            {
                                lblError.Text = "Planning has been saved!";
                            }

                            lblError.ForeColor = Color.Green;
                        }

                        #endregion

                        #endregion
                    }
                }

                #endregion

                #region Display Plan

                int brickId = Convert.ToInt32(ddlBrick.SelectedValue);
                Grid1.DataSource = null;


                if (brickId > 0)
                {
                    Grid1.DataSource = _dataContext.sp_MRPlanningSelectByView(_employeeId, null, null,
                       Convert.ToInt32(ddlBrick.SelectedValue), _currentDateTime).ToList();
                    //BindGrid(1, 15, _employeeId.ToString(), ddlBrick.SelectedValue, _currentDateTime.ToString());
                    //Session["employeeid"] = _employeeId.ToString();
                    //Session["brickid"] = ddlBrick.SelectedValue;
                    //Session["currentdatetime"] = _currentDateTime.ToString();
                }
                else
                {
                    Grid1.DataSource = _dataContext.sp_MRPlanningSelectByView(_employeeId, null, null,
                       null, _currentDateTime).ToList();
                    //BindGrid(1, 15, _employeeId.ToString(), "NULL", _currentDateTime.ToString());
                    //Session["employeeid"] = _employeeId.ToString();
                    //Session["brickid"] = "NULL";
                    //Session["currentdatetime"] = _currentDateTime.ToString();
                }
                Grid1.DataBind();

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

                CheckIsPlanApproved();
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from UpdatePlan is " + exception.Message;
            }
        }

        public void ErrorLog(string sPathName, string sErrMsg)
        {
            try
            {
                if (!Directory.Exists(ConfigurationManager.AppSettings[@"Logs"].ToString()))
                {
                    Directory.CreateDirectory(ConfigurationManager.AppSettings[@"Logs"].ToString());
                }

                File.AppendAllText(ConfigurationManager.AppSettings[@"Logs\"].ToString() + "1_Error_Log.txt",
                    sErrMsg + Environment.NewLine);
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
        }

        private void ClearField()
        {
            lblError.Text = "";
        }

        private void ShowPanel()
        {
            pnlReason.Visible = true;

        }
        
        private void HidePanel()
        {
            pnlReason.Visible = false;
            txtReason.Visible = false;
            lblReason.Visible = false;
            btnSave.Visible = false;
            btnSubmit.Visible = false;
            pared.Visible = false;
            payellow.Visible = false;
            pangreen.Visible = false;
            labstatus.Visible = false;
        }

        private void PlanApprovalWork()
        {
            SetYearMonth();

            _employeeId = Convert.ToInt64(_currentUser.EmployeeId);
            
            #region Send SMS to MR Manager to check MR's new plan

            if (_sendToApproval > 0)
            {
                var getManager = _dataContext.sp_EmployeesSelect(_employeeId).ToList();
                if (getManager.Count > 0)
                {
                    string Fname = (getManager[0].FirstName == "-") ? "" : getManager[0].FirstName;
                    string Mname = (getManager[0].MiddleName == "-") ? "" : getManager[0].MiddleName;
                    string Lname = (getManager[0].LastName == "-") ? "" : getManager[0].LastName; ;
                    var mrName = Fname + " " + Mname + " " + Lname;
                    var mrMobileNo = getManager[0].MobileNumber;
                    long managerId = Convert.ToInt64(getManager[0].ManagerId);


                    if (managerId > 0)
                    {
                        var getMobileNumber = _dataContext.sp_EmployeesSelect(managerId).ToList();

                        if (getMobileNumber.Count > 0)
                        {
                            string Fname1 = (getMobileNumber[0].FirstName == "-") ? "" : getMobileNumber[0].FirstName;
                            string Mname1 = (getMobileNumber[0].MiddleName == "-") ? "" : getMobileNumber[0].MiddleName;
                            string Lname1 = (getMobileNumber[0].LastName == "-") ? "" : getMobileNumber[0].LastName; ;
                            var managerName = Fname1 + " " + Mname1 + " " + Lname1;
                            var managerMobileNo = getMobileNumber[0].MobileNumber;

                            var messageText = "Dear  " + managerName + ",\r\n   MIO named, " + mrName + ", has submitted new monthly plan for " +
                                _currentDateTime.ToString("MMMM") + " " + _currentDateTime.ToString("yyyy") + ". Please check and approve.";

                            #region Add / Update Plan for Approval

                            var getPlan = _dataContext.sp_PlanApprovalSelect(Convert.ToInt16(_employeeId.ToString()), _currentDateTime.Year, _currentDateTime.Month).ToList();

                            if (getPlan.Count > 0)
                            {
                                var updatePlan = _dataContext.sp_PlanApprovalUpdate(Convert.ToInt16(_employeeId.ToString()), 3, "", _currentDateTime.Year, _currentDateTime.Month).ToList();
                            }
                            else
                            {
                                var insertPlanApproval = _dataContext.sp_PlanApprovalInsert(Convert.ToInt16(_employeeId.ToString()), 3, _currentDateTime).ToList();
                            }

                            #endregion

                            #region Send Mgs to Manager

                            var insertSentMessage = _dataContext.sp_SmsSentInsert(mrMobileNo, managerMobileNo, messageText, DateTime.Now).ToList();

                            if (insertSentMessage.Count > 0)
                            {
                                long smsId = Convert.ToInt64(insertSentMessage[0].SmsId);
                                _smsResponse = "";
                                _smsResponse = _sendSMS.SendMessage(managerMobileNo, messageText);
                                var updateSentMessage = _dataContext.sp_SmsSentUpdate(smsId, _smsResponse).ToList();
                            }

                            //var insertSMS = _dataContext.sp_SMSOutboundInsert(managerMobileNo, messageText, true, DateTime.Now).ToList();

                            #endregion

                            #region Show SMS Respnse

                            if (_smsResponse != "")
                            {
                                lblError.Text = "Planning has been transfer for approval & SMS send to " + managerName;
                                //lblResponse.Text = _smsResponse.ToString();
                                //  mpeSMSAlert.Show();
                            }

                            #endregion
                        }
                    }
                }
            }

            #endregion
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

            DataSet ds = GetData("sp_MRPlanningSelectByViewWithPaging", nv);

            if (ds != null)
                if (ds.Tables[0].Rows.Count != 0)
                {
                    Session["itemCount"] = Convert.ToInt32(ds.Tables[0].Rows[0]["TotalRecord"].ToString());
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
                _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
                _sendSMS = new SmsApi();

                if (!IsPostBack)
                {
                    string roleType = Context.Session["CurrentUserRole"].ToString();

                    if (roleType != "rl6")
                    {
                        Response.Redirect("../Reports/Dashboard.aspx");
                    }

                    LoadBrick();
                    HidePanel();
                    SetYearMonth();
                    Grid1.Visible = false;
                }

                ClearField();
            }
        }

        protected void btnSave_Click(object sender, EventArgs e)
        {
            if (txtDate.Text != "")
            {
                if (Grid1.Rows.Count != 0)
                {
                    _sendToApproval = 0;
                    UpdatePlan();
                }
            }
            else
            {
                lblError.Text = "Please select year - month first!";
            }
        }

        protected void btnSubmit_Click(object sender, EventArgs e)
        {
            if (txtDate.Text != "")
            {
                if (Grid1.Rows.Count != 0)
                {
                    _sendToApproval = 1;
                    PlanApprovalWork();
                    //UpdatePlan();
                    //CheckIsPlanApproved();

                    this.HidePanel();
                    btnSave.Visible = false;
                    btnSubmit.Visible = false;
                    txtReason.Visible = false;
                    lblReason.Visible = false;


                }
            }
            else
            {
                lblError.Text = "Please select year - month first!";
            }
        }

        protected void btnRefresh_Click(object sender, EventArgs e)
        {
            CheckIsPlanApproved();
        }

        protected void Grid1_DataBound(object sender, EventArgs e)
        {
            //try
            //{
            //    lab = 0;
            //    int mm = Convert.ToInt32(_currentDateTime.Month);
            //    int yy = Convert.ToInt32(_currentDateTime.Year);

            //    for (int i = 13; i <= 43; i++)
            //    {
            //        lab = lab + 1;

            //        DateTime dt2 = new DateTime(yy, mm, lab);
            //        string dayname = dt2.ToString("ddd").Substring(0, 2).ToString();

            //        if (lab <= 9)
            //        {
            //            Grid1.Columns[i].HeaderText = "0" + lab + " " + dayname;
            //        }
            //        else
            //        {
            //            Grid1.Columns[i].HeaderText = lab + " " + dayname;
            //        }

            //        Grid1.Columns[i].ItemStyle.Width = 22;
            //    }
            //    //Grid1.Columns[43].ItemStyle.Width = 30;
            //}
            //catch (Exception ex)
            //{ }
        }

        protected void txtDate_TextChanged(object sender, EventArgs e)
        {
            lblError.Text = "";
            Grid1.Dispose();
            Grid1.DataSource = "";

            HidePanel();
            pared.Visible = false;
            payellow.Visible = false;
            pangreen.Visible = false;
            labstatus.Visible = false;
            txtReason.ReadOnly = false;
        }

        protected void btnFilterPlan_Click(object sender, EventArgs e)
        {
            if (txtDate.Text != "")
            {
                if (ddlBrick.SelectedValue != "-1")
                {
                    Grid1.Visible = true;
                    CheckIsPlanApproved();
                }
                else
                {
                    Grid1.Visible = false;
                    lblError.Text = "Select brick in order to proceed!";
                }
            }
            else
            {
                lblError.Text = "Please select year - month first!";
            }
        }

        protected void PagerV2_1_Command(object sender, CommandEventArgs e)
        {
            Session["currnetPageIndx"] = Convert.ToInt32(e.CommandArgument);
            PagerV2_1.ItemCount = Convert.ToInt32(Session["itemCount"].ToString());
            PagerV2_1.CurrentIndex = Convert.ToInt32(Session["currnetPageIndx"].ToString());
            BindGrid(Convert.ToInt32(Session["currnetPageIndx"].ToString()), 500, Session["employeeid"].ToString(), Session["brickid"].ToString(), Session["currentdatetime"].ToString());
        }

        protected void Grid1_RowDataBound1(object sender, GridViewRowEventArgs e)
        {
            try
            {
                lab = 0;
                int mm = Convert.ToInt32(Convert.ToDateTime(txtDate.Text).Month);
                int yy = Convert.ToInt32(Convert.ToDateTime(txtDate.Text).Year);

                #region

                if (e.Row.RowType == DataControlRowType.DataRow)
                {

                    //GridDataControlFieldCell targetCell = e.Row.Cells[8] as GridDataControlFieldCell;
                    //GridDataControlFieldCell totalCell = e.Row.Cells[11] as GridDataControlFieldCell;

                    if (e.Row.RowIndex == 0)
                        e.Row.Style.Add("height", "55px");

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