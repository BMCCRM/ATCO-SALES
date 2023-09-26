using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web.Script.Serialization;
using System.Web.Services;
using DatabaseLayer.SQL;
using PocketDCR2.Classes;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for MRProducts1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class MrProducts1 : System.Web.Services.WebService
    {
        readonly DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        
        DAL _dl = new DAL();

        [WebMethod]
        public List<v_EmployeeType6> ListofMedRepsType6S()
        {
            return _dataContext.v_EmployeeType6s.ToList();
        }

        [WebMethod]
        public string ListofProductSkus()
        {
            string returnString;
            var jss = new JavaScriptSerializer();
            try
            {
                var getProductSku =
                    _dataContext.sp_ProductSkuSelect0(null, null, null).Select(
                        p =>
                            new DatabaseLayer.SQL.ProductSku
                            {
                                SkuId = p.SkuId,
                                ProductId = p.ProductId,
                                PackSizeid = p.PackSizeid,
                                StrengthId = p.StrengthId,
                                FormId = p.FormId,
                                SkuCode = p.SkuCode,
                                SkuName = p.SkuName,
                                IsActive = p.IsActive,
                                DistributorPrice = p.DistributorPrice,
                                TradePrice = p.TradePrice,
                                RetailPrice = p.RetailPrice
                            }).ToList();
                returnString = jss.Serialize(getProductSku);
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;

        }

        [WebMethod]
        public string DeleteAllProductsofMedRep(string medRepId)
        {
            var returnvalue = _dl.InserData("productsofMRs_Delete_AllMIORecord", new NameValueCollection { { "@EmployeeID-INT", medRepId } });
            var retrn = returnvalue ? "Success" : "Failed";
            return retrn;
        }

        [WebMethod]
        public string InsertAllProductsofMedRep(string medRepId, string productId)
        {
            var retrn = "Failed";
            if (productId == "") return retrn;
            var returnvalue = true;
            var products = productId.Split(';');
            foreach (var product in products)
            {
                returnvalue = _dl.InserData("productsofMRs_Insert_MIOProducts", new NameValueCollection { { "@EmployeeID-INT", medRepId }, { "@ProductID-INT", product } });
            }
            retrn = returnvalue ? "Success" : "Failed";


            return retrn;
        }

        [WebMethod]
        public string GetAllProductsofMedRep(string medRepId)
        {
            return medRepId != "null" ? _dl.GetData("productsofMRs_Select_MIOProducts", new NameValueCollection { { "@EmployeeID-INT", medRepId } }).Tables[0].ToJsonString() : "";
        }
    }
}
