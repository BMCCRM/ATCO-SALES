using System.Collections.Generic;
using System.Data;
namespace PocketDCR2.Classes
{
    #region Classes

    public class MIOBrickCollection
    {
        #region Attributes 
        private  static readonly MIOBrickCollection instance = new MIOBrickCollection();
        private readonly SortedList<int,DataSet> mioBrickCollection = new SortedList<int, DataSet>();
        private readonly object mutex = new object();
        #endregion

        #region Methods
        public void AddMioBrick(int employeeid,DataSet brick)
        {
            lock (mutex)
            {
                if(!mioBrickCollection.ContainsKey(employeeid))
                    mioBrickCollection.Add(employeeid,brick);
            }
        }
        public  void Clear()
        {
            lock(mutex)
            {
                mioBrickCollection.Clear();
            }
        }

        #endregion 

        #region Properties

        public static MIOBrickCollection Instance
        {
            get { return instance; }
        }

        public DataSet this[int employeeid]
        {
            get { return mioBrickCollection[employeeid]; }
        }

        public SortedList<int, DataSet> brickList
        {
            get
            {
                lock(mutex)
                {
                    return mioBrickCollection;
                }
            }
        }

        #endregion
    }

    #endregion
}