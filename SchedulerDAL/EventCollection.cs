using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;


namespace SchedulerDAL
{
    public class Events
    {
        public int id;
        public string name;
        public DateTime start;
        public DateTime end;
        public long DoctorID;

        public Events(int id, string name, DateTime start, DateTime end, long doctorid)
        {
            this.id = id;
            this.name = SchedulerManager.GetPuriedString(name);
            this.start = start;
            this.end = end;
            this.DoctorID = doctorid;
        }
    }
    public class EventCollection
    { 
            #region Attributes
            private static EventCollection instance = new EventCollection(); // static instance of current class       
            private object mutex = new object();
            private object mutex1 = new object();
            #endregion

            #region Methods
            public void AddEvent(Events obj)
            {
                int classid = SchedulerManager.getClassesByDoctor(obj.DoctorID);
                lock (mutex)
                {
                    List<Events> eventsList = new List<Events>();
                    if (HttpContext.Current.Session["EventList"] != null)
                        eventsList = (List<Events>)HttpContext.Current.Session["EventList"];

                    eventsList.Add(obj);
                    HttpContext.Current.Session["EventList"] = eventsList;
                }
                AddDoctorClass(obj.DoctorID);
            }
            public void Clear() // clears the countries collection
            {
                lock (mutex)
                {
                    if (HttpContext.Current.Session["EventList"] != null)
                    {
                        List<Events> eventsList = (List<Events>)HttpContext.Current.Session["EventList"];
                        eventsList.Clear();
                    }
                }
                lock(mutex1)
                {
                    if (HttpContext.Current.Session["ClassWiseCount"] != null)
                    {
                        Dictionary<long, int> ClassWiseCount = (Dictionary<long, int>)HttpContext.Current.Session["ClassWiseCount"];
                        ClassWiseCount.Clear();
                    }
                }
            }
            #endregion

            #region Properties

            public static EventCollection Instance // returns the static instance of current class
            {
                get
                {
                    return instance;
                }
            }
            public List<Events> eventsList
            {
                get
                {
                    lock (mutex)
                    {
                        if (HttpContext.Current.Session["EventList"] != null)
                            return (List<Events>)HttpContext.Current.Session["EventList"];
                        else
                            return new List<Events>();
                    }
                }
            }
            public int GetCurrentCountByDoctorClass(long DoctorID)
            {
                lock (mutex1)
                {
                    int count = 0;
                    if (HttpContext.Current.Session["ClassWiseCount"] != null)
                    {
                        Dictionary<long, int> ClassWiseCount = (Dictionary<long, int>)HttpContext.Current.Session["ClassWiseCount"];
                        if (ClassWiseCount.ContainsKey(DoctorID))
                            count = ClassWiseCount[DoctorID];
                    }
                    return count;
                }
            }
            public void RemoveEvent(int id)
            {
                long doctorID = -1;
                lock (mutex)
                {                    
                    if (HttpContext.Current.Session["EventList"] != null)
                    {
                        List<Events> eventsList = (List<Events>)HttpContext.Current.Session["EventList"];
                        for (int i = 0; i < eventsList.Count; i++)
                        {
                            if (eventsList[i].id == id)
                            {
                                doctorID = eventsList[i].DoctorID;
                                eventsList.RemoveAt(i);
                            }
                        }
                        HttpContext.Current.Session["EventList"] = eventsList;
                    }
                }
                RemoveDoctorClass(doctorID);                   
            }
            public void RemoveDoctorClass(long doctorID)
            {
                lock (mutex1)
                {
                    if (doctorID != -1)
                    {
                        Dictionary<long, int> ClassWiseCount = new Dictionary<long, int>(); //key is Doctor id, value is count
                        if (HttpContext.Current.Session["ClassWiseCount"] != null)
                        {
                            ClassWiseCount = (Dictionary<long, int>)HttpContext.Current.Session["ClassWiseCount"];
                            if (ClassWiseCount.ContainsKey(doctorID))
                            {
                                int count = ClassWiseCount[doctorID];
                                count--;
                                ClassWiseCount[doctorID] = count;
                            }                            
                        }
                        HttpContext.Current.Session["ClassWiseCount"] = ClassWiseCount;
                    }
                }
            }
            public void AddDoctorClass(long doctorID)
            {
                lock (mutex1)
                {
                    if (doctorID != -1)
                    {
                        Dictionary<long, int> ClassWiseCount = new Dictionary<long, int>(); //key is class id, value is count
                        if (HttpContext.Current.Session["ClassWiseCount"] != null)
                        {
                            ClassWiseCount = (Dictionary<long, int>)HttpContext.Current.Session["ClassWiseCount"];
                            if (ClassWiseCount.ContainsKey(doctorID))
                            {
                                int count = ClassWiseCount[doctorID];
                                count++;
                                ClassWiseCount[doctorID] = count;
                            }
                            else
                            {
                                ClassWiseCount.Add(doctorID, 1);
                            }
                        }
                        else
                        {
                            ClassWiseCount.Add(doctorID, 1);
                        }
                        HttpContext.Current.Session["ClassWiseCount"] = ClassWiseCount;
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
