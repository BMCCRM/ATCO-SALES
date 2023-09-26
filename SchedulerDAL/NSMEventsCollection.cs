using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace SchedulerDAL
{
    public class NSMEvents
    {
        public int id;
        public int mioid;
        public int employeeid;
        public int monthid;
        public string description;
        public bool informed;
        public DateTime start;
        public DateTime end;

        public NSMEvents(int id, int employeeid, int monthid, int mioid, string description, bool informed, DateTime start, DateTime end)
        {
            this.id = id;
            this.employeeid = employeeid;
            this.monthid = monthid;
            this.mioid = mioid;
            this.description = SchedulerManager.GetPuriedString(description);
            this.informed = informed;
            this.start = start;
            this.end = end;
        }
    }

    public class NSMEventsCollection
    {
        #region Attributes
        private static NSMEventsCollection instance = new NSMEventsCollection();        
        private object mutex = new object();
        #endregion

        #region Methods
        public void AddEvent(NSMEvents obj)
        {
            lock (mutex)
            {
                List<NSMEvents> NSMEventsList = new List<NSMEvents>();

                if (HttpContext.Current.Session["NSMEvents"] != null)
                    NSMEventsList = (List<NSMEvents>)HttpContext.Current.Session["NSMEvents"];

                NSMEventsList.Add(obj);

                HttpContext.Current.Session["NSMEvents"] = NSMEventsList;
            }            
        }
        public void Clear()
        {
            lock (mutex)
            {
                if (HttpContext.Current.Session["NSMEvents"] != null)
                {
                    List<NSMEvents> NSMEventsList = (List<NSMEvents>)HttpContext.Current.Session["NSMEvents"];
                    NSMEventsList.Clear();
                }
            }                 
        }
        #endregion

        #region Properties

        public static NSMEventsCollection Instance
        {
            get
            {
                return instance;
            }
        }
        public List<NSMEvents> NSMEventsList
        {
            get
            {
                lock (mutex)
                {
                    if (HttpContext.Current.Session["NSMEvents"] != null)
                        return (List<NSMEvents>)HttpContext.Current.Session["NSMEvents"];
                    else
                        return new List<NSMEvents>();
                }
            }
        }
        #endregion
    }
}
