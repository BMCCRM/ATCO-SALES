using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Mail;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.Script.Services;
using CrystalDecisions.Shared.Json;
using DatabaseLayer.SQL;
using System.Data;
using PocketDCR2.Classes;
using PocketDCR.CustomMembershipProvider;
using System.Data.SqlClient;
using System.Collections.Specialized;
using System.Configuration;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for MioPlanning
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    [ScriptService]
    public class MioPlanning : System.Web.Services.WebService
    {
        #region Database Layer

        private DataSet GetData(String spName, NameValueCollection nv)
        {
            var connection = new SqlConnection();

            try
            {
                connection.ConnectionString = Constants.GetConnectionString();
                var dataSet = new DataSet();
                connection.Open();

                var command = new SqlCommand
                                  {
                                      CommandType = CommandType.StoredProcedure,
                                      Connection = connection,
                                      CommandText = spName,
                                      CommandTimeout = 20000
                                  };

                if (nv != null)
                {
                    //New code implemented for retrieving data
                    for (int i = 0; i < nv.Count; i++)
                    {
                        string[] arraySplit = nv.Keys[i].Split('-');

                        string dbTyper;
                        if (arraySplit.Length > 2)
                        {
                            dbTyper = "SqlDbType." + arraySplit[1] + "," + arraySplit[2];

                            if (nv[i] == "NULL")
                            {
                                command.Parameters.AddWithValue(arraySplit[0], dbTyper).Value = DBNull.Value;
                            }
                            else
                            {
                                command.Parameters.AddWithValue(arraySplit[0], dbTyper).Value = nv[i];
                            }
                        }
                        else
                        {
                            dbTyper = "SqlDbType." + arraySplit[1];

                            if (nv[i] == "NULL")
                            {
                                command.Parameters.AddWithValue(arraySplit[0], dbTyper).Value = DBNull.Value;
                            }
                            else
                            {
                                command.Parameters.AddWithValue(arraySplit[0], dbTyper).Value = nv[i];
                            }
                        }
                    }
                }

                var dataAdapter = new SqlDataAdapter { SelectCommand = command };
                dataAdapter.Fill(dataSet);

                return dataSet;
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
                Constants.ErrorLog("Exception Raising From DAL In NewReport.aspx | " + exception.Message + " | Stack Trace : |" + exception.StackTrace + "|| Procedure Name :" + spName);

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

        readonly DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        List<v_MrDrBrick> _mrBrick;
        List<v_EmployeeWithRole> _mIolist;
        readonly NameValueCollection _nvCollection = new NameValueCollection();
        private SystemUser _currentUser;
        string _vplan;
        private readonly DAL _dl = new DAL();
        JavaScriptSerializer _jss = new JavaScriptSerializer();

        [WebMethod(EnableSession = true)]
        public List<v_MrDrBrick> LoadBrick()
        {
            try
            {
                _currentUser = (SystemUser)Session["SystemUser"];
                _mrBrick = _dataContext.sp_MrDrBrickSelect(Convert.ToInt64(_currentUser.EmployeeId)).ToList();
            }
            catch (Exception exception)
            {
                exception.ErrorLog();
            }
            return _mrBrick;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<Tuple<int, string>> FillGifts()
        {
            // List returnString = "";
            var giftsList = new List<Tuple<int, string>>();
            try
            {
                var fsdf = (from p in _dataContext.GiftItems
                            select p).ToList();
                giftsList.AddRange(fsdf.Select(item => Tuple.Create(Convert.ToInt32(item.GiftId), item.GiftName)));
            }
            catch (Exception exception)
            {
                exception.ErrorLog();
            }
            return giftsList;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<Tuple<int, string>> FillProduct(string _EmployeeId)
        {

           /// Team Wise Product

            var nv1 = new NameValueCollection();
            int level3 = 0;
            #region Set Employee HR

            nv1.Clear();
            // ReSharper disable SpecifyACultureInStringConversionExplicitly
            nv1.Add("@EmployeeId-bigint", _EmployeeId.ToString());
            // ReSharper restore SpecifyACultureInStringConversionExplicitly
            DataSet mioHr = GetData("Mioplaning_MIOHierarchy", nv1);

            if (mioHr.Tables.Count > 0)
            {
                if (mioHr.Tables[0].Rows.Count > 0)
                {
                    level3 = Convert.ToInt32(mioHr.Tables[0].Rows[0]["Level3LevelId"]);
             
                }
            }

            // List returnString = "";
            var pRoductList = new List<Tuple<int, string>>();
            try
            {
                var fsdf = (from p in _dataContext.Products
                            select p).Where(o => o.Level3ID==level3).ToList();

                pRoductList.AddRange(fsdf.Select(item => Tuple.Create(item.ProductId, item.ProductName)));
            }
            catch (Exception exception)
            {
                exception.ErrorLog();
            }

            return pRoductList;

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string FillProductskuByTeam(string pEmployeeId)
        {
            // List returnString = "";
            var pRoductList = string.Empty;
            int level3 = 0, level4 = 0, level5 = 0;


            try
            {
                #region Set Employee HR

                _nvCollection.Clear();
                _nvCollection.Add("@EmployeeId-bigint", pEmployeeId.ToString());
                DataSet mioHr = GetData("Sp_Mioplaning_MIOHierarchy", _nvCollection);

                if (mioHr.Tables.Count > 0)
                {
                    if (mioHr.Tables[0].Rows.Count > 0)
                    {
                        level3 = Convert.ToInt32(mioHr.Tables[0].Rows[0]["Level3LevelId"]);
                        level4 = Convert.ToInt32(mioHr.Tables[0].Rows[0]["Level4LevelId"]);
                        level5 = Convert.ToInt32(mioHr.Tables[0].Rows[0]["Level5LevelId"]);
                    }
                }
                #endregion


                _nvCollection.Clear();
                _nvCollection.Add("@level3id-int", level3.ToString());
                var dsprod = _dl.GetData("sp_getProductsSampleByTeam_Web", _nvCollection);
                if (dsprod != null)
                {
                    pRoductList = dsprod.Tables[0].ToJsonString();

                }
            }
            catch (Exception exception)
            {
                exception.ErrorLog();
            }

            return pRoductList;

        }

        [WebMethod(EnableSession = true)]
        // ReSharper disable InconsistentNaming
        public List<v_EmployeeWithRole> MIOall(int _EmployeeId)
        // ReSharper restore InconsistentNaming
        {
            try
            {
                var nv1 = new NameValueCollection();
                int level3 = 0, level4 = 0, level5 = 0;
                #region Set Employee HR

                nv1.Clear();
                // ReSharper disable SpecifyACultureInStringConversionExplicitly
                nv1.Add("@EmployeeId-bigint", _EmployeeId.ToString());
                // ReSharper restore SpecifyACultureInStringConversionExplicitly
                DataSet mioHr = GetData("Mioplaning_MIOHierarchy", nv1);

                if (mioHr.Tables.Count > 0)
                {
                    if (mioHr.Tables[0].Rows.Count > 0)
                    {
                        level3 = Convert.ToInt32(mioHr.Tables[0].Rows[0]["Level3LevelId"]);
                        level4 = Convert.ToInt32(mioHr.Tables[0].Rows[0]["Level4LevelId"]);
                        level5 = Convert.ToInt32(mioHr.Tables[0].Rows[0]["Level5LevelId"]);
                        //level6 = Convert.ToInt32(MIoHR.Tables[0].Rows[0]["Level6LevelId"]);
                    }
                }
                #endregion
                _mIolist = _dataContext.sp_EmployeesSelectByLevel("Level3", "rl5", 0, 0, level3, level4, level5, 0).ToList();
            }
            catch (Exception exception)
            {
                exception.ErrorLog();
            }
            return _mIolist;
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
        public string GetNSMS(long employeeId)
        {
            string returnString = "";

            try
            {
                var allNSM = (from p in _dataContext.v_EmployeeHierarchies
                    where p.LevelId1 == null
                    where p.LevelId2 == null
                    where p.LevelId4 == null
                    where p.LevelId5 == null
                    where p.LevelId6 == null
                    select p).ToList();
                if (allNSM.Count > 0)
                {
                    returnString = _jss.Serialize(allNSM);
                }


            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }


        [WebMethod(EnableSession = true)]
        // ReSharper disable InconsistentNaming
        public string PlanInfo(int Pplanid)
        // ReSharper restore InconsistentNaming
        {
            try
            {
                var nv = new NameValueCollection { { "@PlanningId-bigint", Pplanid.ToString(CultureInfo.InvariantCulture) } };
                DataSet planinfo = GetData("Mioplaning_Employedetails", nv);
                if (planinfo.Tables.Count > 0)
                {
                    if (planinfo.Tables[0].Rows.Count > 0)
                    {
                        _vplan = planinfo.Tables[0].ToJsonString();
                    }
                }
            }
            catch (Exception exception)
            {
                exception.ErrorLog();
            }
            return _vplan;
        }



        [WebMethod(EnableSession = true)]
        // ReSharper disable InconsistentNaming
        public string viewPlan(string _date, int _DoctorId, int _ClassId, int _BrickId, int _SpecialityId, int _EmployeeId)
        // ReSharper restore InconsistentNaming
        {
            try
            {
                var nv = new NameValueCollection();
                var nv1 = new NameValueCollection();
                DateTime nDate = Convert.ToDateTime(_date);
                _currentUser = (SystemUser)Session["SystemUser"];


                // ReSharper disable SpecifyACultureInStringConversionExplicitly
                nv.Add("@DoctorId-bigint", _DoctorId == -1 ? "NULL" : _DoctorId.ToString());
                // ReSharper restore SpecifyACultureInStringConversionExplicitly

                // ReSharper disable SpecifyACultureInStringConversionExplicitly
                nv.Add("@ClassId-int", _ClassId == -1 ? "NULL" : _ClassId.ToString());
                // ReSharper restore SpecifyACultureInStringConversionExplicitly

                // ReSharper disable SpecifyACultureInStringConversionExplicitly
                nv.Add("@BrickId-int", _BrickId == -1 ? "NULL" : _BrickId.ToString());
                // ReSharper restore SpecifyACultureInStringConversionExplicitly

                // ReSharper disable SpecifyACultureInStringConversionExplicitly
                nv.Add("@SpecialityId-int", _SpecialityId == -1 ? "NULL" : _SpecialityId.ToString());
                // ReSharper restore SpecifyACultureInStringConversionExplicitly

                // ReSharper disable SpecifyACultureInStringConversionExplicitly
                nv.Add("@EmployeeId-bigint", Convert.ToInt64(_EmployeeId).ToString());
                // ReSharper restore SpecifyACultureInStringConversionExplicitly

                // ReSharper disable SpecifyACultureInStringConversionExplicitly
                nv.Add("@TiemStamp-datetime", nDate.ToString());
                // ReSharper restore SpecifyACultureInStringConversionExplicitly
                DataSet cmioplan = GetData("Mioplaning", nv);

                if (cmioplan.Tables.Count > 0)
                {
                    if (cmioplan.Tables[0].Rows.Count > 0)
                    {
                        _vplan = cmioplan.Tables[0].ToJsonString();
                    }
                    else
                    {

                        int level3 = 0, level4 = 0, level5 = 0, level6 = 0;

                        #region Set Employee HR

                        nv1.Clear();
                        // ReSharper disable SpecifyACultureInStringConversionExplicitly
                        nv1.Add("@EmployeeId-bigint", Convert.ToInt64(_EmployeeId).ToString());
                        // ReSharper restore SpecifyACultureInStringConversionExplicitly
                        DataSet mioHr = GetData("Mioplaning_MIOHierarchy", nv1);

                        if (mioHr.Tables.Count > 0)
                        {
                            if (mioHr.Tables[0].Rows.Count > 0)
                            {
                                level3 = Convert.ToInt32(mioHr.Tables[0].Rows[0]["Level3LevelId"]);
                                level4 = Convert.ToInt32(mioHr.Tables[0].Rows[0]["Level4LevelId"]);
                                level5 = Convert.ToInt32(mioHr.Tables[0].Rows[0]["Level5LevelId"]);
                                level6 = Convert.ToInt32(mioHr.Tables[0].Rows[0]["Level6LevelId"]);
                            }
                        }
                        #endregion

                        #region MIO DR
                        nv1.Clear();
                        // ReSharper disable SpecifyACultureInStringConversionExplicitly
                        nv1.Add("@EmployeeId-bigint", Convert.ToInt64(_EmployeeId).ToString());
                        // ReSharper restore SpecifyACultureInStringConversionExplicitly
                        nv1.Add("@DoctorId-bigint", "NULL");
                        nv1.Add("@ClassId-int", "NULL");
                        nv1.Add("@BrickId-int", "NULL");
                        nv1.Add("@SpecialityId-int", "NULL");
                        DataSet mioMrdr = GetData("Mioplaning_view", nv1);
                        #endregion

                        #region Save Plan loop

                        for (int i = 0; i < mioMrdr.Tables[0].Rows.Count; i++)
                        {
                            int dRid = Convert.ToInt32(mioMrdr.Tables[0].Rows[i]["DoctorId"]);

                            nv1.Clear();
                            // ReSharper disable SpecifyACultureInStringConversionExplicitly
                            nv1.Add("@DoctorId-bigint", dRid.ToString());
                            // ReSharper restore SpecifyACultureInStringConversionExplicitly
                            // ReSharper disable SpecifyACultureInStringConversionExplicitly
                            nv1.Add("@EmployeeId-bigint", Convert.ToInt64(_EmployeeId).ToString());
                            // ReSharper restore SpecifyACultureInStringConversionExplicitly
                            nv1.Add("@Level1-int", "0");
                            nv1.Add("@Level2-int", "0");
                            // ReSharper disable SpecifyACultureInStringConversionExplicitly
                            nv1.Add("@Level3-int", level3.ToString());
                            nv1.Add("@Level4-int", level4.ToString());
                            nv1.Add("@Level5-int", level5.ToString());
                            nv1.Add("@Level6-int", level6.ToString());
                            nv1.Add("@TiemStamp-datetime", nDate.ToString());
                            // ReSharper restore SpecifyACultureInStringConversionExplicitly
                            // ReSharper disable UnusedVariable
                            DataSet mioplanInsert = GetData("Mioplaning_Insert", nv1);
                            // ReSharper restore UnusedVariable

                        }
                        #endregion

                        nv1.Clear();
                        // ReSharper disable SpecifyACultureInStringConversionExplicitly
                        nv1.Add("@EmployeeId-bigint", Convert.ToInt64(_EmployeeId).ToString());
                        nv1.Add("@TiemStamp-datetime", nDate.ToString());
                        // ReSharper restore SpecifyACultureInStringConversionExplicitly
                        nv1.Add("@Reason-nvarchar-300", "");
                        nv1.Add("@PlanStatus-nvarchar-50", "Draft");
                        // ReSharper disable UnusedVariable
                        DataSet mioplanAInsert = GetData("MIOPlanning_insertApproval", nv1);
                        // ReSharper restore UnusedVariable
                        DataSet getPlan = GetData("Mioplaning", nv);

                        if (getPlan.Tables.Count > 0)
                        {
                            if (getPlan.Tables[0].Rows.Count > 0)
                            {
                                _vplan = getPlan.Tables[0].ToJsonString();
                            }
                        }
                    }
                }




            }
            catch (Exception ex) { ex.ErrorLog(); }
            return _vplan;
        }




        private void SaveblankPlan(int employeeId, DateTime ndate)
        {

            try
            {
                // ReSharper disable InconsistentNaming
                var _EmployeeId = employeeId;
                // ReSharper restore InconsistentNaming
                DateTime nDate = Convert.ToDateTime(ndate);

                var nv1 = new NameValueCollection();

                int level3 = 0, level4 = 0, level5 = 0, level6 = 0;

                #region Set Employee HR

                nv1.Clear();
                // ReSharper disable SpecifyACultureInStringConversionExplicitly
                nv1.Add("@EmployeeId-bigint", Convert.ToInt64(_EmployeeId).ToString());
                // ReSharper restore SpecifyACultureInStringConversionExplicitly
                DataSet mioHR = GetData("Mioplaning_MIOHierarchy", nv1);

                if (mioHR.Tables.Count > 0)
                {
                    if (mioHR.Tables[0].Rows.Count > 0)
                    {
                        level3 = Convert.ToInt32(mioHR.Tables[0].Rows[0]["Level3LevelId"]);
                        level4 = Convert.ToInt32(mioHR.Tables[0].Rows[0]["Level4LevelId"]);
                        level5 = Convert.ToInt32(mioHR.Tables[0].Rows[0]["Level5LevelId"]);
                        level6 = Convert.ToInt32(mioHR.Tables[0].Rows[0]["Level6LevelId"]);
                    }
                }
                #endregion

                #region MIO DR
                nv1.Clear();
                //// ReSharper disable SpecifyACultureInStringConversionExplicitly
                //nv1.Add("@EmployeeId-bigint", Convert.ToInt64(_EmployeeId).ToString());
                //// ReSharper restore SpecifyACultureInStringConversionExplicitly
                //nv1.Add("@DoctorId-bigint", "NULL");
                //nv1.Add("@ClassId-int", "NULL");
                //nv1.Add("@BrickId-int", "NULL");
                //nv1.Add("@SpecialityId-int", "NULL");
                //DataSet mioMrdr = GetData("Mioplaning_view", nv1);
                _nvCollection.Clear();
                _nvCollection.Add("@DoctorId-bigint", "NULL");
                _nvCollection.Add("@EmployeeId-bigint", _EmployeeId.ToString());
                DataSet mioMrdr = GetData("sp_DoctorsOfSpoSelect", _nvCollection);
                #endregion

                #region Save Plan loop

                for (int i = 0; i < mioMrdr.Tables[0].Rows.Count; i++)
                {
                    int dRid = Convert.ToInt32(mioMrdr.Tables[0].Rows[i]["DoctorId"]);

                    nv1.Clear();
                    // ReSharper disable SpecifyACultureInStringConversionExplicitly
                    nv1.Add("@DoctorId-bigint", dRid.ToString());
                    nv1.Add("@EmployeeId-bigint", Convert.ToInt64(_EmployeeId).ToString());
                    nv1.Add("@Level1-int", "0");
                    nv1.Add("@Level2-int", "0");
                    nv1.Add("@Level3-int", level3.ToString());
                    nv1.Add("@Level4-int", level4.ToString());
                    nv1.Add("@Level5-int", level5.ToString());
                    nv1.Add("@Level6-int", level6.ToString());
                    nv1.Add("@TiemStamp-datetime", nDate.ToString());
                    // ReSharper restore SpecifyACultureInStringConversionExplicitly
                    // ReSharper disable UnusedVariable
                    var mioplanInsert = GetData("Mioplaning_Insert", nv1);
                    // ReSharper restore UnusedVariable

                }
                #endregion

                nv1.Clear();
                // ReSharper disable SpecifyACultureInStringConversionExplicitly
                nv1.Add("@EmployeeId-bigint", Convert.ToInt64(_EmployeeId).ToString());
                nv1.Add("@TiemStamp-datetime", nDate.ToString());
                // ReSharper restore SpecifyACultureInStringConversionExplicitly
                nv1.Add("@Reason-nvarchar-300", "");
                nv1.Add("@PlanStatus-nvarchar-50", "Draft");
                // ReSharper disable UnusedVariable
                var mioplanAInsert = GetData("MIOPlanning_insertApproval", nv1);
                // ReSharper restore UnusedVariable
            }
            catch (Exception ex)
            {
                ex.ErrorLog();
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        // ReSharper disable InconsistentNaming
        public string Saveplan(string pday, string pmonth, string pyear, int drid, int _TargetCall, int _ActualCall, int _Total, bool Cchecked, int planid, int _empid,
            bool _One, bool _Two, bool _Three, bool _Four, bool _Five, bool _Six, bool _Seven, bool _Eight, bool _Nine, bool _Ten, bool _Eleven, bool _Twelve,
            bool _Thirteen, bool _Fourteen, bool _Fiftheen, bool _Sixtheen, bool _Seventeen, bool _Eighteen, bool _Nineteen, bool _Twenty, bool _TwentyOne,
            bool _TwentyTwo, bool _TwentyThree, bool _TwentyFour, bool _TwentyFive, bool _TwentySix, bool _TwentySeven, bool _TwentyEight, bool _TwentyNine,
            bool _Thirty, bool _ThirtyOne, string _date)
        // ReSharper restore InconsistentNaming
        {
            try
            {
                var nv1 = new NameValueCollection();
                _currentUser = (SystemUser)Session["SystemUser"];
                DateTime setdateF = Convert.ToDateTime(_date);
                var nv2 = new NameValueCollection();
                int level3 = 0, level4 = 0, level5 = 0, level6 = 0;
                nv2.Clear();
                // ReSharper disable SpecifyACultureInStringConversionExplicitly
                nv2.Add("@EmployeeId-bigint", Convert.ToInt64(_empid).ToString());
                // ReSharper restore SpecifyACultureInStringConversionExplicitly
                DataSet mioHR = GetData("Mioplaning_MIOHierarchy", nv2);

                if (mioHR.Tables.Count > 0)
                {
                    if (mioHR.Tables[0].Rows.Count > 0)
                    {
                        level3 = Convert.ToInt32(mioHR.Tables[0].Rows[0]["Level3LevelId"]);
                        level4 = Convert.ToInt32(mioHR.Tables[0].Rows[0]["Level4LevelId"]);
                        level5 = Convert.ToInt32(mioHR.Tables[0].Rows[0]["Level5LevelId"]);
                        level6 = Convert.ToInt32(mioHR.Tables[0].Rows[0]["Level6LevelId"]);
                    }
                }

                nv1.Clear();


                // ReSharper disable SpecifyACultureInStringConversionExplicitly
                nv1.Add("@PlanningId-bigint", Convert.ToInt64(planid).ToString());
                nv1.Add("@TiemStamp-datetime", setdateF.ToString());
                nv1.Add("@EmployeeId-bigint", _empid.ToString());
                nv1.Add("@DoctorId-bigint", drid.ToString());
                nv1.Add("@TargetCall-bigint", _TargetCall.ToString());
                nv1.Add("@ActualCall-bigint", _ActualCall.ToString());
                nv1.Add("@Total-bigint", _Total.ToString());
                nv1.Add("@One-bit", _One.ToString());
                nv1.Add("@Two-bit", _Two.ToString());
                nv1.Add("@Three-bit", _Three.ToString());
                nv1.Add("@Four-bit", _Four.ToString());
                nv1.Add("@Five-bit", _Five.ToString());
                nv1.Add("@Six-bit", _Six.ToString());
                nv1.Add("@Seven-bit", _Seven.ToString());
                nv1.Add("@Eight-bit", _Eight.ToString());
                nv1.Add("@Nine-bit", _Nine.ToString());
                nv1.Add("@Ten-bit", _Ten.ToString());
                nv1.Add("@Eleven-bit", _Eleven.ToString());
                nv1.Add("@Twelve-bit", _Twelve.ToString());
                nv1.Add("@Thirteen-bit", _Thirteen.ToString());
                nv1.Add("@Fourteen-bit", _Fourteen.ToString());
                nv1.Add("@Fiftheen-bit", _Fiftheen.ToString());
                nv1.Add("@Sixtheen-bit", _Sixtheen.ToString());
                nv1.Add("@Seventeen-bit", _Seventeen.ToString());
                nv1.Add("@Eighteen-bit", _Eighteen.ToString());
                nv1.Add("@Nineteen-bit", _Nineteen.ToString());
                nv1.Add("@Twenty-bit", _Twenty.ToString());
                nv1.Add("@TwentyOne-bit", _TwentyOne.ToString());
                nv1.Add("@TwentyTwo-bit", _TwentyTwo.ToString());
                nv1.Add("@TwentyThree-bit", _TwentyThree.ToString());
                nv1.Add("@TwentyFour-bit", _TwentyFour.ToString());
                nv1.Add("@TwentyFive-bit", _TwentyFive.ToString());
                nv1.Add("@TwentySix-bit", _TwentySix.ToString());
                nv1.Add("@TwentySeven-bit", _TwentySeven.ToString());
                nv1.Add("@TwentyEight-bit", _TwentyEight.ToString());
                nv1.Add("@TwentyNine-bit", _TwentyNine.ToString());
                nv1.Add("@Thirty-bit", _Thirty.ToString());
                nv1.Add("@ThirtyOne-bit", _ThirtyOne.ToString());
                nv1.Add("@Level1-int", 0.ToString());
                nv1.Add("@Level2-int", 0.ToString());
                nv1.Add("@Level3-int", level3.ToString());
                nv1.Add("@Level4-int", level4.ToString());
                nv1.Add("@Level5-int", level5.ToString());
                nv1.Add("@Level6-int", level6.ToString());
                // ReSharper restore SpecifyACultureInStringConversionExplicitly
                // ReSharper disable UnusedVariable
                DataSet getPlanapp = GetData("Mioplaning_Update", nv1);
                // ReSharper restore UnusedVariable
            }
            catch (Exception ex) { ex.ErrorLog(); }
            return "";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Saveplan2(string pday, string pmonth, string pyear, int drid, int _TargetCall, int _ActualCall, int _Total, bool Cchecked, int planid, int _empid,
           bool _One, bool _Two, bool _Three, bool _Four, bool _Five, bool _Six, bool _Seven, bool _Eight, bool _Nine, bool _Ten, bool _Eleven, bool _Twelve,
           bool _Thirteen, bool _Fourteen, bool _Fiftheen, bool _Sixtheen, bool _Seventeen, bool _Eighteen, bool _Nineteen, bool _Twenty, bool _TwentyOne,
           bool _TwentyTwo, bool _TwentyThree, bool _TwentyFour, bool _TwentyFive, bool _TwentySix, bool _TwentySeven, bool _TwentyEight, bool _TwentyNine,
           bool _Thirty, bool _ThirtyOne, string _date, string _endday)
        // ReSharper restore InconsistentNaming
        {
            try
            {
                var nv1 = new NameValueCollection();
                _currentUser = (SystemUser)Session["SystemUser"];
                DateTime setdateF = Convert.ToDateTime(_date);
                var nv2 = new NameValueCollection();
                int level3 = 0, level4 = 0, level5 = 0, level6 = 0;
                nv2.Clear();
                // ReSharper disable SpecifyACultureInStringConversionExplicitly
                nv2.Add("@EmployeeId-bigint", Convert.ToInt64(_empid).ToString());
                // ReSharper restore SpecifyACultureInStringConversionExplicitly
                DataSet mioHR = GetData("Mioplaning_MIOHierarchy", nv2);

                if (mioHR.Tables.Count > 0)
                {
                    if (mioHR.Tables[0].Rows.Count > 0)
                    {
                        level3 = Convert.ToInt32(mioHR.Tables[0].Rows[0]["Level3LevelId"]);
                        level4 = Convert.ToInt32(mioHR.Tables[0].Rows[0]["Level4LevelId"]);
                        level5 = Convert.ToInt32(mioHR.Tables[0].Rows[0]["Level5LevelId"]);
                        level6 = Convert.ToInt32(mioHR.Tables[0].Rows[0]["Level6LevelId"]);
                    }
                }

                nv1.Clear();
                int i = 0;
                #region nv
                nv1.Add("@PlanningId-bigint", Convert.ToInt64(planid).ToString());
                nv1.Add("@TiemStamp-datetime", setdateF.ToString());
                nv1.Add("@EmployeeId-bigint", _empid.ToString());
                nv1.Add("@DoctorId-bigint", drid.ToString());
                nv1.Add("@TargetCall-bigint", _TargetCall.ToString());
                nv1.Add("@ActualCall-bigint", _ActualCall.ToString());
                nv1.Add("@Total-bigint", _Total.ToString());

                if (_endday == "10")
                {
                    #region 1
                    nv1.Add("@One-bit", _One.ToString());
                    nv1.Add("@Two-bit", _Two.ToString());
                    nv1.Add("@Three-bit", _Three.ToString());
                    nv1.Add("@Four-bit", _Four.ToString());
                    nv1.Add("@Five-bit", _Five.ToString());
                    nv1.Add("@Six-bit", _Six.ToString());
                    nv1.Add("@Seven-bit", _Seven.ToString());
                    nv1.Add("@Eight-bit", _Eight.ToString());
                    nv1.Add("@Nine-bit", _Nine.ToString());
                    nv1.Add("@Ten-bit", _Ten.ToString());
                    #endregion
                    i = 1;
                }
                else if (_endday == "20")
                {
                    #region 2
                    nv1.Add("@Eleven-bit", _Eleven.ToString());
                    nv1.Add("@Twelve-bit", _Twelve.ToString());
                    nv1.Add("@Thirteen-bit", _Thirteen.ToString());
                    nv1.Add("@Fourteen-bit", _Fourteen.ToString());
                    nv1.Add("@Fiftheen-bit", _Fiftheen.ToString());
                    nv1.Add("@Sixtheen-bit", _Sixtheen.ToString());
                    nv1.Add("@Seventeen-bit", _Seventeen.ToString());
                    nv1.Add("@Eighteen-bit", _Eighteen.ToString());
                    nv1.Add("@Nineteen-bit", _Nineteen.ToString());
                    nv1.Add("@Twenty-bit", _Twenty.ToString());
                    #endregion
                    i = 2;
                }
                else
                {
                    #region 3
                    nv1.Add("@TwentyOne-bit", _TwentyOne.ToString());
                    nv1.Add("@TwentyTwo-bit", _TwentyTwo.ToString());
                    nv1.Add("@TwentyThree-bit", _TwentyThree.ToString());
                    nv1.Add("@TwentyFour-bit", _TwentyFour.ToString());
                    nv1.Add("@TwentyFive-bit", _TwentyFive.ToString());
                    nv1.Add("@TwentySix-bit", _TwentySix.ToString());
                    nv1.Add("@TwentySeven-bit", _TwentySeven.ToString());
                    nv1.Add("@TwentyEight-bit", _TwentyEight.ToString());
                    nv1.Add("@TwentyNine-bit", _TwentyNine.ToString());
                    nv1.Add("@Thirty-bit", _Thirty.ToString());
                    nv1.Add("@ThirtyOne-bit", _ThirtyOne.ToString());
                    #endregion

                    i = 3;
                }
                #region
                nv1.Add("@Level1-int", 0.ToString());
                nv1.Add("@Level2-int", 0.ToString());
                nv1.Add("@Level3-int", level3.ToString());
                nv1.Add("@Level4-int", level4.ToString());
                nv1.Add("@Level5-int", level5.ToString());
                nv1.Add("@Level6-int", level6.ToString());
                #endregion
                #endregion
                if (i == 1)
                {
                    DataSet getPlanapp = GetData("Mioplaning_Update1", nv1);
                }
                if (i == 2)
                {
                    DataSet getPlanapp = GetData("Mioplaning_Update2", nv1);
                }
                if (i == 3)
                {
                    DataSet getPlanapp = GetData("Mioplaning_Update3", nv1);
                }


            }
            catch (Exception ex) { ex.ErrorLog(); }
            return "";
        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string SaveJVfromZsm(string mioPlanningId, string mioEmployeeId, string zsmEmployeeId, string isInformed, string isCoaching, string doctorId, string day, string ddate)
        {
            var returnString = "";
            var insertRecord = _dl.InserData("MIOPlanningLevel_Insert", new NameValueCollection { { "@MIOPlanningId-INT", mioPlanningId }, { "@MIO_EmployeeId-INT", mioEmployeeId }, { "@ZSM_EmployeeId-INT", zsmEmployeeId }, { "@CreatedDate-DATETIME", DateTime.Now.ToString() }, { "@IsInformed-BIT", isInformed }, { "@IsCoaching-BIT", isCoaching }, { "@DoctorId-INT", doctorId }, { "@Day-INT", day }, { "@ddate-DATETIME", Convert.ToDateTime(ddate).ToString() } });
            returnString = insertRecord ? "Record Saved" : "Error in Saving Record";
            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetJvDetail(string mioPlanningId, string mioEmployeeId, string zsmEmployeeId, string doctorId, string day, string ddate)
        {
            var returnString = "";
            var dsJvDetail = _dl.GetData("MIOPlanningLevel_Select",
                new NameValueCollection
                {
                    {"@MIOPlanningId-INT", mioPlanningId},
                    {"@MIO_EmployeeId-INT", mioEmployeeId},
                    {"@ZSM_EmployeeId-INT", zsmEmployeeId},
                    {"@DoctorId-INT", doctorId },
                    {"@Day-INT", day },
                    {"@ddate-DATETIME", Convert.ToDateTime(ddate).ToString() }
                });
            if (dsJvDetail != null)
                if (dsJvDetail.Tables[0].Rows.Count > 0)
                {

                    returnString = dsJvDetail.Tables[0].ToJsonString();
                }
            return returnString;
        }


        [WebMethod(EnableSession = true)]
        // ReSharper disable InconsistentNaming
        public string PlanStatus(string _date, int _EmployeeId)
        // ReSharper restore InconsistentNaming
        {
            var nv1 = new NameValueCollection();
            var nDate = Convert.ToDateTime(_date);
            nv1.Clear();
            // ReSharper disable SpecifyACultureInStringConversionExplicitly
            nv1.Add("@EmployeeId-bigint", Convert.ToInt64(_EmployeeId).ToString());
            nv1.Add("@TiemStamp-datetime", nDate.ToString());
            // ReSharper restore SpecifyACultureInStringConversionExplicitly
            DataSet getPlanapp = GetData("MIOPlanning_SelApproval", nv1);
            if (getPlanapp.Tables.Count > 0)
            {
                if (getPlanapp.Tables[0].Rows.Count > 0)
                {
                    _vplan = getPlanapp.Tables[0].ToJsonString();
                }
                else
                {
                    SaveblankPlan(_EmployeeId, Convert.ToDateTime(_date));
                    nv1.Clear();
                    // ReSharper disable SpecifyACultureInStringConversionExplicitly
                    nv1.Add("@EmployeeId-bigint", Convert.ToInt64(_EmployeeId).ToString());
                    nv1.Add("@TiemStamp-datetime", nDate.ToString());
                    // ReSharper restore SpecifyACultureInStringConversionExplicitly
                    getPlanapp = GetData("MIOPlanning_SelApproval", nv1);
                    if (getPlanapp.Tables.Count > 0)
                    {
                        if (getPlanapp.Tables[0].Rows.Count > 0)
                        {
                            _vplan = getPlanapp.Tables[0].ToJsonString();
                        }
                    }
                }
            }
            return _vplan;
        }

        [WebMethod(EnableSession = true)]
        // ReSharper disable InconsistentNaming
        public string PlanStatus_update(string _date, int _EmployeeId, string _Reason, string _PlanStatus)
        // ReSharper restore InconsistentNaming
        {
            string returnstring;
            try
            {

                var nv1 = new NameValueCollection();
                var nDate = Convert.ToDateTime(_date);
                nv1.Clear();
                // ReSharper disable SpecifyACultureInStringConversionExplicitly
                nv1.Add("@EmployeeId-bigint", Convert.ToInt64(_EmployeeId).ToString());
                nv1.Add("@TiemStamp-datetime", nDate.ToString());
                // ReSharper restore SpecifyACultureInStringConversionExplicitly
                nv1.Add("@Reason-nvarchar-300", _Reason);
                nv1.Add("@PlanStatus-nvarchar-50", _PlanStatus);
                // ReSharper disable UnusedVariable
                DataSet getPlanapp = GetData("MIOPlanning_UpdateApproval", nv1);
                // ReSharper restore UnusedVariable
                returnstring = "Update";
            }
            catch (Exception ex)
            {
                ex.ErrorLog();
                returnstring = "error";
            }
            return returnstring;
        }
        // ReSharper disable InconsistentNaming
        [WebMethod(EnableSession = true)]
        public string PlanExecuteRecurrence(string _Fdate, string _tdate, int _Employeeid)
        // ReSharper restore InconsistentNaming
        {
            var returnstring = "";

            var fromDate = Convert.ToDateTime(_Fdate);
            var fyear = Convert.ToDateTime(_Fdate).Year;
            var fmonth = Convert.ToDateTime(_Fdate).Month;

            var toDate = Convert.ToDateTime(_tdate);


            var nv = new NameValueCollection();

            #region

            #region TO Data
            nv.Clear();
            nv.Add("@DoctorId-bigint", "NULL");
            nv.Add("@ClassId-int", "NULL");
            nv.Add("@BrickId-int", "NULL");
            nv.Add("@SpecialityId-int", "NULL");
            // ReSharper disable SpecifyACultureInStringConversionExplicitly
            nv.Add("@EmployeeId-bigint", Convert.ToInt64(_Employeeid).ToString());
            nv.Add("@TiemStamp-datetime", toDate.ToString());
            // ReSharper restore SpecifyACultureInStringConversionExplicitly
            DataSet gettoPlan = GetData("Mioplaning", nv);
            #endregion

            if (gettoPlan.Tables.Count > 0)
            {
                if (gettoPlan.Tables[0].Rows.Count == 0)
                {
                    SaveblankPlan(_Employeeid, toDate);

                    #region From Data

                    #region From Data Parameter
                    nv.Clear();
                    nv.Add("@DoctorId-bigint", "NULL");
                    nv.Add("@ClassId-int", "NULL");
                    nv.Add("@BrickId-int", "NULL");
                    nv.Add("@SpecialityId-int", "NULL");
                    // ReSharper disable SpecifyACultureInStringConversionExplicitly
                    nv.Add("@EmployeeId-bigint", Convert.ToInt64(_Employeeid).ToString());
                    nv.Add("@TiemStamp-datetime", fromDate.ToString());
                    // ReSharper restore SpecifyACultureInStringConversionExplicitly
                    DataSet getPlan = GetData("Mioplaning", nv);
                    #endregion

                    if (getPlan.Tables.Count > 0)
                    {
                        // ReSharper disable ForCanBeConvertedToForeach
                        for (int i = 0; i < getPlan.Tables.Count; i++)
                        // ReSharper restore ForCanBeConvertedToForeach
                        {
                            #region getdata
                            // ReSharper disable UnusedVariable
                            var empId = getPlan.Tables[0].Rows[0]["EmployeeId"].ToString();
                            var drId = getPlan.Tables[0].Rows[0]["DoctorId"].ToString();
                            var pdt = getPlan.Tables[0].Rows[0]["TiemStamp"].ToString();
                            var p1 = getPlan.Tables[0].Rows[0]["a1"].ToString();
                            var p2 = getPlan.Tables[0].Rows[0]["a2"].ToString();
                            var p3 = getPlan.Tables[0].Rows[0]["a3"].ToString();
                            var p4 = getPlan.Tables[0].Rows[0]["a4"].ToString();
                            var p5 = getPlan.Tables[0].Rows[0]["a5"].ToString();
                            var p6 = getPlan.Tables[0].Rows[0]["a6"].ToString();
                            var p7 = getPlan.Tables[0].Rows[0]["a7"].ToString();
                            var p8 = getPlan.Tables[0].Rows[0]["a8"].ToString();
                            var p9 = getPlan.Tables[0].Rows[0]["a9"].ToString();
                            var p10 = getPlan.Tables[0].Rows[0]["a10"].ToString();
                            var p11 = getPlan.Tables[0].Rows[0]["a11"].ToString();
                            var p12 = getPlan.Tables[0].Rows[0]["a12"].ToString();
                            var p13 = getPlan.Tables[0].Rows[0]["a13"].ToString();
                            var p14 = getPlan.Tables[0].Rows[0]["a14"].ToString();
                            var p15 = getPlan.Tables[0].Rows[0]["a15"].ToString();
                            var p16 = getPlan.Tables[0].Rows[0]["a16"].ToString();
                            var p17 = getPlan.Tables[0].Rows[0]["a17"].ToString();
                            var p18 = getPlan.Tables[0].Rows[0]["a18"].ToString();
                            var p19 = getPlan.Tables[0].Rows[0]["a19"].ToString();
                            var p20 = getPlan.Tables[0].Rows[0]["a20"].ToString();
                            var p21 = getPlan.Tables[0].Rows[0]["a21"].ToString();
                            var p22 = getPlan.Tables[0].Rows[0]["a22"].ToString();
                            var p23 = getPlan.Tables[0].Rows[0]["a23"].ToString();
                            var p24 = getPlan.Tables[0].Rows[0]["a24"].ToString();
                            var p25 = getPlan.Tables[0].Rows[0]["a25"].ToString();
                            var p26 = getPlan.Tables[0].Rows[0]["a26"].ToString();
                            var p27 = getPlan.Tables[0].Rows[0]["a27"].ToString();
                            var p28 = getPlan.Tables[0].Rows[0]["a28"].ToString();
                            var p29 = getPlan.Tables[0].Rows[0]["a29"].ToString();
                            var p30 = getPlan.Tables[0].Rows[0]["a30"].ToString();
                            var p31 = getPlan.Tables[0].Rows[0]["a31"].ToString();
                            #endregion
                            var asdas = GetWeekdatesandDates(fmonth, fyear, DayOfWeek.Friday);
                            // ReSharper restore UnusedVariable
                        }

                    }
                    #endregion
                }
                else
                {
                    returnstring = "Plan already!";
                }
            }

            #endregion

            return returnstring;
        }

        public List<DateTime> GetWeekdatesandDates(int month, int year, DayOfWeek dayOfWeek1)
        {
            var weekdays = new List<DateTime>();

            var firstOfMonth = new DateTime(year, month, 1);
            var currentDay = firstOfMonth;

            while (firstOfMonth.Month == currentDay.Month)
            {

                DayOfWeek dayOfWeek = currentDay.DayOfWeek;

                if (dayOfWeek == dayOfWeek1)
                    weekdays.Add(currentDay);

                currentDay = currentDay.AddDays(1);
            }

            return weekdays;
        }


        [WebMethod(EnableSession = true)]
        public string SaveExecution(string dt, string dc, int employeeId, string startTime, string endTime, string activityId, string products, string reminders, string samples, string gifts)
        {
            string reslt = string.Empty;
            var classId = 0;
            // ReSharper disable JoinDeclarationAndInitializer
            int specialityId;
            // ReSharper restore JoinDeclarationAndInitializer
            // ReSharper disable RedundantAssignment
            int qualificationId = 0;
            // ReSharper restore RedundantAssignment
            // ReSharper disable InconsistentNaming
            string VT;
            string P1 = "", P2 = "", P3 = "", P4 = "";
            string R1 = "", R2 = "", R3 = "", R4 = "";
            string S1 = "", S2 = "", S3 = "", S4 = "";
            string G1 = "", G2 = "", G3 = "", G4 = "";
            string Q1 = "", Q2 = "", Q3 = "", Q4 = "";
            string QG1 = "", QG2 = "", QG3 = "", QG4 = "";
            // ReSharper restore InconsistentNaming
            DateTime dtcheck;
            var product1Id = 0;
            var productSku1Id = 0;
            var product2Id = 0;
            var productSku2Id = 0;
            var product3Id = 0;
            var productSku3Id = 0;
            var product4Id = 0;
            var productSku4Id = 0;
            var sample1Id = 0;
            var sampleSku1Id = 0;
            var sample2Id = 0;
            var sampleSku2Id = 0;
            var sample3Id = 0;
            var sampleSku3Id = 0;
            var sample4Id = 0;
            var sampleSku4Id = 0;
            long gift1Id = 0;
            long gift2Id = 0;
            long gift3Id = 0;
            long gift4Id = 0;
            int levelId1 = 0, levelId2 = 0, levelId3 = 0, levelId4 = 0, levelId5 = 0, levelId6 = 0;
            #region Validation

            if (DateTime.TryParse(dt, out dtcheck))
            {
                dtcheck = Convert.ToDateTime(dt);
            }
            else
            {
                reslt = "Unable to Parse Date";
            }

            var lstvemployeeHR = (from p in _dataContext.v_EmployeeHierarchies
                                  where p.EmployeeId == employeeId
                                  select p).ToList();
            if (lstvemployeeHR.Count == 0)
            {
                if (!lstvemployeeHR[0].IsActive)
                {
                    reslt = "Employee Not Found";
                }
            }

            var lstMrdr = (from p in _dataContext.v_MRDoctors
                           where p.EmployeeId == employeeId
                           where p.DoctorCode == dc
                           select p).ToList();
            if (lstMrdr.Count == 0)
            {
                reslt = "DC Not Found for Employee";
            }

            var lstDoctorDetail = (from p in _dataContext.v_DoctorDetails
                                   where p.DoctorId == lstMrdr[0].DoctorId
                                   select p).ToList();
            if (lstDoctorDetail.Count == 0)
            {
                reslt = "Doctor Not Found";
            }
            #endregion

            #region Doctor Class

            var getClassOfDoctor = _dataContext.sp_ClassOfDoctorSelect(lstMrdr[0].DoctorId).ToList();

            if (getClassOfDoctor.Count != 0)
            {
                classId = Convert.ToInt32(getClassOfDoctor[0].ClassId);
            }

            #endregion

            #region Doctor Speciality

            var getSpecialityOfDoctor = _dataContext.sp_DoctorSpecialitySelectByDoctor(lstMrdr[0].DoctorId).ToList();

            specialityId = getSpecialityOfDoctor.Count != 0 ? Convert.ToInt32(getSpecialityOfDoctor[0].SpecialityId) : 1;

            #endregion

            #region Doctor Qualification

            var getQualificationOfDoctor = _dataContext.sp_QualificationsOfDoctorsSelectByDoctor(lstMrdr[0].DoctorId).ToList();

            qualificationId = getQualificationOfDoctor.Count != 0 ? Convert.ToInt32(getQualificationOfDoctor[0].QulificationId) : 1;

            #endregion

            if (dtcheck.Hour < 12)
            {
                VT = "1";
            }
            else if (dtcheck.Hour < 18)
            {
                VT = "1";
            }
            else
            {
                VT = "2";
            }

            if (reslt == string.Empty)
            {
                var getEmployeeMembership = _dataContext.sp_EmployeeMembershipSelectByEmployee(employeeId).ToList();

                if (getEmployeeMembership.Count != 0)
                {
                    long systemUserID = Convert.ToInt64(getEmployeeMembership[0].SystemUserID);
                    var getEmployeeHierarchy = _dataContext.sp_EmplyeeHierarchySelect(systemUserID).ToList();

                    if (getEmployeeHierarchy.Count != 0)
                    {
                        levelId1 = Convert.ToInt32(getEmployeeHierarchy[0].LevelId1);
                        levelId2 = Convert.ToInt32(getEmployeeHierarchy[0].LevelId2);
                        levelId3 = Convert.ToInt32(getEmployeeHierarchy[0].LevelId3);
                        levelId4 = Convert.ToInt32(getEmployeeHierarchy[0].LevelId4);
                        levelId5 = Convert.ToInt32(getEmployeeHierarchy[0].LevelId5);
                        levelId6 = Convert.ToInt32(getEmployeeHierarchy[0].LevelId6);
                    }
                }


                _nvCollection.Clear();
                // ReSharper disable SpecifyACultureInStringConversionExplicitly
                _nvCollection.Add("@VisitDateTime-datetime", dtcheck.ToString());
                _nvCollection.Add("@Level1LevelId-INT", levelId1.ToString());
                _nvCollection.Add("@Level2LevelId-int", levelId2.ToString());
                _nvCollection.Add("@Level3LevelId-int", levelId3.ToString());
                _nvCollection.Add("@Level4LevelId-int", levelId4.ToString());
                _nvCollection.Add("@Level5LevelId-int", levelId5.ToString());
                _nvCollection.Add("@Level6LevelId-int", levelId6.ToString());
                _nvCollection.Add("@ClassId-int", classId.ToString());
                _nvCollection.Add("@SpecialityId-int", specialityId.ToString());
                _nvCollection.Add("@QulificationId-int", qualificationId.ToString());
                _nvCollection.Add("@CreationDateTime-datetime", DateTime.Now.ToString());
                _nvCollection.Add("@CallTypeId-int", "1");
                _nvCollection.Add("@VisitShift-int", VT);
                _nvCollection.Add("@DoctorId-bigint", lstMrdr[0].DoctorId.ToString());
                _nvCollection.Add("@EmployeeId-bigint", employeeId.ToString());
                _nvCollection.Add("@InboundId-bigint", "NULL");
                _nvCollection.Add("@DocCode-INT", dc);
                // ReSharper restore SpecifyACultureInStringConversionExplicitly
                DataSet insertPreSaleCalls = GetData("sp_PreSalesCallsInsert2", _nvCollection);

                if (insertPreSaleCalls.Tables[0].Rows.Count > 0)
                {
                    var preSalesCallsId = Convert.ToInt64(insertPreSaleCalls.Tables[0].Rows[0]["SalesCallId"]);

                    #region CallDoctors
                    // ReSharper disable UnusedVariable
                    var asasdd = _dataContext.sp_CallDoctorsInsert(preSalesCallsId, lstMrdr[0].DoctorId).ToList();
                    // ReSharper restore UnusedVariable
                    #endregion

                    #region CallVisitors

                    //if (JV != "0 0 0 0")
                    //    if (JV != "NULL")
                    //    {
                    //        var insertCallVisitor = _dataContext.sp_CalVisitorsInsertNew(preSalesCallsId, employeeId, JVZSM, JVRSM, JVNSM, JVHO).ToList();
                    //    }

                    #endregion

                    #region VisitFeedBack
                    // ReSharper disable UnusedVariable
                    var asd = _dataContext.sp_VisitFeedBackInsert(preSalesCallsId, "DCR has been done successfully").ToList();
                    // ReSharper restore UnusedVariable
                    #endregion

                    #region CallProducts

                    List<DatabaseLayer.SQL.ProductSku> getProductSku;
                    if (products != "")
                    {
                        string[] product = products.Split(';');
                        for (int i = 0; i < product.Length - 1; i++)
                        {
                            if (product[i] != "-1")
                            {
                                if (i == 0)
                                {
                                    P1 = product[i];
                                    getProductSku = _dataContext.sp_ProductSkuSelect(null, null, P1).ToList();

                                    if (getProductSku.Count != 0)
                                    {
                                        product1Id = Convert.ToInt32(getProductSku[0].ProductId);
                                        productSku1Id = Convert.ToInt32(getProductSku[0].SkuId);
                                    }
                                }
                                else if (i == 1)
                                {
                                    P2 = product[i];
                                    getProductSku = _dataContext.sp_ProductSkuSelect(null, null, P2).ToList();

                                    if (getProductSku.Count != 0)
                                    {
                                        product2Id = Convert.ToInt32(getProductSku[0].ProductId);
                                        productSku2Id = Convert.ToInt32(getProductSku[0].SkuId);
                                    }
                                }
                                else if (i == 2)
                                {
                                    P3 = product[i];
                                    getProductSku = _dataContext.sp_ProductSkuSelect(null, null, P3).ToList();

                                    if (getProductSku.Count != 0)
                                    {
                                        product3Id = Convert.ToInt32(getProductSku[0].ProductId);
                                        productSku3Id = Convert.ToInt32(getProductSku[0].SkuId);
                                    }
                                }
                                else if (i == 4)
                                {
                                    P4 = product[i];
                                    getProductSku = _dataContext.sp_ProductSkuSelect(null, null, P4).ToList();

                                    if (getProductSku.Count != 0)
                                    {
                                        product4Id = Convert.ToInt32(getProductSku[0].ProductId);
                                        productSku4Id = Convert.ToInt32(getProductSku[0].SkuId);
                                    }
                                }
                            }
                        }

                    }
                    #endregion

                    #region CallSamples
                    if (samples != "")
                    {
                        string[] sample = samples.Split(';');
                        for (int i = 0; i < sample.Length - 1; i++)
                        {
                            if (sample[i] != "-1")
                            {
                                if (i == 0)
                                {
                                    S1 = sample[i].Split('|')[0];
                                    getProductSku = _dataContext.sp_ProductSkuSelect(null, null, S1).ToList();

                                    if (getProductSku.Count != 0)
                                    {
                                        sample1Id = Convert.ToInt32(getProductSku[0].ProductId);
                                        sampleSku1Id = Convert.ToInt32(getProductSku[0].SkuId);
                                    }

                                    Q1 = sample[i].Split('|')[1];
                                }
                                else if (i == 1)
                                {
                                    S2 = sample[i].Split('|')[0];
                                    getProductSku = _dataContext.sp_ProductSkuSelect(null, null, S2).ToList();

                                    if (getProductSku.Count != 0)
                                    {
                                        sample2Id = Convert.ToInt32(getProductSku[0].ProductId);
                                        sampleSku2Id = Convert.ToInt32(getProductSku[0].SkuId);
                                    }
                                    Q2 = sample[i].Split('|')[1];
                                }
                                else if (i == 2)
                                {
                                    S3 = sample[i].Split('|')[0];

                                    getProductSku = _dataContext.sp_ProductSkuSelect(null, null, S3).ToList();

                                    if (getProductSku.Count != 0)
                                    {
                                        sample3Id = Convert.ToInt32(getProductSku[0].ProductId);
                                        sampleSku3Id = Convert.ToInt32(getProductSku[0].SkuId);
                                    }
                                    Q3 = sample[i].Split('|')[1];
                                }
                                else if (i == 4)
                                {
                                    S4 = sample[i].Split('|')[0];
                                    getProductSku = _dataContext.sp_ProductSkuSelect(null, null, S4).ToList();

                                    if (getProductSku.Count != 0)
                                    {
                                        sample4Id = Convert.ToInt32(getProductSku[0].ProductId);
                                        sampleSku4Id = Convert.ToInt32(getProductSku[0].SkuId);
                                    }
                                    Q4 = sample[i].Split('|')[1];
                                }
                            }

                        }

                    }
                    #endregion

                    #region CallReminders
                    if (reminders != "")
                    {
                        string[] reminder = reminders.Split(';');
                        for (int i = 0; i < reminder.Length - 1; i++)
                        {
                            if (reminder[i] != "-1")
                            {
                                if (i == 0)
                                {
                                    R1 = reminder[i];
                                }
                                else if (i == 1)
                                {
                                    R2 = reminder[i];
                                }
                                else if (i == 2)
                                {
                                    R3 = reminder[i];
                                }
                                else if (i == 4)
                                {
                                    R4 = reminder[i];
                                }
                            }
                        }
                    }
                    #endregion

                    #region CallGifts
                    if (gifts != "")
                    {
                        string[] gift = gifts.Split(';');
                        for (int i = 0; i < gift.Length - 1; i++)
                        {
                            if (gift[i] != "-1")
                            {
                                List<GiftItem> getGiftItems;
                                if (i == 0)
                                {
                                    G1 = gift[i].Split('|')[0];
                                    getGiftItems = _dataContext.sp_GiftItemsSelectByCode(G1).ToList();

                                    if (getGiftItems.Count != 0)
                                    {
                                        gift1Id = Convert.ToInt64(getGiftItems[0].GiftId);
                                    }
                                    QG1 = gift[i].Split('|')[1];
                                }
                                else if (i == 1)
                                {
                                    G2 = gift[i].Split('|')[0];
                                    getGiftItems = _dataContext.sp_GiftItemsSelectByCode(G1).ToList();

                                    if (getGiftItems.Count != 0)
                                    {
                                        gift2Id = Convert.ToInt64(getGiftItems[0].GiftId);
                                    }
                                    QG2 = gift[i].Split('|')[1];
                                }
                                else if (i == 2)
                                {
                                    G3 = gift[i].Split('|')[0];
                                    getGiftItems = _dataContext.sp_GiftItemsSelectByCode(G1).ToList();

                                    if (getGiftItems.Count != 0)
                                    {
                                        gift3Id = Convert.ToInt64(getGiftItems[0].GiftId);
                                    }
                                    QG3 = gift[i].Split('|')[1];
                                }
                                else if (i == 3)
                                {
                                    G4 = gift[i].Split('|')[0];
                                    getGiftItems = _dataContext.sp_GiftItemsSelectByCode(G1).ToList();

                                    if (getGiftItems.Count != 0)
                                    {
                                        gift4Id = Convert.ToInt64(getGiftItems[0].GiftId);
                                    }
                                    QG4 = gift[i].Split('|')[1];
                                }
                            }
                        }
                    }

                    #endregion

                    #region Insert Call Products and Reminders
                    // ReSharper disable NotAccessedVariable
                    List<CallProduct> insertCallProduct;
                    // ReSharper restore NotAccessedVariable

                    if (P1 != "")
                    {
                        // ReSharper disable ConvertIfStatementToConditionalTernaryExpression
                        if (R1 != "")
                        // ReSharper restore ConvertIfStatementToConditionalTernaryExpression
                        {
                            // ReSharper disable RedundantAssignment
                            insertCallProduct =
                                _dataContext.sp_CallProductsInsert(product1Id, preSalesCallsId, Convert.ToInt32(R1), productSku1Id, 1).ToList();
                        }
                        else
                        {
                            insertCallProduct =
                                _dataContext.sp_CallProductsInsert(product1Id, preSalesCallsId, 0, productSku1Id, 1).ToList();
                        }
                        // ReSharper restore RedundantAssignment
                    }


                    if (P2 != "")
                    {
                        // ReSharper disable ConvertIfStatementToConditionalTernaryExpression
                        if (R2 != "")
                        // ReSharper restore ConvertIfStatementToConditionalTernaryExpression
                        {
                            // ReSharper disable RedundantAssignment
                            insertCallProduct =
                                // ReSharper restore RedundantAssignment
                                  _dataContext.sp_CallProductsInsert(product2Id, preSalesCallsId, Convert.ToInt32(R2), productSku2Id, 2).ToList();
                        }
                        else
                        {
                            // ReSharper disable RedundantAssignment
                            insertCallProduct =
                                // ReSharper restore RedundantAssignment
                                _dataContext.sp_CallProductsInsert(product2Id, preSalesCallsId, 0, productSku2Id, 2).ToList();
                        }
                    }

                    if (P3 != "")
                    {
                        // ReSharper disable ConvertIfStatementToConditionalTernaryExpression
                        if (R3 != "")
                        // ReSharper restore ConvertIfStatementToConditionalTernaryExpression
                        {
                            // ReSharper disable RedundantAssignment
                            insertCallProduct =
                                // ReSharper restore RedundantAssignment
                                _dataContext.sp_CallProductsInsert(product3Id, preSalesCallsId, Convert.ToInt32(R3), productSku3Id, 3).ToList();
                        }
                        else
                        {
                            // ReSharper disable RedundantAssignment
                            insertCallProduct =
                                // ReSharper restore RedundantAssignment
                                _dataContext.sp_CallProductsInsert(product3Id, preSalesCallsId, 0, productSku3Id, 3).ToList();
                        }
                    }

                    if (P4 != "")
                    {
                        // ReSharper disable ConvertIfStatementToConditionalTernaryExpression
                        if (R4 != "")
                        // ReSharper restore ConvertIfStatementToConditionalTernaryExpression
                        {
                            // ReSharper disable RedundantAssignment
                            insertCallProduct =
                                // ReSharper restore RedundantAssignment
                                _dataContext.sp_CallProductsInsert(product4Id, preSalesCallsId, Convert.ToInt32(R4), productSku4Id, 4).ToList();
                        }
                        else
                        {
                            // ReSharper disable RedundantAssignment
                            insertCallProduct =
                                // ReSharper restore RedundantAssignment
                                _dataContext.sp_CallProductsInsert(product4Id, preSalesCallsId, 0, productSku4Id, 4).ToList();
                        }
                    }


                    if (R1 != "")
                    {
                        _nvCollection.Clear();
                        // ReSharper disable SpecifyACultureInStringConversionExplicitly
                        _nvCollection.Add("@SalesCallID-INT", preSalesCallsId.ToString());
                        // ReSharper restore SpecifyACultureInStringConversionExplicitly
                        _nvCollection.Add("@ReminderID-INT", R1);
                        _nvCollection.Add("@ReminderOrder-INT", "1");
                        // ReSharper disable UnusedVariable
                        bool ressslt = _dl.InserData("insertCallReminders", _nvCollection);
                        // ReSharper restore UnusedVariable
                    }
                    if (R2 != "")
                    {
                        _nvCollection.Clear();
                        // ReSharper disable SpecifyACultureInStringConversionExplicitly
                        _nvCollection.Add("@SalesCallID-INT", preSalesCallsId.ToString());
                        // ReSharper restore SpecifyACultureInStringConversionExplicitly
                        _nvCollection.Add("@ReminderID-INT", R2);
                        _nvCollection.Add("@ReminderOrder-INT", "2");
                        // ReSharper disable UnusedVariable
                        bool ressslt = _dl.InserData("insertCallReminders", _nvCollection);
                        // ReSharper restore UnusedVariable
                    }
                    if (R3 != "")
                    {
                        _nvCollection.Clear();
                        // ReSharper disable SpecifyACultureInStringConversionExplicitly
                        _nvCollection.Add("@SalesCallID-INT", preSalesCallsId.ToString());
                        // ReSharper restore SpecifyACultureInStringConversionExplicitly
                        _nvCollection.Add("@ReminderID-INT", R3);
                        _nvCollection.Add("@ReminderOrder-INT", "3");
                        // ReSharper disable UnusedVariable
                        bool ressslt = _dl.InserData("insertCallReminders", _nvCollection);
                        // ReSharper restore UnusedVariable
                    }

                    #endregion

                    #region Insert Call Product Samples

                    // ReSharper disable NotAccessedVariable
                    List<CallProductSample> insertCallProductSample;
                    // ReSharper restore NotAccessedVariable
                    //List<MInventory> getInventory;
                    //List<MCInventory> updateInventory;
                    //List<v_Inventory> getInventoryDetail;

                    //var year = Convert.ToInt32(dtcheck.Day);
                    //var month = Convert.ToInt32(dtcheck.Day);
                    //var mrId = Convert.ToInt64(insertPreSaleCalls.Tables[0].Rows[0]["EmployeeId"].ToString());
                    //long remainingQuantity = 0;

                    //getInventory = _dataContext.sp_MInventorySelect(mrId, year, month).ToList();

                    if (S1 != "" && Q1 != "")
                    {
                        // ReSharper disable UnusedVariable
                        // ReSharper disable RedundantAssignment
                        insertCallProductSample =
                            // ReSharper restore RedundantAssignment
                            _dataContext.sp_CallProductSamplesInsert(preSalesCallsId, sample1Id, sampleSku1Id, Convert.ToInt32(Q1), 1).ToList();
                        // ReSharper restore UnusedVariable
                        #region Update Inventory

                        //if (getInventory.Count != 0)
                        //{
                        //    getInventoryDetail = _dataContext.sp_MCInventorySelect(mrId, sample1Id, year, month).ToList();

                        //    if (getInventoryDetail.Count != 0)
                        //    {
                        //        remainingQuantity = Convert.ToInt64(getInventoryDetail[0].Remaining);

                        //        if (remainingQuantity != 0)
                        //        {
                        //            updateInventory = _dataContext.sp_InventoryUpdateByMR(month, sample1Id, long.Parse(Q1), remainingQuantity).ToList();
                        //        }
                        //        else
                        //        {
                        //            ErrorLog("EmployeeId: " + employeeId + ", SampleId: " + sample1Id
                        //                + " has been empty in stock. Update your inventory");
                        //        }
                        //    }
                        //    else
                        //    {
                        //        _mgsText = "Dear " + _employeeName + ", Sample Code: " + S1 + " unable to match with your list!";
                        //        goto InventoryInvalid;
                        //    }
                        //}
                        //else
                        //{
                        //    goto InventoryEmpty;
                        //}

                        #endregion
                    }


                    if (S2 != "" && Q2 != "")
                    {
                        // ReSharper disable RedundantAssignment
                        insertCallProductSample =
                            _dataContext.sp_CallProductSamplesInsert(preSalesCallsId, sample2Id, sampleSku2Id, Convert.ToInt32(Q2), 2).ToList();
                        // ReSharper restore RedundantAssignment
                        #region Update Inventory

                        //if (getInventory.Count != 0)
                        //{
                        //    getInventoryDetail = _dataContext.sp_MCInventorySelect(mrId, sample2Id, year, month).ToList();

                        //    if (getInventoryDetail.Count != 0)
                        //    {
                        //        remainingQuantity = Convert.ToInt64(getInventoryDetail[0].Remaining);

                        //        if (remainingQuantity != 0)
                        //        {
                        //            updateInventory = _dataContext.sp_InventoryUpdateByMR(month, sample2Id, long.Parse(Q2), remainingQuantity).ToList();
                        //        }
                        //        else
                        //        {
                        //            ErrorLog("EmployeeId: " + employeeId + ", SampleId: " + sample2Id
                        //                + " has been empty in stock. Update your inventory");
                        //        }
                        //    }
                        //    else
                        //    {
                        //        _mgsText = "Dear " + _employeeName + ", Sample Code: " + S2 + " unable to match with your list!";
                        //        goto InventoryInvalid;
                        //    }
                        //}
                        //else
                        //{
                        //    goto InventoryEmpty;
                        //}

                        #endregion
                    }

                    if (S3 != "" && Q3 != "")
                    {
                        // ReSharper disable RedundantAssignment
                        insertCallProductSample =
                            _dataContext.sp_CallProductSamplesInsert(preSalesCallsId, sample3Id, sampleSku3Id, Convert.ToInt32(Q3), 3).ToList();
                        // ReSharper restore RedundantAssignment
                        #region Update Inventory

                        //if (getInventory.Count != 0)
                        //{
                        //    getInventoryDetail = _dataContext.sp_MCInventorySelect(mrId, sample2Id, year, month).ToList();

                        //    if (getInventoryDetail.Count != 0)
                        //    {
                        //        remainingQuantity = Convert.ToInt64(getInventoryDetail[0].Remaining);

                        //        if (remainingQuantity != 0)
                        //        {
                        //            updateInventory = _dataContext.sp_InventoryUpdateByMR(month, sample2Id, long.Parse(Q2), remainingQuantity).ToList();
                        //        }
                        //        else
                        //        {
                        //            ErrorLog("EmployeeId: " + employeeId + ", SampleId: " + sample2Id
                        //                + " has been empty in stock. Update your inventory");
                        //        }
                        //    }
                        //    else
                        //    {
                        //        _mgsText = "Dear " + _employeeName + ", Sample Code: " + S3 + " unable to match with your list!";
                        //        goto InventoryInvalid;
                        //    }
                        //}
                        //else
                        //{
                        //    goto InventoryEmpty;
                        //}

                        #endregion
                    }

                    if (S4 != "" && Q4 != "")
                    {
                        // ReSharper disable RedundantAssignment
                        insertCallProductSample =
                            _dataContext.sp_CallProductSamplesInsert(preSalesCallsId, sample4Id, sampleSku4Id, Convert.ToInt32(Q4), 4).ToList();
                        // ReSharper restore RedundantAssignment
                        #region Update Inventory

                        //if (getInventory.Count != 0)
                        //{
                        //    getInventoryDetail = _dataContext.sp_MCInventorySelect(mrId, sample2Id, year, month).ToList();

                        //    if (getInventoryDetail.Count != 0)
                        //    {
                        //        remainingQuantity = Convert.ToInt64(getInventoryDetail[0].Remaining);

                        //        if (remainingQuantity != 0)
                        //        {
                        //            updateInventory = _dataContext.sp_InventoryUpdateByMR(month, sample2Id, long.Parse(Q2), remainingQuantity).ToList();
                        //        }
                        //        else
                        //        {
                        //            ErrorLog("EmployeeId: " + employeeId + ", SampleId: " + sample2Id
                        //                + " has been empty in stock. Update your inventory");
                        //        }
                        //    }
                        //    else
                        //    {
                        //        _mgsText = "Dear " + _employeeName + ", Sample Code: " + S3 + " unable to match with your list!";
                        //        goto InventoryInvalid;
                        //    }
                        //}
                        //else
                        //{
                        //    goto InventoryEmpty;
                        //}

                        #endregion
                    }

                    #endregion

                    #region Insert Call Gifts

                    // ReSharper disable NotAccessedVariable
                    List<CallGift> insertCallGift;
                    // ReSharper restore NotAccessedVariable

                    if (G1 != "")
                    {
                        // ReSharper disable ConvertIfStatementToConditionalTernaryExpression
                        if (QG1 != "")
                        // ReSharper restore ConvertIfStatementToConditionalTernaryExpression
                        {

                            // ReSharper disable RedundantAssignment
                            insertCallGift =
                                // ReSharper restore RedundantAssignment
                                _dataContext.sp_CallGiftsInsert(preSalesCallsId, gift1Id, Convert.ToInt32(QG1), 1).ToList();
                        }
                        else
                        {
                            // ReSharper disable RedundantAssignment
                            insertCallGift =
                                // ReSharper restore RedundantAssignment
                                _dataContext.sp_CallGiftsInsert(preSalesCallsId, gift1Id, 0, 1).ToList();
                        }
                    }

                    if (G2 != "")
                    {
                        // ReSharper disable ConvertIfStatementToConditionalTernaryExpression
                        if (QG2 != "")
                        // ReSharper restore ConvertIfStatementToConditionalTernaryExpression
                        {
                            // ReSharper disable RedundantAssignment
                            insertCallGift =
                                // ReSharper restore RedundantAssignment
                                _dataContext.sp_CallGiftsInsert(preSalesCallsId, gift2Id, Convert.ToInt32(QG2), 1).ToList();
                        }
                        else
                        {
                            // ReSharper disable RedundantAssignment
                            insertCallGift =
                                // ReSharper restore RedundantAssignment
                                _dataContext.sp_CallGiftsInsert(preSalesCallsId, gift2Id, 0, 1).ToList();
                        }
                    }
                    if (G3 != "")
                    {
                        // ReSharper disable ConvertIfStatementToConditionalTernaryExpression
                        if (QG3 != "")
                        // ReSharper restore ConvertIfStatementToConditionalTernaryExpression
                        {
                            // ReSharper disable RedundantAssignment
                            insertCallGift =
                                // ReSharper restore RedundantAssignment
                                _dataContext.sp_CallGiftsInsert(preSalesCallsId, gift3Id, Convert.ToInt32(QG3), 1).ToList();
                        }
                        else
                        {
                            // ReSharper disable RedundantAssignment
                            insertCallGift =
                                // ReSharper restore RedundantAssignment
                                _dataContext.sp_CallGiftsInsert(preSalesCallsId, gift3Id, 0, 1).ToList();
                        }
                    }
                    if (G4 != "")
                    {
                        // ReSharper disable ConvertIfStatementToConditionalTernaryExpression
                        if (QG4 != "")
                        // ReSharper restore ConvertIfStatementToConditionalTernaryExpression
                        {
                            // ReSharper disable RedundantAssignment
                            insertCallGift =
                                // ReSharper restore RedundantAssignment
                                _dataContext.sp_CallGiftsInsert(preSalesCallsId, gift4Id, Convert.ToInt32(QG4), 1).ToList();
                        }
                        else
                        {
                            // ReSharper disable RedundantAssignment
                            insertCallGift =
                                // ReSharper restore RedundantAssignment
                                _dataContext.sp_CallGiftsInsert(preSalesCallsId, gift4Id, 0, 1).ToList();
                        }
                    }

                    #endregion

                    #region Insert Call Timing of Execution

                    string finalDateFrom = dtcheck.AddHours(Convert.ToDouble(startTime.Split(':')[0])).AddMinutes(Convert.ToDouble(startTime.Split(':')[1])).ToString();
                    string finalDateTo = dtcheck.AddHours(Convert.ToDouble(endTime.Split(':')[0])).AddMinutes(Convert.ToDouble(endTime.Split(':')[1])).ToString();

                    var ct = new CallTiming
                                        {
                                            SalesCallid = Convert.ToInt32(preSalesCallsId),
                                            ExecutionStartTime = Convert.ToDateTime(finalDateFrom),
                                            ExecutionEndTime = Convert.ToDateTime(finalDateTo)
                                        };
                    _dataContext.CallTimings.InsertOnSubmit(ct);
                    _dataContext.SubmitChanges();
                    #endregion
                }
            }
            return reslt;
        }

        [WebMethod(EnableSession = true)]
        public string saveUPExecution(string dt, string dc, int employeeId, string startTime, string endTime, string activityId, string products, string reminders, string samples, string gifts)
        {
            string reslt = string.Empty;
            var classId = 0;
            // ReSharper disable JoinDeclarationAndInitializer
            int specialityId;
            // ReSharper restore JoinDeclarationAndInitializer
            // ReSharper disable RedundantAssignment
            int qualificationId = 0;
            // ReSharper restore RedundantAssignment
            // ReSharper disable InconsistentNaming
            string VT;
            string P1 = "", P2 = "", P3 = "", P4 = "";
            string R1 = "", R2 = "", R3 = "", R4 = "";
            string S1 = "", S2 = "", S3 = "", S4 = "";
            string G1 = "", G2 = "", G3 = "", G4 = "";
            string Q1 = "", Q2 = "", Q3 = "", Q4 = "";
            string QG1 = "", QG2 = "", QG3 = "", QG4 = "";
            // ReSharper restore InconsistentNaming
            DateTime dtcheck;
            var product1Id = 0;
            var productSku1Id = 0;
            var product2Id = 0;
            var productSku2Id = 0;
            var product3Id = 0;
            var productSku3Id = 0;
            var product4Id = 0;
            var productSku4Id = 0;
            var sample1Id = 0;
            var sampleSku1Id = 0;
            var sample2Id = 0;
            var sampleSku2Id = 0;
            var sample3Id = 0;
            var sampleSku3Id = 0;
            var sample4Id = 0;
            var sampleSku4Id = 0;
            long gift1Id = 0;
            long gift2Id = 0;
            long gift3Id = 0;
            long gift4Id = 0;
            int levelId1 = 0, levelId2 = 0, levelId3 = 0, levelId4 = 0, levelId5 = 0, levelId6 = 0;
            #region Validation

            if (DateTime.TryParse(dt, out dtcheck))
            {
                dtcheck = Convert.ToDateTime(dt);
            }
            else
            {
                reslt = "Unable to Parse Date";
            }

            var lstvemployeeHR = (from p in _dataContext.v_EmployeeHierarchies
                                  where p.EmployeeId == employeeId
                                  select p).ToList();
            if (lstvemployeeHR.Count == 0)
            {
                if (!lstvemployeeHR[0].IsActive)
                {
                    reslt = "Employee Not Found";
                }
            }

            var lstMrdr = (from p in _dataContext.v_MRDoctors
                           where p.EmployeeId == employeeId
                           where p.DoctorCode == dc
                           select p).ToList();
            if (lstMrdr.Count == 0)
            {
                reslt = "DC Not Found for Employee";
            }

            var lstDoctorDetail = (from p in _dataContext.v_DoctorDetails
                                   where p.DoctorId == lstMrdr[0].DoctorId
                                   select p).ToList();
            if (lstDoctorDetail.Count == 0)
            {
                reslt = "Doctor Not Found";
            }
            #endregion

            #region Doctor Class

            var getClassOfDoctor = _dataContext.sp_ClassOfDoctorSelect(lstMrdr[0].DoctorId).ToList();

            if (getClassOfDoctor.Count != 0)
            {
                classId = Convert.ToInt32(getClassOfDoctor[0].ClassId);
            }

            #endregion

            #region Doctor Speciality

            var getSpecialityOfDoctor = _dataContext.sp_DoctorSpecialitySelectByDoctor(lstMrdr[0].DoctorId).ToList();

            specialityId = getSpecialityOfDoctor.Count != 0 ? Convert.ToInt32(getSpecialityOfDoctor[0].SpecialityId) : 1;

            #endregion

            #region Doctor Qualification

            var getQualificationOfDoctor = _dataContext.sp_QualificationsOfDoctorsSelectByDoctor(lstMrdr[0].DoctorId).ToList();

            qualificationId = getQualificationOfDoctor.Count != 0 ? Convert.ToInt32(getQualificationOfDoctor[0].QulificationId) : 1;

            #endregion

            if (dtcheck.Hour < 12)
            {
                VT = "1";
            }
            else if (dtcheck.Hour < 18)
            {
                VT = "1";
            }
            else
            {
                VT = "2";
            }

            if (reslt == string.Empty)
            {
                var getEmployeeMembership = _dataContext.sp_EmployeeMembershipSelectByEmployee(employeeId).ToList();

                if (getEmployeeMembership.Count != 0)
                {
                    long systemUserID = Convert.ToInt64(getEmployeeMembership[0].SystemUserID);
                    var getEmployeeHierarchy = _dataContext.sp_EmplyeeHierarchySelect(systemUserID).ToList();

                    if (getEmployeeHierarchy.Count != 0)
                    {
                        levelId1 = Convert.ToInt32(getEmployeeHierarchy[0].LevelId1);
                        levelId2 = Convert.ToInt32(getEmployeeHierarchy[0].LevelId2);
                        levelId3 = Convert.ToInt32(getEmployeeHierarchy[0].LevelId3);
                        levelId4 = Convert.ToInt32(getEmployeeHierarchy[0].LevelId4);
                        levelId5 = Convert.ToInt32(getEmployeeHierarchy[0].LevelId5);
                        levelId6 = Convert.ToInt32(getEmployeeHierarchy[0].LevelId6);
                    }
                }


                _nvCollection.Clear();
                // ReSharper disable SpecifyACultureInStringConversionExplicitly
                _nvCollection.Add("@VisitDateTime-datetime", dtcheck.ToString());
                _nvCollection.Add("@Level1LevelId-INT", levelId1.ToString());
                _nvCollection.Add("@Level2LevelId-int", levelId2.ToString());
                _nvCollection.Add("@Level3LevelId-int", levelId3.ToString());
                _nvCollection.Add("@Level4LevelId-int", levelId4.ToString());
                _nvCollection.Add("@Level5LevelId-int", levelId5.ToString());
                _nvCollection.Add("@Level6LevelId-int", levelId6.ToString());
                _nvCollection.Add("@ClassId-int", classId.ToString());
                _nvCollection.Add("@SpecialityId-int", specialityId.ToString());
                _nvCollection.Add("@QulificationId-int", qualificationId.ToString());
                _nvCollection.Add("@CreationDateTime-datetime", DateTime.Now.ToString());
                _nvCollection.Add("@CallTypeId-int", "1");
                _nvCollection.Add("@VisitShift-int", VT);
                _nvCollection.Add("@DoctorId-bigint", lstMrdr[0].DoctorId.ToString());
                _nvCollection.Add("@EmployeeId-bigint", employeeId.ToString());
                _nvCollection.Add("@InboundId-bigint", "NULL");
                _nvCollection.Add("@DocCode-INT", dc);
                // ReSharper restore SpecifyACultureInStringConversionExplicitly
                DataSet insertPreSaleCalls = GetData("sp_PreSalesCallsInsert2", _nvCollection);

                if (insertPreSaleCalls.Tables[0].Rows.Count > 0)
                {
                    var preSalesCallsId = Convert.ToInt64(insertPreSaleCalls.Tables[0].Rows[0]["SalesCallId"]);

                    #region CallDoctors
                    // ReSharper disable UnusedVariable
                    var asasdd = _dataContext.sp_CallDoctorsInsert(preSalesCallsId, lstMrdr[0].DoctorId).ToList();
                    // ReSharper restore UnusedVariable
                    #endregion

                    #region CallVisitors

                    //if (JV != "0 0 0 0")
                    //    if (JV != "NULL")
                    //    {
                    //        var insertCallVisitor = _dataContext.sp_CalVisitorsInsertNew(preSalesCallsId, employeeId, JVZSM, JVRSM, JVNSM, JVHO).ToList();
                    //    }

                    #endregion

                    #region VisitFeedBack
                    // ReSharper disable UnusedVariable
                    var asd = _dataContext.sp_VisitFeedBackInsert(preSalesCallsId, "DCR has been done successfully").ToList();
                    // ReSharper restore UnusedVariable
                    #endregion

                    #region CallProducts

                    List<DatabaseLayer.SQL.ProductSku> getProductSku;
                    if (products != "")
                    {
                        string[] product = products.Split(';');
                        for (int i = 0; i < product.Length - 1; i++)
                        {
                            if (product[i] != "-1")
                            {
                                if (i == 0)
                                {
                                    P1 = product[i];
                                    getProductSku = _dataContext.sp_ProductSkuSelect(null, null, P1).ToList();

                                    if (getProductSku.Count != 0)
                                    {
                                        product1Id = Convert.ToInt32(getProductSku[0].ProductId);
                                        productSku1Id = Convert.ToInt32(getProductSku[0].SkuId);
                                    }
                                }
                                else if (i == 1)
                                {
                                    P2 = product[i];
                                    getProductSku = _dataContext.sp_ProductSkuSelect(null, null, P2).ToList();

                                    if (getProductSku.Count != 0)
                                    {
                                        product2Id = Convert.ToInt32(getProductSku[0].ProductId);
                                        productSku2Id = Convert.ToInt32(getProductSku[0].SkuId);
                                    }
                                }
                                else if (i == 2)
                                {
                                    P3 = product[i];
                                    getProductSku = _dataContext.sp_ProductSkuSelect(null, null, P3).ToList();

                                    if (getProductSku.Count != 0)
                                    {
                                        product3Id = Convert.ToInt32(getProductSku[0].ProductId);
                                        productSku3Id = Convert.ToInt32(getProductSku[0].SkuId);
                                    }
                                }
                                else if (i == 4)
                                {
                                    P4 = product[i];
                                    getProductSku = _dataContext.sp_ProductSkuSelect(null, null, P4).ToList();

                                    if (getProductSku.Count != 0)
                                    {
                                        product4Id = Convert.ToInt32(getProductSku[0].ProductId);
                                        productSku4Id = Convert.ToInt32(getProductSku[0].SkuId);
                                    }
                                }
                            }
                        }

                    }
                    #endregion

                    #region CallSamples
                    if (samples != "")
                    {
                        string[] sample = samples.Split(';');
                        for (int i = 0; i < sample.Length - 1; i++)
                        {
                            if (sample[i] != "-1")
                            {
                                if (i == 0)
                                {
                                    S1 = sample[i].Split('|')[0];
                                    getProductSku = _dataContext.sp_ProductSkuSelect(null, null, S1).ToList();

                                    if (getProductSku.Count != 0)
                                    {
                                        sample1Id = Convert.ToInt32(getProductSku[0].ProductId);
                                        sampleSku1Id = Convert.ToInt32(getProductSku[0].SkuId);
                                    }

                                    Q1 = sample[i].Split('|')[1];
                                }
                                else if (i == 1)
                                {
                                    S2 = sample[i].Split('|')[0];
                                    getProductSku = _dataContext.sp_ProductSkuSelect(null, null, S2).ToList();

                                    if (getProductSku.Count != 0)
                                    {
                                        sample2Id = Convert.ToInt32(getProductSku[0].ProductId);
                                        sampleSku2Id = Convert.ToInt32(getProductSku[0].SkuId);
                                    }
                                    Q2 = sample[i].Split('|')[1];
                                }
                                else if (i == 2)
                                {
                                    S3 = sample[i].Split('|')[0];

                                    getProductSku = _dataContext.sp_ProductSkuSelect(null, null, S3).ToList();

                                    if (getProductSku.Count != 0)
                                    {
                                        sample3Id = Convert.ToInt32(getProductSku[0].ProductId);
                                        sampleSku3Id = Convert.ToInt32(getProductSku[0].SkuId);
                                    }
                                    Q3 = sample[i].Split('|')[1];
                                }
                                else if (i == 4)
                                {
                                    S4 = sample[i].Split('|')[0];
                                    getProductSku = _dataContext.sp_ProductSkuSelect(null, null, S4).ToList();

                                    if (getProductSku.Count != 0)
                                    {
                                        sample4Id = Convert.ToInt32(getProductSku[0].ProductId);
                                        sampleSku4Id = Convert.ToInt32(getProductSku[0].SkuId);
                                    }
                                    Q4 = sample[i].Split('|')[1];
                                }
                            }

                        }

                    }
                    #endregion

                    #region CallReminders
                    if (reminders != "")
                    {
                        string[] reminder = reminders.Split(';');
                        for (int i = 0; i < reminder.Length - 1; i++)
                        {
                            if (reminder[i] != "-1")
                            {
                                if (i == 0)
                                {
                                    R1 = reminder[i];
                                }
                                else if (i == 1)
                                {
                                    R2 = reminder[i];
                                }
                                else if (i == 2)
                                {
                                    R3 = reminder[i];
                                }
                                else if (i == 4)
                                {
                                    R4 = reminder[i];
                                }
                            }
                        }
                    }
                    #endregion

                    #region CallGifts
                    if (gifts != "")
                    {
                        string[] gift = gifts.Split(';');
                        for (int i = 0; i < gift.Length - 1; i++)
                        {
                            if (gift[i] != "-1")
                            {
                                List<GiftItem> getGiftItems;
                                if (i == 0)
                                {
                                    G1 = gift[i].Split('|')[0];
                                    getGiftItems = _dataContext.sp_GiftItemsSelectByCode(G1).ToList();

                                    if (getGiftItems.Count != 0)
                                    {
                                        gift1Id = Convert.ToInt64(getGiftItems[0].GiftId);
                                    }
                                    QG1 = gift[i].Split('|')[1];
                                }
                                else if (i == 1)
                                {
                                    G2 = gift[i].Split('|')[0];
                                    getGiftItems = _dataContext.sp_GiftItemsSelectByCode(G1).ToList();

                                    if (getGiftItems.Count != 0)
                                    {
                                        gift2Id = Convert.ToInt64(getGiftItems[0].GiftId);
                                    }
                                    QG2 = gift[i].Split('|')[1];
                                }
                                else if (i == 2)
                                {
                                    G3 = gift[i].Split('|')[0];
                                    getGiftItems = _dataContext.sp_GiftItemsSelectByCode(G1).ToList();

                                    if (getGiftItems.Count != 0)
                                    {
                                        gift3Id = Convert.ToInt64(getGiftItems[0].GiftId);
                                    }
                                    QG3 = gift[i].Split('|')[1];
                                }
                                else if (i == 3)
                                {
                                    G4 = gift[i].Split('|')[0];
                                    getGiftItems = _dataContext.sp_GiftItemsSelectByCode(G1).ToList();

                                    if (getGiftItems.Count != 0)
                                    {
                                        gift4Id = Convert.ToInt64(getGiftItems[0].GiftId);
                                    }
                                    QG4 = gift[i].Split('|')[1];
                                }
                            }
                        }
                    }

                    #endregion

                    #region Insert Call Products and Reminders
                    // ReSharper disable NotAccessedVariable
                    List<CallProduct> insertCallProduct;
                    // ReSharper restore NotAccessedVariable

                    if (P1 != "")
                    {
                        // ReSharper disable ConvertIfStatementToConditionalTernaryExpression
                        if (R1 != "")
                        // ReSharper restore ConvertIfStatementToConditionalTernaryExpression
                        {
                            // ReSharper disable RedundantAssignment
                            insertCallProduct =
                                _dataContext.sp_CallProductsInsert(product1Id, preSalesCallsId, Convert.ToInt32(R1), productSku1Id, 1).ToList();
                        }
                        else
                        {
                            insertCallProduct =
                                _dataContext.sp_CallProductsInsert(product1Id, preSalesCallsId, 0, productSku1Id, 1).ToList();
                        }
                        // ReSharper restore RedundantAssignment
                    }


                    if (P2 != "")
                    {
                        // ReSharper disable ConvertIfStatementToConditionalTernaryExpression
                        if (R2 != "")
                        // ReSharper restore ConvertIfStatementToConditionalTernaryExpression
                        {
                            // ReSharper disable RedundantAssignment
                            insertCallProduct =
                                // ReSharper restore RedundantAssignment
                                  _dataContext.sp_CallProductsInsert(product2Id, preSalesCallsId, Convert.ToInt32(R2), productSku2Id, 2).ToList();
                        }
                        else
                        {
                            // ReSharper disable RedundantAssignment
                            insertCallProduct =
                                // ReSharper restore RedundantAssignment
                                _dataContext.sp_CallProductsInsert(product2Id, preSalesCallsId, 0, productSku2Id, 2).ToList();
                        }
                    }

                    if (P3 != "")
                    {
                        // ReSharper disable ConvertIfStatementToConditionalTernaryExpression
                        if (R3 != "")
                        // ReSharper restore ConvertIfStatementToConditionalTernaryExpression
                        {
                            // ReSharper disable RedundantAssignment
                            insertCallProduct =
                                // ReSharper restore RedundantAssignment
                                _dataContext.sp_CallProductsInsert(product3Id, preSalesCallsId, Convert.ToInt32(R3), productSku3Id, 3).ToList();
                        }
                        else
                        {
                            // ReSharper disable RedundantAssignment
                            insertCallProduct =
                                // ReSharper restore RedundantAssignment
                                _dataContext.sp_CallProductsInsert(product3Id, preSalesCallsId, 0, productSku3Id, 3).ToList();
                        }
                    }

                    if (P4 != "")
                    {
                        // ReSharper disable ConvertIfStatementToConditionalTernaryExpression
                        if (R4 != "")
                        // ReSharper restore ConvertIfStatementToConditionalTernaryExpression
                        {
                            // ReSharper disable RedundantAssignment
                            insertCallProduct =
                                // ReSharper restore RedundantAssignment
                                _dataContext.sp_CallProductsInsert(product4Id, preSalesCallsId, Convert.ToInt32(R4), productSku4Id, 4).ToList();
                        }
                        else
                        {
                            // ReSharper disable RedundantAssignment
                            insertCallProduct =
                                // ReSharper restore RedundantAssignment
                                _dataContext.sp_CallProductsInsert(product4Id, preSalesCallsId, 0, productSku4Id, 4).ToList();
                        }
                    }


                    if (R1 != "")
                    {
                        _nvCollection.Clear();
                        // ReSharper disable SpecifyACultureInStringConversionExplicitly
                        _nvCollection.Add("@SalesCallID-INT", preSalesCallsId.ToString());
                        // ReSharper restore SpecifyACultureInStringConversionExplicitly
                        _nvCollection.Add("@ReminderID-INT", R1);
                        _nvCollection.Add("@ReminderOrder-INT", "1");
                        // ReSharper disable UnusedVariable
                        bool ressslt = _dl.InserData("insertCallReminders", _nvCollection);
                        // ReSharper restore UnusedVariable
                    }
                    if (R2 != "")
                    {
                        _nvCollection.Clear();
                        // ReSharper disable SpecifyACultureInStringConversionExplicitly
                        _nvCollection.Add("@SalesCallID-INT", preSalesCallsId.ToString());
                        // ReSharper restore SpecifyACultureInStringConversionExplicitly
                        _nvCollection.Add("@ReminderID-INT", R2);
                        _nvCollection.Add("@ReminderOrder-INT", "2");
                        // ReSharper disable UnusedVariable
                        bool ressslt = _dl.InserData("insertCallReminders", _nvCollection);
                        // ReSharper restore UnusedVariable
                    }
                    if (R3 != "")
                    {
                        _nvCollection.Clear();
                        // ReSharper disable SpecifyACultureInStringConversionExplicitly
                        _nvCollection.Add("@SalesCallID-INT", preSalesCallsId.ToString());
                        // ReSharper restore SpecifyACultureInStringConversionExplicitly
                        _nvCollection.Add("@ReminderID-INT", R3);
                        _nvCollection.Add("@ReminderOrder-INT", "3");
                        // ReSharper disable UnusedVariable
                        bool ressslt = _dl.InserData("insertCallReminders", _nvCollection);
                        // ReSharper restore UnusedVariable
                    }

                    #endregion

                    #region Insert Call Product Samples

                    // ReSharper disable NotAccessedVariable
                    List<CallProductSample> insertCallProductSample;
                    // ReSharper restore NotAccessedVariable
                    //List<MInventory> getInventory;
                    //List<MCInventory> updateInventory;
                    //List<v_Inventory> getInventoryDetail;

                    //var year = Convert.ToInt32(dtcheck.Day);
                    //var month = Convert.ToInt32(dtcheck.Day);
                    //var mrId = Convert.ToInt64(insertPreSaleCalls.Tables[0].Rows[0]["EmployeeId"].ToString());
                    //long remainingQuantity = 0;

                    //getInventory = _dataContext.sp_MInventorySelect(mrId, year, month).ToList();

                    if (S1 != "" && Q1 != "")
                    {
                        // ReSharper disable UnusedVariable
                        // ReSharper disable RedundantAssignment
                        insertCallProductSample =
                            // ReSharper restore RedundantAssignment
                            _dataContext.sp_CallProductSamplesInsert(preSalesCallsId, sample1Id, sampleSku1Id, Convert.ToInt32(Q1), 1).ToList();
                        // ReSharper restore UnusedVariable
                        #region Update Inventory

                        //if (getInventory.Count != 0)
                        //{
                        //    getInventoryDetail = _dataContext.sp_MCInventorySelect(mrId, sample1Id, year, month).ToList();

                        //    if (getInventoryDetail.Count != 0)
                        //    {
                        //        remainingQuantity = Convert.ToInt64(getInventoryDetail[0].Remaining);

                        //        if (remainingQuantity != 0)
                        //        {
                        //            updateInventory = _dataContext.sp_InventoryUpdateByMR(month, sample1Id, long.Parse(Q1), remainingQuantity).ToList();
                        //        }
                        //        else
                        //        {
                        //            ErrorLog("EmployeeId: " + employeeId + ", SampleId: " + sample1Id
                        //                + " has been empty in stock. Update your inventory");
                        //        }
                        //    }
                        //    else
                        //    {
                        //        _mgsText = "Dear " + _employeeName + ", Sample Code: " + S1 + " unable to match with your list!";
                        //        goto InventoryInvalid;
                        //    }
                        //}
                        //else
                        //{
                        //    goto InventoryEmpty;
                        //}

                        #endregion
                    }


                    if (S2 != "" && Q2 != "")
                    {
                        // ReSharper disable RedundantAssignment
                        insertCallProductSample =
                            _dataContext.sp_CallProductSamplesInsert(preSalesCallsId, sample2Id, sampleSku2Id, Convert.ToInt32(Q2), 2).ToList();
                        // ReSharper restore RedundantAssignment
                        #region Update Inventory

                        //if (getInventory.Count != 0)
                        //{
                        //    getInventoryDetail = _dataContext.sp_MCInventorySelect(mrId, sample2Id, year, month).ToList();

                        //    if (getInventoryDetail.Count != 0)
                        //    {
                        //        remainingQuantity = Convert.ToInt64(getInventoryDetail[0].Remaining);

                        //        if (remainingQuantity != 0)
                        //        {
                        //            updateInventory = _dataContext.sp_InventoryUpdateByMR(month, sample2Id, long.Parse(Q2), remainingQuantity).ToList();
                        //        }
                        //        else
                        //        {
                        //            ErrorLog("EmployeeId: " + employeeId + ", SampleId: " + sample2Id
                        //                + " has been empty in stock. Update your inventory");
                        //        }
                        //    }
                        //    else
                        //    {
                        //        _mgsText = "Dear " + _employeeName + ", Sample Code: " + S2 + " unable to match with your list!";
                        //        goto InventoryInvalid;
                        //    }
                        //}
                        //else
                        //{
                        //    goto InventoryEmpty;
                        //}

                        #endregion
                    }

                    if (S3 != "" && Q3 != "")
                    {
                        // ReSharper disable RedundantAssignment
                        insertCallProductSample =
                            _dataContext.sp_CallProductSamplesInsert(preSalesCallsId, sample3Id, sampleSku3Id, Convert.ToInt32(Q3), 3).ToList();
                        // ReSharper restore RedundantAssignment
                        #region Update Inventory

                        //if (getInventory.Count != 0)
                        //{
                        //    getInventoryDetail = _dataContext.sp_MCInventorySelect(mrId, sample2Id, year, month).ToList();

                        //    if (getInventoryDetail.Count != 0)
                        //    {
                        //        remainingQuantity = Convert.ToInt64(getInventoryDetail[0].Remaining);

                        //        if (remainingQuantity != 0)
                        //        {
                        //            updateInventory = _dataContext.sp_InventoryUpdateByMR(month, sample2Id, long.Parse(Q2), remainingQuantity).ToList();
                        //        }
                        //        else
                        //        {
                        //            ErrorLog("EmployeeId: " + employeeId + ", SampleId: " + sample2Id
                        //                + " has been empty in stock. Update your inventory");
                        //        }
                        //    }
                        //    else
                        //    {
                        //        _mgsText = "Dear " + _employeeName + ", Sample Code: " + S3 + " unable to match with your list!";
                        //        goto InventoryInvalid;
                        //    }
                        //}
                        //else
                        //{
                        //    goto InventoryEmpty;
                        //}

                        #endregion
                    }

                    if (S4 != "" && Q4 != "")
                    {
                        // ReSharper disable RedundantAssignment
                        insertCallProductSample =
                            _dataContext.sp_CallProductSamplesInsert(preSalesCallsId, sample4Id, sampleSku4Id, Convert.ToInt32(Q4), 4).ToList();
                        // ReSharper restore RedundantAssignment
                        #region Update Inventory

                        //if (getInventory.Count != 0)
                        //{
                        //    getInventoryDetail = _dataContext.sp_MCInventorySelect(mrId, sample2Id, year, month).ToList();

                        //    if (getInventoryDetail.Count != 0)
                        //    {
                        //        remainingQuantity = Convert.ToInt64(getInventoryDetail[0].Remaining);

                        //        if (remainingQuantity != 0)
                        //        {
                        //            updateInventory = _dataContext.sp_InventoryUpdateByMR(month, sample2Id, long.Parse(Q2), remainingQuantity).ToList();
                        //        }
                        //        else
                        //        {
                        //            ErrorLog("EmployeeId: " + employeeId + ", SampleId: " + sample2Id
                        //                + " has been empty in stock. Update your inventory");
                        //        }
                        //    }
                        //    else
                        //    {
                        //        _mgsText = "Dear " + _employeeName + ", Sample Code: " + S3 + " unable to match with your list!";
                        //        goto InventoryInvalid;
                        //    }
                        //}
                        //else
                        //{
                        //    goto InventoryEmpty;
                        //}

                        #endregion
                    }

                    #endregion

                    #region Insert Call Gifts

                    // ReSharper disable NotAccessedVariable
                    List<CallGift> insertCallGift;
                    // ReSharper restore NotAccessedVariable

                    if (G1 != "")
                    {
                        // ReSharper disable ConvertIfStatementToConditionalTernaryExpression
                        if (QG1 != "")
                        // ReSharper restore ConvertIfStatementToConditionalTernaryExpression
                        {

                            // ReSharper disable RedundantAssignment
                            insertCallGift =
                                // ReSharper restore RedundantAssignment
                                _dataContext.sp_CallGiftsInsert(preSalesCallsId, gift1Id, Convert.ToInt32(QG1), 1).ToList();
                        }
                        else
                        {
                            // ReSharper disable RedundantAssignment
                            insertCallGift =
                                // ReSharper restore RedundantAssignment
                                _dataContext.sp_CallGiftsInsert(preSalesCallsId, gift1Id, 0, 1).ToList();
                        }
                    }

                    if (G2 != "")
                    {
                        // ReSharper disable ConvertIfStatementToConditionalTernaryExpression
                        if (QG2 != "")
                        // ReSharper restore ConvertIfStatementToConditionalTernaryExpression
                        {
                            // ReSharper disable RedundantAssignment
                            insertCallGift =
                                // ReSharper restore RedundantAssignment
                                _dataContext.sp_CallGiftsInsert(preSalesCallsId, gift2Id, Convert.ToInt32(QG2), 1).ToList();
                        }
                        else
                        {
                            // ReSharper disable RedundantAssignment
                            insertCallGift =
                                // ReSharper restore RedundantAssignment
                                _dataContext.sp_CallGiftsInsert(preSalesCallsId, gift2Id, 0, 1).ToList();
                        }
                    }
                    if (G3 != "")
                    {
                        // ReSharper disable ConvertIfStatementToConditionalTernaryExpression
                        if (QG3 != "")
                        // ReSharper restore ConvertIfStatementToConditionalTernaryExpression
                        {
                            // ReSharper disable RedundantAssignment
                            insertCallGift =
                                // ReSharper restore RedundantAssignment
                                _dataContext.sp_CallGiftsInsert(preSalesCallsId, gift3Id, Convert.ToInt32(QG3), 1).ToList();
                        }
                        else
                        {
                            // ReSharper disable RedundantAssignment
                            insertCallGift =
                                // ReSharper restore RedundantAssignment
                                _dataContext.sp_CallGiftsInsert(preSalesCallsId, gift3Id, 0, 1).ToList();
                        }
                    }
                    if (G4 != "")
                    {
                        // ReSharper disable ConvertIfStatementToConditionalTernaryExpression
                        if (QG4 != "")
                        // ReSharper restore ConvertIfStatementToConditionalTernaryExpression
                        {
                            // ReSharper disable RedundantAssignment
                            insertCallGift =
                                // ReSharper restore RedundantAssignment
                                _dataContext.sp_CallGiftsInsert(preSalesCallsId, gift4Id, Convert.ToInt32(QG4), 1).ToList();
                        }
                        else
                        {
                            // ReSharper disable RedundantAssignment
                            insertCallGift =
                                // ReSharper restore RedundantAssignment
                                _dataContext.sp_CallGiftsInsert(preSalesCallsId, gift4Id, 0, 1).ToList();
                        }
                    }

                    #endregion

                    #region Insert Call Timing of Execution

                    string finalDateFrom = dtcheck.AddHours(Convert.ToDouble(startTime.Split(':')[0])).AddMinutes(Convert.ToDouble(startTime.Split(':')[1])).ToString();
                    string finalDateTo = dtcheck.AddHours(Convert.ToDouble(endTime.Split(':')[0])).AddMinutes(Convert.ToDouble(endTime.Split(':')[1])).ToString();

                    var ct = new CallTiming
                    {
                        SalesCallid = Convert.ToInt32(preSalesCallsId),
                        ExecutionStartTime = Convert.ToDateTime(finalDateFrom),
                        ExecutionEndTime = Convert.ToDateTime(finalDateTo)
                    };
                    _dataContext.CallTimings.InsertOnSubmit(ct);
                    _dataContext.SubmitChanges();
                    #endregion
                }
            }
            return reslt;
        }



        [WebMethod(EnableSession = true)]
        public string Loadbrick(int pEmployeeId)
        {
            _currentUser = (SystemUser)Session["SystemUser"];
            //// ReSharper disable SpecifyACultureInStringConversionExplicitly
            //var nv = new NameValueCollection { { "@EmployeeId-bigint", Convert.ToInt64(pEmployeeId).ToString() } };
            //// ReSharper restore SpecifyACultureInStringConversionExplicitly
            //DataSet dsBrick = GetData("Mioplaning_FilterB", nv);
            //string brick = dsBrick.Tables[0].ToJsonString();

            return MIOBrickCollection.Instance[pEmployeeId].Tables[0].ToJsonString();

        }
        [WebMethod(EnableSession = true)]
        public string LoadClass(int pEmployeeId)
        {
            _currentUser = (SystemUser)Session["SystemUser"];
            //// ReSharper disable SpecifyACultureInStringConversionExplicitly
            //var nv = new NameValueCollection { { "@EmployeeId-bigint", Convert.ToInt64(pEmployeeId).ToString() } };
            //// ReSharper restore SpecifyACultureInStringConversionExplicitly
            //DataSet dsBrick = GetData("Mioplaning_FilterC", nv);
            //string brick = dsBrick.Tables[0].ToJsonString();
            //return brick;
            return MIODoctorClassCollection.Instance[pEmployeeId].Tables[0].ToJsonString();
        }
        [WebMethod(EnableSession = true)]
        public string LoadSpecialiity(int pEmployeeId)
        {
            _currentUser = (SystemUser)Session["SystemUser"];
            //// ReSharper disable SpecifyACultureInStringConversionExplicitly
            //var nv = new NameValueCollection { { "@EmployeeId-bigint", Convert.ToInt64(pEmployeeId).ToString() } };
            //// ReSharper restore SpecifyACultureInStringConversionExplicitly
            //DataSet dsBrick = GetData("Mioplaning_FilterS", nv);
            //string brick = dsBrick.Tables[0].ToJsonString();
            //return brick;
            return MIODoctorSpecialityCollection.Instance[pEmployeeId];
        }
        [WebMethod(EnableSession = true)]
        public string LoadDoctors(int pEmployeeId)
        {
            _currentUser = (SystemUser)Session["SystemUser"];
            //// ReSharper disable SpecifyACultureInStringConversionExplicitly
            //var nv = new NameValueCollection { { "@EmployeeId-bigint", Convert.ToInt64(pEmployeeId).ToString() } };
            //// ReSharper restore SpecifyACultureInStringConversionExplicitly
            //DataSet dsBrick = GetData("Mioplaning_FilterD", nv);
            //string brick = dsBrick.Tables[0].ToJsonString();
            //return brick;
            return MIODoctorsCollection.Instance[pEmployeeId].Tables[0].ToJsonString();
        }

        [WebMethod]
        public string LoadunPlannedDoctors(int pEmployeeId)
        {
            // ReSharper disable SpecifyACultureInStringConversionExplicitly
            var nv = new NameValueCollection { { "@EmployeeId-bigint", Convert.ToInt64(pEmployeeId).ToString() } };
            // ReSharper restore SpecifyACultureInStringConversionExplicitly
            //DataSet dsBrick = GetData("Mioplaning_FilterD", nv);
            DataSet dsBrick = GetData("Mioplaning_FilterD_docAcc", nv);
            string brick = dsBrick.Tables[0].ToJsonString();
            return brick;
        }


        [WebMethod]
        public string GetDoctorAddress(int doctorId)
        {
            // ReSharper disable SpecifyACultureInStringConversionExplicitly
            var nv = new NameValueCollection { { "@doctorId-bigint", Convert.ToInt64(doctorId).ToString() } };
            // ReSharper restore SpecifyACultureInStringConversionExplicitly
            //DataSet dsBrick = GetData("Mioplaning_FilterD", nv);
            DataSet ds = GetData("Sp_GetDocAddress", nv);
            string GetAddrs = ds.Tables[0].ToJsonString();
            return GetAddrs;
        }


        [WebMethod(EnableSession = true)]
        // ReSharper disable InconsistentNaming
        public string OnChangedbrick_class(int Brickid, int pEmployeeId)
        // ReSharper restore InconsistentNaming
        {
            _currentUser = (SystemUser)Session["SystemUser"];
            var nv = new NameValueCollection
                         {
                             // ReSharper disable SpecifyACultureInStringConversionExplicitly
                             {"@EmployeeId-bigint", Convert.ToInt64(pEmployeeId).ToString()},
                             {"@BrickId-bigint", Brickid.ToString()}
                             // ReSharper restore SpecifyACultureInStringConversionExplicitly
                         };

            DataSet dsBrick = GetData("Mioplaning_FC_Brick", nv);
            string brick = dsBrick.Tables[0].ToJsonString();
            return brick;
        }
        [WebMethod(EnableSession = true)]
        // ReSharper disable InconsistentNaming
        public string OnChangedbrick_specialiity(int Brickid, int pEmployeeId)
        // ReSharper restore InconsistentNaming
        {
            _currentUser = (SystemUser)Session["SystemUser"];
            var nv = new NameValueCollection
                         {
                             // ReSharper disable SpecifyACultureInStringConversionExplicitly
                             {"@EmployeeId-bigint", Convert.ToInt64(pEmployeeId).ToString()},
                             {"@BrickId-bigint", Brickid.ToString()}
                             // ReSharper restore SpecifyACultureInStringConversionExplicitly
                         };
            DataSet dsBrick = GetData("Mioplaning_FS_Brick", nv);
            string brick = dsBrick.Tables[0].ToJsonString();
            return brick;
        }
        [WebMethod(EnableSession = true)]
        // ReSharper disable InconsistentNaming
        public string OnChangedbrick_Doctor(int Brickid, int pEmployeeId)
        // ReSharper restore InconsistentNaming
        {
            _currentUser = (SystemUser)Session["SystemUser"];
            var nv = new NameValueCollection
                         {
                             // ReSharper disable SpecifyACultureInStringConversionExplicitly
                             {"@EmployeeId-bigint", Convert.ToInt64(pEmployeeId).ToString()},
                             {"@BrickId-bigint", Brickid.ToString()}
                             // ReSharper restore SpecifyACultureInStringConversionExplicitly
                         };
            DataSet dsBrick = GetData("Mioplaning_FD_Brick", nv);
            string brick = dsBrick.Tables[0].ToJsonString();
            return brick;
        }

        [WebMethod(EnableSession = true)]
        // ReSharper disable InconsistentNaming
        public string OnChangedclass_Speciality(int Brickid, int Classid, int pEmployeeId)
        // ReSharper restore InconsistentNaming
        {
            _currentUser = (SystemUser)Session["SystemUser"];
            // ReSharper disable SpecifyACultureInStringConversionExplicitly
            var nv = new NameValueCollection
                         {
                             {"@EmployeeId-bigint", Convert.ToInt64(pEmployeeId).ToString()},
                             {"@BrickId-int", Brickid == -1 ? "NULL" : Brickid.ToString()},
                             {"@ClassId-int", Classid.ToString()}
                         };
            // ReSharper restore SpecifyACultureInStringConversionExplicitly
            // ReSharper disable SpecifyACultureInStringConversionExplicitly
            // ReSharper restore SpecifyACultureInStringConversionExplicitly
            // ReSharper disable SpecifyACultureInStringConversionExplicitly
            // ReSharper restore SpecifyACultureInStringConversionExplicitly
            DataSet dsBrick = GetData("Mioplaning_FS_Class", nv);
            string brick = dsBrick.Tables[0].ToJsonString();
            return brick;
        }
        [WebMethod(EnableSession = true)]
        // ReSharper disable InconsistentNaming
        public string OnChangedclass_Doctor(int Brickid, int Classid, int pEmployeeId)
        // ReSharper restore InconsistentNaming
        {
            _currentUser = (SystemUser)Session["SystemUser"];
            // ReSharper disable SpecifyACultureInStringConversionExplicitly
            var nv = new NameValueCollection
                         {
                             {"@EmployeeId-bigint", Convert.ToInt64(pEmployeeId).ToString()},
                             {"@BrickId-int", Brickid == -1 ? "NULL" : Brickid.ToString()},
                             {"@ClassId-int", Classid.ToString()}
                         };
            // ReSharper restore SpecifyACultureInStringConversionExplicitly
            DataSet dsBrick = GetData("Mioplaning_FD_Class", nv);
            string brick = dsBrick.Tables[0].ToJsonString();
            return brick;
        }


        [WebMethod(EnableSession = true)]
        // ReSharper disable InconsistentNaming
        public string OnChangedSpe_Doctor(int Brickid, int Classid, int Specid, int pEmployeeId)
        // ReSharper restore InconsistentNaming
        {
            _currentUser = (SystemUser)Session["SystemUser"];
            // ReSharper disable SpecifyACultureInStringConversionExplicitly
            var nv = new NameValueCollection
                         {
                             {"@EmployeeId-bigint", Convert.ToInt64(pEmployeeId).ToString()},
                             {"@BrickId-int", Brickid == -1 ? "NULL" : Brickid.ToString()},
                             {"@ClassId-int", Classid == -1 ? "NULL" : Classid.ToString()},
                             {"@SpecialityId-int", Specid.ToString()}
                         };

            // ReSharper restore SpecifyACultureInStringConversionExplicitly
            DataSet dsBrick = GetData("Mioplaning_FD_Speciality", nv);
            string brick = dsBrick.Tables[0].ToJsonString();
            return brick;
        }

        [WebMethod(EnableSession = true)]
        // ReSharper disable InconsistentNaming
        public string Emails_forStatus(string _date, int _EmployeeId, string _Reason, string _PlanStatus, string _currentRole)
        {
            string returnstring = "";
            try
            {

                DataSet getDetail;
                DataTable table;
                _currentUser = (SystemUser)Session["SystemUser"];

                if (_EmployeeId > 0)
                {
                    var nv1 = new NameValueCollection();
                    nv1.Add("@EmplyeeID-int", _EmployeeId.ToString());
                    // ReSharper disable UnusedVariable
                    getDetail = GetData("sp_MIO_ZSM_DetailForEmail", nv1);
                    table = getDetail.Tables[0];
                }
                else
                {
                    string EmployeeId = _currentUser.EmployeeId.ToString();
                    var nv1 = new NameValueCollection();
                    nv1.Add("@EmplyeeID-int", EmployeeId.ToString());
                    // ReSharper disable UnusedVariable
                    getDetail = GetData("sp_MIO_ZSM_DetailForEmail", nv1);
                    table = getDetail.Tables[0];
                }

                if (table.Rows.Count > 0)
                {
                    if (_PlanStatus == "Approve" || _PlanStatus == "Draft")//send email to MIO
                    {
                        #region Sending Mail

                        var msg = new MailMessage { From = new MailAddress(ConfigurationManager.AppSettings["AutoEmailID"], "Plan Status") };

                        if (table.Rows[0][4].ToString() != null)
                        {
                            string addresmail = table.Rows[0][4].ToString().Replace("(", "").ToString().Replace(")", "").ToString().Replace("-", "").ToString().Replace(" ", "").ToString().Trim().ToString();
                            msg.To.Add(addresmail);
                        }

                        msg.Subject = "Planing Status For-PBG- " + DateTime.Now.ToString("dd-MMMM-yyyy");
                        msg.IsBodyHtml = true;

                        string strBody = "To: MIO:<br/>Med-Rep Teritorry: " + table.Rows[0][1].ToString() +
                            @"<br/>" + "Manager Name: " + table.Rows[0][7].ToString() +
                            @"<br/>" + "Manager Mobile Number: " + table.Rows[0][9].ToString() +
                            @"<br/>Med-Rep Plan Status: " + _PlanStatus.ToString() + " For Month: " + Convert.ToDateTime(_date).ToLongDateString() +

                                  @"<br/><br/>Generated on: " + DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss") + @"


                                   This is a system generated email. Please do not reply. Contact the IT department if you need any assistance.";
                        msg.Body = strBody;

                        //var mailAttach = new Attachment(@"C:\AtcoPharma\Excel\VisitsStatsWRTFreq-OTC-" + System.DateTime.Now.ToString("dd-MMMM-yyyy") + ".xlsx");
                        //msg.Attachments.Add(mailAttach);

                        var client = new SmtpClient(ConfigurationManager.AppSettings["AutoEmailSMTP"])
                        {
                            UseDefaultCredentials = false,
                            Credentials = new System.Net.NetworkCredential(ConfigurationManager.AppSettings["AutoEmailID"], ConfigurationManager.AppSettings["AutoEmailIDpass"]),
                            Host = ConfigurationManager.AppSettings["AutoEmailSMTP"]
                        };

                        client.Send(msg);
                        returnstring = "OK";
                        #endregion
                    }
                    else if (_PlanStatus == "Pending")// send email to FLM
                    {
                        #region Sending Mail

                        var msg = new MailMessage { From = new MailAddress(ConfigurationManager.AppSettings["AutoEmailID"], "Plan For Approval-" + table.Rows[0][1].ToString() + "") };

                        if (table.Rows[0][8].ToString() != null)
                        {
                            string addresmail = table.Rows[0][8].ToString().Replace("(", "").ToString().Replace(")", "").ToString().Replace("-", "").ToString().Replace(" ", "").ToString().Trim().ToString();
                            msg.To.Add(addresmail);
                        }

                        //for (int j = 0; j < Convert.ToInt32(ConfigurationManager.AppSettings["FLMCountTo"]); j++)
                        //{
                        //    if (ConfigurationManager.AppSettings["FLMTo" + j] != null)
                        //        msg.To.Add(ConfigurationManager.AppSettings["FLMTo" + j]);
                        //}

                        //for (int j = 0; j < Convert.ToInt32(ConfigurationManager.AppSettings["FLMCountCC"]); j++)
                        //{
                        //    if (ConfigurationManager.AppSettings["FLMCc" + j] != null)
                        //        msg.To.Add(ConfigurationManager.AppSettings["FLMCc" + j]);
                        //}

                        msg.Subject = "Planing Status For-PBG- " + DateTime.Now.ToString("dd-MMMM-yyyy");
                        msg.IsBodyHtml = true;

                        string strBody = "To: FLM <br/> Med-Rep Teritorry: " + table.Rows[0][1].ToString() +
                            @"<br/>" + "Med-Rep Name: " + table.Rows[0][3].ToString() +
                            @"<br/>" + "Med-Rep Mobile Number: " + table.Rows[0][5].ToString() +
                            @"<br/>Med-Rep Plan Status: " + _PlanStatus.ToString() + " For Month: " + Convert.ToDateTime(_date).ToLongDateString() +

                                  @"<br/><br/>Generated on: " + DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss") + @"


                                   This is a system generated email. Please do not reply. Contact the IT department if you need any assistance.";
                        msg.Body = strBody;

                        //var mailAttach = new Attachment(@"C:\AtcoPharma\Excel\VisitsStatsWRTFreq-OTC-" + System.DateTime.Now.ToString("dd-MMMM-yyyy") + ".xlsx");
                        //msg.Attachments.Add(mailAttach);

                        var client = new SmtpClient(ConfigurationManager.AppSettings["AutoEmailSMTP"])
                        {
                            UseDefaultCredentials = false,
                            Credentials = new System.Net.NetworkCredential(ConfigurationManager.AppSettings["AutoEmailID"], ConfigurationManager.AppSettings["AutoEmailIDpass"]),
                            Host = ConfigurationManager.AppSettings["AutoEmailSMTP"]
                        };

                        client.Send(msg);
                        returnstring = "OK";
                        #endregion
                    }
                }
            }
            catch (Exception ex)
            {
                ex.ErrorLog();
                returnstring = "error";
            }
            return returnstring;
        }

    }
}
            #endregion
