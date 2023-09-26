using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SchedulerDAL
{
    public class DoctorClass
    {
        public int ClassID;
        public string ClassName;
        public int ClassFrequency;
        public DoctorClass(int classID, string className, int classFrequency)
        {
            this.ClassID = classID;
            this.ClassName = className;
            this.ClassFrequency = classFrequency;
        }
    }
    public class DoctorClassesCollection 
    {
        #region Attributes
        private static DoctorClassesCollection instance = new DoctorClassesCollection();
        public SortedDictionary<int, DoctorClass> doctorClassList = new SortedDictionary<int, DoctorClass>();
        private object mutex = new object();
        #endregion

        #region Methods
        public void AddDoctorClass(DoctorClass obj)
        {
            lock (mutex)
            {
                if (!doctorClassList.ContainsKey(obj.ClassID))
                    doctorClassList.Add(obj.ClassID, obj);
            }
        }
        public void Clear() // clears the countries collection
        {
            lock (mutex)
            {
                doctorClassList.Clear();
            }
        }
        #endregion

        #region Properties

        public static DoctorClassesCollection Instance
        {
            get
            {
                return instance;
            }
        }

        public DoctorClass this[int ClassID] 
        {
            get
            {
                if (doctorClassList.ContainsKey(ClassID))
                    return doctorClassList[ClassID];
                else
                   return null;
            }
        }

        #endregion
    }
}

