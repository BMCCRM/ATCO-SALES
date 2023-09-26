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
    /// Summary description for StretchedTarget1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
     [System.Web.Script.Services.ScriptService]
    public class StretchedTarget1 : System.Web.Services.WebService
    {
        #region Public Member

        DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        JavaScriptSerializer _jss = new JavaScriptSerializer();
        NameValueCollection _nv = new NameValueCollection();
        DAL _dal = new DAL();

        #endregion

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GridStretchedTarget()
        {
            string result = string.Empty;
            
            try
            {
               
                _nv.Clear();
                _nv.Add("@ID-int", "0");

                var data = _dal.GetData("sp_StretchedTargetSelect", _nv);
                if (data.Tables[0].Rows.Count > 0)
                {
                    return data.Tables[0].ToJsonString();
                }
                else
                {
                    result = "No";
                }


            }
            catch (NullReferenceException ex)
            {
                result = ex.Message;
            }

            return result;
        }

        //InsertStretchedTarget
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertStretchedTarget(string StretchedTarget)
        {
            string result = string.Empty;
            try
            {
                _nv.Clear();
                _nv.Add("@StretchedTarget-varchar(250)", StretchedTarget.ToString());

                var insertST = _dal.InserData("sp_StretchedTargetInsert", _nv);
                if (insertST)
                {
                    result = "OK";
                }
                else
                {
                    result = "No";
                }
            }
             catch (Exception e)
                {
                    result = e.Message;

                }
            
            return result;

        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]

        public string UpdateStretchedTarget(string id, string StretchedTarget)
        {
            string result = string.Empty;
            try
            {

                _nv.Add("@ID-int", id.ToString());
                _nv.Add("@StretchedTarget-varchar(250)", StretchedTarget.ToString());

                var insertProduct = _dal.InserData("sp_StretchedTargetUpdate", _nv);

                if (insertProduct)
                {
                    result = "OK";
                }
                else
                {
                    result = "No";
                }

            }
            catch (Exception e)
            {
                result = e.Message;
            }


            return result;
        }

        //Edit
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string EditStretchedTarget(string id)
        {
            var result = "";
            try
            {
                _nv.Clear();
                _nv.Add("@ID-INT", id.ToString());
                var ds = _dal.GetData("sp_StretchedTargetSelect", _nv);
                if (ds != null)
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        result = ds.Tables[0].ToJsonString();
                    }
            }
            catch (Exception exception)
            {
                result = exception.Message;
            }

            return result;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DeleteStretchedTarget(string id)
        {
            string returnString = "";

            try
            {
                _nv.Add("@ID-int", id.ToString());
                var ds = _dal.GetData("sp_StretchedTargetDelete", _nv);

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

    }
}
