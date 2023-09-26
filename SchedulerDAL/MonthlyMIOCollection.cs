using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace SchedulerDAL
{
    public class monthlyEvents
    {
        public int id;
        public int employeeid;
        public DateTime month;
        public bool isEditable;
        public string status;
        public monthlyEvents(int id, int employeeid, DateTime month,bool isEditable, string status)
        {
            this.id = id;
            this.employeeid = employeeid;
            this.month = month;
            this.isEditable = isEditable;
            this.status = status;
        }
    }
    public class MonthlyMIOCollection
    {
        #region Attributes
        private static MonthlyMIOCollection instance = new MonthlyMIOCollection(); // static instance of current class
        private object mutex = new object();
        #endregion

        #region Methods
        public void AddEvent(monthlyEvents obj) // adds a new country object to its collection
        {
            lock (mutex)
            {
                List<monthlyEvents> monthlyEventsList = new List<monthlyEvents>();

                if (HttpContext.Current.Session["MonthlyEvents"] != null)
                    monthlyEventsList = (List<monthlyEvents>)HttpContext.Current.Session["MonthlyEvents"];

                monthlyEventsList.Add(obj);

                HttpContext.Current.Session["MonthlyEvents"] = monthlyEventsList;
            }            
        }
        public void Clear() // clears the countries collection
        {
            lock (mutex)
            {
                if (HttpContext.Current.Session["MonthlyEvents"] != null)
                {
                    List<monthlyEvents> monthlyEventsList = (List<monthlyEvents>)HttpContext.Current.Session["MonthlyEvents"];
                    monthlyEventsList.Clear();
                }
            }            
        }
        #endregion

        #region Properties

        public static MonthlyMIOCollection Instance // returns the static instance of current class
        {
            get
            {
                return instance;
            }
        }
        public List<monthlyEvents> monthlyEventsList
        {
            get
            {
                lock (mutex)
                {
                    if (HttpContext.Current.Session["MonthlyEvents"] != null)
                        return (List<monthlyEvents>)HttpContext.Current.Session["MonthlyEvents"];
                    else
                        return new List<monthlyEvents>();
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
