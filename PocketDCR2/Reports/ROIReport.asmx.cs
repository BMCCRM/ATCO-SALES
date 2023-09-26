using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using PocketDCR2.Classes;

namespace PocketDCR2.Reports
{
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class ROIReport1 : System.Web.Services.WebService
    {
        NameValueCollection _nv = new NameValueCollection();
        DAL dal = new DAL();

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetEmployeeDoctors(int level6LevelID)
        {

            string result = string.Empty;
            //var EmployeeID = Session["CurrentUserId"].ToString();
            try
            {
                _nv.Clear();
                _nv.Add("@EmployeeId-int", level6LevelID.ToString());
                var data = dal.GetData("sp_GetEmployeeDoctors", _nv);

                if (data.Tables[0].Rows.Count > 0)
                {
                    return data.Tables[0].ToJsonString();
                }
            }
            catch (NullReferenceException)
            {
                result = "";
            }
            return result;
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetCSRActivities(int EmployeeID, int DoctorID)
        {
            string result = string.Empty;

            //var EmployeeID = Session["CurrentUserId"].ToString();
            try
            {
                _nv.Clear();
                _nv.Add("@EmployeeId-int", EmployeeID.ToString());
                _nv.Add("@DoctorID-int", DoctorID.ToString());
                var data = dal.GetData("sp_GetCSRActivities", _nv);
                
                if (data.Tables[0].Rows.Count > 0)
                {
                    return data.Tables[0].ToJsonString();
                }

            }
            catch (NullReferenceException)
            {
                result = "";
            }

            return result;
        }



        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetCSRDetailsByID(int CSRMainDataID)
        {
            string result = string.Empty;

            //var EmployeeID = Session["CurrentUserId"].ToString();
            try
            {
                _nv.Clear();
                _nv.Add("@CSRMainDataID-var", CSRMainDataID.ToString());
                var data = dal.GetData("sp_GetCSRDetailsByID", _nv);

                if (data.Tables[0].Rows.Count > 0)
                {
                    return string.Format("[{0}, {1}, {2}, {3}]", 
                        data.Tables[0].ToJsonString(), data.Tables[1].ToJsonString(), data.Tables[2].ToJsonString(), data.Tables[3].ToJsonString());
                }
            }
            catch (NullReferenceException)
            {
                result = "";
            }

            return result;
        }



    }
}
