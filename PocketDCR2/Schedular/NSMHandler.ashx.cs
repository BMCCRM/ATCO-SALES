using System;
using System.Web;
using System.Data;
using System.Text;
using SchedulerDAL;
using System.Collections;
using PocketDCR2.Classes;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.Net.Mail;

namespace PocketDCR2.Schedular
{
    /// <summary>
    /// Summary description for NSMHandler
    /// </summary>
    public class NSMHandler : IHttpHandler, System.Web.SessionState.IRequiresSessionState
    {

        HttpRequest Request;
        HttpResponse Response;
        DAL dl = new DAL();
        NameValueCollection _nv = new NameValueCollection();
        public void ProcessRequest(HttpContext context)
        {
            Request = context.Request;
            Response = context.Response;
            switch (context.Request.QueryString["method"].ToLower())
            {
                case "getzsmsandmios":
                    ProcessGetZSMsandMIOs();
                    break;
                case "getrsms":
                    ProcessGetRSMs();
                    break;
                case "getzsms":
                    ProcessGetZSMs();
                    break;
                case "getmios":
                    ProcessGetMIOs();
                    break;
                //case "fillbmd":
                //    ProcessGetBMDs();
                //    break;
                //case "getbmdformio":
                //    ProcessGetBMDbyMIO();
                //    break;
                //case "getevents":
                //    ProcessGetEvents();
                //    break;
                case "getnsmevents":
                    ProcessGetNSMEvents();
                    break;
                //case "updateevent":
                //    ProcessUpdateEvents();
                //    break;
                //case "delevent":
                //    ProcessDeleteEvent();
                //    break;
                //case "addevent":
                //    ProcessAddEvent();
                //    break;
                //case "getactivities":
                //    ProcessGetActivities();
                //    break;
                //case "getdoctors":
                //    ProcessGetDoctors();
                //    break;
                //case "gettime":
                //    ProcessGetTime();
                //    break;
                //case "insertcallplannermonth":
                //    InsertCallPlannerMonthDetails();
                //    break;
                //case "updatecallplannermonth":
                //    UpdateCallPlannerMonthDetails();
                //    break;
                //case "sendforapproval":
                //    ProcessSendForApproval();
                //    break;
                //case "checkforedit":
                //    CheckforEdit();
                //    break;
                case "editrsmplan":
                    updateRSMPlan();
                    break;
                case "insertzsmplan":
                    insertZSMPlan();
                    break;
                case "insertrsmplan":
                    insertRSMPlan();
                    break;
                case "insertnsmplanformio":
                    insertNSMPlanforMIO();
                    break;
                case "checknsm":
                    CheckNSM();
                    break;
                case "getnsmid":
                    Response.Write(HttpContext.Current.Session["NSMid"].ToString());
                    break;
                case "setzsmid":
                    HttpContext.Current.Session["ZSMid"] = Request.QueryString["zsmid"].ToString();
                    loadZSMevents(int.Parse(Request.QueryString["zsmid"].ToString()));
                    break;
                case "setrsmid":
                    HttpContext.Current.Session["RSMid"] = Request.QueryString["rsmid"].ToString();
                    loadZSMevents(int.Parse(Request.QueryString["rsmid"].ToString()));
                    break;
                case "deleventbyrsmid":
                    DeleteRSMEvent();
                    break;
                //case "geteventsbyactivityid":
                //    ProcessGetEventsbyActivityId();
                //    break;
                case "getnsmeventsbyactivityid":
                    ProcessGetNSMEventsbyActivityId();
                    break;
                case "approversmplan":
                    ProcessApproveRSMPlan();
                    break;
                case "rejectrsmplan":
                    ProcessRejectRSMPlan();
                    break;
                case "getzsmevents":
                    ProcessGetZSMEvents();
                    break;
                case "getzsmeventsbyactivityid":
                    ProcessGetZSMEventsbyActivityId();
                    break;
                case "getrsmevents":
                    ProcessGetRSMEvents();
                    break;
                case "getrsmeventsbyactivityid":
                    ProcessGetRSMEventsbyActivityId();
                    break;
                case "geteventssummary":
                    ProcessGetEventsSummary();
                    break;
                case "geteventssummarybyactivityid":
                    ProcessGetEventsSummarybyactivityid();
                    break;
                case "getevents":
                    ProcessGetEvents();
                    break;
                case "geteventsbyactivityid":
                    ProcessGetEventsbyActivityId();
                    break;
            }
        }


        public void ProcessGetRSMs()
        {
            //8,RSM 1,001~9,RSM 2,002
            DataTable lsDTRSM = SchedulerManager.GetSubEmployees(int.Parse(HttpContext.Current.Session["NSMid"].ToString()));
            StringBuilder str = new StringBuilder("");
            for (int i = 0; i < lsDTRSM.Rows.Count; i++)
            {
                if (i != 0)
                    str.Append("~");

                str.Append(lsDTRSM.Rows[i]["EmployeeId"].ToString());
                str.Append(",");
                str.Append(SchedulerManager.GetPuriedString(lsDTRSM.Rows[i]["EmployeeName"].ToString()));
                str.Append(",");
                str.Append(SchedulerManager.GetPuriedString(lsDTRSM.Rows[i]["EmployeeCode"].ToString()));
            }
            Response.Write(str);
        }
        public void ProcessGetZSMs()
        {
            //8,ZSM 1,001~9,ZSM 2,002
            int rsmID = int.Parse(Request.QueryString["rsmid"].ToString());
            DataTable lsDTZSM = SchedulerManager.GetSubEmployees(rsmID);
            StringBuilder str = new StringBuilder("");
            for (int j = 0; j < lsDTZSM.Rows.Count; j++)
            {
                if (j != 0)
                    str.Append("~");

                str.Append(lsDTZSM.Rows[j]["EmployeeId"].ToString());
                str.Append(",");
                str.Append(SchedulerManager.GetPuriedString(lsDTZSM.Rows[j]["EmployeeName"].ToString()));
                str.Append(",");
                str.Append(SchedulerManager.GetPuriedString(lsDTZSM.Rows[j]["EmployeeCode"].ToString()));
            }
            Response.Write(str);
        }
        public void ProcessGetMIOs()
        {
            int zsmID = int.Parse(Request.QueryString["zsmid"].ToString());
            DataTable lsDTMIO = SchedulerManager.GetSubEmployees(zsmID);
            StringBuilder str = new StringBuilder("");
            for (int k = 0; k < lsDTMIO.Rows.Count; k++)
            {
                if (k != 0)
                    str.Append(";");

                str.Append(lsDTMIO.Rows[k]["EmployeeId"].ToString());
                str.Append(",");
                str.Append(SchedulerManager.GetPuriedString(lsDTMIO.Rows[k]["EmployeeName"].ToString()));
                str.Append(",");
                str.Append(SchedulerManager.GetPuriedString(lsDTMIO.Rows[k]["EmployeeCode"].ToString()));
            }
            Response.Write(str);
        }
        public void ProcessGetZSMsandMIOs()
        {
            //8,RSM 1^10,ZSM 1$150,MIO 1;151,MIO 2;152,MIO 3*10,ZSM 1$150,MIO 1;151,MIO 2;152,MIO 3~8,RSM 1^10,ZSM 1$150,MIO 1;151,MIO 2;152,MIO 3*10,ZSM 1$150,MIO 1;151,MIO 2;152,MIO 3
            DataTable lsDTRSM = SchedulerManager.GetSubEmployees(int.Parse(HttpContext.Current.Session["NSMid"].ToString()));
            StringBuilder str = new StringBuilder("");
            for (int i = 0; i < lsDTRSM.Rows.Count; i++)
            {
                if (i != 0)
                    str.Append("~");

                str.Append(lsDTRSM.Rows[i]["EmployeeId"].ToString());
                str.Append(",");
                str.Append(SchedulerManager.GetPuriedString(lsDTRSM.Rows[i]["EmployeeName"].ToString()));
                str.Append(",");
                str.Append(SchedulerManager.GetPuriedString(lsDTRSM.Rows[i]["EmployeeCode"].ToString()));
                str.Append("^");
                DataTable lsDTZSM = SchedulerManager.GetSubEmployees(int.Parse(lsDTRSM.Rows[i]["EmployeeId"].ToString()));
                for (int j = 0; j < lsDTZSM.Rows.Count; j++)
                {
                    if (j != 0)
                        str.Append("*");

                    str.Append(lsDTZSM.Rows[j]["EmployeeId"].ToString());
                    str.Append(",");
                    str.Append(SchedulerManager.GetPuriedString(lsDTZSM.Rows[j]["EmployeeName"].ToString()));
                    str.Append(",");
                    str.Append(SchedulerManager.GetPuriedString(lsDTZSM.Rows[j]["EmployeeCode"].ToString()));
                    str.Append("$");
                    DataTable lsDTMIO = SchedulerManager.GetSubEmployees(int.Parse(lsDTZSM.Rows[i]["EmployeeId"].ToString()));
                    for (int k = 0; k < lsDTMIO.Rows.Count; k++)
                    {
                        if (k != 0)
                            str.Append(";");

                        str.Append(lsDTMIO.Rows[k]["EmployeeId"].ToString());
                        str.Append(",");
                        str.Append(SchedulerManager.GetPuriedString(lsDTMIO.Rows[k]["EmployeeName"].ToString()));
                        str.Append(",");
                        str.Append(SchedulerManager.GetPuriedString(lsDTMIO.Rows[k]["EmployeeCode"].ToString()));
                    }
                }
            }
            Response.Write(str);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }



