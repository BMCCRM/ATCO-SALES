using OfficeOpenXml;
using PocketDCR2.Classes;
using System;
using System.Collections.Specialized;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Script.Serialization;
using PocketDCR2.Classes;
using OfficeOpenXml.DataValidation.Contracts;
using OfficeOpenXml.DataValidation;
using OfficeOpenXml.Style;
using System.Configuration;

namespace PocketDCR2.Handler
{
    public class SamplesSheetUploader : IHttpHandler
    {
        #region Object Intialization

        private NameValueCollection _nv = new NameValueCollection();
        private DAL DL = new DAL();
        private string employeeid = string.Empty;
        private string filename1 = string.Empty;
        private DataTable finalRows = new DataTable();

        #endregion Object Intialization

        #region Database Layer

        private System.Data.DataSet GetData(String SpName, NameValueCollection NV)
        {
            var connection = new SqlConnection();
            string dbTyper = "";

            try
            {
                connection.ConnectionString = Classes.Constants.GetConnectionString();
                var dataSet = new System.Data.DataSet();
                connection.Open();

                var command = new SqlCommand();
                command.CommandType = CommandType.StoredProcedure;
                command.Connection = connection;
                command.CommandText = SpName;
                command.CommandTimeout = 20000;

                if (NV != null)
                {
                    //New code implemented for retrieving data
                    for (int i = 0; i < NV.Count; i++)
                    {
                        string[] arraySplit = NV.Keys[i].Split('-');

                        if (arraySplit.Length > 2)
                        {
                            dbTyper = "SqlDbType." + arraySplit[1].ToString() + "," + arraySplit[2].ToString();

                            if (NV[i].ToString() == "NULL")
                            {
                                command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = DBNull.Value;
                            }
                            else
                            {
                                command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = NV[i].ToString();
                            }
                        }
                        else
                        {
                            dbTyper = "SqlDbType." + arraySplit[1].ToString();

                            if (NV[i].ToString() == "NULL")
                            {
                                command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = DBNull.Value;
                            }
                            else
                            {
                                command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = NV[i].ToString();
                            }
                        }
                    }
                }

                var dataAdapter = new SqlDataAdapter();
                dataAdapter.SelectCommand = command;
                dataAdapter.Fill(dataSet);

                return dataSet;
            }
            catch (Exception exception)
            {
                Constants.ErrorLog("ERROR : Proc:" + SpName + "and MESSAGE::" + exception.Message + "STACK" + exception.StackTrace.ToString());
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
                Constants.ErrorLog("ERROR : Proc:" + SpName + "and MESSAGE::" + exception.Message + "STACK" + exception.StackTrace.ToString());
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

        #endregion Database Layer

        #region  Request Handler Methods

        public void ProcessRequest(HttpContext context)
        {
            RequestObjectClass requestResponse = new RequestObjectClass();

            try
            {
                string response = context.Request["requestObject"]; //new StreamReader(context.Request.InputStream).ReadToEnd();
                string FileName = "SampleSheetUploader-" + requestResponse.Date;

                if (response != null)
                {
                    requestResponse = new JavaScriptSerializer().Deserialize<RequestObjectClass>(response);
                    if (requestResponse.type == "D")
                    {
                        #region Download Work

                        String sheetCode, idLabel, code, EmployeeName, TerritoryName, dataLabel;
                        MemoryStream ms = new MemoryStream();

                        _nv.Clear();
                        _nv.Add("@EmpID-INT", requestResponse.EmployeeId);
                        _nv.Add("@Level1-INT", requestResponse.level1);
                        _nv.Add("@Level2-INT", requestResponse.level2);
                        _nv.Add("@Level3-INT", requestResponse.level3);
                        _nv.Add("@Level4-INT", requestResponse.level4);
                        _nv.Add("@Level5-INT", requestResponse.level5);
                        _nv.Add("@Level6-NVARCHAR(MAX)", requestResponse.level6);
                        _nv.Add("@productSkuIDs-INT", requestResponse.productSkuIDs);
                        DataSet dsSPOsList = GetData("sp_MioSKUsListForSampleSheet", _nv);

                        idLabel = "Employee ID";
                        code = "Login ID";
                        EmployeeName = "Employee Name";
                        TerritoryName = "Territory Code";
                        dataLabel = "Employee Data";
                        sheetCode = "SC-ESU";

                        ms = SamplesSheetUploader.DataTableToExcelXlsx(dsSPOsList, sheetCode, idLabel, code, EmployeeName, TerritoryName, dataLabel, requestResponse.Date);
                        ms.WriteTo(context.Response.OutputStream);

                        context.Response.ContentType = "application/vnd.ms-excel";
                        context.Response.AddHeader("Content-Disposition", "attachment;filename=" + FileName.Replace(" ", string.Empty).Trim() + ".xlsx");
                        context.Response.StatusCode = 200;

                        //context.Response.End();
                        HttpContext.Current.ApplicationInstance.CompleteRequest();

                        #endregion Download Work
                    }
                }
                else if (context.Request.QueryString["Type"] == "U")
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
                Constants.ErrorLog("ERROR : SampleSheetsUpload.ashx :and MESSAGE::" + ex.Message + "STACK" + ex.StackTrace.ToString());
                context.Response.Write("Error :" + ex.Message);
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

        #endregion Request Handler Methods

        #region DataTableToExcel SPO And Hierarchy Methods

        public static MemoryStream DataTableToExcelXlsx(DataSet tableSet, String sheetCode, String idLabel, String code, String Employeename, String Territoryname, String dataLabel, String RecDate)
        {
            string MonthName = RecDate.Split('-', ' ')[1];
            string year = RecDate.Split('-', ' ')[2];
            int RecMonth = DateTime.ParseExact(MonthName, "MMMM", CultureInfo.CurrentCulture).Month;
            string completedate = RecMonth + "/" + "1" + "/" + year + " " + DateTime.Now.TimeOfDay;
            DateTime MonthDate = Convert.ToDateTime(completedate);

            DataTable table = tableSet.Tables[0];

            MemoryStream Result = new MemoryStream();
            ExcelPackage pack = new ExcelPackage();
            ExcelWorksheet ws = pack.Workbook.Worksheets.Add("SamplesList");
            ws.View.FreezePanes(3, 1);

            ws.Cells["I1"].Value = "Sheet Code:";
            ws.Cells["J1"].Value = sheetCode;

            ws.Row(1).Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

            ws.Column(1).Hidden = true;

            ws.Cells[1, 2].Value = dataLabel;
            ws.Cells["B1:C1"].Merge = true;

            ws.Cells[1, 4].Value = "Product Data";
            ws.Cells["D1:H1"].Merge = true;

            ws.Column(5).Hidden = true;

            ws.Column(8).Style.Locked = false;
            ws.Column(9).Style.Locked = false;

            ws.Row(1).Height = 40;
            ws.Row(2).Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

            ws.Row(1).Style.Font.Bold = true;
            ws.Row(2).Style.Font.Bold = true;

            ws.Cells[1, 14].Style.WrapText = true;
            ws.Cells[1, 14].Style.Font.Bold = false;
            ws.Cells[1, 14].Style.Font.Size = 8;

            DateTime dt = MonthDate;

            ws.Cells[2, 1].Value = idLabel;
            ws.Cells[2, 2].Value = code;
            ws.Cells[2, 3].Value = Employeename;
            ws.Cells[2, 4].Value = Territoryname;
            ws.Cells[2, 5].Value = "SKU ID";
            ws.Cells[2, 6].Value = "SKU Code";
            ws.Cells[2, 7].Value = "SKU Name";
            
            ws.Cells[2, 8].Value = "Received Quantity For " + dt.ToString("Y").Replace(",", ""); //DateTime.Now.ToString("y");
            ws.Column(8).Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;
            ws.Column(8).Style.Numberformat.Format = "@";

            int col = 1;
            int row = 3;

            if (table != null)
            {
                foreach (DataRow rw in table.Rows)
                {
                    foreach (DataColumn cl in table.Columns)
                    {
                        if (rw[cl.ColumnName] != DBNull.Value)
                            ws.Cells[row, col].Value = rw[cl.ColumnName].ToString();

                        col++;
                    }
                    row++;
                    col = 1;
                }
            }

            ws.Column(1).Width = 0;
            ws.Column(5).Width = 0;            
            ws.Protection.IsProtected = true;            
            ws.Protection.AllowSort = true;
            ws.Cells["A2:H2"].AutoFilter = true;
            ws.Protection.AllowAutoFilter = true;
            ws.Cells.AutoFitColumns();
            ws.Protection.SetPassword("!@#ExcelPassword");

            var validations = pack.Workbook.Worksheets.SelectMany(sheet1 => sheet1.DataValidations);

            pack.SaveAs(Result);
            return Result;
        }

        #endregion DataTableToExcel SPO And Hierarchy Methods

        #region Read & Upload Sheet

        private void ReadExcelFile(string FileName)
        {
            try
            {
                #region Reading Excel To DataTable

                Constants.ErrorLog("START READING");
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

                Constants.ErrorLog("CLOSE READING");

                #endregion

                #region Working On Read Excel

                if (ds != null)
                {
                    Constants.ErrorLog("START PROC sp_GenerateSampleUploadBatch");

                    string excelFileName, emailAddress;
                    excelFileName = FileName;
                    emailAddress = ds.Tables[0].Rows[0][11].ToString();

                    DataSet dsR = GetData("sp_GenerateSampleUploadBatch", new NameValueCollection() { { "@ExcelFileName-int", excelFileName }, { "@EmailAddress-int", emailAddress } });

                    string batchID = dsR.Tables[0].Rows[0][0].ToString();

                    if (ds.Tables[0].Rows.Count != 0)
                    {
                        DataTable dt = new DataTable();
                        dt.Columns.Add("MIOID", typeof(Int32));
                        dt.Columns.Add("SampleID", typeof(Int32));
                        dt.Columns.Add("Quantity", typeof(Int32));
                        //dt.Columns.Add("MonthYear", typeof(String));

                        for (int i = 1; i < ds.Tables[0].Rows.Count; i++)
                        {
                            DataRow dr = ds.Tables[0].Rows[i];
                            String sampleID, EmployeeID, Month1, Quantity1;

                            EmployeeID = dr[0].ToString();
                            sampleID = dr[4].ToString();
                            Quantity1 = dr[7].ToString().Trim();
                            var monthName = ds.Tables[0].Rows[0][7].ToString().Remove(0, 22);

                            Month1 = (new DateTime(Int32.Parse(monthName.ToString().Split(' ')[1].Trim()),
                                              DateTimeFormatInfo.CurrentInfo.MonthNames.ToList().IndexOf(monthName.ToString().Split(' ')[0].Trim()) + 1, 1)).ToString();

                            if (!(String.IsNullOrEmpty(Quantity1) || Quantity1 == "0"))
                                dt.Rows.Add(EmployeeID, sampleID, Quantity1);
                        }


                        SqlCommand command = new SqlCommand();
                        command.Parameters.AddWithValue("RecordValues", dt);
                        command.Parameters.AddWithValue("ReceiveType", "S");

                        var results = GetData("sp_CreateRecordsForMIOSamples", command);
                        results.ToString();

                        //if (results.Tables != null)
                        //{
                        //    Process(batchID);
                        //}
                    }
                }

                #endregion
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("READ Exceptiion::" + ex.Message + " Stack Trace::" + ex.StackTrace.ToString());
            }
        }

        private Boolean Process(string batchID)
        {
            try
            {
                _nv.Clear();
                _nv.Add("@BatchMasterID-int", batchID.ToString());
                var result = DL.GetData("sp_SampleUploadBatchWorker", _nv);
            }
            catch (Exception exception)
            {
                ErrorLog("ERROR :: A Fatal Exception Occurred During Fetching List For Batch Samples: " + exception.Message);
                return false;
            }
            return true;
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

        private void UploadWork(HttpContext contxt)
        {
            contxt.Response.ContentType = "text/plain";
            contxt.Response.Expires = -1;
            try
            {
                HttpPostedFile postedFile = contxt.Request.Files["file"];
                string savepath = "";
                string tempPath = "";
                tempPath = @"C:\PocketDCR\Excel";
                savepath = tempPath;
                
                if (!Directory.Exists(savepath))
                    Directory.CreateDirectory(savepath);

                String fileName = @"SampleSheetUploader-" + DateTime.Now.ToFileTime() + ".xlsx";
                postedFile.SaveAs(savepath + @"\" + fileName);

                contxt.Response.ContentType = "text/plain";
                contxt.Response.Write(fileName);
                contxt.Response.StatusCode = 200;
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("ERROR : UploadWork Method in SampleSheetUploader.ashx: and MESSAGE::" + ex.Message + "STACK" + ex.StackTrace.ToString());
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

        #region HelperClasses --Arsal

        class RequestObjectClass
        {
            public string Date { get; set; }
            public string type { get; set; }
            public string productSkuIDs { get; set; }
            public string individualOrHierachy { get; set; }
            public string levelName { get; set; }
            public string levelID { get; set; }
            public string level1 { get; set; }
            public string level2 { get; set; }
            public string level3 { get; set; }
            public string level4 { get; set; }
            public string level5 { get; set; }
            public string level6 { get; set; }
            public string EmployeeId { get; set; }
        }

        #endregion

        #region Private Functions

        private static void ErrorLog(string error)
        {
            try
            {
                if (!Directory.Exists(ConfigurationManager.AppSettings["Logs"].ToString()))
                {
                    Directory.CreateDirectory(ConfigurationManager.AppSettings["Logs"].ToString());
                }

                File.AppendAllText(ConfigurationManager.AppSettings[@"Logs\"].ToString() + "Log_SamplesProccssing" + DateTime.UtcNow.ToString("yyyy_MM_dd") + ".txt",
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