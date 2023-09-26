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

namespace PocketDCR2.Handler
{
    /// <summary>
    /// Summary description for GetSalesReport
    /// </summary>
    public class GetSalesReport : IHttpHandler
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
            string Date = null; ;
            int month, year;
            try
            {
                 Date = context.Request.QueryString["date"];


                year = Convert.ToDateTime(Date).Year;
                month = Convert.ToDateTime(Date).Month;
            }
            catch (Exception ex)
            {
                year = Convert.ToDateTime(DateTime.Now).Year;
                month = Convert.ToDateTime(DateTime.Now).Month;
            }
          


            string report = context.Request.QueryString["reportName"];

            string distid = context.Request.QueryString["DistId"];
            string BrickId = context.Request.QueryString["BrickId"];
            string ClientId = context.Request.QueryString["ClientId"];
            string TeamID = context.Request.QueryString["TeamID"];
            string ctd = context.Request.QueryString["date"];
            string ProductId = context.Request.QueryString["ProductId"];
            string startdate = context.Request.QueryString["date1"];
            string enddate = context.Request.QueryString["date2"];

            int year1 = 0, month1 = 0;
            string FileName = "";
            string StoreProcedureName = "";
            if (report == "Bonus")
            {
                StoreProcedureName = "sp_SalesBonusReport";
                FileName = "BonusClaim-" + Date;
            }
            else if (report == "Discount")
            {
                StoreProcedureName = "sp_SalesDiscountClaimReport";
                FileName = "DiscountClaim-" + Date;
            }
            else if (report == "Stock")
            {
                StoreProcedureName = "sp_SalesStockReport";
                FileName = "Sales&Stock-" + Date;
            }
            else if (report == "CustomerWiseSalesReport")
            {
                StoreProcedureName = "sp_NewCustomerWiseSalesReport";
                FileName = "CustomerWiseSalesReport";
            }
            else if (report == "InvoiceVoiceSalesReport")
            {
                StoreProcedureName = "sp_Sales_Anylysisreport";
                FileName = "InvoiceVoiceSalesReport";
            }
            if (FileName != "")
            {
                _nv.Clear();
                if (report == "CustomerWiseSalesReport")
                {
                    year1 = Convert.ToDateTime(ctd).Year;
                    month1 = Convert.ToDateTime(ctd).Month;
                    _nv.Clear();
                    _nv.Add("@DistId-int", (distid.ToString() == "-1" ? "0" : distid.ToString()));
                    _nv.Add("@BrickId-int", (BrickId.ToString() == "-1" ? "0" : BrickId.ToString()));
                    _nv.Add("@TeamId-int", (TeamID.ToString() == "-1" ? "0" : TeamID.ToString()));
                    _nv.Add("@ClientId-int", (ClientId.ToString() == "-1" ? "0" : ClientId.ToString()));
                    _nv.Add("@date-int", Convert.ToString(year));
                }
                else if (report == "InvoiceVoiceSalesReport")
                {
                    _nv.Clear();
                    _nv.Add("@start-datetime", startdate.ToString());
                    _nv.Add("@end-datetime", enddate.ToString());
                    _nv.Add("@DistId-int", (distid.ToString() == "-1" ? "0" : distid.ToString()));
                    _nv.Add("@BrickId-int", (BrickId.ToString() == "-1" ? "0" : BrickId.ToString()));
                    _nv.Add("@ClientId-int", (ClientId.ToString() == "-1" ? "0" : ClientId.ToString()));
                    _nv.Add("@ProductId-int", (ProductId.ToString() == "-1" ? "0" : ProductId.ToString()));
                    _nv.Add("@TeamId-int", (TeamID.ToString() == "-1" ? "0" : TeamID.ToString()));     
                }

                else{
                _nv.Add("@DistId-INT", distid.ToString());
                _nv.Add("@Month-INT", month.ToString());
                _nv.Add("@YEAR-INT", year.ToString());
                }
                    DataSet DataDetails = GetData(StoreProcedureName, _nv);
                if (DataDetails != null)
                {

                    MemoryStream ms = new MemoryStream();
                    if (report == "Bonus")
                    {
                        ms = GetSalesReport.DataTableToBonusXlsx(DataDetails.Tables[0]);
                    }
                    else if (report == "Discount")
                    {
                         ms = GetSalesReport.DataTableToDiscountXlsx(DataDetails.Tables[0]);
                    }
                    else if (report == "Stock")
                    {
                        ms = GetSalesReport.DataTableToStockXlsx(DataDetails.Tables[0]);
                    }
                    else if (report == "CustomerWiseSalesReport")
                    {
                        ms = GetSalesReport.CustomerWiseMonthlyUnits(DataDetails.Tables[0],year1);
                    }
                    else if (report == "InvoiceVoiceSalesReport")
                    {
                        ms = GetSalesReport.SalesAnalysisReportUnits(DataDetails.Tables[0]);
                    }
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

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

        #endregion



        #region Methods

        public static MemoryStream TryDataTableToXlsx(DataSet dsData, HttpContext context)
        {

            DataSet dsStockDetailData = new DataSet();
            DataTable dtStockDetailData = new DataTable();
            if (dsStockDetailData.Tables.Count != 0)
            {
                dtStockDetailData = dsStockDetailData.Tables[0];
            }

            MemoryStream Result = new MemoryStream();
            ExcelPackage pack = new ExcelPackage();

            DataTable dt = dsData.Tables[0];

            ExcelWorksheet ws = pack.Workbook.Worksheets.Add("Bonus Report"); 

            for (int j = 0; j < dt.Rows.Count; j++)
            {
                if (j == 0)
                {
                    int count = 0;
                    for (int k = 0; k < dt.Columns.Count; k++)
                    {
                        if (dt.Columns[k].ToString() != "fk_ProductId")
                        {
                            ws.Cells[j + 1, k + 1].Value = dt.Columns[k].ToString();
                            ws.Cells[j + 1, k + 1].Style.Font.Bold = true;
                            ws.Cells[j + 1, k + 1, j + 2, k + 1].Merge = true;
                            ws.Cells[j + 1, k + 1, j + 2, k + 1].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                            ws.Cells[j + 1, k + 1, j + 2, k + 1].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.Yellow);
                            ws.Cells[j + 1, k + 1, j + 2, k + 1].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                            ws.Cells[j + 1, k + 1, j + 2, k + 1].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                            ws.Cells[j + 1, k + 1, j + 2, k + 1].Style.WrapText = true;
                            count++;
                        }
                    }
                }
            }
          

            if (pack.Workbook.Worksheets.Count == 0)
            {
                ExcelWorksheet pws = pack.Workbook.Worksheets.Add("Statistics Data");
                ws.Cells[1, 1].Value = "No Data Found!";
            }
            pack.SaveAs(Result);

            return Result;
        }


        public static MemoryStream DataTableToBonusXlsx(DataTable table)
        {
            MemoryStream Result = new MemoryStream();
            ExcelPackage pack = new ExcelPackage();
            ExcelWorksheet ws = pack.Workbook.Worksheets.Add("Bonus Claim Report");
            ws.View.FreezePanes(2, 15);
            ws.View.FreezePanes(3, 15);

            ws.Cells["A6"].Value = "Bonus & Discount Claim Report";
            ws.Cells["A6:E6"].Merge = true;

            ws.Cells["A6"].Style.Font.Bold = true;
            ws.Cells["A6"].Style.Font.Size = 16;


            ws.Cells["A8:O8"].Style.Font.Bold = true;
    

            ws.Cells["A8"].Value = "Sr.no";
            ws.Cells["B8"].Value = "Product Name";
            ws.Cells["C8"].Value = "Product Code ERP";
            ws.Cells["D8"].Value = "Distributor Code:";     
            ws.Cells["E8"].Value = "Distributor's Name:";
            ws.Cells["F8"].Value = "City";
            ws.Cells["G8"].Value = "Duration";
            ws.Cells["H8"].Value = "Group";
            ws.Cells["I8"].Value = "ORG";
            ws.Cells["J8"].Value = "Pack";
            ws.Cells["K8"].Value = "Trade Price";
            ws.Cells["L8"].Value = "Net Quantity";
            ws.Cells["M8"].Value = "Net Value";
            ws.Cells["N8"].Value = "Bonus Quantity";
            ws.Cells["O8"].Value = "Bonus Value";


                int col = 2;
                int row = 9;
                int sr = 1;

                foreach (DataRow rw in table.Rows)
                {   
                   
                    ws.Cells[row, 1].Value = sr;
                    foreach (DataColumn cl in table.Columns)
                    {
                        
                        if (rw[cl.ColumnName] != DBNull.Value)
                            ws.Cells[row, col].Value = rw[cl.ColumnName].ToString();
                        col++;
                      
                    }
                    sr++;
                    row++;
                    col = 2;
                }

           
            pack.SaveAs(Result);
            return Result;
        }



        public static MemoryStream DataTableToDiscountXlsx(DataTable table)
        {
            MemoryStream Result = new MemoryStream();
            ExcelPackage pack = new ExcelPackage();
            ExcelWorksheet ws = pack.Workbook.Worksheets.Add("Discount Claim Report");
            ws.View.FreezePanes(2, 15);
            ws.View.FreezePanes(3, 15);

            ws.Cells["A6"].Value = "Bonus & Discount Claim Report";
            ws.Cells["A6:E6"].Merge = true;

            ws.Cells["A6"].Style.Font.Bold = true;
            ws.Cells["A6"].Style.Font.Size = 16;


            ws.Cells["A8:P8"].Style.Font.Bold = true;
           // Sr.no	Product Name	Product code	Group	ORG	Pack	T.P	Sales Data				Discount Claim	
			//				Sales	Returns	Net Sales	Net Value	Discount %	Value


            ws.Cells["A8"].Value = "Sr.no";
            ws.Cells["B8"].Value = "Product Name";
            ws.Cells["C8"].Value = "Product Code ERP";
            ws.Cells["D8"].Value = "Distributor Code:";
            ws.Cells["E8"].Value = "Distributor's Name:";
            ws.Cells["F8"].Value = "City";
            ws.Cells["G8"].Value = "Duration";
            ws.Cells["H8"].Value = "Group";
            ws.Cells["I8"].Value = "ORG";
            ws.Cells["J8"].Value = "Pack";
            ws.Cells["K8"].Value = "Trade Price";
            ws.Cells["L8"].Value = "Sales";
            ws.Cells["M8"].Value = "Return";
            ws.Cells["N8"].Value = "Net Sale";
            ws.Cells["O8"].Value = "Net Value";
            ws.Cells["P8"].Value = "Discount Value";


            int col = 2;
            int row = 9;
            int sr = 1;

            foreach (DataRow rw in table.Rows)
            {

                ws.Cells[row, 1].Value = sr;
                foreach (DataColumn cl in table.Columns)
                {

                    if (rw[cl.ColumnName] != DBNull.Value)
                        ws.Cells[row, col].Value = rw[cl.ColumnName].ToString();
                    col++;

                }
                sr++;
                row++;
                col = 2;
            }


            pack.SaveAs(Result);
            return Result;
        }

        public static MemoryStream DataTableToStockXlsx(DataTable table)
        {
            MemoryStream Result = new MemoryStream();
            ExcelPackage pack = new ExcelPackage();
            ExcelWorksheet ws = pack.Workbook.Worksheets.Add("Sales & Stock Report");
            ws.View.FreezePanes(2, 15);
            ws.View.FreezePanes(3, 15);

            ws.Cells["A6"].Value = "Sales & Stock Report";
            ws.Cells["A6:E6"].Merge = true;

            ws.Cells["A6"].Style.Font.Bold = true;
            ws.Cells["A6"].Style.Font.Size = 16;


            ws.Cells["A8:AA8"].Style.Font.Bold = true;
 


            ws.Cells["A8"].Value = "Sr.no";
            ws.Cells["B8"].Value = "Product Name";
            ws.Cells["C8"].Value = "Product Code ERP";
            ws.Cells["D8"].Value = "Distributor Code:";
            ws.Cells["E8"].Value = "Distributor's Name:";
            ws.Cells["F8"].Value = "City";
            ws.Cells["G8"].Value = "Duration";
            ws.Cells["H8"].Value = "Group";
            ws.Cells["I8"].Value = "ORG";
            ws.Cells["J8"].Value = "Pack";
            ws.Cells["K8"].Value = "Trade Price";
            ws.Cells["L8"].Value = "Opening Balance";
            ws.Cells["M8"].Value = "Purchase";
            ws.Cells["N8"].Value = "Purchase Return";
            ws.Cells["O8"].Value = "Total Stocks";
            ws.Cells["P8"].Value = "Sales";
            ws.Cells["Q8"].Value = "Returns";
            ws.Cells["R8"].Value = "Net Sales";
            ws.Cells["S8"].Value = "Net Value";
            ws.Cells["T8"].Value = "Near Expiry Stocks";
            ws.Cells["U8"].Value = "Near By Value";
            ws.Cells["V8"].Value = "Expired Stocks";
            ws.Cells["W8"].Value = "Expired Value";
            ws.Cells["X8"].Value = "Active Stocks";
            ws.Cells["Y8"].Value = "Value";
            ws.Cells["Z8"].Value = "Closing Stocks";
            ws.Cells["AA8"].Value = "Closing Value";
            //					


            int col = 2;
            int row = 9;
            int sr = 1;

            foreach (DataRow rw in table.Rows)
            {

                ws.Cells[row, 1].Value = sr;
                foreach (DataColumn cl in table.Columns)
                {

                    if (rw[cl.ColumnName] != DBNull.Value)
                        ws.Cells[row, col].Value = rw[cl.ColumnName].ToString();
                    col++;

                }
                sr++;
                row++;
                col = 2;
            }


            pack.SaveAs(Result);
            return Result;
        }

        public static MemoryStream CustomerWiseMonthlyUnits(DataTable table, int year1)
        {
            MemoryStream Result = new MemoryStream();
            ExcelPackage pack = new ExcelPackage();

            int year2 = year1 + 1;
            ExcelWorksheet ws = pack.Workbook.Worksheets.Add("Customer Wise Sales Report");
            #region Setting Fiscal Year Dynamic
            ws.Cells["A1"].Value = "FY:JUL-" + year1.ToString() + " To JUN-" + (year1 + 1).ToString();
            ws.Cells["A1"].Style.Font.Bold = true;
            #endregion
            #region Setting Column Names as Cell
            ws.Cells[2, 1].Value = "Team";
            ws.Cells[2, 2].Value = "Distributor Type";
            ws.Cells[2, 3].Value = "DistributorID";
            ws.Cells[2, 4].Value = "Distributor";
            ws.Cells[2, 5].Value = "CustomerID";
            ws.Cells[2, 6].Value = "Customer";
            ws.Cells[2, 7].Value = "BrickId";
            ws.Cells[2, 8].Value = "Brick";
            ws.Cells[2, 9].Value = "Product";
            ws.Cells[2, 10].Value = "Jul-" +  year1 + " Unit";
            ws.Cells[2, 11].Value = "Aug-" +  year1 + " Unit";
            ws.Cells[2, 12].Value = "Sep-" +  year1 + " Unit";
            ws.Cells[2, 13].Value = "Oct-" +  year1 + " Unit";
            ws.Cells[2, 14].Value = "Nov-" + year1 + " Unit";
            ws.Cells[2, 15].Value = "Dec-" + year1 + " Unit";
            ws.Cells[2, 16].Value = "Jan-" +  year2 + " Unit";
            ws.Cells[2, 17].Value = "Feb-" +  year2 + " Unit";
            ws.Cells[2, 19].Value = "Apr-" +  year2 + " Unit";
            ws.Cells[2, 20].Value = "May-" +  year2 + " Unit";
            ws.Cells[2, 18].Value = "Mar-" +  year2 + " Unit";
            ws.Cells[2, 21].Value = "Jun-" + year2 + " Unit";
            ws.Cells[2, 22].Value = "Jul-" + year1  +  " Value";
            ws.Cells[2, 23].Value = "Aug-" + year1  +  " Value";
            ws.Cells[2, 24].Value = "Sep-" + year1  +  " Value";
            ws.Cells[2, 25].Value = "Oct-" + year1  +  " Value";
            ws.Cells[2, 26].Value = "Nov-" + year1  +  " Value";
            ws.Cells[2, 27].Value = "Dec-" + year1 +  " Value";
            ws.Cells[2, 28].Value = "Jan-" + year2  +  " Value";
            ws.Cells[2, 29].Value = "Feb-" + year2  +  " Value";
            ws.Cells[2, 30].Value = "Mar-" + year2  +  " Value";
            ws.Cells[2, 31].Value = "Apr-" + year2  +  " Value";
            ws.Cells[2, 32].Value = "May-" + year2  +  " Value";
            ws.Cells[2, 33].Value = "Jun-" + year2 +  " Value";
            ws.Cells["A2:AG2"].Style.Font.Bold = true;
            ws.Cells["A2:AG2"].Style.Border.BorderAround(ExcelBorderStyle.Medium, Color.Black);
            ws.Cells["A2:AG2"].Style.Font.Size = 14f;
            ws.Cells["A2:AG2"].Style.Fill.PatternType = ExcelFillStyle.Solid;
            ws.Cells["A2:AG2"].Style.Fill.PatternType = ExcelFillStyle.Solid;
            ws.Cells["A2:AG2"].Style.Fill.BackgroundColor.SetColor(Color.LightGray);
            #endregion
            #region Setting borders to all cells
            //for (int i = 2; i <= table.Rows.Count; i++)
            //{
            //    for (int j = 1; j <= table.Columns.Count; j++)
            //    {
            //        ws.Cells[i, j].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
            //        ws.Cells[i, j].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            //        ws.Cells[i, j].Style.Font.Size = 12f;

            //    }
            //}
            #endregion
            int col = 1;
            int row = 3;





            for (int i = 0; i < table.Rows.Count; i++)
            {
                foreach (DataColumn cl in table.Columns)
                {
                    if (table.Rows[i][cl.ColumnName].ToString() != "0")
                        ws.Cells[row, col].Value = table.Rows[i][cl.ColumnName];
                    col++;
                }

                if (i != table.Rows.Count - 1)
                {
                    bool validationConditionMet = table.Rows[i]["Product"].ToString() == table.Rows[i + 1]["Product"].ToString() && table.Rows[i]["ClientId"].ToString() == table.Rows[i + 1]["ClientId"].ToString();

                    if (!validationConditionMet)
                        row++;
                }

                col = 1;
            }

            //foreach (DataRow rw in table.Rows)
            //{
            //    foreach (DataColumn cl in table.Columns)
            //    {

            //        if (rw[cl.ColumnName] != DBNull.Value)
            //            ws.Cells[row, col].Value = rw[cl.ColumnName];
            //        //ws.Cells[row, col].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
            //        //ws.Cells[row, col].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            //        //ws.Cells[row, col].Style.Font.Size = 12f;
            //        col++;

            //    }
            //    row++;
            //    col = 1;
            //}
            ws.Cells.AutoFitColumns();
            pack.SaveAs(Result);
            return Result;
        }
        public static MemoryStream SalesAnalysisReportUnits(DataTable table)
        {
            MemoryStream Result = new MemoryStream();
            ExcelPackage pack = new ExcelPackage();
            ExcelWorksheet ws = pack.Workbook.Worksheets.Add("Invoice Voice Sales Report");
            ws.DefaultColWidth = 25;
            //ws.View.FreezePanes(5, 2);
            #region Setting Report Name Cell as Header
            ws.Cells[2, 1, 2, 16].Merge = true;
            ws.Cells[2, 1, 2, 16].Value = "Invoice Voice Sales Report";
            ws.Cells[2, 1, 2, 16].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
            //ws.Cells[2, 16].Value = "Sales Anylysis Report";
            ws.Cells[2, 1, 2, 16].Style.Font.Bold = true;
            ws.Cells[2, 1, 2, 16].Style.Font.Size = 16f;
            //ws.Cells[2, 1, 2, 16].Merge = true;
            ws.Cells[2, 1, 2, 16].Style.Border.BorderAround(ExcelBorderStyle.Medium, Color.Black);
            ws.Cells[2, 1, 2, 16].Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;
            
            
            #endregion

            int rows = 4;
            int cols = 5;
            for (int i = 1; i <= 12; i++)
            {
                #region Month Names in Header

                switch (i)
                {
                    case 1:
                        ws.Cells[rows - 1, cols].Value = "July";
                        break;
                    case 2:
                        ws.Cells[rows - 1, cols].Value = "August";
                        break;
                    case 3:
                        ws.Cells[rows - 1, cols].Value = "September";
                        break;
                    case 4:
                        ws.Cells[rows - 1, cols].Value = "October";
                        break;
                    case 5:
                        ws.Cells[rows - 1, cols].Value = "November";
                        break;
                    case 6:
                        ws.Cells[rows - 1, cols].Value = "December";
                        break;
                    case 7:
                        ws.Cells[rows - 1, cols].Value = "January";
                        break;
                    case 8:
                        ws.Cells[rows - 1, cols].Value = "February";
                        break;
                    case 9:
                        ws.Cells[rows - 1, cols].Value = "March";
                        break;
                    case 10:
                        ws.Cells[rows - 1, cols].Value = "April";
                        break;
                    case 11:
                        ws.Cells[rows - 1, cols].Value = "May";
                        break;
                    case 12:
                        ws.Cells[rows - 1, cols].Value = "June";
                        break;
                    default: break;
                }
                #endregion
                #region formatting excel header cells
                ws.Cells[rows - 1, cols, rows - 1, cols].Style.Border.BorderAround(ExcelBorderStyle.Medium, Color.Black);
                ws.Cells[rows - 1, cols, rows - 1, cols].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Cells[rows - 1, cols, rows - 1, cols].Style.Font.Bold = true;
                ws.Cells[rows - 1, cols, rows - 1, cols].Style.Font.Size = 18f;
                ws.Cells[rows, cols].Style.Font.Bold = true;
                ws.Cells[rows, cols].Style.Font.Size = 14f;
                ws.Cells[rows, cols].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[rows, cols].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.FromArgb(255, 255, 0));
                ws.Cells[rows, cols].Style.Border.BorderAround(ExcelBorderStyle.Medium, Color.Black);
                ws.Cells[rows, cols].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Cells[rows, cols++].Value = "Units";
                #endregion
            }

            ws.Cells[4, 1].Value = "Distributor";
            ws.Cells[4, 2].Value = "InvoiceDate";
            ws.Cells[4, 3].Value = "Product";
            ws.Cells[4, 4].Value = "St";
            //ws.Cells[4, 5].Value = "BrickId";
            //ws.Cells[4, 6].Value = "Product";
            //ws.Cells[4, 7].Value = "Distributor";
            //ws.Cells[4, 8].Value = "DistributorID";

            ws.Cells["A4:d4"].Style.Font.Bold = true;
            ws.Cells["A4:d4"].Style.Border.BorderAround(ExcelBorderStyle.Medium, Color.Black);
            ws.Cells["A4:d4"].Style.Font.Size = 14f;
            ws.Cells["A4:d4"].Style.Fill.PatternType = ExcelFillStyle.Solid;
            ws.Cells["A4:d4"].Style.Fill.PatternType = ExcelFillStyle.Solid;
            ws.Cells["A4:d4"].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.FromArgb(255, 255, 0));

            #region Setting borders to all cells

            for (int i = 3; i <= table.Rows.Count + 3; i++)
            {
                for (int j = 1; j <= table.Columns.Count + 1; j++)
                {
                    ws.Cells[i, j].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);
                    ws.Cells[i, j].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    ws.Cells[i, j].Style.Font.Size = 12f;
                }
            }

            #endregion
            int col = 1;
            int row = 5;
            foreach (DataRow rw in table.Rows)
            {
                foreach (DataColumn cl in table.Columns)
                {

                    if (rw[cl.ColumnName] != DBNull.Value)
                        ws.Cells[row, col].Value = rw[cl.ColumnName];
                    col++;
                }
                row++;
                col = 1;
            }
            ws.Cells.AutoFitColumns();

            pack.SaveAs(Result);
            return Result;
        }
        #endregion
    }
}