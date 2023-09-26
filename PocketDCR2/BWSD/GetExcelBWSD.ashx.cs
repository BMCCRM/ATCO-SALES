using OfficeOpenXml;
using PocketDCR2.Classes;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using LinqToExcel;
using System.Collections;
using System.Globalization;

namespace PocketDCR2.BWSD
{
    /// <summary>
    /// Summary description for GetExcelBWSD
    /// </summary>
    public class GetExcelBWSD : IHttpHandler, System.Web.SessionState.IRequiresSessionState
    {
        #region Object Intialization
        NameValueCollection _nv = new NameValueCollection();
        DAL DL = new DAL();
        private HudsonCRMEntities2 db = new HudsonCRMEntities2();
        string employeeid = string.Empty;
        string filename1 = string.Empty;
        #endregion

        public void ProcessRequest(HttpContext context)
        {
            //context.Response.ContentType = "text/plain";
            //context.Response.Write("Hello World");
            string type = context.Request.QueryString["Type"];

            if (type == "U")
            {
                uploadwork(context);
            }
            else if (type == "PF")
            {
                Readexcel(context);
            }
            else if (type == "DSR")
            {
                DSRReadexcel(context);
            }
            else if (type == "DSRProcess")
            {
                DSRDataProcess(context);
            }  
        }

