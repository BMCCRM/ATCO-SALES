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
using System.Web.Security;
using PocketDCR2.Reports;


namespace PocketDCR2.WebService
{
    /// <summary>
    /// Summary description for MobileDashboard
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class MobileDashboard : System.Web.Services.WebService
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

        [WebMethod(EnableSession = true)]
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

        [WebMethod(EnableSession = true)]
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

        [WebMethod(EnableSession = true)]
        public string DailyCall(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId)



        {
            //st<DailyCall1> t5 = new List<DailyCall1>();
            string result = string.Empty;
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


                _nvCollection.Add("@Level3Id-int", Convert.ToString(Level3));
                _nvCollection.Add("@Level4Id-int", Convert.ToString(Level4));
                _nvCollection.Add("@Level5Id-int", Convert.ToString(Level5));
                _nvCollection.Add("@Level6Id-int", Convert.ToString(Level6));
                _nvCollection.Add("@EmployeeId-bigint", employeeId.ToString());
                _nvCollection.Add("@Year-int", Convert.ToString(year));
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                dailyCallTrend = GetData("crmdashboard_DailyCallTrend", _nvCollection);


                //for (int i = 0; i < dailyCallTrend.Tables[0].Rows.Count; i++)
                //{
                //    t5.Add(new DailyCall1(dailyCallTrend.Tables[0].Rows[i]["Days"].ToString(), dailyCallTrend.Tables[0].Rows[i]["CorrectSMS"].ToString(), dailyCallTrend.Tables[0].Rows[i]["MIOs"].ToString(), dailyCallTrend.Tables[0].Rows[i]["AVGC"].ToString()));
                //}

                result = dailyCallTrend.Tables[0].ToJsonString();
                #endregion



            }
            catch (Exception exception)
            {

            }

            return result;
        }     
    }
}
