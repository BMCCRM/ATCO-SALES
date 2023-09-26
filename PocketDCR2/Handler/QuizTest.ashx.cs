using OfficeOpenXml;
using PocketDCR2.Classes;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;

namespace PocketDCR2.Handler
{

    /// <summary>
    /// Summary description for QuizTest
    /// </summary>
    /// 
    public class QuizTest : IHttpHandler
    {

        #region Object Intialization

        NameValueCollection _nv = new NameValueCollection();
        DAL DL = new DAL();
        string employeeid = string.Empty;
        int EmployeeId = 0;
        string formId = "";

        #endregion


        public void ProcessRequest(HttpContext context)
        {
            string FileName = "QuizQuestionAnswers";

            string type = context.Request.QueryString["Type"];
            formId = context.Request.QueryString["Id"];

            _nv.Clear();
            if (type == "D")
            {
                #region Download Work

                DataSet questionsExport = new DataSet();

                _nv.Clear();
                _nv.Add("@formId-int", formId);
                questionsExport = GetData("sp_SelectQuizTestQuestionForExport", _nv);

                MemoryStream ms = DataTableToExcelXlsx(questionsExport);

                ms.WriteTo(context.Response.OutputStream);
                context.Response.ContentType = "application/vnd.ms-excel";
                context.Response.AddHeader("Content-Disposition", "attachment;filename=" + FileName.Replace(" ", string.Empty).Trim() + ".xlsx");
                context.Response.StatusCode = 200;
                context.Response.End();

                #endregion
            }
            else if (type == "U")
            {
                UploadExcel(context);
            }
            else if (type == "PF")
            {
                ReadExcel(context);
            }
        }


        #region Export Master Questions and Answers to Excel

