using LinqToExcel;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using OfficeOpenXml.Style;
using System.Text.RegularExpressions;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;

namespace SalesDataProcessor.Classes
{
    class GeneratedSalesDataRecords
    {


        private DAL _dal;
        private NameValueCollection _nvCollection = new NameValueCollection();

        private string smtphost = ConfigurationManager.AppSettings["AutoEmailSMTP"].ToString();
        private string smtpPort = ConfigurationManager.AppSettings["smtpPort"].ToString();
        private string fromAddress = ConfigurationManager.AppSettings["AutoEmailID"].ToString();
        private string ToAddress = ConfigurationManager.AppSettings["ToAddressForExcelFile"].ToString();
        private string smtppassword = ConfigurationManager.AppSettings["AutoEmailIDpass"].ToString();
        string batch = string.Empty;
        string MasterIDForEmial = string.Empty;

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

        public GeneratedSalesDataRecords()
        {
            var BatchIDMaster = string.Empty;
            var fileCount = string.Empty;
            var EmailStatus = string.Empty;
            var custBatchID = string.Empty;
            var INVBatchID = string.Empty;

            try
            {

                DateTime time;                
                Console.WriteLine("System Started Extracting Files Records At :: " + DateTime.Now);

                DataSet queueList = DataLayer.GetData("sp_GetExcelFilesForExtraction", null);

                fileCount = queueList.Tables[0].Rows.Count.ToString();

                foreach (DataRow rowbatch in queueList.Tables[0].Rows)
                {
                    EmailStatus = rowbatch.Table.Rows[0]["EmailStatus"].ToString();
                    MasterIDForEmial = rowbatch.Table.Rows[0][0].ToString();

                    string FileName = "";
                    try
                    {
                        batch = rowbatch["ID"].ToString();
                        BatchIDMaster = batch;

                        FileName = rowbatch["FileName"].ToString();

                        Console.WriteLine("System Started Files Records " + FileName + " At :: " + DateTime.Now);


                        time = DateTime.Now;
                        _nvCollection.Clear();
                        _nvCollection.Add("@masterFileInfoID-int", batch.ToString());

                        
                        if (FileName.ToString().ToUpper().Contains("CUST"))
                        {
                            var result = _dal.GetData("sp_InsertCustRecords", _nvCollection);
                            custBatchID = batch.ToString();
                        }
                        else if (FileName.ToString().ToUpper().Contains("INV"))
                        {
                            var result = _dal.GetData("sp_InsertINVRecords", _nvCollection);
                            INVBatchID = batch.ToString();
                        }
                        else if (FileName.ToString().ToUpper().Contains("STOCK"))
                        {
                            var result = _dal.GetData("sp_InsertStockRecords", _nvCollection);
                        }


                        Console.WriteLine("File Name As " + FileName + " Takes About: " + (DateTime.Now - time).TotalMinutes);


                    }
                    catch (Exception exception)
                    {
                        // ErrorLog("ERROR :: A Fatal Exception Occurred During Fetching List For Batch Samples: " + exception.Message);
                    }

                    //finally
                    //{
                    //    if (FileName.ToString().Contains("INV"))
                    //    {

                    //        //_dal.GetData("sp_Process_txttoDSR", null);
                    //    }
                    //}
                }


            }
            catch (Exception exception)
            {
                // ErrorLog("ERROR :: A Fatal Exception Occurred During Fetching List For Batch Samples: " + exception.Message);

            }
            finally
            {
                _dal.GetData("sp_Process_txttoDSR", new NameValueCollection
                {
                    {"@Date-date", DateTime.Now.ToString("MM-dd-yyyy")}
                });

                int col = 1;
                int row = 2;
                #region Excel Email Generated
                if (!Directory.Exists(ConfigurationManager.AppSettings["SalesExcelFile"].ToString()))
                {
                    Directory.CreateDirectory(ConfigurationManager.AppSettings["SalesExcelFile"].ToString());
                }
                var applicationPath = ConfigurationManager.AppSettings["SalesExcelFile"].ToString();
                Random r = new Random();
                int n = r.Next();
                #region Worksheet
                var fileInfo = new FileInfo(applicationPath + @"\ExcelSalesDataInformation" + n + ".xlsx");
                string GlobalDistCode = string.Empty;
                var pack = new ExcelPackage(fileInfo);
                ExcelWorksheet ws = pack.Workbook.Worksheets["Test"];
                string DistCode = string.Empty;
                #endregion
                #region Formatting

                if (batch.ToString() != "0" && batch.ToString() != "")
                {

                    if (pack.Workbook.Worksheets.Count > 0)
                    {

                        ws = pack.Workbook.Worksheets["UnMapDistributorBrick"];
                        pack.Workbook.Worksheets.Delete("UnMapDistributorBrick");
                        ws = pack.Workbook.Worksheets.Add("UnMapDistributorBrick");


                    }
                    else
                    {


                        ws = pack.Workbook.Worksheets.Add("UnMapDistributorBrick");

                    }
                    ws.Cells[1, 1].Value = "Distributor Code";
                    ws.Cells[1, 1].Style.Font.Bold = true;
                    ws.Cells[1, 1].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    ws.Cells[1, 1].Style.Font.Size = 11;
                    ws.Cells[1, 1].Style.Font.Name = "Arial";


                    ws.Cells[1, 2].Value = "Distributor Name";
                    ws.Cells[1, 2].Style.Font.Bold = true;
                    ws.Cells[1, 2].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    ws.Cells[1, 2].Style.Font.Size = 11;
                    ws.Cells[1, 2].Style.Font.Name = "Verdana";

                    ws.Cells[1, 3].Value = "Dist BrickCode";
                    ws.Cells[1, 3].Style.Font.Bold = true;
                    ws.Cells[1, 3].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    ws.Cells[1, 3].Style.Font.Size = 11;
                    ws.Cells[1, 3].Style.Font.Name = "Verdana";



                    ws.Cells[1, 4].Value = "Dist BrickName";
                    ws.Cells[1, 4].Style.Font.Bold = true;
                    ws.Cells[1, 4].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    ws.Cells[1, 4].Style.Font.Size = 11;
                    ws.Cells[1, 4].Style.Font.Name = "Verdana";
                    for (int i = 0; i < fileCount.Length; i++)
                    {
                        DataSet dt = null;
                        int ittrationCount = 0;


                        string str2 = string.Empty;

                        int val = 0;
                        var matches = Regex.Matches(BatchIDMaster.ToString(), @"\d+");
                        foreach (var match in matches)
                        {
                            str2 += match;

                            if (GlobalDistCode == str2)
                            {
                                break;
                            }
                            else
                            {
                                GlobalDistCode = str2;
                                var batchID = batch[i].ToString();

                                _nvCollection.Clear();
                                _nvCollection.Add("@ID-varchar(20)", BatchIDMaster.ToString());
                                DataSet Custmr = DataLayer.GetData("sp_getUnMapDistributorBrickData", _nvCollection);


                                var Calls = Custmr.Tables[0];
                                if (Calls != null && Calls.Rows.Count > 0)
                                {

                                    foreach (DataRow rw in Calls.Rows)
                                    {
                                        foreach (DataColumn cl in Calls.Columns)
                                        {

                                            try
                                            {
                                                if (rw[cl.ColumnName] != DBNull.Value)
                                                {
                                                    ws.Cells[row, col].Value = rw[cl.ColumnName].ToString();
                                                    //ws.Cells[row, col].Style.Fill.PatternType = ExcelFillStyle.Solid;
                                                    col++;
                                                }
                                                else
                                                {
                                                    ws.Cells[row, col].Value = "";
                                                }
                                            }
                                            catch (Exception ex)
                                            {

                                                Console.WriteLine(ex.Message);
                                            }

                                        }
                                        row = row + 1;
                                        col = 1;
                                    }
                                }
                            }

                        }
                    }
                    col = 1;
                    row = 2;
                    ExcelWorksheet wsProduct = pack.Workbook.Worksheets["Testproduct"];
                    if (pack.Workbook.Worksheets.Count > 0)
                    {

                        wsProduct = pack.Workbook.Worksheets["UnMapDistributorProduct"];
                        ////pack.Workbook.Worksheets.Delete("UnMapDistributorProduct");
                        wsProduct = pack.Workbook.Worksheets.Add("UnMapDistributorProduct");


                    }
                    else
                    {


                        wsProduct = pack.Workbook.Worksheets.Add("UnMapDistributorProduct");

                    }
                    wsProduct.Cells[1, 1].Value = "Distributor Code";
                    wsProduct.Cells[1, 1].Style.Font.Bold = true;
                    wsProduct.Cells[1, 1].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    wsProduct.Cells[1, 1].Style.Font.Size = 11;
                    wsProduct.Cells[1, 1].Style.Font.Name = "Arial";


                    wsProduct.Cells[1, 2].Value = "Distributor Name";
                    wsProduct.Cells[1, 2].Style.Font.Bold = true;
                    wsProduct.Cells[1, 2].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    wsProduct.Cells[1, 2].Style.Font.Size = 11;
                    wsProduct.Cells[1, 2].Style.Font.Name = "Verdana";

                    wsProduct.Cells[1, 3].Value = "Dist BrickCode";
                    wsProduct.Cells[1, 3].Style.Font.Bold = true;
                    wsProduct.Cells[1, 3].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    wsProduct.Cells[1, 3].Style.Font.Size = 11;
                    wsProduct.Cells[1, 3].Style.Font.Name = "Verdana";



                    wsProduct.Cells[1, 4].Value = "Dist ProductName";
                    wsProduct.Cells[1, 4].Style.Font.Bold = true;
                    wsProduct.Cells[1, 4].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    wsProduct.Cells[1, 4].Style.Font.Size = 11;
                    wsProduct.Cells[1, 4].Style.Font.Name = "Verdana";
                    for (int i = 0; i < fileCount.Length; i++)
                    {
                        GlobalDistCode = string.Empty;
                        string str2 = batch[i].ToString(); ;



                        _nvCollection.Clear();
                        _nvCollection.Add("@ID-varchar(20)", BatchIDMaster.ToString());
                        DataSet Custmrprod = DataLayer.GetData("sp_getUnMapDistributorProductData", _nvCollection);


                        var Callsprod = Custmrprod.Tables[0];
                        if (Callsprod != null && Callsprod.Rows.Count > 0)
                        {

                            foreach (DataRow rw in Callsprod.Rows)
                            {
                                foreach (DataColumn cl in Callsprod.Columns)
                                {

                                    try
                                    {
                                        if (rw[cl.ColumnName] != DBNull.Value)
                                        {
                                            wsProduct.Cells[row, col].Value = rw[cl.ColumnName].ToString();
                                            //ws.Cells[row, col].Style.Fill.PatternType = ExcelFillStyle.Solid;
                                            col++;
                                        }
                                        else
                                        {
                                            wsProduct.Cells[row, col].Value = "";
                                        }
                                    }
                                    catch (Exception ex)
                                    {

                                        Console.WriteLine(ex.Message);
                                    }

                                }
                                row = row + 1;
                                col = 1;
                            }
                        }

                    }

                    col = 1;
                    row = 2;
                    ExcelWorksheet wscust = pack.Workbook.Worksheets["Testproduct"];
                    if (pack.Workbook.Worksheets.Count > 0)
                    {

                        wscust = pack.Workbook.Worksheets["CustomerFileData"];
                        wscust = pack.Workbook.Worksheets.Add("CustomerFileData");


                    }
                    else
                    {


                        wscust = pack.Workbook.Worksheets.Add("CustomerFileData");

                    }
                    wscust.Cells[1, 1].Value = "Distributor Code";
                    wscust.Cells[1, 1].Style.Font.Bold = true;
                    wscust.Cells[1, 1].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    wscust.Cells[1, 1].Style.Font.Size = 11;
                    wscust.Cells[1, 1].Style.Font.Name = "Arial";

                    wscust.Cells[1, 2].Value = "Distributor Name";
                    wscust.Cells[1, 2].Style.Font.Bold = true;
                    wscust.Cells[1, 2].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    wscust.Cells[1, 2].Style.Font.Size = 11;
                    wscust.Cells[1, 2].Style.Font.Name = "Arial";

                    wscust.Cells[1, 3].Value = "Customer Code";
                    wscust.Cells[1, 3].Style.Font.Bold = true;
                    wscust.Cells[1, 3].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    wscust.Cells[1, 3].Style.Font.Size = 11;
                    wscust.Cells[1, 3].Style.Font.Name = "Arial";


                    wscust.Cells[1, 4].Value = "Customer Name";
                    wscust.Cells[1, 4].Style.Font.Bold = true;
                    wscust.Cells[1, 4].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    wscust.Cells[1, 4].Style.Font.Size = 11;
                    wscust.Cells[1, 4].Style.Font.Name = "Verdana";

                    wscust.Cells[1, 5].Value = "Address";
                    wscust.Cells[1, 5].Style.Font.Bold = true;
                    wscust.Cells[1, 5].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    wscust.Cells[1, 5].Style.Font.Size = 11;
                    wscust.Cells[1, 5].Style.Font.Name = "Verdana";

                    wscust.Cells[1, 6].Value = "City";
                    wscust.Cells[1, 6].Style.Font.Bold = true;
                    wscust.Cells[1, 6].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    wscust.Cells[1, 6].Style.Font.Size = 11;
                    wscust.Cells[1, 6].Style.Font.Name = "Verdana";


                    wscust.Cells[1, 7].Value = "Town ID";
                    wscust.Cells[1, 7].Style.Font.Bold = true;
                    wscust.Cells[1, 7].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    wscust.Cells[1, 7].Style.Font.Size = 11;
                    wscust.Cells[1, 7].Style.Font.Name = "Verdana";

                    wscust.Cells[1, 8].Value = "Town";
                    wscust.Cells[1, 8].Style.Font.Bold = true;
                    wscust.Cells[1, 8].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    wscust.Cells[1, 8].Style.Font.Size = 11;
                    wscust.Cells[1, 8].Style.Font.Name = "Verdana";

                    wscust.Cells[1, 9].Value = "Status";
                    wscust.Cells[1, 9].Style.Font.Bold = true;
                    wscust.Cells[1, 9].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    wscust.Cells[1, 9].Style.Font.Size = 11;
                    wscust.Cells[1, 9].Style.Font.Name = "Verdana";

                    wscust.Cells[1, 10].Value = "StatusRemarks";
                    wscust.Cells[1, 10].Style.Font.Bold = true;
                    wscust.Cells[1, 10].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    wscust.Cells[1, 10].Style.Font.Size = 11;
                    wscust.Cells[1, 10].Style.Font.Name = "Verdana";

                    for (int i = 0; i < fileCount.Length; i++)
                    {
                        GlobalDistCode = string.Empty;
                        string str2 = batch[i].ToString(); ;



                        _nvCollection.Clear();
                        _nvCollection.Add("@ExcelFileID-bigint", custBatchID.ToString());
                        DataSet Custdata = DataLayer.GetData("sp_getErrorDataCustFile", _nvCollection);


                        var Cust = Custdata.Tables[0];
                        if (Cust != null && Cust.Rows.Count > 0)
                        {

                            foreach (DataRow rw in Cust.Rows)
                            {
                                foreach (DataColumn cl in Cust.Columns)
                                {

                                    try
                                    {
                                        if (rw[cl.ColumnName] != DBNull.Value)
                                        {
                                            wscust.Cells[row, col].Value = rw[cl.ColumnName].ToString();
                                            col++;
                                        }
                                        else
                                        {
                                            wscust.Cells[row, col].Value = "";
                                        }
                                    }
                                    catch (Exception ex)
                                    {

                                        Console.WriteLine(ex.Message);
                                    }

                                }
                                row = row + 1;
                                col = 1;
                            }
                        }

                    }

                    col = 1;
                    row = 2;
                    ExcelWorksheet wsInvoice = pack.Workbook.Worksheets["Testproduct"];
                    if (pack.Workbook.Worksheets.Count > 0)
                    {

                        wsInvoice = pack.Workbook.Worksheets["InvoiceFileData"];
                        wsInvoice = pack.Workbook.Worksheets.Add("InvoiceFileData");


                    }
                    else
                    {


                        wsInvoice = pack.Workbook.Worksheets.Add("InvoiceFileData");

                    }
                    wsInvoice.Cells[1, 1].Value = "Distributor Code";
                    wsInvoice.Cells[1, 1].Style.Font.Bold = true;
                    wsInvoice.Cells[1, 1].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    wsInvoice.Cells[1, 1].Style.Font.Size = 11;
                    wsInvoice.Cells[1, 1].Style.Font.Name = "Arial";

                    wsInvoice.Cells[1, 2].Value = "Distributor Name";
                    wsInvoice.Cells[1, 2].Style.Font.Bold = true;
                    wsInvoice.Cells[1, 2].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    wsInvoice.Cells[1, 2].Style.Font.Size = 11;
                    wsInvoice.Cells[1, 2].Style.Font.Name = "Arial";

                    wsInvoice.Cells[1, 3].Value = "CUSTOMER Code";
                    wsInvoice.Cells[1, 3].Style.Font.Bold = true;
                    wsInvoice.Cells[1, 3].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    wsInvoice.Cells[1, 3].Style.Font.Size = 11;
                    wsInvoice.Cells[1, 3].Style.Font.Name = "Arial";

                    wsInvoice.Cells[1, 4].Value = "Brick Code";
                    wsInvoice.Cells[1, 4].Style.Font.Bold = true;
                    wsInvoice.Cells[1, 4].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    wsInvoice.Cells[1, 4].Style.Font.Size = 11;
                    wsInvoice.Cells[1, 4].Style.Font.Name = "Arial";


                    wsInvoice.Cells[1, 5].Value = "Invoice No";
                    wsInvoice.Cells[1, 5].Style.Font.Bold = true;
                    wsInvoice.Cells[1, 5].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    wsInvoice.Cells[1, 5].Style.Font.Size = 11;
                    wsInvoice.Cells[1, 5].Style.Font.Name = "Verdana";

                    wsInvoice.Cells[1, 6].Value = "Invoice Date";
                    wsInvoice.Cells[1, 6].Style.Font.Bold = true;
                    wsInvoice.Cells[1, 6].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    wsInvoice.Cells[1, 6].Style.Font.Size = 11;
                    wsInvoice.Cells[1, 6].Style.Font.Name = "Verdana";



                    wsInvoice.Cells[1, 7].Value = "ProductID";
                    wsInvoice.Cells[1, 7].Style.Font.Bold = true;
                    wsInvoice.Cells[1, 7].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    wsInvoice.Cells[1, 7].Style.Font.Size = 11;
                    wsInvoice.Cells[1, 7].Style.Font.Name = "Verdana";


                    wsInvoice.Cells[1, 8].Value = "Product Name";
                    wsInvoice.Cells[1, 8].Style.Font.Bold = true;
                    wsInvoice.Cells[1, 8].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    wsInvoice.Cells[1, 8].Style.Font.Size = 11;
                    wsInvoice.Cells[1, 8].Style.Font.Name = "Verdana";

                    wsInvoice.Cells[1, 9].Value = "Batch";
                    wsInvoice.Cells[1, 9].Style.Font.Bold = true;
                    wsInvoice.Cells[1, 9].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    wsInvoice.Cells[1, 9].Style.Font.Size = 11;
                    wsInvoice.Cells[1, 9].Style.Font.Name = "Verdana";

                    wsInvoice.Cells[1, 10].Value = "Rate";
                    wsInvoice.Cells[1, 10].Style.Font.Bold = true;
                    wsInvoice.Cells[1, 10].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    wsInvoice.Cells[1, 10].Style.Font.Size = 11;
                    wsInvoice.Cells[1, 10].Style.Font.Name = "Verdana";

                    wsInvoice.Cells[1, 11].Value = "Quantity";
                    wsInvoice.Cells[1, 11].Style.Font.Bold = true;
                    wsInvoice.Cells[1, 11].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    wsInvoice.Cells[1, 11].Style.Font.Size = 11;
                    wsInvoice.Cells[1, 11].Style.Font.Name = "Verdana";

                    wsInvoice.Cells[1, 12].Value = "Bonus";
                    wsInvoice.Cells[1, 12].Style.Font.Bold = true;
                    wsInvoice.Cells[1, 12].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    wsInvoice.Cells[1, 12].Style.Font.Size = 11;
                    wsInvoice.Cells[1, 12].Style.Font.Name = "Verdana";

                    wsInvoice.Cells[1, 13].Value = "Discount";
                    wsInvoice.Cells[1, 13].Style.Font.Bold = true;
                    wsInvoice.Cells[1, 13].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    wsInvoice.Cells[1, 13].Style.Font.Size = 11;
                    wsInvoice.Cells[1, 13].Style.Font.Name = "Verdana";

                    wsInvoice.Cells[1, 14].Value = "Net Amount";
                    wsInvoice.Cells[1, 14].Style.Font.Bold = true;
                    wsInvoice.Cells[1, 14].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    wsInvoice.Cells[1, 14].Style.Font.Size = 11;
                    wsInvoice.Cells[1, 14].Style.Font.Name = "Verdana";

                    wsInvoice.Cells[1, 15].Value = "Reason";
                    wsInvoice.Cells[1, 15].Style.Font.Bold = true;
                    wsInvoice.Cells[1, 15].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    wsInvoice.Cells[1, 15].Style.Font.Size = 11;
                    wsInvoice.Cells[1, 15].Style.Font.Name = "Verdana";

                    wsInvoice.Cells[1, 16].Value = "Status";
                    wsInvoice.Cells[1, 16].Style.Font.Bold = true;
                    wsInvoice.Cells[1, 16].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    wsInvoice.Cells[1, 16].Style.Font.Size = 11;
                    wsInvoice.Cells[1, 16].Style.Font.Name = "Verdana";

                    wsInvoice.Cells[1, 17].Value = "StatusRemarks";
                    wsInvoice.Cells[1, 17].Style.Font.Bold = true;
                    wsInvoice.Cells[1, 17].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    wsInvoice.Cells[1, 17].Style.Font.Size = 11;
                    wsInvoice.Cells[1, 17].Style.Font.Name = "Verdana";

                    for (int i = 0; i < fileCount.Length; i++)
                    {
                        GlobalDistCode = string.Empty;
                        string str2 = batch[i].ToString();



                        _nvCollection.Clear();
                        _nvCollection.Add("@ExcelFileID-bigint", INVBatchID.ToString());
                        DataSet Invoicedata = DataLayer.GetData("sp_getErrorDataInvFile", _nvCollection);


                        var Invoice = Invoicedata.Tables[0];
                        if (Invoice != null && Invoice.Rows.Count > 0)
                        {

                            foreach (DataRow rw in Invoice.Rows)
                            {
                                foreach (DataColumn cl in Invoice.Columns)
                                {

                                    try
                                    {
                                        if (rw[cl.ColumnName] != DBNull.Value)
                                        {
                                            wsInvoice.Cells[row, col].Value = rw[cl.ColumnName].ToString();
                                            col++;
                                        }
                                        else
                                        {
                                            wsInvoice.Cells[row, col].Value = "";
                                        }
                                    }
                                    catch (Exception ex)
                                    {

                                        Console.WriteLine(ex.Message);
                                    }

                                }
                                row = row + 1;
                                col = 1;
                            }
                        }

                    }


                    pack.Save();
                    if (EmailStatus == "0")
                    {
                        SendSalesDistributorMail(ToAddress.ToString(), fileInfo.ToString());
                    }

                }
            }

                #endregion

                #endregion
        }


