using PocketDCR2.Classes;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;

namespace PocketDCR2.BWSD
{
    /// <summary>
    /// Summary description for BrickAllocationService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    [System.Web.Script.Services.ScriptService]
    public class BrickAllocationService : System.Web.Services.WebService
    {
        #region Public Member
        JavaScriptSerializer _jss = new JavaScriptSerializer();
        NameValueCollection _nv = new NameValueCollection();
        DAL dal = new DAL();
        
        #endregion

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllData()
        {
            string returnString = "";

            try
            {
                _nv.Clear();
                var data = dal.GetData("sp_GetAllBrickData", null);
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
        public string GetSalesBricKById(int ID)
        {
            string returnString = "";

            try
            {
                _nv.Clear();
                _nv.Add("@ID-int", ID.ToString());
                var data = dal.GetData("sp_SalesBrickSelect", _nv);
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
        public string UpdateSalesData(int ID, bool isActive,int Percentage)
        {
            string returnString = "";
            try
            {
                _nv.Clear();
                _nv.Add("@ID-int", ID.ToString());
                _nv.Add("@IsActive-bit", isActive.ToString());
                _nv.Add("@Percentage-nvarchar(100)", Percentage.ToString());
                var data = dal.GetData("sp_UpdateBrickdata", _nv);
                if (data.Tables[0].Rows[0]["Message"].ToString() == "Data Updated")
                {
                    returnString = "OK";
                }
                else if (data.Tables[0].Rows[0]["Message"].ToString() == "Not Updated")
                {
                    returnString = "Not Updated";
                }
                else
                {
                    returnString = "error";
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }
            return returnString;
        }

        ////----------------------------------------- GetAll Distributor -----------------------------------------------------------------//

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllDistributor()
    {
        string returnString = "";

        try
        {
            _nv.Clear();
            var data = dal.GetData("sp_getalldistributor_New", null);
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
        public string GetAllDistributorOnSM(string employeeId)
        {
            string returnString = "";

            try
            {
                _nv.Clear();

                _nv.Add("@empid-int", employeeId);
                var data = dal.GetData("get_dist_onsm", _nv);
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
        public string GetSalesBricKById_Dist(int ID)
        {
            string returnString = "";

            try
            {
                _nv.Clear();
                _nv.Add("@ID-int", ID.ToString());
                var data = dal.GetData("sp_SalesBrickSelect_DistId", _nv);
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
        public string InsertSalesData(int FK_ID, int EmployeeID,string BrickID, int PercentageIn)
        {
            string returnString = "";
            try
            {
                _nv.Clear();
                _nv.Add("@EmployeeID-varchar(max)", EmployeeID.ToString());
                _nv.Add("@DistributorID-varchar(max)", FK_ID.ToString());
                var ds = dal.GetData("sp_InsertEmployeeDistRelation_New", _nv);  //AtcoCRM_V2_New.dbo.
                string PKID = ds.Tables[0].Rows[0]["PK_ID"].ToString();


                _nv.Clear();
                _nv.Add("@FK_ID-int", PKID.ToString());
                _nv.Add("@EmployeeID-int", EmployeeID.ToString());
                _nv.Add("@BrickID-nvarchar(max)", BrickID);
                _nv.Add("@Percentage-int", PercentageIn.ToString());
                var data = dal.GetData("sp_InsertEmployeeBrickRelation_New", _nv);
                if (data.Tables[0].Rows[0]["Message"].ToString() == "DataSuccessfullyInserted")
                {
                    returnString = "DataSuccessfullyInserted";
                }
                else if (data.Tables[0].Rows[0]["Message"].ToString() == "Brick Already Assign")
                {
                    returnString = "Brick Already Assign";
                }
                else if (data.Tables[0].Rows[0]["Message"].ToString() == "Brick you trying to Assign is more than 100 per")
                {
                    returnString = "Brick you trying to Assign is more than 100 per";
                }


                


                else
                {
                    returnString = "error";
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
