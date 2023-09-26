using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SchedulerDAL
{
    public class Activities
    {
        public int id;
        public string name;
        public string description;
        public string color;
        public string tcolor;
        public int noofproducts;
        public int noofreminders;
        public int noofsamples;
        public int noofGifs;
        public Activities(int id, string name, string description, string color, string tcolor, int noofproducts, int noofreminders ,int noofsample,int noofgift)
        {
            this.id = id;
            this.name = SchedulerManager.GetPuriedString(name);
            this.description = SchedulerManager.GetPuriedString(description);
            this.color = color;
            this.tcolor = tcolor;
            this.noofproducts = noofproducts;
            this.noofreminders = noofreminders;
            noofsamples = noofsample;
            noofGifs = noofgift;
        }
    }
    public class ActivitiesCollection // contains contries collection stored by country code
        {
            #region Attributes
            private static ActivitiesCollection instance = new ActivitiesCollection(); // static instance of current class
            private SortedList<int, Activities> activitiesList = new SortedList<int, Activities>(); // sorted list collection of countries with country code as key
            private object mutex = new object();
            #endregion

            #region Methods
            public void AddActivity(Activities obj) // adds a new country object to its collection
            {
                lock (mutex)
                {
                    if (!activitiesList.ContainsKey(obj.id))
                        activitiesList.Add(obj.id, obj);
                }
            }
            public void Clear() // clears the countries collection
            {
                lock (mutex)
                {
                    activitiesList.Clear();
                }
            }
            #endregion

            #region Properties

            public static ActivitiesCollection Instance // returns the static instance of current class
            {
                get
                {
                    return instance;
                }
            }

            public Activities this[int activityid] // returns a particular countries object searched by its code
            {
                get
                {
                    //if (activitiesList.ContainsKey(activityid))
                        return activitiesList[activityid];
                   // else return 0;
                }
            }
            public SortedList<int, Activities> ActivitiesList
            {
                get
                {
                    lock (mutex)
                    {
                        return activitiesList;
                    }
                        
                }
            }
          
            #endregion
        }
}

