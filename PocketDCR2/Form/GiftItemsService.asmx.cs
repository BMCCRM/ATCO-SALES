using System;
using System.Linq;
using System.Web.Script.Services;
using System.Web.Services;
using DatabaseLayer.SQL;
using System.Web.Script.Serialization;
using System.ComponentModel;
using PocketDCR2.Classes;
using System.Data.SqlClient;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for GiftItemsService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    [ScriptService]
    public class GiftItemsService : System.Web.Services.WebService
    {
        #region Public Member

        DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        JavaScriptSerializer _jss = new JavaScriptSerializer();

        #endregion

        #region Public Functions

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertGift(string code, string name, bool isActive)
        {
            string returnString = "";

            try
            {
                #region Validate Code + Name

                var isValidateCode = _dataContext.sp_GiftItemsSelect(null, code.Trim(), null).ToList();
                var isValidateName = _dataContext.sp_GiftItemsSelect(null, null, name.Trim()).ToList();

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
                    var insertGift = _dataContext.sp_GiftItemsInsert(code.Trim(), name.Trim(), DateTime.Now, DateTime.Now, isActive).ToList();
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
        public string GetGiftItems(long giftId)
        {
            string returnString = "";

            try
            {
                var getGiftItems = _dataContext.sp_GiftItemsSelect(giftId, null, null).Select(
                    p =>
                        new GiftItem()
                        {
                            GiftCode = p.GiftCode,
                            GiftName = p.GiftName,
                            IsActive = p.IsActive
                        }).ToList();
                returnString = _jss.Serialize(getGiftItems);
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateGift(long giftId, string code, string name, bool isActive)
        {
            string returnString = "";

            try
            {
                #region Validate Code + Name

                var isValidateCode = _dataContext.sp_GiftItemsSelectByCode(code.Trim()).ToList();
                var isValidateName = _dataContext.sp_GiftItemsSelect(null, null, name.Trim()).ToList();

                #endregion

                if (isValidateCode.Count != 0 && Convert.ToInt32(isValidateCode[0].GiftId) != giftId)
                {
                    returnString = "Duplicate Code!";
                }
                else if (isValidateName.Count != 0 && Convert.ToInt32(isValidateName[0].GiftId) != giftId)
                {
                    returnString = "Duplicate Name!";
                }
                else
                {
                    var updateGiftItems = _dataContext.sp_GiftItemsUpdate(giftId, code.Trim(), name.Trim(), DateTime.Now, DateTime.Now, isActive).ToList();
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
        public string DeleteGift(long giftId)
        {
            string returnString = "";

            try
            {
                _dataContext.sp_GiftItemsDelete(giftId);
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

        #endregion
    }
}
