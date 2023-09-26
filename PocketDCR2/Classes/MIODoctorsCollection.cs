using System.Collections.Generic;
using System.Data;

namespace PocketDCR2.Classes
{
    public class MIODoctorsCollection
    {

        #region Attributes
        private static readonly MIODoctorsCollection instance = new MIODoctorsCollection();
        private readonly SortedList<int, DataSet> mioDocCollection = new SortedList<int, DataSet>();
        private readonly object mutex = new object();
        #endregion

        #region Methods
        public void AddMioDoctors(int employeeid, DataSet docs)
        {
            lock (mutex)
            {
                if (!mioDocCollection.ContainsKey(employeeid))
                    mioDocCollection.Add(employeeid, docs);
            }
        }
        public void Clear()
        {
            lock (mutex)
            {
                mioDocCollection.Clear();
            }
        }

        #endregion

        #region Properties

        public static MIODoctorsCollection Instance
        {
            get { return instance; }
        }

        public DataSet this[int employeeid]
        {
            get { return mioDocCollection[employeeid]; }
        }

        public SortedList<int, DataSet> MioDoctorClassList
        {
            get
            {
                lock (mutex)
                {
                    return mioDocCollection;
                }
            }
        }

        #endregion
    }
}