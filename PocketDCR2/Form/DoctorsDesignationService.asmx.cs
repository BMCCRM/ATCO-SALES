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
    /// Summary description for DoctorsDesignationService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [ScriptService]
    public class DoctorsDesignationService : System.Web.Services.WebService
    {
        #region Public Member

        DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        JavaScriptSerializer _jss = new JavaScriptSerializer();

        #endregion

        #region Public Methods

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertDesignation(string name, string description)
        {
            string returnString = "";

            try
            {
                #region Validate Name

                var isValidateName = _dataContext.sp_DoctorsDesignationSelect(null, name.Trim()).ToList();

                #endregion

                if (isValidateName.Count != 0)
                {
                    returnString = "Duplicate Name!";
                }
                else
                {
                    var insertDesignation = _dataContext.sp_DoctorsDesignationInsert(name.Trim(), description).ToList();
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
        public string GetDesignation(int designationId)
        {
            string returnString = "";

            try
            {
                var getDesignation = _dataContext.sp_DoctorsDesignationSelect(designationId, null).Select(
                    p =>
                        new DatabaseLayer.SQL.DoctorsDesignation()
                        {
                            DesignationId = p.DesignationId,
                            DesignationName = p.DesignationName,
                            DesignationDescription = p.DesignationDescription
                        }).ToList();
                returnString = _jss.Serialize(getDesignation);
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateDesignation(int designationId, string name, string description)
        {
            string returnString = "";

            try
            {
                #region Validate Name

                var isValidateName = _dataContext.sp_DoctorsDesignationSelect(null, name.Trim()).ToList();

                #endregion

                if (isValidateName.Count != 0 && Convert.ToInt32(isValidateName[0].DesignationId) != designationId)
                {
                    returnString = "Duplicate Name!";
                }
                else
                {
                    var updateDesignation = _dataContext.sp_DoctorsDesignationUpdate(designationId, name.Trim(), description).ToList();
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
        public string DeleteDesignation(int designationId)
        {
            string returnString = "";

            try
            {
                var searchDesignation = _dataContext.sp_DoctorsDesignationSearchInDR(designationId).ToList();

                if (searchDesignation.Count > 0)
                {
                    returnString = "Not able to delete this level due to linkup.";
                }
                else
                {
                    _dataContext.sp_DoctorsDesignationsDelete(designationId);
                    returnString = "OK";
                }
            }
            catch (SqlException exception)
            {
                if (exception.Number == 547)
                {
                    returnString = "Not able to delete this level due to linkup.";
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
