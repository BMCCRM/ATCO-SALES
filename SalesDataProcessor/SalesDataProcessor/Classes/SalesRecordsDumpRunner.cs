using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;

namespace SalesDataProcessor.Classes
{
    class SalesRecordsDumpRunner
    {
        
        
        private static readonly SalesRecordsDumpRunner _instance = new SalesRecordsDumpRunner();
        private readonly System.Timers.Timer _processTimer;
        private DAL _dl = new DAL();
      

        private SalesRecordsDumpRunner()
        {
            _processTimer = new System.Timers.Timer();
        }       


        public static SalesRecordsDumpRunner Instance
        {
            get
            {
                return _instance;
            }
        }

        public void Start()
        {
            try
            {
                double timerInterval = 30 * 1000; //60 * 60 * 1000; // 15 Minute Elapse Timer --Arsal;
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
                _processTimer.Stop();
                Process();
                _processTimer.Start();

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

        public Boolean Process()
        {
            new Classes.GeneratedSalesDataRecords();
         
            return true;
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

      
        private static void ErrorLog(string error)
        {
            try
            {
                if (!Directory.Exists(ConfigurationManager.AppSettings["LogsDirectory"].ToString()))
                {
                    Directory.CreateDirectory(ConfigurationManager.AppSettings["LogsDirectory"].ToString());
                }

                File.AppendAllText(ConfigurationManager.AppSettings[@"LogsDirectory"].ToString() + "Log_Sales" + DateTime.UtcNow.ToString("yyyy_MM_dd") + ".txt",
                    DateTime.Now + " : " + error + Environment.NewLine);
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
        }

       



    }
}
