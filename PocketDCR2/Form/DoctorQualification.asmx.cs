using System;
using System.Linq;
using System.Web.Services;
using System.Web.Script.Services;
using DatabaseLayer.SQL;
using System.Web.Script.Serialization;
using PocketDCR2.Classes;
using System.Data.SqlClient;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for DoctorQualification
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class DoctorQualification : System.Web.Services.WebService
    {
        #region Public Member

        DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        JavaScriptSerializer _jss = new JavaScriptSerializer();

        #endregion

        #region Public Member

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertQualification(string qualificationName, bool isActive) 
        {
            string returnString = "";

            try
            {
                #region Validate Name

                var isValidateName = _dataContext.sp_DoctorQulificationSelect(null, qualificationName.Trim()).ToList();

                #endregion

                if (isValidateName.Count != 0)
                {
                    returnString = "Duplicate Name!";
                }
                else
                {
                    var insertQualification = _dataContext.sp_DoctorQulificationInsert(qualificationName.Trim(), isActive).ToList();
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
        public string GetQualification(int qualificationId)
        {
            string returnString = "";

            try
            {
                var getQualification = _dataContext.sp_DoctorQulificationSelect(qualificationId, null).Select(                    p =>
                        new DatabaseLayer.SQL.DoctorQulification()
                        {
                            QulificationId = p.QulificationId,
                            QualificationName = p.QualificationName,
                            IsActive = p.IsActive
                        }).ToList();
                returnString = _jss.Serialize(getQualification);
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateQualification(int qualificationId, string qualificationName, bool isActive)
        {
            string returnString = "";

            try
            {
                #region Validate Name

                var isValidateName = _dataContext.sp_DoctorQulificationSelect(null, qualificationName.Trim()).ToList();

                #endregion

                if (isValidateName.Count != 0 && Convert.ToInt32(isValidateName[0].QulificationId) != qualificationId)
                {
                    returnString = "Duplicate Name!";
                }
                else
                {
                    var updateQualification = _dataContext.sp_DoctorQulificationUpdate(qualificationId, qualificationName.Trim(), isActive).ToList();
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
        public string DeleteQualification(int qualififcationId) 
        {
            string returnString = "";

            try
            {
                _dataContext.sp_DoctorQulificationDelete(qualififcationId);
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