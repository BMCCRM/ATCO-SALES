using OfficeOpenXml;
using OfficeOpenXml.Style;
using PocketDCR2.Classes;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;

namespace PocketDCR2.BWSD
{
    /// <summary>
    /// Summary description for SalesReportHandler
    /// </summary>
    public class SalesReportHandler : IHttpHandler
    {


        #region Object Intialization

        NameValueCollection _nv = new NameValueCollection();
        DAL dl = new DAL();

        #endregion

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
            DateTime? startdt = null;
            try
            {
                string Date = context.Request.QueryString["date"];

                if (Date != "")
                {
                    string year = Date;
                    int i = DateTime.ParseExact("July", "MMMM", CultureInfo.CurrentCulture).Month;
                    string completedate = i + "/" + "1" + "/" + year + " " + DateTime.Now.TimeOfDay;
                    startdt = Convert.ToDateTime(completedate);
                }

            }
            catch (Exception ex)
            {
                startdt = DateTime.Now;
            }

            string report = context.Request.QueryString["reportType"];
            string DistId = context.Request.QueryString["DistId"];
            string ProductId = context.Request.QueryString["ProductId"];
            string TeamId = context.Request.QueryString["TeamId"];



            string FileName = "";
            string StoreProcedureName = "";
            if (report == "MonthlySales")
            {
                StoreProcedureName = "sp_GetMonthlySalesReport";
                FileName = "MonthlySales-" + startdt.Value.ToShortDateString();


                if (FileName != "")
                {
                    _nv.Clear();

                    _nv.Add("@DistId-int", DistId);
                    _nv.Add("@Date-datetime", startdt.ToString());
                    DataSet MonthlySaleDetail = GetData(StoreProcedureName, _nv);
                    if (MonthlySaleDetail != null)
                    {
                        if (MonthlySaleDetail.Tables.Count != 0)
                        {

                            MemoryStream ms = DataTableToXlsx(MonthlySaleDetail, context, startdt);
                            ms.WriteTo(context.Response.OutputStream);
                            context.Response.ContentType = "application/vnd.ms-excel";
                            context.Response.AddHeader("Content-Disposition", "attachment;filename=" + FileName + ".xlsx");
                            context.Response.StatusCode = 200;
                            context.Response.End();
                        }
                        else
                        {
                            MemoryStream ms = new MemoryStream();
                            ExcelPackage pack = new ExcelPackage();
                            ExcelWorksheet ws = pack.Workbook.Worksheets.Add("Stock Details Data");
                            ws.Cells[1, 1].Value = "No Data Found!";
                            pack.SaveAs(ms);
                            ms.WriteTo(context.Response.OutputStream);
                            context.Response.ContentType = "application/vnd.ms-excel";
                            context.Response.AddHeader("Content-Disposition", "attachment;filename=" + FileName + ".xlsx");
                            context.Response.StatusCode = 200;
                            context.Response.End();
                        }
                    }
                    else
                    {
                        MemoryStream ms = new MemoryStream();
                        ExcelPackage pack = new ExcelPackage();
                        ExcelWorksheet ws = pack.Workbook.Worksheets.Add("Data");
                        ws.Cells[1, 1].Value = "No Data Found!";
                        pack.SaveAs(ms);
                        ms.WriteTo(context.Response.OutputStream);
                        context.Response.ContentType = "application/vnd.ms-excel";
                        context.Response.AddHeader("Content-Disposition", "attachment;filename=" + FileName + ".xlsx");
                        context.Response.StatusCode = 200;
                        context.Response.End();
                    }
                }
            }
            else if (report == "TeamProductSales")
            {
                StoreProcedureName = "sp_GetTeamProductSalesReport";
                FileName = "TeamProductSales-" + startdt.Value.ToShortDateString();
                if (FileName != "")
                {
                    if (DistId == "-1")
                    {
                        _nv.Clear();
                        _nv.Add("@DistId-int", DistId);
                        _nv.Add("@Date-datetime", startdt.ToString());
                        _nv.Add("@PRoID-int", ProductId);
                        _nv.Add("@TeamId-int", TeamId);
                        DataSet dsTeamProduct = GetData(StoreProcedureName, _nv);
                        if (dsTeamProduct != null)
                        {
                            if (dsTeamProduct.Tables.Count != 0)
                            {

                                MemoryStream ms = TeamProductDataTableToXlsxnew(dsTeamProduct, context, startdt);
                                ms.WriteTo(context.Response.OutputStream);
                                context.Response.ContentType = "application/vnd.ms-excel";
                                context.Response.AddHeader("Content-Disposition", "attachment;filename=" + FileName + ".xlsx");
                                context.Response.StatusCode = 200;
                                context.Response.End();
                            }
                            else
                            {
                                MemoryStream ms = new MemoryStream();
                                ExcelPackage pack = new ExcelPackage();
                                ExcelWorksheet ws = pack.Workbook.Worksheets.Add("Stock Details Data");
                                ws.Cells[1, 1].Value = "No Data Found!";
                                pack.SaveAs(ms);
                                ms.WriteTo(context.Response.OutputStream);
                                context.Response.ContentType = "application/vnd.ms-excel";
                                context.Response.AddHeader("Content-Disposition", "attachment;filename=" + FileName + ".xlsx");
                                context.Response.StatusCode = 200;
                                context.Response.End();
                            }
                        }

                        else
                        {
                            MemoryStream ms = new MemoryStream();
                            ExcelPackage pack = new ExcelPackage();
                            ExcelWorksheet ws = pack.Workbook.Worksheets.Add("Data");
                            ws.Cells[1, 1].Value = "No Data Found!";
                            pack.SaveAs(ms);
                            ms.WriteTo(context.Response.OutputStream);
                            context.Response.ContentType = "application/vnd.ms-excel";
                            context.Response.AddHeader("Content-Disposition", "attachment;filename=" + FileName + ".xlsx");
                            context.Response.StatusCode = 200;
                            context.Response.End();
                        }
                    }

                    else
                    {
                        _nv.Clear();
                        _nv.Add("@DistId-int", DistId);
                        _nv.Add("@Date-datetime", startdt.ToString());
                        _nv.Add("@PRoID-int", ProductId);
                        _nv.Add("@TeamId-int", TeamId);

                        DataSet dsTeamProduct = GetData(StoreProcedureName, _nv);
                        if (dsTeamProduct != null)
                        {
                            if (dsTeamProduct.Tables.Count != 0)
                            {

                                MemoryStream ms = TeamProductDataTableToXlsx(dsTeamProduct, context, startdt);
                                ms.WriteTo(context.Response.OutputStream);
                                context.Response.ContentType = "application/vnd.ms-excel";
                                context.Response.AddHeader("Content-Disposition", "attachment;filename=" + FileName + ".xlsx");
                                context.Response.StatusCode = 200;
                                context.Response.End();
                            }
                            else
                            {
                                MemoryStream ms = new MemoryStream();
                                ExcelPackage pack = new ExcelPackage();
                                ExcelWorksheet ws = pack.Workbook.Worksheets.Add("Stock Details Data");
                                ws.Cells[1, 1].Value = "No Data Found!";
                                pack.SaveAs(ms);
                                ms.WriteTo(context.Response.OutputStream);
                                context.Response.ContentType = "application/vnd.ms-excel";
                                context.Response.AddHeader("Content-Disposition", "attachment;filename=" + FileName + ".xlsx");
                                context.Response.StatusCode = 200;
                                context.Response.End();
                            }
                        }

                        else
                        {
                            MemoryStream ms = new MemoryStream();
                            ExcelPackage pack = new ExcelPackage();
                            ExcelWorksheet ws = pack.Workbook.Worksheets.Add("Data");
                            ws.Cells[1, 1].Value = "No Data Found!";
                            pack.SaveAs(ms);
                            ms.WriteTo(context.Response.OutputStream);
                            context.Response.ContentType = "application/vnd.ms-excel";
                            context.Response.AddHeader("Content-Disposition", "attachment;filename=" + FileName + ".xlsx");
                            context.Response.StatusCode = 200;
                            context.Response.End();
                        }
                    }
                }
            }


