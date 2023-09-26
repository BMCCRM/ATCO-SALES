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
    /// Summary description for SpecialityService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class SpecialityService : System.Web.Services.WebService
    {
        #region Public Member

        DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        JavaScriptSerializer _jss = new JavaScriptSerializer();

        #endregion

        #region Public Functions

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertSpeciality(string specialityName)
        {
            string returnString = "";

            try
            {
                #region Validate Name

                var isValidateName = _dataContext.sp_SpecialitySelect(null, specialityName).ToList();

                #endregion

                if (isValidateName.Count != 0)
                {
                    returnString = "Duplicate Name!";
                }
                else
                {
                    var insertSpeciality = _dataContext.sp_SpecialityInsert(specialityName).ToList();
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
        public string GetSpeciality(int specialityId)
        {
            string returnString = "";

            try
            {
                var getSpeciality = _dataContext.sp_SpecialitySelect(specialityId, null).Select(
                    p =>
                        new DatabaseLayer.SQL.Speciality()
                        {
                            SpecialityId = p.SpecialityId,
                            SpecialiityName = p.SpecialiityName
                        }).ToList();
                returnString = _jss.Serialize(getSpeciality);  
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateSpeciality(int specialityId, string specialityName)
        {
            string returnString = "";

            try
            {
                #region Validate Name

                var isValidateName = _dataContext.sp_SpecialitySelect(null, specialityName).ToList();

                #endregion

                if (isValidateName.Count != 0 && Convert.ToInt32(isValidateName[0].SpecialityId) != specialityId)
                {
                    returnString = "Duplicate Name!";
                }
                else
                {
                    var updateSpeciality = _dataContext.sp_SpecialityUpdate(specialityId, specialityName).ToList();
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
        public string DeleteSpeciality(int specialityId)
        {
            string returnString = "";

            try
            {
                _dataContext.sp_SpecialityDelete(specialityId);
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
