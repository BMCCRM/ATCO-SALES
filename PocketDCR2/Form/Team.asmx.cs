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
    /// Summary description for Team1
    /// </summary>
     [WebService(Namespace = "http://www.pharmacrm.com.pk/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class Team1 : System.Web.Services.WebService
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
        public string InsertTeam(string TeamName, string Description, string GroupID, bool isActive)
        {
            string returnString = "";

            try
            {
                #region Validate Name

                //var isValidateName = _dataContext.sp_ProductsSelect(null, productName.Trim()).ToList();
                nv.Clear();
                nv.Add("@TeamName-nvarchar", TeamName);
                var isValidateName = dal.GetData("sp_CheckTeamExist", nv);

                #endregion

                if (isValidateName.Tables[0].Rows.Count != 0)
                {
                    returnString = "Duplicate Name!";
                }
                else
                {
                    nv.Clear();
                    nv.Add("@TeamName-nvarchar", TeamName);
                    nv.Add("@Description-nvarchar", Description);
                    nv.Add("@FkGid-bit", GroupID.ToString());
                    nv.Add("@Status-bit", isActive.ToString());
                    var insertTeam = dal.GetData("sp_TeamInsert", nv);
                    //var insertProduct = _dataContext.sp_ProductsInsert(productName.Trim(), isActive).ToList();
                    if (insertTeam.Tables[0].Rows.Count > 0)
                    {
                        returnString = "OK";
                    }
                    else
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
        public string GetTeam(int teamID)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@TeamID-int", teamID.ToString());
                var getTeams = dal.GetData("sp_GetTeamByTeamId", nv);
                if (getTeams != null)
                {
                    if (getTeams.Tables[0].Rows.Count > 0)
                    {
                        returnString = getTeams.Tables[0].ToJsonString();
                    }
                }

                //var getProducts = _dataContext.sp_ProductsSelect(productId, null).Select(
                //    p =>
                //        new DatabaseLayer.SQL.Product()
                //        {
                //            ProductId = p.ProductId,
                //            ProductName = p.ProductName,
                //            IsActive = p.IsActive
                //        }).ToList();
                //returnString = _jss.Serialize(getProducts);
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateTeam(int teamId, string teamName, string description, string groupid, bool isActive)
        {
            string returnString = "";

            try
            {
                #region Validate Name

                //var isValidateName = _dataContext.sp_ProductsSelect(null, productName.Trim()).ToList();
                nv.Clear();
                nv.Add("@TeamName-nvarchar", teamName);
                var isValidateName = dal.GetData("sp_CheckTeamExist", nv);

                #endregion

                if (isValidateName.Tables[0].Rows.Count != 0 && Convert.ToInt32(isValidateName.Tables[0].Rows[0]["PK_TSID"].ToString()) != teamId)
                {
                    returnString = "Duplicate Name!";
                }
                else
                {
                    nv.Clear();
                    nv.Add("@ID-int", teamId.ToString());
                    nv.Add("@TeamName-nvarchar", teamName);
                    nv.Add("@Description-nvarchar", description);
                    nv.Add("@grpid-int", groupid.ToString());
                    nv.Add("@IsActive-bit", isActive.ToString());
                    var updateProduct = dal.GetData("sp_UpdateTeam", nv);

                    //var updateProduct = _dataContext.sp_ProductsUpdate(productId, productName.Trim(), isActive).ToList();
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
        public string DeleteTeam(int teamId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@TeamId-int", teamId.ToString());
                var checkLink = dal.GetData("sp_CheckTeamLink", nv);
                if (checkLink.Tables[0].Rows.Count != 0)
                {
                    returnString = "Not able to delete this record due to linkup.";
                }
                else
                {
                    nv.Clear();
                    nv.Add("@TeamId-int", teamId.ToString());
                    var team = dal.GetData("sp_DeleteTeam", nv);
                    returnString = "OK";
                }
            }
            catch (SqlException exception)
            {

                //returnString = "Not able to delete this record due to linkup.";

                returnString = exception.Message;

            }

            return returnString;
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetTeamDatawithGroupId()
        {
            string returnString = "";

            try
            {
                //nv.Clear();
                //nv.Add("@TeamId-bigint", TeamID.ToString());
                //var team_ds = dl.GetData("sp_GetTeamWithTeamId", nv);
                var team_ds = dal.GetData("sp_GetTeam2", null);
                if (team_ds != null)
                {
                    if (team_ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = team_ds.Tables[0].ToJsonString();
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
