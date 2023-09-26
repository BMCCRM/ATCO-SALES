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
    /// Summary description for DocBrickRel
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class DocBrickRel : System.Web.Services.WebService
    {
        JavaScriptSerializer _jss = new JavaScriptSerializer();
        DAL dl = new DAL();
        NameValueCollection nv = new NameValueCollection();


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string FillGridData()
        {
            string returnString = "";

            try
            {
                var data = dl.GetData("sp_getDoctBrickRel", null);
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
        public string getAllBrick()
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@DistId-int", "-1");
                var data = dl.GetData("sp_GetSalesBrickByDistributor", nv);
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
        public string EditGridData(int BrickId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@BrickID-int", BrickId.ToString());
                var data = dl.GetData("sp_getDoctBrickRelbyID", nv);
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
        public string UpdateBrick(int BrickID, int City)
                                           
                                            
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@BrickId-int", BrickID.ToString()); 
                nv.Add("@CityId-int", City.ToString());
                var data = dl.GetData("sp_updatecitybyBrick", nv);
                returnString = "OK";
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }


    }
}
