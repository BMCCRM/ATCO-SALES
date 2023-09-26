using System;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Data;
using PocketDCR2.Classes;
using Ionic.Zip;
using System.Web.Script.Services;
using System.Configuration;
using System.Globalization;


namespace PocketDCR2.SalesMod
{
    /// <summary>
    /// Summary description for ZipUploader
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
     [System.Web.Script.Services.ScriptService]
    public class ZipUploader : System.Web.Services.WebService
    {
        private DAL _dal;
        private DataSet _ds;
        NameValueCollection _nvCollection = new NameValueCollection();

        private DAL DAL
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

        [WebMethod()]
       // [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void ProcessRequest()//HttpContext context
        {
            try
            {
                string res = "";
                var postedFile = HttpContext.Current.Request.Files["UploadedFile"];
                var fileName = HttpContext.Current.Request.Form[0];

                string savepath = "";
                string tempPath = "";
                tempPath = ConfigurationManager.AppSettings["txtpath"].ToString();//@"C:\PocketDCR-ICI\SecondarySalesData"; 
                savepath = tempPath;
                if (postedFile != null)
                {
                    string filename = postedFile.FileName;
                    if (!Directory.Exists(savepath))
                        Directory.CreateDirectory(savepath);
                    postedFile.SaveAs(savepath + "\\" + filename);
                    HttpContext.Current.Response.Write(tempPath + "/" + filename);
                    string filename1 = tempPath + "\\" + filename;


                   
                  res=  ExtractandRead(filename1); 
                  
                }
                if (res == "DistNotFound")
                {
                    HttpContext.Current.Response.StatusCode = 404;
                    HttpContext.Current.Response.StatusDescription = "DistNotFound";
                }
                else
                {
                    HttpContext.Current.Response.StatusCode = 200;
                    HttpContext.Current.Response.StatusDescription = "OK";

                }

            }
            catch (Exception ex)
            {
                HttpContext.Current.Response.Write("Error: " + ex.Message);
            }
        }

     //   [WebMethod]
        public string ExtractandRead(string filepath)
        {

            string res = "";
            try
            {
                /*Save Zip File Info in tblSalesZipFiles*/

                string salesZipFileId;
                SaveZipFileInfo(out salesZipFileId, "SSD.zip", filepath);//@"C:\SalesData\SSD.zip"
                /**/
                var destifolder = filepath + DateTime.Now.ToString("ddmmyyyhhmmss");
                UnZip(filepath, destifolder);
                var files = GetFileDirectoryInfo(destifolder);
              res=  GroupExtractedFilesByDist(files);
            }
            catch (Exception exception)
            {
                   ErrorLog("Error : " + exception.ToString() + " Stack : " + exception.StackTrace);
            }
            return res;
        }


        /// <summary>
        /// Save Zip File Batch Information in DB returns salesZipFileId
        /// </summary>
        /// <param name="salesZipFileId"></param>
        /// <param name="ZipFileName"></param>
        /// <param name="filename1"></param>
        private void SaveZipFileInfo(out string salesZipFileId, string ZipFileName, string filename1)
        {
            salesZipFileId = "";
            try
            {
                using (_ds = new DataSet())
                {
                    _ds = DAL.GetData("SSD_Add_SalesZipFiles", new NameValueCollection
                {
                    {"@ZipFileName-VARCHAR-50", ZipFileName},
                    {"@ZipFullPath-VARCHAR-50", filename1}
                });
                    if (_ds != null && _ds.Tables[0].Rows.Count > 0)
                    {
                        salesZipFileId = _ds.Tables[0].Rows[0][0].ToString();
                    }
                }
            }
            catch (Exception ex)
            {
                ErrorLog("Error : " + ex.ToString() + " Stack : " + ex.StackTrace);
            }
            finally
            {
                DAL = null;
            }
        }