        public void uploadwork(HttpContext contxt)
        {
            //string Date = contxt.Request.QueryString["date"];
            //DateTime MonthDate = Convert.ToDateTime(Date);

            contxt.Response.ContentType = "text/plain";
            contxt.Response.Expires = -1;
            try
            {
                HttpPostedFile postedFile = contxt.Request.Files["Filedata"];
                string savepath = "";
                string tempPath = "";
                tempPath = @"C:\PocketDCR2\Excel\BWSD";
                savepath = tempPath;
                string filename = postedFile.FileName;
                if (!Directory.Exists(savepath))
                    Directory.CreateDirectory(savepath);
                postedFile.SaveAs(savepath + @"\" + filename);
                contxt.Response.Write(tempPath + "/" + filename);
                filename1 = tempPath + "/" + filename;
                contxt.Response.StatusCode = 200;

            }
            catch (Exception ex)
            {
                contxt.Response.Write("Error: " + ex.Message);
            }
        }

        public void Readexcel(HttpContext context)
        {
            string result = string.Empty;
            try
            {
                string savepath = "";
                string tempPath = "";
                tempPath = @"C:\PocketDCR2\Excel\BWSD";
                savepath = tempPath;
                string FileName = context.Request.QueryString["FileName"];
                string MonthOfSalesData = context.Request.QueryString["MonthOfSalesData"];
                //string EmployeeID = contxt.Request.QueryString["emp"];
                result = ReadExcelFile(savepath + @"\" + FileName, MonthOfSalesData);
                if (result == "Success")
                    result = "Your File Has been Processed Successfully";
                else
                    result = "Your File Not Processed Successfully";
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }
            context.Response.Write(result);
        }

        private string ReadExcelFile(string FileName, string MonthOfSalesData)
        {
            #region Commented

            try
            {
                DateTime dtMonthOfSalesData = DateTime.ParseExact(MonthOfSalesData, "MM/dd/yyyy",
                                  CultureInfo.InvariantCulture);
                tbl_SalesDataBrickWise SalesDataBrickWise = new tbl_SalesDataBrickWise();
                SalesDataBrickWise.MonthOfSalesData = dtMonthOfSalesData;
                string sheetname = "Sheet1";
                var excelFile = new ExcelQueryFactory(FileName);
                excelFile.Worksheet<tbl_SalesDataBrickWise>(sheetname);
                var newlist = (from a in excelFile.Worksheet<tbl_SalesDataBrickWise>(sheetname)
                               select a).ToList();

                newlist.ForEach(p =>
                {
                    p.MonthOfSalesData = dtMonthOfSalesData;
                    p.CreateDate = DateTime.Now;
                });
                var batchlst = (newlist.AsQueryable().Partition(50000));
                foreach (var list in batchlst)
                {
                    db.BulkInsert(list, operation => operation.BatchSize = 5000);                    
                }
                return "Success";
                //var task1 = Task.Factory.StartNew(() => TaskMethod1(gold));
                //var task2 = Task.Factory.StartNew(() => TaskMethod2(silver));
                //var task3 = Task.Factory.StartNew(() => TaskMethod3(red));
                //var task4 = Task.Factory.StartNew(() => TaskMethod4(blue));
                //Task.WaitAll(task1, task2, task3, task4);
                //Parallel.Invoke(() => TaskMethod1(gold), () => TaskMethod2(silver), () => TaskMethod3(red), () => TaskMethod4(blue));

            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Brick Wise Sales Data : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                return "Error Occured";
            }
            #endregion
        }


        public void DSRReadexcel(HttpContext context)
        {
            string result = string.Empty;
            try
            {
                string savepath = "";
                string tempPath = "";
                tempPath = @"C:\PocketDCR2\Excel\BWSD";
                savepath = tempPath;
                string FileName = context.Request.QueryString["FileName"];
                //string MonthOfSalesData = context.Request.QueryString["MonthOfSalesData"];
                //string EmployeeID = contxt.Request.QueryString["emp"];
                result = DSRReadExcelFile(savepath + @"\" + FileName);
                if (result == "Success")
                    result = "Your File Has been Processed Successfully";
                else
                    result = "Your File Not Processed Successfully";
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }
            context.Response.Write(result);
        }
        private string DSRReadExcelFile(string FileName)
        {
            #region Commented

            try
            {
                string sheetname = "Sheet1";
                var excelFile = new ExcelQueryFactory(FileName);
                var newlist = (from a in excelFile.Worksheet<tbl_DailySaleReport_Temp>(sheetname) select a).ToList();

                // var invdate = newlist.Select(m => m.InvoiceDate).Distinct().ToList();
                // var CompareDSR = db.tbl_DailySaleReport.Where(x => x.InvoiceDate == ); 
                // newlist.ToList()[0].Units = "";
                // var sqldsr = db.tbl_DailySaleReport.Where(x => x.InvoiceNo == newlist[0].InvoiceNo).ToList();

                newlist.ForEach(p =>
                {
                    p.CreateDateSystem = DateTime.Now;
                    p.IsActive = false;
                    p.flag = "U";
                });
                var batchlst = (newlist.AsQueryable().Partition(50000));
                foreach (var list in batchlst)
                {
                    db.BulkInsert(list, operation => operation.BatchSize = 5000);
                    
                }

                return "Success";
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("DSR : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                return "Error Occured";
            }
            #endregion
        }

        private void DSRDataProcess(HttpContext context)
        {
            #region Commented
            string result = string.Empty;
            try
            {
                //Process Start Sp_ProcessDSRtemp
                var temptodsr = DL.GetData("Sp_ProcessDSRtemp", null);
                //Process Start Sp_ProcessDSR
                var pro = DL.GetData("Sp_ProcessDSR", null);

                result = "DSuccess";
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("DSR : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                result = "Error Occured";
            }
            #endregion

            context.Response.Write(result);
        }
        //public void LoadData(HttpContext context)
        //{
        //    string result = string.Empty;
        //    try
        //    {
        //        var data = (from a in db.tbl_SalesDataBrickWise
        //                    where a.CreateDate.Value.Day == DateTime.Now.Day &&
        //                    a.CreateDate.Value.Month == DateTime.Now.Month &&
        //                    a.CreateDate.Value.Year == DateTime.Now.Year
        //                    select a).Take(5000).ToList();
        //        DataTable dt = data.ToDataTable();
        //        result = dt.ToJsonString();
        //    }
        //    catch (Exception ex)
        //    {
        //        result = ex.Message;
        //    }
        //    context.Response.Write(result);
        //}
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }

    static class Extensions
    {
        public static IEnumerable<IEnumerable<T>> Batch<T>(
              this IEnumerable<T> source, int batchSize)
        {
            using (var enumerator = source.GetEnumerator())
                while (enumerator.MoveNext())
                    yield return YieldBatchElements(enumerator, batchSize - 1);
        }

        private static IEnumerable<T> YieldBatchElements<T>(
            IEnumerator<T> source, int batchSize)
        {
            yield return source.Current;
            for (int i = 0; i < batchSize && source.MoveNext(); i++)
                yield return source.Current;
        }
        public static IEnumerable<IEnumerable<T>> Partition<T>(this IEnumerable<T> items, int partitionSize)
        {
            return new PartitionHelper<T>(items, partitionSize);
        }

        private sealed class PartitionHelper<T> : IEnumerable<IEnumerable<T>>
        {
            readonly IEnumerable<T> items;
            readonly int partitionSize;
            bool hasMoreItems;

            internal PartitionHelper(IEnumerable<T> i, int ps)
            {
                items = i;
                partitionSize = ps;
            }

            public IEnumerator<IEnumerable<T>> GetEnumerator()
            {
                using (var enumerator = items.GetEnumerator())
                {
                    hasMoreItems = enumerator.MoveNext();
                    while (hasMoreItems)
                        yield return GetNextBatch(enumerator).ToList();
                }
            }

            IEnumerable<T> GetNextBatch(IEnumerator<T> enumerator)
            {
                for (int i = 0; i < partitionSize; ++i)
                {
                    yield return enumerator.Current;
                    hasMoreItems = enumerator.MoveNext();
                    if (!hasMoreItems)
                        yield break;
                }
            }

            IEnumerator IEnumerable.GetEnumerator()
            {
                return GetEnumerator();
            }
        }
    }
}