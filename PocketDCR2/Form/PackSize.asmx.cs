using System;
using System.Linq;
using System.Web.Script.Services;
using System.Web.Services;
using DatabaseLayer.SQL;
using System.Web.Script.Serialization;
using PocketDCR2.Classes;
using System.Data.SqlClient;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for PackSize1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class PackSize1 : System.Web.Services.WebService
    {
        #region Public Member

        DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        JavaScriptSerializer _jss = new JavaScriptSerializer();

        #endregion

        #region Public Functions

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertPackSize(string packSize, bool isActive)
        {
            string returnString = "";

            try
            {
                #region Validate Name

                var isValidateName = _dataContext.sp_PackSizeSelect(null, packSize).ToList();

                #endregion

                if (isValidateName.Count != 0)
                {
                    returnString = "Duplicate Package Size!";
                }
                else
                {
                    var insertPackSize = _dataContext.sp_PackSizeInsert(packSize, isActive).ToList();
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
        public string GetPackSize(int packSizeId)
        {
            string returnString = "";

            try
            {
                var getPackSize = _dataContext.sp_PackSizeSelect(packSizeId, null).Select(
                    p => new DatabaseLayer.SQL.PackSize
                    {
                        PackSizeid = p.PackSizeid,
                        IsActive = p.IsActive,
                        SizeName = p.SizeName
                    }).ToList();
                returnString = _jss.Serialize(getPackSize);
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdatePackSize(int packSizeId, string packSize, bool isActive)
        {
            string returnString = "";

            try
            {
                #region Validate Name

                var isValidateName = _dataContext.sp_PackSizeSelect(null, packSize).ToList();

                #endregion

                if (isValidateName.Count != 0 && (isValidateName[0].PackSizeid != packSizeId))
                {
                    returnString = "Duplicate Package Size!";
                }
                else
                {
                    var updatePackSize = _dataContext.sp_PackSizeUpdate(packSizeId, packSize, isActive).ToList();
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
        public string DeletePackSize(int packSizeId)
        {
            string returnString = "";

            try
            {
                _dataContext.sp_PackSizeDelete(packSizeId);
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
