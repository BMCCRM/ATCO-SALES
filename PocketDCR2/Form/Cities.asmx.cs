using System;
using System.Linq;
using System.Web.Script.Services;
using System.Web.Services;
using DatabaseLayer.SQL;
using System.Web.Script.Serialization;
using PocketDCR2.Classes;
using System.Data.SqlClient;
using System.Collections.Specialized;
using System.Globalization;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for Cities1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class Cities1 : System.Web.Services.WebService
    {

        #region Public Member

        JavaScriptSerializer _jss = new JavaScriptSerializer();
        DAL dl = new DAL();
        NameValueCollection nv = new NameValueCollection();
        #endregion

        #region Public Functions

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string getAllCities()
        {
            string returnString = "";

            try
            {
                var data = dl.GetData("sp_getallcities", null);
                returnString = data.Tables[0].ToJsonString();
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertCity(string CityName, bool isBigCityDialyAllowance)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@CityName-text", CityName.ToString());
                nv.Add("@isBigCityDialyAllowance-bit", isBigCityDialyAllowance.ToString());
                var data = dl.GetData("sp_insertcities", nv);
                returnString = "OK";
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetCity(int CityId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@CityID-int", CityId.ToString());
                var data = dl.GetData("sp_getcities", nv);
                returnString = data.Tables[0].ToJsonString();
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateCity(int CityId,
                                            string CityName, bool isBigCityDialyAllowance)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@CityID-int", CityId.ToString());
                nv.Add("@CityName-text", CityName.ToString());
                nv.Add("@isBigCityDialyAllowance-bit", isBigCityDialyAllowance.ToString());
                var data = dl.GetData("sp_updatecities", nv);
                returnString = "OK";
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DeleteCity(int CityId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@CityID-int", CityId.ToString());
                var data = dl.GetData("sp_deletecities", nv);
                returnString = "OK";
            }
            catch (SqlException exception)
            {
                if (exception.Number == 547)
                {
                    returnString = "Not able to delete this record due to linkup.";
                }
                else
                {
                    returnString = exception.Message;
                }
            }

            return returnString;
        }

        #endregion
    }
}
