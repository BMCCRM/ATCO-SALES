using System;
using System.Linq;
using System.Web.Script.Services;
using System.Web.Services;
using DatabaseLayer.SQL;
using System.Web.Script.Serialization;
using PocketDCR2.Classes;
using System.Data.SqlClient;
using System.Collections.Specialized;
using System.Globalization;
using System.Data;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for MonthlyExpenseReport1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class MonthlyExpenseReport1 : System.Web.Services.WebService
    {

        #region Public Member

        JavaScriptSerializer _jss = new JavaScriptSerializer();
        public DataSet GetData(String spName, NameValueCollection nv)
        {
            #region Initialization

            var connection = new SqlConnection();
            string dbTyper = "";

            #endregion

            try
            {
                #region Open Connection

                connection.ConnectionString = Constants.GetConnectionString();
                var dataSet = new DataSet();
                connection.Open();




                #endregion

                #region Get Store Procedure and Start Processing

                var command = new SqlCommand();
                command.CommandType = CommandType.StoredProcedure;
                command.Connection = connection;
                command.CommandText = spName;
                command.CommandTimeout = 20000;


                if (nv != null)
                {
                    #region Retreiving Data

                    for (int i = 0; i < nv.Count; i++)
                    {
                        string[] arraysplit = nv.Keys[i].Split('-');

                        if (arraysplit.Length > 2)
                        {
                            #region Code For Data Type Length

                            dbTyper = "SqlDbType." + arraysplit[1].ToString() + "," + arraysplit[2].ToString();

                            // command.Parameters.AddWithValue(arraysplit[0].ToString(), dbTyper).Value = nv[i].ToString();



                            if (nv[i].ToString() == "NULL")
                            {
                                command.Parameters.AddWithValue(arraysplit[0].ToString(), dbTyper).Value = DBNull.Value;

                            }
                            else
                            {
                                command.Parameters.AddWithValue(arraysplit[0].ToString(), dbTyper).Value = nv[i].ToString();

                            }


                            #endregion
                        }
                        else
                        {
                            #region Code For Int Values
                            dbTyper = "SqlDbType." + arraysplit[1].ToString();
                            // command.Parameters.AddWithValue(arraysplit[0].ToString(), dbTyper).Value = nv[i].ToString();

                            if (nv[i].ToString() == "NULL")
                            {
                                command.Parameters.AddWithValue(arraysplit[0].ToString(), dbTyper).Value = DBNull.Value;

                            }
                            else
                            {
                                command.Parameters.AddWithValue(arraysplit[0].ToString(), dbTyper).Value = nv[i].ToString();

                            }


                            #endregion
                        }
                    }

                    #endregion
                }

                #endregion

                #region Return DataSet

                var dataAdapter = new SqlDataAdapter();
                dataAdapter.SelectCommand = command;
                dataAdapter.Fill(dataSet);

                return dataSet;

                #endregion
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
                throw;
                //return null;
            }
            finally
            {
                #region Close Connection

                if (connection.State == ConnectionState.Open)
                {
                    connection.Close();
                }

                #endregion
            }
        }
        NameValueCollection nv = new NameValueCollection();
        #endregion

        #region Public Functions

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertMonthlyExpense(string ExpenseMonth)
        {
            string returnString = "";

            try
            {
                DateTime ExpenseMonthDate = DateTime.ParseExact(ExpenseMonth, "MMMM-yyyy",
                                 CultureInfo.InvariantCulture);

                nv.Clear();
                nv.Add("@EmployeeID-int", Session["CurrentUserId"].ToString());
                nv.Add("@ExpenseDateTime-datetime", ExpenseMonthDate.ToString());
                var data = GetData("sp_getExpensePolicyByDesignationId", nv);
                if (data != null)
                {
                    if (data.Tables[0].Rows.Count != 0)
                    {
                        nv.Clear();
                        nv.Add("@EmployeeID-int", Session["CurrentUserId"].ToString());
                        nv.Add("@ExpenseDateTime-datetime", ExpenseMonthDate.ToString());
                        data = GetData("sp_getExpenseMonthly", nv);
                        if (data != null)
                        {
                            if (data.Tables[0].Rows.Count == 0)
                            {
                                nv.Clear();
                                nv.Add("@EmployeeID-int", Session["CurrentUserId"].ToString());
                                nv.Add("@EmployeeRole-text", Session["CurrentUserRole"].ToString());
                                nv.Add("@ExpenseDateTime-datetime", ExpenseMonthDate.ToString());
                                data = GetData("sp_insertExpenseMonthly", nv);

                                nv.Clear();
                                nv.Add("@SPO-int", Session["CurrentUserId"].ToString());
                                nv.Add("@MessageTitle-varchar(500)", "Expense Notification");
                                data = GetData("InsertNotification", nv);


                                returnString = "OK";
                            }
                            else
                            {
                                returnString = "Report Already Exists";
                            }
                        }
                        else
                        {
                            returnString = "Error";
                        }
                    }
                    else
                    {
                        returnString = "Expense Policy Not Exist";
                    }
                }
                else
                {
                    returnString = "Error";
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod(EnableSession = true)]
        public string SetExpenseApproval(string EmployeeId, string EmployeeExpenseMonthlyId, string LevelName,
            string ApprovalStatus, string ApprovalAmount, string ApprovalComment, string Row)
        {
            string returnstring = string.Empty;
            try
            {
                if (Row == "Single")
                {
                    nv.Clear();
                    nv.Add("@EmpID-INT", EmployeeId.ToString());
                    nv.Add("@EmployeeExpenseMonthlyId-INT", EmployeeExpenseMonthlyId.ToString());
                    nv.Add("@LevelName-varchar(50)", LevelName.ToString());
                    nv.Add("@ApprovalStatus-varchar(50)", ApprovalStatus.ToString());
                    nv.Add("@ApprovalAmount-varchar(50)", ApprovalAmount.ToString());
                    nv.Add("@ApprovalComment-text", ApprovalComment.ToString());
                    var data = GetData("sp_setExpenseApprovalInGridForm", nv);
                    returnstring = data.Tables[0].ToJsonString();
                }
                else
                {
                    for (int a = 0; a <= EmployeeId.Split(',').Length - 1; a++)
                    {
                        nv.Clear();
                        nv.Add("@EmpID-INT", EmployeeId.Split(',')[a].ToString());
                        nv.Add("@EmployeeExpenseMonthlyId-INT", EmployeeExpenseMonthlyId.Split(',')[a].ToString());
                        nv.Add("@LevelName-varchar(50)", LevelName.ToString());
                        nv.Add("@ApprovalStatus-varchar(50)", ApprovalStatus.ToString());
                        nv.Add("@ApprovalAmount-varchar(50)", ApprovalAmount.ToString());
                        nv.Add("@ApprovalComment-text", ApprovalComment.ToString());
                        var data = GetData("sp_setExpenseApprovalInGridForm", nv);
                        returnstring = data.Tables[0].ToJsonString();
                    }
                }
            }
            catch (Exception ex)
            {
                returnstring = ex.Message;
            }
            return returnstring;
        }

        [WebMethod(EnableSession = true)]
        public string SetExpenseReimbursmentApproval(string EmployeeId, string EmployeeExpenseMonthlyId, string LevelName,
            string ApprovalStatus, string ApprovalAmount, string ApprovalComment, string Row)
        {
            string returnstring = string.Empty;
            try
            {
                if (Row == "Single")
                {
                    nv.Clear();
                    nv.Add("@EmpID-INT", EmployeeId.ToString());
                    nv.Add("@EmployeeExpenseMonthlyId-INT", EmployeeExpenseMonthlyId.ToString());
                    nv.Add("@LevelName-varchar(50)", LevelName.ToString());
                    nv.Add("@ApprovalStatus-varchar(50)", ApprovalStatus.ToString());
                    nv.Add("@ApprovalAmount-varchar(50)", ApprovalAmount.ToString());
                    nv.Add("@ApprovalComment-text", ApprovalComment.ToString());
                    var data = GetData("sp_setExpenseReimbursmentApproval", nv);
                    returnstring = data.Tables[0].ToJsonString();
                }
                else
                {
                    for (int a = 0; a <= EmployeeId.Split(',').Length - 1; a++)
                    {
                        nv.Clear();
                        nv.Add("@EmpID-INT", EmployeeId.Split(',')[a].ToString());
                        nv.Add("@EmployeeExpenseMonthlyId-INT", EmployeeExpenseMonthlyId.Split(',')[a].ToString());
                        nv.Add("@LevelName-varchar(50)", LevelName.ToString());
                        nv.Add("@ApprovalStatus-varchar(50)", ApprovalStatus.ToString());
                        nv.Add("@ApprovalAmount-varchar(50)", ApprovalAmount.ToString());
                        nv.Add("@ApprovalComment-text", ApprovalComment.ToString());
                        var data = GetData("sp_setExpenseReimbursmentApproval", nv);
                        returnstring = data.Tables[0].ToJsonString();
                    }
                }
            }
            catch (Exception ex)
            {
                returnstring = ex.Message;
            }
            return returnstring;
        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetMonthlyExpense(int ExpenseMonthlyID)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@ExpenseMonthlyID-int", ExpenseMonthlyID.ToString());
                var data = GetData("sp_getExpenseMonthlyDetail", nv);
                returnString = data.Tables[0].ToJsonString();
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }





        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Dailyallowance()
        {
            //string returnString = "";

            //try
            //{
            string returnString = string.Empty;
                nv.Clear();
                var data = GetData("DelayAlloance", nv);


                if (data != null)
                    if (data.Tables[0].Rows.Count != 0)
                    {
                        returnString = data.Tables[0].Rows[0][0].ToString();
                    }
                return returnString;
                //returnString = data.Tables[0].ToJsonString();
                //data.Tables[0].Rows.ToString();
            }
            //catch (Exception exception)
            //{
            //    returnString = exception.Message;
            //}
            //return returnString;
        //}

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllMonthlyExpense(string level1, string level2, string level3, string level4, string level5, string level6, string TeamID, string flag, string startDate, string endDate, string EmpStatus)
        {
            string returnString = "";
            string EmployeeID = "0";
            try
            {
                nv.Clear();
                nv.Add("@EmployeeID-int", (EmployeeID == "0" ? Session["CurrentUserId"].ToString() : EmployeeID));
                nv.Add("@level1-int", level1);
                nv.Add("@level2-int", level2);
                nv.Add("@level3-int", level3);
                nv.Add("@level4-int", level4);
                nv.Add("@level5-int", level5);
                nv.Add("@level6-int", level6);
                nv.Add("@TeamID-int", TeamID);
                nv.Add("@EmployeeIDFlag-int", Session["CurrentUserId"].ToString());
                nv.Add("@flag-int", flag);
                nv.Add("@SMonth-INT", Convert.ToDateTime(startDate).Month.ToString());
                nv.Add("@EMonth-INT", Convert.ToDateTime(endDate).Month.ToString());
                nv.Add("@Year-INT", Convert.ToDateTime(startDate).Year.ToString());
                nv.Add("@CurrentUserRole-NVARCHAR(25)", Session["CurrentUserRole"].ToString());
                nv.Add("@EmpStatus-NVARCHAR(25)", EmpStatus.ToString());
                var data = GetData("sp_getAllExpenseMonthly_NewFormat_New", nv);

                returnString = data.Tables[0].ToJsonString();
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod(EnableSession = true)]

        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DeleteMonthlyExpense(int MonthlyExpenseId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@ExpenseMonthlyID-int", MonthlyExpenseId.ToString());
                var data = GetData("sp_deleteExpenseMonthly", nv);
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

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GenerateCursorForCurrentDay(int Employeeid, string date)
        {
            string returnString = "";
            DateTime dates = DateTime.Now;
            try
            {
                nv.Clear();
                nv.Add("@Employeeid-int", Employeeid.ToString());
                nv.Add("@Date-int", dates.ToString());
                var data = GetData("sp_ExpenseDailyAndDailyDetailCursor", nv);
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


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string generateExpenseReport(string EmployeeID, string MonthlyExpenseId, string ExpenseMonth)
        {
            try
            {
                DateTime ExpenseMonthDate = DateTime.ParseExact(ExpenseMonth, "MMM-yyyy",
                                 CultureInfo.InvariantCulture);
                #region Initialization of Custom DataTable columns
                var ExpenseReport = new DataTable();
                PocketDCR2.Reports.CrystalReports.XSDDatatable.Dsreports dsr = new PocketDCR2.Reports.CrystalReports.XSDDatatable.Dsreports();
                ExpenseReport = dsr.Tables["ExpenseReportDT"];
                #endregion

                nv.Clear();
                nv.Add("@EmployeeId-int", EmployeeID);
                nv.Add("@StartDate-DateTime", ExpenseMonthDate.ToString());
                DataSet ds = GetData("sp_GenerateExpenseReport", nv);
                DataView dv = new DataView();
                if (ds != null)
                    if (ds.Tables[0].Rows.Count != 0)
                    {
                        ExpenseReport = ds.Tables[0];
                    }

                //CrystalReports.MRDoctors.MRDoctors dpf = new CrystalReports.MRDoctors.MRDoctors();
                //dpf.SetDataSource(dtMrDoctorList);
                Session["ExpenseReportDT"] = ExpenseReport;
                // dpf.Close();

            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From MR Doctor Report Generation | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }

            return "das";
        }

        #endregion
    }
}
