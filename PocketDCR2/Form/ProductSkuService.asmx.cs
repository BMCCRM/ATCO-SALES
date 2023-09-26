using System;
using System.Linq;
using System.Web.Script.Services;
using System.Web.Services;
using DatabaseLayer.SQL;
using System.Web.Script.Serialization;
using PocketDCR2.Classes;
using System.Data.SqlClient;
using System.Collections.Specialized;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for ProductSkuService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class ProductSkuService : System.Web.Services.WebService
    {
        #region Public Member

        DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        JavaScriptSerializer _jss = new JavaScriptSerializer();
        NameValueCollection nv = new NameValueCollection();
        DAL dl = new DAL();

        #endregion

        #region Public Functions

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertProductSku(int productId, int packsizeId, int strengthId, int formId,
            string skuCode, string skuName, bool isActive, decimal distributorPrice, decimal tradePrice, decimal retailPrice)
        {
            string returnString = "";

            try
            {
                #region Validate Code

                var isValidateCode = _dataContext.sp_ProductSkuSelect0(null, skuCode.Trim(), null).ToList();
                var isValidateName = _dataContext.sp_ProductSkuSelect0(null, null, skuName.Trim()).ToList();

                #endregion

                if (isValidateCode.Count != 0)
                {
                    returnString = "Duplicate Code!";
                }
                else if (isValidateName.Count != 0)
                {
                    returnString = "Duplicate Name!";
                }
                else
                {
                    var insertProductSKU = _dataContext.sp_ProductSkuInsert(productId, packsizeId, strengthId, formId, skuCode, skuName.Trim(),
                        isActive, distributorPrice, tradePrice, retailPrice, DateTime.Now, DateTime.Now).ToList();
                    returnString = "OK";
                }
            }
            catch (Exception exception)
            {

                returnString = exception.Message;
            }

            return returnString;
        }



        //------------------------------------ Insert -----------------------------------------------------------//


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertProductSkuwithTeamRelation(int productId, int packsizeId, int strengthId, int formId,
            string skuCode, string skuName, bool isActive, decimal distributorPrice, decimal tradePrice, decimal retailPrice, string teamIDs, int TypeId, decimal InstitutionPrice, decimal IncentiveAmount, DateTime IncentiveFrom, DateTime IncentiveTo)
        {
            string returnString = "";


            DbTransaction insertTransaction = null;
            try
            {
                _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                _dataContext.Connection.Open();
                insertTransaction = _dataContext.Connection.BeginTransaction();
                _dataContext.Transaction = insertTransaction;


                #region Validate Code

                var isValidateCode = _dataContext.sp_ProductSkuSelect0(null, skuCode.Trim(), null).ToList();
                var isValidateName = _dataContext.sp_ProductSkuSelect0(null, null, skuName.Trim()).ToList();

                #endregion

                if (isValidateCode.Count != 0)
                {
                    returnString = "Duplicate Code!";
                }
                else if (isValidateName.Count != 0)
                {
                    returnString = "Duplicate Name!";
                }
                else
                {

                    


                    var insertProductSKU = _dataContext.sp_ProductSkuInsertwithTeamRelation(productId, packsizeId, strengthId, formId, skuCode, skuName.Trim(),
                        isActive, distributorPrice, tradePrice, retailPrice, DateTime.Now, DateTime.Now, teamIDs, TypeId, InstitutionPrice, IncentiveAmount).ToList(); //, IncentiveFrom, IncentiveTo

                    var insertProductSKU_child = _dataContext.sp_ProductSkuInsertwithTeamRelation_Child(productId, packsizeId, strengthId, formId, skuCode, skuName.Trim(),
                      isActive, distributorPrice, tradePrice, retailPrice, DateTime.Now, DateTime.Now, teamIDs, TypeId, InstitutionPrice, IncentiveAmount, null, null).ToList();


                    returnString = "OK";
                    insertTransaction.Commit();

                }
            }
            catch (Exception exception)
            {

                returnString = exception.Message;
                if (insertTransaction != null) insertTransaction.Rollback();
            }
            finally
            {
                if (_dataContext.Connection.State == ConnectionState.Open)
                {
                    _dataContext.Connection.Close();
                }
            }


            return returnString;
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetProductSku(int skuId)
        {
            string returnString = "";

            try
            {
                //nv.Clear();
                nv.Add("@SkuId-int", skuId.ToString());
                nv.Add("@SKUCode-int", "NULL");
                nv.Add("@SkuName-int", "NULL");
                var team_ds = dl.GetData("sp_ProductSkuSelect0", nv);
                if (team_ds != null)
                {
                    if (team_ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = team_ds.Tables[0].ToJsonString();
                    }
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
        public string GetProductSkuwithTeam(int skuId)
        {
            string returnString = "";

            try
            {
                //nv.Clear();
                nv.Add("@SkuId-int", skuId.ToString());
                nv.Add("@SKUCode-nvarchar(20)", "NULL");
                nv.Add("@SkuName-nvarchar(100)", "NULL");
                var team_ds = dl.GetData("sp_ProductSkuSelectwithTeam_Child", nv);
                if (team_ds != null)
                {
                    if (team_ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = team_ds.Tables[0].ToJsonString();
                    }
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        //[WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public string GetProductSku(int skuId) 
        //{
        //    string returnString = "";

        //    try
        //    {
        //        var getProductSKU =
        //            _dataContext.sp_ProductSkuSelect0(skuId, null, null).Select(
        //                p =>
        //                    new DatabaseLayer.SQL.ProductSku
        //                    {
        //                        SkuId = p.SkuId,
        //                        ProductId = p.ProductId,
        //                        PackSizeid = p.PackSizeid,
        //                        StrengthId = p.StrengthId,
        //                        FormId = p.FormId,
        //                        SkuCode = p.SkuCode,
        //                        SkuName = p.SkuName,
        //                        IsActive = p.IsActive,
        //                        DistributorPrice = p.DistributorPrice,
        //                        TradePrice = p.TradePrice,
        //                        RetailPrice = p.RetailPrice                                
        //                    }).ToList();
        //        returnString = _jss.Serialize(getProductSKU);
        //    }
        //    catch (Exception exception)
        //    {
        //        returnString = exception.Message;
        //    }

        //    return returnString;
        //}




        //--------------------------------------------------For Duplicate---------------------------------------------------------------------------//
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateProductSku(int skuId, int productId, int packsizeId, int strengthId, int formId,
            string skuCode, string skuName, bool isActive, decimal distributorPrice, decimal tradePrice, decimal retailPrice)
        {
            string returnString = "";

            try
            {
                #region Validate Code + Name

                var isValidateCode = _dataContext.sp_ProductSkuSelect0(null, skuCode.Trim(), null).ToList();
                var isValidateName = _dataContext.sp_ProductSkuSelect0(null, null, skuName.Trim()).ToList();

                #endregion

                if (isValidateCode.Count != 0 && Convert.ToInt32(isValidateCode[0].SkuId) != skuId)
                {
                    returnString = "Duplicate Code!";
                }
                else if (isValidateName.Count != 0 && Convert.ToInt32(isValidateName[0].SkuId) != skuId)
                {
                    returnString = "Duplicate Name!";
                }
                else
                {
                    var updateProductSKU = _dataContext.sp_ProductSkuUpdate(skuId, productId, packsizeId, strengthId, formId, skuCode, skuName.Trim(),
                        isActive, distributorPrice, tradePrice, retailPrice, DateTime.Now, DateTime.Now).ToList();
                    returnString = "OK";
                }
            }
            catch (Exception exception)
            {

                returnString = exception.Message;
            }

            return returnString;
        }




        //--------------------------------------------------For Update---------------------------------------------------------------------------//


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateProductSkuwithTeamRelation(int skuId, int productId, int packsizeId, int strengthId, int formId,
            string skuCode, string skuName, bool isActive, decimal distributorPrice, decimal tradePrice, decimal retailPrice, string teamIDs, int TypeId, decimal InstitutionPrice, decimal IncentiveAmount, DateTime IncentiveFrom, DateTime IncentiveTo,string checkk )
        {
            string returnString = "";


            if(checkk  == "true")
            {
                #region Update Childtable

                DateTime todaydate = DateTime.Now;
                DateTime today = todaydate.Date;


                int fromyear = IncentiveFrom.Year;
                int toyear = IncentiveTo.Year;

                int frommonth = IncentiveFrom.Month;
                int tomonth = IncentiveTo.Month;
                int todaymonth = today.Month;
                int todayyear = today.Year;


                string IncenTo = IncentiveTo.ToString("yyyy-MM-dd");
                string IncenFrom = IncentiveFrom.ToString("yyyy-MM-dd");




                if (IncentiveTo > IncentiveFrom)
                {


                    if (todaymonth > frommonth && todayyear >= fromyear)
                    {

                        if (frommonth == tomonth)
                        {
                            var updateProductSKU = _dataContext.sp_ProductSkuUpdatewithTeamRelation_Child(skuId, productId, packsizeId, strengthId, formId, skuCode, skuName.Trim(),
                                isActive, distributorPrice, tradePrice, retailPrice, DateTime.Now, DateTime.Now, teamIDs, TypeId, InstitutionPrice, IncentiveAmount, IncentiveFrom, IncentiveTo).ToList();
                            
                            
                            returnString = "OK";

                        }
                        else if ((todaymonth - tomonth) == 1) // validating so user can update recent month policy only otherwise user can update any policy which comes before current month
                        {
                            var updateProductSKU = _dataContext.sp_ProductSkuUpdatewithTeamRelation_Child(skuId, productId, packsizeId, strengthId, formId, skuCode, skuName.Trim(),
                                 isActive, distributorPrice, tradePrice, retailPrice, DateTime.Now, DateTime.Now, teamIDs, TypeId, InstitutionPrice, IncentiveAmount, IncentiveFrom, IncentiveTo).ToList();
                            returnString = "OK";
                        }
                        else
                        {
                            returnString = "Month Passed";

                        }



                    }
                    else
                    {
                        DataSet ds = GetIncentivePeriod(productId.ToString(), skuCode, IncenFrom, IncenTo);


                        if (ds.Tables[0].Rows[0][0].ToString() == "UPDATE")
                        {
                            if (ds.Tables[1].Rows[0][0].ToString() == "ENTER")
                            {
                                var updateProductSKU = _dataContext.sp_ProductSkuUpdatewithTeamRelation_Child(skuId, productId, packsizeId, strengthId, formId, skuCode, skuName.Trim(),
                                     isActive, distributorPrice, tradePrice, retailPrice, DateTime.Now, DateTime.Now, teamIDs, TypeId, InstitutionPrice, IncentiveAmount, IncentiveFrom, IncentiveTo).ToList();
                                returnString = "OK";

                            }

                            else
                            {
                                returnString = "NotAllowed";
                            }
                        }
                        else
                        {
                            if (ds.Tables[1].Rows[0][0].ToString() == "ENTER")
                            {



                                var insertProductSKU = _dataContext.sp_ProductSkuInsertwithTeamRelation_Child(productId, packsizeId, strengthId, formId, skuCode, skuName.Trim(),
                                       isActive, distributorPrice, tradePrice, retailPrice, DateTime.Now, DateTime.Now, teamIDs, TypeId, InstitutionPrice, IncentiveAmount, IncentiveFrom, IncentiveTo).ToList();


                                //DateTime date = DateTime.Now;

                                //int year = date.Year;

                                //int insertyear = year - 1;

                                //string IncentiveeeFrom = insertyear.ToString() + "/01/01";
                                //string Incentiveeeto = insertyear.ToString() + "/12/31";

                                //DateTime newfrom = Convert.ToDateTime(IncentiveeeFrom);
                                //DateTime newto = Convert.ToDateTime(IncentiveeeFrom);

                                //var updateProductSKU = _dataContext.sp_ProductSkuUpdatewithTeamRelation_periodonly(skuId, productId, packsizeId, strengthId, formId, skuCode, skuName.Trim(),
                                //        isActive, distributorPrice, tradePrice, retailPrice, DateTime.Now, DateTime.Now, teamIDs, TypeId, InstitutionPrice, IncentiveAmount, newfrom, newto).ToList();


                                returnString = "OK";

                            }

                            else
                            {
                                returnString = "NotAllowed";
                            }


                        }

                    }

                }

                else
                {
                    returnString = "LessDate";
                }

                #endregion
            }
            else
            {
                var updateProductSKU = _dataContext.sp_ProductSkuUpdatewithTeamRelation(skuId, productId, packsizeId, strengthId, formId, skuCode, skuName.Trim(),
                                    isActive, distributorPrice, tradePrice, retailPrice, DateTime.Now, DateTime.Now, teamIDs, TypeId, InstitutionPrice, IncentiveAmount).ToList();
                
                returnString = "OK";
            }





            #region oldwork

            //    if (todayyear > fromyear && todayyear >= toyear)   //check for previous years so that proper validation are applied before updating
            //{
            //    if (IncentiveTo > IncentiveFrom)
            //    {
            //        // IncentiveFrom is greater than IncentiveTo
            //        // Perform your desired action or validation here

            //        try
            //        {

            //                DataSet ds = GetIncentivePeriod(productId.ToString(), skuCode, IncenFrom, IncenTo);


            //                if (ds.Tables[0].Rows[0][0].ToString() == "UPDATE")
            //                {
            //                    if (ds.Tables[1].Rows[0][0].ToString() == "ENTER")
            //                    {
            //                        var updateProductSKU = _dataContext.sp_ProductSkuUpdatewithTeamRelation(skuId, productId, packsizeId, strengthId, formId, skuCode, skuName.Trim(),
            //                             isActive, distributorPrice, tradePrice, retailPrice, DateTime.Now, DateTime.Now, teamIDs, TypeId, InstitutionPrice, IncentiveAmount, IncentiveFrom, IncentiveTo).ToList();
            //                        returnString = "OK";

            //                    }

            //                    else
            //                    {
            //                        returnString = "NotAllowed";
            //                    }
            //                }
            //                else
            //                {
            //                    if (ds.Tables[1].Rows[0][0].ToString() == "ENTER")
            //                    {



            //                        var insertProductSKU = _dataContext.sp_ProductSkuInsertwithTeamRelation(productId, packsizeId, strengthId, formId, skuCode, skuName.Trim(),
            //                               isActive, distributorPrice, tradePrice, retailPrice, DateTime.Now, DateTime.Now, teamIDs, TypeId, InstitutionPrice, IncentiveAmount, IncentiveFrom, IncentiveTo).ToList();


            //                    DateTime date = DateTime.Now;

            //                    int year = date.Year;

            //                    int insertyear = year - 1;

            //                    string IncentiveeeFrom = insertyear.ToString() + "/01/01";
            //                    string Incentiveeeto = insertyear.ToString() + "/12/31";

            //                    DateTime newfrom = Convert.ToDateTime(IncentiveeeFrom);
            //                    DateTime newto = Convert.ToDateTime(IncentiveeeFrom);

            //                    var updateProductSKU = _dataContext.sp_ProductSkuUpdatewithTeamRelation_periodonly(skuId, productId, packsizeId, strengthId, formId, skuCode, skuName.Trim(),
            //                            isActive, distributorPrice, tradePrice, retailPrice, DateTime.Now, DateTime.Now, teamIDs, TypeId, InstitutionPrice, IncentiveAmount, newfrom, newto).ToList();


            //                    returnString = "OK";

            //                    }

            //                    else
            //                    {
            //                        returnString = "NotAllowed";
            //                    }


            //                }

            //            }

            //            //Getting Incentive Period from SP



            //        catch (Exception exception)
            //        {

            //            returnString = exception.Message;
            //        }

            //    }
            //    else
            //    {
            //        // IncentiveFrom is not greater than IncentiveTo
            //        // Handle the validation failure or error condition here


            //        returnString = "LessDate";
            //    }


            //}
            //else
            //{
            //    if (todaymonth > frommonth)   //If policy startingmonth is past current month
            //    {

            //        if (tomonth > todaymonth)  //check if user isnt trying to end the policy of with same frommonth then do not let the user perform anything
            //        {

            //            returnString = "Month Passed";

            //        }
            //        else
            //        {
            //            if (IncentiveTo > IncentiveFrom) //To date should be greater than from date
            //            {
            //                // IncentiveFrom is greater than IncentiveTo
            //                // Perform your desired action or validation here

            //                try
            //                {

            //                    if (frommonth == tomonth || tomonth < todaymonth)  //If user trying to end policy with same start month or month less than current month then update without any validation
            //                    {
            //                        if(frommonth == tomonth){
            //                            var updateProductSKU = _dataContext.sp_ProductSkuUpdatewithTeamRelation(skuId, productId, packsizeId, strengthId, formId, skuCode, skuName.Trim(),
            //                                isActive, distributorPrice, tradePrice, retailPrice, DateTime.Now, DateTime.Now, teamIDs, TypeId, InstitutionPrice, IncentiveAmount, IncentiveFrom, IncentiveTo).ToList();
            //                            returnString = "OK";

            //                        }
            //                        else if ((todaymonth - tomonth) == 1) // validating so user can update recent month policy only otherwise user can update any policy which comes before current month
            //                        {
            //                            var updateProductSKU = _dataContext.sp_ProductSkuUpdatewithTeamRelation(skuId, productId, packsizeId, strengthId, formId, skuCode, skuName.Trim(),
            //                                 isActive, distributorPrice, tradePrice, retailPrice, DateTime.Now, DateTime.Now, teamIDs, TypeId, InstitutionPrice, IncentiveAmount, IncentiveFrom, IncentiveTo).ToList();
            //                            returnString = "OK";
            //                        }
            //                        else
            //                        {
            //                            returnString = "Month Passed";

            //                        }


            //                    }
            //                    else
            //                    {
            //                        DataSet ds = GetIncentivePeriod(productId.ToString(), skuCode, IncenFrom, IncenTo);


            //                        if (ds.Tables[0].Rows[0][0].ToString() == "UPDATE")
            //                        {
            //                            if (ds.Tables[1].Rows[0][0].ToString() == "ENTER")
            //                            {
            //                                var updateProductSKU = _dataContext.sp_ProductSkuUpdatewithTeamRelation(skuId, productId, packsizeId, strengthId, formId, skuCode, skuName.Trim(),
            //                                     isActive, distributorPrice, tradePrice, retailPrice, DateTime.Now, DateTime.Now, teamIDs, TypeId, InstitutionPrice, IncentiveAmount, IncentiveFrom, IncentiveTo).ToList();
            //                                returnString = "OK";

            //                            }

            //                            else
            //                            {
            //                                returnString = "NotAllowed";
            //                            }
            //                        }
            //                        else
            //                        {
            //                            if (ds.Tables[1].Rows[0][0].ToString() == "ENTER")
            //                            {



            //                                var insertProductSKU = _dataContext.sp_ProductSkuInsertwithTeamRelation(productId, packsizeId, strengthId, formId, skuCode, skuName.Trim(),
            //                                       isActive, distributorPrice, tradePrice, retailPrice, DateTime.Now, DateTime.Now, teamIDs, TypeId, InstitutionPrice, IncentiveAmount, IncentiveFrom, IncentiveTo).ToList();


            //                                DateTime date = DateTime.Now;

            //                                int year = date.Year;

            //                                int insertyear = year - 1;

            //                                string IncentiveeeFrom = insertyear.ToString() + "/01/01";
            //                                string Incentiveeeto = insertyear.ToString() + "/12/31";

            //                                DateTime newfrom = Convert.ToDateTime(IncentiveeeFrom);
            //                                DateTime newto = Convert.ToDateTime(IncentiveeeFrom);

            //                                var updateProductSKU = _dataContext.sp_ProductSkuUpdatewithTeamRelation_periodonly(skuId, productId, packsizeId, strengthId, formId, skuCode, skuName.Trim(),
            //                                        isActive, distributorPrice, tradePrice, retailPrice, DateTime.Now, DateTime.Now, teamIDs, TypeId, InstitutionPrice, IncentiveAmount, newfrom, newto).ToList();


            //                                returnString = "OK";

            //                            }

            //                            else
            //                            {
            //                                returnString = "NotAllowed";
            //                            }


            //                        }

            //                    }

            //                    //Getting Incentive Period from SP


            //                }
            //                catch (Exception exception)
            //                {

            //                    returnString = exception.Message;
            //                }

            //            }
            //            else
            //            {
            //                // IncentiveFrom is not greater than IncentiveTo
            //                // Handle the validation failure or error condition here


            //                returnString = "LessDate";
            //            }


            //        }

            //    }
            //    else
            //    {
            //        if (IncentiveTo > IncentiveFrom)
            //        {
            //            // IncentiveFrom is greater than IncentiveTo
            //            // Perform your desired action or validation here

            //            try
            //            {

            //                if (frommonth == tomonth)
            //                {
            //                    var updateProductSKU = _dataContext.sp_ProductSkuUpdatewithTeamRelation(skuId, productId, packsizeId, strengthId, formId, skuCode, skuName.Trim(),
            //                             isActive, distributorPrice, tradePrice, retailPrice, DateTime.Now, DateTime.Now, teamIDs, TypeId, InstitutionPrice, IncentiveAmount, IncentiveFrom, IncentiveTo).ToList();
            //                    returnString = "OK";

            //                }
            //                else
            //                {
            //                    DataSet ds = GetIncentivePeriod(productId.ToString(), skuCode, IncenFrom, IncenTo);


            //                    if (ds.Tables[0].Rows[0][0].ToString() == "UPDATE")
            //                    {
            //                        if (ds.Tables[1].Rows[0][0].ToString() == "ENTER")
            //                        {
            //                            var updateProductSKU = _dataContext.sp_ProductSkuUpdatewithTeamRelation(skuId, productId, packsizeId, strengthId, formId, skuCode, skuName.Trim(),
            //                                 isActive, distributorPrice, tradePrice, retailPrice, DateTime.Now, DateTime.Now, teamIDs, TypeId, InstitutionPrice, IncentiveAmount, IncentiveFrom, IncentiveTo).ToList();
            //                            returnString = "OK";

            //                        }

            //                        else
            //                        {
            //                            returnString = "NotAllowed";
            //                        }
            //                    }
            //                    else
            //                    {
            //                        if (ds.Tables[1].Rows[0][0].ToString() == "ENTER")
            //                        {



            //                            var insertProductSKU = _dataContext.sp_ProductSkuInsertwithTeamRelation(productId, packsizeId, strengthId, formId, skuCode, skuName.Trim(),
            //                                   isActive, distributorPrice, tradePrice, retailPrice, DateTime.Now, DateTime.Now, teamIDs, TypeId, InstitutionPrice, IncentiveAmount, IncentiveFrom, IncentiveTo).ToList();


            //                            DateTime date = DateTime.Now;

            //                            int year = date.Year;

            //                            int insertyear = year - 1;

            //                            string IncentiveeeFrom = insertyear.ToString() + "/01/01";
            //                            string Incentiveeeto = insertyear.ToString() + "/12/31";

            //                            DateTime newfrom = Convert.ToDateTime(IncentiveeeFrom);
            //                            DateTime newto = Convert.ToDateTime(IncentiveeeFrom);

            //                            var updateProductSKU = _dataContext.sp_ProductSkuUpdatewithTeamRelation_periodonly(skuId, productId, packsizeId, strengthId, formId, skuCode, skuName.Trim(),
            //                                    isActive, distributorPrice, tradePrice, retailPrice, DateTime.Now, DateTime.Now, teamIDs, TypeId, InstitutionPrice, IncentiveAmount, newfrom, newto).ToList();


            //                            returnString = "OK";




            //                        }

            //                        else
            //                        {
            //                            returnString = "NotAllowed";
            //                        }


            //                    }

            //                }

            //                //Getting Incentive Period from SP


            //            }
            //            catch (Exception exception)
            //            {

            //                returnString = exception.Message;
            //            }

            //        }
            //        else
            //        {
            //            // IncentiveFrom is not greater than IncentiveTo
            //            // Handle the validation failure or error condition here


            //            returnString = "LessDate";
            //        }


            //    }


            //}
            #endregion

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DeleteProductSku(int skuId)
        {
            string returnString = "";

            try
            {
                _dataContext.sp_ProductSkuDelete(skuId);
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

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetProductWithTeamID(string TeamID)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@TeamID-bigint", TeamID.ToString());
                var team_ds = dl.GetData("sp_GetProductWithteamID", nv);
                if (team_ds != null)
                {
                    if (team_ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = team_ds.Tables[0].ToJsonString();
                    }
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
        public string GetTeam()
        {
            string returnString = "";

            try
            {
                var team_ds = dl.GetData("sp_GetTeam", null);
                if (team_ds != null)
                {
                    if (team_ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = team_ds.Tables[0].ToJsonString();
                    }
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
        public string GetProdutcType()
        {
            string returnString = "";

            try
            {
                var team_ds = dl.GetData("sp_GetType", null);
                if (team_ds != null)
                {
                    if (team_ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = team_ds.Tables[0].ToJsonString();
                    }
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
        public DataSet GetIncentivePeriod(string ProductId, string SkuCode, string Incentive_From, string Incentive_To)
        {
            List<object> obj = new List<object>();
            string returnString = "";
            DataSet team_ds = new DataSet();
            try
            {
                nv.Clear();
                nv.Add("ProductId-int", ProductId);
                nv.Add("SkuCode-int", SkuCode);
                nv.Add("Incentive_from-Datetime", Incentive_From);
                nv.Add("Incentive_to-Datetime", Incentive_To);

                team_ds = dl.GetData("GetIncentivePeriod", nv);
                //if (team_ds != null && team_ds.Tables.Count > 0)
                //{
                //    foreach (DataTable table in team_ds.Tables)
                //    {
                //        obj.Add(table);
                //    }
                //}
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return team_ds;
        }














        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetProductByTeam(int TeamID)
        {
            string returnString = "";

            try
            {
                nv.Add("@TeamID-int", TeamID.ToString());
                var team_ds = dl.GetData("SP_GetProductByTeam", nv);
                if (team_ds != null)
                {
                    if (team_ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = team_ds.Tables[0].ToJsonString();
                    }
                }
            }
            catch (SqlException exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }
        #endregion
    }
}
