using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SchedulerDAL
{
    public class Holidays
    {
        public int id;
        public DateTime Date;

        public Holidays(int id, DateTime date)
        {
            this.id = id;
            this.Date = date;
        }
    }

    public class HolidaysCollection
    {
        #region Attributes
        private static HolidaysCollection instance = new HolidaysCollection(); // static instance of current class
        public List<Holidays> holidayList = new List<Holidays>(); // sorted list collection of countries with country code as key
        private object mutex = new object();
        #endregion

        #region Methods
        public void AddHoliday(Holidays obj) // adds a new country object to its collection
        {
            lock (mutex)
            {
                holidayList.Add(obj);
            }
        }
        public void Clear() // clears the countries collection
        {
            lock (mutex)
            {
                holidayList.Clear();
            }
        }
        #endregion

        #region Properties

        public static HolidaysCollection Instance // returns the static instance of current class
        {
            get
            {
                return instance;
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
