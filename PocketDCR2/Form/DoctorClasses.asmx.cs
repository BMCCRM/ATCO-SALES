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
    /// Summary description for DoctorClasses1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class DoctorClasses1 : System.Web.Services.WebService
    {
        #region Public Member

        DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        JavaScriptSerializer _jss = new JavaScriptSerializer();

        #endregion

        #region Public Methods

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertClass(string className, int classFrequency)
        {
            string returnString = "";

            try
            {
                #region Validate Name

                var isValidateName = _dataContext.sp_DoctorClassesSelect(null, className.Trim()).ToList();

                #endregion

                if (isValidateName.Count != 0)
                {
                    returnString = "Duplicate Name!";
                }
                else
                {
                    var insertClass = _dataContext.sp_DoctorClassesInsert(className, classFrequency).ToList();
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
        public string GetDoctorClass(int classId)
        {
            string returnString = "";

            try
            {
                var doctorClass = _dataContext.sp_DoctorClassesSelect(classId, null).Select(
                    p =>
                        new DatabaseLayer.SQL.DoctorClass()
                        {
                            ClassId = p.ClassId,
                            ClassName = p.ClassName,
                            ClassFrequency = p.ClassFrequency
                        }).ToList();
                returnString = _jss.Serialize(doctorClass);  
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateClass(int classId, string className, int classFrequency)
        {
            string returnString = "";

            try
            {
                #region Validate Name

                var isValidateName = _dataContext.sp_DoctorClassesSelect(null, className.Trim()).ToList();

                #endregion

                if (isValidateName.Count != 0 && Convert.ToInt32(isValidateName[0].ClassId) != classId)
                {
                    returnString = "Duplicate Name!";
                }
                else
                {
                    var doctorClass = _dataContext.sp_DoctorClassesUpdate(classId, className, classFrequency).ToList();
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
        public string DeleteClass(int classId)
        {
            string returnString = "";

            try
            {
                _dataContext.sp_DoctorClassesDelete(classId);
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
