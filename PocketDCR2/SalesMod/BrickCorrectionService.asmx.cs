using PocketDCR2.Classes;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace PocketDCR2.SalesMod
{
    /// <summary>
    /// Summary description for BrickCorrectionService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
     [System.Web.Script.Services.ScriptService]
    public class BrickCorrectionService : System.Web.Services.WebService
    {
        NameValueCollection _nvCollection = new NameValueCollection();
        DAL _dl = new Classes.DAL();

        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetBrickData(string distid, string brickid, string isApproved)
        {
            string returnString = "";

            try
            {

                _nvCollection.Clear();
                _nvCollection.Add("@distid-int", distid.ToString());
                _nvCollection.Add("@brickid-int", brickid.ToString());
                _nvCollection.Add("@isApproved-varchar", isApproved.ToString());
                DataSet ds = _dl.GetData("sp_GetPharmacyCorrectionData", _nvCollection);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                    else
                    {

                        returnString = "No";
                    }
                }
                else
                {
                    returnString = "No";
                }
            }
            catch (SqlException exception)
            {

                returnString = exception.Message;

            }

            return returnString;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string updateClientBrick(string ID)
        {
            string returnString = "";

            try
            {

                _nvCollection.Clear();
                _nvCollection.Add("@ID-int", ID.ToString());
                DataSet ds = _dl.GetData("UpdateClient", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
                }
                else
                {
                    returnString = "No";
                }
            }
            catch (SqlException exception)
            {

                returnString = exception.Message;

            }

            return returnString;
        }

        
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string updateBulkClientBrick(string ids)
        {
            string returnString = "";

            try
            {
                string[] ID = ids.Split(',');
              

                for (int i = 0; i < ID.Length; i++)
                {
                    _nvCollection.Clear();
                    _nvCollection.Add("@ID-int", ID[i].ToString());
                  
                    DataSet ds = _dl.GetData("UpdateClient", _nvCollection);
                }

                returnString = "OK";

              
            }
            catch (SqlException exception)
            {
                returnString = exception.Message;
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
                DataSet ds = _dl.GetData("sp_getalldistributor", null);

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
                _nvCollection.Clear();
                _nvCollection.Add("@DistId-int", DistId.ToString());
                DataSet ds = _dl.GetData("sp_GetSalesBrickByDistributor", _nvCollection);

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
