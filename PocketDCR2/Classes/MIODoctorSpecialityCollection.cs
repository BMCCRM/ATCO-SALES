using System.Collections.Generic;
using System.Data;

namespace PocketDCR2.Classes
{
    public class MIODoctorSpecialityCollection
    {
        #region Attributes
        private static readonly MIODoctorSpecialityCollection instance = new MIODoctorSpecialityCollection();
        private readonly SortedList<int, string> mioDocSpecCollection = new SortedList<int, string>();
        private readonly object mutex = new object();
        #endregion

        #region Methods
        public void AddMioDoctorSpec(int employeeid, DataSet docSpeciality)
        {
            lock (mutex)
            {
                if (!mioDocSpecCollection.ContainsKey(employeeid))
                    mioDocSpecCollection.Add(employeeid, docSpeciality.Tables[0].ToJsonString());
            }
        }
        public void Clear()
        {
            lock (mutex)
            {
                mioDocSpecCollection.Clear();
            }
        }

        #endregion

        #region Properties

        public static MIODoctorSpecialityCollection Instance
        {
            get { return instance; }
        }

        public string this[int employeeid]
        {
            get { return mioDocSpecCollection[employeeid]; }
        }

        public SortedList<int, string> MioDoctorClassList
        {
            get
            {
                lock (mutex)
                {
                    return mioDocSpecCollection;
                }
            }
        }

        #endregion
    }
}