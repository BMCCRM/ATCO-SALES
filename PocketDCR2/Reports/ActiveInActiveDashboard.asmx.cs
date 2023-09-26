using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using DatabaseLayer.SQL;
using PocketDCR.CustomMembershipProvider;
using System.Collections.Specialized;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Web.Script.Services;
using System.Web.Script.Serialization;
using Highchart.Core.Data.Chart;
using System.Collections.ObjectModel;
using PocketDCR2.Classes;


namespace PocketDCR2.Reports
{
    /// <summary>
    /// Summary description for ActiveInActiveDashboard1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
     [System.Web.Script.Services.ScriptService]
    public class ActiveInActiveDashboard1 : System.Web.Services.WebService
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

        DatabaseDataContext _dataContext;
        private static SystemUser _currentUser;
        private int _currentLevelId = 0, _level1Id = 0, _level2Id = 0, _level3Id = 0, _level4Id = 0, _level5Id = 0, _level6Id = 0;
        private NameValueCollection _nvCollection = new NameValueCollection();
        private static string _currentRole = "", _hierarchyName = "";
        private List<DatabaseLayer.SQL.AppConfiguration> _getHierarchy;
        private int _dataFound = 0;
        private long _employeeId = 0;
        private DateTime _currentDate = DateTime.Today;
        #endregion

        #region Public Member
        DAL dll = new DAL();
        //       DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        JavaScriptSerializer _jss = new JavaScriptSerializer();
        List<SystemRole> _getRoleId;
        List<v_EmployeeWithRole> _getEmployeeWithLevel;
        List<EmploeesInRole> _insertEmployeeInRole;
        //List<v_EmployeeWithRole> _getHierarchyLevel3;
        List<v_EmployeeWithRole> _getHierarchyLevel3;
        List<HierarchyLevel4> _getHierarchyLevel4;
        List<HierarchyLevel5> _getHierarchyLevel5;
        List<HierarchyLevel6> _getHierarchyLevel6;


        //      private SystemUser _currentUser;
        //      string _hierarchyName, _currentRole;
        //       private List<DatabaseLayer.SQL.AppConfiguration> _getHierarchy;
        //      private int _level1Id = 0, _level2Id = 0, _level3Id = 0, _level4Id = 0, _level5Id = 0, _level6Id = 0, _currentLevelId = 0;
        //     private long _employeeId = 0;
        #endregion

        #region Public Service Methods

        private void role()
        {
            var roleId = _dataContext.sp_EmploeesInRolesSelect(null, Convert.ToInt64(_currentUser.EmployeeId)).ToList();
            if (roleId.Count != 0)
            {
                var getRoleId = roleId[0].RoleId;

                var getRole = _dataContext.sp_SystemRolesSelect(getRoleId).ToList();

                if (getRole.Count != 0)
                {
                    _currentRole = getRole[0].LoweredRoleName;
                }
            }

        }