        /// <summary>
        /// Loop through extracted files grouping them by name i.e. DistCode
        /// </summary>
        /// <param name="files"></param>
        private string GroupExtractedFilesByDist(FileInfo[] files)
        {
            string res = "";
            if (files == null || !files.Any()) return "";
            //foreach (var file in files)
            //{


            //var fileDistCode = ExtractNumber(files[0].Name);
            //    var allDistFiles = (from p in files
            //                        where p.Name.Contains(fileDistCode)
            //                        select p).ToList();
            //    if (allDistFiles.Count == 3)
            //    {
            //      res=  SaveDistributorData(allDistFiles[0], allDistFiles[2], allDistFiles[1]);
            //    }

            foreach (var file in files)
            {
              
             var distCode = ExtractNumber(file.Name);


             if (file.Name.ToUpper().Contains("INV"))
              {
                  using (var sr = file.OpenText())
                  {
                      var DataLine = "";
                      while ((DataLine = sr.ReadLine()) != null)
                      {
                          if (string.IsNullOrEmpty(DataLine)) continue;
                          var reslt = DAL.GetData("SSD_ProcessDistInv", new NameValueCollection { { "@InvLine-NVARCHAR-MAX", DataLine }, { "@DstCode-INT", distCode } });
                          if (reslt == null || reslt.Tables[0].Rows.Count <= 0) continue;
                          var remarks = reslt.Tables[0].Rows[0][1].ToString();
                          if (remarks != "OK")
                          {
                             // InvFileRemarks += remarks;
                          }
                      }
                      sr.Close();
                  }
             
              }

            
               if (file.Name.ToUpper().Contains("STOCK"))
              {
                  using (var sr = file.OpenText())
                  {
                      var DataLine = "";
                      while ((DataLine = sr.ReadLine()) != null)
                      {
                          if (string.IsNullOrEmpty(DataLine)) continue;
                          var reslt = DAL.GetData("SSD_ProcessDistStock", new NameValueCollection { { "@StockLine-NVARCHAR-MAX", DataLine }, { "@DstCode-INT", distCode } });
                          if (reslt == null || reslt.Tables[0].Rows.Count <= 0) continue;
                          var remarks = reslt.Tables[0].Rows[0][1].ToString();
                          if (remarks != "OK")
                          {
                              //StockFileRemarks += remarks;
                          }
                      }
                      sr.Close();
                  }
 
              }

              if (file.Name.ToUpper().Contains("CUST"))
              {
                  using (var sr = file.OpenText())
                  {
                      var DataLine = "";
                      while ((DataLine = sr.ReadLine()) != null)
                      {
                          if (string.IsNullOrEmpty(DataLine)) continue;
                          var reslt = DAL.GetData("SSD_ProcessDistCust", new NameValueCollection { { "@CustLine-NVARCHAR-MAX", DataLine }, { "@DstCode-INT", distCode } });
                          if (reslt == null || reslt.Tables[0].Rows.Count <= 0) continue;
                          var remarks = reslt.Tables[0].Rows[0][1].ToString();
                          if (remarks != "OK")
                          {
                             // CustFileRemarks += remarks;
                          }
                      }
                      sr.Close();
                  }

              }

            }

      

      

        

                return res ="OK" ;
            
            //}
        }

