using DatabaseLayer.SQL;
using PocketDCR2.Classes;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for TeamMaster1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class TeamMaster1 : System.Web.Services.WebService
    {

        #region Public Member

        DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        JavaScriptSerializer _jss = new JavaScriptSerializer();
        DAL dal = new DAL();
        NameValueCollection nv = new NameValueCollection();

        #endregion

        #region Public Functions

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertTeamMaster(string GroupId, string TeamName, string description, bool isActive)
        {
            string returnString = "";

            try
            {
                    nv.Clear();
                    nv.Add("@GroupId-bigint", GroupId);
                    nv.Add("@TeamName-varchar", TeamName);
                    nv.Add("@Description-varchar", description);
                    nv.Add("@IsActive-bit", isActive.ToString());
                    var insertTeam = dal.GetData("sp_InsertTeamMaster", nv);
                    if (insertTeam.Tables[0].Rows[0][0].ToString() == "Not Exist")
                    {
                        returnString = "OK";
                    }
                    else if (insertTeam.Tables[0].Rows[0][0].ToString() == "Exist")
                    {
                        returnString = "Duplicate Name!";
                    }
                    else if (insertTeam.Tables[0].Rows[0][0].ToString() == "OK")
                    {
                        returnString = "OK";
                    }
                    else
                    {
                        returnString = "error";
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
        public string GetTeamMaster(int teamId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@TeamId-int", teamId.ToString());
                var getTeam = dal.GetData("sp_GetTeamMaster", nv);
                if (getTeam != null)
                {
                    if (getTeam.Tables[0].Rows.Count > 0)
                    {
                        returnString = getTeam.Tables[0].ToJsonString();
                    }
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
        public string UpdateTeamMaster(int teamId, string teamName,string description, bool isActive, string groupId)
        {
            string returnString = "";

            try
            {
                    nv.Clear();
                    nv.Add("@GroupId-bigint", groupId);
                    nv.Add("@TeamId-bigint", teamId.ToString());
                    nv.Add("@TeamName-varchar", teamName);
                    nv.Add("@Description-varchar", description);
                    nv.Add("@IsActive-bit", isActive.ToString());
                    var updateTeam = dal.GetData("sp_UpdateTeamMaster", nv);

                    if (updateTeam.Tables[0].Rows[0][0].ToString() == "Not Exist")
                    {
                        returnString = "OK";
                    }
                    else if (updateTeam.Tables[0].Rows[0][0].ToString() == "OK")
                    {
                        returnString = "OK";
                    }
                    else if (updateTeam.Tables[0].Rows[0][0].ToString() == "Exist")
                    {
                        returnString = "EditMode";
                    }
                    else
                    {
                        returnString = "error";
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
        public string DeleteTeam(int teamId)
        {
            string returnString = "";

            try
            {
                //nv.Clear();
                //nv.Add("@TeamId-int", teamId.ToString());
                //var checkLink = dal.GetData("sp_CheckTeamLink", nv);
                //if (checkLink.Tables[0].Rows.Count != 0)
                //{
                //    returnString = "Not able to delete this record due to linkup.";
                //}
                //else
                //{
                    nv.Clear();
                    nv.Add("@TeamId-int", teamId.ToString());
                    var team = dal.GetData("sp_DeleteTeam", nv);

                    if (team.Tables[0].Rows[0][0].ToString() == "Linked")
                    {
                        returnString = "Not able to delete this record due to linkup.";
                    }
                    else if (team.Tables[0].Rows[0][0].ToString() == "Not Linked")
                    {
                        returnString = "OK";
                    }
                    else if (team.Tables[0].Rows[0][0].ToString() == "OK")
                    {
                        returnString = "OK";
                    }
                    else
                    {
                        returnString = "error";
                    }


                    //returnString = "OK";
                //}
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
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetGroupDD()
        {
            string returnString = "";

            try
            {
                var groupDD = dal.GetData("sp_GroupDD", null);
                if (groupDD != null)
                {
                    if (groupDD.Tables[0].Rows.Count > 0)
                    {
                        returnString = groupDD.Tables[0].ToJsonString();
                    }
                }

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