        //problume in this
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetCurrentLevelId(long type)
        {
            string returnString = "";
            try
            {
                if (type == 0)
                {
                    _currentUser = (SystemUser)Session["SystemUser"];
                }

                _getHierarchy = _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

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

                            returnString = _level1Id + ":" + _level2Id + ":" + _level3Id + ":" + _level4Id + ":" + _level5Id + ":" + _level6Id;

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

            }

            return returnString.ToString();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetEmployee(long employeeId)
        {
            string returnString = "";

            try
            {
                List<v_EmployeeDetail> getEmployee =
                    _dataContext.sp_EmployeesSelectByManager(employeeId).Select(
                    p =>
                        new v_EmployeeDetail()
                        {
                            EmployeeId = p.EmployeeId,
                            EmployeeName = p.EmployeeName

                        }).ToList();

                if (getEmployee.Count > 0)
                {
                    returnString = _jss.Serialize(getEmployee);
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetEditableDataRole(long employeeId)
        {
            string returnString = "";

            try
            {
                List<EmploeesInRole> getRoleId =
                    _dataContext.sp_EmploeesInRolesSelect(null, employeeId).ToList();

                if (getRoleId.Count != 0)
                {
                    List<SystemRole> getRole =
                        _dataContext.sp_SystemRolesSelect(Convert.ToInt32(getRoleId[0].RoleId)).Select(
                        p =>
                            new SystemRole()
                            {
                                LoweredRoleName = p.LoweredRoleName
                            }).ToList();

                    if (getRole.Count > 0)
                    {
                        returnString = _jss.Serialize(getRole);
                    }
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string FilterDropDownList(string levelName)
        {
            string returnString = "";

            try
            {
                GetCurrentLevelId(0);

                if (levelName == "Level3")
                {
                    #region Level3

                    #region WebSite of Admin / HeadOffice

                    _currentRole = Session["CurrentUserRole"].ToString();


                    if (_currentRole == "admin" || _currentRole == "headoffice")
                    {
                        _getHierarchyLevel3 = _dataContext.sp_EmployeesSelectByLevel(levelName, _currentRole, 0, 0, 0, 0, 0, 0).Select(
                            p => new v_EmployeeWithRole()
                            {
                                EmployeeId = p.EmployeeId,
                                EmployeeName = p.EmployeeName
                            }).ToList();
                        returnString = _jss.Serialize(_getHierarchyLevel3);
                    }


                    if (_currentRole == "rl3")
                    {
                        _getHierarchyLevel3 = _dataContext.sp_EmployeesSelectByLevel(levelName, _currentRole, 0, 0, _level3Id, 0, 0, 0).Select(
                            p => new v_EmployeeWithRole()
                            {
                                EmployeeId = p.EmployeeId,
                                EmployeeName = p.EmployeeName
                            }).ToList();
                        returnString = _jss.Serialize(_getHierarchyLevel3);
                    }


                    if (_currentRole == "rl4")
                    {
                        _getHierarchyLevel3 = _dataContext.sp_EmployeesSelectByLevel(levelName, _currentRole, 0, 0, _level3Id, _level4Id, 0, 0).Select(
                            p => new v_EmployeeWithRole()
                            {
                                EmployeeId = p.EmployeeId,
                                EmployeeName = p.EmployeeName
                            }).ToList();
                        returnString = _jss.Serialize(_getHierarchyLevel3);
                    }

                    if (_currentRole == "rl5")
                    {
                        _getHierarchyLevel3 = _dataContext.sp_EmployeesSelectByLevel(levelName, _currentRole, 0, 0, _level3Id, _level4Id, _level5Id, 0).Select(
                            p => new v_EmployeeWithRole()
                            {
                                EmployeeId = p.EmployeeId,
                                EmployeeName = p.EmployeeName
                            }).ToList();
                        returnString = _jss.Serialize(_getHierarchyLevel3);
                    }



                    #endregion



                    #endregion
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string getLocationByEmpId(string date, int empid)
        {
            DateTime dt = Convert.ToDateTime(date);
            DAL _dl = new DAL();
            _nvCollection = new NameValueCollection();

            _nvCollection.Add("@day-int", dt.ToString("dd"));
            _nvCollection.Add("@month-int", dt.ToString("MM"));
            _nvCollection.Add("@year-int", dt.ToString("yyyy"));

            _nvCollection.Add("@emp-int", empid.ToString());
            var data = _dl.GetData("sp_locationdata", _nvCollection).Tables[0];
            return data.ToJsonString();
        }


        [WebMethod(EnableSession = true)]
        public string IsValidUser()
        {
            try
            {
                if (Session["SystemUser"] != null)
                {
                    _currentUser = (SystemUser)Session["SystemUser"];
                    return "true";
                }

            }
            catch (Exception exception)
            {

            }
            return "false";
        }

        //[WebMethod(EnableSession = true)]
        //public void GetCurrentLevelId(long type)
        //{
        //    try
        //    {
        //        _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
        //        _getHierarchy = _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

        //        if (_getHierarchy.Count != 0)
        //        {
        //            _hierarchyName = _getHierarchy[0].SettingName;
        //            var currentRole = Convert.ToString(Session["CurrentUserRole"]);
        //            _currentRole = currentRole;

        //            #region Check ID Present ?

        //            long employeeId = 0;

        //            if (type != 0)
        //            {
        //                employeeId = type;
        //            }
        //            else
        //            {
        //                _currentUser = (SystemUser)Session["SystemUser"];
        //                employeeId = Convert.ToInt64(_currentUser.EmployeeId);
        //            }

        //            _employeeId = employeeId;

        //            #endregion

        //            var getCurrentMembershipId =
        //                _dataContext.sp_EmployeeMembershipSelectByEmployee(employeeId).ToList();

        //            if (getCurrentMembershipId.Count != 0)
        //            {
        //                var getCurrentLevelId =
        //                    _dataContext.sp_EmployeeHierarchySelectByMembership(Convert.ToInt64(getCurrentMembershipId[0].SystemUserID)).ToList();

        //                if (getCurrentLevelId.Count != 0)
        //                {
        //                    _level1Id = Convert.ToInt32(getCurrentLevelId[0].LevelId1); _level2Id = Convert.ToInt32(getCurrentLevelId[0].LevelId2);
        //                    _level3Id = Convert.ToInt32(getCurrentLevelId[0].LevelId3); _level4Id = Convert.ToInt32(getCurrentLevelId[0].LevelId4);
        //                    _level5Id = Convert.ToInt32(getCurrentLevelId[0].LevelId5); _level6Id = Convert.ToInt32(getCurrentLevelId[0].LevelId6);

        //                    #region Set Currennt Level Id

        //                    if (_hierarchyName == "Level1")
        //                    {
        //                        if (currentRole == "rl1")
        //                        {
        //                            _currentLevelId = _level1Id;
        //                        }
        //                        else if (currentRole == "rl2")
        //                        {
        //                            _currentLevelId = _level2Id;
        //                        }
        //                        else if (currentRole == "rl3")
        //                        {
        //                            _currentLevelId = _level3Id;
        //                        }
        //                        else if (currentRole == "rl4")
        //                        {
        //                            _currentLevelId = _level4Id;
        //                        }
        //                        else if (currentRole == "rl5")
        //                        {
        //                            _currentLevelId = _level5Id;
        //                        }
        //                        else if (currentRole == "rl6")
        //                        {
        //                            _currentLevelId = _level6Id;
        //                        }
        //                    }
        //                    else if (_hierarchyName == "Level2")
        //                    {
        //                        if (currentRole == "rl2")
        //                        {
        //                            _currentLevelId = _level2Id;
        //                        }
        //                        else if (currentRole == "rl3")
        //                        {
        //                            _currentLevelId = _level3Id;
        //                        }
        //                        else if (currentRole == "rl4")
        //                        {
        //                            _currentLevelId = _level4Id;
        //                        }
        //                        else if (currentRole == "rl5")
        //                        {
        //                            _currentLevelId = _level5Id;
        //                        }
        //                        else if (currentRole == "rl6")
        //                        {
        //                            _currentLevelId = _level6Id;
        //                        }
        //                    }
        //                    else if (_hierarchyName == "Level3")
        //                    {
        //                        if (currentRole == "rl3")
        //                        {
        //                            _currentLevelId = _level3Id;
        //                        }
        //                        else if (currentRole == "rl4")
        //                        {
        //                            _currentLevelId = _level4Id;
        //                        }
        //                        else if (currentRole == "rl5")
        //                        {
        //                            _currentLevelId = _level5Id;
        //                        }
        //                        else if (currentRole == "rl6")
        //                        {
        //                            _currentLevelId = _level6Id;
        //                        }
        //                    }
        //                    else if (_hierarchyName == "Level4")
        //                    {
        //                        if (currentRole == "rl4")
        //                        {
        //                            _currentLevelId = _level4Id;
        //                        }
        //                        else if (currentRole == "rl5")
        //                        {
        //                            _currentLevelId = _level5Id;
        //                        }
        //                        else if (currentRole == "rl6")
        //                        {
        //                            _currentLevelId = _level6Id;
        //                        }
        //                    }
        //                    else if (_hierarchyName == "Level5")
        //                    {
        //                        if (currentRole == "rl5")
        //                        {
        //                            _currentLevelId = _level5Id;
        //                        }
        //                        else if (currentRole == "rl6")
        //                        {
        //                            _currentLevelId = _level6Id;
        //                        }
        //                    }
        //                    else if (_hierarchyName == "Level6")
        //                    {
        //                        if (currentRole == "rl6")
        //                        {
        //                            _currentLevelId = _level6Id;
        //                        }
        //                    }

        //                    #endregion
        //                }

        //            }
        //        }
        //    }
        //    catch (Exception exception)
        //    {
        //        // lblError.Text = "Exception is raised from GetCurrentLevelId is " + exception.Message;
        //    }
        //}

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string StartActualCallsWork(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId)
        {
            JavaScriptSerializer _jss = new JavaScriptSerializer();

            _currentRole = "admin";
            //  GetCurrentLevelId(0);
            // _currentRole = Session["CurrentUserRole"].ToString();

            string result = string.Empty;
            var series = new Collection<MyDataFormat>();
            try
            {
                #region Initialize

                var actualCalls = new System.Data.DataSet();
                _nvCollection.Clear();
                actualCalls.Clear();
                int year = 0, month = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }

                #endregion

                _nvCollection.Add("@Level1Id-int", Convert.ToString(Level1));
                _nvCollection.Add("@Level2Id-int", Convert.ToString(Level2));
                _nvCollection.Add("@Level3Id-int", Convert.ToString(Level3));
                _nvCollection.Add("@Level4Id-int", Convert.ToString(Level4));
                _nvCollection.Add("@Level5Id-int", Convert.ToString(Level5));
                _nvCollection.Add("@Level6Id-int", Convert.ToString(Level6));
                _nvCollection.Add("@EmployeeId-bigint", employeeId.ToString());
                _nvCollection.Add("@Year-int", Convert.ToString(year));
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                actualCalls = GetData("crmdashboard_DActualCalls", _nvCollection); //sp_DActualCalls0Level3


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

                        //_nvCollection.Add("@Level3Id-int", Convert.ToString(Level3));
                        //_nvCollection.Add("@Level4Id-int", Convert.ToString(Level4));
                        //_nvCollection.Add("@Level5Id-int", Convert.ToString(Level5));
                        //_nvCollection.Add("@Level6Id-int", Convert.ToString(Level6));
                        //_nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                        //_nvCollection.Add("@Year-int", Convert.ToString(year));
                        //_nvCollection.Add("@Month-int", Convert.ToString(month));
                        //actualCalls = GetData("crmdashboard_DActualCalls", _nvCollection); //sp_DActualCalls0Level3

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

                }
                else if (_currentRole == "rl4")
                {

                }
                else if (_currentRole == "rl5")
                {

                }
                else if (_currentRole == "rl6")
                {

                }

                #endregion

                #region Initializing Chart

                var label = new ArrayList();
                var data = new ArrayList();

                dtSum.Columns.Add("Heading");
                dtSum.Columns.Add("Value");

                if (actualCalls.Tables[0].Rows.Count != 0)
                {
                    for (int i = 0; i <= actualCalls.Tables[0].Rows.Count - 1; i++)
                    {
                        DataRow item = actualCalls.Tables[0].Rows[i];
                        label.Add(item["Class"].ToString());
                        data.Add(Convert.ToDouble(item["Visits"].ToString()));
                        series.Add(new MyDataFormat(item["Class"].ToString(), Convert.ToInt32(item["Visits"])));

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
                }
                #endregion
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }

            return result = _jss.Serialize(series);
        }


        //[WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public string StartVisitFrequency(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6)
        //{    
        //    //Asif
        //    #region Object Intialization
        //    JavaScriptSerializer _jss = new JavaScriptSerializer();
        //    string result = string.Empty;
        //    var series = new Collection<DailyCallTrendSeri>();
        //    #endregion

        //    try
        //    {
        //        #region Initialize


        //        var visitFrequency = new System.Data.DataSet();
        //        var dataTable = new DataTable();
        //        _nvCollection.Clear();
        //        visitFrequency.Clear();
        //        int year = 0, month = 0;
        //        var classA = new ArrayList();
        //        var classB = new ArrayList();
        //        var classC = new ArrayList();

        //        #endregion

        //        #region Set Year + Month

        //        if (date != "")
        //        { year = Convert.ToDateTime(date).Year; month = Convert.ToDateTime(date).Month; }
        //        else
        //        { year = DateTime.Now.Year; month = DateTime.Now.Month; }

        //        #endregion

        //        #region Filter By Role
        //        _nvCollection.Add("@Level3Id1-int", Convert.ToString(Level3));
        //        _nvCollection.Add("@Level4Id1-int", Convert.ToString(Level4));
        //        _nvCollection.Add("@Level5Id1-int", Convert.ToString(Level5));
        //        _nvCollection.Add("@Level6Id1-int", Convert.ToString(Level6));
        //        _nvCollection.Add("@EmployeeId1-bigint", Convert.ToString(0));
        //        //_nvCollection.Add("@TiemStamp-datetime", Convert.ToString(dt));
        //        _nvCollection.Add("@Year-int", Convert.ToString(year));
        //        _nvCollection.Add("@Month-int", Convert.ToString(month));


        //        visitFrequency = GetData("crmdashboard_VisitFrequency", _nvCollection);

        //        #endregion

        //        #region Initializing Chart

        //        dataTable = visitFrequency.Tables[0];

        //        foreach (DataRow dataRow in dataTable.Rows)
        //        {
        //            for (int i = 0; i < dataTable.Columns.Count; i++)
        //            {
        //                if (i == 0)
        //                    continue;
        //                if (dataRow["Class"].ToString() == "A")
        //                {
        //                    classA.Add(Convert.ToDouble(dataRow[i]));

        //                }
        //                else if (dataRow["Class"].ToString() == "B")
        //                {
        //                    classB.Add(Convert.ToDouble(dataRow[i]));

        //                }
        //                else if (dataRow["Class"].ToString() == "C")
        //                {
        //                    classC.Add(Convert.ToDouble(dataRow[i]));

        //                }

        //            }
        //        }

        //        string[] Label = { "4+", "3", "2", "1", "0" };
        //        double[] classa = (double[])classA.ToArray(typeof(double));
        //        double[] classb = (double[])classB.ToArray(typeof(double));
        //        double[] classc = (double[])classC.ToArray(typeof(double));

        //        #endregion

        //        #region Place Values in Bar Chart
        //        series.Add(new DailyCallTrendSeri("Class A", classa));
        //        series.Add(new DailyCallTrendSeri("Class B", classb));
        //        series.Add(new DailyCallTrendSeri("Class C", classc));
        //        result = _jss.Serialize(series);
        //        #endregion
        //    }
        //    catch (Exception exception)
        //    {

        //    }
        //    return result;
        //}



        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string StartDailyCallTrendWork(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId)
        {
            #region Object Intialization
            JavaScriptSerializer _jss = new JavaScriptSerializer();
            string result = string.Empty;
            var series = new Collection<DailyCallTrendSeri>();
            #endregion

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

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
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
                _nvCollection.Add("@Level1Id-int", Convert.ToString(Level1));
                _nvCollection.Add("@Level2Id-int", Convert.ToString(Level2));
                _nvCollection.Add("@Level3Id-int", Convert.ToString(Level3));
                _nvCollection.Add("@Level4Id-int", Convert.ToString(Level4));
                _nvCollection.Add("@Level5Id-int", Convert.ToString(Level5));
                _nvCollection.Add("@Level6Id-int", Convert.ToString(Level6));
                _nvCollection.Add("@EmployeeId-bigint", employeeId.ToString());
                _nvCollection.Add("@Year-int", Convert.ToString(year));
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                dailyCallTrend = GetData("crmdashboard_DailyCallTrend", _nvCollection);

                #endregion

                dtCorrectSMS = dailyCallTrend.Tables[0];
                dtCorrectSMS.PrimaryKey = new DataColumn[] { dtCorrectSMS.Columns[0] };

                string[] labels = (string[])label.ToArray(typeof(string));
                double cor_sms = 0.0;

                foreach (string daay in labels)
                {
                    DataRow drCor = dtCorrectSMS.Rows.Find(daay);
                    if (drCor == null)
                    {
                        cor_sms = 0.0;
                        arlCorrect.Add(cor_sms);
                        mioCount.Add(0.0);
                        avgCall.Add(cor_sms);
                        kpi.Add(cor_sms);
                    }
                    else
                    {
                        cor_sms = Convert.ToDouble(drCor["CorrectSMS"]);
                        arlCorrect.Add(cor_sms);
                        mioCount.Add(Convert.ToDouble(drCor["MIOs"]));
                        avgCall.Add(Math.Round(cor_sms / Convert.ToDouble(drCor["MIOs"]), 2));
                        kpi.Add(13.0);
                    }
                }

                double[] CorrectSMS = (double[])arlCorrect.ToArray(typeof(double));
                double[] MIOCount = (double[])mioCount.ToArray(typeof(double));
                double[] AvgCalls = (double[])avgCall.ToArray(typeof(double));
                double[] KPI = (double[])kpi.ToArray(typeof(double));
                series.Add(new DailyCallTrendSeri("Actual Calls", AvgCalls));
                result = _jss.Serialize(series);
            }
            catch (Exception exception)
            {
                //lblError.Text = "Exception   is raised from DailyCallTrend is " + exception.Message;
            }

            return result;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string StartVisitFrequency(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId)
        {
            #region Object Intialization
            JavaScriptSerializer _jss = new JavaScriptSerializer();
            string result = string.Empty;
            var series = new Collection<DailyCallTrendSeri>();
            #endregion

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

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                { year = Convert.ToDateTime(date).Year; month = Convert.ToDateTime(date).Month; }
                else
                { year = DateTime.Now.Year; month = DateTime.Now.Month; }

                #endregion

                #region Filter By Role
                _nvCollection.Add("@Level1Id1-int", Convert.ToString(Level1));
                _nvCollection.Add("@Level2Id1-int", Convert.ToString(Level2));
                _nvCollection.Add("@Level3Id1-int", Convert.ToString(Level3));
                _nvCollection.Add("@Level4Id1-int", Convert.ToString(Level4));
                _nvCollection.Add("@Level5Id1-int", Convert.ToString(Level5));
                _nvCollection.Add("@Level6Id1-int", Convert.ToString(Level6));
                _nvCollection.Add("@EmployeeId1-bigint", EmployeeId.ToString());
                //_nvCollection.Add("@TiemStamp-datetime", Convert.ToString(dt));
                _nvCollection.Add("@Year-int", Convert.ToString(year));
                _nvCollection.Add("@Month-int", Convert.ToString(month));


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
                        if (dataRow["Class"].ToString() == "A+")
                        {
                            classA.Add(Convert.ToDouble(dataRow[i]));

                        }
                        else if (dataRow["Class"].ToString() == "A")
                        {
                            classB.Add(Convert.ToDouble(dataRow[i]));

                        }
                        else if (dataRow["Class"].ToString() == "B")
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
                series.Add(new DailyCallTrendSeri("Class A+", classa));
                series.Add(new DailyCallTrendSeri("Class A", classb));
                series.Add(new DailyCallTrendSeri("Class B", classc));
                result = _jss.Serialize(series);
                #endregion
            }
            catch (Exception exception)
            {

            }
            return result;
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string PlannedVsActualCalls(string date, string endate, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId)
        {
            var plannedVSactualCalls = new System.Data.DataSet();
            _nvCollection.Clear();
            plannedVSactualCalls.Clear();
            int year = 0, month = 0, endmonth = 0;
            var targetVsActual = new DataTable();

            double employeeId = 0;

            if (Level6 != "0")
            {
                employeeId = Convert.ToInt64(EmployeeId);
            }
            else
            {
                employeeId = 0;
            }

            JavaScriptSerializer _jss = new JavaScriptSerializer();
            string result = string.Empty;
            var series = new Collection<DailyCallTrendSeri>();

            try
            {
                #region Initialize


                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }
                if (endate != "")
                {
                    endmonth = Convert.ToDateTime(endate).Month;
                }
                else
                {
                    endmonth = DateTime.Now.Month;
                }

                #endregion

                #region Filter By Role
                _nvCollection.Add("@Level1Id-int", Convert.ToString(Level1));
                _nvCollection.Add("@Level2Id-int", Convert.ToString(Level2));
                _nvCollection.Add("@Level3Id-int", Convert.ToString(Level3));
                _nvCollection.Add("@Level4Id-int", Convert.ToString(Level4));
                _nvCollection.Add("@Level5Id-int", Convert.ToString(Level5));
                _nvCollection.Add("@Level6Id-int", Convert.ToString(Level6));
                _nvCollection.Add("@EmployeeId-bigint", employeeId.ToString());
                _nvCollection.Add("@Year-int", Convert.ToString(year));
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                _nvCollection.Add("@endmonth-int", Convert.ToString(endmonth));
                //plannedVSactualCalls = GetData("crmdasboard_planedvsactual", _nvCollection);
                plannedVSactualCalls = GetData("crmdasboard_planedvsactual1_newe", _nvCollection);

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

                series.Add(new DailyCallTrendSeri("Target", PlanCall));
                series.Add(new DailyCallTrendSeri("Actual", ActualCall));
                result = _jss.Serialize(series);

                //var barChart = new XYChart(360, 280, 0xFFFFFF, 0xD8D0C9, 0);
                //barChart.addTitle(8, "TARGET VS ACTUAL CALLS (MTD)", "News Gothic MT Bold", 10, 0xFFFFFFF, 0xA28F7F, 0xA28F7F);
                //barChart.setPlotArea(50, 55, 300, 200);
                //barChart.xAxis().setLabels(Label);
                //barChart.addLegend(50, 23, false, "Arial Bold", 10).setBackground(Chart.Transparent);
                //var barLayer = barChart.addBarLayer2(Chart.Side);
                //barLayer.addDataSet(PlanCall, 0xE44C16, "Target Calls");
                //barLayer.addDataSet(ActualCall, 0xFCAF17, "Actual Calls");
                //barLayer.setBarGap(0.2, Chart.TouchBar);
                //wcvPlannedVsActual.Image = barChart.makeWebImage(Chart.PNG);
                //wcvPlannedVsActual.ImageMap = barChart.getHTMLImageMap("", "", "title='{dataSetName} on Class {xLabel}: {value} calls'");

                #endregion


            }
            catch (Exception exception)
            {
                // lblError.Text = "Exception is raised from PlannedVsActualCalls is " + exception.Message;
            }
            return result;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAverageCalls(string date, string endate, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId)
        {
            JavaScriptSerializer _jss = new JavaScriptSerializer();
            string result = string.Empty;
            var series = new Collection<DailyCallTrendSeri>();
            try
            {
                #region Initialize

                var avgCalls = new System.Data.DataSet();
                _nvCollection.Clear();
                avgCalls.Clear();
                int year = 0, month = 0, endmonth = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }

                if (endate != "")
                {
                    endmonth = Convert.ToDateTime(endate).Month;
                }
                else
                {
                    endmonth = DateTime.Now.Month;
                }

                #endregion

                #region Filter By Role
                _nvCollection.Add("@Level1Id-int", Convert.ToString(Level1));
                _nvCollection.Add("@Level2Id-int", Convert.ToString(Level2));
                _nvCollection.Add("@Level3Id-int", Convert.ToString(Level3));
                _nvCollection.Add("@Level4Id-int", Convert.ToString(Level4));
                _nvCollection.Add("@Level5Id-int", Convert.ToString(Level5));
                _nvCollection.Add("@Level6Id-int", Convert.ToString(Level6));
                _nvCollection.Add("@EmployeeId-bigint", employeeId.ToString());
                _nvCollection.Add("@Year-int", Convert.ToString(year));
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                _nvCollection.Add("@endmonth-int", Convert.ToString(endmonth));
                avgCalls = GetData("crmdashboard_DAvgCallse", _nvCollection);


                #endregion

                #region Initializing and Place values in Race Meter

                if (avgCalls != null)
                {
                    if (avgCalls.Tables[0].Rows.Count != 0)
                    {
                        var result1 = Convert.ToString(avgCalls.Tables[0].Rows[0][0]);

                        if (result1 != "")
                        {
                            var value = Convert.ToDouble(result1);
                            result = value.ToString();
                        }
                    }
                    else
                    {
                    }
                }

                #endregion
            }
            catch (Exception exception)
            {
            }
            return _jss.Serialize(result);
        }

        [WebMethod(EnableSession = true)]
        public List<Top5MR> Top5Mr(string date, string endate, string Level1, string Level2, string Level3, string Level4,
                                    string Level5, string Level6, string EmployeeId)
        {
            //JavaScriptSerializer _jss = new JavaScriptSerializer();
            //string result = string.Empty;
            List<Top5MR> t5 = new List<Top5MR>();
            try
            {
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                if (_currentUserRole != "rl6")
                {
                    #region Initialize

                    var top5MR = new System.Data.DataSet();

                    _nvCollection.Clear();
                    top5MR.Clear();

                    int year = 0, month = 0, endmonth = 0;

                    double employeeId = 0;

                    if (Level6 != "0")
                    {
                        employeeId = Convert.ToInt64(EmployeeId);
                    }
                    else
                    {
                        employeeId = 0;
                    }

                    #endregion

                    #region Set Year + Month

                    if (date != "")
                    {
                        year = Convert.ToDateTime(date).Year;
                        month = Convert.ToDateTime(date).Month;
                    }
                    else
                    {
                        year = DateTime.Now.Year;
                        month = DateTime.Now.Month;
                    }

                    if (endate != "")
                    {
                        endmonth = Convert.ToDateTime(endate).Month;
                    }
                    else
                    {
                        endmonth = DateTime.Now.Month;
                    }

                    #endregion

                    #region Filter By Role



                    #region Setting Up Parameters

                    //_nvCollection.Add("@LevelName-NVARCHAR(100)", _hierarchyName);
                    _nvCollection.Add("@Level1Id-int", Convert.ToString(Level1));
                    _nvCollection.Add("@Level2Id-int", Convert.ToString(Level2));
                    _nvCollection.Add("@Level3id-int", Convert.ToString(Level3));
                    _nvCollection.Add("@Level4id-int", Convert.ToString(Level4));
                    _nvCollection.Add("@Level5id-int", Convert.ToString(Level5));
                    _nvCollection.Add("@Level6id-int", Convert.ToString(Level6));
                    _nvCollection.Add("@EmployeeId-int", employeeId.ToString());
                    _nvCollection.Add("@Year-int", Convert.ToString(year));
                    _nvCollection.Add("@Month-int", Convert.ToString(month));
                    _nvCollection.Add("@endmonth-int", Convert.ToString(endmonth));

                    top5MR = GetData("sp_DTop5MRe", _nvCollection);
                    #endregion

                    #region Get Top 5 & Bottom 5 MR



                    for (int i = 0; i < top5MR.Tables[0].Rows.Count; i++)
                    {
                        t5.Add(new Top5MR(top5MR.Tables[0].Rows[i]["MR"].ToString(),
                            top5MR.Tables[0].Rows[i]["Avg"].ToString(), top5MR.Tables[0].Rows[i]["JVC"].ToString()));
                    }


                    #endregion

                    #endregion

                    //     result = _jss.Serialize(v);
                }
                else
                {
                }
            }
            catch (Exception exception)
            {

            }

            return t5;

        }

        [WebMethod(EnableSession = true)]
        public List<Bottom5MR> Bottom5Mr(string date, string endate, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId)
        {
            List<Bottom5MR> t5 = new List<Bottom5MR>();
            try
            {
                _hierarchyName = "Level3";

                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                if (_currentUserRole != "rl6")
                {
                    #region Initialize

                    var bottom5MR = new System.Data.DataSet();

                    _nvCollection.Clear();
                    bottom5MR.Clear();

                    int year = 0, month = 0, endmonth = 0;

                    double employeeId = 0;

                    if (Level6 != "0")
                    {
                        employeeId = Convert.ToInt64(EmployeeId);
                    }
                    else
                    {
                        employeeId = 0;
                    }

                    #endregion

                    #region Set Year + Month

                    if (date != "")
                    {
                        year = Convert.ToDateTime(date).Year;
                        month = Convert.ToDateTime(date).Month;
                    }
                    else
                    {
                        year = DateTime.Now.Year;
                        month = DateTime.Now.Month;
                    }
                    if (endate != "")
                    {
                        endmonth = Convert.ToDateTime(endate).Month;
                    }
                    else
                    {
                        endmonth = DateTime.Now.Month;
                    }
                    #endregion

                    #region Filter By Role


                    #region Setting Up Parameters

                    //_nvCollection.Add("@LevelName-NVARCHAR(100)", _hierarchyName);
                    _nvCollection.Add("@Level1Id-int", Convert.ToString(Level1));
                    _nvCollection.Add("@Level2Id-int", Convert.ToString(Level2));
                    _nvCollection.Add("@Level3Id-int", Convert.ToString(Level3));
                    _nvCollection.Add("@Level4Id-int", Convert.ToString(Level4));
                    _nvCollection.Add("@Level5Id-int", Convert.ToString(Level5));
                    _nvCollection.Add("@Level6Id-int", Convert.ToString(Level6));
                    _nvCollection.Add("@EmployeeId-int", employeeId.ToString());
                    _nvCollection.Add("@Year-int", Convert.ToString(year));
                    _nvCollection.Add("@Month-int", Convert.ToString(month));
                    _nvCollection.Add("@endmonth-int", Convert.ToString(endmonth));

                    #endregion

                    #region Get Top 5 & Bottom 5 MR

                    bottom5MR = GetData("sp_Bottom5MRe", _nvCollection);

                    for (int i = 0; i < bottom5MR.Tables[0].Rows.Count; i++)
                    {
                        t5.Add(new Bottom5MR(bottom5MR.Tables[0].Rows[i]["MR"].ToString(), bottom5MR.Tables[0].Rows[i]["Avg"].ToString(),
                            bottom5MR.Tables[0].Rows[i]["JVC"].ToString()));
                    }


                    #endregion

                    #endregion

                    //     result = _jss.Serialize(v);
                }
                else
                {
                }
            }
            catch (Exception exception)
            {

            }

            return t5;

        }

        [WebMethod(EnableSession = true)]
        public List<DailyCall> DailyCall(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId)
        {
            List<DailyCall> t5 = new List<DailyCall>();
            try
            {
                #region Initialize


                var dailyCallTrend = new System.Data.DataSet();
                dailyCallTrend.Clear();
                _nvCollection.Clear();
                int year = 0, month = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }


                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }

                #endregion


                #region Filter By Role

                _nvCollection.Add("@Level1Id-int", Convert.ToString(Level1));
                _nvCollection.Add("@Level2Id-int", Convert.ToString(Level2));
                _nvCollection.Add("@Level3Id-int", Convert.ToString(Level3));
                _nvCollection.Add("@Level4Id-int", Convert.ToString(Level4));
                _nvCollection.Add("@Level5Id-int", Convert.ToString(Level5));
                _nvCollection.Add("@Level6Id-int", Convert.ToString(Level6));
                _nvCollection.Add("@EmployeeId-bigint", employeeId.ToString());
                _nvCollection.Add("@Year-int", Convert.ToString(year));
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                dailyCallTrend = GetData("crmdashboard_DailyCallTrend", _nvCollection);


                for (int i = 0; i < dailyCallTrend.Tables[0].Rows.Count; i++)
                {
                    t5.Add(new DailyCall(dailyCallTrend.Tables[0].Rows[i]["Days"].ToString(), dailyCallTrend.Tables[0].Rows[i]["CorrectSMS"].ToString(), dailyCallTrend.Tables[0].Rows[i]["MIOs"].ToString(), dailyCallTrend.Tables[0].Rows[i]["AVGC"].ToString()));
                }


                #endregion



            }
            catch (Exception exception)
            {

            }

            return t5;
        }

        [WebMethod(EnableSession = true)]
        public List<Bottom5MR> Bottom5Mr1(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId)
        {
            List<Bottom5MR> t5 = new List<Bottom5MR>();
            try
            {
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                if (_currentUserRole != "rl6")
                {
                    #region Initialize

                    var bottom5MR = new System.Data.DataSet();

                    _nvCollection.Clear();
                    bottom5MR.Clear();

                    int year = 0, month = 0;

                    double employeeId = 0;

                    if (Level6 != "0")
                    {
                        employeeId = Convert.ToInt64(EmployeeId);
                    }
                    else
                    {
                        employeeId = 0;
                    }

                    #endregion

                    #region Set Year + Month

                    if (date != "")
                    {
                        year = Convert.ToDateTime(date).Year;
                        month = Convert.ToDateTime(date).Month;
                    }
                    else
                    {
                        year = DateTime.Now.Year;
                        month = DateTime.Now.Month;
                    }

                    #endregion

                    #region Filter By Role


                    #region Setting Up Parameters

                    int a = 1, b = 0, c = 0, d = 0, e = 0;

                    string StartingDate = "10/05/2012";
                    string EndingDate = "10/05/2012";

                    _nvCollection.Add("@Level3Id-int", Convert.ToString(Level3));
                    _nvCollection.Add("@Level4Id-int", Convert.ToString(Level4));
                    _nvCollection.Add("@Level5Id-int", Convert.ToString(Level5));
                    _nvCollection.Add("@Level6Id-int", Convert.ToString(Level6));
                    _nvCollection.Add("@EmployeeId-bigint", employeeId.ToString());
                    _nvCollection.Add("@StartingDate-datetime", StartingDate);
                    _nvCollection.Add("@EndingDate-datetime", EndingDate);

                    #endregion

                    #region Get Top 5 & Bottom 5 MR

                    bottom5MR = GetData("PreSalesCalls_DataScreen_New", _nvCollection);



                    for (int i = 0; i < bottom5MR.Tables[0].Rows.Count; i++)
                    {
                        t5.Add(new Bottom5MR(bottom5MR.Tables[0].Rows[i]["MR"].ToString(), bottom5MR.Tables[0].Rows[i]["Avg"].ToString()
                            , bottom5MR.Tables[0].Rows[i]["JVC"].ToString()));
                    }


                    #endregion

                    #endregion

                    //     result = _jss.Serialize(v);
                }
                else
                {
                }
            }
            catch (Exception exception)
            {

            }

            return t5;

        }

        [WebMethod(EnableSession = true)]
        public string SmsCorrectness(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId)
        {
            string result = string.Empty;
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
                var series = new Collection<DailyCallTrendSeri>();

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
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
                _nvCollection.Add("@Level1Id-int", Convert.ToString(Level1));
                _nvCollection.Add("@Level2Id-int", Convert.ToString(Level2));
                _nvCollection.Add("@Level3Id-int", Convert.ToString(Level3));
                _nvCollection.Add("@Level4Id-int", Convert.ToString(Level4));
                _nvCollection.Add("@Level5Id-int", Convert.ToString(Level5));
                _nvCollection.Add("@Level6Id-int", Convert.ToString(Level6));
                _nvCollection.Add("@EmployeeId-bigint", employeeId.ToString());
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

                        double[] CorrectSMS = (double[])arlCorrect.ToArray(typeof(double));
                        double[] IncorrectSMS = (double[])arlIncorrect.ToArray(typeof(double));

                        GetCurrentLevelId(0);

                        series.Add(new DailyCallTrendSeri("Correct SMS", CorrectSMS));
                        series.Add(new DailyCallTrendSeri("Incorrect SMS", IncorrectSMS));

                        result = _jss.Serialize(series);


                    }
                }

                #endregion
            }
            catch (Exception exception)
            {
            }
            return result;
        }

        [WebMethod(EnableSession = true)]
        public string GetLevelsID()
        {
            JavaScriptSerializer _jss = new JavaScriptSerializer();
            string result = string.Empty;
            var levels = new Collection<Levels>();
            levels.Add(new Levels("Level1Name", _level1Id));
            levels.Add(new Levels("Level2Name", _level2Id));
            levels.Add(new Levels("Level3Name", _level3Id));
            levels.Add(new Levels("Level4Name", _level4Id));
            levels.Add(new Levels("Level5Name", _level5Id));
            levels.Add(new Levels("Level6Name", _level6Id));
            levels.Add(new Levels("EmployeeID", Convert.ToInt32(_employeeId)));
            return result = _jss.Serialize(levels);
        }



        [WebMethod(EnableSession = true)]
        public string GetLevelsID(string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId)
        {
            JavaScriptSerializer _jss = new JavaScriptSerializer();
            string result = string.Empty;
            var levels = new Collection<Levels>();
            levels.Add(new Levels("Level1Name", Convert.ToInt32(Level1)));
            levels.Add(new Levels("Level2Name", Convert.ToInt32(Level2)));
            levels.Add(new Levels("Level3Name", Convert.ToInt32(Level3)));
            levels.Add(new Levels("Level4Name", Convert.ToInt32(Level4)));
            levels.Add(new Levels("Level5Name", Convert.ToInt32(Level5)));
            levels.Add(new Levels("Level6Name", Convert.ToInt32(Level6)));
            levels.Add(new Levels("EmployeeID", Convert.ToInt32(EmployeeId)));

            //var levels = new Collection<Levels>();
            //levels.Add(new Levels("Level1Name", _level1Id));
            //levels.Add(new Levels("Level2Name", _level2Id));
            //levels.Add(new Levels("Level3Name", _level3Id));
            //levels.Add(new Levels("Level4Name", _level4Id));
            //levels.Add(new Levels("Level5Name", _level5Id));
            //levels.Add(new Levels("Level6Name", _level6Id));
            //levels.Add(new Levels("EmployeeID", Convert.ToInt32(_employeeId)));
            return result = _jss.Serialize(levels);
        }

        [WebMethod(EnableSession = true)]
        public string estworkinddays(string date, string endate, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId)
        {
            string result = string.Empty;
            try
            {
                #region Initialize

                var classProdFreq = new System.Data.DataSet();
                _nvCollection.Clear();
                classProdFreq.Clear();
                int year = 0, month = 0, endmonth = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }


                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }
                if (endate != "")
                {
                    endmonth = Convert.ToDateTime(endate).Month;
                }


                #endregion

                #region Filter By Role
                if (endate == date)
                {
                    _nvCollection.Add("@Level1id-int", Level1.ToString());
                    _nvCollection.Add("@Level2id-int", Level2.ToString());
                    _nvCollection.Add("@Level3id-int", Level3.ToString());
                    _nvCollection.Add("@Level4id-int", Level4.ToString());
                    _nvCollection.Add("@Level5id-int", Level5.ToString());
                    _nvCollection.Add("@Level6id-int", Level6.ToString());
                    _nvCollection.Add("@EmployeeId-int", employeeId.ToString());
                    _nvCollection.Add("@Month-int", Convert.ToString(month));
                    _nvCollection.Add("@Year-int", Convert.ToString(year));


                    classProdFreq = GetData("sp_est_workingANDdaysInField_NewDB", _nvCollection);
                }
                else
                {
                    _nvCollection.Add("@Level1id-int", Level1.ToString());
                    _nvCollection.Add("@Level2id-int", Level2.ToString());
                    _nvCollection.Add("@Level3id-int", Level3.ToString());
                    _nvCollection.Add("@Level4id-int", Level4.ToString());
                    _nvCollection.Add("@Level5id-int", Level5.ToString());
                    _nvCollection.Add("@Level6id-int", Level6.ToString());
                    //_nvCollection.Add("@EmployeeId-int", employeeId.ToString());
                    _nvCollection.Add("@month-int", Convert.ToString(month));
                    _nvCollection.Add("@year-int", Convert.ToString(year));
                    _nvCollection.Add("@endmonth-int", Convert.ToString(endmonth));


                    classProdFreq = GetData("sp_est_workingANDdaysInFielde_NewDB", _nvCollection);
                }

                #endregion

                if (classProdFreq != null)
                {
                    if (classProdFreq.Tables[0].Rows.Count > 0)
                    {
                        result = classProdFreq.Tables[0].ToJsonString();
                    }
                }
            }
            catch (Exception exception)
            {

            }
            return result;
        }

        [WebMethod(EnableSession = true)]
        public string ProdFreClass(string date, string endate, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId)
        {
            string result = string.Empty;
            try
            {
                #region Initialize

                var classProdFreq = new System.Data.DataSet();
                _nvCollection.Clear();
                classProdFreq.Clear();
                int year = 0, month = 0, endyear = 0, endmonth = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }


                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }

                if (endate != "")
                {
                    endyear = Convert.ToDateTime(endate).Year;
                    endmonth = Convert.ToDateTime(endate).Month;
                }
                else
                {
                    endyear = DateTime.Now.Year;
                    endmonth = DateTime.Now.Month;
                }
                #endregion

                #region Filter By Role
                _nvCollection.Add("@Level1id-int", Level1.ToString());
                _nvCollection.Add("@Level2id-int", Level2.ToString());
                _nvCollection.Add("@Level3id-int", Level3.ToString());
                _nvCollection.Add("@Level4id-int", Level4.ToString());
                _nvCollection.Add("@Level5id-int", Level5.ToString());
                _nvCollection.Add("@Level6id-int", Level6.ToString());
                _nvCollection.Add("@EmployeeId-int", employeeId.ToString());
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                _nvCollection.Add("@Year-int", Convert.ToString(year));
                _nvCollection.Add("@endmonth-int", Convert.ToString(endmonth));

                classProdFreq = GetData("sp_class_prodfreqe", _nvCollection);


                #endregion

                if (classProdFreq != null)
                {
                    if (classProdFreq.Tables[0].Rows.Count > 0)
                    {
                        result = classProdFreq.Tables[0].ToJsonString();
                    }
                }
            }
            catch (Exception exception)
            {

            }
            return result;
        }

        [WebMethod(EnableSession = true)]
        public string customercoveragebyclass(string date, string endate, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId)
        {
            string result = string.Empty;
            try
            {
                #region Initialize

                var customercoverage = new System.Data.DataSet();
                _nvCollection.Clear();
                customercoverage.Clear();
                int year = 0, month = 0, endmonth = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }
                if (endate != "")
                {
                    endmonth = Convert.ToDateTime(endate).Month;
                }
                else
                {
                    endmonth = DateTime.Now.Month;
                }

                #endregion

                #region Filter By Role
                _nvCollection.Add("@Level1id-int", Level1.ToString());
                _nvCollection.Add("@Level2id-int", Level2.ToString());
                _nvCollection.Add("@Level3id-int", Level3.ToString());
                _nvCollection.Add("@Level4id-int", Level4.ToString());
                _nvCollection.Add("@Level5id-int", Level5.ToString());
                _nvCollection.Add("@Level6id-int", Level6.ToString());
                _nvCollection.Add("@EmployeeId-int", employeeId.ToString());
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                _nvCollection.Add("@Year-int", Convert.ToString(year));
                _nvCollection.Add("@endmonth-int", Convert.ToString(endmonth));

                customercoverage = GetData("sp_customerCuverageByClasse", _nvCollection);


                #endregion

                if (customercoverage.Tables[0].Rows.Count > 0)
                {
                    result = customercoverage.Tables[0].ToJsonString();
                }
            }
            catch (Exception exception)
            {

            }
            return result;
        }

        [WebMethod(EnableSession = true)]
        public string callsperday(string date, string Level1, string endate, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId)
        {
            string result = string.Empty;
            try
            {
                #region Initialize

                var customercoverage = new System.Data.DataSet();
                _nvCollection.Clear();
                customercoverage.Clear();
                int year = 0, month = 0, endmonth = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }

                if (endate != "")
                {
                    endmonth = Convert.ToDateTime(endate).Month;
                }
                else
                {
                    endmonth = DateTime.Now.Month;
                }

                #endregion

                #region Filter By Role

                _nvCollection.Add("@Level1id-int", Level1.ToString());
                _nvCollection.Add("@Level2id-int", Level2.ToString());
                _nvCollection.Add("@Level3id-int", Level3.ToString());
                _nvCollection.Add("@Level4id-int", Level4.ToString());
                _nvCollection.Add("@Level5id-int", Level5.ToString());
                _nvCollection.Add("@Level6id-int", Level6.ToString());
                _nvCollection.Add("@EmployeeId-int", employeeId.ToString());
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                _nvCollection.Add("@Year-int", Convert.ToString(year));
                _nvCollection.Add("@endmonth-int", Convert.ToString(endmonth));

                customercoverage = GetData("sp_Callsperdaye", _nvCollection);

                #endregion

                if (customercoverage != null)
                {
                    if (customercoverage.Tables[0].Rows.Count > 0)
                    {
                        result = customercoverage.Tables[0].ToJsonString();
                    }
                }

            }
            catch (Exception exception)
            {

            }
            return result;
        }


        #region umer work


        [WebMethod(EnableSession = true)]
        public string GetSposCount(string date, string Level1, string endate, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId)
        {
            string result = string.Empty;
            try
            {
                #region Initialize

                var spocount = new System.Data.DataSet();
                _nvCollection.Clear();
                spocount.Clear();
                int year = 0, month = 0, endmonth = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }

                if (endate != "")
                {
                    endmonth = Convert.ToDateTime(endate).Month;
                }
                else
                {
                    endmonth = DateTime.Now.Month;
                }

                #endregion

                #region Filter By Role

                _nvCollection.Add("@Level1id-int", Level1.ToString());
                _nvCollection.Add("@Level2id-int", Level2.ToString());
                _nvCollection.Add("@Level3id-int", Level3.ToString());
                _nvCollection.Add("@Level4id-int", Level4.ToString());
                _nvCollection.Add("@Level5id-int", Level5.ToString());
                _nvCollection.Add("@Level6id-int", Level6.ToString());
                _nvCollection.Add("@EmployeeId-int", employeeId.ToString());
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                _nvCollection.Add("@Year-int", Convert.ToString(year));

                spocount = GetData("sp_GetSposCount", _nvCollection);


                #endregion

                if (spocount != null)
                {
                    if (spocount.Tables[0].Rows.Count > 0)
                    {
                        result = spocount.Tables[0].ToJsonString();
                    }
                }

            }
            catch (Exception exception)
            {

            }
            return result;
        }


        [WebMethod(EnableSession = true)]
        public string BrandDetails(string date, string Level1, string endate, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId)
        {
            string result = string.Empty;
            try
            {
                #region Initialize

                var spocount = new System.Data.DataSet();
                _nvCollection.Clear();
                spocount.Clear();
                int year = 0, month = 0, endmonth = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }

                if (endate != "")
                {
                    endmonth = Convert.ToDateTime(endate).Month;
                }
                else
                {
                    endmonth = DateTime.Now.Month;
                }

                #endregion

                #region Filter By Role

                _nvCollection.Add("@Level1id-int", Level1.ToString());
                _nvCollection.Add("@Level2id-int", Level2.ToString());
                _nvCollection.Add("@Level3id-int", Level3.ToString());
                _nvCollection.Add("@Level4id-int", Level4.ToString());
                _nvCollection.Add("@Level5id-int", Level5.ToString());
                _nvCollection.Add("@Level6id-int", Level6.ToString());
                _nvCollection.Add("@EmployeeId-int", employeeId.ToString());
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                _nvCollection.Add("@Year-int", Convert.ToString(year));

                spocount = GetData("sp_brandsDetailed_dashboard", _nvCollection);


                #endregion

                if (spocount != null)
                {
                    if (spocount.Tables[0].Rows.Count > 0)
                    {
                        result = spocount.Tables[0].ToJsonString();
                    }
                }

            }
            catch (Exception exception)
            {

            }
            return result;
        }


        [WebMethod(EnableSession = true)]
        public string SpecialistCoverd(string date, string Level1, string endate, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId)
        {
            string result = string.Empty;
            try
            {
                #region Initialize

                var spocount = new System.Data.DataSet();
                _nvCollection.Clear();
                spocount.Clear();
                int year = 0, month = 0, endmonth = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }

                if (endate != "")
                {
                    endmonth = Convert.ToDateTime(endate).Month;
                }
                else
                {
                    endmonth = DateTime.Now.Month;
                }

                #endregion

                #region Filter By Role

                _nvCollection.Add("@Level1id-int", Level1.ToString());
                _nvCollection.Add("@Level2id-int", Level2.ToString());
                _nvCollection.Add("@Level3id-int", Level3.ToString());
                _nvCollection.Add("@Level4id-int", Level4.ToString());
                _nvCollection.Add("@Level5id-int", Level5.ToString());
                _nvCollection.Add("@Level6id-int", Level6.ToString());
                _nvCollection.Add("@EmployeeId-int", employeeId.ToString());
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                _nvCollection.Add("@Year-int", Convert.ToString(year));

                spocount = GetData("sp_specialistcovered_dashboard", _nvCollection);


                #endregion

                if (spocount != null)
                {
                    if (spocount.Tables[0].Rows.Count > 0)
                    {
                        result = spocount.Tables[0].ToJsonString();
                    }
                }

            }
            catch (Exception exception)
            {

            }
            return result;
        }



        [WebMethod(EnableSession = true)]
        public string DocCountSpecialityWise(string date, string Level1, string endate, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId)
        {
            string result = string.Empty;
            try
            {
                #region Initialize

                var spocount = new System.Data.DataSet();
                _nvCollection.Clear();
                spocount.Clear();
                int year = 0, month = 0, endmonth = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }

                if (endate != "")
                {
                    endmonth = Convert.ToDateTime(endate).Month;
                }
                else
                {
                    endmonth = DateTime.Now.Month;
                }

                #endregion

                #region Filter By Role

                _nvCollection.Add("@Level1id-int", Level1.ToString());
                _nvCollection.Add("@Level2id-int", Level2.ToString());
                _nvCollection.Add("@Level3id-int", Level3.ToString());
                _nvCollection.Add("@Level4id-int", Level4.ToString());
                _nvCollection.Add("@Level5id-int", Level5.ToString());
                _nvCollection.Add("@Level6id-int", Level6.ToString());
                _nvCollection.Add("@EmployeeId-int", employeeId.ToString());
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                _nvCollection.Add("@Year-int", Convert.ToString(year));

                spocount = GetData("sp_doccountspecialitywise_dashboard", _nvCollection);


                #endregion

                if (spocount != null)
                {
                    if (spocount.Tables[0].Rows.Count > 0)
                    {
                        result = spocount.Tables[0].ToJsonString();
                    }
                }

            }
            catch (Exception exception)
            {

            }
            return result;
        }



        [WebMethod(EnableSession = true)]
        public string DocCountClassWise(string date, string Level1, string endate, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId)
        {
            string result = string.Empty;
            try
            {
                #region Initialize

                var spocount = new System.Data.DataSet();
                _nvCollection.Clear();
                spocount.Clear();
                int year = 0, month = 0, endmonth = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }

                if (endate != "")
                {
                    endmonth = Convert.ToDateTime(endate).Month;
                }
                else
                {
                    endmonth = DateTime.Now.Month;
                }

                #endregion

                #region Filter By Role

                _nvCollection.Add("@Level1id-int", Level1.ToString());
                _nvCollection.Add("@Level2id-int", Level2.ToString());
                _nvCollection.Add("@Level3id-int", Level3.ToString());
                _nvCollection.Add("@Level4id-int", Level4.ToString());
                _nvCollection.Add("@Level5id-int", Level5.ToString());
                _nvCollection.Add("@Level6id-int", Level6.ToString());
                _nvCollection.Add("@EmployeeId-int", employeeId.ToString());
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                _nvCollection.Add("@Year-int", Convert.ToString(year));

                spocount = GetData("sp_doccountclasswise_dashboard", _nvCollection);


                #endregion

                if (spocount != null)
                {
                    if (spocount.Tables[0].Rows.Count > 0)
                    {
                        result = spocount.Tables[0].ToJsonString();
                    }
                }

            }
            catch (Exception exception)
            {

            }
            return result;
        }


        #endregion



        [WebMethod(EnableSession = true)]
        public string daysinfield(string date, string Level1, string endate, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId)
        {
            string result = string.Empty;
            try
            {
                #region Initialize

                var customercoverage = new System.Data.DataSet();
                _nvCollection.Clear();
                customercoverage.Clear();
                int year = 0, month = 0, endmonth = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }

                if (endate != "")
                {
                    endmonth = Convert.ToDateTime(endate).Month;
                }
                else
                {
                    endmonth = DateTime.Now.Month;
                }

                #endregion

                #region Filter By Role

                if (month == endmonth)
                {
                    _nvCollection.Add("@Level1id-int", Level1.ToString());
                    _nvCollection.Add("@Level2id-int", Level2.ToString());
                    _nvCollection.Add("@Level3id-int", Level3.ToString());
                    _nvCollection.Add("@Level4id-int", Level4.ToString());
                    _nvCollection.Add("@Level5id-int", Level5.ToString());
                    _nvCollection.Add("@Level6id-int", Level6.ToString());
                    _nvCollection.Add("@EmployeeId-int", employeeId.ToString());
                    _nvCollection.Add("@Month-int", Convert.ToString(month));
                    _nvCollection.Add("@Year-int", Convert.ToString(year));

                    customercoverage = GetData("sp_DaysInField", _nvCollection);

                }
                else
                {
                    _nvCollection.Add("@Level1id-int", Level1.ToString());
                    _nvCollection.Add("@Level2id-int", Level2.ToString());
                    _nvCollection.Add("@Level3id-int", Level3.ToString());
                    _nvCollection.Add("@Level4id-int", Level4.ToString());
                    _nvCollection.Add("@Level5id-int", Level5.ToString());
                    _nvCollection.Add("@Level6id-int", Level6.ToString());
                    _nvCollection.Add("@EmployeeId-int", employeeId.ToString());
                    _nvCollection.Add("@Month-int", Convert.ToString(month));
                    _nvCollection.Add("@Year-int", Convert.ToString(year));
                    _nvCollection.Add("@endmonth-int", Convert.ToString(endmonth));

                    customercoverage = GetData("sp_DaysInFielde", _nvCollection);

                }

                #endregion

                if (customercoverage != null)
                {
                    if (customercoverage.Tables[0].Rows.Count > 0)
                    {
                        result = customercoverage.Tables[0].ToJsonString();
                    }
                }

            }
            catch (Exception exception)
            {

            }
            return result;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string VisitBySpeciality(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6)
        {
            var VisitBySpeciality = new System.Data.DataSet();
            _nvCollection.Clear();
            VisitBySpeciality.Clear();
            int year = 0, month = 0;
            var targetVsActual = new DataTable();

            JavaScriptSerializer _jss = new JavaScriptSerializer();
            string result = string.Empty;
            var series = new Collection<DailyCallTrendSeri>();

            try
            {
                #region Initialize


                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }

                #endregion

                #region Filter By Role

                _nvCollection.Add("@Level3Id-int", Convert.ToString(Level3));
                _nvCollection.Add("@Level4Id-int", Convert.ToString(Level4));
                _nvCollection.Add("@Level5Id-int", Convert.ToString(Level5));
                _nvCollection.Add("@Level6Id-int", Convert.ToString(Level6));
                _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                _nvCollection.Add("@Year-int", Convert.ToString(year));
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                VisitBySpeciality = GetData("crmdashboard_SpecialityNew", _nvCollection);

                #endregion

                #region Initializing Chart

                var planCall = new ArrayList();

                foreach (DataRow item in VisitBySpeciality.Tables[0].Rows)
                {
                    planCall.Add(Convert.ToDouble(item["COUNT"]));
                }

                double[] PlanCall = (double[])planCall.ToArray(typeof(double));

                #endregion

                #region Place Values in Bar Chart
                series.Add(new DailyCallTrendSeri("Visits", PlanCall));
                result = _jss.Serialize(series);

                #endregion
            }
            catch (Exception exception)
            {
                // lblError.Text = "Exception is raised from PlannedVsActualCalls is " + exception.Message;
            }
            return result;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string VisitBySpecialityXaxisFill(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6)
        {
            var VisitBySpeciality = new System.Data.DataSet();
            _nvCollection.Clear();
            int year = 0, month = 0;
            VisitBySpeciality.Clear();
            var targetVsActual = new DataTable();

            JavaScriptSerializer _jss = new JavaScriptSerializer();
            string result = string.Empty;
            var series = new Collection<Xaxix>();

            try
            {
                #region Initialize

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }

                #endregion

                #region Filter By Role

                _nvCollection.Clear();
                _nvCollection.Add("@Level3Id-int", Convert.ToString(Level3));
                _nvCollection.Add("@Level4Id-int", Convert.ToString(Level4));
                _nvCollection.Add("@Level5Id-int", Convert.ToString(Level5));
                _nvCollection.Add("@Level6Id-int", Convert.ToString(Level6));
                _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(0));
                _nvCollection.Add("@month-int", Convert.ToString(month));
                _nvCollection.Add("@year-int", Convert.ToString(year));
                VisitBySpeciality = GetData("crmdashboard_SpecialityNew", _nvCollection);

                #endregion

                #region Initializing Chart
                foreach (DataRow item in VisitBySpeciality.Tables[0].Rows)
                {
                    series.Add(new Xaxix(item[0].ToString()));
                }

                #endregion


            }
            catch (Exception exception)
            {
                // lblError.Text = "Exception is raised from PlannedVsActualCalls is " + exception.Message;
            }
            //  return _jss.Serialize(result);
            return result = _jss.Serialize(series);
        }

        [WebMethod(EnableSession = true)]
        public string FillGridMioInfo(string Level4, string Level5, string Level6)
        {
            string returnstring = "";
            JavaScriptSerializer jss = new JavaScriptSerializer();
            _nvCollection.Clear();
            try
            {
                Level4 = (Level4 == "0") ? "1" : Level4;
                _nvCollection.Add("@level4id-int", Level4);
                _nvCollection.Add("@level5id-int", Level5);
                _nvCollection.Add("@level6id-int", Level6);
                DataSet ds = GetData("sp_selectempwithhierar", _nvCollection);
                var empid = 0;
                var empdetail = new DataSet();
                if (ds.Tables[0].Rows.Count > 0 || ds != null)
                {
                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        empid = Convert.ToInt32(dr["id"].ToString());
                        _nvCollection.Clear();
                        _nvCollection.Add("@empid-int", empid.ToString());
                        empdetail = GetData("GetEmployeeData", _nvCollection);
                        if (ds.Tables[0].Rows.Count > 0 || ds != null)
                        {
                            returnstring += empdetail.Tables[0].ToJsonString() + "|";
                        }
                    }
                }
            }
            catch (Exception ex)
            {

                throw;
            }
            return returnstring;
        }

        [WebMethod(EnableSession = true)]
        public string Mfillflmdetails(string Level3, string Level4, string Level5)
        {
            string returnstring = string.Empty;
            try
            {
                //Level3 = (Level3 == "0") ? "1" : Level3;
                if (Level3 == "0")
                {
                    Level3 = "1";
                    Level4 = "1";
                }

                var flmdetails = new DataTable();
                var flmid = new DataTable();
                var empdetail = new DataSet();
                _nvCollection.Clear();
                flmdetails.Clear();

                //_nvCollection.Add("@level3id-int", Level3);
                _nvCollection.Add("@level4id-int", Level4);
                _nvCollection.Add("@level5id-int", Level5);
                _nvCollection.Add("@level6id-int", "0");
                flmid = GetData("sp_selectempwithhierarFlm", _nvCollection).Tables[0];
                foreach (DataRow dr in flmid.Rows)
                {
                    var idd = dr["flmid"].ToString();

                    _nvCollection.Clear();
                    _nvCollection.Add("@flmid-int", idd);
                    flmdetails = GetData("sp_flmempid", _nvCollection).Tables[0];

                    ArrayList lst = new ArrayList();
                    ArrayList flmname = new ArrayList();
                    ArrayList flmmob = new ArrayList();

                    foreach (DataRow drr in flmdetails.Rows)
                    {
                        lst.Add(drr[3]);
                        flmname.Add(drr[1]);
                        flmmob.Add(drr[4]);
                    }
                    var empid = "";
                    for (int i = 0; i < lst.Count; i++)
                    {
                        empid = lst[i].ToString();

                        _nvCollection.Clear();
                        _nvCollection.Add("@empid-int", empid);
                        empdetail = GetData("GetEmployeeData", _nvCollection);

                        if (empdetail.Tables[0].Rows.Count != 0)
                        {
                            empdetail.Tables[0].Columns.Add("FlmName", typeof(string));
                            empdetail.Tables[0].Rows[0]["FlmName"] = flmname[i].ToString();
                            empdetail.Tables[0].Columns.Add("Flmobile", typeof(string));
                            empdetail.Tables[0].Rows[0]["Flmobile"] = flmmob[i].ToString();
                            returnstring += empdetail.Tables[0].ToJsonString() + "|";
                        }
                        else
                        {
                            DataRow newrow = empdetail.Tables[0].NewRow();

                            empdetail.Tables[0].Columns.Add("FlmName", typeof(string));
                            newrow["FlmName"] = flmname[i].ToString();
                            //empdetail.Tables[0].Rows[0]["FlmName"] = newrow["FlmName"];
                            empdetail.Tables[0].Columns.Add("Flmobile", typeof(string));
                            newrow["Flmobile"] = flmmob[i].ToString();
                            //empdetail.Tables[0].Rows[0]["Flmobile"] = flmmob[i].ToString();
                            newrow["TimeForCall"] = "00:00";
                            newrow["name"] = "--";
                            newrow["lastdocvisit"] = "--";
                            newrow["nextdoc"] = "--";
                            newrow["noofdocvisited"] = "0";
                            newrow["mobno"] = "--";
                            newrow["Latitude"] = "";
                            newrow["Longitude"] = "";


                            empdetail.Tables[0].Rows.Add(newrow);
                            returnstring += empdetail.Tables[0].ToJsonString() + "|";
                        }

                    }


                }



            }
            catch (Exception ex)
            {

                throw;
            }
            return returnstring;
        }

        [WebMethod(EnableSession = true)]
        public string totalviisit()
        {
            string returnstring = string.Empty;
            try
            {
                _nvCollection.Clear();
                var flmid = GetData("sp_totalvisits", _nvCollection).Tables[0];
                if (flmid != null)
                {
                    returnstring = flmid.ToJsonString();
                }
                else
                {
                    returnstring = "No";
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return returnstring;
        }

        [WebMethod(EnableSession = true)]
        public string FillGridMioLatlong(string Level4, string Level5, string Level6)
        {
            string returnstring = "";
            JavaScriptSerializer jss = new JavaScriptSerializer();
            _nvCollection.Clear();
            try
            {
                Level4 = (Level4 == "0") ? "1" : Level4;
                _nvCollection.Add("@level4id-int", Level4);
                _nvCollection.Add("@level5id-int", Level5);
                _nvCollection.Add("@level6id-int", Level6);
                DataSet ds = GetData("sp_selectempwithhierar", _nvCollection);
                var empid = 0;
                var empdetail = new DataSet();
                if (ds.Tables[0].Rows.Count > 0 || ds != null)
                {
                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        empid = Convert.ToInt32(dr["id"].ToString());
                        _nvCollection.Clear();
                        _nvCollection.Add("@empid-int", empid.ToString());
                        empdetail = GetData("GetEmployeelatlong", _nvCollection);
                        if (ds.Tables[0].Rows.Count > 0 || ds != null)
                        {
                            returnstring += empdetail.Tables[0].ToJsonString() + "|";
                        }
                    }
                }
            }
            catch (Exception ex)
            {

                throw;
            }
            return returnstring;
        }


        #endregion

        #region Private Methods
        private string ActualCalls(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6)
        {
            string result = string.Empty;
            try
            {
                #region Initialize

                var actualCalls = new System.Data.DataSet();
                _nvCollection.Clear();
                actualCalls.Clear();
                int year = 0, month = 0;

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }

                #endregion

                #region Filter By Role

                _nvCollection.Add("@Level3Id-int", _level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", _level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", _level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", _level6Id.ToString());
                _nvCollection.Add("@employeeid-int", _employeeId.ToString());
                _nvCollection.Add("@year-int", Convert.ToString(year));
                _nvCollection.Add("@month-int", Convert.ToString(month));
                actualCalls = GetData("pro_newDashboard", _nvCollection);

                #region Commented Work
                //if (_currentRole == "admin" || _currentRole == "headoffice")
                //{
                //    #region Filter By Level
                //    if (_hierarchyName == "Level3")
                //    {
                //        #region Filter With Hierarchy Levels

                //        _nvCollection.Add("@Level3Id-int", _level3Id.ToString());
                //        _nvCollection.Add("@Level4Id-int", _level4Id.ToString());
                //        _nvCollection.Add("@Level5Id-int", _level5Id.ToString());
                //        _nvCollection.Add("@Level6Id-int", _level6Id.ToString());
                //        _nvCollection.Add("@EmployeeId-bigint", _employeeId.ToString());
                //        _nvCollection.Add("@Year-int", Convert.ToString(year));
                //        _nvCollection.Add("@Month-int", Convert.ToString(month));
                //        actualCalls = GetData("sp_DActualCalls0Level3", _nvCollection);

                //        #endregion
                //    }
                //    #endregion
                //}
                //else if (_currentRole == "rl3")
                //{
                //    _nvCollection.Add("@Level3Id-int", _level3Id.ToString());
                //    _nvCollection.Add("@Level4Id-int", _level4Id.ToString());
                //    _nvCollection.Add("@Level5Id-int", _level5Id.ToString());
                //    _nvCollection.Add("@Level6Id-int", _level6Id.ToString());
                //    _nvCollection.Add("@EmployeeId-bigint", _employeeId.ToString());
                //    _nvCollection.Add("@Year-int", Convert.ToString(year));
                //    _nvCollection.Add("@Month-int", Convert.ToString(month));
                //    actualCalls = GetData("sp_DActualCalls3Level3", _nvCollection);
                //}
                //else if (_currentRole == "rl4")
                //{
                //    _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //    _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //    _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //    _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //    _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //    _nvCollection.Add("@Year-int", Convert.ToString(year));
                //    _nvCollection.Add("@Month-int", Convert.ToString(month));
                //    actualCalls = GetData("sp_DActualCalls4Level3", _nvCollection);
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
                //        _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //        _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //        _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //        _nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //        _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //        _nvCollection.Add("@Year-int", Convert.ToString(year));
                //        _nvCollection.Add("@Month-int", Convert.ToString(month));
                //        actualCalls = GetData("sp_DActualCalls5Level3", _nvCollection);
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
                //    _nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //    _nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //    _nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //    _nvCollection.Add("@Level6Id-int", Convert.ToString(_currentLevelId));
                //    _nvCollection.Add("@EmployeeId-bigint", Convert.ToString(_employeeId));
                //    _nvCollection.Add("@Year-int", Convert.ToString(year));
                //    _nvCollection.Add("@Month-int", Convert.ToString(month));
                //    actualCalls = GetData("sp_DActualCalls6Level3", _nvCollection);
                //}
                #endregion


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



                //var pieChart = new PieChart(360, 280, 0xFFFFFF, 0xD8D0C9, 0);
                //pieChart.setPieSize(180, 140, 100);
                //pieChart.addTitle(8, "ACTUAL CALLS (MTD)", "News Gothic MT Bold", 10, 0xFFFFFFF, 0xA28F7F, 0xA28F7F);
                //pieChart.set3D(25, 55.0);
                //pieChart.setData(Data, Label);
                //pieChart.setExplode(0);
                //wcvActuallCall.Image = pieChart.makeWebImage(Chart.PNG);
                //wcvActuallCall.ImageMap = pieChart.getHTMLImageMap("", "", "title='{label}: {value} Calls ({percent}%)'");

                #endregion
            }
            catch (Exception exception)
            {

            }
            return result;
        }

        #endregion




        #region CCL New DashBoard Working Here

        //New DB Customer Coverage
        [WebMethod(EnableSession = true)]
        public string customercoveragebyclassForNewDb(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId)
        {
            string result = string.Empty;
            try
            {
                #region Initialize

                var customercoverage = new System.Data.DataSet();
                _nvCollection.Clear();
                customercoverage.Clear();
                int year = 0, month = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }

                #endregion

                #region Filter By Role

                _nvCollection.Add("@Level1id-int", Level3.ToString());
                _nvCollection.Add("@Level2id-int", Level3.ToString());
                _nvCollection.Add("@Level3id-int", Level3.ToString());
                _nvCollection.Add("@Level4id-int", Level4.ToString());
                _nvCollection.Add("@Level5id-int", Level5.ToString());
                _nvCollection.Add("@Level6id-int", Level6.ToString());
                _nvCollection.Add("@EmployeeId-int", employeeId.ToString());
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                _nvCollection.Add("@Year-int", Convert.ToString(year));

                customercoverage = GetData("sp_customerCuverageByClass_NEW", _nvCollection);


                #endregion

                if (customercoverage.Tables[0].Rows.Count > 0)
                {
                    result = customercoverage.Tables[0].ToJsonString();
                }

            }
            catch (Exception exception)
            {

            }
            return result;
        }

        //New DB Productive Frequency
        [WebMethod(EnableSession = true)]
        public string ProdFreClassForNewDb(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId)
        {
            string result = string.Empty;
            try
            {
                #region Initialize

                var classProdFreq = new System.Data.DataSet();
                _nvCollection.Clear();
                classProdFreq.Clear();
                int year = 0, month = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }


                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }

                #endregion

                #region Filter By Role

                _nvCollection.Add("@Level1id-int", Level3.ToString());
                _nvCollection.Add("@Level2id-int", Level3.ToString());
                _nvCollection.Add("@Level3id-int", Level3.ToString());
                _nvCollection.Add("@Level4id-int", Level4.ToString());
                _nvCollection.Add("@Level5id-int", Level5.ToString());
                _nvCollection.Add("@Level6id-int", Level6.ToString());
                _nvCollection.Add("@EmployeeId-int", employeeId.ToString());
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                _nvCollection.Add("@Year-int", Convert.ToString(year));

                classProdFreq = GetData("sp_class_prodfreq_New", _nvCollection);


                #endregion

                if (classProdFreq != null)
                {
                    if (classProdFreq.Tables[0].Rows.Count > 0)
                    {
                        result = classProdFreq.Tables[0].ToJsonString();
                    }
                }
            }
            catch (Exception exception)
            {

            }
            return result;
        }

        //New DB Daily Call Information Table
        [WebMethod(EnableSession = true)]
        public List<DailyCallForNewDb> DailyCallForNewDb(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId)
        {
            List<DailyCallForNewDb> DCForNewDb = new List<DailyCallForNewDb>();
            try
            {
                #region Initialize


                var dailyCallTrendfornewdb = new System.Data.DataSet();
                dailyCallTrendfornewdb.Clear();
                _nvCollection.Clear();
                int year = 0, month = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }


                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }

                #endregion


                #region Filter By Role


                _nvCollection.Add("@Level1Id-int", Convert.ToString(Level1));
                _nvCollection.Add("@Level2Id-int", Convert.ToString(Level2));
                _nvCollection.Add("@Level3Id-int", Convert.ToString(Level3));
                _nvCollection.Add("@Level4Id-int", Convert.ToString(Level4));
                _nvCollection.Add("@Level5Id-int", Convert.ToString(Level5));
                _nvCollection.Add("@Level6Id-int", Convert.ToString(Level6));
                _nvCollection.Add("@EmployeeId-bigint", employeeId.ToString());
                _nvCollection.Add("@Year-int", Convert.ToString(year));
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                //dailyCallTrend = GetData("crmdashboard_DailyCallTrend", _nvCollection);
                dailyCallTrendfornewdb = GetData("crmdashboard_DailyCallTrend_NewDashboard", _nvCollection);


                //for (int i = 0; i < dailyCallTrend.Tables[0].Rows.Count; i++)
                //{
                //    t5.Add(new DailyCall(dailyCallTrend.Tables[0].Rows[i]["Days"].ToString(), dailyCallTrend.Tables[0].Rows[i]["CorrectSMS"].ToString(), dailyCallTrend.Tables[0].Rows[i]["FMIOs"].ToString(), dailyCallTrend.Tables[0].Rows[i]["AVGC"].ToString()));
                //}

                for (int i = 0; i < dailyCallTrendfornewdb.Tables[0].Rows.Count; i++)
                {//dname
                    DCForNewDb.Add(new DailyCallForNewDb(dailyCallTrendfornewdb.Tables[0].Rows[i]["dayname"].ToString(), dailyCallTrendfornewdb.Tables[0].Rows[i]["Days"].ToString(), dailyCallTrendfornewdb.Tables[0].Rows[i]["CorrectSMS"].ToString(), dailyCallTrendfornewdb.Tables[0].Rows[i]["FMIOs"].ToString(), dailyCallTrendfornewdb.Tables[0].Rows[i]["AVGC"].ToString(), dailyCallTrendfornewdb.Tables[0].Rows[i]["TMIOs"].ToString(), dailyCallTrendfornewdb.Tables[0].Rows[i]["Vacancies"].ToString(), dailyCallTrendfornewdb.Tables[0].Rows[i]["TMLeave"].ToString(), dailyCallTrendfornewdb.Tables[0].Rows[i]["Meeting"].ToString(), dailyCallTrendfornewdb.Tables[0].Rows[i]["InRange"].ToString(), dailyCallTrendfornewdb.Tables[0].Rows[i]["OutRange"].ToString(), dailyCallTrendfornewdb.Tables[0].Rows[i]["MeetingStart"].ToString(), dailyCallTrendfornewdb.Tables[0].Rows[i]["sickLeave"].ToString()));
                }

                #endregion



            }
            catch (Exception exception)
            {

            }

            return DCForNewDb;
        }

        //NEW DB RSM TEAM CALL AVG
        [WebMethod(EnableSession = true)]
        public List<Top5MRFinalNewDB> TopMRFinalNewDB(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId)
        {

            List<Top5MRFinalNewDB> FinalList = new List<Top5MRFinalNewDB>();
            List<Top5MR1NewDB> tC = new List<Top5MR1NewDB>();
            List<Top5MR2NewDB> tG = new List<Top5MR2NewDB>();
            List<Top5MR3NewDB> tB = new List<Top5MR3NewDB>();
            List<Top5MR4NewDB> tO = new List<Top5MR4NewDB>();
            List<Top5MR5NewDB> tW = new List<Top5MR5NewDB>();
            List<Top5MR6NewDB> tH = new List<Top5MR6NewDB>();
            List<Top5MR7NewDB> tP = new List<Top5MR7NewDB>();
            List<Top5MR8NewDB> taa = new List<Top5MR8NewDB>();
            List<Top5MR9NewDB> tab = new List<Top5MR9NewDB>();
            List<Top5MR10NewDB> tac = new List<Top5MR10NewDB>();
            List<Top5MR11NewDB> tad = new List<Top5MR11NewDB>();
            List<Top5MR12NewDB> tae = new List<Top5MR12NewDB>();
            List<Top5MR13NewDB> taf = new List<Top5MR13NewDB>();
            List<Top5MR14NewDB> tag = new List<Top5MR14NewDB>();
            List<Top5MR15NewDB> tah = new List<Top5MR15NewDB>();
            List<Top5MR16NewDB> tai = new List<Top5MR16NewDB>();

            try
            {
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                if (_currentUserRole != "rl6")
                {
                    #region Initialize

                    var top5MR = new System.Data.DataSet();

                    _nvCollection.Clear();
                    top5MR.Clear();


                    int year = 0, month = 0;

                    double employeeId = 0;

                    if (Level6 != "0")
                    {
                        employeeId = Convert.ToInt64(EmployeeId);
                    }
                    else
                    {
                        employeeId = 0;
                    }

                    #endregion

                    #region Set Year + Month

                    if (date != "")
                    {
                        year = Convert.ToDateTime(date).Year;
                        month = Convert.ToDateTime(date).Month;
                    }
                    else
                    {
                        year = DateTime.Now.Year;
                        month = DateTime.Now.Month;
                    }

                    #endregion

                    #region Filter By Role


                    #region Setting Up Parameters

                    _nvCollection.Add("@LevelName-NVARCHAR(100)", _hierarchyName);
                    _nvCollection.Add("@Level1Id-int", Convert.ToString(0));
                    _nvCollection.Add("@Level2Id-int", Convert.ToString(0));
                    _nvCollection.Add("@Level3Id-int", Convert.ToString(Level3));
                    _nvCollection.Add("@Level4Id-int", Convert.ToString(Level4));
                    _nvCollection.Add("@Level5Id-int", Convert.ToString(Level5));
                    _nvCollection.Add("@Level6Id-int", Convert.ToString(Level6));
                    _nvCollection.Add("@EmployeeId-bigint", employeeId.ToString());
                    _nvCollection.Add("@Year-int", Convert.ToString(year));
                    _nvCollection.Add("@Month-int", Convert.ToString(month));

                    top5MR = GetData("sp_MRCallsAvg", _nvCollection);
                    //result = top5MR.Tables[0].ToJsonString();
                    #endregion

                    #region Get Top 5 & Bottom 5 MR
                    var intAcerTeam = 0;
                    var intAdvanceTeam = 0;
                    var intAlphaTeam = 0;
                    var intDynamicTeam = 0;
                    var intEliteTeam = 0;
                    var intExamplerTeam = 0;
                    var intGalaxyTeam = 0;//Hospicare Team Pulmocare Team
                    var intInternationalAcer = 0;
                    var intInternationalMax = 0;
                    var intMassTeam = 0;
                    var intMatrixTeam = 0;
                    var intMaxTeam = 0;
                    var intNationtesting = 0;
                    var intPacerTeam = 0;
                    var intSpecialtyTeam = 0;
                    var intStarTeam = 0;

                    for (int i = 0; i < top5MR.Tables[0].Rows.Count; i++)
                    {
                        if (top5MR.Tables[0].Rows[i]["Team"].ToString() == "Acer Team")
                        {
                            intAcerTeam = intAcerTeam + 1;
                            tC.Add(new Top5MR1NewDB(top5MR.Tables[0].Rows[i]["MR"].ToString(), top5MR.Tables[0].Rows[i]["Avg"].ToString()));
                        }
                        if (top5MR.Tables[0].Rows[i]["Team"].ToString() == "Advance Team")
                        {
                            intAdvanceTeam = intAdvanceTeam + 1;
                            tG.Add(new Top5MR2NewDB(top5MR.Tables[0].Rows[i]["MR"].ToString(), top5MR.Tables[0].Rows[i]["Avg"].ToString()));
                        }
                        if (top5MR.Tables[0].Rows[i]["Team"].ToString() == "Alpha Team")
                        {
                            intAlphaTeam = intAlphaTeam + 1;
                            tB.Add(new Top5MR3NewDB(top5MR.Tables[0].Rows[i]["MR"].ToString(), top5MR.Tables[0].Rows[i]["Avg"].ToString()));
                        }
                        if (top5MR.Tables[0].Rows[i]["Team"].ToString() == "Dynamic Team")
                        {
                            intDynamicTeam = intDynamicTeam + 1;
                            tO.Add(new Top5MR4NewDB(top5MR.Tables[0].Rows[i]["MR"].ToString(), top5MR.Tables[0].Rows[i]["Avg"].ToString()));
                        }
                        if (top5MR.Tables[0].Rows[i]["Team"].ToString() == "Elite Team")
                        {
                            intEliteTeam = intEliteTeam + 1;
                            tW.Add(new Top5MR5NewDB(top5MR.Tables[0].Rows[i]["MR"].ToString(), top5MR.Tables[0].Rows[i]["Avg"].ToString()));
                        }
                        if (top5MR.Tables[0].Rows[i]["Team"].ToString() == "Exampler Team")
                        {
                            intExamplerTeam = intExamplerTeam + 1;
                            tH.Add(new Top5MR6NewDB(top5MR.Tables[0].Rows[i]["MR"].ToString(), top5MR.Tables[0].Rows[i]["Avg"].ToString()));
                        }
                        if (top5MR.Tables[0].Rows[i]["Team"].ToString() == "Galaxy Team")
                        {
                            intGalaxyTeam = intGalaxyTeam + 1;
                            tP.Add(new Top5MR7NewDB(top5MR.Tables[0].Rows[i]["MR"].ToString(), top5MR.Tables[0].Rows[i]["Avg"].ToString()));
                        }
                        if (top5MR.Tables[0].Rows[i]["Team"].ToString() == "International Acer")
                        {
                            intInternationalAcer = intInternationalAcer + 1;
                            taa.Add(new Top5MR8NewDB(top5MR.Tables[0].Rows[i]["MR"].ToString(), top5MR.Tables[0].Rows[i]["Avg"].ToString()));
                        }
                        if (top5MR.Tables[0].Rows[i]["Team"].ToString() == "International Max")
                        {
                            intInternationalMax = intInternationalMax + 1;
                            tab.Add(new Top5MR9NewDB(top5MR.Tables[0].Rows[i]["MR"].ToString(), top5MR.Tables[0].Rows[i]["Avg"].ToString()));
                        }
                        if (top5MR.Tables[0].Rows[i]["Team"].ToString() == "MassTeam")
                        {
                            intMassTeam = intMassTeam + 1;
                            tac.Add(new Top5MR10NewDB(top5MR.Tables[0].Rows[i]["MR"].ToString(), top5MR.Tables[0].Rows[i]["Avg"].ToString()));
                        }
                        if (top5MR.Tables[0].Rows[i]["Team"].ToString() == "Matrix Team")
                        {
                            intMatrixTeam = intMatrixTeam + 1;
                            tad.Add(new Top5MR11NewDB(top5MR.Tables[0].Rows[i]["MR"].ToString(), top5MR.Tables[0].Rows[i]["Avg"].ToString()));
                        }
                        if (top5MR.Tables[0].Rows[i]["Team"].ToString() == "MaxTeam")
                        {
                            intMaxTeam = intMaxTeam + 1;
                            tae.Add(new Top5MR12NewDB(top5MR.Tables[0].Rows[i]["MR"].ToString(), top5MR.Tables[0].Rows[i]["Avg"].ToString()));
                        }
                        if (top5MR.Tables[0].Rows[i]["Team"].ToString() == "Nationtesting")
                        {
                            intNationtesting = intNationtesting + 1;
                            taf.Add(new Top5MR13NewDB(top5MR.Tables[0].Rows[i]["MR"].ToString(), top5MR.Tables[0].Rows[i]["Avg"].ToString()));
                        }
                        if (top5MR.Tables[0].Rows[i]["Team"].ToString() == "Pacer Team")
                        {
                            intPacerTeam = intPacerTeam + 1;
                            tag.Add(new Top5MR14NewDB(top5MR.Tables[0].Rows[i]["MR"].ToString(), top5MR.Tables[0].Rows[i]["Avg"].ToString()));
                        }
                        if (top5MR.Tables[0].Rows[i]["Team"].ToString() == "Specialty Team")
                        {
                            intSpecialtyTeam = intSpecialtyTeam + 1;
                            tah.Add(new Top5MR15NewDB(top5MR.Tables[0].Rows[i]["MR"].ToString(), top5MR.Tables[0].Rows[i]["Avg"].ToString()));
                        }
                        if (top5MR.Tables[0].Rows[i]["Team"].ToString() == "Star Team")
                        {
                            intStarTeam = intStarTeam + 1;
                            tai.Add(new Top5MR16NewDB(top5MR.Tables[0].Rows[i]["MR"].ToString(), top5MR.Tables[0].Rows[i]["Avg"].ToString()));
                        }
                    }
                    int topten = 10;
                    if (tG.Count != topten)
                    {
                        for (int l = tG.Count; l < topten; l++)
                        {
                            tG.Add(new Top5MR2NewDB("-", "-"));
                        }
                    }
                    if (tB.Count != topten)
                    {
                        for (int l = tB.Count; l < topten; l++)
                        {
                            tB.Add(new Top5MR3NewDB("-", "-"));
                        }
                    }
                    if (tO.Count != topten)
                    {
                        for (int l = tO.Count; l < topten; l++)
                        {
                            tO.Add(new Top5MR4NewDB("-", "-"));
                        }
                    }
                    if (tW.Count != topten)
                    {
                        for (int l = tW.Count; l < topten; l++)
                        {
                            tW.Add(new Top5MR5NewDB("-", "-"));
                        }
                    }
                    if (tH.Count != topten)
                    {
                        for (int l = tH.Count; l < topten; l++)
                        {
                            tH.Add(new Top5MR6NewDB("-", "-"));
                        }
                    }
                    if (tP.Count != topten)
                    {
                        for (int l = tP.Count; l < topten; l++)
                        {
                            tP.Add(new Top5MR7NewDB("-", "-"));
                        }
                    }

                    if (taa.Count != topten)
                    {
                        for (int l = taa.Count; l < topten; l++)
                        {
                            taa.Add(new Top5MR8NewDB("-", "-"));
                        }
                    }


                    if (tab.Count != topten)
                    {
                        for (int l = tab.Count; l < topten; l++)
                        {
                            tab.Add(new Top5MR9NewDB("-", "-"));
                        }
                    }


                    if (tac.Count != topten)
                    {
                        for (int l = tac.Count; l < topten; l++)
                        {
                            tac.Add(new Top5MR10NewDB("-", "-"));
                        }
                    }

                    if (tad.Count != topten)
                    {
                        for (int l = tad.Count; l < topten; l++)
                        {
                            tad.Add(new Top5MR11NewDB("-", "-"));
                        }
                    }

                    if (tae.Count != topten)
                    {
                        for (int l = tae.Count; l < topten; l++)
                        {
                            tae.Add(new Top5MR12NewDB("-", "-"));
                        }
                    }


                    if (taf.Count != topten)
                    {
                        for (int l = taf.Count; l < topten; l++)
                        {
                            taf.Add(new Top5MR13NewDB("-", "-"));
                        }
                    }

                    if (tag.Count != topten)
                    {
                        for (int l = tag.Count; l < topten; l++)
                        {
                            tag.Add(new Top5MR14NewDB("-", "-"));
                        }
                    }

                    if (tah.Count != topten)
                    {
                        for (int l = tah.Count; l < topten; l++)
                        {
                            tah.Add(new Top5MR15NewDB("-", "-"));
                        }
                    }


                    if (tai.Count != topten)
                    {
                        for (int l = tai.Count; l < topten; l++)
                        {
                            tai.Add(new Top5MR16NewDB("-", "-"));
                        }
                    }


                    for (int j = 0; j < tC.Count; j++)
                    {
                        FinalList.Add(new Top5MRFinalNewDB(
                            tC[j].mr.ToString(), tC[j].acer_Team.ToString(),
                            tG[j].mr2.ToString(), tG[j].advance_Team.ToString(),
                            tB[j].mr3.ToString(), tB[j].alpha_Team.ToString(),
                            tO[j].mr4.ToString(), tO[j].dynamic_Team.ToString(),
                            tW[j].mr5.ToString(), tW[j].elite_Team.ToString(),
                            tH[j].mr6.ToString(), tH[j].exampler_Team.ToString(),
                            tP[j].mr7.ToString(), tP[j].galaxy_Team.ToString(),
                            taa[j].mr7.ToString(), taa[j].international_Acer.ToString(),
                            tab[j].mr7.ToString(), tab[j].internationalMax.ToString(),
                            tac[j].mr7.ToString(), tac[j].massTeam.ToString(),
                            tad[j].mr7.ToString(), tad[j].matrixTeam.ToString(),
                            tae[j].mr7.ToString(), tae[j].maxTeam.ToString(),
                            taf[j].mr7.ToString(), taf[j].nationtesting.ToString(),
                            tag[j].mr7.ToString(), tag[j].pacerTeam.ToString(),
                            tah[j].mr7.ToString(), tah[j].specialty_Team.ToString(),
                            tai[j].mr7.ToString(), tai[j].star_Team.ToString()

                            ));
                    }

                    #endregion
                    #endregion
                }
                else
                {
                }
            }
            catch (Exception exception)
            {

            }

            return FinalList;

        }

        //NEW DB Call Avg For TeamWise
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAverageCallsForTeam(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId)
        {
            string result = string.Empty;
            var series = new Collection<DailyCallTrendSeri>();
            try
            {
                #region Initialize

                var avgCalls = new System.Data.DataSet();
                _nvCollection.Clear();
                avgCalls.Clear();
                int year = 0, month = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }

                #endregion

                #region Filter By Role

                _nvCollection.Add("@Level1Id-int", Convert.ToString(Level1));
                _nvCollection.Add("@Level2Id-int", Convert.ToString(Level2));
                _nvCollection.Add("@Level3Id-int", Convert.ToString(Level3));
                _nvCollection.Add("@Level4Id-int", Convert.ToString(Level4));
                _nvCollection.Add("@Level5Id-int", Convert.ToString(Level5));
                _nvCollection.Add("@Level6Id-int", Convert.ToString(Level6));
                _nvCollection.Add("@EmployeeId-bigint", employeeId.ToString());
                _nvCollection.Add("@Year-int", Convert.ToString(year));
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                avgCalls = GetData("crmdashboard_DAvgCalls_NewDB", _nvCollection);


                #endregion

                #region Initializing and Place values in Race Meter

                if (avgCalls != null)
                {
                    if (avgCalls.Tables[0].Rows.Count > 0)
                    {
                        result = avgCalls.Tables[0].ToJsonString();
                    }
                    else
                    {
                        DataTable table1 = new DataTable("demoAvgCall");

                        table1.Columns.Add("CallAvg");
                        table1.Columns.Add("Division");
                        table1.Columns.Add("DivisionID");
                        table1.Rows.Add("0", "Cardio", 1);
                        table1.Rows.Add("0", "Green", 2);
                        table1.Rows.Add("0", "Blue", 3);
                        table1.Rows.Add("0", "Oncology", 4);
                        table1.Rows.Add("0", "Women", 5);
                        table1.Rows.Add("0", "Hospicare", 6);
                        table1.Rows.Add("0", "Pulmocare", 7);

                        DataSet dset = new DataSet();
                        dset.Tables.Add(table1);
                        result = dset.Tables[0].ToJsonString();
                    }
                }

                #endregion
            }
            catch (Exception exception)
            {
            }
            return result;
        }

        //NEW DB Planned Vs Actual Calls
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string PlannedVsActualCallsForNewDb(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId)
        {
            var plannedVSactualCallsForTeam = new System.Data.DataSet();
            _nvCollection.Clear();
            plannedVSactualCallsForTeam.Clear();
            int year = 0, month = 0;
            //var targetVsActual = new DataTable();

            double employeeId = 0;

            if (Level6 != "0")
            {
                employeeId = Convert.ToInt64(EmployeeId);
            }
            else
            {
                employeeId = 0;
            }

            //JavaScriptSerializer _jss = new JavaScriptSerializer();
            string result1 = string.Empty;
            //var series = new Collection<DailyCallTrendSeri>();

            try
            {
                #region Initialize


                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }

                #endregion

                #region Filter By Role

                _nvCollection.Add("@Level1Id-int", Convert.ToString(Level1));
                _nvCollection.Add("@Level2Id-int", Convert.ToString(Level2));
                _nvCollection.Add("@Level3Id-int", Convert.ToString(Level3));
                _nvCollection.Add("@Level4Id-int", Convert.ToString(Level4));
                _nvCollection.Add("@Level5Id-int", Convert.ToString(Level5));
                _nvCollection.Add("@Level6Id-int", Convert.ToString(Level6));
                _nvCollection.Add("@EmployeeId-bigint", employeeId.ToString());
                _nvCollection.Add("@Year-int", Convert.ToString(year));
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                plannedVSactualCallsForTeam = GetData("crmdasboard_planedvsactual1_ForTeamWise", _nvCollection);
                result1 = plannedVSactualCallsForTeam.Tables[0].ToJsonString();

                #endregion
            }
            catch (Exception exception)
            {
                // lblError.Text = "Exception is raised from PlannedVsActualCalls is " + exception.Message;
            }
            return result1;
        }

        //NEW DB Start Daily Call Trend Work
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string StartDailyCallTrendWorkForNewDb(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId)
        {
            #region Object Intialization
            //JavaScriptSerializer _jss = new JavaScriptSerializer();
            string result = string.Empty;
            //var series = new Collection<DailyCallTrendSeri>();
            #endregion

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

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
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

                _nvCollection.Add("@Level1Id-int", Convert.ToString(Level1));
                _nvCollection.Add("@Level2Id-int", Convert.ToString(Level2));
                _nvCollection.Add("@Level3Id-int", Convert.ToString(Level3));
                _nvCollection.Add("@Level4Id-int", Convert.ToString(Level4));
                _nvCollection.Add("@Level5Id-int", Convert.ToString(Level5));
                _nvCollection.Add("@Level6Id-int", Convert.ToString(Level6));
                _nvCollection.Add("@EmployeeId-bigint", employeeId.ToString());
                _nvCollection.Add("@Year-int", Convert.ToString(year));
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                dailyCallTrend = GetData("crmdashboard_DailyCallTrend_new", _nvCollection);
                result = dailyCallTrend.Tables[0].ToJsonString();

                #endregion
            }
            catch (Exception exception)
            {
                //lblError.Text = "Exception   is raised from DailyCallTrend is " + exception.Message;
            }

            return result;
        }



        #endregion


        [WebMethod(EnableSession = true)]
        public string FillEmployeesLevel6(string TeamID)
        {
            string returnstring = "";
            try
            {
                _nvCollection.Clear();
                //_nvCollection.Add("@TeamID-INT", TeamID.ToString());
                _nvCollection.Add("@TeamID-INT", (TeamID == "null") ? "-1" : TeamID.ToString());
                DataSet ds = GetData("sp_SelectEmployeesforlevel6", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0 || ds != null)
                {
                    returnstring = ds.Tables[0].ToJsonString();
                }

            }
            catch (Exception ex)
            {

                throw;
            }
            return returnstring;
        }
    }




    #region CCL New Dashboard Work Here
    [Serializable]
    public class Top5MRFinalNewDB
    {
        public Top5MRFinalNewDB(
            string MR, string Acer_Team,
            string MR2, string Advance_Team,
            string MR3, string Alpha_Team,
            string MR4, string Dynamic_Team,
            string MR5, string Elite_Team,
            string MR6, string Exampler_Team,
            string MR7, string Galaxy_Team,
            string MR8, string International_Acer,
            string MR9, string International_Max,
            string MR10, string MassTeam,
            string MR11, string Matrix_Team,
            string MR12, string Max_Team,
            string MR13, string Nationtesting,
            string MR14, string Pacer_Team,
            string MR15, string Specialty_Team,
            string MR16, string Star_Team
            )
        {
            mr = MR;
            acer_Team = Acer_Team;

            mr2 = MR2;
            advance_Team = Advance_Team;

            mr3 = MR3;
            alpha_Team = Alpha_Team;

            mr4 = MR4;
            dynamic_Team = Dynamic_Team;

            mr5 = MR5;
            elite_Team = Elite_Team;

            mr6 = MR6;
            exampler_Team = Exampler_Team;

            mr7 = MR7;
            galaxy_Team = Galaxy_Team;


            mr8 = MR8;
            international_Acer = International_Acer;

            mr9 = MR9;
            international_Max = International_Max;

            mr10 = MR10;
            massTeam = MassTeam;

            mr11 = MR11;
            matrix_Team = Matrix_Team;

            mr12 = MR12;
            max_Team = Max_Team;

            mr13 = MR13;
            nationtesting = Nationtesting;

            mr14 = MR14;
            pacer_Team = Pacer_Team;

            mr15 = MR15;
            specialty_Team = Specialty_Team;

            mr16 = MR16;
            star_Team = Star_Team;


        }
        public string mr { get; set; }
        public string acer_Team { get; set; }
        public string mr2 { get; set; }
        public string advance_Team { get; set; }
        public string mr3 { get; set; }
        public string alpha_Team { get; set; }
        public string mr4 { get; set; }
        public string dynamic_Team { get; set; }
        public string mr5 { get; set; }
        public string elite_Team { get; set; }
        public string mr6 { get; set; }
        public string exampler_Team { get; set; }
        public string mr7 { get; set; }
        public string galaxy_Team { get; set; }

        public string mr8 { get; set; }
        public string international_Acer { get; set; }

        public string mr9 { get; set; }
        public string international_Max { get; set; }

        public string mr10 { get; set; }
        public string massTeam { get; set; }

        public string mr11 { get; set; }
        public string matrix_Team { get; set; }

        public string mr12 { get; set; }
        public string max_Team { get; set; }

        public string mr13 { get; set; }
        public string nationtesting { get; set; }

        public string mr14 { get; set; }
        public string pacer_Team { get; set; }

        public string mr15 { get; set; }
        public string specialty_Team { get; set; }

        public string mr16 { get; set; }
        public string star_Team { get; set; }

    }
    public class Top5MR1NewDB
    {
        public Top5MR1NewDB(string MR, string Acer_Team)
        {
            mr = MR;
            acer_Team = Acer_Team;
        }
        public string mr { get; set; }
        public string acer_Team { get; set; }
    }
    public class Top5MR2NewDB
    {
        public Top5MR2NewDB(string MR2, string Advance_Team)
        {
            mr2 = MR2;
            advance_Team = Advance_Team;

        }
        public string mr2 { get; set; }
        public string advance_Team { get; set; }
    }
    public class Top5MR3NewDB
    {
        public Top5MR3NewDB(string MR3, string Alpha_Team)
        {
            mr3 = MR3;
            alpha_Team = Alpha_Team;

        }
        public string mr3 { get; set; }
        public string alpha_Team { get; set; }

    }
    public class Top5MR4NewDB
    {
        public Top5MR4NewDB(string MR4, string Dynamic_Team)
        {
            mr4 = MR4;
            dynamic_Team = Dynamic_Team;

        }
        public string mr4 { get; set; }
        public string dynamic_Team { get; set; }

    }
    public class Top5MR5NewDB
    {
        public Top5MR5NewDB(string MR5, string Elite_Team)
        {
            mr5 = MR5;
            elite_Team = Elite_Team;

        }
        public string mr5 { get; set; }
        public string elite_Team { get; set; }

    }

    public class Top5MR6NewDB
    {
        public Top5MR6NewDB(string MR6, string Exampler_Team)
        {
            mr6 = MR6;
            exampler_Team = Exampler_Team;

        }
        public string mr6 { get; set; }
        public string exampler_Team { get; set; }

    }

    public class Top5MR7NewDB
    {
        public Top5MR7NewDB(string MR7, string Galaxy_Team)
        {
            mr7 = MR7;
            galaxy_Team = Galaxy_Team;

        }
        public string mr7 { get; set; }
        public string galaxy_Team { get; set; }

    }

    public class Top5MR8NewDB
    {
        public Top5MR8NewDB(string MR7, string International_Acer)
        {
            mr7 = MR7;
            international_Acer = International_Acer;

        }
        public string mr7 { get; set; }
        public string international_Acer { get; set; }

    }

    public class Top5MR9NewDB
    {
        public Top5MR9NewDB(string MR7, string InternationalMax)
        {
            mr7 = MR7;
            internationalMax = InternationalMax;

        }
        public string mr7 { get; set; }
        public string internationalMax { get; set; }

    }

    public class Top5MR10NewDB
    {
        public Top5MR10NewDB(string MR7, string MassTeam)
        {
            mr7 = MR7;
            massTeam = MassTeam;

        }
        public string mr7 { get; set; }
        public string massTeam { get; set; }

    }


    public class Top5MR11NewDB
    {
        public Top5MR11NewDB(string MR7, string MatrixTeam)
        {
            mr7 = MR7;
            matrixTeam = MatrixTeam;

        }
        public string mr7 { get; set; }
        public string matrixTeam { get; set; }

    }


    public class Top5MR12NewDB
    {
        public Top5MR12NewDB(string MR7, string MaxTeam)
        {
            mr7 = MR7;
            maxTeam = MaxTeam;

        }
        public string mr7 { get; set; }
        public string maxTeam { get; set; }

    }

    public class Top5MR13NewDB
    {
        public Top5MR13NewDB(string MR7, string Nationtesting)
        {
            mr7 = MR7;
            nationtesting = Nationtesting;

        }
        public string mr7 { get; set; }
        public string nationtesting { get; set; }

    }

    public class Top5MR14NewDB
    {
        public Top5MR14NewDB(string MR7, string PacerTeam)
        {
            mr7 = MR7;
            pacerTeam = PacerTeam;

        }
        public string mr7 { get; set; }
        public string pacerTeam { get; set; }

    }


    public class Top5MR15NewDB
    {
        public Top5MR15NewDB(string MR7, string Specialty_Team)
        {
            mr7 = MR7;
            specialty_Team = Specialty_Team;

        }
        public string mr7 { get; set; }
        public string specialty_Team { get; set; }

    }

    public class Top5MR16NewDB
    {
        public Top5MR16NewDB(string MR7, string Star_Team)
        {
            mr7 = MR7;
            star_Team = Star_Team;

        }
        public string mr7 { get; set; }
        public string star_Team { get; set; }

    }



    [Serializable]
    public class DailyCallForNewDb
    {
        public DailyCallForNewDb(string dayname, string DAYS, string CORRECTSMS, string FMIOs, string AVGC, string TMIOs, string Vacancies, string TM_on_PL, string Meeting, string Inrange, string OutRange, string meetst, string sickLeave)
        {
            days = DAYS;
            correctsms = CORRECTSMS;
            mios = FMIOs;
            avgc = AVGC;
            tmios = TMIOs;
            vacancies = Vacancies;
            tmpl = TM_on_PL;
            meeting = Meeting;
            inrange = Inrange;
            outrange = OutRange;
            Meetst = meetst;
            Dayname = dayname;
            SKleave = sickLeave;
        }
        public string Dayname { get; set; }
        public string days { get; set; }
        public string correctsms { get; set; }
        public string mios { get; set; }
        public string avgc { get; set; }
        public string tmios { get; set; }
        public string vacancies { get; set; }
        public string tmpl { get; set; }
        public string meeting { get; set; }

        public string inrange { get; set; }
        public string outrange { get; set; }
        public string Meetst { get; set; }
        public string SKleave { get; set; }
    }

    #endregion


}
