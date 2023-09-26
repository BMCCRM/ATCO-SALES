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
    /// Summary description for CityDistance1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class CityDistance1 : System.Web.Services.WebService
    {

        #region Public Member

        JavaScriptSerializer _jss = new JavaScriptSerializer();
        DAL dl = new DAL();
        NameValueCollection nv = new NameValueCollection();
        #endregion

        #region Public Functions


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string FillGrid()
        {
            string returnString = "";

            try
            {
                var data = dl.GetData("Expense_CityDistance_New", null);
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
        public string getAllDistributor()
        {
            string returnString = "";

            try
            {
                var data = dl.GetData("sp_getsalesDist", null);
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
        public string InsertCityDistance(string FromCityId,
                                            string ToCityId,
                                            string distanceKm,
                                            string distributor,
                                            string status)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@fromcityId-text", FromCityId.ToString());
                nv.Add("@tocityId-text", ToCityId.ToString());
                nv.Add("@distanceKm-text", distanceKm.ToString());
                nv.Add("@distributorId-int", distributor.ToString());
                nv.Add("@Status-varchar", status.ToString());


                var data = dl.GetData("sp_insertcitiesdistance", nv);
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
        public string GetCityDistance(string CityDistanceID)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@CityDistanceID-int", CityDistanceID.ToString());
                var data = dl.GetData("sp_getcitiesdistance", nv);
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
        public string GetCityDistance_NewTag(string FromCityId, string ToCityId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@FromCityId-int", FromCityId.ToString());
                nv.Add("@ToCityId-int", ToCityId.ToString());
                var data = dl.GetData("sp_getcitiesdistance_NewTag", nv);
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
        public string UpdateCityDistance(int CityDistanceID,
                                            string FromCityId,
                                            string ToCityId,
                                            string distanceKm,
                                            string distributor,
                                            string status)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@CityDistanceID-int", CityDistanceID.ToString());
                nv.Add("@fromcityId-text", FromCityId.ToString());
                nv.Add("@tocityId-text", ToCityId.ToString());
                nv.Add("@distanceKm-text", distanceKm.ToString());
                nv.Add("@DistributorID-int", distributor.ToString());
                nv.Add("@Status-int", status.ToString());
                var data = dl.GetData("sp_updatecitiesdistance", nv);
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
        public string DeleteCityDistance(int CityDistanceID)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@CityDistanceID-int", CityDistanceID.ToString());
                var data = dl.GetData("sp_deletecitiesdistance", nv);
                if (data.Tables[0].ToString() == "NotDeleted")
                {
                    returnString = "Not able to delete this record due to linkup.";
                }
                else
                {
                    returnString = "OK";
                }
                
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