        private static MemoryStream DataTableToExcelXlsx(DataSet dt)
        {
            MemoryStream Result = new MemoryStream();
            ExcelPackage pack = new ExcelPackage();

            #region questions sheet

            ExcelWorksheet ques = pack.Workbook.Worksheets.Add("Questions");

            ques.Cells[1, 2].Style.Font.Bold = true;
            ques.Cells[1, 2].Value = "NOTE: FLAG N = New Question; U = Update Question; D = Delete Question; C = Continue; (Flag must be provided, Otherwise System will not accept the record)";

            ques.Cells[2, 2].Style.Font.Bold = true;
            ques.Cells[2, 2].Value = "Question types: rb = (single selection) and cb = (multiple selection). TimeIn = Enter 'Minutes' or 'Seconds'";
            
            ques.Cells[3, 2].Style.Font.Bold = true;
            ques.Cells[3, 2].Value = "Leave Q.Score column empty if you have selected Default Score option OR Write Score value in Q.Score column for Individual Score.";

            ques.Cells["B1:O1"].Merge = true;
            
            ques.Column(1).Hidden = true;

            ques.Cells[5, 1].Style.Font.Bold = true;
            ques.Cells[5, 2].Style.Font.Bold = true;
            ques.Cells[5, 3].Style.Font.Bold = true;
            ques.Cells[5, 4].Style.Font.Bold = true;
            ques.Cells[5, 5].Style.Font.Bold = true;
            ques.Cells[5, 6].Style.Font.Bold = true;
            ques.Cells[5, 7].Style.Font.Bold = true;
            //ques.Cells[5, 8].Style.Font.Bold = true;
            //ques.Cells[5, 9].Style.Font.Bold = true;


            ques.Cells[5, 1].Value = "Q.PkID:";
            ques.Cells[5, 2].Value = "Q.Code:";
            ques.Cells[5, 3].Value = "Question";
            ques.Cells[5, 4].Value = "Q.Type";
            ques.Cells[5, 5].Value = "Q.Time";
            //ques.Cells[5, 6].Value = "Time In";
            ques.Cells[5, 6].Value = "Q.Score";
            //ques.Cells[5, 8].Value = "DefaultScoreValue";
            ques.Cells[5, 7].Value = "Flag";

            int col = 1;
            int row = 6;
            foreach (DataRow rw in dt.Tables[0].Rows)
            {
                foreach (DataColumn cl in dt.Tables[0].Columns)
                {
                    if (rw[cl.ColumnName] != DBNull.Value)
                    {
                        ques.Cells[row, col].Value = rw[cl.ColumnName].ToString();
                        col++;
                    }
                }
                ques.Cells[row, 7].Value = "C";
                row++;
                col = 1;
            }

            #endregion

            #region answers sheet

            ExcelWorksheet ans = pack.Workbook.Worksheets.Add("Answers");
            ans.Cells[1, 2].Style.Font.Bold = true;
            ans.Cells[1, 2].Value = "NOTE: FLAG N = New Question; U = Update Question; D = Delete Question; C = Continue; (Flag must be provided, Otherwise System will not accept the record";

            ans.Cells[2, 2].Style.Font.Bold = true;
            ans.Cells[2, 2].Value = "Write True or False for Correct or Incorrect answer";

            ans.Cells["B1:O1"].Merge = true;

            ans.Column(1).Hidden = true;

            ans.Cells[4, 1].Style.Font.Bold = true;
            ans.Cells[4, 2].Style.Font.Bold = true;
            ans.Cells[4, 3].Style.Font.Bold = true;
            ans.Cells[4, 4].Style.Font.Bold = true;
            ans.Cells[4, 5].Style.Font.Bold = true;

            ans.Cells[4, 1].Value = "APkID:";
            ans.Cells[4, 2].Value = "QCode:";
            ans.Cells[4, 3].Value = "Answer";
            ans.Cells[4, 4].Value = "IsCorrect";
            ans.Cells[4, 5].Value = "Flag";

            int anscol = 1;
            int ansrow = 5;
            foreach (DataRow rw in dt.Tables[1].Rows)
            {
                foreach (DataColumn cl in dt.Tables[1].Columns)
                {
                    if (rw[cl.ColumnName] != DBNull.Value)
                    {
                        ans.Cells[ansrow, anscol].Value = rw[cl.ColumnName].ToString();
                        anscol++;
                    }
                }
                ans.Cells[ansrow, 5].Value = "C";
                ansrow++;
                anscol = 1;
            }

            #endregion


            pack.SaveAs(Result);
            return Result;
        }

        #endregion



        #region GetData

        public System.Data.DataSet GetData(String SpName, NameValueCollection NV)
        {
            var connection = new SqlConnection();
            string dbTyper = "";
            try
            {
                connection.ConnectionString = Classes.Constants.GetConnectionString();
                var dataSet = new System.Data.DataSet();
                connection.Open();
                var command = new SqlCommand();
                command.CommandType = CommandType.StoredProcedure;
                command.Connection = connection;
                command.CommandText = SpName;
                command.CommandTimeout = 20000;
                if (NV != null)
                {
                    //New code implemented for retrieving data
                    for (int i = 0; i < NV.Count; i++)
                    {
                        string[] arraySplit = NV.Keys[i].Split('-');

                        if (arraySplit.Length > 2)
                        {
                            dbTyper = "SqlDbType." + arraySplit[1].ToString() + "," + arraySplit[2].ToString();

                            if (NV[i].ToString() == "NULL")
                            {
                                command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = DBNull.Value;
                            }
                            else
                            {
                                command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = NV[i].ToString();
                            }
                        }
                        else
                        {
                            dbTyper = "SqlDbType." + arraySplit[1].ToString();

                            if (NV[i].ToString() == "NULL")
                            {
                                command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = DBNull.Value;
                            }
                            else
                            {
                                command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = NV[i].ToString();
                            }
                        }
                    }
                }

                var dataAdapter = new SqlDataAdapter();
                dataAdapter.SelectCommand = command;
                dataAdapter.Fill(dataSet);

                return dataSet;
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
                return null;
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                {
                    connection.Close();
                }
            }
        }

