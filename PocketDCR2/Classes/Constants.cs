using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Collections;
using System.IO;
using DatabaseLayer.SQL;
using System.Collections.Specialized;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Diagnostics;

namespace PocketDCR2.Classes
{
    public class Constants
    {
        #region Allowed Application Versions

        private static string _executionrestrictionflag = ConfigurationManager.AppSettings["ExecutionRestrictionFlag"].ToString();
        public static string GetExecutionRestrictionFlag()
        {
            return _executionrestrictionflag;
        }

        #endregion

        #region Connection String

        private static string _connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["PocketDCRConnectionString"].ConnectionString;
        public static string GetConnectionString()
        {
            return _connectionString;
        }
        public static void UodateLogging(long userId, string description, DateTime dateTime)
        {
            try
            {


            }
            catch (Exception exception)
            {

                Console.Out.WriteLine("Exception :" + exception);
            }


        }

        #endregion

        #region SMS API

        private static string _serverAddress = ConfigurationManager.AppSettings["Server"];
        private static string _serverUserId = ConfigurationManager.AppSettings["UserId"];
        private static string _serverPassword = ConfigurationManager.AppSettings["Password"];
        private static string _smsMask = ConfigurationManager.AppSettings["SMSMasking"];

        public static string GetServerAddress()
        {
            return _serverAddress;
        }

        public static string GetUserName()
        {
            return _serverUserId;
        }

        public static string GetPassword()
        {
            return _serverPassword;
        }
        public static string GetSMSMask()
        {
            return _smsMask;
        }
        #endregion

        #region SMTP Settings

        public static string SmtpServer
        {
            get { return ConfigurationManager.AppSettings["smtpServer"].ToString(); }
        }
        public static string SmtpSender
        {
            get { return ConfigurationManager.AppSettings["smtpSender"].ToString(); }
        }
        public static string SmtpPassword
        {
            get { return ConfigurationManager.AppSettings["smtpPassword"].ToString(); }
        }
        public static string SmtpSsl
        {
            get { return ConfigurationManager.AppSettings["smtpSSL"].ToString(); }
        }
        public static string SmtpPort
        {
            get { return ConfigurationManager.AppSettings["smtpPort"].ToString(); }
        }
        public static string SmtpAuthonticate
        {
            get { return ConfigurationManager.AppSettings["smtpAuthonticate"].ToString(); }
        }

        #endregion

        #region Allowed Application Versions

        private static string _applicationversions = ConfigurationManager.AppSettings["MobileApplicationVersions"].ToString();
        public static string GetAllowedApplicationVersions()
        {
            return _applicationversions;
        }

        #endregion

        #region Misc Settings

        public static bool IsDsplayResetPassword
        {
            get { return Boolean.Parse(ConfigurationManager.AppSettings["DisplayResetPassword"].ToString()); }
        }


        private static string _monthsToKeepCredentials = ConfigurationManager.AppSettings["monthsToKeepCredentials"];

        public static string GetMonthsToKeepCredentials()
        {
            return _monthsToKeepCredentials;
        }

        #endregion

        #region Get Months Name Between Date Range

        public static IEnumerable<DateTime> MonthsBetweenDateRange(DateTime start, DateTime end)
        {
            for (var month = start.Date; month <= end; month = month.AddMonths(1))
            {
                yield return month;
            }
        }

        #endregion

        #region GetPDFFilePath
        public static string GetPDFPath
        {
            get
            {
                return AppDomain.CurrentDomain.BaseDirectory.ToString() + "\\Images\\pdf\\report.pdf";
            }
        }
        #endregion

        #region LevenshteinDistance


        public static double LevenshteinDistance(string planning, string Actual)
        {

            string A = planning.Replace(", ", ",");
            string B = Actual.Replace(", ", ",");
            ArrayList aarray = new ArrayList(A.Split(new char[] { ',' }));
            ArrayList barray = new ArrayList(B.Split(new char[] { ',' }));
            aarray.Remove("");
            aarray.Remove("");
            barray.Remove("");
            barray.Remove("");

            barray.Remove(",");

            int count = 0;

            for (int i = 0; i < barray.Count; i++)
            {
                if (aarray.Contains(barray[i]))
                {
                    count++;
                }
            }

            int total = aarray.Count;
            double res = 0;


            if (aarray.Count != 0)
            {
                res = (double)count / (double)total;
                res = res * 100;
            }
            return Math.Round(res, 2);
        }

