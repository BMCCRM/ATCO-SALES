using Ionic.Zip;
using PocketDCR2.Classes;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.Text;
using System.Web;

namespace PocketDCR2.SalesMod
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "ZipUpload" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select ZipUpload.svc or ZipUpload.svc.cs at the Solution Explorer and start debugging.
      [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class ZipUpload : IZipUpload
    {
        private DAL _dal;
        private DataSet _ds;

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

        public void DoWork()
        {
        }

        public void UploadtxtFile(string path, Stream stream)
        {
            //CreateDirectoryIfNotExists(path);
            //using (var file = File.Create(path))
            //{
            //    stream.CopyTo(file);
            //}
        }
        private void CreateDirectoryIfNotExists(string filePath)
        {
            var directory = new FileInfo(filePath).Directory;
            if (directory == null) throw new Exception("Directory could not be determined for the filePath");

            Directory.CreateDirectory(directory.FullName);
        }   
        //public void ProcessRequest(HttpContext context)
        //{
        //    try
        //    {
        //        var postedFile = context.Request.Files["Filedata"];
        //        string savepath = "";
        //        string tempPath = "";
        //        tempPath = @"C:\PocketDCR-ICI\SecondarySalesData";
        //        savepath = tempPath;
        //        if (postedFile != null)
        //        {
        //            string filename = postedFile.FileName;
        //            if (!Directory.Exists(savepath))
        //                Directory.CreateDirectory(savepath);
        //            postedFile.SaveAs(savepath + @"\" + filename);
        //            context.Response.Write(tempPath + "/" + filename);
        //            string filename1 = tempPath + "/" + filename;



        //          //  ExtractandRead();
        //        }
        //        context.Response.StatusCode = 200;

        //    }
        //    catch (Exception ex)
        //    {
        //        context.Response.Write("Error: " + ex.Message);
        //    }
        //}


        public string ExtractandRead(string filename)
        {
            string retustr = "";
            try
            {
                if(filename != "NOT")
                {
                    /*Save Zip File Info in tblSalesZipFiles*/

                    string salesZipFileId;
                    SaveZipFileInfo(out salesZipFileId, filename, @"D:\SalesData\" + filename);
                    /**/
                    var destifolder = @"D:\SalesData\" + DateTime.Now.ToString("ddmmyyyhhmmss");
                    UnZip(@"D:\SalesData\" + filename, destifolder);
                    var files = GetFileDirectoryInfo(destifolder);
                    GroupExtractedFilesByDist(files);
                    //   retustr = "OOK";
                }
              

            }
            catch (Exception exception)
            {
                
                ErrorLog("Error : " + exception.ToString() + " Stack : " + exception.StackTrace);
                retustr = exception.ToString();
            }

            return retustr; 
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
        private void GroupExtractedFilesByDist(FileInfo[] files)
        {
            if (files == null || !files.Any()) return;
            foreach (var file in files)
            {
                var fileDistCode = ExtractNumber(file.Name);
                var allDistFiles = (from p in files
                                    where p.Name.Contains(fileDistCode)
                                    select p).ToList();
                if (allDistFiles.Count == 3)
                {
                  //  SaveDistributorData(allDistFiles[0], allDistFiles[2], allDistFiles[1]);
                }

            }
        }

        /// <summary>
        /// Reading all the three files of a Distributor
        /// </summary>
        /// <param name="CustDataFile"></param>
        /// <param name="StockDataFile"></param>
        /// <param name="InvDataFile"></param>
        private void SaveDistributorData(FileInfo CustDataFile, FileInfo StockDataFile, FileInfo InvDataFile)
        {
            /*Save Files Information for Distributor in SalesDataFiles*/
            try
            {
                //Get Distributor Code from the file Name
                var distCode = ExtractNumber(InvDataFile.Name);
                using (_ds = new DataSet())
                {
                    _ds = DAL.GetData("SSD_Select_DistributorByCode", new NameValueCollection { { "@DistCode-VARCHAR-50", distCode } });

                    if (_ds == null || _ds.Tables[0].Rows.Count <= 0) return;
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
                            var reslt = DAL.GetData("SSD_ProcessDistCust", new NameValueCollection { { "@CustLine-NVARCHAR-MAX", DataLine } });
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
                            if (string.IsNullOrEmpty(DataLine)) continue;
                            var reslt = DAL.GetData("SSD_ProcessDistStock", new NameValueCollection { { "@StockLine-NVARCHAR-MAX", DataLine } });
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
                            var reslt = DAL.GetData("SSD_ProcessDistInv", new NameValueCollection { { "@InvLine-NVARCHAR-MAX", DataLine } });
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
        }

        /// <summary>
        /// Extract Zip Files to the specified Folder Path 
        /// </summary>
        /// <param name="zipFile"></param>
        /// <param name="folderPath"></param>
        public static void UnZip(string zipFile, string folderPath)
        {
            if (!Directory.Exists(folderPath))
                Directory.CreateDirectory(folderPath);

            if (!File.Exists(zipFile))
                throw new FileNotFoundException();

          

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

        #region Logger
        public static void ErrorLog(string error)
        {
            try
            {
                if (!Directory.Exists(@"D:\PocketDCR\Logs"))
                {
                    Directory.CreateDirectory(@"D:\PocketDCR\Logs");
                }

                File.AppendAllText(@"D:\PocketDCR\Logs\" + "ZipUploader" + DateTime.UtcNow.ToString("yyyy_MM_dd") + ".txt",
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