        #endregion



        #region Upload Master List Doctor


        private void UploadExcel(HttpContext contxt)
        {
            DateTime Date = DateTime.Now;

            contxt.Response.ContentType = "text/plain";
            contxt.Response.Expires = -1;
            try
            {
                HttpPostedFile postedFile = contxt.Request.Files["Filedata"];
                string savepath = "";
                string tempPath = "";
                tempPath = @ConfigurationManager.AppSettings["Excel"].ToString();
                savepath = tempPath;
                string filenamewithoutextension = System.IO.Path.GetFileNameWithoutExtension(postedFile.FileName);
                string extension = System.IO.Path.GetExtension(postedFile.FileName);
                string filename = filenamewithoutextension + "_" + Date.ToString("dd-MM-yyyyHHmmss") + extension;
                if (!Directory.Exists(savepath))
                    Directory.CreateDirectory(savepath);
                postedFile.SaveAs(savepath + @"\" + filename);
                contxt.Response.Write(tempPath + @"\" + filename);
                contxt.Response.StatusCode = 200;

            }
            catch (Exception ex)
            {
                contxt.Response.Write("Error: " + ex.Message);
                contxt.Response.StatusCode = 400;
            }
        }


        private void ReadExcel(HttpContext contxt)
        {
            string result = string.Empty;
            try
            {
                string savepath = "";
                string tempPath = "";
                tempPath = ConfigurationManager.AppSettings["Excel"].ToString();
                savepath = tempPath;
                string FileNameWithPath = contxt.Request.QueryString["FileName"];
                string frmid = contxt.Request.QueryString["FormId"];
                string timeIn = contxt.Request.QueryString["TimeIn"];
                string isOneTimeScore = contxt.Request.QueryString["IsOneTimeScore"];
                string defaultScore = contxt.Request.QueryString["DefaultScore"];
                ReadExcelFile(FileNameWithPath, frmid, timeIn, isOneTimeScore, defaultScore);
                result = "Your File Has been Processed Successfully";
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }
            contxt.Response.Write(result);
        }


        private void ReadExcelFile(string FileNameWithPath, string quizFormId, string timeIn, string isOneTimeScore, string defaultScore)
        {
             OleDbConnection con = new OleDbConnection();

            string part1 = "Provider=Microsoft.ACE.OLEDB.12.0;";
            string part2 = @"Data Source=" + FileNameWithPath + ";";
            string part3 = "Extended Properties='Excel 12.0;HDR=YES;'";
            string connectionString = part1 + part2 + part3;
            con.ConnectionString = connectionString;
            FileInfo FIforexcel = new FileInfo(FileNameWithPath);
            ExcelPackage Ep = new ExcelPackage(FIforexcel);


            OleDbCommand questionSheet = new OleDbCommand("Select * from [" + Ep.Workbook.Worksheets.Where(w => w.Name == "Questions").FirstOrDefault() + "$]", con);
            OleDbDataAdapter quesadapter = new OleDbDataAdapter(questionSheet);

            OleDbCommand answerSheet = new OleDbCommand("Select * from [" + Ep.Workbook.Worksheets.Where(w => w.Name == "Answers").FirstOrDefault() + "$]", con);
            OleDbDataAdapter ansadapter = new OleDbDataAdapter(answerSheet);

            con.Open();

            DataSet questionsDataSet = new DataSet();
            quesadapter.Fill(questionsDataSet);

            DataSet answerDataSet = new DataSet();
            ansadapter.Fill(answerDataSet);

            con.Close();

            if (questionsDataSet != null && answerDataSet != null)

                if (questionsDataSet.Tables[0].Rows.Count > 0)
                {
                    FileInfo FI = new FileInfo(FileNameWithPath);
                    string qid = "";

                    for (int i = 4; i < questionsDataSet.Tables[0].Rows.Count; i++)
                    {
                        DataRow qs = questionsDataSet.Tables[0].Rows[i];

                        string quesId = qs[0].ToString();

                        int questionId = 0;

                        if (quesId != string.Empty)
                        {
                            try { questionId = Convert.ToInt32(qs[0].ToString()); }
                            catch (Exception e) { questionId = 0; }
                        }
                        else
                        {
                            questionId = 0;
                        }

                        string QPkid = qs[0].ToString();
                        string QCode = qs[1].ToString();
                        string Question = qs[2].ToString();
                        string Type = qs[3].ToString();

                        string Time = "";

                        if (timeIn == "Minutes")
                            Time = (qs[4].ToString() == "" ? 0 : Convert.ToInt16(qs[4].ToString()) * 60).ToString();
                        else
                            Time = qs[4].ToString();

                        string Points = "";

                        if (isOneTimeScore == "IndividualScore")
                            Points = qs[5].ToString();
                        else
                            Points = defaultScore;

                        string qFlag = qs[6].ToString();

                        if (qFlag != "")
                        {
                            _nv.Clear();
                            _nv.Add("@formId-INT", quizFormId);
                            _nv.Add("@QPkid-INT", QPkid);
                            _nv.Add("@QCode-VARCHAR-150", QCode);
                            _nv.Add("@Question-VARCHAR-1000", Question);
                            _nv.Add("@Type-VARCHAR-50", Type);
                            _nv.Add("@Time-INT", Time);
                            _nv.Add("@Points-INT", Points);
                            _nv.Add("@Flag-VARCHAR-50", qFlag);

                            DataSet quesDs = GetData("AddXLXQuizTestQuestionsList", _nv);

                            if (quesDs != null && quesDs.Tables.Count > 0)
                                if (quesDs.Tables[0].Rows.Count > 0)
                                {
                                    qid = quesDs.Tables[0].Rows[0][0].ToString();
                                    for (int count = 3; count < answerDataSet.Tables[0].Rows.Count; count++)
                                    {
                                        DataRow ans = answerDataSet.Tables[0].Rows[count];
                                        string ansId = ans[0].ToString();
                                        int answerId = 0;
                                        if (ansId != string.Empty)
                                        {
                                            try { answerId = Convert.ToInt32(ans[0].ToString()); }
                                            catch (Exception e) { answerId = 0; }
                                        }
                                        else
                                        {
                                            answerId = 0;
                                        }

                                        string APkid = ans[0].ToString();
                                        string AnsQCode = ans[1].ToString();
                                        string Answer = ans[2].ToString();
                                        string IsCorrect = ans[3].ToString();
                                        string aFlag = ans[4].ToString();
                                        
                                        if (aFlag != "" && AnsQCode == QCode)
                                        {
                                            _nv.Clear();
                                            _nv.Add("@formId-INT", quizFormId);
                                            _nv.Add("@QCode-VARCHAR-150", AnsQCode);
                                            _nv.Add("@questionId-INT", qid.ToString());
                                            _nv.Add("@answerId-INT", APkid.ToString());
                                            _nv.Add("@Answer-VARCHAR-500", Answer.ToString());
                                            _nv.Add("@isCorrect-bit", (IsCorrect.ToLower() == "true" ? "1" : "0"));
                                            _nv.Add("@Flag-VARCHAR-50", aFlag.ToString());

                                            DataSet ansDs = GetData("AddXLXQuizTestQuestionsAnswersList", _nv);

                                            if (ansDs != null && ansDs.Tables.Count > 0)
                                                if (ansDs.Tables[0].Rows.Count > 0)
                                                {
                                                    //reslt = ansDs.Tables[0].Rows[0][0].ToString();
                                                }
                                        }
                                    }
                                }
                        }
                    }
                }
        }



        #endregion

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

    }
}