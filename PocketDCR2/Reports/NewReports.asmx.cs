using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using DatabaseLayer.SQL;
using System.Data;
using PocketDCR2.Classes;
using PocketDCR.CustomMembershipProvider;
using System.Data.SqlClient;
using System.Collections.Specialized;
using CrystalDecisions.CrystalReports.Engine;
using OfficeOpenXml;
using System.IO;
using OfficeOpenXml.Style;
using System.Drawing;
using System.Net;
using System.Text;
using System.Configuration;

namespace PocketDCR2.Reports
{
    /// <summary>
    /// Summary description for NewReports
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    [ScriptService]
    public class NewReports : System.Web.Services.WebService
    {

        #region Database Layer

        public System.Data.DataSet GetData(String SpName, NameValueCollection NV)
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
        DAL dl = new DAL();
        NameValueCollection nv = new NameValueCollection();
        #endregion

        #region Object Intializtion
        private ReportDocument rpt = new ReportDocument();
        DataTable dtDailyCallReport = new DataTable();
        private NameValueCollection _nvCollection = new NameValueCollection();
        readonly DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        readonly JavaScriptSerializer _jss = new JavaScriptSerializer();
        private List<DatabaseLayer.SQL.v_EmployeeHierarchyWithType> _getEmployee;

        List<HierarchyLevel1> _getHierarchyLevel1;
        List<HierarchyLevel2> _getHierarchyLevel2;
        List<HierarchyLevel3> _getHierarchyLevel3;
        List<HierarchyLevel4> _getHierarchyLevel4;
        List<HierarchyLevel5> _getHierarchyLevel5;
        List<HierarchyLevel6> _getHierarchyLevel6;
        List<v_MRDoctor> _MRDoctors;
        List<v_MrDrBrick> _MRBrick;
        List<ProductSku> _ProductSKU;

        private int _level1Id = 0, _level2Id = 0, _level3Id = 0, _level4Id = 0, _level5Id = 0, _level6Id = 0, _currentLevelId = 0;
        private SystemUser _currentUser;
        string _hierarchyName, _currentRole;
        private List<DatabaseLayer.SQL.AppConfiguration> _getHierarchy;
        private long _employeeId = 0;
        List<v_EmployeeWithRole> Emphr;

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
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string FillMrDR(string employeeid)
        {

            string returnString = "";
            try
            {



                nv.Clear();
                nv.Add("@EmployeeId-int", employeeid);
                //nv.Add("@DoctorId-int", null);
                //nv.Add("@ClassId-int", "0");
                //nv.Add("@BrickId-int", "0");
                DataSet ds = dl.GetData("sp_DoctorsOfSpoSelectByEmployee_New", nv);


                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                    else
                    {
                        returnString = "";
                    }
                }
                else
                {
                    returnString = "";
                }


                //_MRDoctors = _dataContext.sp_DoctorsOfSpoSelectByEmployee_New(employeeid, null, null, null)
                //   .Select(
                //   P => new v_MRDoctor()
                //   {
                //       DoctorId = P.DoctorId,
                //       DoctorName = P.DoctorName

                //   }).ToList();
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Error From NewReports.asmx FillMrDR " + ex.Message);
            }

            return returnString;

        }

        //[WebMethod]
        ////[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public List<v_MRDoctor> FillMrDR(int employeeid)
        //{
        //    // List returnString = "";
        //    try
        //    {

        //        var fd = "dsfdsfsd";
        //        //var aaa = _dataContext.sp_DoctorsOfSpoSelectByEmployee_New(employeeid, null, null, null).ToList();
        //         _MRDoctors = _dataContext.sp_DoctorsOfSpoSelectByEmployee_New(employeeid, null, null, null).ToList()
        //        _MRDoctors = _dataContext.sp_DoctorsOfSpoSelectByEmployee_New(employeeid, null, null, null)
        //            .Select(
        //            P => new v_MRDoctor()
        //            {
        //                DoctorId = P.DoctorId,
        //                DoctorName = P.DoctorName

        //            }).ToList();
        //    }
        //    catch (Exception exception)
        //    {
        //        //  returnString = exception.Message;
        //    }

        //    return _MRDoctors;

        //}


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<Tuple<int, string>> FillProductNew()
        {
            // List returnString = "";
            var PRoductList = new List<Tuple<int, string>>();
            try
            {

                DataSet ds = dl.GetData("sp_GetAllProducts", nv);

                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    int productId = Convert.ToInt32(row["ProductId"]);
                    string productName = row["ProductName"].ToString();
                    var tuple = Tuple.Create(productId, productName);
                    PRoductList.Add(tuple);
                }

            }
            catch (Exception exception)
            {
            }

            return PRoductList;

        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<Tuple<int, string>> FillProduct(string ProductID)
        {
            var PRoductList = new List<Tuple<int, string>>();
            try
            {
                nv.Clear();
                nv.Add("@ProductId-nvarchar(max)", ProductID.ToString());
                DataSet ds = dl.GetData("sp_GetAllSkusByIds", nv);

                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    int productskuId = Convert.ToInt32(row["SkuId"]);
                    string productskuName = row["SkuName"].ToString();
                    var tuple = Tuple.Create(productskuId, productskuName);
                    PRoductList.Add(tuple);
                }

            }
            catch (Exception exception)
            {
                //  returnString = exception.Message;
            }

            return PRoductList;

        }

        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<Tuple<long, string>> Fillemp(string l1, string l2, string l3, string l4, string l5, string l6)
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

                if (l5.Equals("null")) { l5 = "0"; }
                else { if (l5 == "-1") { l5 = "0"; } }

                if (l6.Equals("null")) { l6 = "0"; }
                else { if (l6 == "-1") { l6 = "0"; } }

                if (l1 == "0" && l2 == "0")
                {
                    var fsdf = _dataContext.GetEmployeewithHierarchy(Convert.ToInt32(l3), Convert.ToInt32(l4), Convert.ToInt32(l5), Convert.ToInt32(l6)).ToList();
                    foreach (var item in fsdf)
                    {
                        var tuple = Tuple.Create(item.EmployeeId, item.FirstName);
                        EmployeeList.Add(tuple);
                    }
                }
                else
                {
                    var fsdf = _dataContext.GetEmployeewithHierarchylevel6(Convert.ToInt32(l1), Convert.ToInt32(l2), Convert.ToInt32(l3), Convert.ToInt32(l4), Convert.ToInt32(l5), Convert.ToInt32(l6)).ToList();
                    foreach (var item in fsdf)
                    {
                        var tuple = Tuple.Create(item.EmployeeId, item.FirstName);
                        EmployeeList.Add(tuple);
                    }
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
        public List<Tuple<int, string>> fillGH()
        {
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
                GetCurrentLevelId(_currentUser.EmployeeId);

                if (_currentUserRole == "admin" || _currentUserRole == "admincoordinator" || _currentUserRole == "headoffice" || _currentUserRole == "ftm")
                {
                    List<HierarchyLevel1> ada = _dataContext.sp_HierarchyLevel1Select(null, null).ToList();
                    foreach (var item in ada)
                    {
                        var tuple = Tuple.Create(item.LevelId, item.LevelName);
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

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetEmployeeName(string level3id, string level4id, string level5id, string level6id)
        {
            string returnstring = "";
            try
            {
                _nvCollection.Clear();

                _nvCollection.Add("@level3-int", level3id.ToString());
                _nvCollection.Add("@level4-int", level4id.ToString());
                _nvCollection.Add("@level5-int", level5id.ToString());
                _nvCollection.Add("@level6-int", level6id.ToString());

                DataSet ds = GetData("sp_getempname", _nvCollection);
                returnstring = ds.Tables[0].Rows[0]["EmployeeName"].ToString();
            }
            catch (Exception ex)
            {
                returnstring = ex.ToString();
            }
            return returnstring;

        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<Tuple<int, string>> fillGH_L1(int level1Id)
        {

            string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
            _currentUser = (SystemUser)Session["SystemUser"];
            GetCurrentLevelId(_currentUser.EmployeeId);
            var list = new List<Tuple<int, string>>();

            if (_currentUserRole == "admin" || _currentUserRole == "admincoordinator" || _currentUserRole == "ftm")
            {
                List<HierarchyLevel2> ada = _dataContext.sp_Level2SelectByLevel1(level1Id).ToList();
                //sp_Levels2SelectByLevel1(level1Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl1")
            {
                List<HierarchyLevel3> ada = _dataContext.sp_Level3SelectByLevel2(level1Id).ToList();
                //sp_Levels3SelectByLevel2(level1Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl2")
            {
                List<HierarchyLevel4> ada = _dataContext.sp_Levels4SelectByLevel3(level1Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl3" || _currentUserRole == "headoffice")
            {
                List<HierarchyLevel5> ada = _dataContext.sp_Levels5SelectByLevel4(level1Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl4")
            {
                List<HierarchyLevel6> ada = _dataContext.sp_Levels6SelectByLevel5(level1Id).ToList();
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
        public List<Tuple<int, string>> fillGH_L2(int level2Id)
        {

            string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
            _currentUser = (SystemUser)Session["SystemUser"];
            GetCurrentLevelId(_currentUser.EmployeeId);
            var list = new List<Tuple<int, string>>();

            if (_currentUserRole == "admin" || _currentUserRole == "admincoordinator" || _currentUserRole == "ftm")
            {
                List<HierarchyLevel3> ada = _dataContext.sp_Level3SelectByLevel2(level2Id).ToList();
                //sp_Levels3SelectByLevel2(level2Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl1")
            {
                List<HierarchyLevel4> ada = _dataContext.sp_Levels4SelectByLevel3(level2Id).ToList();
                //sp_Levels3SelectByLevel2(level1Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl2")
            {
                List<HierarchyLevel5> ada = _dataContext.sp_Levels5SelectByLevel4(level2Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl3" || _currentUserRole == "headoffice")
            {
                List<HierarchyLevel6> ada = _dataContext.sp_Levels6SelectByLevel5(level2Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl4")
            {
                List<HierarchyLevel5> ada = _dataContext.sp_Levels5SelectByLevel4(level2Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl5")
            {
                List<HierarchyLevel6> ada = _dataContext.sp_Levels6SelectByLevel5(level2Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl6")
            {

            }
            return list;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<Tuple<int, string>> fillGH_L3(int level3Id, int teamId)
        {

            string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
            _currentUser = (SystemUser)Session["SystemUser"];
            GetCurrentLevelId(_currentUser.EmployeeId);
            var list = new List<Tuple<int, string>>();

            if (_currentUserRole == "admin" || _currentUserRole == "admincoordinator" || _currentUserRole == "headoffice" || _currentUserRole == "ftm")
            {
                List<HierarchyLevel4> ada = _dataContext.sp_Levels4SelectByLevel3(level3Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl1")
            {
                List<HierarchyLevel5> ada = _dataContext.sp_Levels5SelectByLevel4(level3Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl2")
            {
                List<HierarchyLevel6> ada = _dataContext.sp_Levels6SelectByLevel5WithTeam(level3Id, teamId).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl3")
            {
                List<HierarchyLevel4> ada = _dataContext.sp_Levels4SelectByLevel3(level3Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl4")
            {
                List<HierarchyLevel4> ada = _dataContext.sp_Levels4SelectByLevel3(level3Id).ToList();
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
        public List<Tuple<int, string>> fillGH_L3(int level3Id)
        {

            string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
            _currentUser = (SystemUser)Session["SystemUser"];
            GetCurrentLevelId(_currentUser.EmployeeId);
            var list = new List<Tuple<int, string>>();

            if (_currentUserRole == "admin" || _currentUserRole == "admincoordinator" || _currentUserRole == "headoffice" || _currentUserRole == "ftm")
            {
                List<HierarchyLevel4> ada = _dataContext.sp_Levels4SelectByLevel3(level3Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl1")
            {
                List<HierarchyLevel5> ada = _dataContext.sp_Levels5SelectByLevel4(level3Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl2")
            {
                List<HierarchyLevel6> ada = _dataContext.sp_Levels6SelectByLevel5(level3Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl3")
            {
                List<HierarchyLevel4> ada = _dataContext.sp_Levels4SelectByLevel3(level3Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl4")
            {
                List<HierarchyLevel4> ada = _dataContext.sp_Levels4SelectByLevel3(level3Id).ToList();
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

            if (_currentUserRole == "admin" || _currentUserRole == "admincoordinator" || _currentUserRole == "headoffice" || _currentUserRole == "ftm")
            {
                List<HierarchyLevel5> ada = _dataContext.sp_Levels5SelectByLevel4(level4Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl1")
            {
                List<HierarchyLevel6> ada = _dataContext.sp_Levels6SelectByLevel5(level4Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl2")
            {
                List<HierarchyLevel6> ada = _dataContext.sp_Levels6SelectByLevel5(level4Id).ToList();
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

            if (_currentUserRole == "admin" || _currentUserRole == "admincoordinator" || _currentUserRole == "headoffice" || _currentUserRole == "ftm")
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
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<Tuple<int, string>> fillGH_L5WithTeam(int level5Id, int teamId)
        {
            string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
            _currentUser = (SystemUser)Session["SystemUser"];
            GetCurrentLevelId(_currentUser.EmployeeId);
            var list = new List<Tuple<int, string>>();

            if (_currentUserRole == "admin" || _currentUserRole == "admincoordinator" || _currentUserRole == "headoffice" || _currentUserRole == "ftm")
            {
                List<HierarchyLevel6> ada = _dataContext.sp_Levels6SelectByLevel5WithTeam(level5Id, teamId).ToList();
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
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetEmployee(long employeeId, int teamId)
        {
            string returnString = "";

            try
            {
                List<v_EmployeeDetail> getEmployee =
                    _dataContext.sp_EmployeesSelectByManagerNewWithTeam(employeeId, teamId).Select(
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

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<v_EmployeeWithRole> getemployeeHR(int employeeid)
        {
            Emphr = _dataContext.EmployeeWith_Hierarchy(employeeid).ToList();

            return Emphr;

        }

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

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<Tuple<int, string>> fillGHForDcotorExcel()
        {

            var list = new List<Tuple<int, string>>();


            List<HierarchyLevel5> ada = _dataContext.All_zonesforExcel().ToList();
            foreach (var item in ada)
            {
                var tuple = Tuple.Create(item.LevelId, item.LevelName);
                list.Add(tuple);
            }

            return list;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string FilterTeamsDropDownList()
        {
            string returnstring = "";
            try
            {
                _nvCollection.Clear();
                DataSet ds = GetData("sp_GetTeams", _nvCollection);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnstring = ds.Tables[0].ToJsonString();
                    }
                }
            }
            catch (Exception ex)
            {
                returnstring = ex.ToString();
            }
            return returnstring;

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ShowCurrentLevel(int parentLevelId, string levelName)
        {
            string returnString = "";

            try
            {
                if (levelName == "Level1")
                {
                    #region Level1

                    if (parentLevelId == 0)
                    {
                        _getHierarchyLevel1 = _dataContext.sp_HierarchyLevel1Select(null, null).Select(
                            p =>
                                new HierarchyLevel1()
                                {
                                    LevelId = p.LevelId,
                                    LevelCode = p.LevelCode,
                                    LevelName = p.LevelName,
                                    IsActive = p.IsActive,
                                    LevelDescription = p.LevelDescription
                                }).ToList();

                        if (_getHierarchyLevel1.Count > 0)
                        {
                            returnString = _jss.Serialize(_getHierarchyLevel1);
                        }
                    }
                    else
                    {
                        _getHierarchyLevel2 = _dataContext.sp_Level2SelectByLevel1(parentLevelId).Select(
                             p =>
                                new HierarchyLevel2()
                                {
                                    LevelId = p.LevelId,
                                    LevelName = p.LevelName,
                                    LevelCode = p.LevelCode,
                                    LevelDescription = p.LevelDescription,
                                    IsActive = p.IsActive
                                }).ToList();

                        if (_getHierarchyLevel2.Count > 0)
                        {
                            returnString = _jss.Serialize(_getHierarchyLevel2);
                        }
                    }

                    #endregion
                }
                else if (levelName == "Level2")
                {
                    #region Level2

                    if (parentLevelId == 0)
                    {
                        _getHierarchyLevel2 = _dataContext.sp_HierarchyLevel2Select(null, null).Select(
                            p =>
                                new HierarchyLevel2()
                                {
                                    LevelId = p.LevelId,
                                    LevelCode = p.LevelCode,
                                    LevelName = p.LevelName,
                                    IsActive = p.IsActive,
                                    LevelDescription = p.LevelDescription
                                }).ToList();

                        if (_getHierarchyLevel2.Count > 0)
                        {
                            returnString = _jss.Serialize(_getHierarchyLevel2);
                        }
                    }
                    else
                    {
                        _getHierarchyLevel3 = _dataContext.sp_Level3SelectByLevel2(parentLevelId).Select(
                             p =>
                                new HierarchyLevel3()
                                {
                                    LevelId = p.LevelId,
                                    LevelName = p.LevelName,
                                    LevelCode = p.LevelCode,
                                    LevelDescription = p.LevelDescription,
                                    IsActive = p.IsActive
                                }).ToList();

                        if (_getHierarchyLevel3.Count > 0)
                        {
                            returnString = _jss.Serialize(_getHierarchyLevel3);
                        }
                    }

                    #endregion
                }
                else if (levelName == "Level3")
                {
                    #region Level3

                    if (parentLevelId == 0)
                    {
                        _getHierarchyLevel3 = _dataContext.sp_HierarchyLevel3Select(null, null).Select(
                            p =>
                                new HierarchyLevel3()
                                {
                                    LevelId = p.LevelId,
                                    LevelCode = p.LevelCode,
                                    LevelName = p.LevelName,
                                    IsActive = p.IsActive,
                                    LevelDescription = p.LevelDescription
                                }).ToList();

                        if (_getHierarchyLevel3.Count > 0)
                        {
                            returnString = _jss.Serialize(_getHierarchyLevel3);
                        }
                    }
                    else
                    {
                        _getHierarchyLevel4 = _dataContext.sp_Levels4SelectByLevel3(parentLevelId).Select(
                             p =>
                                new HierarchyLevel4()
                                {
                                    LevelId = p.LevelId,
                                    LevelName = p.LevelName,
                                    LevelCode = p.LevelCode,
                                    LevelDescription = p.LevelDescription,
                                    IsActive = p.IsActive
                                }).ToList();

                        if (_getHierarchyLevel4.Count > 0)
                        {
                            returnString = _jss.Serialize(_getHierarchyLevel4);
                        }
                    }

                    #endregion
                }
                else if (levelName == "Level4")
                {
                    #region Level4

                    if (parentLevelId == 0)
                    {
                        _getHierarchyLevel4 = _dataContext.sp_HierarchyLevel4Select(null, null).Select(
                            p =>
                                new HierarchyLevel4()
                                {
                                    LevelId = p.LevelId,
                                    LevelCode = p.LevelCode,
                                    LevelName = p.LevelName,
                                    LevelDescription = p.LevelDescription,
                                    IsActive = p.IsActive
                                }).ToList();

                        if (_getHierarchyLevel4.Count > 0)
                        {
                            returnString = _jss.Serialize(_getHierarchyLevel4);
                        }
                    }
                    else
                    {
                        _getHierarchyLevel5 = _dataContext.sp_Levels5SelectByLevel4(parentLevelId).Select(
                            p =>
                              new DatabaseLayer.SQL.HierarchyLevel5()
                              {
                                  LevelId = p.LevelId,
                                  LevelName = p.LevelName,
                                  LevelCode = p.LevelCode,
                                  LevelDescription = p.LevelDescription,
                                  IsActive = p.IsActive
                              }).ToList();

                        if (_getHierarchyLevel5.Count > 0)
                        {
                            returnString = _jss.Serialize(_getHierarchyLevel5);
                        }
                    }

                    #endregion
                }
                else if (levelName == "Level5")
                {
                    #region Level5

                    if (parentLevelId == 0)
                    {
                        _getHierarchyLevel5 = _dataContext.sp_HierarchyLevel5Select(null, null).Select(
                            p =>
                                new HierarchyLevel5()
                                {
                                    LevelId = p.LevelId,
                                    LevelCode = p.LevelCode,
                                    LevelName = p.LevelName,
                                    LevelDescription = p.LevelDescription,
                                    IsActive = p.IsActive
                                }).ToList();

                        if (_getHierarchyLevel5.Count > 0)
                        {
                            returnString = _jss.Serialize(_getHierarchyLevel5);
                        }
                    }
                    else
                    {
                        _getHierarchyLevel6 = _dataContext.sp_Levels6SelectByLevel5(parentLevelId).Select(
                            p =>
                               new HierarchyLevel6()
                               {
                                   LevelId = p.LevelId,
                                   LevelName = p.LevelName,
                                   LevelCode = p.LevelCode,
                                   LevelDescription = p.LevelDescription,
                                   IsActive = p.IsActive
                               }).ToList();

                        if (_getHierarchyLevel6.Count > 0)
                        {
                            returnString = _jss.Serialize(_getHierarchyLevel6);
                        }
                    }

                    #endregion
                }
                else if (levelName == "Level6")
                {
                    #region Level6

                    if (parentLevelId == 0)
                    {
                        _getHierarchyLevel6 = _dataContext.sp_HierarchyLevel6Select(null, null).Select(
                            p =>
                                new HierarchyLevel6()
                                {
                                    LevelId = p.LevelId,
                                    LevelCode = p.LevelCode,
                                    LevelName = p.LevelName,
                                    LevelDescription = p.LevelDescription,
                                    IsActive = p.IsActive
                                }).ToList();

                        if (_getHierarchyLevel6.Count > 0)
                        {
                            returnString = _jss.Serialize(_getHierarchyLevel6);
                        }
                    }

                    #endregion
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        #endregion

        #region Reports

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DailyCallReport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus, string EmpType)
        {

            try
            {
                string Query = string.Empty;
                Session["DailyCallReport"] = "";
                string status = GetRptStatus(dt1);
                #region NV Collection
                //_nvCollection.Clear();
                //_nvCollection.Add("@Level3Id-int", level3Id.ToString());
                //_nvCollection.Add("@Level4Id-int", level4Id.ToString());
                //_nvCollection.Add("@Level5Id-int", level5Id.ToString());
                //_nvCollection.Add("@Level6Id-int", level6Id.ToString());
                //_nvCollection.Add("@EmployeeId-int", empid.ToString());
                //_nvCollection.Add("@DoctorId-int", drid.ToString());
                //_nvCollection.Add("@DoctorClass-int", clid.ToString());
                //_nvCollection.Add("@VisitShift-INT", vsid.ToString());
                //_nvCollection.Add("@StartingDate-datetime", dt1.ToString());
                //_nvCollection.Add("@EndingDate-datetime", dt2.ToString());
                #endregion

                #region GET DATA

                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtdcr = dsDcr.Tables["DcrDetails"];

                string URL = ConfigurationManager.AppSettings["DomainURLForMapView"];

                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];

                _nvCollection.Clear();
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                _nvCollection.Add("@DoctorId-int", drid.ToString());
                _nvCollection.Add("@DoctorClass-int", clid.ToString());
                _nvCollection.Add("@VisitShift-INT", vsid.ToString());
                _nvCollection.Add("@JointVisit-INT", jv.ToString());
                _nvCollection.Add("@StartingDate-datetime", dt1.ToString());
                _nvCollection.Add("@EndingDate-datetime", dt2.ToString());
                _nvCollection.Add("@TeamID-INT", skuid.ToString());
                _nvCollection.Add("@EmpStatus-INT", empstatus.ToString());
                _nvCollection.Add("@URL-nvarchar(max)", URL);
                _nvCollection.Add("@EmpType-NVARCHAR(25)", EmpType.ToString());

                DataSet ds = GetData((status == "Live" ? "sp_DailyCallReport_NewParameter" : "sp_DailyCallReport_NewParameter_archive"), _nvCollection);

                #endregion


                #region Process On Work

                dtdcr = ds.Tables[0];

                Session["DailyCallReport"] = dtdcr;

                #endregion


                #region inline query comment
                //                if (jv == "1")
                //                {
                //                    //Joint ProcedureCall
                //                    // dtDailyCallReport = GetData("DailyCallReportSelectjoin1", _nvCollection).Tables[0];
                //                    #region Get Data With JOIN AND START END DATE

                //                    //dtDailyCallReport = GetData("DailyCallReportSelectjoin1", _nvCollection).Tables[0];
                //                    //Joint ProcedureCall
                //                    Query = @"  Select '' AS Level1Name , '' AS Level2Name,VST.division AS Level3Name,Vst.Region AS Level4Name, Vst.zone AS Level5Name,
                //                                            vst.Territory AS Level6Name,VST.EmployeeName AS EmployeeName,VST.MobileNumber AS MobileNumber,VST.CreationDateTime AS CreationDate,
                //                                            VST.DoctorName DoctorName,VST.ClassName AS Class,VST.SpecialiityName AS Speciality,VST.P1,VST.P2,VST.P3,VST.P4,VST.S1,VST.SQ1,VST.S2,VST.SQ2,VST.S3,VST.SQ3,VST.G1,VST.G2,
                //                                            (SELECT vjv.JV1 from v_jointvst vjv where vjv.SalesCallId = VST.SalesCallId) AS JV,VST.VisitShift,VST.VisitShift VisitTime,VST.DocRefID AS 'DocRefID',VisitDateTime AS VisitDate,VST.CreationDateTime AS RecieveDate,
                //                                            VST.EmployeeId,VST.EmployeeCode + Vst.EmployeeName AS MRIdName,VST.DocBrick AS 'DocBrick', VST.R1,VST.R2,VST.R3,
                //CASE WHEN VST.IsPlanned > 0 THEN 'Planned' else 'UnPlanned' END as 'PlanStatus',
                //'@StartingDate' AS 'FromDate' , '@EndingDate' AS 'ToDate'
                //                                            from v_DailyCallReport VST
                //                                            INNER JOIN v_jointvst vjv ON VST.SalesCallId = vjv.SalesCallId
                //                                            WHERE Convert(DATETIME,VST.VisitDateTime,103) BETWEEN CONVERT(DATETIME,'@StartingDate',101) AND CONVERT(DATETIME,'@EndingDate',101)
                //                                            AND
                //                                            VST.Level1LevelId IS NULL AND VST.Level2LevelId IS NULL  and vjv.JV1 is not null  ";

                //                    if (level3Id != "0")
                //                    {
                //                        Query += " AND VST.Level3LevelId = " + level3Id.ToString();
                //                    }
                //                    if (level4Id != "0")
                //                    {
                //                        Query += " AND VST.Level4LevelId = " + level4Id.ToString();
                //                    }
                //                    if (level5Id != "0")
                //                    {
                //                        Query += " AND VST.Level5LevelId = " + level5Id.ToString();
                //                    }
                //                    if (level6Id != "0")
                //                    {
                //                        Query += " AND VST.Level6LevelId = " + level6Id.ToString();
                //                    }
                //                    if (empid != "0")
                //                    {
                //                        Query += " AND VST.EmployeeId = " + empid.ToString();
                //                    }
                //                    if (drid != "0")
                //                    {
                //                        Query += " AND VST.DoctorId = " + drid.ToString();
                //                    }
                //                    if (vsid != "0")
                //                    {
                //                        Query += " AND VST.VisitShift2 " + vsid.ToString();
                //                    }

                //                    Query += " ORDER BY VST.EmployeeId,Vst.SalesCallId";

                //                    Query = Query.Replace("@StartingDate", Convert.ToDateTime(dt1).ToString())
                //                        .Replace("@EndingDate", Convert.ToDateTime(dt2.ToString()).ToString());

                //                    string constr = Classes.Constants.GetConnectionString();
                //                    DataTable dt = new DataTable();
                //                    using (SqlConnection con = new SqlConnection(constr))
                //                    {
                //                        SqlCommand cmd = new SqlCommand();
                //                        cmd.CommandText = Query;
                //                        cmd.Connection = con;
                //                        cmd.CommandTimeout = 20000;
                //                        SqlDataAdapter da = new SqlDataAdapter(cmd);
                //                        da.Fill(dtDailyCallReport);
                //                    }
                //                    #endregion

                //                }
                //                else if (jv == "2")
                //                { //UNJoint ProcedureCall
                //                    // dtDailyCallReport = GetData("DailyCallReportSelectUNjoin1", _nvCollection).Tables[0];
                //                    #region Get Data With Un Join With Start And End Date
                //                    Query = @"Select '' AS Level1Name , '' AS Level2Name,VST.division AS Level3Name,Vst.Region AS Level4Name, Vst.zone AS Level5Name,
                //                                            vst.Territory AS Level6Name,VST.EmployeeName AS EmployeeName,VST.MobileNumber AS MobileNumber,VST.CreationDateTime AS CreationDate,
                //                                            VST.DoctorName DoctorName,VST.ClassName AS Class,VST.SpecialiityName AS Speciality,VST.P1,VST.P2,VST.P3,VST.P4,VST.S1,VST.SQ1,VST.S2,VST.SQ2,VST.S3,VST.SQ3,VST.G1,VST.G2,
                //                                            (SELECT vjv.JV1 from v_jointvst vjv where vjv.SalesCallId = VST.SalesCallId) AS JV,VST.VisitShift,VST.VisitShift VisitTime,VST.DocRefID AS 'DocRefID',VisitDateTime AS VisitDate,VST.CreationDateTime AS RecieveDate,
                //                                            VST.EmployeeId,VST.EmployeeCode + Vst.EmployeeName AS MRIdName,VST.DocBrick AS 'DocBrick', VST.R1,VST.R2,VST.R3,
                //CASE WHEN VST.IsPlanned > 0 THEN 'Planned' else 'UnPlanned' END as 'PlanStatus'
                //,'@StartingDate' AS 'FromDate' , '@EndingDate' AS 'ToDate'
                //                                            from V_DataScreen VST
                //                                            WHERE Convert(DATETIME,VST.VisitDateTime,103) BETWEEN CONVERT(DATETIME,'@StartingDate',101) AND CONVERT(DATETIME,'@EndingDate',101)
                //                                            AND
                //                                            VST.Level1LevelId IS NULL AND VST.Level2LevelId IS NULL ";
                //                    if (level3Id != "0")
                //                    {
                //                        Query += " AND VST.Level3LevelId = " + level3Id.ToString();
                //                    }
                //                    if (level4Id != "0")
                //                    {
                //                        Query += " AND VST.Level4LevelId = " + level4Id.ToString();
                //                    }
                //                    if (level5Id != "0")
                //                    {
                //                        Query += " AND VST.Level5LevelId = " + level5Id.ToString();
                //                    }
                //                    if (level6Id != "0")
                //                    {
                //                        Query += " AND VST.Level6LevelId = " + level6Id.ToString();
                //                    }
                //                    if (empid != "0")
                //                    {
                //                        Query += " AND VST.EmployeeId = " + empid.ToString();
                //                    }
                //                    if (drid != "0")
                //                    {
                //                        Query += " AND VST.DoctorId = " + drid.ToString();
                //                    }
                //                    if (vsid != "0")
                //                    {
                //                        Query += " AND VST.VisitShift2 " + vsid.ToString();
                //                    }

                //                    Query += " ORDER BY VST.EmployeeId,Vst.SalesCallId";

                //                    Query = Query.Replace("@StartingDate", Convert.ToDateTime(dt1).ToString())
                //                        .Replace("@EndingDate", Convert.ToDateTime(dt2.ToString()).ToString());

                //                    string constr = Classes.Constants.GetConnectionString();
                //                    DataTable dt = new DataTable();
                //                    using (SqlConnection con = new SqlConnection(constr))
                //                    {
                //                        SqlCommand cmd = new SqlCommand();
                //                        cmd.CommandText = Query;
                //                        cmd.Connection = con;
                //                        cmd.CommandTimeout = 20000;
                //                        SqlDataAdapter da = new SqlDataAdapter(cmd);
                //                        da.Fill(dtDailyCallReport);
                //                    }
                //                    #endregion

                //                }
                //                else
                //                { //UNJOIN ProcedureCall
                //                    // dtDailyCallReport = GetData("DailyCallReportSelectUNjoin1", _nvCollection).Tables[0];
                //                    #region Get Data With Un Join With Start And End Date
                //                    Query = @"Select '' AS Level1Name , '' AS Level2Name,VST.division AS Level3Name,Vst.Region AS Level4Name, Vst.zone AS Level5Name,
                //                                            vst.Territory AS Level6Name,VST.EmployeeName AS EmployeeName,VST.MobileNumber AS MobileNumber,VST.CreationDateTime AS CreationDate,
                //                                            VST.DoctorName DoctorName,VST.ClassName AS Class,VST.SpecialiityName AS Speciality,VST.P1,VST.P2,VST.P3,VST.P4,VST.S1,VST.SQ1,VST.S2,VST.SQ2,VST.S3,VST.SQ3,VST.G1,VST.G2,
                //                                            (SELECT vjv.JV1 from v_jointvst vjv where vjv.SalesCallId = VST.SalesCallId) AS JV,VST.VisitShift,VST.VisitShift VisitTime,VST.DocRefID AS 'DocRefID',VisitDateTime AS VisitDate,VST.CreationDateTime AS RecieveDate,
                //                                            VST.EmployeeId,VST.EmployeeCode + Vst.EmployeeName AS MRIdName,VST.DocBrick AS 'DocBrick', VST.R1,VST.R2,VST.R3,
                //CASE WHEN VST.IsPlanned > 0 THEN 'Planned' else 'UnPlanned' END as 'PlanStatus',
                //'@StartingDate' AS 'FromDate' , '@EndingDate' AS 'ToDate'
                //                                            from V_DataScreen VST
                //                                            WHERE Convert(DATETIME,VST.VisitDateTime,103) BETWEEN CONVERT(DATETIME,'@StartingDate',101) AND CONVERT(DATETIME,'@EndingDate',101)
                //                                            AND
                //                                            VST.Level1LevelId IS NULL AND VST.Level2LevelId IS NULL ";
                //                    if (level3Id != "0")
                //                    {
                //                        Query += " AND VST.Level3LevelId = " + level3Id.ToString();
                //                    }
                //                    if (level4Id != "0")
                //                    {
                //                        Query += " AND VST.Level4LevelId = " + level4Id.ToString();
                //                    }
                //                    if (level5Id != "0")
                //                    {
                //                        Query += " AND VST.Level5LevelId = " + level5Id.ToString();
                //                    }
                //                    if (level6Id != "0")
                //                    {
                //                        Query += " AND VST.Level6LevelId = " + level6Id.ToString();
                //                    }
                //                    if (empid != "0")
                //                    {
                //                        Query += " AND VST.EmployeeId = " + empid.ToString();
                //                    }
                //                    if (drid != "0")
                //                    {
                //                        Query += " AND VST.DoctorId = " + drid.ToString();
                //                    }
                //                    if (vsid != "0")
                //                    {
                //                        Query += " AND VST.VisitShift2 " + vsid.ToString();
                //                    }

                //                    Query += " ORDER BY VST.EmployeeId,Vst.SalesCallId";

                //                    Query = Query.Replace("@StartingDate", Convert.ToDateTime(dt1).ToString())
                //                        .Replace("@EndingDate", Convert.ToDateTime(dt2.ToString()).ToString());
                //                    string constr = Classes.Constants.GetConnectionString();
                //                    DataTable dt = new DataTable();
                //                    using (SqlConnection con = new SqlConnection(constr))
                //                    {
                //                        SqlCommand cmd = new SqlCommand();
                //                        cmd.CommandText = Query;
                //                        cmd.Connection = con;
                //                        cmd.CommandTimeout = 20000;
                //                        SqlDataAdapter da = new SqlDataAdapter(cmd);
                //                        da.Fill(dtDailyCallReport);
                //                    }
                //                    #endregion
                //                }
                //                DataView dv = new DataView();
                //                dv = dtDailyCallReport.DefaultView;
                //                dv.Sort = "DocRefID";
                //                //CrystalReports.DailyCallReport.CrystalReport41 dcr1 = new CrystalReports.DailyCallReport.CrystalReport41();
                //                //dcr1.SetDataSource(dv);
                //                Session["DailyCallReport"] = dv;
                #endregion


            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Daily Call Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");

            }
            return "das";
        }


        //optimize Report 
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DailyCallReportOpt(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus, string Designation)
        {

            try
            {
                string Query = string.Empty;
                Session["DailyCallReport"] = "";

                #region NV Collection
                //_nvCollection.Clear();
                //_nvCollection.Add("@Level3Id-int", level3Id.ToString());
                //_nvCollection.Add("@Level4Id-int", level4Id.ToString());
                //_nvCollection.Add("@Level5Id-int", level5Id.ToString());
                //_nvCollection.Add("@Level6Id-int", level6Id.ToString());
                //_nvCollection.Add("@EmployeeId-int", empid.ToString());
                //_nvCollection.Add("@DoctorId-int", drid.ToString());
                //_nvCollection.Add("@DoctorClass-int", clid.ToString());
                //_nvCollection.Add("@VisitShift-INT", vsid.ToString());
                //_nvCollection.Add("@StartingDate-datetime", dt1.ToString());
                //_nvCollection.Add("@EndingDate-datetime", dt2.ToString());
                #endregion

                #region GET DATA

                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtdcr = dsDcr.Tables["DcrDetails"];
                string status = GetRptStatus(dt1);
                string URL = ConfigurationManager.AppSettings["DomainURLForMapView"];

                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];

                _nvCollection.Clear();
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                _nvCollection.Add("@DoctorId-int", drid.ToString());
                _nvCollection.Add("@DoctorClass-int", clid.ToString());
                _nvCollection.Add("@VisitShift-INT", vsid.ToString());
                _nvCollection.Add("@JointVisit-INT", jv.ToString());
                _nvCollection.Add("@StartingDate-datetime", dt1.ToString());
                _nvCollection.Add("@EndingDate-datetime", dt2.ToString());
                _nvCollection.Add("@TeamID-INT", skuid.ToString());
                _nvCollection.Add("@EmpStatus-INT", empstatus.ToString());
                _nvCollection.Add("@URL-nvarchar(max)", URL);
                _nvCollection.Add("@Designation-int", Designation.ToString());
                DataSet ds = GetData((status == "Live" ? "sp_DailyCallReport_NewParameter_Design" : "sp_DailyCallReport_NewParameter_Design_archive"), _nvCollection);

                #endregion


                #region Process On Work

                dtdcr = ds.Tables[0];

                Session["DailyCallReport"] = dtdcr;

                #endregion




            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Daily Call Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");

            }
            return "das";
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string MonthlyVisitAnalysisSPO(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus)
        {

            try
            {
                string Query = string.Empty;
                Session["MonthlyVisitAnalysisSPO"] = "";
                string status = GetRptStatus(dt1);

                #region NV Collection
                //_nvCollection.Clear();
                //_nvCollection.Add("@Level3Id-int", level3Id.ToString());
                //_nvCollection.Add("@Level4Id-int", level4Id.ToString());
                //_nvCollection.Add("@Level5Id-int", level5Id.ToString());
                //_nvCollection.Add("@Level6Id-int", level6Id.ToString());
                //_nvCollection.Add("@EmployeeId-int", empid.ToString());
                //_nvCollection.Add("@DoctorId-int", drid.ToString());
                //_nvCollection.Add("@DoctorClass-int", clid.ToString());
                //_nvCollection.Add("@VisitShift-INT", vsid.ToString());
                //_nvCollection.Add("@StartingDate-datetime", dt1.ToString());
                //_nvCollection.Add("@EndingDate-datetime", dt2.ToString());
                #endregion

                #region GET DATA

                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtdcr = dsDcr.Tables["DcrDetails"];

                _nvCollection.Clear();

                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                _nvCollection.Add("@StartingDate-datetime", dt1.ToString());
                _nvCollection.Add("@TeamID-INT", skuid.ToString());
                _nvCollection.Add("@EmpStatus-int", empstatus.ToString());

                DataSet ds = GetData((status == "Live" ? "sp_Monthly_Visit_Analysis_NewParameter" : "sp_Monthly_Visit_Analysis_NewParameter_archive"), _nvCollection);

                #endregion
                if (ds != null)
                {
                    var dtMonthlyVisitAnalysis = ds.Tables[0];
                    if (dtMonthlyVisitAnalysis.Rows.Count == 0)
                    {
                        DataRow dr = dtMonthlyVisitAnalysis.NewRow();
                        dtMonthlyVisitAnalysis.Rows.Add(dr);
                        dtMonthlyVisitAnalysis.Rows[0]["Date"] = Convert.ToDateTime(dt1).ToString("MMMM - yyyy");

                    }

                }

                #region Process On Work

                dtdcr = ds.Tables[0];

                Session["MonthlyVisitAnalysisSPO"] = dtdcr;

                #endregion

            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Daily Call Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");

            }
            return "das";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string AssignDocCount(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus)
        {
            try
            {
                string status = GetRptStatus(dt1);
                Session["AssignDocCount"] = "";
                _nvCollection.Clear();
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-int", level3Id.ToString());
                _nvCollection.Add("@Level4ID-int", level4Id.ToString());
                _nvCollection.Add("@Level5ID-int", level5Id.ToString());
                _nvCollection.Add("@Level6ID-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeID-int", empid.ToString());
                _nvCollection.Add("@TeamID-int", skuid.ToString());
                _nvCollection.Add("@StartingDate-date", Convert.ToDateTime(dt1).ToString());
                _nvCollection.Add("@EmpStatus-int", empstatus.ToString());

                var dtassigndoccount = new DataTable();

                CrystalReports.XSDDatatable.Dsreports dsc = new CrystalReports.XSDDatatable.Dsreports();
                dtassigndoccount = dsc.Tables["AssignDocCount"];

                DataSet ds = GetData((status == "Live" ? "Sp_SPOAssignDocCount_NewParameter" : "Sp_SPOAssignDocCount_NewParameter_archive"), _nvCollection);
                dtassigndoccount = ds.Tables[0];

                //CrystalReports.JVByRegion.JVByRegion JVRegion = new CrystalReports.JVByRegion.JVByRegion();
                //JVRegion.SetDataSource(dtJVbyRegion);
                Session["AssignDocCount"] = dtassigndoccount;
                //JVRegion.Close();
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From JV By Region Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DetailedWorkPlanReport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {

            try
            {
                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtPlanningReport = dsDcr.Tables["DetailedWorkPlanReport"];
                string Query = string.Empty;
                Session["DetailedWorkPlanReport"] = "";
                DataTable dtWorkPlanReport = new DataTable();
                #region NV Collection
                _nvCollection.Clear();
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                _nvCollection.Add("@Day-INT", Convert.ToDateTime(dt1).Day.ToString());
                _nvCollection.Add("@Month-INT", Convert.ToDateTime(dt1).Month.ToString());
                _nvCollection.Add("@Year-INT", Convert.ToDateTime(dt1).Year.ToString());
                #endregion

                string CallTodayA = "0", CallTodayB = "0", CallTodayC = "0", CallTodateA = "0", CallTodateB = "0", CallTodateC = "0";
                int Noofdays = 0;

                DataSet dsforreprt = GetData("sp_DetailedWorkPlanReport", _nvCollection);
                _nvCollection.Clear();
                _nvCollection.Add("@EmployeeID-INT", empid.ToString());
                DataSet dsforTodate = GetData("sp_DetailedPlanReportTodate", _nvCollection);
                _nvCollection.Clear();
                _nvCollection.Add("@EmployeeID-INT", empid.ToString());
                _nvCollection.Add("@DAY-INT", Convert.ToDateTime(dt1).Day.ToString());
                _nvCollection.Add("@MONTH-INT", Convert.ToDateTime(dt1).Month.ToString());
                _nvCollection.Add("@Year-INT", Convert.ToDateTime(dt1).Year.ToString());
                DataSet dsforToday = GetData("sp_DetailedPlanReportToDay", _nvCollection);
                if (dsforreprt != null)
                {
                    dtWorkPlanReport = dsforreprt.Tables[0];
                }
                if (dsforTodate != null)
                    if (dsforTodate.Tables[0].Rows.Count != 0)
                    {
                        if (dsforTodate.Tables[0].Rows.Count == 1)
                        {
                            CallTodateA = dsforTodate.Tables[0].Rows[0]["ToDateCount"].ToString();
                            Noofdays = Convert.ToInt32(dsforTodate.Tables[0].Rows[0]["NoOfDays"].ToString());
                        }
                        else if (dsforTodate.Tables[0].Rows.Count == 2)
                        {
                            CallTodateA = dsforTodate.Tables[0].Rows[0]["ToDateCount"].ToString();
                            CallTodateB = dsforTodate.Tables[0].Rows[1]["ToDateCount"].ToString();

                            Noofdays = Convert.ToInt32(dsforTodate.Tables[0].Rows[0]["NoOfDays"].ToString());
                            Noofdays += Convert.ToInt32(dsforTodate.Tables[0].Rows[1]["NoOfDays"].ToString());
                        }
                        else if (dsforTodate.Tables[0].Rows.Count == 3)
                        {
                            CallTodateA = dsforTodate.Tables[0].Rows[0]["ToDateCount"].ToString();
                            CallTodateB = dsforTodate.Tables[0].Rows[1]["ToDateCount"].ToString();
                            CallTodateC = dsforTodate.Tables[0].Rows[2]["ToDateCount"].ToString();

                            Noofdays = Convert.ToInt32(dsforTodate.Tables[0].Rows[0]["NoOfDays"].ToString());
                            Noofdays += Convert.ToInt32(dsforTodate.Tables[0].Rows[1]["NoOfDays"].ToString());
                            Noofdays += Convert.ToInt32(dsforTodate.Tables[0].Rows[2]["NoOfDays"].ToString());
                        }
                    }

                if (dsforToday != null)
                    if (dsforToday.Tables[0].Rows.Count != 0)
                    {
                        if (dsforToday.Tables[0].Rows.Count == 1)
                        {
                            CallTodayA = dsforToday.Tables[0].Rows[0]["ToDateCount"].ToString();
                        }
                        else if (dsforToday.Tables[0].Rows.Count == 2)
                        {
                            CallTodayA = dsforToday.Tables[0].Rows[0]["ToDateCount"].ToString();
                            CallTodayB = dsforToday.Tables[0].Rows[1]["ToDateCount"].ToString();
                        }
                        else if (dsforToday.Tables[0].Rows.Count == 3)
                        {
                            CallTodayA = dsforToday.Tables[0].Rows[0]["ToDateCount"].ToString();
                            CallTodayB = dsforToday.Tables[0].Rows[1]["ToDateCount"].ToString();
                            CallTodayC = dsforToday.Tables[0].Rows[2]["ToDateCount"].ToString();
                        }
                    }


                DataView dv = new DataView();
                dv = dtWorkPlanReport.DefaultView;
                dv.Sort = "PlannedDateTime";

                Session["CallTodayA"] = CallTodayA;
                Session["CallTodayB"] = CallTodayB;
                Session["CallTodayC"] = CallTodayC;
                Session["CallTodateA"] = CallTodateA;
                Session["CallTodateB"] = CallTodateB;
                Session["CallTodateC"] = CallTodateC;
                Session["Noofdays"] = Noofdays.ToString();

                //CrystalReports.DetailedWorkPlan.DetailedWorkPlan dcr1 = new CrystalReports.DetailedWorkPlan.DetailedWorkPlan();
                Session["DetailedWorkPlanReport"] = dv;
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Detailed Work Plan Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }





            return "das";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DescribedProducts(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                Session["DescribedProducts"] = "";

                #region Select Record on the basis of Days Select

                #region NV Collection
                _nvCollection.Clear();
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
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


                if (jv == "1")
                { //Joint ProcedureCall
                    dtDailyCallReport = GetData("DescribedProductSelectjoin1", _nvCollection).Tables[0];

                }
                else if (jv == "2")
                {  //UNJoint ProcedureCall
                    dtDailyCallReport = GetData("DescribedProductSelectUNjoin1", _nvCollection).Tables[0];

                }
                else
                { //UNJOIN ProcedureCall
                    dtDailyCallReport = GetData("DescribedProductSelectUNjoin1", _nvCollection).Tables[0];

                }


                #endregion

                #region Display Report

                DataView dv = new DataView();
                dv = dtDailyCallReport.DefaultView;
                //CrystalReports.DescribedProducts.DescribedProducts dcr1 = new CrystalReports.DescribedProducts.DescribedProducts();
                //dcr1.SetDataSource(dv);
                Session["DescribedProducts"] = dv;
                #endregion

            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Described Products Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string SampleIssuedToDoc(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                Session["SampleIssuedToDoc"] = "";
                var SampleIssuedToDoc = new DataTable();
                CrystalReports.XSDDatatable.Dsreports dsr = new CrystalReports.XSDDatatable.Dsreports();
                SampleIssuedToDoc = dsr.Tables["SamplesIssuedToDoctor"];


                #region NV Collection
                _nvCollection.Clear();
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-int", level3Id.ToString());
                _nvCollection.Add("@Level4ID-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6ID-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeID-int", empid.ToString());
                _nvCollection.Add("@DoctorID-int", drid.ToString());
                _nvCollection.Add("@VisitShift-INT", vsid.ToString());
                _nvCollection.Add("@productID-int", skuid.ToString());
                _nvCollection.Add("@DateStart-datetime", Convert.ToDateTime(dt1).ToString());
                _nvCollection.Add("@DateEnd-datetime", Convert.ToDateTime(dt2).ToString());
                #endregion


                DataSet ds = GetData("sp_SampleIssuedTodoc", _nvCollection);
                if (ds != null)
                    if (ds.Tables[0].Rows.Count != 0)
                    {
                        SampleIssuedToDoc = ds.Tables[0];
                    }
                #region Display Report

                DataView dv = new DataView();
                dv = SampleIssuedToDoc.DefaultView;
                //CrystalReports.SampleIssuedToDoc.SampleToDoctor dcr1 = new CrystalReports.SampleIssuedToDoc.SampleToDoctor();
                //dcr1.SetDataSource(dv);
                Session["SampleIssuedToDoc"] = dv;
                //dcr1.Close();
                #endregion
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Described Products Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string samples_inventry(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {

            try
            {
                //DataTable dtDailyCallReport = new DataTable();
                Session["total_and_balance"] = null;
                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtsamples = dsDcr.Tables["td_samples_and_gifts"];

                int monthf = Convert.ToDateTime(dt1).Month;
                int yearf = Convert.ToDateTime(dt1).Year;
                string type = "S";
                _nvCollection.Clear();
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-int", level3Id.ToString());
                _nvCollection.Add("@Level4ID-int", level4Id.ToString());
                _nvCollection.Add("@Level5ID-int", level5Id.ToString());
                _nvCollection.Add("@Level6ID-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeID-int", empid.ToString());
                _nvCollection.Add("@type-varchar-(100)", type.ToString());
                _nvCollection.Add("@month-int", monthf.ToString());
                _nvCollection.Add("@year-int", yearf.ToString());

                DataSet ds = GetData("sp_balance_for_report", _nvCollection);
                //dtDailyCallReport = ds.Tables[0];

                if (ds != null)
                {
                    dtsamples = ds.Tables[0];
                    Session["total_and_balance"] = dtsamples;
                }
                ds.Dispose();
                //dtDailyCallReport.Dispose();

            }
            catch (Exception ex)
            {
                Session["total_and_balance"] = null;
                Constants.ErrorLog("total_and_balance : " + ex.Message.ToString() + "Stack: " + ex.StackTrace.ToString());
            }

            return "das";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpcountryVsLocalWorking(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {

            try
            {
                //DataTable dtDailyCallReport = new DataTable();
                Session["Upcountry_Vs_LocalWorking"] = null;
                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtsamples = dsDcr.Tables["td_samples_and_gifts"];

                int monthf = Convert.ToDateTime(dt1).Month;
                int yearf = Convert.ToDateTime(dt1).Year;
                string type = "S";
                _nvCollection.Clear();
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1ID-INT", level1Id.ToString());
                _nvCollection.Add("@Level2ID-INT", level2Id.ToString());
                _nvCollection.Add("@Level3ID-INT", level3Id.ToString());
                _nvCollection.Add("@Level4ID-INT", level4Id.ToString());
                _nvCollection.Add("@Level5ID-INT", level5Id.ToString());
                _nvCollection.Add("@Level6ID-INT", level6Id.ToString());
                _nvCollection.Add("@EmployeeID-INT", empid.ToString());
                _nvCollection.Add("@Month-int", monthf.ToString());
                _nvCollection.Add("@Year-int", yearf.ToString());
                _nvCollection.Add("@TeamID-INT", skuid.ToString());

                DataSet ds = GetData("UpcountryVsLocalWorking", _nvCollection);
                //dtDailyCallReport = ds.Tables[0];

                if (ds != null)
                {
                    dtsamples = ds.Tables[0];
                    Session["Upcountry_Vs_LocalWorking"] = dtsamples;
                }
                ds.Dispose();
                //dtDailyCallReport.Dispose();

            }
            catch (Exception ex)
            {
                Session["Upcountry_Vs_LocalWorking"] = null;
                Constants.ErrorLog("Upcountry_Vs_LocalWorking : " + ex.Message.ToString() + "Stack: " + ex.StackTrace.ToString());
            }

            return "das";
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string MrList(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus)
        {
            try
            {
                Session["MRList"] = null;
                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtsamples = dsDcr.Tables["MRs"];
                #region Initialization of Custom DataTable columns
                #endregion

                _nvCollection.Clear();
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-int", level3Id.ToString());
                _nvCollection.Add("@Level4ID-int", level4Id.ToString());
                _nvCollection.Add("@Level5ID-int", level5Id.ToString());
                _nvCollection.Add("@Level6ID-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeID-int", empid.ToString());
                _nvCollection.Add("@TeamID-int", skuid.ToString());
                _nvCollection.Add("@EmpStatus-int", empstatus.ToString());

                DataSet ds = GetData("sp_MRList_Report_NewParameter", _nvCollection);
                //dtDailyCallReport = ds.Tables[0];

                if (ds != null)
                {
                    dtsamples = ds.Tables[0];
                    Session["MRList"] = dtsamples;
                }
                ds.Dispose();
                #region Comment Old Work

                #region Initialization of Custom DataTable columns Comments
                //var dtMrList = new DataTable();

                //dtMrList.Columns.Add(new DataColumn("ID", Type.GetType("System.String")));
                //dtMrList.Columns.Add(new DataColumn("Name", Type.GetType("System.String")));
                //dtMrList.Columns.Add(new DataColumn("Designation", Type.GetType("System.String")));
                //dtMrList.Columns.Add(new DataColumn("Level1Name", Type.GetType("System.String")));
                //dtMrList.Columns.Add(new DataColumn("Level2Name", Type.GetType("System.String")));
                //dtMrList.Columns.Add(new DataColumn("Level3Name", Type.GetType("System.String")));
                //dtMrList.Columns.Add(new DataColumn("Level4Name", Type.GetType("System.String")));
                //dtMrList.Columns.Add(new DataColumn("Level5Name", Type.GetType("System.String")));
                //dtMrList.Columns.Add(new DataColumn("Level6Name", Type.GetType("System.String")));
                //dtMrList.Columns.Add(new DataColumn("MobileNumber", Type.GetType("System.String")));
                //dtMrList.Columns.Add(new DataColumn("Status", Type.GetType("System.Boolean")));

                #endregion

                //List<DatabaseLayer.SQL.v_EmployeeDetailWithType> _mrList;
                //_mrList = _dataContext.sp_MRList(Convert.ToInt32(level3Id), Convert.ToInt32(level4Id), Convert.ToInt32(level5Id), Convert.ToInt32(level6Id), Convert.ToInt32(empid)).ToList();


                //foreach (var mr in _mrList)
                //{
                //    dtMrList.Rows.Add(mr.EmployeeId, mr.EmployeeName, mr.DesignationName, level1Id, level1Id, mr.Level3Name, mr.Level4Name,
                //        mr.Level5Name, mr.Level6Name, mr.MobileNumber, Convert.ToBoolean(mr.IsActive));
                //}

                //CrystalReports.MRs.MRs mrlist = new CrystalReports.MRs.MRs();
                //mrlist.SetDataSource(dtMrList);
                //Session["MRList"] = dtMrList;
                // mrlist.Close();
                #endregion

            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From MR List Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string MrListAllLevel(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus)
        {
            try
            {
                Session["MrListAllLevel"] = null;
                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtsamples = dsDcr.Tables["MRsAll"];
                #region Initialization of Custom DataTable columns
                #endregion

                _nvCollection.Clear();
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-int", level3Id.ToString());
                _nvCollection.Add("@Level4ID-int", level4Id.ToString());
                _nvCollection.Add("@Level5ID-int", level5Id.ToString());
                _nvCollection.Add("@Level6ID-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeID-int", empid.ToString());
                _nvCollection.Add("@TeamID-int", skuid.ToString());
                _nvCollection.Add("@EmpStatus-int", empstatus.ToString());

                DataSet ds = GetData("sp_MRList(All)_Report", _nvCollection);
                //dtDailyCallReport = ds.Tables[0];

                if (ds != null)
                {
                    dtsamples = ds.Tables[0];
                    Session["MrListAllLevel"] = dtsamples;
                }
                ds.Dispose();
                #region Comment Old Work

                #region Initialization of Custom DataTable columns Comments

                #endregion


                #endregion

            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From MR List Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string MrDrList(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus, string Designation)
        {
            try
            {

                #region Initialization of Custom DataTable columns
                var dtMrDoctorList = new DataTable();
                CrystalReports.XSDDatatable.Dsreports dsr = new CrystalReports.XSDDatatable.Dsreports();
                dtMrDoctorList = dsr.Tables["MRDoctors"];
                string status = GetRptStatus(dt1);
                #endregion

                _nvCollection.Clear();
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-bigint", empid.ToString());
                _nvCollection.Add("@TeamID-int", skuid.ToString());
                _nvCollection.Add("@Date-date", dt2.ToString());
                _nvCollection.Add("@EmpStatus-int", empstatus.ToString());
                _nvCollection.Add("@Designation-int", Designation.ToString());
                DataSet ds = GetData((status == "Live" ? "Report_MRDR_NewParameter_Design" : "Report_MRDR_NewParameter_Design_archive"), _nvCollection);
                DataView dv = new DataView();
                if (ds != null)
                    if (ds.Tables[0].Rows.Count != 0)
                    {
                        dtMrDoctorList = ds.Tables[0];
                    }

                //CrystalReports.MRDoctors.MRDoctors dpf = new CrystalReports.MRDoctors.MRDoctors();
                //dpf.SetDataSource(dtMrDoctorList);
                Session["MRDoctor"] = dtMrDoctorList;
                // dpf.Close();

            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From MR Doctor Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DetailedProductFrequency(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                Session["DetailedProductsfrq"] = "";

                #region NV Collection

                _nvCollection.Clear();
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeID-int", empid.ToString());
                _nvCollection.Add("@DocID-int", drid.ToString());
                _nvCollection.Add("@vistTime-varchar-5", vsid.ToString());
                _nvCollection.Add("@JV-varchar-5", jv.ToString());
                _nvCollection.Add("@Date-date", dt1.ToString());

                #endregion

                #region
                DataSet ds = GetData("sp_DetailedProductfreq", _nvCollection);
                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtDetailedProducts = dsDcr.Tables["DetailedProductsFrequency"];

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
                #endregion

                #region
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
                                dr["Dateofdata"] = Convert.ToDateTime(dt1);
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
                                dr["Dateofdata"] = Convert.ToDateTime(dt1);
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
                #endregion

                DataView dv = new DataView();
                dv = dtDetailedProducts.DefaultView;
                //CrystalReports.DetailedProductFrequency.DetailedProductFreq dpf = new CrystalReports.DetailedProductFrequency.DetailedProductFreq();
                //dpf.SetDataSource(dv);
                Session["DetailedProductsfrq"] = dv;

            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Detailed Products frq Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DetailedProductFrequencyByDivision(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                Session["DetailedProductsfrqD"] = "";

                #region NV Collection

                _nvCollection.Clear();
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeID-int", empid.ToString());
                _nvCollection.Add("@DocID-int", drid.ToString());
                _nvCollection.Add("@vistTime-INT", vsid.ToString());
                _nvCollection.Add("@JV-varchar-5", jv.ToString());
                _nvCollection.Add("@Date-date", dt1.ToString());

                #endregion
                DataSet ds = GetData("sp_DetailProdctFreqByDivision", _nvCollection);

                #region

                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtDetailedProducts = dsDcr.Tables["DetailedProductsFrequency"];

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
                #endregion

                #region
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

                        dtDetailedProducts.Rows[0]["Dateofdata"] = Convert.ToDateTime(dt1).ToString("y");



                    }

                #endregion

                DataView dv = new DataView();
                dv = dtDetailedProducts.DefaultView;
                //CrystalReports.DetailedProductFrequency.DetailedProductFreq dpf = new CrystalReports.DetailedProductFrequency.DetailedProductFreq();
                //dpf.SetDataSource(dv);
                Session["DetailedProductsfrqD"] = dv;
                //dpf.Close();

            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Detailed Products frq Division Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string JVReport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                Session["JVReport"] = "";
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-INT", level3Id.ToString());
                _nvCollection.Add("@Level4ID-INT", level4Id.ToString());
                _nvCollection.Add("@Level5ID-INT", level5Id.ToString());
                _nvCollection.Add("@Level6ID-INT", level6Id.ToString());
                _nvCollection.Add("@EmployeeID-INT", empid.ToString());
                _nvCollection.Add("@DocID-INT", drid.ToString());
                _nvCollection.Add("@vistTime-varchar-5", vsid.ToString());
                _nvCollection.Add("@JV-varchar-5", jv.ToString());
                _nvCollection.Add("@Date-date", Convert.ToDateTime(dt1).ToString());
                DataSet ds = GetData("crmreport_JVReport", _nvCollection);

                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtJVReport = dsDcr.Tables["JVReport"];

                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count != 0)
                    {

                        #region
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


                        #endregion

                    }
                }

                //CrystalReports.JVReport.JVReport jvR = new CrystalReports.JVReport.JVReport();
                //jvR.SetDataSource(dtJVReport);
                Session["JVReport"] = dtJVReport;
                //jvR.Close();
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From JV Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string JVByRegion(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                Session["JVRegion"] = "";
                _nvCollection.Clear();
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-int", level3Id.ToString());
                _nvCollection.Add("@Level4ID-int", level4Id.ToString());
                _nvCollection.Add("@Level5ID-int", level5Id.ToString());
                _nvCollection.Add("@Level6ID-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeID-int", empid.ToString());
                _nvCollection.Add("@DocID-int", drid.ToString());
                _nvCollection.Add("@vistTime-int", vsid.ToString());
                _nvCollection.Add("@JV-int", "1");
                _nvCollection.Add("@Date-date", Convert.ToDateTime(dt1).ToString());

                var dtJVbyRegion = new DataTable();

                CrystalReports.XSDDatatable.Dsreports dsc = new CrystalReports.XSDDatatable.Dsreports();
                dtJVbyRegion = dsc.Tables["JVbyRegion"];

                DataSet ds = GetData("SP_JVByRegion", _nvCollection);
                dtJVbyRegion = ds.Tables[0];

                //CrystalReports.JVByRegion.JVByRegion JVRegion = new CrystalReports.JVByRegion.JVByRegion();
                //JVRegion.SetDataSource(dtJVbyRegion);
                Session["JVByRegion"] = dtJVbyRegion;
                //JVRegion.Close();
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From JV By Region Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string MonthlyVisitAnalysis(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                Session["MonthlyVisitAnalysis"] = "";

                int[] arr = new int[6];
                int start = Convert.ToDateTime(dt1).Month;
                int stop = Convert.ToDateTime(dt2).Month;
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
                switch (Convert.ToDateTime(dt2).Month)
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
                if (Convert.ToDateTime(dt2).Month == 2 && (Convert.ToDateTime(dt2).Year % 4) == 0)
                {
                    lastDayOfMonth = 29;
                }

                _nvCollection.Clear();
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-INT", level3Id.ToString());
                _nvCollection.Add("@Level4ID-INT", level4Id.ToString());
                _nvCollection.Add("@Level5ID-INT", level5Id.ToString());
                _nvCollection.Add("@Level6ID-INT", level6Id.ToString());
                _nvCollection.Add("@EmployeeID-INT", empid.ToString());
                _nvCollection.Add("@DateStart-date", Convert.ToDateTime(dt1).ToString());
                _nvCollection.Add("@DateEnd-date", Convert.ToDateTime(dt2).ToString());
                DataSet ds = new DataSet();

                CrystalReports.XSDDatatable.Dsreports dsc = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtVisitsByMonth = dsc.Tables["VisitsByMonth"];

                ds = GetData("sp_MDVAReport", _nvCollection);

                #region Prameter

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
                NameValueCollection nvformondths = new NameValueCollection();
                #endregion

                if (ds != null)
                {
                    #region FOR LOOP

                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        if ((docID == Convert.ToString(ds.Tables[0].Rows[i]["DocID"]))
                       && (MR_ID == Convert.ToString(ds.Tables[0].Rows[i]["MR_ID"])))
                        {
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
                                    //if (monthDays.Length <= 16)
                                    //{
                                    //    dr["Month" + visitDateCount] = monthDays.Substring(0, monthDays.Length - 2);
                                    //}
                                    //else
                                    //{
                                    //    dr["Month" + visitDateCount] = monthDays.Substring(0, 14) + " *";
                                    //}
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
                        }
                        else
                        {
                            if ((flagBegin == 1 && flag == 1) || (flag2 == 1))
                            {
                                if (visitDateCount != 0)
                                {
                                    dr["Month" + visitDateCount] = monthDays;
                                    //if (monthDays.Length <= 16)
                                    //{
                                    //    dr["Month" + visitDateCount] = monthDays.Substring(0, monthDays.Length - 2);
                                    //}
                                    //else
                                    //{
                                    //    dr["Month" + visitDateCount] = monthDays.Substring(0, 14) + " *";
                                    //}
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
                        }
                    }

                    #endregion
                    if (flag == 1 || flag2 == 1)
                    {
                        if (visitDateCount != 0)
                        {
                            dr["Month" + visitDateCount] = monthDays;
                            //if (monthDays.Length <= 16)
                            //{
                            //    dr["Month" + visitDateCount] = monthDays.Substring(0, monthDays.Length - 2);
                            //}
                            //else
                            //{
                            //    dr["Month" + visitDateCount] = monthDays.Substring(0, 14) + " *";
                            //}
                        }
                        dtVisitsByMonth.Rows.Add(dr);
                    }

                    // CrystalReports.MonthlyVisitAnalysis.VisitsByMonth reportDocument = new CrystalReports.MonthlyVisitAnalysis.VisitsByMonth();

                    //Session["Month1Name"] = Convert.ToDateTime(dt1);
                    //Session["Month2Name"] = Convert.ToDateTime(dt2);

                    // reportDocument.SetDataSource(dtVisitsByMonth);

                    Session["MVADate1"] = Convert.ToDateTime(dt1);
                    Session["MVADate2"] = Convert.ToDateTime(dt2);
                    Session["MonthlyVisitAnalysis"] = dtVisitsByMonth;
                    //reportDocument.Close();

                }
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From MonthlyVisitAnalysis Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string VisitByTime(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                #region
                var dtVisitByTime = new DataTable();
                var dsVisitShiftM = new DataSet();
                var dsVisitShiftE = new DataSet();

                CrystalReports.XSDDatatable.Dsreports dsr = new CrystalReports.XSDDatatable.Dsreports();
                dtVisitByTime = dsr.Tables["VisitsByTime"];

                _nvCollection.Clear();
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", Convert.ToString(level3Id));
                _nvCollection.Add("@Level4Id-int", Convert.ToString(level4Id));
                _nvCollection.Add("@Level5Id-int", Convert.ToString(level5Id));
                _nvCollection.Add("@Level6Id-int", Convert.ToString(level6Id));
                _nvCollection.Add("@EmployeeId-int", Convert.ToString(empid));
                _nvCollection.Add("@StartingDate-DateTime", Convert.ToString(Convert.ToDateTime(dt1)));
                _nvCollection.Add("@EndingDate-DateTime", Convert.ToString(Convert.ToDateTime(dt2)));
                dsVisitShiftM = GetData("Report_VisitByTime", _nvCollection);


                DataView dv = new DataView();
                if (dsVisitShiftM != null)
                    if (dsVisitShiftM.Tables[0].Rows.Count != 0)
                    {
                        dtVisitByTime = dsVisitShiftM.Tables[0];
                    }

                //CrystalReports.VisitByTime.VisitsByTime dpf = new CrystalReports.VisitByTime.VisitsByTime();
                //dpf.SetDataSource(dtVisitByTime);
                Session["VisitByTime"] = dtVisitByTime;
                // dpf.Close();
                #endregion
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From VisitByTime Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string SmsStatus(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                Session["SmsStatus"] = "";
                var SmsStatus = new DataTable();
                CrystalReports.XSDDatatable.Dsreports dsr = new CrystalReports.XSDDatatable.Dsreports();
                SmsStatus = dsr.Tables["SMS_Status"];
                // List<DatabaseLayer.SQL.SMSInbound> _getSmsStatus;

                _nvCollection.Clear();
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", Convert.ToString(level3Id));
                _nvCollection.Add("@Level4Id-int", Convert.ToString(level4Id));
                _nvCollection.Add("@Level5Id-int", Convert.ToString(level5Id));
                _nvCollection.Add("@Level6Id-int", Convert.ToString(level6Id));
                _nvCollection.Add("@EmployeeId-int", Convert.ToString(empid));
                _nvCollection.Add("@StartingDate-DateTime", Convert.ToString(Convert.ToDateTime(dt1)));
                _nvCollection.Add("@EndingDate-DateTime", Convert.ToString(Convert.ToDateTime(dt2)));

                SmsStatus = GetData("SP_SMSStatus", _nvCollection).Tables[0];

                //CrystalReports.SmsStatus.SMSStatus smsst = new CrystalReports.SmsStatus.SMSStatus();
                //smsst.SetDataSource(SmsStatus);
                Session["SmsStatus"] = SmsStatus;
                // smsst.Close();
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From SmsStatus Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");

            }

            return "das";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string KPIByClass(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus)
        {
            try
            {
                Session["KPIByClass"] = "";
                _nvCollection.Clear();
                string status = GetRptStatus(dt1);
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1id-int", level1Id.ToString());
                _nvCollection.Add("@Level2id-int", level2Id.ToString());
                _nvCollection.Add("@Level3id-int", level3Id.ToString());
                _nvCollection.Add("@Level4id-int", level4Id.ToString());
                _nvCollection.Add("@Level5id-int", level5Id.ToString());
                _nvCollection.Add("@Level6id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                _nvCollection.Add("@Month-int", Convert.ToDateTime(dt1).Month.ToString());
                _nvCollection.Add("@Year-int", Convert.ToDateTime(dt1).Year.ToString());
                _nvCollection.Add("@endmonth-int", Convert.ToDateTime(dt2).Month.ToString());
                _nvCollection.Add("@TeamID-int", skuid.ToString());
                _nvCollection.Add("@EmpStatus-int", empstatus.ToString());

                DataSet ds = new DataSet();

                //if (level3Id != "0" && level4Id == "0" && level5Id == "0" && level6Id == "0")
                //{
                //    ds = GetData("sp_NewKPIbyClass_qua_division", _nvCollection);
                //}
                //else if (level4Id != "0" && level5Id == "0" && level6Id == "0")
                //{
                //    ds = GetData("sp_NewKPIbyClass_qua_region", _nvCollection);
                //}
                //else if (level5Id != "0" && level6Id == "0")
                //{
                //    ds = GetData("sp_NewKPIbyClass_qua_zone", _nvCollection);
                //}
                //else
                //{
                ds = GetData((status == "Live" ? "sp_NewKPIbyClass_qua_NewParameter" : "sp_NewKPIbyClass_qua_NewParameter_archive"), _nvCollection);
                //}

                if (ds != null)
                {
                    dtDailyCallReport = ds.Tables[0];
                    if (dtDailyCallReport.Rows.Count == 0)
                    {
                        //DataRow dr = dtDailyCallReport.NewRow();
                        //dtDailyCallReport.Rows.Add(dr);
                        //dtDailyCallReport.Rows[0]["DateofrRprt"] = Convert.ToDateTime(dt1).ToString("MMMM yyyy") + "to" + Convert.ToDateTime(dt2).ToString("MMMM yyyy");
                    }
                }
                //dtDailyCallReport.Rows[0]["DateofrRprt"] = Convert.ToDateTime(dt1).ToString("MMMM yyyy");
                //CrystalReports.KPIByClass.KPIbyClass Kpi = new CrystalReports.KPIByClass.KPIbyClass();
                //Kpi.SetDataSource(dtDailyCallReport);
                Session["KPIByClass"] = dtDailyCallReport;
                //  Kpi.Close();
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From KPI By Class Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ForecastdKPIByClass(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                Session["ForeCastdKPIByClass"] = "";
                _nvCollection.Clear();
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3id-int", level3Id);
                _nvCollection.Add("@Level4id-int", level4Id);
                _nvCollection.Add("@Level5id-int", level5Id);
                _nvCollection.Add("@Level6id-int", level6Id);
                _nvCollection.Add("@EmployeeId-int", empid);
                _nvCollection.Add("@Month-int", Convert.ToDateTime(dt1).Month.ToString());
                _nvCollection.Add("@Year-int", Convert.ToDateTime(dt1).Year.ToString());

                DataSet ds = new DataSet();
                ds = GetData("sp_ForcastedKPIByClassPlanning", _nvCollection);
                if (ds != null)
                {
                    dtDailyCallReport = ds.Tables[0];
                    if (dtDailyCallReport.Rows.Count == 0)
                    {
                        DataRow dr = dtDailyCallReport.NewRow();
                        dtDailyCallReport.Rows.Add(dr);
                        dtDailyCallReport.Rows[0]["DateofrRprt"] = Convert.ToDateTime(dt1).ToString("MMMM yyyy");
                    }
                }
                dtDailyCallReport.Rows[0]["DateofrRprt"] = Convert.ToDateTime(dt1).ToString("MMMM yyyy");
                //CrystalReports.ForecastedKPIByClass.ForecastedKPIByClass Kpi = new CrystalReports.ForecastedKPIByClass.ForecastedKPIByClass();
                //Kpi.SetDataSource(dtDailyCallReport);
                Session["ForeCastdKPIByClass"] = dtDailyCallReport;
                //Kpi.Close();
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From ForeCastdKPIByClass Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string JVByClass(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                Session["JVByClass"] = "";

                _nvCollection.Clear();
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@employeeid-int", empid.ToString());
                _nvCollection.Add("@month-int", Convert.ToDateTime(dt1).Month.ToString());
                _nvCollection.Add("@year-int", Convert.ToDateTime(dt1).Year.ToString());
                _nvCollection.Add("@DocId-int", drid.ToString());

                DataSet dsjvclass = new DataSet();
                dsjvclass = GetData("sp_JVByClass", _nvCollection);

                var dtJVByClass = new DataTable();
                CrystalReports.XSDDatatable.Dsreports dcs = new CrystalReports.XSDDatatable.Dsreports();
                dtJVByClass = dcs.Tables["JVbyClass"];

                if (dsjvclass != null)
                {
                    if (dsjvclass.Tables[0].Rows.Count != 0)
                    {
                        dtJVByClass = dsjvclass.Tables[0];
                        dtJVByClass.Rows[0]["DateofRprt"] = Convert.ToDateTime(dt1).ToString("y");

                    }
                }
                DataView dv = new DataView();
                dv = dtJVByClass.DefaultView;
                //CrystalReports.JVByClass.JVbyClass dcr1 = new CrystalReports.JVByClass.JVbyClass();
                //dcr1.SetDataSource(dv);
                Session["JVByClass"] = dv;


            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From JVByClass Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string IncomingSMSSummary(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                Session["incomingSummary"] = "";
                _nvCollection.Clear();
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-int", level3Id.ToString());
                _nvCollection.Add("@Level4ID-int", level4Id.ToString());
                _nvCollection.Add("@Level5ID-int", level5Id.ToString());
                _nvCollection.Add("@Level6ID-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeID-int", empid.ToString());
                _nvCollection.Add("@DateStart-date", Convert.ToDateTime(dt1).ToString());
                _nvCollection.Add("@DateEND-date", Convert.ToDateTime(dt2).ToString());

                DataSet ds = GetData("sp_incomingSummary", _nvCollection);
                dtDailyCallReport = ds.Tables[0];

                DataView dv = new DataView();
                dv = dtDailyCallReport.DefaultView;
                //CrystalReports.IncommingSmsSummary.IncomingSMSSummary dcr1 = new CrystalReports.IncommingSmsSummary.IncomingSMSSummary();
                //dcr1.SetDataSource(dv);
                Session["incomingSummary"] = dv;

            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Incoming Summary Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string MRSMSAccuracy(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                var MRSMSAccuracy = new DataTable();
                CrystalReports.XSDDatatable.Dsreports dsr = new CrystalReports.XSDDatatable.Dsreports();
                MRSMSAccuracy = dsr.Tables["MR_SMS_Accuracy"];

                Session["MRSMSAccuracy"] = "";
                _nvCollection.Clear();
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-int", level3Id.ToString());
                _nvCollection.Add("@Level4ID-int", level4Id.ToString());
                _nvCollection.Add("@Level5ID-int", level5Id.ToString());
                _nvCollection.Add("@Level6ID-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeID-int", empid.ToString());
                _nvCollection.Add("@DateStart-date", Convert.ToDateTime(dt1).ToString());
                _nvCollection.Add("@DateEND-date", Convert.ToDateTime(dt2).ToString());


                DataSet ds = GetData("Report_SMSAccuracyReport", _nvCollection);
                MRSMSAccuracy = ds.Tables[0];

                //CrystalReports.MRSMSAccuracy.rptDivisionDateWiseAccuracyReport mRSMSa = new CrystalReports.MRSMSAccuracy.rptDivisionDateWiseAccuracyReport();
                //mRSMSa.SetDataSource(MRSMSAccuracy);
                Session["MRSMSAccuracy"] = MRSMSAccuracy;


            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From MRSMSAccuracy Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string MessageCount(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                Session["MessageCount"] = "";

                var MessageCount = new DataTable();
                CrystalReports.XSDDatatable.Dsreports dsr = new CrystalReports.XSDDatatable.Dsreports();
                MessageCount = dsr.Tables["DateWiseMessageStatus"];

                var dtMessageCount = new DataTable();
                int acceptSMS = 0, rejectSMS = 0, totalSMS = 0;

                List<SMSInbound> acceptedSMS;
                List<SMSInbound> rejectedSMS;

                dtMessageCount.Columns.Add(new DataColumn("receivedSMSdate", Type.GetType("System.String")));
                dtMessageCount.Columns.Add(new DataColumn("rejectedSMS", Type.GetType("System.Int32")));
                dtMessageCount.Columns.Add(new DataColumn("acceptedSMS", Type.GetType("System.Int32")));
                dtMessageCount.Columns.Add(new DataColumn("totalSMS", Type.GetType("System.Int32")));


                #region Accepted Messages

                acceptedSMS =
                    _dataContext.sp_SMSInboundSelect(Convert.ToDateTime(dt1), Convert.ToDateTime(dt2), 1).ToList();

                #endregion

                #region Rejected Messages

                rejectedSMS =
                    _dataContext.sp_SMSInboundSelect(Convert.ToDateTime(dt1), Convert.ToDateTime(dt2), 2).ToList();

                #endregion

                acceptSMS = Convert.ToInt32(acceptedSMS.Count);
                rejectSMS = Convert.ToInt32(rejectedSMS.Count);
                totalSMS = acceptSMS + rejectSMS;

                if (acceptedSMS.Count != 0)
                {
                    dtMessageCount.Rows.Add(acceptedSMS[0].CreatedDate.ToShortDateString(), rejectSMS, acceptSMS, totalSMS);
                }


                //CrystalReports.MessageCount.MessageCount mescount = new CrystalReports.MessageCount.MessageCount();
                //mescount.SetDataSource(dtMessageCount);
                Session["MessageCount"] = dtMessageCount;
                //mescount.Close();
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From MessageCount Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string KPIByClassWithPlanning(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                var dtKPIByClass = new DataTable();
                var dsKpiReport = new DataSet();

                _nvCollection.Clear();
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3id-int", level3Id);
                _nvCollection.Add("@Level4id-int", level4Id);
                _nvCollection.Add("@Level5id-int", level5Id);
                _nvCollection.Add("@Level6id-int", level6Id);
                _nvCollection.Add("@EmployeeId-int", empid);
                _nvCollection.Add("@Month-int", Convert.ToDateTime(dt1).Month.ToString());
                _nvCollection.Add("@Year-int", Convert.ToDateTime(dt1).Year.ToString());

                dsKpiReport = GetData("sp_NewKPIbyClassWithPlanning", _nvCollection);
                if (dsKpiReport != null)
                {
                    dtKPIByClass = dsKpiReport.Tables[0];
                    if (dtKPIByClass.Rows.Count == 0)
                    {
                        DataRow dr = dtKPIByClass.NewRow();
                        dtKPIByClass.Rows.Add(dr);
                        dtKPIByClass.Rows[0]["DateofrRprt"] = Convert.ToDateTime(dt1).ToString("MMMM yyyy");
                    }

                    dtKPIByClass.Rows[0]["DateofrRprt"] = Convert.ToDateTime(dt1).ToString("MMMM yyyy");
                }

                //CrystalReports.KPIByClassPlanning.KPIByClassWithPLan Kpi = new CrystalReports.KPIByClassPlanning.KPIByClassWithPLan();
                //Kpi.SetDataSource(dtKPIByClass);
                Session["KPIByClassPlanning"] = dtKPIByClass;
                // Kpi.Close();
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From KPIByClassPlanning Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string MonthlyVisitAnalysisWithPlanning(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                #region
                DateTime from = Convert.ToDateTime(dt1);
                DateTime to = Convert.ToDateTime(dt2);
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



                DataSet ds = new DataSet();
                var dsMonth1 = new DataSet();
                var dsMonth2 = new DataSet();
                var dsMonth3 = new DataSet();
                var dsMonth4 = new DataSet();
                var dsMonth5 = new DataSet();
                var dsMonth6 = new DataSet();
                #endregion

                #region
                _nvCollection.Clear();
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-INT", level3Id.ToString());
                _nvCollection.Add("@Level4ID-INT", level4Id.ToString());
                _nvCollection.Add("@Level5ID-INT", level5Id.ToString());
                _nvCollection.Add("@Level6ID-INT", level6Id.ToString());
                _nvCollection.Add("@EmployeeID-INT", empid.ToString());

                _nvCollection.Add("@DateStart-date", Convert.ToDateTime(dt1).ToString());
                _nvCollection.Add("@DateEnd-date", Convert.ToDateTime(dt2).ToString());

                ds = GetData("sp_MDVAReport", _nvCollection);
                #endregion

                #region getting records

                PocketDCR2.Reports.CrystalReports.XSDDatatable.Dsreports dsc = new PocketDCR2.Reports.CrystalReports.XSDDatatable.Dsreports();
                DataTable dtVisitsByMonth = dsc.Tables["VisitsByMonthPlan"];

                int visitDateCount = 1;
                int check = 0;
                int flagBegin = 0;
                int flag = 0;
                int flag2 = 0;
                string MR_ID = "";
                string docID = "";
                int visitMonth = 0;
                string monthDays = "";
                string monthDaysPlans = "";
                int monthIndex = 0;
                string monthDay = "";
                decimal AchievdDaysCount = 0;
                decimal PLanDaysCount = 0;
                DataSet dsforPlans1 = null;
                DataRow dr = null;

                if (ds != null)
                {
                    //for (int i = 0; i < ds.Tables[0].Rows.Count -1; i++)
                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        int did = Convert.ToInt32(ds.Tables[0].Rows[i]["DocID"]);
                        if (did == 14143)
                        {
                            string st = "yess";
                        }
                        else if (did == 17601)
                        {
                            string st = "yess";
                        }
                        check = ds.Tables[0].Rows.Count - 1;


                        #region IF Condition

                        if ((docID == Convert.ToString(ds.Tables[0].Rows[i]["DocID"])) && (MR_ID == Convert.ToString(ds.Tables[0].Rows[i]["MR_ID"])))
                        {
                            if (Convert.ToDateTime(ds.Tables[0].Rows[i]["VisitDate"]).Year != 1900 && visitMonth == Convert.ToDateTime(ds.Tables[0].Rows[i]["VisitDate"]).Month)
                            {
                                monthDay = Convert.ToString(Convert.ToDateTime(ds.Tables[0].Rows[i]["VisitDate"]).Day);
                                if (monthDay.Length == 1)
                                {
                                    monthDay = "0" + monthDay;
                                }
                                monthDays = monthDays + monthDay + ",";
                                AchievdDaysCount++;
                            }
                            else
                            {
                                #region
                                if (Convert.ToDateTime(ds.Tables[0].Rows[i]["VisitDate"]).Year != 1900)
                                {
                                    visitMonth = Convert.ToDateTime(ds.Tables[0].Rows[i]["VisitDate"]).Month;
                                    monthDay = Convert.ToString(Convert.ToDateTime(ds.Tables[0].Rows[i]["VisitDate"]).Day);
                                }
                                if (visitDateCount != 0)
                                {
                                    dr["Actual"] = monthDays;

                                    if (monthDaysPlans == "")
                                    {
                                        _nvCollection.Clear();
                                        _nvCollection.Add("@DocID-INT", dr["DocID"].ToString());
                                        _nvCollection.Add("@EmpID-INT", MR_ID.ToString());
                                        _nvCollection.Add("@Month-INT", Convert.ToDateTime(dt1).Month.ToString());
                                        _nvCollection.Add("@Year-INT", Convert.ToDateTime(dt1).Year.ToString());
                                        dsforPlans1 = GetData("Reports_GetPlanDays", _nvCollection);
                                        if (dsforPlans1 != null)
                                            if (dsforPlans1.Tables[0].Rows.Count != 0)
                                            {
                                                foreach (DataRow dre in dsforPlans1.Tables[0].Rows)
                                                {
                                                    string planDay = dre["DAY1"].ToString();
                                                    if (planDay.Length == 1)
                                                    {
                                                        monthDaysPlans += "0" + dre["DAY1"].ToString() + ",";
                                                    }
                                                    else
                                                    {
                                                        monthDaysPlans += dre["DAY1"].ToString() + ",";
                                                    }
                                                    PLanDaysCount++;
                                                }
                                            }
                                        dr["Planned"] = monthDaysPlans;
                                        //dr["Achieved"] = PLanDaysCount.ToString() + "-" + AchievdDaysCount.ToString();
                                    }
                                    if (PLanDaysCount != 0)
                                    {
                                        dr["Achieved"] = (AchievdDaysCount / PLanDaysCount) * 100;
                                        dr["PlannedAchieved"] = Constants.LevenshteinDistance(monthDaysPlans, monthDays).ToString() + "%";
                                    }
                                    else
                                    {
                                        dr["Achieved"] = 0;
                                        dr["PlannedAchieved"] = 0 + "%";
                                    }
                                }
                                #endregion

                                if (monthDay.Length == 1)
                                {
                                    monthDay = "0" + monthDay;
                                }
                                monthDays = monthDays + monthDay + ",";

                                monthDays = monthDay + ", ";
                                AchievdDaysCount++;
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
                        }
                        #endregion


                        else
                        {
                            #region else condition
                            if ((flagBegin == 1 && flag == 1) || (flag2 == 1))
                            {
                                if (visitDateCount != 0)
                                {
                                    dr["Actual"] = monthDays;

                                    if (monthDaysPlans == "")
                                    {

                                        _nvCollection.Clear();
                                        _nvCollection.Add("@DocID-INT", Convert.ToString(dr["DocID"]));
                                        _nvCollection.Add("@EmpID-INT", Convert.ToString(MR_ID));
                                        _nvCollection.Add("@Month-INT", Convert.ToDateTime(dt1).Month.ToString());
                                        _nvCollection.Add("@Year-INT", Convert.ToDateTime(dt1).Year.ToString());
                                        dsforPlans1 = GetData("Reports_GetPlanDays", _nvCollection);
                                        if (dsforPlans1 != null)
                                            if (dsforPlans1.Tables[0].Rows.Count != 0)
                                            {
                                                foreach (DataRow dre in dsforPlans1.Tables[0].Rows)
                                                {
                                                    string planDay = dre["DAY1"].ToString();
                                                    if (planDay.Length == 1)
                                                    {
                                                        monthDaysPlans += "0" + dre["DAY1"].ToString() + ",";
                                                    }
                                                    else
                                                    {
                                                        monthDaysPlans += dre["DAY1"].ToString() + ",";
                                                    }
                                                    PLanDaysCount++;
                                                }
                                            }
                                        dr["Planned"] = monthDaysPlans;
                                        //dr["Achieved"] = PLanDaysCount.ToString() + "-" + AchievdDaysCount.ToString();
                                    }

                                    if (PLanDaysCount != 0)
                                    {
                                        dr["Achieved"] = (AchievdDaysCount / PLanDaysCount) * 100;
                                        dr["PlannedAchieved"] = Constants.LevenshteinDistance(monthDaysPlans, monthDays).ToString() + "%";
                                    }
                                    else
                                    {
                                        dr["Achieved"] = 0;
                                        dr["PlannedAchieved"] = 0 + "%";
                                    }
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
                            monthDaysPlans = "";
                            AchievdDaysCount = 0;
                            PLanDaysCount = 0;
                            docID = Convert.ToString(ds.Tables[0].Rows[i]["DocID"]);
                            MR_ID = Convert.ToString(ds.Tables[0].Rows[i]["MR_ID"]);
                            //string str = Convert.ToString(oleDbMainDataReader["VisitDate"]);
                            if (Convert.ToDateTime(ds.Tables[0].Rows[i]["VisitDate"]).Year != 1900)
                            {
                                visitMonth = Convert.ToDateTime(ds.Tables[0].Rows[i]["VisitDate"]).Month;
                            }

                            dr["BUHID"] = Convert.ToString(ds.Tables[0].Rows[i]["BUHID"]);
                            dr["BUH"] = Convert.ToString(ds.Tables[0].Rows[i]["BUH"]);
                            dr["GMID"] = Convert.ToString(ds.Tables[0].Rows[i]["GMID"]);
                            dr["GM"] = Convert.ToString(ds.Tables[0].Rows[i]["GM"]);
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
                            dr["Address1"] = Convert.ToString(ds.Tables[0].Rows[i]["Address1"]);
                            dr["City"] = Convert.ToString(ds.Tables[0].Rows[i]["City"]);
                            dr["HospitalName"] = Convert.ToString(ds.Tables[0].Rows[i]["HospitalName"]);
                            dr["CallObj"] = Convert.ToString(ds.Tables[0].Rows[i]["CallObj"]);

                            dr["Class"] = Convert.ToString(ds.Tables[0].Rows[i]["Class"]);
                            dr["Specialty"] = Convert.ToString(ds.Tables[0].Rows[i]["Specialty"]);
                            dr["Designation"] = Convert.ToString(ds.Tables[0].Rows[i]["Designation"]);
                            dr["MRCell"] = Convert.ToString(ds.Tables[0].Rows[i]["MRCell"]);
                            dr["MRIdName"] = Convert.ToString(ds.Tables[0].Rows[i]["MRIdName"]);
                            dr["FrmDate"] = Convert.ToDateTime(dt1);
                            dr["toDate"] = Convert.ToDateTime(dt2);


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
                            monthDays = monthDays + monthDay + ",";

                            monthDays = monthDay + ",";
                            dr["MR_ID"] = MR_ID;
                            #endregion
                        }


                    }
                    if (flag == 1 || flag2 == 1)
                    {
                        #region Editional Work By saeed
                        if (check == ds.Tables[0].Rows.Count - 1)
                        {
                            if (PLanDaysCount != 0)
                            {
                                dr["Achieved"] = (AchievdDaysCount / PLanDaysCount) * 100;
                                dr["PlannedAchieved"] = Constants.LevenshteinDistance(monthDaysPlans, monthDays).ToString() + "%";
                            }
                            else
                            {
                                dr["Achieved"] = 0;
                                dr["PlannedAchieved"] = 0 + "%";
                            }
                        }

                        #endregion

                        #region
                        if (visitDateCount != 0)
                        {
                            dr["Actual"] = monthDays;

                            if (monthDaysPlans == "")
                            {
                                _nvCollection.Clear();
                                _nvCollection.Add("@DocID-INT", Convert.ToString(dr["DocID"]));
                                _nvCollection.Add("@EmpID-INT", Convert.ToString(MR_ID));
                                _nvCollection.Add("@Month-INT", Convert.ToDateTime(dt1).Month.ToString());
                                _nvCollection.Add("@Year-INT", Convert.ToDateTime(dt1).Year.ToString());
                                dsforPlans1 = GetData("Reports_GetPlanDays", _nvCollection);
                                if (dsforPlans1 != null)
                                    if (dsforPlans1.Tables[0].Rows.Count != 0)
                                    {
                                        foreach (DataRow dre in dsforPlans1.Tables[0].Rows)
                                        {
                                            if (monthDaysPlans == "")
                                            {
                                                string planDay = dre["DAY1"].ToString();
                                                if (planDay.Length == 1)
                                                {
                                                    monthDaysPlans += "0" + dre["DAY1"].ToString() + ",";
                                                }
                                                else
                                                {
                                                    monthDaysPlans += dre["DAY1"].ToString() + ",";
                                                }
                                            }
                                        }
                                    }
                                dr["Planned"] = monthDaysPlans;
                            }
                        }
                        #endregion

                        dtVisitsByMonth.Rows.Add(dr);
                    }
                }

                //CrystalReports.MVAPlan.MVAPlan Kpi = new CrystalReports.MVAPlan.MVAPlan();
                //Kpi.SetDataSource(dtVisitsByMonth);
                Session["MVAPlan"] = dtVisitsByMonth;
                // Kpi.Close();


                #endregion
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From MonthlyVisitAnalysisWithPlanning Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string MonthlyVisitAnalysisWithDraftPlanning(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                #region
                DateTime from = Convert.ToDateTime(dt1);
                DateTime to = Convert.ToDateTime(dt2);
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



                DataSet ds = new DataSet();
                var dsMonth1 = new DataSet();
                var dsMonth2 = new DataSet();
                var dsMonth3 = new DataSet();
                var dsMonth4 = new DataSet();
                var dsMonth5 = new DataSet();
                var dsMonth6 = new DataSet();
                #endregion

                #region
                _nvCollection.Clear();
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-INT", level3Id.ToString());
                _nvCollection.Add("@Level4ID-INT", level4Id.ToString());
                _nvCollection.Add("@Level5ID-INT", level5Id.ToString());
                _nvCollection.Add("@Level6ID-INT", level6Id.ToString());
                _nvCollection.Add("@EmployeeID-INT", empid.ToString());

                _nvCollection.Add("@DateStart-date", Convert.ToDateTime(dt1).ToString());
                _nvCollection.Add("@DateEnd-date", Convert.ToDateTime(dt2).ToString());

                ds = GetData("sp_MDVAReportWithDraftPlanning", _nvCollection);
                #endregion

                #region getting records

                CrystalReports.XSDDatatable.Dsreports dsc = new PocketDCR2.Reports.CrystalReports.XSDDatatable.Dsreports();
                DataTable dtVisitsByMonth = dsc.Tables["VisitsByMonthDraftPlan"];

                int visitDateCount = 1;
                int flagBegin = 0;
                int flag = 0;
                int flag2 = 0;
                string MR_ID = "";
                string docID = "";
                int visitMonth = 0;
                string monthDays = "";
                string monthDaysPlans = "";
                int monthIndex = 0;
                string monthDay = "";
                decimal AchievdDaysCount = 0;
                decimal PLanDaysCount = 0;
                DataSet dsforPlans1 = null;
                DataRow dr = null;

                if (ds != null)
                {
                    for (int i = 0; i < ds.Tables[0].Rows.Count - 1; i++)
                    {
                        DataRow drQuery = ds.Tables[0].Rows[i];
                        dr = dtVisitsByMonth.NewRow();
                        dr["BUH"] = Convert.ToString(drQuery["BUH"]);
                        dr["GM"] = Convert.ToString(drQuery["GM"]);
                        dr["Division"] = Convert.ToString(drQuery["Division"]);
                        dr["Zone"] = Convert.ToString(drQuery["Zone"]);
                        dr["Region"] = Convert.ToString(drQuery["Region"]);
                        dr["Territory"] = Convert.ToString(drQuery["Territory"]);
                        dr["MR_ID"] = Convert.ToString(drQuery["MR_ID"]);
                        dr["Class"] = Convert.ToString(drQuery["Class"]);
                        dr["Speciality"] = Convert.ToString(drQuery["Speciality"]);
                        dr["MRCell"] = Convert.ToString(drQuery["MRCell"]);
                        dr["MR_Name"] = Convert.ToString(drQuery["MR_Name"]);
                        dr["MRIdName"] = Convert.ToString(drQuery["MRIdName"]);
                        dr["DocRefID"] = Convert.ToString(drQuery["DocRefID"]);
                        dr["DocBrick"] = Convert.ToString(drQuery["DocBrick"]);
                        dr["City"] = Convert.ToString(drQuery["City"]);
                        dr["AccountName"] = Convert.ToString(drQuery["AccountName"]);
                        dr["DocName"] = Convert.ToString(drQuery["DocName"]);
                        dr["Address1"] = Convert.ToString(drQuery["Address1"]);
                        dr["Designation"] = Convert.ToString(drQuery["Designation"]);
                        dr["TargetFrequency"] = Convert.ToInt32(drQuery["TargetFrequency"]);
                        dr["MRCell"] = drQuery["MRCell"];

                        monthDaysPlans = "";
                        PLanDaysCount = 0;
                        _nvCollection.Clear();
                        _nvCollection.Add("@DocID-INT", Convert.ToString(drQuery["DoctorId"]));
                        _nvCollection.Add("@EmpID-INT", Convert.ToString(drQuery["MR_ID"]));
                        _nvCollection.Add("@Month-INT", Convert.ToDateTime(dt1).Month.ToString());
                        _nvCollection.Add("@Year-INT", Convert.ToDateTime(dt1).Year.ToString());
                        dsforPlans1 = GetData("Reports_GetDraftPlanDays", _nvCollection);
                        if (dsforPlans1 != null)
                            if (dsforPlans1.Tables[0].Rows.Count != 0)
                            {
                                foreach (DataRow dre in dsforPlans1.Tables[0].Rows)
                                {
                                    string planDay = dre["DAY1"].ToString();
                                    if (planDay.Length == 1)
                                    {
                                        monthDaysPlans += "0" + dre["DAY1"].ToString() + ",";
                                    }
                                    else
                                    {
                                        monthDaysPlans += dre["DAY1"].ToString() + ",";
                                    }
                                    PLanDaysCount++;
                                }
                            }
                        dr["PlannedDays"] = monthDaysPlans;
                        dr["PlannedCount"] = Convert.ToInt32(PLanDaysCount);
                        dtVisitsByMonth.Rows.Add(dr);
                    }
                }

                //CrystalReports.MVAPlan.MVAPlan Kpi = new CrystalReports.MVAPlan.MVAPlan();
                //Kpi.SetDataSource(dtVisitsByMonth);
                Session["MVADraftPlan"] = dtVisitsByMonth;
                // Kpi.Close();


                #endregion
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From MonthlyVisitAnalysisWithPlanning Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string PlanningReport1(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                #region
                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtPlanningReport = dsDcr.Tables["PlanningReport"];

                _nvCollection.Clear();
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeID-int", empid.ToString());
                _nvCollection.Add("@DocID-int", drid.ToString());
                _nvCollection.Add("@vistTime-INT", vsid.ToString());
                _nvCollection.Add("@JV-varchar-5", jv.ToString());
                _nvCollection.Add("@Date-date", dt1.ToString());

                DataSet ds = GetData("sp_PlanningReport1", _nvCollection);
                #endregion

                #region
                string AsPerPlan = "1";
                string PlannedButNotVisited = "1";
                string moreThanPlaned = "1";
                string Region = string.Empty;
                string mrname = string.Empty;
                string MR_ID = string.Empty;
                string mrIDname = string.Empty;
                string DoctorName = string.Empty;
                int flagBegin = 0;
                int flag = 0;
                int flag2 = 0;
                int DayOfMonth = 0;
                DataRow drw = null;

                #endregion

                #region
                if (ds != null)
                    if (ds.Tables[0].Rows.Count != 0)
                    {
                        #region
                        foreach (DataRow dr in ds.Tables[0].Rows)
                        {
                            DataRow[] drc = dtPlanningReport.Select("DocID = '" + dr["DoctorId"].ToString() + "' AND MR_ID = '" + dr["EmployeeId"].ToString() + "'");

                            if (drc.Length != 0)
                            {
                                AsPerPlan = dr["IsPlanned"].ToString();
                                PlannedButNotVisited = dr["PLANNEDBUTNOTVISITED"].ToString();
                                moreThanPlaned = dr["UNPLANNED"].ToString();

                                if (AsPerPlan != "")
                                {
                                    drc[0][dr["DAYOFVISIT"].ToString()] = "P";
                                }
                                else if (PlannedButNotVisited != "")
                                {
                                    drc[0][dr["DAYOFVISIT"].ToString()] = "N";
                                }
                                else if (moreThanPlaned != "")
                                {
                                    drc[0][dr["DAYOFVISIT"].ToString()] = "U";
                                }
                            }
                            else
                            {
                                flagBegin = 1;
                                flag2 = 1;
                                drw = dtPlanningReport.NewRow();
                                DayOfMonth = Convert.ToInt32(dr["DAYOFVISIT"]);
                                Region = Convert.ToString(dr["REGION"]);
                                MR_ID = Convert.ToString(dr["EmployeeId"]);
                                mrIDname = Convert.ToString(dr["MRIdName"]);
                                DoctorName = Convert.ToString(dr["DocName"]);

                                drw["BUH"] = dr["BUH"].ToString();
                                drw["GM"] = dr["GM"].ToString();
                                drw["Division"] = dr["DIVISION"].ToString();
                                drw["Zone"] = dr["ZONE"].ToString();
                                drw["MR_ID"] = MR_ID;
                                drw["Region"] = Region;
                                drw["Class"] = dr["ClassName"].ToString();
                                drw["MR_Name"] = dr["MRIdName"].ToString();
                                drw["MRidName"] = dr["MRIdName"].ToString();
                                drw["MRCell"] = dr["MobileNumber"].ToString();
                                if (drw["DocID"] == "" || drw["DocID"] == null)
                                {
                                    drw["DocID"] = 0;
                                }
                                else
                                {
                                    drw["DocID"] = dr["DoctorId"].ToString();
                                }

                                drw["callobj"] = dr["CallObj"].ToString();
                                drw["hospitalname"] = dr["HospitalName"].ToString();
                                drw["DocName"] = dr["DocName"].ToString();
                                drw["address"] = dr["Address1"].ToString();
                                drw["city"] = dr["City"].ToString();
                                drw["Brick"] = dr["Brick"].ToString();
                                drw["DocSpeciality"] = dr["Specialiity"].ToString();
                                drw["DayOfMonth"] = dr["DAYOFVISIT"].ToString();
                                AsPerPlan = dr["IsPlanned"].ToString();
                                PlannedButNotVisited = dr["PLANNEDBUTNOTVISITED"].ToString();
                                moreThanPlaned = dr["UNPLANNED"].ToString();
                                drw["DateOfRprt"] = Convert.ToDateTime(dt1);

                                #region Commented
                                //drw["1"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["2"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["3"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["4"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["5"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["6"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["7"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["8"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["9"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["10"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["11"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["12"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["13"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["14"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["15"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["16"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["17"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["18"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["19"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["20"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["21"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["22"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["23"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["24"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["25"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["26"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["27"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["28"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["29"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["30"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["31"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                #endregion

                                if (AsPerPlan != "")
                                {
                                    //drw[DayOfMonth.ToString()] = "<div style='width:10px; height:10px; border:1px solid green; border-radius:50px;box-shadow: 5px 5px 5px #f99;background-color:green;'></div>";
                                    //drw[DayOfMonth.ToString()] = "<div style='color:green;'>PLND</div>";
                                    drw[DayOfMonth.ToString()] = "P";
                                }
                                else if (PlannedButNotVisited != "")
                                {
                                    // drw[DayOfMonth.ToString()] = "<div style='color:red;'>PLNV</div>";
                                    drw[DayOfMonth.ToString()] = "N";
                                }
                                else if (moreThanPlaned != "")
                                {
                                    //drw[DayOfMonth.ToString()] = "<div style='color:#FF6600;'>UNPLND</div>"; ;
                                    drw[DayOfMonth.ToString()] = "U"; ;
                                }
                                if (flag == 1 || flag2 == 1)
                                {
                                    dtPlanningReport.Rows.Add(drw);
                                }
                            }
                        }
                        #endregion
                    }


                dtPlanningReport.DefaultView.Sort = "DocID ASC";
                Session["PlanningRPT1"] = dtPlanningReport;
                //rpt.Close();
                //CrystalReportViewer1.ReportSource = rpt;
                #endregion
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From PlanningReport1 Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string PlanningReportJV(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                #region GET DATA
                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtPlanningReport = dsDcr.Tables["PlanningReport"];

                _nvCollection.Clear();
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeID-int", empid.ToString());
                _nvCollection.Add("@DocID-int", drid.ToString());
                _nvCollection.Add("@vistTime-INT", vsid.ToString());
                _nvCollection.Add("@JV-varchar-5", jv.ToString());
                _nvCollection.Add("@Date-date", dt1.ToString());

                DataSet ds = GetData("sp_PlanningReportWITHJV", _nvCollection);
                #endregion

                #region Initialize Variable
                string AsPerPlan = "1";
                string PlannedButNotVisited = "1";
                string moreThanPlaned = "1";
                string Region = string.Empty;
                string mrname = string.Empty;
                string MR_ID = string.Empty;
                string mrIDname = string.Empty;
                string DoctorName = string.Empty;
                int flagBegin = 0;
                int flag = 0;
                int flag2 = 0;
                int DayOfMonth = 0;
                DataRow drw = null;

                #endregion

                #region Process On Work
                if (ds != null)
                    if (ds.Tables[0].Rows.Count != 0)
                    {
                        #region
                        foreach (DataRow dr in ds.Tables[0].Rows)
                        {
                            DataRow[] drc = dtPlanningReport.Select("DocID = '" + dr["DoctorId"].ToString() + "' AND MR_ID = '" + dr["EmployeeId"].ToString() + "'");

                            if (drc.Length != 0)
                            {
                                AsPerPlan = dr["IsPlanned"].ToString();
                                PlannedButNotVisited = dr["PLANNEDBUTNOTVISITED"].ToString();
                                moreThanPlaned = dr["UNPLANNED"].ToString();

                                if (AsPerPlan != "")
                                {
                                    drc[0][dr["DAYOFVISIT"].ToString()] = "P";
                                }
                                else if (PlannedButNotVisited != "")
                                {
                                    drc[0][dr["DAYOFVISIT"].ToString()] = "N";
                                }
                                else if (moreThanPlaned != "")
                                {
                                    drc[0][dr["DAYOFVISIT"].ToString()] = "U";
                                }
                            }
                            else
                            {
                                flagBegin = 1;
                                flag2 = 1;
                                drw = dtPlanningReport.NewRow();
                                DayOfMonth = Convert.ToInt32(dr["DAYOFVISIT"]);
                                Region = Convert.ToString(dr["REGION"]);
                                MR_ID = Convert.ToString(dr["EmployeeId"]);
                                mrIDname = Convert.ToString(dr["MRIdName"]);
                                DoctorName = Convert.ToString(dr["DocName"]);

                                drw["Division"] = dr["DIVISION"].ToString();
                                drw["Zone"] = dr["ZONE"].ToString();
                                drw["MR_ID"] = MR_ID;
                                drw["Region"] = Region;
                                drw["Class"] = dr["ClassName"].ToString();
                                drw["MR_Name"] = dr["MRIdName"].ToString();
                                drw["MRidName"] = dr["MRIdName"].ToString();
                                drw["MRCell"] = dr["MobileNumber"].ToString();
                                drw["DocID"] = dr["DoctorId"].ToString();
                                drw["DocName"] = dr["DocName"].ToString();
                                drw["DocSpeciality"] = dr["Specialiity"].ToString();
                                drw["DayOfMonth"] = dr["DAYOFVISIT"].ToString();
                                AsPerPlan = dr["IsPlanned"].ToString();
                                PlannedButNotVisited = dr["PLANNEDBUTNOTVISITED"].ToString();
                                moreThanPlaned = dr["UNPLANNED"].ToString();
                                drw["DateOfRprt"] = Convert.ToDateTime(dt1);
                                #region Commented
                                //drw["1"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["2"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["3"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["4"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["5"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["6"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["7"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["8"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["9"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["10"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["11"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["12"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["13"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["14"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["15"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["16"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["17"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["18"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["19"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["20"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["21"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["22"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["23"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["24"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["25"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["26"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["27"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["28"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["29"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["30"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["31"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                #endregion

                                if (AsPerPlan != "")
                                {
                                    //drw[DayOfMonth.ToString()] = "<div style='width:10px; height:10px; border:1px solid green; border-radius:50px;box-shadow: 5px 5px 5px #f99;background-color:green;'></div>";
                                    //drw[DayOfMonth.ToString()] = "<div style='color:green;'>PLND</div>";
                                    drw[DayOfMonth.ToString()] = "P";
                                }
                                else if (PlannedButNotVisited != "")
                                {
                                    // drw[DayOfMonth.ToString()] = "<div style='color:red;'>PLNV</div>";
                                    drw[DayOfMonth.ToString()] = "N";
                                }
                                else if (moreThanPlaned != "")
                                {
                                    //drw[DayOfMonth.ToString()] = "<div style='color:#FF6600;'>UNPLND</div>"; ;
                                    drw[DayOfMonth.ToString()] = "U"; ;
                                }
                                if (flag == 1 || flag2 == 1)
                                {
                                    dtPlanningReport.Rows.Add(drw);
                                }
                            }
                        }
                        #endregion
                    }
                dtPlanningReport.DefaultView.Sort = "DocID ASC";
                Session["PlanningRPTJV"] = dtPlanningReport;
                #endregion
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From PlanningReportJV Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string PlanningReportBMD(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                #region GET DATA
                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtPlanningReport = dsDcr.Tables["PlanningReport"];

                _nvCollection.Clear();
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeID-int", empid.ToString());
                _nvCollection.Add("@DocID-int", drid.ToString());
                _nvCollection.Add("@vistTime-INT", vsid.ToString());
                _nvCollection.Add("@JV-varchar-5", jv.ToString());
                _nvCollection.Add("@Date-date", dt1.ToString());

                DataSet ds = GetData("sp_PlanningReportBMD", _nvCollection);
                #endregion

                #region Initialize Variable
                string AsPerPlan = "1";
                string PlannedButNotVisited = "1";
                string moreThanPlaned = "1";
                string Region = string.Empty;
                string mrname = string.Empty;
                string MR_ID = string.Empty;
                string mrIDname = string.Empty;
                string DoctorName = string.Empty;
                int flagBegin = 0;
                int flag = 0;
                int flag2 = 0;
                int DayOfMonth = 0;
                DataRow drw = null;

                #endregion

                #region Process On Work
                if (ds != null)
                    if (ds.Tables[0].Rows.Count != 0)
                    {
                        #region
                        foreach (DataRow dr in ds.Tables[0].Rows)
                        {
                            DataRow[] drc = dtPlanningReport.Select("DocID = '" + dr["DoctorId"].ToString() + "' AND MR_ID = '" + dr["EmployeeId"].ToString() + "'");

                            if (drc.Length != 0)
                            {
                                AsPerPlan = dr["IsPlanned"].ToString();
                                PlannedButNotVisited = dr["PLANNEDBUTNOTVISITED"].ToString();
                                moreThanPlaned = dr["UNPLANNED"].ToString();

                                if (AsPerPlan != "")
                                {
                                    drc[0][dr["DAYOFVISIT"].ToString()] = "P";
                                }
                                else if (PlannedButNotVisited != "")
                                {
                                    drc[0][dr["DAYOFVISIT"].ToString()] = "N";
                                }
                                else if (moreThanPlaned != "")
                                {
                                    drc[0][dr["DAYOFVISIT"].ToString()] = "U";
                                }
                            }
                            else
                            {
                                flagBegin = 1;
                                flag2 = 1;
                                drw = dtPlanningReport.NewRow();
                                DayOfMonth = Convert.ToInt32(dr["DAYOFVISIT"]);
                                Region = Convert.ToString(dr["REGION"]);
                                MR_ID = Convert.ToString(dr["EmployeeId"]);
                                mrIDname = Convert.ToString(dr["MRIdName"]);
                                DoctorName = Convert.ToString(dr["DocName"]);

                                drw["Division"] = dr["DIVISION"].ToString();
                                drw["Zone"] = dr["ZONE"].ToString();
                                drw["MR_ID"] = MR_ID;
                                drw["Region"] = Region;
                                drw["Class"] = dr["ClassName"].ToString();
                                drw["MR_Name"] = dr["MRIdName"].ToString();
                                drw["MRidName"] = dr["MRIdName"].ToString();
                                drw["MRCell"] = dr["MobileNumber"].ToString();
                                drw["DocID"] = dr["DoctorId"].ToString();
                                drw["DocName"] = dr["DocName"].ToString();
                                drw["DocSpeciality"] = dr["Specialiity"].ToString();
                                drw["DayOfMonth"] = dr["DAYOFVISIT"].ToString();
                                AsPerPlan = dr["IsPlanned"].ToString();
                                PlannedButNotVisited = dr["PLANNEDBUTNOTVISITED"].ToString();
                                moreThanPlaned = dr["UNPLANNED"].ToString();
                                drw["DateOfRprt"] = Convert.ToDateTime(dt1);
                                #region Commented
                                //drw["1"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["2"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["3"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["4"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["5"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["6"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["7"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["8"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["9"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["10"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["11"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["12"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["13"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["14"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["15"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["16"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["17"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["18"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["19"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["20"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["21"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["22"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["23"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["24"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["25"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["26"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["27"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["28"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["29"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["30"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                //drw["31"] = LoadImage(Server.MapPath(@"~\Images\blank.jpg"));
                                #endregion

                                if (AsPerPlan != "")
                                {
                                    //drw[DayOfMonth.ToString()] = "<div style='width:10px; height:10px; border:1px solid green; border-radius:50px;box-shadow: 5px 5px 5px #f99;background-color:green;'></div>";
                                    //drw[DayOfMonth.ToString()] = "<div style='color:green;'>PLND</div>";
                                    drw[DayOfMonth.ToString()] = "P";
                                }
                                else if (PlannedButNotVisited != "")
                                {
                                    // drw[DayOfMonth.ToString()] = "<div style='color:red;'>PLNV</div>";
                                    drw[DayOfMonth.ToString()] = "N";
                                }
                                else if (moreThanPlaned != "")
                                {
                                    //drw[DayOfMonth.ToString()] = "<div style='color:#FF6600;'>UNPLND</div>"; ;
                                    drw[DayOfMonth.ToString()] = "U"; ;
                                }
                                if (flag == 1 || flag2 == 1)
                                {
                                    dtPlanningReport.Rows.Add(drw);
                                }
                            }
                        }
                        #endregion
                    }
                //CrystalReports.PlanningRPTBMD.PlanningReportBMD rpt = new CrystalReports.PlanningRPTBMD.PlanningReportBMD();
                dtPlanningReport.DefaultView.Sort = "DocID ASC";
                //rpt.SetDataSource(dtPlanningReport);
                Session["PlanningRPTBMD"] = dtPlanningReport;
                //rpt.Close();
                #endregion
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From PlanningReportBMD Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "das";

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string CoachingCallsWithFLM(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                #region GET DATA

                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtCoachingWithFLMReport = dsDcr.Tables["CoachingCallswithFLM"];

                int month = Convert.ToDateTime(dt1).Month;
                int year = Convert.ToDateTime(dt1).Year;

                _nvCollection.Clear();
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                _nvCollection.Add("@Month-int", month.ToString());
                _nvCollection.Add("@Year-int", year.ToString());

                DataSet ds = GetData("sp_CoachingCalls_withFLM", _nvCollection);

                #endregion


                #region Process On Work

                dtCoachingWithFLMReport = ds.Tables[0];

                Session["CoachingCallsFLM"] = dtCoachingWithFLMReport;

                #endregion
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Coaching Calls with FLM Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "das";

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string CoachingCallsForFLM(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                #region GET DATA

                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtCoachingForFLMReport = dsDcr.Tables["CoachingCallsForFLM"];

                int month = Convert.ToDateTime(dt1).Month;
                int year = Convert.ToDateTime(dt1).Year;
                int endmonth = Convert.ToDateTime(dt2).Month;

                _nvCollection.Clear();
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                _nvCollection.Add("@Month-int", month.ToString());
                _nvCollection.Add("@Year-int", year.ToString());
                _nvCollection.Add("@endmonth-int", endmonth.ToString());

                DataSet ds;

                if (level3Id == "1" && level4Id == "0" && level5Id == "0")
                {
                    ds = GetData("sp_CoachingCallsForFLM_qua_division", _nvCollection);
                }
                else if (level4Id != "0" && level5Id == "0")
                {
                    ds = GetData("sp_CoachingCallsForFLM_qua_region", _nvCollection);
                }
                else
                {
                    ds = GetData("sp_CoachingCallsForFLM_qua", _nvCollection);
                }

                #endregion


                #region Process On Work

                dtCoachingForFLMReport = ds.Tables[0];

                Session["CoachingCallsForFLM"] = dtCoachingForFLMReport;

                #endregion
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Coaching Calls For FLM Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "das";

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string CRMUserList(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                #region GET DATA

                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtCRmUserListReport = dsDcr.Tables["CRMUserList"];

                int month = Convert.ToDateTime(dt1).Month;
                int year = Convert.ToDateTime(dt1).Year;

                DataSet ds = GetData("sp_CRM_User_list", null);

                #endregion


                #region Process On Work

                dtCRmUserListReport = ds.Tables[0];

                Session["CRMUserList"] = dtCRmUserListReport;

                #endregion
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From CRM User List Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "das";

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string LoginSummaryReport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                Session["LoginSummaryReport"] = "";
                //CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtLoginSummary = dsDcr.Tables["LoginSummary"];

                #region GET DATA FROM SP Assigning parameters
                _nvCollection.Clear();
                _nvCollection.Add("@BUHID-int", level1Id.ToString());
                _nvCollection.Add("@GMID-int", level2Id.ToString());
                _nvCollection.Add("@DivisionID-int", level3Id.ToString());
                _nvCollection.Add("@RegionID-int", level4Id.ToString());
                _nvCollection.Add("@ZoneID-int", level5Id.ToString());
                _nvCollection.Add("@TerritoryID-int", level6Id.ToString());
                _nvCollection.Add("@MONTH-int", Convert.ToDateTime(dt1).Month.ToString());
                _nvCollection.Add("@YEAR-INT", Convert.ToDateTime(dt1).Year.ToString());

                DataSet ds = GetData("report_LoginSummaryReport", _nvCollection);
                #endregion

                #region Process On Work
                if (ds != null)
                {
                    dtLoginSummary = ds.Tables[0];
                    Session["LoginSummaryReport"] = dtLoginSummary;
                }
                #endregion
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From PlanningReportBMD Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "das";

        }

        //JOINT VISIT
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ASMJointVisitReport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string Designation)
        {
            try
            {
                #region Get Data
                string status = GetRptStatus(dt1);
                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtdcr = dsDcr.Tables["ASMDoctorCallReportWithNewParameters"];

                _nvCollection.Clear();
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];

                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                _nvCollection.Add("@StartDate-date", Convert.ToDateTime(dt1).ToString());
                _nvCollection.Add("@EndDate-date", Convert.ToDateTime(dt2).ToString());
                _nvCollection.Add("@TeamID-int", skuid);
                _nvCollection.Add("@DesignationID-varchar", Designation);


                DataSet ds = GetData((status == "Live" ? "sp_ASMJointVisit_NEW" : "sp_ASMJointVisit_NEW_archive"), _nvCollection);

                #endregion

                #region Process On Work
                dtdcr = ds.Tables[0];
                Session["ASMDoctorCallReportWithNewParameters"] = dtdcr;
                #endregion
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Joint Visit Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "das";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string LoginDetailReport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtLoginDetails = dsDcr.Tables["LoginDetails"];
                Session["LoginDetailsData"] = "";
                #region GET DATA FROM SP Assigning parameters
                _nvCollection.Clear();
                _nvCollection.Add("@Month-varchar", Convert.ToDateTime(dt1).Month.ToString());
                _nvCollection.Add("@Year-INT", Convert.ToDateTime(dt1).Year.ToString());
                _nvCollection.Add("@BUHID-int", level1Id.ToString());
                _nvCollection.Add("@GMID-int", level2Id.ToString());
                _nvCollection.Add("@DivisionID-int", level3Id.ToString());
                _nvCollection.Add("@RegionID-int", level4Id.ToString());
                _nvCollection.Add("@ZoneID-int", level5Id.ToString());
                _nvCollection.Add("@TerritoryID-int", level6Id.ToString());

                DataSet ds = GetData("Login_Detail_Proc1", _nvCollection);
                #endregion

                #region Process On Work
                if (ds != null)
                {
                    dtLoginDetails = ds.Tables[0];
                    Session["LoginDetailsData"] = dtLoginDetails;
                }

                #endregion
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From PlanningReportBMD Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "das";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string LoginDetailwithDateTimeReport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtLoginDetailsWothDateTime = dsDcr.Tables["LoginDetailswithDateTime"];
                Session["LoginDetailswithDateTime"] = "";

                #region GET DATA FROM SP Assigning parameters
                _nvCollection.Clear();
                _nvCollection.Add("@Month-varchar", Convert.ToDateTime(dt1).Month.ToString());
                _nvCollection.Add("@Year-INT", Convert.ToDateTime(dt1).Year.ToString());
                _nvCollection.Add("@Day-INT", Convert.ToDateTime(dt1).Day.ToString());
                _nvCollection.Add("@BUHID-int", level1Id.ToString());
                _nvCollection.Add("@GMID-int", level2Id.ToString());
                _nvCollection.Add("@DivisionID-int", level3Id.ToString());
                _nvCollection.Add("@RegionID-int", level4Id.ToString());
                _nvCollection.Add("@ZoneID-int", level5Id.ToString());
                _nvCollection.Add("@TerritoryID-int", level6Id.ToString());

                DataSet ds = GetData("sp_Login_Deatils_withDateTime", _nvCollection);
                #endregion

                #region Process On Work
                if (ds != null)
                {
                    dtLoginDetailsWothDateTime = ds.Tables[0];
                    Session["LoginDetailswithDateTime"] = dtLoginDetailsWothDateTime;
                }

                #endregion
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From LoginDetailwithDateTimeReport Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "das";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ListofTargetCustomerReport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                #region Get Data

                CrystalReports.XSDDatatable.Dsreports dsc = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dt = dsc.Tables["TargetCustomerList"];

                int month = Convert.ToDateTime(dt1).Month;
                int Year = Convert.ToDateTime(dt1).Year;

                _nvCollection.Clear();
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                _nvCollection.Add("@Month-int", month.ToString());
                _nvCollection.Add("@Year-int", Year.ToString());

                DataSet ds = GetData("sp_CR_TargetCustomerName", _nvCollection);

                #endregion

                #region Process On Work
                dt = ds.Tables[0];
                Session["TargetCustomerList"] = dt;
                #endregion
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Target Customer Cuverage List Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "das";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string CommercialTargetreport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                #region Get Data

                CrystalReports.XSDDatatable.Dsreports dsc = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dt = dsc.Tables["CommercialList"];

                int month = Convert.ToDateTime(dt1).Month;
                int Year = Convert.ToDateTime(dt1).Year;

                _nvCollection.Clear();
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                _nvCollection.Add("@Month-int", month.ToString());
                _nvCollection.Add("@Year-int", Year.ToString());

                DataSet ds = GetData("sp_commercialList", _nvCollection);

                #endregion

                #region Process On Work
                dt = ds.Tables[0];
                Session["CommercialList"] = dt;
                #endregion
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Comercial Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "das";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string listoftargetcustomer(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            int month = Convert.ToDateTime(dt1).Month;
            int year = Convert.ToDateTime(dt1).Year;
            int endmonth = Convert.ToDateTime(dt2).Month;
            string path = Server.MapPath("~/Excels");

            var empname = GetEmployeeName(level3Id, level4Id, level5Id, level6Id);
            try
            {
                #region Worksheet
                var fileInfo = new FileInfo(path + @"\List-Of-Target-Customer" + Convert.ToString(empname) + Convert.ToDateTime(dt1).ToString("MMM") + "to" + Convert.ToDateTime(dt2).ToString("MMM") + ".xlsx");

                var pack = new ExcelPackage(fileInfo);
                ExcelWorksheet ws;
                if (pack.Workbook.Worksheets.Count > 0)
                {
                    ws = pack.Workbook.Worksheets["NewCustomerList"];
                    pack.Workbook.Worksheets.Delete(ws.Index);
                    ws = pack.Workbook.Worksheets.Add("NewCustomerList");
                }
                else
                {
                    ws = pack.Workbook.Worksheets.Add("NewCustomerList");
                }

                #endregion

                #region Formatting

                ws.View.ShowGridLines = true;

                ws.Column(1).Width = 75.00;
                ws.Column(2).Width = 31.42;
                ws.Column(3).Width = 14.00;
                ws.Column(4).Width = 35.71;
                ws.Column(5).Width = 18.57;
                ws.Column(6).Width = 28.86;
                ws.Column(7).Width = 18.57;
                ws.Column(8).Width = 28.86;
                ws.Column(9).Width = 26.57;
                ws.Column(10).Width = 40.29;
                ws.Column(11).Width = 12.86;
                ws.Column(12).Width = 15.00;
                ws.Column(13).Width = 1.57;
                ws.Column(14).Width = 6.57;
                ws.Column(15).Width = 6.57;
                ws.Column(16).Width = 6.57;
                ws.Column(17).Width = 6.57;
                ws.Column(18).Width = 6.57;
                ws.Column(19).Width = 6.57;
                ws.Column(20).Width = 6.57;
                ws.Column(21).Width = 6.57;
                ws.Column(22).Width = 6.57;
                ws.Column(23).Width = 6.57;
                ws.Column(24).Width = 6.57;
                ws.Column(25).Width = 6.57;
                ws.Column(26).Width = 6.57;

                ws.Row(2).Height = 27.75;
                ws.Row(4).Height = 18.00;
                ws.Row(11).Height = 18.00;

                // For Gray Background on Line 4 to 10
                ws.Cells["A4:Z10"].Style.Font.Size = 11;
                ws.Cells["A4:Z10"].Style.Font.Name = "Arial";
                ws.Cells["A4:Z10"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells["A4:Z10"].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(238, 236, 225));

                ws.Cells["A4:C4"].Merge = true;
                ws.Cells["D4:F4"].Merge = true;
                ws.Cells["D4:F4"].Value = "Country:Pakistan";
                ws.Cells["G4:I4"].Merge = true;
                ws.Cells["G4:I4"].Value = "Business Franchise: All";
                ws.Cells["J4:L4"].Merge = true;
                ws.Cells["J4:L4"].Value = "BUH: All";
                ws.Cells["M4:Q4"].Merge = true;
                ws.Cells["M4:Q4"].Value = "SLM: All";
                ws.Cells["R4:U4"].Merge = true;
                ws.Cells["V4:Y4"].Merge = true;
                ws.Cells["V4:Y4"].Value = "Medical Rep: All";


                // For Top Border On Line 4
                ws.Cells[4, 1].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[4, 1].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 1].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 1].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 1].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[8, 1].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[8, 1].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[8, 1].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[8, 1].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[8, 1].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 2].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[4, 2].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 2].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 2].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 2].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 3].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[4, 3].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 3].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 3].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 3].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 4].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[4, 4].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 4].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 4].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 4].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 5].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[4, 5].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 5].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 5].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 5].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 6].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[4, 6].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 6].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 6].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 6].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 7].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[4, 7].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 7].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 7].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 7].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 8].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[4, 8].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 8].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 8].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 8].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 9].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[4, 9].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 9].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 9].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 9].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 10].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[4, 10].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 10].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 10].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 10].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 11].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[4, 11].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 11].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 11].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 11].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 12].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[4, 12].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 12].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 12].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 12].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 13].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[4, 13].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 13].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 13].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 13].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 14].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[4, 14].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 14].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 14].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 14].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 15].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[4, 15].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 15].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 15].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 15].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 16].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[4, 16].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 16].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 16].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 16].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 17].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[4, 17].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 17].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 17].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 17].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 18].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[4, 18].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 18].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 18].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 18].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 19].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[4, 19].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 19].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 19].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 19].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 20].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[4, 20].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 20].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 20].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 20].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 21].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[4, 21].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 21].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 21].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 21].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 22].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[4, 22].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 22].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 22].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 22].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 23].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[4, 23].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 23].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 23].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 23].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 24].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[4, 24].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 24].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 24].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 24].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 25].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[4, 25].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 25].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 25].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 25].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 26].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[4, 26].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 26].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 26].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 26].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                // For Top Border On Line 11
                ws.Cells[11, 1].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[11, 1].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 1].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 1].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 2].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[11, 2].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 2].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 2].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 3].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[11, 3].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 3].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 3].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 4].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[11, 4].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 4].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 4].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 5].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[11, 5].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 5].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 5].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 6].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[11, 6].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 6].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 6].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 7].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[11, 7].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 7].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 7].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 8].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[11, 8].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 8].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 8].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 9].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[11, 9].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 9].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 9].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 10].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[11, 10].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 10].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 10].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));

                // For Border Bottom On Line 11 
                ws.Cells[11, 1].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[11, 1].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 2].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[11, 2].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 3].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[11, 3].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 4].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[11, 4].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 5].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[11, 5].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 6].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[11, 6].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 7].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[11, 7].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 8].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[11, 8].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 9].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[11, 9].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[11, 10].Style.Border.BorderAround(ExcelBorderStyle.Thick);
                ws.Cells[11, 10].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));

                ws.Cells[2, 1].Value = "CRM Reporting - List Of Target Customers";
                ws.Cells[2, 1].Style.Font.Bold = false;
                ws.Cells[2, 1].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells[2, 1].Style.Font.Size = 20;
                ws.Cells[2, 1].Style.Font.Name = "Arial";
                ws.Cells[2, 1].Style.Font.Color.SetColor(Color.FromArgb(164, 82, 61));

                ws.Cells[11, 1].Value = "Medical Rep";
                ws.Cells[11, 1].Style.Font.Bold = true;
                ws.Cells[11, 1].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells[11, 1].Style.Font.Size = 11;
                ws.Cells[11, 1].Style.Font.Name = "Verdana";
                ws.Cells[11, 1].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));

                ws.Cells[11, 2].Value = "Territory Name";
                ws.Cells[11, 2].Style.Font.Bold = true;
                ws.Cells[11, 2].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells[11, 2].Style.Font.Size = 11;
                ws.Cells[11, 2].Style.Font.Name = "Verdana";
                ws.Cells[11, 2].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));

                ws.Cells[11, 3].Value = "Tier";
                ws.Cells[11, 3].Style.Font.Bold = true;
                ws.Cells[11, 3].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells[11, 3].Style.Font.Size = 11;
                ws.Cells[11, 3].Style.Font.Name = "Verdana";
                ws.Cells[11, 3].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));

                ws.Cells[11, 4].Value = "Targeted Customer Names";
                ws.Cells[11, 4].Style.Font.Bold = true;
                ws.Cells[11, 4].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells[11, 4].Style.Font.Size = 11;
                ws.Cells[11, 4].Style.Font.Name = "Verdana";
                ws.Cells[11, 4].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));

                ws.Cells[11, 5].Value = "PRC NUMBER";
                ws.Cells[11, 5].Style.Font.Bold = true;
                ws.Cells[11, 5].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells[11, 5].Style.Font.Size = 11;
                ws.Cells[11, 5].Style.Font.Name = "Verdana";
                ws.Cells[11, 5].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));

                ws.Cells[11, 6].Value = "Primary Specialty";
                ws.Cells[11, 6].Style.Font.Bold = true;
                ws.Cells[11, 6].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells[11, 6].Style.Font.Size = 11;
                ws.Cells[11, 6].Style.Font.Name = "Verdana";
                ws.Cells[11, 6].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));

                ws.Cells[11, 7].Value = "Call Objective";
                ws.Cells[11, 7].Style.Font.Bold = true;
                ws.Cells[11, 7].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells[11, 7].Style.Font.Size = 11;
                ws.Cells[11, 7].Style.Font.Name = "Verdana";
                ws.Cells[11, 7].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));

                ws.Cells[11, 8].Value = "Total Submitted Calls";
                ws.Cells[11, 8].Style.Font.Bold = true;
                ws.Cells[11, 8].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells[11, 8].Style.Font.Size = 11;
                ws.Cells[11, 8].Style.Font.Name = "Verdana";
                ws.Cells[11, 8].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));

                ws.Cells[11, 9].Value = "Potential";
                ws.Cells[11, 9].Style.Font.Bold = true;
                ws.Cells[11, 9].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells[11, 9].Style.Font.Size = 11;
                ws.Cells[11, 9].Style.Font.Name = "Verdana";
                ws.Cells[11, 9].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));

                ws.Cells[11, 10].Value = "Propensity";
                ws.Cells[11, 10].Style.Font.Bold = true;
                ws.Cells[11, 10].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells[11, 10].Style.Font.Size = 11;
                ws.Cells[11, 10].Style.Font.Name = "Verdana";
                ws.Cells[11, 10].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));

                #endregion

                #region Data Assembling


                DAL dl = new DAL();
                _nvCollection.Clear();
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());

                DataTable dtemp = dl.GetData("sp_excelEmployees", _nvCollection).Tables[0];
                System.Collections.ArrayList lst = new System.Collections.ArrayList();
                foreach (DataRow dr in dtemp.Rows)
                {
                    lst.Add(dr[0]);
                }
                _nvCollection.Clear();
                _nvCollection.Add("@Month-VARCHAR-500", month.ToString());
                _nvCollection.Add("@Year-VARCHAR-500", year.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                _nvCollection.Add("@endmonth-int", endmonth.ToString());
                DataTable table = dl.GetData("sp_CR_TargetCustomerNameExcel_qua", _nvCollection).Tables[0];
                int row = 12;
                // int col = 1;
                int a = 12;
                int b = 12;
                int c = 12;
                int d = 12;
                int e = 12;
                int f = 12;
                int g = 12;
                int j = 12;
                int k = 12;

                #region St,T1,T2

                for (int i = 0; i < lst.Count; i++)
                {
                    #region St
                    string expression = "ID = " + lst[i] + " and Tier = 'ST'";
                    DataRow[] foundrows;
                    foundrows = table.Select(expression);



                    for (int ii = 0; ii < foundrows.Length; ii++)
                    {
                        ws.Cells[row, 1].Value = foundrows[ii]["EmployeeName"].ToString();
                        ws.Cells[row, 1].Style.Font.Name = "Verdana";
                        ws.Cells[row, 1].Style.Font.Size = 10;
                        row++;

                        ws.Cells[a, 2].Value = foundrows[ii]["Territory"].ToString();
                        ws.Cells[a, 2].Style.Font.Name = "Verdana";
                        ws.Cells[a, 2].Style.Font.Size = 10;
                        a++;

                        ws.Cells[b, 3].Value = foundrows[ii]["Tier"].ToString();
                        ws.Cells[b, 3].Style.Font.Name = "Verdana";
                        ws.Cells[b, 3].Style.Font.Size = 10;
                        b++;

                        ws.Cells[c, 4].Value = foundrows[ii]["TargetCustomerNames"].ToString();
                        ws.Cells[c, 4].Style.Font.Name = "Verdana";
                        ws.Cells[c, 4].Style.Font.Size = 10;
                        c++;

                        ws.Cells[d, 5].Value = foundrows[ii]["ProfessionalID"].ToString();
                        ws.Cells[d, 5].Style.Font.Name = "Verdana";
                        ws.Cells[d, 5].Style.Font.Size = 10;
                        d++;

                        ws.Cells[e, 6].Value = foundrows[ii]["PrimarySpeciality"].ToString();
                        ws.Cells[e, 6].Style.Font.Name = "Verdana";
                        ws.Cells[e, 6].Style.Font.Size = 10;
                        e++;

                        ws.Cells[f, 7].Value = foundrows[ii]["CallObjective"].ToString();
                        ws.Cells[f, 7].Style.Font.Name = "Verdana";
                        ws.Cells[f, 7].Style.Font.Size = 10;
                        f++;

                        ws.Cells[g, 8].Value = foundrows[ii]["submitedCalls"].ToString();
                        ws.Cells[g, 8].Style.Font.Name = "Verdana";
                        ws.Cells[g, 8].Style.Font.Size = 10;
                        g++;

                        ws.Cells[j, 9].Value = foundrows[ii]["Potential"].ToString();
                        ws.Cells[j, 9].Style.Font.Name = "Verdana";
                        ws.Cells[j, 9].Style.Font.Size = 10;
                        j++;

                        ws.Cells[k, 10].Value = foundrows[ii]["Propensity"].ToString();
                        ws.Cells[k, 10].Style.Font.Name = "Verdana";
                        ws.Cells[k, 10].Style.Font.Size = 10;
                        k++;
                    }
                    ws.Cells[b, 3].Value = "Total ST";
                    ws.Cells[b, 3].Style.Font.Name = "Verdana";
                    ws.Cells[b, 3].Style.Font.Size = 11;
                    ws.Cells[b, 3].Style.Font.Bold = true;
                    ws.Cells[c, 4].Value = foundrows.Length;
                    ws.Cells[c, 4].Style.Font.Bold = true;
                    ws.Cells[c, 4].Style.Font.Size = 10;
                    row++;
                    a++;
                    b++;
                    c++;
                    d++;
                    e++;
                    f++;
                    g++;
                    j++;
                    k++;
                    #endregion

                    #region T1
                    string expressiont1 = "ID = " + lst[i] + " and Tier = 'T1'";
                    DataRow[] foundrowst1;
                    foundrowst1 = table.Select(expressiont1);

                    for (int ii = 0; ii < foundrowst1.Length; ii++)
                    {
                        ws.Cells[row, 1].Value = foundrowst1[ii]["EmployeeName"].ToString();
                        ws.Cells[row, 1].Style.Font.Name = "Verdana";
                        ws.Cells[row, 1].Style.Font.Size = 10;
                        row++;

                        ws.Cells[a, 2].Value = foundrowst1[ii]["Territory"].ToString();
                        ws.Cells[a, 2].Style.Font.Name = "Verdana";
                        ws.Cells[a, 2].Style.Font.Size = 10;
                        a++;

                        ws.Cells[b, 3].Value = foundrowst1[ii]["Tier"].ToString();
                        ws.Cells[b, 3].Style.Font.Name = "Verdana";
                        ws.Cells[b, 3].Style.Font.Size = 10;
                        b++;

                        ws.Cells[c, 4].Value = foundrowst1[ii]["TargetCustomerNames"].ToString();
                        ws.Cells[c, 4].Style.Font.Name = "Verdana";
                        ws.Cells[c, 4].Style.Font.Size = 10;
                        c++;

                        ws.Cells[d, 5].Value = foundrowst1[ii]["ProfessionalID"].ToString();
                        ws.Cells[d, 5].Style.Font.Name = "Verdana";
                        ws.Cells[d, 5].Style.Font.Size = 10;
                        d++;

                        ws.Cells[e, 6].Value = foundrowst1[ii]["PrimarySpeciality"].ToString();
                        ws.Cells[e, 6].Style.Font.Name = "Verdana";
                        ws.Cells[e, 6].Style.Font.Size = 10;
                        e++;

                        ws.Cells[f, 7].Value = foundrowst1[ii]["CallObjective"].ToString();
                        ws.Cells[f, 7].Style.Font.Name = "Verdana";
                        ws.Cells[f, 7].Style.Font.Size = 10;
                        f++;

                        ws.Cells[g, 8].Value = foundrowst1[ii]["submitedCalls"].ToString();
                        ws.Cells[g, 8].Style.Font.Name = "Verdana";
                        ws.Cells[g, 8].Style.Font.Size = 10;
                        g++;

                        ws.Cells[j, 9].Value = foundrowst1[ii]["Potential"].ToString();
                        ws.Cells[j, 9].Style.Font.Name = "Verdana";
                        ws.Cells[j, 9].Style.Font.Size = 10;
                        j++;

                        ws.Cells[k, 10].Value = foundrowst1[ii]["Propensity"].ToString();
                        ws.Cells[k, 10].Style.Font.Name = "Verdana";
                        ws.Cells[k, 10].Style.Font.Size = 10;
                        k++;
                    }
                    ws.Cells[b, 3].Value = "Total T1";
                    ws.Cells[b, 3].Style.Font.Name = "Verdana";
                    ws.Cells[b, 3].Style.Font.Size = 11;
                    ws.Cells[b, 3].Style.Font.Bold = true;
                    ws.Cells[c, 4].Value = foundrowst1.Length;
                    ws.Cells[c, 4].Style.Font.Bold = true;
                    ws.Cells[c, 4].Style.Font.Size = 10;
                    row++;
                    a++;
                    b++;
                    c++;
                    d++;
                    e++;
                    f++;
                    g++;
                    j++;
                    k++;

                    #endregion

                    #region t2

                    string expressiont2 = "ID = " + lst[i] + " and Tier = 'T2'";
                    DataRow[] foundrowst2;
                    foundrowst2 = table.Select(expressiont2);
                    for (int aa = 0; aa < foundrowst2.Length; aa++)
                    {
                        ws.Cells[row, 1].Value = foundrowst2[aa]["EmployeeName"].ToString();
                        ws.Cells[row, 1].Style.Font.Name = "Verdana";
                        ws.Cells[row, 1].Style.Font.Size = 10;
                        row++;

                        ws.Cells[a, 2].Value = foundrowst2[aa]["Territory"].ToString();
                        ws.Cells[a, 2].Style.Font.Name = "Verdana";
                        ws.Cells[a, 2].Style.Font.Size = 10;
                        a++;

                        ws.Cells[b, 3].Value = foundrowst2[aa]["Tier"].ToString();
                        ws.Cells[b, 3].Style.Font.Name = "Verdana";
                        ws.Cells[b, 3].Style.Font.Size = 10;
                        b++;

                        ws.Cells[c, 4].Value = foundrowst2[aa]["TargetCustomerNames"].ToString();
                        ws.Cells[c, 4].Style.Font.Name = "Verdana";
                        ws.Cells[c, 4].Style.Font.Size = 10;
                        c++;

                        ws.Cells[d, 5].Value = foundrowst2[aa]["ProfessionalID"].ToString();
                        ws.Cells[d, 5].Style.Font.Name = "Verdana";
                        ws.Cells[d, 5].Style.Font.Size = 10;
                        d++;

                        ws.Cells[e, 6].Value = foundrowst2[aa]["PrimarySpeciality"].ToString();
                        ws.Cells[e, 6].Style.Font.Name = "Verdana";
                        ws.Cells[e, 6].Style.Font.Size = 10;
                        e++;

                        ws.Cells[f, 7].Value = foundrowst2[aa]["CallObjective"].ToString();
                        ws.Cells[f, 7].Style.Font.Name = "Verdana";
                        ws.Cells[f, 7].Style.Font.Size = 10;
                        f++;

                        ws.Cells[g, 8].Value = foundrowst2[aa]["submitedCalls"].ToString();
                        ws.Cells[g, 8].Style.Font.Name = "Verdana";
                        ws.Cells[g, 8].Style.Font.Size = 10;
                        g++;

                        ws.Cells[j, 9].Value = foundrowst2[aa]["Potential"].ToString();
                        ws.Cells[j, 9].Style.Font.Name = "Verdana";
                        ws.Cells[j, 9].Style.Font.Size = 10;
                        j++;

                        ws.Cells[k, 10].Value = foundrowst2[aa]["Propensity"].ToString();
                        ws.Cells[k, 10].Style.Font.Name = "Verdana";
                        ws.Cells[k, 10].Style.Font.Size = 10;
                        k++;
                    }
                    ws.Cells[b, 3].Value = "Total T2";
                    ws.Cells[b, 3].Style.Font.Name = "Verdana";
                    ws.Cells[b, 3].Style.Font.Size = 11;
                    ws.Cells[b, 3].Style.Font.Bold = true;
                    ws.Cells[c, 4].Value = foundrowst2.Length;
                    ws.Cells[c, 4].Style.Font.Bold = true;
                    ws.Cells[c, 4].Style.Font.Size = 10;
                    row++;
                    a++;
                    b++;
                    c++;
                    d++;
                    e++;
                    f++;
                    g++;
                    j++;
                    k++;
                    #endregion
                }

                #endregion

                #region Hierarachy
                foreach (DataRow dr in table.Rows)
                {
                    foreach (DataColumn dc in table.Columns)
                    {
                        if (dr[dc.ColumnName] != DBNull.Value)
                        {
                            if (dc.ColumnName.ToString() == "Division")
                            {
                                ws.Cells["J4:L4"].Value = "BUH: " + dr[dc.ColumnName].ToString();
                                ws.Cells["J4:L4"].Style.Font.Name = "Verdana";
                                ws.Cells["J4:L4"].Style.Font.Size = 11;
                            }

                            if (dc.ColumnName.ToString() == "Region")
                            {
                                ws.Cells["M4:N4"].Value = "SLM: " + dr[dc.ColumnName].ToString();
                                ws.Cells["M4:N4"].Style.Font.Name = "Verdana";
                                ws.Cells["M4:N4"].Style.Font.Size = 11;
                            }

                            if (dc.ColumnName.ToString() == "Zone")
                            {
                                ws.Cells["A8:A8"].Value = "FLM: " + dr[dc.ColumnName].ToString();
                                ws.Cells["A8:A8"].Style.Font.Name = "Verdana";
                                ws.Cells["A8:A8"].Style.Font.Size = 11;

                            }

                            if (dc.ColumnName.ToString() == "datcol")
                            {
                                ws.Cells[4, 1].Value = "Reporting Period:" + Convert.ToDateTime(dr[dc.ColumnName]).ToString("MMM-yyyy");
                                ws.Cells[4, 1].Style.Font.Name = "Verdana";
                                ws.Cells[4, 1].Style.Font.Size = 11;
                                ws.Cells[4, 1].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));
                            }
                        }
                    }
                }
                #endregion

                #endregion

                pack.Save();
                #region Download Work
                //  var filename = fileInfo.FullName.ToString();
                Session["ListofcustomerXL"] = "List-Of-Target-Customer" + Convert.ToString(empname) + Convert.ToDateTime(dt1).ToString("MMM") + "to" + Convert.ToDateTime(dt2).ToString("MMM") + ".xlsx";


                #endregion

            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Coaching Calls For FLM Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "das";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string CustomerListExcel(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                #region CreatingWorksheet
                int month = Convert.ToDateTime(dt1).Month;
                int Year = Convert.ToDateTime(dt1).Year;
                int endmonth = Convert.ToDateTime(dt2).Month;
                string path = Server.MapPath("~/Excels");

                var empname = GetEmployeeName(level3Id, level4Id, level5Id, level6Id);


                var fileInfo = new FileInfo(path + @"\CommercialReport-PBG-" + Convert.ToString(empname) + Convert.ToDateTime(dt1).ToString("MMM") + " to " + Convert.ToDateTime(dt2).ToString("MMM") + ".xlsx");
                //var fileInfo = new FileInfo(@"C:\Users\BMC New-PC\Desktop\PBGNovartisMYCRM\PocketDCR2\Excels\CommercialReport-PBG-" + Convert.ToDateTime(dt1).ToString("MMM") + ".xlsx");

                var pack = new ExcelPackage(fileInfo);
                ExcelWorksheet ws;
                if (pack.Workbook.Worksheets.Count > 0)
                {
                    ws = pack.Workbook.Worksheets["CommercialList"];
                    pack.Workbook.Worksheets.Delete(ws.Index);
                    ws = pack.Workbook.Worksheets.Add("CommercialList");
                }
                else
                {
                    ws = pack.Workbook.Worksheets.Add("CommercialList");
                }

                #endregion

                #region formating
                ws.View.ShowGridLines = true;

                ws.Column(1).Width = 89.29;
                ws.Column(2).Width = 32.71;
                ws.Column(3).Width = 35.71;
                ws.Column(4).Width = 32.29;
                ws.Column(5).Width = 29.86;
                ws.Column(6).Width = 27.71;
                ws.Column(7).Width = 33.29;
                ws.Column(8).Width = 35.27;
                ws.Column(9).Width = 32.29;
                ws.Column(10).Width = 30.29;
                ws.Column(11).Width = 29.86;
                ws.Column(12).Width = 32.29;
                ws.Column(13).Width = 33.43;
                ws.Column(14).Width = 35.71;
                ws.Column(15).Width = 32.29;
                ws.Column(16).Width = 30.00;
                ws.Column(17).Width = 32.29;
                ws.Column(18).Width = 33.43;

                ws.Row(2).Height = 27.75;
                ws.Row(4).Height = 18.00;
                ws.Row(7).Height = 18.00;

                ws.Cells["A2:B2"].Merge = true;
                ws.Cells["A2:B2"].Value = "Pharma CRM Reporting - Commercial Report (Sales & QTQ)";
                ws.Cells["A2:B2"].Style.Font.Size = 20;
                ws.Cells["A2:B2"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells["A2:B2"].Style.Font.Name = "Arial";
                ws.Cells["A2:B2"].Style.Font.Color.SetColor(Color.FromArgb(164, 82, 61));

                //ws.Cells["A4:Q14"].Merge = true;
                ws.Cells["A4:Q14"].Style.Font.Size = 11;
                ws.Cells["A4:Q14"].Style.Font.Name = "Arial";
                ws.Cells["A4:Q14"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells["A4:Q14"].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(238, 236, 225));

                ws.Cells["A4:C4"].Merge = true;
                ws.Cells["D4:F4"].Merge = true;
                ws.Cells["D4:F4"].Value = "Country:Pakistan";
                ws.Cells["G4:I4"].Merge = true;
                ws.Cells["G4:I4"].Value = "Business Franchise: All";
                ws.Cells["J4:L4"].Merge = true;
                ws.Cells["J4:L4"].Value = "BUH: All";
                ws.Cells["M4:N4"].Merge = true;
                ws.Cells["M4:N4"].Value = "SLM: All";
                ws.Cells["O4:P4"].Merge = true;
                ws.Cells["O4:P4"].Value = "FLM: ";
                ws.Cells["Q4:Q4"].Value = "Medical Rep: All";
                ws.Cells["A7:C7"].Merge = true;
                ws.Cells["A7:C7"].Value = "Reporting Type: MTD";
                ws.Cells["A9:C9"].Merge = true;
                ws.Cells["A9:C9"].Value = "Display Type: Medical Rep";

                //  ws.Cells["A4:Q14"].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                // ws.Cells["A4:Q14"].Style.Border.Top.Color.SetColor(Color.FromArgb(164,82,61));
                //  ws.Cells["A4:Q14"].Style.Border.Bottom.Color.SetColor(Color.FromArgb(164,82,61));


                ws.Cells["A15:A17"].Merge = true;
                ws.Cells["A15:A17"].Value = "Medical Rep";
                ws.Cells["A15:A17"].Style.Font.Bold = true;
                ws.Cells["A15:A17"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells["A15:A17"].Style.Font.Size = 11;
                ws.Cells["A15:A17"].Style.Font.Name = "Verdana";
                ws.Cells["A15:A17"].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));

                ws.Cells["B15:B17"].Merge = true;
                ws.Cells["B15:B17"].Value = "Territory";
                ws.Cells["B15:B17"].Style.Font.Bold = true;
                ws.Cells["B15:B17"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells["B15:B17"].Style.Font.Size = 11;
                ws.Cells["B15:B17"].Style.Font.Name = "Verdana";
                ws.Cells["B15:B17"].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));

                ws.Cells["C15:Q15"].Merge = true;
                ws.Cells["C15:Q15"].Value = "MTD Doctor Calls";
                ws.Cells["C15:Q15"].Style.Font.Bold = true;
                ws.Cells["C15:Q15"].Style.Font.Name = "Verdana";
                ws.Cells["C15:Q15"].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));
                ws.Cells["C15:Q15"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells["C15:Q15"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

                ws.Cells["C16:G16"].Merge = true;
                ws.Cells["C16:G16"].Value = "ST";
                ws.Cells["C16:G16"].Style.Font.Bold = true;
                ws.Cells["C16:G16"].Style.Font.Name = "Verdana";
                ws.Cells["C16:G16"].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));
                ws.Cells["C16:G16"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells["C16:G16"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

                ws.Cells["H16:L16"].Merge = true;
                ws.Cells["H16:L16"].Value = "T1";
                ws.Cells["H16:L16"].Style.Font.Bold = true;
                ws.Cells["H16:L16"].Style.Font.Name = "Verdana";
                ws.Cells["H16:L16"].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));
                ws.Cells["H16:L16"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells["H16:L16"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

                ws.Cells["M16:Q16"].Merge = true;
                ws.Cells["M16:Q16"].Value = "T2";
                ws.Cells["M16:Q16"].Style.Font.Bold = true;
                ws.Cells["M16:Q16"].Style.Font.Name = "Verdana";
                ws.Cells["M16:Q16"].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));
                ws.Cells["M16:Q16"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells["M16:Q16"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

                //ws.Cells[1,17].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //ws.Cells["B15:B17"].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //ws.Cells["B15:B17"].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //ws.Cells["B15:B17"].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //ws.Cells["B15:B17"].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //     ws.Cells["A15:Q17"].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //   ws.Cells["A15:Q17"].Style.Border.Top.Color.SetColor(Color.FromArgb(164, 82, 61));
                //   ws.Cells["A15:Q17"].Style.Border.Bottom.Color.SetColor(Color.FromArgb(164, 82, 61));
                //   ws.Cells["A15:Q17"].Style.Border.Left.Color.SetColor(Color.FromArgb(164, 82, 61));
                //   ws.Cells["A15:Q17"].Style.Border.Right.Color.SetColor(Color.FromArgb(164, 82, 61));

                ws.Cells[15, 1].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[15, 1].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 1].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 1].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 1].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[16, 1].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 1].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 1].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[17, 1].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 1].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));


                ws.Cells[15, 2].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[15, 2].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 2].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 2].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 2].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[16, 2].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 2].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 2].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[17, 2].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 2].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));


                ws.Cells[15, 3].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[15, 3].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 3].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 3].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 4].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[15, 4].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 4].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 5].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[15, 5].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 5].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 6].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[15, 6].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 6].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 7].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[15, 7].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 7].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 8].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[15, 8].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 8].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 9].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[15, 9].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 9].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 10].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[15, 10].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 10].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 11].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[15, 11].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 11].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 12].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[15, 12].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 12].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 13].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[15, 13].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 13].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 14].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[15, 14].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 14].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 15].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[15, 15].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 15].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 16].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[15, 16].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 16].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 17].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[15, 17].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 17].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[15, 17].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));

                ws.Cells[16, 3].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[16, 3].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 3].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 3].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 4].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[16, 4].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 4].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 5].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[16, 5].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 5].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 6].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[16, 6].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 6].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 7].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[16, 7].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 7].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));

                ws.Cells[16, 8].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[16, 8].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 8].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 8].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 9].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[16, 9].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 9].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 10].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[16, 10].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 10].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 11].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[16, 11].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 11].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 12].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[16, 12].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 12].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));

                ws.Cells[16, 13].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[16, 13].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 13].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 13].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 14].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[16, 14].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 14].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 15].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[16, 15].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 15].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 16].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[16, 16].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 16].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 17].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[16, 17].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 17].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[16, 17].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));

                ws.Cells[4, 1].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[4, 1].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 2].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[4, 2].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 3].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[4, 3].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 4].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[4, 4].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 5].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[4, 5].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 6].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[4, 6].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 7].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[4, 7].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 8].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[4, 8].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 9].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[4, 9].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 10].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[4, 10].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 11].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[4, 11].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 12].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[4, 12].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 13].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[4, 13].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 14].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[4, 14].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 15].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[4, 15].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 16].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[4, 16].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[4, 17].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[4, 17].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));


                ws.Cells[17, 3].Value = "No. Of Targeted Customers";
                ws.Cells[17, 3].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[17, 3].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 3].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 3].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 3].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 3].Style.Font.Name = "Verdana";
                ws.Cells[17, 3].Style.Font.Size = 11;
                ws.Cells[17, 3].Style.Font.Bold = true;
                ws.Cells[17, 3].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));
                ws.Cells[17, 3].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;

                ws.Cells[17, 4].Value = "No. Of Visited Customers";
                ws.Cells[17, 4].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[17, 4].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 4].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 4].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 4].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 4].Style.Font.Name = "Verdana";
                ws.Cells[17, 4].Style.Font.Size = 11;
                ws.Cells[17, 4].Style.Font.Bold = true;
                ws.Cells[17, 4].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));
                ws.Cells[17, 4].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;

                ws.Cells[17, 5].Value = "Customer Coverage %";
                ws.Cells[17, 5].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[17, 5].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 5].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 5].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 5].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 5].Style.Font.Name = "Verdana";
                ws.Cells[17, 5].Style.Font.Size = 11;
                ws.Cells[17, 5].Style.Font.Bold = true;
                ws.Cells[17, 5].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));
                ws.Cells[17, 5].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;

                ws.Cells[17, 6].Value = "Call Completed %";
                ws.Cells[17, 6].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[17, 6].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 6].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 6].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 6].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 6].Style.Font.Name = "Verdana";
                ws.Cells[17, 6].Style.Font.Size = 11;
                ws.Cells[17, 6].Style.Font.Bold = true;
                ws.Cells[17, 6].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));
                ws.Cells[17, 6].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;

                ws.Cells[17, 7].Value = "Productive Frequency %";
                ws.Cells[17, 7].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[17, 7].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 7].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 7].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 7].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 7].Style.Font.Name = "Verdana";
                ws.Cells[17, 7].Style.Font.Size = 11;
                ws.Cells[17, 7].Style.Font.Bold = true;
                ws.Cells[17, 7].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));
                ws.Cells[17, 7].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;

                ws.Cells[17, 8].Value = "No. of targeted customers";
                ws.Cells[17, 8].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[17, 8].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 8].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 8].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 8].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 8].Style.Font.Name = "Verdana";
                ws.Cells[17, 8].Style.Font.Size = 11;
                ws.Cells[17, 8].Style.Font.Bold = true;
                ws.Cells[17, 8].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));
                ws.Cells[17, 8].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;

                ws.Cells[17, 9].Value = "No. of visited customers";
                ws.Cells[17, 9].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[17, 9].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 9].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 9].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 9].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 9].Style.Font.Name = "Verdana";
                ws.Cells[17, 9].Style.Font.Size = 11;
                ws.Cells[17, 9].Style.Font.Bold = true;
                ws.Cells[17, 9].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));
                ws.Cells[17, 9].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;

                ws.Cells[17, 10].Value = "Customer Coverage %";
                ws.Cells[17, 10].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[17, 10].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 10].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 10].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 10].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 10].Style.Font.Name = "Verdana";
                ws.Cells[17, 10].Style.Font.Size = 11;
                ws.Cells[17, 10].Style.Font.Bold = true;
                ws.Cells[17, 10].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));
                ws.Cells[17, 10].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;

                ws.Cells[17, 11].Value = "Call Completed %";
                ws.Cells[17, 11].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[17, 11].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 11].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 11].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 11].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 11].Style.Font.Name = "Verdana";
                ws.Cells[17, 11].Style.Font.Size = 11;
                ws.Cells[17, 11].Style.Font.Bold = true;
                ws.Cells[17, 11].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));
                ws.Cells[17, 11].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;

                ws.Cells[17, 12].Value = "Productive Frequency %";
                ws.Cells[17, 12].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[17, 12].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 12].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 12].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 12].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 12].Style.Font.Name = "Verdana";
                ws.Cells[17, 12].Style.Font.Size = 11;
                ws.Cells[17, 12].Style.Font.Bold = true;
                ws.Cells[17, 12].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));
                ws.Cells[17, 12].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;

                ws.Cells[17, 13].Value = "No. of targeted customers";
                ws.Cells[17, 13].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[17, 13].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 13].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 13].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 13].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 13].Style.Font.Name = "Verdana";
                ws.Cells[17, 13].Style.Font.Size = 11;
                ws.Cells[17, 13].Style.Font.Bold = true;
                ws.Cells[17, 13].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));
                ws.Cells[17, 13].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;

                ws.Cells[17, 14].Value = "No. of visited customers";
                ws.Cells[17, 14].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[17, 14].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 14].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 14].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 14].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 14].Style.Font.Name = "Verdana";
                ws.Cells[17, 14].Style.Font.Size = 11;
                ws.Cells[17, 14].Style.Font.Bold = true;
                ws.Cells[17, 14].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));
                ws.Cells[17, 14].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;

                ws.Cells[17, 15].Value = "Customer Coverage %";
                ws.Cells[17, 15].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[17, 15].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 15].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 15].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 15].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 15].Style.Font.Name = "Verdana";
                ws.Cells[17, 15].Style.Font.Size = 11;
                ws.Cells[17, 15].Style.Font.Bold = true;
                ws.Cells[17, 15].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));
                ws.Cells[17, 15].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;

                ws.Cells[17, 16].Value = "Call Completed %";
                ws.Cells[17, 16].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[17, 16].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 16].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 16].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 16].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 16].Style.Font.Name = "Verdana";
                ws.Cells[17, 16].Style.Font.Size = 11;
                ws.Cells[17, 16].Style.Font.Bold = true;
                ws.Cells[17, 16].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));
                ws.Cells[17, 16].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;

                ws.Cells[17, 17].Value = "Productive Frequency %";
                ws.Cells[17, 17].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[17, 17].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 17].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 17].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 17].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[17, 17].Style.Font.Name = "Verdana";
                ws.Cells[17, 17].Style.Font.Size = 11;
                ws.Cells[17, 17].Style.Font.Bold = true;
                ws.Cells[17, 17].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));
                ws.Cells[17, 17].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;

                #endregion

                #region ST
                DAL dl = new DAL();
                _nvCollection.Clear();
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());

                DataTable dtemp = dl.GetData("sp_excelEmployees", _nvCollection).Tables[0];
                DataRow[] dremp;
                //string[] ab1;
                System.Collections.ArrayList lst = new System.Collections.ArrayList();
                System.Collections.ArrayList lstN = new System.Collections.ArrayList();
                //remp = dtemp.Rows[0][];
                foreach (DataRow dr in dtemp.Rows)
                {
                    lst.Add(dr[0]);
                    lstN.Add(dr[1]);
                }
                _nvCollection.Clear();
                _nvCollection.Add("@Month-VARCHAR-500", month.ToString());
                _nvCollection.Add("@Year-VARCHAR-500", DateTime.Now.Year.ToString());
                _nvCollection.Add("@endmonth-VARCHAR-500", endmonth.ToString());
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());

                DataTable table;

                if (level3Id == "1" && level4Id == "0" && level5Id == "0" && level6Id == "0")
                {
                    table = dl.GetData("Sp_newSTcommercialListExcel_qua_division", _nvCollection).Tables[0];
                }
                else if (level4Id != "0" && level5Id == "0" && level6Id == "0")
                {
                    table = dl.GetData("Sp_newSTcommercialListExcel_qua_Region", _nvCollection).Tables[0];
                }
                else if (level5Id != "0" && level6Id == "0")
                {
                    table = dl.GetData("Sp_newSTcommercialListExcel_qua_zone", _nvCollection).Tables[0];
                }
                else
                {
                    table = dl.GetData("Sp_newSTcommercialListExcel_qua_Territory", _nvCollection).Tables[0];
                }

                int row = 18;

                int a = 18;
                int b = 18;
                int c = 18;
                int d = 18;
                int e = 18;
                int f = 18;
                int col = 1;

                foreach (DataRow dr in table.Rows)
                {
                    foreach (DataColumn dc in table.Columns)
                    {
                        if (dr[dc.ColumnName] != DBNull.Value)
                        {
                            if (dc.ColumnName.ToString() == "EmployeeName")
                            {
                                ws.Cells[row, col].Value = dr[dc.ColumnName].ToString();
                                ws.Cells[row, col].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                                ws.Cells[row, col].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[row, col].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[row, col].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[row, col].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[row, col].Style.Font.Name = "Verdana";
                                ws.Cells[row, col].Style.Font.Size = 10;
                                //row++;
                            }
                            col++;
                            if (dc.ColumnName.ToString() == "Territory")
                            {
                                ws.Cells[a, col].Value = dr[dc.ColumnName].ToString();
                                ws.Cells[a, col].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                                ws.Cells[a, col].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[a, col].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[a, col].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[a, col].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[a, col].Style.Font.Name = "Verdana";
                                ws.Cells[a, col].Style.Font.Size = 10;
                                //a++;

                            }
                            col++;
                            if (dc.ColumnName.ToString() == "TargetCustomer")
                            {
                                ws.Cells[b, col].Value = dr[dc.ColumnName].ToString();
                                ws.Cells[b, col].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                                ws.Cells[b, col].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[b, col].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[b, col].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[b, col].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[b, col].Style.Font.Name = "Verdana";
                                ws.Cells[b, col].Style.Font.Size = 10;
                                //b++;
                            }
                            col++;
                            if (dc.ColumnName.ToString() == "VisitedCustomer")
                            {
                                ws.Cells[c, col].Value = dr[dc.ColumnName].ToString();
                                ws.Cells[c, col].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                                ws.Cells[c, col].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[c, col].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[c, col].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[c, col].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[c, col].Style.Font.Name = "Verdana";
                                ws.Cells[c, col].Style.Font.Size = 10;
                                //c++;
                            }
                            col++;
                            if (dc.ColumnName.ToString() == "CustomerCoverage")
                            {
                                ws.Cells[d, col].Value = dr[dc.ColumnName].ToString();
                                ws.Cells[d, col].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                                ws.Cells[d, col].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[d, col].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[d, col].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[d, col].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[d, col].Style.Font.Name = "Verdana";
                                ws.Cells[d, col].Style.Font.Size = 10;
                                //c++;
                            }
                            col++;
                            if (dc.ColumnName.ToString() == "CallCompleted")
                            {
                                ws.Cells[e, col].Value = dr[dc.ColumnName].ToString();
                                ws.Cells[e, col].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                                ws.Cells[e, col].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[e, col].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[e, col].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[e, col].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[e, col].Style.Font.Name = "Verdana";
                                ws.Cells[e, col].Style.Font.Size = 10;
                                //c++;
                            }
                            col++;
                            if (dc.ColumnName.ToString() == "ProdFreq")
                            {
                                ws.Cells[f, col].Value = dr[dc.ColumnName].ToString();
                                ws.Cells[f, col].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                                ws.Cells[f, col].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[f, col].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[f, col].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[f, col].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[f, col].Style.Font.Name = "Verdana";
                                ws.Cells[f, col].Style.Font.Size = 10;
                                //c++;
                            }
                            col++;
                        }
                        col = 1;
                    }
                    row++;
                    a++;
                    b++;
                    c++;
                    d++;
                    e++;
                    f++;
                }


                #region previousdata
                //for (int i = 0; i < lst.Count; i++)
                //{


                //    string expresion = "EmpID = " + lst[i] + "";
                //    DataRow[] foundrows;
                //    foundrows = table.Select(expresion);
                //    if (foundrows.Length == 0)
                //    {
                //        row++;
                //        a++;
                //        ws.Cells[b, 3].Value = "Null";
                //        b++;

                //        ws.Cells[c, 4].Value = "Null";
                //        c++;

                //        ws.Cells[d, 5].Value = "Null";
                //        d++;

                //        ws.Cells[e, 6].Value = "Null";
                //        e++;

                //        ws.Cells[f, 7].Value = "Null";
                //        f++;
                //    }
                //    else
                //    {
                //        for (int ai = 0; ai < foundrows.Length; ai++)
                //        {

                //            ws.Cells[row, 1].Value = foundrows[ai]["EmployeeName"].ToString();
                //            ws.Cells[row, 1].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //            ws.Cells[row, 1].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row, 1].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row, 1].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row, 1].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row, 1].Style.Font.Name = "Verdana";
                //            ws.Cells[row, 1].Style.Font.Size = 10;
                //            row++;

                //            ws.Cells[a, 2].Value = foundrows[ai]["Territory"].ToString();
                //            ws.Cells[a, 2].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //            ws.Cells[a, 2].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[a, 2].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[a, 2].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[a, 2].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[a, 2].Style.Font.Name = "Verdana";
                //            ws.Cells[a, 2].Style.Font.Size = 10;
                //            a++;

                //            ws.Cells[b, 3].Value = foundrows[ai]["TargetCustomer"].ToString();
                //            ws.Cells[b, 3].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //            ws.Cells[b, 3].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[b, 3].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[b, 3].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[b, 3].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[b, 3].Style.Font.Name = "Verdana";
                //            ws.Cells[b, 3].Style.Font.Size = 10;
                //            b++;

                //            ws.Cells[c, 4].Value = foundrows[ai]["VisitedCustomer"].ToString();
                //            ws.Cells[c, 4].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //            ws.Cells[c, 4].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[c, 4].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[c, 4].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[c, 4].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[c, 4].Style.Font.Name = "Verdana";
                //            ws.Cells[c, 4].Style.Font.Size = 10;
                //            c++;

                //            ws.Cells[d, 5].Value = foundrows[ai]["CustomerCoverage"].ToString();
                //            ws.Cells[d, 5].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //            ws.Cells[d, 5].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[d, 5].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[d, 5].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[d, 5].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[d, 5].Style.Font.Name = "Verdana";
                //            ws.Cells[d, 5].Style.Font.Size = 10;
                //            d++;

                //            ws.Cells[e, 6].Value = foundrows[ai]["CallCompleted"].ToString();
                //            ws.Cells[e, 6].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //            ws.Cells[e, 6].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[e, 6].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[e, 6].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[e, 6].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[e, 6].Style.Font.Name = "Verdana";
                //            ws.Cells[e, 6].Style.Font.Size = 10;
                //            e++;

                //            ws.Cells[f, 7].Value = foundrows[ai]["ProdFreq"].ToString();
                //            ws.Cells[f, 7].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //            ws.Cells[f, 7].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[f, 7].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[f, 7].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[f, 7].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[f, 7].Style.Font.Name = "Verdana";
                //            ws.Cells[f, 7].Style.Font.Size = 10;
                //            f++;
                //        }
                //    }

                //}
                #endregion

                #region faltudata

                foreach (DataRow dr in table.Rows)
                {
                    foreach (DataColumn dc in table.Columns)
                    {
                        if (dr[dc.ColumnName] != DBNull.Value)
                        {
                            if (dc.ColumnName.ToString() == "Division")
                            {
                                ws.Cells["J4:L4"].Value = "BUH: " + dr[dc.ColumnName].ToString();
                                ws.Cells["J4:L4"].Style.Font.Name = "Verdana";
                                ws.Cells["J4:L4"].Style.Font.Size = 11;

                            }
                            if (dc.ColumnName.ToString() == "Region")
                            {
                                ws.Cells["M4:N4"].Value = "SLM: " + dr[dc.ColumnName].ToString();
                                ws.Cells["M4:N4"].Style.Font.Name = "Verdana";
                                ws.Cells["M4:N4"].Style.Font.Size = 11;

                            }
                            if (dc.ColumnName.ToString() == "Zone")
                            {
                                ws.Cells["O4:P4"].Value = "FLM: " + dr[dc.ColumnName].ToString();
                                ws.Cells["O4:P4"].Style.Font.Name = "Verdana";
                                ws.Cells["O4:P4"].Style.Font.Size = 11;

                            }
                            if (dc.ColumnName.ToString() == "datecol")
                            {
                                ws.Cells[4, 1].Value = "Reporting Period:" + Convert.ToDateTime(dr[dc.ColumnName]).ToString("MMM-yyyy");
                                ws.Cells[4, 1].Style.Font.Name = "Verdana";
                                ws.Cells[4, 1].Style.Font.Size = 11;
                                ws.Cells[4, 1].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));
                            }
                        }
                    }
                }
                #endregion

                #endregion

                #region T1
                DAL dl1 = new DAL();
                _nvCollection.Clear();

                _nvCollection.Add("@Month-VARCHAR-500", month.ToString());
                _nvCollection.Add("@Year-VARCHAR-500", DateTime.Now.Year.ToString());
                _nvCollection.Add("@endmonth-VARCHAR-500", endmonth.ToString());
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                DataTable table1;


                if (level3Id == "1" && level4Id == "0" && level5Id == "0" && level6Id == "0")
                {
                    table1 = dl1.GetData("Sp_T1commercialListExcel_qua_division", _nvCollection).Tables[0];
                }
                else if (level4Id != "0" && level5Id == "0" && level6Id == "0")
                {
                    table1 = dl1.GetData("Sp_T1commercialListExcel_qua_region", _nvCollection).Tables[0];
                }
                else if (level5Id != "0" && level6Id == "0")
                {
                    table1 = dl1.GetData("Sp_T1commercialListExcel_qua_zone", _nvCollection).Tables[0];
                }
                else
                {
                    table1 = dl1.GetData("Sp_T1commercialListExcel_qua_territory", _nvCollection).Tables[0];
                }

                int row1 = 18;
                int a1 = 18;
                int b1 = 18;
                int c1 = 18;
                int d1 = 18;
                int e1 = 18;
                int f1 = 18;
                int col1 = 8;

                foreach (DataRow dr in table1.Rows)
                {
                    foreach (DataColumn dc in table1.Columns)
                    {
                        if (dr[dc.ColumnName] != DBNull.Value)
                        {
                            //if (dc.ColumnName.ToString() == "EmployeeName")
                            //{
                            //    ws.Cells[row1, col1].Value = dr[dc.ColumnName].ToString();
                            //    ws.Cells[row1, col1].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                            //    ws.Cells[row1, col1].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                            //    ws.Cells[row1, col1].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                            //    ws.Cells[row1, col1].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                            //    ws.Cells[row1, col1].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                            //    ws.Cells[row1, col1].Style.Font.Name = "Verdana";
                            //    ws.Cells[row1, col1].Style.Font.Size = 10;
                            //}
                            //col1++;
                            //if (dc.ColumnName.ToString() == "Territory")
                            //{
                            //    ws.Cells[a1, col1].Value = dr[dc.ColumnName].ToString();
                            //    ws.Cells[a1, col1].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                            //    ws.Cells[a1, col1].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                            //    ws.Cells[a1, col1].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                            //    ws.Cells[a1, col1].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                            //    ws.Cells[a1, col1].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                            //    ws.Cells[a1, col1].Style.Font.Name = "Verdana";
                            //    ws.Cells[a1, col1].Style.Font.Size = 10;
                            //}
                            //col1++;
                            if (dc.ColumnName.ToString() == "TargetCustomer")
                            {
                                ws.Cells[b1, col1].Value = dr[dc.ColumnName].ToString();
                                ws.Cells[b1, col1].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                                ws.Cells[b1, col1].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[b1, col1].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[b1, col1].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[b1, col1].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[b1, col1].Style.Font.Name = "Verdana";
                                ws.Cells[b1, col1].Style.Font.Size = 10;
                            }
                            col1++;
                            if (dc.ColumnName.ToString() == "VisitedCustomer")
                            {
                                ws.Cells[c1, col1].Value = dr[dc.ColumnName].ToString();
                                ws.Cells[c1, col1].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                                ws.Cells[c1, col1].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[c1, col1].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[c1, col1].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[c1, col1].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[c1, col1].Style.Font.Name = "Verdana";
                                ws.Cells[c1, col1].Style.Font.Size = 10;
                            }
                            col1++;
                            if (dc.ColumnName.ToString() == "CustomerCoverage")
                            {
                                ws.Cells[d1, col1].Value = dr[dc.ColumnName].ToString();
                                ws.Cells[d1, col1].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                                ws.Cells[d1, col1].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[d1, col1].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[d1, col1].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[d1, col1].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[d1, col1].Style.Font.Name = "Verdana";
                                ws.Cells[d1, col1].Style.Font.Size = 10;
                            }
                            col1++;
                            if (dc.ColumnName.ToString() == "CallCompleted")
                            {
                                ws.Cells[e1, col1].Value = dr[dc.ColumnName].ToString();
                                ws.Cells[e1, col1].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                                ws.Cells[e1, col1].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[e1, col1].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[e1, col1].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[e1, col1].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[e1, col1].Style.Font.Name = "Verdana";
                                ws.Cells[e1, col1].Style.Font.Size = 10;
                            }
                            col1++;
                            if (dc.ColumnName.ToString() == "ProdFreq")
                            {
                                ws.Cells[f1, col1].Value = dr[dc.ColumnName].ToString();
                                ws.Cells[f1, col1].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                                ws.Cells[f1, col1].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[f1, col1].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[f1, col1].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[f1, col1].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[f1, col1].Style.Font.Name = "Verdana";
                                ws.Cells[f1, col1].Style.Font.Size = 10;
                            }
                            col1++;
                        }
                        col1 = 8;
                    }
                    row1++;
                    a1++;
                    b1++;
                    c1++;
                    d1++;
                    e1++;
                    f1++;
                }

                #region previousdata
                //for (int i = 0; i < lst.Count; i++)
                //{
                //    string expresion = "EmpID = " + lst[i] + "";
                //    DataRow[] foundrows;
                //    foundrows = table1.Select(expresion);
                //    if (foundrows.Length == 0)
                //    {
                //        row1++;
                //        a1++;
                //        //b1++;
                //        //c1++;
                //        //d1++;
                //        //e1++;
                //        //f1++;

                //        ws.Cells[b1, 8].Value = "Null";
                //        b1++;

                //        ws.Cells[c1, 9].Value = "Null";
                //        c1++;

                //        ws.Cells[d1, 10].Value = "Null";
                //        d1++;

                //        ws.Cells[e1, 11].Value = "Null";
                //        e1++;

                //        ws.Cells[f1, 12].Value = "Null";
                //        f1++;
                //    }
                //    else
                //    {
                //        for (int ai = 0; ai < foundrows.Length; ai++)
                //        {

                //            ws.Cells[row1, 1].Value = foundrows[ai]["EmployeeName"].ToString();
                //            ws.Cells[row1, 1].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //            ws.Cells[row1, 1].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row1, 1].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row1, 1].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row1, 1].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row1, 1].Style.Font.Name = "Verdana";
                //            ws.Cells[row1, 1].Style.Font.Size = 10;
                //            row1++;

                //            ws.Cells[a1, 2].Value = foundrows[ai]["Territory"].ToString();
                //            ws.Cells[a1, 2].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //            ws.Cells[a1, 2].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[a1, 2].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[a1, 2].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[a1, 2].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[a1, 2].Style.Font.Name = "Verdana";
                //            ws.Cells[a1, 2].Style.Font.Size = 10;
                //            a1++;

                //            ws.Cells[b1, 8].Value = foundrows[ai]["TargetCustomer"].ToString();
                //            ws.Cells[b1, 8].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //            ws.Cells[b1, 8].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[b1, 8].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[b1, 8].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[b1, 8].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[b1, 8].Style.Font.Name = "Verdana";
                //            ws.Cells[b1, 8].Style.Font.Size = 10;
                //            b1++;

                //            ws.Cells[c1, 9].Value = foundrows[ai]["VisitedCustomer"].ToString();
                //            ws.Cells[c1, 9].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //            ws.Cells[c1, 9].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[c1, 9].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[c1, 9].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[c1, 9].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[c1, 9].Style.Font.Name = "Verdana";
                //            ws.Cells[c1, 9].Style.Font.Size = 10;
                //            c1++;

                //            ws.Cells[d1, 10].Value = foundrows[ai]["CustomerCoverage"].ToString();
                //            ws.Cells[d1, 10].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //            ws.Cells[d1, 10].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[d1, 10].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[d1, 10].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[d1, 10].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[d1, 10].Style.Font.Name = "Verdana";
                //            ws.Cells[d1, 10].Style.Font.Size = 10;
                //            d1++;

                //            ws.Cells[e1, 11].Value = foundrows[ai]["CallCompleted"].ToString();
                //            ws.Cells[e1, 11].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //            ws.Cells[e1, 11].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[e1, 11].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[e1, 11].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[e1, 11].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[e1, 11].Style.Font.Name = "Verdana";
                //            ws.Cells[e1, 11].Style.Font.Size = 10;
                //            e1++;

                //            ws.Cells[f1, 12].Value = foundrows[ai]["ProdFreq"].ToString();
                //            ws.Cells[f1, 12].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //            ws.Cells[f1, 12].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[f1, 12].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[f1, 12].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[f1, 12].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[f1, 12].Style.Font.Name = "Verdana";
                //            ws.Cells[f1, 12].Style.Font.Size = 10;
                //            f1++;

                //        }
                //    }
                //}
                #endregion

                #endregion

                #region T2
                DAL dl2 = new DAL();
                _nvCollection.Clear();

                _nvCollection.Add("@Month-VARCHAR-500", month.ToString());
                _nvCollection.Add("@Year-VARCHAR-500", DateTime.Now.Year.ToString());
                _nvCollection.Add("@endmonth-VARCHAR-500", endmonth.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                DataTable table2;

                if (level3Id == "1" && level4Id == "0" && level5Id == "0" && level6Id == "0")
                {
                    table2 = dl2.GetData("Sp_T2commercialListExcel_qua_division", _nvCollection).Tables[0];
                }
                else if (level4Id != "0" && level5Id == "0" && level6Id == "0")
                {
                    table2 = dl2.GetData("Sp_T2commercialListExcel_qua_region", _nvCollection).Tables[0];
                }
                else if (level5Id != "0" && level6Id == "0")
                {
                    table2 = dl2.GetData("Sp_T2commercialListExcel_qua_zone", _nvCollection).Tables[0];
                }
                else
                {
                    table2 = dl2.GetData("Sp_T2commercialListExcel_qua_territory", _nvCollection).Tables[0];
                }

                int row2 = 18;
                int col2 = 13;
                int a2 = 18;
                int b2 = 18;
                int c2 = 18;
                int d2 = 18;
                int e2 = 18;
                int f2 = 18;

                foreach (DataRow dr in table2.Rows)
                {
                    foreach (DataColumn dc in table2.Columns)
                    {
                        if (dr[dc.ColumnName] != DBNull.Value)
                        {
                            //if (dc.ColumnName.ToString() == "EmployeeName")
                            //{
                            //    ws.Cells[row2, col2].Value = dr[dc.ColumnName].ToString();
                            //    ws.Cells[row2, col2].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                            //    ws.Cells[row2, col2].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                            //    ws.Cells[row2, col2].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                            //    ws.Cells[row2, col2].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                            //    ws.Cells[row2, col2].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                            //    ws.Cells[row2, col2].Style.Font.Name = "Verdana";
                            //    ws.Cells[row2, col2].Style.Font.Size = 10;
                            //}
                            //col2++;
                            //if (dc.ColumnName.ToString() == "Territory")
                            //{
                            //    ws.Cells[a2, col2].Value = dr[dc.ColumnName].ToString();
                            //    ws.Cells[a2, col2].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                            //    ws.Cells[a2, col2].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                            //    ws.Cells[a2, col2].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                            //    ws.Cells[a2, col2].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                            //    ws.Cells[a2, col2].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                            //    ws.Cells[a2, col2].Style.Font.Name = "Verdana";
                            //    ws.Cells[a2, col2].Style.Font.Size = 10;
                            //}
                            //col2++;
                            if (dc.ColumnName.ToString() == "TargetCustomer")
                            {
                                ws.Cells[b2, col2].Value = dr[dc.ColumnName].ToString();
                                ws.Cells[b2, col2].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                                ws.Cells[b2, col2].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[b2, col2].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[b2, col2].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[b2, col2].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[b2, col2].Style.Font.Name = "Verdana";
                                ws.Cells[b2, col2].Style.Font.Size = 10;
                            }
                            col2++;
                            if (dc.ColumnName.ToString() == "VisitedCustomer")
                            {
                                ws.Cells[c2, col2].Value = dr[dc.ColumnName].ToString();
                                ws.Cells[c2, col2].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                                ws.Cells[c2, col2].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[c2, col2].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[c2, col2].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[c2, col2].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[c2, col2].Style.Font.Name = "Verdana";
                                ws.Cells[c2, col2].Style.Font.Size = 10;
                            }
                            col2++;
                            if (dc.ColumnName.ToString() == "CustomerCoverage")
                            {
                                ws.Cells[d2, col2].Value = dr[dc.ColumnName].ToString();
                                ws.Cells[d2, col2].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                                ws.Cells[d2, col2].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[d2, col2].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[d2, col2].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[d2, col2].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[d2, col2].Style.Font.Name = "Verdana";
                                ws.Cells[d2, col2].Style.Font.Size = 10;
                            }
                            col2++;
                            if (dc.ColumnName.ToString() == "CallCompleted")
                            {
                                ws.Cells[e2, col2].Value = dr[dc.ColumnName].ToString();
                                ws.Cells[e2, col2].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                                ws.Cells[e2, col2].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[e2, col2].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[e2, col2].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[e2, col2].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[e2, col2].Style.Font.Name = "Verdana";
                                ws.Cells[e2, col2].Style.Font.Size = 10;
                            }
                            col2++;
                            if (dc.ColumnName.ToString() == "ProdFreq")
                            {
                                ws.Cells[f2, col2].Value = dr[dc.ColumnName].ToString();
                                ws.Cells[f2, col2].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                                ws.Cells[f2, col2].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[f2, col2].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[f2, col2].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[f2, col2].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[f2, col2].Style.Font.Name = "Verdana";
                                ws.Cells[f2, col2].Style.Font.Size = 10;
                            }
                            col2++;

                        }
                        col2 = 13;
                    }
                    row2++;
                    a2++;
                    b2++;
                    c2++;
                    d2++;
                    e2++;
                    f2++;

                }

                #region predata
                //for (int i = 0; i < lst.Count; i++)
                //{
                //    string expresion = "EmpID = " + lst[i] + "";
                //    DataRow[] foundrows;
                //    foundrows = table2.Select(expresion);
                //    if (foundrows.Length == 0)
                //    {
                //        row2++;
                //        a2++;
                //        //b2++;
                //        //c2++;
                //        //d2++;
                //        //e2++;
                //        //f2++;
                //        ws.Cells[b2, 13].Value = "Null";
                //        b2++;

                //        ws.Cells[c2, 14].Value = "Null";
                //        c2++;

                //        ws.Cells[d2, 15].Value = "Null";
                //        d2++;

                //        ws.Cells[e2, 16].Value = "Null";
                //        e2++;

                //        ws.Cells[f2, 17].Value = "Null";
                //        f2++;
                //    }
                //    else
                //    {
                //        for (int ai = 0; ai < foundrows.Length; ai++)
                //        {

                //            ws.Cells[row2, 1].Value = foundrows[ai]["EmployeeName"].ToString();
                //            ws.Cells[row2, 1].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //            ws.Cells[row2, 1].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row2, 1].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row2, 1].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row2, 1].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row2, 1].Style.Font.Name = "Verdana";
                //            ws.Cells[row2, 1].Style.Font.Size = 10;
                //            row2++;


                //            ws.Cells[a2, 2].Value = foundrows[ai]["Territory"].ToString();
                //            ws.Cells[a2, 2].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //            ws.Cells[a2, 2].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[a2, 2].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[a2, 2].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[a2, 2].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[a2, 2].Style.Font.Name = "Verdana";
                //            ws.Cells[a2, 2].Style.Font.Size = 10;
                //            a2++;

                //            ws.Cells[b2, 13].Value = foundrows[ai]["TargetCustomer"].ToString();
                //            ws.Cells[b2, 13].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //            ws.Cells[b2, 13].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[b2, 13].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[b2, 13].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[b2, 13].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[b2, 13].Style.Font.Name = "Verdana";
                //            ws.Cells[b2, 13].Style.Font.Size = 10;
                //            b2++;

                //            ws.Cells[c2, 14].Value = foundrows[ai]["VisitedCustomer"].ToString();
                //            ws.Cells[c2, 14].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //            ws.Cells[c2, 14].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[c2, 14].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[c2, 14].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[c2, 14].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[c2, 14].Style.Font.Name = "Verdana";
                //            ws.Cells[c2, 14].Style.Font.Size = 10;
                //            c2++;

                //            ws.Cells[d2, 15].Value = foundrows[ai]["CustomerCoverage"].ToString();
                //            ws.Cells[d2, 15].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //            ws.Cells[d2, 15].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[d2, 15].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[d2, 15].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[d2, 15].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[d2, 15].Style.Font.Name = "Verdana";
                //            ws.Cells[d2, 15].Style.Font.Size = 10;
                //            d2++;

                //            ws.Cells[e2, 16].Value = foundrows[ai]["CallCompleted"].ToString();
                //            ws.Cells[e2, 16].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //            ws.Cells[e2, 16].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[e2, 16].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[e2, 16].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[e2, 16].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[e2, 16].Style.Font.Name = "Verdana";
                //            ws.Cells[e2, 16].Style.Font.Size = 10;
                //            e2++;

                //            ws.Cells[f2, 17].Value = foundrows[ai]["ProdFreq"].ToString();
                //            ws.Cells[f2, 17].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //            ws.Cells[f2, 17].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[f2, 17].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[f2, 17].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[f2, 17].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[f2, 17].Style.Font.Name = "Verdana";
                //            ws.Cells[f2, 17].Style.Font.Size = 10;
                //            f2++;

                //        }
                //    }
                //}
                #endregion


                #endregion

                #region daysinfield,diffincall,callsperday

                ws.Cells[row2 + 1, 1][row2 + 2, 1].Merge = true;
                ws.Cells[row2 + 1, 1][row2 + 2, 1].Value = "Medical Rep";
                ws.Cells[row2 + 1, 1][row2 + 2, 1].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[row2 + 1, 1][row2 + 2, 1].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[row2 + 1, 1][row2 + 2, 1].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[row2 + 1, 1][row2 + 2, 1].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[row2 + 1, 1][row2 + 2, 1].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[row2 + 1, 1][row2 + 2, 1].Style.Font.Size = 11;
                ws.Cells[row2 + 1, 1][row2 + 2, 1].Style.Font.Name = "Verdana";
                ws.Cells[row2 + 1, 1][row2 + 2, 1].Style.Font.Bold = true;
                ws.Cells[row2 + 1, 1][row2 + 2, 1].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));

                ws.Cells[row2 + 1, 2][row2 + 2, 2].Merge = true;
                ws.Cells[row2 + 1, 2][row2 + 2, 2].Value = "Territory";
                ws.Cells[row2 + 1, 2][row2 + 2, 2].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[row2 + 1, 2][row2 + 2, 2].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[row2 + 1, 2][row2 + 2, 2].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[row2 + 1, 2][row2 + 2, 2].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[row2 + 1, 2][row2 + 2, 2].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[row2 + 1, 2][row2 + 2, 2].Style.Font.Size = 11;
                ws.Cells[row2 + 1, 2][row2 + 2, 2].Style.Font.Name = "Verdana";
                ws.Cells[row2 + 1, 2][row2 + 2, 2].Style.Font.Bold = true;
                ws.Cells[row2 + 1, 2][row2 + 2, 2].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));

                ws.Cells[row2 + 1, 3][row2 + 1, 4].Merge = true;
                ws.Cells[row2 + 1, 3][row2 + 1, 4].Value = "MTD";
                ws.Cells[row2 + 1, 3][row2 + 1, 4].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[row2 + 1, 3][row2 + 1, 4].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[row2 + 1, 3][row2 + 1, 4].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[row2 + 1, 3][row2 + 1, 4].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[row2 + 1, 3][row2 + 1, 4].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[row2 + 1, 3][row2 + 1, 4].Style.Font.Size = 11;
                ws.Cells[row2 + 1, 3][row2 + 1, 4].Style.Font.Name = "Verdana";
                ws.Cells[row2 + 1, 3][row2 + 1, 4].Style.Font.Bold = true;
                ws.Cells[row2 + 1, 3][row2 + 1, 4].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));
                ws.Cells[row2 + 1, 3][row2 + 1, 4].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells[row2 + 1, 3][row2 + 1, 4].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

                ws.Cells[row2 + 2, 3].Value = "% Days In Field";
                ws.Cells[row2 + 2, 3].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[row2 + 2, 3].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[row2 + 2, 3].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[row2 + 2, 3].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[row2 + 2, 3].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[row2 + 2, 3].Style.Font.Size = 11;
                ws.Cells[row2 + 2, 3].Style.Font.Name = "Verdana";
                ws.Cells[row2 + 2, 3].Style.Font.Bold = true;
                ws.Cells[row2 + 2, 3].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));

                ws.Cells[row2 + 2, 4].Value = "% DIF with Call";
                ws.Cells[row2 + 2, 4].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[row2 + 2, 4].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[row2 + 2, 4].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[row2 + 2, 4].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[row2 + 2, 4].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[row2 + 2, 4].Style.Font.Size = 11;
                ws.Cells[row2 + 2, 4].Style.Font.Name = "Verdana";
                ws.Cells[row2 + 2, 4].Style.Font.Bold = true;
                ws.Cells[row2 + 2, 4].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));

                ws.Cells[row2 + 2, 5].Value = "% Calls Per Day";
                ws.Cells[row2 + 2, 5].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[row2 + 2, 5].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[row2 + 2, 5].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[row2 + 2, 5].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[row2 + 2, 5].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                ws.Cells[row2 + 2, 5].Style.Font.Size = 11;
                ws.Cells[row2 + 2, 5].Style.Font.Name = "Verdana";
                ws.Cells[row2 + 2, 5].Style.Font.Bold = true;
                ws.Cells[row2 + 2, 5].Style.Font.Color.SetColor(Color.FromArgb(99, 67, 41));

                DAL dl3 = new DAL();
                _nvCollection.Clear();

                _nvCollection.Add("@Month-VARCHAR-500", month.ToString());
                _nvCollection.Add("@Year-VARCHAR-500", DateTime.Now.Year.ToString());
                _nvCollection.Add("@endmonth-VARCHAR-500", endmonth.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                DataTable table3;
                if (level3Id == "1" && level4Id == "0" && level5Id == "0" && level6Id == "0")
                {
                    table3 = dl3.GetData("sp_newCommercialReportExcelAdd_qua_division", _nvCollection).Tables[0];
                }
                else if (level4Id != "0" && level5Id == "0" && level6Id == "0")
                {
                    table3 = dl3.GetData("sp_newCommercialReportExcelAdd_qua_region", _nvCollection).Tables[0];
                }
                else if (level5Id != "0" && level6Id == "0")
                {
                    table3 = dl3.GetData("sp_newCommercialReportExcelAdd_qua_zone", _nvCollection).Tables[0];
                }
                else
                {
                    table3 = dl3.GetData("sp_newCommercialReportExcelAdd_qua_territory", _nvCollection).Tables[0];
                }

                int plusrowsb = 3;
                int plusrowsc = 3;
                int plusrowsd = 3;
                int plusrowse = 3;
                int plusrowsf = 3;

                foreach (DataRow dr in table3.Rows)
                {
                    foreach (DataColumn dc in table3.Columns)
                    {
                        if (dr[dc.ColumnName] != DBNull.Value)
                        {
                            if (dc.ColumnName.ToString() == "EmployeeName")
                            {
                                ws.Cells[row2 + plusrowsb, 1].Value = dr[dc.ColumnName].ToString();
                                ws.Cells[row2 + plusrowsb, 1].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                                ws.Cells[row2 + plusrowsb, 1].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[row2 + plusrowsb, 1].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[row2 + plusrowsb, 1].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[row2 + plusrowsb, 1].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[row2 + plusrowsb, 1].Style.Font.Name = "Verdana";
                                ws.Cells[row2 + plusrowsb, 1].Style.Font.Size = 10;
                            }
                            //plusrowsb++;

                            if (dc.ColumnName.ToString() == "Territory")
                            {
                                ws.Cells[row2 + plusrowsc, 2].Value = dr[dc.ColumnName].ToString();
                                ws.Cells[row2 + plusrowsc, 2].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                                ws.Cells[row2 + plusrowsc, 2].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[row2 + plusrowsc, 2].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[row2 + plusrowsc, 2].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[row2 + plusrowsc, 2].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[row2 + plusrowsc, 2].Style.Font.Name = "Verdana";
                                ws.Cells[row2 + plusrowsc, 2].Style.Font.Size = 10;

                            }
                            //plusrowsc++;

                            if (dc.ColumnName.ToString() == "TotalDaysinfield")
                            {
                                ws.Cells[row2 + plusrowsd, 3].Value = dr[dc.ColumnName].ToString();
                                ws.Cells[row2 + plusrowsd, 3].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                                ws.Cells[row2 + plusrowsd, 3].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[row2 + plusrowsd, 3].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[row2 + plusrowsd, 3].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[row2 + plusrowsd, 3].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[row2 + plusrowsd, 3].Style.Font.Name = "Verdana";
                                ws.Cells[row2 + plusrowsd, 3].Style.Font.Size = 10;

                            }
                            //plusrowsd++;

                            if (dc.ColumnName.ToString() == "Final")
                            {
                                ws.Cells[row2 + plusrowse, 4].Value = dr[dc.ColumnName].ToString();
                                ws.Cells[row2 + plusrowse, 4].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                                ws.Cells[row2 + plusrowse, 4].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[row2 + plusrowse, 4].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[row2 + plusrowse, 4].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[row2 + plusrowse, 4].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[row2 + plusrowse, 4].Style.Font.Name = "Verdana";
                                ws.Cells[row2 + plusrowse, 4].Style.Font.Size = 10;

                            }
                            //plusrowse++;

                            if (dc.ColumnName.ToString() == "CallPerDay")
                            {
                                ws.Cells[row2 + plusrowsf, 5].Value = dr[dc.ColumnName].ToString();
                                ws.Cells[row2 + plusrowsf, 5].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                                ws.Cells[row2 + plusrowsf, 5].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[row2 + plusrowsf, 5].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[row2 + plusrowsf, 5].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[row2 + plusrowsf, 5].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                                ws.Cells[row2 + plusrowsf, 5].Style.Font.Name = "Verdana";
                                ws.Cells[row2 + plusrowsf, 5].Style.Font.Size = 10;

                            }
                            //plusrowsf++;
                        }

                    }
                    row2++;
                }



                //for (int i = 0; i < lst.Count; i++)
                //{
                //    string expression = "EmployeeId = " + lst[i] + "";
                //    DataRow[] foundrows;
                //    foundrows = table3.Select(expression);
                //    if (foundrows.Length == 0)
                //    {

                //        ws.Cells[row2 + plusrowsb, 1].Value = lstN[i].ToString();
                //        plusrowsb++;

                //        ws.Cells[row2 + plusrowsc, 2].Value = "Null";
                //        plusrowsc++;

                //        ws.Cells[row2 + plusrowsd, 3].Value = "Null";
                //        plusrowsd++;

                //        ws.Cells[row2 + plusrowse, 4].Value = "Null";
                //        plusrowse++;

                //        ws.Cells[row2 + plusrowsf, 5].Value = "Null";
                //        plusrowsf++;
                //    }
                //    else
                //    {
                //        for (int ii = 0; ii < foundrows.Length; ii++)
                //        {
                //            ws.Cells[row2 + plusrowsb, 1].Value = foundrows[ii]["EmployeeName"].ToString();
                //            ws.Cells[row2 + plusrowsb, 1].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //            ws.Cells[row2 + plusrowsb, 1].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row2 + plusrowsb, 1].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row2 + plusrowsb, 1].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row2 + plusrowsb, 1].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row2 + plusrowsb, 1].Style.Font.Name = "Verdana";
                //            ws.Cells[row2 + plusrowsb, 1].Style.Font.Size = 10;
                //            plusrowsb++;

                //            ws.Cells[row2 + plusrowsc, 2].Value = foundrows[ii]["Territory"].ToString();
                //            ws.Cells[row2 + plusrowsc, 2].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //            ws.Cells[row2 + plusrowsc, 2].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row2 + plusrowsc, 2].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row2 + plusrowsc, 2].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row2 + plusrowsc, 2].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row2 + plusrowsc, 2].Style.Font.Name = "Verdana";
                //            ws.Cells[row2 + plusrowsc, 2].Style.Font.Size = 10;
                //            plusrowsc++;

                //            ws.Cells[row2 + plusrowsd, 3].Value = foundrows[ii]["TotalDaysinfield"].ToString();
                //            ws.Cells[row2 + plusrowsd, 3].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //            ws.Cells[row2 + plusrowsd, 3].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row2 + plusrowsd, 3].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row2 + plusrowsd, 3].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row2 + plusrowsd, 3].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row2 + plusrowsd, 3].Style.Font.Name = "Verdana";
                //            ws.Cells[row2 + plusrowsd, 3].Style.Font.Size = 10;
                //            plusrowsd++;

                //            ws.Cells[row2 + plusrowse, 4].Value = foundrows[ii]["Final"].ToString();
                //            ws.Cells[row2 + plusrowse, 4].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //            ws.Cells[row2 + plusrowse, 4].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row2 + plusrowse, 4].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row2 + plusrowse, 4].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row2 + plusrowse, 4].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row2 + plusrowse, 4].Style.Font.Name = "Verdana";
                //            ws.Cells[row2 + plusrowse, 4].Style.Font.Size = 10;
                //            plusrowse++;

                //            ws.Cells[row2 + plusrowsf, 5].Value = foundrows[ii]["CallPerDay"].ToString();
                //            ws.Cells[row2 + plusrowsf, 5].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //            ws.Cells[row2 + plusrowsf, 5].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row2 + plusrowsf, 5].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row2 + plusrowsf, 5].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row2 + plusrowsf, 5].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row2 + plusrowsf, 5].Style.Font.Name = "Verdana";
                //            ws.Cells[row2 + plusrowsf, 5].Style.Font.Size = 10;
                //            plusrowsf++;

                //        }
                //    }
                //}

                #endregion

                pack.Save();


                #region Download Work
                var filenamef = fileInfo.FullName.ToString();
                Session["CommercialxlFilename"] = "CommercialReport-PBG-" + Convert.ToString(empname) + Convert.ToDateTime(dt1).ToString("MMM") + " to " + Convert.ToDateTime(dt2).ToString("MMM") + ".xlsx";
                #endregion

            }

            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From login details For FLM Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "das";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string SpecialtyWiseProduct(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                #region Get Data

                CrystalReports.XSDDatatable.Dsreports dsc = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dt = dsc.Tables["SpecialtyWiseProduct"];

                int startmonth = Convert.ToDateTime(dt1).Month;
                int endmonth = Convert.ToDateTime(dt2).Month;
                int Year = Convert.ToDateTime(dt1).Year;

                _nvCollection.Clear();
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@Empid-int", empid.ToString());
                _nvCollection.Add("@strtmonth-int", startmonth.ToString());
                _nvCollection.Add("@endmonth-int", endmonth.ToString());
                _nvCollection.Add("@year-int", Year.ToString());

                DataSet ds = GetData("sp_SpecialityWiseProductDetailsReport", _nvCollection);

                #endregion

                #region Process On Work
                dt = ds.Tables[0];
                Session["SpecialtyWiseProduct"] = dt;
                #endregion
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Specialty Wise Product | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "das";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string SalefeedbackMio(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                Session["Salefedbackmio"] = "";
                _nvCollection.Clear();
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-int", level3Id.ToString());
                _nvCollection.Add("@Level4ID-int", level4Id.ToString());
                _nvCollection.Add("@Level5ID-int", level5Id.ToString());
                _nvCollection.Add("@Level6ID-int", level6Id.ToString());
                _nvCollection.Add("@EmpID-int", empid.ToString());
                _nvCollection.Add("@jv-int", jv.ToString());
                _nvCollection.Add("@strtdate-date", Convert.ToDateTime(dt1).ToString());
                _nvCollection.Add("@enddate-date", Convert.ToDateTime(dt2).ToString());

                var dtSalesfeedbackMio = new DataTable();

                CrystalReports.XSDDatatable.Dsreports dsc = new CrystalReports.XSDDatatable.Dsreports();
                dtSalesfeedbackMio = dsc.Tables["Salefedbackmio"];

                DataSet ds = GetData("sp_SAlefeedback_mio", _nvCollection);
                dtSalesfeedbackMio = ds.Tables[0];

                //CrystalReports.JVByRegion.JVByRegion JVRegion = new CrystalReports.JVByRegion.JVByRegion();
                //JVRegion.SetDataSource(dtJVbyRegion);
                Session["Salefedbackmio"] = dtSalesfeedbackMio;
                //JVRegion.Close();
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Sale feedback Mio Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string SalefeedbackFlm(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                Session["Salefedbackflm"] = "";
                _nvCollection.Clear();
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-int", level3Id.ToString());
                _nvCollection.Add("@Level4ID-int", level4Id.ToString());
                _nvCollection.Add("@Level5ID-int", level5Id.ToString());
                _nvCollection.Add("@Level6ID-int", level6Id.ToString());
                _nvCollection.Add("@EmpID-int", empid.ToString());
                _nvCollection.Add("@jv-int", jv.ToString());
                _nvCollection.Add("@strtdate-date", Convert.ToDateTime(dt1).ToString());
                _nvCollection.Add("@enddate-date", Convert.ToDateTime(dt2).ToString());

                var dtSalesfeedbackFlm = new DataTable();

                CrystalReports.XSDDatatable.Dsreports dsc = new CrystalReports.XSDDatatable.Dsreports();
                dtSalesfeedbackFlm = dsc.Tables["Salefedbackflm"];

                DataSet ds = GetData("sp_SAlefeedback_flm", _nvCollection);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    dtSalesfeedbackFlm = ds.Tables[0];
                }
                else
                {
                    ds.Tables[0].Rows.Add();
                    ds.Tables[0].Rows[0]["GM"] = "data not found";
                    ds.Tables[0].Rows[0]["BUH"] = "data not found";
                    ds.Tables[0].Rows[0]["Division"] = "data not found";
                    ds.Tables[0].Rows[0]["Region"] = "data not found";
                    ds.Tables[0].Rows[0]["Zone"] = "data not found";
                    ds.Tables[0].Rows[0]["Territory"] = "data not found";
                    //ds.Tables[0].Rows[0]["Visitdatetime"] = "data not found";
                    ds.Tables[0].Rows[0]["FLMName"] = "data not found";
                    ds.Tables[0].Rows[0]["MIOName"] = "data not found";
                    ds.Tables[0].Rows[0]["NCSMFocusArea"] = "data not found";
                    ds.Tables[0].Rows[0]["PFSPFocusArea"] = "data not found";
                    ds.Tables[0].Rows[0]["ChemistsFocusArea"] = "data not found";
                    ds.Tables[0].Rows[0]["SalesAchieved"] = "data not found";
                    ds.Tables[0].Rows[0]["SalesForeCast"] = "data not found";
                    ds.Tables[0].Rows[0]["joinvisit"] = "data not found";
                    ds.Tables[0].Rows[0]["strtdate"] = Convert.ToDateTime(dt1).ToString("dd-MM-yyyy");
                    ds.Tables[0].Rows[0]["enddate"] = Convert.ToDateTime(dt2).ToString("dd-MM-yyyy");
                    dtSalesfeedbackFlm = ds.Tables[0];
                }
                //CrystalReports.JVByRegion.JVByRegion JVRegion = new CrystalReports.JVByRegion.JVByRegion();
                //JVRegion.SetDataSource(dtJVbyRegion);
                Session["Salefedbackflm"] = dtSalesfeedbackFlm;
                //JVRegion.Close();
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Sale feedback FLM Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }



        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string CoachingCallsWithFLMasJSON(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            String response = string.Empty;
            try
            {
                #region GET DATA



                int month = Convert.ToDateTime(dt1).Month;
                int year = Convert.ToDateTime(dt1).Year;

                _nvCollection.Clear();
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                _nvCollection.Add("@Month-int", month.ToString());
                _nvCollection.Add("@Year-int", year.ToString());

                //DataSet ds = GetData("sp_CoachingCalls_withFLM", _nvCollection);

                DataSet ds = GetData("sp_CoachingCalls_withFLM", _nvCollection);
                response = ds.Tables[0].ToJsonString();


                #endregion


                #region Process On Work

                //Session["CoachingCallsFLM"] = dtCoachingWithFLMReport;

                #endregion
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Coaching Calls with FLM Report Generation As JSON String | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return response;

        }




        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string CallStatusReportwithDate(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            var dtcallssreport = new DataTable();
            CrystalReports.XSDDatatable.Dsreports dsc = new CrystalReports.XSDDatatable.Dsreports();
            dtcallssreport = dsc.Tables["CallStatusReport"];
            try
            {
                //DateTime from = Convert.ToDateTime(dt1);
                //DateTime to = Convert.ToDateTime(dt2);

                Session["CallStatusReport"] = "";
                _nvCollection.Clear();
                _nvCollection.Add("@Level1id-INT", level1Id.ToString());
                _nvCollection.Add("@Level2id-INT", level2Id.ToString());
                _nvCollection.Add("@Level3id-INT", level3Id.ToString());
                _nvCollection.Add("@Level4id-INT", level4Id.ToString());
                _nvCollection.Add("@Level5id-INT", level5Id.ToString());
                _nvCollection.Add("@Level6id-INT", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-INT", empid.ToString());
                _nvCollection.Add("@month-INT", Convert.ToDateTime(dt1).Month.ToString());
                _nvCollection.Add("@Day-INT", Convert.ToDateTime(dt1).Day.ToString());
                _nvCollection.Add("@year-INT", Convert.ToDateTime(dt1).Year.ToString());
                DataSet ds = GetData("sp_CallStatusReport", _nvCollection);
                if (ds != null)
                {
                    #region Process On Work
                    dtcallssreport = ds.Tables[0];
                    Session["CallStatusReport"] = dtcallssreport;
                    #endregion


                }

            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Calls status Report with Date Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string CallStatusReportMTD(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            var dtcallssreport = new DataTable();
            CrystalReports.XSDDatatable.Dsreports dsc = new CrystalReports.XSDDatatable.Dsreports();
            dtcallssreport = dsc.Tables["CallStatusReportMTD"];
            try
            {
                //DateTime from = Convert.ToDateTime(dt1);
                //DateTime to = Convert.ToDateTime(dt2);

                Session["CallStatusReportMTD"] = "";
                _nvCollection.Clear();
                _nvCollection.Add("@Level1id-INT", level1Id.ToString());
                _nvCollection.Add("@Level2id-INT", level2Id.ToString());
                _nvCollection.Add("@Level3id-INT", level3Id.ToString());
                _nvCollection.Add("@Level4id-INT", level4Id.ToString());
                _nvCollection.Add("@Level5id-INT", level5Id.ToString());
                _nvCollection.Add("@Level6id-INT", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-INT", empid.ToString());
                _nvCollection.Add("@month-INT", Convert.ToDateTime(dt1).Month.ToString());
                _nvCollection.Add("@Day-INT", Convert.ToDateTime(dt1).Day.ToString());
                _nvCollection.Add("@year-INT", Convert.ToDateTime(dt1).Year.ToString());
                DataSet ds = GetData("sp_CallStatusReportwithMTD_New", _nvCollection);
                if (ds != null)
                {
                    #region Process On Work
                    dtcallssreport = ds.Tables[0];
                    Session["CallStatusReportMTD"] = dtcallssreport;
                    #endregion


                }

            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Calls status Report MTD Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string FieldWorkReportWithDate(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            var dtfieldworkreport = new DataTable();
            CrystalReports.XSDDatatable.Dsreports dsc = new CrystalReports.XSDDatatable.Dsreports();
            dtfieldworkreport = dsc.Tables["FieldWorkReport"];
            try
            {
                //DateTime from = Convert.ToDateTime(dt1);
                //DateTime to = Convert.ToDateTime(dt2);

                Session["FieldWorkReport"] = "";
                _nvCollection.Clear();
                _nvCollection.Add("@Level1id-INT", level1Id.ToString());
                _nvCollection.Add("@Level2id-INT", level2Id.ToString());
                _nvCollection.Add("@Level3id-INT", level3Id.ToString());
                _nvCollection.Add("@Level4id-INT", level4Id.ToString());
                _nvCollection.Add("@Level5id-INT", level5Id.ToString());
                _nvCollection.Add("@Level6id-INT", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-INT", empid.ToString());
                _nvCollection.Add("@month-INT", Convert.ToDateTime(dt1).Month.ToString());
                _nvCollection.Add("@Day-INT", Convert.ToDateTime(dt1).Day.ToString());
                _nvCollection.Add("@year-INT", Convert.ToDateTime(dt1).Year.ToString());
                DataSet ds = GetData("sp_FieldWorkReport", _nvCollection);
                if (ds != null)
                {
                    #region Process On Work
                    dtfieldworkreport = ds.Tables[0];
                    Session["FieldWorkReport"] = dtfieldworkreport;
                    #endregion


                }

            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Calls status Report with Date Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string FieldWorkReportMTD(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            var dtfieldworkreportmtd = new DataTable();
            CrystalReports.XSDDatatable.Dsreports dsc = new CrystalReports.XSDDatatable.Dsreports();
            dtfieldworkreportmtd = dsc.Tables["FieldWorkReportMTD"];
            try
            {
                //DateTime from = Convert.ToDateTime(dt1);
                //DateTime to = Convert.ToDateTime(dt2);

                Session["FieldWorkReportMTD"] = "";
                _nvCollection.Clear();
                _nvCollection.Add("@Level1id-INT", level1Id.ToString());
                _nvCollection.Add("@Level2id-INT", level2Id.ToString());
                _nvCollection.Add("@Level3id-INT", level3Id.ToString());
                _nvCollection.Add("@Level4id-INT", level4Id.ToString());
                _nvCollection.Add("@Level5id-INT", level5Id.ToString());
                _nvCollection.Add("@Level6id-INT", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-INT", empid.ToString());
                _nvCollection.Add("@month-INT", Convert.ToDateTime(dt1).Month.ToString());
                _nvCollection.Add("@Day-INT", Convert.ToDateTime(dt1).Day.ToString());
                _nvCollection.Add("@year-INT", Convert.ToDateTime(dt1).Year.ToString());
                DataSet ds = GetData("sp_FieldWorkReportwithMTD", _nvCollection);
                if (ds != null)
                {
                    #region Process On Work
                    dtfieldworkreportmtd = ds.Tables[0];
                    Session["FieldWorkReportMTD"] = dtfieldworkreportmtd;
                    #endregion


                }

            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Calls status Report with Date Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }



        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string EmployeeSummaryReport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus)
        {
            var dtemployeeSummaryReport = new DataTable();
            CrystalReports.XSDDatatable.Dsreports dsc = new CrystalReports.XSDDatatable.Dsreports();
            dtemployeeSummaryReport = dsc.Tables["EmployeeSummaryReport"];
            try
            {
                //DateTime from = Convert.ToDateTime(dt1);
                //DateTime to = Convert.ToDateTime(dt2);

                Session["EmployeeSummaryReport"] = "";
                _nvCollection.Clear();
                string status = GetRptStatus(dt1);
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1Id-INT", level1Id.ToString());
                _nvCollection.Add("@Level2Id-INT", level2Id.ToString());
                _nvCollection.Add("@Level3Id-INT", level3Id.ToString());
                _nvCollection.Add("@Level4Id-INT", level4Id.ToString());
                _nvCollection.Add("@Level5Id-INT", level5Id.ToString());
                _nvCollection.Add("@Level6Id-INT", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-INT", empid.ToString());
                _nvCollection.Add("@StartingDate-datetime", dt1.ToString());
                _nvCollection.Add("@EndingDate-datetime", dt2.ToString());
                _nvCollection.Add("@TeamId-INT", skuid.ToString());
                _nvCollection.Add("@EmpStatus-int", empstatus.ToString());
                DataSet ds = GetData((status == "Live" ? "sp_EmployeeSummaryReport_NewParameter" : "sp_EmployeeSummaryReport_NewParameter_archive"), _nvCollection);
                if (ds != null)
                {
                    #region Process On Work
                    dtemployeeSummaryReport = ds.Tables[0];
                    Session["EmployeeSummaryReport"] = dtemployeeSummaryReport;
                    #endregion

                }

            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Calls status Report with Date Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }

        [WebMethod(EnableSession = true)]
        public string MioFeedbackReport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {

            #region Get Data

            try
            {
                CrystalReports.XSDDatatable.Dsreports mfb = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dt = mfb.Tables["MioFeedbackReport"];

                // int month = Convert.ToDateTime(dt1).Month;
                //  int Year = Convert.ToDateTime(dt1).Year;

                _nvCollection.Clear();
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                _nvCollection.Add("@DateStart-date", dt1.ToString());
                _nvCollection.Add("@DateEnd-date", dt2.ToString());

                DataSet ds = GetData("sp_MioFeedBackWithHierarchy", _nvCollection);
            #endregion

                #region Process On Work
                dt = ds.Tables[0];
                Session["MioFeedbackReport"] = dt;
                #endregion

            }
            catch (Exception ex)
            {

                Constants.ErrorLog("Exception Raising From MIOs Feedback Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");

            }

            return "mio";

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string EDetailingReport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            var EDetailingReport = new DataTable();
            CrystalReports.XSDDatatable.Dsreports dsc = new CrystalReports.XSDDatatable.Dsreports();
            EDetailingReport = dsc.Tables["EDetailingReport"];
            try
            {
                //DateTime from = Convert.ToDateTime(dt1);
                //DateTime to = Convert.ToDateTime(dt2);

                Session["EDetailingReport"] = "";
                _nvCollection.Clear();
                _nvCollection.Add("@Level1id-int", level1Id.ToString());
                _nvCollection.Add("@Level2id-int", level2Id.ToString());
                _nvCollection.Add("@Level3id-int", level3Id.ToString());
                _nvCollection.Add("@Level4id-int", level4Id.ToString());
                _nvCollection.Add("@Level5id-int", level5Id.ToString());
                _nvCollection.Add("@Level6id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                _nvCollection.Add("@DoctorId-int", drid.ToString());
                _nvCollection.Add("@DoctorClass-int", clid.ToString());
                _nvCollection.Add("@VisitShift-int", vsid.ToString());
                _nvCollection.Add("@JointVisit-int", jv.ToString());
                _nvCollection.Add("@StartingDate-datetime", dt1.ToString());
                _nvCollection.Add("@EndingDate-datetime", dt2.ToString());
                DataSet ds = GetData("Sp_EDetailingTimeExecutionRpt", _nvCollection);
                if (ds != null)
                {
                    #region Process On Work
                    EDetailingReport = ds.Tables[0];
                    Session["EDetailingReport"] = EDetailingReport;
                    #endregion

                }

            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Calls status Report with Date Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }





        //MIO Doctor Area Report
        [WebMethod(EnableSession = true)]
        public string MioDoctorArea(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            DataRow dr = null;

            #region Get Data

            try
            {
                CrystalReports.XSDDatatable.Dsreports mfb = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dt = mfb.Tables["TMDoctorLocation"];

                // int month = Convert.ToDateTime(dt1).Month;
                //  int Year = Convert.ToDateTime(dt1).Year;

                _nvCollection.Clear();
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                _nvCollection.Add("@DateStart-date", dt1.ToString());
                _nvCollection.Add("@DateEnd-dateT", dt2.ToString());

                DataSet ds = GetData("sp_GetDoctorArea", _nvCollection);
            #endregion

                #region Process On Work
                dt = ds.Tables[0];
                string address = "";
                if (dt != null)
                {
                    dt.Columns.Add("Address"); // Add column for Address here

                    for (int i = 0; i < dt.Rows.Count; i++)
                    {

                        string url = "http://maps.googleapis.com/maps/api/geocode/xml?latlng=" + dt.Rows[i]["Latitude"] + "," + dt.Rows[i]["Longitude"] + "&sensor=false";
                        WebRequest request = WebRequest.Create(url);
                        using (WebResponse response = (HttpWebResponse)request.GetResponse())
                        {
                            using (StreamReader reader = new StreamReader(response.GetResponseStream(), Encoding.UTF8))
                            {
                                empid = dt.Rows[i]["EmployeeId"].ToString();
                                DataSet dsResult = new DataSet();
                                dsResult.ReadXml(reader);//format in xml
                                DataTable dtCoordinates = new DataTable();
                                dtCoordinates.Columns.AddRange(new DataColumn[1] { new DataColumn("AreaAddress", typeof(string)) });

                                if (dsResult.Tables.Count > 1)
                                {
                                    var data = dsResult.Tables[1];
                                    var add1 = data.Rows[0]["formatted_address"].ToString();
                                    var add2 = data.Rows[2]["formatted_address"].ToString();
                                    string split = add1.Split(',')[0];
                                    address = split + " " + add2;
                                    dt.Rows[i]["Address"] = address;
                                }
                                else
                                {
                                    dt.Rows[i]["Address"] = "--";
                                }



                            }
                        }


                    }

                }

                Session["TMDoctorLocation"] = dt;
                #endregion

            }
            catch (Exception ex)
            {

                Constants.ErrorLog("Exception Raising From SPO Doctor Area Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");

            }

            return "das";

        }



        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DoctorTaggingreport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus)
        {
            try
            {
                #region Get Data

                CrystalReports.XSDDatatable.Dsreports dsc = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dt = dsc.Tables["DoctorTagging"];
                string status = GetRptStatus(dt1);
                _nvCollection.Clear();
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                _nvCollection.Add("@DateStart-date", Convert.ToDateTime(dt1).ToString());
                _nvCollection.Add("@DateEnd-date", Convert.ToDateTime(dt2).ToString());
                _nvCollection.Add("@TeamID-int", skuid.ToString());
                _nvCollection.Add("@EmpStatus-int", empstatus.ToString());

                DataSet ds = GetData((status == "Live" ? "sp_DoctorTaging_Report_NewParameter" : "sp_DoctorTaging_Report_NewParameter_archive"), _nvCollection);

                #endregion

                #region Process On Work
                dt = ds.Tables[0];
                Session["DoctorTagging"] = dt;
                #endregion
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Doctor Tagging Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "das";
        }


        // SO CallReason Report
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string SOCallReason(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {

                CrystalReports.XSDDatatable.Dsreports mfb = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dt = mfb.Tables["SOCallReason"];

                //int month = Convert.ToDateTime(dt1).Month;
                //int Year = Convert.ToDateTime(dt2).Year;

                #region Initialization  columns


                _nvCollection.Clear();
                _nvCollection.Add("@EmpId-int", empid.ToString());
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-int", level3Id.ToString());
                _nvCollection.Add("@Level4ID-int", level4Id.ToString());
                _nvCollection.Add("@Level5ID-int", level5Id.ToString());
                _nvCollection.Add("@Level6ID-int", level6Id.ToString());
                _nvCollection.Add("@DateStart-date", dt1.ToString());
                _nvCollection.Add("@DateEnd-date", dt2.ToString());
                DataSet SOcallreason = GetData("sp_SO_CallReason", _nvCollection);
                if (SOcallreason != null)
                {
                    #region Process On Work
                    dt = SOcallreason.Tables[0];
                    Session["SOcallreason"] = dt;
                    #endregion


                }
                #endregion



            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From SO Call Reason Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "SOcallreason";
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DayViewSPO(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus)
        {
            var DayViewSPO = new DataTable();
            CrystalReports.XSDDatatable.Dsreports dsc = new CrystalReports.XSDDatatable.Dsreports();
            DayViewSPO = dsc.Tables["DayViewSPO"];
            try
            {
                //DateTime from = Convert.ToDateTime(dt1);
                //DateTime to = Convert.ToDateTime(dt2);
                string status = GetRptStatus(dt1);
                Session["DayViewSPO"] = "";
                _nvCollection.Clear();
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-int", level3Id.ToString());
                _nvCollection.Add("@Level4ID-int", level4Id.ToString());
                _nvCollection.Add("@Level5ID-int", level5Id.ToString());
                _nvCollection.Add("@Level6ID-int", level6Id.ToString());
                _nvCollection.Add("@EmpId-int", empid.ToString());
                _nvCollection.Add("@DateStart-datetime", dt1.ToString());
                _nvCollection.Add("@DateEnd-datetime", dt2.ToString());
                _nvCollection.Add("@TeamID-int", skuid.ToString());
                _nvCollection.Add("@EmpStatus-int", empstatus.ToString());
                DataSet ds = GetData((status == "Live" ? "DayView_SPO_NewParameter" : "DayView_SPO_NewParameter_archive"), _nvCollection);
                if (ds != null)
                {
                    #region Process On Work
                    DayViewSPO = ds.Tables[0];
                    Session["DayViewSPO"] = DayViewSPO;
                    #endregion

                }

            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Calls status Report with Date Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }
        // Plan Status Report 
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string PlanStatus(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus)
        {
            var PlanStatus = new DataTable();
            CrystalReports.XSDDatatable.Dsreports dsc = new CrystalReports.XSDDatatable.Dsreports();
            PlanStatus = dsc.Tables["PlanStatus"];
            try
            {
                //DateTime from = Convert.ToDateTime(dt1);
                //DateTime to = Convert.ToDateTime(dt2);
                string status = GetRptStatus(dt1);
                Session["PlanStatus"] = "";
                _nvCollection.Clear();
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-int", level3Id.ToString());
                _nvCollection.Add("@Level4ID-int", level4Id.ToString());
                _nvCollection.Add("@Level5ID-int", level5Id.ToString());
                _nvCollection.Add("@Level6ID-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeID-int", empid.ToString());
                _nvCollection.Add("@DateStart-datetime", dt1.ToString());
                _nvCollection.Add("@DateEnd-datetime", dt2.ToString());
                _nvCollection.Add("@TeamID-int", skuid.ToString());
                _nvCollection.Add("@EmpStatus-int", empstatus.ToString());
                DataSet ds = GetData((status == "Live" ? "Sp_PlanStatusReport_NewParameter" : "Sp_PlanStatusReport_NewParameter_archive"), _nvCollection);
                if (ds != null)
                {
                    #region Process On Work
                    PlanStatus = ds.Tables[0];
                    Session["PlanStatus"] = PlanStatus;
                    #endregion

                }

            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Calls status Report with Date Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }


        // Quiz test report
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string QuizTestReport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {

            var employeeid = Session["CurrentUserId"].ToString();
            var userrole = Session["CurrentUserRole"].ToString().ToLower();

            if (jv == "Not Submitted")
            {
                try
                {
                    #region GET DATA

                    CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                    DataTable dtQuizTestNotSubmittedReport = dsDcr.Tables["QuizTestNotSubmittedReport"];

                    _nvCollection.Clear();
                    _nvCollection.Add("@level1Id-int", level1Id);
                    _nvCollection.Add("@level2Id-int", level2Id);
                    _nvCollection.Add("@level3Id-int", level3Id);
                    _nvCollection.Add("@level4Id-int", level4Id);
                    _nvCollection.Add("@level5Id-int", level5Id);
                    _nvCollection.Add("@level6Id-int", level6Id);
                    _nvCollection.Add("@freezeStatus-nvarchar(50)", vsid);
                    _nvCollection.Add("@quizStatus-nvarchar(50)", jv);
                    _nvCollection.Add("@startDate-datetime", dt1);
                    _nvCollection.Add("@endDate-datetime", dt2);
                    _nvCollection.Add("@employeeid-int", employeeid);
                    _nvCollection.Add("@userrole-nvarchar(50)", userrole);

                    DataSet ds = GetData("sp_QuizTestNotSubmittedResultReport", _nvCollection);

                    #endregion


                    #region Process On Work

                    dtQuizTestNotSubmittedReport = ds.Tables[0];

                    Session["QuizTestNotSubmittedReport"] = dtQuizTestNotSubmittedReport;

                    Session["RptName"] = "NotSubmittedReport";

                    #endregion
                }

                catch (Exception ex)
                {
                    Constants.ErrorLog("Exception Raising From Quiz Test Not Submitted Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
                }
            }
            else
            {
                try
                {
                    #region GET DATA

                    CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                    DataTable dtQuizTestReport = dsDcr.Tables["QuizTestReport"];

                    _nvCollection.Clear();
                    _nvCollection.Add("@level1Id-int", level1Id);
                    _nvCollection.Add("@level2Id-int", level2Id);
                    _nvCollection.Add("@level3Id-int", level3Id);
                    _nvCollection.Add("@level4Id-int", level4Id);
                    _nvCollection.Add("@level5Id-int", level5Id);
                    _nvCollection.Add("@level6Id-int", level6Id);
                    _nvCollection.Add("@freezeStatus-nvarchar(50)", vsid);
                    _nvCollection.Add("@quizStatus-nvarchar(50)", jv);
                    _nvCollection.Add("@startDate-datetime", dt1);
                    _nvCollection.Add("@endDate-datetime", dt2);
                    _nvCollection.Add("@employeeid-int", employeeid);
                    _nvCollection.Add("@userrole-nvarchar(50)", userrole);

                    DataSet ds = GetData("sp_QuizTestResultReport", _nvCollection);

                    #endregion


                    #region Process On Work

                    dtQuizTestReport = ds.Tables[0];

                    Session["QuizTestReport"] = dtQuizTestReport;

                    Session["RptName"] = "SubmittedReport";

                    #endregion
                }

                catch (Exception ex)
                {
                    Constants.ErrorLog("Exception Raising From Quiz Test Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
                }
            }

            return "das";
        }

        // Quiz test total attempts report
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string QuizTestTotalAttemptsReport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                #region GET DATA

                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtQuizTestAttemptsReport = dsDcr.Tables["QuizTestAttemptsReport"];

                var employeeid = Session["CurrentUserId"].ToString();
                var userrole = Session["CurrentUserRole"].ToString().ToLower();

                Session["QuizTestAttemptsReport"] = "";

                _nvCollection.Clear();
                _nvCollection.Add("@level1Id-int", level1Id);
                _nvCollection.Add("@level2Id-int", level2Id);
                _nvCollection.Add("@level3Id-int", level3Id);
                _nvCollection.Add("@level4Id-int", level4Id);
                _nvCollection.Add("@level5Id-int", level5Id);
                _nvCollection.Add("@level6Id-int", level6Id);
                _nvCollection.Add("@level-varchar(50)", "");
                _nvCollection.Add("@freezeStatus-nvarchar(50)", vsid);
                _nvCollection.Add("@startDate-datetime", dt1);
                _nvCollection.Add("@endDate-datetime", dt2);
                _nvCollection.Add("@employeeid-int", employeeid);
                _nvCollection.Add("@userrole-nvarchar(50)", userrole);

                DataSet ds = GetData("sp_QuizTestAttemptsReport", _nvCollection);

                #endregion


                #region Process On Work

                dtQuizTestAttemptsReport = ds.Tables[0];

                Session["QuizTestAttemptsReport"] = dtQuizTestAttemptsReport;


                #endregion
            }

            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Quiz Test Attempts Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }


            return "das";
        }


        // Quiz test ratio report
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string QuizTestRatioReport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                #region GET DATA

                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtQuizTestRatioReport = dsDcr.Tables["QuizTestRatioReport"];

                var employeeid = Session["CurrentUserId"].ToString();
                var userrole = Session["CurrentUserRole"].ToString().ToLower();

                Session["QuizTestRatioReport"] = "";

                _nvCollection.Clear();
                _nvCollection.Add("@level1Id-int", level1Id);
                _nvCollection.Add("@level2Id-int", level2Id);
                _nvCollection.Add("@level3Id-int", level3Id);
                _nvCollection.Add("@level4Id-int", level4Id);
                _nvCollection.Add("@level5Id-int", level5Id);
                _nvCollection.Add("@level6Id-int", level6Id);
                _nvCollection.Add("@level-varchar(50)", "");
                _nvCollection.Add("@freezeStatus-nvarchar(50)", vsid);
                _nvCollection.Add("@startDate-datetime", dt1);
                _nvCollection.Add("@endDate-datetime", dt2);
                _nvCollection.Add("@employeeid-int", employeeid);
                _nvCollection.Add("@userrole-nvarchar(50)", userrole);

                DataSet ds = GetData("sp_QuizTestRatioReport", _nvCollection);

                #endregion


                #region Process On Work

                dtQuizTestRatioReport = ds.Tables[0];

                Session["QuizTestRatioReport"] = dtQuizTestRatioReport;


                #endregion
            }

            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Quiz Test Attempts Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }


            return "das";
        }


        // Zero Call Report
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ZeroCallReport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus)
        {
            try
            {
                #region GET DATA

                //CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                //DataTable dtQuizTestRatioReport = dsDcr.Tables["ZeroCallReport"];

                var employeeid = Session["CurrentUserId"].ToString();

                Session["ZeroCallReport"] = "";
                string status = GetRptStatus(dt1);
                _nvCollection.Clear();
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@level1Id-int", level1Id);
                _nvCollection.Add("@level2Id-int", level2Id);
                _nvCollection.Add("@level3Id-int", level3Id);
                _nvCollection.Add("@level4Id-int", level4Id);
                _nvCollection.Add("@level5Id-int", level5Id);
                _nvCollection.Add("@level6Id-int", level6Id);
                _nvCollection.Add("@fromDate-datetime", dt1);
                _nvCollection.Add("@toDate-datetime", dt2);
                _nvCollection.Add("@TeamID-int", skuid.ToString());
                _nvCollection.Add("@EmpStatus-int", empstatus.ToString());

                DataSet ds = GetData((status == "Live" ? "sp_ZeroCallReport_NewParameter" : "sp_ZeroCallReport_NewParameter_archive"), _nvCollection);

                #endregion


                #region Process On Work

                //dtQuizTestRatioReport = ds.Tables[0];

                //Session["ZeroCallReport"] = dtQuizTestRatioReport;

                Session["ZeroCallReport"] = ds.Tables[0];

                #endregion
            }

            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Quiz Test Attempts Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }


            return "das";
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string QuizReport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id, string empid, string dt1, string dt2)
        {
            if (level2Id == null || level2Id == "-1")
            {
                level2Id = "0";
            }
            try
            {
                //DataTable dtDailyCallReport = new DataTable();
                Session["QuizReport"] = null;
                //CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                //DataTable dtsamples = dsDcr.Tables["td_samples_and_gifts"];

                DataTable dt = new DataTable();
                dt.Clear();

                string type = "S";
                _nvCollection.Clear();
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                _nvCollection.Add("@DateStart-date", Convert.ToDateTime(dt1).ToString());
                _nvCollection.Add("@DateEnd-date", Convert.ToDateTime(dt2).ToString());
                _nvCollection.Add("@formType-int", level2Id.ToString());
                DataSet ds = GetData("spNewQuizReport", _nvCollection);
                //dtDailyCallReport = ds.Tables[0];
                //string dataId = "";

                if (ds != null)
                {
                    DataTable table = new DataTable();
                    table.Columns.Add("CreateDate", typeof(DateTime));
                    table.Columns.Add("FormType", typeof(string));
                    table.Columns.Add("FormName", typeof(string));
                    table.Columns.Add("EmployeeName", typeof(string));
                    table.Columns.Add("Division", typeof(string));
                    table.Columns.Add("Region", typeof(string));
                    table.Columns.Add("Zone", typeof(string));
                    table.Columns.Add("Territory", typeof(string));
                    table.Columns.Add("Question1", typeof(string));
                    table.Columns.Add("Answer1", typeof(string));


                    int columncount = 1;
                    int PrevID = 0;
                    int j = 1;
                    int employeeIdPrevId = 0;
                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        int ID = Convert.ToInt16(ds.Tables[0].Rows[i]["ID"]);
                        int employeeId = Convert.ToInt16(ds.Tables[0].Rows[i]["EmployeeId"]);
                        var CreateDate = ds.Tables[0].Rows[i]["CreateDate"];
                        var FormType = ds.Tables[0].Rows[i]["FormType"];
                        var FormName = ds.Tables[0].Rows[i]["FormName"];
                        var EmployeeName = ds.Tables[0].Rows[i]["EmployeeName"];
                        var Division = ds.Tables[0].Rows[i]["Division"];
                        var Region = ds.Tables[0].Rows[i]["Region"];
                        var Zone = ds.Tables[0].Rows[i]["Zone"];
                        var Territory = ds.Tables[0].Rows[i]["Territory"];
                        var Question = ds.Tables[0].Rows[i]["Question"];
                        var Answer = ds.Tables[0].Rows[i]["Answer"];

                        if (ID == PrevID && employeeId == employeeIdPrevId)
                        {

                            columncount = columncount + 1;
                            if (!(table.Columns.Contains("Question" + columncount)))
                            {
                                table.Columns.Add("Question" + columncount, typeof(string));
                                table.Columns.Add("Answer" + columncount, typeof(string));

                                Question = ds.Tables[0].Rows[i]["Question"];
                                Answer = ds.Tables[0].Rows[i]["Answer"];

                                //DataRow row2 = table.NewRow();
                                //table.Rows.Add(row2);


                                int lstRowCount = table.Rows.Count - 1;
                                table.Rows[lstRowCount]["Question" + columncount] = Question;
                                table.Rows[lstRowCount]["Answer" + columncount] = Answer;
                                //j += 1;
                            }
                            else
                            {
                                Question = ds.Tables[0].Rows[i]["Question"];
                                Answer = ds.Tables[0].Rows[i]["Answer"];
                                //DataRow row2 = table.NewRow();
                                //table.Rows.Add(row2);
                                int lstRowCount = table.Rows.Count - 1;
                                table.Rows[lstRowCount]["Question" + columncount] = Question;
                                table.Rows[lstRowCount]["Answer" + columncount] = Answer;
                                //j += 1;


                                //table.Rows.Add(Question, Answer);
                            }

                        }
                        else
                        {

                            if (table.Columns.Contains("Question" + columncount))
                            {
                                j = 1;
                                columncount = 1;
                                table.Rows.Add(CreateDate, FormType, FormName, EmployeeName, Division, Region, Zone, Territory, Question, Answer);
                            }



                        }

                        PrevID = Convert.ToInt16(ds.Tables[0].Rows[i]["ID"]);
                        employeeIdPrevId = Convert.ToInt16(ds.Tables[0].Rows[i]["EmployeeId"]);

                    }



                    #region CreatingWorksheet
                    string strday = Convert.ToDateTime(dt1).ToShortDateString();
                    string endday = Convert.ToDateTime(dt2).ToShortDateString();
                    string path = Server.MapPath("~/Excels");

                    var fileInfo = new FileInfo(path + @"\Quiz-Report-" + Convert.ToDateTime(dt1).ToString("MMM") + "To" + Convert.ToDateTime(dt2).ToString("MMM") + ".xlsx");

                    var pack = new ExcelPackage(fileInfo);
                    ExcelWorksheet ws;
                    if (pack.Workbook.Worksheets.Count > 0)
                    {
                        ws = pack.Workbook.Worksheets["Quiz"];
                        pack.Workbook.Worksheets.Delete(ws.Index);
                        ws = pack.Workbook.Worksheets.Add("Quiz");
                    }
                    else
                    {
                        ws = pack.Workbook.Worksheets.Add("Quiz");
                    }

                    #endregion




                    ws.Row(1).Height = 55.75;
                    ws.Column(1).Hidden = true;
                    ws.Column(2).Hidden = true;
                    ws.Cells["A1:AL1"].Merge = true;
                    ws.Cells["A1:AL1"].Value = "Quiz Report";
                    ws.Cells["A1:AL1"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    ws.Cells["A1:AL1"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    ws.Cells["A1:AL1"].Style.Font.Name = "Arial";
                    ws.Cells["A1:AL1"].Style.Font.Size = 21;
                    ws.Cells["A1:AL1"].Style.Font.Bold = true;
                    ws.Cells["A1:AL1"].Style.Font.Color.SetColor(Color.FromArgb(255, 255, 255));
                    ws.Cells["A1:AL1"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                    ws.Cells["A1:AL1"].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(52, 152, 219));
                    ws.Cells["A1:AL1"].Style.WrapText = true;



                    ws.Cells[2, 1].Value = "Date";
                    ws.Cells[2, 1].Style.Font.Name = "Verdana";
                    ws.Cells[2, 1].Style.Font.Size = 10;
                    ws.Cells[2, 1].Style.Font.Bold = true;

                    ws.Cells[2, 2].Value = DateTime.Now.ToString("dd/MM/yyyy");
                    ws.Cells[2, 2].Style.Font.Name = "Verdana";
                    ws.Cells[2, 2].Style.Font.Size = 10;
                    ws.Cells[2, 2].Style.Font.Bold = true;





                    int rowHeader = 1;
                    int columnHeader = 1;
                    var colCount = table.Columns.Count;

                    ws.Column(1).Width = 20.00;
                    ws.Cells[3, 1].Value = "CreateDate";
                    ws.Cells[3, 1].Style.Font.Name = "Verdana";
                    ws.Cells[3, 1].Style.Font.Size = 10;
                    ws.Cells[3, 1].Style.Font.Bold = true;
                    ws.Cells[3, 1].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                    ws.Cells[3, 1].Style.Fill.PatternType = ExcelFillStyle.Solid;
                    ws.Cells[3, 1].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                    ws.Column(2).Width = 20.00;
                    ws.Cells[3, 2].Value = "FormType";
                    ws.Cells[3, 2].Style.Font.Name = "Verdana";
                    ws.Cells[3, 2].Style.Font.Size = 10;
                    ws.Cells[3, 2].Style.Font.Bold = true;
                    ws.Cells[3, 2].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                    ws.Cells[3, 2].Style.Fill.PatternType = ExcelFillStyle.Solid;
                    ws.Cells[3, 2].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                    ws.Column(3).Width = 20.00;
                    ws.Cells[3, 3].Value = "FormName";
                    ws.Cells[3, 3].Style.Font.Name = "Verdana";
                    ws.Cells[3, 3].Style.Font.Size = 10;
                    ws.Cells[3, 3].Style.Font.Bold = true;
                    ws.Cells[3, 3].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                    ws.Cells[3, 3].Style.Fill.PatternType = ExcelFillStyle.Solid;
                    ws.Cells[3, 3].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                    ws.Column(4).Width = 20.00;
                    ws.Cells[3, 4].Value = "EmployeeName";
                    ws.Cells[3, 4].Style.Font.Name = "Verdana";
                    ws.Cells[3, 4].Style.Font.Size = 10;
                    ws.Cells[3, 4].Style.Font.Bold = true;
                    ws.Cells[3, 4].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                    ws.Cells[3, 4].Style.Fill.PatternType = ExcelFillStyle.Solid;
                    ws.Cells[3, 4].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                    ws.Column(5).Width = 20.00;
                    ws.Cells[3, 5].Value = "Division";
                    ws.Cells[3, 5].Style.Font.Name = "Verdana";
                    ws.Cells[3, 5].Style.Font.Size = 10;
                    ws.Cells[3, 5].Style.Font.Bold = true;
                    ws.Cells[3, 5].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                    ws.Cells[3, 5].Style.Fill.PatternType = ExcelFillStyle.Solid;
                    ws.Cells[3, 5].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                    ws.Column(6).Width = 20.00;
                    ws.Cells[3, 6].Value = "Region";
                    ws.Cells[3, 6].Style.Font.Name = "Verdana";
                    ws.Cells[3, 6].Style.Font.Size = 10;
                    ws.Cells[3, 6].Style.Font.Bold = true;
                    ws.Cells[3, 6].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                    ws.Cells[3, 6].Style.Fill.PatternType = ExcelFillStyle.Solid;
                    ws.Cells[3, 6].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                    ws.Column(7).Width = 20.00;
                    ws.Cells[3, 7].Value = "Zone";
                    ws.Cells[3, 7].Style.Font.Name = "Verdana";
                    ws.Cells[3, 7].Style.Font.Size = 10;
                    ws.Cells[3, 7].Style.Font.Bold = true;
                    ws.Cells[3, 7].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                    ws.Cells[3, 7].Style.Fill.PatternType = ExcelFillStyle.Solid;
                    ws.Cells[3, 7].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                    ws.Column(8).Width = 20.00;
                    ws.Cells[3, 8].Value = "Territory";
                    ws.Cells[3, 8].Style.Font.Name = "Verdana";
                    ws.Cells[3, 8].Style.Font.Size = 10;
                    ws.Cells[3, 8].Style.Font.Bold = true;
                    ws.Cells[3, 8].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                    ws.Cells[3, 8].Style.Fill.PatternType = ExcelFillStyle.Solid;
                    ws.Cells[3, 8].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                    ws.Column(9).Width = 20.00;
                    ws.Cells[3, 9].Value = "Question1";
                    ws.Cells[3, 9].Style.Font.Name = "Verdana";
                    ws.Cells[3, 9].Style.Font.Size = 11;
                    ws.Cells[3, 9].Style.Font.Bold = true;
                    ws.Cells[3, 9].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                    ws.Cells[3, 9].Style.Fill.PatternType = ExcelFillStyle.Solid;
                    ws.Cells[3, 9].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                    ws.Column(10).Width = 20.00;
                    ws.Cells[3, 10].Value = "Answer1";
                    ws.Cells[3, 10].Style.Font.Name = "Verdana";
                    ws.Cells[3, 10].Style.Font.Size = 10;
                    ws.Cells[3, 10].Style.Font.Bold = true;
                    ws.Cells[3, 10].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                    ws.Cells[3, 10].Style.Fill.PatternType = ExcelFillStyle.Solid;
                    ws.Cells[3, 10].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                    int QsNo = 2;
                    for (int ic = 11; ic < colCount; ic++)
                    {
                        ws.Column(ic).Width = 20.00;
                        ws.Cells[3, ic].Value = "Question" + QsNo;
                        ws.Cells[3, ic].Style.Font.Name = "Verdana";
                        ws.Cells[3, ic].Style.Font.Size = 10;
                        ws.Cells[3, ic].Style.Font.Bold = true;
                        ws.Cells[3, ic].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                        ws.Cells[3, ic].Style.Fill.PatternType = ExcelFillStyle.Solid;
                        ws.Cells[3, ic].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));
                        ic++;
                        ws.Column(ic).Width = 20.00;
                        ws.Cells[3, ic].Value = "Answer" + QsNo;
                        ws.Cells[3, ic].Style.Font.Name = "Verdana";
                        ws.Cells[3, ic].Style.Font.Size = 10;
                        ws.Cells[3, ic].Style.Font.Bold = true;
                        ws.Cells[3, ic].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                        ws.Cells[3, ic].Style.Fill.PatternType = ExcelFillStyle.Solid;
                        ws.Cells[3, ic].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));
                        QsNo++;
                    }



                    int row2 = 4;
                    int col2 = 1;

                    foreach (DataRow dr in table.Rows)
                    {
                        foreach (DataColumn dc in table.Columns)
                        {
                            //if (dr[dc.ColumnName] != DBNull.Value)
                            //{

                            ws.Cells[row2, col2].Value = string.IsNullOrWhiteSpace(dr[dc.ColumnName].ToString()) ? "--" : dr[dc.ColumnName].ToString();

                            col2++;
                            //}

                        }
                        col2 = 1;
                        row2++;
                    }



                    pack.Save();

                    #region Download Work

                    var filenamef = fileInfo.FullName.ToString();
                    Session["SurveyExcelReport2"] = "Quiz-Report-" + Convert.ToDateTime(dt1).ToString("MMM") + "To" + Convert.ToDateTime(dt2).ToString("MMM") + ".xlsx";

                    #endregion


                }




            }
            catch (Exception ex)
            {
                Session["QuizReport"] = null;
                Constants.ErrorLog("QuizReport : " + ex.Message.ToString() + "Stack: " + ex.StackTrace.ToString());
            }

            return "das";

        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string SurveyReportExcel(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id, string empid, string dt1, string dt2)
        {

            try
            {
                #region CreatingWorksheet
                string strday = Convert.ToDateTime(dt1).ToShortDateString();
                string endday = Convert.ToDateTime(dt2).ToShortDateString();
                string path = Server.MapPath("~/Excels");

                var fileInfo = new FileInfo(path + @"\Survey-Report-" + Convert.ToDateTime(dt1).ToString("MMM") + "To" + Convert.ToDateTime(dt2).ToString("MMM") + ".xlsx");

                var pack = new ExcelPackage(fileInfo);
                ExcelWorksheet ws;
                if (pack.Workbook.Worksheets.Count > 0)
                {
                    ws = pack.Workbook.Worksheets["SurveyReport"];
                    pack.Workbook.Worksheets.Delete(ws.Index);
                    ws = pack.Workbook.Worksheets.Add("SurveyReport");
                }
                else
                {
                    ws = pack.Workbook.Worksheets.Add("SurveyReport");
                }

                #endregion

                #region Formating

                ws.View.ShowGridLines = true;
                //ws.Column(1).Width = 10.53;
                ws.Column(2).Width = 30.53;
                ws.Column(3).Width = 80.53;


                ws.Cells["B1:C1"].Merge = true;
                ws.Cells["B1:C1"].Style.WrapText = true;
                ws.Cells["B1:C1"].Value = "Survey Report";
                ws.Cells["B1:C1"].Style.Font.Bold = true;
                ws.Cells["B1:C1"].Style.Font.Size = 20;
                ws.Cells["B1:C1"].Style.Font.Name = "Arial";
                ws.Cells["B1:C1"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells["B1:C1"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                //ws.Cells["B1:C1"].Style.Font.Color.SetColor(Color.FromArgb(198, 89, 17));

                #endregion

                #region Data Assigning
                DAL dl = new DAL();
                _nvCollection.Clear();
                _nvCollection.Add("@Level1-int", level1Id.ToString());
                _nvCollection.Add("@Level2-int", level2Id.ToString());
                _nvCollection.Add("@level3-int", level3Id.ToString());
                _nvCollection.Add("@level4-int", level4Id.ToString());
                _nvCollection.Add("@level5-int", level5Id.ToString());
                _nvCollection.Add("@level6-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-bigint", empid.ToString());
                _nvCollection.Add("@strdate-VARCHAR-20", strday.ToString());
                _nvCollection.Add("@enddate-VARCHAR-20", endday.ToString());
                DataTable table = dl.GetData("sp_SurveyDetailReport", _nvCollection).Tables[0];
                int row = 5;
                int col = 2;
                string valueofcol = "";
                string valofques = "";
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    if (table.Rows[i][0].ToString() != valueofcol)
                    {
                        if (i > 0)
                        {
                            row = row + 3;
                        }
                        if (table.Columns[6].ToString() == "SurveyDateTime")
                        {
                            ws.Cells[row, col].Value = "Survey Date";
                            ws.Cells[row, col].Style.Font.Name = "Verdana";
                            ws.Cells[row, col].Style.Font.Size = 10;
                            ws.Cells[row, col].Style.Font.Bold = true;
                            ws.Cells[row, col].Style.Border.BorderAround(ExcelBorderStyle.Thick, Color.Black);

                            ws.Cells[row, col + 1].Value = Convert.ToDateTime(table.Rows[i][6]).Date.ToString("dd-MMMM-yyyy");
                            ws.Cells[row, col + 1].Style.Font.Name = "Verdana";
                            ws.Cells[row, col + 1].Style.Font.Size = 10;
                            row = row + 2;
                        }
                        if (table.Columns[4].ToString() == "SurveyName")
                        {
                            ws.Cells[row, col].Value = "Survey Name";
                            ws.Cells[row, col].Style.Font.Name = "Verdana";
                            ws.Cells[row, col].Style.Font.Size = 10;
                            ws.Cells[row, col].Style.Font.Bold = true;
                            ws.Cells[row, col].Style.Border.BorderAround(ExcelBorderStyle.Thick, Color.Black);

                            ws.Cells[row, col + 1].Value = table.Rows[i][4].ToString();
                            ws.Cells[row, col + 1].Style.Font.Name = "Verdana";
                            ws.Cells[row, col + 1].Style.Font.Size = 10;
                            row = row + 2;
                        }
                        if (table.Columns[2].ToString() == "EmployeeName")
                        {
                            ws.Cells[row, col].Value = "Employee Name";
                            ws.Cells[row, col].Style.Font.Name = "Verdana";
                            ws.Cells[row, col].Style.Font.Size = 10;
                            ws.Cells[row, col].Style.Font.Bold = true;
                            ws.Cells[row, col].Style.Border.BorderAround(ExcelBorderStyle.Thick, Color.Black);

                            ws.Cells[row, col + 1].Value = table.Rows[i][2].ToString();
                            ws.Cells[row, col + 1].Style.Font.Name = "Verdana";
                            ws.Cells[row, col + 1].Style.Font.Size = 10;
                            row = row + 2;
                        }
                        if (table.Columns[3].ToString() == "FirstName")
                        {
                            ws.Cells[row, col].Value = "Customer Name";
                            ws.Cells[row, col].Style.Font.Name = "Verdana";
                            ws.Cells[row, col].Style.Font.Size = 10;
                            ws.Cells[row, col].Style.Font.Bold = true;
                            ws.Cells[row, col].Style.Border.BorderAround(ExcelBorderStyle.Thick, Color.Black);

                            ws.Cells[row, col + 1].Value = table.Rows[i][3].ToString();
                            ws.Cells[row, col + 1].Style.Font.Name = "Verdana";
                            ws.Cells[row, col + 1].Style.Font.Size = 10;
                            row = row + 2;
                        }


                        if (table.Columns[5].ToString() == "Description")
                        {
                            ws.Cells[row, col].Value = "Survey Notes";
                            ws.Cells[row, col].Style.Font.Name = "Verdana";
                            ws.Cells[row, col].Style.Font.Size = 10;
                            ws.Cells[row, col].Style.Font.Bold = true;
                            ws.Cells[row, col].Style.Border.BorderAround(ExcelBorderStyle.Thick, Color.Black);

                            ws.Cells[row, col + 1].Value = table.Rows[i][5].ToString();
                            ws.Cells[row, col + 1].Style.Font.Name = "Verdana";
                            ws.Cells[row, col + 1].Style.Font.Size = 10;
                            row = row + 2;
                        }
                        valueofcol = table.Rows[i][0].ToString();
                        valofques = "";
                    }

                    if (table.Columns[8].ToString() == "Question")
                    {
                        if (table.Rows[i][7].ToString() != valofques)
                        {
                            ws.Cells[row, col].Value = "Question";
                            ws.Cells[row, col].Style.Font.Name = "Verdana";
                            ws.Cells[row, col].Style.Font.Size = 10;
                            ws.Cells[row, col].Style.Font.Bold = true;
                            ws.Cells[row, col].Style.Border.BorderAround(ExcelBorderStyle.Thick, Color.Black);

                            ws.Cells[row, col + 1].Value = table.Rows[i][8].ToString();
                            ws.Cells[row, col + 1].Style.Font.Name = "Verdana";
                            ws.Cells[row, col + 1].Style.Font.Size = 10;
                            row = row + 1;
                            valofques = table.Rows[i][7].ToString();
                        }
                    }
                    if (table.Columns[9].ToString() == "Answer")
                    {
                        ws.Cells[row, col].Value = "Answer";
                        ws.Cells[row, col].Style.Font.Name = "Verdana";
                        ws.Cells[row, col].Style.Font.Size = 10;
                        ws.Cells[row, col].Style.Font.Bold = true;
                        ws.Cells[row, col].Style.Border.BorderAround(ExcelBorderStyle.Thick, Color.Black);

                        ws.Cells[row, col + 1].Value = table.Rows[i][9].ToString();
                        ws.Cells[row, col + 1].Style.Font.Name = "Verdana";
                        ws.Cells[row, col + 1].Style.Font.Size = 10;
                        row = row + 2;

                    }
                }

                #endregion

                pack.Save();

                #region Download Work

                var filenamef = fileInfo.FullName.ToString();
                Session["SurveyExcelReport"] = "Survey-Report-" + Convert.ToDateTime(dt1).ToString("MMM") + "To" + Convert.ToDateTime(dt2).ToString("MMM") + ".xlsx";

                #endregion

            }
            catch (Exception ex)
            {
                Session["SurveyExcelReport"] = null;
                // ErrorLog("Survey Excel Report: " + ex.Message.ToString() + "Stack: " + ex.StackTrace.ToString());
            }

            return "das";
        }
        //

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string MonthlyExpense(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
           string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus)
        {
            try
            {


                Session["MonthlyExpense"] = null;
                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable MonthlyExpense = dsDcr.Tables["MonthlyExpense"];
                //string type = "S";
                _nvCollection.Clear();
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@EmployeeID-int", empid.ToString());
                _nvCollection.Add("@Level1-int", level1Id.ToString());
                _nvCollection.Add("@Level2-int", level2Id.ToString());
                _nvCollection.Add("@Level3-int", level3Id.ToString());
                _nvCollection.Add("@Level4-int", level4Id.ToString());
                _nvCollection.Add("@Level5-int", level5Id.ToString());
                _nvCollection.Add("@Level6-int", level6Id.ToString());
                _nvCollection.Add("@TeamId-int", skuid.ToString());
                _nvCollection.Add("@date-datetime", dt1);
                _nvCollection.Add("@EmpStatus-int", empstatus.ToString());

                DataSet ds = GetData("sp_getAllExpenseMonthly_NewParameter", _nvCollection);
                //dtDailyCallReport = ds.Tables[0];

                if (ds != null)
                {
                    MonthlyExpense = ds.Tables[0];
                    Session["MonthlyExpense"] = MonthlyExpense;
                }
                ds.Dispose();
                //dtDailyCallReport.Dispose();

            }
            catch (Exception ex)
            {
                Session["MonthlyExpense"] = null;
                Constants.ErrorLog("MonthlyExpense : " + ex.Message.ToString() + "Stack: " + ex.StackTrace.ToString());
            }

            return "das";
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string getQuizFormType(string employeeid, int Level1Id, int Level2Id, int Level3Id, int Level4Id, int Level5Id, int Level6Id, string dt1, string dt2)
        {
            string returnstring = "";

            try
            {
                //DAL dl = new DAL();
                _nvCollection.Clear();
                _nvCollection.Add("@EmployeeId-int", employeeid.ToString());
                _nvCollection.Add("@Level1Id-int", Level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", Level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", Level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", Level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", Level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", Level6Id.ToString());
                _nvCollection.Add("@StartingDate-datetime", dt1.ToString());
                _nvCollection.Add("@EndingDate-datetime", dt2.ToString());


                DataSet ds = GetData("sp_getQuizFormType", _nvCollection);

                if (ds != null)
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnstring = ds.Tables[0].ToJsonString();
                    }

            }
            catch (Exception ex)
            {

                returnstring = ex.Message;
            }

            return returnstring;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string CallPlannerActivityReport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
           string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            var CallPlannerActivityReport = new DataTable();
            CrystalReports.XSDDatatable.Dsreports dsc = new CrystalReports.XSDDatatable.Dsreports();
            CallPlannerActivityReport = dsc.Tables["CallPlannerActivityReport"];
            try
            {
                //DateTime from = Convert.ToDateTime(dt1);
                //DateTime to = Convert.ToDateTime(dt2);
                //DateTime to = Convert.ToDateTime(dt2);

                Session["CallPlannerActivityReport"] = "";
                _nvCollection.Clear();
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-int", level3Id.ToString());
                _nvCollection.Add("@Level4ID-int", level4Id.ToString());
                _nvCollection.Add("@Level5ID-int", level5Id.ToString());
                _nvCollection.Add("@Level6ID-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeID-int", empid.ToString());
                _nvCollection.Add("@StartingDate-date", dt1.ToString());
                _nvCollection.Add("@EndingDate-date", dt2.ToString());
                DataSet ds = GetData("sp_CallPlannerActivityReport", _nvCollection);
                if (ds != null)
                {
                    #region Process On Work
                    CallPlannerActivityReport = ds.Tables[0];
                    Session["CallPlannerActivityReport"] = CallPlannerActivityReport;
                    #endregion

                }

            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Activity Report with Date Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");

            }
            return "das";

        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string TMMonthlyPlanStatus(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            var MonthlyPlanStatus = new DataTable();
            CrystalReports.XSDDatatable.Dsreports dsc = new CrystalReports.XSDDatatable.Dsreports();
            MonthlyPlanStatus = dsc.Tables["MonthlyPlanStatus"];
            try
            {


                Session["MonthlyPlanStatus"] = "";

                _nvCollection.Clear();
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-int", level3Id.ToString());
                _nvCollection.Add("@Level4ID-int", level4Id.ToString());
                _nvCollection.Add("@Level5ID-int", level5Id.ToString());
                _nvCollection.Add("@Level6ID-int", level6Id.ToString());
                _nvCollection.Add("@PlanMonth-datetime", dt1);

                DataSet ds = GetData("sp_TMMonthltyPlanStatus", _nvCollection);
                if (ds != null)
                {
                    #region Process On Work
                    MonthlyPlanStatus = ds.Tables[0];
                    Session["MonthlyPlanStatus"] = MonthlyPlanStatus;
                    #endregion

                }

            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From MonthlyPlan Status Report with Date Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string SfePerformanceReport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus)
        {

            try
            {
                string status = GetRptStatus(dt1);
                //DataTable dtDailyCallReport = new DataTable();
                int month = Convert.ToDateTime(dt1).Month;
                int year = Convert.ToDateTime(dt1).Year;
                Session["sferpt"] = null;
                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtspo = dsDcr.Tables["SFEPerfReport"];
                string type = "S";
                _nvCollection.Clear();
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-int", level3Id.ToString());
                _nvCollection.Add("@Level4ID-int", level4Id.ToString());
                _nvCollection.Add("@Level5ID-int", level5Id.ToString());
                _nvCollection.Add("@Level6ID-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeID-int", empid.ToString());
                _nvCollection.Add("@TeamId-int", skuid.ToString());
                _nvCollection.Add("@Month-int", month.ToString());
                _nvCollection.Add("@Year-int", year.ToString());
                _nvCollection.Add("@EmpStatus-int", empstatus.ToString());


                DataSet ds = GetData((status == "Live" ? "sp_SFEPerfReport_NewParameter" : "sp_SFEPerfReport_NewParameter_archive"), _nvCollection);
                //dtDailyCallReport = ds.Tables[0];                

                if (ds != null)
                {
                    dtspo = ds.Tables[0];
                    Session["sferpt"] = dtspo;
                }
                ds.Dispose();
                //dtDailyCallReport.Dispose();

            }
            catch (Exception ex)
            {
                Session["totalsposresult"] = null;
                Constants.ErrorLog("total_and_balance : " + ex.Message.ToString() + "Stack: " + ex.StackTrace.ToString());
            }

            return "das";
        }





        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string MonthlyVisitAnalysisWithPlanningNew(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus)
        {
            try
            {
                #region GET DATA

                Session["MonthlyVisitAnalysisWithPlanningNew"] = null;
                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtMonthlyVisitAnalysisWithPlanningNew = dsDcr.Tables["MonthlyVisitAnalysisWithPlanningNew"];
                string status = GetRptStatus(dt1);
                _nvCollection.Clear();
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-int", level3Id.ToString());
                _nvCollection.Add("@Level4ID-int", level4Id.ToString());
                _nvCollection.Add("@Level5ID-int", level5Id.ToString());
                _nvCollection.Add("@Level6ID-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeID-int", empid.ToString());
                _nvCollection.Add("@TeamId-int", skuid.ToString());
                _nvCollection.Add("@DateStart-date", dt1.ToString());
                _nvCollection.Add("@DateEnd-date", dt2.ToString());
                _nvCollection.Add("@EmpStatus-int", empstatus.ToString());

                DataSet ds = GetData((status == "Live" ? "Sp_MonthlyVisitAnalysis_NewParameter" : "Sp_MonthlyVisitAnalysis_NewParameter_archive"), _nvCollection);

                #endregion
                if (ds != null)
                {
                    dtMonthlyVisitAnalysisWithPlanningNew = ds.Tables[0];
                    Session["MonthlyVisitAnalysisWithPlanningNew"] = dtMonthlyVisitAnalysisWithPlanningNew;
                }
                ds.Dispose();

                #region Process On Work

                // dtMonthlyVisitAnalysisWithPlanningNew = ds.Tables[0];

                // Session["MonthlyVisitAnalysisWithPlanningNew"] = dtMonthlyVisitAnalysisWithPlanningNew;

                #endregion
            }
            catch (Exception ex)
            {
                //Constants.ErrorLog("Exception Raising From MonthlyVisitAnalysisWithPlanningNew Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
                Session["MonthlyVisitAnalysisWithPlanningNew"] = null;
                Constants.ErrorLog("Exception Raising From MonthlyVisitAnalysisWithPlanningNew Report Generation : " + ex.Message.ToString() + "Stack: " + ex.StackTrace.ToString());
            }
            return "das";

        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UnVisitedDoctor(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus)
        {

            try
            {
                string Query = string.Empty;
                Session["UnVisitedDoctor"] = "";


                #region GET DATA

                CrystalReports.XSDDatatable.Dsreports dsr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dt = dsr.Tables[" "];
                string status = GetRptStatus(dt1);
                _nvCollection.Clear();
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@TeamId-int", skuid.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                _nvCollection.Add("@StartingDate-datetime", dt1.ToString());
                _nvCollection.Add("@EmpStatus-int", empstatus.ToString());

                DataSet ds = GetData( "sp_UnVisitedDoctorReport_NewParameter" , _nvCollection);

                #endregion


                #region Process On Work

                dt = ds.Tables[0];

                Session["UnVisitedDoctor"] = dt;

                #endregion


            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Daily Call Report with Activity ID Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");

            }
            return "das";
            }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string FillLeaveType()
        {
            DAL dl = new DAL();
            string result = string.Empty;
            try
            {
                _nvCollection.Clear();
                var data = dl.GetData("Leave_Type", _nvCollection);

                if (data.Tables[0].Rows.Count > 0)
                {
                    return data.Tables[0].ToJsonString();
                }
                else
                {
                    result = "No";
                }

            }
            catch (Exception ex)
            {
                result = ex.Message;
            }
            return result;

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Attendance(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {

            try
            {
                //DataTable dtDailyCallReport = new DataTable();
                Session["Attendance"] = null;
                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtattendance = dsDcr.Tables["Attendance"];


                _nvCollection.Clear();
                _nvCollection.Add("@Level3ID-INT", level3Id.ToString());
                _nvCollection.Add("@Level4ID-INT", level4Id.ToString());
                _nvCollection.Add("@Level5ID-INT", level5Id.ToString());
                _nvCollection.Add("@Level6ID-INT", level6Id.ToString());
                _nvCollection.Add("@Att_Type-bigint", "0");
                _nvCollection.Add("@DateStart-Date", DateTime.Parse(dt1).ToString());
                _nvCollection.Add("@DateEnd-Date", DateTime.Parse(dt2).ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());

                DataSet ds = GetData("sp_AttendeceReport", _nvCollection);
                //dtDailyCallReport = ds.Tables[0];

                if (ds != null)
                {
                    dtattendance = ds.Tables[0];
                    Session["Attendance"] = dtattendance;
                }
                ds.Dispose();
                //dtDailyCallReport.Dispose();

            }
            catch (Exception ex)
            {
                Session["Attendance"] = null;
                Constants.ErrorLog("Attendance Report : " + ex.Message.ToString() + "Stack: " + ex.StackTrace.ToString());
            }

            return "das";
        }

        // Activity Report Format (Attendance Status)
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ActivityAttendenceStatusReport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string st, string LType, string empstatus)
        {

            CrystalReports.XSDDatatable.Dsreports mfb = new CrystalReports.XSDDatatable.Dsreports();
            DataTable dt = mfb.Tables["ActivityAttendenceStatusReport"];


            #region SET Hierarchy Level

            #endregion
            try
            {
                int day = Convert.ToDateTime(dt1).Day;
                int month = Convert.ToDateTime(dt1).Month;
                int year = Convert.ToDateTime(dt1).Year;
                int eday = Convert.ToDateTime(dt2).Day;


                #region GET DataGrid
                #region GET DATA FROM SP Assigning parameters
                NameValueCollection _nvCollection = new NameValueCollection();
                _nvCollection.Clear();
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1ID-INT", level1Id.ToString());
                _nvCollection.Add("@Level2ID-INT", level2Id.ToString());
                _nvCollection.Add("@Level3ID-INT", level3Id.ToString());
                _nvCollection.Add("@Level4ID-INT", level4Id.ToString());
                _nvCollection.Add("@Level5ID-INT", level5Id.ToString());
                _nvCollection.Add("@Level6ID-INT", level6Id.ToString());
                _nvCollection.Add("@EmployeeID-INT", empid.ToString());
                _nvCollection.Add("@LeaveType-INT", LType.ToString());
                _nvCollection.Add("@TeamID-int", skuid.ToString());
                _nvCollection.Add("@Day-INT", day.ToString());
                _nvCollection.Add("@Month-INT", month.ToString());
                _nvCollection.Add("@Year-INT", year.ToString());
                _nvCollection.Add("@Eday-INT", eday.ToString());
                _nvCollection.Add("@EmpStatus-int", empstatus.ToString());

                DataSet ds = GetData("Activity_Report_Attendence_NewParameter", _nvCollection);
                #endregion

                try
                {
                    if (ds != null)
                    {
                        #region Process On Work
                        dt = ds.Tables[0];
                        Session["ActivityAttendenceStatusReport"] = dt;
                        #endregion


                    }

                }
                catch (Exception ex)
                {
                    Constants.ErrorLog("Exception Raising From Activity Attendance Status Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
                }
                return "das";


                #endregion

                //returnString = "PlanstatusReport";
                //return "PlanstatusReport";

            }
            catch (Exception)
            {
                // returnString = exception.Message;
            }
            return "ActivityAttendenceStatusReport";
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string CallExecutionDetailsReport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                Session["CallExecutionDetailsReport"] = null;
                _nvCollection.Clear();
                _nvCollection.Add("@Level3id-int", level3Id.ToString());
                _nvCollection.Add("@Level4id-int", level4Id.ToString());
                _nvCollection.Add("@Level5id-int", level5Id.ToString());
                _nvCollection.Add("@Level6id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                //_nvCollection.Add("@Month-int", Convert.ToDateTime(dt1).Month.ToString());
                //_nvCollection.Add("@Year-int", Convert.ToDateTime(dt1).Year.ToString());
                //_nvCollection.Add("@eMonth-int", Convert.ToDateTime(dt2).Month.ToString());
                //_nvCollection.Add("@eYear-int", Convert.ToDateTime(dt2).Year.ToString());
                _nvCollection.Add("@FromDate-DateTime", dt1.ToString());
                _nvCollection.Add("@ToDate-DateTime", dt2.ToString());

                DataSet ds = new DataSet();
                ds = GetData("sp_CallExecutionDetailsReport", _nvCollection);
                if (ds != null)
                {
                    dtDailyCallReport = ds.Tables[0];
                }

                //CrystalReports.KPIByClass.KPIbyClass Kpi = new CrystalReports.KPIByClass.KPIbyClass();
                //Kpi.SetDataSource(dtDailyCallReport);
                Session["CallExecutionDetailsReport"] = dtDailyCallReport;

            }
            catch (Exception ex)
            {
                Session["CallExecutionDetailsReport"] = null;
                Constants.ErrorLog("CallExecutionDetailsReport : " + ex.Message.ToString() + "Stack: " + ex.StackTrace.ToString());
            }

            return "das";
        }

        //MIOCallReason Report
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string MioCallReason(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus)
        {
            try
            {

                CrystalReports.XSDDatatable.Dsreports mfb = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dt = mfb.Tables["MioCallReason"];

                //int month = Convert.ToDateTime(dt1).Month;
                //int Year = Convert.ToDateTime(dt2).Year;

                #region Initialization  columns

                string status = GetRptStatus(dt1);
                _nvCollection.Clear();
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@EmpId-int", empid.ToString());
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-int", level3Id.ToString());
                _nvCollection.Add("@Level4ID-int", level4Id.ToString());
                _nvCollection.Add("@Level5ID-int", level5Id.ToString());
                _nvCollection.Add("@Level6ID-int", level6Id.ToString());
                _nvCollection.Add("@TeamID-int", skuid.ToString());
                _nvCollection.Add("@DateStart-date", dt1.ToString());
                _nvCollection.Add("@DateEnd-date", dt2.ToString());
                _nvCollection.Add("@EmpStatus-int", empstatus.ToString());
                DataSet miocallreason = GetData((status == "Live" ? "sp_MioCallReason_NewParameter" : "sp_MioCallReason_NewParameter_archive"), _nvCollection);
                if (miocallreason != null)
                {
                    #region Process On Work
                    dt = miocallreason.Tables[0];
                    Session["MioCallReason"] = dt;
                    #endregion


                }
                #endregion



            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From MIO Call Reason Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "MioCallReason";
        }

        //MR Best Rating Report
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string MRBestRatingReport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {

                //CrystalReports.XSDDatatable.MRBestRatingReport MBRR = new CrystalReports.XSDDatatable.MRBestRatingReport();
                DataTable dt = null;


                #region Initialization  columns


                _nvCollection.Clear();
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                _nvCollection.Add("@VisitShift-INT", vsid.ToString());
                _nvCollection.Add("@StartingDate-datetime", dt1.ToString());
                _nvCollection.Add("@EndingDate-datetime", dt2.ToString());

                DataSet MRR = GetData("sp_MRBestRatingReport", _nvCollection);
                if (MRR != null)
                {
                    #region Process On Work
                    dt = MRR.Tables[0];
                    Session["MRBestRatingReport"] = dt;
                    #endregion


                }
                #endregion



            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From MR Best Rating Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "MioCallReason";
        }

        //Customer Not Visited By SPO
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string CustomerNotVisitedBySPO(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                DataTable dt = null;


                #region Initialization  columns


                _nvCollection.Clear();
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                _nvCollection.Add("@StartingDate-datetime", dt1.ToString());

                DataSet Custmr = GetData("Sp_CustomersNotVisitedBySPO", _nvCollection);
                if (Custmr != null)
                {
                    #region Process On Work
                    dt = Custmr.Tables[0];
                    Session["CustomerNotVisitedBySPO"] = dt;
                    #endregion


                }
                #endregion



            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Customer Not Visited By SPO Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "MioCallReason";
        }

        //Product Wise Calls Details
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ProductWiseCallsDetails(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                DataTable dt = null;


                #region Initialization  columns


                _nvCollection.Clear();
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                _nvCollection.Add("@StartingDate-datetime", dt1.ToString());

                DataSet Custmr = GetData("Sp_ProductWiseCallsDetails", _nvCollection);
                if (Custmr != null)
                {
                    #region Process On Work
                    dt = Custmr.Tables[0];
                    Session["ProductWiseCallsDetails"] = dt;
                    #endregion


                }
                #endregion



            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Product Wise Calls Details Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "MioCallReason";
        }

        //Call Execution Data DAY By DAY Detail
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string CallExecutionDataDAYByDAYDetail(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus)
        {
            try
            {
                DataTable dt = null;


                #region Initialization  columns


                _nvCollection.Clear();
                string status = GetRptStatus(dt1);
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                _nvCollection.Add("@TeamID-int", skuid.ToString());
                _nvCollection.Add("@StartingDate-datetime", dt1.ToString());
                _nvCollection.Add("@EmpStatus-int", empstatus.ToString());

                DataSet Custmr = GetData((status == "Live" ? "Sp_CallExecutionDataDAYByDAYDetail_NewParameter" : "Sp_CallExecutionDataDAYByDAYDetail_NewParameter_archive"), _nvCollection);
                if (Custmr != null)
                {
                    #region Process On Work
                    dt = Custmr.Tables[0];
                    Session["CallExecutionDataDAYByDAYDetail"] = dt;
                    #endregion


                }
                #endregion



            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Call Execution Data DAY By DAY Detail Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "MioCallReason";
        }



        //Call Execution Data DAY By DAY Detail For Excel
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string CallExecutionDataDAYByDAYDetailForExcel(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus, string EmpType)
        {
            try
            {
                DataTable dt = null;
                string path = Server.MapPath("~/Excels");


                #region Initialization  columns

                _nvCollection.Clear();
                string status = GetRptStatus(dt1);
                int Year = Convert.ToDateTime(dt1).Year;
                int Month = Convert.ToDateTime(dt1).Month;
                string Months = Convert.ToDateTime(dt1).ToString("MMM");
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                _nvCollection.Add("@TeamID-int", skuid.ToString());
                _nvCollection.Add("@StartingDate-datetime", dt1.ToString());
                _nvCollection.Add("@EmpStatus-int", empstatus.ToString());
                _nvCollection.Add("@EmpType-nvarchar", EmpType.ToString());

                DataSet Custmr = GetData((status == "Live" ? "Sp_CallExecutionDataDAYByDAYDetail_NewParameter_FOR_Excel" : "Sp_CallExecutionDataDAYByDAYDetail_NewParameter_archive"), _nvCollection);


                var fileInfo = new FileInfo(path + @"\CallExecutionDayByDayForExcel" + Convert.ToDateTime(dt1).ToString("MMM") + ".xlsx");

                //var fileInfo = new FileInfo(rprtpath + @"\CallExecutionDayByDayForExcel-" + Convert.ToDateTime(dt1).ToString("MMM") + ".xlsx");
                if (fileInfo.Exists)
                    fileInfo.Delete();

                ExcelPackage pack = new ExcelPackage(fileInfo);
                DataTable table = new DataTable();
                //table = GetAllQuestionaireExecutionwithAnswer(rm);
                //table = Custmr;
                DataTable tables = Custmr.Tables[0];
                try
                {
                    ExcelWorksheet ws = pack.Workbook.Worksheets.Add("Questionaire Execution Sheet");
                    ws.Cells["M2"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    ws.Cells["A1"].Value = dt1;
                    ws.Cells["M2:R2"].Value = "Monthly Till Date Calls Details";
                    ws.Cells["M2:R2"].Style.Font.Size = 18;
                    ws.Cells["M2:R2"].Style.Font.Name = "Arial";
                    ws.Cells["M2:R2"].Merge = true;
                    //ws.Cells["M2:R2"].Merge = true;
                    ws.Cells["M2:R2"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    ws.Cells["M2:R2"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    ws.Cells["K5:AN5"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    ws.Cells["K5:AN5"].Value = "Day By Day";
                    ws.Cells["K5:AN5"].Style.Font.Size = 18;
                    ws.Cells["K5:AN5"].Style.Font.Name = "Arial";
                    ws.Cells["K5:AN5"].Merge = true;
                    ws.Cells["K5:AN5"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    ws.Cells["K5:AN5"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    ws.Cells["K5:AN5"].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                    //ws.Cells["N3:P3"].Style.Border.BorderAround(ExcelBorderStyle.Thin);

                    ws.Cells["N3:R3"].Style.Font.Size = 18;
                    ws.Cells["N3:R3"].Style.Font.Name = "Arial";
                    ws.Cells["N3:R3"].Value = "To :";

                    ws.Cells["M3:R3"].Value = Months + "-" + Year;
                    ws.Cells["M3:R3"].Style.Font.Size = 18;
                    ws.Cells["M3:R3"].Style.Font.Name = "Arial";

                    ws.Cells["M3:R3"].Merge = true;
                    ws.Cells["M1:R1"].Merge = true;
                    ws.Cells["M3:R3"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    ws.Cells["M3:R3"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

                    ws.Row(1).Height = 16;
                    ws.Row(2).Height = 16;




                    int index = 1;
                    foreach (DataColumn column in tables.Columns)
                    {
                        ws.Cells[7, index].Value = column.ColumnName;
                        ws.Cells[7, index].Style.Font.Bold = true;
                        index++;
                    }

                    int col = 1;
                    int row = 8;

                    if (table != null)
                    {

                        foreach (DataRow rw in tables.Rows)
                        {
                            foreach (DataColumn cl in tables.Columns)
                            {
                                if (rw[cl.ColumnName] != DBNull.Value)
                                    ws.Cells[row, col].Value = rw[cl.ColumnName].ToString();

                                col++;
                            }
                            row++;
                            col = 1;
                        }
                    }

                    pack.Save();
                    var filenamef = fileInfo.FullName.ToString();

                    Session["CallExecutionDataDAYByDAYDetail"] = @"\CallExecutionDayByDayForExcel" + Convert.ToDateTime(dt1).ToString("MMM") + ".xlsx";
                }
                #endregion

                catch (Exception ex)
                {
                    Constants.ErrorLog("Exception Raising From Call Execution Data DAY By DAY Detail Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
                }

                return "MioCallReason";
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Call Execution Data DAY By DAY Detail Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "MioCallReason";
        }



        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string WorkPlanBySPOInExcel(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus, string EmpType)
        {
            try
            {
                DataTable dt = null;

                #region CreatingWorksheet
                int Year = Convert.ToDateTime(dt1).Year;
                string Month = Convert.ToDateTime(dt1).ToString("MMM");
                string Date = Convert.ToDateTime(dt1).ToString("dd-MMM-yyyy");
                int Month1 = Convert.ToDateTime(dt1).Month;
                string MontYear = Month + "-" + Year;
                int da = DateTime.DaysInMonth(Year, Convert.ToDateTime(dt1).Month);
                string GridFillData = "";

                //If Folder is not exist in server then create else map file
                string tempfolder = System.AppDomain.CurrentDomain.BaseDirectory + "Excels\\SPO_Report";
                string temppath = tempfolder;

                if (!Directory.Exists(temppath))
                {
                    Directory.CreateDirectory(temppath);
                }

                string path = Server.MapPath("~/Excels/SPO_Report");

                var fileInfo = new FileInfo(path + @"\Work-Plan-By-SPO-Report-Excel-" + Convert.ToDateTime(dt1).ToString("MMM") + ".xlsx");

                //If Same file Excel is exist then delete (nessesary)
                if (fileInfo.Exists)
                    fileInfo.Delete();

                var pack = new ExcelPackage(fileInfo);
                ExcelWorksheet ws;
                if (pack.Workbook.Worksheets.Count > 0)
                {
                    ws = pack.Workbook.Worksheets["WorkPlanBySPOInExcel"];
                    pack.Workbook.Worksheets.Delete(ws.Index);
                    ws = pack.Workbook.Worksheets.Add("WorkPlanBySPOInExcel");
                }
                else
                {
                    ws = pack.Workbook.Worksheets.Add("WorkPlanBySPOInExcel");
                }

                #endregion

                #region Data

                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Clear();
                //_nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                //_nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-int", level3Id.ToString());
                _nvCollection.Add("@Level4ID-int", level4Id.ToString());
                _nvCollection.Add("@Level5ID-int", level5Id.ToString());
                _nvCollection.Add("@Level6ID-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-bigint", empid.ToString());
                _nvCollection.Add("@EmpStatus-INT", empstatus.ToString());
                _nvCollection.Add("@Year-nvarchar(max)", Year.ToString());
                _nvCollection.Add("@Month-nvarchar(max)", Month1.ToString());
                //_nvCollection.Add("@TeamID-int", TeamID.ToString());
                DataSet ds = GetData("sp_WorkPlanBYSPO_Excel", _nvCollection);
                DataTable table = ds.Tables[0];
                //DataTable table1 = ds.Tables[1];
                #endregion

                #region formating

                ws.Row(1).Height = 25.50;
                ws.Column(1).Hidden = true;
                ws.Column(2).Hidden = true;
                ws.Cells["A1:S1"].Merge = true;
                ws.Cells["A1:S1"].Value = "ATCO LABORATORIES LIMITED";
                ws.Cells["A1:S1"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells["A1:S1"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Cells["A1:S1"].Style.Font.Name = "Arial";
                ws.Cells["A1:S1"].Style.Font.Size = 20;
                ws.Cells["A1:S1"].Style.Font.Bold = true;
                ws.Cells["A1:S1"].Style.Font.Color.SetColor(Color.Black);
                //ws.Cells["A1:O1"].Style.Font.Color.SetColor(Color.FromArgb(255, 255, 255));
                //ws.Cells["A1:O1"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                //ws.Cells["A1:O1"].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(52, 152, 219));
                ws.Cells["A1:S1"].Style.WrapText = true;

                ws.Row(2).Height = 25.50;
                ws.Column(1).Hidden = true;
                ws.Column(2).Hidden = true;
                ws.Cells["A2:S2"].Merge = true;
                ws.Cells["A2:S2"].Value = "WORK PLAN";
                ws.Cells["A2:S2"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells["A2:S2"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Cells["A2:S2"].Style.Font.Name = "Arial";
                ws.Cells["A2:S2"].Style.Font.Size = 20;
                ws.Cells["A2:S2"].Style.Font.Bold = true;
                ws.Cells["A2:S2"].Style.Font.Color.SetColor(Color.Black);
                //ws.Cells["A2:O2"].Style.Font.Color.SetColor(Color.FromArgb(255, 255, 255));
                //ws.Cells["A2:O2"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                //ws.Cells["A2:O2"].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(52, 152, 219));
                ws.Cells["A2:S2"].Style.WrapText = true;



                ws.Cells[4, 1].Value = "EmployeeName";
                ws.Cells[4, 1].Style.Font.Name = "Verdana";
                ws.Cells[4, 1].Style.Font.Size = 12;
                ws.Cells[4, 1].Style.Font.Bold = true;

                ws.Cells[4, 2].Value = ds.Tables[0].Rows[0][5];
                ws.Cells[4, 2].Style.Font.Name = "Verdana";
                ws.Cells[4, 2].Style.Font.Size = 12;
                ws.Cells[4, 2].Style.Font.Bold = true;


                ws.Cells[4, 4].Value = "Designation";
                ws.Cells[4, 4].Style.Font.Name = "Verdana";
                ws.Cells[4, 4].Style.Font.Size = 12;
                ws.Cells[4, 4].Style.Font.Bold = true;

                ws.Cells[4, 5].Value = ds.Tables[0].Rows[0][7];
                ws.Cells[4, 5].Style.Font.Name = "Verdana";
                ws.Cells[4, 5].Style.Font.Size = 12;
                ws.Cells[4, 5].Style.Font.Bold = true;

                ws.Cells[4, 7].Value = "Month";
                ws.Cells[4, 7].Style.Font.Name = "Verdana";
                ws.Cells[4, 7].Style.Font.Size = 12;
                ws.Cells[4, 7].Style.Font.Bold = true;

                ws.Cells[4, 8].Value = MontYear;
                ws.Cells[4, 8].Style.Font.Name = "Verdana";
                ws.Cells[4, 8].Style.Font.Size = 12;
                ws.Cells[4, 8].Style.Font.Bold = true;

                ws.Cells[6, 1].Value = "Team";
                ws.Cells[6, 1].Style.Font.Name = "Verdana";
                ws.Cells[6, 1].Style.Font.Size = 12;
                ws.Cells[6, 1].Style.Font.Bold = true;

                ws.Cells[6, 2].Value = ds.Tables[0].Rows[0][8];
                ws.Cells[6, 2].Style.Font.Name = "Verdana";
                ws.Cells[6, 2].Style.Font.Size = 12;
                ws.Cells[6, 2].Style.Font.Bold = true;

                ws.Cells[6, 4].Value = "BaseStation";
                ws.Cells[6, 4].Style.Font.Name = "Verdana";
                ws.Cells[6, 4].Style.Font.Size = 12;
                ws.Cells[6, 4].Style.Font.Bold = true;

                ws.Cells[6, 5].Value = ds.Tables[0].Rows[0][3];
                ws.Cells[6, 5].Style.Font.Name = "Verdana";
                ws.Cells[6, 5].Style.Font.Size = 12;
                ws.Cells[6, 5].Style.Font.Bold = true;


                ws.Row(1).Height = 80.50;
                ws.Column(1).Hidden = true;
                ws.Column(2).Hidden = true;
                ws.Cells["A7:H7"].Merge = true;
                ws.Cells["A7:H7"].Value = "MORNING";
                ws.Cells["A7:H7"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells["A7:H7"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Cells["A7:H7"].Style.Font.Name = "Arial";
                ws.Cells["A7:H7"].Style.Font.Size = 18;
                ws.Cells["A7:H7"].Style.Font.Bold = true;
                ws.Cells["A7:H7"].Style.Font.Color.SetColor(Color.Black);
                //ws.Cells["A2:O2"].Style.Font.Color.SetColor(Color.FromArgb(255, 255, 255));
                //ws.Cells["A2:O2"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                // ws.Cells["A2:O2"].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(52, 152, 219));
                ws.Cells["A7:H7"].Style.WrapText = true;

                ws.Row(1).Height = 80.50;
                ws.Column(1).Hidden = true;
                ws.Column(2).Hidden = true;
                ws.Cells["J7:Q7"].Merge = true;
                ws.Cells["J7:Q7"].Value = "EVENING";
                ws.Cells["J7:Q7"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells["J7:Q7"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Cells["J7:Q7"].Style.Font.Name = "Arial";
                ws.Cells["J7:Q7"].Style.Font.Size = 18;
                ws.Cells["J7:Q7"].Style.Font.Bold = true;
                ws.Cells["J7:Q7"].Style.Font.Color.SetColor(Color.Black);
                //ws.Cells["A2:O2"].Style.Font.Color.SetColor(Color.FromArgb(255, 255, 255));
                //ws.Cells["A2:O2"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                // ws.Cells["A2:O2"].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(52, 152, 219));
                ws.Cells["J7:Q7"].Style.WrapText = true;




                int rowHeader = 1;
                int columnHeader = 1;
                var colCount = table.Columns.Count;

                ws.Column(1).Width = 20.29;
                ws.Cells[9, 1].Value = "Date";
                ws.Cells[9, 1].Style.Font.Name = "Verdana";
                ws.Cells[9, 1].Style.Font.Size = 10;
                ws.Cells[9, 1].Style.Font.Bold = true;
                ws.Cells[9, 1].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[9, 1].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[9, 1].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(2).Width = 26.14;
                ws.Cells[9, 2].Value = "Day";
                ws.Cells[9, 2].Style.Font.Name = "Verdana";
                ws.Cells[9, 2].Style.Font.Size = 10;
                ws.Cells[9, 2].Style.Font.Bold = true;
                ws.Cells[9, 2].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[9, 2].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[9, 2].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(3).Width = 8.86;
                ws.Cells[9, 3].Value = "Time";
                ws.Cells[9, 3].Style.Font.Name = "Verdana";
                ws.Cells[9, 3].Style.Font.Size = 10;
                ws.Cells[9, 3].Style.Font.Bold = true;
                ws.Cells[9, 3].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[9, 3].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[9, 3].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(4).Width = 15.71;
                ws.Cells[9, 4].Value = "Brick City";
                ws.Cells[9, 4].Style.Font.Name = "Verdana";
                ws.Cells[9, 4].Style.Font.Size = 10;
                ws.Cells[9, 4].Style.Font.Bold = true;
                ws.Cells[9, 4].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[9, 4].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[9, 4].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(5).Width = 18.00;
                ws.Cells[9, 5].Value = "Brick";
                ws.Cells[9, 5].Style.Font.Name = "Verdana";
                ws.Cells[9, 5].Style.Font.Size = 10;
                ws.Cells[9, 5].Style.Font.Bold = true;
                ws.Cells[9, 5].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[9, 5].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[9, 5].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));


                ws.Column(6).Width = 19.29;
                ws.Cells[9, 6].Value = "Employee Name";
                ws.Cells[9, 6].Style.Font.Name = "Verdana";
                ws.Cells[9, 6].Style.Font.Size = 10;
                ws.Cells[9, 6].Style.Font.Bold = true;
                ws.Cells[9, 6].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[9, 6].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[9, 6].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(7).Width = 19.29;
                ws.Cells[9, 7].Value = "SPO LoginID";
                ws.Cells[9, 7].Style.Font.Name = "Verdana";
                ws.Cells[9, 7].Style.Font.Size = 10;
                ws.Cells[9, 7].Style.Font.Bold = true;
                ws.Cells[9, 7].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[9, 7].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[9, 7].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));



                ws.Column(8).Width = 15.29;
                ws.Cells[9, 8].Value = "Designation";
                ws.Cells[9, 8].Style.Font.Name = "Verdana";
                ws.Cells[9, 8].Style.Font.Size = 10;
                ws.Cells[9, 8].Style.Font.Bold = true;
                ws.Cells[9, 8].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[9, 8].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[9, 8].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));


                ws.Column(9).Width = 15.14;
                ws.Cells[9, 9].Value = "SPO's Team";
                ws.Cells[9, 9].Style.Font.Name = "Verdana";
                ws.Cells[9, 9].Style.Font.Size = 10;
                ws.Cells[9, 9].Style.Font.Bold = true;
                ws.Cells[9, 9].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[9, 9].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[9, 9].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(11).Width = 11.43;
                ws.Cells[9, 11].Value = " Date";
                ws.Cells[9, 11].Style.Font.Name = "Verdana";
                ws.Cells[9, 11].Style.Font.Size = 10;
                ws.Cells[9, 11].Style.Font.Bold = true;
                ws.Cells[9, 11].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[9, 11].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[9, 11].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(12).Width = 11.14;
                ws.Cells[9, 12].Value = " Day";
                ws.Cells[9, 12].Style.Font.Name = "Verdana";
                ws.Cells[9, 12].Style.Font.Size = 10;
                ws.Cells[9, 12].Style.Font.Bold = true;
                ws.Cells[9, 12].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[9, 12].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[9, 12].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));


                ws.Column(13).Width = 8.86;
                ws.Cells[9, 13].Value = " Time";
                ws.Cells[9, 13].Style.Font.Name = "Verdana";
                ws.Cells[9, 13].Style.Font.Size = 10;
                ws.Cells[9, 13].Style.Font.Bold = true;
                ws.Cells[9, 13].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[9, 13].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[9, 13].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(14).Width = 12.14;
                ws.Cells[9, 14].Value = "BrickCity";
                ws.Cells[9, 14].Style.Font.Name = "Verdana";
                ws.Cells[9, 14].Style.Font.Size = 10;
                ws.Cells[9, 14].Style.Font.Bold = true;
                ws.Cells[9, 14].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[9, 14].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[9, 14].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(15).Width = 10.00;
                ws.Cells[9, 15].Value = "Bricks";
                ws.Cells[9, 15].Style.Font.Name = "Verdana";
                ws.Cells[9, 15].Style.Font.Size = 10;
                ws.Cells[9, 15].Style.Font.Bold = true;
                ws.Cells[9, 15].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[9, 15].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[9, 15].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(16).Width = 19.29;
                ws.Cells[9, 16].Value = "EmployeesNames";
                ws.Cells[9, 16].Style.Font.Name = "Verdana";
                ws.Cells[9, 16].Style.Font.Size = 10;
                ws.Cells[9, 16].Style.Font.Bold = true;
                ws.Cells[9, 16].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[9, 16].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[9, 16].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(17).Width = 19.29;
                ws.Cells[9, 17].Value = "SPO Login ID";
                ws.Cells[9, 17].Style.Font.Name = "Verdana";
                ws.Cells[9, 17].Style.Font.Size = 10;
                ws.Cells[9, 17].Style.Font.Bold = true;
                ws.Cells[9, 17].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[9, 17].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[9, 17].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));


                ws.Column(18).Width = 16.43;
                ws.Cells[9, 18].Value = "Designations";
                ws.Cells[9, 18].Style.Font.Name = "Verdana";
                ws.Cells[9, 18].Style.Font.Size = 10;
                ws.Cells[9, 18].Style.Font.Bold = true;
                ws.Cells[9, 18].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[9, 18].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[9, 18].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(19).Width = 16.29;
                ws.Cells[9, 19].Value = "SPO's Teams";
                ws.Cells[9, 19].Style.Font.Name = "Verdana";
                ws.Cells[9, 19].Style.Font.Size = 10;
                ws.Cells[9, 19].Style.Font.Bold = true;
                ws.Cells[9, 19].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[9, 19].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[9, 19].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));



                int row3 = 10;
                int col3 = 1;


                foreach (DataRow rw in table.Rows)
                {
                    foreach (DataColumn cl in table.Columns)
                    {
                        if (rw[cl.ColumnName] != DBNull.Value)
                        {

                            ws.Cells[row3, col3].Value = string.IsNullOrWhiteSpace(rw[cl.ColumnName].ToString()) ? " " : rw[cl.ColumnName].ToString();
                            ws.Cells[row3, col3].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                            ws.Cells[row3, col3].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                            ws.Cells[row3, col3].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                            ws.Cells[row3, col3].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                            ws.Cells[row3, col3].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                            ws.Cells[row3, col3].Style.Font.Name = "Verdana";
                            ws.Cells[row3, col3].Style.Font.Size = 10;

                            col3++;
                        }

                    }
                    col3 = 1;
                    row3++;
                }

                //---------------------Evening------------------------//





                //int row4 = 10;
                //int col4 = 10;

                //foreach (DataRow rw1 in table.Rows)
                //{
                //    foreach (DataColumn cl1 in table.Columns)
                //    {
                //        if (rw1[cl1.ColumnName] != DBNull.Value)
                //        {

                //            ws.Cells[row4, col4].Value = string.IsNullOrWhiteSpace(rw1[cl1.ColumnName].ToString()) ? "--" : rw1[cl1.ColumnName].ToString();
                //            ws.Cells[row4, col4].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //            ws.Cells[row4, col4].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row4, col4].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row4, col4].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row4, col4].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row4, col4].Style.Font.Name = "Verdana";
                //            ws.Cells[row4, col4].Style.Font.Size = 10;

                //            col4++;
                //        }

                //    }
                //    col4 = 10;
                //    row4++;
                //}




                //int row4 = 10;
                //int col4 = 1;

                //foreach (DataRow rw in table1.Rows)
                //{
                //    foreach (DataColumn cl in table1.Columns)
                //    {
                //        if (rw[cl.ColumnName] != DBNull.Value)
                //        {

                //            ws.Cells[row4, col4].Value = string.IsNullOrWhiteSpace(rw[cl.ColumnName].ToString()) ? "--" : rw[cl.ColumnName].ToString();
                //            ws.Cells[row4, col4].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //            ws.Cells[row4, col4].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row4, col4].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row4, col4].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row4, col4].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row4, col4].Style.Font.Name = "Verdana";
                //            ws.Cells[row4, col4].Style.Font.Size = 10;

                //            col4++;
                //        }

                //    }
                //    col4 = 1;
                //    row4++;
                //}



                pack.Save();

                #region Download Work

                var filenamef = fileInfo.FullName.ToString();
                Session["WorkPlanBySPOInExcel"] = "Work-Plan-By-SPO-Report-Excel-" + Convert.ToDateTime(dt1).ToString("MMM") + ".xlsx";

                #endregion

                #endregion Formatting

            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Work Plan By SPO In Excel Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "WorkPlanBySPOInExcel";

        }



        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string WorkPlanByDSMInExcel(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus, string EmpType)
        {
            try
            {
                DataTable dt = null;

                #region CreatingWorksheet
                int Year = Convert.ToDateTime(dt1).Year;
                string Month = Convert.ToDateTime(dt1).ToString("MMM");
                string Date = Convert.ToDateTime(dt1).ToString("dd-MMM-yyyy");
                int Month1 = Convert.ToDateTime(dt1).Month;
                string MontYear = Month + "-" + Year;
                int da = DateTime.DaysInMonth(Year, Convert.ToDateTime(dt1).Month);
                string GridFillData = "";

                //If Folder is not exist in server then create else map file
                string tempfolder = System.AppDomain.CurrentDomain.BaseDirectory + "Excels\\DSM_Report";
                string temppath = tempfolder;

                if (!Directory.Exists(temppath))
                {
                    Directory.CreateDirectory(temppath);
                }

                string path = Server.MapPath("~/Excels/DSM_Report");

                var fileInfo = new FileInfo(path + @"\Work-Plan-By-DSM-Report-Excel-" + Convert.ToDateTime(dt1).ToString("MMM") + ".xlsx");

                //If Same file Excel is exist then delete (nessesary)
                if (fileInfo.Exists)
                    fileInfo.Delete();

                var pack = new ExcelPackage(fileInfo);
                ExcelWorksheet ws;
                if (pack.Workbook.Worksheets.Count > 0)
                {
                    ws = pack.Workbook.Worksheets["WorkPlanByDSMInExcel"];
                    pack.Workbook.Worksheets.Delete(ws.Index);
                    ws = pack.Workbook.Worksheets.Add("WorkPlanByDSMInExcel");
                }
                else
                {
                    ws = pack.Workbook.Worksheets.Add("WorkPlanByDSMInExcel");
                }

                #endregion

                #region Data

                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Clear();
                //_nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                //_nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-int", level3Id.ToString());
                _nvCollection.Add("@Level4ID-int", level4Id.ToString());
                _nvCollection.Add("@Level5ID-int", level5Id.ToString());
                _nvCollection.Add("@Level6ID-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                _nvCollection.Add("@EmpStatus-INT", empstatus.ToString());
                _nvCollection.Add("@Year-nvarchar(max)", Year.ToString());
                _nvCollection.Add("@Month-nvarchar(max)", Month1.ToString());
                //_nvCollection.Add("@TeamID-int", TeamID.ToString());
                DataSet ds = GetData("sp_WorkPlanBYDSM_Excel", _nvCollection);
                DataTable table = ds.Tables[0];
                //DataTable table1 = ds.Tables[1];
                #endregion

                #region formating

                ws.Row(1).Height = 25.50;
                ws.Column(1).Hidden = true;
                ws.Column(2).Hidden = true;
                ws.Cells["A1:Y1"].Merge = true;
                ws.Cells["A1:Y1"].Value = "ATCO LABORATORIES LIMITED";
                ws.Cells["A1:Y1"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells["A1:Y1"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Cells["A1:Y1"].Style.Font.Name = "Arial";
                ws.Cells["A1:Y1"].Style.Font.Size = 20;
                ws.Cells["A1:Y1"].Style.Font.Bold = true;
                ws.Cells["A1:Y1"].Style.Font.Color.SetColor(Color.Black);
                //ws.Cells["A1:O1"].Style.Font.Color.SetColor(Color.FromArgb(255, 255, 255));
                //ws.Cells["A1:O1"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                //ws.Cells["A1:O1"].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(52, 152, 219));
                ws.Cells["A1:Y1"].Style.WrapText = true;

                ws.Row(2).Height = 25.50;
                ws.Column(1).Hidden = true;
                ws.Column(2).Hidden = true;
                ws.Cells["A2:Y2"].Merge = true;
                ws.Cells["A2:Y2"].Value = "WORK PLAN";
                ws.Cells["A2:Y2"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells["A2:Y2"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Cells["A2:Y2"].Style.Font.Name = "Arial";
                ws.Cells["A2:Y2"].Style.Font.Size = 20;
                ws.Cells["A2:Y2"].Style.Font.Bold = true;
                ws.Cells["A2:Y2"].Style.Font.Color.SetColor(Color.Black);
                //ws.Cells["A2:O2"].Style.Font.Color.SetColor(Color.FromArgb(255, 255, 255));
                //ws.Cells["A2:O2"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                //ws.Cells["A2:O2"].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(52, 152, 219));
                ws.Cells["A2:Y2"].Style.WrapText = true;




                ws.Cells[4, 1].Value = "EmployeeName";
                ws.Cells[4, 1].Style.Font.Name = "Verdana";
                ws.Cells[4, 1].Style.Font.Size = 12;
                ws.Cells[4, 1].Style.Font.Bold = true;

                ws.Cells["B4:C4"].Merge = true;
                ws.Cells["B4:C4"].Value = ds.Tables[0].Rows[0][9];
                ws.Cells["B4:C4"].Style.Font.Name = "Verdana";
                ws.Cells["B4:C4"].Style.Font.Size = 12;
                ws.Cells["B4:C4"].Style.Font.Bold = true;


                ws.Cells[4, 4].Value = "Designation";
                ws.Cells[4, 4].Style.Font.Name = "Verdana";
                ws.Cells[4, 4].Style.Font.Size = 12;
                ws.Cells[4, 4].Style.Font.Bold = true;

                ws.Cells[4, 5].Value = ds.Tables[0].Rows[0][11];
                ws.Cells[4, 5].Style.Font.Name = "Verdana";
                ws.Cells[4, 5].Style.Font.Size = 12;
                ws.Cells[4, 5].Style.Font.Bold = true;


                ws.Cells[4, 7].Value = "Month";
                ws.Cells[4, 7].Style.Font.Name = "Verdana";
                ws.Cells[4, 7].Style.Font.Size = 12;
                ws.Cells[4, 7].Style.Font.Bold = true;

                ws.Cells[4, 8].Value = MontYear;
                ws.Cells[4, 8].Style.Font.Name = "Verdana";
                ws.Cells[4, 8].Style.Font.Size = 12;
                ws.Cells[4, 8].Style.Font.Bold = true;

                ws.Cells[6, 1].Value = "Team";
                ws.Cells[6, 1].Style.Font.Name = "Verdana";
                ws.Cells[6, 1].Style.Font.Size = 12;
                ws.Cells[6, 1].Style.Font.Bold = true;

                ws.Cells[6, 2].Value = ds.Tables[0].Rows[0][8];
                ws.Cells[6, 2].Style.Font.Name = "Verdana";
                ws.Cells[6, 2].Style.Font.Size = 12;
                ws.Cells[6, 2].Style.Font.Bold = true;

                ws.Cells[6, 4].Value = "BaseStation";
                ws.Cells[6, 4].Style.Font.Name = "Verdana";
                ws.Cells[6, 4].Style.Font.Size = 12;
                ws.Cells[6, 4].Style.Font.Bold = true;

                ws.Cells[6, 5].Value = ds.Tables[0].Rows[0][3];
                ws.Cells[6, 5].Style.Font.Name = "Verdana";
                ws.Cells[6, 5].Style.Font.Size = 12;
                ws.Cells[6, 5].Style.Font.Bold = true;

                ws.Row(1).Height = 80.50;
                ws.Column(1).Hidden = true;
                ws.Column(2).Hidden = true;
                ws.Cells["A8:L8"].Merge = true;
                ws.Cells["A8:L8"].Value = "MORNING";
                ws.Cells["A8:L8"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells["A8:L8"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Cells["A8:L8"].Style.Font.Name = "Arial";
                ws.Cells["A8:L8"].Style.Font.Size = 18;
                ws.Cells["A8:L8"].Style.Font.Bold = true;
                ws.Cells["A8:L8"].Style.Font.Color.SetColor(Color.Black);
                //ws.Cells["A2:O2"].Style.Font.Color.SetColor(Color.FromArgb(255, 255, 255));
                //ws.Cells["A2:O2"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                // ws.Cells["A2:O2"].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(52, 152, 219));
                ws.Cells["A8:L8"].Style.WrapText = true;

                ws.Row(1).Height = 80.50;
                ws.Column(1).Hidden = true;
                ws.Column(2).Hidden = true;
                ws.Cells["N8:Y8"].Merge = true;
                ws.Cells["N8:Y8"].Value = "EVENING";
                ws.Cells["N8:Y8"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells["N8:Y8"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Cells["N8:Y8"].Style.Font.Name = "Arial";
                ws.Cells["N8:Y8"].Style.Font.Size = 18;
                ws.Cells["N8:Y8"].Style.Font.Bold = true;
                ws.Cells["N8:Y8"].Style.Font.Color.SetColor(Color.Black);
                //ws.Cells["A2:O2"].Style.Font.Color.SetColor(Color.FromArgb(255, 255, 255));
                //ws.Cells["A2:O2"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                // ws.Cells["A2:O2"].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(52, 152, 219));
                ws.Cells["N8:Y8"].Style.WrapText = true;

                int rowHeader = 1;
                int columnHeader = 1;
                var colCount = table.Columns.Count;

                ws.Column(1).Width = 20.00;
                ws.Cells[10, 1].Value = "Date";
                ws.Cells[10, 1].Style.Font.Name = "Verdana";
                ws.Cells[10, 1].Style.Font.Size = 10;
                ws.Cells[10, 1].Style.Font.Bold = true;
                ws.Cells[10, 1].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 1].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 1].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(2).Width = 11.57;
                ws.Cells[10, 2].Value = "Day";
                ws.Cells[10, 2].Style.Font.Name = "Verdana";
                ws.Cells[10, 2].Style.Font.Size = 10;
                ws.Cells[10, 2].Style.Font.Bold = true;
                ws.Cells[10, 2].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 2].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 2].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(3).Width = 8.86;
                ws.Cells[10, 3].Value = "Time";
                ws.Cells[10, 3].Style.Font.Name = "Verdana";
                ws.Cells[10, 3].Style.Font.Size = 10;
                ws.Cells[10, 3].Style.Font.Bold = true;
                ws.Cells[10, 3].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 3].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 3].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(4).Width = 18.43;
                ws.Cells[10, 4].Value = "Brick City";
                ws.Cells[10, 4].Style.Font.Name = "Verdana";
                ws.Cells[10, 4].Style.Font.Size = 10;
                ws.Cells[10, 4].Style.Font.Bold = true;
                ws.Cells[10, 4].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 4].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 4].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(5).Width = 27.86;
                ws.Cells[10, 5].Value = "Brick";
                ws.Cells[10, 5].Style.Font.Name = "Verdana";
                ws.Cells[10, 5].Style.Font.Size = 10;
                ws.Cells[10, 5].Style.Font.Bold = true;
                ws.Cells[10, 5].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 5].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 5].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));


                ws.Column(6).Width = 22.14;
                ws.Cells[10, 6].Value = "Employee Name";
                ws.Cells[10, 6].Style.Font.Name = "Verdana";
                ws.Cells[10, 6].Style.Font.Size = 10;
                ws.Cells[10, 6].Style.Font.Bold = true;
                ws.Cells[10, 6].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 6].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 6].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(7).Width = 22.14;
                ws.Cells[10, 7].Value = "SPO LoginID";
                ws.Cells[10, 7].Style.Font.Name = "Verdana";
                ws.Cells[10, 7].Style.Font.Size = 10;
                ws.Cells[10, 7].Style.Font.Bold = true;
                ws.Cells[10, 7].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 7].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 7].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));


                ws.Column(8).Width = 13.00;
                ws.Cells[10, 8].Value = "Designation";
                ws.Cells[10, 8].Style.Font.Name = "Verdana";
                ws.Cells[10, 8].Style.Font.Size = 10;
                ws.Cells[10, 8].Style.Font.Bold = true;
                ws.Cells[10, 8].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 8].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 8].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));


                ws.Column(9).Width = 13.00;
                ws.Cells[10, 9].Value = "SPO's Team";
                ws.Cells[10, 9].Style.Font.Name = "Verdana";
                ws.Cells[10, 9].Style.Font.Size = 10;
                ws.Cells[10, 9].Style.Font.Bold = true;
                ws.Cells[10, 9].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 9].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 9].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(10).Width = 16.29;
                ws.Cells[10, 10].Value = "Manager Name";
                ws.Cells[10, 10].Style.Font.Name = "Verdana";
                ws.Cells[10, 10].Style.Font.Size = 10;
                ws.Cells[10, 10].Style.Font.Bold = true;
                ws.Cells[10, 10].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 10].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 10].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(11).Width = 16.29;
                ws.Cells[10, 11].Value = "Manager LoginID";
                ws.Cells[10, 11].Style.Font.Name = "Verdana";
                ws.Cells[10, 11].Style.Font.Size = 10;
                ws.Cells[10, 11].Style.Font.Bold = true;
                ws.Cells[10, 11].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 11].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 11].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(12).Width = 22.86;
                ws.Cells[10, 12].Value = "Manager Designation";
                ws.Cells[10, 12].Style.Font.Name = "Verdana";
                ws.Cells[10, 12].Style.Font.Size = 10;
                ws.Cells[10, 12].Style.Font.Bold = true;
                ws.Cells[10, 12].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 12].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 12].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(14).Width = 11.43;
                ws.Cells[10, 14].Value = " Date";
                ws.Cells[10, 14].Style.Font.Name = "Verdana";
                ws.Cells[10, 14].Style.Font.Size = 10;
                ws.Cells[10, 14].Style.Font.Bold = true;
                ws.Cells[10, 14].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 14].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 14].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(15).Width = 11.14;
                ws.Cells[10, 15].Value = " Day";
                ws.Cells[10, 15].Style.Font.Name = "Verdana";
                ws.Cells[10, 15].Style.Font.Size = 10;
                ws.Cells[10, 15].Style.Font.Bold = true;
                ws.Cells[10, 15].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 15].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 15].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(16).Width = 8.86;
                ws.Cells[10, 16].Value = " Time";
                ws.Cells[10, 16].Style.Font.Name = "Verdana";
                ws.Cells[10, 16].Style.Font.Size = 10;
                ws.Cells[10, 16].Style.Font.Bold = true;
                ws.Cells[10, 16].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 16].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 16].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));



                ws.Column(17).Width = 18.43;
                ws.Cells[10, 17].Value = "BrickCity";
                ws.Cells[10, 17].Style.Font.Name = "Verdana";
                ws.Cells[10, 17].Style.Font.Size = 10;
                ws.Cells[10, 17].Style.Font.Bold = true;
                ws.Cells[10, 17].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 17].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 17].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(18).Width = 27.86;
                ws.Cells[10, 18].Value = "Bricks";
                ws.Cells[10, 18].Style.Font.Name = "Verdana";
                ws.Cells[10, 18].Style.Font.Size = 10;
                ws.Cells[10, 18].Style.Font.Bold = true;
                ws.Cells[10, 18].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 18].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 18].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(19).Width = 22.14;
                ws.Cells[10, 19].Value = "EmployeesNames";
                ws.Cells[10, 19].Style.Font.Name = "Verdana";
                ws.Cells[10, 19].Style.Font.Size = 10;
                ws.Cells[10, 19].Style.Font.Bold = true;
                ws.Cells[10, 19].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 19].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 19].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(20).Width = 22.14;
                ws.Cells[10, 20].Value = "SPO LoginID";
                ws.Cells[10, 20].Style.Font.Name = "Verdana";
                ws.Cells[10, 20].Style.Font.Size = 10;
                ws.Cells[10, 20].Style.Font.Bold = true;
                ws.Cells[10, 20].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 20].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 20].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));


                ws.Column(21).Width = 14.14;
                ws.Cells[10, 21].Value = "Designations";
                ws.Cells[10, 21].Style.Font.Name = "Verdana";
                ws.Cells[10, 21].Style.Font.Size = 10;
                ws.Cells[10, 21].Style.Font.Bold = true;
                ws.Cells[10, 21].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 21].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 21].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(22).Width = 14.00;
                ws.Cells[10, 22].Value = "SPO's Teams";
                ws.Cells[10, 22].Style.Font.Name = "Verdana";
                ws.Cells[10, 22].Style.Font.Size = 10;
                ws.Cells[10, 22].Style.Font.Bold = true;
                ws.Cells[10, 22].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 22].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 22].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(23).Width = 16.29;
                ws.Cells[10, 23].Value = "Manager Name";
                ws.Cells[10, 23].Style.Font.Name = "Verdana";
                ws.Cells[10, 23].Style.Font.Size = 10;
                ws.Cells[10, 23].Style.Font.Bold = true;
                ws.Cells[10, 23].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 23].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 23].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(24).Width = 16.29;
                ws.Cells[10, 24].Value = "Manager LoginID";
                ws.Cells[10, 24].Style.Font.Name = "Verdana";
                ws.Cells[10, 24].Style.Font.Size = 10;
                ws.Cells[10, 24].Style.Font.Bold = true;
                ws.Cells[10, 24].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 24].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 24].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(25).Width = 22.86;
                ws.Cells[10, 25].Value = "Manager Designation";
                ws.Cells[10, 25].Style.Font.Name = "Verdana";
                ws.Cells[10, 25].Style.Font.Size = 10;
                ws.Cells[10, 25].Style.Font.Bold = true;
                ws.Cells[10, 25].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 25].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 25].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));


                int row3 = 11;
                int col3 = 1;

                foreach (DataRow rw in table.Rows)
                {
                    foreach (DataColumn cl in table.Columns)
                    {
                        if (rw[cl.ColumnName] != DBNull.Value)
                        {

                            ws.Cells[row3, col3].Value = string.IsNullOrWhiteSpace(rw[cl.ColumnName].ToString()) ? " " : rw[cl.ColumnName].ToString();
                            ws.Cells[row3, col3].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                            ws.Cells[row3, col3].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                            ws.Cells[row3, col3].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                            ws.Cells[row3, col3].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                            ws.Cells[row3, col3].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                            ws.Cells[row3, col3].Style.Font.Name = "Verdana";
                            ws.Cells[row3, col3].Style.Font.Size = 10;

                            col3++;
                        }

                    }
                    col3 = 1;
                    row3++;
                }


                //---------------------Evening------------------------//





                //int row4 = 11;
                //int col4 = 12;

                //foreach (DataRow rw1 in table1.Rows)
                //{
                //    foreach (DataColumn cl1 in table1.Columns)
                //    {
                //        if (rw1[cl1.ColumnName] != DBNull.Value)
                //        {

                //            ws.Cells[row4, col4].Value = string.IsNullOrWhiteSpace(rw1[cl1.ColumnName].ToString()) ? "--" : rw1[cl1.ColumnName].ToString();
                //            ws.Cells[row4, col4].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //            ws.Cells[row4, col4].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row4, col4].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row4, col4].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row4, col4].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row4, col4].Style.Font.Name = "Verdana";
                //            ws.Cells[row4, col4].Style.Font.Size = 10;

                //            col4++;
                //        }

                //    }
                //    col4 = 12;
                //    row4++;
                //}




                //int row4 = 10;
                //int col4 = 1;

                //foreach (DataRow rw in table1.Rows)
                //{
                //    foreach (DataColumn cl in table1.Columns)
                //    {
                //        if (rw[cl.ColumnName] != DBNull.Value)
                //        {

                //            ws.Cells[row4, col4].Value = string.IsNullOrWhiteSpace(rw[cl.ColumnName].ToString()) ? "--" : rw[cl.ColumnName].ToString();
                //            ws.Cells[row4, col4].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //            ws.Cells[row4, col4].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row4, col4].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row4, col4].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row4, col4].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row4, col4].Style.Font.Name = "Verdana";
                //            ws.Cells[row4, col4].Style.Font.Size = 10;

                //            col4++;
                //        }

                //    }
                //    col4 = 1;
                //    row4++;
                //}



                pack.Save();

                #region Download Work

                var filenamef = fileInfo.FullName.ToString();
                Session["WorkPlanByDSMInExcel"] = "Work-Plan-By-DSM-Report-Excel-" + Convert.ToDateTime(dt1).ToString("MMM") + ".xlsx";

                #endregion


                #endregion


            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Work Plan By DSM In Excel Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "WorkPlanByDSMInExcel";

        }




        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string WorkPlanBySMInExcel(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus, string EmpType)
        {
            try
            {
                DataTable dt = null;

                #region CreatingWorksheet
                int Year = Convert.ToDateTime(dt1).Year;
                string Month = Convert.ToDateTime(dt1).ToString("MMM");
                string Date = Convert.ToDateTime(dt1).ToString("dd-MMM-yyyy");
                int Month1 = Convert.ToDateTime(dt1).Month;
                string MontYear = Month + "-" + Year;
                int da = DateTime.DaysInMonth(Year, Convert.ToDateTime(dt1).Month);
                string GridFillData = "";

                //If Folder is not exist in server then create else map file
                string tempfolder = System.AppDomain.CurrentDomain.BaseDirectory + "Excels\\SM_Report";
                string temppath = tempfolder;

                if (!Directory.Exists(temppath))
                {
                    Directory.CreateDirectory(temppath);
                }

                string path = Server.MapPath("~/Excels/SM_Report");

                var fileInfo = new FileInfo(path + @"\Work-Plan-By-SM-Report-Excel-" + Convert.ToDateTime(dt1).ToString("MMM") + ".xlsx");

                //If Same file Excel is exist then delete (nessesary)
                if (fileInfo.Exists)
                    fileInfo.Delete();

                var pack = new ExcelPackage(fileInfo);
                ExcelWorksheet ws;
                if (pack.Workbook.Worksheets.Count > 0)
                {
                    ws = pack.Workbook.Worksheets["WorkPlanBySMInExcel"];
                    pack.Workbook.Worksheets.Delete(ws.Index);
                    ws = pack.Workbook.Worksheets.Add("WorkPlanBySMInExcel");
                }
                else
                {
                    ws = pack.Workbook.Worksheets.Add("WorkPlanBySMInExcel");
                }

                #endregion

                #region Data

                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Clear();
                //_nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                //_nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-int", level3Id.ToString());
                _nvCollection.Add("@Level4ID-int", level4Id.ToString());
                _nvCollection.Add("@Level5ID-int", level5Id.ToString());
                _nvCollection.Add("@Level6ID-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                _nvCollection.Add("@EmpStatus-INT", empstatus.ToString());
                _nvCollection.Add("@Year-nvarchar(max)", Year.ToString());
                _nvCollection.Add("@Month-nvarchar(max)", Month1.ToString());
                //_nvCollection.Add("@TeamID-int", TeamID.ToString());
                DataSet ds = GetData("sp_WorkPlanBYSM_Excel", _nvCollection);
                DataTable table = ds.Tables[0];
                //DataTable table1 = ds.Tables[1];
                #endregion

                #region formating

                ws.Row(1).Height = 25.50;
                ws.Column(1).Hidden = true;
                ws.Column(2).Hidden = true;
                ws.Cells["A1:Y1"].Merge = true;
                ws.Cells["A1:Y1"].Value = "ATCO LABORATORIES LIMITED";
                ws.Cells["A1:Y1"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells["A1:Y1"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Cells["A1:Y1"].Style.Font.Name = "Arial";
                ws.Cells["A1:Y1"].Style.Font.Size = 20;
                ws.Cells["A1:Y1"].Style.Font.Bold = true;
                ws.Cells["A1:Y1"].Style.Font.Color.SetColor(Color.Black);
                //ws.Cells["A1:O1"].Style.Font.Color.SetColor(Color.FromArgb(255, 255, 255));
                //ws.Cells["A1:O1"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                //ws.Cells["A1:O1"].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(52, 152, 219));
                ws.Cells["A1:Y1"].Style.WrapText = true;

                ws.Row(2).Height = 25.50;
                ws.Column(1).Hidden = true;
                ws.Column(2).Hidden = true;
                ws.Cells["A2:Y2"].Merge = true;
                ws.Cells["A2:Y2"].Value = "WORK PLAN";
                ws.Cells["A2:Y2"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells["A2:Y2"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Cells["A2:Y2"].Style.Font.Name = "Arial";
                ws.Cells["A2:Y2"].Style.Font.Size = 20;
                ws.Cells["A2:Y2"].Style.Font.Bold = true;
                ws.Cells["A2:Y2"].Style.Font.Color.SetColor(Color.Black);
                //ws.Cells["A2:O2"].Style.Font.Color.SetColor(Color.FromArgb(255, 255, 255));
                //ws.Cells["A2:O2"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                //ws.Cells["A2:O2"].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(52, 152, 219));
                ws.Cells["A2:Y2"].Style.WrapText = true;




                ws.Cells[4, 1].Value = "EmployeeName";
                ws.Cells[4, 1].Style.Font.Name = "Verdana";
                ws.Cells[4, 1].Style.Font.Size = 12;
                ws.Cells[4, 1].Style.Font.Bold = true;

                ws.Cells["B4:C4"].Merge = true;
                ws.Cells["B4:C4"].Value = ds.Tables[0].Rows[0][8];
                ws.Cells["B4:C4"].Style.Font.Name = "Verdana";
                ws.Cells["B4:C4"].Style.Font.Size = 12;
                ws.Cells["B4:C4"].Style.Font.Bold = true;


                ws.Cells[4, 4].Value = "Designation";
                ws.Cells[4, 4].Style.Font.Name = "Verdana";
                ws.Cells[4, 4].Style.Font.Size = 12;
                ws.Cells[4, 4].Style.Font.Bold = true;

                ws.Cells[4, 5].Value = ds.Tables[0].Rows[0][11];
                ws.Cells[4, 5].Style.Font.Name = "Verdana";
                ws.Cells[4, 5].Style.Font.Size = 12;
                ws.Cells[4, 5].Style.Font.Bold = true;


                ws.Cells[4, 7].Value = "Month";
                ws.Cells[4, 7].Style.Font.Name = "Verdana";
                ws.Cells[4, 7].Style.Font.Size = 12;
                ws.Cells[4, 7].Style.Font.Bold = true;

                ws.Cells[4, 8].Value = MontYear;
                ws.Cells[4, 8].Style.Font.Name = "Verdana";
                ws.Cells[4, 8].Style.Font.Size = 12;
                ws.Cells[4, 8].Style.Font.Bold = true;

                ws.Cells[6, 1].Value = "Team";
                ws.Cells[6, 1].Style.Font.Name = "Verdana";
                ws.Cells[6, 1].Style.Font.Size = 12;
                ws.Cells[6, 1].Style.Font.Bold = true;

                ws.Cells[6, 2].Value = ds.Tables[0].Rows[0][8];
                ws.Cells[6, 2].Style.Font.Name = "Verdana";
                ws.Cells[6, 2].Style.Font.Size = 12;
                ws.Cells[6, 2].Style.Font.Bold = true;

                ws.Cells[6, 4].Value = "BaseStation";
                ws.Cells[6, 4].Style.Font.Name = "Verdana";
                ws.Cells[6, 4].Style.Font.Size = 12;
                ws.Cells[6, 4].Style.Font.Bold = true;

                ws.Cells[6, 5].Value = ds.Tables[0].Rows[0][3];
                ws.Cells[6, 5].Style.Font.Name = "Verdana";
                ws.Cells[6, 5].Style.Font.Size = 12;
                ws.Cells[6, 5].Style.Font.Bold = true;

                ws.Row(1).Height = 80.50;
                ws.Column(1).Hidden = true;
                ws.Column(2).Hidden = true;
                ws.Cells["A8:L8"].Merge = true;
                ws.Cells["A8:L8"].Value = "MORNING";
                ws.Cells["A8:L8"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells["A8:L8"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Cells["A8:L8"].Style.Font.Name = "Arial";
                ws.Cells["A8:L8"].Style.Font.Size = 18;
                ws.Cells["A8:L8"].Style.Font.Bold = true;
                ws.Cells["A8:L8"].Style.Font.Color.SetColor(Color.Black);
                //ws.Cells["A2:O2"].Style.Font.Color.SetColor(Color.FromArgb(255, 255, 255));
                //ws.Cells["A2:O2"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                // ws.Cells["A2:O2"].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(52, 152, 219));
                ws.Cells["A8:L8"].Style.WrapText = true;

                ws.Row(1).Height = 80.50;
                ws.Column(1).Hidden = true;
                ws.Column(2).Hidden = true;
                ws.Cells["N8:Y8"].Merge = true;
                ws.Cells["N8:Y8"].Value = "EVENING";
                ws.Cells["N8:Y8"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells["N8:Y8"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Cells["N8:Y8"].Style.Font.Name = "Arial";
                ws.Cells["N8:Y8"].Style.Font.Size = 18;
                ws.Cells["N8:Y8"].Style.Font.Bold = true;
                ws.Cells["N8:Y8"].Style.Font.Color.SetColor(Color.Black);
                //ws.Cells["A2:O2"].Style.Font.Color.SetColor(Color.FromArgb(255, 255, 255));
                //ws.Cells["A2:O2"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                // ws.Cells["A2:O2"].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(52, 152, 219));
                ws.Cells["N8:Y8"].Style.WrapText = true;

                int rowHeader = 1;
                int columnHeader = 1;
                var colCount = table.Columns.Count;

                ws.Column(1).Width = 20.00;
                ws.Cells[10, 1].Value = "Date";
                ws.Cells[10, 1].Style.Font.Name = "Verdana";
                ws.Cells[10, 1].Style.Font.Size = 10;
                ws.Cells[10, 1].Style.Font.Bold = true;
                ws.Cells[10, 1].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 1].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 1].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(2).Width = 11.57;
                ws.Cells[10, 2].Value = "Day";
                ws.Cells[10, 2].Style.Font.Name = "Verdana";
                ws.Cells[10, 2].Style.Font.Size = 10;
                ws.Cells[10, 2].Style.Font.Bold = true;
                ws.Cells[10, 2].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 2].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 2].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(3).Width = 8.86;
                ws.Cells[10, 3].Value = "Time";
                ws.Cells[10, 3].Style.Font.Name = "Verdana";
                ws.Cells[10, 3].Style.Font.Size = 10;
                ws.Cells[10, 3].Style.Font.Bold = true;
                ws.Cells[10, 3].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 3].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 3].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(4).Width = 18.43;
                ws.Cells[10, 4].Value = "Brick City";
                ws.Cells[10, 4].Style.Font.Name = "Verdana";
                ws.Cells[10, 4].Style.Font.Size = 10;
                ws.Cells[10, 4].Style.Font.Bold = true;
                ws.Cells[10, 4].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 4].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 4].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(5).Width = 27.86;
                ws.Cells[10, 5].Value = "Brick";
                ws.Cells[10, 5].Style.Font.Name = "Verdana";
                ws.Cells[10, 5].Style.Font.Size = 10;
                ws.Cells[10, 5].Style.Font.Bold = true;
                ws.Cells[10, 5].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 5].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 5].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));


                ws.Column(6).Width = 22.14;
                ws.Cells[10, 6].Value = "Employee Name";
                ws.Cells[10, 6].Style.Font.Name = "Verdana";
                ws.Cells[10, 6].Style.Font.Size = 10;
                ws.Cells[10, 6].Style.Font.Bold = true;
                ws.Cells[10, 6].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 6].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 6].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(7).Width = 22.14;
                ws.Cells[10, 7].Value = "SPO LoginID";
                ws.Cells[10, 7].Style.Font.Name = "Verdana";
                ws.Cells[10, 7].Style.Font.Size = 10;
                ws.Cells[10, 7].Style.Font.Bold = true;
                ws.Cells[10, 7].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 7].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 7].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));



                ws.Column(8).Width = 13.00;
                ws.Cells[10, 8].Value = "Designation";
                ws.Cells[10, 8].Style.Font.Name = "Verdana";
                ws.Cells[10, 8].Style.Font.Size = 10;
                ws.Cells[10, 8].Style.Font.Bold = true;
                ws.Cells[10, 8].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 8].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 8].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));


                ws.Column(9).Width = 13.00;
                ws.Cells[10, 9].Value = "SPO's Team";
                ws.Cells[10, 9].Style.Font.Name = "Verdana";
                ws.Cells[10, 9].Style.Font.Size = 10;
                ws.Cells[10, 9].Style.Font.Bold = true;
                ws.Cells[10, 9].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 9].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 9].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(10).Width = 16.29;
                ws.Cells[10, 10].Value = "Manager Name";
                ws.Cells[10, 10].Style.Font.Name = "Verdana";
                ws.Cells[10, 10].Style.Font.Size = 10;
                ws.Cells[10, 10].Style.Font.Bold = true;
                ws.Cells[10, 10].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 10].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 10].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(11).Width = 16.29;
                ws.Cells[10, 11].Value = "Manager LoginID";
                ws.Cells[10, 11].Style.Font.Name = "Verdana";
                ws.Cells[10, 11].Style.Font.Size = 10;
                ws.Cells[10, 11].Style.Font.Bold = true;
                ws.Cells[10, 11].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 11].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 11].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(12).Width = 22.86;
                ws.Cells[10, 12].Value = "Manager Designation";
                ws.Cells[10, 12].Style.Font.Name = "Verdana";
                ws.Cells[10, 12].Style.Font.Size = 10;
                ws.Cells[10, 12].Style.Font.Bold = true;
                ws.Cells[10, 12].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 12].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 12].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(14).Width = 11.43;
                ws.Cells[10, 14].Value = " Date";
                ws.Cells[10, 14].Style.Font.Name = "Verdana";
                ws.Cells[10, 14].Style.Font.Size = 10;
                ws.Cells[10, 14].Style.Font.Bold = true;
                ws.Cells[10, 14].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 14].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 14].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(15).Width = 11.14;
                ws.Cells[10, 15].Value = " Day";
                ws.Cells[10, 15].Style.Font.Name = "Verdana";
                ws.Cells[10, 15].Style.Font.Size = 10;
                ws.Cells[10, 15].Style.Font.Bold = true;
                ws.Cells[10, 15].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 15].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 15].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(16).Width = 8.86;
                ws.Cells[10, 16].Value = " Time";
                ws.Cells[10, 16].Style.Font.Name = "Verdana";
                ws.Cells[10, 16].Style.Font.Size = 10;
                ws.Cells[10, 16].Style.Font.Bold = true;
                ws.Cells[10, 16].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 16].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 16].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));



                ws.Column(17).Width = 18.43;
                ws.Cells[10, 17].Value = "BrickCity";
                ws.Cells[10, 17].Style.Font.Name = "Verdana";
                ws.Cells[10, 17].Style.Font.Size = 10;
                ws.Cells[10, 17].Style.Font.Bold = true;
                ws.Cells[10, 17].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 17].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 17].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(18).Width = 27.86;
                ws.Cells[10, 18].Value = "Bricks";
                ws.Cells[10, 18].Style.Font.Name = "Verdana";
                ws.Cells[10, 18].Style.Font.Size = 10;
                ws.Cells[10, 18].Style.Font.Bold = true;
                ws.Cells[10, 18].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 18].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 18].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(19).Width = 22.14;
                ws.Cells[10, 19].Value = "EmployeesNames";
                ws.Cells[10, 19].Style.Font.Name = "Verdana";
                ws.Cells[10, 19].Style.Font.Size = 10;
                ws.Cells[10, 19].Style.Font.Bold = true;
                ws.Cells[10, 19].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 19].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 19].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(20).Width = 22.14;
                ws.Cells[10, 20].Value = "SPO LoginID";
                ws.Cells[10, 20].Style.Font.Name = "Verdana";
                ws.Cells[10, 20].Style.Font.Size = 10;
                ws.Cells[10, 20].Style.Font.Bold = true;
                ws.Cells[10, 20].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 20].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 20].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(21).Width = 14.14;
                ws.Cells[10, 21].Value = "Designations";
                ws.Cells[10, 21].Style.Font.Name = "Verdana";
                ws.Cells[10, 21].Style.Font.Size = 10;
                ws.Cells[10, 21].Style.Font.Bold = true;
                ws.Cells[10, 21].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 21].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 21].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(22).Width = 14.00;
                ws.Cells[10, 22].Value = "SPO's Teams";
                ws.Cells[10, 22].Style.Font.Name = "Verdana";
                ws.Cells[10, 22].Style.Font.Size = 10;
                ws.Cells[10, 22].Style.Font.Bold = true;
                ws.Cells[10, 22].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 22].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 22].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(23).Width = 16.29;
                ws.Cells[10, 23].Value = "Manager Name";
                ws.Cells[10, 23].Style.Font.Name = "Verdana";
                ws.Cells[10, 23].Style.Font.Size = 10;
                ws.Cells[10, 23].Style.Font.Bold = true;
                ws.Cells[10, 23].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 23].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 23].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(24).Width = 16.29;
                ws.Cells[10, 24].Value = "Manager LoginID";
                ws.Cells[10, 24].Style.Font.Name = "Verdana";
                ws.Cells[10, 24].Style.Font.Size = 10;
                ws.Cells[10, 24].Style.Font.Bold = true;
                ws.Cells[10, 24].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 24].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 24].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));

                ws.Column(25).Width = 22.86;
                ws.Cells[10, 25].Value = "Manager Designation";
                ws.Cells[10, 25].Style.Font.Name = "Verdana";
                ws.Cells[10, 25].Style.Font.Size = 10;
                ws.Cells[10, 25].Style.Font.Bold = true;
                ws.Cells[10, 25].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                ws.Cells[10, 25].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[10, 25].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(235, 233, 233));


                int row3 = 11;
                int col3 = 1;

                foreach (DataRow rw in table.Rows)
                {
                    foreach (DataColumn cl in table.Columns)
                    {
                        if (rw[cl.ColumnName] != DBNull.Value)
                        {

                            ws.Cells[row3, col3].Value = string.IsNullOrWhiteSpace(rw[cl.ColumnName].ToString()) ? " " : rw[cl.ColumnName].ToString();
                            ws.Cells[row3, col3].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                            ws.Cells[row3, col3].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                            ws.Cells[row3, col3].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                            ws.Cells[row3, col3].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                            ws.Cells[row3, col3].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                            ws.Cells[row3, col3].Style.Font.Name = "Verdana";
                            ws.Cells[row3, col3].Style.Font.Size = 10;

                            col3++;
                        }

                    }
                    col3 = 1;
                    row3++;
                }


                //---------------------Evening------------------------//





                //int row4 = 11;
                //int col4 = 12;

                //foreach (DataRow rw1 in table1.Rows)
                //{
                //    foreach (DataColumn cl1 in table1.Columns)
                //    {
                //        if (rw1[cl1.ColumnName] != DBNull.Value)
                //        {

                //            ws.Cells[row4, col4].Value = string.IsNullOrWhiteSpace(rw1[cl1.ColumnName].ToString()) ? "--" : rw1[cl1.ColumnName].ToString();
                //            ws.Cells[row4, col4].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //            ws.Cells[row4, col4].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row4, col4].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row4, col4].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row4, col4].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row4, col4].Style.Font.Name = "Verdana";
                //            ws.Cells[row4, col4].Style.Font.Size = 10;

                //            col4++;
                //        }

                //    }
                //    col4 = 12;
                //    row4++;
                //}




                //int row4 = 10;
                //int col4 = 1;

                //foreach (DataRow rw in table1.Rows)
                //{
                //    foreach (DataColumn cl in table1.Columns)
                //    {
                //        if (rw[cl.ColumnName] != DBNull.Value)
                //        {

                //            ws.Cells[row4, col4].Value = string.IsNullOrWhiteSpace(rw[cl.ColumnName].ToString()) ? "--" : rw[cl.ColumnName].ToString();
                //            ws.Cells[row4, col4].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                //            ws.Cells[row4, col4].Style.Border.Top.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row4, col4].Style.Border.Bottom.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row4, col4].Style.Border.Left.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row4, col4].Style.Border.Right.Color.SetColor(Color.FromArgb(183, 164, 140));
                //            ws.Cells[row4, col4].Style.Font.Name = "Verdana";
                //            ws.Cells[row4, col4].Style.Font.Size = 10;

                //            col4++;
                //        }

                //    }
                //    col4 = 1;
                //    row4++;
                //}



                pack.Save();

                #region Download Work

                var filenamef = fileInfo.FullName.ToString();
                Session["WorkPlanBySMInExcel"] = "Work-Plan-By-SM-Report-Excel-" + Convert.ToDateTime(dt1).ToString("MMM") + ".xlsx";

                #endregion


                #endregion


            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Work Plan By SM In Excel Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "WorkPlanBySMInExcel";

        }



        [WebMethod(EnableSession = true)]
        public string MRBestRatingReportDetails(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
           string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2)
        {
            try
            {
                DataTable dt = null;


                #region Initialization  columns


                _nvCollection.Clear();
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                _nvCollection.Add("@VisitShift-INT", vsid.ToString());
                _nvCollection.Add("@StartingDate-datetime", dt1.ToString());
                _nvCollection.Add("@EndingDate-datetime", dt2.ToString());

                DataSet MRBestRatingReportDetail = GetData("sp_MRBestRatingReportDetail", _nvCollection);
                if (MRBestRatingReportDetail != null)
                {
                    #region Process On Work
                    dt = MRBestRatingReportDetail.Tables[0];
                    Session["MRBestRatingReportDeatail"] = dt;
                    #endregion


                }
                #endregion



            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Call Execution Data DAY By DAY Detail Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "MioCallReason";
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string TotalSpos(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus)
        {

            try
            {
                //DataTable dtDailyCallReport = new DataTable();
                Session["totalsposresult"] = null;
                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtspo = dsDcr.Tables["totalSpos"];
                string status = GetRptStatus(dt1);
                //int monthf = Convert.ToDateTime(dt1).Month;
                //int yearf = Convert.ToDateTime(dt1).Year;
                string type = "S";
                _nvCollection.Clear();
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-int", level3Id.ToString());
                _nvCollection.Add("@Level4ID-int", level4Id.ToString());
                _nvCollection.Add("@Level5ID-int", level5Id.ToString());
                _nvCollection.Add("@Level6ID-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeID-int", empid.ToString());
                _nvCollection.Add("@TeamId-int", skuid.ToString());
                _nvCollection.Add("@StartingDate-date", dt1.ToString());
                _nvCollection.Add("@EmpStatus-int", empstatus.ToString());

                DataSet ds = GetData((status == "Live" ? "sp_totalSpos_NewParameter" : "sp_totalSpos_NewParameter_archive"), _nvCollection);
                //dtDailyCallReport = ds.Tables[0];

                if (ds != null)
                {
                    dtspo = ds.Tables[0];
                    Session["totalsposresult"] = dtspo;
                }
                ds.Dispose();
                //dtDailyCallReport.Dispose();

            }
            catch (Exception ex)
            {
                Session["totalsposresult"] = null;
                Constants.ErrorLog("total_and_balance : " + ex.Message.ToString() + "Stack: " + ex.StackTrace.ToString());
            }

            return "das";
        }
        //Fake Call Report
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string FakeGPSCallReport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus)
        {

            try
            {
                string Query = string.Empty;
                Session["FakeGPSCallReport"] = "";


                #region GET DATA
                string status = GetRptStatus(dt1);
                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtdcr = dsDcr.Tables["GetFakeGPSCall"];

                _nvCollection.Clear();
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-int", level3Id.ToString());
                _nvCollection.Add("@Level4ID-int", level4Id.ToString());
                _nvCollection.Add("@Level5ID-int", level5Id.ToString());
                _nvCollection.Add("@Level6ID-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeID-int", empid.ToString());
                _nvCollection.Add("@TeamId-int", skuid.ToString());
                _nvCollection.Add("@StartingDate-datetime", dt1.ToString());
                _nvCollection.Add("@EndingDate-datetime", dt2.ToString());
                _nvCollection.Add("@EmpStatus-int", empstatus.ToString());

                DataSet ds = GetData((status == "Live" ? "sp_getFakeGPSUserDetail" : "sp_getFakeGPSUserDetail_archive"), _nvCollection);

                #endregion


                #region Process On Work

                dtdcr = ds.Tables[0];

                Session["FakeGPSCallReport"] = dtdcr;

                #endregion


            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Daily Call Report with Activity ID Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");

            }
            return "das";
        }
        //Contact Point Report
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ContactPointReport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus, string EmpType)
        {

            try
            {
                string Query = string.Empty;
                Session["ContactPointReport"] = "";


                #region GET DATA

                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtdcr = dsDcr.Tables["ContactPointReport"];

                _nvCollection.Clear();
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-int", level3Id.ToString());
                _nvCollection.Add("@Level4ID-int", level4Id.ToString());
                _nvCollection.Add("@Level5ID-int", level5Id.ToString());
                _nvCollection.Add("@Level6ID-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeID-int", empid.ToString());
                _nvCollection.Add("@TeamId-int", skuid.ToString());
                _nvCollection.Add("@StartingDate-datetime", dt1.ToString());
                _nvCollection.Add("@EndingDate-datetime", dt2.ToString());
                _nvCollection.Add("@EmpStatus-int", empstatus.ToString());
                _nvCollection.Add("@EmpType-nvarchar(25)", EmpType.ToString());

                DataSet ds = GetData("sp_ContactPointRpt_NewParameter", _nvCollection);

                #endregion


                #region Process On Work

                dtdcr = ds.Tables[0];

                Session["ContactPointReport"] = dtdcr;

                #endregion


            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Contact Point Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");

            }
            return "das";
        }


        //Contact Point Report
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string NoContactPointReport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus)
        {

            try
            {
                string Query = string.Empty;
                Session["NoContactPointReport"] = "";


                #region GET DATA

                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtdcr = dsDcr.Tables["NoContactPointReport"];

                _nvCollection.Clear();
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-int", level3Id.ToString());
                _nvCollection.Add("@Level4ID-int", level4Id.ToString());
                _nvCollection.Add("@Level5ID-int", level5Id.ToString());
                _nvCollection.Add("@Level6ID-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeID-int", empid.ToString());
                _nvCollection.Add("@TeamId-int", skuid.ToString());
                _nvCollection.Add("@StartingDate-date", dt1.ToString());
                _nvCollection.Add("@EndingDate-date", dt2.ToString());
                _nvCollection.Add("@EmpStatus-int", empstatus.ToString());

                DataSet ds = GetData("sp_NoContactPointRpt", _nvCollection);

                #endregion


                #region Process On Work

                dtdcr = ds.Tables[0];

                Session["NoContactPointReport"] = dtdcr;

                #endregion


            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Contact Point Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");

            }
            return "das";
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ExpenseTeamSummaryReport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus)
        {

            try
            {
                string Query = string.Empty;
                Session["ExpenseTeamSummary"] = "";


                #region GET DATA

                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtdcr = dsDcr.Tables["ExpenseTeamSummary"];

                _nvCollection.Clear();
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-int", level3Id.ToString());
                _nvCollection.Add("@Level4ID-int", level4Id.ToString());
                _nvCollection.Add("@Level5ID-int", level5Id.ToString());
                _nvCollection.Add("@Level6ID-int", level6Id.ToString());
                _nvCollection.Add("@status-int", empstatus.ToString());
                _nvCollection.Add("@EmployeeID-int", empid.ToString());
                _nvCollection.Add("@TeamId-int", skuid.ToString());
                _nvCollection.Add("@Month-INT", Convert.ToDateTime(dt1).Month.ToString());
                _nvCollection.Add("@Year-INT", Convert.ToDateTime(dt1).Year.ToString());

                DataSet ds = GetData("Sp_ExpenseTeamSummary_Report", _nvCollection);

                #endregion


                #region Process On Work

                dtdcr = ds.Tables[0];

                Session["ExpenseTeamSummary"] = dtdcr;

                #endregion


            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Expense Team Summary Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");

            }
            return "das";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string EExpensesummaryofdeductionReport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus)
        {

            try
            {
                string Query = string.Empty;
                Session["Expensesummaryofdeduction"] = "";


                #region GET DATA

                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtdcr = dsDcr.Tables["Expensesummaryofdeduction"];

                _nvCollection.Clear();
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-int", level3Id.ToString());
                _nvCollection.Add("@Level4ID-int", level4Id.ToString());
                _nvCollection.Add("@Level5ID-int", level5Id.ToString());
                _nvCollection.Add("@Level6ID-int", level6Id.ToString());
                _nvCollection.Add("@status-int", empstatus.ToString());
                _nvCollection.Add("@EmployeeID-int", empid.ToString());
                _nvCollection.Add("@TeamId-int", skuid.ToString());
                _nvCollection.Add("@Month-INT", Convert.ToDateTime(dt1).Month.ToString());
                _nvCollection.Add("@Year-INT", Convert.ToDateTime(dt1).Year.ToString());

                DataSet ds = GetData("Sp_Expensesummaryofdeduction_Report", _nvCollection);

                #endregion


                #region Process On Work

                dtdcr = ds.Tables[0];

                Session["Expensesummaryofdeduction"] = dtdcr;

                #endregion


            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Expense Summary of Deduction Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");

            }
            return "das";
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string MasterExpenseReport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus)
        {

            try
            {
                string Query = string.Empty;
                Session["MasterExpenseReport"] = "";


                #region GET DATA

                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtdcr = dsDcr.Tables["MasterExpenseReport"];

                _nvCollection.Clear();
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1-int", level1Id.ToString());
                _nvCollection.Add("@Level2-int", level2Id.ToString());
                _nvCollection.Add("@Level3-int", level3Id.ToString());
                _nvCollection.Add("@Level4-int", level4Id.ToString());
                _nvCollection.Add("@Level5-int", level5Id.ToString());
                _nvCollection.Add("@Level6-int", level6Id.ToString());
                _nvCollection.Add("@status-int", empstatus.ToString());
                _nvCollection.Add("@TeamID-int", skuid.ToString());
                _nvCollection.Add("@Month-INT", Convert.ToDateTime(dt1).Month.ToString());
                _nvCollection.Add("@year-INT", Convert.ToDateTime(dt1).Year.ToString());

                DataSet ds = GetData("Sp_ExpenseMaster_Report", _nvCollection);

                #endregion


                #region Process On Work

                dtdcr = ds.Tables[0];

                Session["MasterExpenseReport"] = dtdcr;

                #endregion


            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Master Expense Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");

            }
            return "das";
        }



        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string SummerySellingReport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus)
        {

            try
            {
                string Query = string.Empty;
                Session["SummerySellingReport"] = "";


                #region GET DATA

                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtdcr = dsDcr.Tables["SummerySellingReport"];

                _nvCollection.Clear();
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1-int", level1Id.ToString());
                _nvCollection.Add("@Level2-int", level2Id.ToString());
                _nvCollection.Add("@Level3-int", level3Id.ToString());
                _nvCollection.Add("@Level4-int", level4Id.ToString());
                _nvCollection.Add("@Level5-int", level5Id.ToString());
                _nvCollection.Add("@Level6-int", level6Id.ToString());
                _nvCollection.Add("@status-int", empstatus.ToString());
                _nvCollection.Add("@TeamID-int", skuid.ToString());
                _nvCollection.Add("@Month-INT", Convert.ToDateTime(dt1).Month.ToString());
                _nvCollection.Add("@year-INT", Convert.ToDateTime(dt1).Year.ToString());

                DataSet ds = GetData("Sp_SummerySellingExpense_Rpt", _nvCollection);

                #endregion


                #region Process On Work

                dtdcr = ds.Tables[0];

                Session["SummerySellingReport"] = dtdcr;

                #endregion


            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Summery Selling Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");

            }
            return "das";
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string SummeryMarketingReport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus)
        {

            try
            {
                string Query = string.Empty;
                Session["SummeryMarketingReport"] = "";


                #region GET DATA

                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtdcr = dsDcr.Tables["SummeryMarketingReport"];

                _nvCollection.Clear();
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1-int", level1Id.ToString());
                _nvCollection.Add("@Level2-int", level2Id.ToString());
                _nvCollection.Add("@Level3-int", level3Id.ToString());
                _nvCollection.Add("@Level4-int", level4Id.ToString());
                _nvCollection.Add("@Level5-int", level5Id.ToString());
                _nvCollection.Add("@Level6-int", level6Id.ToString());
                _nvCollection.Add("@status-int", empstatus.ToString());
                _nvCollection.Add("@TeamID-int", skuid.ToString());
                _nvCollection.Add("@Month-INT", Convert.ToDateTime(dt1).Month.ToString());
                _nvCollection.Add("@year-INT", Convert.ToDateTime(dt1).Year.ToString());

                DataSet ds = GetData("Sp_SummeryMarketExpense_Report", _nvCollection);

                #endregion


                #region Process On Work

                dtdcr = ds.Tables[0];

                Session["SummeryMarketingReport"] = dtdcr;

                #endregion


            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Summery Marketing Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");

            }
            return "das";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string TerritoryCoverageReport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus)
        {

            try
            {
                string Query = string.Empty;
                Session["TerritoryCoverageReport"] = "";

                string StartMonth = Convert.ToDateTime(dt1).Month.ToString();
                string EndMonth = Convert.ToDateTime(dt2).Month.ToString();
                string StartYear = Convert.ToDateTime(dt1).Year.ToString();
                string EndYear = Convert.ToDateTime(dt2).Year.ToString();
                #region GET DATA

                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtdcr = dsDcr.Tables["TerritoryCoverageReport"];

                _nvCollection.Clear();
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1id-int", level1Id.ToString());
                _nvCollection.Add("@Level2id-int", level2Id.ToString());
                _nvCollection.Add("@Level3id-int", level3Id.ToString());
                _nvCollection.Add("@Level4id-int", level4Id.ToString());
                _nvCollection.Add("@Level5id-int", level5Id.ToString());
                _nvCollection.Add("@Level6id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                _nvCollection.Add("@TeamID-int", skuid.ToString());
                _nvCollection.Add("@Month-INT", StartMonth.ToString());
                _nvCollection.Add("@year-INT", StartYear.ToString());
                _nvCollection.Add("@EndMonth-INT", EndMonth.ToString());
                _nvCollection.Add("@Endyear-INT", EndYear.ToString());
                DataSet ds = GetData("Sp_TerritoryCoverage_Report", _nvCollection);

                #endregion


                #region Process On Work

                dtdcr = ds.Tables[0];

                Session["TerritoryCoverageReport"] = dtdcr;

                #endregion


            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Summery Marketing Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");

            }
            return "das";
        }



        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DistributerProfiling(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus, string EmpType)
        {

            try
            {
                string Query = string.Empty;
                Session["DistributerProfiling"] = "";

                string StartMonth = Convert.ToDateTime(dt1).Month.ToString();
                string EndMonth = Convert.ToDateTime(dt2).Month.ToString();
                string StartYear = Convert.ToDateTime(dt1).Year.ToString();
                string EndYear = Convert.ToDateTime(dt2).Year.ToString();
                #region GET DATA

                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtdcr = dsDcr.Tables["DistributerProfiling"];
                
                _nvCollection.Clear();
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                //_nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                //_nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-int", level3Id.ToString());
                _nvCollection.Add("@Level4ID-int", level4Id.ToString());
                _nvCollection.Add("@Level5ID-int", level5Id.ToString());
                _nvCollection.Add("@Level6ID-int", level6Id.ToString());
                _nvCollection.Add("@EmpId-int", empid.ToString());
                _nvCollection.Add("@DateStart-datetime", dt1.ToString());
                _nvCollection.Add("@DateEnd-datetime", dt2.ToString());
                //_nvCollection.Add("@year-INT", StartYear.ToString());
                //_nvCollection.Add("@EndMonth-INT", EndMonth.ToString());
                //_nvCollection.Add("@Endyear-INT", EndYear.ToString());
                DataSet ds = GetData("sp_DistributerProfiling", _nvCollection);

                #endregion


                #region Process On Work

                dtdcr = ds.Tables[0];

                Session["DistributerProfiling"] = dtdcr;

                #endregion


            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising Distributer Profiling Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");

            }
            return "das";
        }



        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ExpenseTellyReport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus)
        {

            try
            {
                string Query = string.Empty;
                Session["expenseTellyReport"] = "";
                string status = GetRptStatus(dt1);
                #region GET DATA

                CrystalReports.XSDDatatable.Dsreports dsDcr = new CrystalReports.XSDDatatable.Dsreports();
                DataTable dtdcr = dsDcr.Tables["expenseTellyReport"];

                _nvCollection.Clear();
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1id-int", level1Id.ToString());
                _nvCollection.Add("@Level2id-int", level2Id.ToString());
                _nvCollection.Add("@Level3id-int", level3Id.ToString());
                _nvCollection.Add("@Level4id-int", level4Id.ToString());
                _nvCollection.Add("@Level5id-int", level5Id.ToString());
                _nvCollection.Add("@Level6id-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                _nvCollection.Add("@StartDate-DATETIME", dt1.ToString());
                _nvCollection.Add("@TeamID-int", skuid.ToString());
                DataSet ds = GetData((status == "Live" ? "Sp_ExpenseTellyReport" : "ExpenseTellyReport_archive"), _nvCollection);

                #endregion


                #region Process On Work

                dtdcr = ds.Tables[0];

                Session["expenseTellyReport"] = dtdcr;

                #endregion


            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Summery Marketing Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");

            }
            return "das";
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string AttendanceReportForHR(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus, string EmpType)
            {
            var dtAttendanceReportForHR = new DataTable();
            CrystalReports.XSDDatatable.Dsreports dsc = new CrystalReports.XSDDatatable.Dsreports();
            dtAttendanceReportForHR = dsc.Tables["AttendanceReportForHR"];
            try
            {
                Session["AttendanceReportForHR"] = "";
                _nvCollection.Clear();
                string status = GetRptStatus(dt1);
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];                
                _nvCollection.Add("@Level1Id-INT", level1Id.ToString());
                _nvCollection.Add("@Level2Id-INT", level2Id.ToString());
                _nvCollection.Add("@Level3Id-INT", level3Id.ToString());
                _nvCollection.Add("@Level4Id-INT", level4Id.ToString());
                _nvCollection.Add("@Level5Id-INT", level5Id.ToString());
                _nvCollection.Add("@Level6Id-INT", level6Id.ToString());
                _nvCollection.Add("@TeamId-INT", skuid.ToString());
                _nvCollection.Add("@EmployeeId-INT", empid.ToString());
                _nvCollection.Add("@EmpStatus-INT", empstatus.ToString());
                _nvCollection.Add("@EmpType-varchar(max)", EmpType.ToString());
                _nvCollection.Add("@StartingDate-datetime", dt1.ToString());
               

                DataSet ds = GetData((status == "Live" ? "sp_AttendanceReportforHR" : "sp_AttendanceReportforHR"), _nvCollection);
               
                if (ds != null)
                {
                    //ge.Fill(dtset); //Fill Dataset
                    //dt = dtset.Tables[0]; //Then assi
                    #region Process On Work
                    dtAttendanceReportForHR = ds.Tables[0];
                    Session["AttendanceReportForHR"] = dtAttendanceReportForHR;
                    #endregion

                }

            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Calls status Report with Date Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }



        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string MonthlyMeetingMark(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus)
        {
            var MonthlyMeetingReport = new DataTable();
            CrystalReports.XSDDatatable.Dsreports dsc = new CrystalReports.XSDDatatable.Dsreports();
            MonthlyMeetingReport = dsc.Tables["MonthlyMeetingReport"];
            try
            {
                DateTime from = Convert.ToDateTime(dt1);
                DateTime to = Convert.ToDateTime(dt2);
                string status = GetRptStatus(dt1);
                Session["MonthlyMeetingReport"] = "";
                _nvCollection.Clear();
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1ID-int", level1Id.ToString());
                _nvCollection.Add("@Level2ID-int", level2Id.ToString());
                _nvCollection.Add("@Level3ID-int", level3Id.ToString());
                _nvCollection.Add("@Level4ID-int", level4Id.ToString());
                _nvCollection.Add("@Level5ID-int", level5Id.ToString());
                _nvCollection.Add("@Level6ID-int", level6Id.ToString());
                _nvCollection.Add("@EmployeeId-int", empid.ToString());
                _nvCollection.Add("@StartingDate-datetime", dt1.ToString());
                _nvCollection.Add("@EndingDate-datetime", dt2.ToString());
                //_nvCollection.Add("@TeamID-int", skuid.ToString());
                //_nvCollection.Add("@EmpStatus-int", empstatus.ToString());
                //DataSet ds = GetData((status == "Live" ? "DayView_SPO_NewParameter" : "DayView_SPO_NewParameter_archive"), _nvCollection);
                DataSet ds = GetData("AdminMeetingMarkReport", _nvCollection);
                if (ds != null)
                {
                    #region Process On Work
                    MonthlyMeetingReport = ds.Tables[0];
                    Session["MonthlyMeetingReport"] = MonthlyMeetingReport;
                    #endregion

                }

            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Calls status Report with Date Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }




        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertiveReport(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
            string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus)
        {
            try
            {
                DataTable dt = null;


                #region Initialization  columns


                _nvCollection.Clear();
                string status = GetRptStatus(dt1);
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                _currentUser = (SystemUser)Session["SystemUser"];

             //   _nvCollection.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
             //   _nvCollection.Add("@CurrentUserRole-NVARCHAR", _currentUserRole);
                _nvCollection.Add("@Level1Id-int", level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", level6Id.ToString());
             //   _nvCollection.Add("@EmpID-int", empid.ToString());
              //  _nvCollection.Add("@TeamID-int", skuid.ToString());
                _nvCollection.Add("@StartingDate-datetime", dt1.ToString());
              //  _nvCollection.Add("@EmpStatus-int", empstatus.ToString());
                DataSet Custmr = GetData("sp_gettargetreport", _nvCollection);
                //DataSet Custmr = GetData((status == "Live" ? "Sp_CallExecutionDataDAYByDAYDetail_NewParameter" : "Sp_CallExecutionDataDAYByDAYDetail_NewParameter_archive"), _nvCollection);
                if (Custmr != null)
                {
                    #region Process On Work
                    dt = Custmr.Tables[0];
                    Session["InsertiveReport"] = dt;
                    #endregion


                }
                #endregion



            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Call Execution Data DAY By DAY Detail Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "MioCallReason";
        }


        //[WebMethod(EnableSession = true)]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public string MonthlyMeetingMark(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id,
        //    string skuid, string empid, string drid, string clid, string vsid, string jv, string dt1, string dt2, string empstatus, string EmpType)
        //{
        //    var dtAttendanceReportForHR = new DataTable();
        //    CrystalReports.XSDDatatable.Dsreports dsc = new CrystalReports.XSDDatatable.Dsreports();
        //    dtAttendanceReportForHR = dsc.Tables["MonthlyMeetingReport"];
        //    try
        //    {
        //        Session["MonthlyMeetingReport"] = "";
        //        _nvCollection.Clear();
        //        string status = GetRptStatus(dt1);
        //        string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
        //        _currentUser = (SystemUser)Session["SystemUser"];
        //        _nvCollection.Add("@Level1Id-INT", level1Id.ToString());
        //        _nvCollection.Add("@Level2Id-INT", level2Id.ToString());
        //        _nvCollection.Add("@Level3Id-INT", level3Id.ToString());
        //        _nvCollection.Add("@Level4Id-INT", level4Id.ToString());
        //        _nvCollection.Add("@Level5Id-INT", level5Id.ToString());
        //        _nvCollection.Add("@Level6Id-INT", level6Id.ToString());
        //        _nvCollection.Add("@TeamId-INT", skuid.ToString());
        //        _nvCollection.Add("@EmployeeId-INT", empid.ToString());
        //        _nvCollection.Add("@EmpStatus-INT", empstatus.ToString());
        //        _nvCollection.Add("@EmpType-varchar(max)", EmpType.ToString());
        //        _nvCollection.Add("@StartingDate-datetime", dt1.ToString());


        //        DataSet ds = GetData("AdminMeetingMarkReport",_nvCollection);

        //        if (ds != null)
        //        {
        //            //ge.Fill(dtset); //Fill Dataset
        //            //dt = dtset.Tables[0]; //Then assi
        //            #region Process On Work
        //            dtAttendanceReportForHR = ds.Tables[0];
        //            Session["MonthlyMeetingReport"] = dtAttendanceReportForHR;
        //            #endregion

        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        Constants.ErrorLog("Exception Raising From Calls status Report with Date Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
        //    }

        //    return "das";
        //}




        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string FillTeamsbyBUH(int LevelId)
        {

            string returnString = "";
            try
            {
                nv.Clear();
                nv.Add("@Level3levelId-int", LevelId.ToString());
                //nv.Add("@DoctorId-int", null);
                //nv.Add("@ClassId-int", "0");
                //nv.Add("@BrickId-int", "0");
                DataSet ds = dl.GetData("sp_GetTeamsbyBUH", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                    else
                    {
                        returnString = "";
                    }
                }
                else
                {
                    returnString = "";
                }
                //_MRDoctors = _dataContext.sp_DoctorsOfSpoSelectByEmployee_New(employeeid, null, null, null)
                //   .Select(
                //   P => new v_MRDoctor()
                //   {
                //       DoctorId = P.DoctorId,
                //       DoctorName = P.DoctorName

                //   }).ToList();
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Error From NewReports.asmx FillMrDR " + ex.Message);
            }

            return returnString;

        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string FillTeamsbyBUHbyEMP(int empid)
        {

            string returnString = "";
            try
            {
                nv.Clear();
                nv.Add("@empid-int", empid.ToString());
                //nv.Add("@DoctorId-int", null);
                //nv.Add("@ClassId-int", "0");
                //nv.Add("@BrickId-int", "0");
                DataSet ds = dl.GetData("sp_GetTeamsbyBUHbyEmp", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                    else
                    {
                        returnString = "";
                    }
                }
                else
                {
                    returnString = "";
                }
                //_MRDoctors = _dataContext.sp_DoctorsOfSpoSelectByEmployee_New(employeeid, null, null, null)
                //   .Select(
                //   P => new v_MRDoctor()
                //   {
                //       DoctorId = P.DoctorId,
                //       DoctorName = P.DoctorName

                //   }).ToList();
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Error From NewReports.asmx FillMrDR " + ex.Message);
            }

            return returnString;

        }






        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string FillTeamsForLevel3withEmployeeId(int EmployeeId)
        {

            string returnString = "";
            try
            {
                nv.Clear();
                nv.Add("@EmployeeId-int", EmployeeId.ToString());
                DataSet ds = dl.GetData("sp_GetTeamsForLevelwithEmployeeId", nv);


                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                    else
                    {
                        returnString = "";
                    }
                }
                else
                {
                    returnString = "";
                }
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Error From NewReports.asmx FillMrDR " + ex.Message);
            }

            return returnString;

        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string FillTeamsForLevel1(int LevelId)
        {

            string returnString = "";
            try
            {
                nv.Clear();
                nv.Add("@Level2levelId-int", LevelId.ToString());
                DataSet ds = dl.GetData("sp_GetTeamsForLeve1", nv);


                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                    else
                    {
                        returnString = "";
                    }
                }
                else
                {
                    returnString = "";
                }
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Error From NewReports.asmx FillMrDR " + ex.Message);
            }

            return returnString;

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetEmployeewithteam(long employeeId, int teamId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@ManagerId-BIGINT", employeeId.ToString());
                nv.Add("@TeamId-INT", teamId.ToString());
                DataSet ds = dl.GetData("sp_EmployeesSelectBYManagerIdusingTeamForLevel3", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                    else
                    {
                        returnString = "";
                    }
                }
                else
                {
                    returnString = "";
                }
                //List<v_EmployeeDetail> getEmployee =
                //    _dataContext.sp_EmployeesSelectByManagerNew(employeeId).Select(
                //    p =>
                //        new v_EmployeeDetail()
                //        {
                //            EmployeeId = p.EmployeeId,
                //            EmployeeName = p.EmployeeName

                //        }).ToList();

                //if (getEmployee.Count > 0)
                //{
                //    returnString = _jss.Serialize(getEmployee);
                //}
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }



        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetEmployeewithteamForHierarchyLevel1(long employeeId, int teamId)
        {
            string returnString = "";


            try
            {
                //if (_currentUserRole == "admin" || _currentUserRole == "admincoordinator" || _currentUserRole == "headoffice" || _currentUserRole == "ftm")
                //{
                nv.Clear();
                nv.Add("@ManagerId-BIGINT", employeeId.ToString());
                nv.Add("@TeamId-INT", teamId.ToString());
                DataSet ds = dl.GetData("sp_EmployeesSelectBYManagerIdusingTeamForLevel3", nv);
                //}

                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                    else
                    {
                        returnString = "";
                    }
                }
                else
                {
                    returnString = "";
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
        public string GetEmployeewithteamForHierarchyLevel2(long employeeId, int teamId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@ManagerId-BIGINT", employeeId.ToString());
                nv.Add("@TeamId-INT", teamId.ToString());
                DataSet ds = dl.GetData("sp_EmployeesSelectBYManagerIdusingTeamForLevel2", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                    else
                    {
                        returnString = "";
                    }
                }
                else
                {
                    returnString = "";
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
        public string GetEmployeewithteamForHierarchyLevel3(long employeeId, int teamId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@ManagerId-BIGINT", employeeId.ToString());
                nv.Add("@TeamId-INT", teamId.ToString());
                DataSet ds = dl.GetData("sp_EmployeesSelectBYManagerIdusingTeamForLevel3", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                    else
                    {
                        returnString = "";
                    }
                }
                else
                {
                    returnString = "";
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
        public string GetEmployeewithteamForHierarchyLevel4(long employeeId, int teamId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@ManagerId-BIGINT", employeeId.ToString());
                nv.Add("@TeamId-INT", teamId.ToString());
                DataSet ds = dl.GetData("sp_EmployeesSelectBYManagerIdusingTeamForLevel4", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                    else
                    {
                        returnString = "";
                    }
                }
                else
                {
                    returnString = "";
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
        public string GetEmployeewithteamForHierarchyLevel5(long employeeId, int teamId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@ManagerId-BIGINT", employeeId.ToString());
                nv.Add("@TeamId-INT", teamId.ToString());
                DataSet ds = dl.GetData("sp_EmployeesSelectBYManagerIdusingTeamForLevel5", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                    else
                    {
                        returnString = "";
                    }
                }
                else
                {
                    returnString = "";
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
        public List<Tuple<int, string>> fillGH_L1WithTeam(int level1Id, int teamId)
        {

            string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
            _currentUser = (SystemUser)Session["SystemUser"];
            GetCurrentLevelId(_currentUser.EmployeeId);
            var list = new List<Tuple<int, string>>();

            if (_currentUserRole == "admin" || _currentUserRole == "admincoordinator" || _currentUserRole == "ftm")
            {
                List<HierarchyLevel1> ada = _dataContext.sp_Levels1SelectByLevel2WithTeam(level1Id, teamId).ToList();
                //sp_Levels2SelectByLevel1(level1Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl1")
            {
                List<HierarchyLevel3> ada = _dataContext.sp_Level3SelectByLevel2WithTeam(level1Id, teamId).ToList();
                //sp_Levels3SelectByLevel2(level1Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl2")
            {
                List<HierarchyLevel4> ada = _dataContext.sp_Levels4SelectByLevel3WithTeam(level1Id, teamId).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl3" || _currentUserRole == "headoffice")
            {
                List<HierarchyLevel5> ada = _dataContext.sp_Levels5SelectByLevel4WithTeam(level1Id, teamId).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl4")
            {
                List<HierarchyLevel6> ada = _dataContext.sp_Levels6SelectByLevel5WithTeam(level1Id, teamId).ToList();
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
        public List<Tuple<int, string>> fillGH_L2WithTeam(int level2Id, int teamId)
        {

            string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
            _currentUser = (SystemUser)Session["SystemUser"];
            GetCurrentLevelId(_currentUser.EmployeeId);
            var list = new List<Tuple<int, string>>();

            if (_currentUserRole == "admin" || _currentUserRole == "admincoordinator" || _currentUserRole == "ftm")
            {
                List<HierarchyLevel2> ada = _dataContext.sp_Levels2SelectByLevel3WithTeam(level2Id, teamId).ToList();
                //sp_Levels3SelectByLevel2(level2Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl1")
            {
                List<HierarchyLevel4> ada = _dataContext.sp_Levels4SelectByLevel3WithTeam(level2Id, teamId).ToList();
                //sp_Levels3SelectByLevel2(level1Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl2")
            {
                List<HierarchyLevel4> ada = _dataContext.sp_Levels4SelectByLevel3WithTeam(level2Id, teamId).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl3" || _currentUserRole == "headoffice")
            {
                List<HierarchyLevel6> ada = _dataContext.sp_Levels6SelectByLevel5WithTeam(level2Id, teamId).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl4")
            {
                List<HierarchyLevel5> ada = _dataContext.sp_Levels5SelectByLevel4(level2Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl5")
            {
                List<HierarchyLevel6> ada = _dataContext.sp_Levels6SelectByLevel5(level2Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl6")
            {

            }
            return list;
        }



        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<Tuple<int, string>> fillGH_L3WithTeam(int level3Id, int teamId)
        {

            string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
            _currentUser = (SystemUser)Session["SystemUser"];
            GetCurrentLevelId(_currentUser.EmployeeId);
            var list = new List<Tuple<int, string>>();

            if (_currentUserRole == "admin" || _currentUserRole == "admincoordinator" || _currentUserRole == "ftm")
            {
                List<HierarchyLevel4> ada = _dataContext.sp_Levels4SelectByLevel3WithTeam(level3Id, teamId).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl1")
            {
                List<HierarchyLevel5> ada = _dataContext.sp_Levels5SelectByLevel4WithTeam(level3Id, teamId).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl2")
            {
                List<HierarchyLevel5> ada = _dataContext.sp_Levels5SelectByLevel4WithTeam(level3Id, teamId).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl3" || _currentUserRole == "headoffice")
            {

                List<HierarchyLevel4> ada = _dataContext.sp_Levels4SelectByLevel3WithTeamwithEmployeeID(level3Id, teamId).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl4")
            {
                List<HierarchyLevel4> ada = _dataContext.sp_Levels4SelectByLevel3(level3Id).ToList();
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
        public List<Tuple<int, string>> fillGH_L4WithTeam(int level4Id, int teamId)
        {
            string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
            _currentUser = (SystemUser)Session["SystemUser"];
            GetCurrentLevelId(_currentUser.EmployeeId);
            var list = new List<Tuple<int, string>>();

            if (_currentUserRole == "admin" || _currentUserRole == "admincoordinator" || _currentUserRole == "headoffice" || _currentUserRole == "ftm")
            {
                List<HierarchyLevel5> ada = _dataContext.sp_Levels5SelectByLevel4WithTeam(level4Id, teamId).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl1")
            {
                List<HierarchyLevel6> ada = _dataContext.sp_Levels6SelectByLevel5WithTeam(level4Id, teamId).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl2")
            {
                List<HierarchyLevel6> ada = _dataContext.sp_Levels6SelectByLevel5WithTeam(level4Id, teamId).ToList();
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
                List<HierarchyLevel5> ada = _dataContext.sp_Levels5SelectByLevel4WithTeamwithEmployeeID(level4Id, teamId).ToList();
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
        public string GetRptStatus(string dt1)
        {
            if (dt1 == "")
            {
                dt1 = DateTime.Now.ToString("MM/dd/yyyy");
            }

            DateTime SDate, EDate;
            EDate = DateTime.Now;

            if (!DateTime.TryParse(dt1, out SDate))
            {
                // returnString = "DateTime Format Is invalid";             
            }

            string status = "Live";
            var mon = ((SDate.Year - EDate.Year) * 12) + SDate.Month - EDate.Month;

            if (mon < -5)
            {
                status = "Archive";
            }

            return status;
        }

        #endregion
    }
}