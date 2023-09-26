using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web.Script.Services;
using System.Web.Services;
using DatabaseLayer.SQL;
using PocketDCR2.Classes;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for SchdulerDayView1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [ScriptService]
    public class SchdulerDayView1 : System.Web.Services.WebService
    {

        readonly DAL _dl = new DAL();

        private readonly DatabaseDataContext _dataContext =
            new DatabaseDataContext(Constants.GetConnectionString());

        [WebMethod]
        public string SaveCall(string isPlanned, string date, string startTime, string docDetail, string endTime,
            string activity, string reason, string product1, string product2, string product3, string product4,
            string sample1, string sampleQty1, string sample2, string sampleQty2, string sample3, string sampleQty3,
            string jvflm, string jvslm, string gift, string giftQty, string callNotes, string employeeId, string coaching)
        {
            string returnString;
            string level3 = null, level4 = null, level5 = null, level6 = null;
            var doctorId = "";
            string classId = "", specialityId = "", qulificationId = "";

            try
            {
                date = date + " " + startTime;
                DateTime result;
                if (!DateTime.TryParse(date, out result))
                {
                    returnString = "DateTime Format Is invalid";
                    return returnString;
                }

                #region Employee Information
                var dsEmployeeMemberShipInfo = _dl.GetData("sp_EmployeeMembershipSelectByEmployee",
                    new NameValueCollection { { "@EmployeeId-BIGINT", employeeId } });
                if (dsEmployeeMemberShipInfo != null)
                {
                    var dsEmployeeHierarchy = _dl.GetData("sp_EmplyeeHierarchySelect",
                        new NameValueCollection { { "@SystemUserID-BIGINT", dsEmployeeMemberShipInfo.Tables[0].Rows[0]["SystemUserID"].ToString() } });
                    if (dsEmployeeHierarchy != null)
                    {
                        level3 = dsEmployeeHierarchy.Tables[0].Rows[0]["LevelId3"].ToString();
                        level4 = dsEmployeeHierarchy.Tables[0].Rows[0]["LevelId4"].ToString();
                        level5 = dsEmployeeHierarchy.Tables[0].Rows[0]["LevelId5"].ToString();
                        level6 = dsEmployeeHierarchy.Tables[0].Rows[0]["LevelId6"].ToString();
                    }
                }
                else
                {
                    returnString = "Employee Not Found";
                    return returnString;
                }
                #endregion

                #region Get Doctor Details
                var doctorCode = docDetail.Split('-')[0];
                var dsGetMrDoctorDetails = _dl.GetData("sp_MRDoctorSelectByCode", new NameValueCollection { { "@EmployeeId-bigint", employeeId }, { "@Code-nvarchar-20", doctorCode } });
                if (dsGetMrDoctorDetails != null)
                {
                    if (dsGetMrDoctorDetails.Tables[0].Rows.Count > 0)
                    {
                        doctorId = dsGetMrDoctorDetails.Tables[0].Rows[0]["DoctorId"].ToString();

                        #region Get Class Of Doctor

                        var doctorClassDetail = _dl.GetData("sp_ClassOfDoctorSelect",
                            new NameValueCollection { { "@DoctorId-bigint", doctorId } });
                        if (doctorClassDetail != null)
                            if (doctorClassDetail.Tables[0].Rows.Count > 0)
                            {
                                classId = doctorClassDetail.Tables[0].Rows[0]["ClassId"].ToString();
                            }
                            else
                            {
                                returnString = "Class Of Doctor Not Found";
                                return returnString;
                            }

                        #endregion

                        #region Get Speciality Of Doctor

                        var doctorSpecialityDetail = _dl.GetData("sp_DoctorSpecialitySelectByDoctor",
                            new NameValueCollection { { "@DoctorId-BIGINT", doctorId } });
                        if (doctorSpecialityDetail != null)
                            if (doctorSpecialityDetail.Tables[0].Rows.Count > 0)
                            {
                                specialityId = doctorSpecialityDetail.Tables[0].Rows[0]["SpecialityId"].ToString();
                            }
                            else
                            {
                                returnString = "Speciality Of Doctor Not Found";
                                return returnString;
                            }

                        #endregion

                        #region Get Qualification Of Doctor

                        var doctorQualificationDetail = _dl.GetData("sp_QualificationsOfDoctorsSelectByDoctor",
                            new NameValueCollection { { "@DoctorId-BIGINT", doctorId } });
                        if (doctorQualificationDetail != null)
                            if (doctorQualificationDetail.Tables[0].Rows.Count > 0)
                            {
                                qulificationId = doctorQualificationDetail.Tables[0].Rows[0]["QulificationId"].ToString();
                            }
                            else
                            {
                                returnString = "Qualification Of Doctor Not Found";
                                return returnString;
                            }

                        #endregion
                    }
                }
                else
                {
                    returnString = "Doctor Not Found in Doctor List Of MIO";
                    return returnString;
                }

                #endregion

                #region Get Visit Shift

                var hour = Convert.ToInt32(result.ToString("HH"));

                string vt;
                if (hour >= 0 && hour < 12)
                {
                    vt = "1";
                }
                else if (hour < 17)
                {
                    vt = "1";
                }
                else
                {
                    vt = "2";
                }



                #endregion

                #region PreSalesCallInsert

                long salesCallsId;

                var check_call = _dl.GetData("sp_check_call_execute", new NameValueCollection { { "@Level3LevelId-int,", level3 }, { "@Level4LevelId-int,", level4 }, { "@Level5LevelId-int,", level5 }, { "@Level6LevelId-int,", level6 }, { "@ClassId-int,", classId }, { "@SpecialityId-int", specialityId }, { "@QualificationId-int,", qulificationId }, { "@DoctorId-bigint", doctorId }, { "@EmployeeId-bigint", employeeId }, { "@IsPlanned-VARCHAR-50", isPlanned == "No" ? "NULL" : isPlanned }, { "@visitdate-datetime", result.ToString() }, });
                if (check_call != null)
                {
                    returnString = "Already Executed";
                    return returnString;
                }


                // Validation not allow Execution in Same Timing
                //var check_call2 = _dl.GetData("sp_check_call_ExecutionTime", new NameValueCollection { { "@Level3LevelId-int,", level3 }, { "@Level4LevelId-int,", level4 }, { "@Level5LevelId-int,", level5 }, { "@Level6LevelId-int,", level6 }, { "@EmployeeId-bigint", employeeId }, { "@visitdate-datetime", result.ToString() }, });
                //if (check_call2.Tables[0].Rows.Count > 0)
                //{
                //    returnString = "Call already executed in selected time range";
                //    return returnString;
                //}


                else
                {
                    var dsPreSalesCalls = _dl.GetData("sp_PreSalesCallsInsert2", new NameValueCollection { { "@VisitDateTime-datetime", result.ToString() }, { "@Level1LevelId-int,", "NULL" }, { "@Level2LevelId-int,", "NULL" }, { "@Level3LevelId-int,", level3 }, { "@Level4LevelId-int,", level4 }, { "@Level5LevelId-int,", level5 }, { "@Level6LevelId-int,", level6 }, { "@ClassId-int,", classId }, { "@SpecialityId-int", specialityId }, { "@QulificationId-int,", qulificationId }, { "@CreationDateTime-datetime", DateTime.Now.ToString() }, { "@CallTypeId-int", "1" }, { "@VisitShift-int,", vt }, { "@DoctorId-bigint", doctorId }, { "@EmployeeId-bigint", employeeId }, { "@InboundId-bigint", "NULL" }, { "@DocCode-INT", doctorCode }, { "@IsPlanned-VARCHAR-50", isPlanned == "No" ? "NULL" : isPlanned }, { "@ActivityID-INT", "1" }, { "@ReasonID-INT", reason } });
                    if (dsPreSalesCalls != null)
                    {
                        if (dsPreSalesCalls.Tables[0].Rows.Count > 0)
                        {
                            salesCallsId = Convert.ToInt64(dsPreSalesCalls.Tables[0].Rows[0]["SalesCallId"].ToString());
                        }
                        else
                        {
                            returnString = "Error In Saving In PreSalesCalls";
                            return returnString;
                        }
                    }
                    else
                    {
                        returnString = "Error In Saving In PreSalesCalls";
                        return returnString;
                    }
                }
                #endregion

                #region CallDoctors


                // ReSharper disable once UnusedVariable
                if (_dataContext != null)
                {
                    var insertCallDoctors = _dataContext.sp_CallDoctorsInsert(salesCallsId, Convert.ToInt64(doctorId)).ToList();
                }

                #endregion

                #region CallVisitors

                if (!Convert.ToBoolean(coaching))
                {
                    // ReSharper disable once UnusedVariable
                    var dsIsCoaching = _dl.InserData("sp_InsertCallCoaching",
                        new NameValueCollection
                    {
                        {"@SalesCallId-INT", salesCallsId.ToString()},
                        {"@IsCoaching-VARCHAR-50", "0"}
                    });
                }
                else
                {
                    // ReSharper disable once UnusedVariable
                    var dsIsCoaching = _dl.InserData("sp_InsertCallCoaching",
                        new NameValueCollection
                    {
                        {"@SalesCallId-INT", salesCallsId.ToString()},
                        {"@IsCoaching-VARCHAR-50", "1"}
                    });
                }

                long jvflma = 0;
                long jvslma = 0;
                if (Convert.ToBoolean(jvflm))
                {
                    var dsFlm = _dl.GetData("sp_EmployeesSelect", new NameValueCollection { { "@EmployeeId-BIGINT", employeeId } });
                    if (dsFlm != null)
                    {
                        if (dsFlm.Tables[0].Rows.Count > 0)
                        {
                            jvflma = Convert.ToInt64(dsFlm.Tables[0].Rows[0]["ManagerId"].ToString());
                        }
                    }
                }
                if (Convert.ToBoolean(jvslm))
                {
                    var dsFlm = _dl.GetData("sp_EmployeesSelect", new NameValueCollection { { "@EmployeeId-BIGINT", employeeId } });
                    if (dsFlm != null)
                    {
                        if (dsFlm.Tables[0].Rows.Count > 0)
                        {
                            jvflma = Convert.ToInt64(dsFlm.Tables[0].Rows[0]["ManagerId"].ToString());
                            var dsSlm = _dl.GetData("sp_EmployeesSelect", new NameValueCollection { { "@EmployeeId-BIGINT", Convert.ToString(jvflma) } });
                            if (dsSlm != null)
                            {
                                if (dsSlm.Tables[0].Rows.Count > 0)
                                {
                                    jvslma = Convert.ToInt64(dsFlm.Tables[0].Rows[0]["ManagerId"].ToString());
                                }
                            }
                        }
                    }
                }

                // ReSharper disable once UnusedVariable
                if (_dataContext != null)
                {
                    if (jvflma == 0 && jvslma == 0)
                    {
                        var insertCallVisitor = _dataContext.sp_CalVisitorsInsertNew_withjv8(salesCallsId, Convert.ToInt64(employeeId), null, null, null, null, null, null, null, null).ToList();
                    }
                    else
                    {
                        // ReSharper disable once UnusedVariable
                        var insertCallVisitor = _dataContext.sp_CalVisitorsInsertNew_withjv8(salesCallsId, Convert.ToInt64(employeeId), jvflma, jvslma, 0, 0, 0, 0, 0, 0).ToList();
                    }

                }

                #endregion

                #region VisitFeedBack

                if (_dataContext != null)
                {
                    // ReSharper disable once UnusedVariable
                    var insertFeedBack = _dataContext.sp_VisitFeedBackInsert(salesCallsId, callNotes).ToList();
                }

                #endregion

                #region CallProducts

                // ReSharper disable once NotAccessedVariable
                List<CallProduct> insertCallProduct;

                if (product1 != "-1")
                {
                    if (_dataContext != null)
                        // ReSharper disable once RedundantAssignment
                        insertCallProduct =
                            _dataContext.sp_CallProductsInsert(Convert.ToInt32(product1), salesCallsId, 0, Convert.ToInt32(product1), 1).ToList();
                }


                if (product2 != "-1")
                {
                    if (_dataContext != null)
                        // ReSharper disable once RedundantAssignment
                        insertCallProduct =
                            _dataContext.sp_CallProductsInsert(Convert.ToInt32(product2), salesCallsId, 0, Convert.ToInt32(product1), 2).ToList();
                }

                if (product3 != "-1")
                {
                    if (_dataContext != null)
                        // ReSharper disable once RedundantAssignment
                        insertCallProduct =
                            _dataContext.sp_CallProductsInsert(Convert.ToInt32(product3), salesCallsId, 0, Convert.ToInt32(product3), 3).ToList();
                }

                if (product4 != "-1")
                {
                    if (_dataContext != null)
                        // ReSharper disable once RedundantAssignment
                        insertCallProduct =
                            _dataContext.sp_CallProductsInsert(Convert.ToInt32(product4), salesCallsId, 0, Convert.ToInt32(product4), 4).ToList();
                }


                #endregion

                #region CallProductSamples

                // ReSharper disable once NotAccessedVariable
                List<CallProductSample> insertCallProductSample;

                if (sample1 != "-1" && sampleQty1 != "")
                {
                    // ReSharper disable once RedundantAssignment
                    if (_dataContext != null)
                        insertCallProductSample =
                            _dataContext.sp_CallProductSamplesInsert(salesCallsId, Convert.ToInt32(sample1), Convert.ToInt32(sample1), Convert.ToInt32(sampleQty1), 1).ToList();
                }


                if (sample2 != "-1" && sampleQty2 != "")
                {
                    // ReSharper disable once RedundantAssignment
                    if (_dataContext != null)
                        insertCallProductSample =
                            _dataContext.sp_CallProductSamplesInsert(salesCallsId, Convert.ToInt32(sample2), Convert.ToInt32(sample2), Convert.ToInt32(sampleQty2), 2).ToList();
                }

                if (sample3 != "-1" && sampleQty3 != "")
                {
                    // ReSharper disable once RedundantAssignment
                    insertCallProductSample =
                        _dataContext.sp_CallProductSamplesInsert(salesCallsId, Convert.ToInt32(sample3), Convert.ToInt32(sample3), Convert.ToInt32(sampleQty3), 3).ToList();
                }

                #endregion

                #region CallGifts

                // ReSharper disable once NotAccessedVariable
                List<CallGift> insertCallGift;

                if (gift != "-1")
                {
                    // ReSharper disable once RedundantAssignment
                    insertCallGift = giftQty != "" ? _dataContext.sp_CallGiftsInsert(salesCallsId, Convert.ToInt32(gift), Convert.ToInt32(giftQty), 1).ToList() : _dataContext.sp_CallGiftsInsert(salesCallsId, Convert.ToInt32(gift), 0, 1).ToList();
                }


                #endregion

                returnString = "CallSaved";
            }
            catch (Exception exception)
            {
                returnString = "Message: " + exception.Message + " - StackTrace: " + exception.StackTrace;
            }

            return returnString;
        }


        [WebMethod]
        public string IsPlanExecuted(string planId, string doctorId, string employeeId, string date)
        {
            var returnString = "";
            try
            {
                var dsisPlanCheck = _dl.GetData("selectPresalesCallswithPlanId", new NameValueCollection { { "@PlanId-INT", planId }, { "@DoctorID-INT", doctorId }, { "@EmployeeID-INT", employeeId }, { "@Day-INT", Convert.ToString(Convert.ToDateTime(date).Day) }, { "@Month-INT", Convert.ToString(Convert.ToDateTime(date).Month) }, { "@Year-INT", Convert.ToString(Convert.ToDateTime(date).Year) } });
                if (dsisPlanCheck == null) return returnString;
                returnString = dsisPlanCheck.Tables[0].Rows.Count > 0 ? "ExecutedPlan" : "unExecutedPlan";
                
            }
            catch (Exception ex)
            {

            }
            return returnString;
        }


        [WebMethod]
        public string GetSchedulerDayView(string employeeId, string dateTime)
        {
            var returnString = "";
            try
            {
                var dat = Convert.ToDateTime(dateTime);
                var dsDayViewReslt = _dl.GetData("Call_GetSchedulerDayView", new NameValueCollection { { "@EmployeeId-INT", employeeId }, { "@PlanDateTime-DATETIME", dat.ToString() } });
                if (dsDayViewReslt != null)
                {
                    returnString = dsDayViewReslt.Tables[0].ToJsonString();
                }

            }
            catch (Exception ex)
            {

            }
            return returnString;
        }

        [WebMethod]
        public string GetPlanStatus(string employeeId, string dateTime)
        {
            var returnString = "";
            try
            {
                var initial = Convert.ToDateTime(dateTime);
                var planMonthFrom = new DateTime(initial.Year, initial.Month, 1, 0, 0, 0);
                var planMonthTo = new DateTime(initial.Year, initial.Month, 1, 23, 59, 59);
                var dsDayViewReslt = _dl.GetData("Call_GetMonthlystatusforEmployee", new NameValueCollection { { "@EmployeeId-INT", employeeId }, { "@PlanMonthFrom-DATETIME", planMonthFrom.ToString() }, { "@PlanMonthTo-DATETIME", planMonthTo.ToString() } });
                if (dsDayViewReslt != null)
                {
                    returnString = dsDayViewReslt.Tables[0].ToJsonString();
                }

            }
            catch (Exception ex)
            {

            }
            return returnString;
        }

        [WebMethod]
        public string GetActivity()
        {
            var returnResult = string.Empty;
            try
            {
                var dsActivity = _dl.GetData("Call_GetCallPlannerActivities", null);
                if (dsActivity != null)
                {
                    returnResult = dsActivity.Tables[0].ToJsonString();
                }
            }
            catch (Exception ex)
            {
                returnResult = ex.Message;
            }

            return returnResult;
        }

        [WebMethod]
        public string CheckLeaves(string employeeId, string date)
        {
            var returnString = "";
            try
            {
                var CheckLeaves = _dl.GetData("sp_check_ZSM_MIO_leave", new NameValueCollection { { "@Startdate-date", date }, { "@Enddate-date", date }, { "@employeeid-INT", employeeId } });
                if (CheckLeaves == null) return returnString;
                returnString = CheckLeaves.Tables[0].Rows[0][0].ToString() == "Available" ? "Leave Marked" : "Leave Not Marked";

            }
            catch (Exception ex)
            {

            }
            return returnString;
        }

    }
}
