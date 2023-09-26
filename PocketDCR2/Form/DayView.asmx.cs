using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web.Script.Services;
using System.Web.Services;
using DatabaseLayer.SQL;
using PocketDCR2.Classes;
using System.Data;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for DayView1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [ScriptService]
    public class DayView1 : System.Web.Services.WebService
    {
        readonly DAL _dl = new DAL();

        private readonly DatabaseDataContext _dataContext =
            new DatabaseDataContext(Constants.GetConnectionString());

        [WebMethod]
        public string SaveCall(string isPlanned, string date, string startTime, string docDetail, string endTime,
            string activity, string reason, string product1, string product2, string product3, string product4,
            string sample1, string sampleQty1, string sample2, string sampleQty2, string sample3, string sampleQty3,
            string jvflm, string jvslm, string jvftm, string jvbuh, string jvgm, string jvcoo, string jvcd, string jvpm, string gift, string giftQty, string callNotes, string employeeId, string coaching,
            string p1Notes, string p2Notes, string p3Notes, string p4Notes)
        {
            string returnString;
            string level3 = null, level4 = null, level5 = null, level6 = null;
            var doctorId = "";
            string classId = "", specialityId = "", qulificationId = "";
            int month = 0;
            int year = 0;
            NameValueCollection _nvCollection = new NameValueCollection();

            try
            {
                date = date + " " + startTime;
                DateTime result;
                if (!DateTime.TryParse(date, out result))
                {
                    returnString = "DateTime Format Is invalid";
                    return returnString;
                }

                month = result.Month;
                year = result.Year;

                #region preedays work

                string dt_temp = "";
                string pree_day = "0";
                int aloowsDays = 24;

                dt_temp = Convert.ToString(result).ToString();

                _nvCollection.Clear();
                _nvCollection.Add("@EmployeeId-bigint", employeeId.ToString());

                DataSet ds_p = _dl.GetData("sp_SelectEmployeePree_days_withEmpID", _nvCollection);
                if (ds_p != null)
                {
                    if (ds_p.Tables[0].Rows.Count > 0)
                    {
                        pree_day = ds_p.Tables[0].Rows[0]["pree_days"].ToString();

                        if (pree_day == "")
                        {
                            pree_day = "0";
                        }
                        else if (ds_p.Tables[0].Rows[0]["pree_days"] == null)
                        {
                            pree_day = "0";
                        }

                    }
                }

                if (Convert.ToDateTime(Convert.ToDateTime(dt_temp).ToString("MM/dd/yyyy")) <= Convert.ToDateTime(System.DateTime.Now.ToString("MM/dd/yyyy")))
                {
                    if (DATEDIFFForHours("Hours", Convert.ToDateTime(dt_temp), Convert.ToDateTime(System.DateTime.Now)) > 24)
                    {
                        if (DATEDIFFForHours("Hours", Convert.ToDateTime(dt_temp), Convert.ToDateTime(System.DateTime.Now)) > ((Convert.ToInt32(pree_day) * aloowsDays) + 24))
                        {
                            returnString = "PreeDays";
                            return returnString;
                        }
                    }
                }
                else
                {
                    returnString = "Not Allowed";
                    return returnString;
                }

                #endregion

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
                //var dsGetMrDoctorDetails = _dl.GetData("sp_MRDoctorSelectByCode", new NameValueCollection { { "@EmployeeId-bigint", employeeId }, { "@Code-nvarchar-20", doctorCode } });+
                var dsGetMrDoctorDetails = _dl.GetData("sp_MRDoctorSelectByCode_new", new NameValueCollection { { "@EmployeeId-bigint", employeeId }, { "@Code-nvarchar-20", doctorCode }, { "@month-int", month.ToString() }, { "@year-int", year.ToString() } });
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


                long salesCallsId;
                #region PreSalesCallInsert

                DataSet setcall = _dl.GetData("sp_check_call_execute", new NameValueCollection { { "@Level3LevelId-int,", level3 }, { "@Level4LevelId-int,", level4 }, { "@Level5LevelId-int,", level5 }, { "@Level6LevelId-int,", level6 }, { "@ClassId-int,", classId }, { "@SpecialityId-int", specialityId }, { "@QualificationId-int,", qulificationId }, { "@DoctorId-bigint", doctorId }, { "@EmployeeId-bigint", employeeId }, { "@IsPlanned-VARCHAR-50", isPlanned == "No" ? "NULL" : isPlanned }, { "@visitdate-datetime", result.ToString() }, });
                if (setcall.Tables[0].Rows.Count > 0)
                {
                    returnString = "Already Executed";
                    return returnString;
                }
                else
                {

                    DataSet set = _dl.GetData("sp_check_call_execute", new NameValueCollection { { "@Level3LevelId-int,", level3 }, { "@Level4LevelId-int,", level4 }, { "@Level5LevelId-int,", level5 }, { "@Level6LevelId-int,", level6 }, { "@ClassId-int,", classId }, { "@SpecialityId-int", specialityId }, { "@QualificationId-int,", qulificationId }, { "@DoctorId-bigint", doctorId }, { "@EmployeeId-bigint", employeeId }, { "@IsPlanned-VARCHAR-50", isPlanned == "No" ? "NULL" : isPlanned }, { "@visitdate-datetime", result.ToString() }, });
                    if (set.Tables[0].Rows.Count > 0)
                    {
                        returnString = "Already Executed";
                        return returnString;
                    }

                    //Validation not allow Execution in Same Timing
                    DataSet set3 = _dl.GetData("sp_check_call_ExecutionTime", new NameValueCollection { { "@Level3LevelId-int,", level3 }, { "@Level4LevelId-int,", level4 }, { "@Level5LevelId-int,", level5 }, { "@Level6LevelId-int,", level6 }, { "@EmployeeId-bigint", employeeId }, { "@visitdate-datetime", result.ToString() }, });
                    if (set3.Tables[0].Rows.Count > 0)
                    {
                        returnString = "Call already executed in selected time range";
                        return returnString;
                    }

                    else
                    {

                        if (isPlanned == "No")
                        {

                            DataSet set2 = _dl.GetData("sp_check_CallExecuteForUnplanned", new NameValueCollection { { "@DoctorId-bigint", doctorId }, { "@EmployeeId-bigint", employeeId }, { "@visitdate-datetime", result.ToString() }, });
                            if (set2.Tables[0].Rows.Count > 0)
                            {
                                returnString = "Planned";
                                return returnString;
                            }
                            else
                            {




                                var _nvs = new NameValueCollection { { "@VisitDateTime-datetime", result.ToString() }, 
                            { "@Level1LevelId-int,", "NULL" }, { "@Level2LevelId-int,", "NULL" }, { "@Level3LevelId-int,", level3 }, 
                            { "@Level4LevelId-int,", level4 }, { "@Level5LevelId-int,", level5 }, { "@Level6LevelId-int,", level6 }, 
                            { "@ClassId-int,", classId }, { "@SpecialityId-int", specialityId }, { "@QulificationId-int,", qulificationId }, 
                            { "@CreationDateTime-datetime", DateTime.Now.ToString() }, { "@CallTypeId-int", "1" }, { "@VisitShift-int,", vt }, 
                            { "@DoctorId-bigint", doctorId }, { "@EmployeeId-bigint", employeeId }, { "@InboundId-bigint", "NULL" }, 
                            { "@DocCode-INT", doctorCode }, 
                            { "@IsPlanned-VARCHAR-50", isPlanned == "No" ? "NULL" : isPlanned }, 
                            { "@ActivityID-INT", "1" }, { "@ReasonID-INT", reason } };

                                var dsPreSalesCalls = _dl.GetData("sp_PreSalesCallsInsert2", _nvs);
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
                        }
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
                //ZSM
                long jvflma = 0;
                //RSM
                long jvslma = 0;
                long jvftma = jvftm == "true" ? 1 : 0;
                //NSM
                long jvbuha = 0;
                //GM
                long jvgma = 0;
                long jvcooa = jvcoo == "true" ? 1 : 0;
                long jvcda = jvcd == "true" ? 1 : 0;
                long jvpma = jvpm == "true" ? 1 : 0;
                //Check if Joint Visit is with ZSM
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
                //Check if Joint Visit is with RSM
                if (Convert.ToBoolean(jvslm))
                {
                    var dsFlm = _dl.GetData("sp_EmployeesSelect", new NameValueCollection { { "@EmployeeId-BIGINT", employeeId } });
                    if (dsFlm != null)
                    {
                        if (dsFlm.Tables[0].Rows.Count > 0)
                        {
                            jvflma = Convert.ToInt64(dsFlm.Tables[0].Rows[0]["ManagerId"].ToString());
                            //var dsSlm = _dl.GetData("sp_EmployeesSelect", new NameValueCollection { { "@EmployeeId-BIGINT", Convert.ToString(jvflma) } });
                            var dsSlm = _dl.GetData("sp_EmployeesSelect", new NameValueCollection { { "@EmployeeId-BIGINT", Convert.ToString(Convert.ToInt64(dsFlm.Tables[0].Rows[0]["ManagerId"].ToString())) } });
                            if (dsSlm != null)
                            {
                                if (dsSlm.Tables[0].Rows.Count > 0)
                                {
                                    jvslma = Convert.ToInt64(dsSlm.Tables[0].Rows[0]["ManagerId"].ToString());
                                }
                            }
                        }
                    }
                }
                //Check if Joint Visit is with NSM
                if (Convert.ToBoolean(jvbuh))
                {
                    var dsFlm = _dl.GetData("sp_EmployeesSelect", new NameValueCollection { { "@EmployeeId-BIGINT", employeeId } });
                    if (dsFlm != null)
                    {
                        if (dsFlm.Tables[0].Rows.Count > 0)
                        {
                            jvflma = Convert.ToInt64(dsFlm.Tables[0].Rows[0]["ManagerId"].ToString());
                            //var dsSlm = _dl.GetData("sp_EmployeesSelect", new NameValueCollection { { "@EmployeeId-BIGINT", Convert.ToString(jvflma) } });
                            var dsSlm = _dl.GetData("sp_EmployeesSelect", new NameValueCollection { { "@EmployeeId-BIGINT", Convert.ToString(Convert.ToInt64(dsFlm.Tables[0].Rows[0]["ManagerId"].ToString())) } });
                            if (dsSlm != null)
                            {
                                if (dsSlm.Tables[0].Rows.Count > 0)
                                {
                                    jvslma = Convert.ToInt64(dsSlm.Tables[0].Rows[0]["ManagerId"].ToString());
                                    var dsBuh = _dl.GetData("sp_EmployeesSelect", new NameValueCollection { { "@EmployeeId-BIGINT", Convert.ToString(Convert.ToInt64(dsSlm.Tables[0].Rows[0]["ManagerId"].ToString())) } });

                                    if (dsBuh != null)
                                    {
                                        if (dsBuh.Tables[0].Rows.Count > 0)
                                        {

                                            jvbuha = Convert.ToInt64(dsBuh.Tables[0].Rows[0]["ManagerId"].ToString());
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                //Check if Joint Visit is with GM
                if (Convert.ToBoolean(jvgm))
                {
                    var dsFlm = _dl.GetData("sp_EmployeesSelect", new NameValueCollection { { "@EmployeeId-BIGINT", employeeId } });
                    if (dsFlm != null)
                    {
                        if (dsFlm.Tables[0].Rows.Count > 0)
                        {
                            jvflma = Convert.ToInt64(dsFlm.Tables[0].Rows[0]["ManagerId"].ToString());
                            //var dsSlm = _dl.GetData("sp_EmployeesSelect", new NameValueCollection { { "@EmployeeId-BIGINT", Convert.ToString(jvflma) } });
                            var dsSlm = _dl.GetData("sp_EmployeesSelect", new NameValueCollection { { "@EmployeeId-BIGINT", Convert.ToString(Convert.ToInt64(dsFlm.Tables[0].Rows[0]["ManagerId"].ToString())) } });
                            if (dsSlm != null)
                            {
                                if (dsSlm.Tables[0].Rows.Count > 0)
                                {
                                    jvslma = Convert.ToInt64(dsSlm.Tables[0].Rows[0]["ManagerId"].ToString());
                                    var dsBuh = _dl.GetData("sp_EmployeesSelect", new NameValueCollection { { "@EmployeeId-BIGINT", Convert.ToString(Convert.ToInt64(dsSlm.Tables[0].Rows[0]["ManagerId"].ToString())) } });

                                    if (dsBuh != null)
                                    {
                                        if (dsBuh.Tables[0].Rows.Count > 0)
                                        {
                                            jvbuha = Convert.ToInt64(dsBuh.Tables[0].Rows[0]["ManagerId"].ToString());
                                            var dsGm = _dl.GetData("sp_EmployeesSelect", new NameValueCollection { { "@EmployeeId-BIGINT", Convert.ToString(Convert.ToInt64(dsBuh.Tables[0].Rows[0]["ManagerId"].ToString())) } });
                                            if (dsGm != null)
                                            {
                                                if (dsGm.Tables[0].Rows.Count > 0)
                                                {

                                                    jvgma = Convert.ToInt64((dsGm.Tables[0].Rows[0]["ManagerId"].ToString() == "" ? "1" : dsGm.Tables[0].Rows[0]["ManagerId"].ToString()));
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                jvflma = jvflm == "true" ? jvflma : 0;
                jvslma = jvslm == "true" ? jvslma : 0;
                jvbuha = jvbuh == "true" ? jvbuha : 0;
                jvgma = jvgm == "true" ? jvgma : 0;
                // ReSharper disable once UnusedVariable
                if (_dataContext != null)
                {
                    if (jvflm == "true" || jvslm == "true" || jvbuh == "true" || jvgm == "true" || jvcoo == "true" || jvcd == "true" || jvpm == "true")
                    {
                        if (jvflma == 0 && jvslma == 0 && jvftma == 0 && jvbuha == 0 && jvgma == 0 && jvcooa == 0 && jvcda == 0 && jvpma == 0)
                        {
                            var insertCallVisitor = _dataContext.sp_CalVisitorsInsertNew_withjv8(salesCallsId, Convert.ToInt64(employeeId), null, null, null, null, null, null, null, null).ToList();
                        }
                        else
                        {
                            var insertCallVisitor = _dataContext.sp_CalVisitorsInsertNew_withjv8(salesCallsId, Convert.ToInt64(employeeId), jvflma, jvslma, jvftma, jvbuha, jvgma, jvcooa, jvcda, jvpma).ToList();
                        }

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
                List<CallProduct> insertCallProduct = new List<CallProduct>();

                if (product1 != "-1")
                {
                    if (_dataContext != null)
                        // ReSharper disable once RedundantAssignment
                        insertCallProduct =
                            _dataContext.sp_CallProductsInsert(Convert.ToInt32(product1), salesCallsId, 0, Convert.ToInt32(product1), 1).ToList();
                    if (p1Notes != "" && insertCallProduct.Count > 0)
                    {
                        var dsPreSalesCalls = _dl.GetData("sp_CallProductCommentInsert",
                            new NameValueCollection { 
                                                { "@CallProductId-bigint", insertCallProduct[0].CallProductid.ToString() }, 
                                                { "@Comment-varchar(max),", p1Notes} 
                                                });
                    }

                }


                if (product2 != "-1")
                {
                    if (_dataContext != null)
                        // ReSharper disable once RedundantAssignment
                        insertCallProduct =
                            _dataContext.sp_CallProductsInsert(Convert.ToInt32(product2), salesCallsId, 0, Convert.ToInt32(product1), 2).ToList();
                    if (p2Notes != "" && insertCallProduct.Count > 0)
                    {
                        var dsPreSalesCalls = _dl.GetData("sp_CallProductCommentInsert",
                            new NameValueCollection { 
                                                { "@CallProductId-bigint", insertCallProduct[0].CallProductid.ToString() }, 
                                                { "@Comment-varchar(max),", p2Notes} 
                                                });
                    }

                }

                if (product3 != "-1")
                {
                    if (_dataContext != null)
                        // ReSharper disable once RedundantAssignment
                        insertCallProduct =
                            _dataContext.sp_CallProductsInsert(Convert.ToInt32(product3), salesCallsId, 0, Convert.ToInt32(product3), 3).ToList();
                    if (p3Notes != "" && insertCallProduct.Count > 0)
                    {
                        var dsPreSalesCalls = _dl.GetData("sp_CallProductCommentInsert",
                            new NameValueCollection { 
                                                { "@CallProductId-bigint", insertCallProduct[0].CallProductid.ToString() }, 
                                                { "@Comment-varchar(max),", p3Notes} 
                                                });
                    }
                }

                if (product4 != "-1")
                {
                    if (_dataContext != null)
                        // ReSharper disable once RedundantAssignment
                        insertCallProduct =
                            _dataContext.sp_CallProductsInsert(Convert.ToInt32(product4), salesCallsId, 0, Convert.ToInt32(product4), 4).ToList();
                    if (p4Notes != "" && insertCallProduct.Count > 0)
                    {
                        var dsPreSalesCalls = _dl.GetData("sp_CallProductCommentInsert",
                            new NameValueCollection { 
                                                { "@CallProductId-bigint", insertCallProduct[0].CallProductid.ToString() }, 
                                                { "@Comment-varchar(max),", p4Notes} 
                                                });
                    }
                }


                #endregion

                #region CallProductSamples

                // ReSharper disable once NotAccessedVariable
                List<CallProductSample> insertCallProductSample;

                if (sample1 != "-1" && sampleQty1 != "")
                {
                    var ProdSkuID = _dl.GetData("sp_Prod_SKUID", new NameValueCollection { { "@skuID-int", sample1 } });

                    int SampleProdID1 = Convert.ToInt32(ProdSkuID.Tables[0].Rows[0]["ProductId"].ToString());
                    // ReSharper disable once RedundantAssignment
                    if (_dataContext != null)
                        insertCallProductSample =
                            _dataContext.sp_CallProductSamplesInsert(salesCallsId, SampleProdID1, Convert.ToInt32(sample1), Convert.ToInt32(sampleQty1), 1).ToList();
                }


                if (sample2 != "-1" && sampleQty2 != "")
                {
                    var ProdSkuID = _dl.GetData("sp_Prod_SKUID", new NameValueCollection { { "@skuID-int", sample2 } });

                    int SampleProdID2 = Convert.ToInt32(ProdSkuID.Tables[0].Rows[0]["ProductId"].ToString());
                    // ReSharper disable once RedundantAssignment
                    if (_dataContext != null)
                        insertCallProductSample =
                            _dataContext.sp_CallProductSamplesInsert(salesCallsId, SampleProdID2, Convert.ToInt32(sample2), Convert.ToInt32(sampleQty2), 2).ToList();
                }

                if (sample3 != "-1" && sampleQty3 != "")
                {
                    var ProdSkuID = _dl.GetData("sp_Prod_SKUID", new NameValueCollection { { "@skuID-int", sample3 } });

                    int SampleProdID3 = Convert.ToInt32(ProdSkuID.Tables[0].Rows[0]["ProductId"].ToString());
                    // ReSharper disable once RedundantAssignment
                    insertCallProductSample =
                        _dataContext.sp_CallProductSamplesInsert(salesCallsId, SampleProdID3, Convert.ToInt32(sample3), Convert.ToInt32(sampleQty3), 3).ToList();
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
                Constants.ErrorLog("Exception Raising From DayView.asmx.cs SaveCall() | " + exception.Message + " | Stack Trace | " + exception.StackTrace + ";");
            }

            return returnString;
        }


        [WebMethod]
        public string IsPlanExecuted(string planId, string doctorId, string employeeId, string date)
        {
            var returnString = "";
            var dsisPlanCheck = _dl.GetData("selectPresalesCallswithPlanId", new NameValueCollection { { "@PlanId-INT", planId }, { "@DoctorID-INT", doctorId }, { "@EmployeeID-INT", employeeId }, { "@Day-INT", Convert.ToString(Convert.ToDateTime(date).Day) }, { "@Month-INT", Convert.ToString(Convert.ToDateTime(date).Month) }, { "@Year-INT", Convert.ToString(Convert.ToDateTime(date).Year) } });
            if (dsisPlanCheck == null) return returnString;
            returnString = dsisPlanCheck.Tables[0].Rows.Count > 0 ? "ExecutedPlan" : "unExecutedPlan";
            return returnString;
        }

        private int DATEDIFF(string interval, DateTime visitdatetime, DateTime createdDatetime)
        {
            int daysdiff = 0;

            TimeSpan span = createdDatetime.Subtract(visitdatetime);
            daysdiff = span.Days;
            return daysdiff;

        }

        private double DATEDIFFForHours(string interval, DateTime visitdatetime, DateTime createdDatetime)
        {
            double daysdiff = 0;

            TimeSpan span = createdDatetime.Subtract(visitdatetime);
            daysdiff = span.TotalHours;
            return daysdiff;

        }



    }
}
