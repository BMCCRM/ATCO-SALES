using CrystalDecisions.CrystalReports.Engine;
using DatabaseLayer.SQL;
using PocketDCR.CustomMembershipProvider;
using PocketDCR2.Classes;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;

namespace PocketDCR2.Reports
{
    /// <summary>
    /// Summary description for PlanStatusWindow
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class PlanStatusWindow : System.Web.Services.WebService
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
                Constants.ErrorLog("Exception Raising From DAL In NewReport.aspx | " + exception.Message + " | Stack Trace : |" + exception.StackTrace + "|| Procedure Name :" + SpName);

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

        #region Object Intializtion
        private ReportDocument rpt = new ReportDocument();
        DataTable dtDailyCallReport = new DataTable();
        private NameValueCollection _nvCollection = new NameValueCollection();

        readonly DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        readonly JavaScriptSerializer _jss = new JavaScriptSerializer();
        private List<DatabaseLayer.SQL.v_EmployeeHierarchyWithType> _getEmployee;
        List<HierarchyLevel6> _getHierarchyLevel6;
        List<v_MRDoctor> _MRDoctors;
        List<v_MrDrBrick> _MRBrick;
        List<ProductSku> _ProductSKU;

        List<v_EmployeeWithRole> _getHierarchyLevel1;
        List<v_EmployeeWithRole> _getHierarchyLevel2;
        List<v_EmployeeWithRole> _getHierarchyLevel3;
        List<HierarchyLevel4> _getHierarchyLevel4;
        List<HierarchyLevel5> _getHierarchyLevel5;

        private int _level1Id = 0, _level2Id = 0, _level3Id = 0, _level4Id = 0, _level5Id = 0, _level6Id = 0, _currentLevelId = 0;
        private SystemUser _currentUser;
        string _hierarchyName, _currentRole;
        private List<DatabaseLayer.SQL.AppConfiguration> _getHierarchy;
        private long _employeeId = 0;
        List<v_EmployeeWithRole> Emphr;

        #endregion

        //========================== Reports ====================================
        #region Reports

