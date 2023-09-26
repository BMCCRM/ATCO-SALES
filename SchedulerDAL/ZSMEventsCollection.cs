using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace SchedulerDAL
{
    public class ZSMEvents
    {
        public int id;
        public int mioid;
        public int employeeid;
        public int monthid;
        public bool isEditable;
        public string status;
        public string statusReason;
        public string description;
        public bool informed;
        public DateTime start;
        public DateTime end;

        public ZSMEvents(int id, int employeeid, int monthid, int mioid, bool isEditable, string status, string statusReason, string description, bool informed, DateTime start, DateTime end)
        {
            this.id = id;
            this.employeeid = employeeid;
            this.monthid = monthid;
            this.mioid = mioid;
            this.isEditable = isEditable;
            this.status = status;
            this.statusReason = SchedulerManager.GetPuriedString(statusReason);
            this.description = SchedulerManager.GetPuriedString(description);
            this.informed = informed;
            this.start = start;
            this.end = end;
        }
    }
    public class ZSMEventsCollection
    {
        #region Attributes
        private static ZSMEventsCollection instance = new ZSMEventsCollection(); // static instance of current class
        private object mutex = new object();
        #endregion

        #region Methods
        public void AddEvent(ZSMEvents obj) // adds a new country object to its collection
        {
            lock (mutex)
            {
                List<ZSMEvents> ZSMEventsList = new List<ZSMEvents>();
                if (HttpContext.Current.Session["ZSMEvents"] != null)
                    ZSMEventsList = (List<ZSMEvents>)HttpContext.Current.Session["ZSMEvents"];

                ZSMEventsList.Add(obj);
                HttpContext.Current.Session["ZSMEvents"] = ZSMEventsList;
            }                  
        }
        public void Clear() // clears the countries collection
        {
            lock (mutex)
            {
                if (HttpContext.Current.Session["ZSMEvents"] != null)
                {
                    List<ZSMEvents> ZSMEventsList = (List<ZSMEvents>)HttpContext.Current.Session["ZSMEvents"];
                    ZSMEventsList.Clear();
                }
            }                
        }
        #endregion

        #region Properties

        public static ZSMEventsCollection Instance // returns the static instance of current class
        {
            get
            {
                return instance;
            }
        }
        public List<ZSMEvents> ZSMEventsList
        {
            get
            {
                lock (mutex)
                {
                    if (HttpContext.Current.Session["ZSMEvents"] != null)
                        return (List<ZSMEvents>)HttpContext.Current.Session["ZSMEvents"];
                    else
                        return new List<ZSMEvents>();
                }
            }
        }
        //public Events this[int eventid] // returns a particular countries object searched by its code
        //{
        //    get
        //    {
        //        //if (activitiesList.ContainsKey(activityid))
        //        return eventsList[eventid];
        //       // else return 0;
        //    }
        //}

        #endregion
    }
}
