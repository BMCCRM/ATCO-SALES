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
    /// <summary>
    /// Summary description for NewDoctorRequestService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class NewDoctorRequestService : System.Web.Services.WebService
    {
        DAL dl = new DAL();
        private static SystemUser _currentUser;
        NameValueCollection nv = new NameValueCollection();
        JavaScriptSerializer _jss = new JavaScriptSerializer();

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetDoctorData(string Level1Id, string Level2Id, string Level3Id, string Level4Id, string Level5Id, string Level6Id, string TeamID, string Role, string Status, string monthofrequest)
        {
            string role = Context.Session["CurrentUserRole"].ToString();
            string result = string.Empty;

            try
            {
                _currentUser = (SystemUser)Session["SystemUser"];
                DateTime dat = DateTime.Parse(monthofrequest, System.Globalization.CultureInfo.InvariantCulture);

                nv.Clear();
                nv.Add("@Level1Id-int", Level1Id.ToString());
                nv.Add("@Level2Id-int", Level2Id.ToString());
                nv.Add("@Level3Id-int", Level3Id.ToString());
                nv.Add("@Level4Id-int", Level4Id.ToString());
                nv.Add("@Level5Id-int", Level5Id.ToString());
                nv.Add("@Level6Id-int", Level6Id.ToString());
                nv.Add("@Date-varchar(30)", dat.ToString());
                nv.Add("@CurrentUserEmployeeId-INT", _currentUser.EmployeeId.ToString());
                nv.Add("@TeamID-INT", TeamID.ToString());
                nv.Add("@Userrole-varchar(50)", Role.ToString());
                nv.Add("@Status-varchar(250)", Status.ToString());
                var data = dl.GetData("sp_getAllDocRequest", nv);
                if (data.Tables[0].Rows.Count > 0)
                {
                    result = data.Tables[0].ToJsonString();
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
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ApproveOrReject(string status, string role, string empId, string docid, string comments)
        {
            string retrunstr = string.Empty;
            string userId = Session["CurrentUserId"].ToString();
            string EmployeeName = "", SpoNamewithTerritory = "", ManagerName = "", BUH = "", msg = "";
            int countSuccess = 0;
            try
            {
                #region Process On Work
                string CurrentUserID = Session["CurrentUserId"].ToString();
                string CurrentUserRole = Context.Session["CurrentUserRole"].ToString();
                string returnString = "";
                int level1id = 0, level2id = 0, level3id = 0, level4id = 0, level5id = 0, level6id = 0;
                NameValueCollection _nvCollection = new NameValueCollection();
                try
                {

                    //_dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                    _nvCollection.Clear();
                    _nvCollection.Add("@SystemUserID-BIGINT", empId.ToString());
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
                }
                catch (Exception)
                {

                    throw;
                }

                switch (status)
                {
                    case "1":
                        _nvCollection.Clear();
                        _nvCollection.Add("@status-int", status.ToString());
                        _nvCollection.Add("@EmployeeID-int", CurrentUserID);
                        _nvCollection.Add("@docid-varchar(250)", docid.ToString());
                        _nvCollection.Add("@role-nvarchar(50)", CurrentUserRole.ToString());
                        _nvCollection.Add("@comments-nvarchar(255)", comments.ToString());
                        DataSet result = dl.GetData("sp_ApproveOrRejectDocRequest_bulkUploaderApprove", _nvCollection);
                        retrunstr = result.Tables[0].ToJsonString();
                        if (CurrentUserRole.ToUpper() == "RL4")
                        {
                            if (result.Tables[1].Rows.Count != 0)
                            {
                                SpoNamewithTerritory = String.Join(" ,<br/>", result.Tables[1].AsEnumerable().Select(x => x.Field<string>("SpoNamewithTerritory").ToString()).ToArray());
                                DoctorsService Email = new DoctorsService();
                                //String excelURL = ExcelHelper.DataTableToExcelAddToListForEmailResult(result, "New Doctor Request For Mobile");
                                string emailAddresses = result.Tables[2].Rows[0][1].ToString();
                                EmployeeName = result.Tables[1].Rows[0]["SpoName"].ToString();
                                //SpoNamewithTerritory = result.Tables[0].Rows[0]["SpoNamewithTerritory"].ToString();
                                ManagerName = result.Tables[1].Rows[0]["ManagerName"].ToString();
                                BUH = result.Tables[1].Rows[0]["Rl3Name"].ToString();
                                msg = "Addition of New doctors";

                                foreach (String emailAddress in emailAddresses.Split(';'))
                                {
                                    try
                                    {
                                        Email.SendMail("SFE Approval Request", emailAddress, empId, "0", "0", "0", docid, "Processed", EmployeeName, SpoNamewithTerritory, BUH, ManagerName, msg);
                                        PocketDCR2.Classes.Constants.ErrorLog("SUCCESS :: New Doctor Request For Mobile Proccessed And Email Send " + emailAddresses + "");
                                    }
                                    catch (Exception ex)
                                    {
                                        retrunstr = result.Tables[0].ToJsonString();
                                        //throw ex;
                                    }
                                }
                            }
                            retrunstr = result.Tables[0].ToJsonString();
                        }
                        break;
                    case "2":
                        _nvCollection.Clear();
                        _nvCollection.Add("@status-int", status.ToString());
                        _nvCollection.Add("@EmployeeID-int", CurrentUserID);
                        _nvCollection.Add("@docid-varchar(250)", docid.ToString());
                        _nvCollection.Add("@role-nvarchar(50)", CurrentUserRole.ToString());
                        _nvCollection.Add("@comments-nvarchar(255)", comments.ToString());
                        DataSet result1 = dl.GetData("sp_ApproveOrRejectDocRequest_bulkUploaderReject", _nvCollection);
                        retrunstr = result1.Tables[0].ToJsonString();
                        break;
                }


                //retrunstr = result.Tables[0].ToJsonString();
            }


                //switch (role)
            //{
            //    case "rl5":
            //        DataSet ds = new DataSet();
            //        for (int a = 0; a <= empId.Split(',').Length - 1; a++)
            //        {
            //            nv.Clear();
            //            nv.Add("@status-int", status.ToString());
            //            nv.Add("@empId-int", empId.Split(',')[a].ToString());
            //            nv.Add("@docid-int", docid.Split(',')[a].ToString());
            //            nv.Add("@role-nvarchar(50)", role.ToString());
            //            nv.Add("@comments-nvarchar(255)", comments.ToString());

                //            ds = dl.GetData("sp_ApproveOrRejectDocRequest", nv);
            //            if (ds.Tables[0].Rows.Count > 0)
            //                countSuccess++;
            //        }
            //        ds.Tables[0].Rows[0][0] += "-" + countSuccess.ToString();

                //        retrunstr = ds.Tables[0].ToJsonString();
            //        break;





                //    case "admin":
            //        DataSet dsadmin = new DataSet();
            //        for (int a = 0; a <= empId.Split(',').Length - 1; a++)
            //        {

                //            nv.Clear();
            //            nv.Add("@status-int", status.ToString());
            //            nv.Add("@empId-int", empId.Split(',')[a].ToString());
            //            nv.Add("@docid-int", docid.Split(',')[a].ToString());
            //            nv.Add("@role-nvarchar(50)", role.ToString());
            //            nv.Add("@comments-nvarchar(255)", comments.ToString());

                //            dsadmin = dl.GetData("sp_ApproveOrRejectDocRequest", nv);
            //            if (dsadmin.Tables[0].Rows.Count > 0)
            //                countSuccess++;

                //        }
            //        dsadmin.Tables[0].Rows[0][0] += "-" + countSuccess.ToString();
            //        retrunstr = dsadmin.Tables[0].ToJsonString();
            //        break;

                //    default:
            //        break;
            //}


                #endregion

            catch (Exception exception)
            {
                Logger.LogWriter.Log.Logging(new Exception("Error occured in NewDoctorRequestService.asmx/ApproveOrRejectAll : " + exception.Message));
                retrunstr = exception.Message;
                //if (insertTransaction != null) insertTransaction.Rollback();
            }
            return retrunstr;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ApproveOrRejectAll(string status, string role, string empId, string docid, string comments)
        {
            string retrunstr = string.Empty;
            string userId = Session["CurrentUserId"].ToString();
            string EmployeeName = "", SpoNamewithTerritory = "", ManagerName = "", BUH = "", msg = "";
            int countSuccess = 0;
            try
            {
                #region Process On Work
                string CurrentUserID = Session["CurrentUserId"].ToString();
                string CurrentUserRole = Context.Session["CurrentUserRole"].ToString();
                string returnString = "";
                int level1id = 0, level2id = 0, level3id = 0, level4id = 0, level5id = 0, level6id = 0;
                NameValueCollection _nvCollection = new NameValueCollection();

                switch (status)
                {
                    case "1":
                        _nvCollection.Clear();
                        _nvCollection.Add("@status-int", status.ToString());
                        _nvCollection.Add("@EmployeeID-int", CurrentUserID);
                        _nvCollection.Add("@docid-varchar(250)", docid.ToString());
                        _nvCollection.Add("@role-nvarchar(50)", CurrentUserRole.ToString());
                        _nvCollection.Add("@comments-nvarchar(255)", comments.ToString());
                        DataSet result = dl.GetData("sp_ApproveOrRejectDocRequest_bulkUploaderApprove", _nvCollection);
                        retrunstr = result.Tables[0].ToJsonString();
                        if (CurrentUserRole.ToUpper() == "RL4")
                        {
                            if (result.Tables[1].Rows.Count != 0)
                            {
                                DoctorsService Email = new DoctorsService();
                                String excelURL = ExcelHelper.DataTableToExcelAddToListForEmailResult(result, "New Doctor Request For Mobile");
                                string emailAddresses = result.Tables[1].Rows[0][1].ToString();

                                foreach (String emailAddress in emailAddresses.Split(';'))
                                {
                                    try
                                    {
                                        Email.SendMail("New Doctor Request For Mobile Sheet, Please Review", emailAddress, empId, "0", "0", "0", docid, "Processed", EmployeeName, SpoNamewithTerritory, BUH, ManagerName, msg);
                                        PocketDCR2.Classes.Constants.ErrorLog("SUCCESS :: New Doctor Request For Mobile Proccessed And Email Send " + emailAddresses + ". Emailed Sheet Is:" + excelURL);
                                    }
                                    catch (Exception ex)
                                    {
                                        retrunstr = result.Tables[2].ToJsonString();
                                        //throw ex;
                                    }
                                }
                            }
                            retrunstr = result.Tables[0].ToJsonString();
                        }
                        break;
                    case "2":
                        _nvCollection.Clear();
                        _nvCollection.Add("@status-int", status.ToString());
                        _nvCollection.Add("@empId-int", CurrentUserID);
                        _nvCollection.Add("@docid-int", docid.ToString());
                        _nvCollection.Add("@role-nvarchar(50)", CurrentUserRole.ToString());
                        _nvCollection.Add("@comments-nvarchar(255)", comments.ToString());
                        DataSet result1 = dl.GetData("sp_ApproveOrRejectDocRequest_bulkUploaderReject", _nvCollection);
                        break;
                }


                //retrunstr = result.Tables[0].ToJsonString();
            }


                //switch (role)
            //{
            //    case "rl5":
            //        DataSet ds = new DataSet();
            //        for (int a = 0; a <= empId.Split(',').Length - 1; a++)
            //        {
            //            nv.Clear();
            //            nv.Add("@status-int", status.ToString());
            //            nv.Add("@empId-int", empId.Split(',')[a].ToString());
            //            nv.Add("@docid-int", docid.Split(',')[a].ToString());
            //            nv.Add("@role-nvarchar(50)", role.ToString());
            //            nv.Add("@comments-nvarchar(255)", comments.ToString());

                //            ds = dl.GetData("sp_ApproveOrRejectDocRequest", nv);
            //            if (ds.Tables[0].Rows.Count > 0)
            //                countSuccess++;
            //        }
            //        ds.Tables[0].Rows[0][0] += "-" + countSuccess.ToString();

                //        retrunstr = ds.Tables[0].ToJsonString();
            //        break;





                //    case "admin":
            //        DataSet dsadmin = new DataSet();
            //        for (int a = 0; a <= empId.Split(',').Length - 1; a++)
            //        {

                //            nv.Clear();
            //            nv.Add("@status-int", status.ToString());
            //            nv.Add("@empId-int", empId.Split(',')[a].ToString());
            //            nv.Add("@docid-int", docid.Split(',')[a].ToString());
            //            nv.Add("@role-nvarchar(50)", role.ToString());
            //            nv.Add("@comments-nvarchar(255)", comments.ToString());

                //            dsadmin = dl.GetData("sp_ApproveOrRejectDocRequest", nv);
            //            if (dsadmin.Tables[0].Rows.Count > 0)
            //                countSuccess++;

                //        }
            //        dsadmin.Tables[0].Rows[0][0] += "-" + countSuccess.ToString();
            //        retrunstr = dsadmin.Tables[0].ToJsonString();
            //        break;

                //    default:
            //        break;
            //}


                #endregion

            catch (Exception exception)
            {
                Logger.LogWriter.Log.Logging(new Exception("Error occured in NewDoctorRequestService.asmx/ApproveOrRejectAll : " + exception.Message));
                retrunstr = exception.Message;
                //if (insertTransaction != null) insertTransaction.Rollback();
            }
            return retrunstr;
        }



        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetRequestDoctorDetails(string requestID)
        {
            string result = string.Empty;

            try
            {

                nv.Clear();
                nv.Add("@requestDoctorID-int", requestID);

                var data = dl.GetData("sp_getDocRequest", nv);
                if (data.Tables[0].Rows.Count > 0)
                {
                    result = data.Tables[0].ToJsonString();
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
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateDoctorDetails(string ID, string DoctorName, string Address1, string Address2, string City, string Country, string MobileNumber1, string MobileNumber2, string DesignationID, string SpecialityID, string QualificationID, string ClassID)
        {
            string result = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("@ID-int", ID);
                nv.Add("@DoctorName-varchar(255)", DoctorName);
                nv.Add("@Address1-varchar(255)", Address1);
                nv.Add("@Address2-varchar(255)", Address2);
                nv.Add("@City-varchar(255)", City);
                nv.Add("@Country-varchar(255)", Country);
                nv.Add("@MobileNumber1-varchar(255)", MobileNumber1);
                nv.Add("@MobileNumber2-varchar(255)", MobileNumber2);
                nv.Add("@DesignationID-varchar(10)", DesignationID);
                nv.Add("@SpecialityID-varchar(10)", SpecialityID);
                nv.Add("@QualificationID-varchar(10)", QualificationID);
                nv.Add("@ClassID-varchar(10)", ClassID);
                var data = dl.UpdateData("sp_UpdateDoctorDetails", nv);
                if (data)
                {
                    result = "OK";
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
    }
}