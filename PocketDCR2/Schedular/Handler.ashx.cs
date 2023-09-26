using System;
using System.Collections.Specialized;
using System.Configuration;
using System.Net.Mail;
using System.Web;
using System.Data;
using System.Text;
using PocketDCR2.Classes;
using SchedulerDAL;
using System.Collections;
using System.Globalization;
using System.Collections.Generic;

namespace PocketDCR2.Schedular
{
    /// <summary>
    /// Summary description for Handler
    /// </summary>
    public class Handler : IHttpHandler, System.Web.SessionState.IRequiresSessionState
    {

        HttpRequest Request;
        HttpResponse Response;
        Object thisLock = new Object();
        NameValueCollection _nv = new NameValueCollection();
        DAL dl = new DAL();
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
                case "getcurrentemployee":
                    getcurrentemployee();
                    break;
                case "fillbricks":
                    fillBricks();
                    break;
                case "fillbrickswithdate":
                    fillBrickswithdate();
                    break;
                case "fillclasses":
                    fillClasses();
                    break;
                case "fillproducts":
                    fillProducts();
                    break;
                case "fillgifts":
                    fillGifts();
                    break;
                case "checkholidays":
                    ProcessCheckHolidays();
                    break;
                case "getevents":
                    ProcessGetEvents();
                    break;
                case "geteventssummary":
                    ProcessGetEventsSummary();
                    break;
                case "geteventssummarybyactivityid":
                    ProcessGetEventsSummarybyactivityid();
                    break;
                case "geteventdetails":
                    ProcessGetEventDetails();
                    break;
                case "getinformedjvs":
                    ProcessGetInformedJVs();
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
                case "getdoctorswithdate":
                    ProcessGetDoctorsDateTime();
                    break;
                case "getdoctors":
                    ProcessGetDoctors();
                    break;
                case "getdoctorswithclassname":
                    ProcessGetDoctorsWithClassName();
                    break;
                case "getdoctorswithclassnamewithdate":
                    ProcessGetDoctorsWithClassNamewithdate();
                    break;                 
                case "getdoctorsbybrick":
                    ProcessGetDoctorsbyBrick();
                    break;
                case "getdoctorsbybrickwithdate":
                    ProcessGetDoctorsbyBrickWithdate();
                    break;
                case "getdoctorsbyclass":
                    ProcessGetDoctorsbyClass();
                    break;
                case "getdoctorsbyclasswithdate":
                    ProcessGetDoctorsbyClassWithDate();
                    break;
                case "gettime":
                    ProcessGetTime();
                    break;
                case "insertcallplannermonth":
                    StringBuilder sb = new StringBuilder();
                    sb.Append(InsertCallPlannerMonthDetails());
                    sb.Append("^");
                    DateTime current = DateTime.Parse(Request.QueryString["date"].ToString()).ToUniversalTime().AddHours(5);
                    string recurringdays = Request.QueryString["recurring"].ToString();
                    #region recurringdays
                    if (recurringdays.Length > 1)
                    {


                        string[] semiSplit = recurringdays.Split(';');
                        for (int i = 0; i < semiSplit.Length - 1; i++)
                        {
                            switch (semiSplit[i])
                            {
                                case "mon":
                                    List<DateTime> lst = getSundays(current, DayOfWeek.Monday);
                                    for (int j = 0; j < lst.Count; j++)
                                    {
                                        sb.Append(InsertCallPlannerMonthDetails(lst[j]));
                                        sb.Append("^");
                                    }
                                    break;
                                case "tue":
                                    List<DateTime> lst1 = getSundays(current, DayOfWeek.Tuesday);
                                    for (int j = 0; j < lst1.Count; j++)
                                    {
                                        sb.Append(InsertCallPlannerMonthDetails(lst1[j]));
                                        sb.Append("^");
                                    }
                                    break;
                                case "wed":
                                    List<DateTime> lst2 = getSundays(current, DayOfWeek.Wednesday);
                                    for (int j = 0; j < lst2.Count; j++)
                                    {
                                        sb.Append(InsertCallPlannerMonthDetails(lst2[j]));
                                        sb.Append("^");
                                    }
                                    break;
                                case "thu":
                                    List<DateTime> lst3 = getSundays(current, DayOfWeek.Thursday);
                                    for (int j = 0; j < lst3.Count; j++)
                                    {
                                        sb.Append(InsertCallPlannerMonthDetails(lst3[j]));
                                        sb.Append("^");
                                    }
                                    break;
                                case "fri":
                                    List<DateTime> lst4 = getSundays(current, DayOfWeek.Friday);
                                    for (int j = 0; j < lst4.Count; j++)
                                    {
                                        sb.Append(InsertCallPlannerMonthDetails(lst4[j]));
                                        sb.Append("^");
                                    }
                                    break;
                                case "sat":
                                    List<DateTime> lst5 = getSundays(current, DayOfWeek.Saturday);
                                    for (int j = 0; j < lst5.Count; j++)
                                    {
                                        sb.Append(InsertCallPlannerMonthDetails(lst5[j]));
                                        sb.Append("^");
                                    }
                                    break;
                            }
                        }
                    }
                    #endregion

                    string recurringDates = Request.QueryString["recurringDates"].ToString();
                    #region recurringDates
                    if (recurringDates.Length > 1)
                    {
                        string[] semiSplit = recurringDates.Split(';');

                        for (int i = 0; i < semiSplit.Length - 1; i++)
                        {
                            if (semiSplit[i].Length > 0 && semiSplit[i] != "-1")
                            {
                                sb.Append(InsertCallPlannerMonthDetails(new DateTime(current.Year, current.Month, Convert.ToInt32(semiSplit[i].ToString()))));
                                sb.Append("^");
                            }
                        }
                    }
                    #endregion
                    //
                    if (sb.Length > 0)
                        sb.Length -= 1;