        public static int LevenshteinDistance1(string s, string t)
        {
            int n = s.Length;
            int m = t.Length;
            int[,] d = new int[n + 1, m + 1];

            // Step 1
            if (n == 0)
            {
                return m;
            }

            if (m == 0)
            {
                return n;
            }

            // Step 2
            for (int i = 0; i <= n; d[i, 0] = i++)
            {
            }

            for (int j = 0; j <= m; d[0, j] = j++)
            {
            }

            // Step 3
            for (int i = 1; i <= n; i++)
            {
                //Step 4
                for (int j = 1; j <= m; j++)
                {
                    // Step 5
                    int cost = (t[j - 1] == s[i - 1]) ? 0 : 1;

                    // Step 6
                    d[i, j] = Math.Min(
                        Math.Min(d[i - 1, j] + 1, d[i, j - 1] + 1),
                        d[i - 1, j - 1] + cost);
                }
            }
            // Step 7
            return d[n, m];
        }

        #endregion

        #region GetClientIP
        public static string GetClientIP(string page, string LoginRole, string ip, string UserID)
        {
            string myExternalIP = string.Empty;
            DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
            try
            {




                int employeeid = Convert.ToInt32(UserID);
                string strHostName = System.Net.Dns.GetHostName();
                string clientIPAddress = System.Net.Dns.GetHostAddresses(strHostName).GetValue(0).ToString();
                string clientip = clientIPAddress.ToString();
                System.Net.HttpWebRequest request =
            (System.Net.HttpWebRequest)System.Net.HttpWebRequest.Create("http://jsonip.com/");
                request.UserAgent = "User-Agent: Mozilla/4.0 (compatible; MSIE" +
                    "6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)";
                System.Net.HttpWebResponse response =
                (System.Net.HttpWebResponse)request.GetResponse();
                using (System.IO.StreamReader reader = new
                StreamReader(response.GetResponseStream()))
                {
                    //myExternalIP = reader.ReadToEnd().Split(',')[0].Split(':')[1].Replace('"', char.MinValue);
                    myExternalIP = reader.ReadToEnd();
                    reader.Close();
                }

                PageVisitDetail pgeVstDetails = new PageVisitDetail
                {
                    IpAddress = ip,
                    PageName = page,
                    VisitDateTime = DateTime.Now,
                    LoginID = LoginRole,
                    EmployeeID = employeeid
                };
                _dataContext.PageVisitDetails.InsertOnSubmit(pgeVstDetails);
                _dataContext.SubmitChanges();
            }
            catch (Exception ex)
            {

            }

            return myExternalIP;
        }


     


        #endregion

        #region Logger
        public static void ErrorLog(string error)
        {
            try
            {
                if (!Directory.Exists(ConfigurationManager.AppSettings["Logs"].ToString()))
                {
                    Directory.CreateDirectory(ConfigurationManager.AppSettings["Logs"].ToString());
                }

                File.AppendAllText(ConfigurationManager.AppSettings[@"Logs\"].ToString() + "ReportLog_" + DateTime.UtcNow.ToString("yyyy_MM_dd") + ".txt",
                    DateTime.Now + " : " + error + Environment.NewLine);
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
        }


        #endregion

        #region Password Reset Configuration


        private static string _recoveryMethod = ConfigurationManager.AppSettings["RecoveryMethod"].ToString();

        public static RecoverMethod GetRecoveryMethod()
        {
            switch (_recoveryMethod)
            {
                case "1":
                    return RecoverMethod.EmailOnly;
                case "2":
                    return RecoverMethod.EmailAndShow;
                case "3":
                    return RecoverMethod.EmailAndSMS;
                case "4":
                    return RecoverMethod.ShowOnly;
                default:
                    return RecoverMethod.Default;
            }
        }

        #endregion

        #region ImagesSuccesLog
        public static void ImagesSuccesLog(string error)
        {
            try
            {
                if (!Directory.Exists(ConfigurationManager.AppSettings[@"Logs\"].ToString()+"ImagesSuccesLog"))
                {
                    Directory.CreateDirectory(ConfigurationManager.AppSettings[@"Logs\"].ToString() + "ImagesSuccesLog");
                }

                File.AppendAllText(ConfigurationManager.AppSettings[@"ImagesSuccesLog\"].ToString() + "ReportLog_" + DateTime.UtcNow.ToString("yyyy_MM_dd") + ".txt",
                    DateTime.Now + " : " + error + Environment.NewLine);
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
        }
        #endregion




    }





    public enum RecoverMethod
    {
        // Use This Class For Recovery Methods -- ARSAL //


        Default,            // If No Or Wrong Code Value Specified Sends Email Only
        EmailOnly,          // CODE :: 1 
        EmailAndShow,       // CODE :: 2  
        EmailAndSMS,        // CODE :: 3
        ShowOnly            // CODE :: 4
    };









}