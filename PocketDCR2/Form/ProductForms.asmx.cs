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
    /// Summary description for ProductForms1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class ProductFormsService : System.Web.Services.WebService
    {
        #region Public Member

        DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        JavaScriptSerializer _jss = new JavaScriptSerializer();

        #endregion

        #region Public Functions

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertForm(string formName)
        {
            string returnString = "";

            try
            {
                #region Validate Name

                var isValidateName = _dataContext.sp_FormsSelect(null, formName.Trim()).ToList();

                #endregion

                if (isValidateName.Count != 0)
                {
                    returnString = "Duplicate Form!";
                }
                else
                {
                    var insertForms = _dataContext.sp_FormsInsert(formName.Trim()).ToList();
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
        public string GetForm(int formId) 
        {
            string returnString = "";

            try
            {
                var getForm = _dataContext.sp_FormsSelect(formId, null).Select(
                    p =>
                        new DatabaseLayer.SQL.Form()
                        {
                            FormId = p.FormId,
                            FormName = p.FormName
                        }).ToList();
                returnString = _jss.Serialize(getForm);
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateForm(int formId, string formName)
        {
            string returnString = "";

            try
            {
                #region Validate Name

                var isValidateName = _dataContext.sp_FormsSelect(null, formName.Trim()).ToList();

                #endregion

                if (isValidateName.Count != 0 && Convert.ToInt32(isValidateName[0].FormId) != formId)
                {
                    returnString = "Duplicate Form!";
                }
                else
                {
                    var updateForm = _dataContext.sp_FormsUpdate(formId, formName.Trim()).ToList();
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
        public string DeleteForm(int formId)
        {
            string returnString = "";

            try
            {
                _dataContext.sp_FormsDelete(formId);
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
