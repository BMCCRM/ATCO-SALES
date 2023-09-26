using System;
using System.Linq;
using System.Web.Script.Services;
using System.Web.Services;
using DatabaseLayer.SQL;
using System.Web.Script.Serialization;
using PocketDCR2.Classes;
using System.Data.Common;
using System.Data.SqlClient;
using System.Collections.Specialized;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for SalesBricksService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class SalesBrickService : System.Web.Services.WebService
    {

        #region Public Member

        DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        JavaScriptSerializer _jss = new JavaScriptSerializer();
        DAL dl = new DAL();
        NameValueCollection nv = new NameValueCollection();
        #endregion

        #region Public Methods
        //sp_GetBrickcode
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetBrickCode()
        {
            string returnString = "";

            try
            {
                nv.Clear();
                var data = dl.GetData("sp_GetBrickcode", null);

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

        //GetAllBrick
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllBrick()
        {
            string returnString = "";

            try
            {
                nv.Clear();
                var data = dl.GetData("sp__RegionTobrickDetails", null);

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
        public string InsertBrick(int CityID, string DistributorID, string txtCode, string txtName, bool isActive, string BrickTypeId)
        {

            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@CityID-int", CityID.ToString());
                nv.Add("@DistributorID-int", DistributorID.ToString());
                nv.Add("@BrickTypeId-int", BrickTypeId.ToString());
                nv.Add("@txtCode-text", txtCode.ToString());
                nv.Add("@txtName-text", txtName.ToString());
                nv.Add("@isActive-text", isActive.ToString());
                var data = dl.GetData("sp_insertBrickDetail", nv);

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
        public string GetBrick(int brickID)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@brickID-int", brickID.ToString());

                var data = dl.GetData("sp__RegionTobrickDetailsBybrickID", nv);

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
        public string UpdateBrick(int SwapDistributorID, int DistributorID, int brickID, string txtCode, string txtName, bool isActive, string BrickTypeId)
        {
            string returnString = "";

            try
            {
                nv.Clear();

                nv.Add("@SwapDistributorID-int", SwapDistributorID.ToString());
                nv.Add("@brickID-int", brickID.ToString());
                nv.Add("@DistributorID-int", DistributorID.ToString());
                nv.Add("@BrickTypeId-int", BrickTypeId.ToString());
                nv.Add("@txtCode-text", txtCode.ToString());
                nv.Add("@txtName-text", txtName.ToString());
                nv.Add("@isActive-text", isActive.ToString());

                var data = dl.GetData("sp_updateBrickDetail", nv);

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
        public string DeleteBrick(int DistributorID, int brickID)
        {

            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@DistributorID-int", DistributorID.ToString());
                nv.Add("@brickID-int", brickID.ToString());

                var data = dl.GetData("sp_DeleteABrick", nv);

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

        #endregion
    }
}