        #region Commented
        //public GeneratedSalesDataRecords()
        //        {

        //            var Result = DataLayer.GetData("sp_GetSalesFilesForExtraction", null);

        //            DateTime time;
        //            Console.WriteLine("System Started Extracting Files Records At :: " + DateTime.Now);

        //            if (null == Result || Result.Tables.Count < 1)
        //            {
        //                return;
        //            }
        //            foreach (DataRow row in Result.Tables[0].Rows)
        //            {
        //                DataFileInfo dataFileInfo = new DataFileInfo();
        //                dataFileInfo.ID = row["ID"].ToString();
        //                dataFileInfo.FileName = row["FileName"].ToString();
        //                dataFileInfo.FilePath = row["FilePath"].ToString();
        //                dataFileInfo.FileType = row["FileType"].ToString();
        //                dataFileInfo.Extension = row["Extension"].ToString();

        //                time = DateTime.Now;
        //                if (dataFileInfo.Extension.ToUpper()==".TXT")
        //                {
        //                   DumbFileRecords(dataFileInfo);   
        //                }
        //                else if (dataFileInfo.Extension.ToUpper() == ".XLSX")
        //                {
        //                    DumbExcelFileRecords(dataFileInfo);  
        //                }


        //                Console.WriteLine("File Name As " + dataFileInfo.FileName + " Takes About: " + (DateTime.Now - time ).TotalMinutes);
        //                //if (DumbFileRecords(dataFileInfo))
        //                //{
        //                //    /// Code If Need To...

