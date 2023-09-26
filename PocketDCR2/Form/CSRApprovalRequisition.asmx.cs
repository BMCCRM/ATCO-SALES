using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using DatabaseLayer.SQL;
using System.Data.Common;
using System.Data;
using PocketDCR2.Classes;
using System.Data.SqlClient;
using System.Collections.Specialized;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for CSRApprovalRequisition
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
     [System.Web.Script.Services.ScriptService]
    public class CSRApprovalRequisition : System.Web.Services.WebService
    {
        NameValueCollection nv = new NameValueCollection();
        DAL dl = new DAL();

        [WebMethod] 
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ViewAprovalProcess(string ID)
        {
            string returnString = "";

            try
            {

                nv.Clear();
                nv.Add("@ID-nvarchar-max", ID);
                DataSet ds = dl.GetData("sp_GetAprovalProcessData", nv);
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

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Approvedbylevel(string ID, string Comment,string EmployeeID)
        {
            string returnString = "";

            try
            {
                string EmpID;
                nv.Clear();
                if (EmployeeID == "")
                {
                    EmpID = Session["CurrentUserId"].ToString();
                }
                else
                {
                    EmpID = EmployeeID;
                }
                nv.Add("@ID-nvarchar-max", ID);
                nv.Add("@EmployeeID-nvarchar-max", EmpID);
                nv.Add("@Comment-nvarchar-max", Comment);
                DataSet ds = dl.GetData("sp_GetAprovalProcessData", nv);
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

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string CSRDetail(string ID)
        {
            string returnString = "";

            try
            {
                string Role = Session["CurrentUserRole"].ToString();
                string Emp = Session["CurrentUserId"].ToString();
                nv.Clear();
                nv.Add("@ID-nvarchar-max", ID);
                nv.Add("@EmpLogin-nvarchar(max)", Emp.ToString());
                nv.Add("@Role-nvarchar(max)", Role.ToString());
                DataSet ds = dl.GetData("sp_GetCSRDetail", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString =  "[" +  ds.Tables[0].ToJsonString() + ","  + ds.Tables[1].ToJsonString()+ "]";
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
        public string Rejectbylevel(string ID, string Comment)
        {
            string returnString = "";

            try
            {

                nv.Clear();
                string EmployeeID = Session["CurrentUserId"].ToString();
                nv.Add("@ID-nvarchar-max", ID);
                nv.Add("@EmployeeID-nvarchar-max", EmployeeID);
                nv.Add("@Comment-nvarchar-max", Comment);
                DataSet ds = dl.GetData("sp_GetRejectProcessData", nv);
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
       
    }
}
