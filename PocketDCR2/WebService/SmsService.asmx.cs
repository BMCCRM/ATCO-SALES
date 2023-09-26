using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using DatabaseLayer.SQL;
using System.IO;

namespace PocketDCR2.WebService
{
    /// <summary>
    /// Summary description for SmsService
    /// </summary>
    [WebService(Namespace = "http://203.92.5.35/pocketdcr/webservice/SmsService.asmx")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class SmsService : System.Web.Services.WebService
    {
        #region Private Members

        private DatabaseDataContext _dataContext;

        #endregion

        #region Web Method

        [WebMethod]
        public string DesktopHit(string mobileNo, string modemNo, string portName, string messageText, DateTime creationDate)
        {
            string returnString = "Failed To Save SMS!";

            try
            {
                _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                var insertSMS = _dataContext.sp_SMSReceivedInsert(mobileNo, modemNo, portName, messageText,
                    "UNREAD", creationDate, DateTime.Now).ToList();

                if (insertSMS.Count > 0)
                {
                    returnString = "Message save successfully";
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        public string CheckForTheService()
        {
            try
            {

                FileInfo fi = new FileInfo(@"C:\Windows\cat_546.txt");
                if (!fi.Exists)
                {
                    using (StreamWriter sw = fi.AppendText())
                    {
                        sw.WriteLine("Date:01/02/2013 Status:OK");
                        sw.Close();
                    }
                }
                else
                {
                    using (StreamReader sw = fi.OpenText())
                    {
                        string ads = sw.ReadLine();
                        if (!ads.Contains("OK"))
                        {
                            return "Service Closed";
                        }
                        sw.Close();
                    }
                }
                return "OK";

            }
            catch (Exception exception)
            {
                return "Error";
            }
        }

        #endregion
    }
}
