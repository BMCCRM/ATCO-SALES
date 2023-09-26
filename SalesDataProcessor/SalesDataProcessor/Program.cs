using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalesDataProcessor
{
    class Program
    {
        static void Main(string[] args)
        {

            
            new Classes.GeneratedSalesDataRecords();
           
            //(new SalesDataProcessor.Classes.SalesProcessInvoker()).SalesProcessInvoke();

            SalesDataProcessor.Classes.SalesRecordsDumpRunner.Instance.Start();
            //SalesDataProcessor.Classes.SalesRecordsProcessRunner.Instance.Start();
            Console.ReadLine();

        }
    }
}