            //context.Response.ContentType = "text/plain";
            //context.Response.Write("Hello World"); 
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

        public static MemoryStream DataTableToXlsx(DataSet dsData, HttpContext context, DateTime? dt)
        {
            DataTable dtDataMonthly = new DataTable();
            if (dsData.Tables.Count != 0)
            {
                dtDataMonthly = dsData.Tables[0];
            }

            var x = (from r in dtDataMonthly.AsEnumerable()
                     select r["DistId"]).Distinct().ToList();

            MemoryStream Result = new MemoryStream();
            ExcelPackage pack = new ExcelPackage();
            List<totalgrid> totalGridList1 = new List<totalgrid>();
            List<string> mymonths1 = new List<string>();

            if (x.Count != 0)
            {
                ExcelWorksheet ws = pack.Workbook.Worksheets.Add("Monthly Sales");

                int j = 0;

                for (j = 0; j < x.Count; j++)
                {

                    //  ATCO LABORATORIES LIMITED					
                    //Monthly Sales - Group by Distributor					

                    ws.Column(1).Width = 75; // Distributor Name
                    ws.Column(2).Width = 15; // Distributor Type
                    ws.Column(3).Width = 15; // ST

                    if (j == 0)
                    {
                        ws.Cells[j + 1, 0 + 1].Value = "Distributor Name";
                        ws.Cells[j + 1, 0 + 1].Style.Font.Bold = true;
                        ws.Cells[j + 1, 0 + 1].Merge = true;
                        ws.Cells[j + 1, 0 + 1].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                        ws.Cells[j + 1, 0 + 1].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.Gray);
                        ws.Cells[j + 1, 0 + 1].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                        ws.Cells[j + 1, 0 + 1].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                        ws.Cells[j + 1, 0 + 1].Style.WrapText = true;

                        ws.Cells[j + 1, 0 + 2].Value = "Distributor Type";
                        ws.Cells[j + 1, 0 + 2].Style.Font.Bold = true;
                        ws.Cells[j + 1, 0 + 2].Merge = true;
                        ws.Cells[j + 1, 0 + 2].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                        ws.Cells[j + 1, 0 + 2].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.Gray);
                        ws.Cells[j + 1, 0 + 2].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                        ws.Cells[j + 1, 0 + 2].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                        ws.Cells[j + 1, 0 + 2].Style.WrapText = true;

                        ws.Cells[j + 1, 0 + 3].Style.Font.Bold = true;
                        ws.Cells[j + 1, 0 + 3].Value = "ST";
                        ws.Cells[j + 1, 0 + 3].Merge = true;
                        ws.Cells[j + 1, 0 + 3].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                        ws.Cells[j + 1, 0 + 3].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.Gray);
                        ws.Cells[j + 1, 0 + 3].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                        ws.Cells[j + 1, 0 + 3].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                        ws.Cells[j + 1, 0 + 3].Style.WrapText = true;

                        DateTime date = dt.Value;
                        date = date.AddMonths(-date.Month);
                        date = new DateTime(date.Year, date.Month, 1, 0, 0, 0);
                        date = date.AddMonths(7);

                        //month names
                        for (int i = 2; i < 14; i++)
                        {
                            ws.Cells[j + 1, i + 2].Style.Font.Bold = true;
                            ws.Cells[j + 1, i + 2].Value = date.ToString("MMM-yy");
                            ws.Cells[j + 1, i + 2].Merge = true;
                            ws.Cells[j + 1, i + 2].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                            ws.Cells[j + 1, i + 2].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.Gray);
                            ws.Cells[j + 1, i + 2].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                            ws.Cells[j + 1, i + 2].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                            ws.Cells[j + 1, i + 2].Style.WrapText = true;
                            mymonths1.Add(date.ToString("MMM-yy"));
                            date = date.AddMonths(1);
                        }
                    }
                    DataRow[] results = dtDataMonthly.Select("DistId=" + x[j].ToString());

