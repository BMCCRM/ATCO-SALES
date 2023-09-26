using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace SchedulerDAL
{
    public class RSMEvents
    {
        public int id;
        public int mioid;
        public int employeeid;
        public int monthid;
        public string description;
        public bool informed;
        public DateTime start;
        public DateTime end;

        public RSMEvents(int id, int employeeid, int monthid, int mioid, string description, bool informed, DateTime start, DateTime end)
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
    public class RSMEventsCollection
    {
        #region Attributes
        private static RSMEventsCollection instance = new RSMEventsCollection();
        private object mutex = new object();
        #endregion

        #region Methods
        public void AddEvent(RSMEvents obj)
        {
            lock (mutex)
            {
                List<RSMEvents> RSMEventsList = new List<RSMEvents>();
                if (HttpContext.Current.Session["RSMEvents"] != null)
                    RSMEventsList = (List<RSMEvents>)HttpContext.Current.Session["RSMEvents"];

                RSMEventsList.Add(obj);
                HttpContext.Current.Session["RSMEvents"] = RSMEventsList;
            }                  
        }
        public void Clear()
        {
            lock (mutex)
            {
                if (HttpContext.Current.Session["RSMEvents"] != null)
                {
                    List<RSMEvents> RSMEventsList = (List<RSMEvents>)HttpContext.Current.Session["RSMEvents"];
                    RSMEventsList.Clear();
                }
            }                 
        }
        #endregion

        #region Properties

        public static RSMEventsCollection Instance 
        {
            get
            {
                return instance;
            }
        }
        public List<RSMEvents> RSMEventsList
        {
            get
            {
                lock (mutex)
                {
                    if (HttpContext.Current.Session["RSMEvents"] != null)
                        return (List<RSMEvents>)HttpContext.Current.Session["RSMEvents"];
                    else
                        return new List<RSMEvents>();
                }
            }
        }
        #endregion
    }
}
