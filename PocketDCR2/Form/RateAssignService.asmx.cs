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
    /// Summary description for RateAssignService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class RateAssignService : System.Web.Services.WebService
    {

        #region Public Member


        JavaScriptSerializer _jss = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

        DAL dl = new DAL();
        NameValueCollection nv = new NameValueCollection();


        #endregion
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string fillFLMList(string level1Id, string level2Id,string level3Id, string level4Id, string level5Id, string level6Id)
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

                DataSet ds = dl.GetData("sp_fillFLMList", nv);
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
        public string fillRateForm()
        {
            string returnString = "";

            try
            {
                nv.Clear();
                DataSet ds = dl.GetData("sp_fillRateForm", null);
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
        public string AssignRate(string RateData, string EmployeeData,string DeleteFlag)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@FormID-nvarchar-MAX", RateData);
                nv.Add("@EmpIDs-nvarchar-MAX", EmployeeData);
                nv.Add("@DeleteFlag-nvarchar-MAX", DeleteFlag);
                
                DataSet ds = dl.GetData("sp_AssignRate", nv);
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
        public string FillAssignedRate()
        {
            string returnString = "";

            try
            {
                nv.Clear();
                DataSet ds = dl.GetData("sp_FillAssignedRate", null);
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
        public string View_AssignForm(string EmpId)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@EmpId-int", EmpId);


                DataSet ds = dl.GetData("sp_ViewAssignRate", nv);
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
        public string DeleteRate(string RateData, string EmployeeData)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@FormID-nvarchar-MAX", RateData);
                nv.Add("@EmpIDs-nvarchar-MAX", EmployeeData);

                DataSet ds = dl.GetData("sp_DeleteAssignRate", nv);
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
