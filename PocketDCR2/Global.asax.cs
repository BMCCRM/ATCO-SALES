using System;
using PocketDCR2.Classes;

namespace PocketDCR2
{
    public class Global : System.Web.HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {
           // SMSprocessor.Instance.Start();
          //  MonthlyDoctorsBatchUploadHelper.Instance.Start();


            //SalesDataBatchUploadHelper.Instance.Start();
            Logger.LogWriter.Log.CreateFile(AppDomain.CurrentDomain.BaseDirectory + "\\ErrorLogs");
            Z.EntityFramework.Extensions.LicenseManager.AddLicense("36;100-SARNPK", "2699D96804ACC0C4A8FE98BAC9E79C6A");

        }

        void Application_End(object sender, EventArgs e)
        {
            //CredentialsEvaluator.Instance.Stop();
            //SMSprocessor.Instance.Stop();

           // MonthlyDoctorsBatchUploadHelper.Instance.Stop();
            Logger.LogWriter.Log.CloseFile();
        }

        void Application_Error(object sender, EventArgs e)
        {
            // Code that runs when an unhandled error occurs

        }

        void Session_Start(object sender, EventArgs e)
        {
            // Code that runs when a new session is started
            //Session["SystemUser"] = null;
            //Session["CurrentUserId"] = null;
            //Session["CurrentUserLoginID"] = null;
            //Session["CurrentUserRole"] = null;
        }

        void Session_End(object sender, EventArgs e)
        {
            // Code that runs when a session ends. 
            // Note: The Session_End event is raised only when the sessionstate mode
            // is set to InProc in the Web.config file. If session mode is set to StateServer 
            // or SQLServer, the event is not raised.
            //Session.Clear();
        }

    }
}
