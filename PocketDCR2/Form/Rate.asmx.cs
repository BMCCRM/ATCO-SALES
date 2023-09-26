using PocketDCR2.Classes;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;
namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for Rate1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class Rate1 : System.Web.Services.WebService
    {

        #region Public Member

        JavaScriptSerializer _jss = new JavaScriptSerializer();
        DAL dl = new DAL();
        NameValueCollection nv = new NameValueCollection();
        #endregion


        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World";
        }



        #region Fasih Work



        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetFormTypes()
        {
            string returnString = "";

            try
            {
                nv.Clear();
                DataSet ds = dl.GetData("sp_GetRatingFormType", null);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                    else
                    {
                        returnString = "";
                    }
                }
                else
                {
                    returnString = "";
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
        public string GetFormByTypes(string formTypeId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@formTypeId-int", formTypeId);
                DataSet ds = dl.GetData("sp_GetFormByTypes", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                    else
                    {
                        returnString = "";
                    }
                }
                else
                {
                    returnString = "";
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
        public string GetAllRatingForm(string formId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@Formid-int", formId);
                DataSet ds = dl.GetData("sp_GetAllRatingForm", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                    else
                    {
                        returnString = "";
                    }
                }
                else
                {
                    returnString = "";
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
        public string GetSurveyForm(string formId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@Formid-int", formId);
                DataSet ds = dl.GetData("sp_GetSurveyForm", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                    else
                    {
                        returnString = "";
                    }
                }
                else
                {
                    returnString = "";
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
        public string DeleteRateForm(string formId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@Formid-int", formId);
                DataSet ds = dl.GetData("sp_DeleteRateForm", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows[0][0].ToString() == "RelationExist")
                    {
                        returnString = "No delete";
                    }
                    else if (ds.Tables[0].Rows[0][0].ToString() == "OK")
                    {
                        returnString = "Deleted";
                    }
                }
                else
                {
                    returnString = "";
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }
            return returnString;
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertRatingForm(string formType, string formName, string formDesc)
        {
            string returnString = "";

            try
            {
                var employeeid = Session["CurrentUserId"].ToString();
                //var employeeid = "1";
                nv.Clear();
                nv.Add("@formType-int", formType);
                nv.Add("@formName-varchar(100)", formName);
                nv.Add("@formDescription-varchar(250)", formDesc);
                //nv.Add("@startDate-DateTime", startDate);
                //nv.Add("@endDate-DateTime", endDate);
                nv.Add("@CreatedBy-bigint", employeeid);
                DataSet ds = dl.GetData("sp_InsertRatingForm", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                    else
                    {
                        returnString = "";
                    }
                }
                else
                {
                    returnString = "";
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }
            return returnString;
        }



        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateRateForm(string id, string formType, string formName, string formDesc)
        {
            string returnString = "";

            try
            {
                var employeeid = Session["CurrentUserId"].ToString();
                nv.Clear();
                nv.Add("@formId-int", id);
                nv.Add("@formType-int", formType);
                nv.Add("@formName-varchar(100)", formName);
                nv.Add("@formDescription-varchar(250)", formDesc);
                //nv.Add("@startDate-DateTime", startDate);
                //nv.Add("@endDate-DateTime", endDate);

                DataSet ds = dl.GetData("sp_UpdateRateForm", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                    else
                    {
                        returnString = "";
                    }
                }
                else
                {
                    returnString = "";
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
        public string GetRateFormAllQuestions(string formId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@Formid-int", formId);
                DataSet ds = dl.GetData("sp_GetRateFormAllQuestions", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                    else
                    {
                        returnString = "";
                    }
                }
                else
                {
                    returnString = "";
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
        public string InsertFormQuestion(string formId, string frmQuestion, string AsnwerType, string Tooltip)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@formid-int", formId);
                nv.Add("@frmQuestion-varchar(250)", frmQuestion);
                nv.Add("@AsnwerType-varchar(50)", AsnwerType);
                nv.Add("@Tooltip-nvarchar(500)", Tooltip);
                DataSet ds = dl.GetData("sp_InsertFormQuestion", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                    else
                    {
                        returnString = "";
                    }
                }
                else
                {
                    returnString = "";
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
        public string UpdateFormQuestion(string questionId, string frmQuestion, string AsnwerType)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@questionId-int", questionId);
                nv.Add("@frmQuestion-varchar(250)", frmQuestion);
                nv.Add("@AsnwerType-varchar(50)", AsnwerType);
                DataSet ds = dl.GetData("sp_UpdateFormQuestion", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                    else
                    {
                        returnString = "";
                    }
                }
                else
                {
                    returnString = "";
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
        public string GetFormQuestion(string questionId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@questionId-int", questionId);
                DataSet ds = dl.GetData("sp_GetFormQuestion", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                    else
                    {
                        returnString = "";
                    }
                }
                else
                {
                    returnString = "";
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
        public string DeleteFormQuestion(string questionId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@questionId-int", questionId);
                DataSet ds = dl.GetData("sp_DeleteFormQuestion", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                    else
                    {
                        returnString = "";
                    }
                }
                else
                {
                    returnString = "";
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
        public string DeleteFormAnswer(string frmid,string questionId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@FormID-int", frmid);
                nv.Add("@questionId-int", questionId);
                DataSet ds = dl.GetData("sp_DeleteFormAnswer", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                    else
                    {
                        returnString = "";
                    }
                }
                else
                {
                    returnString = "";
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
        public string InsertFormQuestionAnswers(string formId, string questionId, string answer, string answerNum,string tooltips)
        {
            string returnString = "";

            try
            {
                var isEditable = (Convert.ToInt16(answerNum) - 1);
                var ans = answer.Split(',');
                var ToolTipSaparate = tooltips.Split(',');
                for (int i = 0; i < ans.Length; i++)
                {
                    nv.Clear();
                    nv.Add("@formId-int", formId);
                    nv.Add("@questionId-int", questionId);
                    nv.Add("@answer-varchar(250)", ans[i]);

                    if (isEditable == i)
                    {
                        nv.Add("@isEditable-bit", "1");
                    }
                    else
                    {
                        nv.Add("@isEditable-bit", "0");
                    }
                    nv.Add("@Tooltip-nvarchar(500)", ToolTipSaparate[i]);
                    
                    DataSet ds = dl.GetData("sp_InsertFormQuestionAnswer", nv);
                    if (ds != null)
                    {
                        if (ds.Tables[0].Rows.Count > 0)
                        {
                            returnString = ds.Tables[0].ToJsonString();
                        }
                        else
                        {
                            returnString = "";
                        }
                    }
                    else
                    {
                        returnString = "";
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
        public string UpdateInsertFormQuestionAnswers(string FormID, string frmQ, string QuestionID, string ID, string answerType, string answer, string answerNum, string ToolTips, string QToolTip)
        {
            string returnString = "";

            try
            {


                nv.Clear();
                nv.Add("@questionId-int", QuestionID);
                nv.Add("@frmQuestion-varchar(250)", frmQ);
                nv.Add("@AsnwerType-varchar(50)", answerType);
                nv.Add("@ToolTips-nvarchar(500)", QToolTip);
                
                DataSet dsUpdateQ = dl.GetData("sp_UpdateFormQuestion", nv);

                var AID = ID.Split(',');
                var ans = answer.Split(',');
               
                
                var tooltipSeparate = ToolTips.Split(',');


                for (int i = 0; i < ans.Length; i++)
                {
                    string AnswerID = "";

               
                     AnswerID = AID[i].ToString();
                 


                    int isEditable=0;

                    if (answerNum == AID[i])
                    {
                        isEditable=1;
                    }
                    if (AnswerID=="0")
                    {
                       
                        if (i + 1 == Convert.ToInt32(answerNum))
                        {
                            isEditable = 1;
                        }
                    }
                    
                    nv.Clear();
                    nv.Add("@ID-int", AnswerID);
                    nv.Add("@answer-varchar(250)", ans[i]);
                    nv.Add("@isEditable-bit", isEditable.ToString());
                    nv.Add("@tooltip-varchar(500)", tooltipSeparate[i]);
                    nv.Add("@FormID-int", FormID);
                    nv.Add("@QuestionID-int", QuestionID);

                    DataSet ds = dl.GetData("sp_UpdateInsertFormQuestionAnswers", nv);
                    if (ds != null)
                    {
                        if (ds.Tables[0].Rows.Count > 0)
                        {
                            returnString = ds.Tables[0].ToJsonString();
                        }
                        else
                        {
                            returnString = "";
                        }
                    }
                    else
                    {
                        returnString = "";
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
