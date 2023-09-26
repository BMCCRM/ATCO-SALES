using System;
using System.Web;
using System.Data;
using System.Text;
using SchedulerDAL;
using System.Collections;
using System.Collections.Generic;
using PocketDCR2.Classes;
using System.Collections.Specialized;
using System.Configuration;
using System.Net.Mail;

namespace PocketDCR2.Schedular
{
    /// <summary>
    /// Summary description for RSMHandler
    /// </summary>
    public class RSMHandler : IHttpHandler, System.Web.SessionState.IRequiresSessionState
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
                case "getzsmsandmios":
                    ProcessGetZSMsandMIOs();
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
                case "getevents":
                    ProcessGetEvents();
                    break;
                case "getrsmevents":
                    ProcessGetRSMEvents();
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
                case "getactivities":
                    ProcessGetActivities();
                    break;
                //case "getdoctors":
                //    ProcessGetDoctors();
                //    break;
                //case "gettime":
                //    ProcessGetTime();
                //    break;
                case "insertcallplannermonth":
                    InsertCallPlannerMonthDetails();
                    break;
                case "updatecallplannermonth":
                    UpdateCallPlannerMonthDetails();
                    break;
                case "sendforapproval":
                    ProcessSendForApproval();
                    break;
                //case "checkforedit":
                //    CheckforEdit();
                //    break;
                case "insertzsmplan":
                    insertZSMPlan();
                    break;
                case "insertrsmplan":
                    insertRSMPlan();
                    break;
                case "insertrsmplanformio":
                    insertRSMPlanforMIO();
                    break;
                case "checkzsm":
                    CheckRSM();
                    break;
                case "getrsmid":
                    Response.Write(HttpContext.Current.Session["RSMid"].ToString());
                    break;
                case "setzsmid":
                    HttpContext.Current.Session["ZSMid"] = Request.QueryString["zsmid"].ToString();
                    loadZSMevents(int.Parse(Request.QueryString["zsmid"].ToString()));
                    break;
                case "deleventbyrsmid":
                    DeleteRSMEvent();
                    break;
                //case "geteventsbyactivityid":
                //    ProcessGetEventsbyActivityId();
                //    break;
                case "getrsmeventsbyactivityid":
                    ProcessGetRSMEventsbyActivityId();
                    break;
                case "approvezsmplan":
                    ProcessApproveZSMPlan();
                    break;
                case "rejectzsmplan":
                    ProcessRejectZSMPlan();
                    break;
                case "geteventssummary":
                    ProcessGetEventsSummary();
                    break;
                case "geteventsbyactivityid":
                    ProcessGetEventsbyActivityId();
                    break;
                case "getzsmevents":
                    ProcessGetZSMEvents();
                    break;
                case "getzsmeventsbyactivityid":
                    ProcessGetZSMEventsbyActivityId();
                    break;
                case "geteventssummarybyactivityid":
                    ProcessGetEventsSummarybyactivityid();
                    break;
            }
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

            DataTable lsDT1 = SchedulerManager.getMonthlyStatusforEmployee(int.Parse(HttpContext.Current.Session["RSMid"].ToString()), initial);
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

            DataTable lsDT1 = SchedulerManager.getMonthlyStatusforEmployee(int.Parse(HttpContext.Current.Session["RSMid"].ToString()), initial);
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
            str.Append("$");

            DataTable lsDT1 = SchedulerManager.getMonthlyStatusforEmployee(int.Parse(HttpContext.Current.Session["RSMid"].ToString()), initial);
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
        public void ProcessGetMIOs()
        {
            //150,MIO 1,001;151,MIO 2,002;152,MIO 3,003
            //int zsmID = int.Parse(HttpContext.Current.Session["RSMid"].ToString());


            int zsmID = 0;//= Int32.Parse(Request.QueryString["empId"].ToString());
            if (HttpContext.Current.Request.QueryString["zsmid"] != null)
                zsmID = int.Parse(HttpContext.Current.Request.QueryString["zsmid"].ToString());
            else
                zsmID = int.Parse(HttpContext.Current.Session["RSMid"].ToString());
            

            StringBuilder str = new StringBuilder("");
            DataTable lsDTMIO = SchedulerManager.GetSubEmployees(zsmID);
            for (int j = 0; j < lsDTMIO.Rows.Count; j++)
            {
                if (j != 0)
                    str.Append(";");

                str.Append(lsDTMIO.Rows[j]["EmployeeId"].ToString());
                str.Append(",");
                str.Append(SchedulerManager.GetPuriedString(lsDTMIO.Rows[j]["EmployeeName"].ToString()));
                str.Append(",");
                str.Append(SchedulerManager.GetPuriedString(lsDTMIO.Rows[j]["EmployeeCode"].ToString()));
            }
            Response.Write(str);
        }
        public void ProcessGetZSMs()
        {
            //10,ZSM 1,001~11,ZSM 2,002
            DataTable lsDTZSM = SchedulerManager.GetSubEmployees(int.Parse(HttpContext.Current.Session["RSMid"].ToString()));
            StringBuilder str = new StringBuilder("");
            for (int i = 0; i < lsDTZSM.Rows.Count; i++)
            {
                if (i != 0)
                    str.Append("~");

                str.Append(lsDTZSM.Rows[i]["EmployeeId"].ToString());
                str.Append(",");
                str.Append(SchedulerManager.GetPuriedString(lsDTZSM.Rows[i]["EmployeeName"].ToString()));
                str.Append(",");
                str.Append(SchedulerManager.GetPuriedString(lsDTZSM.Rows[i]["EmployeeCode"].ToString()));
            }
            Response.Write(str);
        }
        public void ProcessGetZSMsandMIOs()
        {
            //10,ZSM 1$150,MIO 1;151,MIO 2;152,MIO 3~10,ZSM 1$150,MIO 1;151,MIO 2;152,MIO 3
            DataTable lsDTZSM = SchedulerManager.GetSubEmployees(int.Parse(HttpContext.Current.Session["RSMid"].ToString()));
            StringBuilder str = new StringBuilder("");
            for (int i = 0; i < lsDTZSM.Rows.Count; i++)
            {
                if (i != 0)
                    str.Append("~");

                str.Append(lsDTZSM.Rows[i]["EmployeeId"].ToString());
                str.Append(",");
                str.Append(SchedulerManager.GetPuriedString(lsDTZSM.Rows[i]["EmployeeName"].ToString()));
                str.Append(",");
                str.Append(SchedulerManager.GetPuriedString(lsDTZSM.Rows[i]["EmployeeCode"].ToString()));
                str.Append("$");
                DataTable lsDTMIO = SchedulerManager.GetSubEmployees(int.Parse(lsDTZSM.Rows[i]["EmployeeId"].ToString()));
                for (int j = 0; j < lsDTMIO.Rows.Count; j++)
                {
                    if (j != 0)
                        str.Append(";");

                    str.Append(lsDTMIO.Rows[j]["EmployeeId"].ToString());
                    str.Append(",");
                    str.Append(SchedulerManager.GetPuriedString(lsDTMIO.Rows[j]["EmployeeName"].ToString()));
                    str.Append(",");
                    str.Append(SchedulerManager.GetPuriedString(lsDTMIO.Rows[j]["EmployeeCode"].ToString()));
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
            int zsmid = int.Parse(HttpContext.Current.Session["ZSMid"].ToString());
            DateTime start = DateTime.Parse(Request.QueryString["start"].ToString());
            DateTime end = DateTime.Parse(Request.QueryString["end"].ToString());
            int bmdid = int.Parse(Request.QueryString["bmd"].ToString());
            int zsmmonthid = int.Parse(Request.QueryString["zsmmonthid"].ToString());
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
                    SchedulerManager.ChangeZSMPlanStatus(mioid, zsmmonthid, rejectcomments, rsmid, zsmid);
                    if (ispresent)
                    {
                        SchedulerManager.deleteZSMPlanbyMIO(mioid, rsmid);
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
            idch = SchedulerManager.rsm_planning_time_check(start, employeeid);
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
                id = SchedulerManager.CheckPlannerMonthRSM(current, employeeid_ZSM);
                if (id == 0)
                {
                    id = SchedulerManager.insertCallPlannerMonthRSM(current, true, employeeid_ZSM, Utility.STATUS_INPROCESS, "", 0);
                    if (id > 0)
                    {
                        recIns = SchedulerManager.InsertCallPlannerMIORSM(id, start, end, true, activity, Convert.ToInt32(mioid), "", Utility.STATUS_INPROCESS, "");
                    }
                }
                else
                {
                    recIns = SchedulerManager.InsertCallPlannerMIORSM(id, start, end, true, activity, Convert.ToInt32(mioid), "", Utility.STATUS_INPROCESS, "");
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
            idch = SchedulerManager.rsm_planning_time_check_update(start, employeeid, eventid);
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
                 SchedulerManager.UpdateCallplannerMioRSM(start, end, eventid,Convert.ToInt32(mioid), activity);
                 EventCollection.Instance.RemoveEvent(eventid);
                string res = activity + ";" + mioid + ";" + start + ";" + end + ";" + "" + ";" + ActivitiesCollection.Instance[activity].name + ";" + ActivitiesCollection.Instance[activity].color + ";" + ActivitiesCollection.Instance[activity].tcolor + ";" + eventid + ";" + recIns + ";" + Utility.STATUS_INPROCESS + ";" + "" + ";" + 0 + ";" + true + ";" + current + ";" + mioname.ToString();
                Events e1 = new Events(eventid, ActivitiesCollection.Instance[activity].name, start, end, Convert.ToInt64(employeeid_ZSM));
                EventCollection.Instance.AddEvent(e1);
                
                Response.Write(res);
            } 
        }
        public void CheckRSM()
        {

            int mioid = int.Parse(Request.QueryString["mioid"].ToString());
            int rsmid = int.Parse(HttpContext.Current.Session["RSMid"].ToString());

            string s = "";

            DataTable dtjvs = SchedulerManager.getJVs(mioid, rsmid);
            if (dtjvs.Rows.Count > 0)
            {
                s = dtjvs.Rows[0]["informed"].ToString() + ";" + dtjvs.Rows[0]["comments"].ToString();
            }

            Response.Write(s);
        }

        public void ProcessGetRSMEvents()
        {
            int empid = Convert.ToInt32(HttpContext.Current.Session["CurrentUserId"]);
            DateTime initial = DateTime.Parse(Request.QueryString["initial"].ToString());
            //SchedulerManager.loadmonthlyevents(empid);
            //EventCollection.Clear();
            //DataTable DT = SchedulerManager.getEvents(empid);
            //DataTable lsDT = SchedulerManager.getZSMEvents(empid);
            //RSMEventsCollection.Instance.Clear();
            //for (int i = 0; i < lsDT.Rows.Count; i++)
            //{
            //    RSMEvents e = new RSMEvents(int.Parse(lsDT.Rows[i]["zsmid"].ToString()), int.Parse(lsDT.Rows[i]["empid"].ToString()), int.Parse(lsDT.Rows[i]["monthid"].ToString()), int.Parse(lsDT.Rows[i]["mioid"].ToString()), lsDT.Rows[i]["description"].ToString(), bool.Parse(lsDT.Rows[i]["informed"].ToString()), DateTime.Parse(lsDT.Rows[i]["startdate"].ToString()), DateTime.Parse(lsDT.Rows[i]["enddate"].ToString()));
            //    RSMEventsCollection.Instance.AddEvent(e);
            //}
            DataTable lsDT = SchedulerManager.getRSMActivities(empid, initial);

            StringBuilder str = new StringBuilder("");
            //for (int i = 0; i < lsDT.Rows.Count; i++)
            //{
            //    str.Append(lsDT.Rows[i]["ActName"].ToString());
            //    str.Append(";");
            //    str.Append(lsDT.Rows[i]["startdate"].ToString());
            //    str.Append(";");
            //    str.Append(lsDT.Rows[i]["enddate"].ToString());
            //    str.Append(";");
            //    str.Append(lsDT.Rows[i]["ActBColor"].ToString());
            //    str.Append(";");
            //    str.Append(lsDT.Rows[i]["plannerID"].ToString());
            //    str.Append(";");
            //    str.Append(lsDT.Rows[i]["ActFColor"].ToString());
            //    str.Append(";");
            //    str.Append(lsDT.Rows[i]["editable"].ToString());
            //    str.Append(";");
            //    str.Append(lsDT.Rows[i]["DoctorID"].ToString());
            //    str.Append(";");
            //    str.Append(lsDT.Rows[i]["MioDescription"].ToString());
            //    str.Append(";");
            //    str.Append(lsDT.Rows[i]["MioStatus"].ToString());
            //    str.Append(";");
            //    str.Append(lsDT.Rows[i]["MioStatusReason"].ToString());
            //    str.Append(";");
            //    str.Append(lsDT.Rows[i]["planMonth"].ToString());
            //    str.Append(";");
            //    str.Append(lsDT.Rows[i]["ActID"].ToString());
            //    str.Append(";");
            //    str.Append(lsDT.Rows[i]["MonthlyID"].ToString());
            //    str.Append(";");
            //    str.Append(lsDT.Rows[i]["MIOAuthID"].ToString());
            //    str.Append(";");
            //    str.Append("");
            //    str.Append(";");
            //    str.Append("");
            //    str.Append(";");
            //    str.Append("");
            //    str.Append(";");
            //    str.Append("");
            //    str.Append(";");
            //    str.Append("");
            //    str.Append(";");
            //    str.Append("");
            //    str.Append(";");
            //    str.Append("");
            //    str.Append(";");
            //    str.Append("");
            //    str.Append(";");
            //    str.Append(lsDT.Rows[i]["zsmid"].ToString());
            //    str.Append(";");
            //    str.Append(lsDT.Rows[i]["zsmmonthid"].ToString());
            //    str.Append(";");
            //    str.Append(lsDT.Rows[i]["zsmempid"].ToString());
            //    str.Append(";");
            //    str.Append(lsDT.Rows[i]["zsmdescription"].ToString());
            //    str.Append(";");
            //    str.Append(lsDT.Rows[i]["zsminformed"].ToString());
            //    str.Append(";");
            //    str.Append(lsDT.Rows[i]["mstatus"].ToString());
            //    str.Append(";");
            //    str.Append(lsDT.Rows[i]["zsmempid"].ToString());
            //    str.Append(";");
            //    str.Append(lsDT.Rows[i]["zsmplanstatus"].ToString());
            //    str.Append(";");
            //    str.Append(lsDT.Rows[i]["zsmreason"].ToString());
            //    str.Append(";");
            //    str.Append(lsDT.Rows[i]["zsmisedit"].ToString());
            //    str.Append(";");
            //    str.Append(lsDT.Rows[i]["DoctorName"].ToString());
            //    str.Append(";");
            //    str.Append(SchedulerManager.GetProductsNameAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
            //    str.Append(";");
            //    str.Append(SchedulerManager.GetRemindersNameAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
            //    str.Append(";");
            //    str.Append(DoctorClassesCollection.Instance[SchedulerManager.getClassesByDoctor(Convert.ToInt64(lsDT.Rows[i]["DoctorID"].ToString()))].ClassName);
            //    str.Append(";");
            //    str.Append(SchedulerManager.getBricksNameByDoctor(Convert.ToInt64(lsDT.Rows[i]["DoctorID"].ToString())));
            //    str.Append(";");
            //    str.Append(SchedulerManager.GetSamplesNameAndQuantityAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
            //    str.Append(";");
            //    str.Append(SchedulerManager.GetGiftsNameAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
            //    str.Append(",");
            //}
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

            DataTable lsDT1 = SchedulerManager.getMonthlyStatusforEmployee(int.Parse(HttpContext.Current.Session["CurrentUserId"].ToString()), initial);
            for (int i = 0; i < lsDT1.Rows.Count; i++)
            {
                str.Append(lsDT1.Rows[i]["CPM_PlanStatus"].ToString());
                str.Append(";");
                str.Append(Utility.GetStatusColor(lsDT1.Rows[i]["CPM_PlanStatus"].ToString()));
                break;
            }
            Response.Write(str);
        }

        public void ProcessGetRSMEventsbyActivityId()
        {
            DateTime initial = DateTime.Parse(Request.QueryString["initial"].ToString());
            int empid = int.Parse(Request.QueryString["rsmid"].ToString());
            int actid = int.Parse(Request.QueryString["actid"].ToString());
            //SchedulerManager.loadmonthlyevents(empid);
            //EventCollection.Clear();
            //DataTable DT = SchedulerManager.getEvents(empid);
            //for (int i = 0; i < DT.Rows.Count; i++)
            //{
            //    Events e = new Events(int.Parse(DT.Rows[i]["plannerID"].ToString()), DT.Rows[i]["ActName"].ToString(), DateTime.Parse(DT.Rows[i]["startdate"].ToString()), DateTime.Parse(DT.Rows[i]["enddate"].ToString()));
            //    EventCollection.Instance.AddEvent(e);
            //}

            DataTable lsDT = SchedulerManager.getZSMEvents(empid);
            RSMEventsCollection.Instance.Clear();
            for (int i = 0; i < lsDT.Rows.Count; i++)
            {

                RSMEvents e = new RSMEvents(int.Parse(lsDT.Rows[i]["zsmid"].ToString()), int.Parse(lsDT.Rows[i]["empid"].ToString()), int.Parse(lsDT.Rows[i]["monthid"].ToString()), int.Parse(lsDT.Rows[i]["mioid"].ToString()), lsDT.Rows[i]["description"].ToString(), bool.Parse(lsDT.Rows[i]["informed"].ToString()), DateTime.Parse(lsDT.Rows[i]["startdate"].ToString()), DateTime.Parse(lsDT.Rows[i]["enddate"].ToString()));
                RSMEventsCollection.Instance.AddEvent(e);
            }
            lsDT = SchedulerManager.getZSMActivitiesbyActivityId(empid, actid, initial);

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
                str.Append(";");
                str.Append("");
                str.Append(";");
                str.Append("");
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
                str.Append(lsDT.Rows[i]["mstatus"].ToString());
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

            DataTable lsDT1 = SchedulerManager.getMonthlyStatusforEmployee(int.Parse(HttpContext.Current.Session["RSMid"].ToString()), initial);
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
            SchedulerManager.deleteEventbyrsmid(id);
            for (int i = 0; i < RSMEventsCollection.Instance.RSMEventsList.Count; i++)
            {
                if (RSMEventsCollection.Instance.RSMEventsList[i].id == id)
                {
                    RSMEventsCollection.Instance.RSMEventsList.RemoveAt(i);
                }
            }
        }

        public void ProcessSendForApproval()
        {
            DateTime current = DateTime.Parse(Request.QueryString["date"].ToString()).ToUniversalTime().AddHours(5);
            //int empid = int.Parse(Request.QueryString["zsmid"].ToString());
            string status = Request.QueryString["status"].ToString();
            int empid = int.Parse(HttpContext.Current.Session["CurrentUserId"].ToString());
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
                check = dl.InserData("Call_DisallowEditForRSMWithoutCommentsRSM", _nv);
                if (check)
                {
                    _nv.Clear();
                    _nv.Add("@month-int", current.Month.ToString());
                    _nv.Add("@year-int", current.Year.ToString());
                    _nv.Add("@iseditable-bit", "0");
                    _nv.Add("@resion-nvarchar(500)", "");
                    _nv.Add("@planStatus-nvarchar-(50)", Utility.STATUS_SUBMITTED);
                    _nv.Add("@empID-int", empid.ToString());
                    dl.InserData("sp_for_statusChange_CallPlannerMIOLevelRSM", _nv);
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
//                    #region Sending Mail

//                    var msg = new MailMessage { From = new MailAddress(ConfigurationManager.AppSettings["AutoEmailID"], "Plan For Approval-" + table.Rows[0][1] + "") };

//                    if (table.Rows[0][8].ToString() != "NULL")
//                    {
//                        string addresmail = table.Rows[0][8].ToString().Replace("(", "").Replace(")", "").Replace("-", "").Replace(" ", "").Trim();
//                        msg.To.Add(addresmail);
//                    }

//                    msg.Subject = "Planing Status For-PBG- " + DateTime.Now.ToString("dd-MMMM-yyyy");
//                    msg.IsBodyHtml = true;

//                    string strBody = "To: RSM <br/> Med-Rep Teritorry: " + table.Rows[0][1] +
//                        @"<br/>" + "Med-Rep Name: " + table.Rows[0][3] +
//                        @"<br/>" + "Med-Rep Mobile Number: " + table.Rows[0][5] +
//                        @"<br/>Med-Rep Plan Status: " + emailStatus + " For Month: " + Convert.ToDateTime(current).ToLongDateString() +

//                              @"<br/><br/>Generated on: " + DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss") + @"
//
//
//                                   This is a system generated email. Please do not reply. Contact the IT department if you need any assistance.";
//                    msg.Body = strBody;

//                    //var mailAttach = new Attachment(@"C:\AtcoPharma\Excel\VisitsStatsWRTFreq-OTC-" + System.DateTime.Now.ToString("dd-MMMM-yyyy") + ".xlsx");
//                    //msg.Attachments.Add(mailAttach);

//                    var client = new SmtpClient(ConfigurationManager.AppSettings["AutoEmailSMTP"])
//                    {
//                        UseDefaultCredentials = false,
//                        Credentials = new System.Net.NetworkCredential(ConfigurationManager.AppSettings["AutoEmailID"], ConfigurationManager.AppSettings["AutoEmailIDpass"]),
//                        Host = ConfigurationManager.AppSettings["AutoEmailSMTP"]
//                    };

//                    client.Send(msg);

//                    #endregion
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
                var getDetail = dal.GetData("sp_FLM_NSM_DetailForEmail", nv1);
                var table = getDetail.Tables[0];

                if (table.Rows.Count > 0)
                {
//                    #region Sending Mail

//                    var msg = new MailMessage { From = new MailAddress(ConfigurationManager.AppSettings["AutoEmailID"], "Plan For Approval-" + table.Rows[0][1] + "") };

//                    if (table.Rows[0][8].ToString() != "NULL")
//                    {
//                        string addresmail = table.Rows[0][8].ToString().Replace("(", "").Replace(")", "").Replace("-", "").Replace(" ", "").Trim();
//                        msg.To.Add(addresmail);
//                    }

//                    msg.Subject = "Planing Status For-PBG- " + DateTime.Now.ToString("dd-MMMM-yyyy");
//                    msg.IsBodyHtml = true;

//                    string strBody = "To: RSM <br/> Med-Rep Teritorry: " + table.Rows[0][1] +
//                        @"<br/>" + "Med-Rep Name: " + table.Rows[0][3] +
//                        @"<br/>" + "Med-Rep Mobile Number: " + table.Rows[0][5] +
//                        @"<br/>Med-Rep Plan Status: " + emailStatus + " For Month: " + Convert.ToDateTime(current).ToLongDateString() +

//                              @"<br/><br/>Generated on: " + DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss") + @"
//
//
//                                   This is a system generated email. Please do not reply. Contact the IT department if you need any assistance.";
//                    msg.Body = strBody;

//                    //var mailAttach = new Attachment(@"C:\AtcoPharma\Excel\VisitsStatsWRTFreq-OTC-" + System.DateTime.Now.ToString("dd-MMMM-yyyy") + ".xlsx");
//                    //msg.Attachments.Add(mailAttach);

//                    var client = new SmtpClient(ConfigurationManager.AppSettings["AutoEmailSMTP"])
//                    {
//                        UseDefaultCredentials = false,
//                        Credentials = new System.Net.NetworkCredential(ConfigurationManager.AppSettings["AutoEmailID"], ConfigurationManager.AppSettings["AutoEmailIDpass"]),
//                        Host = ConfigurationManager.AppSettings["AutoEmailSMTP"]
//                    };

//                    client.Send(msg);

//                    #endregion
                }
                // SchedulerManager.setEditableMonthforzsmWithoutCommentsZSM(current, empid, Utility.STATUS_RESUBMITTED, false, authempid);

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

        public void insertRSMPlanforMIO()
        {
            string res = "";
            int mioid = int.Parse(Request.QueryString["mioid"].ToString());
            int monthid = int.Parse(Request.QueryString["monthid"].ToString());
            //bool rejected = bool.Parse(Request.QueryString["rejected"].ToString());
            //string rejectcomments = Request.QueryString["rejectcomments"].ToString();
            string comments = SchedulerManager.GetPuriedString(Request.QueryString["comments"].ToString().Trim());
            bool informed = bool.Parse(Request.QueryString["informed"].ToString());
            int rsmid = int.Parse(HttpContext.Current.Session["RSMid"].ToString());
            int roleid = int.Parse(HttpContext.Current.Session["Roleid"].ToString());
            DateTime start = DateTime.Parse(Request.QueryString["start"].ToString());
            DateTime end = DateTime.Parse(Request.QueryString["end"].ToString());
            int bmdid = int.Parse(Request.QueryString["bmd"].ToString());
            // int zsmmonthid = int.Parse(Request.QueryString["zsmmonthid"].ToString());
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

                //if (rejected)
                //{
                //    res = "rejected";
                //    SchedulerManager.ChangeZSMPlanStatus(mioid, zsmmonthid, rejectcomments, rsmid);
                //    if (ispresent)
                //    {
                //        SchedulerManager.deleteRSMPlanbyMIO(mioid, rsmid);
                //        for (int i = 0; i < RSMEventsCollection.Instance.RSMEventsList.Count; i++)
                //        {
                //            if (RSMEventsCollection.Instance.RSMEventsList[i].employeeid == rsmid && RSMEventsCollection.Instance.RSMEventsList[i].mioid == mioid)
                //            {
                //                RSMEventsCollection.Instance.RSMEventsList.RemoveAt(i);
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
                        mid = SchedulerManager.CheckPlannerMonth(start, rsmid);
                        int bid = 0;
                        if (mid == 0)
                        {
                            mid = SchedulerManager.insertCallPlannerMonth(start, "", true, rsmid, Utility.STATUS_INPROCESS, "", 0);
                            if (mid > 0)
                            {
                                id = SchedulerManager.insertZSMPlan(mioid, mid, true, int.Parse(HttpContext.Current.Session["RSMid"].ToString()), Utility.STATUS_INPROCESS, "", 0, comments, informed, roleid);
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
                            id = SchedulerManager.insertZSMPlan(mioid, mid, true, int.Parse(HttpContext.Current.Session["RSMid"].ToString()), Utility.STATUS_INPROCESS, "", 0, comments, informed, roleid);
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

        public void ProcessGetActivities()
        {
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

        //public void ProcessApproveZSMPlan()
        //{
        //    DateTime current = DateTime.Parse(Request.QueryString["date"].ToString()).ToUniversalTime().AddHours(5);
        //    int empid = int.Parse(Request.QueryString["zsmid"].ToString());
        //    int authempid = int.Parse(HttpContext.Current.Session["CurrentUserId"].ToString());
        //    bool check;

        //    _nv.Clear();
        //    _nv.Add("@month-int", current.Month.ToString());
        //    _nv.Add("@year-int", current.Year.ToString());
        //    _nv.Add("@iseditable-bit", "0");
        //    _nv.Add("@resion-nvarchar-(500)", "");
        //    _nv.Add("@planStatus-nvarchar-(50)", Utility.STATUS_APPROVED);
        //    _nv.Add("@empID-int", empid.ToString());
        //    check = dl.InserData("Call_DisallowEditForZSMWithoutCommentsZSM", _nv);
        //    if (check)
        //    {
        //        _nv.Clear();
        //        _nv.Add("@month-int", current.Month.ToString());
        //        _nv.Add("@year-int", current.Year.ToString());
        //        _nv.Add("@iseditable-bit", "0");
        //        _nv.Add("@resion-nvarchar-(500)", "");
        //        _nv.Add("@planStatus-nvarchar-(50)", Utility.STATUS_APPROVED);
        //        _nv.Add("@empID-int", empid.ToString());
        //        dl.InserData("sp_for_statusChange_CallPlannerMIOLevelZSM", _nv);
        //    }
        //    //SchedulerManager.setEditableMonthforzsmWithoutComments(current, empid, Utility.STATUS_APPROVED, false, authempid);
        //}

        //public void ProcessRejectZSMPlan()
        //{
        //    DateTime current = DateTime.Parse(Request.QueryString["date"].ToString()).ToUniversalTime().AddHours(5);
        //    int empid = int.Parse(Request.QueryString["zsmid"].ToString());
        //    string comments = Request.QueryString["comments"].ToString();
        //    int authempid = int.Parse(HttpContext.Current.Session["CurrentUserId"].ToString());
        //    //SchedulerManager.setEditableMonthforzsm(current, empid, Utility.STATUS_REJECTED, true, SchedulerManager.GetPuriedString(comments), authempid);
        //    bool check;
        //    _nv.Clear();
        //    _nv.Add("@month-int", current.Month.ToString());
        //    _nv.Add("@year-int", current.Year.ToString());
        //    _nv.Add("@iseditable-bit", "1");
        //    _nv.Add("@resion-nvarchar-(500)", comments.ToString());
        //    _nv.Add("@planStatus-nvarchar-(50)", Utility.STATUS_REJECTED);
        //    _nv.Add("@empID-int", empid.ToString());
        //    check = dl.InserData("Call_DisallowEditForZSMWithoutCommentsZSM", _nv);
        //    if (check)
        //    {
        //        _nv.Clear();
        //        _nv.Add("@month-int", current.Month.ToString());
        //        _nv.Add("@year-int", current.Year.ToString());
        //        _nv.Add("@iseditable-bit", "1");
        //        _nv.Add("@resion-nvarchar-(500)", comments.ToString());
        //        _nv.Add("@planStatus-nvarchar-(50)", Utility.STATUS_REJECTED);
        //        _nv.Add("@empID-int", empid.ToString());
        //        dl.InserData("sp_for_statusChange_CallPlannerMIOLevelZSM", _nv);
        //    }
        //}

        public void ProcessApproveZSMPlan()
        {
            DateTime current = DateTime.Parse(Request.QueryString["date"].ToString()).ToUniversalTime().AddHours(5);
            int empid = int.Parse(Request.QueryString["zsmid"].ToString());
            int authempid = int.Parse(HttpContext.Current.Session["CurrentUserId"].ToString());
            bool check;

            _nv.Clear();
            _nv.Add("@month-int", current.Month.ToString());
            _nv.Add("@year-int", current.Year.ToString());
            _nv.Add("@iseditable-bit", "0");
            _nv.Add("@resion-nvarchar-(500)", "");
            _nv.Add("@planStatus-nvarchar-(50)", Utility.STATUS_APPROVED);
            _nv.Add("@empID-int", empid.ToString());
            check = dl.InserData("Call_DisallowEditForZSMWithoutCommentsZSM", _nv);
            if (check)
            {
                _nv.Clear();
                _nv.Add("@month-int", current.Month.ToString());
                _nv.Add("@year-int", current.Year.ToString());
                _nv.Add("@iseditable-bit", "0");
                _nv.Add("@resion-nvarchar-(500)", "");
                _nv.Add("@planStatus-nvarchar-(50)", Utility.STATUS_APPROVED);
                _nv.Add("@empID-int", empid.ToString());
                dl.InserData("sp_for_statusChange_CallPlannerMIOLevelZSM", _nv);
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

        public void ProcessRejectZSMPlan()
        {
            DateTime current = DateTime.Parse(Request.QueryString["date"].ToString()).ToUniversalTime().AddHours(5);
            int empid = int.Parse(Request.QueryString["zsmid"].ToString());
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
            check = dl.InserData("Call_DisallowEditForZSMWithoutCommentsZSM", _nv);
            if (check)
            {
                _nv.Clear();
                _nv.Add("@month-int", current.Month.ToString());
                _nv.Add("@year-int", current.Year.ToString());
                _nv.Add("@iseditable-bit", "1");
                _nv.Add("@resion-nvarchar-(500)", comments.ToString());
                _nv.Add("@planStatus-nvarchar-(50)", Utility.STATUS_REJECTED);
                _nv.Add("@empID-int", empid.ToString());
                dl.InserData("sp_for_statusChange_CallPlannerMIOLevelZSM", _nv);
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
            // loadZSMevents(empid);
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
                //str.Append(lsDT.Rows[i]["zsmempid"].ToString());
                str.Append("");
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

            DataTable lsDT1 = SchedulerManager.getMonthlyStatusforEmployeeZSM(empid, initial);
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
            DataTable lsDT2 = SchedulerManager.getMonthlyStatusforEmployeeZSM(int.Parse(HttpContext.Current.Session["RSMid"].ToString()), initial);
            if (lsDT2.Rows.Count > 0)
            {
                str.Append(lsDT2.Rows[0]["CPM_PlanStatus"].ToString());
                str.Append(";");
                str.Append(Utility.GetStatusColor(lsDT2.Rows[0]["CPM_PlanStatus"].ToString()));
                str.Append(";");
                str.Append(lsDT2.Rows[0]["CPM_IsEditable"].ToString());
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

        public void ProcessGetZSMEventsbyActivityId()
        {
            int empid = int.Parse(Request.QueryString["zsmid"].ToString());
            int actid = int.Parse(Request.QueryString["actid"].ToString());
            DateTime initial = DateTime.Parse(Request.QueryString["initial"].ToString());
            //loadZSMevents(empid);
            //SchedulerManager.loadmonthlyevents(empid);
            //EventCollection.Clear();
            //DataTable DT = SchedulerManager.getEvents(empid);
            //for (int i = 0; i < DT.Rows.Count; i++)
            //{
            //    Events e = new Events(int.Parse(DT.Rows[i]["plannerID"].ToString()), DT.Rows[i]["ActName"].ToString(), DateTime.Parse(DT.Rows[i]["startdate"].ToString()), DateTime.Parse(DT.Rows[i]["enddate"].ToString()));
            //    EventCollection.Instance.AddEvent(e);
            //}
            DataTable lsDT = SchedulerManager.getZSMActivitiesbyactitvityidandStatusZSM(empid, actid, initial);
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
                str.Append("");
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
            DataTable lsDT2 = SchedulerManager.getMonthlyStatusforEmployee(int.Parse(HttpContext.Current.Session["RSMid"].ToString()), initial);
            if (lsDT2.Rows.Count > 0)
            {
                str.Append(lsDT2.Rows[0]["CPM_PlanStatus"].ToString());
                str.Append(";");
                str.Append(Utility.GetStatusColor(lsDT2.Rows[0]["CPM_PlanStatus"].ToString()));
                str.Append(";");
                str.Append(lsDT2.Rows[0]["CPM_IsEditable"].ToString());
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
            str.Append("$");

            DataTable lsDT1 = SchedulerManager.getMonthlyStatusforEmployee(int.Parse(HttpContext.Current.Session["RSMid"].ToString()), initial);
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

    }
}