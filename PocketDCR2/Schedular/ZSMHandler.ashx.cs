﻿using System;
using System.Web;
using System.Data;
using System.Text;
using SchedulerDAL;
using System.Collections;
using System.Collections.Generic;
using PocketDCR2.Classes;
using System.Collections.Specialized;
using System.Net.Mail;
using System.Configuration;

namespace PocketDCR2.Schedular
{
    /// <summary>
    /// Summary description for ZSMHandler
    /// </summary>
    public class ZSMHandler : IHttpHandler, System.Web.SessionState.IRequiresSessionState
    {
        HttpRequest Request;
        HttpResponse Response;
        DAL dl = new DAL();
        NameValueCollection _nv = new NameValueCollection();

        public void ProcessRequest(HttpContext context)
        {
            Request = context.Request;
            Response = context.Response;
            if (HttpContext.Current.Session["CurrentUserId"] == null)
            {
                Response.Redirect("CallPlannerMain.aspx");
            }
            switch (context.Request.QueryString["method"].ToLower())
            {
                case "getdoctorsbybrick":
                    ProcessGetDoctorsbyBrick();
                    break;
                case "getdoctorsbyclass":
                    ProcessGetDoctorsbyClass();
                    break;
                case "fillbricks":
                    fillBricks();
                    break;
                case "fillclasses":
                    fillClasses();
                    break;
                case "getmios":
                    ProcessGetMIOs();
                    break;
                case "fillbmd":
                    ProcessGetBMDs();
                    break;
                case "getbmdformio":
                    ProcessGetBMDbyMIO();
                    break;
                case "getevents":
                    ProcessGetEvents();
                    break;
                case "geteventszsm":
                    ProcessGetEventsZSM();
                    break;
                case "getzsmevents":
                    ProcessGetZSMEvents();
                    break;
                //case "updateevent": 
                //    ProcessUpdateEvents();
                //    break;
                case "delevent":
                    ProcessDeleteEvent();
                    break;
                //case "addevent": 
                //    ProcessAddEvent();
                //    break;
                case "getactivities":
                    ProcessGetActivities();
                    break;
                case "getdoctors":
                    ProcessGetDoctors();
                    break;
                case "gettime":
                    ProcessGetTime();
                    break;
                case "insertcallplannermonth":
                    InsertCallPlannerMonthDetails();
                    break;
                case "updatecallplannermonth":
                    UpdateCallPlannerMonthDetails();
                    break;
                case "sendforapproval":
                    ProcessSendForApproval();
                    break;
                case "checkforedit":
                    CheckforEdit();
                    break;
                case "insertzsmplan":
                    insertZSMPlan();
                    break;
                case "checkzsm":
                    CheckZSM();
                    break;
                case "getzsmid":
                    Response.Write(HttpContext.Current.Session["ZSMid"].ToString());
                    break;
                case "deleventbyzsmid":
                    DeleteZSMEvent();
                    break;
                case "geteventsbyactivityid":
                    ProcessGetEventsbyActivityId();
                    break;
                case "getzsmeventsbyactivityid":
                    ProcessGetZSMEventsbyActivityId();
                    break;
                case "approvemioplan":
                    ProcessApproveMIOPlan();
                    break;
                case "rejectmioplan":
                    ProcessRejectMIOPlan();
                    break;
                case "geteventssummary":
                    ProcessGetEventsSummary();
                    break;
                case "geteventssummarybyactivityid":
                    ProcessGetEventsSummarybyactivityid();
                    break;
            }
        }


