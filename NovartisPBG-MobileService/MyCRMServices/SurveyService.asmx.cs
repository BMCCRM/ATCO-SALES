using MyCRMServices.Class;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;

namespace MyCRMServices
{
    /// <summary>
    /// Summary description for SurveyService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class SurveyService : System.Web.Services.WebService
    {

        #region Public Member

        JavaScriptSerializer _jss = new JavaScriptSerializer();
        DAL dl = new DAL();
        NameValueCollection nv = new NameValueCollection();
        #endregion


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllSurveyForm(string date, string empid)
        {
            string returnString = "";

            //try
            //{
            //    nv.Clear();
            //    nv.Add("@empid-int", empid);
            //    nv.Add("@Date-datetime", date);
            //    DataSet ds = dl.GetData("sp_GetAllSurveyForm", nv);
            //    if (ds != null)
            //    {
            //        if (ds.Tables[0].Rows.Count > 0)
            //        {
            //            returnString = ds.Tables[0].ToJsonString();
            //        }
            //        else
            //        {
            //            returnString = "";
            //        }
            //    }
            //    else
            //    {
            //        returnString = "";
            //    }
            //}
            //catch (Exception exception)
            //{
            //    returnString = exception.Message;
            //}
            return returnString;
        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllData(string date, string empid)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@empid-int", empid);
                nv.Add("@Date-datetime", date);
                DataSet ds = dl.GetData("sp_GetAllData", nv);
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
        public string GetAllQuizForm(string date, string empid)
        {
            string returnString = "";

            //try
            //{
            //    nv.Clear();
            //    nv.Add("@Date-datetime", date);
            //    nv.Add("@EmpId-int", empid);
            //    DataSet ds = dl.GetData("sp_GetAllQuizForm", nv);
            //    if (ds != null)
            //    {
            //        if (ds.Tables[0].Rows.Count > 0)
            //        {
            //            returnString = ds.Tables[0].ToJsonString();
            //        }
            //        else
            //        {
            //            returnString = "";
            //        }
            //    }
            //    else
            //    {
            //        returnString = "";
            //    }
            //}
            //catch (Exception exception)
            //{
            //    returnString = exception.Message;
            //}
            return returnString;
        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllQuizData(string date, string empid)
        {
            string returnString = "";

            //try
            //{
            //    nv.Clear();
            //    nv.Add("@Date-datetime", date);
            //    nv.Add("@EmpId-int", empid);
            //    DataSet ds = dl.GetData("sp_GetAllQuizData", nv);
            //    if (ds != null)
            //    {
            //        if (ds.Tables[0].Rows.Count > 0)
            //        {
            //            returnString = ds.Tables[0].ToJsonString();
            //        }
            //        else
            //        {
            //            returnString = "";
            //        }
            //    }
            //    else
            //    {
            //        returnString = "";
            //    }
            //}
            //catch (Exception exception)
            //{
            //    returnString = exception.Message;
            //}
            return returnString;
        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetQuestionByFormId(string formid)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@FormId-int", formid);
                DataSet ds = dl.GetData("sp_GetQuestionByFormId", nv);
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
        public string GetAllSurveyForms()
        {
            string returnString = "";

            try
            {
                DataSet ds = dl.GetData("sp_GetAllSurveyForms", null);
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
        public string InsertSurveyMain(string formid, string EmpId, string CustId, string SurveyName, string Description, string SurveyDateTime)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@FormId-int", formid);
                nv.Add("@EmpId-int", EmpId);
                nv.Add("@CustId-int", CustId);
                nv.Add("@SurveyName-varchar(100)", SurveyName);
                nv.Add("@Description-varchar(250)", Description);
                nv.Add("@SurveyDateTime-DateTime", SurveyDateTime);
                DataSet ds = dl.GetData("sp_InserSurveyMain", nv);
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
        public string InsertSurveyData(string SurveyId, string QuestionId, string AnswerId, string Other)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@SurveyId-int", SurveyId);
                nv.Add("@QuestionId-int", QuestionId);
                nv.Add("@AnswerId-int", AnswerId);
                nv.Add("@Other-varchar(250)", Other);
                DataSet ds = dl.GetData("sp_insertSurveyData", nv);
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


    }
}