                    Response.Write(sb.ToString());
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
                case "getfrequencybydoctor":
                    getfrequencybydoctor();
                    break;
                case "filldates":
                    filldates();
                    break;
                case "getproductsbydoctorspeciality":
                    getProductsbyDoctorSpeciality();
                    break;
                case "copyplan":
                    copyplanforday();
                    break;
                case "checkcurrentplanstatus":
                    checkCurrentPlanStatus();
                    break;
            }

        }



        public static List<DateTime> getSundays(DateTime date, DayOfWeek day)
        {

            List<DateTime> lstSundays = new List<DateTime>();

            int intMonth = date.Month;

            int intYear = date.Year;

            int intDaysThisMonth = DateTime.DaysInMonth(intYear, intMonth);

            DateTime oBeginnngOfThisMonth = new DateTime(intYear, intMonth, 1);

            for (int i = 0; i < intDaysThisMonth; i++)
            {

                if (oBeginnngOfThisMonth.AddDays(i).DayOfWeek == day)
                {

                    lstSundays.Add(new DateTime(intYear, intMonth, i + 1));

                }

            }

            return lstSundays;

        }
        public void getcurrentemployee()
        {
            StringBuilder sb = new StringBuilder();
            int empid = -1;
            if (HttpContext.Current.Request.QueryString["empid"] != null)
                empid = int.Parse(HttpContext.Current.Request.QueryString["empid"].ToString());
            else
                empid = int.Parse(HttpContext.Current.Session["CurrentUserId"].ToString());
            DataTable empDetails = SchedulerManager.GetEmployee(empid);
            if (empDetails.Rows.Count > 0)
            {
                sb.Append(SchedulerManager.GetPuriedString(empDetails.Rows[0]["EmployeeName"].ToString()));
            }

            Response.Write(sb.ToString());
        }

        public void ProcessCheckHolidays()
        {
            string isholiday = "";
            DateTime current = DateTime.Parse(Request.QueryString["initial"].ToString()).ToUniversalTime().AddHours(5);
            //  int empid = int.Parse(Request.QueryString["mioid"].ToString());
            for (int i = 0; i < HolidaysCollection.Instance.holidayList.Count; i++)
            {
                if (HolidaysCollection.Instance.holidayList[i].Date.ToShortDateString() == current.ToShortDateString())
                {
                    isholiday = "present";
                }
            }
            Response.Write(isholiday);

        }

        public void CheckforEdit()
        {
            int employeeid = Convert.ToInt32(HttpContext.Current.Session["CurrentUserId"]);
            string isedit = "";
            DateTime current = DateTime.Parse(Request.QueryString["date"].ToString()).ToUniversalTime().AddHours(5);
            //  int empid = int.Parse(Request.QueryString["mioid"].ToString());
            for (int i = 0; i < MonthlyMIOCollection.Instance.monthlyEventsList.Count; i++)
            {
                if (MonthlyMIOCollection.Instance.monthlyEventsList[i].employeeid == employeeid && MonthlyMIOCollection.Instance.monthlyEventsList[i].month.Month == current.Month && MonthlyMIOCollection.Instance.monthlyEventsList[i].month.Year == current.Year)// && MonthlyMIOCollection.Instance.monthlyEventsList[i].status !="Resubmitted")
                {
                    isedit = MonthlyMIOCollection.Instance.monthlyEventsList[i].isEditable + ";" + MonthlyMIOCollection.Instance.monthlyEventsList[i].status;
                    break;
                }
            }
            Response.Write(isedit);
        }

        public void ProcessGetInformedJVs()
        {
            int id = int.Parse(Request.QueryString["id"].ToString());
            DataTable lsDT = SchedulerManager.getInformedJVs(id);
            StringBuilder str = new StringBuilder("");
            for (int i = 0; i < lsDT.Rows.Count; i++)
            {
                switch (int.Parse(lsDT.Rows[i]["roleid"].ToString()))
                {
                    case 3:
                        str.Append("NSM");
                        str.Append(",");
                        break;
                    case 4:
                        str.Append("RSM");
                        str.Append(",");
                        break;
                    case 5:
                        str.Append("ZSM");
                        str.Append(",");
                        break;
                }
                str.Append(lsDT.Rows[i]["comments"].ToString());
                str.Append(";");
            }
            if (str.Length > 0)
                str.Length -= 1;
            Response.Write(str);

        }
        public void ProcessSendForApproval()
        {
            var employeeid = Convert.ToInt32(HttpContext.Current.Session["CurrentUserId"]);
            var current = DateTime.Parse(Request.QueryString["date"]).ToUniversalTime().AddHours(5);
            var status = Request.QueryString["status"];
            var emailStatus = "";
            if (status == Utility.STATUS_INPROCESS)
            {
                SchedulerManager.setEditableMonthWithoutComments(current, employeeid, Utility.STATUS_SUBMITTED, false, employeeid);
                emailStatus = "Submitted";
            }
            else if (status == Utility.STATUS_REJECTED)
            { 
                SchedulerManager.setEditableMonthWithoutComments(current, employeeid, Utility.STATUS_RESUBMITTED, false, employeeid);
                emailStatus = "ReSubmitted";

            }


            var nv1 = new NameValueCollection();
            var dal = new DAL();
            nv1.Add("@EmplyeeID-int", HttpContext.Current.Session["CurrentUserId"].ToString());
            // ReSharper disable UnusedVariable
            var getDetail = dal.GetData("sp_MIO_ZSM_DetailForEmail", nv1);
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

                string strBody = "To: FLM <br/> Med-Rep Teritorry: " + table.Rows[0][1] +
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
        }
       
        
        
        public void UpdateCallPlannerMonthDetails()
        {
            DataSet ds;
            Boolean inrange = false;
            Boolean datediff = false;
            Boolean isClassFrequencyExceeded = false;
            Boolean isProductSame = false;
            Boolean isReminderSame = false;
            Boolean isSampleSame = false;
            Boolean isGiftSame = false;
            Boolean isProductContainSelect = false;
            Boolean isReminderContainSelect = false;
            Boolean isSampleContainSelect = false;
            Boolean isGiftContainSelect = false;
            int id = int.Parse(Request.QueryString["id"].ToString());
            DateTime current = DateTime.Parse(Request.QueryString["date"].ToString()).ToUniversalTime().AddHours(5);
            int activity = int.Parse(Request.QueryString["activity"].ToString());
            int doctorid = 0;
            if (Request.QueryString["doctor"].ToString().Split('-')[0].ToString() == "Doc")
            {
                string doctor = Request.QueryString["doctor"].ToString().Split('-')[1];
                _nv.Clear();
                _nv.Add("@Doccode-int", doctor);
                ds = dl.GetData("sp_check_drid", _nv);
                if (ds.Tables[0].Rows.Count != 0)
                {

                }
                else
                {
                    _nv.Clear();
                    _nv.Add("@Doccode-int", doctor);
                    dl.InserData("sp_insert_drid", _nv);
                    ds = dl.GetData("sp_check_drid", _nv);
                }
                doctorid = int.Parse(ds.Tables[0].Rows[0]["DoctorId"].ToString());
            }
            else
            {
                doctorid = int.Parse(Request.QueryString["doctor"].ToString());
            }

            int recIns = 0;
            DateTime start = DateTime.Parse(current.ToShortDateString() + " " + Request.QueryString["starttime"].ToString());
            DateTime end = DateTime.Parse(current.ToShortDateString() + " " + Request.QueryString["endtime"].ToString());
            var bmdid = Request.QueryString["bmd"] != "" ? int.Parse(Request.QueryString["bmd"]) : -1;
            //string products = Request.QueryString["products"].ToString();
            //string reminders = Request.QueryString["reminders"].ToString();
            //string samples = Request.QueryString["samples"].ToString();
            //string gifts = Request.QueryString["gifts"].ToString();

            int currentClassID = SchedulerManager.getClassesByDoctor(doctorid);
            int currentBrickID = SchedulerManager.getBricksByDoctor(doctorid);
            int previousClassID = 0;
            long currentDoctorID = doctorid;
            long previousDoctorID = 0;
            bool isRemovePreviousClassDoctor = false;
            bool isAddCurrentClassDoctor = false;
            for (int i = 0; i < EventCollection.Instance.eventsList.Count; i++)
            {
                if (EventCollection.Instance.eventsList[i].id != id)
                {
                    if (current.ToShortDateString() == EventCollection.Instance.eventsList[i].start.ToShortDateString())
                    {
                        if ((start.TimeOfDay >= EventCollection.Instance.eventsList[i].start.TimeOfDay && start.TimeOfDay < EventCollection.Instance.eventsList[i].end.TimeOfDay) || (end.TimeOfDay > EventCollection.Instance.eventsList[i].start.TimeOfDay && end.TimeOfDay <= EventCollection.Instance.eventsList[i].end.TimeOfDay))
                        {
                            inrange = true;
                            break;
                        }
                        if ((EventCollection.Instance.eventsList[i].start.TimeOfDay >= start.TimeOfDay && EventCollection.Instance.eventsList[i].start.TimeOfDay < end.TimeOfDay) || (EventCollection.Instance.eventsList[i].end.TimeOfDay > start.TimeOfDay && EventCollection.Instance.eventsList[i].end.TimeOfDay <= end.TimeOfDay))
                        {
                            inrange = true;
                            break;
                        }
                    }
                }
                else
                {
                    Events previousEvent = EventCollection.Instance.eventsList[i];
                    if (Convert.ToInt64(doctorid) != previousEvent.DoctorID)
                    {
                        previousDoctorID = previousEvent.DoctorID;

                        int count = EventCollection.Instance.GetCurrentCountByDoctorClass(currentDoctorID);
                        DoctorClass doctorClass = DoctorClassesCollection.Instance[currentClassID];
                        if (doctorClass != null && count > 0)
                        {
                            if (count >= doctorClass.ClassFrequency)
                                isClassFrequencyExceeded = true;
                            else
                            {
                                isRemovePreviousClassDoctor = true;
                                isAddCurrentClassDoctor = true;
                            }
                        }
                        else
                        {
                            isRemovePreviousClassDoctor = true;
                            isAddCurrentClassDoctor = true;
                        }
                    }
                    else
                    {
                        isAddCurrentClassDoctor = false;
                        isRemovePreviousClassDoctor = false;
                    }
                }
            }
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
            if (start >= end)
            {
                datediff = true;
                Response.Write("datediff");
            }
            else if (inrange)
                Response.Write("outofrange");
            else if (isClassFrequencyExceeded)
                Response.Write("classfrequencyexceeded");
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
            else
            {
                string description = Request.QueryString["description"].ToString();

                //int id = 0;
                //id = SchedulerManager.CheckPlannerMonth(current, employeeid);
                //if (id == 0)
                {
                    SchedulerManager.UpdateCallPlannerMonth(start, end, description, id, doctorid, activity);
                    //SchedulerManager.deleteCallPlannerProducts(id);
                    //if (products != "")
                    //{
                    //    int orderby = 1;
                    //    string[] product = products.Split(';');
                    //    for (int i = 0; i < product.Length - 1; i++)
                    //    {
                    //        if (product[i] != "-1")
                    //        {
                    //            SchedulerManager.InsertCallPlannerProduct(id, int.Parse(product[i]), orderby);
                    //            orderby++;
                    //        }
                    //    }

                    //}

                    //SchedulerManager.deleteCallPlannerReminders(id);
                    //if (reminders != "")
                    //{
                    //    int orderby = 1;
                    //    string[] reminder = reminders.Split(';');
                    //    for (int i = 0; i < reminder.Length - 1; i++)
                    //    {
                    //        if (reminder[i] != "-1")
                    //        {
                    //            SchedulerManager.InsertCallPlannerReminder(id, int.Parse(reminder[i]), orderby);
                    //            orderby++;
                    //        }
                    //    }

                    //}

                    //SchedulerManager.deleteCallPlannerSamples(id);
                    //if (samples != "")
                    //{
                    //    int orderby = 1;
                    //    string[] sample = samples.Split(';');
                    //    for (int i = 0; i < sample.Length - 1; i++)
                    //    {
                    //        if (sample[i].Split('|')[0] != "-1")
                    //        {
                    //            SchedulerManager.InsertCallPlannerSamples(id, int.Parse(sample[i].Split('|')[0]), int.Parse(sample[i].Split('|')[1]), orderby);
                    //            orderby++;
                    //        }
                    //    }
                    //}

                    //SchedulerManager.deleteCallPlannerGifts(id);
                    //if (gifts != "")
                    //{
                    //    int orderby = 1;
                    //    string[] gift = gifts.Split(';');
                    //    for (int i = 0; i < gift.Length - 1; i++)
                    //    {
                    //        if (gift[i] != "-1")
                    //        {
                    //            SchedulerManager.InsertCallPlannerGifts(id, int.Parse(gift[i]), orderby);
                    //            orderby++;
                    //        }
                    //    }
                    //}

                    //if (bmdid != -1)
                    //{
                    //    SchedulerManager.insertCallPlannerBMDCoordinator(id, bmdid, DateTime.Now, DateTime.Now, 0);
                    //}

                }
                string res = activity + ";" + doctorid + ";" + start + ";" + end + ";" + description + ";" + ActivitiesCollection.Instance[activity].name + ";" + ActivitiesCollection.Instance[activity].color + ";" + ActivitiesCollection.Instance[activity].tcolor + ";" + currentClassID.ToString() + ";" + currentBrickID.ToString() + ";";
                Response.Write(res);
                for (int i = 0; i < EventCollection.Instance.eventsList.Count; i++)
                {
                    if (EventCollection.Instance.eventsList[i].id == id)
                    {
                        Events e1 = new Events(id, ActivitiesCollection.Instance[activity].name, start, end, Convert.ToInt64(doctorid));
                        EventCollection.Instance.eventsList[i] = e1;
                    }
                }
                if (isRemovePreviousClassDoctor)
                    EventCollection.Instance.RemoveDoctorClass(previousDoctorID);
                if (isAddCurrentClassDoctor)
                    EventCollection.Instance.AddDoctorClass(currentDoctorID);
                //Response.Write("PARTY" + ";" + 12 + ";" + 1 + ";" + 1 + "," + "VISIT" + ";" + + 1 + ";" + 2 + ";" + 3);
                //     Response.Write(id);
            }

        }

        public string InsertCallPlannerMonthDetails(DateTime current)
        {
            Boolean inrange = false;
            Boolean datediff = false;
            Boolean isClassFrequencyExceeded = false;
            Boolean isProductSame = false;
            Boolean isReminderSame = false;
            Boolean isSampleSame = false;
            Boolean isGiftSame = false;
            Boolean isProductContainSelect = false;
            Boolean isReminderContainSelect = false;
            Boolean isSampleContainSelect = false;
            Boolean isGiftContainSelect = false;
            int employeeid = Convert.ToInt32(HttpContext.Current.Session["CurrentUserId"]);
            //  int id = int.Parse(Request.QueryString["id"].ToString());
            //DateTime current = DateTime.Parse(Request.QueryString["date"].ToString()).ToUniversalTime().AddHours(5);
            int activity = int.Parse(Request.QueryString["activity"].ToString());
            int doctorid = int.Parse(Request.QueryString["doctor"].ToString());
            var bmdid = Request.QueryString["bmd"] != "" ? int.Parse(Request.QueryString["bmd"]) : -1;
            string products = Request.QueryString["products"].ToString();
            string reminders = Request.QueryString["reminders"].ToString();
            string samples = Request.QueryString["samples"].ToString();
            string gifts = Request.QueryString["gifts"];
            int recIns = 0;
            DateTime start =
                DateTime.Parse(current.ToShortDateString() + " " + Request.QueryString["starttime"].ToString());
            DateTime end = DateTime.Parse(current.ToShortDateString() + " " + Request.QueryString["endtime"].ToString());
            string description = Request.QueryString["description"].ToString();
            string s = "";

            int classid = SchedulerManager.getClassesByDoctor(doctorid);
            int brickid = SchedulerManager.getBricksByDoctor(doctorid);
            for (int i = 0; i < EventCollection.Instance.eventsList.Count; i++)
            {
                //s += EventCollection.Instance.eventsList[i].end.TimeOfDay + ";";

                if (current.ToShortDateString() == EventCollection.Instance.eventsList[i].start.ToShortDateString())
                {
                    //  
                    if ((start.TimeOfDay >= EventCollection.Instance.eventsList[i].start.TimeOfDay &&
                         start.TimeOfDay < EventCollection.Instance.eventsList[i].end.TimeOfDay) ||
                        (end.TimeOfDay > EventCollection.Instance.eventsList[i].start.TimeOfDay &&
                         end.TimeOfDay <= EventCollection.Instance.eventsList[i].end.TimeOfDay))
                    {

                        inrange = true;
                        break;
                    }
                    if ((EventCollection.Instance.eventsList[i].start.TimeOfDay >= start.TimeOfDay &&
                         EventCollection.Instance.eventsList[i].start.TimeOfDay < end.TimeOfDay) ||
                        (EventCollection.Instance.eventsList[i].end.TimeOfDay > start.TimeOfDay &&
                         EventCollection.Instance.eventsList[i].end.TimeOfDay <= end.TimeOfDay))
                    {
                        inrange = true;
                        break;
                    }

                }
                //block becuase novartis wants to add doctor call is frequency exceeded, if want to revert back just uncomment the below code
                //if (classid != -1)
                //{
                //    int count = EventCollection.Instance.GetCurrentCountByDoctorClass(doctorid);
                //    DoctorClass doctorClass = DoctorClassesCollection.Instance[classid];
                //    if (doctorClass != null && count > 0)
                //    {
                //        if (count >= doctorClass.ClassFrequency)
                //            isClassFrequencyExceeded = true;
                //    }
                //}
            }
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
            //    string[] sample = samples.Split(';');
            //    if (!isSampleContainSelect)
            //    {
            //        isSampleSame = SchedulerManager.CheckSampleQuantityComboSame(sample, true);
            //    }
            //}
            //if (gifts != "")
            //{
            //    string[] gift = gifts.Split(';');
            //    if (!isGiftContainSelect)
            //    {
            //        isGiftSame = SchedulerManager.CheckProductOrReminderComboSame(gift, true);
            //    }
            //}

            int bid = 0;
            //  Response.Write(start.TimeOfDay + ";" + s);
            if (start >= end)
            {
                datediff = true;
                //Response.Write("datediff");
                return "datediff;" + current.ToString("dd-ddd");
            }
            else if (inrange)
            {
                //Response.Write("outofrange");
                return "outofrange;" + current.ToString("dd-ddd");
            }
            else if (isClassFrequencyExceeded)
            {
                Response.Write("classfrequencyexceeded");
                return "classfrequencyexceeded;" + current.ToString("dd-ddd");
            }
            //else if (isProductSame)
            //{
            //    //Response.Clear();
            //    //Response.Write("productsame");
            //    return "productsame;" + current.ToString("dd-ddd");
            //}
            //else if (isReminderSame)
            //{
            //    //Response.Clear();
            //    //Response.Write("remindersame");
            //    return "remindersame;" + current.ToString("dd-ddd");
            //}
            //else if (isSampleSame)
            //{
            //    //Response.Clear();
            //    //Response.Write("remindersame");
            //    return "samplesame;" + current.ToString("dd-ddd");
            //}
            //else if (isGiftSame)
            //{
            //    //Response.Clear();
            //    //Response.Write("remindersame");
            //    return "giftsame;" + current.ToString("dd-ddd");
            //}
            //else if (isProductContainSelect)
            //{
            //    //Response.Clear();
            //    //Response.Write("productcontainselect");
            //    return "productcontainselect;" + current.ToString("dd-ddd");
            //}
            //else if (isReminderContainSelect)
            //{
            //    //Response.Clear();
            //    //Response.Write("remindercontainselect");
            //    return "remindercontainselect;" + current.ToString("dd-ddd");
            //}
            else
            {
                int id = 0;
                id = SchedulerManager.CheckPlannerMonth(current, employeeid);
                if (id == 0)
                {
                    id = SchedulerManager.insertCallPlannerMonth(current, "", true, employeeid, Utility.STATUS_INPROCESS, "", 0);
                    if (id > 0)
                    {

                        recIns = SchedulerManager.InsertCallPlannerMIO(id, start, end, true, activity, doctorid, description, Utility.STATUS_INPROCESS, "", 0);
                        //if (recIns > 0)
                        //{
                            //if (products != "")
                            //{
                            //    int orderby = 1;
                            //    string[] product = products.Split(';');
                            //    for (int i = 0; i < product.Length - 1; i++)
                            //    {
                            //        if (product[i] != "-1")
                            //        {
                            //            SchedulerManager.InsertCallPlannerProduct(recIns, int.Parse(product[i]), orderby);
                            //            orderby++;
                            //        }
                            //    }

                            //}
                            //if (reminders != "")
                            //{
                            //    int orderby = 1;
                            //    string[] reminder = reminders.Split(';');
                            //    for (int i = 0; i < reminder.Length - 1; i++)
                            //    {
                            //        if (reminder[i] != "-1")
                            //        {
                            //            SchedulerManager.InsertCallPlannerReminder(recIns, int.Parse(reminder[i]), orderby);
                            //            orderby++;
                            //        }
                            //    }
                            //}
                            //if (samples != "")
                            //{
                            //    int orderby = 1;
                            //    string[] sample = samples.Split(';');
                            //    for (int i = 0; i < sample.Length - 1; i++)
                            //    {
                            //        if (sample[i].Split('|')[0] != "-1")
                            //        {
                            //            SchedulerManager.InsertCallPlannerSamples(recIns, int.Parse(sample[i].Split('|')[0]), int.Parse(sample[i].Split('|')[1]), orderby);
                            //            orderby++;
                            //        }
                            //    }
                            //}
                            //if (gifts != "")
                            //{
                            //    int orderby = 1;
                            //    string[] gift = gifts.Split(';');
                            //    for (int i = 0; i < gift.Length - 1; i++)
                            //    {
                            //        if (gift[i] != "-1")
                            //        {
                            //            SchedulerManager.InsertCallPlannerGifts(recIns, int.Parse(gift[i]), orderby);
                            //            orderby++;
                            //        }
                            //    }
                            //}
                        //}
                        //if (bmdid != -1)
                        //{
                        //    bid = SchedulerManager.insertCallPlannerBMDCoordinator(recIns, bmdid, DateTime.Now, DateTime.Now, 0);
                        //}
                    }
                }
                else
                {
                    recIns = SchedulerManager.InsertCallPlannerMIO(id, start, end, true, activity, doctorid, description, Utility.STATUS_INPROCESS, "", 0);
                    //if (recIns > 0)
                    //{
                    //    if (products != "")
                    //    {
                    //        int orderby = 1;
                    //        string[] product = products.Split(';');
                    //        for (int i = 0; i < product.Length - 1; i++)
                    //        {
                    //            if (product[i] != "-1")
                    //            {
                    //                SchedulerManager.InsertCallPlannerProduct(recIns, int.Parse(product[i]), orderby);
                    //                orderby++;
                    //            }
                    //        }

                    //    }
                    //    if (reminders != "")
                    //    {
                    //        int orderby = 1;
                    //        string[] reminder = reminders.Split(';');
                    //        for (int i = 0; i < reminder.Length - 1; i++)
                    //        {
                    //            if (reminder[i] != "-1")
                    //            {
                    //                SchedulerManager.InsertCallPlannerReminder(recIns, int.Parse(reminder[i]), orderby);
                    //                orderby++;
                    //            }
                    //        }

                    //    }
                    //    if (samples != "")
                    //    {
                    //        int orderby = 1;
                    //        string[] sample = samples.Split(';');
                    //        for (int i = 0; i < sample.Length - 1; i++)
                    //        {
                    //            if (sample[i].Split('|')[0] != "-1")
                    //            {
                    //                SchedulerManager.InsertCallPlannerSamples(recIns, int.Parse(sample[i].Split('|')[0]), int.Parse(sample[i].Split('|')[1]), orderby);
                    //                orderby++;
                    //            }
                    //        }

                    //    }
                    //    if (gifts != "")
                    //    {
                    //        int orderby = 1;
                    //        string[] gift = gifts.Split(';');
                    //        for (int i = 0; i < gift.Length - 1; i++)
                    //        {
                    //            if (gift[i] != "-1")
                    //            {
                    //                SchedulerManager.InsertCallPlannerGifts(recIns, int.Parse(gift[i]), orderby);
                    //                orderby++;
                    //            }
                    //        }

                    //    }
                    //}
                    //if (bmdid != -1)
                    //{
                    //    bid = SchedulerManager.insertCallPlannerBMDCoordinator(recIns, bmdid, DateTime.Now, DateTime.Now, 0);
                    //}
                }
                string res = activity + ";" + doctorid + ";" + start + ";" + end + ";" + description + ";" + ActivitiesCollection.Instance[activity].name + ";" + ActivitiesCollection.Instance[activity].color + ";" + ActivitiesCollection.Instance[activity].tcolor + ";" + id + ";" + recIns + ";" + Utility.STATUS_INPROCESS + ";" + "" + ";" + 0 + ";" + true + ";" + current + ";" + classid.ToString() + ";" + brickid.ToString() + ";" + products.Replace(";", "*") + ";" + reminders.Replace(";", "*") + ";" + samples.Replace(";", "*") + ";" + gifts.Replace(";", "*");
                Events e1 = new Events(recIns, ActivitiesCollection.Instance[activity].name, start, end, Convert.ToInt64(doctorid));
                EventCollection.Instance.AddEvent(e1);
                //Response.Write(res);
                return res;
            }
            //Response.Write("PARTY" + ";" + 12 + ";" + 1 + ";" + 1 + "," + "VISIT" + ";" + + 1 + ";" + 2 + ";" + 3);
            //     Response.Write(id);
        }
        public string InsertCallPlannerMonthDetails()
        {
            DataSet ds;
            Boolean inrange = false;
            Boolean datediff = false;
            Boolean isClassFrequencyExceeded = false;
            Boolean isProductSame = false;
            Boolean isReminderSame = false;
            Boolean isSampleSame = false;
            Boolean isGiftSame = false;
            Boolean isProductContainSelect = false;
            Boolean isReminderContainSelect = false;
            Boolean isSampleContainSelect = false;
            Boolean isGiftContainSelect = false;
            int employeeid = Convert.ToInt32(HttpContext.Current.Session["CurrentUserId"]);
            //  int id = int.Parse(Request.QueryString["id"].ToString());
            DateTime current = DateTime.Parse(Request.QueryString["date"].ToString()).ToUniversalTime().AddHours(5);
            int activity = int.Parse(Request.QueryString["activity"].ToString());
            int doctorid = 0;//int.Parse(Request.QueryString["doctor"].ToString());
            if (Request.QueryString["doctor"].ToString().Split('-')[0].ToString() == "Doc")
            {
                string doctor = Request.QueryString["doctor"].ToString().Split('-')[1];
                _nv.Clear();
                _nv.Add("@Doccode-int", doctor);
                ds = dl.GetData("sp_check_drid", _nv);
                if (ds.Tables[0].Rows.Count != 0)
                {

                }
                else
                {
                    _nv.Clear();
                    _nv.Add("@Doccode-int", doctor);
                    dl.InserData("sp_insert_drid", _nv);
                    ds = dl.GetData("sp_check_drid", _nv);
                }
                doctorid = int.Parse(ds.Tables[0].Rows[0]["DoctorId"].ToString());
            }
            else
            {
                doctorid = int.Parse(Request.QueryString["doctor"].ToString());
            }


            var bmdid = Request.QueryString["bmd"] != "" ? int.Parse(Request.QueryString["bmd"]) : -1;
            string products = Request.QueryString["products"].ToString();
            string reminders = Request.QueryString["reminders"].ToString();
            string samples = Request.QueryString["samples"].ToString();
            string gifts = Request.QueryString["gifts"].ToString();

            int recIns = 0;
            DateTime start = DateTime.Parse(current.ToShortDateString() + " " + Request.QueryString["starttime"].ToString());
            DateTime end = DateTime.Parse(current.ToShortDateString() + " " + Request.QueryString["endtime"].ToString());
            string description = Request.QueryString["description"].ToString();
            string s = "";

            int classid = SchedulerManager.getClassesByDoctor(doctorid);
            int brickid = SchedulerManager.getBricksByDoctor(doctorid);
            for (int i = 0; i < EventCollection.Instance.eventsList.Count; i++)
            {
                //s += EventCollection.Instance.eventsList[i].end.TimeOfDay + ";";

                if (current.ToShortDateString() == EventCollection.Instance.eventsList[i].start.ToShortDateString())
                {
                    //  
                    if ((start.TimeOfDay >= EventCollection.Instance.eventsList[i].start.TimeOfDay && start.TimeOfDay < EventCollection.Instance.eventsList[i].end.TimeOfDay) || (end.TimeOfDay > EventCollection.Instance.eventsList[i].start.TimeOfDay && end.TimeOfDay <= EventCollection.Instance.eventsList[i].end.TimeOfDay))
                    {

                        inrange = true;
                        break;
                    }
                    if ((EventCollection.Instance.eventsList[i].start.TimeOfDay >= start.TimeOfDay && EventCollection.Instance.eventsList[i].start.TimeOfDay < end.TimeOfDay) || (EventCollection.Instance.eventsList[i].end.TimeOfDay > start.TimeOfDay && EventCollection.Instance.eventsList[i].end.TimeOfDay <= end.TimeOfDay))
                    {
                        inrange = true;
                        break;
                    }
                }

                //block becuase novartis wants to add doctor call is frequency exceeded, if want to revert back just uncomment the below code
                //if (classid != -1)
                //{
                //    int count = EventCollection.Instance.GetCurrentCountByDoctorClass(doctorid);
                //    DoctorClass doctorClass = DoctorClassesCollection.Instance[classid];
                //    if (doctorClass != null && count > 0)
                //    {
                //        if (count >= doctorClass.ClassFrequency)
                //            isClassFrequencyExceeded = true;
                //    }
                //}

            }

            if (products != "")
            {
                string[] product = products.Split(';');
                //isProductContainSelect = SchedulerManager.CheckProductOrReminderConatinsSelect(product);
                if (!isProductContainSelect)
                    isProductSame = SchedulerManager.CheckProductOrReminderComboSame(product, true);

            }
            if (reminders != "")
            {
                string[] reminder = reminders.Split(';');
                //isReminderContainSelect = SchedulerManager.CheckProductOrReminderConatinsSelect(reminder);
                if (!isReminderContainSelect)
                    isReminderSame = SchedulerManager.CheckProductOrReminderComboSame(reminder, true);
            }
            if (samples != "")
            {
                string[] samplearray = samples.Split(';');
                isSampleSame = SchedulerManager.CheckSampleQuantityComboSame(samplearray, true);
            }
            if (gifts != "")
            {
                string[] giftarray = gifts.Split(';');
                isGiftSame = SchedulerManager.CheckProductOrReminderComboSame(giftarray, true);
            }
            #region Activity-Same-Doctor-Check

            _nv.Clear();
            _nv.Add("@Current-varchar(50)", current.ToString());
            _nv.Add("@DOCID-int", doctorid.ToString());
            _nv.Add("@ACTIVITY-int", activity.ToString());
            _nv.Add("@EMPID-int", employeeid.ToString());
            ds = dl.GetData("sp_check_call", _nv);

            #endregion

            int bid = 0;
            //  Response.Write(start.TimeOfDay + ";" + s);
            if (start >= end)
            {
                datediff = true;
                //Response.Write("datediff");
                return "datediff;" + current.ToString("dd-ddd");
            }
            else if (inrange)
            {
                //Response.Write("outofrange");
                return "outofrange;" + current.ToString("dd-ddd");
            }
            else if (isClassFrequencyExceeded)
            {
                //Response.Write("classfrequencyexceeded");
                return "classfrequencyexceeded;" + current.ToString("dd-ddd");
            }
            else if (isProductSame)
            {
                //Response.Write("productsame");
                return "productsame;" + current.ToString("dd-ddd");
            }
            else if (isReminderSame)
            {
                //Response.Write("remindersame");
                return "remindersame;" + current.ToString("dd-ddd");
            }
            else if (isSampleSame)
            {
                return "samplesame;" + current.ToString("dd-ddd");
            }
            else if (isGiftSame)
            {
                return "giftsame;" + current.ToString("dd-ddd");
            }
            else if (isProductContainSelect)
            {
                //Response.Write("productcontainselect");
                return "productcontainselect;" + current.ToString("dd-ddd");
            }
            else if (isReminderContainSelect)
            {
                //Response.Write("remindercontainselect");
                return "remindercontainselect;" + current.ToString("dd-ddd");
            }
            else if (isSampleContainSelect)
            {
                return "samplecontainselect;" + current.ToString("dd-ddd");
            }
            else if (isGiftContainSelect)
            {
                return "giftcontainselect;" + current.ToString("dd-ddd");
            }
            else if (ds != null && ds.Tables[0].Rows.Count != 0)
            {
                return "alreadyexistactivitywithsamedoctor;" + current.ToString("dd-ddd");
            }
            else
            {
                int id = 0;
                id = SchedulerManager.CheckPlannerMonth(current, employeeid);
                if (id == 0)
                {
                    id = SchedulerManager.insertCallPlannerMonth(current, "", true, employeeid, Utility.STATUS_INPROCESS, "", 0);
                    if (id > 0)
                    {

                        recIns = SchedulerManager.InsertCallPlannerMIO(id, start, end, true, activity, doctorid, description, Utility.STATUS_INPROCESS, "", 0);
                        if (recIns > 0)
                        {
                            if (products != "")
                            {
                                int ordrby = 1;
                                string[] product = products.Split(';');
                                for (int i = 0; i < product.Length - 1; i++)
                                {
                                    if (product[i] != "-1")
                                    {
                                        SchedulerManager.InsertCallPlannerProduct(recIns, int.Parse(product[i]), ordrby);
                                        ordrby++;
                                    }
                                }

                            }
                            if (reminders != "")
                            {
                                int ordrby = 1;
                                string[] reminder = reminders.Split(';');
                                for (int i = 0; i < reminder.Length - 1; i++)
                                {
                                    if (reminder[i] != "-1")
                                    {
                                        SchedulerManager.InsertCallPlannerReminder(recIns, int.Parse(reminder[i]), ordrby);
                                        ordrby++;
                                    }
                                }

                            }
                            if (samples != "")
                            {
                                int orderby = 1;
                                string[] sample = samples.Split(';');
                                for (int i = 0; i < sample.Length - 1; i++)
                                {
                                    if (sample[i].Split('|')[0] != "-1")
                                    {
                                        SchedulerManager.InsertCallPlannerSamples(recIns, int.Parse(sample[i].Split('|')[0]), int.Parse(sample[i].Split('|')[1]), orderby);
                                        orderby++;
                                    }
                                }
                            }
                            if (gifts != "")
                            {
                                int orderby = 1;
                                string[] gift = gifts.Split(';');
                                for (int i = 0; i < gift.Length - 1; i++)
                                {
                                    if (gift[i] != "-1")
                                    {
                                        SchedulerManager.InsertCallPlannerGifts(recIns, int.Parse(gift[i]), orderby);
                                        orderby++;
                                    }
                                }
                            }
                        }
                        if (bmdid != -1)
                        {
                            bid = SchedulerManager.insertCallPlannerBMDCoordinator(recIns, bmdid, DateTime.Now, DateTime.Now, 0);
                        }
                    }
                }
                else
                {
                    recIns = SchedulerManager.InsertCallPlannerMIO(id, start, end, true, activity, doctorid, description, Utility.STATUS_INPROCESS, "", 0);
                    if (recIns > 0)
                    {
                        if (products != "")
                        {
                            int orderby = 1;
                            string[] product = products.Split(';');
                            for (int i = 0; i < product.Length - 1; i++)
                            {
                                if (product[i] != "-1")
                                {
                                    SchedulerManager.InsertCallPlannerProduct(recIns, int.Parse(product[i]), orderby);
                                    orderby++;
                                }
                            }

                        }
                        if (reminders != "")
                        {
                            int orderby = 1;
                            string[] reminder = reminders.Split(';');
                            for (int i = 0; i < reminder.Length - 1; i++)
                            {
                                if (reminder[i] != "-1")
                                {
                                    SchedulerManager.InsertCallPlannerReminder(recIns, int.Parse(reminder[i]), orderby);
                                    orderby++;
                                }
                            }

                        }
                        if (samples != "")
                        {
                            int orderby = 1;
                            string[] sample = samples.Split(';');
                            for (int i = 0; i < sample.Length - 1; i++)
                            {
                                if (sample[i].Split('|')[0] != "-1")
                                {
                                    SchedulerManager.InsertCallPlannerSamples(recIns, int.Parse(sample[i].Split('|')[0]), int.Parse(sample[i].Split('|')[1]), orderby);
                                    orderby++;
                                }
                            }
                        }
                        if (gifts != "")
                        {
                            int orderby = 1;
                            string[] gift = gifts.Split(';');
                            for (int i = 0; i < gift.Length - 1; i++)
                            {
                                if (gift[i] != "-1")
                                {
                                    SchedulerManager.InsertCallPlannerGifts(recIns, int.Parse(gift[i]), orderby);
                                    orderby++;
                                }
                            }
                        }
                    }
                    if (bmdid != -1)
                    {
                        bid = SchedulerManager.insertCallPlannerBMDCoordinator(recIns, bmdid, DateTime.Now, DateTime.Now, 0);
                    }
                }
                string res = activity + ";" + doctorid + ";" + start + ";" + end + ";" + description + ";" + ActivitiesCollection.Instance[activity].name + ";" + ActivitiesCollection.Instance[activity].color + ";" + ActivitiesCollection.Instance[activity].tcolor + ";" + id + ";" + recIns + ";" + Utility.STATUS_INPROCESS + ";" + "" + ";" + 0 + ";" + true + ";" + current + ";" + classid.ToString() + ";" + brickid.ToString() + ";" + products.Replace(";", "*") + ";" + reminders.Replace(";", "*") + ";" + samples.Replace(";", "*") + ";" + gifts.Replace(";", "*");
                Events e1 = new Events(recIns, ActivitiesCollection.Instance[activity].name, start, end, Convert.ToInt64(doctorid));
                EventCollection.Instance.AddEvent(e1);
                //Response.Write(res);
                return res;
            }
            //Response.Write("PARTY" + ";" + 12 + ";" + 1 + ";" + 1 + "," + "VISIT" + ";" + + 1 + ";" + 2 + ";" + 3);
            //     Response.Write(id);
        }

        /*public string InsertCallPlannerMonthDetails()
        {
            Boolean inrange = false;
            Boolean datediff = false;
            Boolean isClassFrequencyExceeded = false;
            Boolean isProductSame = false;
            Boolean isReminderSame = false;
            Boolean isSampleSame = false;
            Boolean isGiftSame = false;
            Boolean isProductContainSelect = false;
            Boolean isReminderContainSelect = false;
            Boolean isSampleContainSelect = false;
            Boolean isGiftContainSelect = false;
            int employeeid = Convert.ToInt32(HttpContext.Current.Session["CurrentUserId"]);
            //  int id = int.Parse(Request.QueryString["id"].ToString());
            DateTime current = DateTime.Parse(Request.QueryString["date"].ToString()).ToUniversalTime().AddHours(5);
            int activity = int.Parse(Request.QueryString["activity"].ToString());
            int doctorid = int.Parse(Request.QueryString["doctor"].ToString());
            var bmdid = Request.QueryString["bmd"] != "" ? int.Parse(Request.QueryString["bmd"]) : -1;
            string products = Request.QueryString["products"].ToString();
            string reminders = Request.QueryString["reminders"].ToString();
            string samples = Request.QueryString["samples"].ToString();
            string gifts = Request.QueryString["gifts"].ToString();

            int recIns = 0;
            DateTime start = DateTime.Parse(current.ToShortDateString() + " " + Request.QueryString["starttime"].ToString());
            DateTime end = DateTime.Parse(current.ToShortDateString() + " " + Request.QueryString["endtime"].ToString());
            string description = Request.QueryString["description"].ToString();
            string s = "";

            int classid = SchedulerManager.getClassesByDoctor(doctorid);
            int brickid = SchedulerManager.getBricksByDoctor(doctorid);
            for (int i = 0; i < EventCollection.Instance.eventsList.Count; i++)
            {
                //s += EventCollection.Instance.eventsList[i].end.TimeOfDay + ";";

                if (current.ToShortDateString() == EventCollection.Instance.eventsList[i].start.ToShortDateString())
                {
                    //  
                    if ((start.TimeOfDay >= EventCollection.Instance.eventsList[i].start.TimeOfDay && start.TimeOfDay < EventCollection.Instance.eventsList[i].end.TimeOfDay) || (end.TimeOfDay > EventCollection.Instance.eventsList[i].start.TimeOfDay && end.TimeOfDay <= EventCollection.Instance.eventsList[i].end.TimeOfDay))
                    {

                        inrange = true;
                        break;
                    }
                    if ((EventCollection.Instance.eventsList[i].start.TimeOfDay >= start.TimeOfDay && EventCollection.Instance.eventsList[i].start.TimeOfDay < end.TimeOfDay) || (EventCollection.Instance.eventsList[i].end.TimeOfDay > start.TimeOfDay && EventCollection.Instance.eventsList[i].end.TimeOfDay <= end.TimeOfDay))
                    {
                        inrange = true;
                        break;
                    }
                }

                //block becuase novartis wants to add doctor call is frequency exceeded, if want to revert back just uncomment the below code
                //if (classid != -1)
                //{
                //    int count = EventCollection.Instance.GetCurrentCountByDoctorClass(doctorid);
                //    DoctorClass doctorClass = DoctorClassesCollection.Instance[classid];
                //    if (doctorClass != null && count > 0)
                //    {
                //        if (count >= doctorClass.ClassFrequency)
                //            isClassFrequencyExceeded = true;
                //    }
                //}

            }

            if (products != "")
            {
                string[] product = products.Split(';');
                //isProductContainSelect = SchedulerManager.CheckProductOrReminderConatinsSelect(product);
                if (!isProductContainSelect)
                    isProductSame = SchedulerManager.CheckProductOrReminderComboSame(product, true);

            }
            if (reminders != "")
            {
                string[] reminder = reminders.Split(';');
                //isReminderContainSelect = SchedulerManager.CheckProductOrReminderConatinsSelect(reminder);
                if (!isReminderContainSelect)
                    isReminderSame = SchedulerManager.CheckProductOrReminderComboSame(reminder, true);
            }
            if (samples != "")
            {
                string[] samplearray = samples.Split(';');
                isSampleSame = SchedulerManager.CheckSampleQuantityComboSame(samplearray, true);
            }
            if (gifts != "")
            {
                string[] giftarray = gifts.Split(';');
                isGiftSame = SchedulerManager.CheckProductOrReminderComboSame(giftarray, true);
            }

            int bid = 0;
            //  Response.Write(start.TimeOfDay + ";" + s);
            if (start >= end)
            {
                datediff = true;
                //Response.Write("datediff");
                return "datediff;" + current.ToString("dd-ddd");
            }
            else if (inrange)
            {
                //Response.Write("outofrange");
                return "outofrange;" + current.ToString("dd-ddd");
            }
            else if (isClassFrequencyExceeded)
            {
                //Response.Write("classfrequencyexceeded");
                return "classfrequencyexceeded;" + current.ToString("dd-ddd");
            }
            else if (isProductSame)
            {
                //Response.Write("productsame");
                return "productsame;" + current.ToString("dd-ddd");
            }
            else if (isReminderSame)
            {
                //Response.Write("remindersame");
                return "remindersame;" + current.ToString("dd-ddd");
            }
            else if (isSampleSame)
            {
                return "samplesame;" + current.ToString("dd-ddd");
            }
            else if (isGiftSame)
            {
                return "giftsame;" + current.ToString("dd-ddd");
            }
            else if (isProductContainSelect)
            {
                //Response.Write("productcontainselect");
                return "productcontainselect;" + current.ToString("dd-ddd");
            }
            else if (isReminderContainSelect)
            {
                //Response.Write("remindercontainselect");
                return "remindercontainselect;" + current.ToString("dd-ddd");
            }
            else if (isSampleContainSelect)
            {
                return "samplecontainselect;" + current.ToString("dd-ddd");
            }
            else if (isGiftContainSelect)
            {
                return "giftcontainselect;" + current.ToString("dd-ddd");
            }
            else
            {
                int id = 0;
                id = SchedulerManager.CheckPlannerMonth(current, employeeid);
                if (id == 0)
                {
                    id = SchedulerManager.insertCallPlannerMonth(current, "", true, employeeid, Utility.STATUS_INPROCESS, "", 0);
                    if (id > 0)
                    {

                        recIns = SchedulerManager.InsertCallPlannerMIO(id, start, end, true, activity, doctorid, description, Utility.STATUS_INPROCESS, "", 0);
                        if (recIns > 0)
                        {
                            if (products != "")
                            {
                                int ordrby = 1;
                                string[] product = products.Split(';');
                                for (int i = 0; i < product.Length - 1; i++)
                                {
                                    if (product[i] != "-1")
                                    {
                                        SchedulerManager.InsertCallPlannerProduct(recIns, int.Parse(product[i]), ordrby);
                                        ordrby++;
                                    }
                                }

                            }
                            if (reminders != "")
                            {
                                int ordrby = 1;
                                string[] reminder = reminders.Split(';');
                                for (int i = 0; i < reminder.Length - 1; i++)
                                {
                                    if (reminder[i] != "-1")
                                    {
                                        SchedulerManager.InsertCallPlannerReminder(recIns, int.Parse(reminder[i]), ordrby);
                                        ordrby++;
                                    }
                                }

                            }
                            if (samples != "")
                            {
                                int orderby = 1;
                                string[] sample = samples.Split(';');
                                for (int i = 0; i < sample.Length - 1; i++)
                                {
                                    if (sample[i].Split('|')[0] != "-1")
                                    {
                                        SchedulerManager.InsertCallPlannerSamples(recIns, int.Parse(sample[i].Split('|')[0]), int.Parse(sample[i].Split('|')[1]), orderby);
                                        orderby++;
                                    }
                                }
                            }
                            if (gifts != "")
                            {
                                int orderby = 1;
                                string[] gift = gifts.Split(';');
                                for (int i = 0; i < gift.Length - 1; i++)
                                {
                                    if (gift[i] != "-1")
                                    {
                                        SchedulerManager.InsertCallPlannerGifts(recIns, int.Parse(gift[i]), orderby);
                                        orderby++;
                                    }
                                }
                            }
                        }
                        if (bmdid != -1)
                        {
                            bid = SchedulerManager.insertCallPlannerBMDCoordinator(recIns, bmdid, DateTime.Now, DateTime.Now, 0);
                        }
                    }
                }
                else
                {
                    recIns = SchedulerManager.InsertCallPlannerMIO(id, start, end, true, activity, doctorid, description, Utility.STATUS_INPROCESS, "", 0);
                    if (recIns > 0)
                    {
                        if (products != "")
                        {
                            int orderby = 1;
                            string[] product = products.Split(';');
                            for (int i = 0; i < product.Length - 1; i++)
                            {
                                if (product[i] != "-1")
                                {
                                    SchedulerManager.InsertCallPlannerProduct(recIns, int.Parse(product[i]), orderby);
                                    orderby++;
                                }
                            }

                        }
                        if (reminders != "")
                        {
                            int orderby = 1;
                            string[] reminder = reminders.Split(';');
                            for (int i = 0; i < reminder.Length - 1; i++)
                            {
                                if (reminder[i] != "-1")
                                {
                                    SchedulerManager.InsertCallPlannerReminder(recIns, int.Parse(reminder[i]), orderby);
                                    orderby++;
                                }
                            }

                        }
                        if (samples != "")
                        {
                            int orderby = 1;
                            string[] sample = samples.Split(';');
                            for (int i = 0; i < sample.Length - 1; i++)
                            {
                                if (sample[i].Split('|')[0] != "-1")
                                {
                                    SchedulerManager.InsertCallPlannerSamples(recIns, int.Parse(sample[i].Split('|')[0]), int.Parse(sample[i].Split('|')[1]), orderby);
                                    orderby++;
                                }
                            }
                        }
                        if (gifts != "")
                        {
                            int orderby = 1;
                            string[] gift = gifts.Split(';');
                            for (int i = 0; i < gift.Length - 1; i++)
                            {
                                if (gift[i] != "-1")
                                {
                                    SchedulerManager.InsertCallPlannerGifts(recIns, int.Parse(gift[i]), orderby);
                                    orderby++;
                                }
                            }
                        }
                    }
                    if (bmdid != -1)
                    {
                        bid = SchedulerManager.insertCallPlannerBMDCoordinator(recIns, bmdid, DateTime.Now, DateTime.Now, 0);
                    }
                }
                string res = activity + ";" + doctorid + ";" + start + ";" + end + ";" + description + ";" + ActivitiesCollection.Instance[activity].name + ";" + ActivitiesCollection.Instance[activity].color + ";" + ActivitiesCollection.Instance[activity].tcolor + ";" + id + ";" + recIns + ";" + Utility.STATUS_INPROCESS + ";" + "" + ";" + 0 + ";" + true + ";" + current + ";" + classid.ToString() + ";" + brickid.ToString() + ";" + products.Replace(";", "*") + ";" + reminders.Replace(";", "*") + ";" + samples.Replace(";", "*") + ";" + gifts.Replace(";", "*");
                Events e1 = new Events(recIns, ActivitiesCollection.Instance[activity].name, start, end, Convert.ToInt64(doctorid));
                EventCollection.Instance.AddEvent(e1);
                //Response.Write(res);
                return res;
            }
            //Response.Write("PARTY" + ";" + 12 + ";" + 1 + ";" + 1 + "," + "VISIT" + ";" + + 1 + ";" + 2 + ";" + 3);
            //     Response.Write(id);
        }*/

        //public string InsertCallPlannerMonthDetails()
        //{
        //    Boolean inrange = false;
        //    Boolean datediff = false;
        //    Boolean isClassFrequencyExceeded = false;
        //    Boolean isProductSame = false;
        //    Boolean isReminderSame = false;
        //    Boolean isSampleSame = false;
        //    Boolean isGiftSame = false;
        //    Boolean isProductContainSelect = false;
        //    Boolean isReminderContainSelect = false;
        //    Boolean isSampleContainSelect = false;
        //    Boolean isGiftContainSelect = false;
        //    int employeeid = Convert.ToInt32(HttpContext.Current.Session["CurrentUserId"]);
        //    //  int id = int.Parse(Request.QueryString["id"].ToString());
        //    DateTime current = DateTime.Parse(Request.QueryString["date"].ToString()).ToUniversalTime().AddHours(5);
        //    int activity = int.Parse(Request.QueryString["activity"].ToString());
        //    int doctorid = 0;//int.Parse(Request.QueryString["doctor"].ToString());
        //    if (Request.QueryString["doctor"].ToString().Split('-')[0].ToString() == "Doc")
        //    {
        //        string doctor = Request.QueryString["doctor"].ToString().Split('-')[1];
        //        _nv.Clear();
        //        _nv.Add("@Doccode-int", doctor);
        //        DataSet ds = dl.GetData("sp_check_drid", _nv);
        //        if (ds.Tables[0].Rows.Count != 0)
        //        {

        //        }
        //        else
        //        {
        //            _nv.Clear();
        //            _nv.Add("@Doccode-int", doctor);
        //            dl.InserData("sp_insert_drid", _nv);
        //            ds = dl.GetData("sp_check_drid", _nv);
        //        }
        //        doctorid = int.Parse(ds.Tables[0].Rows[0]["DoctorId"].ToString());
        //    }
        //    else
        //    {
        //        doctorid = int.Parse(Request.QueryString["doctor"].ToString());
        //    }


        //    var bmdid = Request.QueryString["bmd"] != "" ? int.Parse(Request.QueryString["bmd"]) : -1;
        //    string products = Request.QueryString["products"].ToString();
        //    string reminders = Request.QueryString["reminders"].ToString();
        //    string samples = Request.QueryString["samples"].ToString();
        //    string gifts = Request.QueryString["gifts"].ToString();

        //    int recIns = 0;
        //    DateTime start = DateTime.Parse(current.ToShortDateString() + " " + Request.QueryString["starttime"].ToString());
        //    DateTime end = DateTime.Parse(current.ToShortDateString() + " " + Request.QueryString["endtime"].ToString());
        //    string description = Request.QueryString["description"].ToString();
        //    string s = "";

        //    int classid = SchedulerManager.getClassesByDoctor(doctorid);
        //    int brickid = SchedulerManager.getBricksByDoctor(doctorid);
        //    for (int i = 0; i < EventCollection.Instance.eventsList.Count; i++)
        //    {
        //        //s += EventCollection.Instance.eventsList[i].end.TimeOfDay + ";";

        //        if (current.ToShortDateString() == EventCollection.Instance.eventsList[i].start.ToShortDateString())
        //        {
        //            //  
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

        //        //block becuase novartis wants to add doctor call is frequency exceeded, if want to revert back just uncomment the below code
        //        //if (classid != -1)
        //        //{
        //        //    int count = EventCollection.Instance.GetCurrentCountByDoctorClass(doctorid);
        //        //    DoctorClass doctorClass = DoctorClassesCollection.Instance[classid];
        //        //    if (doctorClass != null && count > 0)
        //        //    {
        //        //        if (count >= doctorClass.ClassFrequency)
        //        //            isClassFrequencyExceeded = true;
        //        //    }
        //        //}

        //    }

        //    if (products != "")
        //    {
        //        string[] product = products.Split(';');
        //        //isProductContainSelect = SchedulerManager.CheckProductOrReminderConatinsSelect(product);
        //        if (!isProductContainSelect)
        //            isProductSame = SchedulerManager.CheckProductOrReminderComboSame(product, true);

        //    }
        //    if (reminders != "")
        //    {
        //        string[] reminder = reminders.Split(';');
        //        //isReminderContainSelect = SchedulerManager.CheckProductOrReminderConatinsSelect(reminder);
        //        if (!isReminderContainSelect)
        //            isReminderSame = SchedulerManager.CheckProductOrReminderComboSame(reminder, true);
        //    }
        //    if (samples != "")
        //    {
        //        string[] samplearray = samples.Split(';');
        //        isSampleSame = SchedulerManager.CheckSampleQuantityComboSame(samplearray, true);
        //    }
        //    if (gifts != "")
        //    {
        //        string[] giftarray = gifts.Split(';');
        //        isGiftSame = SchedulerManager.CheckProductOrReminderComboSame(giftarray, true);
        //    }

        //    int bid = 0;
        //    //  Response.Write(start.TimeOfDay + ";" + s);
        //    if (start >= end)
        //    {
        //        datediff = true;
        //        //Response.Write("datediff");
        //        return "datediff;" + current.ToString("dd-ddd");
        //    }
        //    else if (inrange)
        //    {
        //        //Response.Write("outofrange");
        //        return "outofrange;" + current.ToString("dd-ddd");
        //    }
        //    else if (isClassFrequencyExceeded)
        //    {
        //        //Response.Write("classfrequencyexceeded");
        //        return "classfrequencyexceeded;" + current.ToString("dd-ddd");
        //    }
        //    else if (isProductSame)
        //    {
        //        //Response.Write("productsame");
        //        return "productsame;" + current.ToString("dd-ddd");
        //    }
        //    else if (isReminderSame)
        //    {
        //        //Response.Write("remindersame");
        //        return "remindersame;" + current.ToString("dd-ddd");
        //    }
        //    else if (isSampleSame)
        //    {
        //        return "samplesame;" + current.ToString("dd-ddd");
        //    }
        //    else if (isGiftSame)
        //    {
        //        return "giftsame;" + current.ToString("dd-ddd");
        //    }
        //    else if (isProductContainSelect)
        //    {
        //        //Response.Write("productcontainselect");
        //        return "productcontainselect;" + current.ToString("dd-ddd");
        //    }
        //    else if (isReminderContainSelect)
        //    {
        //        //Response.Write("remindercontainselect");
        //        return "remindercontainselect;" + current.ToString("dd-ddd");
        //    }
        //    else if (isSampleContainSelect)
        //    {
        //        return "samplecontainselect;" + current.ToString("dd-ddd");
        //    }
        //    else if (isGiftContainSelect)
        //    {
        //        return "giftcontainselect;" + current.ToString("dd-ddd");
        //    }
        //    else
        //    {
        //        int id = 0;
        //        id = SchedulerManager.CheckPlannerMonth(current, employeeid);
        //        if (id == 0)
        //        {
        //            id = SchedulerManager.insertCallPlannerMonth(current, "", true, employeeid, Utility.STATUS_INPROCESS, "", 0);
        //            if (id > 0)
        //            {

        //                recIns = SchedulerManager.InsertCallPlannerMIO(id, start, end, true, activity, doctorid, description, Utility.STATUS_INPROCESS, "", 0);
        //                if (recIns > 0)
        //                {
        //                    if (products != "")
        //                    {
        //                        int ordrby = 1;
        //                        string[] product = products.Split(';');
        //                        for (int i = 0; i < product.Length - 1; i++)
        //                        {
        //                            if (product[i] != "-1")
        //                            {
        //                                SchedulerManager.InsertCallPlannerProduct(recIns, int.Parse(product[i]), ordrby);
        //                                ordrby++;
        //                            }
        //                        }

        //                    }
        //                    if (reminders != "")
        //                    {
        //                        int ordrby = 1;
        //                        string[] reminder = reminders.Split(';');
        //                        for (int i = 0; i < reminder.Length - 1; i++)
        //                        {
        //                            if (reminder[i] != "-1")
        //                            {
        //                                SchedulerManager.InsertCallPlannerReminder(recIns, int.Parse(reminder[i]), ordrby);
        //                                ordrby++;
        //                            }
        //                        }

        //                    }
        //                    if (samples != "")
        //                    {
        //                        int orderby = 1;
        //                        string[] sample = samples.Split(';');
        //                        for (int i = 0; i < sample.Length - 1; i++)
        //                        {
        //                            if (sample[i].Split('|')[0] != "-1")
        //                            {
        //                                SchedulerManager.InsertCallPlannerSamples(recIns, int.Parse(sample[i].Split('|')[0]), int.Parse(sample[i].Split('|')[1]), orderby);
        //                                orderby++;
        //                            }
        //                        }
        //                    }
        //                    if (gifts != "")
        //                    {
        //                        int orderby = 1;
        //                        string[] gift = gifts.Split(';');
        //                        for (int i = 0; i < gift.Length - 1; i++)
        //                        {
        //                            if (gift[i] != "-1")
        //                            {
        //                                SchedulerManager.InsertCallPlannerGifts(recIns, int.Parse(gift[i]), orderby);
        //                                orderby++;
        //                            }
        //                        }
        //                    }
        //                }
        //                if (bmdid != -1)
        //                {
        //                    bid = SchedulerManager.insertCallPlannerBMDCoordinator(recIns, bmdid, DateTime.Now, DateTime.Now, 0);
        //                }
        //            }
        //        }
        //        else
        //        {
        //            recIns = SchedulerManager.InsertCallPlannerMIO(id, start, end, true, activity, doctorid, description, Utility.STATUS_INPROCESS, "", 0);
        //            if (recIns > 0)
        //            {
        //                if (products != "")
        //                {
        //                    int orderby = 1;
        //                    string[] product = products.Split(';');
        //                    for (int i = 0; i < product.Length - 1; i++)
        //                    {
        //                        if (product[i] != "-1")
        //                        {
        //                            SchedulerManager.InsertCallPlannerProduct(recIns, int.Parse(product[i]), orderby);
        //                            orderby++;
        //                        }
        //                    }

        //                }
        //                if (reminders != "")
        //                {
        //                    int orderby = 1;
        //                    string[] reminder = reminders.Split(';');
        //                    for (int i = 0; i < reminder.Length - 1; i++)
        //                    {
        //                        if (reminder[i] != "-1")
        //                        {
        //                            SchedulerManager.InsertCallPlannerReminder(recIns, int.Parse(reminder[i]), orderby);
        //                            orderby++;
        //                        }
        //                    }

        //                }
        //                if (samples != "")
        //                {
        //                    int orderby = 1;
        //                    string[] sample = samples.Split(';');
        //                    for (int i = 0; i < sample.Length - 1; i++)
        //                    {
        //                        if (sample[i].Split('|')[0] != "-1")
        //                        {
        //                            SchedulerManager.InsertCallPlannerSamples(recIns, int.Parse(sample[i].Split('|')[0]), int.Parse(sample[i].Split('|')[1]), orderby);
        //                            orderby++;
        //                        }
        //                    }
        //                }
        //                if (gifts != "")
        //                {
        //                    int orderby = 1;
        //                    string[] gift = gifts.Split(';');
        //                    for (int i = 0; i < gift.Length - 1; i++)
        //                    {
        //                        if (gift[i] != "-1")
        //                        {
        //                            SchedulerManager.InsertCallPlannerGifts(recIns, int.Parse(gift[i]), orderby);
        //                            orderby++;
        //                        }
        //                    }
        //                }
        //            }
        //            if (bmdid != -1)
        //            {
        //                bid = SchedulerManager.insertCallPlannerBMDCoordinator(recIns, bmdid, DateTime.Now, DateTime.Now, 0);
        //            }
        //        }
        //        string res = activity + ";" + doctorid + ";" + start + ";" + end + ";" + description + ";" + ActivitiesCollection.Instance[activity].name + ";" + ActivitiesCollection.Instance[activity].color + ";" + ActivitiesCollection.Instance[activity].tcolor + ";" + id + ";" + recIns + ";" + Utility.STATUS_INPROCESS + ";" + "" + ";" + 0 + ";" + true + ";" + current + ";" + classid.ToString() + ";" + brickid.ToString() + ";" + products.Replace(";", "*") + ";" + reminders.Replace(";", "*") + ";" + samples.Replace(";", "*") + ";" + gifts.Replace(";", "*");
        //        Events e1 = new Events(recIns, ActivitiesCollection.Instance[activity].name, start, end, Convert.ToInt64(doctorid));
        //        EventCollection.Instance.AddEvent(e1);
        //        //Response.Write(res);
        //        return res;
        //    }
        //    //Response.Write("PARTY" + ";" + 12 + ";" + 1 + ";" + 1 + "," + "VISIT" + ";" + + 1 + ";" + 2 + ";" + 3);
        //    //     Response.Write(id);
        //}



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
        public void getfrequencybydoctor()
        {
            int employeeid = Convert.ToInt32(HttpContext.Current.Session["CurrentUserId"]);
            int frequency = 0;
            try
            {
                long doctorid = Convert.ToInt64(Request.QueryString["doctorid"]);
                if (doctorid != -1)
                {
                    int classid = SchedulerManager.getClassesByDoctor(doctorid);
                    if (classid != -1)
                    {
                        int count = EventCollection.Instance.GetCurrentCountByDoctorClass(doctorid);
                        //DoctorClass doctorClass = DoctorClassesCollection.Instance[classid]; /* Commented By Kashif Because the Frequency to be picked up from Doctors of spo PocketDCR Like*/
                        DataTable dtrecord = SchedulerManager.getMRDoctorWithClassFreq(employeeid, (int)doctorid);
                        if (dtrecord != null && dtrecord.Rows.Count > 0 && count > 0)
                        {
                            if (count >= Convert.ToInt32(dtrecord.Rows[0]["frequency"]))
                                frequency = 0;
                            else
                                frequency = Convert.ToInt32(dtrecord.Rows[0]["frequency"]) - count;

                        }
                        else if (dtrecord != null && dtrecord.Rows.Count > 0) frequency = Convert.ToInt32(dtrecord.Rows[0]["frequency"]);
                    }
                }
            }
            catch (Exception ex)
            {
            }
            if (frequency > 0) // recurring through dates are only possible when adding a new event, so frequency should be 1 less because that event should entered in that day
                frequency--;

            Response.Write(frequency.ToString());
        }
        public void getProductsbyDoctorSpeciality()
        {
            StringBuilder sbProducts = new StringBuilder();
            StringBuilder sbReminders = new StringBuilder();
            try
            {

                long doctorid = Convert.ToInt64(Request.QueryString["doctorid"]);
                if (doctorid != -1)
                {
                    int specialityID = SchedulerManager.getSpecialityByDoctor(doctorid);
                    if (specialityID != -1)
                    {

                        DataTable dt = SchedulerManager.getProductsWithSpecialitiesBySpecialityID(specialityID);
                        foreach (DataRow dr in dt.Rows)
                        {
                            if (dr["CPS_TYPE"].ToString() == "P")
                            {
                                sbProducts.Append(dr["fk_CPS_PRO_ProductID"]);
                                sbProducts.Append(";");
                            }
                            else if (dr["CPS_TYPE"].ToString() == "R")
                            {
                                sbReminders.Append(dr["fk_CPS_PRO_ProductID"]);
                                sbReminders.Append(";");
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
            }
            if (sbProducts.Length > 1)
            {
                sbProducts.Remove(sbProducts.Length - 1, 1);
            }
            else
            {
                sbProducts = new StringBuilder();
                sbProducts.Append("-1;-1;-1;-1");
            }
            if (sbReminders.Length > 1)
            {
                sbReminders.Remove(sbReminders.Length - 1, 1);
            }
            else
            {
                sbReminders = new StringBuilder();
                sbReminders.Append("-1;-1;-1;-1");
            }

            Response.Write(sbProducts.ToString() + "#" + sbReminders.ToString());
        }
        public void filldates()
        {
            DateTime current = DateTime.Parse(Request.QueryString["date"].ToString()).ToUniversalTime().AddHours(5);
            int datesInMonth = DateTime.DaysInMonth(current.Year, current.Month);
            DateTime newDate;
            StringBuilder sb = new StringBuilder();
            for (int i = 1; i <= datesInMonth; i++)
            {
                newDate = new DateTime(current.Year, current.Month, i);
                sb.Append(newDate.ToString("dd-ddd"));
                sb.Append(";");
            }

            if (sb.Length > 0)
                sb.Length -= 1;

            //Response.Write(DateTime.DaysInMonth(current.Year, current.Month).ToString() + ";" + current.ToString("MMM"));
            Response.Write(sb.ToString());
        }
        public void fillProducts()
        {
            ////int mioid = int.Parse(Request.QueryString["mioid"].ToString());
            DataTable lsDT = SchedulerManager.getProducts();
            StringBuilder str = new StringBuilder("");
            for (int i = 0; i < lsDT.Rows.Count; i++)
            {
                str.Append(lsDT.Rows[i]["ID"].ToString());
                str.Append(",");
                str.Append(lsDT.Rows[i]["Name"].ToString());
                str.Append(";");
            }
            if (str.Length > 0)
                str.Length -= 1;
            Response.Write(str);
            ////Response.Write("PARTY" + ";" + 12 + ";" + 1 + ";" + 1 + "," + "VISIT" + ";" + + 1 + ";" + 2 + ";" + 3);

            //SortedDictionary<int, Product> products = ProductCollection.Instance.productList;
            //StringBuilder str = new StringBuilder("");
            //foreach (Product prd in products.Values)
            //{
            //    str.Append(prd.ProductID);
            //    str.Append(",");
            //    str.Append(prd.ProductName);
            //    str.Append(";");
            //}
            //if (str.Length > 0)
            //    str.Length -= 1;
            //Response.Write(str);

        }


        public void fillGifts()
        {
            ////int mioid = int.Parse(Request.QueryString["mioid"].ToString());
            //DataTable lsDT = SchedulerManager.getProducts();
            //StringBuilder str = new StringBuilder("");
            //for (int i = 0; i < lsDT.Rows.Count; i++)
            //{
            //    str.Append(lsDT.Rows[i]["ID"].ToString());
            //    str.Append(",");
            //    str.Append(lsDT.Rows[i]["Name"].ToString());
            //    str.Append(";");
            //}
            //if (str.Length > 0)
            //    str.Length -= 1;
            //Response.Write(str);
            ////Response.Write("PARTY" + ";" + 12 + ";" + 1 + ";" + 1 + "," + "VISIT" + ";" + + 1 + ";" + 2 + ";" + 3);

            SortedDictionary<int, Gift> gifts = GiftsCollection.Instance.GiftList;
            StringBuilder str = new StringBuilder("");
            foreach (Gift prd in gifts.Values)
            {
                str.Append(prd.GiftID);
                str.Append(",");
                str.Append(prd.GiftName);
                str.Append(";");
            }
            if (str.Length > 0)
                str.Length -= 1;
            Response.Write(str);

        }

        public void fillClasses()
        {
            int mioid = int.Parse(HttpContext.Current.Session["MIOid"].ToString());
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

        public void fillClasseswithdate()
        {
            int mioid = int.Parse(HttpContext.Current.Session["MIOid"].ToString());
            DateTime initial = DateTime.Parse(Request.QueryString["initial"].ToString());
            DataTable lsDT = SchedulerManager.getClasseswithdate(mioid, initial);
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
            int mioid = int.Parse(HttpContext.Current.Session["MIOid"].ToString());
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

        public void fillBrickswithdate()
        {
            int mioid = int.Parse(HttpContext.Current.Session["MIOid"].ToString());
            DateTime initial = DateTime.Parse(Request.QueryString["initial"].ToString());
            DataTable lsDT = SchedulerManager.getBrickswithdate(mioid, initial);
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
            int mioid = int.Parse(HttpContext.Current.Session["MIOid"].ToString());
            DataTable lsDT = SchedulerManager.getDoctors(mioid);
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

        public void ProcessGetDoctorsDateTime()
        {
            int mioid = int.Parse(HttpContext.Current.Session["MIOid"].ToString());
            DateTime initial = DateTime.Parse(Request.QueryString["initial"].ToString());
            DataTable lsDT = SchedulerManager.getDoctorsWithDate(mioid,initial);
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
        public void ProcessGetDoctorsWithClassName()
        {
            int mioid = int.Parse(HttpContext.Current.Session["MIOid"].ToString());
            DataTable lsDT = SchedulerManager.getDoctors(mioid);
            StringBuilder str = new StringBuilder("");
            for (int i = 0; i < lsDT.Rows.Count; i++)
            {
                str.Append(lsDT.Rows[i]["DoctorId"].ToString());
                str.Append(",");
                str.Append(SchedulerManager.GetPuriedString(lsDT.Rows[i]["FirstName"].ToString()) + " - " + SchedulerManager.getClassNameByDoctor(Convert.ToInt64(lsDT.Rows[i]["DoctorId"].ToString())));
                str.Append(";");
            }
            if (str.Length > 0)
                str.Length -= 1;
            Response.Write(str);
        }

        public void ProcessGetDoctorsWithClassNamewithdate()
        {
            int mioid = int.Parse(HttpContext.Current.Session["MIOid"].ToString());
            DateTime initial = DateTime.Parse(Request.QueryString["initial"].ToString());
            DataTable lsDT = SchedulerManager.getDoctorsWithDate(mioid, initial);
            StringBuilder str = new StringBuilder("");
            for (int i = 0; i < lsDT.Rows.Count; i++)
            {
                str.Append(lsDT.Rows[i]["DoctorId"].ToString());
                str.Append(",");
                str.Append(SchedulerManager.GetPuriedString(lsDT.Rows[i]["FirstName"].ToString()) + " - " + SchedulerManager.getClassNameByDoctor(Convert.ToInt64(lsDT.Rows[i]["DoctorId"].ToString())));
                str.Append(";");
            }
            if (str.Length > 0)
                str.Length -= 1;
            Response.Write(str);
        }

        public void ProcessGetDoctorsbyBrick()
        {
            int mioid = int.Parse(HttpContext.Current.Session["MIOid"].ToString());
            string brickid = Request.QueryString["brickid"].ToString();
            DataTable lsDT = new DataTable();
            if (brickid == "-1")
            {
                lsDT = SchedulerManager.getDoctors(mioid);
            }
            else
            {
                lsDT = SchedulerManager.getDoctorsbyBrick(mioid, Convert.ToInt32(brickid));
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

        public void ProcessGetDoctorsbyBrickWithdate()
        {
            int mioid = int.Parse(HttpContext.Current.Session["MIOid"].ToString());
            string brickid = Request.QueryString["brickid"].ToString();
            DateTime initial = DateTime.Parse(Request.QueryString["initial"].ToString());
            DataTable lsDT = new DataTable();
            if (brickid == "-1")
            {
                lsDT = SchedulerManager.getDoctorsWithDate(mioid, initial);
            }
            else
            {
                lsDT = SchedulerManager.getDoctorsbyBrickWithdate(mioid, Convert.ToInt32(brickid), initial);
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
            int mioid = int.Parse(HttpContext.Current.Session["MIOid"].ToString());
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

        public void ProcessGetDoctorsbyClassWithDate()
        {
            int mioid = int.Parse(HttpContext.Current.Session["MIOid"].ToString());
            int classid = int.Parse(Request.QueryString["classid"].ToString());
            DateTime initial = DateTime.Parse(Request.QueryString["initial"].ToString());
            DataTable lsDT = new DataTable();
            if (classid == -1)
            {
                //lsDT = SchedulerManager.getDoctors(mioid);
                lsDT = SchedulerManager.getDoctorsWithDate(mioid, initial);
            }
            else
            {
                lsDT = SchedulerManager.getDoctorsbyClassWithDate(mioid, classid, initial);
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
        public void ProcessGetActivities()
        {
            //DataTable lsDT = SchedulerManager.getActivities();
            //for (int i = 0; i < lsDT.Rows.Count; i++)
            //{
            //    str.Append(lsDT.Rows[i]["pk_CPA_CallPlannerActivityID"].ToString());
            //    str.Append(",");
            //    str.Append(lsDT.Rows[i]["CPA_Name"].ToString());
            //    str.Append(",");
            //    str.Append(lsDT.Rows[i]["CPA_NoOfProducts"].ToString());
            //    str.Append(",");
            //    str.Append(lsDT.Rows[i]["CPA_NoOfReminders"].ToString());
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
            //Response.Write("PARTY" + ";" + 12 + ";" + 1 + ";" + 1 + "," + "VISIT" + ";" + + 1 + ";" + 2 + ";" + 3);

        }
        public void ProcessGetEvents()
        {
            lock (thisLock)
            {
                int employeeid = Convert.ToInt32(HttpContext.Current.Session["CurrentUserId"]);
                DateTime initial = DateTime.Parse(Request.QueryString["initial"].ToString());

                string mainDoctorID = "-1";
                if (Request.QueryString["doctor"] != null)
                    mainDoctorID = Request.QueryString["doctor"].ToString();

                DataTable lsDT = SchedulerManager.getEvents(employeeid, initial);
                DateTime current = DateTime.Now;

                EventCollection.Instance.Clear();
                //loadevents(employeeid, initial);

                StringBuilder str = new StringBuilder("");
                for (int i = 0; i < lsDT.Rows.Count; i++)
                {
                    Events e = new Events(int.Parse(lsDT.Rows[i]["plannerID"].ToString()), lsDT.Rows[i]["ActName"].ToString(), DateTime.Parse(lsDT.Rows[i]["startdate"].ToString()), DateTime.Parse(lsDT.Rows[i]["enddate"].ToString()), Convert.ToInt64(lsDT.Rows[i]["DoctorID"].ToString()));
                    EventCollection.Instance.AddEvent(e);

                    bool isContinue = true;

                    if (mainDoctorID != "-1")
                    {
                        if (mainDoctorID != lsDT.Rows[i]["DoctorID"].ToString())
                            isContinue = false;
                    }
                    if (isContinue)
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
                        str.Append(lsDT.Rows[i]["DoctorName"].ToString());
                        str.Append(";");
                       
                        if (initial.Month == DateTime.Parse(lsDT.Rows[i]["planMonth"].ToString()).Month)
                        {
                            str.Append(lsDT.Rows[i]["mstatus"].ToString());
                        }
                        str.Append(";");
                        if (initial.Month == DateTime.Parse(lsDT.Rows[i]["planMonth"].ToString()).Month)
                        {
                            str.Append(Utility.GetStatusColor(lsDT.Rows[i]["mstatus"].ToString()));
                        }
                        str.Append(";");
                        //str.Append(SchedulerManager.ProcessGetInformedJVs(Convert.ToInt32(lsDT.Rows[i]["plannerID"].ToString()))); // to Check JV
                        //str.Append(";");
                        //str.Append(SchedulerManager.GetProductsAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                        //str.Append(";");
                        //str.Append(SchedulerManager.getClassesByDoctor(Convert.ToInt64(lsDT.Rows[i]["DoctorID"].ToString())));
                        //str.Append(";");
                        //str.Append(SchedulerManager.getBricksByDoctor(Convert.ToInt64(lsDT.Rows[i]["DoctorID"].ToString())));
                        //str.Append(";");
                        //str.Append(SchedulerManager.GetRemindersAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                        //str.Append(";");
                        //str.Append(SchedulerManager.GetSamplesAndQuantityAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                        //str.Append(";");
                        //str.Append(SchedulerManager.GetGiftsAgainstCallPlannerMIOLevelID(Convert.ToInt64(lsDT.Rows[i]["plannerID"].ToString())));
                        //str.Append(";");
                        str.Append(lsDT.Rows[i]["CreationDateTime"].ToString());
                        str.Append(";");
                        str.Append(lsDT.Rows[i]["DocBrick"].ToString());                        
                        str.Append("~");
                    }
                }

                if (str.Length > 0)
                    str.Length -= 1;
                //   str.Length -= 1;
                Response.Write(str);
                //Response.Write("PARTY" + ";" + 12 + ";" + 1 + ";" + 1 + "," + "VISIT" + ";" + + 1 + ";" + 2 + ";" + 3);
            }
        }

        public void ProcessGetEventsSummary()
        {
            lock (thisLock)
            {
                int employeeid = Convert.ToInt32(HttpContext.Current.Session["CurrentUserId"]);
                int id = 0;
                string comments = "";
                DateTime initial = DateTime.Parse(Request.QueryString["initial"].ToString());
                if (Request.QueryString["mioid"] != null)
                {
                    employeeid = int.Parse(Request.QueryString["mioid"]);
                }

                string mainDoctorID = "-1";
                if (Request.QueryString["doctor"] != null)
                    mainDoctorID = Request.QueryString["doctor"].ToString();

                //loadevents(employeeid, initial);

                DataTable lsDT = new DataTable();
                if (mainDoctorID == "-1" || mainDoctorID == "")
                    lsDT = SchedulerManager.getEventsSummary(employeeid, initial);
                else
                    lsDT = SchedulerManager.getEventsSummaryByDoctorID(employeeid, initial, Convert.ToInt64(mainDoctorID));

                DateTime current = DateTime.Now;

                DataTable lsDTMIOMontly = SchedulerManager.GetMIOMonthlyEventsByPlanMonth(employeeid, initial);
                if (lsDTMIOMontly.Rows.Count > 0)
                {
                    if (lsDTMIOMontly.Rows[0]["CPM_PlanStatus"].ToString() == Utility.STATUS_REJECTED)
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
                    str.Length -= 1;
                //   str.Length -= 1;
                Response.Write(str);
                //Response.Write("PARTY" + ";" + 12 + ";" + 1 + ";" + 1 + "," + "VISIT" + ";" + + 1 + ";" + 2 + ";" + 3);
            }
        }


        public void ProcessGetEventsSummarybyactivityid()
        {
            int id = 0;
            int actid = 0;
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
            DataTable lsDT = SchedulerManager.getEventsSummary(employeeid, actid);
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
                //if (initial.Month == DateTime.Parse(lsDT.Rows[i]["planMonth"].ToString()).Month)
                //{
                //    str.Append(lsDT.Rows[i]["mstatus"].ToString());
                //}
                str.Append(",");

            }
            //   str.Length -= 1;
            Response.Write(str);
            //Response.Write("PARTY" + ";" + 12 + ";" + 1 + ";" + 1 + "," + "VISIT" + ";" + + 1 + ";" + 2 + ";" + 3);

        }

        public void ProcessGetEventDetails()
        {
            string actname = Request.QueryString["actname"];
            DateTime startdate = DateTime.Parse(Request.QueryString["start"]);
            StringBuilder res = new StringBuilder("");
            for (int i = 0; i < EventCollection.Instance.eventsList.Count; i++)
            {
                if (EventCollection.Instance.eventsList[i].start.ToShortDateString() == startdate.ToShortDateString() && EventCollection.Instance.eventsList[i].name.ToLower() == actname.ToLower())
                {
                    res.Append(EventCollection.Instance.eventsList[i].name);
                    res.Append(";");
                    res.Append(EventCollection.Instance.eventsList[i].start.ToString("HH:mm"));
                    res.Append(";");
                    res.Append(EventCollection.Instance.eventsList[i].end.ToString("HH:mm"));
                    res.Append(";");
                    res.Append(EventCollection.Instance.eventsList[i].id);
                    res.Append(";");
                    res.Append(",");
                }
            }

            if (res.Length > 1)
                res.Length -= 1;

            Response.Write(res);
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

        public void ProcessDeleteEvent()
        {

            int id = int.Parse(Request.QueryString["id"].ToString());
            SchedulerManager.deleteCallPlannerProducts(id);
            SchedulerManager.deleteCallPlannerReminders(id);
            SchedulerManager.deleteCallPlannerSamples(id);
            SchedulerManager.deleteCallPlannerGifts(id);
            SchedulerManager.deleteBMDCoordinator(id);
            SchedulerManager.deleteEvent(id);
            EventCollection.Instance.RemoveEvent(id);
            //for (int i = 0; i < EventCollection.Instance.eventsList.Count; i++)
            //{
            //    if (EventCollection.Instance.eventsList[i].id == id)
            //    {
            //        EventCollection.Instance.eventsList.RemoveAt(i);
            //    }
            //}
            ////Response.Write(str);
            ////Response.Write("PARTY" + ";" + 12 + ";" + 1 + ";" + 1 + "," + "VISIT" + ";" + + 1 + ";" + 2 + ";" + 3);

        }

        //public void ProcessUpdateEvents()
        //{
        //    int id = int.Parse(Request.QueryString["id"].ToString());
        //    string title = Request.QueryString["title"].ToString();
        //    string start = Request.QueryString["start"].ToString();
        //    string end = Request.QueryString["end"].ToString();
        //    string color = Request.QueryString["color"].ToString();
        //    SchedulerManager.updateEvents(id, title, start, end, color);
        // //   Response.Write(str);
        //    //Response.Write("PARTY" + ";" + 12 + ";" + 1 + ";" + 1 + "," + "VISIT" + ";" + + 1 + ";" + 2 + ";" + 3);

        //}
        //public void ProcessAddEvent()
        //{
        //  //  int id = int.Parse(Request.QueryString["id"].ToString());
        //    string title = Request.QueryString["title"].ToString();
        //    string start = Request.QueryString["start"].ToString();
        //    string end = Request.QueryString["end"].ToString();
        //    string color = Request.QueryString["color"].ToString();
        //    int id = SchedulerManager.addEvents( title, start, end, color);
        //    //   Response.Write(str);
        //    //Response.Write("PARTY" + ";" + 12 + ";" + 1 + ";" + 1 + "," + "VISIT" + ";" + + 1 + ";" + 2 + ";" + 3);
        //    Response.Write(id);
        //}

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }


        public string copyplanforday()
        {
            DateTime CopyFromDate = DateTime.Parse(Request.QueryString["CopyFromDate"].ToString());
            DateTime CopyForDate = DateTime.Parse(Request.QueryString["CopyForDate"].ToString());
            int employeeid = Convert.ToInt32(HttpContext.Current.Session["CurrentUserId"]);
            int Checkid = 0;
            var recIns = 0;

            Checkid = SchedulerManager.CheckPlannerMonth(CopyForDate, employeeid);
            if (Checkid == 0)
            {
                Checkid = SchedulerManager.insertCallPlannerMonth(CopyForDate, "", true, employeeid, Utility.STATUS_INPROCESS, "", 0);
                if (Checkid > 0)
                {
                    recIns = SchedulerManager.CopyPlan(Checkid, employeeid, CopyFromDate, CopyForDate);
                }
            }
            else
            {
                recIns = SchedulerManager.CopyPlan(Checkid, employeeid, CopyFromDate, CopyForDate);
            }

            return "Plan Copied;" + CopyForDate.ToString("dd-ddd");
        }


        public void checkCurrentPlanStatus() {

            int empId = 0;//= Int32.Parse(Request.QueryString["empId"].ToString());
            DateTime initial = DateTime.Parse(Request.QueryString["initial"].ToString());
            if (HttpContext.Current.Request.QueryString["empId"] != null)
                empId = int.Parse(HttpContext.Current.Request.QueryString["empId"].ToString());
            else
                empId = int.Parse(HttpContext.Current.Session["CurrentUserId"].ToString());

            DataTable lsDT = SchedulerManager.CheckPlanStatus(empId, initial);
            DataTable fDT = SchedulerManager.CheckPlanStatusFrequency(empId, initial);

            StringBuilder str = new StringBuilder("");
            str.Append("<h1>The Plan Status For The Current Month:</h1><br /><br />");



            //lsDT.Compute("SUM(TotalDoctors)", "").ToString();

            if (lsDT.Rows.Count > 0)
            {
                str.Append("<b>Total Planned  Doctors: " + lsDT.Compute("SUM(PlannedDoctors)", "").ToString() + "</b><br />");
                str.Append("<b>Total Assigned Doctors: " + lsDT.Compute("SUM(TotalDoctors)", "").ToString() + "</b><br /> <br />");

                for (int i = 0; i < lsDT.Rows.Count; i++)
                {
                    str.Append("<b>Doctors For Class: </b><span>" + lsDT.Rows[i]["ClassName"].ToString() + "</span><br />");
                    str.Append("<b>Planned : </b><span>" + lsDT.Rows[i]["PlannedDoctors"].ToString() + "</span> - ");
                    str.Append("<b>Total: </b><span>" + lsDT.Rows[i]["TotalDoctors"].ToString() + "</span><br /> <br />");
                }

                if (fDT.Rows.Count > 0) {
                    for (int i = 0; i < fDT.Rows.Count; i++)
                    {
                        str.Append("<b>Doctors For Frequency: </b><span>" + fDT.Rows[i]["Frequency"].ToString() + "</span><br />");
                        str.Append("<b>Planned : </b><span>" + fDT.Rows[i]["PlannedDoctors"].ToString() + "</span> - ");
                        str.Append("<b>Total: </b><span>" + fDT.Rows[i]["TotalDoctors"].ToString() + "</span><br /> <br />");
                    }
                    str.Append("<b>Total Leaves: " + fDT.Rows[0]["TotalLeave"].ToString() + "</b><br /> <br />");
                }
            }
            else str.Clear().Append("<h1>Sorry, But No Data Found On Server</h1>");

            Response.Write(str);

        }



    }





}