        public void ProcessGetEventsSummary()
        {
            int id = 0;
            string comments = "";
            int employeeid = Convert.ToInt32(HttpContext.Current.Session["CurrentUserId"]);
            DateTime initial = DateTime.Parse(Request.QueryString["initial"].ToString());
            if (Request.QueryString["mioid"] != null)
            {
                employeeid = int.Parse(Request.QueryString["mioid"]);
            }
            //loadevents(employeeid, initial);            
            DataTable lsDT = SchedulerManager.getEventsSummarybystatus(employeeid, initial);
            DateTime current = DateTime.Now;

            DataTable lsDTMIOMontly = SchedulerManager.GetMIOMonthlyEventsByPlanMonth(employeeid, initial);
            if (lsDTMIOMontly.Rows.Count > 0)
            {
                if (lsDTMIOMontly.Rows[0]["CPM_PlanStatus"].ToString() == Utility.STATUS_REJECTED || lsDTMIOMontly.Rows[0]["CPM_PlanStatus"].ToString() == Utility.STATUS_RESUBMITTED)
                    comments = lsDTMIOMontly.Rows[0]["CPM_PlanStatusReason"].ToString();
            }

            StringBuilder str = new StringBuilder("");
            for (int i = 0; i < lsDT.Rows.Count; i++)
            {
                str.Append(lsDT.Rows[i]["ActName"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["startdate"].ToString().Replace('-', '/') + " 00:00:00 AM");
                str.Append(";");
                //str.Append(lsDT.Rows[i]["enddate"].ToString());
                //str.Append(";");
                str.Append(lsDT.Rows[i]["ActBColor"].ToString());
                str.Append(";");
                //str.Append(lsDT.Rows[i]["plannerID"].ToString());
                //str.Append(";");
                str.Append(lsDT.Rows[i]["ActFColor"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["count"].ToString());
                str.Append(";");
                str.Append(++id);
                str.Append(";");
                //str.Append(lsDT.Rows[i]["editable"].ToString());
                //str.Append(";");
                //str.Append(lsDT.Rows[i]["DoctorID"].ToString());
                //str.Append(";");
                //str.Append(lsDT.Rows[i]["MioDescription"].ToString()); 
                //str.Append(";");
                //str.Append(lsDT.Rows[i]["MioStatus"].ToString());
                //str.Append(";");
                //str.Append(lsDT.Rows[i]["MioStatusReason"].ToString());
                //str.Append(";");
                //str.Append(lsDT.Rows[i]["planMonth"].ToString());
                //str.Append(";");
                //str.Append(lsDT.Rows[i]["ActID"].ToString());
                //str.Append(";");
                //str.Append(lsDT.Rows[i]["MonthlyID"].ToString());
                //str.Append(";");
                //str.Append(lsDT.Rows[i]["MIOAuthID"].ToString());
                //str.Append(";");
                if (initial.Month == DateTime.Parse(lsDT.Rows[i]["planMonth"].ToString()).Month)
                {
                    str.Append(lsDT.Rows[i]["mstatus"].ToString());
                    str.Append(";");
                    str.Append(Utility.GetStatusColor(lsDT.Rows[i]["mstatus"].ToString()));
                }
                else
                {
                    str.Append("");
                    str.Append(";");
                    str.Append("");
                }
                str.Append(";");
                str.Append(comments);

                str.Append(",");

            }
            if (str.Length > 0)
            {
                str.Length -= 1;
            }
            str.Append("$");

            DataTable lsDT1 = SchedulerManager.getMonthlyStatusforEmployee(int.Parse(HttpContext.Current.Session["ZSMid"].ToString()), initial);
            for (int i = 0; i < lsDT1.Rows.Count; i++)
            {
                str.Append(lsDT1.Rows[i]["CPM_PlanStatus"].ToString());
                str.Append(";");
                str.Append(Utility.GetStatusColor(lsDT1.Rows[i]["CPM_PlanStatus"].ToString()));
                break;
            }
            //   str.Length -= 1;
            Response.Write(str);
            //Response.Write("PARTY" + ";" + 12 + ";" + 1 + ";" + 1 + "," + "VISIT" + ";" + + 1 + ";" + 2 + ";" + 3);

        }
        public void loadevents(int employeeid, DateTime initial)
        {
            EventCollection.Instance.Clear();
            DataTable lsDT = SchedulerManager.getEvents(employeeid, initial);
            for (int i = 0; i < lsDT.Rows.Count; i++)
            {
                Events e = new Events(int.Parse(lsDT.Rows[i]["plannerID"].ToString()), lsDT.Rows[i]["ActName"].ToString(), DateTime.Parse(lsDT.Rows[i]["startdate"].ToString()), DateTime.Parse(lsDT.Rows[i]["enddate"].ToString()), Convert.ToInt64(lsDT.Rows[i]["DoctorID"].ToString()));
                EventCollection.Instance.AddEvent(e);
            }

        }

        public void ProcessGetEventsSummarybyactivityid()
        {
            int id = 0;
            int actid = 0;
            string comments = "";
            int employeeid = Convert.ToInt32(HttpContext.Current.Session["CurrentUserId"]);
            DateTime initial = DateTime.Parse(Request.QueryString["initial"].ToString());

            if (Request.QueryString["mioid"] != null)
            {
                employeeid = int.Parse(Request.QueryString["mioid"]);
            }
            if (Request.QueryString["actid"] != null)
            {
                actid = int.Parse(Request.QueryString["actid"]);
            }
            //loadevents(employeeid, initial);
            DataTable lsDT = SchedulerManager.getEventsSummarybystatus(employeeid, actid, initial);
            DateTime current = DateTime.Now;

            DataTable lsDTMIOMontly = SchedulerManager.GetMIOMonthlyEventsByPlanMonth(employeeid, initial);
            if (lsDTMIOMontly.Rows.Count > 0)
            {
                if (lsDTMIOMontly.Rows[0]["CPM_PlanStatus"].ToString() == Utility.STATUS_REJECTED || lsDTMIOMontly.Rows[0]["CPM_PlanStatus"].ToString() == Utility.STATUS_RESUBMITTED)
                    comments = lsDTMIOMontly.Rows[0]["CPM_PlanStatusReason"].ToString();
            }


            StringBuilder str = new StringBuilder("");
            for (int i = 0; i < lsDT.Rows.Count; i++)
            {
                str.Append(lsDT.Rows[i]["ActName"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["startdate"].ToString().Replace('-', '/') + " 00:00:00 AM");
                str.Append(";");
                //str.Append(lsDT.Rows[i]["enddate"].ToString());
                //str.Append(";");
                str.Append(lsDT.Rows[i]["ActBColor"].ToString());
                str.Append(";");
                //str.Append(lsDT.Rows[i]["plannerID"].ToString());
                //str.Append(";");
                str.Append(lsDT.Rows[i]["ActFColor"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["count"].ToString());
                str.Append(";");
                str.Append(++id);
                str.Append(";");
                //str.Append(lsDT.Rows[i]["editable"].ToString());
                //str.Append(";");
                //str.Append(lsDT.Rows[i]["DoctorID"].ToString());
                //str.Append(";");
                //str.Append(lsDT.Rows[i]["MioDescription"].ToString()); 
                //str.Append(";");
                //str.Append(lsDT.Rows[i]["MioStatus"].ToString());
                //str.Append(";");
                //str.Append(lsDT.Rows[i]["MioStatusReason"].ToString());
                //str.Append(";");
                //str.Append(lsDT.Rows[i]["planMonth"].ToString());
                //str.Append(";");
                //str.Append(lsDT.Rows[i]["ActID"].ToString());
                //str.Append(";");
                //str.Append(lsDT.Rows[i]["MonthlyID"].ToString());
                //str.Append(";");
                //str.Append(lsDT.Rows[i]["MIOAuthID"].ToString());
                //str.Append(";");
                if (initial.Month == DateTime.Parse(lsDT.Rows[i]["planMonth"].ToString()).Month)
                {
                    str.Append(lsDT.Rows[i]["mstatus"].ToString());
                    str.Append(";");
                    str.Append(Utility.GetStatusColor(lsDT.Rows[i]["mstatus"].ToString()));
                }
                else
                {
                    str.Append("");
                    str.Append(";");
                    str.Append("");
                }
                str.Append(";");
                str.Append(comments);

                str.Append(",");

            }
            //   str.Length -= 1;
            if (str.Length > 0)
            {
                str.Length -= 1;
            }
            str.Append("$");

            DataTable lsDT1 = SchedulerManager.getMonthlyStatusforEmployee(int.Parse(HttpContext.Current.Session["ZSMid"].ToString()), initial);
            for (int i = 0; i < lsDT1.Rows.Count; i++)
            {
                str.Append(lsDT1.Rows[i]["CPM_PlanStatus"].ToString());
                str.Append(";");
                str.Append(Utility.GetStatusColor(lsDT1.Rows[i]["CPM_PlanStatus"].ToString()));
                break;
            }
            Response.Write(str);
            //Response.Write("PARTY" + ";" + 12 + ";" + 1 + ";" + 1 + "," + "VISIT" + ";" + + 1 + ";" + 2 + ";" + 3);

        }
        public void CheckZSM()
        {
            int mioid = int.Parse(Request.QueryString["mioid"].ToString());
            bool rejected = false;
            //if (Request.QueryString["rejected"].ToString() == Utility.STATUS_REJECTED)
            //{
            //    rejected = true;
            //}
            int zsmid = int.Parse(HttpContext.Current.Session["ZSMid"].ToString());

            if (!rejected)
            {
                bool ispresent = false;
                string s = "";
                for (int i = 0; i < ZSMEventsCollection.Instance.ZSMEventsList.Count; i++)
                {
                    if (ZSMEventsCollection.Instance.ZSMEventsList[i].employeeid == zsmid && ZSMEventsCollection.Instance.ZSMEventsList[i].mioid == mioid)
                    {
                        ispresent = true;
                        s = ZSMEventsCollection.Instance.ZSMEventsList[i].informed + ";" + ZSMEventsCollection.Instance.ZSMEventsList[i].description;
                        break;
                    }
                }
                if (ispresent)
                {
                    Response.Write(s);
                }
            }
            else
            {
                string r = "";
                for (int i = 0; i < ZSMEventsCollection.Instance.ZSMEventsList.Count; i++)
                {
                    if (ZSMEventsCollection.Instance.ZSMEventsList[i].employeeid == zsmid && ZSMEventsCollection.Instance.ZSMEventsList[i].mioid == mioid)
                    {
                        r = ZSMEventsCollection.Instance.ZSMEventsList[i].statusReason;
                        break;
                    }
                }

                Response.Write(r);
            }

        }

        public void insertZSMPlan()
        {
            string res = "";
            int mioid = int.Parse(Request.QueryString["mioid"].ToString());
            int monthid = int.Parse(Request.QueryString["monthid"].ToString());
            bool rejected = bool.Parse(Request.QueryString["rejected"].ToString());
            string rejectcomments = SchedulerManager.GetPuriedString(Request.QueryString["rejectcomments"].ToString());
            string comments = SchedulerManager.GetPuriedString(Request.QueryString["comments"].ToString().Trim());
            bool informed = bool.Parse(Request.QueryString["informed"].ToString());
            int zsmid = int.Parse(HttpContext.Current.Session["ZSMid"].ToString());
            int roleid = int.Parse(HttpContext.Current.Session["Roleid"].ToString());
            DateTime start = DateTime.Parse(Request.QueryString["start"].ToString());
            DateTime end = DateTime.Parse(Request.QueryString["end"].ToString());
            int bmdid = int.Parse(Request.QueryString["bmd"].ToString());

            //block due to not getting from front end.
            //int mioempid = int.Parse(Request.QueryString["mioempid"].ToString());

            bool ispresent = false;
            bool isrange = false;
            for (int i = 0; i < ZSMEventsCollection.Instance.ZSMEventsList.Count; i++)
            {
                if (ZSMEventsCollection.Instance.ZSMEventsList[i].mioid != mioid)
                {
                    if (start.ToShortDateString() == ZSMEventsCollection.Instance.ZSMEventsList[i].start.ToShortDateString())
                    {
                        if ((start.TimeOfDay >= ZSMEventsCollection.Instance.ZSMEventsList[i].start.TimeOfDay && start.TimeOfDay < ZSMEventsCollection.Instance.ZSMEventsList[i].end.TimeOfDay) || (end.TimeOfDay > ZSMEventsCollection.Instance.ZSMEventsList[i].start.TimeOfDay && end.TimeOfDay <= ZSMEventsCollection.Instance.ZSMEventsList[i].end.TimeOfDay))
                        {
                            isrange = true;
                            break;
                        }
                    }
                }
            }

            if (isrange)
            {
                Response.Write("notinrange");
            }
            else
            {



                for (int i = 0; i < ZSMEventsCollection.Instance.ZSMEventsList.Count; i++)
                {
                    if (ZSMEventsCollection.Instance.ZSMEventsList[i].employeeid == zsmid && ZSMEventsCollection.Instance.ZSMEventsList[i].mioid == mioid)
                    {
                        ispresent = true;
                    }
                }

                if (rejected)
                {
                    res = "rejected";
                    rejectcomments = start.TimeOfDay.ToString() + " Rejected: " + rejectcomments;
                    SchedulerManager.ChangeMIOPlanStatus(mioid, monthid, rejectcomments, zsmid);
                    if (ispresent)
                    {
                        SchedulerManager.deleteZSMPlanbyMIO(mioid, zsmid);
                        for (int i = 0; i < ZSMEventsCollection.Instance.ZSMEventsList.Count; i++)
                        {
                            if (ZSMEventsCollection.Instance.ZSMEventsList[i].employeeid == zsmid && ZSMEventsCollection.Instance.ZSMEventsList[i].mioid == mioid)
                            {
                                ZSMEventsCollection.Instance.ZSMEventsList.RemoveAt(i);
                            }
                        }

                    }
                    //for (int i = 0; i < MonthlyMIOCollection.Instance.monthlyEventsList.Count; i++)
                    //{
                    //    if (MonthlyMIOCollection.Instance.monthlyEventsList[i].employeeid == mioempid && MonthlyMIOCollection.Instance.monthlyEventsList[i].month.Month == start.Month)// && MonthlyMIOCollection.Instance.monthlyEventsList[i].status !="Resubmitted")
                    //    {
                    //        MonthlyMIOCollection.Instance.monthlyEventsList[i].status = Utility.STATUS_REJECTED;
                    //    }
                    //}
                }
                else
                {
                    if (!ispresent)
                    {
                        int id = 0;
                        int mid = 0;
                        mid = SchedulerManager.CheckPlannerMonth(start, zsmid);
                        int bid = 0;
                        if (mid == 0)
                        {
                            mid = SchedulerManager.insertCallPlannerMonth(start, "", true, zsmid, Utility.STATUS_INPROCESS, "", 0);
                            if (mid > 0)
                            {
                                id = SchedulerManager.insertZSMPlan(mioid, mid, true, int.Parse(HttpContext.Current.Session["ZSMid"].ToString()), Utility.STATUS_INPROCESS, "", 0, comments, informed, roleid);
                                if (bmdid != -1)
                                {
                                    bid = SchedulerManager.insertCallPlannerBMDCoordinator(mioid, bmdid, DateTime.Now, DateTime.Now, zsmid);
                                }
                                ZSMEvents e = new ZSMEvents(id, zsmid, mid, mioid, true, Utility.STATUS_INPROCESS, "", comments, informed, start, end);
                                ZSMEventsCollection.Instance.AddEvent(e);
                                res = "inserted";
                            }
                        }

                        else if (mid != 0)
                        {
                            id = SchedulerManager.insertZSMPlan(mioid, mid, true, int.Parse(HttpContext.Current.Session["ZSMid"].ToString()), Utility.STATUS_INPROCESS, "", 0, comments, informed, roleid);
                            {
                                if (bmdid != -1)
                                {
                                    bid = SchedulerManager.insertCallPlannerBMDCoordinator(mioid, bmdid, DateTime.Now, DateTime.Now, zsmid);
                                }
                                ZSMEvents e = new ZSMEvents(id, zsmid, mid, mioid, true, Utility.STATUS_INPROCESS, "", comments, informed, start, end);
                                ZSMEventsCollection.Instance.AddEvent(e);
                                res = "inserted";
                            }

                        }
                    }
                    else
                    {
                        SchedulerManager.updateZSMPlan(mioid, int.Parse(HttpContext.Current.Session["ZSMid"].ToString()), comments, informed);
                        for (int i = 0; i < ZSMEventsCollection.Instance.ZSMEventsList.Count; i++)
                        {
                            if (ZSMEventsCollection.Instance.ZSMEventsList[i].employeeid == zsmid && ZSMEventsCollection.Instance.ZSMEventsList[i].mioid == mioid)
                            {
                                if (bmdid != -1)
                                {
                                    SchedulerManager.insertCallPlannerBMDCoordinator(mioid, bmdid, DateTime.Now, DateTime.Now, zsmid);
                                }
                                ZSMEventsCollection.Instance.ZSMEventsList[i].description = comments;
                                ZSMEventsCollection.Instance.ZSMEventsList[i].informed = informed;
                                res = "updated";
                            }
                        }
                    }
                }
                Response.Write(res);
            }
        }

        public void CheckforEdit()
        {
            string isedit = "True;";
            DateTime current = DateTime.Parse(Request.QueryString["date"].ToString()).ToUniversalTime().AddHours(5);
            int empid = int.Parse(Request.QueryString["mioid"].ToString());
            for (int i = 0; i < MonthlyMIOCollection.Instance.monthlyEventsList.Count; i++)
            {
                if (MonthlyMIOCollection.Instance.monthlyEventsList[i].employeeid == empid && MonthlyMIOCollection.Instance.monthlyEventsList[i].month.Month == current.Month)// && MonthlyMIOCollection.Instance.monthlyEventsList[i].status !="Resubmitted")
                {
                    isedit = MonthlyMIOCollection.Instance.monthlyEventsList[i].isEditable + ";" + MonthlyMIOCollection.Instance.monthlyEventsList[i].status;
                    break;
                }
            }
            Response.Write(isedit);
        }

        //public void ProcessSendForApproval()
        //{
        //    DateTime current = DateTime.Parse(Request.QueryString["date"].ToString()).ToUniversalTime().AddHours(5);
        //    int empid = int.Parse(Request.QueryString["zsmid"].ToString());
        //    string status = Request.QueryString["status"].ToString();
        //    int authempid = int.Parse(HttpContext.Current.Session["CurrentUserId"].ToString());
        //    bool check;
        //    if (status == Utility.STATUS_INPROCESS)
        //    {
        //        _nv.Clear();
        //        _nv.Add("@month-int", current.Month.ToString());
        //        _nv.Add("@year-int", current.Year.ToString());
        //        _nv.Add("@iseditable-bit", "0");
        //        _nv.Add("@resion-nvarchar-(500)", "");
        //        _nv.Add("@planStatus-nvarchar-(50)", Utility.STATUS_SUBMITTED);
        //        _nv.Add("@empID-int", empid.ToString());
        //        check = dl.InserData("Call_DisallowEditForZSMWithoutCommentsZSM", _nv);
        //        if (check)
        //        {
        //            _nv.Clear();
        //            _nv.Add("@month-int", current.Month.ToString());
        //            _nv.Add("@year-int", current.Year.ToString());
        //            _nv.Add("@iseditable-bit", "0");
        //            _nv.Add("@resion-nvarchar(500)", "");
        //            _nv.Add("@planStatus-nvarchar-(50)", Utility.STATUS_SUBMITTED);
        //            _nv.Add("@empID-int", empid.ToString());
        //            dl.InserData("sp_for_statusChange_CallPlannerMIOLevelZSM", _nv);
        //        }
        //        //SchedulerManager.setEditableMonthforzsmWithoutCommentsZSM(current, empid, Utility.STATUS_SUBMITTED, false, authempid);
        //    }
        //    else if (status == Utility.STATUS_REJECTED)
        //    {
        //        _nv.Clear();
        //        _nv.Add("@month-int", current.Month.ToString());
        //        _nv.Add("@year-int", current.Year.ToString());
        //        _nv.Add("@iseditable-bit", "0");
        //        _nv.Add("@resion-nvarchar-(500)", "");
        //        _nv.Add("@planStatus-nvarchar-(50)", Utility.STATUS_RESUBMITTED);
        //        _nv.Add("@empID-int", empid.ToString());
        //        check = dl.InserData("Call_DisallowEditForZSMWithoutCommentsZSM", _nv);
        //        if (check)
        //        {
        //            _nv.Clear();
        //            _nv.Add("@month-int", current.Month.ToString());
        //            _nv.Add("@year-int", current.Year.ToString());
        //            _nv.Add("@iseditable-bit", "0");
        //            _nv.Add("@resion-nvarchar(500)", "");
        //            _nv.Add("@planStatus-nvarchar-(50)", Utility.STATUS_RESUBMITTED);
        //            _nv.Add("@empID-int", empid.ToString());
        //            dl.InserData("sp_for_statusChange_CallPlannerMIOLevelZSM", _nv);
        //        }
        //        // SchedulerManager.setEditableMonthforzsmWithoutCommentsZSM(current, empid, Utility.STATUS_RESUBMITTED, false, authempid);

        //    }
        //}

        //public void ProcessApproveMIOPlan()
        //{
        //    DateTime current = DateTime.Parse(Request.QueryString["date"].ToString()).ToUniversalTime().AddHours(5);
        //    int empid = int.Parse(Request.QueryString["mioid"].ToString());
        //    int authempid = int.Parse(HttpContext.Current.Session["CurrentUserId"].ToString());
        //    SchedulerManager.setEditableMonthWithoutComments(current, empid, Utility.STATUS_APPROVED, false, authempid);
        //}

        //public void ProcessRejectMIOPlan()
        //{
        //    DateTime current = DateTime.Parse(Request.QueryString["date"].ToString()).ToUniversalTime().AddHours(5);
        //    int empid = int.Parse(Request.QueryString["mioid"].ToString());
        //    string comments = Request.QueryString["comments"].ToString();
        //    int authempid = int.Parse(HttpContext.Current.Session["CurrentUserId"].ToString());
        //    SchedulerManager.setEditableMonth(current, empid, Utility.STATUS_REJECTED, true, SchedulerManager.GetPuriedString(comments), authempid);
        //}

        public void ProcessSendForApproval()
        {
            DateTime current = DateTime.Parse(Request.QueryString["date"].ToString()).ToUniversalTime().AddHours(5);
            int empid = int.Parse(Request.QueryString["zsmid"].ToString());
            string status = Request.QueryString["status"].ToString();
            int authempid = int.Parse(HttpContext.Current.Session["CurrentUserId"].ToString());
            string emailStatus = "";
            bool check;
            if (status == Utility.STATUS_INPROCESS)
            {
                _nv.Clear();
                _nv.Add("@month-int", current.Month.ToString());
                _nv.Add("@year-int", current.Year.ToString());
                _nv.Add("@iseditable-bit", "0");
                _nv.Add("@resion-nvarchar-(500)", "");
                _nv.Add("@planStatus-nvarchar-(50)", Utility.STATUS_SUBMITTED);
                _nv.Add("@empID-int", empid.ToString());
                check = dl.InserData("Call_DisallowEditForZSMWithoutCommentsZSM", _nv);
                if (check)
                {
                    _nv.Clear();
                    _nv.Add("@month-int", current.Month.ToString());
                    _nv.Add("@year-int", current.Year.ToString());
                    _nv.Add("@iseditable-bit", "0");
                    _nv.Add("@resion-nvarchar(500)", "");
                    _nv.Add("@planStatus-nvarchar-(50)", Utility.STATUS_SUBMITTED);
                    _nv.Add("@empID-int", empid.ToString());
                    dl.InserData("sp_for_statusChange_CallPlannerMIOLevelZSM", _nv);
                }
                emailStatus = Utility.STATUS_SUBMITTED;
                var nv1 = new NameValueCollection();
                var dal = new DAL();
                nv1.Add("@EmplyeeID-int", HttpContext.Current.Session["CurrentUserId"].ToString());
                // ReSharper disable UnusedVariable
                var getDetail = dal.GetData("sp_FLM_RSM_DetailForEmail", nv1);
                var table = getDetail.Tables[0];

                if (table.Rows.Count > 0)
                {
                    #region Sending Mail

                    var msg = new MailMessage { From = new MailAddress(ConfigurationManager.AppSettings["AutoEmailID"], "Plan For Approval-" + table.Rows[0][1] + "") };

                    if (table.Rows[0][8].ToString() != "NULL")
                    {
                        string addresmail = table.Rows[0][8].ToString().Replace("(", "").Replace(")", "").Replace("-", "").Replace(" ", "").Trim();
                        msg.To.Add(addresmail);
                    }

                    msg.Subject = "Planing Status For-Bayer- " + DateTime.Now.ToString("dd-MMMM-yyyy");
                    msg.IsBodyHtml = true;

                    string strBody = "To: RSM <br/> Med-Rep Teritorry: " + table.Rows[0][1] +
                        @"<br/>" + "Med-Rep Name: " + table.Rows[0][3] +
                        @"<br/>" + "Med-Rep Mobile Number: " + table.Rows[0][5] +
                        @"<br/>Med-Rep Plan Status: " + emailStatus + " For Month: " + Convert.ToDateTime(current).ToLongDateString() +

                              @"<br/><br/>Generated on: " + DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss") + @"


                                   This is a system generated email. Please do not reply. Contact the IT department if you need any assistance.";
                    msg.Body = strBody;

                    //var mailAttach = new Attachment(@"C:\AtcoPharma\Excel\VisitsStatsWRTFreq-OTC-" + System.DateTime.Now.ToString("dd-MMMM-yyyy") + ".xlsx");
                    //msg.Attachments.Add(mailAttach);

                    var client = new SmtpClient(ConfigurationManager.AppSettings["AutoEmailSMTP"])
                    {
                        UseDefaultCredentials = false,
                        Credentials = new System.Net.NetworkCredential(ConfigurationManager.AppSettings["AutoEmailID"], ConfigurationManager.AppSettings["AutoEmailIDpass"]),
                        Host = ConfigurationManager.AppSettings["AutoEmailSMTP"]
                    };

                    client.Send(msg);

                    #endregion
                }
                //SchedulerManager.setEditableMonthforzsmWithoutCommentsZSM(current, empid, Utility.STATUS_SUBMITTED, false, authempid);
            }
            else if (status == Utility.STATUS_REJECTED)
            {
                _nv.Clear();
                _nv.Add("@month-int", current.Month.ToString());
                _nv.Add("@year-int", current.Year.ToString());
                _nv.Add("@iseditable-bit", "0");
                _nv.Add("@resion-nvarchar-(500)", "");
                _nv.Add("@planStatus-nvarchar-(50)", Utility.STATUS_RESUBMITTED);
                _nv.Add("@empID-int", empid.ToString());
                check = dl.InserData("Call_DisallowEditForZSMWithoutCommentsZSM", _nv);
                if (check)
                {
                    _nv.Clear();
                    _nv.Add("@month-int", current.Month.ToString());
                    _nv.Add("@year-int", current.Year.ToString());
                    _nv.Add("@iseditable-bit", "0");
                    _nv.Add("@resion-nvarchar(500)", "");
                    _nv.Add("@planStatus-nvarchar-(50)", Utility.STATUS_RESUBMITTED);
                    _nv.Add("@empID-int", empid.ToString());
                    dl.InserData("sp_for_statusChange_CallPlannerMIOLevelZSM", _nv);
                }
                emailStatus = Utility.STATUS_RESUBMITTED;
                var nv1 = new NameValueCollection();
                var dal = new DAL();
                nv1.Add("@EmplyeeID-int", HttpContext.Current.Session["CurrentUserId"].ToString());
                // ReSharper disable UnusedVariable
                var getDetail = dal.GetData("sp_FLM_RSM_DetailForEmail", nv1);
                var table = getDetail.Tables[0];

                if (table.Rows.Count > 0)
                {
                    #region Sending Mail

                    var msg = new MailMessage { From = new MailAddress(ConfigurationManager.AppSettings["AutoEmailID"], "Plan For Approval-" + table.Rows[0][1] + "") };

                    if (table.Rows[0][8].ToString() != "NULL")
                    {
                        string addresmail = table.Rows[0][8].ToString().Replace("(", "").Replace(")", "").Replace("-", "").Replace(" ", "").Trim();
                        msg.To.Add(addresmail);
                    }

                    msg.Subject = "Planing Status For-Atco- " + DateTime.Now.ToString("dd-MMMM-yyyy");
                    msg.IsBodyHtml = true;

                    string strBody = "To: RSM <br/> Med-Rep Teritorry: " + table.Rows[0][1] +
                        @"<br/>" + "Med-Rep Name: " + table.Rows[0][3] +
                        @"<br/>" + "Med-Rep Mobile Number: " + table.Rows[0][5] +
                        @"<br/>Med-Rep Plan Status: " + emailStatus + " For Month: " + Convert.ToDateTime(current).ToLongDateString() +

                              @"<br/><br/>Generated on: " + DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss") + @"


                                   This is a system generated email. Please do not reply. Contact the IT department if you need any assistance.";
                    msg.Body = strBody;

                    //var mailAttach = new Attachment(@"C:\AtcoPharma\Excel\VisitsStatsWRTFreq-OTC-" + System.DateTime.Now.ToString("dd-MMMM-yyyy") + ".xlsx");
                    //msg.Attachments.Add(mailAttach);

                    var client = new SmtpClient(ConfigurationManager.AppSettings["AutoEmailSMTP"])
                    {
                        UseDefaultCredentials = false,
                        Credentials = new System.Net.NetworkCredential(ConfigurationManager.AppSettings["AutoEmailID"], ConfigurationManager.AppSettings["AutoEmailIDpass"]),
                        Host = ConfigurationManager.AppSettings["AutoEmailSMTP"]
                    };

                    client.Send(msg);

                    #endregion
                }
                // SchedulerManager.setEditableMonthforzsmWithoutCommentsZSM(current, empid, Utility.STATUS_RESUBMITTED, false, authempid);

            }
        }

        public void ProcessApproveMIOPlan()
        {
            DateTime current = DateTime.Parse(Request.QueryString["date"].ToString()).ToUniversalTime().AddHours(5);
            int empid = int.Parse(Request.QueryString["mioid"].ToString());
            int authempid = int.Parse(HttpContext.Current.Session["CurrentUserId"].ToString());
            string comments = Request.QueryString["comments"].ToString();
            SchedulerManager.setEditableMonth(current, empid, Utility.STATUS_APPROVED, false, SchedulerManager.GetPuriedString(comments), authempid);
            //SchedulerManager.setEditableMonthWithoutComments(current, empid, Utility.STATUS_APPROVED, false, authempid);

            string emailStatus = Utility.STATUS_APPROVED;
            var nv1 = new NameValueCollection();
            var dal = new DAL();
            nv1.Add("@EmplyeeID-int", empid.ToString());
            // ReSharper disable UnusedVariable
            var getDetail = dal.GetData("sp_MIO_ZSM_DetailForEmail", nv1);
            var table = getDetail.Tables[0];

            if (table.Rows.Count > 0)
            {
                #region Sending Mail

                //var msg = new MailMessage { From = new MailAddress(ConfigurationManager.AppSettings["AutoEmailID"], "Plan For Approval-" + table.Rows[0][1] + "") };
                var msg = new MailMessage { From = new MailAddress(ConfigurationManager.AppSettings["AutoEmailID"], "Plan For Approval-" + table.Rows[0][1] + "") };
                if (table.Rows[0][4].ToString() != "NULL")
                {
                    string addresmail = table.Rows[0][4].ToString().Replace("(", "").Replace(")", "").Replace("-", "").Replace(" ", "").Trim();
                    msg.To.Add(addresmail);
                }

                msg.Subject = "Planing Status For-Atco- " + DateTime.Now.ToString("dd-MMMM-yyyy");
                msg.IsBodyHtml = true;

                string strBody = "To: MIO:<br/>Med-Rep Teritorry: " + table.Rows[0][1] +
                            @"<br/>" + "Manager Name: " + table.Rows[0][7] +
                            @"<br/>" + "Manager Mobile Number: " + table.Rows[0][9] +
                            @"<br/>Med-Rep Plan Status: " + emailStatus + " For Month: " + Convert.ToDateTime(current).ToLongDateString() +

                                  @"<br/><br/>Generated on: " + DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss") + @"


                                   This is a system generated email. Please do not reply. Contact the IT department if you need any assistance.";
                msg.Body = strBody;


                //var mailAttach = new Attachment(@"C:\AtcoPharma\Excel\VisitsStatsWRTFreq-OTC-" + System.DateTime.Now.ToString("dd-MMMM-yyyy") + ".xlsx");
                //msg.Attachments.Add(mailAttach);

                var client = new SmtpClient(ConfigurationManager.AppSettings["AutoEmailSMTP"])
                {
                    UseDefaultCredentials = false,
                    Credentials = new System.Net.NetworkCredential(ConfigurationManager.AppSettings["AutoEmailID"], ConfigurationManager.AppSettings["AutoEmailIDpass"]),
                    Host = ConfigurationManager.AppSettings["AutoEmailSMTP"]
                };


                try
                {
                    client.Send(msg);
                }
                catch (SmtpException smex)
                {
                    Console.Write(smex.StackTrace.ToString());
                }

                #endregion
            }
        }

        public void ProcessRejectMIOPlan()
        {
            DateTime current = DateTime.Parse(Request.QueryString["date"].ToString()).ToUniversalTime().AddHours(5);
            int empid = int.Parse(Request.QueryString["mioid"].ToString());
            string comments = Request.QueryString["comments"].ToString();
            int authempid = int.Parse(HttpContext.Current.Session["CurrentUserId"].ToString());
            SchedulerManager.setEditableMonth(current, empid, Utility.STATUS_REJECTED, true, SchedulerManager.GetPuriedString(comments), authempid);

            string emailStatus = Utility.STATUS_REJECTED;
            var nv1 = new NameValueCollection();
            var dal = new DAL();
            nv1.Add("@EmplyeeID-int", empid.ToString());
            // ReSharper disable UnusedVariable
            var getDetail = dal.GetData("sp_MIO_ZSM_DetailForEmail", nv1);
            var table = getDetail.Tables[0];

            if (table.Rows.Count > 0)
            {
                #region Sending Mail

                //var msg = new MailMessage { From = new MailAddress(ConfigurationManager.AppSettings["AutoEmailID"], "Plan For Approval-" + table.Rows[0][1] + "") };
                var msg = new MailMessage { From = new MailAddress(ConfigurationManager.AppSettings["AutoEmailID"], "Plan For Approval-" + table.Rows[0][1] + "") };
                if (table.Rows[0][4].ToString() != "NULL")
                {
                    string addresmail = table.Rows[0][4].ToString().Replace("(", "").Replace(")", "").Replace("-", "").Replace(" ", "").Trim();
                    msg.To.Add(addresmail);
                }

                msg.Subject = "Planing Status For-Atco- " + DateTime.Now.ToString("dd-MMMM-yyyy");
                msg.IsBodyHtml = true;

                string strBody = "To: MIO:<br/>Med-Rep Teritorry: " + table.Rows[0][1] +
                            @"<br/>" + "Manager Name: " + table.Rows[0][7] +
                            @"<br/>" + "Manager Mobile Number: " + table.Rows[0][9] +
                            @"<br/>Med-Rep Plan Status: " + emailStatus + " For Month: " + Convert.ToDateTime(current).ToLongDateString() +

                                  @"<br/><br/>Generated on: " + DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss") + @"


                                   This is a system generated email. Please do not reply. Contact the IT department if you need any assistance.";
                msg.Body = strBody;


                //var mailAttach = new Attachment(@"C:\AtcoPharma\Excel\VisitsStatsWRTFreq-OTC-" + System.DateTime.Now.ToString("dd-MMMM-yyyy") + ".xlsx");
                //msg.Attachments.Add(mailAttach);

                var client = new SmtpClient(ConfigurationManager.AppSettings["AutoEmailSMTP"])
                {
                    UseDefaultCredentials = false,
                    Credentials = new System.Net.NetworkCredential(ConfigurationManager.AppSettings["AutoEmailID"], ConfigurationManager.AppSettings["AutoEmailIDpass"]),
                    Host = ConfigurationManager.AppSettings["AutoEmailSMTP"]
                };


                try
                {
                    client.Send(msg);
                }
                catch (SmtpException smex)
                {
                    Console.Write(smex.StackTrace.ToString());
                }

                #endregion
            }
        }



        public void ProcessGetBMDs()
        {

            //200,BMD 1,001;201,BMD 2,001;202,BMD 3,001");            

            DataTable lsDT = SchedulerManager.GetBMDCoordinators();
            StringBuilder str = new StringBuilder("");
            for (int i = 0; i < lsDT.Rows.Count; i++)
            {
                str.Append(lsDT.Rows[i]["EmployeeId"].ToString());
                str.Append(",");
                str.Append(SchedulerManager.GetPuriedString(lsDT.Rows[i]["EmployeeName"].ToString()));
                str.Append(",");
                str.Append(SchedulerManager.GetPuriedString(lsDT.Rows[i]["EmployeeCode"].ToString()));
                str.Append(";");

            }
            if (str.Length > 1)
            {
                str.Length -= 1;
            }
            Response.Write(str);
        }

        public void UpdateCallPlannerMonthDetails()
        {
            Boolean inrange = false;
            Boolean datediff = false;
            DateTime current = DateTime.Parse(Request.QueryString["date"].ToString()).ToUniversalTime().AddHours(5);
            int activity = int.Parse(Request.QueryString["activity"].ToString());
            int eventid = int.Parse(Request.QueryString["id"].ToString());
            //int MIOID = int.Parse(Request.QueryString["mioid"].ToString());
            int recIns = 0;
            DateTime start = DateTime.Parse(current.ToShortDateString() + " " + Request.QueryString["starttime"].ToString());
            DateTime end = DateTime.Parse(current.ToShortDateString() + " " + Request.QueryString["endtime"].ToString());
            string s = "";
            string employeeid = Convert.ToString(HttpContext.Current.Session["CurrentUserId"]);
            int idch = 0;
            idch = SchedulerManager.zsm_planning_time_check(start, employeeid);
            string mioid = "";
            if (Request.QueryString["mioid"].ToString().Split('-')[0].ToString() == "Doc")
            {
                string mio = Request.QueryString["mioid"].ToString().Split('-')[1];
                _nv.Clear();
                _nv.Add("@Miocode-int", mio);
                DataSet dsd = dl.GetData("sp_check_mioid", _nv);
                if (dsd.Tables[0].Rows.Count != 0)
                {

                }
                else
                {
                    _nv.Clear();
                    _nv.Add("@Miocode-int", mio);
                    dl.InserData("sp_insert_mioid", _nv);
                    dsd = dl.GetData("sp_check_mioid", _nv);
                }
                mioid = dsd.Tables[0].Rows[0]["EmployeeId"].ToString();
            }
            else
            {
                mioid = Convert.ToString(Request.QueryString["mioid"]);
            }

            if (idch != 0)
            {
                inrange = true;
            }
            if (start >= end)
            {
                datediff = true;
                Response.Write("datediff");
            }
            else if (inrange)
                Response.Write("outofrange");
            else
            {
         
                int employeeid_ZSM = Convert.ToInt32(HttpContext.Current.Session["CurrentUserId"]);
     
                string mioname = "";
                DataSet ds;

                dl = new DAL();
                _nv = new NameValueCollection();
                _nv.Add("@mioid-int", mioid);
                ds = dl.GetData("sp_mioname", _nv);
                mioname = ds.Tables[0].Rows[0]["EmployeeName"].ToString();

                string res = activity + ";" + mioid + ";" + start + ";" + end + ";" + "" + ";" + ActivitiesCollection.Instance[activity].name + ";" + ActivitiesCollection.Instance[activity].color + ";" + ActivitiesCollection.Instance[activity].tcolor + ";" + eventid + ";" + recIns + ";" + Utility.STATUS_INPROCESS + ";" + "" + ";" + 0 + ";" + true + ";" + current + ";" + mioname.ToString();
                Events e1 = new Events(eventid, ActivitiesCollection.Instance[activity].name, start, end, Convert.ToInt64(employeeid_ZSM));
                EventCollection.Instance.AddEvent(e1);
                Response.Write(res);
            }

            #region Old Work
            //Boolean inrange = false;
            //Boolean datediff = false;
            //Boolean isClassFrequencyExceeded = false;
            //Boolean isProductSame = false;
            //Boolean isReminderSame = false;
            //Boolean isSampleSame = false;
            //Boolean isGiftSame = false;
            //Boolean isProductContainSelect = false;
            //Boolean isReminderContainSelect = false;
            //Boolean isSampleContainSelect = false;
            //Boolean isGiftContainSelect = false;
            //int id = int.Parse(Request.QueryString["id"].ToString());
            //DateTime current = DateTime.Parse(Request.QueryString["date"].ToString()).ToUniversalTime().AddHours(5);
            //int activity = int.Parse(Request.QueryString["activity"].ToString());
            //int doctorid = int.Parse(Request.QueryString["doctor"].ToString());
            //int recIns = 0;
            //DateTime start = DateTime.Parse(current.ToShortDateString() + " " + Request.QueryString["starttime"].ToString());
            //DateTime end = DateTime.Parse(current.ToShortDateString() + " " + Request.QueryString["endtime"].ToString());
            //int bmdid = int.Parse(Request.QueryString["bmd"].ToString());
            //string products = Request.QueryString["products"].ToString();
            //string reminders = Request.QueryString["reminders"].ToString();
            //string samples = Request.QueryString["samples"].ToString();
            //string gifts = Request.QueryString["gifts"].ToString();
            //int currentClassID = SchedulerManager.getClassesByDoctor(doctorid);
            //int currentBrickID = SchedulerManager.getBricksByDoctor(doctorid);
            //int previousClassID = 0;
            //long currentDoctorID = doctorid;
            //long previousDoctorID = 0;
            //bool isRemovePreviousClassDoctor = false;
            //bool isAddCurrentClassDoctor = false;

            //for (int i = 0; i < EventCollection.Instance.eventsList.Count; i++)
            //{
            //    if (EventCollection.Instance.eventsList[i].id != id)
            //    {
            //        if (current.ToShortDateString() == EventCollection.Instance.eventsList[i].start.ToShortDateString())
            //        {
            //            if ((start.TimeOfDay >= EventCollection.Instance.eventsList[i].start.TimeOfDay && start.TimeOfDay < EventCollection.Instance.eventsList[i].end.TimeOfDay) || (end.TimeOfDay > EventCollection.Instance.eventsList[i].start.TimeOfDay && end.TimeOfDay <= EventCollection.Instance.eventsList[i].end.TimeOfDay))
            //            {
            //                inrange = true;
            //                break;
            //            }
            //            if ((EventCollection.Instance.eventsList[i].start.TimeOfDay >= start.TimeOfDay && EventCollection.Instance.eventsList[i].start.TimeOfDay < end.TimeOfDay) || (EventCollection.Instance.eventsList[i].end.TimeOfDay > start.TimeOfDay && EventCollection.Instance.eventsList[i].end.TimeOfDay <= end.TimeOfDay))
            //            {
            //                inrange = true;
            //                break;
            //            }
            //        }
            //    }
            //    else
            //    {
            //        Events previousEvent = EventCollection.Instance.eventsList[i];
            //        if (Convert.ToInt64(doctorid) != previousEvent.DoctorID)
            //        {
            //            previousDoctorID = previousEvent.DoctorID;

            //            int count = EventCollection.Instance.GetCurrentCountByDoctorClass(doctorid);
            //            DoctorClass doctorClass = DoctorClassesCollection.Instance[currentClassID];
            //            if (doctorClass != null && count > 0)
            //            {
            //                if (count >= doctorClass.ClassFrequency)
            //                    isClassFrequencyExceeded = true;
            //                else
            //                {
            //                    isRemovePreviousClassDoctor = true;
            //                    isAddCurrentClassDoctor = true;
            //                }
            //            }
            //            else
            //            {
            //                isRemovePreviousClassDoctor = true;
            //                isAddCurrentClassDoctor = true;
            //            }
            //        }
            //        else
            //        {
            //            isAddCurrentClassDoctor = false;
            //            isRemovePreviousClassDoctor = false;
            //        }
            //    }
            //}
            //if (products != "")
            //{
            //    string[] product = products.Split(';');
            //    //isProductContainSelect = SchedulerManager.CheckProductOrReminderConatinsSelect(product);
            //    if (!isProductContainSelect)
            //        isProductSame = SchedulerManager.CheckProductOrReminderComboSame(product, true);

            //}
            //if (reminders != "")
            //{
            //    string[] reminder = reminders.Split(';');
            //    //isReminderContainSelect = SchedulerManager.CheckProductOrReminderConatinsSelect(reminder);
            //    if (!isReminderContainSelect)
            //        isReminderSame = SchedulerManager.CheckProductOrReminderComboSame(reminder, true);
            //}
            //if (samples != "")
            //{
            //    string[] samplearray = samples.Split(';');
            //    isSampleSame = SchedulerManager.CheckSampleQuantityComboSame(samplearray, true);
            //}
            //if (gifts != "")
            //{
            //    string[] giftarray = gifts.Split(';');
            //    isGiftSame = SchedulerManager.CheckProductOrReminderComboSame(giftarray, true);
            //}

            //if (start >= end)
            //{
            //    datediff = true;
            //    Response.Write("datediff");
            //}
            //else if (inrange)
            //    Response.Write("outofrange");
            //else if (isClassFrequencyExceeded)
            //    Response.Write("classfrequencyexceeded");
            //else if (isProductSame)
            //    Response.Write("productsame");
            //else if (isReminderSame)
            //    Response.Write("remindersame");
            //else if (isSampleSame)
            //{
            //    Response.Write("samplesame");
            //}
            //else if (isGiftSame)
            //{
            //    Response.Write("giftsame");
            //}
            //else if (isProductContainSelect)
            //    Response.Write("productcontainselect");
            //else if (isReminderContainSelect)
            //    Response.Write("remindercontainselect");
            //else
            //{
            //    string description = Request.QueryString["description"].ToString();
            //    {
            //        SchedulerManager.UpdateCallPlannerMonth(start, end, description, id, doctorid, activity);
            //        SchedulerManager.deleteCallPlannerProducts(id);
            //        if (products != "")
            //        {
            //            int orderby = 1;
            //            string[] product = products.Split(';');
            //            for (int i = 0; i < product.Length - 1; i++)
            //            {
            //                if (product[i] != "-1")
            //                {
            //                    SchedulerManager.InsertCallPlannerProduct(id, int.Parse(product[i]), orderby);
            //                    orderby++;
            //                }
            //            }

            //        }

            //        SchedulerManager.deleteCallPlannerReminders(id);
            //        if (reminders != "")
            //        {
            //            int orderby = 1;
            //            string[] reminder = reminders.Split(';');
            //            for (int i = 0; i < reminder.Length - 1; i++)
            //            {
            //                if (reminder[i] != "-1")
            //                {
            //                    SchedulerManager.InsertCallPlannerReminder(id, int.Parse(reminder[i]), orderby);
            //                    orderby++;
            //                }
            //            }

            //        }
            //        SchedulerManager.deleteCallPlannerSamples(id);
            //        if (samples != "")
            //        {
            //            int orderby = 1;
            //            string[] sample = samples.Split(';');
            //            for (int i = 0; i < sample.Length - 1; i++)
            //            {
            //                if (sample[i].Split('|')[0] != "-1")
            //                {
            //                    SchedulerManager.InsertCallPlannerSamples(id, int.Parse(sample[i].Split('|')[0]), int.Parse(sample[i].Split('|')[1]), orderby);
            //                    orderby++;
            //                }
            //            }
            //        }

            //        SchedulerManager.deleteCallPlannerGifts(id);
            //        if (gifts != "")
            //        {
            //            int orderby = 1;
            //            string[] gift = gifts.Split(';');
            //            for (int i = 0; i < gift.Length - 1; i++)
            //            {
            //                if (gift[i] != "-1")
            //                {
            //                    SchedulerManager.InsertCallPlannerGifts(id, int.Parse(gift[i]), orderby);
            //                    orderby++;
            //                }
            //            }
            //        }
            //        if (bmdid != -1)
            //        {
            //            SchedulerManager.insertCallPlannerBMDCoordinator(id, bmdid, DateTime.Now, DateTime.Now, 0);
            //        }
            //    }
            //    string res = activity + ";" + doctorid + ";" + start + ";" + end + ";" + description + ";" + ActivitiesCollection.Instance[activity].name + ";" + ActivitiesCollection.Instance[activity].color + ";" + ActivitiesCollection.Instance[activity].tcolor + ";" + currentClassID.ToString() + ";" + currentBrickID.ToString() + ";" + products.Replace(";", "*") + ";" + reminders.Replace(";", "*");
            //    Response.Write(res);
            //    for (int i = 0; i < EventCollection.Instance.eventsList.Count; i++)
            //    {
            //        if (EventCollection.Instance.eventsList[i].id == id)
            //        {
            //            Events e1 = new Events(id, ActivitiesCollection.Instance[activity].name, start, end, Convert.ToInt64(doctorid));
            //            EventCollection.Instance.eventsList[i] = e1;
            //        }
            //    }
            //    if (isRemovePreviousClassDoctor)
            //        EventCollection.Instance.RemoveDoctorClass(previousDoctorID);
            //    if (isAddCurrentClassDoctor)
            //        EventCollection.Instance.AddDoctorClass(currentDoctorID);
            //}
            #endregion
        }


        public void InsertCallPlannerMonthDetails()
        {
            Boolean inrange = false;
            Boolean datediff = false;
            DateTime current = DateTime.Parse(Request.QueryString["date"].ToString()).ToUniversalTime().AddHours(5);
            int activity = int.Parse(Request.QueryString["activity"].ToString());
            //int MIOID = int.Parse(Request.QueryString["mioid"].ToString());
            int recIns = 0;
            DateTime start = DateTime.Parse(current.ToShortDateString() + " " + Request.QueryString["starttime"].ToString());
            DateTime end = DateTime.Parse(current.ToShortDateString() + " " + Request.QueryString["endtime"].ToString());
            string s = "";
            string employeeid = Convert.ToString(HttpContext.Current.Session["CurrentUserId"]);
            int idch = 0;
            idch = SchedulerManager.zsm_planning_time_check(start, employeeid);
            string mioid = "";
            if (Request.QueryString["mioid"].ToString().Split('-')[0].ToString() == "Doc")
            {
                string mio = Request.QueryString["mioid"].ToString().Split('-')[1];
                _nv.Clear();
                _nv.Add("@Miocode-int", mio);
                DataSet dsd = dl.GetData("sp_check_mioid", _nv);
                if (dsd.Tables[0].Rows.Count != 0)
                {

                }
                else
                {
                    _nv.Clear();
                    _nv.Add("@Miocode-int", mio);
                    dl.InserData("sp_insert_mioid", _nv);
                    dsd = dl.GetData("sp_check_mioid", _nv);
                }
                mioid = dsd.Tables[0].Rows[0]["EmployeeId"].ToString();
            }
            else
            {
                mioid = Convert.ToString(Request.QueryString["mioid"]);
            }

            if (idch != 0)
            {
                inrange = true;
            }           
            if (start >= end)
            {
                datediff = true;
                Response.Write("datediff");
            }
            else if (inrange)
                Response.Write("outofrange");
            else
            {
                int id = 0;
                int employeeid_ZSM = Convert.ToInt32(HttpContext.Current.Session["CurrentUserId"]);
                id = SchedulerManager.CheckPlannerMonthZSM(current, employeeid_ZSM);
                if (id == 0)
                {
                    id = SchedulerManager.insertCallPlannerMonthZSM(current, true, employeeid_ZSM, Utility.STATUS_INPROCESS, "", 0);
                    if (id > 0)
                    {
                        recIns = SchedulerManager.InsertCallPlannerMIOZSM(id, start, end, true, activity, Convert.ToInt32(mioid), "", Utility.STATUS_INPROCESS, "");
                    }
                }
                else
                {
                    recIns = SchedulerManager.InsertCallPlannerMIOZSM(id, start, end, true, activity, Convert.ToInt32(mioid), "", Utility.STATUS_INPROCESS, "");
                }
                string mioname = "";
                DataSet ds;

                dl = new DAL();
                _nv = new NameValueCollection();
                _nv.Add("@mioid-int", mioid);
                ds = dl.GetData("sp_mioname", _nv);
                mioname = ds.Tables[0].Rows[0]["EmployeeName"].ToString();

                string res = activity + ";" + mioid + ";" + start + ";" + end + ";" + "" + ";" + ActivitiesCollection.Instance[activity].name + ";" + ActivitiesCollection.Instance[activity].color + ";" + ActivitiesCollection.Instance[activity].tcolor + ";" + id + ";" + recIns + ";" + Utility.STATUS_INPROCESS + ";" + "" + ";" + 0 + ";" + true + ";" + current + ";" + mioname.ToString();
                Events e1 = new Events(id, ActivitiesCollection.Instance[activity].name, start, end, Convert.ToInt64(employeeid_ZSM));
                EventCollection.Instance.AddEvent(e1);
                Response.Write(res);
            }
        }

        public void ProcessGetTime()
        {
            StringBuilder str = new StringBuilder("");
            List<string> timelist = new List<string>();
            TimeSpan t = TimeSpan.FromMinutes(15);
            TimeSpan l = TimeSpan.FromMinutes(15);

            for (int i = 0; i < 95; i++)
            {
                if (i > 30 && i < 95)
                {
                    str.Append(l.ToString());
                    str.Append(";");
                }
                l = l.Add(t);
            }
            if (str.Length > 1)
            {
                str.Append("23:59:00;");
                str.Length -= 1;
            }

            Response.Write(str);
        }
        public void fillClasses()
        {
            int mioid = int.Parse(Request.QueryString["mioid"].ToString());
            DataTable lsDT = SchedulerManager.getClasses(mioid);
            StringBuilder str = new StringBuilder("");
            for (int i = 0; i < lsDT.Rows.Count; i++)
            {
                str.Append(lsDT.Rows[i]["Classid"].ToString());
                str.Append(",");
                str.Append(lsDT.Rows[i]["Class"].ToString());
                str.Append(";");
            }
            if (str.Length > 0)
                str.Length -= 1;
            Response.Write(str);

        }

        public void fillBricks()
        {
            int mioid = int.Parse(Request.QueryString["mioid"].ToString());
            DataTable lsDT = SchedulerManager.getBricks(mioid);
            StringBuilder str = new StringBuilder("");
            for (int i = 0; i < lsDT.Rows.Count; i++)
            {
                str.Append(lsDT.Rows[i]["Brickid"].ToString());
                str.Append(",");
                str.Append(lsDT.Rows[i]["Brick"].ToString());
                str.Append(";");
            }
            if (str.Length > 0)
                str.Length -= 1;
            Response.Write(str);

        }
        public void ProcessGetDoctors()
        {
            int empid = int.Parse(Request.QueryString["mioid"].ToString());
            DataTable lsDT = SchedulerManager.getDoctors(empid);
            StringBuilder str = new StringBuilder("");
            for (int i = 0; i < lsDT.Rows.Count; i++)
            {
                str.Append(lsDT.Rows[i]["DoctorId"].ToString());
                str.Append(",");
                str.Append(SchedulerManager.GetPuriedString(lsDT.Rows[i]["FirstName"].ToString()));
                str.Append(";");
            }
            if (str.Length > 0)
                str.Length -= 1;
            Response.Write(str);
        }

        public void ProcessGetActivities()
        {
            //DataTable lsDT = SchedulerManager.getActivities();
            //StringBuilder str = new StringBuilder("");
            //for (int i = 0; i < lsDT.Rows.Count; i++)
            //{
            //    str.Append(lsDT.Rows[i]["pk_CPA_CallPlannerActivityID"].ToString());
            //    str.Append(",");
            //    str.Append(lsDT.Rows[i]["CPA_Name"].ToString());
            //    str.Append(";");
            //}
            StringBuilder str = new StringBuilder("");
            foreach (Activities activity in ActivitiesCollection.Instance.ActivitiesList.Values)
            {
                str.Append(activity.id);
                str.Append(",");
                str.Append(activity.name);
                str.Append(",");
                str.Append(activity.noofproducts);
                str.Append(",");
                str.Append(activity.noofreminders);
                str.Append(",");
                str.Append(activity.noofsamples);
                str.Append(",");
                str.Append(activity.noofGifs);
                str.Append(";");
            }

            if (str.Length > 0)
                str.Length -= 1;
            Response.Write(str);
        }
        public void ProcessGetBMDbyMIO()
        {
            int mioid = int.Parse(Request.QueryString["mioid"].ToString());
            DataTable lsDT = SchedulerManager.GetBDMbyMIO(mioid);
            StringBuilder str = new StringBuilder("");
            if (lsDT.Rows.Count > 0)
            {
                str.Append(lsDT.Rows[0]["fk_CPB_EMP_BMDCoordinatorEmployeeID"].ToString());
            }
            Response.Write(str);
        }
        public void ProcessGetDoctorsbyBrick()
        {
            int mioid = int.Parse(Request.QueryString["mioid"].ToString());
            int brickid = int.Parse(Request.QueryString["brickid"].ToString());
            DataTable lsDT = new DataTable();
            if (brickid == -1)
            {
                lsDT = SchedulerManager.getDoctors(mioid);
            }
            else
            {
                lsDT = SchedulerManager.getDoctorsbyBrick(mioid, brickid);
            }
            StringBuilder str = new StringBuilder("");
            for (int i = 0; i < lsDT.Rows.Count; i++)
            {
                str.Append(lsDT.Rows[i]["DoctorId"].ToString());
                str.Append(",");
                str.Append(SchedulerManager.GetPuriedString(lsDT.Rows[i]["FirstName"].ToString()));
                str.Append(";");
            }
            if (str.Length > 0)
                str.Length -= 1;
            Response.Write(str);

        }

        public void ProcessGetDoctorsbyClass()
        {
            int mioid = int.Parse(Request.QueryString["mioid"].ToString());
            int classid = int.Parse(Request.QueryString["classid"].ToString());
            DataTable lsDT = new DataTable();
            if (classid == -1)
            {
                lsDT = SchedulerManager.getDoctors(mioid);
            }
            else
            {
                lsDT = SchedulerManager.getDoctorsbyClass(mioid, classid);
            }
            StringBuilder str = new StringBuilder("");
            for (int i = 0; i < lsDT.Rows.Count; i++)
            {
                str.Append(lsDT.Rows[i]["DoctorId"].ToString());
                str.Append(",");
                str.Append(SchedulerManager.GetPuriedString(lsDT.Rows[i]["FirstName"].ToString()));
                str.Append(";");
            }
            if (str.Length > 0)
                str.Length -= 1;
            Response.Write(str);

        }

        public void ProcessGetEvents()
        {
            DateTime initial = DateTime.Parse(Request.QueryString["initial"].ToString());
            int empid = int.Parse(Request.QueryString["mioid"]);

            SchedulerManager.loadmonthlyevents(empid); // Get the specific MIO Monthly Events
            int monthidforZSM = 0;
            EventCollection.Instance.Clear();
            DataTable lsDT = SchedulerManager.getEventsZSM(empid, initial);
            //for (int i = 0; i < lsDT.Rows.Count; i++)
            //{

            //    Events e = new Events(int.Parse(lsDT.Rows[i]["plannerID"].ToString()), lsDT.Rows[i]["ActName"].ToString(), DateTime.Parse(lsDT.Rows[i]["startdate"].ToString()), DateTime.Parse(lsDT.Rows[i]["enddate"].ToString()), Convert.ToInt64(lsDT.Rows[i]["DoctorID"].ToString()));
            //    EventCollection.Instance.AddEvent(e);
            //}
            ////DataTable lsDT = SchedulerManager.getEvents(empid, "Submitted,Resubmitted");            
            StringBuilder str = new StringBuilder("");
            for (int i = 0; i < lsDT.Rows.Count; i++)
            {
                str.Append(lsDT.Rows[i]["ActName"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["startdate"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["enddate"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["ActBColor"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["plannerID"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["ActFColor"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["editable"].ToString());
                str.Append(";");
                str.Append("");
                str.Append(";");
                str.Append(lsDT.Rows[i]["MioDescription"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["MioStatus"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["MioStatusReason"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["planMonth"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["ActID"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["MonthlyID"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["MIOAuthID"].ToString());
                str.Append(";");
                if (initial.Month == DateTime.Parse(lsDT.Rows[i]["planMonth"].ToString()).Month && initial.Year == DateTime.Parse(lsDT.Rows[i]["planMonth"].ToString()).Year)
                {
                    str.Append(lsDT.Rows[i]["mstatus"].ToString());
                    monthidforZSM = int.Parse(lsDT.Rows[i]["MonthlyID"].ToString());
                    str.Append(";");
                    str.Append(Utility.GetStatusColor(lsDT.Rows[i]["mstatus"].ToString()));
                }
                else
                {
                    str.Append("");
                    str.Append(";");
                    str.Append("");
                }
                str.Append(";");
                str.Append(SchedulerManager.ProcessGetInformedJVs(Convert.ToInt32(lsDT.Rows[i]["plannerID"].ToString()))); // to Check JV
                str.Append(";");
                str.Append(SchedulerManager.GetProductsAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(";");
                str.Append("");
                str.Append(";");
                str.Append("");
                str.Append(";");
                str.Append(SchedulerManager.GetRemindersAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(";");               
                str.Append(lsDT.Rows[i]["DoctorName"].ToString());
                str.Append(";");                
                str.Append(SchedulerManager.GetSamplesAndQuantityAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(";");                
                str.Append(SchedulerManager.GetGiftsAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(";");
                str.Append(lsDT.Rows[i]["DocBrick"].ToString());                
                str.Append(",");
            }
            if (str.Length > 0)
            {
                str.Length -= 1;
            }
            str.Append("$");

            DataTable lsDT1 = SchedulerManager.getMonthlyStatusforEmployee(int.Parse(HttpContext.Current.Session["ZSMid"].ToString()), initial);
            if (lsDT1.Rows.Count > 0)
            {
                str.Append(lsDT1.Rows[0]["CPM_PlanStatus"].ToString());
                str.Append(";");
                str.Append(Utility.GetStatusColor(lsDT1.Rows[0]["CPM_PlanStatus"].ToString()));
                str.Append(";");
                str.Append(lsDT1.Rows[0]["CPM_IsEditable"].ToString());
            }
            else
            {
                str.Append("");
                str.Append(";");
                str.Append("");
                str.Append(";");
                str.Append("True");
            }
            
            Response.Write(str);
        }

        public void ProcessGetEventsZSM()
        {
            DateTime initial = DateTime.Parse(Request.QueryString["initial"].ToString());
            int empid = Convert.ToInt32(HttpContext.Current.Session["CurrentUserId"]);

            SchedulerManager.loadmonthlyevents(empid); // Get the specific MIO Monthly Events
            int monthidforZSM = 0;
            EventCollection.Instance.Clear();
            DataTable lsDT = SchedulerManager.getEventsZSMNew(empid, initial);
            //for (int i = 0; i < lsDT.Rows.Count; i++)
            //{

            //    Events e = new Events(int.Parse(lsDT.Rows[i]["plannerID"].ToString()), lsDT.Rows[i]["ActName"].ToString(), DateTime.Parse(lsDT.Rows[i]["startdate"].ToString()), DateTime.Parse(lsDT.Rows[i]["enddate"].ToString()), Convert.ToInt64(lsDT.Rows[i]["DoctorID"].ToString()));
            //    EventCollection.Instance.AddEvent(e);
            //}
            ////DataTable lsDT = SchedulerManager.getEvents(empid, "Submitted,Resubmitted");            
            StringBuilder str = new StringBuilder("");
            for (int i = 0; i < lsDT.Rows.Count; i++)
            {
                str.Append(lsDT.Rows[i]["ActName"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["startdate"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["enddate"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["ActBColor"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["plannerID"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["ActFColor"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["editable"].ToString());
                str.Append(";");
                str.Append("");
                str.Append(";");
                str.Append(lsDT.Rows[i]["MioDescription"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["MioStatus"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["MioStatusReason"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["planMonth"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["ActID"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["MonthlyID"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["MIOAuthID"].ToString());
                str.Append(";");
                if (initial.Month == DateTime.Parse(lsDT.Rows[i]["planMonth"].ToString()).Month && initial.Year == DateTime.Parse(lsDT.Rows[i]["planMonth"].ToString()).Year)
                {
                    str.Append(lsDT.Rows[i]["mstatus"].ToString());
                    monthidforZSM = int.Parse(lsDT.Rows[i]["MonthlyID"].ToString());
                    str.Append(";");
                    str.Append(Utility.GetStatusColor(lsDT.Rows[i]["mstatus"].ToString()));
                }
                else
                {
                    str.Append("");
                    str.Append(";");
                    str.Append("");
                }
                str.Append(";");
                str.Append(SchedulerManager.ProcessGetInformedJVs(Convert.ToInt32(lsDT.Rows[i]["plannerID"].ToString()))); // to Check JV
                str.Append(";");
                str.Append(SchedulerManager.GetProductsAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(";");
                str.Append("");
                str.Append(";");
                str.Append("");
                str.Append(";");
                str.Append(SchedulerManager.GetRemindersAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(";");
                str.Append(lsDT.Rows[i]["mioempName"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["mioempid"].ToString());
                str.Append(";");
                str.Append(SchedulerManager.GetSamplesAndQuantityAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(";");
                str.Append(SchedulerManager.GetGiftsAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                
                
                
                str.Append(",");
            }
            if (str.Length > 0)
            {
                str.Length -= 1;
            }
            str.Append("$");

            DataTable lsDT1 = SchedulerManager.getMonthlyStatusforEmployee(int.Parse(HttpContext.Current.Session["ZSMid"].ToString()), initial);
            if (lsDT1.Rows.Count > 0)
            {
                str.Append(lsDT1.Rows[0]["CPM_PlanStatus"].ToString());
                str.Append(";");
                str.Append(Utility.GetStatusColor(lsDT1.Rows[0]["CPM_PlanStatus"].ToString()));
                str.Append(";");
                str.Append(lsDT1.Rows[0]["CPM_IsEditable"].ToString());
            }
            else
            {
                str.Append("");
                str.Append(";");
                str.Append("");
                str.Append(";");
                str.Append("True");
            }
            Response.Write(str);
        }

        public void ProcessGetEventsbyActivityId()
        {
            DateTime initial = DateTime.Parse(Request.QueryString["initial"].ToString());
            int empid = int.Parse(Request.QueryString["mioid"].ToString());
            int activityid = int.Parse(Request.QueryString["actid"].ToString());
            SchedulerManager.loadmonthlyevents(empid); // Get the specific MIO Monthly Events
            EventCollection.Instance.Clear();
            DataTable lsDT = SchedulerManager.getEventsbyActivityId(empid, activityid, initial);
            //for (int i = 0; i < lsDT.Rows.Count; i++)
            //{
            //    Events e = new Events(int.Parse(lsDT.Rows[i]["plannerID"].ToString()), lsDT.Rows[i]["ActName"].ToString(), DateTime.Parse(lsDT.Rows[i]["startdate"].ToString()), DateTime.Parse(lsDT.Rows[i]["enddate"].ToString()), Convert.ToInt64(lsDT.Rows[i]["DoctorID"].ToString()));
            //    EventCollection.Instance.AddEvent(e);
            //}
            ////DataTable lsDT = SchedulerManager.getEventsbyActivityId(empid, activityid);
            StringBuilder str = new StringBuilder("");
            for (int i = 0; i < lsDT.Rows.Count; i++)
            {
                Events e = new Events(int.Parse(lsDT.Rows[i]["plannerID"].ToString()), lsDT.Rows[i]["ActName"].ToString(), DateTime.Parse(lsDT.Rows[i]["startdate"].ToString()), DateTime.Parse(lsDT.Rows[i]["enddate"].ToString()), Convert.ToInt64(lsDT.Rows[i]["DoctorID"].ToString()));
                EventCollection.Instance.AddEvent(e);

                str.Append(lsDT.Rows[i]["ActName"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["startdate"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["enddate"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["ActBColor"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["plannerID"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["ActFColor"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["editable"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["DoctorID"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["MioDescription"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["MioStatus"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["MioStatusReason"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["planMonth"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["ActID"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["MonthlyID"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["MIOAuthID"].ToString());
                str.Append(";");
                if (initial.Month == DateTime.Parse(lsDT.Rows[i]["planMonth"].ToString()).Month)
                {
                    str.Append(lsDT.Rows[i]["mstatus"].ToString());
                    str.Append(";");
                    str.Append(Utility.GetStatusColor(lsDT.Rows[i]["mstatus"].ToString()));
                }
                else
                {
                    str.Append("");
                    str.Append(";");
                    str.Append("");
                }
                str.Append(";");
                str.Append(SchedulerManager.ProcessGetInformedJVs(Convert.ToInt32(lsDT.Rows[i]["plannerID"].ToString()))); // to Check JV
                str.Append(";");
                str.Append(SchedulerManager.GetProductsAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(";");
                str.Append(SchedulerManager.getClassesByDoctor(Convert.ToInt64(lsDT.Rows[i]["DoctorID"].ToString())));
                str.Append(";");
                str.Append(SchedulerManager.getBricksByDoctor(Convert.ToInt64(lsDT.Rows[i]["DoctorID"].ToString())));
                str.Append(";");
                str.Append(SchedulerManager.GetRemindersAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(";");
                str.Append(lsDT.Rows[i]["DoctorName"].ToString());
                str.Append(";");
                str.Append(SchedulerManager.GetSamplesAndQuantityAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(";");
                str.Append(SchedulerManager.GetGiftsAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(",");
            }
            if (str.Length > 0)
            {
                str.Length -= 1;
            }
            str.Append("$");

            DataTable lsDT1 = SchedulerManager.getMonthlyStatusforEmployee(int.Parse(HttpContext.Current.Session["ZSMid"].ToString()), initial);
            if (lsDT1.Rows.Count > 0)
            {
                str.Append(lsDT1.Rows[0]["CPM_PlanStatus"].ToString());
                str.Append(";");
                str.Append(Utility.GetStatusColor(lsDT1.Rows[0]["CPM_PlanStatus"].ToString()));
                str.Append(";");
                str.Append(lsDT1.Rows[0]["CPM_IsEditable"].ToString());
            }
            else
            {
                str.Append("");
                str.Append(";");
                str.Append("");
                str.Append(";");
                str.Append("True");
            }
            Response.Write(str);
        }

        public void ProcessGetZSMEvents()
        {
            DateTime initial = DateTime.Parse(Request.QueryString["initial"].ToString());
            int empid = int.Parse(Request.QueryString["zsmid"].ToString());
            //SchedulerManager.loadmonthlyevents(empid);
            //EventCollection.Clear();
            //DataTable DT = SchedulerManager.getEvents(empid);
            //for (int i = 0; i < DT.Rows.Count; i++)
            //{
            //    Events e = new Events(int.Parse(DT.Rows[i]["plannerID"].ToString()), DT.Rows[i]["ActName"].ToString(), DateTime.Parse(DT.Rows[i]["startdate"].ToString()), DateTime.Parse(DT.Rows[i]["enddate"].ToString()));
            //    EventCollection.Instance.AddEvent(e);
            //}
            DataTable lsDT = SchedulerManager.getZSMActivities(empid, initial);
            StringBuilder str = new StringBuilder("");
            for (int i = 0; i < lsDT.Rows.Count; i++)
            {
                if (i > 200)
                {
                    var asda = "";
                }

                str.Append(lsDT.Rows[i]["ActName"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["startdate"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["enddate"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["ActBColor"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["plannerID"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["ActFColor"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["editable"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["DoctorID"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["MioDescription"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["MioStatus"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["MioStatusReason"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["planMonth"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["ActID"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["MonthlyID"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["MIOAuthID"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["zsmid"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["mioempid"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["zsmdescription"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["zsminformed"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["zsmmonthid"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["zsmplanstatus"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["zsmreason"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["zsmisedit"].ToString());
                str.Append(";");

                DAL dl = new DAL();
                NameValueCollection _nv = new NameValueCollection();
                _nv.Add("@mioid-int", lsDT.Rows[i]["mioempid"].ToString());
                DataSet ds = dl.GetData("sp_mioname", _nv);

                str.Append(ds.Tables[0].Rows[0][0].ToString());
                str.Append(",");

            }
            if (str.Length > 0)
            {
                str.Length -= 1;
            }
            str.Append("$");

            DataTable lsDT1 = SchedulerManager.getMonthlyStatusforEmployeeZSM(int.Parse(HttpContext.Current.Session["ZSMid"].ToString()), initial);
            for (int i = 0; i < lsDT1.Rows.Count; i++)
            {
                str.Append(lsDT1.Rows[i]["CPM_PlanStatus"].ToString());
                str.Append(";");
                str.Append(Utility.GetStatusColor(lsDT1.Rows[i]["CPM_PlanStatus"].ToString()));
                break;
            }
            Response.Write(str);
        }

        public void ProcessGetZSMEventsbyActivityId()
        {
            DateTime initial = DateTime.Parse(Request.QueryString["initial"].ToString());

            int empid = int.Parse(Request.QueryString["zsmid"].ToString());
            int actid = int.Parse(Request.QueryString["actid"].ToString());
            //SchedulerManager.loadmonthlyevents(empid);
            //EventCollection.Clear();
            //DataTable DT = SchedulerManager.getEvents(empid);
            //for (int i = 0; i < DT.Rows.Count; i++)
            //{
            //    Events e = new Events(int.Parse(DT.Rows[i]["plannerID"].ToString()), DT.Rows[i]["ActName"].ToString(), DateTime.Parse(DT.Rows[i]["startdate"].ToString()), DateTime.Parse(DT.Rows[i]["enddate"].ToString()));
            //    EventCollection.Instance.AddEvent(e);
            //}
            DataTable lsDT = SchedulerManager.getZSMActivitiesbyActivityIdZSM(empid, actid, initial);
            StringBuilder str = new StringBuilder("");
            for (int i = 0; i < lsDT.Rows.Count; i++)
            {
                str.Append(lsDT.Rows[i]["ActName"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["startdate"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["enddate"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["ActBColor"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["plannerID"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["ActFColor"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["editable"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["DoctorID"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["MioDescription"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["MioStatus"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["MioStatusReason"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["planMonth"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["ActID"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["MonthlyID"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["MIOAuthID"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["zsmid"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["mioempid"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["zsmdescription"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["zsminformed"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["zsmmonthid"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["zsmplanstatus"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["zsmreason"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["zsmisedit"].ToString());
                str.Append(";");

                DAL dl = new DAL();
                NameValueCollection _nv = new NameValueCollection();
                _nv.Add("@mioid-int", lsDT.Rows[i]["mioempid"].ToString());
                DataSet ds = dl.GetData("sp_mioname", _nv);

                str.Append(ds.Tables[0].Rows[0][0].ToString());
                str.Append(",");

            }
            if (str.Length > 0)
            {
                str.Length -= 1;
            }
            str.Append("$");

            DataTable lsDT1 = SchedulerManager.getMonthlyStatusforEmployeeZSM(int.Parse(HttpContext.Current.Session["ZSMid"].ToString()), initial);
            for (int i = 0; i < lsDT1.Rows.Count; i++)
            {
                str.Append(lsDT1.Rows[i]["CPM_PlanStatus"].ToString());
                str.Append(";");
                str.Append(Utility.GetStatusColor(lsDT1.Rows[i]["CPM_PlanStatus"].ToString()));
                break;
            }
            Response.Write(str);
        }

        public void ProcessDeleteEvent()
        {
            int id = int.Parse(Request.QueryString["id"].ToString());
            SchedulerManager.deleteCallPlannerProducts(id);
            SchedulerManager.deleteCallPlannerReminders(id);
            SchedulerManager.deleteBMDCoordinator(id);
            SchedulerManager.deleteEvent(id);
            EventCollection.Instance.RemoveEvent(id);
        }

        public void DeleteZSMEvent()
        {
            int id = int.Parse(Request.QueryString["id"].ToString());
            SchedulerManager.deleteEventbyzsmid(id);
            //for (int i = 0; i < ZSMEventsCollection.Instance.ZSMEventsList.Count; i++)
            //{
            //    if (ZSMEventsCollection.Instance.ZSMEventsList[i].id == id)
            //    {
            //        ZSMEventsCollection.Instance.ZSMEventsList.RemoveAt(i);
            //    }
            //}
        }

        public void ProcessGetMIOs()
        {

            DataTable lsDT = SchedulerManager.GetSubEmployees(int.Parse(HttpContext.Current.Session["CurrentUserId"].ToString()));
            StringBuilder str = new StringBuilder("");
            for (int i = 0; i < lsDT.Rows.Count; i++)
            {
                str.Append(lsDT.Rows[i]["EmployeeId"].ToString());
                str.Append(",");
                str.Append(SchedulerManager.GetPuriedString(lsDT.Rows[i]["EmployeeName"].ToString()));
                str.Append(",");
                str.Append(SchedulerManager.GetPuriedString(lsDT.Rows[i]["EmployeeCode"].ToString()));
                str.Append(";");

            }
            if (str.Length > 1)
            {
                str.Length -= 1;
            }
            // str.Append("150,MIO 1;151,MIO 2;152,MIO 3");
            Response.Write(str);
        }

        //public void ProcessUpdateEvents()
        //{
        //    int id = int.Parse(Request.QueryString["id"].ToString());
        //    string title = Request.QueryString["title"].ToString();
        //    string start = Request.QueryString["start"].ToString();
        //    string end = Request.QueryString["end"].ToString();
        //    string color = Request.QueryString["color"].ToString();
        //    SchedulerManager.updateEvents(id, title, start, end, color);
        //}

        //public void ProcessAddEvent()
        //{
        //    string title = Request.QueryString["title"].ToString();
        //    string start = Request.QueryString["start"].ToString();
        //    string end = Request.QueryString["end"].ToString();
        //    string color = Request.QueryString["color"].ToString();
        //    int id = SchedulerManager.addEvents(title, start, end, color);
        //    Response.Write(id);
        //}

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}