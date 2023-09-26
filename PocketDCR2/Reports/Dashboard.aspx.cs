using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using DatabaseLayer.SQL;
using PocketDCR.CustomMembershipProvider;
using ChartDirector;
using System.Collections;
using System.Data.SqlClient;
using System.Data;
using System.Collections.Specialized;
using System.Web.UI.HtmlControls;

namespace PocketDCR2.Reports
{
    public partial class Dashboard : System.Web.UI.Page
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
                            //Run the code with datatype length.
                            dbTyper = "SqlDbType." + arraySplit[1].ToString() + "," + arraySplit[2].ToString();
                            command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = NV[i].ToString();
                        }
                        else
                        {
                            //Run the code for int values
                            dbTyper = "SqlDbType." + arraySplit[1].ToString();
                            command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = NV[i].ToString();
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
        private System.Data.DataSet dsSum = new System.Data.DataSet();
        DataTable dtSum = new DataTable();
        #endregion

        #region Private Members

        private DatabaseDataContext _dataContext;
        private SystemUser _currentUser;
        private int _currentLevelId = 0, _level1Id = 0, _level2Id = 0, _level3Id = 0, _level4Id = 0, _level5Id = 0, _level6Id = 0;
        private NameValueCollection _nvCollection = new NameValueCollection();
        private string _currentRole = "", _hierarchyName = "";
        private List<DatabaseLayer.SQL.AppConfiguration> _getHierarchy;
        private int _dataFound = 0;
        private long _employeeId = 0;
        private DateTime _currentDate = DateTime.Today;

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

        private string GenerateTickerText()
        {
            string returnString = "";

            try
            {
                var totalCalls = new System.Data.DataSet();
                var firstMr = new System.Data.DataSet();
                var lastMr = new System.Data.DataSet();

                #region Get Total Calls of Today

                _nvCollection.Clear();
                totalCalls.Clear();
                _nvCollection.Add("@Type-char-1", Convert.ToString("T"));
                totalCalls = GetData("sp_DTotalCalls", _nvCollection);

                #endregion

                #region Get First MR of Today

                _nvCollection.Clear();
                firstMr.Clear();
                _nvCollection.Add("@Type-char-1", Convert.ToString("F"));
                firstMr = GetData("sp_DTotalCalls", _nvCollection);

                #endregion

                #region Get Last MR of Today

                _nvCollection.Clear();
                lastMr.Clear();
                _nvCollection.Add("@Type-char-1", Convert.ToString("L"));
                lastMr = GetData("sp_DTotalCalls", _nvCollection);

                #endregion

                #region Place Text on Ticker

                if (totalCalls != null)
                {
                    if (totalCalls.Tables[0].Rows.Count != 0)
                    {
                        if (Convert.ToInt32(totalCalls.Tables[0].Rows[0]["Total_Calls_Submitted"]) > 0)
                        {
                            _dataFound = 1;
                            returnString =
                                "Total Calls Submitted today: <b>" + totalCalls.Tables[0].Rows[0]["Total_Calls_Submitted"].ToString() +
                                "</b>. Total Medical Reps who submitted calls:<b> " + totalCalls.Tables[0].Rows[0]["MR"].ToString() +
                                "</b>. Average calls per MIO:<b> " + totalCalls.Tables[0].Rows[0]["Avg_Calls"].ToString() + "</b> ";
                        }
                        else
                        {
                            _dataFound = 0;
                            returnString = "No activity found today!";
                        }
                    }
                    else
                    {
                        returnString =
                            "No activity found today!";
                    }
                }

                if (firstMr != null && lastMr != null)
                {
                    if (firstMr.Tables[0].Rows.Count != 0 && lastMr.Tables[0].Rows.Count != 0)
                    {
                        returnString +=
                            ". First Call submitted by: <b>" + firstMr.Tables[0].Rows[0]["MR"].ToString() + " </b> at <b>" +
                            Convert.ToDateTime(firstMr.Tables[0].Rows[0]["Call_Time"]).ToString("dd/MM/yyyy") + "</b> " +
                            ". Last Call submitted by: <b>" + lastMr.Tables[0].Rows[0]["MR"].ToString() + " </b> at <b>" +
                            Convert.ToDateTime(lastMr.Tables[0].Rows[0]["Call_Time"]).ToString("dd/MM/yyyy") + "</b> ";
                    }
                    else
                    {
                        returnString +=
                            ". No doctor visits have been reported so far ";
                    }
                }

                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception raised from GenerateTickerText is " + exception.Message;
            }

            return returnString;
        }

        private void ActualCalls()
        {
            try
            {
                #region Initialize

                var actualCalls = new System.Data.DataSet();
                _nvCollection.Clear();
                actualCalls.Clear();
                int year = 0, month = 0;

                #endregion

                #region Set Year + Month

                if (txtDate.Text != "")
                {
                    year = _currentDate.Year;
                    month = _currentDate.Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }

                #endregion

                #region Filter By Role

                #region Commented

                //if (_currentRole == "admin" || _currentRole == "headoffice")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        if (ddlLevel1.SelectedValue == "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") &&
                //            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            actualCalls = GetData("sp_DActualCalls0Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") &&
                //            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            actualCalls = GetData("sp_DActualCalls0Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" &&
                //            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            actualCalls = GetData("sp_DActualCalls0Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1" &&
                //            (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            actualCalls = GetData("sp_DActualCalls0Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1" && ddlLevel4.SelectedValue != "-1")
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            actualCalls = GetData("sp_DActualCalls0Level3", _nvCollection);
                //        }

                //        #endregion
                //    }
                //    else if (_hierarchyName == "Level4")
                //    {

                //    }
                //    else if (_hierarchyName == "Level5")
                //    {

                //    }
                //    else if (_hierarchyName == "Level6")
                //    {

                //    }

                //    #endregion
                //}
                //else if (_currentRole == "rl1")
                //{

                //}
                //else if (_currentRole == "rl2")
                //{

                //}
                //else if (_currentRole == "rl3")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        if (ddlLevel1.SelectedValue == "-1" &&
                //            (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") && (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            actualCalls = GetData("sp_DActualCalls3Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" &&
                //            (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") && (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            actualCalls = GetData("sp_DActualCalls3Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" &&
                //            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            actualCalls = GetData("sp_DActualCalls3Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1")
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            actualCalls = GetData("sp_DActualCalls3Level3", _nvCollection);
                //        }

                //        #endregion
                //    }

                //    #endregion
                //}
                //else if (_currentRole == "rl4")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        if (ddlLevel1.SelectedValue == "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            actualCalls = GetData("sp_DActualCalls4Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            actualCalls = GetData("sp_DActualCalls4Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1")
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            actualCalls = GetData("sp_DActualCalls4Level3", _nvCollection);
                //        }

                //        #endregion
                //    }
                //    else if (_hierarchyName == "Level4")
                //    {

                //    }

                //    #endregion
                //}
                //else if (_currentRole == "rl5")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        if (ddlLevel1.SelectedValue == "-1")
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            actualCalls = GetData("sp_DActualCalls5Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1")
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            actualCalls = GetData("sp_DActualCalls5Level3", _nvCollection);
                //        }

                //        #endregion
                //    }
                //    else if (_hierarchyName == "Level4")
                //    {

                //    }
                //    else if (_hierarchyName == "Level5")
                //    {

                //    }

                //    #endregion
                //}
                //else if (_currentRole == "rl6")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //        _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //        _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //        _nvCollection.Add("@Level6Id-int", Convert.ToString(_currentLevelId));
                //        _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //        _nvCollection.Add("@Year-int", Convert.ToString(year));
                //        _nvCollection.Add("@Month-int", Convert.ToString(month));
                //        actualCalls = GetData("sp_DActualCalls6Level3", _nvCollection);
                //    }
                //    else if (_hierarchyName == "Level4")
                //    {

                //    }
                //    else if (_hierarchyName == "Level5")
                //    {

                //    }
                //    else if (_hierarchyName == "Level6")
                //    {

                //    }

                //    #endregion
                //}

                #endregion

                _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                _nvCollection.Add("@Year-int", Convert.ToString(year));
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                actualCalls = GetData("crmdashboard_DActualCalls", _nvCollection);

                #endregion

                #region Initializing Chart

                var label = new ArrayList();
                var data = new ArrayList();

                foreach (DataRow item in actualCalls.Tables[0].Rows)
                {
                    label.Add(item["Class"].ToString());
                    data.Add(Convert.ToDouble(item["Visits"].ToString()));

                    if (item["Class"].ToString() == "A")
                    {
                        dtSum.Rows.Add("Class A Doctor", Convert.ToDouble(item["Visits"].ToString()));
                    }
                    else if (item["Class"].ToString() == "B")
                    {
                        dtSum.Rows.Add("Class B Doctor", Convert.ToDouble(item["Visits"].ToString()));
                    }
                    else if (item["Class"].ToString() == "C")
                    {
                        dtSum.Rows.Add("Class C Doctor", Convert.ToDouble(item["Visits"].ToString()));
                    }

                }

                string[] Label = (string[])label.ToArray(typeof(string));
                double[] Data = (double[])data.ToArray(typeof(double));

                #endregion

                #region Place values in Pie Chart

                var pieChart = new PieChart(360, 280, 0xFFFFFF, 0xD8D0C9, 0);
                pieChart.setPieSize(180, 140, 100);
                pieChart.addTitle(8, "ACTUAL CALLS (MTD)", "News Gothic MT Bold", 10, 0xFFFFFFF, 0xA28F7F, 0xA28F7F);
                pieChart.set3D(25, 55.0);
                pieChart.setData(Data, Label);
                pieChart.setExplode(0);
                wcvActuallCall.Image = pieChart.makeWebImage(Chart.PNG);
                wcvActuallCall.ImageMap = pieChart.getHTMLImageMap("", "", "title='{label}: {value} Calls ({percent}%)'");

                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from ActualCalls is " + exception.Message;
            }
        }

        private void PlannedVsActualCalls()
        {
            try
            {
                #region Initialize

                var plannedVSactualCalls = new System.Data.DataSet();
                _nvCollection.Clear();
                plannedVSactualCalls.Clear();
                int year = 0, month = 0;
                var targetVsActual = new DataTable();

                #endregion

                #region Set Year + Month

                if (txtDate.Text != "")
                {
                    year = _currentDate.Year;
                    month = _currentDate.Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }

                #endregion

                #region Filter By Role

                #region Commented

                //if (_currentRole == "admin" || _currentRole == "headoffice")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {
                //    }
                //    else if (_hierarchyName == "Level2")
                //    {
                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        if (ddlLevel1.SelectedValue == "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") &&
                //            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            plannedVSactualCalls = GetData("sp_TargetVsActualCall0Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") &&
                //            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            plannedVSactualCalls = GetData("sp_TargetVsActualCall0Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" &&
                //            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            plannedVSactualCalls = GetData("sp_TargetVsActualCall0Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1" &&
                //            (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            plannedVSactualCalls = GetData("sp_TargetVsActualCall0Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1" && ddlLevel4.SelectedValue != "-1")
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            plannedVSactualCalls = GetData("sp_TargetVsActualCall0Level3", _nvCollection);
                //        }

                //        #endregion
                //    }
                //    else if (_hierarchyName == "Level4")
                //    {
                //    }
                //    else if (_hierarchyName == "Level5")
                //    {
                //    }
                //    else if (_hierarchyName == "Level6")
                //    {

                //    }

                //    #endregion
                //}
                //else if (_currentRole == "rl1")
                //{
                //}
                //else if (_currentRole == "rl2")
                //{
                //}
                //else if (_currentRole == "rl3")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {
                //    }
                //    else if (_hierarchyName == "Level2")
                //    {
                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        if (ddlLevel1.SelectedValue == "-1" &&
                //            (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") && (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            plannedVSactualCalls = GetData("sp_TargetVsActualCall3Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" &&
                //            (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") && (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            plannedVSactualCalls = GetData("sp_TargetVsActualCall3Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" &&
                //            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            plannedVSactualCalls = GetData("sp_TargetVsActualCall3Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1")
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            plannedVSactualCalls = GetData("sp_TargetVsActualCall3Level3", _nvCollection);
                //        }

                //        #endregion
                //    }

                //    #endregion
                //}
                //else if (_currentRole == "rl4")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {
                //    }
                //    else if (_hierarchyName == "Level2")
                //    {
                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        if (ddlLevel1.SelectedValue == "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            plannedVSactualCalls = GetData("sp_TargetVsActualCall4Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            plannedVSactualCalls = GetData("sp_TargetVsActualCall4Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1")
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            plannedVSactualCalls = GetData("sp_TargetVsActualCall4Level3", _nvCollection);
                //        }

                //        #endregion
                //    }
                //    else if (_hierarchyName == "Level4")
                //    {
                //    }

                //    #endregion
                //}
                //else if (_currentRole == "rl5")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {
                //    }
                //    else if (_hierarchyName == "Level2")
                //    {
                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        if (ddlLevel1.SelectedValue == "-1")
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            plannedVSactualCalls = GetData("sp_TargetVsActualCall5Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1")
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            plannedVSactualCalls = GetData("sp_TargetVsActualCall5Level3", _nvCollection);
                //        }

                //        #endregion
                //    }
                //    else if (_hierarchyName == "Level4")
                //    {
                //    }
                //    else if (_hierarchyName == "Level5")
                //    {
                //    }

                //    #endregion
                //}
                //else if (_currentRole == "rl6")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {
                //    }
                //    else if (_hierarchyName == "Level2")
                //    {
                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //        _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //        _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //        _nvCollection.Add("@Level6Id-int", Convert.ToString(_currentLevelId));
                //        _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //        _nvCollection.Add("@Year-int", Convert.ToString(year));
                //        _nvCollection.Add("@Month-int", Convert.ToString(month));
                //        plannedVSactualCalls = GetData("sp_TargetVsActualCall6Level3", _nvCollection);
                //    }
                //    else if (_hierarchyName == "Level4")
                //    {
                //    }
                //    else if (_hierarchyName == "Level5")
                //    {
                //    }
                //    else if (_hierarchyName == "Level6")
                //    {

                //    }

                //    #endregion
                //}

                #endregion

                _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                _nvCollection.Add("@Year-int", Convert.ToString(year));
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                plannedVSactualCalls = GetData("crmdasboard_planedvsactual", _nvCollection);

                #endregion

                #region Initializing Chart

                var label = new ArrayList();
                var planCall = new ArrayList();
                var actualCall = new ArrayList();

                foreach (DataRow item in plannedVSactualCalls.Tables[0].Rows)
                {
                    label.Add(item["Class"].ToString());
                    planCall.Add(Convert.ToDouble(item["PlanVisits"]));
                    actualCall.Add(Convert.ToDouble(item["ActualVisits"]));
                }

                string[] Label = (string[])label.ToArray(typeof(string));
                double[] PlanCall = (double[])planCall.ToArray(typeof(double));
                double[] ActualCall = (double[])actualCall.ToArray(typeof(double));

                #endregion

                #region Place Values in Bar Chart

                var barChart = new XYChart(360, 280, 0xFFFFFF, 0xD8D0C9, 0);
                barChart.addTitle(8, "TARGET VS ACTUAL CALLS (MTD)", "News Gothic MT Bold", 10, 0xFFFFFFF, 0xA28F7F, 0xA28F7F);
                barChart.setPlotArea(50, 55, 300, 200);
                barChart.xAxis().setLabels(Label);
                barChart.addLegend(50, 23, false, "Arial Bold", 10).setBackground(Chart.Transparent);
                var barLayer = barChart.addBarLayer2(Chart.Side);
                barLayer.addDataSet(PlanCall, 0xE44C16, "Target Calls");
                barLayer.addDataSet(ActualCall, 0xFCAF17, "Actual Calls");
                barLayer.setBarGap(0.2, Chart.TouchBar);
                wcvPlannedVsActual.Image = barChart.makeWebImage(Chart.PNG);
                wcvPlannedVsActual.ImageMap = barChart.getHTMLImageMap("", "", "title='{dataSetName} on Class {xLabel}: {value} calls'");

                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from PlannedVsActualCalls is " + exception.Message;
            }
        }

        private void VisitFrequency()
        {
            try
            {
                #region Initialize

                var visitFrequency = new System.Data.DataSet();
                var dataTable = new DataTable();
                _nvCollection.Clear();
                visitFrequency.Clear();
                int year = 0, month = 0;
                var classA = new ArrayList();
                var classB = new ArrayList();
                var classC = new ArrayList();

                #endregion

                #region Set Year + Month

                if (txtDate.Text != "")
                {
                    year = _currentDate.Year;
                    month = _currentDate.Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }

                #endregion

                #region Filter By Role

                #region Commented

                //if (_currentRole == "admin" || _currentRole == "headoffice")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        if (ddlLevel1.SelectedValue == "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") &&
                //            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(_currentDate));
                //            visitFrequency = GetData("sp_DVisitsFrequency0Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") &&
                //            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(_currentDate));
                //            visitFrequency = GetData("sp_DVisitsFrequency0Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" &&
                //            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(_currentDate));
                //            visitFrequency = GetData("sp_DVisitsFrequency0Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1" &&
                //            (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(_currentDate));
                //            visitFrequency = GetData("sp_DVisitsFrequency0Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1" && ddlLevel4.SelectedValue != "-1")
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(_currentDate));
                //            visitFrequency = GetData("sp_DVisitsFrequency0Level3", _nvCollection);
                //        }

                //        #endregion
                //    }

                //    #endregion
                //}
                //else if (_currentRole == "rl1")
                //{

                //}
                //else if (_currentRole == "rl2")
                //{

                //}
                //else if (_currentRole == "rl3")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        if (ddlLevel1.SelectedValue == "-1" &&
                //            (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") && (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(_currentDate));
                //            visitFrequency = GetData("sp_DVisitsFrequency3Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" &&
                //            (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") && (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(_currentDate));
                //            visitFrequency = GetData("sp_DVisitsFrequency3Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" &&
                //            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(_currentDate));
                //            visitFrequency = GetData("sp_DVisitsFrequency3Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1")
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(_currentDate));
                //            visitFrequency = GetData("sp_DVisitsFrequency3Level3", _nvCollection);
                //        }

                //        #endregion
                //    }

                //    #endregion
                //}
                //else if (_currentRole == "rl4")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        if (ddlLevel1.SelectedValue == "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(_currentDate));
                //            visitFrequency = GetData("sp_DVisitsFrequency4Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(_currentDate));
                //            visitFrequency = GetData("sp_DVisitsFrequency4Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1")
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(_currentDate));
                //            visitFrequency = GetData("sp_DVisitsFrequency4Level3", _nvCollection);
                //        }

                //        #endregion
                //    }
                //    else if (_hierarchyName == "Level4")
                //    {

                //    }

                //    #endregion
                //}
                //else if (_currentRole == "rl5")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        if (ddlLevel1.SelectedValue == "-1")
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(_currentDate));
                //            visitFrequency = GetData("sp_DVisitsFrequency5Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1")
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(_currentDate));
                //            visitFrequency = GetData("sp_DVisitsFrequency5Level3", _nvCollection);
                //        }

                //        #endregion
                //    }
                //    else if (_hierarchyName == "Level4")
                //    {

                //    }
                //    else if (_hierarchyName == "Level5")
                //    {

                //    }

                //    #endregion
                //}
                //else if (_currentRole == "rl6")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //        _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //        _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //        _nvCollection.Add("@Level6Id-int", Convert.ToString(_currentLevelId));
                //        _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //        _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(_currentDate));
                //        visitFrequency = GetData("sp_DVisitsFrequency6Level3", _nvCollection);
                //    }
                //    else if (_hierarchyName == "Level4")
                //    {

                //    }
                //    else if (_hierarchyName == "Level5")
                //    {

                //    }
                //    else if (_hierarchyName == "Level6")
                //    {

                //    }

                //    #endregion
                //}

                #endregion

                _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(_currentDate));
                visitFrequency = GetData("crmdashboard_VisitFrequency", _nvCollection);

                #endregion

                #region Initializing Chart

                dataTable = visitFrequency.Tables[0];

                foreach (DataRow dataRow in dataTable.Rows)
                {
                    for (int i = 0; i < dataTable.Columns.Count; i++)
                    {
                        if (i == 0)
                            continue;
                        if (dataRow["Class"].ToString() == "A")
                        {
                            classA.Add(Convert.ToDouble(dataRow[i]));

                        }
                        else if (dataRow["Class"].ToString() == "B")
                        {
                            classB.Add(Convert.ToDouble(dataRow[i]));

                        }
                        else if (dataRow["Class"].ToString() == "C")
                        {
                            classC.Add(Convert.ToDouble(dataRow[i]));

                        }

                    }
                }

                string[] Label = { "4+", "3", "2", "1", "0" };
                double[] classa = (double[])classA.ToArray(typeof(double));
                double[] classb = (double[])classB.ToArray(typeof(double));
                double[] classc = (double[])classC.ToArray(typeof(double));

                #endregion

                #region Place Values in Bar Chart

                XYChart c = new XYChart(360, 280, 0xFFFFFF, 0xD8D0C9, 0);
                c.addTitle(8, "DOCTOR'S VISIT RANGE ANALYSIS", "News Gothic MT Bold", 10, 0xFFFFFFF, 0xA28F7F, 0xA28F7F);

                c.setPlotArea(50, 55, 300, 200);
                c.addLegend(55, 18, false, "", 8).setBackground(Chart.Transparent);

                DataTable dtNew = Transpose(dataTable);

                c.yAxis().setTopMargin(20);
                c.xAxis().setLabels(Label);

                BarLayer layer = c.addBarLayer2(Chart.Stack, 4);

                layer.addDataSet(classa, 0x634329, "Class A");
                layer.addDataSet(classb, 0xE44C16, "Class B");
                layer.addDataSet(classc, 0xFED300, "Class C");
                layer.set3D(0, 0);

                wcvVisitFrequency.Image = c.makeWebImage(Chart.PNG);
                wcvVisitFrequency.ImageMap = c.getHTMLImageMap("", "", "title='{dataSetName} {xLabel} Visits: {value}'");

                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from VisitFrequency is " + exception.Message;
            }
        }

        private DataTable Transpose(DataTable dt)
        {
            var newDataTable = new DataTable();

            for (int i = 0; i <= dt.Rows.Count; i++)
            {
                newDataTable.Columns.Add(i.ToString());
            }

            newDataTable.Columns[0].ColumnName = " ";

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                newDataTable.Columns[i + 1].ColumnName = dt.Rows[i].ItemArray[0].ToString();
            }

            for (int k = 1; k < dt.Columns.Count; k++)
            {
                DataRow r = newDataTable.NewRow();
                r[0] = dt.Columns[k].ToString();

                for (int j = 1; j <= dt.Rows.Count; j++)
                    r[j] = dt.Rows[j - 1][k];
                newDataTable.Rows.Add(r);
            }

            return newDataTable;
        }

        private void GenerateHtmlTable(string[] Labels, double[] MIOCount, double[] AvgCalls, double[] CorrectSMS)
        {
            //Ahmer
            for (int i = 0; i < Labels.Length; i++)
            {
                HtmlTableCell cell = new HtmlTableCell();
                cell.InnerText = ((CorrectSMS[i] == Chart.NoValue) ? "0" : CorrectSMS[i].ToString());

                cell.InnerText = Labels[i];
                cell.Style.Add("Color", "#fffff");
                cell.Style.Add("text-align", "Center");
                cell.BgColor = "#A28F7F"; //#2B4C61
                cell.Width = "27px";
                cell.Align = "left";
                tblCalls.Rows[0].Cells.Add(cell);

                HtmlTableCell cell2 = new HtmlTableCell();
                cell2.InnerText = ((CorrectSMS[i] == Chart.NoValue) ? "0" : CorrectSMS[i].ToString());
                cell2.Width = "27px";
                cell2.Align = "Center"; cell2.BgColor = "#fffff";
                cell2.Style.Add(System.Web.UI.HtmlTextWriterStyle.FontSize, "10 pt");
                cell2.Style.Add(System.Web.UI.HtmlTextWriterStyle.Color, "Black");
                tblCalls.Rows[1].Cells.Add(cell2);

                System.Web.UI.WebControls.LinkButton lbtn = new System.Web.UI.WebControls.LinkButton();
                lbtn.Text = ((CorrectSMS[i] == Chart.NoValue) ? "0" : CorrectSMS[i].ToString());
                tblCalls.Rows[1].Cells[i + 1].Controls.Clear();
                tblCalls.Rows[1].Cells[i + 1].Controls.Add(lbtn);
                if (CorrectSMS[i] == Chart.NoValue)
                    lbtn.Enabled = false;
                else
                {

                    #region Hierarchy To be attached
                    //#region Get Active Hierarchy Level

                    //List<DatabaseLayer.SQL.AppConfiguration> getLevelName =
                    //    _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

                    //#endregion

                    //if (getLevelName.Count != 0)
                    //{
                    //    hierarchyName = Convert.ToString(getLevelName[0].SettingName);
                    //    _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                    //    if (hierarchyName == "Level3")
                    //    {
                    //        #region Get Record Via Roles
                    //        if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
                    //        {
                    //            #region Employee Detail + Hierarchy Levels + Date

                    //            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                    //            {
                    //                _level3Id = 0;
                    //            }
                    //            else
                    //            {
                    //                _level3Id = Convert.ToInt32(ddl1.SelectedValue);
                    //            }


                    //            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                    //            {
                    //                _level4Id = 0;
                    //            }
                    //            else
                    //            {
                    //                _level4Id = Convert.ToInt32(ddl2.SelectedValue);
                    //            }

                    //            if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                    //            {
                    //                _level5Id = 0;
                    //            }
                    //            else
                    //            {
                    //                _level5Id = Convert.ToInt32(ddl3.SelectedValue);
                    //            }

                    //            if (ddl4.SelectedValue == "-1" || ddl4.SelectedValue == "")
                    //            {
                    //                _level6Id = 0;
                    //            }
                    //            else
                    //            {
                    //                _level6Id = Convert.ToInt32(ddl4.SelectedValue);
                    //            }

                    //            #endregion
                    //        }
                    //        else if (_currentUserRole == "rl3")
                    //        {
                    //            #region Employee Detail + Hierarchy Levels + Date

                    //            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                    //            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                    //            {
                    //                _level4Id = 0;
                    //            }
                    //            else
                    //            {
                    //                _level4Id = Convert.ToInt32(ddl1.SelectedValue);
                    //            }

                    //            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                    //            {
                    //                _level5Id = 0;
                    //            }
                    //            else
                    //            {
                    //                _level5Id = Convert.ToInt32(ddl2.SelectedValue);
                    //            }

                    //            if (ddl3.SelectedValue == "-1" || ddl3.SelectedValue == "")
                    //            {
                    //                _level6Id = 0;
                    //            }
                    //            else
                    //            {
                    //                _level6Id = Convert.ToInt32(ddl3.SelectedValue);
                    //            }

                    //            #endregion
                    //        }
                    //        else if (_currentUserRole == "rl4")
                    //        {
                    //            #region Employee Detail + Hierarchy Levels + Date

                    //            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));
                    //            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                    //            {
                    //                _level5Id = 0;
                    //            }
                    //            else
                    //            {
                    //                _level5Id = Convert.ToInt32(ddl1.SelectedValue);
                    //            }

                    //            if (ddl2.SelectedValue == "-1" || ddl2.SelectedValue == "")
                    //            {
                    //                _level6Id = 0;
                    //            }
                    //            else
                    //            {
                    //                _level6Id = Convert.ToInt32(ddl2.SelectedValue);
                    //            }

                    //            #endregion
                    //        }
                    //        else if (_currentUserRole == "rl5")
                    //        {
                    //            #region Employee Detail + Hierarchy Levels + Date

                    //            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));

                    //            if (ddl1.SelectedValue == "-1" || ddl1.SelectedValue == "")
                    //            {
                    //                _level6Id = 0;
                    //            }
                    //            else
                    //            {
                    //                _level6Id = Convert.ToInt32(ddl1.SelectedValue);
                    //            }

                    //            #endregion
                    //        }
                    //        else if (_currentUserRole == "rl6")
                    //        {
                    //            #region Employee Detail + Hierarchy Levels + Date

                    //            this.GetCurrentUserDetail(Convert.ToInt64(_currentUser.EmployeeId));

                    //            #endregion
                    //        }


                    //        #endregion
                    //    }
                    //}


                    #endregion



                    lbtn.OnClientClick = "return OpenPopup('" + Labels[i] + "','C','" + _level3Id + "','" + _level4Id + "','" + _level5Id + "','" + _level6Id + "','" + _employeeId + "');";
                }

                System.Web.UI.HtmlControls.HtmlTableCell cell3 = new System.Web.UI.HtmlControls.HtmlTableCell();
                cell3.InnerText = ((MIOCount[i] == Chart.NoValue) ? "0" : MIOCount[i].ToString());
                cell3.Width = "27px";
                cell3.Align = "Center";
                cell3.BgColor = "#fffff";
                cell3.Style.Add(System.Web.UI.HtmlTextWriterStyle.FontSize, "10 pt");
                cell3.Style.Add(System.Web.UI.HtmlTextWriterStyle.Color, "Black");
                tblCalls.Rows[2].Cells.Add(cell3);

                System.Web.UI.WebControls.LinkButton lbtn1 = new System.Web.UI.WebControls.LinkButton();
                lbtn1.Text = ((MIOCount[i] == Chart.NoValue || MIOCount[i] == 0) ? "0" : MIOCount[i].ToString());
                tblCalls.Rows[2].Cells[i + 1].Controls.Clear();
                tblCalls.Rows[2].Cells[i + 1].Controls.Add(lbtn1);
                if (MIOCount[i] == Chart.NoValue)
                    lbtn1.Enabled = false;
                else
                {
                    //lbtn.Attributes.Add("OnClick", "return OpenPopup('" + Labels[i] + "','C'");
                    lbtn1.OnClientClick = "return OpenPopup('" + Labels[i] + "','M','" + _level3Id + "','" + _level4Id + "','" + _level5Id + "','" + _level6Id + "','" + _employeeId + "');";
                }

                System.Web.UI.HtmlControls.HtmlTableCell cell4 = new System.Web.UI.HtmlControls.HtmlTableCell();
                cell4.InnerText = ((MIOCount[i] == Chart.NoValue) ? "0" : Math.Round((CorrectSMS[i] / MIOCount[i]), 0).ToString());
                cell4.Width = "27px";
                cell4.Align = "Center"; cell4.BgColor = "#fffff";
                cell4.Style.Add(System.Web.UI.HtmlTextWriterStyle.FontSize, "10 pt");
                cell4.Style.Add(System.Web.UI.HtmlTextWriterStyle.Color, "Black");
                tblCalls.Rows[3].Cells.Add(cell4);
            }
        }

        private void DailyCallTrend()
        {
            try
            {
                #region Initialize

                var dtCorrectSMS = new DataTable();
                var dailyCallTrend = new System.Data.DataSet();
                dailyCallTrend.Clear();
                var label = new ArrayList();
                var callReport = new ArrayList();
                var avgCall = new ArrayList();
                var kpi = new ArrayList();
                var arlCorrect = new ArrayList();
                var mioCount = new ArrayList();
                _nvCollection.Clear();
                int year = 0, month = 0, days = 0;
                DateTime currentDateTime;

                #endregion

                #region Set Year + Month

                if (txtDate.Text != "")
                {
                    year = _currentDate.Year;
                    month = _currentDate.Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }

                #endregion

                #region Generate Labels

                days = DateTime.DaysInMonth(year, month);

                for (int i = 1; i <= days; i++)
                {
                    label.Add(i.ToString());
                }

                #endregion

                #region Filter By Role

                #region Commented

                //if (_currentRole == "admin" || _currentRole == "headoffice")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        if (ddlLevel1.SelectedValue == "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") &&
                //            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            dailyCallTrend = GetData("sp_DailyCallTrend0Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") &&
                //            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            dailyCallTrend = GetData("sp_DailyCallTrend0Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" &&
                //            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            dailyCallTrend = GetData("sp_DailyCallTrend0Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1" &&
                //            (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            dailyCallTrend = GetData("sp_DailyCallTrend0Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1" && ddlLevel4.SelectedValue != "-1")
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            dailyCallTrend = GetData("sp_DailyCallTrend0Level3", _nvCollection);
                //        }

                //        #endregion
                //    }
                //    else if (_hierarchyName == "Level4")
                //    {

                //    }
                //    else if (_hierarchyName == "Level5")
                //    {

                //    }
                //    else if (_hierarchyName == "Level6")
                //    {

                //    }

                //    #endregion
                //}
                //else if (_currentRole == "rl1")
                //{

                //}
                //else if (_currentRole == "rl2")
                //{

                //}
                //else if (_currentRole == "rl3")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        if (ddlLevel1.SelectedValue == "-1" &&
                //            (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") && (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            dailyCallTrend = GetData("sp_DailyCallTrend3Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" &&
                //            (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") && (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            dailyCallTrend = GetData("sp_DailyCallTrend3Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" &&
                //            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            dailyCallTrend = GetData("sp_DailyCallTrend3Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1")
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            dailyCallTrend = GetData("sp_DailyCallTrend3Level3", _nvCollection);
                //        }

                //        #endregion
                //    }

                //    #endregion
                //}
                //else if (_currentRole == "rl4")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        if (ddlLevel1.SelectedValue == "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            dailyCallTrend = GetData("sp_DailyCallTrend4Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            dailyCallTrend = GetData("sp_DailyCallTrend4Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1")
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            dailyCallTrend = GetData("sp_DailyCallTrend4Level3", _nvCollection);
                //        }

                //        #endregion
                //    }
                //    else if (_hierarchyName == "Level4")
                //    {

                //    }

                //    #endregion
                //}
                //else if (_currentRole == "rl5")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        if (ddlLevel1.SelectedValue == "-1")
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            dailyCallTrend = GetData("sp_DailyCallTrend5Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1")
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            dailyCallTrend = GetData("sp_DailyCallTrend5Level3", _nvCollection);
                //        }

                //        #endregion
                //    }
                //    else if (_hierarchyName == "Level4")
                //    {

                //    }
                //    else if (_hierarchyName == "Level5")
                //    {

                //    }

                //    #endregion
                //}
                //else if (_currentRole == "rl6")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //        _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //        _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //        _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //        _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //        _nvCollection.Add("@Year-int", Convert.ToString(year));
                //        _nvCollection.Add("@Month-int", Convert.ToString(month));
                //        dailyCallTrend = GetData("sp_DailyCallTrend6Level3", _nvCollection);
                //    }
                //    else if (_hierarchyName == "Level4")
                //    {

                //    }
                //    else if (_hierarchyName == "Level5")
                //    {

                //    }
                //    else if (_hierarchyName == "Level6")
                //    {

                //    }

                //    #endregion
                //}

                #endregion

                _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                _nvCollection.Add("@Year-int", Convert.ToString(year));
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                dailyCallTrend = GetData("crmdashboard_DailyCallTrend", _nvCollection);

                #endregion

                #region Initialize + Place values in Chart

                dtCorrectSMS = dailyCallTrend.Tables[0];
                dtCorrectSMS.PrimaryKey = new DataColumn[] { dtCorrectSMS.Columns[0] };

                string[] labels = (string[])label.ToArray(typeof(string));
                double cor_sms = 0.0;

                foreach (string daay in labels)
                {
                    DataRow drCor = dtCorrectSMS.Rows.Find(daay);

                    if (drCor == null)
                    {
                        cor_sms = Chart.NoValue;
                        arlCorrect.Add(cor_sms);
                        mioCount.Add(Chart.NoValue);
                        avgCall.Add(cor_sms);
                        kpi.Add(cor_sms);
                    }
                    else
                    {
                        cor_sms = Convert.ToDouble(drCor["CorrectSMS"]);
                        arlCorrect.Add(cor_sms);
                        mioCount.Add(Convert.ToDouble(drCor["MIOs"]));
                        avgCall.Add(cor_sms / Convert.ToDouble(drCor["MIOs"]));
                        kpi.Add(13.0);
                    }
                }

                double[] CorrectSMS = (double[])arlCorrect.ToArray(typeof(double));
                double[] MIOCount = (double[])mioCount.ToArray(typeof(double));
                double[] AvgCalls = (double[])avgCall.ToArray(typeof(double));
                double[] KPI = (double[])kpi.ToArray(typeof(double));

                XYChart c = new XYChart(900, 300, 0xFFFFFF, 0xD8D0C9, 0);
                c.addTitle(8, "DAILY CALL TRENDS - AVERAGE CALLS PER DAY", "News Gothic MT Bold", 10, 0xFFFFFFF, 0xA28F7F, 0xA28F7F);
                c.setPlotArea(25, 55, 825, 220);
                c.xAxis().setLabels(labels);
                c.yAxis().setLinearScale(0.0, 30.0, 2.0);

                tblCalls.Width = "900px";

                for (int i = 0; i < labels.Length; i++)
                {
                    if (CorrectSMS[i] == Chart.NoValue)
                    {
                        c.xAxis().addZone(i, i + 1, 0xc0c0c0);
                    }
                }

                GenerateHtmlTable(labels, MIOCount, AvgCalls, CorrectSMS);


                LineLayer layer = c.addLineLayer();
                layer.setLineWidth(2);
                layer.addDataSet(KPI, 0xcf4040, "Target");
                layer.addDataSet(AvgCalls, 0xE44C16, "Avg. Calls Reported"); ;
                layer.getDataSet(1).setDataSymbol(Chart.DiamondSymbol);
                c.addLegend(50, 20, false, "Arial Bold", 10).setBackground(Chart.Transparent);
                wcvDailyCallTrends.Image = c.makeWebImage(Chart.PNG);
                wcvDailyCallTrends.ImageMap = c.getHTMLImageMap("", "",
                    "title='[{dataSetName}] {xLabel} " + month + " " + year + ": {value} Calls'");

                #endregion

            }
            catch (Exception exception)
            {
                lblError.Text = "Exception   is raised from DailyCallTrend is " + exception.Message;
            }
        }

        private void GetAverageCalls()
        {
            try
            {
                #region Initialize

                var avgCalls = new System.Data.DataSet();
                _nvCollection.Clear();
                avgCalls.Clear();
                int year = 0, month = 0;

                #endregion

                #region Set Year + Month

                if (txtDate.Text != "")
                {
                    year = _currentDate.Year;
                    month = _currentDate.Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }

                #endregion

                #region Filter By Role

                #region Commented Work

                //if (_currentRole == "admin" || _currentRole == "headoffice")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        if (ddlLevel1.SelectedValue == "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") &&
                //            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            avgCalls = GetData("sp_DAvgCalls0Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") &&
                //            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            avgCalls = GetData("sp_DAvgCalls0Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" &&
                //            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            avgCalls = GetData("sp_DAvgCalls0Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1" &&
                //            (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            avgCalls = GetData("sp_DAvgCalls0Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1" && ddlLevel4.SelectedValue != "-1")
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            avgCalls = GetData("sp_DAvgCalls0Level3", _nvCollection);
                //        }

                //        #endregion
                //    }
                //    else if (_hierarchyName == "Level4")
                //    {

                //    }
                //    else if (_hierarchyName == "Level5")
                //    {

                //    }
                //    else if (_hierarchyName == "Level6")
                //    {

                //    }

                //    #endregion
                //}
                //else if (_currentRole == "rl1")
                //{

                //}
                //else if (_currentRole == "rl2")
                //{

                //}
                //else if (_currentRole == "rl3")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        if (ddlLevel1.SelectedValue == "-1" &&
                //            (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") && (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            avgCalls = GetData("sp_DAvgCalls3Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" &&
                //            (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") && (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            avgCalls = GetData("sp_DAvgCalls3Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" &&
                //            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            avgCalls = GetData("sp_DAvgCalls3Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1")
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            avgCalls = GetData("sp_DAvgCalls3Level3", _nvCollection);
                //        }

                //        #endregion
                //    }

                //    #endregion
                //}
                //else if (_currentRole == "rl4")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        if (ddlLevel1.SelectedValue == "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            avgCalls = GetData("sp_DAvgCalls4Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            avgCalls = GetData("sp_DAvgCalls4Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1")
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            avgCalls = GetData("sp_DAvgCalls4Level3", _nvCollection);
                //        }

                //        #endregion
                //    }
                //    else if (_hierarchyName == "Level4")
                //    {

                //    }

                //    #endregion
                //}
                //else if (_currentRole == "rl5")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        if (ddlLevel1.SelectedValue == "-1")
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            avgCalls = GetData("sp_DAvgCalls5Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1")
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            avgCalls = GetData("sp_DAvgCalls5Level3", _nvCollection);
                //        }

                //        #endregion
                //    }
                //    else if (_hierarchyName == "Level4")
                //    {

                //    }
                //    else if (_hierarchyName == "Level5")
                //    {

                //    }

                //    #endregion
                //}
                //else if (_currentRole == "rl6")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //        _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //        _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //        _nvCollection.Add("@Level6Id-int", Convert.ToString(_currentLevelId));
                //        _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //        _nvCollection.Add("@Year-int", Convert.ToString(year));
                //        _nvCollection.Add("@Month-int", Convert.ToString(month));
                //        avgCalls = GetData("sp_DAvgCalls6Level3", _nvCollection);
                //    }
                //    else if (_hierarchyName == "Level4")
                //    {

                //    }
                //    else if (_hierarchyName == "Level5")
                //    {

                //    }
                //    else if (_hierarchyName == "Level6")
                //    {

                //    }

                //    #endregion
                //}

                #endregion

                _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                _nvCollection.Add("@Year-int", Convert.ToString(year));
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                avgCalls = GetData("crmdashboard_DAvgCalls", _nvCollection);


                #endregion

                #region Initializing and Place values in Race Meter

                if (avgCalls != null)
                {
                    if (avgCalls.Tables[0].Rows.Count != 0)
                    {
                        var result = Convert.ToString(avgCalls.Tables[0].Rows[0][0]);

                        if (result != "")
                        {
                            var value = Convert.ToDouble(result);
                            var angularMeter = new AngularMeter(200, 175);
                            angularMeter.setMeter(100, 100, 85, -135, 135);
                            angularMeter.setScale(0, 30, 3, 3, 1);
                            angularMeter.setLineWidth(0, 2, 1);
                            angularMeter.addZone(13, 30, 0x99ff99);
                            angularMeter.addZone(0, 13, 0xff3333);
                            angularMeter.addText(100, 135, "MTD Avg Calls", "Arial Bold", 8, Chart.TextColor, Chart.Center);
                            angularMeter.addText(100, 165, angularMeter.formatValue(value, "2"), "Arial", 8, 0xffffff, Chart.Center).setBackground(0x000000, 0x000000, -1);
                            angularMeter.addPointer(value, 0x40333399);
                            wcvAvgCall.Image = angularMeter.makeWebImage(Chart.PNG);
                        }
                    }
                    else
                    {
                        wcvAvgCall.Visible = false;
                    }
                }

                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from GetAverageCalls is " + exception.Message;
            }
        }

        private void TargetVsSale()
        {
            try
            {
                #region Initialize

                int year = 0, month = 0, day = 0, days = 0;
                _nvCollection.Clear();
                DateTime currentDateTime;

                #endregion

                #region Set Year + Month + Day

                if (txtDate.Text != "")
                {
                    currentDateTime = Convert.ToDateTime(_currentDate);
                    year = currentDateTime.Year;
                    month = currentDateTime.Month;
                    day = currentDateTime.Day;
                    days = DateTime.DaysInMonth(year, month);
                }
                else
                {
                    currentDateTime = DateTime.Now;
                    year = currentDateTime.Year;
                    month = currentDateTime.Month;
                    day = currentDateTime.Day;
                }

                #endregion

                #region Filter With Role



                #endregion

                #region Initializing and Place Chart values



                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from TargetVsSale is " + exception.Message;
            }
        }

        private void ProductSummary()
        {
            try
            {
                #region Initialize

                var dsProductDetailing = new System.Data.DataSet();
                var dsProductSampling = new System.Data.DataSet();
                var dtProductDetail = new DataTable();
                var dtProductSampling = new DataTable();
                DataRow drProductDetail, drProductSample;
                int year = 0, month = 0, day = 0, days = 0;
                _nvCollection.Clear();
                string P1, P2, P3, P4;
                DateTime currentDateTime;

                #endregion

                #region Set Year + Month + Day

                if (txtDate.Text != "")
                {
                    currentDateTime = Convert.ToDateTime(_currentDate);
                    year = currentDateTime.Year;
                    month = currentDateTime.Month;
                    day = currentDateTime.Day;
                    days = DateTime.DaysInMonth(year, month);
                }
                else
                {
                    currentDateTime = DateTime.Now;
                    year = currentDateTime.Year;
                    month = currentDateTime.Month;
                    day = currentDateTime.Day;
                }

                #endregion

                #region Filter By Role

                if (_currentRole == "admin" || _currentRole == "headoffice")
                {
                    #region Filter By Level

                    if (_hierarchyName == "Level1")
                    {

                    }
                    else if (_hierarchyName == "Level2")
                    {

                    }
                    else if (_hierarchyName == "Level3")
                    {
                        #region Filter With Hierarchy Levels

                        if (ddlLevel1.SelectedValue == "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") &&
                            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                        {
                            _nvCollection.Add("@Level3Id-int", Convert.ToString(0));
                            _nvCollection.Add("@Level4Id-int", Convert.ToString(0));
                            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                            _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(currentDateTime));
                            dsProductDetailing = GetData("sp_ProductDetailingReport0Level3", _nvCollection);
                            dsProductSampling = GetData("sp_ProductSamplingReport0Level3", _nvCollection);
                        }
                        else if (ddlLevel1.SelectedValue != "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") &&
                            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                        {
                            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                            _nvCollection.Add("@Level4Id-int", Convert.ToString(0));
                            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                            _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(currentDateTime));
                            dsProductDetailing = GetData("sp_ProductDetailingReport0Level3", _nvCollection);
                            dsProductSampling = GetData("sp_ProductSamplingReport0Level3", _nvCollection);
                        }
                        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" &&
                            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                        {
                            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                            _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(currentDateTime));
                            dsProductDetailing = GetData("sp_ProductDetailingReport0Level3", _nvCollection);
                            dsProductSampling = GetData("sp_ProductSamplingReport0Level3", _nvCollection);
                        }
                        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1" &&
                            (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                        {
                            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                            _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(currentDateTime));
                            dsProductDetailing = GetData("sp_ProductDetailingReport0Level3", _nvCollection);
                            dsProductSampling = GetData("sp_ProductSamplingReport0Level3", _nvCollection);
                        }
                        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1" && ddlLevel4.SelectedValue != "-1")
                        {
                            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                            _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(currentDateTime));
                            dsProductDetailing = GetData("sp_ProductDetailingReport0Level3", _nvCollection);
                            dsProductSampling = GetData("sp_ProductSamplingReport0Level3", _nvCollection);
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
                else if (_currentRole == "rl1")
                {

                }
                else if (_currentRole == "rl2")
                {

                }
                else if (_currentRole == "rl3")
                {
                    #region Filter By Level

                    if (_hierarchyName == "Level1")
                    {

                    }
                    else if (_hierarchyName == "Level2")
                    {

                    }
                    else if (_hierarchyName == "Level3")
                    {
                        #region Filter With Hierarchy Levels

                        if (ddlLevel1.SelectedValue == "-1" &&
                            (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") && (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1"))
                        {
                            _nvCollection.Add("@Level3Id-int", Convert.ToString(_currentLevelId));
                            _nvCollection.Add("@Level4Id-int", Convert.ToString(0));
                            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                            _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(currentDateTime));
                            dsProductDetailing = GetData("sp_ProductDetailingReport3Level3", _nvCollection);
                            dsProductSampling = GetData("sp_ProductSamplingReport3Level3", _nvCollection);
                        }
                        else if (ddlLevel1.SelectedValue != "-1" &&
                            (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") && (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1"))
                        {
                            _nvCollection.Add("@Level3Id-int", Convert.ToString(_currentLevelId));
                            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                            _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(currentDateTime));
                            dsProductDetailing = GetData("sp_ProductDetailingReport3Level3", _nvCollection);
                            dsProductSampling = GetData("sp_ProductSamplingReport3Level3", _nvCollection);
                        }
                        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" &&
                            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1"))
                        {
                            _nvCollection.Add("@Level3Id-int", Convert.ToString(_currentLevelId));
                            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                            _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(currentDateTime));
                            dsProductDetailing = GetData("sp_ProductDetailingReport3Level3", _nvCollection);
                            dsProductSampling = GetData("sp_ProductSamplingReport3Level3", _nvCollection);
                        }
                        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1")
                        {
                            _nvCollection.Add("@Level3Id-int", Convert.ToString(_currentLevelId));
                            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                            _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(currentDateTime));
                            dsProductDetailing = GetData("sp_ProductDetailingReport3Level3", _nvCollection);
                            dsProductSampling = GetData("sp_ProductSamplingReport3Level3", _nvCollection);
                        }

                        #endregion
                    }

                    #endregion
                }
                else if (_currentRole == "rl4")
                {
                    #region Filter By Level

                    if (_hierarchyName == "Level1")
                    {

                    }
                    else if (_hierarchyName == "Level2")
                    {

                    }
                    else if (_hierarchyName == "Level3")
                    {
                        #region Filter With Hierarchy Levels

                        if (ddlLevel1.SelectedValue == "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1"))
                        {
                            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                            _nvCollection.Add("@Level4Id-int", Convert.ToString(_currentLevelId));
                            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                            _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(currentDateTime));
                            dsProductDetailing = GetData("sp_ProductDetailingReport4Level3", _nvCollection);
                            dsProductSampling = GetData("sp_ProductSamplingReport4Level3", _nvCollection);
                        }
                        else if (ddlLevel1.SelectedValue != "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1"))
                        {
                            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                            _nvCollection.Add("@Level4Id-int", Convert.ToString(_currentLevelId));
                            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                            _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(currentDateTime));
                            dsProductDetailing = GetData("sp_ProductDetailingReport4Level3", _nvCollection);
                            dsProductSampling = GetData("sp_ProductSamplingReport4Level3", _nvCollection);
                        }
                        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1")
                        {
                            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                            _nvCollection.Add("@Level4Id-int", Convert.ToString(_currentLevelId));
                            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                            _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(currentDateTime));
                            dsProductDetailing = GetData("sp_ProductDetailingReport4Level3", _nvCollection);
                            dsProductSampling = GetData("sp_ProductSamplingReport4Level3", _nvCollection);
                        }

                        #endregion
                    }
                    else if (_hierarchyName == "Level4")
                    {

                    }

                    #endregion
                }
                else if (_currentRole == "rl5")
                {
                    #region Filter By Level

                    if (_hierarchyName == "Level1")
                    {

                    }
                    else if (_hierarchyName == "Level2")
                    {

                    }
                    else if (_hierarchyName == "Level3")
                    {
                        #region Filter With Hierarchy Levels

                        if (ddlLevel1.SelectedValue == "-1")
                        {
                            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                            _nvCollection.Add("@Level5Id-int", Convert.ToString(_currentLevelId));
                            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                            _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(currentDateTime));
                            dsProductDetailing = GetData("sp_ProductDetailingReport5Level3", _nvCollection);
                            dsProductSampling = GetData("sp_ProductSamplingReport5Level3", _nvCollection);
                        }
                        else if (ddlLevel1.SelectedValue != "-1")
                        {
                            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                            _nvCollection.Add("@Level5Id-int", Convert.ToString(_currentLevelId));
                            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                            _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(currentDateTime));
                            dsProductDetailing = GetData("sp_ProductDetailingReport5Level3", _nvCollection);
                            dsProductSampling = GetData("sp_ProductSamplingReport5Level3", _nvCollection);
                        }

                        #endregion
                    }
                    else if (_hierarchyName == "Level4")
                    {

                    }
                    else if (_hierarchyName == "Level5")
                    {

                    }

                    #endregion
                }
                else if (_currentRole == "rl6")
                {
                    #region Filter By Level

                    if (_hierarchyName == "Level1")
                    {

                    }
                    else if (_hierarchyName == "Level2")
                    {

                    }
                    else if (_hierarchyName == "Level3")
                    {
                        _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                        _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                        _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                        _nvCollection.Add("@Level6Id-int", Convert.ToString(_currentLevelId));
                        _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                        _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(currentDateTime));
                        dsProductDetailing = GetData("sp_ProductDetailingReport6Level3", _nvCollection);
                        dsProductSampling = GetData("sp_ProductSamplingReport6Level3", _nvCollection);
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

                #endregion

                #region Initializing and Place Chart values

                P1 = dsProductDetailing.Tables[0].Rows[0][0].ToString();
                P2 = dsProductDetailing.Tables[0].Rows[1][0].ToString();
                P3 = dsProductDetailing.Tables[0].Rows[2][0].ToString();
                P4 = dsProductDetailing.Tables[0].Rows[3][0].ToString();

                dtProductDetail = dsProductDetailing.Tables[0];
                dtProductSampling = dsProductSampling.Tables[0];

                dtProductDetail.PrimaryKey = new DataColumn[] { dtProductDetail.Columns[0] };
                dtProductSampling.PrimaryKey = new DataColumn[] { dtProductSampling.Columns[0] };

                drProductDetail = dtProductDetail.Rows.Find("Benefiber");
                drProductSample = dtProductSampling.Rows.Find("Benefiber");

                if (P1.Contains("Benefiber"))
                    lblP1.Text = P1;

                if (P2.Contains("Benefiber"))
                    lblP1.Text = P2;

                if (P3.Contains("Benefiber"))
                    lblP1.Text = P3;

                if (P4.Contains("Benefiber"))
                    lblP1.Text = P4;

                lblBFMTDCalls.Text = String.Format("{0:N0}", Convert.ToInt32(drProductDetail["MTD"].ToString()));
                lblBFTodayCalls.Text = String.Format("{0:N0}", Convert.ToInt32(drProductDetail["Today"].ToString()));
                lblBFMTDSamples.Text = String.Format("{0:N0}", Convert.ToInt32(drProductSample["MTD"].ToString()));
                lblBFTodaySamples.Text = String.Format("{0:N0}", Convert.ToInt32(drProductSample["Today"].ToString()));

                drProductDetail = dtProductDetail.Rows.Find("CaC 1000 Plus");
                drProductSample = dtProductSampling.Rows.Find("CaC 1000 Plus");

                if (P1.Contains("CaC 1000 Plus"))
                    lblP2.Text = P1;

                if (P2.Contains("CaC 1000 Plus"))
                    lblP2.Text = P2;

                if (P3.Contains("CaC 1000 Plus"))
                    lblP2.Text = P3;

                if (P4.Contains("CaC 1000 Plus"))
                    lblP2.Text = P4;

                lblCacMTDCalls.Text = String.Format("{0:N0}", Convert.ToInt32(drProductDetail["MTD"].ToString()));
                lblCacTodayCalls.Text = String.Format("{0:N0}", Convert.ToInt32(drProductDetail["Today"].ToString()));
                lblCacMTDSamples.Text = String.Format("{0:N0}", Convert.ToInt32(drProductSample["MTD"].ToString()));
                lblCacTodaySamples.Text = String.Format("{0:N0}", Convert.ToInt32(drProductSample["Today"].ToString()));

                drProductDetail = dtProductDetail.Rows.Find("T Day");
                drProductSample = dtProductSampling.Rows.Find("T Day");

                if (P1.Contains("T Day"))
                    lblP3.Text = P1;

                if (P2.Contains("T Day"))
                    lblP3.Text = P2;

                if (P3.Contains("T Day"))
                    lblP3.Text = P3;

                if (P4.Contains("T Day"))
                    lblP3.Text = P4;

                lblTdMTDCalls.Text = String.Format("{0:N0}", Convert.ToInt32(drProductDetail["MTD"].ToString()));
                lblTdTodayCalls.Text = String.Format("{0:N0}", Convert.ToInt32(drProductDetail["Today"].ToString()));
                lblTdMTDSamples.Text = String.Format("{0:N0}", Convert.ToInt32(drProductSample["MTD"].ToString()));
                lblTdTodaySamples.Text = String.Format("{0:N0}", Convert.ToInt32(drProductSample["Today"].ToString()));

                drProductDetail = dtProductDetail.Rows.Find("Voltral EMG");
                drProductSample = dtProductSampling.Rows.Find("Voltral EMG");

                if (P1.Contains("Voltral EMG"))
                    lblP4.Text = P1;

                if (P2.Contains("Voltral EMG"))
                    lblP4.Text = P2;

                if (P3.Contains("Voltral EMG"))
                    lblP4.Text = P3;

                if (P4.Contains("Voltral EMG"))
                    lblP4.Text = P4;

                lblVtMTDCalls.Text = String.Format("{0:N0}", Convert.ToInt32(drProductDetail["MTD"].ToString()));
                lblVtTodayCalls.Text = String.Format("{0:N0}", Convert.ToInt32(drProductDetail["Today"].ToString()));
                lblVtMTDSamples.Text = String.Format("{0:N0}", Convert.ToInt32(drProductSample["MTD"].ToString()));
                lblVtTodaySamples.Text = String.Format("{0:N0}", Convert.ToInt32(drProductSample["Today"].ToString()));

                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from ProductSummary is " + exception.Message;
            }
        }

        private void JointVisitStats()
        {
            try
            {
                #region Initialize

                var top3JointVisitor = new System.Data.DataSet();
                var jointVisitStats = new System.Data.DataSet();
                var dataTable = new DataTable();
                _nvCollection.Clear();
                jointVisitStats.Clear();
                int year = 0, month = 0;
                string jvName = "";

                #endregion

                #region Set Year + Month

                if (txtDate.Text != "")
                {
                    year = _currentDate.Year;
                    month = _currentDate.Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }

                #endregion

                #region Filter By Role

                #region Commented

                //if (_currentRole == "admin" || _currentRole == "headoffice")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1" && ddlLevel4.SelectedValue != "-1")
                //        {
                //            #region Get Top 3 Joint Visitors

                //            _nvCollection.Clear();
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(_currentDate));
                //            top3JointVisitor = GetData("sp_DTop3JointVisitors", _nvCollection);

                //            #endregion

                //            #region Get Joint Visitor Stats

                //            _nvCollection.Clear();
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@TimeStamp-datetime", Convert.ToString(_currentDate));
                //            jointVisitStats = GetData("sp_DJointVisitStats", _nvCollection);

                //            #endregion
                //        }

                //        #endregion
                //    }

                //    #endregion
                //}
                //else if (_currentRole == "rl3")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1")
                //        {
                //            #region Get Top 3 Joint Visitors

                //            _nvCollection.Clear();
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(_currentDate));
                //            top3JointVisitor = GetData("sp_DTop3JointVisitors", _nvCollection);

                //            #endregion

                //            #region Get Joint Visitor Stats

                //            _nvCollection.Clear();
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@TimeStamp-datetime", Convert.ToString(_currentDate));
                //            jointVisitStats = GetData("sp_DJointVisitStats", _nvCollection);

                //            #endregion
                //        }

                //        #endregion
                //    }

                //    #endregion
                //}
                //else if (_currentRole == "rl4")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1")
                //        {
                //            #region Get Top 3 Joint Visitors

                //            _nvCollection.Clear();
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(_currentDate));
                //            top3JointVisitor = GetData("sp_DTop3JointVisitors", _nvCollection);

                //            #endregion

                //            #region Get Joint Visitor Stats

                //            _nvCollection.Clear();
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@TimeStamp-datetime", Convert.ToString(_currentDate));
                //            jointVisitStats = GetData("sp_DJointVisitStats", _nvCollection);

                //            #endregion
                //        }

                //        #endregion
                //    }
                //    else if (_hierarchyName == "Level4")
                //    {

                //    }

                //    #endregion
                //}
                //else if (_currentRole == "rl5")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        if (ddlLevel1.SelectedValue != "-1")
                //        {
                //            #region Get Top 3 Joint Visitors

                //            _nvCollection.Clear();
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(_currentDate));
                //            top3JointVisitor = GetData("sp_DTop3JointVisitors", _nvCollection);

                //            #endregion

                //            #region Get Joint Visitor Stats

                //            _nvCollection.Clear();
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@TimeStamp-datetime", Convert.ToString(_currentDate));
                //            jointVisitStats = GetData("sp_DJointVisitStats", _nvCollection);

                //            #endregion
                //        }

                //        #endregion
                //    }
                //    else if (_hierarchyName == "Level4")
                //    {

                //    }
                //    else if (_hierarchyName == "Level5")
                //    {

                //    }

                //    #endregion
                //}
                //else if (_currentRole == "rl6")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        #region Get Top 3 Joint Visitors

                //        _nvCollection.Clear();
                //        _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //        _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //        _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //        _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //        _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //        _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(_currentDate));
                //        top3JointVisitor = GetData("sp_DTop3JointVisitors", _nvCollection);

                //        #endregion

                //        #region Get Joint Visitor Stats

                //        _nvCollection.Clear();
                //        _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //        _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //        _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //        _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //        _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //        _nvCollection.Add("@TimeStamp-datetime", Convert.ToString(_currentDate));
                //        jointVisitStats = GetData("sp_DJointVisitStats", _nvCollection);

                //        #endregion
                //    }
                //    else if (_hierarchyName == "Level4")
                //    {

                //    }
                //    else if (_hierarchyName == "Level5")
                //    {

                //    }
                //    else if (_hierarchyName == "Level6")
                //    {

                //    }

                //    #endregion
                //}

                #endregion

                #region Get Top 3 Joint Visitors

                _nvCollection.Clear();
                _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                _nvCollection.Add("@TiemStamp-datetime", Convert.ToString(_currentDate));
                top3JointVisitor = GetData("crmdashboard_DTop3JointVisitors", _nvCollection);

                #endregion

                #region Get Joint Visitor Stats

                _nvCollection.Clear();
                _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                _nvCollection.Add("@TimeStamp-datetime", Convert.ToString(_currentDate));
                jointVisitStats = GetData("crmdashboard_DJointVisitStats", _nvCollection);

                #endregion

                #endregion

                #region Initialize and Place values in Chart

                if (jointVisitStats != null)
                {
                    dataTable = jointVisitStats.Tables[0];

                    if (dataTable.Rows.Count > 0)
                    {
                        dataTable.PrimaryKey = new DataColumn[] { dataTable.Columns[0], dataTable.Columns[1], dataTable.Columns[2] };

                        if (top3JointVisitor != null)
                        {
                            for (int i = 0; i < top3JointVisitor.Tables[0].Rows.Count; i++)
                            {
                                jvName = top3JointVisitor.Tables[0].Rows[i]["JointVisitor"].ToString();

                                #region Class A

                                #region Morning

                                string[] keys = { jvName, "A", "M" };

                                DataRow[] getDataTable = dataTable.Select("Class = 'A'");

                                if (getDataTable.Count() != 0)
                                {
                                    if (getDataTable != null)
                                    {
                                        foreach (var itemn in getDataTable)
                                        {
                                            if (itemn["Division"].ToString().Contains("(") && itemn["Division"].ToString().Contains(")"))
                                            {
                                                lblRegion1.Text =
                                                    itemn["Division"].ToString().Remove(0, itemn["Division"].ToString().IndexOf("(") + 1).Replace(")", "").Trim();
                                            }
                                            else
                                            {
                                                lblRegion1.Text = itemn["Division"].ToString();
                                            }

                                            lblAMorMtdReg1.Text = itemn["MTD"].ToString();
                                            lblAMorTdReg1.Text = itemn["TD"].ToString();
                                        }
                                    }
                                }

                                #endregion

                                #region Evening

                                keys.SetValue(jvName, 0);
                                keys.SetValue("A", 1);
                                keys.SetValue("E", 2);
                                getDataTable = dataTable.Select("Class = 'A'");

                                if (getDataTable.Count() != 0)
                                {
                                    if (getDataTable != null)
                                    {
                                        foreach (var itemn in getDataTable)
                                        {
                                            if (itemn["Division"].ToString().Contains("(") && itemn["Division"].ToString().Contains(")"))
                                            {
                                                lblRegion1.Text = itemn["Division"].ToString().Remove(0, itemn["Division"].ToString().IndexOf("(") + 1).Replace(")", "").Trim();
                                            }
                                            else
                                            {
                                                lblRegion1.Text = itemn["Division"].ToString();
                                            }

                                            lblAEveMtdReg1.Text = itemn["MTD"].ToString();
                                            lblAEveTdReg1.Text = itemn["TD"].ToString();
                                        }
                                    }
                                }

                                #endregion

                                #endregion

                                #region Class B

                                #region Morning

                                keys.SetValue(jvName, 0);
                                keys.SetValue("B", 1);
                                keys.SetValue("M", 2);
                                getDataTable = dataTable.Select("Class = 'B'");

                                if (getDataTable.Count() != 0)
                                {
                                    if (getDataTable != null)
                                    {
                                        foreach (var itemn in getDataTable)
                                        {
                                            if (itemn["Division"].ToString().Contains("(") && itemn["Division"].ToString().Contains(")"))
                                            {
                                                lblRegion1.Text = itemn["Division"].ToString().Remove(0, itemn["Division"].ToString().IndexOf("(") + 1).Replace(")", "").Trim();
                                            }
                                            else
                                            {
                                                lblRegion1.Text = itemn["Division"].ToString();
                                            }

                                            lblBMorMtdReg1.Text = itemn["MTD"].ToString();
                                            lblBMorTdReg1.Text = itemn["TD"].ToString();
                                        }
                                    }
                                }

                                #endregion

                                #region Evening

                                keys.SetValue(jvName, 0);
                                keys.SetValue("B", 1);
                                keys.SetValue("E", 2);

                                getDataTable = dataTable.Select("Class = 'B'");

                                if (getDataTable.Count() != 0)
                                {
                                    if (getDataTable != null)
                                    {
                                        foreach (var itemn in getDataTable)
                                        {
                                            if (itemn["Division"].ToString().Contains("(") && itemn["Division"].ToString().Contains(")"))
                                            {
                                                lblRegion1.Text = itemn["Division"].ToString().Remove(0, itemn["Division"].ToString().IndexOf("(") + 1).Replace(")", "").Trim();
                                            }
                                            else
                                            {
                                                lblRegion1.Text = itemn["Division"].ToString();
                                            }

                                            lblBEveMtdReg1.Text = itemn["MTD"].ToString();
                                            lblBEveTdReg1.Text = itemn["TD"].ToString();
                                        }
                                    }
                                }

                                #endregion

                                #endregion

                                #region Class C

                                #region Morning

                                keys.SetValue(jvName, 0);
                                keys.SetValue("C", 1);
                                keys.SetValue("M", 2);
                                getDataTable = dataTable.Select("Class = 'C'");

                                if (getDataTable.Count() != 0)
                                {
                                    if (getDataTable != null)
                                    {
                                        foreach (var itemn in getDataTable)
                                        {
                                            if (itemn["Division"].ToString().Contains("(") && itemn["Division"].ToString().Contains(")"))
                                            {
                                                lblRegion1.Text = itemn["Division"].ToString().Remove(0, itemn["Division"].ToString().IndexOf("(") + 1).Replace(")", "").Trim();
                                            }
                                            else
                                            {
                                                lblRegion1.Text = itemn["Division"].ToString();
                                            }

                                            lblCMorMtdReg1.Text = itemn["MTD"].ToString();
                                            lblCMorTdReg1.Text = itemn["TD"].ToString();
                                        }
                                    }
                                }

                                #endregion

                                #region Evening

                                keys.SetValue(jvName, 0);
                                keys.SetValue("C", 1);
                                keys.SetValue("E", 2);
                                getDataTable = dataTable.Select("Class = 'C'");

                                if (getDataTable.Count() != 0)
                                {
                                    if (getDataTable != null)
                                    {
                                        foreach (var itemn in getDataTable)
                                        {
                                            if (itemn["Division"].ToString().Contains("(") && itemn["Division"].ToString().Contains(")"))
                                            {
                                                lblRegion1.Text = itemn["Division"].ToString().Remove(0, itemn["Division"].ToString().IndexOf("(") + 1).Replace(")", "").Trim();
                                            }
                                            else
                                            {
                                                lblRegion1.Text = itemn["Division"].ToString();
                                            }

                                            lblCEveMtdReg1.Text = itemn["MTD"].ToString();
                                            lblCEveTdReg1.Text = itemn["TD"].ToString();
                                        }
                                    }
                                }

                                #endregion

                                #endregion
                            }
                        }
                    }
                }

                #endregion
            }
            catch (Exception exception)
            {
                if (exception.Message == "Cannot find table 0.")
                {
                    lblError.Text = "";
                }
                else
                {
                    lblError.Text = "Exception is raised from JointVisitStats is " + exception.Message;
                }
            }
        }

        private void Top5Bottom5Mr()
        {
            try
            {
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                if (_currentUserRole != "rl6")
                {
                    #region Initialize

                    var top5MR = new System.Data.DataSet();
                    var bottom5MR = new System.Data.DataSet();
                    _nvCollection.Clear();
                    top5MR.Clear();
                    bottom5MR.Clear();
                    int year = 0, month = 0;

                    #endregion

                    #region Set Year + Month

                    if (txtDate.Text != "")
                    {
                        year = _currentDate.Year;
                        month = _currentDate.Month;
                    }
                    else
                    {
                        year = DateTime.Now.Year;
                        month = DateTime.Now.Month;
                    }

                    #endregion

                    #region Filter By Role

                    #region Commented

                    //if (_currentRole == "admin" || _currentRole == "headoffice")
                    //{
                    //    #region Filter By Level

                    //    if (_hierarchyName == "Level1")
                    //    {

                    //    }
                    //    else if (_hierarchyName == "Level2")
                    //    {

                    //    }
                    //    else if (_hierarchyName == "Level3")
                    //    {
                    //        #region Filter With Hierarchy Levels

                    //        if (ddlLevel1.SelectedValue == "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") &&
                    //            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                    //        {
                    //            #region Setting Up Parameters

                    //            _nvCollection.Add("@LevelName-NVARCHAR(100)", _hierarchyName);
                    //            _nvCollection.Add("@Level1Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level2Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level3Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level4Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                    //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                    //            _nvCollection.Add("@Month-int", Convert.ToString(month));

                    //            #endregion

                    //            #region Get Top 5 & Bottom 5 MR

                    //            top5MR = GetData("sp_DTop5MR", _nvCollection);
                    //            bottom5MR = GetData("sp_DBottom5MR", _nvCollection);

                    //            #endregion
                    //        }
                    //        else if (ddlLevel1.SelectedValue != "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") &&
                    //            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                    //        {
                    //            #region Setting Up Parameters

                    //            _nvCollection.Add("@LevelName-NVARCHAR(100)", _hierarchyName);
                    //            _nvCollection.Add("@Level1Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level2Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                    //            _nvCollection.Add("@Level4Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                    //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                    //            _nvCollection.Add("@Month-int", Convert.ToString(month));

                    //            #endregion

                    //            #region Get Top 5 & Bottom 5 MR

                    //            top5MR = GetData("sp_DTop5MR", _nvCollection);
                    //            bottom5MR = GetData("sp_DBottom5MR", _nvCollection);

                    //            #endregion
                    //        }
                    //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" &&
                    //            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                    //        {
                    //            #region Setting Up Parameters

                    //            _nvCollection.Add("@LevelName-NVARCHAR(100)", _hierarchyName);
                    //            _nvCollection.Add("@Level1Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level2Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                    //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                    //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                    //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                    //            _nvCollection.Add("@Month-int", Convert.ToString(month));

                    //            #endregion

                    //            #region Get Top 5 & Bottom 5 MR

                    //            top5MR = GetData("sp_DTop5MR", _nvCollection);
                    //            bottom5MR = GetData("sp_DBottom5MR", _nvCollection);

                    //            #endregion
                    //        }
                    //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1" &&
                    //            (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                    //        {
                    //            #region Setting Up Parameters

                    //            _nvCollection.Add("@LevelName-NVARCHAR(100)", _hierarchyName);
                    //            _nvCollection.Add("@Level1Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level2Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                    //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                    //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                    //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                    //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                    //            _nvCollection.Add("@Month-int", Convert.ToString(month));

                    //            #endregion

                    //            #region Get Top 5 & Bottom 5 MR

                    //            top5MR = GetData("sp_DTop5MR", _nvCollection);
                    //            bottom5MR = GetData("sp_DBottom5MR", _nvCollection);

                    //            #endregion
                    //        }
                    //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1" && ddlLevel4.SelectedValue != "-1")
                    //        {
                    //            #region Setting Up Parameters

                    //            _nvCollection.Add("@LevelName-NVARCHAR(100)", _hierarchyName);
                    //            _nvCollection.Add("@Level1Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level2Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                    //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                    //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                    //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                    //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                    //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                    //            _nvCollection.Add("@Month-int", Convert.ToString(month));

                    //            #endregion

                    //            #region Get Top 5 & Bottom 5 MR

                    //            top5MR = GetData("sp_DTop5MR", _nvCollection);
                    //            bottom5MR = GetData("sp_DBottom5MR", _nvCollection);

                    //            #endregion
                    //        }

                    //        #endregion
                    //    }
                    //    else if (_hierarchyName == "Level4")
                    //    {

                    //    }
                    //    else if (_hierarchyName == "Level5")
                    //    {

                    //    }
                    //    else if (_hierarchyName == "Level6")
                    //    {

                    //    }

                    //    #endregion
                    //}
                    //else if (_currentRole == "rl1")
                    //{

                    //}
                    //else if (_currentRole == "rl2")
                    //{

                    //}
                    //else if (_currentRole == "rl3")
                    //{
                    //    #region Filter By Level

                    //    if (_hierarchyName == "Level1")
                    //    {

                    //    }
                    //    else if (_hierarchyName == "Level2")
                    //    {

                    //    }
                    //    else if (_hierarchyName == "Level3")
                    //    {
                    //        #region Filter With Hierarchy Levels

                    //        if (ddlLevel1.SelectedValue == "-1" &&
                    //            (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") && (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1"))
                    //        {
                    //            #region Setting Up Parameters

                    //            _nvCollection.Add("@LevelName-NVARCHAR(100)", _hierarchyName);
                    //            _nvCollection.Add("@Level1Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level2Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                    //            _nvCollection.Add("@Level4Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                    //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                    //            _nvCollection.Add("@Month-int", Convert.ToString(month));

                    //            #endregion

                    //            #region Get Top 5 & Bottom 5 MR

                    //            top5MR = GetData("sp_DTop5MR", _nvCollection);
                    //            bottom5MR = GetData("sp_DBottom5MR", _nvCollection);

                    //            #endregion
                    //        }
                    //        else if (ddlLevel1.SelectedValue != "-1" &&
                    //            (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") && (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1"))
                    //        {
                    //            #region Setting Up Parameters

                    //            _nvCollection.Add("@LevelName-NVARCHAR(100)", _hierarchyName);
                    //            _nvCollection.Add("@Level1Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level2Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                    //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                    //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                    //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                    //            _nvCollection.Add("@Month-int", Convert.ToString(month));

                    //            #endregion

                    //            #region Get Top 5 & Bottom 5 MR

                    //            top5MR = GetData("sp_DTop5MR", _nvCollection);
                    //            bottom5MR = GetData("sp_DBottom5MR", _nvCollection);

                    //            #endregion
                    //        }
                    //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" &&
                    //            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1"))
                    //        {
                    //            #region Setting Up Parameters

                    //            _nvCollection.Add("@LevelName-NVARCHAR(100)", _hierarchyName);
                    //            _nvCollection.Add("@Level1Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level2Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                    //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                    //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                    //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                    //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                    //            _nvCollection.Add("@Month-int", Convert.ToString(month));

                    //            #endregion

                    //            #region Get Top 5 & Bottom 5 MR

                    //            top5MR = GetData("sp_DTop5MR", _nvCollection);
                    //            bottom5MR = GetData("sp_DBottom5MR", _nvCollection);

                    //            #endregion
                    //        }
                    //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1")
                    //        {
                    //            #region Setting Up Parameters

                    //            _nvCollection.Add("@LevelName-NVARCHAR(100)", _hierarchyName);
                    //            _nvCollection.Add("@Level1Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level2Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                    //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                    //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                    //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                    //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                    //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                    //            _nvCollection.Add("@Month-int", Convert.ToString(month));

                    //            #endregion

                    //            #region Get Top 5 & Bottom 5 MR

                    //            top5MR = GetData("sp_DTop5MR", _nvCollection);
                    //            bottom5MR = GetData("sp_DBottom5MR", _nvCollection);

                    //            #endregion
                    //        }

                    //        #endregion
                    //    }

                    //    #endregion
                    //}
                    //else if (_currentRole == "rl4")
                    //{
                    //    #region Filter By Level

                    //    if (_hierarchyName == "Level1")
                    //    {

                    //    }
                    //    else if (_hierarchyName == "Level2")
                    //    {

                    //    }
                    //    else if (_hierarchyName == "Level3")
                    //    {
                    //        #region Filter With Hierarchy Levels

                    //        if (ddlLevel1.SelectedValue == "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1"))
                    //        {
                    //            #region Setting Up Parameters

                    //            _nvCollection.Add("@LevelName-NVARCHAR(100)", _hierarchyName);
                    //            _nvCollection.Add("@Level1Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level2Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                    //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                    //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                    //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                    //            _nvCollection.Add("@Month-int", Convert.ToString(month));

                    //            #endregion

                    //            #region Get Top 5 & Bottom 5 MR

                    //            top5MR = GetData("sp_DTop5MR", _nvCollection);
                    //            bottom5MR = GetData("sp_DBottom5MR", _nvCollection);

                    //            #endregion
                    //        }
                    //        else if (ddlLevel1.SelectedValue != "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1"))
                    //        {
                    //            #region Setting Up Parameters

                    //            _nvCollection.Add("@LevelName-NVARCHAR(100)", _hierarchyName);
                    //            _nvCollection.Add("@Level1Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level2Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                    //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                    //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                    //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                    //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                    //            _nvCollection.Add("@Month-int", Convert.ToString(month));

                    //            #endregion

                    //            #region Get Top 5 & Bottom 5 MR

                    //            top5MR = GetData("sp_DTop5MR", _nvCollection);
                    //            bottom5MR = GetData("sp_DBottom5MR", _nvCollection);

                    //            #endregion
                    //        }
                    //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1")
                    //        {
                    //            #region Setting Up Parameters

                    //            _nvCollection.Add("@LevelName-NVARCHAR(100)", _hierarchyName);
                    //            _nvCollection.Add("@Level1Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level2Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                    //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                    //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                    //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                    //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                    //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                    //            _nvCollection.Add("@Month-int", Convert.ToString(month));

                    //            #endregion

                    //            #region Get Top 5 & Bottom 5 MR

                    //            top5MR = GetData("sp_DTop5MR", _nvCollection);
                    //            bottom5MR = GetData("sp_DBottom5MR", _nvCollection);

                    //            #endregion
                    //        }

                    //        #endregion
                    //    }
                    //    else if (_hierarchyName == "Level4")
                    //    {

                    //    }

                    //    #endregion
                    //}
                    //else if (_currentRole == "rl5")
                    //{
                    //    #region Filter By Level

                    //    if (_hierarchyName == "Level1")
                    //    {

                    //    }
                    //    else if (_hierarchyName == "Level2")
                    //    {

                    //    }
                    //    else if (_hierarchyName == "Level3")
                    //    {
                    //        #region Filter With Hierarchy Levels

                    //        if (ddlLevel1.SelectedValue == "-1")
                    //        {
                    //            #region Setting Up Parameters

                    //            _nvCollection.Add("@LevelName-NVARCHAR(100)", _hierarchyName);
                    //            _nvCollection.Add("@Level1Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level2Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                    //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                    //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                    //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                    //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                    //            _nvCollection.Add("@Month-int", Convert.ToString(month));

                    //            #endregion

                    //            #region Get Top 5 & Bottom 5 MR

                    //            top5MR = GetData("sp_DTop5MR", _nvCollection);
                    //            bottom5MR = GetData("sp_DBottom5MR", _nvCollection);

                    //            #endregion
                    //        }
                    //        else if (ddlLevel1.SelectedValue != "-1")
                    //        {
                    //            #region Setting Up Parameters

                    //            _nvCollection.Add("@LevelName-NVARCHAR(100)", _hierarchyName);
                    //            _nvCollection.Add("@Level1Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level2Id-int", Convert.ToString(0));
                    //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                    //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                    //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                    //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                    //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                    //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                    //            _nvCollection.Add("@Month-int", Convert.ToString(month));

                    //            #endregion

                    //            #region Get Top 5 & Bottom 5 MR

                    //            top5MR = GetData("sp_DTop5MR", _nvCollection);
                    //            bottom5MR = GetData("sp_DBottom5MR", _nvCollection);

                    //            #endregion
                    //        }

                    //        #endregion
                    //    }
                    //    else if (_hierarchyName == "Level4")
                    //    {

                    //    }
                    //    else if (_hierarchyName == "Level5")
                    //    {

                    //    }

                    //    #endregion
                    //}
                    //else if (_currentRole == "rl6")
                    //{
                    //    #region Filter By Level

                    //    if (_hierarchyName == "Level1")
                    //    {

                    //    }
                    //    else if (_hierarchyName == "Level2")
                    //    {

                    //    }
                    //    else if (_hierarchyName == "Level3")
                    //    {
                    //        #region Setting Up Parameters

                    //        _nvCollection.Add("@LevelName-NVARCHAR(100)", _hierarchyName);
                    //        _nvCollection.Add("@Level1Id-int", Convert.ToString(0));
                    //        _nvCollection.Add("@Level2Id-int", Convert.ToString(0));
                    //        _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                    //        _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                    //        _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                    //        _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                    //        _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                    //        _nvCollection.Add("@Year-int", Convert.ToString(year));
                    //        _nvCollection.Add("@Month-int", Convert.ToString(month));

                    //        #endregion

                    //        #region Get Top 5 & Bottom 5 MR

                    //        top5MR = GetData("sp_DTop5MR", _nvCollection);
                    //        bottom5MR = GetData("sp_DBottom5MR", _nvCollection);

                    //        #endregion
                    //    }
                    //    else if (_hierarchyName == "Level4")
                    //    {

                    //    }
                    //    else if (_hierarchyName == "Level5")
                    //    {

                    //    }
                    //    else if (_hierarchyName == "Level6")
                    //    {

                    //    }

                    //    #endregion
                    //}

                    #endregion

                    #region Setting Up Parameters

                    _nvCollection.Add("@LevelName-NVARCHAR(100)", _hierarchyName);
                    _nvCollection.Add("@Level1Id-int", Convert.ToString(0));
                    _nvCollection.Add("@Level2Id-int", Convert.ToString(0));
                    _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                    _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                    _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                    _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                    _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                    _nvCollection.Add("@Year-int", Convert.ToString(year));
                    _nvCollection.Add("@Month-int", Convert.ToString(month));

                    #endregion

                    #region Get Top 5 & Bottom 5 MR

                    top5MR = GetData("sp_DTop5MR", _nvCollection);
                    bottom5MR = GetData("sp_DBottom5MR", _nvCollection);

                    #endregion

                    #endregion

                    #region Place values into GridView

                    gvTop5MR.DataSource = null;
                    gvTop5MR.DataSource = top5MR;
                    gvTop5MR.DataBind();
                    gvTop5MR.Visible = true;
                    gvBottom5MR.DataSource = null;
                    gvBottom5MR.DataSource = bottom5MR;
                    gvBottom5MR.DataBind();

                    #endregion
                }
                else
                {
                    gridtopbotm.Visible = false;
                    top5mr.Visible = false;
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from Top5Bottom5MR is " + exception.Message;
            }
        }

        private void SmsCorrectness()
        {
            try
            {
                #region Initialize

                var arlLabels = new ArrayList();
                var arlIncorrect = new ArrayList();
                var arlCorrect = new ArrayList();
                var dtCorrectSMS = new DataTable();
                var dtIncorrectSMS = new DataTable();
                var dsCorrectSMS = new System.Data.DataSet();
                var dsInCorrectSMS = new System.Data.DataSet();
                int year = 0, month = 0, days = 0;
                _nvCollection.Clear();

                #endregion

                #region Set Year + Month

                if (txtDate.Text != "")
                {
                    year = _currentDate.Year;
                    month = _currentDate.Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }

                #endregion

                #region Generate Labels

                days = DateTime.DaysInMonth(year, month);

                for (int i = 1; i <= days; i++)
                {
                    arlLabels.Add(i.ToString());
                }

                #endregion

                #region Filter By Role

                #region Commented

                //if (_currentRole == "admin" || _currentRole == "headoffice")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        if (ddlLevel1.SelectedValue == "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") &&
                //            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            dsCorrectSMS = GetData("sp_CorrectSMS0Level3", _nvCollection);
                //            dsInCorrectSMS = GetData("sp_InCorrectSMS0Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") &&
                //            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            dsCorrectSMS = GetData("sp_CorrectSMS0Level3", _nvCollection);
                //            dsInCorrectSMS = GetData("sp_InCorrectSMS0Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" &&
                //            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            dsCorrectSMS = GetData("sp_CorrectSMS0Level3", _nvCollection);
                //            dsInCorrectSMS = GetData("sp_InCorrectSMS0Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1" &&
                //            (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            dsCorrectSMS = GetData("sp_CorrectSMS0Level3", _nvCollection);
                //            dsInCorrectSMS = GetData("sp_InCorrectSMS0Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1" && ddlLevel4.SelectedValue != "-1")
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            dsCorrectSMS = GetData("sp_CorrectSMS0Level3", _nvCollection);
                //            dsInCorrectSMS = GetData("sp_InCorrectSMS0Level3", _nvCollection);
                //        }

                //        #endregion
                //    }
                //    else if (_hierarchyName == "Level4")
                //    {

                //    }
                //    else if (_hierarchyName == "Level5")
                //    {

                //    }
                //    else if (_hierarchyName == "Level6")
                //    {

                //    }

                //    #endregion
                //}
                //else if (_currentRole == "rl1")
                //{

                //}
                //else if (_currentRole == "rl2")
                //{

                //}
                //else if (_currentRole == "rl3")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        if (ddlLevel1.SelectedValue == "-1" &&
                //            (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") && (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            dsCorrectSMS = GetData("sp_CorrectSMS3Level3", _nvCollection);
                //            dsInCorrectSMS = GetData("sp_InCorrectSMS3Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" &&
                //            (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") && (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            dsCorrectSMS = GetData("sp_CorrectSMS3Level3", _nvCollection);
                //            dsInCorrectSMS = GetData("sp_InCorrectSMS3Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" &&
                //            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            dsCorrectSMS = GetData("sp_CorrectSMS3Level3", _nvCollection);
                //            dsInCorrectSMS = GetData("sp_InCorrectSMS3Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1")
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            dsCorrectSMS = GetData("sp_CorrectSMS3Level3", _nvCollection);
                //            dsInCorrectSMS = GetData("sp_InCorrectSMS3Level3", _nvCollection);
                //        }

                //        #endregion
                //    }

                //    #endregion
                //}
                //else if (_currentRole == "rl4")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        if (ddlLevel1.SelectedValue == "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            dsCorrectSMS = GetData("sp_CorrectSMS4Level3", _nvCollection);
                //            dsInCorrectSMS = GetData("sp_InCorrectSMS4Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1"))
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            dsCorrectSMS = GetData("sp_CorrectSMS4Level3", _nvCollection);
                //            dsInCorrectSMS = GetData("sp_InCorrectSMS4Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1")
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            dsCorrectSMS = GetData("sp_CorrectSMS4Level3", _nvCollection);
                //            dsInCorrectSMS = GetData("sp_InCorrectSMS4Level3", _nvCollection);
                //        }

                //        #endregion
                //    }
                //    else if (_hierarchyName == "Level4")
                //    {

                //    }

                //    #endregion
                //}
                //else if (_currentRole == "rl5")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        if (ddlLevel1.SelectedValue == "-1")
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            dsCorrectSMS = GetData("sp_CorrectSMS5Level3", _nvCollection);
                //            dsInCorrectSMS = GetData("sp_InCorrectSMS5Level3", _nvCollection);
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1")
                //        {
                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_currentLevelId));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@Year-int", Convert.ToString(year));
                //            _nvCollection.Add("@Month-int", Convert.ToString(month));
                //            dsCorrectSMS = GetData("sp_CorrectSMS5Level3", _nvCollection);
                //            dsInCorrectSMS = GetData("sp_InCorrectSMS5Level3", _nvCollection);
                //        }

                //        #endregion
                //    }
                //    else if (_hierarchyName == "Level4")
                //    {

                //    }
                //    else if (_hierarchyName == "Level5")
                //    {

                //    }

                //    #endregion
                //}
                //else if (_currentRole == "rl6")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //        _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //        _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //        _nvCollection.Add("@Level6Id-int", Convert.ToString(_currentLevelId));
                //        _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //        _nvCollection.Add("@Year-int", Convert.ToString(year));
                //        _nvCollection.Add("@Month-int", Convert.ToString(month));
                //        dsCorrectSMS = GetData("sp_CorrectSMS6Level3", _nvCollection);
                //        dsInCorrectSMS = GetData("sp_InCorrectSMS6Level3", _nvCollection);
                //    }
                //    else if (_hierarchyName == "Level4")
                //    {

                //    }
                //    else if (_hierarchyName == "Level5")
                //    {

                //    }
                //    else if (_hierarchyName == "Level6")
                //    {

                //    }

                //    #endregion
                //}

                #endregion

                _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                _nvCollection.Add("@Year-int", Convert.ToString(year));
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                dsCorrectSMS = GetData("crmdashboard_CorrectSMS", _nvCollection);
                dsInCorrectSMS = GetData("crmdashboard_InCorrectSMS", _nvCollection);

                #endregion

                #region Initializing and Place Chart values

                string[] Labels = (string[])arlLabels.ToArray(typeof(string));

                if (dsCorrectSMS != null)
                {
                    dtCorrectSMS = dsCorrectSMS.Tables[0];

                    if (dsInCorrectSMS != null)
                    {
                        double cor_total = 0.0;
                        double inc_total = 0.0;

                        dtIncorrectSMS = dsInCorrectSMS.Tables[0];
                        dtCorrectSMS.PrimaryKey = new DataColumn[] { dtCorrectSMS.Columns[0] };
                        dtIncorrectSMS.PrimaryKey = new DataColumn[] { dtIncorrectSMS.Columns[0] };

                        double cor_sms = 0.0;
                        double inc_sms = 0.0;
                        double cor_pct = 0.0;
                        double inc_pct = 0.0;
                        int counter = 0;

                        foreach (string daay in Labels)
                        {
                            if (counter == 0)
                            {
                                counter = 1;
                            }
                            else if (counter > 1)
                            {
                                counter++;
                            }

                            string dd = counter.ToString();//day.ToString();

                            DataRow drInc = dtIncorrectSMS.Rows.Find(daay);
                            DataRow drCor = dtCorrectSMS.Rows.Find(daay);

                            if (drInc == null)
                            {
                                inc_sms = 0.0;
                            }
                            else
                            {
                                inc_sms = Convert.ToDouble(drInc["Incorrect_SMS"]);
                                if (dd == daay)
                                {
                                    inc_total = inc_sms;
                                }
                            }

                            if (drCor == null)
                            {
                                cor_sms = 0.0;
                            }
                            else
                            {
                                cor_sms = Convert.ToDouble(drCor["Correct_SMS"]);

                                if (dd == daay)
                                {
                                    cor_total = cor_sms;
                                }
                            }


                            try
                            {
                                inc_pct = Math.Round((inc_sms / (inc_sms + cor_sms)) * 100, 1);

                                if (inc_sms == 0 && cor_sms == 0)
                                {
                                    inc_pct = 0.0;
                                }
                            }
                            catch
                            {
                                inc_pct = 0.0;
                            }

                            try
                            {
                                cor_pct = Math.Round((cor_sms / (inc_sms + cor_sms)) * 100, 1);

                                if (cor_sms == 0 && inc_sms == 0)
                                {
                                    cor_pct = 0.0;
                                }
                            }
                            catch
                            {
                                cor_pct = 0.0;
                            }

                            arlCorrect.Add(cor_pct);
                            arlIncorrect.Add(inc_pct);
                        }

                        dtSum.Rows.Add("Correct SMS", Convert.ToDouble(cor_total.ToString()));
                        dtSum.Rows.Add("Incorrect SMS", Convert.ToDouble(inc_total.ToString()));

                        double[] CorrectSMS = (double[])arlCorrect.ToArray(typeof(double));
                        double[] IncorrectSMS = (double[])arlIncorrect.ToArray(typeof(double));

                        XYChart c = new XYChart(1024, 300, 0xFFFFFF, 0xD8D0C9, 0);
                        c.addTitle(8, "DAILY CALL TRENDS - CORRECT & INCORRECT SMS", "News Gothic MT Bold", 10, 0xFFFFFFF, 0xA28F7F, 0xA28F7F);
                        c.setPlotArea(50, 55, 800, 220);
                        c.xAxis().setLabels(Labels);
                        c.yAxis().setLinearScale(0, 100);
                        c.addLegend(50, 28, false, "Arial Bold", 10).setBackground(Chart.Transparent);
                        BarLayer layer = c.addBarLayer2(Chart.Stack);
                        layer.addDataSet(CorrectSMS, 0x923222, "Correct SMS");
                        layer.addDataSet(IncorrectSMS, 0xEC8026, "Incorrect SMS");
                        layer.setDataLabelStyle().setAlignment(Chart.Center);
                        layer.setDataLabelFormat("{percent}");
                        layer.setDataLabelStyle("Arial Bold", 6, 0xF5EBD7);
                        layer.setBarWidth(22);
                        layer.setLegend(Chart.ReverseLegend);

                        wcvSMSCorrectness.Image = c.makeWebImage(Chart.PNG);

                        GetCurrentLevelId(0);

                        if (_currentRole == "admin" || _currentRole == "headoffice")
                        {
                            wcvSMSCorrectness.ImageMap = c.getHTMLImageMap("javascript:ShowSMSCorrectnessReport('{xLabel}','{dataSetName}','{value}','" + ddlLevel3.SelectedValue + "','" + ddlLevel4.SelectedValue + "','" + _level3Id + "','" + _level4Id + "','" + _level5Id + "','" + _level6Id + "','" + _employeeId + "');", " ",
                            "title='{dataSetName} ({percent}%)'");

                        }
                        else if (_currentRole == "rl3")
                        {
                            wcvSMSCorrectness.ImageMap = c.getHTMLImageMap("javascript:ShowSMSCorrectnessReport('{xLabel}','{dataSetName}','{value}','" + ddlLevel2.SelectedValue + "','" + ddlLevel3.SelectedValue + "','" + _level3Id + "','" + _level4Id + "','" + _level5Id + "','" + _level6Id + "','" + _employeeId + "');", " ",
                            "title='{dataSetName} ({percent}%)'");

                        }
                        else if (_currentRole == "rl4")
                        {
                            wcvSMSCorrectness.ImageMap = c.getHTMLImageMap("javascript:ShowSMSCorrectnessReport('{xLabel}','{dataSetName}','{value}','" + ddlLevel1.SelectedValue + "','" + ddlLevel2.SelectedValue + "','" + _level3Id + "','" + _level4Id + "','" + _level5Id + "','" + _level6Id + "','" + _employeeId + "');", " ",
                            "title='{dataSetName} ({percent}%)'");
                        }
                        else if (_currentRole == "rl5")
                        {
                            wcvSMSCorrectness.ImageMap = c.getHTMLImageMap("javascript:ShowSMSCorrectnessReport('{xLabel}','{dataSetName}','{value}','" + _level5Id + "','" + ddlLevel1.SelectedValue + "','" + _level3Id + "','" + _level4Id + "','" + _level5Id + "','" + _level6Id + "','" + _employeeId + "');", " ",
                                                        "title='{dataSetName} ({percent}%)'");

                        }
                        else if (_currentRole == "rl6")
                        {
                            wcvSMSCorrectness.ImageMap = c.getHTMLImageMap("javascript:ShowSMSCorrectnessReport('{xLabel}','{dataSetName}','{value}','" + _level5Id + "','" + _level6Id + "','" + _level3Id + "','" + _level4Id + "','" + _level5Id + "','" + _level6Id + "','" + _employeeId + "');", " ",
                                                       "title='{dataSetName} ({percent}%)'");
                        }

                    }
                }

                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from SMSCorrectness is " + exception.Message;
            }
        }

        private void LoadCharts()
        {
            lblError.Text = "";
            _currentDate = Convert.ToDateTime(txtDate.Text);
            dsSum.Clear();
            dtSum.Clear();
            dtSum.Columns.Add("Heading");
            dtSum.Columns.Add("Value");

            #region Display Charts

            DailyCallTrend();
            ActualCalls();
            PlannedVsActualCalls();
            VisitFrequency();
            GetAverageCalls();
            JointVisitStats();
            Top5Bottom5Mr();
            SmsCorrectness();
            JointVisitME();

            #endregion

            GVSum.DataSource = dtSum;
            GVSum.DataBind();
        }

        private void JointVisitME()
        {
            try
            {
                #region Initialize

                var jvM = new System.Data.DataSet();
                var jvE = new System.Data.DataSet();
                _nvCollection.Clear();
                jvM.Clear();
                jvE.Clear();
                int year = 0, month = 0;

                #endregion

                #region Set Year + Month

                if (txtDate.Text != "")
                {
                    year = _currentDate.Year;
                    month = _currentDate.Month;
                    _currentDate = Convert.ToDateTime(txtDate.Text);
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }

                #endregion

                #region Filter By Role

                #region commented
                //if (_currentRole == "admin" || _currentRole == "headoffice")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        if (ddlLevel1.SelectedValue == "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") &&
                //            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                //        {
                //            #region Setting Up Parameters

                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@VisitDateTime-datetime", Convert.ToString(_currentDate));

                //            #endregion

                //            #region Get Visits Sort By M & E

                //            jvM = GetData("sp_JointVisitMSelectByLevel", _nvCollection);
                //            jvE = GetData("sp_JointVisitESelectByLevel", _nvCollection);

                //            #endregion
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") &&
                //            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                //        {
                //            #region Setting Up Parameters

                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@VisitDateTime-datetime", Convert.ToString(_currentDate));

                //            #endregion

                //            #region Get Visits Sort By M & E

                //            jvM = GetData("sp_JointVisitMSelectByLevel", _nvCollection);
                //            jvE = GetData("sp_JointVisitESelectByLevel", _nvCollection);

                //            #endregion
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" &&
                //            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                //        {
                //            #region Setting Up Parameters

                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@VisitDateTime-datetime", Convert.ToString(_currentDate));

                //            #endregion

                //            #region Get Visits Sort By M & E

                //            jvM = GetData("sp_JointVisitMSelectByLevel", _nvCollection);
                //            jvE = GetData("sp_JointVisitESelectByLevel", _nvCollection);

                //            #endregion
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1" &&
                //            (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
                //        {
                //            #region Setting Up Parameters

                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@VisitDateTime-datetime", Convert.ToString(_currentDate));

                //            #endregion

                //            #region Get Visits Sort By M & E

                //            jvM = GetData("sp_JointVisitMSelectByLevel", _nvCollection);
                //            jvE = GetData("sp_JointVisitESelectByLevel", _nvCollection);

                //            #endregion
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1" && ddlLevel4.SelectedValue != "-1")
                //        {
                //            #region Setting Up Parameters

                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@VisitDateTime-datetime", Convert.ToString(_currentDate));

                //            #endregion

                //            #region Get Visits Sort By M & E

                //            jvM = GetData("sp_JointVisitMSelectByLevel", _nvCollection);
                //            jvE = GetData("sp_JointVisitESelectByLevel", _nvCollection);

                //            #endregion
                //        }

                //        #endregion
                //    }
                //    else if (_hierarchyName == "Level4")
                //    {

                //    }
                //    else if (_hierarchyName == "Level5")
                //    {

                //    }
                //    else if (_hierarchyName == "Level6")
                //    {

                //    }

                //    #endregion
                //}
                //else if (_currentRole == "rl1")
                //{

                //}
                //else if (_currentRole == "rl2")
                //{

                //}
                //else if (_currentRole == "rl3")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        if (ddlLevel1.SelectedValue == "-1" &&
                //            (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") && (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1"))
                //        {
                //            #region Setting Up Parameters

                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@VisitDateTime-datetime", Convert.ToString(_currentDate));

                //            #endregion

                //            #region Get Visits Sort By M & E

                //            jvM = GetData("sp_JointVisitMSelectByLevel", _nvCollection);
                //            jvE = GetData("sp_JointVisitESelectByLevel", _nvCollection);

                //            #endregion
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" &&
                //            (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") && (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1"))
                //        {
                //            #region Setting Up Parameters

                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@VisitDateTime-datetime", Convert.ToString(_currentDate));

                //            #endregion

                //            #region Get Visits Sort By M & E

                //            jvM = GetData("sp_JointVisitMSelectByLevel", _nvCollection);
                //            jvE = GetData("sp_JointVisitESelectByLevel", _nvCollection);

                //            #endregion
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" &&
                //            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1"))
                //        {
                //            #region Setting Up Parameters

                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@VisitDateTime-datetime", Convert.ToString(_currentDate));

                //            #endregion

                //            #region Get Visits Sort By M & E

                //            jvM = GetData("sp_JointVisitMSelectByLevel", _nvCollection);
                //            jvE = GetData("sp_JointVisitESelectByLevel", _nvCollection);

                //            #endregion
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1")
                //        {
                //            #region Setting Up Parameters

                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@VisitDateTime-datetime", Convert.ToString(_currentDate));

                //            #endregion

                //            #region Get Visits Sort By M & E

                //            jvM = GetData("sp_JointVisitMSelectByLevel", _nvCollection);
                //            jvE = GetData("sp_JointVisitESelectByLevel", _nvCollection);

                //            #endregion
                //        }

                //        #endregion
                //    }

                //    #endregion
                //}
                //else if (_currentRole == "rl4")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        if (ddlLevel1.SelectedValue == "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1"))
                //        {
                //            #region Setting Up Parameters

                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@VisitDateTime-datetime", Convert.ToString(_currentDate));

                //            #endregion

                //            #region Get Visits Sort By M & E

                //            jvM = GetData("sp_JointVisitMSelectByLevel", _nvCollection);
                //            jvE = GetData("sp_JointVisitESelectByLevel", _nvCollection);

                //            #endregion
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1"))
                //        {
                //            #region Setting Up Parameters

                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@VisitDateTime-datetime", Convert.ToString(_currentDate));

                //            #endregion

                //            #region Get Visits Sort By M & E

                //            jvM = GetData("sp_JointVisitMSelectByLevel", _nvCollection);
                //            jvE = GetData("sp_JointVisitESelectByLevel", _nvCollection);

                //            #endregion
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1")
                //        {
                //            #region Setting Up Parameters

                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@VisitDateTime-datetime", Convert.ToString(_currentDate));

                //            #endregion

                //            #region Get Visits Sort By M & E

                //            jvM = GetData("sp_JointVisitMSelectByLevel", _nvCollection);
                //            jvE = GetData("sp_JointVisitESelectByLevel", _nvCollection);

                //            #endregion
                //        }

                //        #endregion
                //    }
                //    else if (_hierarchyName == "Level4")
                //    {

                //    }

                //    #endregion
                //}
                //else if (_currentRole == "rl5")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        if (ddlLevel1.SelectedValue == "-1")
                //        {
                //            #region Setting Up Parameters

                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(0));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                //            _nvCollection.Add("@VisitDateTime-datetime", Convert.ToString(_currentDate));

                //            #endregion

                //            #region Get Visits Sort By M & E

                //            jvM = GetData("sp_JointVisitMSelectByLevel", _nvCollection);
                //            jvE = GetData("sp_JointVisitESelectByLevel", _nvCollection);

                //            #endregion
                //        }
                //        else if (ddlLevel1.SelectedValue != "-1")
                //        {
                //            #region Setting Up Parameters

                //            _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //            _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //            _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //            _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //            _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //            _nvCollection.Add("@VisitDateTime-datetime", Convert.ToString(_currentDate));

                //            #endregion

                //            #region Get Visits Sort By M & E

                //            jvM = GetData("sp_JointVisitMSelectByLevel", _nvCollection);
                //            jvE = GetData("sp_JointVisitESelectByLevel", _nvCollection);

                //            #endregion
                //        }

                //        #endregion
                //    }
                //    else if (_hierarchyName == "Level4")
                //    {

                //    }
                //    else if (_hierarchyName == "Level5")
                //    {

                //    }

                //    #endregion
                //}
                //else if (_currentRole == "rl6")
                //{
                //    #region Filter By Level

                //    if (_hierarchyName == "Level1")
                //    {

                //    }
                //    else if (_hierarchyName == "Level2")
                //    {

                //    }
                //    else if (_hierarchyName == "Level3")
                //    {
                //        #region Setting Up Parameters

                //        _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //        _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //        _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //        _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //        _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //        _nvCollection.Add("@VisitDateTime-datetime", Convert.ToString(_currentDate));

                //        #endregion

                //        #region Get Visits Sort By M & E

                //        jvM = GetData("sp_JointVisitMSelectByLevel", _nvCollection);
                //        jvE = GetData("sp_JointVisitESelectByLevel", _nvCollection);



                //        #endregion
                //    }
                //    else if (_hierarchyName == "Level4")
                //    {

                //    }
                //    else if (_hierarchyName == "Level5")
                //    {

                //    }
                //    else if (_hierarchyName == "Level6")
                //    {

                //    }

                //    #endregion
                //}

                #endregion

                #region Setting Up Parameters

                _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                _nvCollection.Add("@VisitDateTime-datetime", Convert.ToString(_currentDate));

                #endregion

                #region Get Visits Sort By M & E

                jvM = GetData("sp_JointVisitMSelectByLevel", _nvCollection);
                jvE = GetData("sp_JointVisitESelectByLevel", _nvCollection);

                #endregion

                #endregion

                #region Place values into GridView

                //gvMorning.DataSource = null;
                //gvMorning.DataSource = jvM.Tables[0].DefaultView;
                //gvMorning.DataBind();

                agvMorning.DataSource = jvM.Tables[0].DefaultView;
                agvMorning.DataBind();





                //gvMorningChild.DataSource = null;
                //System.Data.DataSet dsForCallChild = GetData("sp_JointVisitSelect", null);

                //gvMorningChild.DataSource = dsForCallChild.Tables[0].DefaultView;
                //gvMorningChild.DataBind();





                //gvEvening.DataSource = null;
                //gvEvening.DataSource = jvE.Tables[0].DefaultView;
                //gvEvening.DataBind();


                agvEvening.DataSource = jvE.Tables[0].DefaultView;
                agvEvening.DataBind();

                //gvchildforevening.DataSource = null;
                //gvchildforevening.DataSource = dsForCallChild.Tables[0].DefaultView;
                //gvchildforevening.DataBind();

                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from JointVisitME is " + exception.Message;
            }
        }



        #endregion

        #region Events

        protected void Page_Load(object sender, EventArgs e)
        {
            if (IsValidUser())
            {

                _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                GetCurrentLevelId(0);

                if (!IsPostBack)
                {
                    #region First Time

                    try
                    {
                        _currentDate = DateTime.Today;
                        LoadDropDownHeader();
                        LoadDefaultDropDownByHierarchy();
                        string roleType = Convert.ToString(Session["CurrentUserRole"]);
                        lblMessage.Text = "Welcome to <b> MY CRM Dashboard </b>. " + this.GenerateTickerText()
                            + ". For comments/suggestion please contact the <b>IT</b> department";
                        //June-2012
                        txtDate.Text = DateTime.Today.ToString("MMMM") + "-" + DateTime.Today.Year.ToString();

                        LoadCharts();

                        //if (_dataFound >= 0)
                        //{
                        //    tblMain1.Visible = true;
                        //    lblError.Text = "";

                        //    #region Load Charts



                        //    #endregion
                        //}
                        //else
                        //{
                        //    tblMain1.Visible = false;
                        //    lblError.Text = "";
                        //}
                    }
                    catch (Exception exception)
                    {
                        Console.Out.WriteLine(exception.Message);
                        lblMessage.Text = "There was an <b>error</b> while updating the dashboard. Please wait for the next refresh or try refreshing it manually";
                        tblMain1.Visible = false;
                    }

                    #endregion
                }
                else
                {
                    tblMain1.Visible = true;
                    lblError.Text = "";
                }
            }
            else
            {
                Response.Redirect("/Form/Login.aspx");
            }
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
                    LoadCharts();

                    #endregion
                }
                else
                {
                    #region Load Charts

                    LoadCharts();

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
                    LoadCharts();

                    #endregion
                }
                else
                {
                    #region Load Charts

                    LoadCharts();

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
                    LoadCharts();

                    #endregion
                }
                else
                {
                    #region Load Charts

                    LoadCharts();

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
                    LoadCharts();

                    #endregion
                }
                else
                {
                    #region Load Charts

                    LoadCharts();

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

                LoadCharts();

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

            LoadCharts();

            #endregion
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

            LoadCharts();

            #endregion
        }

        protected void agvMorning_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            if (e.CommandName == "popup")
            {
                try
                {
                    int sada = Convert.ToInt32(e.CommandArgument);
                    Label lb = agvMorning.Rows[sada].Cells[0].FindControl("labscid") as Label;
                    labqqq.Text = lb.Text.ToString();
                    mpError.Show();

                    NameValueCollection nvn = new NameValueCollection();
                    nvn.Add("PScall-int", lb.Text.ToString());

                    System.Data.DataSet dsForCallChild = GetData("sp_JointVisitSelect", nvn);


                    if (dsForCallChild != null)
                    {
                        if (dsForCallChild.Tables[0].Rows.Count > 0)
                        {
                            GridView1.DataSource = dsForCallChild;
                            GridView1.DataBind();
                        }
                    }
                }
                catch (Exception ex) { }

            }
        }

        protected void agvEvening_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            if (e.CommandName == "popup")
            {
                try
                {
                    int sada = Convert.ToInt32(e.CommandArgument);
                    Label lb = agvMorning.Rows[sada].Cells[0].FindControl("labscid") as Label;
                    labqqq.Text = lb.Text.ToString();
                    mpError.Show();

                    NameValueCollection nvn = new NameValueCollection();
                    nvn.Add("PScall-int", lb.Text.ToString());

                    System.Data.DataSet dsForCallChild = GetData("sp_JointVisitSelect", nvn);


                    if (dsForCallChild != null)
                    {
                        if (dsForCallChild.Tables[0].Rows.Count > 0)
                        {
                            GridView1.DataSource = dsForCallChild;
                            GridView1.DataBind();
                        }
                    }
                }
                catch (Exception ex) { }
            }
        }

        #endregion
    }
}