        /// <summary>
        /// Reading all the three files of a Distributor
        /// </summary>
        /// <param name="CustDataFile"></param>
        /// <param name="StockDataFile"></param>
        /// <param name="InvDataFile"></param>
        private  string  SaveDistributorData(FileInfo CustDataFile, FileInfo StockDataFile, FileInfo InvDataFile)
        {
            string res ="";
            /*Save Files Information for Distributor in SalesDataFiles*/
            try
            {
                //Get Distributor Code from the file Name
                var distCode = ExtractNumber(InvDataFile.Name);
                using (_ds = new DataSet())
                {
                    _ds = DAL.GetData("SSD_Select_DistributorByCode", new NameValueCollection { { "@DistCode-VARCHAR-50", distCode } });

                    if (_ds == null || _ds.Tables[0].Rows.Count <= 0) return "DistNotFound";
                    DAL.InserData("SSD_AddSalesDataFiles", new NameValueCollection
                {
                    {"@SalesDistID-BIGINT", _ds.Tables[0].Rows[0]["SalesDistID"].ToString()},
                    {"@CustFile-NVARCHAR-50", CustDataFile.Name},
                    {"@StockFile-NVARCHAR-50", StockDataFile.Name},
                    {"@InvFile-NVARCHAR-50", InvDataFile.Name},
                    {"@CreatedDate-DATETIME", DateTime.Now.ToString()},
                });

                    var CustFileRemarks = "Successfully Processed";
                    var StockFileRemarks = "Successfully Processed";
                    var InvFileRemarks = "Successfully Processed";
                    // Open the stream and reading the CustDataFile And Saving .
                    using (var sr = CustDataFile.OpenText())
                    {
                        var DataLine = "";
                        while ((DataLine = sr.ReadLine()) != null)
                        {
                            if (string.IsNullOrEmpty(DataLine)) continue;
                            var reslt = DAL.GetData("SSD_ProcessDistCust", new NameValueCollection { { "@CustLine-NVARCHAR-MAX", DataLine }, { "@DstCode-INT", distCode } });
                            if (reslt == null || reslt.Tables[0].Rows.Count <= 0) continue;
                            var remarks = reslt.Tables[0].Rows[0][1].ToString();
                            if (remarks != "OK")
                            {
                                CustFileRemarks += remarks;
                            }
                        }
                        sr.Close();
                    }

                    using (var sr = StockDataFile.OpenText())
                    {
                        var DataLine = "";
                        while ((DataLine = sr.ReadLine()) != null)
                        {
                            if(string.IsNullOrEmpty(DataLine)) continue;
                            var reslt = DAL.GetData("SSD_ProcessDistStock", new NameValueCollection { { "@StockLine-NVARCHAR-MAX", DataLine }, { "@DstCode-INT", distCode } });
                            if (reslt == null || reslt.Tables[0].Rows.Count <= 0) continue;
                            var remarks = reslt.Tables[0].Rows[0][1].ToString();
                            if (remarks != "OK")
                            {
                                StockFileRemarks += remarks;
                            }
                        }
                        sr.Close();
                    }


                    using (var sr = InvDataFile.OpenText())
                    {
                        var DataLine = "";
                        while ((DataLine = sr.ReadLine()) != null)
                        {
                            if (string.IsNullOrEmpty(DataLine)) continue;
                            var reslt = DAL.GetData("SSD_ProcessDistInv", new NameValueCollection { { "@InvLine-NVARCHAR-MAX", DataLine }, { "@DstCode-INT", distCode } });
                            if (reslt == null || reslt.Tables[0].Rows.Count <= 0) continue;
                            var remarks = reslt.Tables[0].Rows[0][1].ToString();
                            if (remarks != "OK")
                            {
                                InvFileRemarks += remarks;
                            }
                        }
                        sr.Close();
                    }

                }
            }
            catch (Exception exception)
            {
                ErrorLog("Error : " + exception.ToString() + " Stack : " + exception.StackTrace);
            }
            finally
            {
                DAL = null;
            }

            res = "OK";
            return res;
        }

        /// <summary>
        /// Extract Zip Files to the specified Folder Path 
        /// </summary>
        /// <param name="zipFile"></param>
        /// <param name="folderPath"></param>
        public static void UnZip(string zipFile, string folderPath)
        {
            if (!File.Exists(zipFile))
                throw new FileNotFoundException();

            if (!Directory.Exists(folderPath))
                Directory.CreateDirectory(folderPath);

            // ReSharper disable once SuggestUseVarKeywordEvident
            //Shell32.Shell objShell = new Shell32.Shell();
            //var destinationFolder = objShell.NameSpace(folderPath);
            //var sourceFile = objShell.NameSpace(zipFile);

            //foreach (var file in sourceFile.Items())
            //{
            //    destinationFolder.CopyHere(file, 4 | 16);
            //}

            using (var zip = ZipFile.Read(zipFile))
            {
                zip.ExtractAll(folderPath);
            }

        }

