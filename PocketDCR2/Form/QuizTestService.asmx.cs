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
    /// Summary description for QuizTestService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class QuizTestService : System.Web.Services.WebService
    {

        #region Public Member

        JavaScriptSerializer _jss = new JavaScriptSerializer();
        DAL dl = new DAL();
        NameValueCollection nv = new NameValueCollection();


        string quizSubmittedId = "";

        Random rnd = new Random();

        List<string> qIds = new List<string>();


        #endregion



        #region Quiz test main page

        // Get all quiz tests
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllQuizTestForms()
        {
            string returnString = "";

            try
            {
                nv.Clear();
                DataSet ds = dl.GetData("sp_GetAllQuizTestForms", null);
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


        // Insert quiz test
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertQuizTestForm(string formName, string formDesc,
            //string frmTime, 
            string OneTimeScoreDD, string frmQScore, string TimeIn,
            string startDate, string endDate)
        {
            string returnString = "";

            try
            {
                var employeeid = Session["CurrentUserId"].ToString();

                nv.Clear();
                nv.Add("@FormName-varchar(100)", formName);
                nv.Add("@FormDescription-varchar(500)", formDesc);
                nv.Add("@FormTime-int", "0");
                nv.Add("@FormScore-int", "0");
                nv.Add("@TimeIn-varchar(50)", TimeIn);
                nv.Add("@OneTimeScoreDD-bit", (OneTimeScoreDD == "SetDefaultScore" ? "1" : "0"));
                nv.Add("@FormQScore-int", (OneTimeScoreDD == "SetDefaultScore" ? frmQScore : "0"));
                nv.Add("@StartDate-DateTime", startDate);
                nv.Add("@EndDate-DateTime", endDate);
                nv.Add("@CreatedBy-bigint", employeeid);
                DataSet ds = dl.GetData("sp_InsertQuizTestForm", nv);
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



        // Get quiz form for edit 
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetQuizTestFormById(string formId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@formId-int", formId);
                DataSet ds = dl.GetData("sp_GetQuizTestFormById", nv);
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



        // Update quiz form
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateQuizTestForm(string formId, string formName, string formDesc,
            //string frmTime, 
            string OneTimeScoreDD, string frmQScore, string TimeIn,
            string startDate, string endDate)
        {
            string returnString = "";

            try
            {
                var employeeid = Session["CurrentUserId"].ToString();

                nv.Clear();
                nv.Add("@formId-int", formId);
                nv.Add("@FormName-varchar(100)", formName);
                nv.Add("@FormDescription-varchar(500)", formDesc);
                nv.Add("@TimeIn-varchar(50)", TimeIn);
                nv.Add("@OneTimeScoreDD-bit", (OneTimeScoreDD == "SetDefaultScore" ? "1" : "0"));
                nv.Add("@FormQScore-int", (OneTimeScoreDD == "SetDefaultScore" ? frmQScore : "0"));
                nv.Add("@StartDate-DateTime", startDate);
                nv.Add("@EndDate-DateTime", endDate);
                nv.Add("@CreatedBy-bigint", employeeid);
                DataSet ds = dl.GetData("sp_UpdateQuizTestForm", nv);
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



        // Delete quiz form 
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DeleteQuizTestForm(string formId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@formId-int", formId);
                DataSet ds = dl.GetData("sp_DeleteQuizTestForm", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                    else
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



        // Get quiz grading in modal
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetQuizTestGrading(string quizId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@quizId-int)", quizId);
                DataSet ds = dl.GetData("sp_GetQuizTestGrading", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                    else
                    {
                        returnString = "No Data";
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


        // Insert quiz grading
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertQuizTestGrading(string formId, string grades, string scores)
        {
            string returnString = "";

            try
            {
                string[] score = scores.Split(',');
                string[] grade = grades.Split(',');

                DataSet ds = new DataSet();

                for (int i = 0; i < score.Length; i++)
                {
                    nv.Clear();
                    nv.Add("@grade-varchar(50)", grade[i]);
                    nv.Add("@score-int", score[i]);
                    nv.Add("@QuizTestId-int", formId);
                    ds = dl.GetData("sp_InsertQuizTestGrading", nv);
                }

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
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


        // Update quiz grading
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateQuizTestGrading(string formId, string grades, string scores)
        {
            string returnString = "";

            try
            {
                string[] score = scores.Split(',');
                string[] grade = grades.Split(',');

                DataSet ds = new DataSet();

                nv.Clear();
                nv.Add("@QuizTestId-int", formId);
                ds = dl.GetData("sp_DeleteQuizTestGrading", nv);

                for (int i = 0; i < score.Length; i++)
                {
                    nv.Clear();
                    nv.Add("@grade-varchar(50)", grade[i]);
                    nv.Add("@score-int", score[i]);
                    nv.Add("@QuizTestId-int", formId);
                    ds = dl.GetData("sp_UpdateQuizTestGrading", nv);
                }

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
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

        #endregion



        #region Quiz test questions and asnwer page

        // Get all questions
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllQuizTestQuestions(string formId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@formId-int", formId);
                DataSet ds = dl.GetData("sp_GetAllQuizTestQuestions", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = "[" + ds.Tables[0].ToJsonString() + "," + ds.Tables[1].ToJsonString() + "]";
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


        // Insert question
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertQuizTestFormQuestion(string formId, string frmQuestion, string AsnwerType, string Time, string TimeIn, string Score)
        {
            string returnString = "";

            try
            {
                string timeInSeconds = "";
                if (TimeIn == "Minutes")
                {
                    timeInSeconds = (Convert.ToInt16(Time) * 60).ToString();
                }
                else
                {
                    timeInSeconds = Time;
                }

                nv.Clear();
                nv.Add("@formId-int", formId);
                nv.Add("@Time-int", timeInSeconds);
                nv.Add("@Score-int", Score);
                nv.Add("@frmQuestion-varchar(250)", frmQuestion);
                nv.Add("@AsnwerType-varchar(50)", AsnwerType);
                DataSet ds = dl.GetData("sp_InsertQuizTestFormQuestion", nv);
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


        // Insert answer if question type is txt
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertQuizTestQuestionTxtAnswers(string formId, string questionId, string answer)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@formId-int", formId);
                nv.Add("@questionId-int", questionId);
                nv.Add("@answer-varchar(250)", answer);
                nv.Add("@isCorrect-bit", "0");

                DataSet ds = dl.GetData("sp_InsertQuizTestQuestionTxtAnswer", nv);
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


        // Update and delete question's answers if question type is TXT
        //[WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public string UpdateandDeleteQuizTestQuestion(string questionId, string frmQuestion, string AsnwerType, string Time, string Score)
        //{
        //    string returnString = "";

        //    try
        //    {
        //        string timeInSeconds = (Convert.ToInt16(Time) * 60).ToString();
        //        nv.Clear();
        //        nv.Add("@questionId-int", questionId);
        //        nv.Add("@frmQuestion-varchar(250)", frmQuestion);
        //        nv.Add("@AsnwerType-varchar(50)", AsnwerType);
        //        nv.Add("@Time-int", timeInSeconds);
        //        nv.Add("@Points-int", Score);
        //        DataSet ds = dl.GetData("sp_UpdateandDeleteQuizTestQuestion", nv);
        //        if (ds != null)
        //        {
        //            returnString = ds.Tables[0].ToJsonString();
        //        }
        //        else
        //        {
        //            returnString = "";
        //        }
        //    }
        //    catch (Exception exception)
        //    {
        //        returnString = exception.Message;
        //    }
        //    return returnString;
        //}


        // Update all answers of question


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateQuizTestQuestionAnswers(string formId, string questionId, string frmQuestion, string answerType, string Time, string TimeIn, string Score, string answer, string correctans, string answerNum)
        {
            string returnString = "";

            try
            {
                string timeInSeconds = "";
                if (TimeIn == "Minutes")
                {
                    timeInSeconds = (Convert.ToInt16(Time) * 60).ToString();
                }
                else
                {
                    timeInSeconds = Time;
                }

                nv.Clear();
                nv.Add("@questionId-int", questionId);
                nv.Add("@frmQuestion-varchar(250)", frmQuestion);
                nv.Add("@AsnwerType-varchar(50)", answerType);
                nv.Add("@Time-int", timeInSeconds);
                nv.Add("@Points-int", Score);
                DataSet dsUpdateQ = dl.GetData("sp_UpdateQuizTestQuestion", nv);

                nv.Clear();
                nv.Add("@questionId-int", questionId);
                DataSet dsDeleteeQ = dl.GetData("sp_DeleteQuizTestQuestionAnswers", nv);

                var ans = answer.Split(',');
                var corrans = correctans.Split(',');

                for (int i = 0; i < ans.Length; i++)
                {
                    nv.Clear();
                    nv.Add("@formId-int", formId);
                    nv.Add("@questionId-int", questionId);
                    nv.Add("@answer-varchar(250)", ans[i]);
                    nv.Add("@correctans-bit", (corrans[i] == "true" ? "1" : "0"));
                    nv.Add("@Time-int", timeInSeconds);
                    nv.Add("@Points-int", Score);
                    DataSet ds = dl.GetData("sp_UpdateQuizTestQuestionAnswers", nv);
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
                returnString = dsUpdateQ.Tables[0].ToJsonString();
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }
            return returnString;
        }


        // Insert all answers of question
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertQuizTestQuestionAnswers(string formId, string questionId, string answer, string correctans, string answerNum)
        {
            string returnString = "";

            try
            {
                var isEditable = (Convert.ToInt16(answerNum) - 1);

                var ans = answer.Split(',');
                var corrans = correctans.Split(',');

                for (int i = 0; i < ans.Length; i++)
                {
                    nv.Clear();
                    nv.Add("@formId-int", formId);
                    nv.Add("@questionId-int", questionId);
                    nv.Add("@answer-varchar(250)", ans[i]);
                    nv.Add("@correctans-bit", (corrans[i] == "true" ? "1" : "0"));
                    DataSet ds = dl.GetData("sp_InsertQuizTestQuestionAnswers", nv);
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


        // Get question by id
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetQuestionById(string questionId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@questionId-int", questionId);
                DataSet ds = dl.GetData("sp_GetQuestionById", nv);
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


        // delete question and its answers
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DeleteQuizTestQuestion(string questionId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@questionId-int", questionId);
                DataSet ds = dl.GetData("sp_DeleteQuizTestQuestion", nv);
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


        #endregion



        #region Quiz test assign page


        // Get all assigned forms in grid
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string FillAssignedQuizTestGrid()
        {
            string returnString = "";

            try
            {
                nv.Clear();
                DataSet ds = dl.GetData("sp_AssignedQuizTestGrid", null);
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


        //Get all quiz test forms
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetQuizTestForms()
        {
            string returnString = "";

            try
            {
                nv.Clear();
                DataSet ds = dl.GetData("sp_GetQuizTestForms", null);
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


        // Get number of questions of form
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetNumberOfQuestions(string FormId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@formId-int", FormId);
                DataSet ds = dl.GetData("sp_GetQuizTestNumberOfQuestions", nv);
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
        public string ChangeAttemptDate(string AssignFormId, string NewAttemptDate, string PrevAttemptDate)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@AssignFormId-int", AssignFormId);
                nv.Add("@NewAttemptDate-datetime", NewAttemptDate);
                nv.Add("@PrevAttemptDate-varchar(100)", PrevAttemptDate);
                DataSet ds = dl.GetData("sp_QuizTestChangeAttemptDate", nv);
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



        //Assign form insert
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string AssignQuizTest(string FormId, string EmpId, string NumberOfQuestions, string FinalAttemptDate, string isTodayAttemptDate)
        {
            string returnString = "";

            try
            {
                var employeeid = Session["CurrentUserId"].ToString();

                nv.Clear();
                nv.Add("@formId-int", FormId);
                DataSet checkifgradingandscoreexists = dl.GetData("sp_CheckQuizTestFormGrading", nv);

                if (checkifgradingandscoreexists.Tables[0].Rows[0]["Grade"].ToString() != "0" && checkifgradingandscoreexists.Tables[0].Rows[0]["Score"].ToString() != "0")
                {
                    var empIds = EmpId.Split(',');
                    for (int i = 0; i < empIds.Length; i++)
                    {
                        nv.Clear();
                        nv.Add("@formId-int", FormId);
                        nv.Add("@empId-int", empIds[i]);
                        nv.Add("@FinalAttemptDate-nvarchar(150)", FinalAttemptDate);
                        DataSet check = dl.GetData("sp_CheckQuizTestAssignForm", nv);

                        if (check.Tables[0].Rows.Count > 0)
                        {
                            returnString = "[[{\"Exists\":\"Exists\"}]," + check.Tables[0].ToJsonString() + "]";
                        }
                        else
                        {
                            // insert assign form
                            nv.Clear();
                            nv.Add("@formId-int", FormId);
                            nv.Add("@empId-int", empIds[i]);
                            nv.Add("@NumberOfQuestions-int", NumberOfQuestions);
                            nv.Add("@FinalAttemptDate-nvarchar(150)", (isTodayAttemptDate == "No" ? FinalAttemptDate : ""));
                            nv.Add("@status-varchar(50)", "Not Submitted");
                            DataSet ds = dl.GetData("sp_AssignQuizTestForm", nv);
                            if (ds != null)
                            {
                                if (ds.Tables[0].Rows.Count > 0 && ds.Tables[0].Rows[0]["Assigned"].ToString() == "Assigned")
                                {
                                    //return assigned ID
                                    string assignedId = ds.Tables[0].Rows[0]["ID"].ToString();

                                    // get all questions of form
                                    nv.Clear();
                                    nv.Add("@formId-int", FormId);
                                    nv.Add("@empId-bigint", empIds[i]);
                                    nv.Add("@assignedId-int", assignedId);
                                    nv.Add("@countnmber-int", NumberOfQuestions);
                                    DataSet getAllQuestionIds = dl.GetData("sp_GetQuizTestAllQuestions", nv);

                                    // if questions are remaining then assign, else reset cycle
                                    if (getAllQuestionIds.Tables[0].Rows.Count > 0)
                                    {
                                        List<string> questionIds = new List<string>();

                                        // add all question ids into an list of string
                                        for (int j = 0; j < getAllQuestionIds.Tables[0].Rows.Count; j++)
                                        {
                                            questionIds.Add(getAllQuestionIds.Tables[0].Rows[j]["QuestionId"].ToString());
                                        }

                                        int isSameCount = 0;
                                        string isAdded = "false";
                                        string isNotAdded = "false";

                                        // loop through and insert random question into bridge table
                                        for (int j = 0; j < getAllQuestionIds.Tables[0].Rows.Count; j++)
                                        {
                                            string currentQuestionId = questionIds[j];

                                            nv.Clear();
                                            nv.Add("@formId-int", FormId);
                                            nv.Add("@empId-bigint", empIds[i]);
                                            nv.Add("@questionId-int", currentQuestionId);
                                            nv.Add("@assignedFormId-int", assignedId);
                                            DataSet insertintobridgetable = dl.GetData("sp_InsertQuestionsIntoBridgeTable", nv);

                                            if (insertintobridgetable.Tables[0].Rows.Count > 0)
                                            {
                                                if (insertintobridgetable.Tables[0].Rows[0]["NoAnswer"].ToString() == "Yes")
                                                {
                                                    isSameCount = Convert.ToInt16(insertintobridgetable.Tables[0].Rows[0]["Count"].ToString());
                                                    isAdded = "true";
                                                }
                                                else
                                                {
                                                    isNotAdded = "true";
                                                }

                                                returnString = "[[{\"Added\":" + isAdded + "}], [{\"NotAdded\":" + isNotAdded + "}]]";
                                            }
                                        }

                                        nv.Clear();
                                        nv.Add("@totalCount-int", isSameCount.ToString());
                                        nv.Add("@assignedFormId-int", assignedId);
                                        nv.Add("@isDelete-varchar(10)", (isSameCount == 0 ? "yes" : "no"));
                                        DataSet updateAssignedRecord = dl.GetData("sp_UpdateQuizTestAssignedForm", nv);
                                    }
                                    else
                                    {

                                    }
                                }
                                else
                                {
                                    returnString = "[[{\"Already\":\"No Already\"}], [{\"Already\":\"No Already\"}]]";
                                }
                            }
                            else
                            {
                                returnString = "Error";
                            }
                        }
                    }
                }
                else if (checkifgradingandscoreexists.Tables[0].Rows[0]["Grade"].ToString() == "0" && checkifgradingandscoreexists.Tables[0].Rows[0]["Score"].ToString() == "0")
                {
                    returnString = "[[{\"GradingandScore\":\"No GradingandScore\"}], [{\"GradingandScore\":\"No GradingandScore\"}]]";
                }
                else if (checkifgradingandscoreexists.Tables[0].Rows[0]["Grade"].ToString() == "0")
                {
                    returnString = "[[{\"Grading\":\"No Grading\"}], [{\"Grading\":\"No Grading\"}]]";
                }
                else
                {
                    returnString = "[[{\"Score\":\"No Score\"}], [{\"Score\":\"No Score\"}]]";
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }
            return returnString;
        }


        // Delete assigned form
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DeleteAssignQuizTest(string AssignFormId)
        {
            string returnString = "";
            string formid = "";
            string empid = "";
            try
            {
                nv.Clear();
                nv.Add("@AssignFormId-int", AssignFormId);
                DataSet details = dl.GetData("sp_GetAssignQuizTestForm", nv);
                if (details != null)
                {
                    if (details.Tables[0].Rows.Count > 0)
                    {
                        formid = details.Tables[0].Rows[0]["fk_QuizTestId"].ToString();
                        empid = details.Tables[0].Rows[0]["fk_EmpId"].ToString();

                        nv.Clear();
                        nv.Add("@AssignFormId-int", AssignFormId);
                        nv.Add("@FormId-int", formid);
                        nv.Add("@EmpID-int", empid);
                        DataSet ds = dl.GetData("sp_DeleteAssignQuizTest", nv);
                        if (ds != null)
                        {
                            if (ds.Tables[0].Rows.Count > 0)
                            {
                                returnString = "Execution Found";
                            }
                            else
                            {
                                returnString = "Deleted";
                            }
                        }
                    }
                    else
                    {
                        returnString = "Error";
                    }
                }

            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }
            return returnString;
        }



        // Get Employees
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetEmployee()
        {
            string returnString = "";

            try
            {
                nv.Clear();
                DataSet ds = dl.GetData("sp_GetEmployees", null);
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
        public string fillTMList(string level1Id, string level2Id, string level3Id, string level4Id, string level5Id, string level6Id, string level)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@level1Id-int", level1Id);
                nv.Add("@level2Id-int", level2Id);
                nv.Add("@level3Id-int", level3Id);
                nv.Add("@level4Id-int", level4Id);
                nv.Add("@level5Id-int", level5Id);
                nv.Add("@level6Id-int", level6Id);
                nv.Add("@level-varchar(50)", level);
                DataSet ds = dl.GetData("sp_fillTMList", nv);
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

        #endregion



        #region Quiz test fill page


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string FillAssignedFormOfEmpGrid(string empId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@empId-int", empId);
                DataSet ds = dl.GetData("sp_GetAssignedQuizTestFormOfEmpGrid", nv);
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


        // Get quiz test form details
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetQuizFormDetails(string formId, string assignedFormId)
        {
            string returnString = "";

            try
            {
                var employeeid = Session["CurrentUserId"].ToString();
                nv.Clear();
                nv.Add("@AssignedFormId-int", assignedFormId);
                nv.Add("@EmpId-bigint", employeeid);
                nv.Add("@QuizTestId-int", formId);
                DataSet checkifquizalreadyattempted = dl.GetData("sp_CheckQuizTestIfAlreadyAttempted", nv);

                if (checkifquizalreadyattempted.Tables[0].Rows.Count == 0)
                {
                    nv.Clear();
                    nv.Add("@formId-int", formId);
                    nv.Add("@assignedFormId-int", assignedFormId);
                    DataSet ds = dl.GetData("sp_GetQuizFormDetails", nv);
                    if (ds != null)
                    {
                        if (ds.Tables[0].Rows.Count > 0)
                        {
                            returnString = "[" + ds.Tables[0].ToJsonString() + "," + ds.Tables[1].ToJsonString() + "," + ds.Tables[2].ToJsonString() + "]";
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
                else
                {
                    returnString = "Attempted";
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }
            return returnString;
        }



        // Render quiz test form
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ShowQuizQuestions(string formId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@formId-int", formId);
                DataSet ds = dl.GetData("sp_ShowQuizTestQuestions", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = "[" + ds.Tables[0].ToJsonString() + "," + ds.Tables[1].ToJsonString() + "]";
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
        public string GetQuizTestQuestion(string formId, string assignedID)
        {
            string returnString = "";

            try
            {
                // check and create an entry in quiz test submitted table if it is first question
                var employeeid = Session["CurrentUserId"].ToString();
                DataSet summary = new DataSet();
                string totalQuestions = "";
                int counter = 1;

                nv.Clear();
                nv.Add("@formId-int", formId);
                nv.Add("@empid-bigint", employeeid);
                DataSet quizsubmitted = dl.GetData("sp_CheckQuizTestSubmitted", nv);

                if (quizsubmitted != null && quizsubmitted.Tables[0].Rows.Count > 0)
                {
                    if (quizsubmitted.Tables[0].Rows[0]["ID"].ToString() != "")
                    {
                        // if form is submitted, resume it
                        quizSubmittedId = quizsubmitted.Tables[0].Rows[0]["ID"].ToString();
                        counter = Convert.ToInt16(quizsubmitted.Tables[0].Rows[0]["Counter"].ToString());
                    }
                    else
                    {
                        // if not submitted then insert and get first question
                        nv.Clear();
                        nv.Add("@formId-int", formId);
                        nv.Add("@empid-bigint", employeeid);
                        nv.Add("@time-int", "0");
                        nv.Add("@score-int", "0");
                        nv.Add("@assignId-int", assignedID);
                        nv.Add("@quizStatus-varchar(10)", "Started");
                        DataSet quiztestinserted = dl.GetData("sp_InsertQuizTestSubmitted", nv);

                        if (quiztestinserted.Tables[0].Rows.Count > 0)
                        {
                            // insert done, get all question ids of form
                            quizSubmittedId = quiztestinserted.Tables[0].Rows[0]["ID"].ToString();
                        }
                    }

                }

                if (quizSubmittedId != "")
                {
                    nv.Clear();
                    nv.Add("@formId-int", formId);
                    nv.Add("@quizSubmittedId-int", quizSubmittedId);
                    nv.Add("@assignedID-int", assignedID);
                    DataSet questionIds = dl.GetData("sp_GetQuizTestQuestionIds", nv);

                    if (questionIds.Tables[0].Rows[0]["IsFinished"].ToString() == "Yes")
                    {
                        returnString = "AlreadyFinished";
                    }
                    else
                    {
                        for (int i = 0; i < questionIds.Tables[0].Rows.Count; i++)
                        {
                            qIds.Add(questionIds.Tables[0].Rows[i]["QuestionId"].ToString());
                        }


                        // get random question number from list and get question
                        int r = rnd.Next(qIds.Count);

                        totalQuestions = questionIds.Tables[0].Rows[0]["totalQuestionCount"].ToString();

                        string currentQuestionId = qIds[r];

                        nv.Clear();
                        nv.Add("@questionId-int", currentQuestionId);
                        nv.Add("@quizSubmittedId-int", quizSubmittedId);
                        DataSet question = dl.GetData("sp_GetQuizTestQuestion", nv);

                        if (question.Tables[2].Rows.Count > 0)
                        {
                            string prevTime = question.Tables[2].Rows[0][0].ToString();
                            string questionTime = question.Tables[0].Rows[0][4].ToString();
                            question.Tables[0].Rows[0][4] = Convert.ToInt16(questionTime) - Convert.ToInt16(prevTime);
                        }

                        nv.Clear();
                        nv.Add("@quizSubmittedId-int", quizSubmittedId);
                        summary = dl.GetData("sp_GetQuizTestSummary", nv);

                        int seconds = Convert.ToInt16(summary.Tables[0].Rows[0]["TimeTaken"].ToString());
                        TimeSpan ts = TimeSpan.FromSeconds(seconds);
                        string minutes = ts.Minutes + " minutes " + ts.Seconds + " seconds";

                        summary.Tables[0].Rows[0]["TimeTaken"] = minutes;

                        
                        if (question.Tables[0].Rows.Count > 0)
                        {
                            if (questionIds.Tables[0].Rows.Count == 1)
                            {
                                returnString = "[[{\"IsLastQuestion\": \"Yes\"}]" + "," + "[{\"TotalQuestions\": " + totalQuestions + "}]" + "," + "[{\"QNo\": " + counter + "}]" + "," + question.Tables[0].ToJsonString() + "," + question.Tables[1].ToJsonString() + "," + summary.Tables[0].ToJsonString() + "]";
                            }
                            else
                            {
                                returnString = "[[{\"IsLastQuestion\": \"No\"}]" + "," + "[{\"TotalQuestions\": " + totalQuestions + "}]" + "," + "[{\"QNo\": " + counter + "}]" + "," + question.Tables[0].ToJsonString() + "," + question.Tables[1].ToJsonString() + "," + summary.Tables[0].ToJsonString() + "]";
                            }
                        }
                        else
                        {
                            returnString = "";
                        }
                    }
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
        public string SaveAndGetNextQuizTestQuestion(string formId, string assignedFormId, string questionId, string questionType, string answer, string timeTaken, string currentQuestionNumber)
        {
            string returnString = "";

            try
            {
                // save data
                var employeeid = Session["CurrentUserId"].ToString();
                string isAnswersCorrect = "0";

                nv.Clear();
                nv.Add("@formId-int", formId);
                nv.Add("@empid-bigint", employeeid);
                DataSet quizsubmitted = dl.GetData("sp_CheckQuizTestSubmitted", nv);

                DataSet summary = new DataSet();

                if (quizsubmitted.Tables[0].Rows[0]["ID"].ToString() != "")
                {
                    quizSubmittedId = quizsubmitted.Tables[0].Rows[0]["ID"].ToString();

                    DataSet updatequizsubmitted = new DataSet();

                    string AnswerPoints = "0";

                    // if no answer then save as unanswered question
                    if (answer == "" || answer == null)
                    {
                        nv.Clear();
                        nv.Add("@quizSubmittedId-int", quizSubmittedId);
                        nv.Add("@questionId-int", questionId);
                        nv.Add("@type-varchar(10)", "");
                        DataSet deletans = dl.GetData("sp_DeleteQuizTestAnswers", nv);


                        nv.Clear();
                        nv.Add("@quizSubmittedId-int", quizSubmittedId);
                        nv.Add("@questionId-int", questionId);
                        nv.Add("@answerId-int", "NULL");
                        //nv.Add("@answerPoints-int", AnswerPoints);
                        nv.Add("@timeTaken-int", timeTaken);
                        nv.Add("@isUnAnswered-bit", "1");
                        nv.Add("@isAnswersCorrect-varchar(10)", "w");
                        DataSet ds = dl.GetData("sp_SaveQuizTestQuestionAnswers", nv);


                        // update time and score
                        nv.Clear();
                        nv.Add("@quizSubmittedId-int", quizSubmittedId);
                        nv.Add("@timeTaken-int", timeTaken);
                        nv.Add("@score-int", AnswerPoints);
                        updatequizsubmitted = dl.GetData("sp_UpdateQuizTestSubmitted", nv);
                    }
                    else
                    {
                        // save answer of question
                        bool isWrongAnswerChecked = false;

                        string[] quizanswers = answer.Split(',');
                        for (int i = 0; i < quizanswers.Length; i++)
                        {
                            // for radio button answer
                            if (questionType == "rb" || questionType == "blank")
                            {
                                // for checkbox answer
                                nv.Clear();
                                nv.Add("@questionId-int", questionId);
                                nv.Add("@answerId-int", quizanswers[i]);
                                DataSet questionPoint = dl.GetData("sp_CheckIfQuizAnswersIsCorrect", nv);
                                if (questionPoint.Tables[0].Rows.Count > 0)
                                {
                                    AnswerPoints = questionPoint.Tables[0].Rows[0][0].ToString();
                                    isAnswersCorrect = "r";
                                }
                                else
                                {
                                    AnswerPoints = "0";
                                    isAnswersCorrect = "w";
                                }

                                nv.Clear();
                                nv.Add("@quizSubmittedId-int", quizSubmittedId);
                                nv.Add("@questionId-int", questionId);
                                nv.Add("@type-varchar(10)", "rb");
                                DataSet deletans = dl.GetData("sp_DeleteQuizTestAnswers", nv);


                                nv.Clear();
                                nv.Add("@quizSubmittedId-int", quizSubmittedId);
                                nv.Add("@questionId-int", questionId);
                                nv.Add("@answerId-int", quizanswers[i]);
                                //nv.Add("@answerPoints-int", AnswerPoints);
                                nv.Add("@timeTaken-int", timeTaken);
                                nv.Add("@isUnAnswered-int", "0");
                                nv.Add("@isAnswersCorrect-varchar(10)", isAnswersCorrect);
                                DataSet ds = dl.GetData("sp_SaveQuizTestQuestionAnswers", nv);


                                // update time and score
                                nv.Clear();
                                nv.Add("@quizSubmittedId-int", quizSubmittedId);
                                nv.Add("@timeTaken-int", timeTaken);
                                nv.Add("@score-int", AnswerPoints);
                                updatequizsubmitted = dl.GetData("sp_UpdateQuizTestSubmitted", nv);

                            }

                            // for checkbox answer, check if user has selected any wrong option
                            if (questionType == "cb")
                            {
                                nv.Clear();
                                nv.Add("@questionId-int", questionId);
                                nv.Add("@answerId-int", quizanswers[i]);
                                DataSet questionPoint = dl.GetData("sp_CheckIfQuizAnswersIsWrong", nv);
                                if (questionPoint.Tables[0].Rows.Count > 0)
                                {
                                    // check if wrong option is selected
                                    if (questionPoint.Tables[0].Rows[0][2].ToString() == "False")
                                    {
                                        // yes, wrong option is selected
                                        isWrongAnswerChecked = true;
                                        isAnswersCorrect = "w";
                                    }
                                    else
                                    {
                                        AnswerPoints = questionPoint.Tables[0].Rows[0][0].ToString();
                                        isAnswersCorrect = "r";
                                    }
                                }

                                nv.Clear();
                                nv.Add("@quizSubmittedId-int", quizSubmittedId);
                                nv.Add("@questionId-int", questionId);
                                nv.Add("@type-varchar(10)", "cb");
                                DataSet deletans = dl.GetData("sp_DeleteQuizTestAnswers", nv);

                                nv.Clear();
                                nv.Add("@quizSubmittedId-int", quizSubmittedId);
                                nv.Add("@questionId-int", questionId);
                                nv.Add("@answerId-int", quizanswers[i]);
                                //nv.Add("@answerPoints-int", (isWrongAnswerChecked == true ? "0" : AnswerPoints));
                                nv.Add("@timeTaken-int", timeTaken);
                                nv.Add("@isUnAnswered-int", "0");
                                nv.Add("@isAnswersCorrect-varchar(10)", isAnswersCorrect);
                                DataSet ds = dl.GetData("sp_SaveQuizTestQuestionAnswers", nv);

                            }
                        }
                        if (questionType == "cb")
                        {
                            // update time and score for checkbox type
                            nv.Clear();
                            nv.Add("@quizSubmittedId-int", quizSubmittedId);
                            nv.Add("@timeTaken-int", timeTaken);
                            nv.Add("@score-int", (isWrongAnswerChecked == true ? "0" : AnswerPoints));
                            updatequizsubmitted = dl.GetData("sp_UpdateQuizTestSubmitted", nv);
                        }
                    }


                    nv.Clear();
                    nv.Add("@questionId-int", questionId);
                    DataSet getRightWrongAnswers = dl.GetData("sp_GetQuizTestRightWrongAnswers", nv);

                    if (getRightWrongAnswers.Tables[0].Rows.Count > 0)
                    {
                        // get summary
                        nv.Clear();
                        nv.Add("@quizSubmittedId-int", quizSubmittedId);

                        summary = dl.GetData("sp_GetQuizTestSummary", nv);

                        int seconds = Convert.ToInt16(summary.Tables[0].Rows[0]["TimeTaken"].ToString());
                        TimeSpan ts = TimeSpan.FromSeconds(seconds);
                        string minutes = ts.Minutes + " minutes " + ts.Seconds + " seconds";

                        summary.Tables[0].Rows[0]["TimeTaken"] = minutes;


                        returnString = "[" + getRightWrongAnswers.Tables[0].ToJsonString() + "," + summary.Tables[0].ToJsonString() + "]";
                    }

                    #region old get next question code here

                    #endregion
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
        public string GetNextQuestion(string formId, string assignedFormId, string currentQuestionNumber)
        {
            string returnString = "";

            if (Session["CurrentUserId"] != null)
            {
                var employeeid = Session["CurrentUserId"].ToString();


                DataSet summary = new DataSet();

                DataSet updatequizsubmitted = new DataSet();

                // get next question ids
                int counter = Convert.ToInt16(currentQuestionNumber) + 1;


                nv.Clear();
                nv.Add("@formId-int", formId);
                nv.Add("@empid-bigint", employeeid);
                DataSet quizsubmitted = dl.GetData("sp_CheckQuizTestSubmitted", nv);

                quizSubmittedId = quizsubmitted.Tables[0].Rows[0][0].ToString();

                nv.Clear();
                nv.Add("@formId-int", formId);
                nv.Add("@quizSubmittedId-int", quizSubmittedId);
                nv.Add("@assignedID-int", assignedFormId);
                DataSet questionIds = dl.GetData("sp_GetQuizTestQuestionIds", nv);

                //if no more questions then show summary with grading, else show next question
                if (questionIds.Tables[0].Rows.Count == 0)
                {
                    returnString = SaveQuizTestAndShowSummary(formId, quizSubmittedId, assignedFormId);
                }
                else
                {
                    int totalAssignedQuestions = Convert.ToInt16(questionIds.Tables[0].Rows[0]["totalQuestionCount"].ToString());

                    for (int i = 0; i < questionIds.Tables[0].Rows.Count; i++)
                    {
                        qIds.Add(questionIds.Tables[0].Rows[i]["QuestionId"].ToString());
                    }

                    string totalQuestions = questionIds.Tables[0].Rows[0]["totalQuestionCount"].ToString();


                    int r = rnd.Next(qIds.Count);

                    string currentQuestionId = qIds[r];


                    // get next question
                    nv.Clear();
                    nv.Add("@questionId-int", currentQuestionId);
                    nv.Add("@quizSubmittedId-int", quizSubmittedId);
                    DataSet question = dl.GetData("sp_GetQuizTestQuestion", nv);

                    if (question.Tables[2].Rows.Count > 0)
                    {
                        string prevTime = question.Tables[2].Rows[0][0].ToString();
                        string questionTime = question.Tables[0].Rows[0][4].ToString();
                        question.Tables[0].Rows[0][4] = Convert.ToInt16(questionTime) - Convert.ToInt16(prevTime);
                    }

                    nv.Clear();
                    nv.Add("@quizSubmittedId-int", quizSubmittedId);
                    summary = dl.GetData("sp_GetQuizTestSummary", nv);

                    int seconds = Convert.ToInt16(summary.Tables[0].Rows[0]["TimeTaken"].ToString());
                    TimeSpan ts = TimeSpan.FromSeconds(seconds);
                    string minutes = ts.Minutes + " minutes " + ts.Seconds + " seconds";

                    summary.Tables[0].Rows[0]["TimeTaken"] = minutes;

                    if (question.Tables[0].Rows.Count > 0)
                    {
                        // if it is last question the show finish button
                        if (questionIds.Tables[0].Rows.Count == 1)
                        {
                            returnString = "[[{\"IsLastQuestion\": \"Yes\"}]" + "," + "[{\"TotalQuestions\": " + totalQuestions + "}]" + "," + "[{\"QNo\": " + counter + "}]" + "," + question.Tables[0].ToJsonString() + "," + question.Tables[1].ToJsonString() + "," + summary.Tables[0].ToJsonString() + "]";
                        }
                        else
                        {
                            returnString = "[[{\"IsLastQuestion\": \"No\"}]" + "," + "[{\"TotalQuestions\": " + totalQuestions + "}]" + "," + "[{\"QNo\": " + counter + "}]" + "," + question.Tables[0].ToJsonString() + "," + question.Tables[1].ToJsonString() + "," + summary.Tables[0].ToJsonString() + "]";
                        }
                    }
                    else
                    {
                        returnString = "";
                    }
                }

                return returnString;
            }
            else
            {
                return "NoSession";
            }
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string SaveQuizTestAndShowSummary(string formId, string quizSubmittedId, string assignedFormId)
        {
            string returnString = "";
            var employeeid = Session["CurrentUserId"].ToString();

            DataSet isattemptday = new DataSet();

            nv.Clear();
            nv.Add("@formId-int", formId);
            nv.Add("@quizSubmittedId-int", quizSubmittedId);
            nv.Add("@employeeid-int", employeeid);
            nv.Add("@assignedFormId-int", assignedFormId);
            DataSet FullSummary = dl.GetData("sp_QuizTestShowSummary", nv);

            //new work attempt quiz
            nv.Clear();
            nv.Add("@AssignedFormId-int", assignedFormId);
            nv.Add("@EmpId-bigint", employeeid);
            nv.Add("@QuizTestId-int", formId);
            isattemptday = dl.GetData("sp_CheckQuizTestIfAlreadyAttempted", nv);
            
            string isTodayAttemptDay = "No";
            string attemptDate = "";

            if (isattemptday.Tables[1].Rows.Count > 0)
            {
                isTodayAttemptDay = "Yes";
                //attemptDate = isattemptday.Tables[1].Rows[0]["FinalAttemptDate"].ToString();

            }
            else
            {
                if (isattemptday.Tables[2].Rows.Count > 0)
                {
                    attemptDate = isattemptday.Tables[2].Rows[0]["FinalAttemptDate"].ToString();
                    isTodayAttemptDay = "No";
                }                
            }

            // assign again 
            AssignQuizTest(formId, employeeid, "20", attemptDate, isTodayAttemptDay);

            if (FullSummary != null && FullSummary.Tables[0].Rows.Count > 0)
            {
                int seconds = Convert.ToInt16(FullSummary.Tables[0].Rows[0]["TimeTaken"].ToString());
                TimeSpan ts = TimeSpan.FromSeconds(seconds);
                string minutes = ts.Minutes + " minutes " + ts.Seconds + " seconds";

                FullSummary.Tables[0].Rows[0]["TimeTaken"] = minutes;

                returnString = "[" + FullSummary.Tables[0].ToJsonString() + "," + FullSummary.Tables[1].ToJsonString() + "]";

            }

            return returnString;
        }




        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ShowQuizTestSummary(string quizSubmittedId, string formId, string formScore)
        {
            string returnString = "";
            var employeeid = Session["CurrentUserId"].ToString();

            nv.Clear();
            nv.Add("@quizSubmittedId-int", quizSubmittedId);
            nv.Add("@formId-int", formId);
            nv.Add("@formScore-int", formScore);
            DataSet FullSummary = dl.GetData("sp_ShowQuizTestSummary", nv);

            int seconds = Convert.ToInt16(FullSummary.Tables[0].Rows[0]["TimeTaken"].ToString());
            TimeSpan ts = TimeSpan.FromSeconds(seconds);
            string minutes = ts.Minutes + " minutes " + ts.Seconds + " seconds";

            FullSummary.Tables[0].Rows[0]["TimeTaken"] = minutes;


            returnString = "[" + FullSummary.Tables[0].ToJsonString() + "," + FullSummary.Tables[1].ToJsonString() + "]";

            return returnString;
        }



        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string StoreDetails(string currentQuestionTime, string quizSubmittedId, string currentQuestionId)
        {

            var employeeid = Session["CurrentUserId"].ToString();

            nv.Clear();
            nv.Add("@currentQuestionTime-int", currentQuestionTime);
            nv.Add("@quizSubmittedId-int", quizSubmittedId);
            nv.Add("@currentQuestionId-int", currentQuestionId);
            DataSet savedetails = dl.GetData("sp_SaveQuizTestTime", nv);

            return "Saved";
        }

        #endregion



        #region Quiz test Manage FTM Accounts

        // Get all quiz tests
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string FillFTMsGrid()
        {
            string returnString = "";

            try
            {
                nv.Clear();
                DataSet ds = dl.GetData("sp_QuizTestFillAllFTMsGrid", null);
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
        public string ViewRegions(string ftmid)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@ftmid-int)", ftmid);
                DataSet ds = dl.GetData("sp_QuizTestViewRegions", nv);
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
        public string GetAllNationals()
        {
            string returnString = "";

            try
            {
                nv.Clear();
                DataSet ds = dl.GetData("sp_QuizTestGetAllNationals", null);
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
        public string GetAllRegions()
        {
            string returnString = "";

            try
            {
                nv.Clear();
                DataSet ds = dl.GetData("sp_QuizTestGetAllRegions", null);
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
        public string GetAllRegionsByNationalId(string id)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@nationalId-int)", id);
                DataSet ds = dl.GetData("sp_QuizTestGetAllRegionsByNationalId", nv);
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
        public string SaveRegion(string ftmid, string nationalid, string regionId)
        {
            string returnString = "";

            try
            {
                var regionIds = regionId.Split(',');
                for (int i = 0; i < regionIds.Length; i++)
                {
                    nv.Clear();
                    nv.Add("@ftmid-int", ftmid);
                    nv.Add("@nationalid-int", nationalid);
                    nv.Add("@regionid-int", regionIds[i]);
                    DataSet ds = dl.GetData("sp_QuizTestSaveRegion", nv);
                    if (ds != null)
                    {
                        if (ds.Tables[0].Rows.Count > 0)
                        {
                            returnString = "Saved";
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


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DeleteRegion(string id)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@id-int)", id);
                DataSet ds = dl.GetData("sp_QuizTestDeleteRegions", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count == 0)
                    {
                        returnString = "Deleted";
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
        public string SetHierarchyForFTM()
        {
            string returnString = "";

            if (Session["CurrentUserRole"].ToString().ToLower() == "ftm")
            {
                try
                {
                    var ftmid = Session["CurrentUserId"].ToString();

                    nv.Clear();
                    nv.Add("@ftmid-int)", ftmid);
                    DataSet ds = dl.GetData("sp_QuizTestViewRegions", nv);
                    if (ds != null)
                    {
                        if (ds.Tables[0].Rows.Count > 0)
                        {
                            returnString = "[" + ds.Tables[0].ToJsonString() + "," + ds.Tables[1].ToJsonString() + "," + ds.Tables[2].ToJsonString() + "," + ds.Tables[3].ToJsonString() + "," + ds.Tables[4].ToJsonString() + "]";
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
            }
            
            return returnString;
        }


        #endregion
    }
}
