using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Serialization;
using PocketDCR2.Classes;
using System.Data;
using System.Text;


namespace PocketDCR2.Reports
{
    /// <summary>
    /// Summary description for SummerizeDashboard
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
     [System.Web.Script.Services.ScriptService]
    public class SummerizeDashboard : System.Web.Services.WebService
    {
        #region
        public string ToJsonString(DataTable dt)
        {
            var serializer = new JavaScriptSerializer();
            var rows = new List<Dictionary<string, string>>();
            foreach (DataRow dr in dt.Rows)
            {
                var row = dt.Columns.Cast<DataColumn>().ToDictionary(col => col.ColumnName, col => dr[col].ToString());
                rows.Add(row);
            }

            var builder = new StringBuilder();
            serializer.Serialize(rows, builder);
            return builder.ToString();
        }
        #endregion
        NewReports report = new NewReports();
        private NameValueCollection nv = new NameValueCollection();
        private JavaScriptSerializer js = new JavaScriptSerializer();
        
        [WebMethod]
        public string CallChampions(string month,string year)
        {
            var returnstring = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("@month-int", month.ToString());
                nv.Add("@year-int", year.ToString());
                var ds = report.GetData("sp_top3Employees", nv).Tables[0];
                if (ds != null)
                {
                    if (ds.Rows.Count > 0)
                    {
                        returnstring = ToJsonString(ds);
                    }
                }
                else
                {
                    returnstring = "No Data";
                }
            }
            catch (Exception ex)
            {
                returnstring ="Message : "+ex.Message.ToString() + "StackTrace : " + ex.StackTrace.ToString();
            }
            
            return returnstring;
        }

        [WebMethod]
        public string BrandDetails(string month, string year,string day)
        {
            var returnstring = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("@month-int", month.ToString());
                nv.Add("@year-int", year.ToString());
                nv.Add("@day-int", day.ToString());
                var ds = report.GetData("sp_brandsDetailed", nv).Tables[0];
                if (ds != null)
                {
                    if (ds.Rows.Count > 0)
                    {
                        returnstring = ToJsonString(ds);
                    }
                }
                else
                {
                    returnstring = "No Data";
                }
            }
            catch (Exception ex)
            {
                returnstring = "Message : " + ex.Message.ToString() + "StackTrace : " + ex.StackTrace.ToString();
            }

            return returnstring;
        }

        [WebMethod]
        public string SpecialistCoverd(string month, string year,string day)
        {
            var returnstring = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("@month-int", month.ToString());
                nv.Add("@year-int", year.ToString());
                nv.Add("@day-int", day.ToString());
                var ds = report.GetData("sp_specialistcovered", nv).Tables[0];
                if (ds != null)
                {
                    if (ds.Rows.Count > 0)
                    {
                        returnstring = ToJsonString(ds);
                    }
                }
                else
                {
                    returnstring = "No Data";
                }
            }
            catch (Exception ex)
            {
                returnstring = "Message : " + ex.Message.ToString() + "StackTrace : " + ex.StackTrace.ToString();
            }

            return returnstring;
        }

        [WebMethod]
        public string CountOfData(string month, string year, string day)
        {
            var returnvalue = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("@month-int", month.ToString());
                nv.Add("@year-int", year.ToString());
                nv.Add("@day-int", day.ToString());
                var ds = report.GetData("sp_GetCountOFData", nv).Tables[0];
              //  var ds = report.GetData("sp_GetCountOFData_New", nv).Tables[0];
                if (ds != null)
                {
                    if (ds.Rows.Count > 0)
                    {
                        returnvalue = ToJsonString(ds);
                    }
                }
                else
                {
                    returnvalue = "No Data";
                }
            }
            catch (Exception ex)
            {
                returnvalue = string.Format("Message : {0} /n StackTrace : {1}",ex.Message,ex.StackTrace);
            }
            return returnvalue;

        }




        [WebMethod]
        public string LastCallTimming(string month, string year, string day)
        {
            var returnvalue = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("@month-int", month.ToString());
                nv.Add("@year-int", year.ToString());
                nv.Add("@day-int", day.ToString());
                var ds = report.GetData("sp_lastCallTime", nv).Tables[0];
                if (ds != null)
                {
                    if (ds.Rows.Count > 0)
                    {
                        returnvalue = ToJsonString(ds);
                    }
                }
                else
                {
                    returnvalue = "No Data";
                }
            }
            catch (Exception ex)
            {
                returnvalue = string.Format("Message : {0} /n StackTrace : {1}", ex.Message, ex.StackTrace);
            }
            return returnvalue;
        }

        [WebMethod]
        public string GetLocations(string month, string year, string day)
        {
            var returnvalue = string.Empty;
            try
            {

                nv.Clear();
                nv.Add("@month-int", month.ToString());
                nv.Add("@year-int", year.ToString());
                nv.Add("@day-int", day.ToString());
                var ds = report.GetData("sp_getemployeeLocationdaywise", nv).Tables[0];
                if (ds != null)
                {
                    if (ds.Rows.Count > 0)
                    {
                        returnvalue = ToJsonString(ds);
                    }
                }
                else
                {
                    returnvalue = "No Data";
                }
            }
            catch (Exception ex)
            {
                returnvalue = string.Format("Message : {0} /n StackTrace : {1}", ex.Message, ex.StackTrace);
            }
            return returnvalue;
        }

    }
}
