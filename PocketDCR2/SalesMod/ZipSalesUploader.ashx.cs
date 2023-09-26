using Ionic.Zip;
using LinqToExcel;
using OfficeOpenXml;
using PocketDCR2.BWSD;
using PocketDCR2.Classes;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace PocketDCR2.SalesMod
{
    /// <summary>
    /// Summary description for ZipSalesUploader1
    /// </summary>
    public class ZipSalesUploader1 : IHttpHandler
    {

        #region Object Intialization

        private NameValueCollection _nv = new NameValueCollection();
        private DAL _dal;
        private string employeeid = string.Empty;
        private string filename1 = string.Empty;
        private string selectedDate = string.Empty;
        private string selectedmonth = string.Empty;
        private DataTable finalRows = new DataTable();
        private HudsonCRMEntities2 db = new HudsonCRMEntities2();

        private DataSet _ds;
        private String EmployeeID;


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

        private System.Data.DataSet GetData(String SpName, SqlCommand command)
        {
            var connection = new SqlConnection();


            try
            {
                connection.ConnectionString = Classes.Constants.GetConnectionString();
                var dataSet = new System.Data.DataSet();
                connection.Open();


                command.CommandType = CommandType.StoredProcedure;
                command.Connection = connection;
                command.CommandText = SpName;
                command.CommandTimeout = 20000;


                var dataAdapter = new SqlDataAdapter();
                dataAdapter.SelectCommand = command;
                dataAdapter.Fill(dataSet);

                return dataSet;
            }
            catch (Exception exception)
            {

                Console.Out.WriteLine(exception.Message);
                return null;
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                {
                    connection.Close();
                }
            }
        }



        #endregion Object Intialization






        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
        #region  Request Handler Methods

        public void ProcessRequest(HttpContext context)
        {
            RequestObjectClass requestResponse = new RequestObjectClass();
            try
            {
                string response = context.Request["requestObject"];


                //if (response != null)
                //{
                //    requestResponse = new JavaScriptSerializer().Deserialize<RequestObjectClass>(response);
                //    if (requestResponse.type == "D")
                //    {

                //    }

                //}
                //else
                if (context.Request.QueryString["Type"] == "U")
                {
                    #region Upload Work

                    UploadWork(context);

                    #endregion Upload Work
                }
                else if (context.Request.QueryString["Type"] == "Read")
                {
                    ReadExcel(context);
                }
                else
                {
                    context.Response.Write("Corrupt Data Request");
                }
            }
            catch (Exception ex)
            {
                // PocketDCR2.Classes.Constants.SampleErrorLog("ERROR : SampleSheetsUpload.ashx :and MESSAGE::" + ex.Message + "STACK" + ex.StackTrace.ToString());

                context.Response.Write("Error :" + ex.Message);
            }



        }



        #endregion Request Handler Methods


        #region Read & Upload Sheet

        private void ReadExcelFile(string FileName)
        {
            #region Reading Excel To DataTable
            try
            {



                //PocketDCR2.Classes.Constants.SampleErrorLog("START READING");
                OleDbConnection con = new OleDbConnection();

                string the = FileName;

                string part1 = "Provider=Microsoft.ACE.OLEDB.12.0;";
                string part2 = @"Data Source=" + the + ";";
                string part3 = "Extended Properties='Excel 12.0;HDR=YES;'";

                string connectionString = part1 + part2 + part3;

                con.ConnectionString = connectionString;
                FileInfo FIforexcel = new FileInfo(the);
                ExcelPackage Ep = new ExcelPackage(FIforexcel);

                OleDbCommand cmnd = new OleDbCommand("Select * from [" + Ep.Workbook.Worksheets.FirstOrDefault().Name + "$]", con);
                OleDbDataAdapter adapter = new OleDbDataAdapter(cmnd);
                con.Open();
                DataSet ds = new DataSet();
                adapter.Fill(ds);
                con.Close();


                // PocketDCR2.Classes.Constants.SampleErrorLog("CLOSE READING");
                #endregion

                #region Working On Read Excel

                if (ds != null)
                {

                    // PocketDCR2.Classes.Constants.SampleErrorLog("START PROC sp_GenerateSampleUploadBatch");
                    // Structured

                    string sheetTypeCode = ds.Tables[0].Columns[9].ColumnName;

                    string excelFileName, emailAddress;
                    excelFileName = FileName;
                    emailAddress = ds.Tables[0].Rows[0][11].ToString();

                    DataSet dsR = DAL.GetData("sp_GenerateSampleOnlyUploadBatch", new NameValueCollection() { { "@ExcelFileName-int", excelFileName }, { "@EmailAddress-int", emailAddress } });
                    string batchID = dsR.Tables[0].Rows[0][0].ToString();



                    if (sheetTypeCode == "SC-ESU")
                    {
                        if (ds.Tables[0].Rows.Count != 0)
                        {

                            DataTable dt = new DataTable();
                            //dt.Columns.Add("ID", typeof(Int32));
                            dt.Columns.Add("BatchID", typeof(Int32));
                            dt.Columns.Add("MIOID", typeof(Int32));
                            dt.Columns.Add("SampleID", typeof(Int32));
                            dt.Columns.Add("Quantity", typeof(Int32));
                            //dt.Columns.Add("ReceiveType", typeof(String));
                            dt.Columns.Add("MonthYear", typeof(String));



                            for (int i = 1; i < ds.Tables[0].Rows.Count; i++)
                            {
                                DataRow dr = ds.Tables[0].Rows[i];
                                //EmployeeID        //SKUID                Quantity

                                String sampleID, EmployeeID, Month1, Month2, Month3, Quantity1, Quantity2, Quantity3;

                                sampleID = dr[3].ToString();
                                EmployeeID = dr[0].ToString();

                                Month1 = (new DateTime(Int32.Parse(ds.Tables[0].Rows[0][6].ToString().Split(' ')[1].Trim()),
                                              DateTimeFormatInfo.CurrentInfo.MonthNames.ToList().IndexOf(ds.Tables[0].Rows[0][6].ToString().Split(' ')[0].Trim()) + 1, 1)).ToString();
                                Month2 = (new DateTime(Int32.Parse(ds.Tables[0].Rows[0][7].ToString().Split(' ')[1].Trim()),
                                              DateTimeFormatInfo.CurrentInfo.MonthNames.ToList().IndexOf(ds.Tables[0].Rows[0][7].ToString().Split(' ')[0].Trim()) + 1, 1)).ToString();
                                Month3 = (new DateTime(Int32.Parse(ds.Tables[0].Rows[0][8].ToString().Split(' ')[1].Trim()),
                                              DateTimeFormatInfo.CurrentInfo.MonthNames.ToList().IndexOf(ds.Tables[0].Rows[0][8].ToString().Split(' ')[0].Trim()) + 1, 1)).ToString();


                                Quantity1 = dr[6].ToString().Trim();
                                Quantity2 = dr[7].ToString().Trim();
                                Quantity3 = dr[8].ToString().Trim();

                                //Hierarchy                     //SKUID                Quantity

                                if (!(String.IsNullOrEmpty(Quantity1) || Quantity1 == "0"))
                                    dt.Rows.Add(batchID, EmployeeID, sampleID, Quantity1, Month1);

                                if (!(String.IsNullOrEmpty(Quantity2) || Quantity2 == "0"))
                                    dt.Rows.Add(batchID, EmployeeID, sampleID, Quantity2, Month2);

                                if (!(String.IsNullOrEmpty(Quantity3) || Quantity3 == "0"))
                                    dt.Rows.Add(batchID, EmployeeID, sampleID, Quantity3, Month3);


                                ////string remarks = ProcessTheData(TargetId, dr[1].ToString(), dr[4].ToString(), dr[5].ToString(), dr[6].ToString(), MonthDate);
                                //FileInfo FI = new FileInfo(the);
                                //using (ExcelPackage exp
                                //    = new ExcelPackage(FI))
                                //{
                                //    ExcelWorksheet exlss = exp.Workbook.Worksheets.First();
                                //    //exlss.Cells[i, 23].Value = remarks;
                                //    exp.Save();
                                //}
                            }


                            SqlCommand command = new SqlCommand();
                            command.Parameters.AddWithValue("RecordValues", dt);
                            command.Parameters.AddWithValue("ReceiveType", "S");
                            //command.Parameters.AddWithValue("DateMonth", );
                            //command.CommandType = CommandType.TableDirect;
                            var results = GetData("sp_CreateBatchRecordsForMIOSamples", command);
                            results.ToString();
                            results.ToString();
                            results.ToString();

                        }
                        ///runnerMethod = rowHandlerForHierarchy;
                    }
                    else if (sheetTypeCode == "SC-HSU")
                    {

                        DataTable dt = new DataTable();

                        dt.Columns.Add("BatchID", typeof(Int32));
                        dt.Columns.Add("Level1", typeof(Int32));
                        dt.Columns.Add("Level2", typeof(Int32));
                        dt.Columns.Add("Level3", typeof(Int32));
                        dt.Columns.Add("Level4", typeof(Int32));
                        dt.Columns.Add("Level5", typeof(Int32));
                        dt.Columns.Add("Level6", typeof(Int32));
                        dt.Columns.Add("SampleID", typeof(Int32));
                        dt.Columns.Add("Quantity", typeof(Int32));
                        dt.Columns.Add("MonthYear", typeof(String));




                        if (ds.Tables[0].Rows.Count > 0)
                        {
                            DataRow dr = ds.Tables[0].Rows[0];
                            string level1 = "0", level2 = "0", level3 = "0", level4 = "0", level5 = "0", level6 = "0";

                            DataTable samp = new DataTable();
                            samp = ds.Tables[0].Copy();
                            samp.Rows.RemoveAt(0);

                            string samplecode = "";
                            for (int i = 0; i < samp.Rows.Count; i++)
                            {

                                samplecode += (samp.Rows[i][4].ToString() == "") ? "" : samp.Rows[i][4].ToString() + ",";
                            }

                            switch (ds.Tables[0].Rows[1][1].ToString().Split('-')[0])
                            {
                                case "1":
                                    level1 = ds.Tables[0].Rows[1][0].ToString();

                                    break;
                                case "2":
                                    level2 = ds.Tables[0].Rows[1][0].ToString();

                                    break;
                                case "3":
                                    level3 = ds.Tables[0].Rows[1][0].ToString();

                                    break;

                                case "4":
                                    level4 = ds.Tables[0].Rows[1][0].ToString();

                                    break;

                                case "5":
                                    level5 = ds.Tables[0].Rows[1][0].ToString();

                                    break;

                                case "6":
                                    level6 = ds.Tables[0].Rows[1][0].ToString();

                                    break;

                                default:
                                    break;
                            }

                            DataSet getEmployees = DAL.GetData("sp_MioListEmployees",
                                    new NameValueCollection() {
                            { "@level1-int", level1 },
                            { "@level2-int", level2 },
                            { "@level3-int", level3 },
                            { "@level4-int", level4 },
                            { "@level5-int", level5 },
                            { "@level6-int", level6 },
                            { "@sampleid-int",  samplecode.Remove(samplecode.Length - 1) }
                            }
                                );
                            if (getEmployees != null)
                            {
                                if (getEmployees.Tables[0].Rows.Count == 0)
                                {
                                    throw new Exception("NOEMP");
                                }
                            }

                        }

                        //LoginID	TerritoryCode	SKUCode	        March, 2018	        April, 2018	        May, 2018
                        for (int i = 1; i < ds.Tables[0].Rows.Count; i++)
                        {
                            DataRow dr = ds.Tables[0].Rows[i];
                            string level1 = "0", level2 = "0", level3 = "0", level4 = "0", level5 = "0", level6 = "0";

                            switch (ds.Tables[0].Rows[i][1].ToString().Split('-')[0])
                            {
                                case "1":
                                    level1 = ds.Tables[0].Rows[1][0].ToString();

                                    break;
                                case "2":
                                    level2 = ds.Tables[0].Rows[1][0].ToString();

                                    break;

                                case "3":
                                    level3 = ds.Tables[0].Rows[i][0].ToString();

                                    break;

                                case "4":
                                    level4 = ds.Tables[0].Rows[i][0].ToString();

                                    break;

                                case "5":
                                    level5 = ds.Tables[0].Rows[i][0].ToString();

                                    break;

                                case "6":
                                    level6 = ds.Tables[0].Rows[i][0].ToString();

                                    break;

                                default:
                                    break;
                            }

                            String sampleID, Month1, Month2, Month3, Quantity1, Quantity2, Quantity3;

                            sampleID = dr[3].ToString();

                            Month1 = (new DateTime(Int32.Parse(ds.Tables[0].Rows[0][6].ToString().Split(' ')[1].Trim()),
                                          DateTimeFormatInfo.CurrentInfo.MonthNames.ToList().IndexOf(ds.Tables[0].Rows[0][6].ToString().Split(' ')[0].Trim()) + 1, 1)).ToString();
                            Month2 = (new DateTime(Int32.Parse(ds.Tables[0].Rows[0][7].ToString().Split(' ')[1].Trim()),
                                          DateTimeFormatInfo.CurrentInfo.MonthNames.ToList().IndexOf(ds.Tables[0].Rows[0][7].ToString().Split(' ')[0].Trim()) + 1, 1)).ToString();
                            Month3 = (new DateTime(Int32.Parse(ds.Tables[0].Rows[0][8].ToString().Split(' ')[1].Trim()),
                                          DateTimeFormatInfo.CurrentInfo.MonthNames.ToList().IndexOf(ds.Tables[0].Rows[0][8].ToString().Split(' ')[0].Trim()) + 1, 1)).ToString();


                            Quantity1 = dr[6].ToString().Trim();
                            Quantity2 = dr[7].ToString().Trim();
                            Quantity3 = dr[8].ToString().Trim();

                            //Hierarchy                     //SKUID                Quantity


                            if (!(String.IsNullOrEmpty(Quantity1) || Quantity1 == "0"))
                                dt.Rows.Add(batchID, level1, level2, level3, level4, level5, level6, sampleID, Quantity1, Month1);

                            if (!(String.IsNullOrEmpty(Quantity2) || Quantity2 == "0"))
                                dt.Rows.Add(batchID, level1, level2, level3, level4, level5, level6, sampleID, Quantity2, Month2);

                            if (!(String.IsNullOrEmpty(Quantity3) || Quantity3 == "0"))
                                dt.Rows.Add(batchID, level1, level2, level3, level4, level5, level6, sampleID, Quantity3, Month3);


                            //if (dr[5].ToString() != "0" && dr[5].ToString() != null && dr[5].ToString() != "")
                            //{
                            //    ProductQtyInsertByHierarchy(dr[3].ToString(), dr[5].ToString(), ds.Tables[0].Rows[0][5].ToString(),
                            //        level3, level4, level5, level6);
                            //}
                            //if (dr[6].ToString() != "0" && dr[6].ToString() != null && dr[6].ToString() != "")
                            //{
                            //    ProductQtyInsertByHierarchy(dr[3].ToString(), dr[6].ToString(), ds.Tables[0].Rows[0][6].ToString(),
                            //        level3, level4, level5, level6);
                            //}

                            //if (dr[7].ToString() != "0" && dr[7].ToString() != null && dr[7].ToString() != "")
                            //{
                            //    ProductQtyInsertByHierarchy(dr[3].ToString(), dr[7].ToString(), ds.Tables[0].Rows[0][7].ToString(),
                            //        level3, level4, level5, level6);
                            //}
                        }

                        SqlCommand command = new SqlCommand();
                        command.Parameters.AddWithValue("RecordValues", dt);
                        command.Parameters.AddWithValue("ReceiveType", "S");
                        //command.Parameters.AddWithValue("DateMonth", );
                        //command.CommandType = CommandType.TableDirect;
                        var results = GetData("sp_CreateBatchRecordsForHieararchySamples", command);
                        results.ToString();
                        results.ToString();
                        results.ToString();
                    }
                    else if (sheetTypeCode == "SC-RUESU")
                    {
                        if (ds.Tables[0].Rows.Count != 0)
                        {

                            DataTable dt = new DataTable();
                            //dt.Columns.Add("ID", typeof(Int32));
                            dt.Columns.Add("BatchID", typeof(Int32));
                            dt.Columns.Add("MIOID", typeof(Int32));
                            dt.Columns.Add("SampleID", typeof(Int32));
                            dt.Columns.Add("Quantity", typeof(Int32));
                            //dt.Columns.Add("ReceiveType", typeof(String));
                            dt.Columns.Add("MonthYear", typeof(String));



                            for (int i = 1; i < ds.Tables[0].Rows.Count; i++)
                            {
                                DataRow dr = ds.Tables[0].Rows[i];
                                //EmployeeID        //SKUID                Quantity

                                String sampleID, Month1, Month2, Month3, Quantity1, Quantity2, Quantity3;

                                sampleID = dr[3].ToString();

                                Month1 = (new DateTime(Int32.Parse(ds.Tables[0].Rows[0][6].ToString().Split(' ')[1].Trim()),
                                              DateTimeFormatInfo.CurrentInfo.MonthNames.ToList().IndexOf(ds.Tables[0].Rows[0][6].ToString().Split(' ')[0].Trim()) + 1, 1)).ToString();
                                Month2 = (new DateTime(Int32.Parse(ds.Tables[0].Rows[0][7].ToString().Split(' ')[1].Trim()),
                                              DateTimeFormatInfo.CurrentInfo.MonthNames.ToList().IndexOf(ds.Tables[0].Rows[0][7].ToString().Split(' ')[0].Trim()) + 1, 1)).ToString();
                                Month3 = (new DateTime(Int32.Parse(ds.Tables[0].Rows[0][8].ToString().Split(' ')[1].Trim()),
                                              DateTimeFormatInfo.CurrentInfo.MonthNames.ToList().IndexOf(ds.Tables[0].Rows[0][8].ToString().Split(' ')[0].Trim()) + 1, 1)).ToString();


                                Quantity1 = dr[6].ToString().Trim();
                                Quantity2 = dr[7].ToString().Trim();
                                Quantity3 = dr[8].ToString().Trim();

                                //Hierarchy                     //SKUID                Quantity

                                if (!(String.IsNullOrEmpty(Quantity1) || Quantity1 == "0"))
                                    dt.Rows.Add(batchID, sampleID, Quantity1, Month1);

                                if (!(String.IsNullOrEmpty(Quantity2) || Quantity2 == "0"))
                                    dt.Rows.Add(batchID, sampleID, Quantity2, Month2);

                                if (!(String.IsNullOrEmpty(Quantity3) || Quantity3 == "0"))
                                    dt.Rows.Add(batchID, sampleID, Quantity3, Month3);




                                ////string remarks = ProcessTheData(TargetId, dr[1].ToString(), dr[4].ToString(), dr[5].ToString(), dr[6].ToString(), MonthDate);
                                //FileInfo FI = new FileInfo(the);
                                //using (ExcelPackage exp
                                //    = new ExcelPackage(FI))
                                //{
                                //    ExcelWorksheet exlss = exp.Workbook.Worksheets.First();
                                //    //exlss.Cells[i, 23].Value = remarks;
                                //    exp.Save();
                                //}
                            }


                            SqlCommand command = new SqlCommand();
                            command.Parameters.AddWithValue("RecordValues", dt);
                            command.Parameters.AddWithValue("ReceiveType", "S");
                            //command.Parameters.AddWithValue("DateMonth", );
                            //command.CommandType = CommandType.TableDirect;
                            var results = GetData("sp_CreateBatchRecordsForMIOSamples", command);
                            results.ToString();
                            results.ToString();
                            results.ToString();

                        }
                        ///runnerMethod = rowHandlerForHierarchy;
                    }


                }
            }
            catch (Exception ex)
            {
                //PocketDCR2.Classes.Constants.SampleErrorLog("READ Exceptiion::" + ex.Message + " Stack Trace::" + ex.StackTrace.ToString());

            }

            #endregion
        }


        private static DataTable WorksheetToDataTable(ExcelWorksheet worksheet)
        {
            // Vars
            var dt = new DataTable();
            var rowCnt = worksheet.Dimension.End.Row;
            var colCnt = worksheet.Dimension.End.Column + 1;
            worksheet.Column(1).Hidden = false;
            worksheet.Column(2).Hidden = false;
            // Loop through Columns
            for (var c = 1; c < colCnt; c++)
            {
                // Add Column
                dt.Columns.Add(new DataColumn());
                // Loop through Rows
                for (var r = 1; r < rowCnt; r++)
                {
                    // Add Row
                    if (dt.Rows.Count < (rowCnt - 1))
                    {
                        dt.Rows.Add(dt.NewRow());
                    }
                    if (r == 1)
                    {
                        dt.Rows[r - 1][c - 1] = worksheet.Cells[r, c].Value.ToString();
                    }
                    else
                    {
                        dt.Rows[r - 1][c - 1] = worksheet.Cells[r, c].Value.ToString();
                    }
                }
            }
            // Return
            return dt;
        }

        public void UploadWork(HttpContext contxt)
        {

            contxt.Response.ContentType = "text/plain";
            contxt.Response.Expires = -1;
            try
            {

                string res = "";
                var postedFile = contxt.Request.Files["UploadedFile"];
                var fileName = contxt.Request.Form[0];
                selectedDate = DateTime.Now.ToString("MM-dd-yyyy");//contxt.Request.Form["mydate"];
                selectedmonth = Convert.ToDateTime(selectedDate).ToString("MM");

                var filemonthyear = contxt.Request.QueryString["filemonthyear"];


                string savepath = "";
                string tempPath = "";
                tempPath = ConfigurationManager.AppSettings["txtpath"].ToString();
                savepath = tempPath;
                if (postedFile != null)
                {
                    string filename = postedFile.FileName;
                    if (!Directory.Exists(savepath))
                        Directory.CreateDirectory(savepath);
                    postedFile.SaveAs(savepath + "\\" + filename);
                    HttpContext.Current.Response.Write(tempPath + "/" + filename);
                    string filename1 = tempPath + "\\" + filename;
                    // EmployeeID = Session["CurrentUserId"].ToString();
                    EmployeeID = contxt.Request.QueryString["emp"];




                    res = ExtractandRead(filename1);

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

                contxt.Response.Write("Error: " + ex.Message);
            }

        }



        private void ReadExcel(HttpContext contxt)
        {
            string result = string.Empty;
            string Date = contxt.Request.QueryString["date"];
            try
            {
                string savepath = "";
                string tempPath = "";
                tempPath = @"C:\PocketDCR\Excel";
                savepath = tempPath;
                string FileName = contxt.Request.QueryString["FileName"];

                ReadExcelFile(savepath + @"\" + FileName);
                result = "Your File Has been Processed Successfully";
            }
            catch (Exception ex)
            {
                if (ex.Message == "NOEMP")
                {
                    result = "NOEMP";
                }
                else result = "ERROR";//;ex.Message;
            }
            contxt.Response.Write(result);
        }


        #endregion Read & Upload Sheet



        #region UnZipClasses

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
                res = GroupExtractedFilesByDist(files);
            }
            catch (Exception exception)
            {
                PocketDCR2.Classes.Constants.ErrorLog("Error : " + exception.ToString() + " Stack : " + exception.StackTrace);
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
                PocketDCR2.Classes.Constants.ErrorLog("Error : " + ex.ToString() + " Stack : " + ex.StackTrace);
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

            if (files == null || !files.Any()) return "";
            foreach (var file1 in files)
            {
                if (file1.Name.ToUpper().Contains("CUST"))
                {
                    var distCode = ExtractNumber(file1.Name);
                    var excelFile = new ExcelQueryFactory(file1.DirectoryName + @"\" + file1.Name);
                    var workSheetNames = excelFile.GetWorksheetNames().ToList();
                    string sheet1 = workSheetNames[0];
                    var colNames = excelFile.GetColumnNames(sheet1, "A1:H1").ToList();
                    int headers = colNames.Count();
                    if (headers != 8)
                    {
                        return "Heading Missing.";
                    }

                    List<tbl_SalesCustTemp> fileContent = new List<tbl_SalesCustTemp>();
                    foreach (var sheet in workSheetNames)
                    {
                        fileContent = excelFile.Worksheet(sheet).AsEnumerable().Select(s => new tbl_SalesCustTemp
                        {
                            DSTBID = Convert.ToString(s[0]),
                        }).ToList();
                        break;
                    }
                    var DistCode = fileContent[0].DSTBID;
                    if (distCode != DistCode)
                    {
                        return "codes Unmatched";
                    }
                }
                if (file1.Name.ToUpper().Contains("INV"))
                {
                    var distCode = ExtractNumber(file1.Name);
                    var excelFile = new ExcelQueryFactory(file1.DirectoryName + @"\" + file1.Name);
                    var workSheetNames = excelFile.GetWorksheetNames().ToList();
                    string sheet1 = workSheetNames[0];
                    var colNames = excelFile.GetColumnNames(sheet1, "A1:N1").ToList();
                    int headers = colNames.Count();
                    if (headers != 14)
                    {
                        return "Heading Missing.";
                    }
                    List<tbl_SalesInvTemp> fileContent = new List<tbl_SalesInvTemp>();
                    foreach (var sheet in workSheetNames)
                    {
                        fileContent = excelFile.Worksheet(sheet).AsEnumerable().Select(s => new tbl_SalesInvTemp
                        {
                            DISBID = Convert.ToString(s[0]),
                        }).ToList();
                        break;
                    }
                    var DistCode = fileContent[0].DISBID;
                    if (distCode != DistCode)
                    {
                        return "codes Unmatched";
                    }
                }
            }


            foreach (var file in files)
            {
                string savepath = "";
                //Checking number of columns in both files || file.Name.ToUpper().Contains("INV")

                var distCode = ExtractNumber(file.Name);

                File.ReadLines(file.FullName).Count();



                #region Commented

                var currentUser = "";
                int lastInsertedId = 0;
                var Email = "";
                int UserId = 0;


                string tempPath = "";

                tempPath = file.DirectoryName;
                savepath = tempPath;

                try
                {
                    //RequestObjectClass requestResponse = new RequestObjectClass();

                    string requestResponse = HttpContext.Current.Request.QueryString["filemonthyear"].ToString();

                    string monthyear = Convert.ToDateTime(requestResponse).ToString("MM/yyyy");
                    string[] parts = monthyear.Split('/');
                    string monthString = parts[0]; // MM
                    string yearString = parts[1]; // yyyy

                    currentUser = "1"; //HttpContext.Current.Session["SystemUser"].ToString();
                    //Email = "ahmer.khan@bmcsolution.com";    // HttpContext.Current.Session["Email"].ToString();
                    Email = "Abdul.Rehman@bmcsolution.com";    // HttpContext.Current.Session["Email"].ToString();
                    UserId = 1;//Convert.ToInt32(HttpContext.Current.Session["CurrentUserId"]);
                               //  tempPath = @"C:\PocketDCR2\Excel\RTBD\";
                    tbl_UploadExcelSalesData uploadSalesFile = new tbl_UploadExcelSalesData();
                    uploadSalesFile.ExcelFileName = savepath + @"\" + file.Name;
                    uploadSalesFile.FileName = file.Name;
                    uploadSalesFile.EmailAddress = Email;
                    uploadSalesFile.UserId = UserId;
                    uploadSalesFile.EmailStatus = "0";
                    uploadSalesFile.ProccessStatus = false;
                    uploadSalesFile.Remarks = "NotProcess";
                    uploadSalesFile.CreateDate = DateTime.Now;
                    uploadSalesFile.FileMonth = monthString;
                    uploadSalesFile.FileYear = yearString;
                    var salesFile = new ExcelQueryFactory(savepath + @"\" + file.Name);
                    var workSheetNames = salesFile.GetWorksheetNames();

                    List<tbl_SalesCustTemp> fileContent = new List<tbl_SalesCustTemp>();
                    var sheetName = string.Empty;
                    foreach (var sheet in workSheetNames)
                    {
                        fileContent = (from a in salesFile.Worksheet<tbl_SalesCustTemp>(sheet) select a).ToList();
                        if (fileContent.Count > 0 && fileContent != null)
                        {
                            sheetName = sheet;

                            break;
                        }
                    }

                    //var fileContent = (from a in salesFile.Worksheet<tbl_SalesCustTemp>(sheetName) select a).ToList();
                    uploadSalesFile.totalRecords = fileContent.Count;
                    uploadSalesFile.SelectedMonthYear = Convert.ToDateTime(selectedDate);

                    db.tbl_UploadExcelSalesData.Add(uploadSalesFile);
                    if (file.Name.ToUpper().Contains("CUST") || file.Name.ToUpper().Contains("INV"))
                    {
                        db.SaveChanges();
                    }
                    lastInsertedId = uploadSalesFile.ID;

                    if (file.Name.ToUpper().Contains("CUST"))
                    {

                        //string sheetname = "Sheet1";
                        var excelFile = new ExcelQueryFactory(savepath + @"\" + file.Name);
                        var header = excelFile.Worksheet(sheetName);
                        var headers = excelFile.GetColumnNames(sheetName).Count();


                        //var worksheetNames = excelFile.GetWorksheetNames();
                        //sheetname = worksheetNames.First();
                        var newlist = excelFile.Worksheet(sheetName).AsEnumerable().Select(s => new tbl_SalesCustTemp
                        {
                            DSTBID = Convert.ToString(s[0]),
                            //NETAMOUNT = Convert.ToString(s.ColumnNames.Contains("NET AMOUNT") ? s["NET AMOUNT"] : s["NETAMOUNT"]),
                            CUSTID = Convert.ToString(s[1]),
                            CT = Convert.ToString(s[2]),
                            CUSTNAME = Convert.ToString(s[3]),
                            ADDRESS = Convert.ToString(s[4]),
                            CITY = Convert.ToString(s[5]),
                            TOWNID = Convert.ToString(s[6]),
                            TOWN = Convert.ToString(s[7]),
                            FK_ExcelID = lastInsertedId,
                            FlagStatus = "U",
                            CreateDate = DateTime.Now
                        }).ToList();
                        int r = 1;
                        newlist.ForEach(p =>
                        {

                            p.RecordNo = r;
                            r++;

                        });

                     
                        var batchlst = (newlist.AsQueryable().Partition(50000));
                        foreach (var list in batchlst)
                        {
                            db.BulkInsert(list, operation => operation.BatchSize = 5000);
                        }
                        //Call Update BulInserted Colum in Master Table = True on PK_ID lastInsertedId
                        using (_ds = new DataSet())
                        {
                            _ds = DAL.GetData("SSD_UpdateBulkColumn", new NameValueCollection
                            {
                                {"@ID-int", lastInsertedId.ToString()},
                                {"@FileMonth-varchar(2)", monthString},
                                {"@FileYear-varchar(4)", yearString},
                            });
                           
                        }

                    }

                    if (file.Name.ToUpper().Contains("INV"))
                    {


                        //string sheetname = "Sheet1";
                        var excelFile = new ExcelQueryFactory(savepath + @"\" + file.Name);
                        string format = "yyyy-MM-dd HH:mm:ss";

                        var newlist = excelFile.Worksheet(sheetName).AsEnumerable().Select(s => new tbl_SalesInvTemp
                        {
                            // DateTime date = DateTime.ParseExact("2010-01-01 23:00:00", "yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture);
                            //string formattedDate = date.ToString("yyyy-MM-dd HH:mm:ss")
                            BATCH = Convert.ToString(s[7]),
                            //NETAMOUNT = Convert.ToString(s.ColumnNames.Contains("NET AMOUNT") ? s["NET AMOUNT"] : s["NETAMOUNT"]),
                            NETAMOUNT = Convert.ToString(s[12]),
                            DISBID = Convert.ToString(s[0]),
                            INVOICENO = Convert.ToString(s[1]),
                            //INVOICEDATE =   Convert.ToString(s[2]),
                            INVOICEDATE = Convert.ToString(s[2]),
                            CUSTID = Convert.ToString(s[3]),
                            BRICKID = Convert.ToString(s[4]),
                            PRODUCTID = Convert.ToString(s[5]),
                            PRODUCTNAME = Convert.ToString(s[6]),
                            RATE = Convert.ToString(s[8]),
                            QUANTITY = Convert.ToString(s[9]),
                            BONUS = Convert.ToString(s[10]),
                            DISCOUNT = Convert.ToString(s[11]),
                            FK_ExcelID = lastInsertedId,
                            REASON = Convert.ToString(s[13]),
                            FlagStatus = "U",

                            CreateDate = DateTime.Now
                        }).ToList();
                        //.Where(p => !String.IsNullOrWhiteSpace(p.CUSTID)).ToList();

                        DataTable table = new DataTable();
                        table.TableName = "KL";
                        table.Columns.Add("InvDate", typeof(string));
                        table.Columns.Add("InvMonth", typeof(string));
                        table.Columns.Add("InvMonthCount", typeof(int));
                        int Counter = 1;
                        foreach (var item in newlist)
                        {


                            string strDate = item.INVOICEDATE;
                            if (strDate != "")
                            {
                                strDate = strDate.Replace('-', '/');
                                string[] dateString = strDate.Split('/');
                                if (dateString[0].Length == 1)
                                {
                                    dateString[0] = "0" + dateString[0];
                                }
                                if (dateString[1].Length == 1)
                                {
                                    dateString[1] = "0" + dateString[1];
                                }

                               // string strDate2 = dateString[0] + "/" + dateString[1] + "/" + dateString[2]; 
                                string strDate2 = "";


                                if (dateString[0] == monthString)
                                {

                                    strDate2 = dateString[0] + "/" + dateString[1] + "/" + dateString[2];

                                }
                                else
                                {
                                    strDate2 = dateString[1] + "/" + dateString[0] + "/" + dateString[2];
                                }

                                //DateTime enter_date = Convert.ToDateTime(dateString[1] + "/" + dateString[0] + "/" + dateString[2]);
                                string inputDate = strDate; // assuming the input date is in "dd/MM/yyyy" format
                                DateTime parsedDate;
                                string KLDate = "";
                                if (DateTime.TryParseExact(strDate2, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out parsedDate))
                                {
                                    string outputDate = parsedDate.ToString("MM/dd/yyyy"); // "2023-04-10"
                                    KLDate = outputDate;
                                }
                                else
                                {
                                    KLDate = strDate2;
                                }

                                if (table.Select("InvDate='" + DateTime.Parse(KLDate).ToString("MMMM-yyyy") + "'").Length <= 0)
                                {
                                    DataRow NewRow = table.NewRow();
                                    NewRow["InvDate"] = DateTime.Parse(KLDate).ToString("MMMM-yyyy");
                                    NewRow["InvMonth"] = DateTime.Parse(KLDate).ToString("MM");
                                    NewRow["InvMonthCount"] = 1;

                                    table.Rows.Add(NewRow);
                                }
                                else
                                {
                                    DataRow[] rows = table.Select("InvDate='" + DateTime.Parse(KLDate).ToString("MMMM-yyyy") + "'");
                                    int CountMonth = (int.Parse(rows[0]["InvMonthCount"].ToString()) + 1);
                                    table.Select("InvDate='" + DateTime.Parse(KLDate).ToString("MMMM-yyyy") + "'")[0]["InvMonthCount"] = CountMonth;
                                    table.AcceptChanges();


                                }
                                Counter += 1;
                            }
                        }

                        table = table.DefaultView.ToTable(true);

                        //if (table.Rows.Count == 1)
                        //{
                        //    table.Rows[0]["InvMonth"] = monthString;
                        //    table.Rows[0]["InvDate"] = DateTime.Parse(monthString + "-28-" + yearString).ToString("MMMM-yyyy");
                        //    table.AcceptChanges();
                        //}
                        foreach (DataRow row in table.Rows)
                        {
                            table.Rows[0]["InvMonth"] = monthString;
                        }
                        table.AcceptChanges();

                        DataView dv = table.DefaultView;
                        dv.Sort = "InvMonthCount DESC";

                        string InvoiceMonth = dv[0]["InvMonth"].ToString();

                        int r = 1;
                        foreach (var item in newlist)
                        {

                            string strDate = item.INVOICEDATE;
                            if (strDate != "")
                            {
                                strDate = strDate.Replace('-', '/');
                                string[] dateString = strDate.Split('/');
                                if (dateString[0].Length == 1)
                                {
                                    dateString[0] = "0" + dateString[0];
                                }
                                if (dateString[1].Length == 1)
                                {
                                    dateString[1] = "0" + dateString[1];
                                }
                                if (dateString[0] != InvoiceMonth)
                                {
                                    dateString[1] = dateString[0];
                                    dateString[0] = InvoiceMonth;
                                }
                                // string strDate2 = dateString[0] + "/" + dateString[1] + "/" + dateString[2]; 
                                string strDate2 = "";


                                if (dateString[0] == monthString)
                                {

                                    strDate2 = dateString[0] + "/" + dateString[1] + "/" + dateString[2];

                                }
                                else
                                {
                                    strDate2 = dateString[1] + "/" + dateString[0] + "/" + dateString[2];

                                }
                                //string strDate2 = dateString[0] + "/" + monthString+ "/" + yearString;
                                //DateTime enter_date = Convert.ToDateTime(dateString[1] + "/" + dateString[0] + "/" + dateString[2]);
                                string inputDate = strDate; // assuming the input date is in "dd/MM/yyyy" format
                                DateTime parsedDate;

                            
                                item.INVOICEDATE = strDate2;
                            }
                        }
                        newlist.ForEach(p =>
                           {

                               p.RecordNo = r;
                               r++;

                           });


                        var batchlst = (newlist.AsQueryable().Partition(50000));
                        foreach (var list in batchlst)
                        {
                            db.BulkInsert(list, operation => operation.BatchSize = 5000);
                        }
                        //Call Update BulInserted Colum in Master Table = True on PK_ID lastInsertedId
                        using (_ds = new DataSet())
                        {
                            _ds = DAL.GetData("SSD_UpdateBulkColumn", new NameValueCollection
                            {
                                {"@ID-int", lastInsertedId.ToString()},
                                {"@FileMonth-varchar(2)", monthString},
                                {"@FileYear-varchar(4)", yearString},
                            });

                        }
                    }
                }
                catch (Exception ex)
                {
                    Constants.ErrorLog("RTBD : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    return "Error Occured";
                }
                #endregion

            }

            return "OK";

        }


        /// <summary>
        /// Loop through extracted files grouping them by name i.e. DistCode
        /// </summary>
        /// <param name="files"></param>
        private string GroupExtractedFilesByDist1(FileInfo[] files)
        {

            if (files == null || !files.Any()) return "";

            foreach (var file in files)
            {
                var distCode = ExtractNumber(file.Name);

                File.ReadLines(file.FullName).Count();

                var FileLength = "0";
                if (file.Name.ToUpper().Contains(".TXT"))
                {
                    FileLength = file.Length.ToString();
                }
                else if (file.Name.ToUpper().Contains(".XLSX"))
                {

                    var excelFile = new ExcelQueryFactory(file.DirectoryName + @"\" + file.Name);
                    FileLength = (from a in excelFile.Worksheet("Sheet1") select a).Count().ToString();
                }




                if (file.Name.ToUpper().Contains("INV"))
                {

                    var reslt = DAL.GetData("sp_SalesFileInfoInsert",

                        new NameValueCollection {
                            { "@FileName-var", file.Name },
                            { "@FilePath-var", file.DirectoryName },
                            { "@FileType-var", "INV" },
                            { "@FileSize-var",  file.Length.ToString()},
                            { "@FileRecordsCount-var", FileLength.ToString() },///File.ReadLines(file.FullName).Count().ToString()
                            { "@CreatedBy-var", EmployeeID},
                            { "@Extension-var", file.Extension.ToString()}


                        });

                    continue;
                }


                if (file.Name.ToUpper().Contains("STOCK"))
                {

                    var reslt = DAL.GetData("sp_SalesFileInfoInsert",

                        new NameValueCollection {
                            { "@FileName-var", file.Name },
                            { "@FilePath-var", file.DirectoryName },
                            { "@FileType-var", "STOCK" },
                            { "@FileSize-var",  file.Length.ToString()},
                            { "@FileRecordsCount-var", FileLength.ToString() },///File.ReadLines(file.FullName).Count().ToString()
                            { "@CreatedBy-var", EmployeeID} ,
                            { "@Extension-var", file.Extension.ToString()}


                        });

                    continue;

                }

                if (file.Name.ToUpper().Contains("CUST"))
                {

                    var reslt = DAL.GetData("sp_SalesFileInfoInsert",

                        new NameValueCollection {
                            { "@FileName-var", file.Name },
                            { "@FilePath-var", file.DirectoryName },
                            { "@FileType-var", "CUST" },
                            { "@FileSize-var",  file.Length.ToString()},
                            { "@FileRecordsCount-var", FileLength.ToString() },///File.ReadLines(file.FullName).Count().ToString()
                            { "@CreatedBy-var", EmployeeID},
                            { "@Extension-var", file.Extension.ToString()}


                        });

                    continue;

                }
            }

            return "OK";

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

        #endregion




        #region HelperClasses 

        class RequestObjectClass
        {
            public string type { get; set; }

        }

        #endregion
    }
}