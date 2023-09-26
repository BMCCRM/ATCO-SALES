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
    /// Summary description for FMOFeedBack
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
     [System.Web.Script.Services.ScriptService]
    public class FMOFeedBack : System.Web.Services.WebService
    {

        DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        JavaScriptSerializer _jss = new JavaScriptSerializer();
        NameValueCollection _nv = new NameValueCollection();
        DAL dal = new DAL();

        /// <summary>
        /// Get Mio IN drop Down
        /// </summary>
        /// <returns>Mio Name In DropDown</returns>

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetMIO()
        {
            string result = string.Empty;
            var ManagerId = Session["CurrentUserId"].ToString();
            try
            {
                _nv.Clear();
                _nv.Add("@ManagerId-BIGINT", ManagerId.ToString());
                var data = dal.GetData("sp_EmployeesSelectByManager", _nv);
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

        /// <summary>
        /// Select Mio And Give Feedback and save
        /// </summary>
        /// <param name="MIOId"> EmployeeId</param>
        /// <param name="Comment">Comment</param>
        /// <param name="docdate">Date from Calender</param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertMIOComments(string MIOId, string Comment)
        {
            string result = string.Empty;
            var ManagerId = Session["CurrentUserId"].ToString();
            //var Date = Convert.ToDateTime(docdate);

            try
            {
                _nv.Clear();
                _nv.Add("@MioId-int,", MIOId.ToString());
                _nv.Add("@RsmId-int,", ManagerId.ToString());
                _nv.Add("@Comments-text", Comment.ToString());
                _nv.Add("@Date-datetime", DateTime.Now.ToString());
                var insertProduct = dal.InserData("sp_MioFeedbackInsert", _nv);
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


        /// <summary>
        /// Data Show in GridView 
        /// </summary>
        /// <param name="docdate">Date from Calender</param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetDataInGrid(string stdate, string enddate)
        {
            string result = string.Empty;
            var ManagerId = Session["CurrentUserId"].ToString();
            //var Date = Convert.ToDateTime(docdate);
            try
            {
                _nv.Clear();
                _nv.Add("@RsmId-int", ManagerId.ToString());
                _nv.Add("@stdate-date", stdate.ToString());
                _nv.Add("@enddate-date", enddate.ToString());
                var data = dal.GetData("sp_GetMioFeedBack", _nv);
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

        /// <summary>
        /// Edit Comment and Mio
        /// </summary>
        /// <param name="MIOeditId">EmployeeId</param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string EditComent(string MIOeditId)
        {
            var result = "";
            try
            {
                _nv.Add("@id-INT", MIOeditId.ToString());
                var ds = dal.GetData("sp_EditfeedbackMio", _nv);
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


        /// <summary>
        /// Delete Comments From Grid
        /// </summary>
        /// <param name="DeleteId">Primary Key from tbl_Miofeedback as id</param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DeleteMioComment(string DeleteId)
        {
            string returnString = "";

            try
            {
                _nv.Clear();
                _nv.Add("@id-int", DeleteId.ToString());
                var ds = dal.GetData("sp_DeleteMioFeedback", _nv);

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

        /// <summary>
        /// Update Feedback comments and Mio id
        /// </summary>
        /// <param name="Id">Primary Key from tbl_Miofeedback</param>
        /// <param name="MIOId">EmployeeId</param>
        /// <param name="Comment">Comment</param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateFeedbackComment(string Id, string MIOId, string Comment)
        {
            string result = string.Empty;
            try
            {

                #region Update
                try
                {
                    _nv.Clear();
                    _nv.Add("@id-int", Id.ToString());
                    _nv.Add("@MioId-int", MIOId.ToString());
                    _nv.Add("@Comment-text", Comment.ToString());
                    var insertProduct = dal.InserData("sp_UpdateMioFeedBack", _nv);
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

                #endregion
            }
            catch (Exception e)
            {
                result = e.Message;
            }


            return result;
        }
    }
}
