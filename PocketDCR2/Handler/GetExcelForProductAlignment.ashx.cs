using OfficeOpenXml;
using OfficeOpenXml.Style;
using PocketDCR2.Classes;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace PocketDCR2.Handler
{
    /// <summary>
    /// Summary description for GetExcelForProductAlignment
    /// </summary>
       public class GetExcelForProductAlignment : IHttpHandler
        {
            #region Object Intialization
            NameValueCollection _nv = new NameValueCollection();
            DAL DL = new DAL();
            string employeeid = string.Empty;
            string filename1 = string.Empty;
            #endregion

            #region Database Layer

            private System.Data.DataSet GetData2(String SpName, NameValueCollection NV)
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
                    Console.Out.WriteLine(exception.Message);
                    PocketDCR2.Classes.Constants.ErrorLog("Exception at Store Proc: " + SpName + " & Message: " + exception.Message.ToString());
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
                    //PocketDCR2.Classes.Constants.SampleErrorLog("ERROR : Proc:" + SpName + "and MESSAGE::" + exception.Message + "STACK" + exception.StackTrace.ToString());

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

            #endregion

            #region Handler Methods

            public void ProcessRequest(HttpContext context)
            {
                RequestObjectClass requestResponse = new RequestObjectClass();
                try
                {
                    string response = context.Request["requestObject"];
                    if (response != null)
                    {
                        requestResponse = new JavaScriptSerializer().Deserialize<RequestObjectClass>(response);
                        string FileName = "ProductUnMapSheet-" + requestResponse.Date;

                        string MonthName = requestResponse.Date.Split('-', ' ')[0];
                        string year = requestResponse.Date.Split('-', ' ')[1];
                        int RecMonth = DateTime.ParseExact(MonthName, "MMMM", CultureInfo.CurrentCulture).Month;
                        string completedate = RecMonth + "/" + "1" + "/" + year + " " + DateTime.Now.TimeOfDay;
                        DateTime MonthDate = Convert.ToDateTime(completedate);
                        int mapproduct = Convert.ToInt32(requestResponse.isMap);

                        if (requestResponse.type == "D")
                        {
                            #region Download Work

                            MemoryStream ms = new MemoryStream();

                            _nv.Clear();
                            _nv.Add("@Month-int", MonthDate.Month.ToString());
                            _nv.Add("@Year-int", MonthDate.Year.ToString());
                            _nv.Add("@Distributor-int", requestResponse.Distributor.ToString());
                            _nv.Add("@Check-bit", requestResponse.isMap);
                            DataSet dsProductUnMapList = GetData2("sp_GetProductUnMapList", _nv);

                            _nv.Clear();
                            DataSet prodList = GetData2("sp_GetProductListForExcel", _nv);

                            ms = GetExcelForProductAlignment.DataTableToExcelXlsx(dsProductUnMapList, prodList, mapproduct);

                            ms.WriteTo(context.Response.OutputStream);
                            context.Response.ContentType = "application/vnd.ms-excel";
                            context.Response.AddHeader("Content-Disposition", "attachment;filename=" + FileName.Replace(" ", string.Empty).Trim() + ".xlsx");
                            context.Response.StatusCode = 200;

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

            #endregion

            #region Methods

            public static MemoryStream DataTableToExcelXlsx(DataSet tableSet, DataSet tableSet2,int mapproduct)
            {
                DataTable table = tableSet.Tables[0];
                DataTable table2 = tableSet2.Tables[0];
                DataTable Remarks = tableSet.Tables[1];

                MemoryStream Result = new MemoryStream();
                ExcelPackage pack = new ExcelPackage();

                ExcelWorksheet ws ;
                ExcelWorksheet ws2;



                if (mapproduct < 1)
                {

                    ws = pack.Workbook.Worksheets.Add("Un-mapped Products");

                    ws2 = pack.Workbook.Worksheets.Add("Products Universe");

                    ws.Row(1).Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    ws.Cells[1, 4].Value = "Un-mapped Product List";
                    ws.Cells[2, 1].Value = "Caution: Please Do Not alter the Values of Column A to Column E. Enter Remarks if there is no mapping otherwise leave it blank.";

                    ws.Protection.IsProtected = true;
                    ws.Row(3).Style.Locked = false;
                    ws.Column(6).Style.Locked = false;
                    ws.Column(7).Style.Locked = false;
                    ws.Column(8).Style.Locked = false;
                    ws.Column(9).Style.Locked = false;

                    ws.Row(1).Style.Font.Bold = true;
                    ws.Row(2).Style.Font.Bold = true;
                    ws.Row(3).Style.Font.Bold = true;

                    ws.Row(1).Style.Font.Size = 18;
                    ws.Row(2).Style.Font.Size = 10;
                    ws.Row(3).Style.Font.Size = 12;

                    ws.Cells[3, 1].Value = "PK_ID";
                    ws.Cells[3, 2].Value = "Distributor Code";
                    ws.Cells[3, 3].Value = "Distributor Name";
                    ws.Cells[3, 4].Value = "Dist Product Code";
                    ws.Cells[3, 5].Value = "Dist Product Name";
                    ws.Cells[3, 6].Value = "System ProductId";
                    ws.Cells[3, 7].Value = "System ProductCode";
                    ws.Cells[3, 8].Value = "System ProductName";
                    ws.Cells[3, 9].Value = "Remarks";

    
                }
                else
                {
                    ws = pack.Workbook.Worksheets.Add("Mapped Products");

                    ws2 = pack.Workbook.Worksheets.Add("Products Universe");

                    ws.Row(1).Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    ws.Cells[1, 4].Value = "Mapped Product List";
                    ws.Cells[2, 1].Value = "Caution: Please Do Not alter the Values of Column A to Column E";

                    ws.Protection.IsProtected = true;
                    ws.Row(3).Style.Locked = false;
                    ws.Column(6).Style.Locked = false;
                    ws.Column(7).Style.Locked = false;
                    ws.Column(8).Style.Locked = false;
                   // ws.Column(9).Style.Locked = false;

                    ws.Row(1).Style.Font.Bold = true;
                    ws.Row(2).Style.Font.Bold = true;
                    ws.Row(3).Style.Font.Bold = true;

                    ws.Row(1).Style.Font.Size = 18;
                    ws.Row(2).Style.Font.Size = 10;
                    ws.Row(3).Style.Font.Size = 12;

                    ws.Cells[3, 1].Value = "PK_ID";
                    ws.Cells[3, 2].Value = "Distributor Code";
                    ws.Cells[3, 3].Value = "Distributor Name";
                    ws.Cells[3, 4].Value = "Dist Product Code";
                    ws.Cells[3, 5].Value = "Dist Product Name";
                    ws.Cells[3, 6].Value = "System ProductId";
                    ws.Cells[3, 7].Value = "System ProductCode";
                    ws.Cells[3, 8].Value = "System ProductName";
                    //ws.Cells[3, 9].Value = "Remarks";

                }
                
               


                ws2.Cells.AutoFilter = true;
                ws2.Row(1).Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                ws2.Cells[1, 5].Value = "Product List";
                ws2.Row(1).Style.Font.Bold = true;
                ws2.Row(2).Style.Font.Bold = true;
                ws2.Row(1).Style.Font.Size = 18;
                ws2.Row(2).Style.Font.Size = 12;

                ws2.Cells[2, 1].Value = "Team Name";
                ws2.Cells[2, 2].Value = "Product Name";
                ws2.Cells[2, 3].Value = "SKU ID";
                ws2.Cells[2, 4].Value = "SKU Code";
                ws2.Cells[2, 5].Value = "SKU Name";
                ws2.Cells[2, 6].Value = "Form";
                ws2.Cells[2, 7].Value = "Strength";
                ws2.Cells[2, 8].Value = "Package Size";
                ws2.Cells[2, 9].Value = "Status";
                ws2.Cells[2, 10].Value = "T.P";
                ws2.Cells[2, 11].Value = "D.P";
                ws2.Cells[2, 12].Value = "M.R.P";


                //ws.Cells["E2:P2"].Style.Locked = true;

                int col = 1;
                int row = 4;

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


                ws.Protection.SetPassword("!@#ExcelPassword");
                ws.Protection.AllowSort = true;

                ws.Protection.AllowAutoFilter = true;
                int col1 = 1;
                int row1 = 3;

                if (table2 != null)
                {

                    foreach (DataRow rw2 in table2.Rows)
                    {
                        foreach (DataColumn cl2 in table2.Columns)
                        {
                            if (rw2[cl2.ColumnName] != DBNull.Value)
                                ws2.Cells[row1, col1].Value = rw2[cl2.ColumnName].ToString();
                            col1++;
                        }

                        row1++;
                        col1 = 1;
                    }
                }
                //var a=Remarks.Rows[0];
                //ws2.Cells[2, 9].Value = Remarks.Rows[0];
                var valdidateProduct2 = ws.Cells[3, 9, (table.Rows.Count + 3), 9].DataValidation.AddListDataValidation();
                valdidateProduct2.ShowErrorMessage = true;
                valdidateProduct2.Error = "Please Select Remarks from Supplied Dropdown";

                for (int i = 0; i < Remarks.Rows.Count; i++)
                {
                    valdidateProduct2.Formula.Values.Add(Remarks.Rows[i][0].ToString());
                }

                using (ExcelRange Rng = ws.Cells[1, 4, 1, 6])
                {
                    Rng.Merge = true;
                    Rng.Style.Font.Color.SetColor(Color.Black);
                    Rng.Style.Fill.PatternType = ExcelFillStyle.Solid;
                    Rng.Style.Fill.BackgroundColor.SetColor(Color.LightBlue);
                }

                if (mapproduct < 1)
                {

                    using (ExcelRange Rng = ws.Cells[2, 1, 2, 9])
                    {
                        Rng.Merge = true;
                    }
                    using (ExcelRange Rng = ws.Cells[3, 1, 3, 9])
                    {
                        Rng.AutoFilter = true;
                        Rng.Worksheet.Protection.AllowSort = true;
                        Rng.Style.Font.Color.SetColor(Color.Black);
                        Rng.Style.Fill.PatternType = ExcelFillStyle.Solid;
                        Rng.Style.Fill.BackgroundColor.SetColor(Color.Yellow);
                    }

                }
                else
                {
                    using (ExcelRange Rng = ws.Cells[2, 1, 2, 8])
                    {
                        Rng.Merge = true;
                    }
                    using (ExcelRange Rng = ws.Cells[3, 1, 3, 8])
                    {
                        Rng.AutoFilter = true;
                        Rng.Worksheet.Protection.AllowSort = true;
                        Rng.Style.Font.Color.SetColor(Color.Black);
                        Rng.Style.Fill.PatternType = ExcelFillStyle.Solid;
                        Rng.Style.Fill.BackgroundColor.SetColor(Color.Yellow);
                    }
                }

                ws.Cells.AutoFitColumns();
                using (ExcelRange Rng = ws2.Cells[2, 1, 2, 12])
                {
                    Rng.AutoFilter = true;
                }
                ws2.Cells.AutoFitColumns();
                pack.SaveAs(Result);
                return Result;
            }

            private void ReadExcelFile(string FileName)
            {
                #region Reading Excel To DataTable
                try
                {
                    PocketDCR2.Classes.Constants.ErrorLog("START READING");
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


                    PocketDCR2.Classes.Constants.ErrorLog("CLOSE READING");
                #endregion

                    #region Working On Read Excel

                    if (ds != null)
                    {

                        PocketDCR2.Classes.Constants.ErrorLog("START PROC sp_GenerateUnMapProductOnlyUploadBatch");

                        string excelFileName;
                        excelFileName = FileName;
                        _nv.Clear();
                        _nv.Add("@ExcelFileName-int", excelFileName);
                        DataSet dsR = GetData2("sp_GenerateUnMapProductOnlyUploadBatch", _nv);

                        string batchID = dsR.Tables[0].Rows[0][0].ToString();

                        DataTable dt = new DataTable();

                        dt.Columns.Add("BatchID", typeof(Int32));
                        dt.Columns.Add("pk_ProductMapId", typeof(Int32));
                        dt.Columns.Add("DistributorCode", typeof(Int32));
                        dt.Columns.Add("DistributorName", typeof(String));
                        dt.Columns.Add("DistProductCode", typeof(String));
                        dt.Columns.Add("DistProductName", typeof(String));
                        dt.Columns.Add("SystemProductId", typeof(String));
                        dt.Columns.Add("SystemProductCode", typeof(String));
                        dt.Columns.Add("SysProductName", typeof(String));
                        dt.Columns.Add("SysRemarks", typeof(string));
                        dt.Columns.Add("Remarks", typeof(string));

                        for (int i = 2; i < ds.Tables[0].Rows.Count; i++)
                        {
                            DataRow dr = ds.Tables[0].Rows[i];

                            String pk_ProductMapId, DistributorCode, DistributorName, DistProductCode, DistProductName, SystemProductId, SystemProductCode, SysProductName, SysRemarks;

                            pk_ProductMapId = dr[0].ToString();
                            DistributorCode = dr[1].ToString();
                            DistributorName = dr[2].ToString();
                            DistProductCode = dr[3].ToString();
                            DistProductName = dr[4].ToString();
                            SystemProductId = dr[5].ToString();
                            SystemProductCode = dr[6].ToString();
                            SysProductName = dr[7].ToString();
                            SysRemarks = dr[8].ToString();
                            if (pk_ProductMapId != null)
                            {
                                dt.Rows.Add(batchID, pk_ProductMapId, DistributorCode, DistributorName, DistProductCode, DistProductName, SystemProductId, SystemProductCode, SysProductName, SysRemarks, "");
                            }
                        }

                        SqlCommand command = new SqlCommand();
                        command.Parameters.AddWithValue("RecordValues", dt);
                        var results = GetData("sp_CreateBatchRecordsForUnMapProducttData", command);

                        if (results != null)
                        {
                            _nv.Clear();
                            _nv.Add("@BatchMasterID-int", batchID.ToString());
                            var insertData = GetData2("sp_UnMapProductUploadBatchWorker", _nv);

                            insertData.ToString();
                        }
                    }
                }
                catch (Exception ex)
                {
                    PocketDCR2.Classes.Constants.ErrorLog("READ Exceptiion::" + ex.Message + " Stack Trace::" + ex.StackTrace.ToString());

                }

                    #endregion
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
                    tempPath = ConfigurationManager.AppSettings["UnMapProductExcel"];
                    savepath = tempPath;
                    if (!Directory.Exists(savepath))
                        Directory.CreateDirectory(savepath);

                    String fileName = @"UnMapProductSheetUploader-" + DateTime.Now.ToFileTime() + ".xlsx";
                    postedFile.SaveAs(savepath + @"\" + fileName);

                    contxt.Response.ContentType = "text/plain";
                    contxt.Response.Write(fileName);
                    contxt.Response.StatusCode = 200;
                }
                catch (Exception ex)
                {
                    PocketDCR2.Classes.Constants.ErrorLog("ERROR : UploadWork Method in GetExcelForProductAlignment.ashx: and MESSAGE::" + ex.Message + "STACK" + ex.StackTrace.ToString());

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
                    tempPath = ConfigurationManager.AppSettings["UnMapProductExcel"];
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
                    else result = "ERROR";
                }
                contxt.Response.Write(result);
            }

            class RequestObjectClass
            {
                public string Date { get; set; }
                public string type { get; set; }
                public string Distributor { get; set; }
                public string isMap { get; set; }
            }

            #endregion
        }
    }