        /// <summary>
        /// Get Files Info Sorted by Name 
        /// </summary>
        /// <param name="FolderPath"></param>
        /// <returns></returns>
        public static FileInfo[] GetFileDirectoryInfo(string FolderPath)
        {
            var dir = new DirectoryInfo(FolderPath);
            var files = dir.GetFiles();
            //User Enumerable.OrderBy to sort the files array and get a new array of sorted files
            return files.OrderBy(r => r.Name).ToArray();
        }

        /// <summary>
        /// Extract Number (DistbutorCode) from the fileName
        /// </summary>
        /// <param name="original"></param>
        /// <returns></returns>
        public string ExtractNumber(string original)
        {
            return new string(original.Where(Char.IsDigit).ToArray());
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DSRtxtDataProcess(string mdate)
        {
            #region Commented
            string result = string.Empty;
            try
            {

                string MonthName = "";
                DateTime MonthDate = new DateTime();
                if (mdate != "")
                {
                    MonthName = mdate.Split('-', ' ')[0];
                    string year = mdate.Split('-', ' ')[1];
                    int i = DateTime.ParseExact(MonthName, "MMMM", CultureInfo.CurrentCulture).Month;
                    string completedate = i + "/" + "1" + "/" + year + " " + DateTime.Now.TimeOfDay;
                    MonthDate = Convert.ToDateTime(completedate);
                }
                else
                {
                    return result = "Date Required";
                }

                _nvCollection.Clear();
                _nvCollection.Add("@Date-date", MonthDate.ToString());
                //Process Start Sp_ProcessDSRtemp
                var temptodsr = DAL.GetData("sp_Process_txttoDSR", _nvCollection);
                //Process Start Sp_ProcessDSR


              //  var pro = DAL.GetData("Sp_ProcessDSR", null);

                return result = "DSuccess";
            }
            catch (Exception ex)
            {
                ErrorLog("Error : " + ex.ToString() + " Stack : " + ex.StackTrace);
                return result = "Error Occured";
            }
            #endregion

        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DSRtxtTruncateProcess(string mdate)
        {
            #region Commented
            string result = string.Empty;
            try
            {

                string MonthName = "";
                DateTime MonthDate = new DateTime();
                if (mdate != "")
                {
                    MonthName = mdate.Split('-', ' ')[0];
                    string year = mdate.Split('-', ' ')[1];
                    int i = DateTime.ParseExact(MonthName, "MMMM", CultureInfo.CurrentCulture).Month;
                    string completedate = i + "/" + "1" + "/" + year + " " + DateTime.Now.TimeOfDay;
                    MonthDate = Convert.ToDateTime(completedate);
                }
                else
                {
                    return result = "Date Required";
                }

                _nvCollection.Clear();
                _nvCollection.Add("@Date-date", MonthDate.ToString());
                
                var truncate = DAL.GetData("sp_Process_TruncateDSR", _nvCollection);
             
                return result = "DSuccess";
            }
            catch (Exception ex)
            {
                ErrorLog("Error : " + ex.ToString() + " Stack : " + ex.StackTrace);
                return result = "Error Occured";
            }
            #endregion

        }


        #region Logger
        public static void ErrorLog(string error)
        {
            try
            {
                if (!Directory.Exists(@"C:\PocketDCR\Logs"))
                {
                    Directory.CreateDirectory(@"C:\PocketDCR\Logs");
                }

                File.AppendAllText(@"C:\PocketDCR\Logs\" + "ZipUploader" + DateTime.UtcNow.ToString("yyyy_MM_dd") + ".txt",
                    DateTime.Now + " : " + error + Environment.NewLine);
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
        }
        #endregion
    }
}
