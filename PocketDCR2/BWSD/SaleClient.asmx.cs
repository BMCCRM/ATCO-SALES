using PocketDCR2.Classes;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;

namespace PocketDCR2.BWSD
{
    /// <summary>
    /// Summary description for SaleClient
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class SaleClient : System.Web.Services.WebService
    {
        JavaScriptSerializer _jss = new JavaScriptSerializer();
        NameValueCollection _nv = new NameValueCollection();
        DAL dal = new DAL();

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string listGetSalesClientBricks(string distid, string brickid)
        {
            string result = "";
            //var Date = Convert.ToDateTime(docdate);
            //var Spoid = spoid.Split('-')[0].ToString();

            try
            {
                _nv.Clear();
                _nv.Add("@distid-int", distid.ToString());
                _nv.Add("@brickid-int", brickid.ToString());
                var data = dal.GetData("sp_getclient", _nv);

                if (data.Tables[0].Rows.Count > 0)
                {
                    return data.Tables[0].ToJsonString();
                }
                else
                {

                    result = "No";
                }

            }
            catch (Exception ex)
            {

                result = ex.Message;
            }
            return result;
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]//"{'brick':'" + brick + "','clientcode':'" + clientcode + "','clientName':'" + clientName + "'}";
        public string InsertClientSalesBrick(string brick,string brickcode,string clientcode, string clientName)
        {
            string returnString = "";

            try
            {

                #region Validate Name
                _nv.Clear();
                _nv.Add("@brickid-int", brick.ToString());
                _nv.Add("@brickcode-varchar(50)", brickcode.ToString());
                _nv.Add("@clientcode-varchar(50)", clientcode.ToString());
                var data = dal.GetData("sp_SalescleintCheck", _nv);

                #endregion

                if (data.Tables[0].Rows.Count != 0)
                {
                    returnString = "Duplicate Name!";
                }
                else
                {
                    _nv.Clear();
                    _nv.Add("@brickID-int", brick.ToString());
                    _nv.Add("@brickcode-varchar(50)", brickcode.ToString());
                    _nv.Add("@clientcode-varchar(50)", clientcode.ToString());
                    _nv.Add("@clientName-varchar(250)", clientName.ToString());
                    dal.InserData("sp_SalesClientInsert", _nv);
                    returnString = "OK";
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
        public string GetClientbyId(int clientid)
        {
            string returnString = "";

            try
            {
                _nv.Clear();
                _nv.Add("@clientid-int", clientid.ToString());

                var data = dal.GetData("sp_getclientbyid", _nv);

                if (data.Tables.Count > 0)
                    returnString = data.Tables[0].ToJsonString();
                else
                    returnString = "SQL Not Proceed";
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateClient(int clientId, int brick, string brickcode, string clientcode, string clientName)
        {
            string returnString = "";

            try
            {
                _nv.Clear();

                _nv.Add("@clientId-int", clientId.ToString());
                _nv.Add("@brickID-int", brick.ToString());
                _nv.Add("@brickcode-varchar(50)", brickcode.ToString());
                _nv.Add("@clientcode-varchar(50)", clientcode.ToString());
                _nv.Add("@clientName-varchar(250)", clientName.ToString());


                var data = dal.GetData("sp_SalesClientUpdate", _nv);

                if (data.Tables.Count > 0)
                    returnString = data.Tables[0].Rows[0][0].ToString();
                else
                    returnString = "SQL Not Proceed";
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DeleteClient(int clientID)
        {

            string returnString = "";

            try
            {
                _nv.Clear();
                _nv.Add("@clientID-int", clientID.ToString());

                var data = dal.GetData("sp_DeleteClient", _nv);

                if (data.Tables.Count > 0)
                    returnString = data.Tables[0].Rows[0][0].ToString();
                else
                    returnString = "SQL Not Proceed";

            }
            catch (SqlException exception)
            {
                if (exception.Number == 547)
                {
                    returnString = "Not able to delete this level due to linkup.";
                }
                else
                {
                    returnString = exception.Message;
                }
            }

            return returnString;

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllDistributor()
        {
            string returnString = "";

            try
            {

                //_nvCollection.Clear();
                //  _nvCollection.Add("@CityId-int", CityId.ToString());
                DataSet ds = dal.GetData("sp_getalldistributor", null);

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
        public string GetAllBrickByDist(string DistId)
        {
            string returnString = "";

            try
            {
                _nv.Clear();
                _nv.Add("@DistId-int", DistId.ToString());
                DataSet ds = dal.GetData("sp_GetSalesBrickByDistributor", _nv);

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
    }
}
