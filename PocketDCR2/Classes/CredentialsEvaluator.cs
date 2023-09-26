using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Threading;
using System.Globalization;
using System.Collections;
using System.Data.SqlClient;
using System.Collections.Specialized;
using DatabaseLayer.SQL;
using System.IO;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;


namespace PocketDCR2.Classes
{
    public class CredentialsEvaluator
    {

        #region Private Members

        private DatabaseDataContext _dataContext;
        private static readonly CredentialsEvaluator _instance = new CredentialsEvaluator();
        private readonly System.Timers.Timer _processTimer;
        private DateTime _smsDate;
        private NameValueCollection _nvCollection = new NameValueCollection();
        private string _status = "", _isTemp = "";
        private bool _isDateValid = false, _isValid = false, _isSaved = false;
        
        private DAL _dl = new DAL();
        #endregion

        #region Contructor

        private CredentialsEvaluator()
        {
            _processTimer = new System.Timers.Timer();
        }

        #endregion

        #region Database Layer

        private DataSet GetData(String spName, NameValueCollection nv)
        {
            var connection = new SqlConnection();
            string dbTyper = "";

            try
            {
                connection.ConnectionString = Classes.Constants.GetConnectionString();
                var dataSet = new DataSet();
                connection.Open();

                var command = new SqlCommand();
                command.CommandType = CommandType.StoredProcedure;
                command.Connection = connection;
                command.CommandText = spName;

                if (nv != null)
                {
                    //New code implemented for retrieving data
                    for (int i = 0; i < nv.Count; i++)
                    {
                        string[] arraySplit = nv.Keys[i].Split('-');

                        if (arraySplit.Length > 2)
                        {
                            //Run the code with datatype length.
                            dbTyper = "SqlDbType." + arraySplit[1].ToString() + "," + arraySplit[2].ToString();
                            command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = nv[i].ToString();
                        }
                        else
                        {
                            //Run the code for int values
                            dbTyper = "SqlDbType." + arraySplit[1].ToString();
                            command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = nv[i].ToString();
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

        #region Public Functions

        public static CredentialsEvaluator Instance
        {
            get
            {
                return _instance;
            }
        }

        public string ServerStatus
        {
            get
            {
                return _status;
            }

            set
            {
                _status = value;
            }
        }

        public void Start()
        {
            try
            {
                double timerInterval = 60 * 60 * 1000; // One Hour Elapse Timer --Arsal;
                _processTimer.AutoReset = true;
                _processTimer.Elapsed += new System.Timers.ElapsedEventHandler(_processTimer_Elapsed);
                _processTimer.Interval = timerInterval;
                _processTimer.Start();
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
        }

        void _processTimer_Elapsed(object sender, System.Timers.ElapsedEventArgs e)
        {
            try
            {
                if (DateTime.Now.Hour == 00)
                {
                    _processTimer.Stop();
                    _status = Process();
                    _processTimer.Start();
                }

                
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
        }

        public void Stop()
        {
            try
            {
                _processTimer.Stop();
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
        }

        public string Process()
        {
            string retrunString = "";

            try
            {
                MethodsToRun();
            }
            catch (Exception)
            {
                retrunString = "Unable to connect";
            }

            return retrunString;
        }

        public void InitializeSystem()
        {
            try
            {
                Start();
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
        }

        public void ShutDownSystem()
        {
            try
            {
                _processTimer.Stop();
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
        }

        #endregion

        #region Private Functions

        private void MethodsToRun()
        {
            try
            {
                _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());

                _nvCollection.Clear();
                _nvCollection.Add("@MonthNumber-INT", Classes.Constants.GetMonthsToKeepCredentials());
                _dl.GetData("sp_ClearOldCredentials", _nvCollection);

            }
            catch (Exception exception)
            {
                ErrorLog("ERROR :: Exception Occur From During Clearing Credential Logs Is : " + exception.Message);
            }
        }

        
        private int DATEDIFF(string interval, DateTime visitdatetime, DateTime createdDatetime)
        {
            int daysdiff = 0;

            TimeSpan span = createdDatetime.Subtract(visitdatetime);
            daysdiff = span.Days;
            return daysdiff;

        }

        private static void ErrorLog(string error)
        {
            try
            {
                if (!Directory.Exists(ConfigurationManager.AppSettings["Logs"].ToString()))
                {
                    Directory.CreateDirectory(ConfigurationManager.AppSettings["Logs"].ToString());
                }

                File.AppendAllText(ConfigurationManager.AppSettings[@"Logs\"].ToString() + "Log_" + DateTime.UtcNow.ToString("yyyy_MM_dd") + ".txt",
                    DateTime.Now + " : " + error + Environment.NewLine);
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
        }

        #endregion

    }
}