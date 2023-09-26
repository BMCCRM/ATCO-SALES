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
    /// Summary description for Group
    /// </summary>
    [WebService(Namespace = "http://www.pharmacrm.com.pk/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class Group1 : System.Web.Services.WebService
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
        public string InsertGroup(string GroupName, string Description, bool isActive)
        {
            string returnString = "";

            try
            {
                #region Validate Name

                //var isValidateName = _dataContext.sp_ProductsSelect(null, productName.Trim()).ToList();
                nv.Clear();
                nv.Add("@GroupName-nvarchar", GroupName);
                var isValidateName = dal.GetData("sp_CheckGroupExist", nv);

                #endregion

                if (isValidateName.Tables[0].Rows.Count != 0)
                {
                    returnString = "Duplicate Name!";
                }
                else
                {
                    nv.Clear();
                    nv.Add("@GroupName-nvarchar", GroupName);
                    nv.Add("@Description-nvarchar", Description);
                    nv.Add("@Status-bit", isActive.ToString());
                    var insertGroup = dal.GetData("sp_GroupInsert", nv);
                    //var insertProduct = _dataContext.sp_ProductsInsert(productName.Trim(), isActive).ToList();
                    if (insertGroup.Tables[0].Rows.Count > 0)
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
        public string GetGroup(int GroupID)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@GroupID-int", GroupID.ToString());
                var getGroups = dal.GetData("sp_GetGroupByGroupId", nv);
                if (getGroups != null)
                {
                    if (getGroups.Tables[0].Rows.Count > 0)
                    {
                        returnString = getGroups.Tables[0].ToJsonString();
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
        public string UpdateGroup(int GroupId, string GroupName, string description, bool isActive)
        {
            string returnString = "";

            try
            {
                #region Validate Name

                //var isValidateName = _dataContext.sp_ProductsSelect(null, productName.Trim()).ToList();
                nv.Clear();
                nv.Add("@GroupName-nvarchar", GroupName);
                var isValidateName = dal.GetData("sp_CheckGroupExist", nv);

                #endregion

                if (isValidateName.Tables[0].Rows.Count != 0 && Convert.ToInt32(isValidateName.Tables[0].Rows[0]["pk_GID"].ToString()) != GroupId)
                {
                    returnString = "Duplicate Name!";
                }
                else
                {
                    nv.Clear();
                    nv.Add("@ID-int", GroupId.ToString());
                    nv.Add("@GroupName-nvarchar", GroupName);
                    nv.Add("@Description-nvarchar", description);

                    nv.Add("@IsActive-bit", isActive.ToString());
                    var updateProduct = dal.GetData("sp_UpdateGroup", nv);

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
        public string DeleteGroup(int GroupId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@GroupId-int", GroupId.ToString());
                var checkLink = dal.GetData("sp_CheckGroupLink", nv);
                if (checkLink.Tables[0].Rows.Count != 0)
                {
                    returnString = "Not able to delete this record due to linkup.";
                }
                else
                {
                    nv.Clear();
                    nv.Add("@GroupId-int", GroupId.ToString());
                    var Group = dal.GetData("sp_DeleteGroup", nv);
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
        public string GetGroupDatawithGroupId()
        {
            string returnString = "";

            try
            {
                //nv.Clear();
                //nv.Add("@TeamId-bigint", TeamID.ToString());
                //var team_ds = dl.GetData("sp_GetTeamWithTeamId", nv);
                var Group = dal.GetData("sp_GetTeam2", null);
                if (Group != null)
                {
                    if (Group.Tables[0].Rows.Count > 0)
                    {
                        returnString = Group.Tables[0].ToJsonString();
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
