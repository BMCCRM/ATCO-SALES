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

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for ExpensePolicy1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class ExpensePolicy1 : System.Web.Services.WebService
    {
        #region Public Member

        JavaScriptSerializer _jss = new JavaScriptSerializer();
        DAL dl = new DAL();
        NameValueCollection nv = new NameValueCollection();
        DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        #endregion

        #region Public Functions

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertExpensePolicy(int EmployeeDesignationId,
                                            string DailyAllowance,
                                            string BikeAllowance,
                                            string CngAllowance,
                                            string DailyAddAllowance_BigCity,
                                            string MonthlyAllowance_BigCity,
                                            string MilagePerKm,
                                            string OutStationAllowance_OutBack,
                                            string OutStationAllowance_NightStay,
                                            string DailyInstitutionBaseAllowance,
                                            string MobileAllowance,
                                            string InstitutionBaseAllowance,
                                            string MonthlyAllowance,
                                            string MonthlyAllowance_SameBaseTown,
                                            string MonthlyAllowance_DifferentBaseTown,
                                            string MonthlyNonTouringAllowance,
                                            string MonthOfExpensePolicyS,
                                            string MonthOfExpensePolicyE)
        {
            string returnString = "";

            try
            {
                DateTime MonthOfExpensePolicyStart = DateTime.ParseExact(MonthOfExpensePolicyS, "MMMM-yyyy",
                                 CultureInfo.InvariantCulture);
                DateTime MonthOfExpensePolicyEnd = DateTime.ParseExact(MonthOfExpensePolicyE, "MMMM-yyyy",
                                 CultureInfo.InvariantCulture);

                



                nv.Clear();
                nv.Add("@EmployeeDesignationId-int", EmployeeDesignationId.ToString());
                nv.Add("@DailyAllowance-text", DailyAllowance.ToString());
                nv.Add("@BikeAllowance-text", BikeAllowance.ToString());
                nv.Add("@CngAllowance-text", CngAllowance.ToString());
                nv.Add("@DailyAddAllowance_BigCity-text", DailyAddAllowance_BigCity.ToString());
                nv.Add("@MonthlyAllowance_BigCity-text", MonthlyAllowance_BigCity.ToString());
                nv.Add("@MilagePerKm-text", MilagePerKm.ToString());
                nv.Add("@OutStationAllowance_OutBack-text", OutStationAllowance_OutBack.ToString());
                nv.Add("@OutStationAllowance_NightStay-text", OutStationAllowance_NightStay.ToString());
                nv.Add("@DailyInstitutionBaseAllowance-text", DailyInstitutionBaseAllowance.ToString());
                nv.Add("@MobileAllowance-text", MobileAllowance.ToString());
                nv.Add("@InstitutionBaseAllowance-text", InstitutionBaseAllowance.ToString());
                nv.Add("@MonthlyAllowance-text", MonthlyAllowance.ToString());
                nv.Add("@MonthlyAllowance_SameBaseTown-text", MonthlyAllowance_SameBaseTown.ToString());
                nv.Add("@MonthlyAllowance_DifferentBaseTown-text", MonthlyAllowance_DifferentBaseTown.ToString());
                nv.Add("@MonthlyNonTouringAllowance-text", MonthlyNonTouringAllowance.ToString());
                nv.Add("@MonthOfExpensePolicyStart-datetime", MonthOfExpensePolicyStart.ToString());
                nv.Add("@MonthOfExpensePolicyEnd-datetime", MonthOfExpensePolicyEnd.ToString());

                var data = dl.GetData("sp_insertexpensepolicy", nv);
                if(data!=null)
                {
                    returnString = data.Tables[0].Rows[0][0].ToString();
                }
                else
                {
                    returnString = "Error";
                }
                //returnString = "OK";
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string CheckExistingExpPolicy(int ExpensePolicyId, string Updatedstartdate, string Updatedenddate)
        {
            string returnString = "";

            //DateTime UpdatedstartdateConv = Convert.ToDateTime(Updatedstartdate);
            //DateTime UpdatedenddateConv = Convert.ToDateTime(Updatedstartdate);

            try
            {
                nv.Clear();
                nv.Add("@ExpensePolicyID-int", ExpensePolicyId.ToString());
                nv.Add("@Updatedstartdate-datetime", Updatedstartdate.ToString());
                nv.Add("@Updatedenddate-datetime", Updatedenddate.ToString());
                var data = dl.GetData("sp_CheckExistingExpPolicy", nv);
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
        public string GetExpensePolicy(int ExpensePolicyId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@ExpensePolicyID-int", ExpensePolicyId.ToString());
                var data = dl.GetData("sp_getexpensepolicy", nv);
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
        public string UpdateExpensePolicy(int ExpensePolicyId,
                                            int EmployeeDesignationId,
                                            string DailyAllowance,
                                            string BikeAllowance,
                                            string CngAllowance,
                                            string DailyAddAllowance_BigCity,
                                            string MonthlyAllowance_BigCity,
                                            string MilagePerKm,
                                            string OutStationAllowance_OutBack,
                                            string OutStationAllowance_NightStay,
                                            string DailyInstitutionBaseAllowance,
                                            string MobileAllowance,
                                            string InstitutionBaseAllowance,
                                            string MonthlyAllowance,
                                            string MonthlyAllowance_SameBaseTown,
                                            string MonthlyAllowance_DifferentBaseTown,
                                            string MonthlyNonTouringAllowance,
                                            string MonthOfExpensePolicyS,
                                            string MonthOfExpensePolicyE)
        {
            string returnString = "";

            try
            {
                DateTime MonthOfExpensePolicyStart = DateTime.ParseExact(MonthOfExpensePolicyS, "MMMM-yyyy",
                                 CultureInfo.InvariantCulture);
                DateTime MonthOfExpensePolicyEnd = DateTime.ParseExact(MonthOfExpensePolicyE, "MMMM-yyyy",
                                 CultureInfo.InvariantCulture);
                nv.Clear();
                nv.Add("@ExpensePolicyID-int", ExpensePolicyId.ToString());
                nv.Add("@EmployeeDesignationId-int", EmployeeDesignationId.ToString());
                nv.Add("@DailyAllowance-text", DailyAllowance.ToString());
                nv.Add("@BikeAllowance-text", BikeAllowance.ToString());
                nv.Add("@CngAllowance-text", CngAllowance.ToString());
                nv.Add("@DailyAddAllowance_BigCity-text", DailyAddAllowance_BigCity.ToString());
                nv.Add("@MonthlyAllowance_BigCity-text", MonthlyAllowance_BigCity.ToString());
                nv.Add("@MilagePerKm-text", MilagePerKm.ToString());
                nv.Add("@OutStationAllowance_OutBack-text", OutStationAllowance_OutBack.ToString());
                nv.Add("@OutStationAllowance_NightStay-text", OutStationAllowance_NightStay.ToString());
                nv.Add("@DailyInstitutionBaseAllowance-text", DailyInstitutionBaseAllowance.ToString());
                nv.Add("@MobileAllowance-text", MobileAllowance.ToString());
                nv.Add("@InstitutionBaseAllowance-text", InstitutionBaseAllowance.ToString());
                nv.Add("@MonthlyAllowance-text", MonthlyAllowance.ToString());
                nv.Add("@MonthlyAllowance_SameBaseTown-text", MonthlyAllowance_SameBaseTown.ToString());
                nv.Add("@MonthlyAllowance_DifferentBaseTown-text", MonthlyAllowance_DifferentBaseTown.ToString());
                nv.Add("@MonthlyNonTouringAllowance-text", MonthlyNonTouringAllowance.ToString());
                nv.Add("@MonthOfExpensePolicyStart-datetime", MonthOfExpensePolicyStart.ToString());
                nv.Add("@MonthOfExpensePolicyEnd-datetime", MonthOfExpensePolicyEnd.ToString());
                var data = dl.GetData("sp_updateexpensepolicy", nv);
                returnString = "OK";
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DeleteExpensePolicy(int ExpensePolicyId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@ExpensePolicyID-int", ExpensePolicyId.ToString());
                var data = dl.GetData("sp_deleteexpensepolicy", nv);
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
        public string GetEmployeeDesignations()
        {
            string returnString = "";

            try
            {
                nv.Clear();
                var data = dl.GetData("sp_GetAllManagers", nv);
                returnString = data.Tables[0].ToJsonString();
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
