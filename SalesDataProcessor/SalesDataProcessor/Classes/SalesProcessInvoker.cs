using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalesDataProcessor.Classes
{
    class SalesProcessInvoker
    {


        private DAL _dal;
        private DAL DataLayer
        {
            get
            {
                if (_dal != null)
                {
                    return _dal;
                }
                return _dal = new DAL();
            }
            set { _dal = value; }
        }

        //public SalesProcessInvoker() {

        //    //(DataLayer).GetData("sp_SalesProcessInvoker", null);


        //}

        public bool SalesProcessInvoke() {

            DateTime date = DateTime.Now;
            Console.WriteLine("Processing Of Records Starts At :: " + date);

             var wait = (DataLayer).GetData("sp_SalesProcessInvoker", null);

             Console.WriteLine("Whole Process Completed After : " + (DateTime.Now - date).TotalSeconds);
             return true;
        }



    }
}
