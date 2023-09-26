using System;
using System.Linq;
using System.Web.Script.Services;
using System.Web.Services;
using DatabaseLayer.SQL;
using System.Web.Script.Serialization;
using PocketDCR2.Classes;
using System.Data.SqlClient;
using System.Collections.Specialized;
using System.Data;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for Products1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class ProductsServices : System.Web.Services.WebService
    {
        #region Public Member

        DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        JavaScriptSerializer _jss = new JavaScriptSerializer();
        DAL dal = new DAL();
        NameValueCollection nv = new NameValueCollection();

        #endregion

        #region Public Functions

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertProduct(string productName, bool isActive)
        {
            string returnString = "";
            //,SingleTeamId = "";
            var insertProduct = new DataSet();
            int DuplicateProductCount = 0, NewInsertProductCount = 0;
            try
            {
                #region Validate Name

                //var isValidateName = _dataContext.sp_ProductsSelect(null, productName.Trim()).ToList();
                //for (int a = 0; a < teamId.Split(',').Length; a++)
                //{
                //    SingleTeamId = teamId.Split(',')[a];

                //    nv.Clear();
                //    nv.Add("@ProductName-bigint", productName);
                //    nv.Add("@TeamID-bigint", SingleTeamId.ToString());
                //    var isValidateName = dal.GetData("sp_CheckProductExist", nv);
                //#endregion
                //if (isValidateName.Tables[0].Rows.Count != 0)
                //{
                //    returnString = "Duplicate Name!";
                //    DuplicateProductCount++;
                //}                


                //else
                //{
                //        nv.Clear();
                //        nv.Add("@ProductName-bigint", productName);
                //        nv.Add("@TeamID-bigint", SingleTeamId);
                //        nv.Add("@IsActive-bigint", isActive.ToString());
                //        insertProduct = dal.GetData("sp_ProductsInsertWithTeam", nv);
                //    if (insertProduct.Tables[0].Rows.Count > 0)
                //    {
                //        returnString = "OK";
                //        NewInsertProductCount++;
                //    }
                //    else
                //        returnString = "error";
                //    }
                //    //var insertProduct = _dataContext.sp_ProductsInsert(productName.Trim(), isActive).ToList();

                //}

                nv.Clear();
                nv.Add("@ProductName-bigint", productName);
                var isValidateName = dal.GetData("sp_CheckProductExist_NEW", nv);
                #endregion
                if (isValidateName.Tables[0].Rows.Count != 0)
                {
                    returnString = "Duplicate Name!";
                    DuplicateProductCount++;
                }
                else
                {
                    nv.Clear();
                    nv.Add("@ProductName-bigint", productName);
                    nv.Add("@IsActive-bigint", isActive.ToString());
                    insertProduct = dal.GetData("sp_ProductsInsert_New", nv);
                    if (insertProduct.Tables[0].Rows.Count > 0)
                    {
                        returnString = "OK";
                        NewInsertProductCount++;
                    }
                    else
                        returnString = "error";
                }
                //var insertProduct = _dataContext.sp_ProductsInsert(productName.Trim(), isActive).ToList();

            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetProduct(int productId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@ProductId-bigint", productId.ToString());
                //nv.Add("@TeamId-bigint", TeamId.ToString());
                var getProducts = dal.GetData("sp_GetProduct", nv);
                if (getProducts != null)
                {
                    if (getProducts.Tables[0].Rows.Count > 0)
                    {
                        returnString = getProducts.Tables[0].ToJsonString();
                    }
                }

                //var getProducts = _dataContext.sp_ProductsSelect(productId, null).Select(
                //    p =>
                //        new DatabaseLayer.SQL.Product()
                //        {
                //            ProductId = p.ProductId,
                //            ProductName = p.ProductName,
                //            IsActive = p.IsActive
                //        }).ToList();
                //returnString = _jss.Serialize(getProducts);
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetProductWithoutId()
        {
            string returnString = "";

            try
            {
                nv.Clear();
                var getProducts = dal.GetData("sp_GetProductWithoutID", nv);
                if (getProducts != null)
                {
                    if (getProducts.Tables[0].Rows.Count > 0)
                    {
                        returnString = getProducts.Tables[0].ToJsonString();
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
        //public string GetProduct(int productId)
        //{
        //    string returnString = "";

        //    try
        //    {
        //        var getProducts = _dataContext.sp_ProductsSelect(productId, null).Select(
        //            p =>
        //                new DatabaseLayer.SQL.Product()
        //                {
        //                    ProductId = p.ProductId,
        //                    ProductName = p.ProductName,
        //                    IsActive = p.IsActive,
        //                    Level3ID = p.Level3ID
        //                }).ToList();
        //        returnString = _jss.Serialize(getProducts);
        //    }
        //    catch (Exception exception)
        //    {
        //        returnString = exception.Message;
        //    }

        //    return returnString;
        //}
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetTeam()
        {
            string returnString = "";

            try
            {
                var team_ds = dal.GetData("sp_GetTeam", null);
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
        public string UpdateProduct(int productId, string productName, bool isActive)
        {
            string returnString = "";
            var updateProduct = new DataSet();
            try
            {
                //for (int a = 0; a < teamId.Split(',').Length; a++)
                //{
                //    SingleTeamId = teamId.Split(',')[a].ToString();
                //    nv.Clear();
                //    nv.Add("@ProductId-bigint", productId.ToString());
                //    nv.Add("@ProductName-varchar(200)", productName);
                //    //nv.Add("@TeamID-bigint", SingleTeamId);
                //    nv.Add("@IsActive-bit", isActive.ToString());
                //    //nv.Add("@IsActiveTeam-bit", isActiveTeam.ToString());
                //    //nv.Add("@DeleteAllTeamRelation-bigint", "1");
                //    updateProduct = dal.GetData("sp_ProductsUpdate_New", nv);

                //    if (updateProduct.Tables[0].Rows.Count > 0)
                //    {
                //        returnString = "OK";
                //    }
                //}

                nv.Clear();
                nv.Add("@ProductId-bigint", productId.ToString());
                nv.Add("@ProductName-varchar(200)", productName);
                nv.Add("@IsActive-bit", isActive.ToString());
                updateProduct = dal.GetData("sp_ProductsUpdate_New", nv);

                if (updateProduct.Tables[0].Rows[0][0].ToString() == "OK")
                {
                    returnString = "OK";
                }
                else
                {
                    returnString = "Duplicate Name!";
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
        public string DeleteProduct(int productId)
        {
            string returnString = "";

            try
            {
                //_dataContext.sp_ProductsDelete(productId);
                //returnString = "OK";
                nv.Clear();
                nv.Add("@ProductId-bigint", productId.ToString());
                var updateProduct = dal.GetData("sp_ProductsUpdate", nv);

                if (updateProduct.Tables[0].Rows.Count > 0)
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
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetTeamDatawithGroupId()
        {
            string returnString = "";

            try
            {
                //nv.Clear();
                //nv.Add("@TeamId-bigint", TeamID.ToString());
                //var team_ds = dl.GetData("sp_GetTeamWithTeamId", nv);
                var team_ds = dal.GetData("sp_GetTeamWithTeamId", null);
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

        #endregion
    }
}