        //                //    //DataLayer.GetData("sp_MarkFileExtractionProcessed", new NameValueCollection
        //                //    //{
        //                //    //    { "@TempSalesFileID-var", dataFileInfo.ID }
        //                //    //});
        //                //}
        //            }
        //        }
        #endregion

        private void SendSalesDistributorMail(string ToAddress, string excelUrl)
        {

            MailMessage mail = new MailMessage();
            mail.Subject = "Sales Distributor Data-Excel";
            mail.From = new MailAddress(fromAddress);
            mail.To.Add(ToAddress);
            string path2 = ConfigurationManager.AppSettings["Pathlogo"].ToString();
            try
            {
                String EmailBody = string.Empty;
                _nvCollection.Clear();
                _nvCollection.Add("@batchID-varchar", batch.ToString());
                DataSet Data = DataLayer.GetData("Sp_VerifySelectedFileDate", _nvCollection);
                if (Data != null)
                {
                    if (Data.Tables[0].Rows.Count > 0)
                    {
                        EmailBody = @"<div style='background-color: #ffffff;'><table style='font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td><div style='margin: 0px auto; max-width: 600px;'><table style='font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0' align='center'><tbody><tr></tr></tbody></table></div></td></tr></tbody></table><table style='font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td><div style='margin: 0px auto; max-width: 600px;'><table style='font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0' align='center'><tbody><tr><td style='text-align: center; vertical-align: top; direction: ltr; font-size: 0px; padding: 9px 0px 9px 0px;'><div style='vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 100%;'><table border='0' width='100%' cellspacing='0' cellpadding='0'><tbody><tr><td style='word-wrap: break-word; font-size: 0px; padding: 0px 0px 0px 0px;' align='center'><table style='border-collapse: collapse; border-spacing: 0px;' border='0' cellspacing='0' cellpadding='0' align='center'><tbody><tr><td style='width: 198px;'><img style='border: none; border-radius: 0px; display: block; font-size: 13px; outline: none; text-decoration: none; width: 100%; height: auto;' title='' src='cid:Footer' alt='' width='198' height='auto'/></td></tr></tbody></table></td></tr></tbody></table></div></td></tr></tbody></table></div></td></tr></tbody></table><table style='font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td><div style='margin: 0px auto; max-width: 600px;'><table style='font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0' align='center'><tbody><tr><td style='text-align: center; vertical-align: top; direction: ltr; font-size: 0px; padding: 9px 0px 9px 0px;'><div style='vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 100%;'><table border='0' width='100%' cellspacing='0' cellpadding='0'><tbody><tr><td style='word-wrap: break-word; font-size: 0px;'></td></tr></tbody></table></div></td></tr></tbody></table></div></td></tr></tbody></table><table style='background: #e85034; font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0'><tbody><tr style='height: 371px;'><td style='height: 371px;'><div style='margin: 0px auto; max-width: 600px;'><table style='font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0' align='center'><tbody><tr><td style='text-align: center; vertical-align: top; direction: ltr; font-size: 0px; padding: 9px 0px 9px 0px;'><div style='vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 100%;'><table border='0' width='100%' cellspacing='0' cellpadding='0'><tbody><tr><td style='word-wrap: break-word; font-size: 0px; padding: 8px 20px 8px 20px;' align='center'><div style='cursor: auto; color: #000000; font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 11px; line-height: 22px; text-align: center;'><p><span style='color: #ffffff;'><span style='font-size: 20px;'> Sales Data not Uploaded!<strong>!</strong></span></span></p></div></td></tr><tr></tr><tr><td style='word-wrap: break-word; font-size: 0px; padding: 0px 20px 0px 20px;' align='left'><div style='cursor: auto; color: #ffffff; font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 11px; line-height: 22px; text-align: left;'><p><span style='font-size: 14px;'>Your Selected month doesn't match with Selected file Invoice Month</span></p><p><span style='font-size: 14px;'>Kindly Re-Upload the file with Correct Month.&nbsp;</span></p><p><span style='font-size: 14px;'>Regards,<br/>CRM Team</span><br/>&nbsp;</p></div></td></tr><tr><td style='word-wrap: break-word; font-size: 0px;'></td></tr></tbody></table></div></td></tr></tbody></table></div></td></tr></tbody></table><table style='font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td><div style='margin: 0px auto; max-width: 600px;'><table style='font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0' align='center'><tbody><tr><td style='text-align: center; vertical-align: top; direction: ltr; font-size: 0px; padding: 9px 0px 9px 0px;'><div style='vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 100%;'><table border='0' width='100%' cellspacing='0' cellpadding='0'><tbody><tr><td style='word-wrap: break-word; font-size: 0px;'></td></tr></tbody></table></div></td></tr></tbody></table></div></td></tr></tbody></table><table style='background: #E3E3E3; font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td><div style='margin: 0px auto; max-width: 600px;'><table style='font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0' align='center'><tbody><tr><td style='text-align: center; vertical-align: top; direction: ltr; font-size: 0px; padding: 9px 0px 9px 0px;'><div style='vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 100%;'><table border='0' width='100%' cellspacing='0' cellpadding='0'><tbody><tr><td style='word-wrap: break-word; font-size: 0px; padding: 0px 20px 0px 20px;' align='center'><div style='cursor: auto; color: #000000; font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 11px; line-height: 22px; text-align: center;'><p>Thank you for using and supporting BMC Solution.</p></div></td></tr><tr><td style='word-wrap: break-word; font-size: 0px; padding: 0px 20px 0px 20px;' align='center'><div style='cursor: auto; color: #000000; font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 11px; line-height: 22px; text-align: center;'><p><a style='color: #e85034;' href='%5Bprofile_link%5D'>*** This is an system generated email, please do not reply ***</a></p></div></td></tr></tbody></table></div></td></tr></tbody></table></div></td></tr></tbody></table></div>";
                    }
                    else
                    {
                        EmailBody = @"<div style='background-color: #ffffff;'><table style='font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td><div style='margin: 0px auto; max-width: 600px;'><table style='font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0' align='center'><tbody><tr></tr></tbody></table></div></td></tr></tbody></table><table style='font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td><div style='margin: 0px auto; max-width: 600px;'><table style='font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0' align='center'><tbody><tr><td style='text-align: center; vertical-align: top; direction: ltr; font-size: 0px; padding: 9px 0px 9px 0px;'><div style='vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 100%;'><table border='0' width='100%' cellspacing='0' cellpadding='0'><tbody><tr><td style='word-wrap: break-word; font-size: 0px; padding: 0px 0px 0px 0px;' align='center'><table style='border-collapse: collapse; border-spacing: 0px;' border='0' cellspacing='0' cellpadding='0' align='center'><tbody><tr><td style='width: 198px;'><img style='border: none; border-radius: 0px; display: block; font-size: 13px; outline: none; text-decoration: none; width: 100%; height: auto;' title='' src='cid:Footer' alt='' width='198' height='auto'/></td></tr></tbody></table></td></tr></tbody></table></div></td></tr></tbody></table></div></td></tr></tbody></table><table style='font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td><div style='margin: 0px auto; max-width: 600px;'><table style='font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0' align='center'><tbody><tr><td style='text-align: center; vertical-align: top; direction: ltr; font-size: 0px; padding: 9px 0px 9px 0px;'><div style='vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 100%;'><table border='0' width='100%' cellspacing='0' cellpadding='0'><tbody><tr><td style='word-wrap: break-word; font-size: 0px;'></td></tr></tbody></table></div></td></tr></tbody></table></div></td></tr></tbody></table><table style='background: #e85034; font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0'><tbody><tr style='height: 371px;'><td style='height: 371px;'><div style='margin: 0px auto; max-width: 600px;'><table style='font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0' align='center'><tbody><tr><td style='text-align: center; vertical-align: top; direction: ltr; font-size: 0px; padding: 9px 0px 9px 0px;'><div style='vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 100%;'><table border='0' width='100%' cellspacing='0' cellpadding='0'><tbody><tr><td style='word-wrap: break-word; font-size: 0px; padding: 8px 20px 8px 20px;' align='center'><div style='cursor: auto; color: #000000; font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 11px; line-height: 22px; text-align: center;'><p><span style='color: #ffffff;'><span style='font-size: 20px;'>Uploaded Sales Data Has Been Proccessed Successfully!<strong>!</strong></span></span></p></div></td></tr><tr></tr><tr><td style='word-wrap: break-word; font-size: 0px; padding: 0px 20px 0px 20px;' align='left'><div style='cursor: auto; color: #ffffff; font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 11px; line-height: 22px; text-align: left;'><p><span style='font-size: 14px;'>Please Find the attached Excel File, With The Proccessed Data Details.</span></p><p><span style='font-size: 14px;'>Kindly Review The Error Message for Each File Type & Details of New Bricks / Products against the Uploaded Sales Data.&nbsp;</span></p><p><span style='font-size: 14px;'>Regards,<br/>CRM Team</span><br/>&nbsp;</p></div></td></tr><tr><td style='word-wrap: break-word; font-size: 0px;'></td></tr></tbody></table></div></td></tr></tbody></table></div></td></tr></tbody></table><table style='font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td><div style='margin: 0px auto; max-width: 600px;'><table style='font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0' align='center'><tbody><tr><td style='text-align: center; vertical-align: top; direction: ltr; font-size: 0px; padding: 9px 0px 9px 0px;'><div style='vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 100%;'><table border='0' width='100%' cellspacing='0' cellpadding='0'><tbody><tr><td style='word-wrap: break-word; font-size: 0px;'></td></tr></tbody></table></div></td></tr></tbody></table></div></td></tr></tbody></table><table style='background: #E3E3E3; font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td><div style='margin: 0px auto; max-width: 600px;'><table style='font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0' align='center'><tbody><tr><td style='text-align: center; vertical-align: top; direction: ltr; font-size: 0px; padding: 9px 0px 9px 0px;'><div style='vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 100%;'><table border='0' width='100%' cellspacing='0' cellpadding='0'><tbody><tr><td style='word-wrap: break-word; font-size: 0px; padding: 0px 20px 0px 20px;' align='center'><div style='cursor: auto; color: #000000; font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 11px; line-height: 22px; text-align: center;'><p>Thank you for using and supporting BMC Solution.</p></div></td></tr><tr><td style='word-wrap: break-word; font-size: 0px; padding: 0px 20px 0px 20px;' align='center'><div style='cursor: auto; color: #000000; font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 11px; line-height: 22px; text-align: center;'><p><a style='color: #e85034;' href='%5Bprofile_link%5D'>*** This is an system generated email, please do not reply ***</a></p></div></td></tr></tbody></table></div></td></tr></tbody></table></div></td></tr></tbody></table></div>";
                    }
                }
               



                mail.Body = EmailBody;

                mail.IsBodyHtml = true;
                AlternateView avHtml = AlternateView.CreateAlternateViewFromString(mail.Body, Encoding.Default, MediaTypeNames.Text.Html);

                string path = System.AppDomain.CurrentDomain.BaseDirectory + "Images";

                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                    string SourceFile = (path2);
                    string filename = Path.GetFileName(SourceFile);
                    string pathTo = (path + "\\" + filename);
                    var fileInfo = new FileInfo(SourceFile);
                    fileInfo.CopyTo(pathTo);
                }


                string path1 = System.AppDomain.CurrentDomain.BaseDirectory + "Images\\Bmclogo.png";

                LinkedResource header = new LinkedResource(path1, MediaTypeNames.Image.Jpeg);
                header.ContentId = "Footer";

                avHtml.LinkedResources.Add(header);
                if (Data != null)
                {
                    if (Data.Tables[0].Rows.Count == 0)
                    {
                        System.Net.Mail.Attachment attachment;
                        attachment = new System.Net.Mail.Attachment(excelUrl);
                        mail.Attachments.Add(attachment);
                    }
                }
                

                mail.AlternateViews.Add(avHtml);
                SmtpClient smtp = new SmtpClient(smtphost, Convert.ToInt32(smtpPort));
                smtp.EnableSsl = false;
                NetworkCredential netCre = new NetworkCredential(fromAddress, smtppassword);
                smtp.Credentials = netCre;

                smtp.Send(mail);

                _nvCollection.Clear();
                _nvCollection.Add("@DistCode-varchar(50)", MasterIDForEmial.ToString());
                DataSet Custmr = DataLayer.GetData("sp_UpdateSalesDistEmailStatusForExcel", _nvCollection);

            }
            catch (IOException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                ErrorLog("EMAIL FAILURE :: Excel Sales Distributor Data Proccessing ::: Failure While Sending Email To " + ToAddress + ". Excel Sheet URL Is:" + excelUrl);
                ErrorLog("STACKTRACE :: " + ex.StackTrace);
                throw ex;
                //ClientScript.RegisterStartupScript(GetType(), "alert", "alert('" + ex.ToString() + "');", true);
            }
        }

