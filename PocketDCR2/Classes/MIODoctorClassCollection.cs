using System.Collections.Generic;
using System.Data;
namespace PocketDCR2.Classes
{
    public class MIODoctorClassCollection
    {
        #region Attributes
        private static readonly MIODoctorClassCollection instance = new MIODoctorClassCollection();
        private readonly SortedList<int, DataSet> mioDocClassCollection = new SortedList<int, DataSet>();
        private readonly object mutex = new object();
        #endregion

        #region Methods
        public void AddMioDoctorClass(int employeeid, DataSet DoctorClass)
        {
            lock (mutex)
            {
                if (!mioDocClassCollection.ContainsKey(employeeid))
                    mioDocClassCollection.Add(employeeid, DoctorClass);
            }
        }
        public void Clear()
        {
            lock (mutex)
            {
                mioDocClassCollection.Clear();
            }
        }

        #endregion

        #region Properties

        public static MIODoctorClassCollection Instance
        {
            get { return instance; }
        }

        public DataSet this[int employeeid]
        {
            get { return mioDocClassCollection[employeeid]; }
        }

        public SortedList<int, DataSet> MioDoctorClassList
        {
            get
            {
                lock (mutex)
                {
                    return mioDocClassCollection;
                }
            }
        }

        #endregion
    }
}