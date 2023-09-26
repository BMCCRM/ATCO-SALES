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
    /// Summary description for EmployeeDesignationService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class EmployeeDesignationService : System.Web.Services.WebService
    {
        #region Public Member

        DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        JavaScriptSerializer _jss = new JavaScriptSerializer();

        #endregion

        #region Public Methods

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertDesignation(string name, string description, string hierarchy)
        {
            string returnString = "";

            try
            {
                #region Validate Name

                var isValidateName = _dataContext.sp_EmployeeDesignationsSelect(null, name.Trim(), null).ToList();

                #endregion

                if (isValidateName.Count != 0)
                {
                    returnString = "Duplicate Name!";
                }
                else
                {
                    var insertDesignation = _dataContext.sp_EmployeeDesignationsInsert(name.Trim(), description, hierarchy).ToList();
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
                var getDesignation = _dataContext.sp_EmployeeDesignationsSelect(designationId, null, null).Select(
                    p =>
                        new DatabaseLayer.SQL.EmployeeDesignation()
                        {
                            DesignationId = p.DesignationId,
                            DesignationName = p.DesignationName,
                            DesignationDescription = p.DesignationDescription,
                            DesignationType = p.DesignationType
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
        public string UpdateDesignation(int designationId, string name, string description, string hierarchy)
        {
            string returnString = "";

            try
            {
                #region Validate Name

                var isValidateName = _dataContext.sp_EmployeeDesignationsSelect(null, name.Trim(), null).ToList();

                #endregion

                if (isValidateName.Count != 0 && Convert.ToInt32(isValidateName[0].DesignationId) != designationId)
                {
                    returnString = "Duplicate Name!";
                }
                else
                {
                    var updateDesignation = _dataContext.sp_EmployeeDesignationsUpdate(designationId, name.Trim(), description, hierarchy).ToList();
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
                var searchDesignation = _dataContext.sp_EmployeeDesignationsSearchInEmp(designationId).ToList();

                if (searchDesignation.Count > 0)
                {
                    returnString = "Not able to delete this level due to linkup.";
                }
                else
                {
                    _dataContext.sp_EmployeeDesignationsDelete(designationId);
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
