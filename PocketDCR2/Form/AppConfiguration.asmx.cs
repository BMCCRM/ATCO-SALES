using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Script.Services;
using System.Web.Services;
using DatabaseLayer.SQL;
using System.Web.Script.Serialization;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for AppConfiguration
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class AppConfiguration : System.Web.Services.WebService
    {        
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetHierarchyLevels()
        {
            string returnString = "";

            try
            {
                DatabaseDataContext dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                List<DatabaseLayer.SQL.AppConfiguration> hierarchyLevels =
                    dataContext.sp_AppConfigurationSelectHierarchy().Select(
                        p => new DatabaseLayer.SQL.AppConfiguration
                        {                            
                            SettingName = p.SettingName,
                            SettingValue = p.SettingValue
                        }).ToList();

                var jss = new JavaScriptSerializer();
                returnString = jss.Serialize(hierarchyLevels);
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetHierarchyLevel(int settingId)
        {
            string returnString = "";

            try
            {
                DatabaseDataContext dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                List<DatabaseLayer.SQL.AppConfiguration> getHierarchyLevels =
                    dataContext.sp_AppConfigurationSelect(settingId).Select(
                        p => new DatabaseLayer.SQL.AppConfiguration
                        {
                            SettingId = p.SettingId,
                            SettingName = p.SettingName,
                            SettingValue = p.SettingValue
                        }).ToList();

                var jss = new JavaScriptSerializer();
                returnString = jss.Serialize(getHierarchyLevels);
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateHierarchyLevel(int settingId, string settingValue, bool isActive)
        {
            string returnString = "";

            try
            {
                DatabaseDataContext dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                List<DatabaseLayer.SQL.AppConfiguration> updateHierarchyLevels =
                    dataContext.sp_AppConfigurationUpdate(settingId, settingValue, isActive).ToList();

                returnString = "OK";
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }
    }
}