using DatabaseLayer.SQL;
using PocketDCR2.Classes;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;

namespace PocketDCR2.Reports
{
    /// <summary>
    /// Summary description for salesfeedback
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class salesfeedback : System.Web.Services.WebService
    {
        #region Public Member

        DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        JavaScriptSerializer _jss = new JavaScriptSerializer();
        NameValueCollection _nv = new NameValueCollection();
        DAL _dal = new DAL();

        string smtphost = ConfigurationManager.AppSettings["AutoEmailSMTP"].ToString();
        string smtpPort = ConfigurationManager.AppSettings["smtpPort"].ToString();
        string fromAddress = ConfigurationManager.AppSettings["AutoEmailID"].ToString();
        string smtppassword = ConfigurationManager.AppSettings["AutoEmailIDpass"].ToString();
        string ToAddress = ConfigurationManager.AppSettings["ToAddress"].ToString();

        #endregion

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string FillStretchedTarget()
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

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string FillTradeActivity()
        {
            string result = string.Empty;

            try
            {

                _nv.Clear();
                _nv.Add("@ID-int", "0");

                var data = _dal.GetData("sp_TradeActivitySelect", _nv);
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

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string FillTradeActivityFlm()
        {
            string returnstring = string.Empty;
            try
            {
                _nv.Clear();
                _nv.Add("@ID-int", "0");

                var data = _dal.GetData("sp_TradeActivitySelectFLM", _nv);
                if (data.Tables[0].Rows.Count > 0)
                {
                    returnstring = data.Tables[0].ToJsonString();
                }
                else
                {
                    returnstring = "No";
                }
            }
            catch (Exception ex)
            {

                returnstring = ex.Message;
            }
            return returnstring;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string FillCustomerChannelFocusFLM()
        {
            string returnstring = string.Empty;
            try
            {
                _nv.Clear();
                _nv.Add("@ID-int", "0");

                var data = _dal.GetData("sp_CustomerChannelFocusSelectFLM", _nv);
                if (data.Tables[0].Rows.Count > 0)
                {
                    returnstring = data.Tables[0].ToJsonString();
                }
                else
                {
                    returnstring = "No";
                }
            }
            catch (Exception ex)
            {

                returnstring = ex.Message;
            }
            return returnstring;
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string FillSellingSkillsFocusAreaFLM()
        {
            string returnstring = string.Empty;
            try
            {
                _nv.Clear();
                _nv.Add("@ID-int", "0");

                var data = _dal.GetData("sp_SellingSkillsFocusAreaSelectFLM", _nv);
                if (data.Tables[0].Rows.Count > 0)
                {
                    returnstring = data.Tables[0].ToJsonString();
                }
                else
                {
                    returnstring = "No";
                }
            }
            catch (Exception ex)
            {

                returnstring = ex.Message;
            }
            return returnstring;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string FillCustomerChannelFocus()
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

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string FillSellingSkillsFocusArea()
        {
            string result = string.Empty;

            try
            {

                _nv.Clear();
                _nv.Add("@ID-int", "0");

                var data = _dal.GetData("sp_SellingSkillsFocusAreaSelect", _nv);
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

        //FillProduct

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string FillProduct()
        {
            string result = string.Empty;

            try
            {

                //  _nv.Clear();
                // _nv.Add("@ID-int", "0");

                var data = _dal.GetData("sp_ProductSelect", null);
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
        public string InsertSalesFeedback(string employeeID, string Date, string StretchedTargetID,
            string TradeActivityID, string ProductsID, string SellingSkillsFocusAreaID, string CustomerChannelFocusID,
            string Remarks, string docid)
        {
            string result = string.Empty;
            try
            {
                _nv.Clear();
                var CreateDate = DateTime.Now;
                //  Convert.ToDateTime()
                // DateTime MyDateTime;
                // MyDateTime = new DateTime();
                // DateTime MyDateTime = DateTime.ParseExact(Date, "yyyy-MM-dd HH:mm tt",null);
                DateTime MyDateTime = DateTime.ParseExact(Date, "dd/MM/yyyy", null);

                _nv.Add("@Date-datetime", MyDateTime.ToString());
                _nv.Add("@EmployeeID-int", employeeID);
                _nv.Add("@StretchedTargetID-int", StretchedTargetID.ToString());
                _nv.Add("@TradeActivityID-int", TradeActivityID.ToString());
                _nv.Add("@ProductsID-int", ProductsID.ToString());
                _nv.Add("@SellingSkillsFocusAreaID-int", SellingSkillsFocusAreaID.ToString());
                _nv.Add("@CustomerChannelFocusID-int", CustomerChannelFocusID.ToString());
                _nv.Add("@Remarks-varchar(250)", Remarks.ToString());
                _nv.Add("@CreateDate-datetime", CreateDate.ToString());
                _nv.Add("@docid-int", docid);

                var insertST = _dal.InserData("sp_SalesFeedbackInsert", _nv);
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

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertSalesFeedback_ComaSaperate(string Emp_ID, string Date, string StretchedTargetID,
           string TradeActivityID, string ProductsID, string SellingSkillsFocusAreaID, string CustomerChannelFocusID,
           string Remarks, string docid)
        {
            string result = string.Empty;
            try
            {
                _nv.Clear();
                var CreateDate = DateTime.Now;
                DateTime MyDateTime = DateTime.ParseExact(Date, "dd/MM/yyyy", null);

                _nv.Add("@Date-datetime", MyDateTime.ToString());
                _nv.Add("@EmployeeID-int", Emp_ID);
                _nv.Add("@StretchedTargetID-int", StretchedTargetID.ToString());
                _nv.Add("@TradeActivityID-varchar(250)", TradeActivityID.ToString());
                _nv.Add("@ProductsID-varchar(250)", ProductsID.ToString());
                _nv.Add("@SellingSkillsFocusAreaID-varchar(250)", SellingSkillsFocusAreaID.ToString());
                _nv.Add("@CustomerChannelFocusID-varchar(250)", CustomerChannelFocusID.ToString());
                _nv.Add("@Remarks-varchar(250)", Remarks.ToString());
                _nv.Add("@CreateDate-datetime", CreateDate.ToString());
                _nv.Add("@docid-varchar(250)", docid);

                var insertST = _dal.InserData("sp_Tbl_SalesFeedback_CommaSeperateInsert", _nv);
                if (insertST)
                {
                    #region Sending Mail
                    var msg = new MailMessage { From = new MailAddress(ConfigurationManager.AppSettings["AutoEmailID"]) };
                    _nv.Clear();
                    _nv.Add("@EmplyeeID-int", Emp_ID);
                    var getmailAdd = _dal.GetData("sp_MIO_ZSM_DetailForEmail", _nv);
                    if (getmailAdd.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < getmailAdd.Tables[0].Rows.Count; i++)
                        {
                            msg.To.Add(getmailAdd.Tables[0].Rows[i]["ManagerEmail"].ToString());
                            msg.To.Add(getmailAdd.Tables[0].Rows[i]["MIOEmail"].ToString());
                        }
                    }

                    msg.Subject = "Sales Feedback";
                    msg.IsBodyHtml = true;

                    var body = @"<html><head><title></title></head><body><div style = 'border-top:3px solid #22BCE5'>&nbsp;</div>
                           <span style = 'font-family:Arial;font-size:10pt'>StretchedTarget : <b>" + StretchedTargetID.ToString() +
                           "</b><br/>TradeActivity : <b>" + TradeActivityID.ToString() +
                           "</b><br/> Products: <b>" + ProductsID.ToString() +
                           "</b>,<br /><br />SellingSkillsFocusArea : " + SellingSkillsFocusAreaID.ToString() +
                           "<br /><br />CustomerChannelFocus :" + CustomerChannelFocusID.ToString() +
                           " <br /><br />Date : " + DateTime.Now + " <br /><br />Thanks<br />Pharma CRM</span></body></html>";

                    msg.Body = body;

                    var client = new SmtpClient(ConfigurationManager.AppSettings["AutoEmailSMTP"])
                    {
                        UseDefaultCredentials = false,
                        Credentials = new System.Net.NetworkCredential(ConfigurationManager.AppSettings["AutoEmailID"], ConfigurationManager.AppSettings["AutoEmailIDpass"]),
                        Host = ConfigurationManager.AppSettings["AutoEmailSMTP"]
                    };

                    client.Send(msg);
                    #endregion
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

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertSalesFeedback_FLM(string flmID, string Date, string StretchedTargetID,
            string TradeActivityID, string ProductsID, string SellingSkillsFocusAreaID, string CustomerChannelFocusID,
            string Remarks, string docid)
        {
            string result = string.Empty;
            try
            {
                _nv.Clear();
                var CreateDate = DateTime.Now;
                DateTime MyDateTime = DateTime.ParseExact(Date, "dd/MM/yyyy", null);

                _nv.Add("@Date-datetime", MyDateTime.ToString());
                _nv.Add("@FLMID-int", flmID);
                _nv.Add("@StretchedTargetID-int", StretchedTargetID.ToString());
                _nv.Add("@TradeActivityID-int", TradeActivityID.ToString());
                _nv.Add("@ProductsID-int", ProductsID.ToString());
                _nv.Add("@SellingSkillsFocusAreaID-int", SellingSkillsFocusAreaID.ToString());
                _nv.Add("@CustomerChannelFocusID-int", CustomerChannelFocusID.ToString());
                _nv.Add("@Remarks-varchar(250)", Remarks.ToString());
                _nv.Add("@CreateDate-datetime", CreateDate.ToString());
                _nv.Add("@docid-int", docid);

                var insertST = _dal.InserData("sp_SalesFeedbackInsert_FLM", _nv);
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

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertSalesFeedback_ComaSaperate_FLM(string Emp_ID, string Date, string StretchedTargetID,
           string TradeActivityID, string ProductsID, string SellingSkillsFocusAreaID, string CustomerChannelFocusID,
           string Remarks, string docid)
        {
            string result = string.Empty;
            try
            {
                _nv.Clear();
                var CreateDate = DateTime.Now;
                DateTime MyDateTime = DateTime.ParseExact(Date, "dd/MM/yyyy", null);

                _nv.Add("@Date-datetime", MyDateTime.ToString());
                _nv.Add("@FLMID-int", Emp_ID);
                _nv.Add("@StretchedTargetID-int", StretchedTargetID.Split(',')[0].ToString());
                _nv.Add("@TradeActivityID-varchar(250)", TradeActivityID.ToString());
                _nv.Add("@ProductsID-varchar(250)", ProductsID.ToString());
                _nv.Add("@SellingSkillsFocusAreaID-varchar(250)", SellingSkillsFocusAreaID.ToString());
                _nv.Add("@CustomerChannelFocusID-varchar(250)", CustomerChannelFocusID.ToString());
                _nv.Add("@Remarks-varchar(250)", Remarks.ToString());
                _nv.Add("@CreateDate-datetime", CreateDate.ToString());
                _nv.Add("@docid-varchar(250)", docid);

                var insertST = _dal.InserData("sp_Tbl_SalesFeedback_CommaSeperateInsertFLM", _nv);



                if (insertST)
                {
                    #region Sending Mail
                    var msg = new MailMessage { From = new MailAddress(ConfigurationManager.AppSettings["AutoEmailID"]) };
                    _nv.Clear();
                    _nv.Add("@EmplyeeID-int", Emp_ID);
                    var getmailAdd = _dal.GetData("sp_ZSM_DetailForEmail", _nv);
                    if (getmailAdd.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < getmailAdd.Tables[0].Rows.Count; i++)
                        {
                            string email = getmailAdd.Tables[0].Rows[i]["FLMEmail"].ToString();
                            msg.To.Add(email);
                        }
                    }

                    msg.Subject = "Sales Feedback";
                    msg.IsBodyHtml = true;

                    var body = @"<html><head><title></title></head><body><div style = 'border-top:3px solid #22BCE5'>&nbsp;</div>
                           <span style = 'font-family:Arial;font-size:10pt'>StretchedTarget : <b>" + StretchedTargetID.ToString() +
                          "</b><br/>TradeActivity : <b>" + TradeActivityID.ToString() +
                          "</b><br/> Products: <b>" + ProductsID.ToString() +
                          "</b>,<br /><br />SellingSkillsFocusArea : " + SellingSkillsFocusAreaID.ToString() +
                          "<br /><br />CustomerChannelFocus :" + CustomerChannelFocusID.ToString() +
                          " <br /><br />Date : " + DateTime.Now + " <br /><br />Thanks<br />Pharma CRM</span></body></html>";

                    msg.Body = body;

                    var client = new SmtpClient(ConfigurationManager.AppSettings["AutoEmailSMTP"])
                    {
                        UseDefaultCredentials = false,
                        Credentials = new System.Net.NetworkCredential(ConfigurationManager.AppSettings["AutoEmailID"], ConfigurationManager.AppSettings["AutoEmailIDpass"]),
                        Host = ConfigurationManager.AppSettings["AutoEmailSMTP"]
                    };

                    client.Send(msg);
                    #endregion
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

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GridSalesFeedback(string emp_ID, string rType)
        {
            string result = string.Empty;

            try
            {

                _nv.Clear();
                _nv.Add("@empid-int", emp_ID);
                _nv.Add("@rollType-nvarchar(250)", rType);

                var data = _dal.GetData("sp_getsalesfeedbackdata", _nv);
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

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GridSalesFeedback_CommaSeperate(string Emp_ID, string rType)
        {
            string result = string.Empty;

            try
            {

                _nv.Clear();
                _nv.Add("@empid-int", Emp_ID);
                _nv.Add("@rType-nvarchar(250)", rType);

                var data = _dal.GetData("sp_getsalesfeedbackdata_CommaSeperate", _nv);
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

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string EditSalesFeedback(string id)
        {
            var result = "";
            try
            {
                _nv.Clear();
                _nv.Add("@ID-INT", id.ToString());
                var ds = _dal.GetData("sp_SalesFeedbackSelect", _nv);
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
        public string DeleteSalesFeedback(string id, string rType)
        {
            string returnString = "";

            try
            {
                _nv.Add("@ID-int", id.ToString());
                _nv.Add("@rType-nvarchar(250)", rType.ToString());
                var ds = _dal.GetData("sp_SalesFeedbackDelete", _nv);

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

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateSalesFeedback(string id, string Date, string StretchedTargetID,
            string TradeActivityID, string ProductsID, string SellingSkillsFocusAreaID, string CustomerChannelFocusID,
            string Remarks, string doctorid)
        {
            string result = string.Empty;
            try
            {
                CustomerChannelFocusID = (CustomerChannelFocusID == "null") ? "0" : CustomerChannelFocusID;
                doctorid = (doctorid == "null") ? "0" : doctorid;
                ProductsID = (ProductsID == "null") ? "0" : ProductsID;

                DateTime UpdateDate = DateTime.Now;
                _nv.Clear();
                DateTime MyDateTime = DateTime.ParseExact(Date, "dd/MM/yyyy", null);
                _nv.Add("@ID-int", id.ToString());
                _nv.Add("@Date-datetime", MyDateTime.ToString());
                _nv.Add("@StretchedTargetID-int", StretchedTargetID.ToString());
                _nv.Add("@TradeActivityID-int", TradeActivityID.ToString());
                _nv.Add("@ProductsID-int", ProductsID.ToString());
                _nv.Add("@SellingSkillsFocusAreaID-int", SellingSkillsFocusAreaID.ToString());
                _nv.Add("@CustomerChannelFocusID-int", CustomerChannelFocusID.ToString());
                _nv.Add("@Remarks-varchar(250)", Remarks.ToString());
                _nv.Add("@UpdateDate-datetime", UpdateDate.ToString());
                _nv.Add("@docid-int", doctorid);

                var insertSalesfeedback = _dal.InserData("sp_SalesFeedbackUpdate", _nv);

                if (insertSalesfeedback)
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
        public string GetlastRecords(string empid)
        {
            string returnstring;
            try
            {
                _nv.Clear();
                _nv.Add("@empid-int", empid);
                var data = _dal.GetData("sp_last5dayvisits", _nv);
                if (data.Tables[0].Rows.Count > 0)
                {
                    return data.Tables[0].ToJsonString();
                }
                else
                {
                    returnstring = "No";
                }
            }
            catch (Exception ex)
            {

                throw;
            }
            return returnstring;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetlastRecordsFlm(string empid)
        {
            string returnstring;
            try
            {
                _nv.Clear();
                _nv.Add("@flmid-int", empid);
                var data = _dal.GetData("sp_flmlast5visit", _nv);
                if (data.Tables[0].Rows.Count > 0)
                {
                    return data.Tables[0].ToJsonString();
                }
                else
                {
                    returnstring = "No";
                }
            }
            catch (Exception ex)
            {

                throw;
            }
            return returnstring;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetlocationByEmp(string empid, string check)
        {
            string returnstring;
            try
            {
                _nv.Clear();
                _nv.Add("@empid-int", empid);
                _nv.Add("@check-varchar(50)", check);
                var data = _dal.GetData("sp_GetCOntactPointLocation", _nv);
                if (data.Tables[0].Rows.Count > 0)
                {
                    return data.Tables[0].ToJsonString();
                }
                else
                {
                    returnstring = "No";
                }
            }
            catch (Exception ex)
            {

                throw;
            }
            return returnstring;
        }

    }
}
