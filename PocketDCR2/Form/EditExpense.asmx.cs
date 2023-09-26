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
    /// Summary description for EditExpense
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class EditExpense : System.Web.Services.WebService
    {
        #region Public Member
        JavaScriptSerializer _jss = new JavaScriptSerializer();
        DAL dl = new DAL();
        NameValueCollection nv = new NameValueCollection();
        #endregion

        #region Public Functions

        [WebMethod]
        public string FilldropdownCity()
        {
            string returnstring = string.Empty;
            try
            {
                nv.Clear();
                var data = dl.GetData("sp_getcitiesforddl", nv);
                returnstring = data.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.Message;
            }
            return returnstring;
        }

        [WebMethod(EnableSession = true)]
        public string FillExpenseGrid(int EmployeeId, int EmployeeExpenseMonthlyId, string ExpenseMonth)
        {
            string returnstring = string.Empty;
            try
            {
                DateTime ExpenseMonthDate = DateTime.ParseExact(ExpenseMonth, "dd-MMM-yyyy",
                                 CultureInfo.InvariantCulture);
                nv.Clear();
                nv.Add("@EmpID-int", EmployeeId.ToString());
                nv.Add("@EmployeeExpenseMonthlyId-int", EmployeeExpenseMonthlyId.ToString());
                nv.Add("@StartDate-datetime", ExpenseMonthDate.ToString("yyyy-MM-dd"));
                //2017-05-01
                var data = dl.GetData("sp_GetMonthlyExpenseDetail", nv);
                returnstring = data.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.Message;
            }
            return returnstring;
        }

        [WebMethod(EnableSession = true)]
        public string FillDailyExpenseDetails(int EmployeeId, int EmployeeExpenseMonthlyId, int EmployeeExpenseDailyId)
        {
            string returnstring = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("@EmpID-int", EmployeeId.ToString());
                nv.Add("@EmployeeExpenseMonthlyId-int", EmployeeExpenseMonthlyId.ToString());
                nv.Add("@EmployeeExpenseDailyId-int", EmployeeExpenseDailyId.ToString());
                var data = dl.GetData("sp_GetDailyExpenseDetail", nv);
                returnstring = data.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.Message;
            }
            return returnstring;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DeleteAttachExpense(string ID)
        {
            var returnString = "";
            try
            {
                nv.Clear();
                nv.Add("@ID-varchar(250)", ID.ToString());
                var data = dl.GetData("sp_DeleteAttached", nv);
               
                
                returnString = "Success";
                
                //string path = Server.MapPath("files//" + file_name);
                //FileInfo file = new FileInfo(path);
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Project.asmx WebMethod(ViewProjectImage) In Project.aspx | " + ex.Message + " | Stack Trace : |" + ex.StackTrace);
                returnString = "Error In File Uploading";
            }
            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DeleteReiembresExpense(string ID)
        {
            var returnString = "";
            try
            {
                nv.Clear();
                nv.Add("@ID-varchar(250)", ID.ToString());
                var data = dl.GetData("sp_DeleteReiembresment", nv);


                returnString = "Success";

                //string path = Server.MapPath("files//" + file_name);
                //FileInfo file = new FileInfo(path);
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Project.asmx WebMethod(ViewProjectImage) In Project.aspx | " + ex.Message + " | Stack Trace : |" + ex.StackTrace);
                returnString = "Error In File Uploading";
            }
            return returnString;
        }

        [WebMethod(EnableSession = true)]
        public string SaveCityDistance(int EEMonthlyId, string VisitPurpose, string TourDayClosing, int EEDailyId, int EEDay, string fromCity, string toCity, string milageKM, string DailyAllowance, string NightStay, string OutBack, string CNGAllowance, string InstitutionAllowance, string TravelType)
        {
            string returnstring = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("@EEMonthlyId-int", EEMonthlyId.ToString());
                nv.Add("@VisitPurpose-varchar", VisitPurpose);
                nv.Add("@TourDayClosing-varchar", TourDayClosing);
                nv.Add("@NightStay-varchar(100)", NightStay.ToString());
                nv.Add("@OutBack-varchar(100)", OutBack.ToString());
                nv.Add("@DailyAllowance-varchar(100)", DailyAllowance.ToString());
                nv.Add("@CNGExpense-varchar(100)", CNGAllowance.ToString());
                nv.Add("@InstitutionAllowance-varchar(100)", InstitutionAllowance.ToString());
                nv.Add("@EEDailyId-int", EEDailyId.ToString());
                nv.Add("@EEDay-int", EEDay.ToString());
                nv.Add("@fromCity-varchar", fromCity);
                nv.Add("@toCity-varchar", toCity);
                nv.Add("@milageKM-varchar", milageKM);
                nv.Add("@Fare-varchar", ((TravelType == "true") ? "0" : "1"));
                var data = dl.GetData("sp_saveCityDistance", nv);
                returnstring = data.Tables[0].ToJsonString();

            }
            catch (Exception ex)
            {
                returnstring = ex.Message;
            }
            return returnstring;
        }

        [WebMethod(EnableSession = true)]
        public string UpdateCityDistance(int EEDailyDetailId, int EEDailyId, string fromCity, string toCity, string milageKM, string TravelType)
        {
            string returnstring = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("@EmployeeExpenseDailyDetailId-int", EEDailyDetailId.ToString());
                nv.Add("@EmployeeExpenseDailyId-int", EEDailyId.ToString());
                nv.Add("@FromCity-varchar", fromCity);
                nv.Add("@ToCity-varchar", toCity);
                nv.Add("@MilageKm-varchar", milageKM);
                nv.Add("@Fare-varchar", ((TravelType == "true") ? "0" : "1"));
                var data = dl.GetData("sp_UpdateDailyExpenseDetail", nv);
                returnstring = data.Tables[0].ToJsonString();

            }
            catch (Exception ex)
            {
                returnstring = ex.Message;
            }
            return returnstring;
        }


        [WebMethod(EnableSession = true)]
        public string DeleteCityDistance(int EEDailyDetailId, int EEDailyId)
        {
            string returnstring = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("@EmployeeExpenseDailyDetailId-int", EEDailyDetailId.ToString());
                nv.Add("@EmployeeExpenseDailyId-int", EEDailyId.ToString());
                var data = dl.GetData("sp_DeleteDailyExpenseDetail", nv);
                returnstring = data.Tables[0].ToJsonString();

            }
            catch (Exception ex)
            {
                returnstring = ex.Message;
            }
            return returnstring;
        }

        [WebMethod(EnableSession = true)]
        public string FillDistance(
            int EmployeeId
            //int to, int from
            )
        {
            string returnstring = string.Empty;
            try
            {
                nv.Clear();
                //nv.Add("@from-int", from.ToString());
                //nv.Add("@to-int", to.ToString());
                nv.Add("@EmployeeeId-int", EmployeeId.ToString());
                var data = dl.GetData("sp_GetCityDistance", nv);
                returnstring = data.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.Message;
            }
            return returnstring;
        }

        [WebMethod(EnableSession = true)]
        public string InsertDailyExpense(int EEMonthlyId, int EEDay, string VisitPurpose, string TourDayClosing, string DailyAllowance, string NightStay, string OutBack, string CNGAllowance, string InstitutionAllowance)
        {
            string returnstring = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("@EEMonthlyId-int", EEMonthlyId.ToString());
                nv.Add("@EEDay-int", EEDay.ToString());
                nv.Add("@VisitPurpose-varchar(100)", VisitPurpose.ToString());
                nv.Add("@TourDayClosing-varchar(100)", TourDayClosing.ToString());
                nv.Add("@NightStay-varchar(100)", NightStay.ToString());
                nv.Add("@OutBack-varchar(100)", OutBack.ToString());
                nv.Add("@DailyAllowance-varchar(100)", DailyAllowance.ToString());
                nv.Add("@CNGExpense-varchar(100)", CNGAllowance.ToString());
                nv.Add("@InstitutionAllowance-varchar(100)", InstitutionAllowance.ToString());
                var data = dl.GetData("sp_InsertDailyExpense", nv);
                returnstring = data.Tables[0].ToJsonString();

            }
            catch (Exception ex)
            {
                returnstring = ex.Message;
            }
            return returnstring;
        }

        [WebMethod(EnableSession = true)]
        public string UpdateDailyExpense(int EEMonthlyId, int EEDailyId, string VisitPurpose, string TourDayClosing, string DailyAllowance, string NightStay, string OutBack, string CNGAllowance, string InstitutionAllowance)
        {

            string returnstring = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("@EEMonthlyId-int", EEMonthlyId.ToString());
                nv.Add("@EEDialyId-int", EEDailyId.ToString());
                nv.Add("@VisitPurpose-varchar(100)", VisitPurpose.ToString());
                nv.Add("@TourDayClosing-varchar(100)", TourDayClosing.ToString());
                nv.Add("@NightStay-varchar(100)", NightStay.ToString());
                nv.Add("@OutBack-varchar(100)", OutBack.ToString());
                nv.Add("@DailyAllowance-varchar(100)", DailyAllowance.ToString());
                nv.Add("@CNGExpense-varchar(100)", CNGAllowance.ToString());
                nv.Add("@InstitutionAllowance-varchar(100)", InstitutionAllowance.ToString());
                var data = dl.GetData("sp_UpdateDailyExpense", nv);
                returnstring = data.Tables[0].ToJsonString();

            }
            catch (Exception ex)
            {
                returnstring = ex.Message;
            }
            return returnstring;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string FillEmpBasicDetails(int EmployeeId, string date)
        {
            string returnstring = string.Empty;
            try
            {
                DateTime ExpenseMonthDate = DateTime.ParseExact(date, "dd-MMM-yyyy",
                                 CultureInfo.InvariantCulture);
                nv.Clear();
                nv.Add("@EmployeeeId-int", EmployeeId.ToString());
                nv.Add("@Date-DateTime", ExpenseMonthDate.ToString());
                var data = dl.GetData("sp_GetEmployeeDetails", nv);
                returnstring = data.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.Message;
            }
            return returnstring;
        }

        [WebMethod(EnableSession = true)]
        public string FillEmpExpensePolicy(string EmployeeId, string dailyid, string date)
        {
            string returnstring = string.Empty;
            try
            {
                DateTime ExpenseMonthDate = DateTime.ParseExact(date, "dd-MMM-yyyy",
                                 CultureInfo.InvariantCulture);
                nv.Clear();
                nv.Add("@employeeId-int", EmployeeId);
                nv.Add("@ExpenseDailyId-int", dailyid);
                nv.Add("@Date-DateTime", ExpenseMonthDate.ToString());
                var data = dl.GetData("sp_getEmpExpensePolicy", nv);
                returnstring = data.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.Message;
            }
            return returnstring;
        }

        [WebMethod(EnableSession = true)]
        public string SetExpenseReportStatus(int EmployeeId, int EmployeeExpenseMonthlyId, int IsEditable, string ReportStatus)
        {
            string returnstring = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("@EmpID-INT", EmployeeId.ToString());
                nv.Add("@EmployeeExpenseMonthlyId-INT", EmployeeExpenseMonthlyId.ToString());
                nv.Add("@IsEditable-INT", IsEditable.ToString());
                nv.Add("@ReportStatus-varchar(20)", ReportStatus.ToString());
                var data = dl.GetData("sp_setExpenseReportStatus", nv);
                returnstring = data.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.Message;
            }
            return returnstring;
        }

        [WebMethod(EnableSession = true)]
        public string SaveExpenseReport(int MonthlyId, string MiscExpense, string ExpenseNote, string CellPhoneBillAmountCorrection, string BikeDeduction)
        {
            string returnstring = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("@monthlyId-INT", MonthlyId.ToString());
                nv.Add("@miscExpense-varchar(100)", MiscExpense.ToString());
                nv.Add("@Note-varchar(100)", ExpenseNote.ToString());
                nv.Add("@CellPhoneBillAmountCorrection-varchar(100)", CellPhoneBillAmountCorrection.ToString());
                nv.Add("@BikeDeduction-varchar(100)", BikeDeduction.ToString());
                var data = dl.GetData("sp_SaveExpenseReport", nv);
                returnstring = data.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.Message;
            }
            return returnstring;
        }

        [WebMethod(EnableSession = true)]
        public string FillExpApprovalDetails(int EmployeeId, string date)
        {
            string returnstring = string.Empty;
            try
            {
                DateTime ExpenseMonthDate = DateTime.ParseExact(date, "dd-MMM-yyyy",
                                 CultureInfo.InvariantCulture);
                nv.Clear();
                nv.Add("@EmployeeId-int", EmployeeId.ToString());
                nv.Add("@Date-int", ExpenseMonthDate.ToString());
                nv.Add("@SessionEmployeeId-int", Session["CurrentUserId"].ToString());
                var data = dl.GetData("sp_GetExpApprovalDetails", nv);
                returnstring = data.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.Message;
            }
            return returnstring;
        }

        [WebMethod(EnableSession = true)]
        public string SetExpenseApproval(int EmployeeId, int EmployeeExpenseMonthlyId, string LevelName, string ApprovalStatus, string ApprovalAmount, string ApprovalComment, string AMApprovalStatus, string SMApprovalStatus, string RTLApprovalStatus, string SFEApprovalStatus)
        {
            string returnstring = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("@EmpID-INT", EmployeeId.ToString());
                nv.Add("@EmployeeExpenseMonthlyId-INT", EmployeeExpenseMonthlyId.ToString());
                nv.Add("@LevelName-varchar(50)", LevelName.ToString());
                nv.Add("@ApprovalStatus-varchar(50)", ApprovalStatus.ToString());
                nv.Add("@ApprovalAmount-varchar(50)", ApprovalAmount.ToString());
                nv.Add("@ApprovalComment-text", ApprovalComment.ToString());
                nv.Add("@AMApprovalStatus-varchar(50)", AMApprovalStatus.ToString());
                nv.Add("@SMApprovalStatus-varchar(50)", SMApprovalStatus.ToString());
                nv.Add("@RTLApprovalStatus-varchar(50)", RTLApprovalStatus.ToString());
                nv.Add("@SFEApprovalStatus-varchar(50)", SFEApprovalStatus.ToString());
                var data = dl.GetData("sp_setExpenseApproval", nv);
                returnstring = data.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.Message;
            }
            return returnstring;
        }

        [WebMethod]
        public string GetCityByEmpId(string EmployeeId)
        {

            string returnString = "";

            try
            {

                nv.Clear();
                nv.Add("@EmployeeId-int", EmployeeId.ToString());

                var ds = dl.GetData("sp_GetEmployeeCityDetailsByID", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
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
        public string GetAttachmentDayWise(string EmployeeId, string MonthDay, string DailyID)
        {
            var returnString = "";
            try
            {
                nv.Clear();
                nv.Add("@MonthDay-varchar(250)", MonthDay.ToString());
                nv.Add("@EmployeeId-varchar(250)", EmployeeId.ToString());
                var data = dl.GetData("sp_GetAttachmentDayWise", nv);
                returnString = data.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Project.asmx WebMethod(ViewProjectImage) In Project.aspx | " + ex.Message + " | Stack Trace : |" + ex.StackTrace);
                returnString = "Error In File Uploading";
            }
            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string EditAttach(string ID)
        {
            var returnString = "";
            try
            {
                nv.Clear();
                nv.Add("@ID-varchar(250)", ID.ToString());
                var data = dl.GetData("sp_EditAttachmentDayWise", nv);
                returnString = data.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Project.asmx WebMethod(ViewProjectImage) In Project.aspx | " + ex.Message + " | Stack Trace : |" + ex.StackTrace);
                returnString = "Error In File Uploading";
            }
            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string EditReiembres(string ID)
        {
            var returnString = "";
            try
            {
                nv.Clear();
                nv.Add("@ID-varchar(250)", ID.ToString());
                var data = dl.GetData("sp_EditReiembresDayWise", nv);
                returnString = data.Tables[0].ToJsonString() + '~' + data.Tables[1].ToJsonString();
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Project.asmx WebMethod(ViewProjectImage) In Project.aspx | " + ex.Message + " | Stack Trace : |" + ex.StackTrace);
                returnString = "Error In File Uploading";
            }
            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string getAllActivities()
        {
            string returnString = "";

            try
            {
                var data = dl.GetData("sp_getAllActivities", null);
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
        public string getAllActivities_Reimbursement()
        {
            string returnString = "";

            try
            {
                var data = dl.GetData("sp_getAllActivities_Reimbursement", null);
                returnString = data.Tables[0].ToJsonString();
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }
        [WebMethod(EnableSession = true)]
        public string DeductDailyExpenseByManager(int EEMonthlyId, int EEDay, string MgrRole, string DsmEmployeeID, string DsmComments,
            string DsmDeductAmount, string SMEmployeeID, string SMComments, string SMDeductAmount, string NSMEmployeeID, string NSMComments, string NSMDeductAmount)
        {
            string returnstring = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("@EEMonthlyId-int", EEMonthlyId.ToString());
                nv.Add("@EEDay-int", EEDay.ToString());
                nv.Add("@MgrRole-varchar(100)", MgrRole.ToString());
                nv.Add("@DsmEmployeeID-varchar(100)", DsmEmployeeID.ToString());
                nv.Add("@DsmComments-varchar(100)", DsmComments.ToString());
                nv.Add("@DsmDeductAmount-varchar(100)", DsmDeductAmount.ToString());
                nv.Add("@SMEmployeeID-varchar(100)", SMEmployeeID.ToString());
                nv.Add("@SMComments-varchar(100)", SMComments.ToString());
                nv.Add("@SMDeductAmount-varchar(100)", SMDeductAmount.ToString());
                nv.Add("@NSMEmployeeID-varchar(100)", NSMEmployeeID.ToString());
                nv.Add("@NSMComments-varchar(100)", NSMComments.ToString());
                nv.Add("@NSMDeductAmount-varchar(100)", NSMDeductAmount.ToString());
                var data = dl.GetData("sp_UpdateDailyDeductionByManager", nv);
                returnstring = data.Tables[0].ToJsonString();

            }
            catch (Exception ex)
            {
                returnstring = ex.Message;
            }
            return returnstring;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ViewImage(int dailyid, string monthly)
        {

            var returnString = "";
            try
            {
                nv.Clear();

                nv.Add("@dailyid-int", dailyid.ToString());

                //   nv.Add("@monthlyid-int", monthly.ToString());
                //2017-05-01
                var data = dl.GetData("sp_ViewAttachment", nv);
                returnString = data.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Project.asmx WebMethod(ViewProjectImage) In Project.aspx | " + ex.Message + " | Stack Trace : |" + ex.StackTrace);

                returnString = "Error In File Uploading";

            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ViewImagess(string ID)
        {
            var returnString = "";
            try
            {
                nv.Clear();
                nv.Add("@ID-varchar(250)", ID.ToString());
                var data = dl.GetData("sp_Reiembresment_new", nv);
                returnString = data.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Project.asmx WebMethod(ViewProjectImage) In Project.aspx | " + ex.Message + " | Stack Trace : |" + ex.StackTrace);
                returnString = "Error In File Uploading";
            }
            return returnString;
        }


        [WebMethod]
        public string GetCitiesByEmpId(string EmployeeId)
        {

            string returnString = "";

            try
            {

                nv.Clear();
                nv.Add("@EmployeeID-bigint", EmployeeId.ToString());
                var ds = dl.GetData("sp_getcitiesforddlByEmployeeID", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
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
        public string GetReimbursementDayWise(string EmployeeId, string MonthDay, string MonthlyExpenseId)
        {

            string returnString = "";
            //int DayofExpense = Convert.ToDateTime(MonthDay).Day;
            try
            {

                nv.Clear();
                nv.Add("@Empid-bigint", EmployeeId.ToString());
                nv.Add("@MonthlyExpenseID-bigint", MonthlyExpenseId.ToString());
                nv.Add("@DayofExpense-date", MonthDay.ToString());
                var ds = dl.GetData("sp_ShowReimbursementDayWise", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
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
        public string DeleteAttach(string ID)
        {
            var returnString = "";
            try
            {
                nv.Clear();
                nv.Add("@ID-varchar(250)", ID.ToString());
                var data = dl.GetData("sp_DeleteAttachedImage", nv);
                returnString = "Success";
                if (data != null)
                {
                    if (data.Tables[0].Rows.Count > 0)
                    {
                        string path = data.Tables[0].Rows[0]["imgName"].ToString();
                        //path = path.Replace("\", ""/");
                        System.IO.File.Delete(path);
                    }
                }
                //string path = Server.MapPath("files//" + file_name);
                //FileInfo file = new FileInfo(path);
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From Project.asmx WebMethod(ViewProjectImage) In Project.aspx | " + ex.Message + " | Stack Trace : |" + ex.StackTrace);
                returnString = "Error In File Uploading";
            }
            return returnString;
        }





        #endregion




    }
}
