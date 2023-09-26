using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SchedulerDAL
{
    public class Product
    {
        public int ProductID;
        public string ProductName;        
        public Product(int productID, string productName)
        {
            this.ProductID = productID;
            this.ProductName = SchedulerManager.GetPuriedString(productName);           
        }
    }

    public class ProductCollection 
    {
        #region Attributes
        private static ProductCollection instance = new ProductCollection();
        public SortedDictionary<int, Product> productList = new SortedDictionary<int, Product>();
        private object mutex = new object();
        #endregion

        #region Methods
        public void AddProduct(Product obj)
        {
            lock (mutex)
            {
                if (!productList.ContainsKey(obj.ProductID))
                    productList.Add(obj.ProductID, obj);
            }
        }
        public void Clear() // clears the countries collection
        {
            lock (mutex)
            {
                productList.Clear();
            }
        }
        #endregion

        #region Properties

        public static ProductCollection Instance
        {
            get
            {
                return instance;
            }
        }

        public Product this[int ProductID] 
        {
            get
            {                
                return productList[ProductID];                
            }
        }

        #endregion
    }
}

