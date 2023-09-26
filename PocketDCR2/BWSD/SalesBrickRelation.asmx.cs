using DatabaseLayer.SQL;
using PocketDCR2.Classes;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for SalesBrickRelation
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class SalesBrickRelation : System.Web.Services.WebService
    {

        JavaScriptSerializer _jss = new JavaScriptSerializer();
        NameValueCollection _nv = new NameValueCollection();
        DAL dal = new DAL();


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string listGetSalesBricks(string distributorCode)
        {
            string result = "";
            //var Date = Convert.ToDateTime(docdate);
            //var Spoid = spoid.Split('-')[0].ToString();

            try
            {
                _nv.Clear();
                _nv.Add("@distributorCode-INT", distributorCode.ToString());
                var data = dal.GetData("sp_GetAllSalesBricksbyDistributor", _nv);

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
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string listGetEmpSalesBricks(string empID)
        {
            string result = "";
            //var Date = Convert.ToDateTime(docdate);
            //var Spoid = spoid.Split('-')[0].ToString();

            try
            {
                _nv.Clear();
                _nv.Add("@empID-int", empID.ToString());
                var data = dal.GetData("sp_GetAllDistSalesBricks", _nv);

                if (data.Tables[0].Rows.Count > 0)
                    return data.Tables[0].ToJsonString();
                
                else
                    result = "No";
                

            }
            catch (Exception ex)
            {

                result = ex.Message;
            }

            return result;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetDoctorsBrick(string Level6ID)
        {
            string result = string.Empty;
            try
            {

                _nv.Clear();
                _nv.Add("@Level6ID-int", Level6ID.ToString());
                var data = dal.GetData("sp_GetAllDoctorsBricksbyLevel6ID", _nv);


                if (data.Tables[0].Rows.Count > 0)
                {
                    return data.Tables[0].ToJsonString();
                }
                else
                {
                    result = "No";
                }

            }
            catch (NullReferenceException ex)
            {
                result = ex.Message;
            }

            return result;

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertRelationalSalesBrick(string SalesDistributorID, string SalesBricksID)
        {

            string result = string.Empty;
            var SalesBricksIDSplit = SalesBricksID.Split(',');
            for (int i = 0; i < SalesBricksIDSplit.Length; i++)
            {
                try
                {
                    _nv.Clear();
                    _nv.Add("@distid-int", SalesDistributorID.ToString());
                    _nv.Add("@brickId-int", SalesBricksIDSplit[i].ToString());
                    var data = dal.GetData("sp_Get_Relational_Bricks", _nv);
                    if (data.Tables[0].Rows.Count > 0)
                    {
                        return "Exist";
                    }
                    else
                    {
                        _nv.Clear();
                        _nv.Add("@distid-int", SalesDistributorID.ToString());
                        _nv.Add("@brickId-int", SalesBricksIDSplit[i].ToString());
                        var data1 = dal.InserData("sp_Insert_Bricks_relation", _nv);
                        if (data1 != true)
                        {
                            return "Exist";
                        }
                    }

                }
                catch (NullReferenceException ex)
                {
                    result = ex.Message;
                }
            }
            result = "OK";
            //SalesBricksID += ",";
            //try
            //    {
            //        _nv.Clear();
            //        _nv.Add("@empID-INT", SalesBricksID.ToString());
            //        _nv.Add("@SalesBricksID-VARCHAR", SalesBricksID.ToString());
            //        var data = dal.GetData("sp_InsertRelationalSalesBrick", _nv);
            //        if (data.Tables[0].Rows.Count > 0)
            //        {
            //            if (!data.Tables[0].Columns.Contains("Result"))
            //                return data.Tables[0].ToJsonString();

            //            return "NO";//data.Tables[0].Rows[0]["Result"].ToString();
            //        }

            //    }
            //    catch (Exception ex)
            //    {
            //        result = ex.Message;
            //    }
            
            //result = "NO";
            return result;

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DeleteRelationalSalesBrick(string SalesDistributorID, string SalesBricksID)
        {
            string result = string.Empty;
            
                try
                {
                    _nv.Clear();
                    _nv.Add("@SalesDistributorID-INT", SalesDistributorID.ToString());
                    _nv.Add("@SalesBricksID-INT", SalesBricksID.ToString());
                    var data = dal.GetData("sp_Delete_brick_relation", _nv);
                    if (data.Tables[0].Rows.Count > 0)
                    {
                        return data.Tables[0].ToJsonString();
                    }

                }
                catch (Exception ex)
                {

                    result = ex.Message;
                }

            
            result = "NO";
            return result;
        }

        //sp_GetDistributor
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetSalesDistributor(string CityID)
        {
            string result = string.Empty;

            //var empid = Session["CurrentUserId"].ToString();
            _nv.Clear();
            _nv.Add("@ID-int", CityID.ToString().Trim());
            var data = dal.GetData("sp_GetDistributor", _nv);
            return data.Tables[0].ToJsonString();
            //result = "OK";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetSalesBricks(string cityid)
        {
            string result = string.Empty;

            //var empid = Session["CurrentUserId"].ToString();
            _nv.Clear();
            _nv.Add("@ID-int", cityid.ToString());
            var data = dal.GetData("sp_GetAllSalesBricks", _nv);
            return data.Tables[0].ToJsonString();
            //result = "OK";
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetTeams()
        {
            string result = string.Empty;

            var empid = Session["CurrentUserId"].ToString();
            _nv.Clear();
            _nv.Add("@TeamID-int", "NULL");
            _nv.Add("@EmpId-int", "0");
            var data = dal.GetData("sp_TeamsSelectActive", _nv);
            if (data.Tables[0].Rows.Count > 0)
            {
                return data.Tables[0].ToJsonString();
            }
            else
            {
                result = "No";
            }
            return result;
            //result = "OK";

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetEmployeeslevel6(string TeamID)
        {
            string result = string.Empty;

            _nv.Clear();
            _nv.Add("@TeamID-int", TeamID.ToString());
            var data = dal.GetData("sp_SelectEmployeesforlevel6forSales", _nv);
            if (data.Tables[0].Rows.Count > 0)
            {
                return data.Tables[0].ToJsonString();
            }
            else
            {
                result = "No";
            }
            return result;
            //result = "OK";

        }

    }
}
