using LinqToExcel;
using PocketDCR2.Classes;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Web;
using System.Configuration;
using PocketDCR2.IMSBrickUploaderRelation;
using System.Collections;
using System.Globalization;
using OfficeOpenXml;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;


namespace PocketDCR2.Handler
{
    /// <summary>
    /// Summary description for IMSBrickUploader
    /// </summary>
    public class IMSBrickUploader : IHttpHandler, System.Web.SessionState.IRequiresSessionState
    {
        NameValueCollection _nv = new NameValueCollection();
        DAL DL = new DAL();
        private PocketDCR2.IMSBrickUploaderRelation.CCLPharmaEntities db = new PocketDCR2.IMSBrickUploaderRelation.CCLPharmaEntities();
        string EmployeeID = string.Empty;
        string FileName1 = string.Empty;
        string guid = string.Empty;

        public void ProcessRequest(HttpContext context)
        {
            string type = context.Request.QueryString["Type"];
            if (type == "U")
            {
                uploadwork(context);
            }
            else if (type == "IMSBU")
            {
                IMSBUReadexcel(context);
            }
        }

        public void uploadwork(HttpContext contxt)
        {

            HttpContext.Current.Session["guid"] = Guid.NewGuid().ToString();
            contxt.Response.ContentType = "text/plain";
            contxt.Response.Expires = -1;
            try
            {
                HttpPostedFile postedFile = contxt.Request.Files["Filedata"];
                string savepath = "";
                string tempPath = "";
                tempPath = @"C:\PocketDCR2\Excel\IMSBU";
                savepath = tempPath;
                string filename = HttpContext.Current.Session["guid"] + postedFile.FileName;
                if (!Directory.Exists(savepath))
                    Directory.CreateDirectory(savepath);
                postedFile.SaveAs(savepath + @"\" + filename);
                contxt.Response.Write(filename);
                FileName1 = tempPath + "/" + filename;
                contxt.Response.StatusCode = 200;


            }
            catch (Exception ex)
            {
                contxt.Response.Write("Error: " + ex.Message);
            }
        }

        public void IMSBUReadexcel(HttpContext context)
        {
            string result = string.Empty;
            try
            {
                string savepath = "";
                string tempPath = "";
                tempPath = @"C:\PocketDCR2\Excel\IMSBU";
                savepath = tempPath;
                string FileName = context.Request.QueryString["FileName"];
                string FileNamePath = context.Request.QueryString["PFileName"];
                result = IMSBUReadExcelFile(FileName, FileNamePath);
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

        private string IMSBUReadExcelFile(string FileName, string FileNamePath)
        {

            var currentUser = "";
            int lastInsertedId = 0;
            int UserId = 0;
            try
            {

                currentUser = HttpContext.Current.Session["SystemUser"].ToString();
                UserId = Convert.ToInt32(HttpContext.Current.Session["CurrentUserId"]);
                var tempPath = @"C:\PocketDCR2\Excel\IMSBU";
                Tbl_UploadFilePath_IMSBrick uploadIMSBricksMaster = new Tbl_UploadFilePath_IMSBrick();
                FileName = FileName.Replace(" ", "_");
                uploadIMSBricksMaster.ExecuteFileName = tempPath + @"\" + FileNamePath;
                uploadIMSBricksMaster.FileName = FileNamePath;
                uploadIMSBricksMaster.EmpID = UserId;
                uploadIMSBricksMaster.ProcessStatus = false;
                uploadIMSBricksMaster.Remarks = "NotProcess";
                uploadIMSBricksMaster.CreatDate = DateTime.Now;
                db.Tbl_UploadFilePath_IMSBrick.Add(uploadIMSBricksMaster);
                db.SaveChanges();
                lastInsertedId = uploadIMSBricksMaster.PkID;

                FileName = FileName.Replace(" ", "_");
                string sheetname = "Sheet1";

                // Check DataBase Column Name
                ArrayList CheckDataBaseColumn = new ArrayList();
                CheckDataBaseColumn.Add("Territory");
                CheckDataBaseColumn.Add("BrickCode");
                CheckDataBaseColumn.Add("BrickName");
                CheckDataBaseColumn.Add("DistricName");
              
                    var excelFile = new ExcelQueryFactory(@"C:\PocketDCR2\Excel\IMSBU\" + uploadIMSBricksMaster.FileName);
                    var newlist = (from a in excelFile.Worksheet<Tbl_IMSBrick_Tem>(sheetname) select a).ToList();

                    if (CheckDataBaseColumn[0].ToString() == excelFile.GetColumnNames(sheetname).ToArray()[0] && CheckDataBaseColumn[1].ToString() == excelFile.GetColumnNames(sheetname).ToArray()[1] && CheckDataBaseColumn[2].ToString() == excelFile.GetColumnNames(sheetname).ToArray()[2] && CheckDataBaseColumn[3].ToString() == excelFile.GetColumnNames(sheetname).ToArray()[3])
                    {
                   

                    newlist.ForEach(p =>
                    {
                        p.Fk_FileID = lastInsertedId;
                        p.CreateDate = DateTime.Now;
                        p.Status = false;
                        p.Flag = "U";
                    });
                    var batchlst = (newlist.AsQueryable().Partition(50000));
                    foreach (var list in batchlst)
                    {
                        db.BulkInsert(list, operation => operation.BatchSize = 5000);
                    }
                    return "Success";
                }
                else
                {
                    return "Column not match";
                }
            }



            catch (Exception ex)
            {
                Constants.ErrorLog("IMSBU : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                return "Error Occured";
            }
        }


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