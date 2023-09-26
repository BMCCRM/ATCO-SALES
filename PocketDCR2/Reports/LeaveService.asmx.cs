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
using System.Collections;
using System.Text;
using SchedulerDAL;

namespace PocketDCR2.Reports
{
    /// <summary>
    /// Summary description for NewReports
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class LeaveService : System.Web.Services.WebService
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
        DAL dl = new DAL();
        private int _level1Id = 0, _level2Id = 0, _level3Id = 0, _level4Id = 0, _level5Id = 0, _level6Id = 0, _currentLevelId = 0;
        private SystemUser _currentUser;
        string _hierarchyName, _currentRole;
        private List<DatabaseLayer.SQL.AppConfiguration> _getHierarchy;
        private long _employeeId = 0;
        List<v_EmployeeWithRole> Emphr;

        #endregion

        #region filltering

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string fillEmployees()
        {
            string rezult = "";
            string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
            _currentUser = (SystemUser)Session["SystemUser"];

            if (_currentUserRole == "admin")
            {

                DataSet ds = GetData("sp_employees_leave", null);
                DataTable dt = ds.Tables[0];

                if (dt.Rows.Count > 0)
                {
                    rezult = dt.ToJsonString();

                }

            }

            return rezult;

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Addholidaymark(string HolidayDate, string Description, string EmpID)
        {
            DAL d = new DAL();
            try
            {
                #region Uptade Status
                _nvCollection.Clear();
                //_nvCollection.Add("@Level1Id-int", level1);
                //_nvCollection.Add("@Level2Id-int", level2);
                //_nvCollection.Add("@Level3Id-int", level3);
                //_nvCollection.Add("@Level4Id-int", level4);
                //_nvCollection.Add("@Level5Id-int", level5);
                //_nvCollection.Add("@Level6Id-int", level6);
                _nvCollection.Add("@EmployeeID-int", EmpID);
                _nvCollection.Add("@HolidayDate-nvarchar(max)", HolidayDate.ToString());
                _nvCollection.Add("@Description-nvarchar(max)", Description.ToString());
                bool r = d.InserData("sp_HolidayMark", _nvCollection);
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
        public string getdataLeave(string level1, string level2, string level3, string level4, string level5, string level6, DateTime current, DateTime Enddate, string EmpType, string leaveType)
        {
            string rezult = "";
            int count = 0;
            string EmployeeID = "";


            if (level1 == "-1")
            {
                level1 = "0";
            }
            if (level2 == "-1")
            {
                level2 = "0";
            }
            if (level3 == "-1")
            {
                level3 = "0";
            }
            if (level4 == "-1")
            {
                level4 = "0";
            }
            if (level5 == "-1")
            {
                level5 = "0";
            }
            if (level6 == "-1")
            {
                level6 = "0";
            }

            if (EmpType == "0")
            {
                EmpType = "";
            }
            else if (EmpType == "1")
            {
                EmpType = "ZSM";
            }
            else if (EmpType == "2")
            {
                EmpType = "MIO";
            }

            _nvCollection.Clear();
            _nvCollection.Add("@Level1Id-int", level1);
            _nvCollection.Add("@Level2Id-int", level2);
            _nvCollection.Add("@Level3Id-int", level3);
            _nvCollection.Add("@Level4Id-int", level4);
            _nvCollection.Add("@Level5Id-int", level5);
            _nvCollection.Add("@Level6Id-int", level6);
            _nvCollection.Add("@EmpType-varchar(5)", EmpType);

            DataSet dsd = GetData("sp_check_ZSM_MIO", _nvCollection);
            count = dsd.Tables[0].Rows.Count;

            DataTable dt = new DataTable();
            if (count != 0)
            {

                //foreach (DataRow row in dsd.Tables[0].Rows)
                //{
                //    EmployeeID = row["EmployeeId"].ToString();
                //    //EmpType = dsd.Tables[0].Rows[i]["EmpType"].ToString();
                //    _nvCollection.Clear();
                //    _nvCollection.Add("@Startdate-date", current.ToString());
                //    _nvCollection.Add("@Enddate-date", Enddate.ToString());
                //    _nvCollection.Add("@employeeid-int", EmployeeID);

                //    DataSet ds = GetData("sp_admin_leave_data", _nvCollection);

                //    if (ds.Tables[0].Rows.Count > 0)
                //    {
                //        //rezult = ds.Tables[0].ToJsonString();
                //        dt.Merge(ds.Tables[0]);
                //    }

                //}

                for (int i = 0; i < count; i++)
                {

                    EmployeeID = dsd.Tables[0].Rows[i]["EmployeeId"].ToString();
                    //EmpType = dsd.Tables[0].Rows[i]["EmpType"].ToString();
                    _nvCollection.Clear();
                    _nvCollection.Add("@Startdate-date", current.ToString());
                    //_nvCollection.Add("@Enddate-date", Enddate.ToString());
                    _nvCollection.Add("@employeeid-int", EmployeeID);
                    _nvCollection.Add("@leaveType-int", leaveType);

                    DataSet ds = GetData("sp_admin_leave_data", _nvCollection);

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        //rezult = ds.Tables[0].ToJsonString();
                        dt.Merge(ds.Tables[0]);
                    }
                }

            }
            rezult = dt.ToJsonString();
            return rezult;

        }



        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertdataLeaveNSM(string level1, string level2, string level3, string level4, string level5, string level6, DateTime current, DateTime enddate, string drcode, string desription, string empType, string Gazzed)
        {
            string rezult = "";
            int count = 0, valid = 0, CountLeaveMarked = 0, CountLeaveNotMarked = 0;
            string mioId = "", miocode = "", PlanStatus = "";

            if (level1 == "-1")
            {
                level1 = "0";
            }
            if (level2 == "-1")
            {
                level2 = "0";
            }
            if (level3 == "-1")
            {
                level3 = "0";
            }
            if (level4 == "-1")
            {
                level4 = "0";
            }
            if (level5 == "-1")
            {
                level5 = "0";
            }
            if (level6 == "-1")
            {
                level6 = "0";
            }

            if (empType == "0")
            {
                empType = "";
            }
            else if (empType == "1")
            {
                empType = "ZSM";
            }
            else if (empType == "2")
            {
                empType = "MIO";
            }

            _nvCollection.Clear();
            _nvCollection.Add("@Level1Id-int", level1);
            _nvCollection.Add("@Level2Id-int", level2);
            _nvCollection.Add("@Level3Id-int", level3);
            _nvCollection.Add("@Level4Id-int", level4);
            _nvCollection.Add("@Level5Id-int", level5);
            _nvCollection.Add("@Level6Id-int", level6);
            _nvCollection.Add("@EmpType-varchar(5)", empType);

            DataSet dsd = GetData("sp_check_ZSM_MIO", _nvCollection);
            count = dsd.Tables[0].Rows.Count;
            if (empType == "")
            {
                empType = "0";
            }
            else if (empType == "1")
            {
                empType = "ZSM";
            }
            else if (empType == "2")
            {
                empType = "MIO";
            }

            if (count != 0)
            {

                for (int j = 0; j < count; j++)
                {


                    mioId = dsd.Tables[0].Rows[j]["EmployeeId"].ToString();
                    empType = dsd.Tables[0].Rows[j]["EmpType"].ToString();
                    miocode = mioId;

                    _nvCollection.Clear();
                    _nvCollection.Add("@Doccode-int", drcode);
                    DataSet dsd1 = GetData("sp_check_drid", _nvCollection);
                    _nvCollection.Clear();
                    _nvCollection.Add("@Miocode-int", miocode);
                    DataSet dsm = GetData("sp_check_mioid_1", _nvCollection);

                    if (dsd1.Tables[0].Rows.Count == 0)
                    {
                        _nvCollection.Clear();
                        _nvCollection.Add("@Doccode-int", drcode);
                        dl.InserData("sp_insert_drid", _nvCollection);
                        dsd1 = GetData("sp_check_drid", _nvCollection);
                    }

                    string drid = dsd1.Tables[0].Rows[0]["DoctorId"].ToString();

                    if (dsm.Tables[0].Rows.Count == 0)
                    {
                        _nvCollection.Clear();
                        _nvCollection.Add("@Miocode-int", miocode);
                        dl.InserData("sp_insert_mioid", _nvCollection);
                        dsm = GetData("sp_check_mioid", _nvCollection);
                    }

                    string mio = dsm.Tables[0].Rows[0]["EmployeeId"].ToString();


                    List<DateTime> allDates = new List<DateTime>();

                    DateTime starting = new DateTime();
                    starting = DateTime.ParseExact(current.ToString("dd-MM-yyyy"), "dd-MM-yyyy", null);
                    DateTime ending = new DateTime();
                    ending = DateTime.ParseExact(enddate.ToString("dd-MM-yyyy"), "dd-MM-yyyy", null);




                    for (DateTime date = starting; date <= ending; date = date.AddDays(1))
                    {

                        DateTime start = DateTime.Parse(date.ToShortDateString() + " " + "08:00");
                        DateTime end = DateTime.Parse(date.ToShortDateString() + " " + "23:59");
                        PlanStatus = CheckPlanOfEmployee(mioId, empType, start.ToString("yyyy-MM-dd"), end.ToString("yyyy-MM-dd"));
                        if (!(PlanStatus.Contains("Call Exists")) && !(PlanStatus.Contains("Plan exists but cannot be deleted")))
                        {
                            if (PlanStatus.Contains("Plan Exists"))
                            {
                                DeletePlanAndCallsForLeave(mioId, start.ToString("yyyy-MM-dd"), end.ToString("yyyy-MM-dd"));
                            }
                            CountLeaveMarked++;
                            if (mioId != "0")
                            {
                                //string empType = "";
                                int employeeid_ZSM = 0;
                                int employeeid = 0;
                                int id = 0;
                                int recIns = 0;
                                //empType = mioId.Split('-')[0].ToString();

                                if (empType == "ZSM")
                                {
                                    employeeid_ZSM = Convert.ToInt32(mioId);
                                    id = SchedulerManager.CheckPlannerMonthZSM(current, employeeid_ZSM);
                                    if (id == 0)
                                    {
                                        id = SchedulerManager.insertCallPlannerMonthZSM(current, true, employeeid_ZSM, Utility.STATUS_INPROCESS, "", 0);
                                        if (id > 0)
                                        {
                                            recIns = SchedulerManager.InsertCallPlannerMIOZSM(id, start, end, false, 7, Convert.ToInt32(mio), desription, Utility.STATUS_APPROVED, "");
                                        }
                                    }
                                    else
                                    {
                                        recIns = SchedulerManager.InsertCallPlannerMIOZSM(id, start, end, false, 7, Convert.ToInt32(mio), desription, Utility.STATUS_APPROVED, "");
                                    }
                                    if (recIns == 0)
                                    {
                                        id = 0;
                                    }
                                    valid += id;
                                    if (id != 0)
                                    {
                                        if (Gazzed == "1")
                                        {
                                            // Insert gazettedLeave
                                            _nvCollection = new NameValueCollection{
                                                {"@LeaveForDay-datetime",start.ToString()},
                                                {"@fk_CPA_CallPlannerActivityID-int","7"},
                                                {"@CPA_Name-varchar-100","gazettedLeave"},
                                                {"@EmpType-varchar-100",empType.ToString()},
                                                {"@EmployeeId-int",employeeid_ZSM.ToString()},
                                                {"@CallPlannerMonthID-int",recIns.ToString()}
                                                };
                                            var InsertgazettedLeave = dl.InserData("sp_gazettedLeave", _nvCollection);
                                        }
                                    }
                                }
                                else
                                {
                                    employeeid = Convert.ToInt32(mioId);
                                    id = SchedulerManager.CheckPlannerMonth(current, employeeid);
                                    if (id == 0)
                                    {
                                        id = SchedulerManager.insertCallPlannerMonth(current, "", true, employeeid, Utility.STATUS_INPROCESS, "", 0);
                                        if (id > 0)
                                        {
                                            recIns = SchedulerManager.InsertCallPlannerMIO(id, start, end, false, 7, Convert.ToInt32(drid), desription, Utility.STATUS_APPROVED, "", 0);
                                        }
                                    }
                                    else
                                    {
                                        recIns = SchedulerManager.InsertCallPlannerMIO(id, start, end, false, 7, Convert.ToInt32(drid), desription, Utility.STATUS_APPROVED, "", 0);
                                    }
                                    if (recIns == 0)
                                    {
                                        id = 0;
                                    }
                                    valid += id;
                                    if (id != 0)
                                    {
                                        if (Gazzed == "1")
                                        {
                                            // Insert gazettedLeave
                                            _nvCollection = new NameValueCollection{
                                            {"@LeaveForDay-datetime",start.ToString()},
                                            {"@fk_CPA_CallPlannerActivityID-int","7"},
                                            {"@CPA_Name-varchar-100","gazettedLeave"},
                                            {"@EmpType-varchar-100",empType.ToString()},
                                            {"@EmployeeId-int",employeeid_ZSM.ToString()},
                                            {"@CallPlannerMonthID-int",recIns.ToString()}
                                            };
                                            var InsertgazettedLeave = dl.InserData("sp_gazettedLeave", _nvCollection);
                                        }
                                    }
                                }

                            }
                            else
                            {
                                DataSet ds = GetData("sp_employees_leave", null);
                                if (ds.Tables[0].Rows.Count > 0)
                                {
                                    DataTable dt = ds.Tables[0];
                                    for (int i = 0; i < dt.Rows.Count; i++)
                                    {
                                        string ids = dt.Rows[i][0].ToString();
                                        //string empType = "";
                                        int employeeid_ZSM = 0;
                                        int employeeid = 0;
                                        int id = 0;
                                        int recIns = 0;

                                        //empType = ids.Split('-')[0].ToString();
                                        if (empType == "ZSM")
                                        {
                                            employeeid_ZSM = Convert.ToInt32(ids.Split('-')[1].ToString());
                                            id = SchedulerManager.CheckPlannerMonthZSM(current, employeeid_ZSM);
                                            if (id == 0)
                                            {
                                                id = SchedulerManager.insertCallPlannerMonthZSM(current, true, employeeid_ZSM, Utility.STATUS_INPROCESS, "", 0);
                                                if (id > 0)
                                                {
                                                    recIns = SchedulerManager.InsertCallPlannerMIOZSM(id, start, end, false, 7, Convert.ToInt32(mio), desription, Utility.STATUS_APPROVED, "");

                                                }
                                            }
                                            else
                                            {
                                                recIns = SchedulerManager.InsertCallPlannerMIOZSM(id, start, end, false, 7, Convert.ToInt32(mio), desription, Utility.STATUS_APPROVED, "");
                                            }
                                            if (recIns == 0)
                                            {
                                                id = 0;
                                            }
                                            valid += id;
                                            if (id != 0)
                                            {
                                                if (Gazzed == "1")
                                                {
                                                    // Insert gazettedLeave
                                                    _nvCollection = new NameValueCollection{
                                                {"@LeaveForDay-datetime",start.ToString()},
                                                {"@fk_CPA_CallPlannerActivityID-int","9"},
                                                {"@CPA_Name-varchar-100","gazettedLeave"},
                                                {"@EmpType-varchar-100",empType.ToString()},
                                                {"@EmployeeId-int",employeeid_ZSM.ToString()},
                                                {"@CallPlannerMonthID-int",recIns.ToString()}
                                                };
                                                    var InsertgazettedLeave = dl.InserData("sp_gazettedLeave", _nvCollection);
                                                }
                                            }
                                        }
                                        else
                                        {
                                            employeeid = Convert.ToInt32(ids.Split('-')[1].ToString());
                                            id = SchedulerManager.CheckPlannerMonth(current, employeeid);
                                            if (id == 0)
                                            {
                                                id = SchedulerManager.insertCallPlannerMonth(current, "", true, employeeid, Utility.STATUS_INPROCESS, "", 0);
                                                if (id > 0)
                                                {
                                                    recIns = SchedulerManager.InsertCallPlannerMIO(id, start, end, false, 7, Convert.ToInt32(drid), desription, Utility.STATUS_APPROVED, "", 0);
                                                }
                                            }
                                            else
                                            {
                                                recIns = SchedulerManager.InsertCallPlannerMIO(id, start, end, false, 7, Convert.ToInt32(drid), desription, Utility.STATUS_APPROVED, "", 0);
                                            }
                                            if (recIns == 0)
                                            {
                                                id = 0;
                                            }
                                            valid += id;
                                            if (id != 0)
                                            {
                                                if (Gazzed == "1")
                                                {
                                                    // Insert gazettedLeave
                                                    _nvCollection = new NameValueCollection{
                                                    {"@LeaveForDay-datetime",start.ToString()},
                                                    {"@fk_CPA_CallPlannerActivityID-int","9"},
                                                    {"@CPA_Name-varchar-100","gazettedLeave"},
                                                    {"@EmpType-varchar-100",empType.ToString()},
                                                    {"@EmployeeId-int",employeeid.ToString()},
                                                    {"@CallPlannerMonthID-int",recIns.ToString()},
                                                    };
                                                    var InsertgazettedLeave = dl.InserData("sp_gazettedLeave", _nvCollection);
                                                }
                                            }
                                        }

                                    }

                                }
                            }
                        }
                        else
                        {
                            CountLeaveNotMarked++;
                        }
                    }

                }
            }



            if (valid == 0)
            {
                rezult = "Available," + (CountLeaveMarked / ((enddate - current).TotalDays + 1)) + "," + (CountLeaveNotMarked / ((enddate - current).TotalDays + 1));
            }
            else
            {
                rezult = "Not-Available," + (CountLeaveMarked / ((enddate - current).TotalDays + 1)) + "," + (CountLeaveNotMarked / ((enddate - current).TotalDays + 1));
            }
            return rezult;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string MarkPublicHoliday(DateTime current, string drcode)
        {
            string rezult = "";

            _nvCollection.Clear();
            _nvCollection.Add("@Doccode-int", drcode);
            DataSet dsd1 = GetData("sp_check_drid", _nvCollection);
            //_nvCollection.Clear();
            //_nvCollection.Add("@Miocode-int", miocode);
            //DataSet dsm = GetData("sp_check_mioid_1", _nvCollection);

            if (dsd1.Tables[0].Rows.Count == 0)
            {
                _nvCollection.Clear();
                _nvCollection.Add("@Doccode-int", drcode);
                dl.InserData("sp_insert_drid", _nvCollection);
                dsd1 = GetData("sp_check_drid", _nvCollection);
            }

            string drid = dsd1.Tables[0].Rows[0]["DoctorId"].ToString();

            _nvCollection = new NameValueCollection { { "@fromDate-datetime", current.ToString() } };
            var InsertPublicHoliday = dl.GetData("MarkPublicHoliday", _nvCollection);
            List<DateTime> allDates = new List<DateTime>();

            if (InsertPublicHoliday != null && InsertPublicHoliday.Tables.Count > 0)
            {
                rezult = InsertPublicHoliday.Tables[0].ToJsonString();
            }
            else
            {
                rezult = "";
            }
            return rezult;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DeleteLeave(string level1, string level2, string level3, string level4, string level5, string level6, string id, DateTime startdate, DateTime enddate, string empType)
        {

            string rezult = "";

            if (id != "0")
            {
                rezult = DeleteData(id, startdate, enddate, "");
            }


            if (id == "0")
            {
                string EmployeeID = "";

                int count = 0;


                if (level1 == "-1")
                {
                    level1 = "0";
                }
                if (level2 == "-1")
                {
                    level2 = "0";
                }
                if (level3 == "-1")
                {
                    level3 = "0";
                }
                if (level4 == "-1")
                {
                    level4 = "0";
                }
                if (level5 == "-1")
                {
                    level5 = "0";
                }
                if (level6 == "-1")
                {
                    level6 = "0";
                }

                if (empType == "0")
                {
                    empType = "";
                }
                else if (empType == "1")
                {
                    empType = "ZSM";
                }
                else if (empType == "2")
                {
                    empType = "MIO";
                }

                _nvCollection.Clear();
                _nvCollection.Add("@Level1Id-int", level1);
                _nvCollection.Add("@Level2Id-int", level2);
                _nvCollection.Add("@Level3Id-int", level3);
                _nvCollection.Add("@Level4Id-int", level4);
                _nvCollection.Add("@Level5Id-int", level5);
                _nvCollection.Add("@Level6Id-int", level6);
                _nvCollection.Add("@EmpType-varchar(5)", empType);

                DataSet dsd = GetData("sp_check_ZSM_MIO", _nvCollection);
                count = dsd.Tables[0].Rows.Count;
                if (id == "0")
                    for (int i = 0; i < count; i++)
                    {
                        EmployeeID = dsd.Tables[0].Rows[i]["EmployeeId"].ToString();

                        rezult = DeleteData(id, startdate, enddate, EmployeeID);
                    }


            }

            return rezult;


        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DeleteLeaveData(string id)
        {
            string result = "";

            _nvCollection.Clear();
            _nvCollection.Add("@id-bigint", id);

            DataSet ds = dl.GetData("sp_DeleteLeaveMIO", _nvCollection);

            if (ds.Tables[0].Rows.Count > 0)
            {
                result = ds.Tables[0].ToJsonString();

            }

            return result;
        }
        public string DeleteData(string id, DateTime startdate, DateTime enddate, string EmployeeID)
        {


            string rezult = "";
            List<DateTime> allDates = new List<DateTime>();

            DateTime starting = new DateTime();
            starting = DateTime.ParseExact(startdate.ToString("dd-MM-yyyy"), "dd-MM-yyyy", null);
            DateTime ending = new DateTime();
            ending = DateTime.ParseExact(enddate.ToString("dd-MM-yyyy"), "dd-MM-yyyy", null);


            DAL dl = new DAL();
            bool status = false;
            if (id != "0")
            {

                string type = id.Split('-')[0].ToString();
                string LeaveID = id.Split('-')[1].ToString();

                _nvCollection.Clear();

                _nvCollection.Add("@type-varchar-(100)", type.ToString());
                _nvCollection.Add("@ID-varchar-(100)", LeaveID.ToString());

                status = dl.InserData("sp_admin_delete_leave", _nvCollection);

            }

            if (id == "0")
            {

                _nvCollection.Clear();
                _nvCollection.Add("@Startdate-date", starting.ToString());
                _nvCollection.Add("@Enddate-date", ending.ToString());
                _nvCollection.Add("@EmployeeID-int", EmployeeID);

                status = dl.InserData("sp_admin_delete_leave_month", _nvCollection);
            }
            if (status == true)
            {
                rezult = "OK";
            }
            else
            {
                rezult = "ERROR";
            }
            return rezult;

        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string CheckPlanOfEmployee(string EmployeeID, string empType, string startingDate, string endingDate)
        {
            string rezult = "";
            _nvCollection.Clear();
            _nvCollection.Add("@EmployeeID-int", EmployeeID);
            _nvCollection.Add("@EmpType-varchar(10)", empType);
            _nvCollection.Add("@StartingDate-date", startingDate);
            _nvCollection.Add("@EndingDate-date", endingDate);

            DataSet ds = dl.GetData("SP_CheckPlanOfEmployee", _nvCollection);

            if (ds.Tables[0].Rows.Count > 0)
            {
                rezult = ds.Tables[0].ToJsonString();

            }
            else
            {
                rezult = "error";
            }

            return rezult;

        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DeletePlanAndCallsForLeave(string EmployeeID, string FromDate, string ToDate)
        {
            string rezult = "";
            _nvCollection.Clear();
            _nvCollection.Add("@EmployeeId-int", EmployeeID);
            _nvCollection.Add("@fromDate-date", FromDate);
            _nvCollection.Add("@toDate-date", ToDate);

            DataSet ds = dl.GetData("SP_DeletePlanAndCallsForLeave", _nvCollection);

            if (ds.Tables[0].Rows.Count > 0)
            {
                rezult = ds.Tables[0].ToJsonString();

            }

            return rezult;

        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string CheckPlanStatus(string Date, string EmployeeType, string EmployeeHierarchy)
        {
            if (EmployeeType == "0")
                return "OK";
            string rezult = "";
            _nvCollection.Clear();
            _nvCollection.Add("@date-date", Date);
            _nvCollection.Add("@employeeType-varchar(10)", EmployeeType);
            _nvCollection.Add("@EmployeeHierarchy-varchar(200)", EmployeeHierarchy);

            DataSet ds = dl.GetData("SP_CheckPlanStatus", _nvCollection);

            if (ds.Tables[0].Rows.Count > 0)
            {
                rezult = ds.Tables[0].ToJsonString();

            }

            return rezult;

        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string MarkLeaveOrPublicHoliday(string stDate, string endDate, string leaveType, string description, string MLevel, string TLevel)
        {
            string result = "";
            _nvCollection.Clear();
            _nvCollection.Add("@Sdate-date", stDate);
            _nvCollection.Add("@Edate-date", endDate);
            _nvCollection.Add("@leaveType-int", leaveType);
            _nvCollection.Add("@description-varchar(max)", description);
            _nvCollection.Add("@mLevel-int", MLevel);
            _nvCollection.Add("@tLevel-int", TLevel);

            DataSet ds = dl.GetData("sp_MarkLeaveORPublicHoliday", _nvCollection);

            if (ds != null)
            {
                if (ds.Tables[0].Rows.Count > 0)
                {
                    result = ds.Tables[0].ToJsonString();

                }
            }
            return result;

        }

        #endregion

    }
}
