using System;
using System.Linq;
using System.Web.Script.Services;
using System.Web.Services;
using DatabaseLayer.SQL;
using System.Web.Script.Serialization;
using PocketDCR2.Classes;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for PromoItemsService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class PromoItemsService : System.Web.Services.WebService
    {
        #region Public Member

        DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        JavaScriptSerializer _jss = new JavaScriptSerializer();

        #endregion

        #region Public Functions

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertPromoItem(string code, string name, bool isActive)
        {
            string returnString = "";

            try
            {
                #region Validate Code

                var isValidateCode = _dataContext.sp_PromoItemsSelectByCode(code).ToList();

                #endregion

                if (isValidateCode.Count != 0)
                {
                    returnString = "Duplicate Code!";
                }
                else
                {
                    var insertPromoItem = _dataContext.sp_PromoItemsInsert(code, name, DateTime.Now, DateTime.Now, isActive).ToList();
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
        public string GetPromoItem(long promoItemId)
        {
            string returnString = "";

            try
            {
                var getPromoItem =
                    _dataContext.sp_PromoItemsSelect(promoItemId).Select(
                    p =>
                        new DatabaseLayer.SQL.PromoItem() 
                        {
                            PromoCode = p.PromoCode,
                            PromoName = p.PromoName,
                            IsActive = p.IsActive
                        }).ToList();
                returnString = _jss.Serialize(getPromoItem);
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdatePromoItem(long promoItemId, string code, string name, bool isActive)
        {
            string returnString = "";

            try
            {
                #region Validate Code

                var isValidateCode = _dataContext.sp_PromoItemsSelectByCode(code).ToList();

                #endregion

                if (isValidateCode.Count != 0 && Convert.ToInt64(isValidateCode[0].PromoId) != promoItemId)
                {
                    returnString = "Duplicate Code!";
                }
                else
                {
                    var updatePromoItem = _dataContext.sp_PromoItemsUpdate(promoItemId, code, name, DateTime.Now, DateTime.Now, isActive).ToList();
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
        public string DeletePromoItem(int promoItemId)
        {
            string returnString = "";

            try
            {
                _dataContext.sp_PromoItemsDelete(promoItemId);
                returnString = "OK";
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
