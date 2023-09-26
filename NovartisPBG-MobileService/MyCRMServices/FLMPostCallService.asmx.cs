using MyCRMServices.Class;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace MyCRMServices
{
    /// <summary>
    /// Summary description for FLMPostCallService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class FLMPostCallService : System.Web.Services.WebService
    {
        readonly DAL _dl = new DAL();
        private NameValueCollection _nv = new NameValueCollection();
        readonly Entities _dbcontext = new Entities();

        #region FLMPostCall
        [WebMethod]
        public string GetFLMPostCall()
        {
            string result = string.Empty;
            try
            {
                DataSet dsPostcall = _dl.GetData("sp_Get_FLMPostCall", null);
                result = dsPostcall.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return result;
        }
        #endregion

        #region FLMPostCall Insert
        [WebMethod]
        public string FLMPostCallInsert(string RepMIOID, string lati, string longi, string VisitDate, string DoctorID, string system, string EmployeeID, string NCSMFocusAreaID, string PFSPFocusAreaID, string ChemistsFocusAreaID)
        {
            string result = string.Empty;
            try
            {
                _nv.Clear();
                _nv.Add("@RepMIOID-int", RepMIOID.ToString());
                _nv.Add("@latitude-varchar(50)", lati.ToString());
                _nv.Add("@longitude-varchar(50)", longi.ToString());
                _nv.Add("@Visitdatetime-datetime", VisitDate.ToString());
                _nv.Add("@DoctorID-int", DoctorID.ToString());
                _nv.Add("@System-varchar(50)", system.ToString());
                _nv.Add("@EmployeeID-int", EmployeeID.ToString());
                _nv.Add("@NCSMFocusAreaID-int", NCSMFocusAreaID.ToString());
                _nv.Add("@PFSPFocusAreaID-int", PFSPFocusAreaID.ToString());
                _nv.Add("@ChemistsFocusAreaID-int", ChemistsFocusAreaID.ToString());
                bool SaleDaily = _dl.InserData("sp_PostCallReportingFLMInsert", _nv);
                // Pharmacy = dsSaleDaily.Tables[0].ToJsonString();
                if (SaleDaily)
                {
                    result = "OK";
                }
                else
                {

                    result = "Not inserted FLM Post Call Insert";
                }
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return result;
        }

        [WebMethod]
        public string GetMedRepAndDoctorByFLMID(string FlmId, string datetime)
        {
            string Doctors = "";
            try
            {
                int month = Convert.ToDateTime(datetime).Month;

                int year = Convert.ToDateTime(datetime).Year;
                _nv.Clear();
                _nv.Add("@FLMid-int", FlmId.ToString());
                _nv.Add("@month-int", month.ToString());
                _nv.Add("@year-int", year.ToString());
                DataSet dsDoctors = _dl.GetData("sp_GetDoctorsWithEmpID", _nv);
                Doctors = dsDoctors.Tables[0].ToJsonString();


            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return Doctors;
        }

        #endregion

        #region Logger
        public static void ErrorLog(string error)
        {
            try
            {
                if (!Directory.Exists(ConfigurationManager.AppSettings["MobileService-Logs"].ToString()))
                {
                    Directory.CreateDirectory(ConfigurationManager.AppSettings["MobileService-Logs"].ToString());
                }

                File.AppendAllText(ConfigurationManager.AppSettings[@"MobileService-Logs\"].ToString() + "ReportLog_" + DateTime.UtcNow.ToString("yyyy_MM_dd") + ".txt",
                    DateTime.Now + " : " + error + Environment.NewLine);
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
        }
        #endregion
    }
}
