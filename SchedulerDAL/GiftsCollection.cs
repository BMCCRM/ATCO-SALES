using System.Collections.Generic;

namespace SchedulerDAL
{
    public class Gift
    {
        public int GiftID;
        public string GiftName;
        public Gift(int giftID, string giftName)
        {
            GiftID = giftID;
            GiftName = SchedulerManager.GetPuriedString(giftName);
        }
    }

    public class GiftsCollection
    {
        #region Attributes
// ReSharper disable InconsistentNaming
        private static GiftsCollection instance = new GiftsCollection();
// ReSharper restore InconsistentNaming
        public SortedDictionary<int, Gift> GiftList = new SortedDictionary<int, Gift>();
        private readonly object _mutex = new object();
        #endregion

        #region Methods
        public void AddGift(Gift obj)
        {
            lock (_mutex)
            {
                if (!GiftList.ContainsKey(obj.GiftID))
                    GiftList.Add(obj.GiftID, obj);
            }
        }
        public void Clear() // clears the countries collection
        {
            lock (_mutex)
            {
                GiftList.Clear();
            }
        }
        #endregion

        #region Properties

        public static GiftsCollection Instance
        {
            get
            {
                return instance;
            }
        }

        public Gift this[int giftID]
        {
            get
            {
                return GiftList[giftID];
            }
        }

        #endregion

    }
}