        #region datagrid
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<GridSuccess1> datagrid(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id, string Status, string dt1, string dt2, string Type1)
        {
            string returnString = "";
            //int level3Id, int level4Id, int level5Id, int level6Id, string Status, string StartingDate, string EndingDate
            List<DatabaseLayer.SQL.AppConfiguration> getLevelName = _dataContext.sp_AppConfigurationSelectHierarchy().ToList();
            _hierarchyName = Convert.ToString(getLevelName[0].SettingName);
            _currentRole = Convert.ToString(Session["CurrentUserRole"].ToString());
            int _userId = Convert.ToInt32(Session["CurrentUserId"]);
            List<GridSuccess1> t5 = new List<GridSuccess1>();

            #region SET Hierarchy Level

            #endregion
            try
            {

                #region GET DataGrid
                DataTable datagrid = new DataTable();
                Session["sessiondatagrid"] = "";
                #region GET DATA FROM SP Assigning parameters
                NameValueCollection _nvCollection = new NameValueCollection();
                _nvCollection.Clear();
                //_nvCollection.Add("@CurrentUserEmployeeId-int", _userId.ToString());
                //_nvCollection.Add("@CurrentUserRole-varchar(25)", _currentRole.ToString());
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@DivisionID-int", level3Id.ToString());
                _nvCollection.Add("@RegionID-INT", level4Id.ToString());
                _nvCollection.Add("@ZoneID-INT", level5Id.ToString());
                _nvCollection.Add("@TerritoryID-INT", level6Id.ToString());
                _nvCollection.Add("@type-varchar", Type1.ToString());
               // _nvCollection.Add("@EmployeeID-INT", EmpID.ToString());
               //_nvCollection.Add("@designation-varchar(20)", des.ToString());
                _nvCollection.Add("@Status-varchar(20)", Status.ToString());
              //  _nvCollection.Add("@Day-varchar(20)", Convert.ToDateTime(dt1).Day.ToString());
                _nvCollection.Add("@Month-varchar(20)", Convert.ToDateTime(dt1).Month.ToString());
                _nvCollection.Add("@Year-varchar(20)", Convert.ToDateTime(dt1).Year.ToString());

                DataSet ds = GetData("sp_all_Plan_Showing", _nvCollection);
                #endregion

                try
                {

                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        t5.Add(
                            new GridSuccess1(
                                ds.Tables[0].Rows[i]["GM"].ToString(),
                                ds.Tables[0].Rows[i]["BUH"].ToString(),
                                ds.Tables[0].Rows[i]["Division"].ToString(),
                                ds.Tables[0].Rows[i]["Team"].ToString(),
                                ds.Tables[0].Rows[i]["Region"].ToString(),
                                ds.Tables[0].Rows[i]["Zone"].ToString(),
                                ds.Tables[0].Rows[i]["Territory"].ToString(),
                                ds.Tables[0].Rows[i]["EmployeeName"].ToString(),
                                ds.Tables[0].Rows[i]["ID"].ToString(),
                                ds.Tables[0].Rows[i]["EmployeeId"].ToString(),
                                ds.Tables[0].Rows[i]["Designation"].ToString(),
                                ds.Tables[0].Rows[i]["Plan_Month"].ToString(),
                                ds.Tables[0].Rows[i]["CPM_PlanStatus"].ToString(),
                                ds.Tables[0].Rows[i]["CPM_CreateDateTime"].ToString(),
                                ds.Tables[0].Rows[i]["TotalDoctor"].ToString(),
                                ds.Tables[0].Rows[i]["TotalPlans"].ToString(),
                                ds.Tables[0].Rows[i]["CPM_UpdateDateTime"].ToString()
                          

                                ));
                    }



                }
                catch (Exception ex)
                { }


                #endregion

                //  returnString = _jss.Serialize(DataScreen);

            }
            catch (Exception exception)
            {
                // returnString = exception.Message;
            }
            return t5;
        }
        #endregion

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string FilterDropDownList(string levelName)
        {
            string returnString = "";
            int _userId = 0;

            try
            {
                GetCurrentLevelId(0);
                if (levelName == "Level1")
                {
                    #region Level1

                    #region WebSite of Admin / HeadOffice

                    _currentRole = Session["CurrentUserRole"].ToString();
                    _userId = Convert.ToInt32(Session["CurrentUserId"]);

                    if (_currentRole == "admin" || _currentRole.ToLower() == "ftm")
                    {
                        _getHierarchyLevel1 = _dataContext.sp_EmployeesSelectByLevel(levelName, _currentRole, 0, 0, 0, 0, 0, 0).Select(
                            p => new v_EmployeeWithRole()
                            {
                                EmployeeId = p.EmployeeId,
                                EmployeeName = p.EmployeeName
                            }).ToList();
                        returnString = _jss.Serialize(_getHierarchyLevel1);
                    }

                    if (_currentRole == "headoffice")
                    {
                        _nvCollection.Clear();
                        _nvCollection.Add("@EmployeeID-int", _userId.ToString());
                        var data = GetData("sp_EmployeesSelectByHead", _nvCollection);
                        returnString = data.Tables[0].ToJsonString();
                    }

                    if (_currentRole == "rl1")
                    {
                        _getHierarchyLevel1 = _dataContext.sp_EmployeesSelectByLevel(levelName, _currentRole, _level1Id, 0, 0, 0, 0, 0).Select(
                            p => new v_EmployeeWithRole()
                            {
                                EmployeeId = p.EmployeeId,
                                EmployeeName = p.EmployeeName
                            }).ToList();
                        returnString = _jss.Serialize(_getHierarchyLevel1);
                    }

                    if (_currentRole == "rl2")
                    {
                        _getHierarchyLevel2 = _dataContext.sp_EmployeesSelectByLevel(levelName, _currentRole, _level1Id, _level2Id, 0, 0, 0, 0).Select(
                            p => new v_EmployeeWithRole()
                            {
                                EmployeeId = p.EmployeeId,
                                EmployeeName = p.EmployeeName
                            }).ToList();
                        returnString = _jss.Serialize(_getHierarchyLevel2);
                    }

                    if (_currentRole == "rl3")
                    {
                        _getHierarchyLevel3 = _dataContext.sp_EmployeesSelectByLevel(levelName, _currentRole, _level1Id, _level2Id, _level3Id, 0, 0, 0).Select(
                            p => new v_EmployeeWithRole()
                            {
                                EmployeeId = p.EmployeeId,
                                EmployeeName = p.EmployeeName
                            }).ToList();
                        returnString = _jss.Serialize(_getHierarchyLevel3);
                    }


                    if (_currentRole == "rl4")
                    {
                        _getHierarchyLevel3 = _dataContext.sp_EmployeesSelectByLevel(levelName, _currentRole, _level1Id, _level2Id, _level3Id, _level4Id, 0, 0).Select(
                            p => new v_EmployeeWithRole()
                            {
                                EmployeeId = p.EmployeeId,
                                EmployeeName = p.EmployeeName
                            }).ToList();
                        returnString = _jss.Serialize(_getHierarchyLevel3);
                    }

                    if (_currentRole == "rl5")
                    {
                        _getHierarchyLevel3 = _dataContext.sp_EmployeesSelectByLevel(levelName, _currentRole, _level1Id, _level2Id, _level3Id, _level4Id, _level5Id, 0).Select(
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
        
        #region status_update
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string status_update(string id, string status1, int EmployeeId)
        {
            DAL d = new DAL();
            try
            {
                #region Uptade Status
                _nvCollection.Clear();
                _nvCollection.Add("@id-int", id.ToString());
                _nvCollection.Add("@status1-varchar-100", status1.ToString());
                _nvCollection.Add("@EmployeeId-int", EmployeeId.ToString());

                bool r = d.UpdateData("sp_upate_status", _nvCollection);
                #endregion
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Update Status | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "r";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string AddMeetingByAdmin(int AttTypeID, int EmployeeId, string StartDateTime , string Description)
        {
            DAL d = new DAL();
            try
            {
                #region Uptade Status
                _nvCollection.Clear();
                _nvCollection.Add("@AttTypeID-int", AttTypeID.ToString());
                _nvCollection.Add("@EmployeeId-int", EmployeeId.ToString());
                _nvCollection.Add("@StartDateTime-datetime", StartDateTime.ToString());
                _nvCollection.Add("@Description-varchar(100)", Description.ToString());
               

                bool r = d.InserData("Sp_MarkAdminMeeting", _nvCollection);
                #endregion
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Update Status | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "r";
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string multiple_status_update(string ids, string status1, string EmployeeId)
        {
            DAL d = new DAL();
            string[] IDs = ids.Split(',');
            string[] EmployeeIds = EmployeeId.Split(',');

            int doctorId = 0;
            try
            {
                #region Uptade Status

                for (int i = 1; i < IDs.Count(); i++)
                {
                    var doc_id = IDs[i];
                    var emp_id = EmployeeIds[i];
                    doctorId = Convert.ToInt32(doc_id);
                    _nvCollection.Clear();
                    _nvCollection.Add("@id-int", doctorId.ToString());
                    _nvCollection.Add("@status1-varchar-100", status1.ToString());
                    _nvCollection.Add("@EmployeeId-int", emp_id);

                    bool r = d.UpdateData("sp_upate_status", _nvCollection);
                }


                #endregion



            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Update Status | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "r";
        }
        #endregion


     




        #region IsValidUser
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
        #endregion
        
        #region getemployeeHR
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<v_EmployeeWithRole> getemployeeHR(int employeeid)
        {
            Emphr = _dataContext.EmployeeWith_Hierarchy(employeeid).ToList();

            return Emphr;

        }
        #endregion

        #region GetHierarchySelection
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetHierarchySelection(long systemUserId)
        {
            string returnString = "";

            try
            {
                var getEmployeeHierarchy =
                    _dataContext.sp_EmplyeeHierarchySelect(systemUserId).Select(
                    p =>
                       new EmplyeeHierarchy()
                       {
                           LevelId1 = p.LevelId1,
                           LevelId2 = p.LevelId2,
                           LevelId3 = p.LevelId3,
                           LevelId4 = p.LevelId4,
                           LevelId5 = p.LevelId5,
                           LevelId6 = p.LevelId6
                       }).ToList();

                if (getEmployeeHierarchy.Count > 0)
                {
                    returnString = _jss.Serialize(getEmployeeHierarchy);
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        #endregion
        #endregion

        #region filltering

        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<HierarchyLevel6> FillAllBricks()
        {
            // List returnString = "";
            try
            {
                _getHierarchyLevel6 = _dataContext.Get_ALLBrick().Select(
                    P => new HierarchyLevel6()
                    {
                        LevelId = P.LevelId,
                        LevelName = P.LevelName
                    }).ToList();

                //   return returnString = _getHierarchyLevel6.ToList();
                //_jss.Serialize(_getHierarchyLevel6);
            }
            catch (Exception exception)
            {
                //  returnString = exception.Message;
            }

            return _getHierarchyLevel6;

        }

        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<v_MrDrBrick> FillMRBricks(int employeeid)
        {
            // List returnString = "";
            try
            {

                _MRBrick = _dataContext.sp_MrDrBrickSelect(Convert.ToInt64(employeeid))
                   .Select(
                   P => new v_MrDrBrick()
                   {
                       LevelId = P.LevelId,
                       LevelName = P.LevelName

                   }).ToList();
            }
            catch (Exception exception)
            {
                //  returnString = exception.Message;
            }

            return _MRBrick;

        }

        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<v_MRDoctor> FillMrDR(int employeeid)
        {
            // List returnString = "";
            try
            {
                _MRDoctors = _dataContext.sp_DoctorsOfSpoSelectByEmployee(Convert.ToInt64(employeeid), null, null, null)
                    .Select(
                    P => new v_MRDoctor()
                    {
                        DoctorId = P.DoctorId,
                        DoctorName = P.DoctorName

                    }).ToList();
            }
            catch (Exception exception)
            {
                //  returnString = exception.Message;
            }

            return _MRDoctors;

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<Tuple<int, string>> FillProduct()
        {
            // List returnString = "";
            var PRoductList = new List<Tuple<int, string>>();
            try
            {
                var fsdf = (from p in _dataContext.ProductSkus
                            select p).ToList();

                foreach (var item in fsdf)
                {
                    var tuple = Tuple.Create(item.SkuId, item.SkuName);
                    PRoductList.Add(tuple);
                }

            }
            catch (Exception exception)
            {
                //  returnString = exception.Message;
            }

            return PRoductList;

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<Tuple<int, string>> fillGH()
        {
            int _userId = 0;
            var list = new List<Tuple<int, string>>();
            if (Session["CurrentUserRole"] != null)
            {
                Constants.ErrorLog("Session CurrentUserRole Is Not Null : YES " + "Session Object Type : " + Session["SystemUser"].GetType());
            }
            else
            {
                Constants.ErrorLog("Session CurrentUserRole Is Null : YES");
            }
            try
            {
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _userId = Convert.ToInt32(Session["CurrentUserId"]);
                GetCurrentLevelId(_currentUser.EmployeeId);

                if (_currentUserRole == "admin" || _currentUserRole == "ftm")
                {
                    List<HierarchyLevel1> ada = _dataContext.sp_HierarchyLevel1Select(null, null).ToList();
                    foreach (var item in ada)
                    {
                        var tuple = Tuple.Create(item.LevelId, item.LevelName);
                        list.Add(tuple);
                    }
                }
                else if (_currentUserRole == "headoffice")
                {
                    _nvCollection.Clear();
                    _nvCollection.Add("@EmployeeID-int", _userId.ToString());
                    DataSet ds = GetData("sp_HierarchyLevel1SelectByHead", _nvCollection);
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        var tuple = Tuple.Create(Convert.ToInt32(row["LevelId"]), row["LevelName"].ToString());
                        list.Add(tuple);
                    }
                }
                else if (_currentUserRole == "rl1")
                {
                    List<HierarchyLevel2> ada = _dataContext.sp_Level2SelectByLevel1(_level1Id).ToList();
                    foreach (var item in ada)
                    {
                        var tuple = Tuple.Create(item.LevelId, item.LevelName);
                        list.Add(tuple);
                    }
                }
                else if (_currentUserRole == "rl2")
                {
                    List<HierarchyLevel3> ada = _dataContext.sp_Level3SelectByLevel2(_level2Id).ToList();
                    foreach (var item in ada)
                    {
                        var tuple = Tuple.Create(item.LevelId, item.LevelName);
                        list.Add(tuple);
                    }
                }
                else if (_currentUserRole == "rl3")
                {
                    List<HierarchyLevel4> ada = _dataContext.sp_Levels4SelectByLevel3(_level3Id).ToList();
                    foreach (var item in ada)
                    {
                        var tuple = Tuple.Create(item.LevelId, item.LevelName);
                        list.Add(tuple);
                    }
                }
                else if (_currentUserRole == "rl4")
                {
                    List<HierarchyLevel5> ada = _dataContext.sp_Levels5SelectByLevel4(_level4Id).ToList();
                    foreach (var item in ada)
                    {
                        var tuple = Tuple.Create(item.LevelId, item.LevelName);
                        list.Add(tuple);
                    }
                }
                else if (_currentUserRole == "rl5")
                {
                    List<HierarchyLevel6> ada = _dataContext.sp_Levels6SelectByLevel5(_level5Id).ToList();
                    foreach (var item in ada)
                    {
                        var tuple = Tuple.Create(item.LevelId, item.LevelName);
                        list.Add(tuple);
                    }
                }
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Error From NewReports.asmx FillGH " + ex.Message);
            }
            return list;

            //var list = new List<Tuple<int, string>>();
            //if (Session["CurrentUserRole"] != null)
            //{
            //    Constants.ErrorLog("Session CurrentUserRole Is Not Null : YES " + "Session Object Type : " + Session["SystemUser"].GetType());
            //}
            //else
            //{
            //    Constants.ErrorLog("Session CurrentUserRole Is Null : YES");
            //}
            //try
            //{
            //    string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
            //    _currentUser = (SystemUser)Session["SystemUser"];
            //    GetCurrentLevelId(_currentUser.EmployeeId);

            //    if (_currentUserRole == "admin" || _currentUserRole == "headoffice" || _currentUserRole == "marketingteam")
            //    {
            //        List<HierarchyLevel3> ada = _dataContext.sp_HierarchyLevels3Select(null, null).ToList();
            //        foreach (var item in ada)
            //        {
            //            var tuple = Tuple.Create(item.LevelId, item.LevelName);
            //            list.Add(tuple);
            //        }
            //    }
            //    else if (_currentUserRole == "rl3")
            //    {
            //        List<HierarchyLevel4> ada = _dataContext.sp_Levels4SelectByLevel3(_level3Id).ToList();
            //        foreach (var item in ada)
            //        {
            //            var tuple = Tuple.Create(item.LevelId, item.LevelName);
            //            list.Add(tuple);
            //        }
            //    }
            //    else if (_currentUserRole == "rl4")
            //    {
            //        List<HierarchyLevel5> ada = _dataContext.sp_Levels5SelectByLevel4(_level4Id).ToList();
            //        foreach (var item in ada)
            //        {
            //            var tuple = Tuple.Create(item.LevelId, item.LevelName);
            //            list.Add(tuple);
            //        }
            //    }
            //    else if (_currentUserRole == "rl5")
            //    {
            //        List<HierarchyLevel6> ada = _dataContext.sp_Levels6SelectByLevel5(_level5Id).ToList();
            //        foreach (var item in ada)
            //        {
            //            var tuple = Tuple.Create(item.LevelId, item.LevelName);
            //            list.Add(tuple);
            //        }
            //    }
            //}
            //catch (Exception ex)
            //{
            //    Constants.ErrorLog("Error From NewReports.asmx FillGH " + ex.Message);
            //}
            //return list;

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<Tuple<int, string>> fillGH_L3(int level3Id)
        {

            string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
            _currentUser = (SystemUser)Session["SystemUser"];
            GetCurrentLevelId(_currentUser.EmployeeId);
            var list = new List<Tuple<int, string>>();

            if (_currentUserRole == "admin" || _currentUserRole == "headoffice" || _currentUserRole == "marketingteam")
            {
                List<HierarchyLevel4> ada = _dataContext.sp_Levels4SelectByLevel3(level3Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl3")
            {
                List<HierarchyLevel5> ada = _dataContext.sp_Levels5SelectByLevel4(level3Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl4")
            {
                List<HierarchyLevel6> ada = _dataContext.sp_Levels6SelectByLevel5(level3Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl5")
            {

            }
            return list;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<Tuple<int, string>> fillGH_L4(int level4Id)
        {
            string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
            _currentUser = (SystemUser)Session["SystemUser"];
            GetCurrentLevelId(_currentUser.EmployeeId);
            var list = new List<Tuple<int, string>>();

            if (_currentUserRole == "admin" || _currentUserRole == "headoffice" || _currentUserRole == "marketingteam")
            {
                List<HierarchyLevel5> ada = _dataContext.sp_Levels5SelectByLevel4(level4Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl3")
            {
                List<HierarchyLevel6> ada = _dataContext.sp_Levels6SelectByLevel5(level4Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl4")
            {

            }
            else if (_currentUserRole == "rl5")
            {

            }



            return list;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<Tuple<int, string>> fillGH_L5(int level5Id)
        {
            string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
            _currentUser = (SystemUser)Session["SystemUser"];
            GetCurrentLevelId(_currentUser.EmployeeId);
            var list = new List<Tuple<int, string>>();

            if (_currentUserRole == "admin" || _currentUserRole == "headoffice" || _currentUserRole == "marketingteam")
            {
                List<HierarchyLevel6> ada = _dataContext.sp_Levels6SelectByLevel5(level5Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl3")
            {

            }
            else if (_currentUserRole == "rl4")
            {

            }
            else if (_currentUserRole == "rl5")
            {

            }

            return list;
        }

        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<Tuple<long, string>> Fillemp(string l1, string l2, string l3, string l4)
        {
            // List returnString = "";
            var EmployeeList = new List<Tuple<long, string>>();
            try
            {

                if (l1.Equals("null")) { l1 = "0"; }
                else { if (l1 == "-1") { l1 = "0"; } }

                if (l2.Equals("null")) { l2 = "0"; }
                else { if (l2 == "-1") { l2 = "0"; } }

                if (l3.Equals("null")) { l3 = "0"; }
                else { if (l3 == "-1") { l3 = "0"; } }

                if (l4.Equals("null")) { l4 = "0"; }
                else { if (l4 == "-1") { l4 = "0"; } }

                var fsdf = _dataContext.GetEmployeewithHierarchy(Convert.ToInt32(l1), Convert.ToInt32(l2), Convert.ToInt32(l3), Convert.ToInt32(l4)).ToList();

                foreach (var item in fsdf)
                {
                    var tuple = Tuple.Create(item.EmployeeId, item.FirstName);
                    EmployeeList.Add(tuple);
                }

            }
            catch (Exception exception)
            {
                //  returnString = exception.Message;
            }

            return EmployeeList;

        }

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





























        #endregion
        //========================================================================

        //=======================================================================
        //=========================== Classess ==================================
        #region Classess
        [Serializable]
        public class GridSuccess1
        {
            public GridSuccess1(string _GM, string _BUH, string _Division, string _Team, string _Region, string _Zone, string _Territory,  string _EmployeeName, string _ID, string _EmployeeId, string _Designation, string _Plan_Month, string _CPM_PlanStatus, string _CPM_CreateDateTime, string _TotalDoctor, string _TotalPlans, string _CPM_UpdateDateTime
               //string _division, string _Region
                //    , string _zone, string _Territory
                //    , string _EmployeeName, string _Plan_Month, string _CPM_PlanStatus, string _CPM_CreateDateTime
                )
            {

                GM = _GM;
                BUH = _BUH;
                Division = _Division;
                Team = _Team;
                Region = _Region;
                Zone = _Zone;
                Territory = _Territory;
               
                EmployeeName = _EmployeeName;
                ID = _ID;
                EmployeeId = _EmployeeId;
                Designation = _Designation;
                Plan_Month = _Plan_Month;
                CPM_PlanStatus = _CPM_PlanStatus;
                CPM_CreateDateTime = _CPM_CreateDateTime;
                CPM_UpdateDateTime = _CPM_UpdateDateTime;
                TotalDoctor = _TotalDoctor;
                TotalPlans = _TotalPlans;
                
            }

            public string GM { get; set; }
            public string BUH { get; set; }
            public string Division { get; set; }
            public string Team { get; set; }
            public string Region { get; set; }
            public string Zone { get; set; }
            public string Territory { get; set; }
            
            public string EmployeeName { get; set; }
            public string ID { get; set; }
            public string EmployeeId { get; set; }
            public string Designation { get; set; }
            public string Plan_Month { get; set; }
            public string CPM_PlanStatus { get; set; }
            public string CPM_CreateDateTime { get; set; }
            public string TotalDoctor { get; set; }
            public string TotalPlans { get; set; }
            public string CPM_UpdateDateTime { get; set; }

           


        }
        #endregion
        //=======================================================================


    }
}
