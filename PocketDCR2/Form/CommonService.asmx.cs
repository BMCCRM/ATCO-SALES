using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using DatabaseLayer.SQL;
using PocketDCR2.Classes;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for CommonService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class CommonService : System.Web.Services.WebService
    {
        #region Public Member

        DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        JavaScriptSerializer _jss = new JavaScriptSerializer();

        #endregion

        #region Public Function

        [WebMethod(EnableSession = true)]
        public string GetCurrentUser()
        {
            string returnString = "";

            try
            {
                returnString = Context.Session["CurrentUserId"].ToString();
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod(EnableSession = true)]
        public string GetCurrentUserLoginID()
        {
            string returnString = "";

            try
            {
                returnString = Context.Session["CurrentUserLoginID"].ToString();
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }

            return returnString;
        }

        [WebMethod(EnableSession = true)]
        public string GetCurrentUserRole()
        {
            string returnString = "";

            try
            {
                returnString = Context.Session["CurrentUserRole"].ToString();
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetHierarchyLevels()
        {
            string returnString = "";

            try
            {
                List<DatabaseLayer.SQL.AppConfiguration> hierarchyLevels =
                    _dataContext.sp_AppConfigurationSelectHierarchy().Select(
                        p => new DatabaseLayer.SQL.AppConfiguration
                        {
                            SettingName = p.SettingName,
                            SettingValue = p.SettingValue
                        }).ToList();

                returnString = _jss.Serialize(hierarchyLevels);
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetSystemRole()
        {
            string returnString = "";

            try
            {
                List<SystemRole> getRole =
                    _dataContext.sp_SystemRolesSelectByNames().Select(
                        p => new SystemRole
                        {
                            RoleId = p.RoleId,
                            RoleName = p.RoleName
                        }).ToList();

                returnString = _jss.Serialize(getRole);
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
