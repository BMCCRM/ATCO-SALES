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
    /// Summary description for StrengthService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class StrengthService : System.Web.Services.WebService
    {
        #region Public Member

        DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        JavaScriptSerializer _jss = new JavaScriptSerializer();

        #endregion

        #region Public Functions

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertStrength(string strengthName, bool isActive)
        {
            string returnString = "";

            try
            {
                #region Validate Name

                var isValidateName = _dataContext.sp_StrengthSelect(null, strengthName.Trim()).ToList();

                #endregion

                if (isValidateName.Count != 0)
                {
                    returnString = "Duplicate Strength!";
                }
                else
                {
                    var insertStrength = _dataContext.sp_StrengthInsert(strengthName.Trim(), isActive).ToList();
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
        public string GetStrength(int strengthId) 
        {
            string returnString = "";

            try
            {
                var getStrength = _dataContext.sp_StrengthSelect(strengthId, null).Select(
                    p => 
                        new DatabaseLayer.SQL.Strength()
                        {
                            StrengthId = p.StrengthId,
                            StrengthName = p.StrengthName,
                            IsActive = p.IsActive
                        }).ToList();
                returnString = _jss.Serialize(getStrength);              
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateStrength(int strengthtId, string strengthName, bool isActive)
        {
            string returnString = "";

            try
            {
                #region Validate Name

                var isValidateName = _dataContext.sp_StrengthSelect(null, strengthName.Trim()).ToList();

                #endregion

                if (isValidateName.Count != 0 && Convert.ToInt32(isValidateName[0].StrengthId) != strengthtId)
                {
                    returnString = "Duplicate Strength!";
                }
                else
                {
                    var updateStrength = _dataContext.sp_StrengthUpdate(strengthtId, strengthName.Trim(), isActive).ToList();
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
        public string DeleteStrength(int strengthId) 
        {
            string returnString = "";

            try
            {
                _dataContext.sp_StrengthDelete(strengthId);
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