using System;
using System.Collections.Specialized;
using System.Web.Script.Services;
using System.Web.Services;
using PocketDCR2.Classes;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for CallReasons1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [ScriptService]
    public class CallReasons1 : System.Web.Services.WebService
    {
        readonly DAL _dl = new DAL();

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertReason(string name)
        {
            string returnString = "";

            try
            {
                #region Validate Name

                var ds = _dl.GetData("ReasonsofCalls_Insert", new NameValueCollection { { "@RSN-VARCHAR-50", name } });
                if (ds != null)
                    returnString = ds.Tables.Count > 0 ? "Duplicate Name!" : "OK";


                #endregion
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetReason(string reasonId)
        {
            var returnString = "";
            try
            {
                var ds = _dl.GetData("ReasonsofCalls_GetAReason", new NameValueCollection { { "@RSNID-INT", reasonId } });
                if (ds != null)
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
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
        public string UpdateReason(string reasonId, string name)
        {
            var returnString = "";

            try
            {
                #region Validate Name
                var ds = _dl.GetData("ReasonsofCalls_UpdateAReason", new NameValueCollection { { "@RSN-VARCHAR-50", name }, { "@RSNID-INT", reasonId } });
                if (ds != null)
                    returnString = ds.Tables.Count > 0 ? "Duplicate Name!" : "OK";
                #endregion
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllReasons()
        {
            return _dl.GetData("ReasonsofCalls_GetAllReason", null).Tables[0].ToJsonString();
        }



    }
}
