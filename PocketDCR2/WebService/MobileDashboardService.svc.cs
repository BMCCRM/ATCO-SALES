using DatabaseLayer.SQL;
using PocketDCR2.Classes;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Collections.Specialized;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.Text;
using System.Web.Script.Serialization;

namespace PocketDCR2.WebService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "MobileDashboardService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select MobileDashboardService.svc or MobileDashboardService.svc.cs at the Solution Explorer and start debugging.
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class MobileDashboardService : IMobileDashboardService
    {
        #region layer
        private readonly DatabaseDataContext _dataContext =
       new DatabaseDataContext(Constants.GetConnectionString());
        DAL _dl = new DAL();
        //private SystemUser _currentUser;
        private NameValueCollection _nv;

        #endregion

        #region ProductFrequencyClass
        public ListGetClassfrequency ProdFreClass(string date, string endate, string LevelType, string EmployeeId)
        {
            var prodfreqreturn = new ListGetClassfrequency();
            List<GetClassfrequency> list = new List<GetClassfrequency>();


            try
            {
                #region Initialize
                _nv = new NameValueCollection();
                _nv.Clear();
                int year = 0, month = 0, endyear = 0, endmonth = 0;
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

                _nv.Add("@Leveltype-varchar(50)", LevelType.ToString());
                _nv.Add("@EmployeeId-int", EmployeeId.ToString());
                _nv.Add("@Month-int", Convert.ToString(month));
                _nv.Add("@Year-int", Convert.ToString(year));
                _nv.Add("@endmonth-int", Convert.ToString(endmonth));

                DataSet dsClassfreq = GetData("sp_class_prodfreqe_MobileDashboard", _nv);

                if (dsClassfreq != null && dsClassfreq.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow record in dsClassfreq.Tables[0].Rows)
                    {
                        var ClassId = record["ClassId"].ToString();
                        var ProdFreq = record["ProdFreq"].ToString();

                        list.Add(item: new GetClassfrequency(ClassId, ProdFreq));
                    }
                }
                if (list.Count > 0)
                {
                    prodfreqreturn.data = list;
                    prodfreqreturn.Status = HttpStatusCode.OK;
                    prodfreqreturn.Message = string.Format("Record exists from Employee against id {0}", EmployeeId);
                }
                else
                {
                    prodfreqreturn.data = null;
                    prodfreqreturn.Message = string.Format("Record not exists from Employee against id {0}", EmployeeId);
                    prodfreqreturn.Status = HttpStatusCode.BadRequest;
                    return prodfreqreturn;
                }
                #endregion
               

            }
            catch (Exception ex)
            {
                
                ErrorLog("Error Message: " + ex.Message.ToString() + " Stack: " + ex.StackTrace.ToString());
                prodfreqreturn.data = null;
                prodfreqreturn.Status = HttpStatusCode.BadRequest;
                prodfreqreturn.Message = string.Format("Message : {0}\n StackTrace: {1}ex.Message)", ex.Message, ex.StackTrace);
                return prodfreqreturn;
            
            }
            return prodfreqreturn;
        }
        #endregion


        #region callsperday
        public ListGetcallsperday callsperday(string date, string endate, string LevelType, string EmployeeId)
        {
            ListGetcallsperday callsperdayreturn = new ListGetcallsperday();
            List<Getcallsperday> list = new List<Getcallsperday>();

            try
            {
                #region Initialize
                _nv = new NameValueCollection();
                _nv.Clear();
                int year = 0, month = 0, endyear = 0, endmonth = 0;
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

                _nv.Add("@Leveltype-varchar(50)", LevelType.ToString());
                _nv.Add("@EmployeeId-int", EmployeeId.ToString());
                _nv.Add("@Month-int", Convert.ToString(month));
                _nv.Add("@Year-int", Convert.ToString(year));
                _nv.Add("@endmonth-int", Convert.ToString(endmonth));

                DataSet dscallsperday = GetData("sp_Callsperdaye_MobileDashboard", _nv);

                if (dscallsperday != null && dscallsperday.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow record in dscallsperday.Tables[0].Rows)
                    {
                        var callperday = record["CallPerDay"].ToString();

                        list.Add(item: new Getcallsperday(callperday));
                    }
                }
                if (list.Count > 0)
                {
                    callsperdayreturn.data = list;
                    callsperdayreturn.Status = HttpStatusCode.OK;
                    callsperdayreturn.Message = string.Format("Record exists from Employee against id {0}", EmployeeId);
                }
                else
                {
                    callsperdayreturn.data = null;
                    callsperdayreturn.Message = string.Format("Record not exists from Employee against id {0}", EmployeeId);
                    callsperdayreturn.Status = HttpStatusCode.BadRequest;
                    return callsperdayreturn;
                }
                #endregion

            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + " Stack: " + ex.StackTrace.ToString());
                callsperdayreturn.data = null;
                callsperdayreturn.Status = HttpStatusCode.BadRequest;
                callsperdayreturn.Message = string.Format("Message : {0}\n StackTrace: {1}ex.Message)", ex.Message, ex.StackTrace); ;
            }

            return callsperdayreturn;
        }
        #endregion


        #region daysinfield
        public ListGetdaysinfield daysinfield(string date, string endate, string LevelType, string EmployeeId)
        {
            ListGetdaysinfield daysinfieldreturn = new ListGetdaysinfield();
            List<Getdaysinfield> list = new List<Getdaysinfield>();

            try
            {
                #region Initialize
                DataSet dscallsperday;
                _nv = new NameValueCollection();
                _nv.Clear();
                int year = 0, month = 0, endyear = 0, endmonth = 0;
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

                if (month == endmonth)
                {
                    _nv.Add("@Leveltype-varchar(50)", LevelType.ToString());
                    _nv.Add("@EmployeeId-int", EmployeeId.ToString());
                    _nv.Add("@Month-int", Convert.ToString(month));
                    _nv.Add("@Year-int", Convert.ToString(year));
                    _nv.Add("@endmonth-int", Convert.ToString(endmonth));

                    dscallsperday = GetData("sp_DaysInField_MobileDashboard", _nv);

                    
                }
                else 
                {
                    _nv.Add("@Leveltype-varchar(50)", LevelType.ToString());
                    _nv.Add("@EmployeeId-int", EmployeeId.ToString());
                    _nv.Add("@Month-int", Convert.ToString(month));
                    _nv.Add("@Year-int", Convert.ToString(year));
                    _nv.Add("@endmonth-int", Convert.ToString(endmonth));

                    dscallsperday = GetData("sp_DaysInFielde_MobileDashboard", _nv);
                }

                if (dscallsperday != null && dscallsperday.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow record in dscallsperday.Tables[0].Rows)
                    {
                        var daysinfield = record["Final"].ToString();

                        list.Add(item: new Getdaysinfield(daysinfield));
                    }
                }
                if (list.Count > 0)
                {
                    daysinfieldreturn.data = list;
                    daysinfieldreturn.Status = HttpStatusCode.OK;
                    daysinfieldreturn.Message = string.Format("Record exists from Employee against id {0}", EmployeeId);
                }
                else
                {
                    daysinfieldreturn.data = null;
                    daysinfieldreturn.Message = string.Format("Record not exists from Employee against id {0}", EmployeeId);
                    daysinfieldreturn.Status = HttpStatusCode.BadRequest;
                    return daysinfieldreturn;
                }

            }
            catch (Exception ex)
            {
                
                 ErrorLog("Error Message: " + ex.Message.ToString() + " Stack: " + ex.StackTrace.ToString());
                 daysinfieldreturn.data = null;
                 daysinfieldreturn.Status = HttpStatusCode.BadRequest;
                 daysinfieldreturn.Message = string.Format("Message : {0}\n StackTrace: {1}ex.Message)", ex.Message, ex.StackTrace); ;
            }
            return daysinfieldreturn;
        }
        #endregion

        #region StartDailyCallTrendWork

        public ListGetStartDailyCallTrendWork StartDailyCallTrendWork(string date, string endate, string LevelType, string EmployeeId)
        {
            ListGetStartDailyCallTrendWork statdailyCallreturn = new ListGetStartDailyCallTrendWork();
            List<GetStartDailyCallTrendWork> list = new List<GetStartDailyCallTrendWork>();

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
                _nv = new NameValueCollection();
                _nv.Clear();
                int year = 0, month = 0, days = 0;
                DateTime currentDateTime;

                double employeeId = 0;

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

                _nv.Add("@Leveltype-varchar(50)", LevelType.ToString());
                _nv.Add("@EmployeeId-int", EmployeeId.ToString());
                _nv.Add("@Month-int", Convert.ToString(month));
                _nv.Add("@Year-int", Convert.ToString(year));
              //  _nv.Add("@endmonth-int", Convert.ToString(endmonth));

                dailyCallTrend = GetData("sp_DailyCallTrend_MobileDashboard", _nv);
                dtCorrectSMS = dailyCallTrend.Tables[0];
                dtCorrectSMS.PrimaryKey = new DataColumn[] { dtCorrectSMS.Columns[0] };

                string[] labels = (string[])label.ToArray(typeof(string));
                double cor_sms = 0.0;

                foreach (string daay in labels)
                {
                    string avgCallstr;
                    DataRow drCor = dtCorrectSMS.Rows.Find(daay);
                    if (drCor == null)
                    {
                        cor_sms = 0.0;
                        arlCorrect.Add(cor_sms);
                        mioCount.Add(0.0);
                        //avgCall.Add(cor_sms);
                        avgCallstr=cor_sms.ToString();
                        kpi.Add(cor_sms);
                    }
                    else
                    {
                        cor_sms = Convert.ToDouble(drCor["CorrectSMS"]);
                        arlCorrect.Add(cor_sms);
                        mioCount.Add(Convert.ToDouble(drCor["MIOs"]));
                       // avgCall.Add(Math.Round(cor_sms / Convert.ToDouble(drCor["MIOs"]), 2));
                        avgCallstr=Math.Round(cor_sms / Convert.ToDouble(drCor["MIOs"]), 2).ToString();
                        kpi.Add(13.0);
                    }
                    list.Add(item: new GetStartDailyCallTrendWork(avgCallstr));
                }

                //double[] CorrectSMS = (double[])arlCorrect.ToArray(typeof(double));
                //double[] MIOCount = (double[])mioCount.ToArray(typeof(double));
                //double[] AvgCalls = (double[])avgCall.ToArray(typeof(double));
                //double[] KPI = (double[])kpi.ToArray(typeof(double));
                //series.Add(new DailyCallTrendSeri("ActualCalls", AvgCalls));
                //result = _jss.Serialize(series);
               // var dataa = result;

                //if (dailyCallTrend != null && dailyCallTrend.Tables[0].Rows.Count > 0)
                //{
                //    foreach (DataRow record in dailyCallTrend.Tables[0].Rows)
                //    {
                //        var Day = record["Days"].ToString();
                //        var CorrectSM = record["CorrectSMS"].ToString();
                //        var MIO = record["MIOs"].ToString();
                //        var AVG = record["AVGC"].ToString();

                //        list.Add(item: new GetStartDailyCallTrendWork(Day, CorrectSM,MIO,AVG));
                //    }
                //}
                if (list.Count > 0)
                {
                    statdailyCallreturn.data = list;
                    statdailyCallreturn.Status = HttpStatusCode.OK;
                    statdailyCallreturn.Message = string.Format("Record exists from Employee against id {0}", EmployeeId);
                }
                else
                {
                    statdailyCallreturn.data = null;
                    statdailyCallreturn.Message = string.Format("Record not exists from Employee against id {0}", EmployeeId);
                    statdailyCallreturn.Status = HttpStatusCode.BadRequest;
                    return statdailyCallreturn;
                }
                #endregion

            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + " Stack: " + ex.StackTrace.ToString());
                statdailyCallreturn.data = null;
                statdailyCallreturn.Status = HttpStatusCode.BadRequest;
                statdailyCallreturn.Message = string.Format("Message : {0}\n StackTrace: {1}ex.Message)", ex.Message, ex.StackTrace);
                return statdailyCallreturn;
            }

            return statdailyCallreturn;
        }

        #endregion


        #region DailyCall

        public  ListGetDailyCall DailyCall(string date, string endate, string LevelType, string EmployeeId)
        {
            ListGetDailyCall DailyCallCallreturn = new ListGetDailyCall();
            List<GetDailyCall> list = new List<GetDailyCall>();

            #region Object Intialization
            JavaScriptSerializer _jss = new JavaScriptSerializer();
            string result = string.Empty;
            var series = new Collection<DailyCallTrendSeri>();
            #endregion

            try
            {

                #region Initialize
                _nv = new NameValueCollection();
                _nv.Clear();
                int year = 0, month = 0, endyear = 0, endmonth = 0;
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

                _nv.Add("@Leveltype-varchar(50)", LevelType.ToString());
                _nv.Add("@EmployeeId-int", EmployeeId.ToString());
                _nv.Add("@Month-int", Convert.ToString(month));
                _nv.Add("@Year-int", Convert.ToString(year));
               // _nv.Add("@endmonth-int", Convert.ToString(endmonth));

                DataSet dscallsperday = GetData("sp_DailyCallTrend_MobileDashboard", _nv);

                if (dscallsperday != null && dscallsperday.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow record in dscallsperday.Tables[0].Rows)
                    {
                        var Day = record["Days"].ToString();
                        var CorrectSM = record["CorrectSMS"].ToString();
                        var MIO = record["MIOs"].ToString();
                        var AVG = record["AVGC"].ToString();

                        list.Add(item: new GetDailyCall(Day, CorrectSM, MIO, AVG));
                    }
                }
                if (list.Count > 0)
                {
                    DailyCallCallreturn.data = list;
                    DailyCallCallreturn.Status = HttpStatusCode.OK;
                    DailyCallCallreturn.Message = string.Format("Record exists from Employee against id {0}", EmployeeId);
                }
                else
                {
                    DailyCallCallreturn.data = null;
                    DailyCallCallreturn.Message = string.Format("Record not exists from Employee against id {0}", EmployeeId);
                    DailyCallCallreturn.Status = HttpStatusCode.BadRequest;
                    return DailyCallCallreturn;
                }
                #endregion
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + " Stack: " + ex.StackTrace.ToString());
                DailyCallCallreturn.data = null;
                DailyCallCallreturn.Status = HttpStatusCode.BadRequest;
                DailyCallCallreturn.Message = string.Format("Message : {0}\n StackTrace: {1}ex.Message)", ex.Message, ex.StackTrace);
                return DailyCallCallreturn;
            }

            return DailyCallCallreturn;
        }

        #endregion

        #region PlannedVsActualCalls
        public ListGetPlannedVsActualCalls PlannedVsActualCalls(string date, string endate, string LevelType, string EmployeeId)
        {
            ListGetPlannedVsActualCalls planactualreturn = new ListGetPlannedVsActualCalls();
            List<GetPlannedVsActualCalls> list = new List<GetPlannedVsActualCalls>();
            try
            {
                DataSet plannedVSactualCalls;
                _nv = new NameValueCollection();
                _nv.Clear();
               
                int year = 0, month = 0, endmonth = 0;
                var targetVsActual = new DataTable();

                double employeeId = 0;


                JavaScriptSerializer _jss = new JavaScriptSerializer();
                string result = string.Empty;
                var series = new Collection<DailyCallTrendSeri>();


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
                _nv.Add("@Leveltype-varchar(50)", LevelType.ToString());
                _nv.Add("@EmployeeId-bigint", EmployeeId.ToString());
                _nv.Add("@Year-int", Convert.ToString(year));
                _nv.Add("@Month-int", Convert.ToString(month));
                _nv.Add("@endmonth-int", Convert.ToString(endmonth));
             
                //plannedVSactualCalls = GetData("crmdasboard_planedvsactual", _nvCollection);
                plannedVSactualCalls = GetData("planedvsactual1_newe_MobileDashboard", _nv);

                if (plannedVSactualCalls != null && plannedVSactualCalls.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow record in plannedVSactualCalls.Tables[0].Rows)
                    {
                        var clas = record["Class"].ToString();
                        var planvisit = record["PlanVisits"].ToString();
                        var actualvisit = record["ActualVisits"].ToString();

                        list.Add(item: new GetPlannedVsActualCalls(clas, planvisit, actualvisit));
                    }
                }
                if (list.Count > 0)
                {
                    planactualreturn.data = list;
                    planactualreturn.Status = HttpStatusCode.OK;
                    planactualreturn.Message = string.Format("Record exists from Employee against id {0}", EmployeeId);
                }
                else
                {
                    planactualreturn.data = null;
                    planactualreturn.Message = string.Format("Record not exists from Employee against id {0}", EmployeeId);
                    planactualreturn.Status = HttpStatusCode.BadRequest;
                    return planactualreturn;
                }
                #endregion


                #region Initializing Chart

                //var label = new ArrayList();
                //var planCall = new ArrayList();
                //var actualCall = new ArrayList();

                //foreach (DataRow item in plannedVSactualCalls.Tables[0].Rows)
                //{
                //    label.Add(item["Class"].ToString());
                //    planCall.Add(Convert.ToDouble(item["PlanVisits"]));
                //    actualCall.Add(Convert.ToDouble(item["ActualVisits"]));
                //}

                //string[] Label = (string[])label.ToArray(typeof(string));
                //double[] PlanCall = (double[])planCall.ToArray(typeof(double));
                //double[] ActualCall = (double[])actualCall.ToArray(typeof(double));

                #endregion

                #region Place Values in Bar Chart

                //series.Add(new DailyCallTrendSeri("Target", PlanCall));
                //series.Add(new DailyCallTrendSeri("Actual", ActualCall));
                //result = _jss.Serialize(series);
                //var arr = result;
                #endregion
            }
            catch (Exception ex)
            {
                 ErrorLog("Error Message: " + ex.Message.ToString() + " Stack: " + ex.StackTrace.ToString());
                planactualreturn.data = null;
                planactualreturn.Status = HttpStatusCode.BadRequest;
                planactualreturn.Message = string.Format("Message : {0}\n StackTrace: {1}ex.Message)", ex.Message, ex.StackTrace);
                return planactualreturn;
            }
            return planactualreturn;
        }
        #endregion

        #region Logger
        public static void ErrorLog(string error)
        {
            try
            {
                if (!Directory.Exists(@"C:\PBGMobileDasboard\Logs"))
                {
                    Directory.CreateDirectory(@"C:\PBGMobileDasboard\Logs");
                }

                File.AppendAllText(@"C:\PBGMobileDasboard\Logs" + "ReportLog_" + DateTime.UtcNow.ToString("yyyy_MM_dd") + ".txt",
                    DateTime.Now + " : " + error + Environment.NewLine);
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
        }
        #endregion

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
    }


    [Serializable]
    public class DailyCallTrendSeri
    {
        public DailyCallTrendSeri(string Name, double[] Data)
        {
            data = Data;
            name = Name;
        }
        public string name { get; set; }
        public double[] data { get; set; }
    }

}