                    ws.Cells[j + 2, 0 + 1].Value = results[0].ItemArray[1].ToString();
                    ws.Cells[j + 2, 0 + 1, j + 2, 0 + 1].Style.WrapText = true;
                    ws.Cells[j + 2, 0 + 1, j + 2, 0 + 1].Style.Border.BorderAround(ExcelBorderStyle.Thin);

                    ws.Cells[j + 2, 0 + 2].Value = results[0].ItemArray[2].ToString();
                    ws.Cells[j + 2, 0 + 2, j + 2, 0 + 2].Style.WrapText = true;
                    ws.Cells[j + 2, 0 + 2, j + 2, 0 + 2].Style.Border.BorderAround(ExcelBorderStyle.Thin);

                    ws.Cells[j + 2, 2 + 1].Value = "Unit";
                    ws.Cells[j + 2, 2 + 1].Style.Border.BorderAround(ExcelBorderStyle.Thin);

                    DateTime date1 = dt.Value;
                    date1 = date1.AddMonths(-date1.Month);
                    date1 = new DateTime(date1.Year, date1.Month, 1, 12, 0, 0);
                    date1 = date1.AddMonths(7);
                    //month names
                    for (int i = 2; i < 14; i++)
                    {
                        for (int iterator = 0; iterator < results.Length; iterator++)
                        {
                            if (results[iterator].ItemArray[4].ToString().Contains(date1.ToString("MMM-yy")))
                            {
                               
                                totalGridList1.Add(new totalgrid { months = (results[iterator].ItemArray[4].ToString()), total = Convert.ToDecimal(results[iterator].ItemArray[3].ToString()) });
                                ws.Cells[j + 2, i + 2].Value = Convert.ToDecimal(results[iterator].ItemArray[3].ToString());
                                ws.Cells[j + 2, i + 2].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                                ws.Cells[j + 2, i + 2].Style.Numberformat.Format = "#,##0"; // Add comma format

                                //totalGridList1.Add(new totalgrid { months = (results[iterator].ItemArray[4].ToString()), total = Convert.ToDecimal(results[iterator].ItemArray[3].ToString()) });
                                //ws.Cells[j + 2, i + 2].Value = Convert.ToDecimal(results[iterator].ItemArray[3].ToString());
                                //ws.Cells[j + 2, i + 2].Style.Border.BorderAround(ExcelBorderStyle.Thin);

                            }
                        }
                        date1 = date1.AddMonths(1);
                    }
                }
                ws.Cells[j + 2, 2 + 1].Value = "TOTAL";
                ws.Cells[j + 2, 2 + 2].Style.WrapText = true;
                ws.Cells[j + 2, 2 + 2].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                for (int s = 0; s < 12; s++)
                {
                    var july = totalGridList1.Where(y => y.months == mymonths1[s]).Select(y => y.total).ToList();
                    ws.Cells[j + 2, s + 4].Value = july.Sum();
                    ws.Cells[j + 2, s + 4].Merge = true;
                    ws.Cells[j + 2, s + 4].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    ws.Cells[j + 2, s + 4].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                    ws.Cells[j + 2, s + 4].Style.Fill.PatternType = ExcelFillStyle.Solid;
                    ws.Cells[j + 2, s + 4].Style.Fill.BackgroundColor.SetColor(Color.Yellow);
                    ws.Cells[j + 2, s + 4].Style.Numberformat.Format = "#,##0"; // Add comma format
                }
            }
            if (pack.Workbook.Worksheets.Count == 0)
            {
                ExcelWorksheet ws = pack.Workbook.Worksheets.Add("Sales Data");
                ws.Cells[1, 1].Value = "No Data Found!";
            }
            pack.SaveAs(Result);

            return Result;
        }

        public class totalgrid
        {
            public string months { get; set; }
            public decimal total { get; set; }

        }
        public class totalgrid1
        {
            public IEnumerable<string> months { get; set; }
            public decimal total { get; set; }

        }
        public static MemoryStream TeamProductDataTableToXlsx(DataSet dsData, HttpContext context, DateTime? dt)
        {
            List<totalgrid> list = new List<totalgrid>();
            List<totalgrid> totalGridList = new List<totalgrid>();

            List<string> mymonths = new List<string>();
            List<int> deleteExcelRow = new List<int>();
            DataTable dtDataSKU = new DataTable();
            DataTable dtDataMonthly = new DataTable();
            if (dsData.Tables.Count != 0)
            {
                dtDataSKU = dsData.Tables[0];
                dtDataMonthly = dsData.Tables[1];

            }

            var distributors = (from r in dtDataMonthly.AsEnumerable()
                                select r["DistId"]).Distinct().ToList();
            var teams = (from r in dtDataSKU.AsEnumerable()
                         select r["PK_TSID"]).Distinct().ToList();

            MemoryStream Result = new MemoryStream();
            ExcelPackage pack = new ExcelPackage();


            if (distributors.Count != 0)
            {
                ExcelWorksheet ws = pack.Workbook.Worksheets.Add("Dist/Team/Product Wise Sales");

                int count = 0;
                

                for (int j = 0; j < distributors.Count; j++)
                {

                    //  ATCO LABORATORIES LIMITED					
                    //Monthly Sales - Group by Distributor					

                    #region Excel heading Printing

                    if (j == 0)
                    {

                        ws.Cells[j + 1, 0 + 1].Value = "Distributor";
                        ws.Cells[j + 1, 0 + 1].Style.Font.Bold = true;
                        //  ws.Cells[j + 1, 0 + 1, j + 1, 0 + 2].Merge = true;
                        //ws.Cells[1, 1].Value = "Distributor";
                        // ws.Cells[j + 1, 0 + 1, j + 1, 0 + 2].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                        //ws.Cells[j + 1, 0 + 1, j + 1, 0 + 2].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.Gray);
                        ws.Cells[j + 1, 0 + 1, j + 1, 0 + 2].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                        ws.Cells[j + 1, 0 + 1, j + 1, 0 + 2].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                        ws.Cells[j + 1, 0 + 1, j + 1, 0 + 2].Style.WrapText = true;


                        ws.Cells[j + 1, 0 + 2].Style.Font.Bold = true;
                        ws.Cells[j + 1, 0 + 2].Value = "Team";
                        ws.Cells[j + 1, 0 + 2].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                        ws.Cells[j + 1, 0 + 2].Style.Border.BorderAround(ExcelBorderStyle.Thin);

                        ws.Cells[j + 1, 0 + 3].Style.Font.Bold = true;
                        ws.Cells[j + 1, 0 + 3].Value = "Product";
                        // ws.Cells[j + 1, 0 + 4, j + 1, 0 + 4].Merge = true;
                        ws.Cells[j + 1, 0 + 3, j + 1, 0 + 3].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                        ws.Cells[j + 1, 0 + 3, j + 1, 0 + 3].Style.Border.BorderAround(ExcelBorderStyle.Thin);


                        DateTime date = dt.Value;
                        date = date.AddMonths(-date.Month);
                        date = new DateTime(date.Year, date.Month, 1, 0, 0, 0);
                        date = date.AddMonths(7);

                        //month names
                        for (int i = 4; i < 16; i++)
                        {
                            ws.Cells[j + 1, i].Style.Font.Bold = true;
                            ws.Cells[j + 1, i].Value = date.ToString("MMM-yy");
                            ws.Cells[j + 1, i].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                            ws.Cells[j + 1, i].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                            mymonths.Add(date.ToString("MMM-yy"));
                            date = date.AddMonths(1);
                        }
                        count++;
                    }   //for first row to fill headers


                    #endregion


                    int iterator = count;

                   
                    int rowCount = 0;
                    for (int k = 0; k < teams.Count; k++)   
                    {
                        bool skip = false;
                        int counthead = 0;
                        int blankcount = 0;

                        DataRow[] results = dtDataSKU.Select("PK_TSID=" + teams[k].ToString());
                        int startiterator = count;

                        for (int l = 0; l < results.Length; l++)         
                        {

                            //if (l == results.Length)
                            //{
                            //ws.Cells[count + 1, 0 + 2].Value = results[l].ItemArray[0].ToString();

                            ws.Cells[count + 1, 0 + 3].Value = results[l].ItemArray[1].ToString();
                            // ws.Cells[count + 1, 0 + 4, count + 1, 0 + 5].Merge = true;
                            // ws.Cells[count + 1, 0 + 3, count + 1, 0 + 3].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                            //  ws.Cells[count + 1, 0 + 3, count + 1, 0 + 3].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                            count++;




                            DataRow[] salesresults = dtDataMonthly.Select("SkuId=" + results[l].ItemArray[2].ToString() + " AND DistId=" + distributors[j].ToString());
                            DateTime date1 = dt.Value;
                            date1 = date1.AddMonths(-date1.Month);
                            date1 = new DateTime(date1.Year, date1.Month, 1, 12, 0, 0);
                            date1 = date1.AddMonths(7);
                            //month names


                            bool isAllDash = true;

                            for (int i = 4; i < 16; i++)      //checking for each month
                            {
                                int cellcounter = 0;
                                ws.Cells[count, i].Value = "-";

                                for (int f = 0; f < salesresults.Length; f++)
                                {
                                    if (salesresults[f].ItemArray[4].ToString().Contains(date1.ToString("MMM-yy")))
                                    {

                                        ws.Cells[count, i].Value = Convert.ToDecimal(salesresults[f].ItemArray[3].ToString());
                                        list.Add(new totalgrid { months = salesresults[f].ItemArray[4].ToString(), total = Convert.ToDecimal(salesresults[f].ItemArray[3].ToString()) });
                                        isAllDash = false;
                                    }
                                    else
                                    {
                                        cellcounter++;
                                    }

                                }
                               



                                date1 = date1.AddMonths(1);

                                if (cellcounter == salesresults.Length - 1)
                                {
                                    blankcount++;
                                   
                                }


                                //if (blankcount == 13)
                                //{
                                //   / ws.DeleteRow(count, 1, true);
                                //    count--;
                                //    blankcount = 0;
                                //    skip = true;
                                //    // counthead++;
                                //}


                            }
                            if (isAllDash)
                            {
                                ws.DeleteRow(count, 1, true);
                                count--;
                            }

                        }




                        //if (!skip)
                        //    {
                                ws.Cells[count + 1, 0 + 3].Value = "Total";
                                ws.Cells[count + 1, 0 + 3, count + 1, 0 + 3].Merge = true;
                                ws.Cells[count + 1, 0 + 3, count + 1, 0 + 3].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                                ws.Cells[count + 1, 0 + 3, count + 1, 0 + 3].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                                ws.Cells[count + 1, 0 + 3, count + 1, 0 + 3].Style.Fill.PatternType = ExcelFillStyle.Solid;
                                ws.Cells[count + 1, 0 + 3, count + 1, 0 + 3].Style.Fill.BackgroundColor.SetColor(Color.Yellow);
                                count++;




                                ws.Cells[startiterator + 1, 0 + 2].Value = results[0].ItemArray[0].ToString();
                                if (startiterator + 1 != count)
                                {
                                    ws.Cells[startiterator + 1, 0 + 2, count, 0 + 2].Merge = true;
                                    ws.Cells[startiterator + 1, 0 + 2, count, 0 + 2].Style.VerticalAlignment = ExcelVerticalAlignment.Top;
                                    ws.Cells[startiterator + 1, 0 + 2, count, 0 + 2].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                                }

                           // }

                      

                       





                        var data = list.GroupBy(x => x.months).Select(y => new { month = y.Select(m => m.months), total = y.Sum(s => s.total) });

                        foreach (var val in data)
                        {

                            DateTime date1 = dt.Value;
                            date1 = date1.AddMonths(-date1.Month);
                            date1 = new DateTime(date1.Year, date1.Month, 1, 12, 0, 0);
                            date1 = date1.AddMonths(7);
                            for (int i = 4; i < 16; i++)
                            {
                                if (val.month.Contains(date1.ToString("MMM-yy")))
                                {
                                    ws.Cells[count, i].Value = val.total;

                                    totalGridList.Add(new totalgrid { months = ws.Cells[1, i].Value.ToString(), total = val.total });
                                    ws.Cells[count, i].Style.Fill.PatternType = ExcelFillStyle.Solid;
                                    ws.Cells[count, i].Style.Fill.BackgroundColor.SetColor(Color.Yellow);
                                }
                                date1 = date1.AddMonths(1);
                            }


                            list.Clear();
                        }


                        //counthead = 0;
                    }

                    ws.Cells[count + 1, 0 + 3].Value = "Grand Total";
                    //Loop for month wise total
                    for (int s = 0; s < 12; s++)
                    {

                        var july = totalGridList.Where(x => x.months == mymonths[s]).Select(x => x.total).ToList();
                        ws.Cells[count + 1, 0 + 4 + s].Value = july.Sum();
                        ws.Cells[count + 1, 0 + 3, count + 1, 0 + 3].Merge = true;
                        ws.Cells[count + 1, 0 + 3, count + 1, 0 + 3].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                        ws.Cells[count + 1, 0 + 3, count + 1, 0 + 3].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                        ws.Cells[count + 1, 0 + 3, count + 1, 0 + 3].Style.Fill.PatternType = ExcelFillStyle.Solid;
                        ws.Cells[count + 1, 0 + 3, count + 1, 0 + 3].Style.Fill.BackgroundColor.SetColor(Color.LightBlue);
                    }

                    int tcount = list.Count();
                    DataRow[] distName = dtDataMonthly.Select("DistId=" + distributors[j].ToString());
                    ws.Cells[iterator + 1, 0 + 1].Value = distName[0].ItemArray[1].ToString();
                    if (iterator + 1 != count)
                    {
                        ws.Cells[iterator + 1, 0 + 1, count, 0 + 1].Value = distName[0].ItemArray[1].ToString();
                        // ws.Cells[,1,,1].Style.ShrinkToFit-  = true;
                        //ws.Cells[iterator + 1, 0 + 1, count, 0 + 1].Style.VerticalAlignment = ExcelVerticalAlignment.Top;
                        ws.Cells[iterator + 1, 0 + 1, count, 0 + 1].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                    }
                  


                }

                for (int row = count; row >= 1; row--)
                {
                    bool hasData = false;
                    for (int col = 4; col < 16; col++)
                    {
                        if (!string.IsNullOrEmpty(ws.Cells[row, col].Text))
                        {
                            if(ws.Cells[row, col].Text != "-")
                            {
                                hasData = true;
                                break;
                            }
                            
                        }
                    }

                    if (!hasData)
                    {
                        ws.DeleteRow(row, 1, true);
                        count--;
                    }
                }


            }


            if (pack.Workbook.Worksheets.Count == 0)
            {
                ExcelWorksheet ws = pack.Workbook.Worksheets.Add("Sales Data");
                ws.Cells[1, 1].Value = "No Data Found!";
            }
            pack.SaveAs(Result);

            return Result;
        }



        public static MemoryStream TeamProductDataTableToXlsxnew(DataSet dsData, HttpContext context, DateTime? dt)
        {
            List<totalgrid> list = new List<totalgrid>();
            List<totalgrid> totalGridList = new List<totalgrid>();

            List<string> mymonths = new List<string>();

            DataTable dtDataSKU = new DataTable();
            DataTable dtDataMonthly = new DataTable();
            if (dsData.Tables.Count != 0)
            {
                dtDataSKU = dsData.Tables[0];
                dtDataMonthly = dsData.Tables[1];

            }

            var distributors = (from r in dtDataMonthly.AsEnumerable()
                                select r["DistId"]).Distinct().ToList();
            var teams = (from r in dtDataSKU.AsEnumerable()
                         select r["PK_TSID"]).Distinct().ToList();

            MemoryStream Result = new MemoryStream();
            ExcelPackage pack = new ExcelPackage();


            if (distributors.Count != 0)
            {
                ExcelWorksheet ws = pack.Workbook.Worksheets.Add("Dist/Team/Product Wise Sales");

                int count = 0;
                for (int j = 0; j < distributors.Count; j++)
                {

                    //  ATCO LABORATORIES LIMITED					
                    //Monthly Sales - Group by Distributor					

                    if (j == 0)
                    {

                        ws.Cells[j + 1, 0 + 1].Value = "Distributor";
                        ws.Cells[j + 1, 0 + 1].Style.Font.Bold = true;
                        //  ws.Cells[j + 1, 0 + 1, j + 1, 0 + 2].Merge = true;
                        //ws.Cells[1, 1].Value = "Distributor";
                        // ws.Cells[j + 1, 0 + 1, j + 1, 0 + 2].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                        //ws.Cells[j + 1, 0 + 1, j + 1, 0 + 2].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.Gray);
                        ws.Cells[j + 1, 0 + 1, j + 1, 0 + 2].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                        ws.Cells[j + 1, 0 + 1, j + 1, 0 + 2].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                        ws.Cells[j + 1, 0 + 1, j + 1, 0 + 2].Style.WrapText = true;


                        ws.Cells[j + 1, 0 + 2].Style.Font.Bold = true;
                        ws.Cells[j + 1, 0 + 2].Value = "Team";
                        ws.Cells[j + 1, 0 + 2].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                        ws.Cells[j + 1, 0 + 2].Style.Border.BorderAround(ExcelBorderStyle.Thin);

                        ws.Cells[j + 1, 0 + 3].Style.Font.Bold = true;
                        ws.Cells[j + 1, 0 + 3].Value = "Product";
                        // ws.Cells[j + 1, 0 + 4, j + 1, 0 + 4].Merge = true;
                        ws.Cells[j + 1, 0 + 3, j + 1, 0 + 3].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                        ws.Cells[j + 1, 0 + 3, j + 1, 0 + 3].Style.Border.BorderAround(ExcelBorderStyle.Thin);


                        DateTime date = dt.Value;
                        date = date.AddMonths(-date.Month);
                        date = new DateTime(date.Year, date.Month, 1, 0, 0, 0);
                        date = date.AddMonths(7);

                        //month names
                        for (int i = 4; i < 16; i++)
                        {
                            ws.Cells[j + 1, i].Style.Font.Bold = true;
                            ws.Cells[j + 1, i].Value = date.ToString("MMM-yy");
                            ws.Cells[j + 1, i].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                            ws.Cells[j + 1, i].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                            mymonths.Add(date.ToString("MMM-yy"));
                            date = date.AddMonths(1);
                        }
                        count++;
                    }



                    int iterator = count;



                    for (int k = 0; k < teams.Count; k++)
                    {
                        DataRow[] results = dtDataSKU.Select("PK_TSID=" + teams[k].ToString());
                        int startiterator = count;
                        for (int l = 0; l < results.Length; l++)
                        {

                            //if (l == results.Length)
                            //{
                            ws.Cells[count + 1, 0 + 3].Value = results[l].ItemArray[1].ToString();
                            // ws.Cells[count + 1, 0 + 4, count + 1, 0 + 5].Merge = true;
                            ws.Cells[count + 1, 0 + 3, count + 1, 0 + 3].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                            ws.Cells[count + 1, 0 + 3, count + 1, 0 + 3].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                            count++;


                            DataRow[] salesresults = dtDataMonthly.Select("SkuId=" + results[l].ItemArray[2].ToString() + " AND DistId=" + distributors[j].ToString());
                            DateTime date1 = dt.Value;
                            date1 = date1.AddMonths(-date1.Month);
                            date1 = new DateTime(date1.Year, date1.Month, 1, 12, 0, 0);
                            date1 = date1.AddMonths(7);
                            //month names
                            for (int i = 4; i < 16; i++)
                            {
                                ws.Cells[count, i].Value = "-";
                                for (int f = 0; f < salesresults.Length; f++)
                                {
                                    if (salesresults[f].ItemArray[4].ToString().Contains(date1.ToString("MMM-yy")))
                                    {
                                        ws.Cells[count, i].Value = Convert.ToDecimal(salesresults[f].ItemArray[3].ToString());
                                        list.Add(new totalgrid { months = salesresults[f].ItemArray[4].ToString(), total = Convert.ToDecimal(salesresults[f].ItemArray[3].ToString()) });
                                    }

                                }
                                date1 = date1.AddMonths(1);

                            }





                        }
                        ws.Cells[count + 1, 0 + 3].Value = "Total";
                        ws.Cells[count + 1, 0 + 3, count + 1, 0 + 3].Merge = true;
                        ws.Cells[count + 1, 0 + 3, count + 1, 0 + 3].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                        ws.Cells[count + 1, 0 + 3, count + 1, 0 + 3].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                        ws.Cells[count + 1, 0 + 3, count + 1, 0 + 3].Style.Fill.PatternType = ExcelFillStyle.Solid;
                        ws.Cells[count + 1, 0 + 3, count + 1, 0 + 3].Style.Fill.BackgroundColor.SetColor(Color.Yellow);
                        count++;

                        ws.Cells[startiterator + 1, 0 + 2].Value = results[0].ItemArray[0].ToString();
                        if (startiterator + 1 != count)
                        {
                            ws.Cells[startiterator + 1, 0 + 2, count, 0 + 2].Merge = true;
                            ws.Cells[startiterator + 1, 0 + 2, count, 0 + 2].Style.VerticalAlignment = ExcelVerticalAlignment.Top;
                            ws.Cells[startiterator + 1, 0 + 2, count, 0 + 2].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                        }


                        var data = list.GroupBy(x => x.months).Select(y => new { month = y.Select(m => m.months), total = y.Sum(s => s.total) });

                        foreach (var val in data)
                        {

                            DateTime date1 = dt.Value;
                            date1 = date1.AddMonths(-date1.Month);
                            date1 = new DateTime(date1.Year, date1.Month, 1, 12, 0, 0);
                            date1 = date1.AddMonths(7);
                            for (int i = 4; i < 16; i++)
                            {
                                if (val.month.Contains(date1.ToString("MMM-yy")))
                                {
                                    ws.Cells[count, i].Value = val.total;

                                    totalGridList.Add(new totalgrid { months = ws.Cells[1, i].Value.ToString(), total = val.total });
                                    ws.Cells[count, i].Style.Fill.PatternType = ExcelFillStyle.Solid;
                                    ws.Cells[count, i].Style.Fill.BackgroundColor.SetColor(Color.Yellow);
                                }
                                date1 = date1.AddMonths(1);
                            }


                            list.Clear();
                        }
                    }

                    ws.Cells[count + 1, 0 + 3].Value = "Grand Total";
                    //Loop for month wise total
                    for (int s = 0; s < 12; s++)
                    {

                        var july = totalGridList.Where(x => x.months == mymonths[s]).Select(x => x.total).ToList();
                        ws.Cells[count + 1, 0 + 4 + s].Value = july.Sum();
                        ws.Cells[count + 1, 0 + 3, count + 1, 0 + 3].Merge = true;
                        ws.Cells[count + 1, 0 + 3, count + 1, 0 + 3].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                        ws.Cells[count + 1, 0 + 3, count + 1, 0 + 3].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                        ws.Cells[count + 1, 0 + 3, count + 1, 0 + 3].Style.Fill.PatternType = ExcelFillStyle.Solid;
                        ws.Cells[count + 1, 0 + 3, count + 1, 0 + 3].Style.Fill.BackgroundColor.SetColor(Color.LightBlue);
                    }

                    int tcount = list.Count();
                    DataRow[] distName = dtDataMonthly.Select("DistId=" + distributors[j].ToString());
                    ws.Cells[iterator + 1, 0 + 1].Value = distName[0].ItemArray[1].ToString();
                    if (iterator + 1 != count)
                    {
                        foreach (var item in distName)
                        {
                            ws.Cells[iterator + 1, 0 + 1, count, 0 + 1].Value = distName[0].ItemArray[1].ToString();
                            // ws.Cells[,1,,1].Style.ShrinkToFit-  = true;
                            ws.Cells[iterator + 1, 0 + 1, count, 0 + 1].Style.VerticalAlignment = ExcelVerticalAlignment.Top;
                            ws.Cells[iterator + 1, 0 + 1, count, 0 + 1].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                        }

                    }





                }


                for (int row = count; row >= 1; row--)
                {
                    bool hasData = false;
                    for (int col = 4; col < 16; col++)
                    {
                        if (!string.IsNullOrEmpty(ws.Cells[row, col].Text))
                        {
                            if(ws.Cells[row, col].Text != "-")
                            {
                                hasData = true;
                                break;
                            }
                           
                        }
                    }

                    if (!hasData)
                    {
                        ws.DeleteRow(row, 1, true);
                        count--;
                    }
                }
             

            }


           





            if (pack.Workbook.Worksheets.Count == 0)
            {
                ExcelWorksheet ws = pack.Workbook.Worksheets.Add("Sales Data");
                ws.Cells[1, 1].Value = "No Data Found!";
            }
            pack.SaveAs(Result);

            return Result;
        }



        #endregion
    }
}