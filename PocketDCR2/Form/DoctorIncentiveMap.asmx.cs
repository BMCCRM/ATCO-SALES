using DatabaseLayer.SQL;
using PocketDCR.CustomMembershipProvider;
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
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class DoctorIncentiveMap1 : System.Web.Services.WebService
    {
        DAL dl = new DAL();
        NameValueCollection nv = new NameValueCollection();
        JavaScriptSerializer _jss = new JavaScriptSerializer();
        List<v_EmployeeWithRole> Emphr;
        readonly DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        private static SystemUser _currentUser;

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetLocationApproval(string Level1Id, string Level2Id, string Level3Id, string Level4Id, string Level5Id, string Level6Id, string TeamID, string Role, string monthofrequest, string Status)
        {
            string result = string.Empty;
            try
            {
                _currentUser = (SystemUser)Session["SystemUser"];
                DateTime dat = DateTime.Parse(monthofrequest, System.Globalization.CultureInfo.InvariantCulture);

                NameValueCollection _nvCollection = new NameValueCollection();
                _nvCollection.Clear();
                _nvCollection.Add("@Level1Id-int", Level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", Level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", Level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", Level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", Level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", Level6Id.ToString());
                _nvCollection.Add("@monthofrequest-varchar(250)", dat.ToString());
                _nvCollection.Add("@CurrentUserEmployeeId-INT", _currentUser.EmployeeId.ToString());
                _nvCollection.Add("@TeamID-INT", TeamID.ToString());
                _nvCollection.Add("@Userrole-varchar(50)", Role.ToString());
                _nvCollection.Add("@Status-varchar(30)", Status.ToString());
                var data = dl.GetData("AtcoCRM_V2_New.dbo.sp_GetDetail_DoctorIncentiveSales", _nvCollection);   //sp_GetDetailLocationApproval
                if (data.Tables[0].Rows.Count > 0)
                {
                    return data.Tables[0].ToJsonString();
                }
                else
                {
                    result = "No";
                }

            }
            catch (NullReferenceException ex)
            {
                result = ex.Message;
            }

            return result;

        }



        [WebMethod(EnableSession = true)]
        public string IsValidUser()
        {
            try
            {
                if (Session["SystemUser"] != null)
                {
                    _currentUser = (SystemUser)Session["SystemUser"];
                    return "true";
                }

            }
            catch (Exception exception)
            {

            }
            return "false";
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetHierarchySelection(long systemUserId)
        {
            string returnString = "";

            try
            {
                var getEmployeeHierarchy =
                    _dataContext.sp_EmplyeeHierarchySelect(systemUserId).Select(
                    p =>
                       new EmplyeeHierarchy()
                       {
                           LevelId1 = p.LevelId1,
                           LevelId2 = p.LevelId2,
                           LevelId3 = p.LevelId3,
                           LevelId4 = p.LevelId4,
                           LevelId5 = p.LevelId5,
                           LevelId6 = p.LevelId6
                       }).ToList();

                if (getEmployeeHierarchy.Count > 0)
                {
                    returnString = _jss.Serialize(getEmployeeHierarchy);
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
        public string PostApproval(string id, string DoctorID, string lat, string lng, string address, string Status)
        {
            string result = string.Empty;

            try
            {
                string role = Context.Session["CurrentUserRole"].ToString();
                string EmployeeID = Session["CurrentUserId"].ToString();
                int level1id = 0, level2id = 0, level3id = 0, level4id = 0, level5id = 0, level6id = 0;
                NameValueCollection _nvCollection = new NameValueCollection();
                //_dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                _nvCollection.Clear();
                _nvCollection.Add("@SystemUserID-BIGINT", EmployeeID.ToString());
                DataSet getEmployeeHierarchy = dl.GetData("sp_EmployeeHierarchySelect", _nvCollection);
                //var getEmployeeHierarchy = _dataContext.sp_EmployeeHierarchySelect_PharmEVO(empid).ToList();

                if (getEmployeeHierarchy.Tables[0].Rows.Count > 0)
                {
                    level1id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId1"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId1"]);
                    level2id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId2"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId2"]);
                    level3id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId3"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId3"]);
                    level4id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId4"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId4"]);
                    level5id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId5"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId5"]);
                    level6id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId6"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId6"]);
                }

                //nv.Add("@Doctorid-int", rec_docid.ToString());
                //nv.Add("@lat-varchar(50)", rec_lat.ToString());
                //nv.Add("@lng-varchar(50)", rec_lng.ToString());
                //nv.Add("@address-varchar(250)", rec_add.ToString());
                nv.Clear();
                nv.Add("@ID-varchar(500)", id);
                nv.Add("@Status-varchar(50)", Status.ToString());
                nv.Add("@CurrentUserRole-varchar(50)", role);
                nv.Add("@EmployeeID-int", EmployeeID.ToString());
                nv.Add("@Level1Id-int", level1id.ToString());
                nv.Add("@Level2Id-int", level2id.ToString());
                nv.Add("@Level3Id-int", level3id.ToString());
                nv.Add("@Level4Id-int", level4id.ToString());
                result = (dl.InserData("sp_UpdateApprovalbulkUploaderApproved", nv)) ? "OK" : "No";

            }
            catch (NullReferenceException ex)
            {
                result = ex.Message;
            }

            return result;

        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<v_EmployeeWithRole> getemployeeHR(int employeeid)
        {
            Emphr = _dataContext.EmployeeWith_Hierarchy(employeeid).ToList();

            return Emphr;

        }



        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string allPostApproval(string in_ids, string in_DoctorIDs, string in_lats, string in_lngs, string in_address, string Status)
        {
            string retrunstr = string.Empty;
            DataSet result = new DataSet();
            try
            {
                //string[] id = in_ids.Split(',');
                //string[] docids = in_DoctorIDs.Split(',');
                //string[] lat = in_lats.Split(',');
                //string[] lng = in_lngs.Split(',');
                //string[] add = in_address.Split(',');

                //for (int i = 0; i < id.Count(); i++)
                //{
                //    var rec_id = id[i];
                //    var rec_docid = docids[i];
                //    var rec_lat = lat[i];
                //    var rec_lng = lng[i];
                //    var rec_add = add[i];
                string role = Context.Session["CurrentUserRole"].ToString();
                string EmployeeID = Session["CurrentUserId"].ToString();
                int level1id = 0, level2id = 0, level3id = 0, level4id = 0, level5id = 0, level6id = 0;
                NameValueCollection _nvCollection = new NameValueCollection();
                //_dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                _nvCollection.Clear();
                _nvCollection.Add("@SystemUserID-BIGINT", EmployeeID.ToString());
                DataSet getEmployeeHierarchy = dl.GetData("sp_EmployeeHierarchySelect", _nvCollection);
                //var getEmployeeHierarchy = _dataContext.sp_EmployeeHierarchySelect_PharmEVO(empid).ToList();

                if (getEmployeeHierarchy.Tables[0].Rows.Count > 0)
                {
                    level1id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId1"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId1"]);
                    level2id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId2"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId2"]);
                    level3id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId3"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId3"]);
                    level4id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId4"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId4"]);
                    level5id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId5"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId5"]);
                    level6id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId6"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId6"]);
                }

                //nv.Add("@Doctorid-int", rec_docid.ToString());
                //nv.Add("@lat-varchar(50)", rec_lat.ToString());
                //nv.Add("@lng-varchar(50)", rec_lng.ToString());
                //nv.Add("@address-varchar(250)", rec_add.ToString());
                nv.Clear();
                nv.Add("@ID-int", in_ids);
                nv.Add("@Status-varchar(50)", Status.ToString());
                nv.Add("@CurrentUserRole-varchar(50)", role);
                nv.Add("@EmployeeID-int", EmployeeID.ToString());
                nv.Add("@Level1Id-int", level1id.ToString());
                nv.Add("@Level2Id-int", level2id.ToString());
                nv.Add("@Level3Id-int", level3id.ToString());
                nv.Add("@Level4Id-int", level4id.ToString());
                result = dl.GetData("sp_UpdateApprovalbulkUploaderApproved", nv);
                //if (role.ToUpper() == "RL4")
                //{
                //    if (result.Tables[1].Rows.Count != 0)
                //    {
                //        String excelURL = ExcelHelper.DataTableToExcelLoctionApprovalListForEmailResult(result, "LocationApproval");
                //        string emailAddresses = result.Tables[2].Rows[0][1].ToString();

                //        foreach (String emailAddress in emailAddresses.Split(';'))
                //        {
                //            try
                //            {
                //                DoctorsService.SendMail("Location Approval Sheet, Please Review", emailAddress, excelURL);
                //                PocketDCR2.Classes.Constants.ErrorLog("SUCCESS :: Location Approval Proccessed And Email Send " + emailAddresses + ". Emailed Sheet Is:" + excelURL);
                //            }
                //            catch (Exception ex)
                //            {
                //                return retrunstr = result.Tables[0].ToJsonString();
                //                //throw ex;
                //            }
                //        }
                //    }
                //}
                //}

            }
            catch (NullReferenceException ex)
            {
                retrunstr = ex.Message;
            }

            return retrunstr = result.Tables[0].ToJsonString();

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string allPostReject(string in_ids, string in_DoctorIDs, string in_lats, string in_lngs, string in_address, string Status)
        {
            string retrunstr = string.Empty;
            DataSet result = new DataSet();
            try
            {
                string role = Context.Session["CurrentUserRole"].ToString();
                string EmployeeID = Session["CurrentUserId"].ToString();
                int level1id = 0, level2id = 0, level3id = 0, level4id = 0, level5id = 0, level6id = 0;
                NameValueCollection _nvCollection = new NameValueCollection();
                //_dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                _nvCollection.Clear();
                _nvCollection.Add("@SystemUserID-BIGINT", EmployeeID.ToString());
                DataSet getEmployeeHierarchy = dl.GetData("sp_EmployeeHierarchySelect", _nvCollection);
                //var getEmployeeHierarchy = _dataContext.sp_EmployeeHierarchySelect_PharmEVO(empid).ToList();

                if (getEmployeeHierarchy.Tables[0].Rows.Count > 0)
                {
                    level1id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId1"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId1"]);
                    level2id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId2"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId2"]);
                    level3id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId3"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId3"]);
                    level4id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId4"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId4"]);
                    level5id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId5"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId5"]);
                    level6id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId6"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId6"]);
                }

                nv.Clear();
                nv.Add("@ID-int", in_ids);
                nv.Add("@Status-varchar(50)", Status.ToString());
                nv.Add("@CurrentUserRole-varchar(50)", role);
                nv.Add("@EmployeeID-int", EmployeeID.ToString());
                nv.Add("@Level1Id-int", level1id.ToString());
                nv.Add("@Level2Id-int", level2id.ToString());
                nv.Add("@Level3Id-int", level3id.ToString());
                nv.Add("@Level4Id-int", level4id.ToString());
                result = dl.GetData("sp_UpdateApprovalbulkUploaderReject", nv);
                if (result.Tables[0].Rows.Count != 0)
                {
                    retrunstr = result.Tables[0].ToJsonString();
                }
                //result = (dl.InserData("sp_UpdateApprovalbulkUploaderReject", nv)) ? "OK" : "No";
                //}

            }
            catch (NullReferenceException ex)
            {
                retrunstr = ex.Message;
            }

            return retrunstr;

        }
    
    }
}
