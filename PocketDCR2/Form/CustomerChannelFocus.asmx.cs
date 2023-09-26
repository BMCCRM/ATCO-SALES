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
    /// Summary description for CustomerChannelFocus
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
     [System.Web.Script.Services.ScriptService]
    public class CustomerChannelFocus : System.Web.Services.WebService
    {
        #region Public Member

        DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        JavaScriptSerializer _jss = new JavaScriptSerializer();
        NameValueCollection _nv = new NameValueCollection();
        DAL _dal = new DAL();

        #endregion

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GridCustomerChannelFocus()
        {
            string result = string.Empty;

            try
            {

                _nv.Clear();
                _nv.Add("@ID-int", "0");

                var data = _dal.GetData("sp_CustomerChannelFocusSelect", _nv);
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
        public string InsertCustomerChannelFocus(string CustomerChannelFocus)
        {
            string result = string.Empty;
            try
            {
                _nv.Clear();
                _nv.Add("@CustomerChannelFocus-varchar(250)", CustomerChannelFocus.ToString());

                var insertTA = _dal.InserData("sp_CustomerChannelFocusInsert", _nv);
                if (insertTA)
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

        public string UpdateCustomerChannelFocus(string id, string CustomerChannelFocus)
        {
            string result = string.Empty;
            try
            {

                _nv.Add("@ID-int", id.ToString());
                _nv.Add("@CustomerChannelFocus-varchar(250)", CustomerChannelFocus.ToString());

                var insertTa = _dal.InserData("sp_CustomerChannelFocusUpdate", _nv);

                if (insertTa)
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
        public string EditCustomerChannelFocus(string id)
        {
            var result = "";
            try
            {
                _nv.Clear();
                _nv.Add("@ID-INT", id.ToString());
                var ds = _dal.GetData("sp_CustomerChannelFocusSelect", _nv);
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
        public string DeleteCustomerChannelFocus(string id)
        {
            string returnString = "";

            try
            {
                _nv.Add("@ID-int", id.ToString());
                var ds = _dal.GetData("sp_CustomerChannelFocusDelete", _nv);

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