        public void insertRSMPlan()
        {
            string res = "";
            int mioid = int.Parse(Request.QueryString["mioid"].ToString());
            int monthid = int.Parse(Request.QueryString["monthid"].ToString());
            bool rejected = bool.Parse(Request.QueryString["rejected"].ToString());
            string rejectcomments = SchedulerManager.GetPuriedString(Request.QueryString["rejectcomments"].ToString());
            string comments = SchedulerManager.GetPuriedString(Request.QueryString["comments"].ToString().Trim());
            int roleid = int.Parse(HttpContext.Current.Session["Roleid"].ToString());
            bool informed = bool.Parse(Request.QueryString["informed"].ToString());
            int rsmid = int.Parse(HttpContext.Current.Session["RSMid"].ToString());
            int nsmid = int.Parse(HttpContext.Current.Session["NSMid"].ToString());
            int zsmid = int.Parse(HttpContext.Current.Session["ZSMid"].ToString());
            DateTime start = DateTime.Parse(Request.QueryString["start"].ToString());
            DateTime end = DateTime.Parse(Request.QueryString["end"].ToString());
            int bmdid = int.Parse(Request.QueryString["bmd"].ToString());
            int zsmmonthid = int.Parse(Request.QueryString["zsmmonthid"].ToString());
            bool ispresent = false;
            bool isrange = false;
            for (int i = 0; i < NSMEventsCollection.Instance.NSMEventsList.Count; i++)
            {
                if (NSMEventsCollection.Instance.NSMEventsList[i].mioid != mioid)
                {
                    if (start.ToShortDateString() == NSMEventsCollection.Instance.NSMEventsList[i].start.ToShortDateString())
                    {
                        if ((start.TimeOfDay >= NSMEventsCollection.Instance.NSMEventsList[i].start.TimeOfDay && start.TimeOfDay < NSMEventsCollection.Instance.NSMEventsList[i].end.TimeOfDay) || (end.TimeOfDay > NSMEventsCollection.Instance.NSMEventsList[i].start.TimeOfDay && end.TimeOfDay <= NSMEventsCollection.Instance.NSMEventsList[i].end.TimeOfDay))
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
                for (int i = 0; i < NSMEventsCollection.Instance.NSMEventsList.Count; i++)
                {
                    if (NSMEventsCollection.Instance.NSMEventsList[i].employeeid == nsmid && NSMEventsCollection.Instance.NSMEventsList[i].mioid == mioid)
                    {
                        ispresent = true;
                    }
                }

                if (rejected)
                {
                    res = "rejected";
                    SchedulerManager.ChangeZSMPlanStatus(mioid, zsmmonthid, rejectcomments, nsmid, zsmid);
                    if (ispresent)
                    {
                        SchedulerManager.deleteZSMPlanbyMIO(mioid, nsmid);
                        for (int i = 0; i < NSMEventsCollection.Instance.NSMEventsList.Count; i++)
                        {
                            if (NSMEventsCollection.Instance.NSMEventsList[i].employeeid == nsmid && NSMEventsCollection.Instance.NSMEventsList[i].mioid == mioid)
                            {
                                NSMEventsCollection.Instance.NSMEventsList.RemoveAt(i);
                            }
                        }
                    }
                }
                else
                {
                    if (!ispresent)
                    {
                        int mid = 0;
                        int id = 0;
                        mid = SchedulerManager.CheckPlannerMonth(start, nsmid);
                        int bid = 0;
                        if (mid == 0)
                        {
                            mid = SchedulerManager.insertCallPlannerMonth(start, "", true, nsmid, Utility.STATUS_INPROCESS, "", 0);
                            if (mid > 0)
                            {
                                id = SchedulerManager.insertZSMPlan(mioid, mid, true, int.Parse(HttpContext.Current.Session["NSMid"].ToString()), Utility.STATUS_INPROCESS, "", 0, comments, informed, roleid);
                                // id = SchedulerManager.insertRSMPlan(mioid, mid, int.Parse(HttpContext.Current.Session["RSMid"].ToString()), comments, informed);
                                if (bmdid != -1)
                                {
                                    bid = SchedulerManager.insertCallPlannerBMDCoordinator(mioid, bmdid, DateTime.Now, DateTime.Now, nsmid);
                                }
                                NSMEvents e = new NSMEvents(id, nsmid, mid, mioid, comments, informed, start, end);
                                NSMEventsCollection.Instance.AddEvent(e);
                                res = "inserted";
                            }
                        }

                        else if (mid != 0)
                        {
                            id = id = SchedulerManager.insertZSMPlan(mioid, mid, true, int.Parse(HttpContext.Current.Session["NSMid"].ToString()), Utility.STATUS_INPROCESS, "", 0, comments, informed, roleid);
                            {
                                if (bmdid != -1)
                                {
                                    bid = SchedulerManager.insertCallPlannerBMDCoordinator(mioid, bmdid, DateTime.Now, DateTime.Now, nsmid);
                                }
                                NSMEvents e = new NSMEvents(id, nsmid, mid, mioid, comments, informed, start, end);
                                NSMEventsCollection.Instance.AddEvent(e);
                                res = "inserted";
                            }
                        }
                    }
                    else
                    {
                        SchedulerManager.updateZSMPlan(mioid, int.Parse(HttpContext.Current.Session["NSMid"].ToString()), comments, informed);
                        for (int i = 0; i < NSMEventsCollection.Instance.NSMEventsList.Count; i++)
                        {
                            if (NSMEventsCollection.Instance.NSMEventsList[i].employeeid == nsmid && NSMEventsCollection.Instance.NSMEventsList[i].mioid == mioid)
                            {
                                if (bmdid != -1)
                                {
                                    SchedulerManager.insertCallPlannerBMDCoordinator(mioid, bmdid, DateTime.Now, DateTime.Now, nsmid);
                                }
                                NSMEventsCollection.Instance.NSMEventsList[i].description = comments;
                                NSMEventsCollection.Instance.NSMEventsList[i].informed = informed;
                                res = "updated";
                            }
                        }
                    }
                }
                Response.Write(res);
            }
        }


        public void updateRSMPlan()
        {
            string res = "";
            int mioid = int.Parse(Request.QueryString["mioid"].ToString());
            int monthid = int.Parse(Request.QueryString["monthid"].ToString());
            bool rejected = bool.Parse(Request.QueryString["rejected"].ToString());
            string rejectcomments = SchedulerManager.GetPuriedString(Request.QueryString["rejectcomments"].ToString());
            string comments = SchedulerManager.GetPuriedString(Request.QueryString["comments"].ToString().Trim());
            int roleid = int.Parse(HttpContext.Current.Session["Roleid"].ToString());
            bool informed = bool.Parse(Request.QueryString["informed"].ToString());
            int rsmid = int.Parse(HttpContext.Current.Session["RSMid"].ToString());
            int nsmid = int.Parse(HttpContext.Current.Session["NSMid"].ToString());
            DateTime start = DateTime.Parse(Request.QueryString["start"].ToString());
            DateTime end = DateTime.Parse(Request.QueryString["end"].ToString());
            int bmdid = int.Parse(Request.QueryString["bmd"].ToString());
            int rsmmonthid = int.Parse(Request.QueryString["rsmmonthid"].ToString());
            bool ispresent = false;
            bool isrange = false;
            for (int i = 0; i < RSMEventsCollection.Instance.RSMEventsList.Count; i++)
            {
                if (RSMEventsCollection.Instance.RSMEventsList[i].mioid != mioid)
                {
                    if (start.ToShortDateString() == RSMEventsCollection.Instance.RSMEventsList[i].start.ToShortDateString())
                    {
                        if ((start.TimeOfDay >= RSMEventsCollection.Instance.RSMEventsList[i].start.TimeOfDay && start.TimeOfDay < RSMEventsCollection.Instance.RSMEventsList[i].end.TimeOfDay) || (end.TimeOfDay > RSMEventsCollection.Instance.RSMEventsList[i].start.TimeOfDay && end.TimeOfDay <= RSMEventsCollection.Instance.RSMEventsList[i].end.TimeOfDay))
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
                for (int i = 0; i < RSMEventsCollection.Instance.RSMEventsList.Count; i++)
                {
                    if (RSMEventsCollection.Instance.RSMEventsList[i].employeeid == rsmid && RSMEventsCollection.Instance.RSMEventsList[i].mioid == mioid)
                    {
                        ispresent = true;
                    }
                }

                if (rejected)
                {
                    res = "rejected";
                    SchedulerManager.ChangeZSMPlanStatus(mioid, rsmmonthid, rejectcomments, nsmid, rsmid);
                    if (ispresent)
                    {
                        SchedulerManager.deleteZSMPlanbyMIO(mioid, nsmid);
                        for (int i = 0; i < NSMEventsCollection.Instance.NSMEventsList.Count; i++)
                        {
                            if (NSMEventsCollection.Instance.NSMEventsList[i].employeeid == nsmid && NSMEventsCollection.Instance.NSMEventsList[i].mioid == mioid)
                            {
                                NSMEventsCollection.Instance.NSMEventsList.RemoveAt(i);
                            }
                        }
                    }
                }
                else
                {
                    if (!ispresent)
                    {
                        int mid = 0;
                        int id = 0;
                        mid = SchedulerManager.CheckPlannerMonth(start, rsmid);
                        int bid = 0;
                        if (mid == 0)
                        {
                            mid = SchedulerManager.insertCallPlannerMonth(start, "", true, rsmid, Utility.STATUS_INPROCESS, "", 0);
                            if (mid > 0)
                            {
                                id = SchedulerManager.insertZSMPlan(mioid, mid, true, int.Parse(HttpContext.Current.Session["RSMid"].ToString()), Utility.STATUS_INPROCESS, "", 0, comments, informed, roleid);
                                // id = SchedulerManager.insertRSMPlan(mioid, mid, int.Parse(HttpContext.Current.Session["RSMid"].ToString()), comments, informed);
                                if (bmdid != -1)
                                {
                                    bid = SchedulerManager.insertCallPlannerBMDCoordinator(mioid, bmdid, DateTime.Now, DateTime.Now, rsmid);
                                }
                                RSMEvents e = new RSMEvents(id, rsmid, mid, mioid, comments, informed, start, end);
                                RSMEventsCollection.Instance.AddEvent(e);
                                res = "inserted";
                            }
                        }

                        else if (mid != 0)
                        {
                            id = id = SchedulerManager.insertZSMPlan(mioid, mid, true, int.Parse(HttpContext.Current.Session["RSMid"].ToString()), Utility.STATUS_INPROCESS, "", 0, comments, informed, roleid);
                            {
                                if (bmdid != -1)
                                {
                                    bid = SchedulerManager.insertCallPlannerBMDCoordinator(mioid, bmdid, DateTime.Now, DateTime.Now, rsmid);
                                }
                                RSMEvents e = new RSMEvents(id, rsmid, mid, mioid, comments, informed, start, end);
                                RSMEventsCollection.Instance.AddEvent(e);
                                res = "inserted";
                            }
                        }
                    }
                    else
                    {
                        SchedulerManager.updateZSMPlan(mioid, int.Parse(HttpContext.Current.Session["RSMid"].ToString()), comments, informed);
                        for (int i = 0; i < RSMEventsCollection.Instance.RSMEventsList.Count; i++)
                        {
                            if (RSMEventsCollection.Instance.RSMEventsList[i].employeeid == rsmid && RSMEventsCollection.Instance.RSMEventsList[i].mioid == mioid)
                            {
                                if (bmdid != -1)
                                {
                                    SchedulerManager.insertCallPlannerBMDCoordinator(mioid, bmdid, DateTime.Now, DateTime.Now, rsmid);
                                }
                                RSMEventsCollection.Instance.RSMEventsList[i].description = comments;
                                RSMEventsCollection.Instance.RSMEventsList[i].informed = informed;
                                res = "updated";
                            }
                        }
                    }
                }
                Response.Write(res);
            }
        }

        public void CheckNSM()
        { // MODIFIED
            int mioid = int.Parse(Request.QueryString["mioid"].ToString());
            bool rejected = false;
            //if (Request.QueryString["rejected"].ToString() == Utility.STATUS_REJECTED)
            //{
            //    rejected = true;
            //}
            int nsmid = int.Parse(HttpContext.Current.Session["NSMid"].ToString());

            if (!rejected)
            {
                bool ispresent = false;
                string s = "";
                for (int i = 0; i < NSMEventsCollection.Instance.NSMEventsList.Count; i++)
                {
                    if (NSMEventsCollection.Instance.NSMEventsList[i].employeeid == nsmid && NSMEventsCollection.Instance.NSMEventsList[i].mioid == mioid)
                    {
                        ispresent = true;
                        s = NSMEventsCollection.Instance.NSMEventsList[i].informed + ";" + NSMEventsCollection.Instance.NSMEventsList[i].description;
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
                for (int i = 0; i < NSMEventsCollection.Instance.NSMEventsList.Count; i++)
                {
                    if (NSMEventsCollection.Instance.NSMEventsList[i].employeeid == nsmid && NSMEventsCollection.Instance.NSMEventsList[i].mioid == mioid)
                    {
                        // r = RSMEventsCollection.Instance.RSMEventsList[i].statusReason;
                        break;
                    }
                }
                Response.Write(r);
            }

        }

        public void ProcessGetNSMEvents()
        {
            int empid = int.Parse(Request.QueryString["nsmid"].ToString());

            DateTime initial = DateTime.Parse(Request.QueryString["initial"].ToString());
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
                str.Append(lsDT.Rows[i]["zsmmonthid"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["zsmempid"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["zsmdescription"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["zsminformed"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["zsmempid"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["zsmplanstatus"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["zsmreason"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["zsmisedit"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["DoctorName"].ToString());
                str.Append(";");
                str.Append(SchedulerManager.GetProductsNameAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(";");
                str.Append(SchedulerManager.GetRemindersNameAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(";");
                str.Append(DoctorClassesCollection.Instance[SchedulerManager.getClassesByDoctor(Convert.ToInt64(lsDT.Rows[i]["DoctorID"].ToString()))].ClassName);
                str.Append(";");
                str.Append(SchedulerManager.getBricksNameByDoctor(Convert.ToInt64(lsDT.Rows[i]["DoctorID"].ToString())));
                str.Append(";");
                str.Append(SchedulerManager.GetSamplesNameAndQuantityAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(";");
                str.Append(SchedulerManager.GetGiftsNameAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(",");
            }
            if (str.Length > 0)
            {
                str.Length -= 1;
            }
            str.Append("$");
            DataTable lsDT1 = SchedulerManager.getMonthlyStatusforEmployee(int.Parse(HttpContext.Current.Session["NSMid"].ToString()), initial);
            for (int i = 0; i < lsDT1.Rows.Count; i++)
            {
                str.Append(lsDT1.Rows[i]["CPM_PlanStatus"].ToString());
                str.Append(";");
                str.Append(Utility.GetStatusColor(lsDT1.Rows[i]["CPM_PlanStatus"].ToString()));
                break;
            }
            Response.Write(str);
        }

        public void ProcessGetNSMEventsbyActivityId()
        {
            int empid = int.Parse(Request.QueryString["nsmid"].ToString());
            int actid = int.Parse(Request.QueryString["actid"].ToString());
            DateTime initial = DateTime.Parse(Request.QueryString["initial"].ToString());
            //SchedulerManager.loadmonthlyevents(empid);
            //EventCollection.Clear();
            //DataTable DT = SchedulerManager.getEvents(empid);
            //for (int i = 0; i < DT.Rows.Count; i++)
            //{
            //    Events e = new Events(int.Parse(DT.Rows[i]["plannerID"].ToString()), DT.Rows[i]["ActName"].ToString(), DateTime.Parse(DT.Rows[i]["startdate"].ToString()), DateTime.Parse(DT.Rows[i]["enddate"].ToString()));
            //    EventCollection.Instance.AddEvent(e);
            //}
            DataTable lsDT = SchedulerManager.getZSMActivitiesbyActivityId(empid, actid, initial);
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
                str.Append(lsDT.Rows[i]["zsmmonthid"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["zsmempid"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["zsmdescription"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["zsminformed"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["zsmempid"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["zsmplanstatus"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["zsmreason"].ToString());
                str.Append(";");
                str.Append(lsDT.Rows[i]["zsmisedit"].ToString());
                str.Append(";");
                str.Append(SchedulerManager.GetProductsNameAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(";");
                str.Append(SchedulerManager.GetRemindersNameAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(";");
                str.Append(DoctorClassesCollection.Instance[SchedulerManager.getClassesByDoctor(Convert.ToInt64(lsDT.Rows[i]["DoctorID"].ToString()))].ClassName);
                str.Append(";");
                str.Append(SchedulerManager.getBricksNameByDoctor(Convert.ToInt64(lsDT.Rows[i]["DoctorID"].ToString())));
                str.Append(";");
                str.Append(SchedulerManager.GetSamplesNameAndQuantityAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(";");
                str.Append(SchedulerManager.GetGiftsNameAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(",");
            }
            if (str.Length > 0)
            {
                str.Length -= 1;
            }
            str.Append("$");
            DataTable lsDT1 = SchedulerManager.getMonthlyStatusforEmployee(int.Parse(HttpContext.Current.Session["NSMid"].ToString()), initial);
            for (int i = 0; i < lsDT1.Rows.Count; i++)
            {
                str.Append(lsDT1.Rows[i]["CPM_PlanStatus"].ToString());
                str.Append(";");
                str.Append(Utility.GetStatusColor(lsDT1.Rows[i]["CPM_PlanStatus"].ToString()));
                break;
            }
            Response.Write(str);
        }
        public void DeleteRSMEvent()
        {
            int id = int.Parse(Request.QueryString["id"].ToString());
            SchedulerManager.deleteEventbyzsmid(id);
            for (int i = 0; i < RSMEventsCollection.Instance.RSMEventsList.Count; i++)
            {
                if (RSMEventsCollection.Instance.RSMEventsList[i].id == id)
                {
                    RSMEventsCollection.Instance.RSMEventsList.RemoveAt(i);
                }
            }
        }


        public void insertZSMPlan()
        {
            bool isRSMPresent = false;
            string res = "";
            int mioid = int.Parse(Request.QueryString["mioid"].ToString());
            int monthid = int.Parse(Request.QueryString["monthid"].ToString());
            bool rejected = bool.Parse(Request.QueryString["rejected"].ToString());
            string rejectcomments = SchedulerManager.GetPuriedString(Request.QueryString["rejectcomments"].ToString());
            string comments = SchedulerManager.GetPuriedString(Request.QueryString["comments"].ToString().Trim());
            bool informed = bool.Parse(Request.QueryString["informed"].ToString());
            int zsmid = int.Parse(HttpContext.Current.Session["ZSMid"].ToString());
            DateTime start = DateTime.Parse(Request.QueryString["start"].ToString());
            DateTime end = DateTime.Parse(Request.QueryString["end"].ToString());
            int bmdid = int.Parse(Request.QueryString["bmd"].ToString());

            int rsmid = int.Parse(HttpContext.Current.Session["RSMid"].ToString());
            int zsmmonthid = int.Parse(Request.QueryString["zsmmonthid"].ToString());

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
                for (int i = 0; i < RSMEventsCollection.Instance.RSMEventsList.Count; i++)
                {
                    if (RSMEventsCollection.Instance.RSMEventsList[i].employeeid == rsmid && RSMEventsCollection.Instance.RSMEventsList[i].mioid == mioid)
                    {
                        isRSMPresent = true;
                    }
                }

                if (rejected)
                {
                    res = "rejected";
                    SchedulerManager.ChangeZSMPlanStatus(mioid, zsmmonthid, rejectcomments, rsmid, zsmid);
                    if (isRSMPresent)
                    {
                        SchedulerManager.deleteRSMPlanbyMIO(mioid, rsmid);
                        for (int i = 0; i < RSMEventsCollection.Instance.RSMEventsList.Count; i++)
                        {
                            if (RSMEventsCollection.Instance.RSMEventsList[i].employeeid == rsmid && RSMEventsCollection.Instance.RSMEventsList[i].mioid == mioid)
                            {
                                RSMEventsCollection.Instance.RSMEventsList.RemoveAt(i);
                            }
                        }
                    }
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
                                id = SchedulerManager.insertZSMPlan(mioid, mid, true, int.Parse(HttpContext.Current.Session["ZSMid"].ToString()), Utility.STATUS_INPROCESS, "", 0, comments, informed, int.Parse(HttpContext.Current.Session["zsmroleid"].ToString()));
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
                            id = SchedulerManager.insertZSMPlan(mioid, mid, true, int.Parse(HttpContext.Current.Session["ZSMid"].ToString()), Utility.STATUS_INPROCESS, "", 0, comments, informed, int.Parse(HttpContext.Current.Session["zsmroleid"].ToString()));
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
                        SchedulerManager.updateZSMPlanforRSM(mioid, int.Parse(HttpContext.Current.Session["ZSMid"].ToString()), comments, informed);
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

        public void insertNSMPlanforMIO()
        {
            string res = "";
            int mioid = int.Parse(Request.QueryString["mioid"].ToString());
            int monthid = int.Parse(Request.QueryString["monthid"].ToString());
            //bool rejected = bool.Parse(Request.QueryString["rejected"].ToString());
            //string rejectcomments = Request.QueryString["rejectcomments"].ToString();
            string comments = SchedulerManager.GetPuriedString(Request.QueryString["comments"].ToString().Trim());
            bool informed = bool.Parse(Request.QueryString["informed"].ToString());
            int rsmid = int.Parse(HttpContext.Current.Session["RSMid"].ToString());
            int nsmid = int.Parse(HttpContext.Current.Session["NSMid"].ToString());
            int roleid = int.Parse(HttpContext.Current.Session["Roleid"].ToString());
            DateTime start = DateTime.Parse(Request.QueryString["start"].ToString());
            DateTime end = DateTime.Parse(Request.QueryString["end"].ToString());
            int bmdid = int.Parse(Request.QueryString["bmd"].ToString());
            // int zsmmonthid = int.Parse(Request.QueryString["zsmmonthid"].ToString());
            bool ispresent = false;
            bool isrange = false;
            for (int i = 0; i < NSMEventsCollection.Instance.NSMEventsList.Count; i++)
            {
                if (NSMEventsCollection.Instance.NSMEventsList[i].mioid != mioid)
                {
                    if (start.ToShortDateString() == NSMEventsCollection.Instance.NSMEventsList[i].start.ToShortDateString())
                    {
                        if ((start.TimeOfDay >= NSMEventsCollection.Instance.NSMEventsList[i].start.TimeOfDay && start.TimeOfDay < NSMEventsCollection.Instance.NSMEventsList[i].end.TimeOfDay) || (end.TimeOfDay > NSMEventsCollection.Instance.NSMEventsList[i].start.TimeOfDay && end.TimeOfDay <= NSMEventsCollection.Instance.NSMEventsList[i].end.TimeOfDay))
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
                for (int i = 0; i < NSMEventsCollection.Instance.NSMEventsList.Count; i++)
                {
                    if (NSMEventsCollection.Instance.NSMEventsList[i].employeeid == nsmid && NSMEventsCollection.Instance.NSMEventsList[i].mioid == mioid)
                    {
                        ispresent = true;
                    }
                }

                //if (rejected)
                //{
                //    res = "rejected";
                //    SchedulerManager.ChangeZSMPlanStatus(mioid, zsmmonthid, rejectcomments, nsmid);
                //    if (ispresent)
                //    {
                //        SchedulerManager.deleteRSMPlanbyMIO(mioid, nsmid);
                //        for (int i = 0; i < NSMEventsCollection.Instance.NSMEventsList.Count; i++)
                //        {
                //            if (NSMEventsCollection.Instance.NSMEventsList[i].employeeid == nsmid && NSMEventsCollection.Instance.NSMEventsList[i].mioid == mioid)
                //            {
                //                NSMEventsCollection.Instance.NSMEventsList.RemoveAt(i);
                //            }
                //        }
                //    }
                //}
                // else
                {
                    if (!ispresent)
                    {
                        int mid = 0;
                        int id = 0;
                        mid = SchedulerManager.CheckPlannerMonth(start, nsmid);
                        int bid = 0;
                        if (mid == 0)
                        {
                            mid = SchedulerManager.insertCallPlannerMonth(start, "", true, nsmid, Utility.STATUS_INPROCESS, "", 0);
                            if (mid > 0)
                            {
                                id = SchedulerManager.insertZSMPlan(mioid, mid, true, int.Parse(HttpContext.Current.Session["NSMid"].ToString()), Utility.STATUS_INPROCESS, "", 0, comments, informed, roleid);
                                if (bmdid != -1)
                                {
                                    bid = SchedulerManager.insertCallPlannerBMDCoordinator(mioid, bmdid, DateTime.Now, DateTime.Now, nsmid);
                                }
                                NSMEvents e = new NSMEvents(id, nsmid, mid, mioid, comments, informed, start, end);
                                NSMEventsCollection.Instance.AddEvent(e);
                                res = "inserted";
                            }
                        }

                        else if (mid != 0)
                        {
                            id = SchedulerManager.insertZSMPlan(mioid, mid, true, int.Parse(HttpContext.Current.Session["NSMid"].ToString()), Utility.STATUS_INPROCESS, "", 0, comments, informed, roleid);
                            {
                                if (bmdid != -1)
                                {
                                    bid = SchedulerManager.insertCallPlannerBMDCoordinator(mioid, bmdid, DateTime.Now, DateTime.Now, nsmid);
                                }
                                NSMEvents e = new NSMEvents(id, nsmid, mid, mioid, comments, informed, start, end);
                                NSMEventsCollection.Instance.AddEvent(e);
                                res = "inserted";
                            }
                        }
                    }
                    else
                    {
                        SchedulerManager.updateZSMPlan(mioid, int.Parse(HttpContext.Current.Session["NSMid"].ToString()), comments, informed);
                        for (int i = 0; i < NSMEventsCollection.Instance.NSMEventsList.Count; i++)
                        {
                            if (NSMEventsCollection.Instance.NSMEventsList[i].employeeid == nsmid && NSMEventsCollection.Instance.NSMEventsList[i].mioid == mioid)
                            {
                                if (bmdid != -1)
                                {
                                    SchedulerManager.insertCallPlannerBMDCoordinator(mioid, bmdid, DateTime.Now, DateTime.Now, nsmid);
                                }
                                NSMEventsCollection.Instance.NSMEventsList[i].description = comments;
                                NSMEventsCollection.Instance.NSMEventsList[i].informed = informed;
                                res = "updated";
                            }
                        }
                    }
                }
                Response.Write(res);
            }
        }



        public void loadZSMevents(int employeeid)
        {
            //DataTable dt = SchedulerDAL.SchedulerManager.getActivities();
            //if (dt.Rows.Count > 0)
            //{
            //    ActivitiesCollection.Clear();
            //    for (int i = 0; i < dt.Rows.Count; i++)
            //    {
            //        Activities act = new Activities(int.Parse(dt.Rows[i]["pk_CPA_CallPlannerActivityID"].ToString()), dt.Rows[i]["CPA_Name"].ToString(), dt.Rows[i]["CPA_Description"].ToString(), dt.Rows[i]["CPA_BackgroundColor"].ToString(), dt.Rows[i]["CPA_ForeColor"].ToString(), int.Parse(dt.Rows[i]["CPA_NoOfProducts"].ToString()));
            //        ActivitiesCollection.Instance.AddActivity(act);
            //        //loadevents(Utility.employeeID);
            //        //SchedulerManager.loadmonthlyevents(Utility.employeeID);
            //    }
            //}


            ZSMEventsCollection.Instance.Clear();
            DataTable lsDT = SchedulerManager.getZSMEvents(employeeid);
            for (int i = 0; i < lsDT.Rows.Count; i++)
            {
                ZSMEvents e = new ZSMEvents(int.Parse(lsDT.Rows[i]["zsmid"].ToString()), int.Parse(lsDT.Rows[i]["empid"].ToString()), int.Parse(lsDT.Rows[i]["monthid"].ToString()), int.Parse(lsDT.Rows[i]["mioid"].ToString()), bool.Parse(lsDT.Rows[i]["iseditable"].ToString()), lsDT.Rows[i]["status"].ToString(), lsDT.Rows[i]["statusreason"].ToString(), lsDT.Rows[i]["description"].ToString(), bool.Parse(lsDT.Rows[i]["informed"].ToString()), DateTime.Parse(lsDT.Rows[i]["startdate"].ToString()), DateTime.Parse(lsDT.Rows[i]["enddate"].ToString()));
                HttpContext.Current.Session["zsmroleid"] = int.Parse(lsDT.Rows[i]["roleid"].ToString());
                ZSMEventsCollection.Instance.AddEvent(e);
            }

        }

        //public void ProcessApproveRSMPlan()
        //{
        //    DateTime current = DateTime.Parse(Request.QueryString["date"].ToString()).ToUniversalTime().AddHours(5);
        //    int empid = int.Parse(Request.QueryString["rsmid"].ToString());
        //    int authempid = int.Parse(HttpContext.Current.Session["CurrentUserId"].ToString());
        //    SchedulerManager.setEditableMonthforzsmWithoutComments(current, empid, Utility.STATUS_APPROVED, false, authempid);
        //}


        //new work
        public void ProcessApproveRSMPlan()
        {
            DateTime current = DateTime.Parse(Request.QueryString["date"].ToString()).ToUniversalTime().AddHours(5);
            int empid = int.Parse(Request.QueryString["rsmid"].ToString());
            int authempid = int.Parse(HttpContext.Current.Session["CurrentUserId"].ToString());
            bool check;

            _nv.Clear();
            _nv.Add("@month-int", current.Month.ToString());
            _nv.Add("@year-int", current.Year.ToString());
            _nv.Add("@iseditable-bit", "0");
            _nv.Add("@resion-nvarchar-(500)", "");
            _nv.Add("@planStatus-nvarchar-(50)", Utility.STATUS_APPROVED);
            _nv.Add("@empID-int", empid.ToString());
            check = dl.InserData("Call_DisallowEditForRSMWithoutCommentsRSM", _nv);

            if (check)
            {
                _nv.Clear();
                _nv.Add("@month-int", current.Month.ToString());
                _nv.Add("@year-int", current.Year.ToString());
                _nv.Add("@iseditable-bit", "0");
                _nv.Add("@resion-nvarchar-(500)", "");
                _nv.Add("@planStatus-nvarchar-(50)", Utility.STATUS_APPROVED);
                _nv.Add("@empID-int", empid.ToString());
                dl.InserData("sp_for_statusChange_CallPlannerMIOLevelRSM", _nv);
            }
            string emailStatus = Utility.STATUS_APPROVED;
            var nv1 = new NameValueCollection();
            var dal = new DAL();
            nv1.Add("@EmplyeeID-int", empid.ToString());
            // ReSharper disable UnusedVariable
            var getDetail = dal.GetData("sp_FLM_RSM_DetailForEmail", nv1);
            var table = getDetail.Tables[0];

            if (table.Rows.Count > 0)
            {
                #region Sending Mail

                var msg = new MailMessage { From = new MailAddress(ConfigurationManager.AppSettings["AutoEmailID"], "Plan For Approval-" + table.Rows[0][1] + "") };

                if (table.Rows[0][4].ToString() != "NULL")
                {
                    string addresmail = table.Rows[0][8].ToString().Replace("(", "").Replace(")", "").Replace("-", "").Replace(" ", "").Trim();
                    msg.To.Add(addresmail);
                }

                msg.Subject = "Planing Status For-Bayer- " + DateTime.Now.ToString("dd-MMMM-yyyy");
                msg.IsBodyHtml = true;

                string strBody = "To: FLM:<br/>Med-Rep Teritorry: " + table.Rows[0][1].ToString() +
                            @"<br/>" + "Manager Name: " + table.Rows[0][7].ToString() +
                            @"<br/>" + "Manager Mobile Number: " + table.Rows[0][9].ToString() +
                            @"<br/>Med-Rep Plan Status: " + emailStatus.ToString() + " For Month: " + current.ToLongDateString() +

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
            //SchedulerManager.setEditableMonthforzsmWithoutComments(current, empid, Utility.STATUS_APPROVED, false, authempid);
        }


        public void ProcessRejectRSMPlan()
        {
            DateTime current = DateTime.Parse(Request.QueryString["date"].ToString()).ToUniversalTime().AddHours(5);
            int empid = int.Parse(Request.QueryString["rsmid"].ToString());
            string comments = Request.QueryString["comments"].ToString();
            int authempid = int.Parse(HttpContext.Current.Session["CurrentUserId"].ToString());
            //SchedulerManager.setEditableMonthforzsm(current, empid, Utility.STATUS_REJECTED, true, SchedulerManager.GetPuriedString(comments), authempid);
            bool check;
            _nv.Clear();
            _nv.Add("@month-int", current.Month.ToString());
            _nv.Add("@year-int", current.Year.ToString());
            _nv.Add("@iseditable-bit", "1");
            _nv.Add("@resion-nvarchar-(500)", comments.ToString());
            _nv.Add("@planStatus-nvarchar-(50)", Utility.STATUS_REJECTED);
            _nv.Add("@empID-int", empid.ToString());
            check = dl.InserData("Call_DisallowEditForRSMWithoutCommentsRSM", _nv);
            if (check)
            {
                _nv.Clear();
                _nv.Add("@month-int", current.Month.ToString());
                _nv.Add("@year-int", current.Year.ToString());
                _nv.Add("@iseditable-bit", "1");
                _nv.Add("@resion-nvarchar-(500)", comments.ToString());
                _nv.Add("@planStatus-nvarchar-(50)", Utility.STATUS_REJECTED);
                _nv.Add("@empID-int", empid.ToString());
                dl.InserData("sp_for_statusChange_CallPlannerMIOLevelRSM", _nv);
            }
            string emailStatus = Utility.STATUS_REJECTED;
            var nv1 = new NameValueCollection();
            var dal = new DAL();
            nv1.Add("@EmplyeeID-int", empid.ToString());
            // ReSharper disable UnusedVariable
            var getDetail = dal.GetData("sp_FLM_RSM_DetailForEmail", nv1);
            var table = getDetail.Tables[0];

            if (table.Rows.Count > 0)
            {
                #region Sending Mail

                var msg = new MailMessage { From = new MailAddress(ConfigurationManager.AppSettings["AutoEmailID"], "Plan For Approval-" + table.Rows[0][1] + "") };

                if (table.Rows[0][4].ToString() != "NULL")
                {
                    string addresmail = table.Rows[0][4].ToString().Replace("(", "").Replace(")", "").Replace("-", "").Replace(" ", "").Trim();
                    msg.To.Add(addresmail);
                }

                msg.Subject = "Planing Status For-Bayer- " + DateTime.Now.ToString("dd-MMMM-yyyy");
                msg.IsBodyHtml = true;

                string strBody = "To: FLM:<br/>Med-Rep Teritorry: " + table.Rows[0][1].ToString() +
                            @"<br/>" + "Manager Name: " + table.Rows[0][7].ToString() +
                            @"<br/>" + "Manager Mobile Number: " + table.Rows[0][9].ToString() +
                            @"<br/>Med-Rep Plan Status: " + emailStatus.ToString() + " For Month: " + current.ToLongDateString() +

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
        }

        //end new work
        //public void ProcessRejectRSMPlan()
        //{
        //    DateTime current = DateTime.Parse(Request.QueryString["date"].ToString()).ToUniversalTime().AddHours(5);
        //    int empid = int.Parse(Request.QueryString["rsmid"].ToString());
        //    string comments = Request.QueryString["comments"].ToString();
        //    int authempid = int.Parse(HttpContext.Current.Session["CurrentUserId"].ToString());
        //    SchedulerManager.setEditableMonthforzsm(current, empid, Utility.STATUS_REJECTED, true, SchedulerManager.GetPuriedString(comments), authempid);
        //}




        public void ProcessGetRSMEvents()
        {
            int empid = int.Parse(Request.QueryString["rsmid"].ToString());
            DateTime initial = DateTime.Parse(Request.QueryString["initial"].ToString());
            //SchedulerManager.loadmonthlyevents(empid);
            //EventCollection.Clear();
            //DataTable DT = SchedulerManager.getEvents(empid);
            //for (int i = 0; i < DT.Rows.Count; i++)
            //{
            //    Events e = new Events(int.Parse(DT.Rows[i]["plannerID"].ToString()), DT.Rows[i]["ActName"].ToString(), DateTime.Parse(DT.Rows[i]["startdate"].ToString()), DateTime.Parse(DT.Rows[i]["enddate"].ToString()));
            //    EventCollection.Instance.AddEvent(e);
            //}
            loadZSMevents(empid);
            DataTable lsDT = SchedulerManager.getRSMActivitiesbystatus(empid, initial);
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
                //below data is for RSM, we have used same sp thats why it wrote zsm
                str.Append(lsDT.Rows[i]["zsmid"].ToString());
                str.Append(";");
                //str.Append(lsDT.Rows[i]["zsmempid"].ToString()); 
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
                //str.Append(";");
                //str.Append(lsDT.Rows[i]["DoctorName"].ToString());
                //str.Append(";");
                //str.Append(SchedulerManager.GetProductsNameAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                //str.Append(";");
                //str.Append(SchedulerManager.GetRemindersNameAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                //str.Append(";");
                //str.Append(DoctorClassesCollection.Instance[SchedulerManager.getClassesByDoctor(Convert.ToInt64(lsDT.Rows[i]["DoctorID"].ToString()))].ClassName);
                //str.Append(";");
                //str.Append(SchedulerManager.getBricksNameByDoctor(Convert.ToInt64(lsDT.Rows[i]["DoctorID"].ToString())));
                //str.Append(";");
                //str.Append(SchedulerManager.GetSamplesNameAndQuantityAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                //str.Append(";");
                //str.Append(SchedulerManager.GetGiftsNameAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                //str.Append(",");
                str.Append(";");
                str.Append(lsDT.Rows[i]["mioempName"].ToString());
                str.Append(";");
                str.Append("");
                str.Append(";");
                str.Append("");
                str.Append(";");
                str.Append("");
                str.Append(";");
                str.Append("");
                str.Append(";");
                str.Append("");
                str.Append(";");
                str.Append("");
                str.Append(",");
            }
            if (str.Length > 0)
            {
                str.Length -= 1;
            }
            str.Append("$");

            DataTable lsDT1 = SchedulerManager.getMonthlyStatusforEmployee(empid, initial);
            if (lsDT1.Rows.Count > 0)
            {
                str.Append(lsDT1.Rows[0]["CPM_PlanStatus"].ToString());
                str.Append(";");
                str.Append(Utility.GetStatusColor(lsDT1.Rows[0]["CPM_PlanStatus"].ToString()));
            }
            else
            {
                str.Append("");
                str.Append(";");
                str.Append("");
            }
            str.Append(";");
            int nsm = int.Parse(HttpContext.Current.Session["NSMid"].ToString());
            DataTable lsDT2 = SchedulerManager.getMonthlyStatusforEmployee(int.Parse(HttpContext.Current.Session["NSMid"].ToString()), initial);
            if (lsDT1.Rows.Count > 0)
            {
                //This is Code commented becuase of BUH not able to view SM Planes
                //str.Append(lsDT2.Rows[0]["CPM_PlanStatus"].ToString());
                str.Append(";");
                str.Append(Utility.GetStatusColor(lsDT1.Rows[0]["CPM_PlanStatus"].ToString()));
                str.Append(";");
                //This is Code commented becuase of BUH not able to view SM Planes
                //   str.Append(lsDT2.Rows[0]["CPM_IsEditable"].ToString());
            }
            else
            {
                str.Append("");
                str.Append(";");
                str.Append("");
                str.Append(";");
                str.Append(true);
            }
            Response.Write(str);
        }

        public void ProcessGetRSMEventsbyActivityId()
        {
            int empid = int.Parse(Request.QueryString["rsmid"].ToString());
            int actid = int.Parse(Request.QueryString["actid"].ToString());
            DateTime initial = DateTime.Parse(Request.QueryString["initial"].ToString());
            loadZSMevents(empid);
            //SchedulerManager.loadmonthlyevents(empid);
            //EventCollection.Clear();
            //DataTable DT = SchedulerManager.getEvents(empid);
            //for (int i = 0; i < DT.Rows.Count; i++)
            //{
            //    Events e = new Events(int.Parse(DT.Rows[i]["plannerID"].ToString()), DT.Rows[i]["ActName"].ToString(), DateTime.Parse(DT.Rows[i]["startdate"].ToString()), DateTime.Parse(DT.Rows[i]["enddate"].ToString()));
            //    EventCollection.Instance.AddEvent(e);
            //}
            DataTable lsDT = SchedulerManager.getZSMActivitiesbyactitvityidandStatus(empid, actid, initial);
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
                str.Append(lsDT.Rows[i]["zsmempid"].ToString());
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
                str.Append(lsDT.Rows[i]["DoctorName"].ToString());
                str.Append(";");
                str.Append(SchedulerManager.GetProductsNameAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(";");
                str.Append(SchedulerManager.GetRemindersNameAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(";");
                str.Append(DoctorClassesCollection.Instance[SchedulerManager.getClassesByDoctor(Convert.ToInt64(lsDT.Rows[i]["DoctorID"].ToString()))].ClassName);
                str.Append(";");
                str.Append(SchedulerManager.getBricksNameByDoctor(Convert.ToInt64(lsDT.Rows[i]["DoctorID"].ToString())));
                str.Append(";");
                str.Append(SchedulerManager.GetSamplesNameAndQuantityAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(";");
                str.Append(SchedulerManager.GetGiftsNameAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(",");

            }
            if (str.Length > 0)
            {
                str.Length -= 1;
            }
            str.Append("$");

            DataTable lsDT1 = SchedulerManager.getMonthlyStatusforEmployee(int.Parse(HttpContext.Current.Session["NSMid"].ToString()), initial);
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
                str.Append(true);
            }
            Response.Write(str);
        }


        public void ProcessGetZSMEvents()
        {
            int empid = int.Parse(Request.QueryString["zsmid"].ToString());
            DateTime initial = DateTime.Parse(Request.QueryString["initial"].ToString());
            //SchedulerManager.loadmonthlyevents(empid);
            //EventCollection.Clear();
            //DataTable DT = SchedulerManager.getEvents(empid);
            //for (int i = 0; i < DT.Rows.Count; i++)
            //{
            //    Events e = new Events(int.Parse(DT.Rows[i]["plannerID"].ToString()), DT.Rows[i]["ActName"].ToString(), DateTime.Parse(DT.Rows[i]["startdate"].ToString()), DateTime.Parse(DT.Rows[i]["enddate"].ToString()));
            //    EventCollection.Instance.AddEvent(e);
            //}
            loadZSMevents(empid);
            DataTable lsDT = SchedulerManager.getZSMActivitiesbystatus(empid, initial);
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
                str.Append(lsDT.Rows[i]["zsmempid"].ToString());
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
                str.Append(lsDT.Rows[i]["DoctorName"].ToString());
                str.Append(";");
                str.Append(SchedulerManager.GetProductsNameAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(";");
                str.Append(SchedulerManager.GetRemindersNameAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(";");
                str.Append(DoctorClassesCollection.Instance[SchedulerManager.getClassesByDoctor(Convert.ToInt64(lsDT.Rows[i]["DoctorID"].ToString()))].ClassName);
                str.Append(";");
                str.Append(SchedulerManager.getBricksNameByDoctor(Convert.ToInt64(lsDT.Rows[i]["DoctorID"].ToString())));
                str.Append(";");
                str.Append(SchedulerManager.GetSamplesNameAndQuantityAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(";");
                str.Append(SchedulerManager.GetGiftsNameAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(",");

            }
            if (str.Length > 0)
            {
                str.Length -= 1;
            }
            str.Append("$");
            //DataTable lsDT2 = SchedulerManager.getMonthlyStatusforEmployee(empid);
            //for (int i = 0; i < lsDT2.Rows.Count; i++)
            //{
            //    if (DateTime.Parse(lsDT2.Rows[i]["CPM_PlanMonth"].ToString()).Month == initial.Month)
            //    {
            //        str.Append(lsDT2.Rows[i]["CPM_PlanStatus"].ToString());
            //        break;
            //    }
            //}
            //str.Append(";");


            DataTable lsDT1 = SchedulerManager.getMonthlyStatusforEmployee(empid, initial);
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
            int empid = int.Parse(Request.QueryString["zsmid"].ToString());
            int actid = int.Parse(Request.QueryString["actid"].ToString());
            DateTime initial = DateTime.Parse(Request.QueryString["initial"].ToString());
            loadZSMevents(empid);
            //SchedulerManager.loadmonthlyevents(empid);
            //EventCollection.Clear();
            //DataTable DT = SchedulerManager.getEvents(empid);
            //for (int i = 0; i < DT.Rows.Count; i++)
            //{
            //    Events e = new Events(int.Parse(DT.Rows[i]["plannerID"].ToString()), DT.Rows[i]["ActName"].ToString(), DateTime.Parse(DT.Rows[i]["startdate"].ToString()), DateTime.Parse(DT.Rows[i]["enddate"].ToString()));
            //    EventCollection.Instance.AddEvent(e);
            //}
            DataTable lsDT = SchedulerManager.getZSMActivitiesbyactitvityidandStatus(empid, actid, initial);
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
                str.Append(lsDT.Rows[i]["zsmempid"].ToString());
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
                str.Append(lsDT.Rows[i]["DoctorName"].ToString());
                str.Append(";");
                str.Append(SchedulerManager.GetProductsNameAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(";");
                str.Append(SchedulerManager.GetRemindersNameAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(";");
                str.Append(DoctorClassesCollection.Instance[SchedulerManager.getClassesByDoctor(Convert.ToInt64(lsDT.Rows[i]["DoctorID"].ToString()))].ClassName);
                str.Append(";");
                str.Append(SchedulerManager.getBricksNameByDoctor(Convert.ToInt64(lsDT.Rows[i]["DoctorID"].ToString())));
                str.Append(";");
                str.Append(SchedulerManager.GetSamplesNameAndQuantityAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(";");
                str.Append(SchedulerManager.GetGiftsNameAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(",");

            }
            if (str.Length > 0)
            {
                str.Length -= 1;
            }
            str.Append("$");

            //DataTable lsDT2 = SchedulerManager.getMonthlyStatusforEmployee(empid);
            //for (int i = 0; i < lsDT2.Rows.Count; i++)
            //{
            //    if (DateTime.Parse(lsDT2.Rows[i]["CPM_PlanMonth"].ToString()).Month == initial.Month)
            //    {
            //        str.Append(lsDT2.Rows[i]["CPM_PlanStatus"].ToString());
            //        break;
            //    }
            //}
            //str.Append(";");

            DataTable lsDT1 = SchedulerManager.getMonthlyStatusforEmployee(int.Parse(HttpContext.Current.Session["NSMid"].ToString()), initial);
            for (int i = 0; i < lsDT1.Rows.Count; i++)
            {
                str.Append(lsDT1.Rows[i]["CPM_PlanStatus"].ToString());
                str.Append(";");
                str.Append(Utility.GetStatusColor(lsDT1.Rows[i]["CPM_PlanStatus"].ToString()));
                break;
            }
            Response.Write(str);
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
        public void ProcessGetEventsSummary()
        {
            int id = 0;
            int employeeid = 0;
            DateTime initial = DateTime.Parse(Request.QueryString["initial"].ToString());
            if (Request.QueryString["mioid"] != null)
            {
                employeeid = int.Parse(Request.QueryString["mioid"]);
            }
            if (employeeid != 0)
            {
                //loadevents(employeeid, initial);
            }
            DataTable lsDT = SchedulerManager.getEventsSummarybystatus(employeeid, initial);
            DateTime current = DateTime.Now;

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
                str.Append(",");

            }
            if (str.Length > 0)
            {
                str.Length -= 1;
            }
            //str.Append("$");

            //DataTable lsDT1 = SchedulerManager.getMonthlyStatusforEmployee(int.Parse(HttpContext.Current.Session["NSMid"].ToString()));
            //for (int i = 0; i < lsDT1.Rows.Count; i++)
            //{
            //    if (DateTime.Parse(lsDT1.Rows[i]["CPM_PlanMonth"].ToString()).Month == initial.Month)
            //    {
            //        str.Append(lsDT1.Rows[i]["CPM_PlanStatus"].ToString());
            //        str.Append(";");
            //        str.Append(Utility.GetStatusColor(lsDT1.Rows[i]["CPM_PlanStatus"].ToString()));
            //        break;
            //    }
            //}
            ////   str.Length -= 1;
            Response.Write(str);
            //Response.Write("PARTY" + ";" + 12 + ";" + 1 + ";" + 1 + "," + "VISIT" + ";" + + 1 + ";" + 2 + ";" + 3);

        }

        public void ProcessGetEventsbyActivityId()
        {
            DateTime initial = DateTime.Parse(Request.QueryString["initial"].ToString());
            int empid = int.Parse(Request.QueryString["mioid"].ToString());
            int activityid = int.Parse(Request.QueryString["actid"].ToString());
            SchedulerManager.loadmonthlyevents(empid); // Get the Specific MIO Monthly Events
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
                str.Append(lsDT.Rows[i]["DoctorName"].ToString());
                str.Append(";");
                str.Append(SchedulerManager.GetProductsNameAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(";");
                str.Append(SchedulerManager.GetRemindersNameAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(";");
                str.Append(DoctorClassesCollection.Instance[SchedulerManager.getClassesByDoctor(Convert.ToInt64(lsDT.Rows[i]["DoctorID"].ToString()))].ClassName);
                str.Append(";");
                str.Append(SchedulerManager.getBricksNameByDoctor(Convert.ToInt64(lsDT.Rows[i]["DoctorID"].ToString())));
                str.Append(";");
                str.Append(SchedulerManager.GetSamplesNameAndQuantityAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(";");
                str.Append(SchedulerManager.GetGiftsNameAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(",");
            }
            if (str.Length > 0)
            {
                str.Length -= 1;
            }
            str.Append("$");

            DataTable lsDT1 = SchedulerManager.getMonthlyStatusforEmployee(int.Parse(HttpContext.Current.Session["NSMid"].ToString()), initial);
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
                str.Append(true);
            }
            Response.Write(str);
        }


        public void ProcessGetEventsSummarybyactivityid()
        {
            int employeeid = 0;
            int id = 0;
            int actid = 0;
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
                str.Append(",");

            }
            //   str.Length -= 1;
            if (str.Length > 0)
            {
                str.Length -= 1;
            }
            //str.Append("$");

            //DataTable lsDT1 = SchedulerManager.getMonthlyStatusforEmployee(int.Parse(HttpContext.Current.Session["NSMid"].ToString()));
            //for (int i = 0; i < lsDT1.Rows.Count; i++)
            //{
            //    if (DateTime.Parse(lsDT1.Rows[i]["CPM_PlanMonth"].ToString()).Month == initial.Month)
            //    {
            //        str.Append(lsDT1.Rows[i]["CPM_PlanStatus"].ToString());
            //        str.Append(";");
            //        str.Append(Utility.GetStatusColor(lsDT1.Rows[i]["CPM_PlanStatus"].ToString()));
            //        break;
            //    }
            //}
            Response.Write(str);
            //Response.Write("PARTY" + ";" + 12 + ";" + 1 + ";" + 1 + "," + "VISIT" + ";" + + 1 + ";" + 2 + ";" + 3);

        }

        public void ProcessGetEvents()
        {
            DateTime initial = DateTime.Parse(Request.QueryString["initial"].ToString());
            int empid = int.Parse(Request.QueryString["mioid"].ToString());
            SchedulerManager.loadmonthlyevents(empid); // Get the specific MIO Monthly Events
            int monthidforZSM = 0;
            EventCollection.Instance.Clear();
            DataTable lsDT = SchedulerManager.getEvents(empid, initial);
            //for (int i = 0; i < lsDT.Rows.Count; i++)
            //{
            //    Events e = new Events(int.Parse(lsDT.Rows[i]["plannerID"].ToString()), lsDT.Rows[i]["ActName"].ToString(), DateTime.Parse(lsDT.Rows[i]["startdate"].ToString()), DateTime.Parse(lsDT.Rows[i]["enddate"].ToString()), Convert.ToInt64(lsDT.Rows[i]["DoctorID"].ToString()));
            //    EventCollection.Instance.AddEvent(e);
            //}
            ////DataTable lsDT = SchedulerManager.getEvents(empid, "Submitted,Resubmitted");
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
                if (initial.Month == DateTime.Parse(lsDT.Rows[i]["planMonth"].ToString()).Month && initial.Year == DateTime.Parse(lsDT.Rows[i]["planMonth"].ToString()).Year)
                {
                    str.Append(lsDT.Rows[i]["mstatus"].ToString());
                    str.Append(";");
                    str.Append(Utility.GetStatusColor(lsDT.Rows[i]["mstatus"].ToString()));
                    monthidforZSM = int.Parse(lsDT.Rows[i]["MonthlyID"].ToString());
                }
                else
                {
                    str.Append("");
                    str.Append(";");
                    str.Append("");
                }
                str.Append(";");
                str.Append(lsDT.Rows[i]["DoctorName"].ToString());
                str.Append(";");
                str.Append(SchedulerManager.GetProductsNameAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(";");
                str.Append(SchedulerManager.GetRemindersNameAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(";");
                str.Append(DoctorClassesCollection.Instance[SchedulerManager.getClassesByDoctor(Convert.ToInt64(lsDT.Rows[i]["DoctorID"].ToString()))].ClassName);
                str.Append(";");
                str.Append(SchedulerManager.getBricksNameByDoctor(Convert.ToInt64(lsDT.Rows[i]["DoctorID"].ToString())));
                str.Append(";");
                str.Append(SchedulerManager.GetSamplesNameAndQuantityAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(";");
                str.Append(SchedulerManager.GetGiftsNameAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                str.Append(",");
            }
            if (str.Length > 0)
            {
                str.Length -= 1;
            }
            str.Append("$");

            DataTable lsDT1 = SchedulerManager.getMonthlyStatusforEmployee(int.Parse(HttpContext.Current.Session["NSMid"].ToString()), initial);
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
                str.Append(true);
            }
            Response.Write(str);
        }
    }
}