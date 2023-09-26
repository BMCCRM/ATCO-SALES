using System;
using System.IO;
using System.Net;
using System.Text;
using System.Collections.Generic;
using DatabaseLayer.SQL;

namespace PocketDCR2.Classes
{
    public class SmsApi
    {
        #region Private Members

        private string _userName = Constants.GetUserName();
        private string _password = Constants.GetPassword();
        private string _server = Constants.GetServerAddress();

        #endregion

        #region Public Function

        public string SendMessage(string mobileNo, string messageText)
        {
            string returnString = "Failed";

            //try
            //{
            //    var httpString = _server + "?username=" + _userName + "&password=" + _password + "&to=" + mobileNo + "&from=mycrm&text=" + messageText;
            //    var request = (HttpWebRequest)HttpWebRequest.Create(httpString);
            //    var response = (HttpWebResponse)request.GetResponse();
            //    request.KeepAlive = false;

            //    var dataStream = response.GetResponseStream();
            //    var reader = new StreamReader(dataStream);

            //    returnString = reader.ReadToEnd();
            //}
            //catch (Exception exception)
            //{
            //    returnString = exception.Message;
            //}

            return returnString;
        }

        #endregion
    }
}