        private static void ErrorLog(string error)
        {
            try
            {
                if (!Directory.Exists(ConfigurationManager.AppSettings["Logs"].ToString()))
                {
                    Directory.CreateDirectory(ConfigurationManager.AppSettings["Logs"].ToString());
                }

                File.AppendAllText(ConfigurationManager.AppSettings[@"Logs\"].ToString() + "Log_ExcelSalesDistributorProccessing" + DateTime.UtcNow.ToString("yyyy_MM_dd") + ".txt",
                    DateTime.Now + " : " + error + Environment.NewLine);
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
        }

        public bool DumbFileRecords(DataFileInfo dataFileInfo)
        {
            DataTable dt = new DataTable();

            //dt.Columns.Add("masterFileInfoID", typeof(Int32));
            dt.Columns.Add("lineRow", typeof(string));

            try
            {
                const Int32 BufferSize = 128;

                using (var fileStream = File.OpenRead(dataFileInfo.FilePath + @"/" + dataFileInfo.FileName))

                using (var streamReader = new StreamReader(fileStream, Encoding.UTF8, true, BufferSize))
                {
                    String line;
                    streamReader.ReadLine();
                    while ((line = streamReader.ReadLine()) != null)
                    {
                        dt.Rows.Add(line);
                    }
                };

                SqlCommand command = new SqlCommand();
                command.Parameters.AddWithValue("RecordValues", dt);
                command.Parameters.AddWithValue("masterFileInfoID", dataFileInfo.ID);

                var results = DataLayer.GetData("sp_InsertSalesRows", command, true);

                return true;
            }
            catch (IOException ex)
            {
                Constants.ErrorLog("ERROR WHILE ''OPENING'' SALES FILE AS  ::: " + ex.Message);
                return false;
            }
            catch (Exception ex)
            {

                Constants.ErrorLog("ERROR WHILE ''WORKING'' ON SALES FILE AS  ::: " + ex.Message);
                return false;
            }
        }

        public bool DumbExcelFileRecords(DataFileInfo dataFileInfo)
        {

            bool Status = false;
            if (dataFileInfo.Extension.ToUpper() == ".XLSX")
            {
                switch (dataFileInfo.FileType)
                {


                    case "CUST":


                        OleDbConnection con = new OleDbConnection();

                        string the = dataFileInfo.FilePath + @"\" + dataFileInfo.FileName;

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

                        DataTable dtCUST = new DataTable();

                        dtCUST.Columns.Add("DSTBID", typeof(String));
                        dtCUST.Columns.Add("CUSTID", typeof(String));
                        dtCUST.Columns.Add("CT", typeof(String));
                        dtCUST.Columns.Add("CUSTNAME", typeof(String));
                        dtCUST.Columns.Add("ADDRESS", typeof(String));
                        dtCUST.Columns.Add("CITY", typeof(String));
                        dtCUST.Columns.Add("TOWNID", typeof(String));
                        dtCUST.Columns.Add("TOWN", typeof(String));

                        for (int i = 1; i < ds.Tables[0].Rows.Count; i++)
                        {
                            DataRow dr = ds.Tables[0].Rows[i];

                            String DSTBID, CUSTID, CT, CUSTNAME, ADDRESS, CITY, TOWNID, TOWN;

                            DSTBID = dr[0].ToString();
                            CUSTID = dr[1].ToString();
                            CT = dr[2].ToString();
                            CUSTNAME = dr[3].ToString();
                            ADDRESS = dr[4].ToString();
                            CITY = dr[5].ToString();
                            TOWNID = dr[6].ToString();
                            TOWN = dr[7].ToString();


                            dtCUST.Rows.Add(DSTBID, CUSTID, CT, CUSTNAME, ADDRESS, CITY, TOWNID, TOWN);

                        }

                        SqlCommand command = new SqlCommand();
                        command.Parameters.AddWithValue("RecordValues", dtCUST);
                        command.Parameters.AddWithValue("masterFileInfoID", dataFileInfo.ID);
                        var results = DataLayer.GetData("sp_InsertCustRecords", command, true);

                        Status = true;

                        break;
                    case "INV":


                        OleDbConnection invcon = new OleDbConnection();

                        string invthe = dataFileInfo.FilePath + @"\" + dataFileInfo.FileName;

                        string invpart1 = "Provider=Microsoft.ACE.OLEDB.12.0;";
                        string invpart2 = @"Data Source=" + invthe + ";";
                        string invpart3 = "Extended Properties='Excel 12.0;HDR=YES;'";

                        string invconnectionString = invpart1 + invpart2 + invpart3;

                        invcon.ConnectionString = invconnectionString;
                        FileInfo invFIforexcel = new FileInfo(invthe);
                        ExcelPackage invEp = new ExcelPackage(invFIforexcel);

                        OleDbCommand invcmnd = new OleDbCommand("Select * from [" + invEp.Workbook.Worksheets.FirstOrDefault().Name + "$]", invcon);
                        OleDbDataAdapter invadapter = new OleDbDataAdapter(invcmnd);
                        invcon.Open();
                        DataSet invds = new DataSet();
                        invadapter.Fill(invds);
                        invcon.Close();


                        DataTable dtINV = new DataTable();

                        dtINV.Columns.Add("DISBID", typeof(String));
                        dtINV.Columns.Add("INVOICENO", typeof(String));
                        dtINV.Columns.Add("INVOICEDATE", typeof(String));
                        dtINV.Columns.Add("CUSTID", typeof(String));
                        dtINV.Columns.Add("BRICKID", typeof(String));
                        dtINV.Columns.Add("PRODUCTID", typeof(String));
                        dtINV.Columns.Add("PRODUCTNAME", typeof(String));
                        dtINV.Columns.Add("BATCH", typeof(String));
                        dtINV.Columns.Add("RATE", typeof(String));
                        dtINV.Columns.Add("QUANTITY", typeof(String));
                        dtINV.Columns.Add("BONUS", typeof(String));
                        dtINV.Columns.Add("DISCOUNT", typeof(String));
                        dtINV.Columns.Add("NETAMOUNT", typeof(String));
                        dtINV.Columns.Add("REASON", typeof(String));


                        for (int i = 1; i < invds.Tables[0].Rows.Count; i++)
                        {
                            DataRow dr = invds.Tables[0].Rows[i];


                            String DISBID, INVOICENO, INVOICEDATE, CUSTID, BRICKID, PRODUCTID, PRODUCTNAME, BATCH, RATE, QUANTITY, BONUS, DISCOUNT, NETAMOUNT, REASON;


                            DISBID = dr[0].ToString();
                            INVOICENO = dr[1].ToString();
                            INVOICEDATE = dr[2].ToString();
                            CUSTID = dr[3].ToString();
                            BRICKID = dr[4].ToString();
                            PRODUCTID = dr[5].ToString();
                            PRODUCTNAME = dr[6].ToString();
                            BATCH = dr[7].ToString();
                            RATE = dr[8].ToString();
                            QUANTITY = dr[9].ToString();
                            BONUS = dr[10].ToString();
                            DISCOUNT = dr[11].ToString();
                            NETAMOUNT = dr[12].ToString();
                            REASON = dr[13].ToString();


                            dtINV.Rows.Add(DISBID, INVOICENO, INVOICEDATE, CUSTID, BRICKID, PRODUCTID, PRODUCTNAME, BATCH, RATE, QUANTITY, BONUS, DISCOUNT, NETAMOUNT, REASON);

                        }

                        SqlCommand invcommand = new SqlCommand();
                        invcommand.Parameters.AddWithValue("RecordValues", dtINV);
                        invcommand.Parameters.AddWithValue("masterFileInfoID", dataFileInfo.ID);

                        var invresults = DataLayer.GetData("sp_InsertINVRecords", invcommand, true);


                        Status = true;


                        break;
                    case "STOCK":


                        OleDbConnection stkcon = new OleDbConnection();

                        string stkthe = dataFileInfo.FilePath + @"\" + dataFileInfo.FileName;

                        string stkpart1 = "Provider=Microsoft.ACE.OLEDB.12.0;";
                        string stkpart2 = @"Data Source=" + stkthe + ";";
                        string stkpart3 = "Extended Properties='Excel 12.0;HDR=YES;'";

                        string stkconnectionString = stkpart1 + stkpart2 + stkpart3;

                        stkcon.ConnectionString = stkconnectionString;
                        FileInfo stkFIforexcel = new FileInfo(stkthe);
                        ExcelPackage stkEp = new ExcelPackage(stkFIforexcel);

                        OleDbCommand stkcmnd = new OleDbCommand("Select * from [" + stkEp.Workbook.Worksheets.FirstOrDefault().Name + "$]", stkcon);
                        OleDbDataAdapter stkadapter = new OleDbDataAdapter(stkcmnd);
                        stkcon.Open();
                        DataSet stkds = new DataSet();
                        stkadapter.Fill(stkds);
                        stkcon.Close();

                        DataTable dtSTOCK = new DataTable();

                        dtSTOCK.Columns.Add("DSTBID", typeof(String));
                        dtSTOCK.Columns.Add("PRDID", typeof(String));
                        dtSTOCK.Columns.Add("PRD", typeof(String));
                        dtSTOCK.Columns.Add("BATCHNO", typeof(String));
                        dtSTOCK.Columns.Add("CLDATE", typeof(String));
                        dtSTOCK.Columns.Add("CLOSING", typeof(String));
                        //dtSTOCK.Columns.Add("NEAREXPIRE", typeof(String));
                        //dtSTOCK.Columns.Add("EXPIREDSTOCK", typeof(String));
                        //dtSTOCK.Columns.Add("PURCHASE", typeof(String));
                        //dtSTOCK.Columns.Add("PURCHASERETURN", typeof(String));
                        //DSTBID PRODUCT ID	PRODUCT	BATCH NO	CLOSING DATE	CLOSING UNIT

                        for (int i = 1; i < stkds.Tables[0].Rows.Count; i++)
                        {
                            DataRow dr = stkds.Tables[0].Rows[i];


                            String DSTBID, PRDID, PRD, BATCHNO, CLDATE, CLOSING; //, NEAREXPIRE, EXPIREDSTOCK, PURCHASE, PURCHASERETURN;

                            DSTBID = dr[0].ToString();
                            PRDID = dr[1].ToString();
                            PRD = dr[2].ToString();
                            BATCHNO = dr[3].ToString();
                            CLDATE = dr[4].ToString();
                            CLOSING = dr[5].ToString();
                            //NEAREXPIRE = dr[6].ToString();
                            //EXPIREDSTOCK = dr[7].ToString();
                            //PURCHASE = dr[8].ToString();
                            //PURCHASERETURN = dr[9].ToString();

                            dtSTOCK.Rows.Add(DSTBID, PRDID, PRD, BATCHNO, CLDATE, CLOSING);
                            //, NEAREXPIRE, EXPIREDSTOCK, PURCHASE, PURCHASERETURN);
                        }

                        SqlCommand stkcommand = new SqlCommand();
                        stkcommand.Parameters.AddWithValue("RecordValues", dtSTOCK);
                        stkcommand.Parameters.AddWithValue("masterFileInfoID", dataFileInfo.ID);
                        var stkresults = DataLayer.GetData("sp_InsertStockRecords", stkcommand, true);

                        Status = true;

                        break;
                }
            }
            return Status;
        }

        public struct DataFileInfo
        {
            public string ID;
            public string FileName;
            public string FilePath;
            public string FileType;
            public string Extension;
        }
    }
}