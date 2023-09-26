using OfficeOpenXml;
using PocketDCR2.Classes;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;

namespace PocketDCR2.Handler
{
    /// <summary>
    /// Summary description for SalesDashboardTarget
    /// </summary>
    public class SalesDashboardTarget : IHttpHandler, System.Web.SessionState.IRequiresSessionState
    {
        #region Object Intialization
        NameValueCollection _nv = new NameValueCollection();
        DAL DL = new DAL();
        string EmployeeID = string.Empty;
        string FileName1 = string.Empty;
        string guid = string.Empty;

        #endregion

        private System.Data.DataSet GetData(String SpName, SqlCommand command, Boolean withTable)
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
                Constants.ErrorLog("Error While Dumping Sales Dashboard Target Sheet Records ::: Error: " + exception.Message);
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

        public void ProcessRequest(HttpContext context)
        {

            RequestObjectClass requestResponse = new RequestObjectClass();
            string FileName = "C:\\PocketDCR2\\Excel\\SalesDashboardTargetData\\SalesDashboardTargetData-" + requestResponse.Date;

            string type = context.Request.QueryString["Type"];

            if (type == "D")
            {
                DownloadSheet(context, requestResponse, FileName);
            }
            if (type == "T")
            {

                DownloadSheet_TeamWise(context, requestResponse, FileName);


            }
            if (type == "DR")
            {
                DownloadSheetSalesDbTargetWithRemarks(context, requestResponse, FileName);
            }
            else if (type == "U")
            {
                uploadwork(context);
            }
            else if (type == "stock")
            {

                uploadstock(context);

               
               


            }
            else if (type == "TargetData")
            {
                SalesDashboardTargetReadexcel(context);
            }
            else if (type == "StockData")
            {

                StockDataReadexcel(context);

            }

            //else if (type == "TargetDataProcess")
            //{
            //    ProcessSalesDashboardTargetData(context);
            //}
        }
        #region Download Doctor Sheet Methods
        private void DownloadSheetSalesDbTargetWithRemarks(HttpContext context, RequestObjectClass requestResponse, string FileName)
        {

            MemoryStream ms = new MemoryStream();
            DAL dal = new DAL();
            //string level5empid = context.Request.QueryString["level5"];
            //string level6empid = context.Request.QueryString["level6"];

            string TeamId = context.Request.QueryString["TeamId"];


            _nv.Clear();
            _nv.Add("@TeamId-int", TeamId);
            //  _nv.Add("@level6-int", level6empid);
            DataSet dbSalesDbTargetRecord = dal.GetData("sp_GetLastUploadedData", _nv);
            ms = DataTableToExcelXlsx(dbSalesDbTargetRecord, "DR");


            ms.WriteTo(context.Response.OutputStream);
            context.Response.ContentType = "application/vnd.ms-excel";
            context.Response.AddHeader("Content-Disposition", "attachment;filename=" + FileName.Replace(" ", string.Empty).Trim() + ".xlsx");
            context.Response.StatusCode = 200;
            HttpContext.Current.ApplicationInstance.CompleteRequest();
        }

        private void DownloadSheet(HttpContext context, RequestObjectClass requestResponse, string FileName)
        {
            MemoryStream ms = new MemoryStream();
            DAL dal = new DAL();

            //string level1 = context.Request.QueryString["level1"];
            //string level2 = context.Request.QueryString["level2"];
            //string level3 = context.Request.QueryString["level3"];
            string level4 = context.Request.QueryString["level4"];
            string level5empid = context.Request.QueryString["level5"];
            string level6empid = context.Request.QueryString["level6"];
            string ProductId = context.Request.QueryString["ProductIds"];
            string Skuids = context.Request.QueryString["SkuIds"];
            _nv.Clear();
            //_nv.Add("@level1-int", level1);
            //_nv.Add("@level2-int", level2);
            //_nv.Add("@level3-int", level3);
            _nv.Add("@level4-int", level4);
            _nv.Add("@level5-int", level5empid);
            _nv.Add("@level6-int", level6empid);
            _nv.Add("ProductId-nvarchar(max)", ProductId);
            _nv.Add("Skuids-nvarchar(max)", Skuids);
            DataSet dbSalesDbTargetRecord = dal.GetData("SP_GetAllSalesDashboardTargetForExcel", _nv);
            ms = DataTableToExcelXlsx(dbSalesDbTargetRecord, "D");
            ms.WriteTo(context.Response.OutputStream);
            context.Response.ContentType = "application/vnd.ms-excel";
            context.Response.AddHeader("Content-Disposition", "attachment;filename=" + FileName.Replace(" ", string.Empty).Trim() + ".xlsx");
            context.Response.StatusCode = 200;

            HttpContext.Current.ApplicationInstance.CompleteRequest();
        }


        private void DownloadSheet_TeamWise(HttpContext context, RequestObjectClass requestResponse, string FileName)
        {
            MemoryStream ms = new MemoryStream();
            DAL dal = new DAL();

            string level4 = context.Request.QueryString["level4"];
            string level5 = context.Request.QueryString["level5"];
            string level6 = context.Request.QueryString["level6"];
            string TeamId = context.Request.QueryString["TeamId"];

            _nv.Clear();
            _nv.Add("@level4-int", level4);
            _nv.Add("@level5-int", level5);
            _nv.Add("@level6-int", level6);
            _nv.Add("@TeamId-int", TeamId);
            DataSet dbSalesDbTargetRecord = dal.GetData("sp_GetAllDataOnTeam", _nv);


            ms = DataTableToExcelXlsx_teamwise(dbSalesDbTargetRecord, "D");
            ms.WriteTo(context.Response.OutputStream);
            context.Response.ContentType = "application/vnd.ms-excel";
            context.Response.AddHeader("Content-Disposition", "attachment;filename=" + FileName.Replace(" ", string.Empty).Trim() + ".xlsx");
            context.Response.StatusCode = 200;

            HttpContext.Current.ApplicationInstance.CompleteRequest();
        }




        public static MemoryStream DataTableToExcelXlsx_teamwise(DataSet table, string DownloadType)
        {
            MemoryStream Result = new MemoryStream();
            ExcelPackage pack = new ExcelPackage();
            ExcelWorksheet ws = pack.Workbook.Worksheets.Add("Sales Target List");
            int currentYear = DateTime.Now.Year;
            int nextyear = currentYear + 1;
            if (table.Tables[0].Rows.Count > 0)
            {
                ws.Cells["A1"].Value = "NOTE:N= New Sales Target  U= Update Sales Target(Flag must be provided,Otherwise System will not accept the record" +
               "and status must be provided if status is true then it is confirm otherwise not confirm";
                ws.Row(2).Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                ws.Cells[2, 1].Value = "Director";
                ws.Cells[2, 2].Value = "GM";
                ws.Cells[2, 3].Value = "BUH";
                ws.Cells[2, 4].Value = "SM";
                ws.Cells[2, 5].Value = "DSM";
                ws.Cells[2, 6].Value = "LoginID";
                ws.Cells[2, 7].Value = "EmployeeID";
                ws.Cells[2, 8].Value = "EmployeeName";
                ws.Cells[2, 9].Value = "Team";
                ws.Cells[2, 10].Value = "BrandId";
                ws.Cells[2, 11].Value = "BrandName";
                ws.Cells[2, 12].Value = "ProductId";
                ws.Cells[2, 13].Value = "ProductName";
                ws.Cells[2, 14].Value = "Trade/Institution";
                ws.Cells[2, 15].Value = "Price";
                ws.Cells[2, 16].Value = "Status";


                ws.Cells[2, 17].Value = "JUL" + "-" + +currentYear;
                // ws.Cells[1, 17].Value = "TP Target";
                ws.Cells[2, 18].Value = "AUG" + "-" + +currentYear;
                //ws.Cells[1, 18].Value = "IP Target";


                //ws.Cells[1, 19].Value = "Tp Target";
                ws.Cells[2, 19].Value = "SEP" + "-" + currentYear;
                //ws.Cells[1, 20].Value = "Ip Target";
                ws.Cells[2, 20].Value = "OCT" + "-" + currentYear;


                //ws.Cells[1, 21].Value = "TP Target";
                ws.Cells[2, 21].Value = "NOV" + "-" + currentYear;
                //ws.Cells[1, 22].Value = "IP Target";
                ws.Cells[2, 22].Value = "DEC" + "-" + currentYear;


                //ws.Cells[1, 23].Value = "TP Target";
                ws.Cells[2, 23].Value = "JAN" + "-" + nextyear;
                //ws.Cells[1, 24].Value = "IP Target";
                ws.Cells[2, 24].Value = "FEB" + "-" + nextyear;

                //ws.Cells[1, 25].Value = "TP Target";
                ws.Cells[2, 25].Value = "MAR" + "-" + nextyear;
                //ws.Cells[1, 26].Value = "IP Target";
                ws.Cells[2, 26].Value = "APR" + "-" + nextyear;

                //ws.Cells[1, 27].Value = "TP Target";
                ws.Cells[2, 27].Value = "MAY" + "-" + nextyear;
                //ws.Cells[1, 28].Value = "IP Target";
                ws.Cells[2, 28].Value = "JUN" + "-" + nextyear;

                //ws.Cells[1, 29].Value = "TP Target";
                //ws.Cells[2, 29].Value = "Jan" + "-" + nextyear;
                //ws.Cells[1, 30].Value = "IP Target";
                //ws.Cells[2, 30].Value = "Jan" + "-" + nextyear;

                //ws.Cells[1, 31].Value = "TP Target";
                //ws.Cells[2, 31].Value = "Feb" + "-" + nextyear;
                //ws.Cells[1, 32].Value = "IP Target";
                //ws.Cells[2, 32].Value = "Feb" + "-" + nextyear;

                //ws.Cells[1, 33].Value = "TP Target";
                //ws.Cells[2, 33].Value = "Mar" + "-" + nextyear;
                //ws.Cells[1, 34].Value = "IP Target";
                //ws.Cells[2, 34].Value = "Mar" + "-" + nextyear;

                //ws.Cells[1, 35].Value = "TP Target";
                //ws.Cells[2, 35].Value = "Apr" + "-" + nextyear;
                //ws.Cells[1, 36].Value = "IP Target";
                //ws.Cells[2, 36].Value = "Apr" + "-" + nextyear;

                //ws.Cells[1, 37].Value = "TP Target";
                //ws.Cells[2, 37].Value = "May" + "-" + nextyear;
                //ws.Cells[1, 38].Value = "IP Target";
                //ws.Cells[2, 38].Value = "May" + "-" + nextyear;

                //ws.Cells[1, 39].Value = "TP Target";
                //ws.Cells[2, 39].Value = "Jun" + "-" + nextyear;
                //ws.Cells[1, 40].Value = "IP Target";
                //ws.Cells[2, 40].Value = "Jun" + "-" + nextyear;


                ws.Cells[2, 29].Value = "Flag";



                ws.Row(3).Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                ws.Column(2 + 8).Width = 20;
                ws.Column(3 + 8).Width = 15;
                ws.Column(4 + 8).Width = 15;
                ws.Column(5 + 8).Width = 10;
                ws.Column(6 + 8).Width = 10;
                ws.Column(7 + 8).Width = 10;
                ws.Column(8 + 8).Width = 10;
                ws.Column(9 + 8).Width = 10;
                ws.Column(10 + 8).Width = 10;
                //ws.Column(11 + 8).Width = 10;
                //ws.Column(12 + 8).Width = 10;
                //ws.Column(13 + 8).Width = 10;
                //ws.Column(14 + 8).Width = 10;
                //ws.Column(15 + 8).Width = 10;
                //ws.Column(16 + 8).Width = 10;
                //ws.Column(18 + 8).Width = 10;
                ws.Column(7 + 8).Width = 10;
                ws.Row(1).Style.Font.Bold = true;
                ws.Row(2).Style.Font.Bold = true;
                #region // ************************ Start Sheet Headers ************************ //

                ws.Column(2).Width = 20;
                #endregion // ********************** End Sheet Headers ********************** //
                int col = 1;
                int row = 3;
                if (table.Tables[0] != null)
                {

                    DataTable dt = table.Tables[0];

                    int rowcount = 3;


                    for (int i = 0; i < dt.Rows.Count; i++)
                    {

                        for (int j = 0; j < 2; j++)
                        {

                            if (j == 0)
                            {
                                ws.Cells[rowcount, 1].Value = dt.Rows[i]["MD"].ToString();
                                ws.Cells[rowcount, 2].Value = dt.Rows[i]["Director"].ToString();
                                ws.Cells[rowcount, 3].Value = dt.Rows[i]["BUH"].ToString();
                                ws.Cells[rowcount, 4].Value = dt.Rows[i]["SM"].ToString();
                                ws.Cells[rowcount, 5].Value = dt.Rows[i]["DSM"].ToString();
                                ws.Cells[rowcount, 6].Value = dt.Rows[i]["LoginId"].ToString();
                                ws.Cells[rowcount, 7].Value = dt.Rows[i]["EmployeeId"].ToString();
                                ws.Cells[rowcount, 8].Value = dt.Rows[i]["EmployeeName"].ToString();
                                ws.Cells[rowcount, 9].Value = dt.Rows[i]["TeamMastertName"].ToString();
                                ws.Cells[rowcount, 10].Value = dt.Rows[i]["ProductId"].ToString();
                                ws.Cells[rowcount, 11].Value = dt.Rows[i]["ProductName"].ToString();
                                ws.Cells[rowcount, 12].Value = dt.Rows[i]["SkuId"].ToString();
                                ws.Cells[rowcount, 13].Value = dt.Rows[i]["SkuName"].ToString();
                                ws.Cells[rowcount, 14].Value = "TP";
                                ws.Cells[rowcount, 15].Value = dt.Rows[i]["TradePrice"].ToString();

                                ws.Cells[rowcount, 14].Style.Font.Bold = true;
                            }
                            else
                            {

                                ws.Cells[rowcount, 1].Value = dt.Rows[i]["MD"].ToString();
                                ws.Cells[rowcount, 2].Value = dt.Rows[i]["Director"].ToString();
                                ws.Cells[rowcount, 3].Value = dt.Rows[i]["BUH"].ToString();
                                ws.Cells[rowcount, 4].Value = dt.Rows[i]["SM"].ToString();
                                ws.Cells[rowcount, 5].Value = dt.Rows[i]["DSM"].ToString();
                                ws.Cells[rowcount, 6].Value = dt.Rows[i]["LoginId"].ToString();
                                ws.Cells[rowcount, 7].Value = dt.Rows[i]["EmployeeId"].ToString();
                                ws.Cells[rowcount, 8].Value = dt.Rows[i]["EmployeeName"].ToString();
                                ws.Cells[rowcount, 9].Value = dt.Rows[i]["TeamMastertName"].ToString();
                                ws.Cells[rowcount, 10].Value = dt.Rows[i]["ProductId"].ToString();
                                ws.Cells[rowcount, 11].Value = dt.Rows[i]["ProductName"].ToString();
                                ws.Cells[rowcount, 12].Value = dt.Rows[i]["SkuId"].ToString();
                                ws.Cells[rowcount, 13].Value = dt.Rows[i]["SkuName"].ToString();
                                ws.Cells[rowcount, 14].Value = "IP";
                                ws.Cells[rowcount, 15].Value = dt.Rows[i]["InstitutionPrice"].ToString();

                                ws.Cells[rowcount, 14].Style.Font.Bold = true;

                            }


                            rowcount++;
                        }














                        //   rowcount++;

                    }

                    //foreach (DataRow rw in dt.Rows)
                    //{
                    //    foreach (DataColumn cl in dt.Columns)
                    //    {
                    //        if (rw[cl.ColumnName] != DBNull.Value)
                    //            ws.Cells[row, col].Value = rw[cl.ColumnName].ToString();
                    //        col++;
                    //    }
                    //    row++;
                    //    col = 1;
                    //}
                }


            }
            else
            {
                ws.Cells[1, 1].Value = "No Data Found!";
            }
            pack.SaveAs(Result);
            return Result;
        }













        public static MemoryStream DataTableToExcelXlsx(DataSet table, string DownloadType)
        {
            MemoryStream Result = new MemoryStream();
            ExcelPackage pack = new ExcelPackage();
            ExcelWorksheet ws = pack.Workbook.Worksheets.Add("Sales Target List");
            int currentYear = DateTime.Now.Year;
            int nextyear = currentYear + 1;
            if (table.Tables[0].Rows.Count > 0)
            {
                ws.Cells["A1"].Value = "NOTE:N= New Sales Target  U= Update Sales Target(Flag must be provided,Otherwise System will not accept the record" +
                "and status must be provided if status is true then it is confirm otherwise not confirm";
                ws.Row(2).Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                ws.Cells[2, 1].Value = "Director";
                ws.Cells[2, 2].Value = "GM";
                ws.Cells[2, 3].Value = "BUH";
                ws.Cells[2, 4].Value = "SM";
                ws.Cells[2, 5].Value = "DSM";
                ws.Cells[2, 6].Value = "LoginID";
                ws.Cells[2, 7].Value = "EmployeeID";
                ws.Cells[2, 8].Value = "EmployeeName";
                ws.Cells[2, 9].Value = "Team";
                ws.Cells[2, 10].Value = "BrandId";
                ws.Cells[2, 11].Value = "BrandName";
                ws.Cells[2, 12].Value = "ProductId";
                ws.Cells[2, 13].Value = "ProductName";
                ws.Cells[2, 14].Value = "Trade/Institution";
                ws.Cells[2, 15].Value = "Price";
                ws.Cells[2, 16].Value = "Status";


                ws.Cells[2, 17].Value = "JUL" + "-" + +currentYear;
                // ws.Cells[1, 17].Value = "TP Target";
                ws.Cells[2, 18].Value = "AUG" + "-" + +currentYear;
                //ws.Cells[1, 18].Value = "IP Target";


                //ws.Cells[1, 19].Value = "Tp Target";
                ws.Cells[2, 19].Value = "SEP" + "-" + currentYear;
                //ws.Cells[1, 20].Value = "Ip Target";
                ws.Cells[2, 20].Value = "OCT" + "-" + currentYear;


                //ws.Cells[1, 21].Value = "TP Target";
                ws.Cells[2, 21].Value = "NOV" + "-" + currentYear;
                //ws.Cells[1, 22].Value = "IP Target";
                ws.Cells[2, 22].Value = "DEC" + "-" + currentYear;


                //ws.Cells[1, 23].Value = "TP Target";
                ws.Cells[2, 23].Value = "JAN" + "-" + nextyear;
                //ws.Cells[1, 24].Value = "IP Target";
                ws.Cells[2, 24].Value = "FEB" + "-" + nextyear;

                //ws.Cells[1, 25].Value = "TP Target";
                ws.Cells[2, 25].Value = "MAR" + "-" + nextyear;
                //ws.Cells[1, 26].Value = "IP Target";
                ws.Cells[2, 26].Value = "APR" + "-" + nextyear;

                //ws.Cells[1, 27].Value = "TP Target";
                ws.Cells[2, 27].Value = "MAY" + "-" + nextyear;
                //ws.Cells[1, 28].Value = "IP Target";
                ws.Cells[2, 28].Value = "JUN" + "-" + nextyear;

                //ws.Cells[1, 29].Value = "TP Target";
                //ws.Cells[2, 29].Value = "Jan" + "-" + nextyear;
                //ws.Cells[1, 30].Value = "IP Target";
                //ws.Cells[2, 30].Value = "Jan" + "-" + nextyear;

                //ws.Cells[1, 31].Value = "TP Target";
                //ws.Cells[2, 31].Value = "Feb" + "-" + nextyear;
                //ws.Cells[1, 32].Value = "IP Target";
                //ws.Cells[2, 32].Value = "Feb" + "-" + nextyear;

                //ws.Cells[1, 33].Value = "TP Target";
                //ws.Cells[2, 33].Value = "Mar" + "-" + nextyear;
                //ws.Cells[1, 34].Value = "IP Target";
                //ws.Cells[2, 34].Value = "Mar" + "-" + nextyear;

                //ws.Cells[1, 35].Value = "TP Target";
                //ws.Cells[2, 35].Value = "Apr" + "-" + nextyear;
                //ws.Cells[1, 36].Value = "IP Target";
                //ws.Cells[2, 36].Value = "Apr" + "-" + nextyear;

                //ws.Cells[1, 37].Value = "TP Target";
                //ws.Cells[2, 37].Value = "May" + "-" + nextyear;
                //ws.Cells[1, 38].Value = "IP Target";
                //ws.Cells[2, 38].Value = "May" + "-" + nextyear;

                //ws.Cells[1, 39].Value = "TP Target";
                //ws.Cells[2, 39].Value = "Jun" + "-" + nextyear;
                //ws.Cells[1, 40].Value = "IP Target";
                //ws.Cells[2, 40].Value = "Jun" + "-" + nextyear;


                ws.Cells[2, 29].Value = "Flag";



                ws.Row(3).Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                ws.Column(2 + 8).Width = 20;
                ws.Column(3 + 8).Width = 15;
                ws.Column(4 + 8).Width = 15;
                ws.Column(5 + 8).Width = 10;
                ws.Column(6 + 8).Width = 10;
                ws.Column(7 + 8).Width = 10;
                ws.Column(8 + 8).Width = 10;
                ws.Column(9 + 8).Width = 10;
                ws.Column(10 + 8).Width = 10;
                //ws.Column(11 + 8).Width = 10;
                //ws.Column(12 + 8).Width = 10;
                //ws.Column(13 + 8).Width = 10;
                //ws.Column(14 + 8).Width = 10;
                //ws.Column(15 + 8).Width = 10;
                //ws.Column(16 + 8).Width = 10;
                //ws.Column(18 + 8).Width = 10;
                ws.Column(7 + 8).Width = 10;
                ws.Row(1).Style.Font.Bold = true;
                ws.Row(2).Style.Font.Bold = true;
                #region // ************************ Start Sheet Headers ************************ //

                ws.Column(2).Width = 20;
                #endregion // ********************** End Sheet Headers ********************** //
                int col = 1;
                int row = 3;
                if (table.Tables[0] != null)
                {

                    DataTable dt = table.Tables[0];

                    int rowcount = 3;



                    for (int i = 0; i < dt.Rows.Count; i++)
                    {

                        for (int j = 0; j < 2; j++)
                        {

                            if (j == 0)
                            {
                                ws.Cells[rowcount, 1].Value = dt.Rows[i]["MD"].ToString();
                                ws.Cells[rowcount, 2].Value = dt.Rows[i]["Director"].ToString();
                                ws.Cells[rowcount, 3].Value = dt.Rows[i]["BUH"].ToString();
                                ws.Cells[rowcount, 4].Value = dt.Rows[i]["SM"].ToString();
                                ws.Cells[rowcount, 5].Value = dt.Rows[i]["DSM"].ToString();
                                ws.Cells[rowcount, 6].Value = dt.Rows[i]["LoginId"].ToString();
                                ws.Cells[rowcount, 7].Value = dt.Rows[i]["Empid"].ToString();
                                ws.Cells[rowcount, 8].Value = dt.Rows[i]["EmployeeName"].ToString();
                                ws.Cells[rowcount, 9].Value = dt.Rows[i]["TeamMastertName"].ToString();
                                ws.Cells[rowcount, 10].Value = dt.Rows[i]["BrandId"].ToString();
                                ws.Cells[rowcount, 11].Value = dt.Rows[i]["Brand"].ToString();
                                ws.Cells[rowcount, 12].Value = dt.Rows[i]["ProductId"].ToString();
                                ws.Cells[rowcount, 13].Value = dt.Rows[i]["ProductName"].ToString();
                                ws.Cells[rowcount, 14].Value = "TP";
                                ws.Cells[rowcount, 15].Value = dt.Rows[i]["TradePrice"].ToString();

                                ws.Cells[rowcount, 14].Style.Font.Bold = true;

                                ws.Cells[rowcount, 16].Value = dt.Rows[i]["Status"].ToString();
                                ws.Cells[rowcount, 17].Value = dt.Rows[i]["07_TP_Unit"].ToString();
                                ws.Cells[rowcount, 18].Value = dt.Rows[i]["08_TP_Unit"].ToString();
                                ws.Cells[rowcount, 19].Value = dt.Rows[i]["09_TP_Unit"].ToString();
                                ws.Cells[rowcount, 20].Value = dt.Rows[i]["10_TP_Unit"].ToString();
                                ws.Cells[rowcount, 21].Value = dt.Rows[i]["11_TP_Unit"].ToString();
                                ws.Cells[rowcount, 22].Value = dt.Rows[i]["12_TP_Unit"].ToString();
                                ws.Cells[rowcount, 23].Value = dt.Rows[i]["1_TP_Unit"].ToString();
                                ws.Cells[rowcount, 24].Value = dt.Rows[i]["2_TP_Unit"].ToString();
                                ws.Cells[rowcount, 25].Value = dt.Rows[i]["3_TP_Unit"].ToString();
                                ws.Cells[rowcount, 26].Value = dt.Rows[i]["4_TP_Unit"].ToString();
                                ws.Cells[rowcount, 27].Value = dt.Rows[i]["5_TP_Unit"].ToString();
                                ws.Cells[rowcount, 28].Value = dt.Rows[i]["6_TP_Unit"].ToString();



                            }
                            else
                            {

                                ws.Cells[rowcount, 1].Value = dt.Rows[i]["MD"].ToString();
                                ws.Cells[rowcount, 2].Value = dt.Rows[i]["Director"].ToString();
                                ws.Cells[rowcount, 3].Value = dt.Rows[i]["BUH"].ToString();
                                ws.Cells[rowcount, 4].Value = dt.Rows[i]["SM"].ToString();
                                ws.Cells[rowcount, 5].Value = dt.Rows[i]["DSM"].ToString();
                                ws.Cells[rowcount, 6].Value = dt.Rows[i]["LoginId"].ToString();
                                ws.Cells[rowcount, 7].Value = dt.Rows[i]["Empid"].ToString();
                                ws.Cells[rowcount, 8].Value = dt.Rows[i]["EmployeeName"].ToString();
                                ws.Cells[rowcount, 9].Value = dt.Rows[i]["TeamMastertName"].ToString();
                                ws.Cells[rowcount, 10].Value = dt.Rows[i]["BrandId"].ToString();
                                ws.Cells[rowcount, 11].Value = dt.Rows[i]["Brand"].ToString();
                                ws.Cells[rowcount, 12].Value = dt.Rows[i]["ProductId"].ToString();
                                ws.Cells[rowcount, 13].Value = dt.Rows[i]["ProductName"].ToString();
                                ws.Cells[rowcount, 14].Value = "IP";
                                ws.Cells[rowcount, 15].Value = dt.Rows[i]["InstitutionPrice"].ToString();

                                ws.Cells[rowcount, 14].Style.Font.Bold = true;
                                ws.Cells[rowcount, 16].Value = dt.Rows[i]["Status"].ToString();

                                ws.Cells[rowcount, 17].Value = dt.Rows[i]["07_IP_Unit"].ToString();
                                ws.Cells[rowcount, 18].Value = dt.Rows[i]["08_IP_Unit"].ToString();
                                ws.Cells[rowcount, 19].Value = dt.Rows[i]["09_IP_Unit"].ToString();
                                ws.Cells[rowcount, 20].Value = dt.Rows[i]["10_IP_Unit"].ToString();
                                ws.Cells[rowcount, 21].Value = dt.Rows[i]["11_IP_Unit"].ToString();
                                ws.Cells[rowcount, 22].Value = dt.Rows[i]["12_IP_Unit"].ToString();
                                ws.Cells[rowcount, 23].Value = dt.Rows[i]["1_IP_Unit"].ToString();
                                ws.Cells[rowcount, 24].Value = dt.Rows[i]["2_IP_Unit"].ToString();
                                ws.Cells[rowcount, 25].Value = dt.Rows[i]["3_IP_Unit"].ToString();
                                ws.Cells[rowcount, 26].Value = dt.Rows[i]["4_IP_Unit"].ToString();
                                ws.Cells[rowcount, 27].Value = dt.Rows[i]["5_IP_Unit"].ToString();
                                ws.Cells[rowcount, 28].Value = dt.Rows[i]["6_IP_Unit"].ToString();
                            }


                            rowcount++;
                        }












                        //i++;

                        //   rowcount++;

                    }





                    //for (int i = 0; i < dt.Rows.Count; i++)
                    //{


                    //    ws.Cells[rowcount, 1].Value = dt.Rows[i]["MD"].ToString();
                    //    ws.Cells[rowcount, 2].Value = dt.Rows[i]["Director"].ToString();
                    //    ws.Cells[rowcount, 3].Value = dt.Rows[i]["BUH"].ToString();
                    //    ws.Cells[rowcount, 4].Value = dt.Rows[i]["SM"].ToString();
                    //    ws.Cells[rowcount, 5].Value = dt.Rows[i]["DSM"].ToString();
                    //    ws.Cells[rowcount, 6].Value = dt.Rows[i]["LoginId"].ToString();
                    //    ws.Cells[rowcount, 7].Value = dt.Rows[i]["EmpId"].ToString();
                    //    ws.Cells[rowcount, 8].Value = dt.Rows[i]["EmployeeName"].ToString();
                    //    ws.Cells[rowcount, 9].Value = dt.Rows[i]["TeamMastertName"].ToString();
                    //    ws.Cells[rowcount, 10].Value = dt.Rows[i]["BrandId"].ToString();
                    //    ws.Cells[rowcount, 11].Value = dt.Rows[i]["Brand"].ToString();
                    //    ws.Cells[rowcount, 12].Value = dt.Rows[i]["ProductID"].ToString();
                    //    ws.Cells[rowcount, 13].Value = dt.Rows[i]["ProductName"].ToString();
                    //    ws.Cells[rowcount, 14].Value = dt.Rows[i]["TradePrice"].ToString();
                    //    ws.Cells[rowcount, 15].Value = dt.Rows[i]["InstitutionPrice"].ToString();
                    //    ws.Cells[rowcount, 16].Value = dt.Rows[i]["Status"].ToString();






                    //    ws.Cells[rowcount, 18].Value = dt.Rows[i]["07_IP_Unit"].ToString();
                    //    ws.Cells[rowcount, 20].Value = dt.Rows[i]["08_IP_Unit"].ToString();
                    //    ws.Cells[rowcount, 22].Value = dt.Rows[i]["09_IP_Unit"].ToString();
                    //    ws.Cells[rowcount, 23].Value = dt.Rows[i]["10_IP_Unit"].ToString();
                    //    ws.Cells[rowcount, 26].Value = dt.Rows[i]["11_IP_Unit"].ToString();
                    //    ws.Cells[rowcount, 28].Value = dt.Rows[i]["12_IP_Unit"].ToString();
                    //    ws.Cells[rowcount, 30].Value = dt.Rows[i]["1_IP_Unit"].ToString();
                    //    ws.Cells[rowcount, 32].Value = dt.Rows[i]["2_IP_Unit"].ToString();
                    //    ws.Cells[rowcount, 34].Value = dt.Rows[i]["3_IP_Unit"].ToString();
                    //    ws.Cells[rowcount, 36].Value = dt.Rows[i]["4_IP_Unit"].ToString();
                    //    ws.Cells[rowcount, 38].Value = dt.Rows[i]["5_IP_Unit"].ToString();
                    //    ws.Cells[rowcount, 40].Value = dt.Rows[i]["6_IP_Unit"].ToString();




                    //    rowcount++;

                    //}

                    //foreach (DataRow rw in dt.Rows)
                    //{
                    //    foreach (DataColumn cl in dt.Columns)
                    //    {
                    //        if (rw[cl.ColumnName] != DBNull.Value)
                    //            ws.Cells[row, col].Value = rw[cl.ColumnName].ToString();
                    //        col++;
                    //    }
                    //    row++;
                    //    col = 1;
                    //}
                }



            }
            else
            {
                ws.Cells[1, 1].Value = "No Data Found!";
            }
            pack.SaveAs(Result);
            return Result;
        }
        #endregion


        public void uploadstock(HttpContext context)
        {
            HttpPostedFile postedFile = context.Request.Files["Filedata"];
            string insertmonth = context.Request.QueryString["insertmonth"];
            try
            {
               
                string extension = System.IO.Path.GetExtension(postedFile.FileName);
                if (!((".xlsx,.xls").Contains(extension)))
                {
                    context.Response.Write("extensionError");
                }
                else
                {
                    string savepath = "";
                    string tempPath = "";
                    tempPath = @"C:\PocketDCR2\Excel\SalesDashboardTargetData";
                    savepath = tempPath;
                    string filename = HttpContext.Current.Session["guid"] + postedFile.FileName;
                    if (!Directory.Exists(savepath))
                        Directory.CreateDirectory(savepath);
                    postedFile.SaveAs(savepath + @"\" + filename);
                    context.Response.Write(filename);
                    FileName1 = tempPath + "/" + filename;
                    context.Response.StatusCode = 200;
                }

            }
            catch (Exception ex)
            {
                Constants.ErrorLog("uploadstock() ::: Error: " + ex.Message);
                context.Response.Write("Error: " + ex.Message);
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
                string extension = System.IO.Path.GetExtension(postedFile.FileName);
                if (!((".xlsx,.xls").Contains(extension)))
                {
                    contxt.Response.Write("extensionError");
                }
                else
                {
                    string savepath = "";
                    string tempPath = "";
                    tempPath = @"C:\PocketDCR2\Excel\SalesDashboardTargetData";
                    savepath = tempPath;
                    string filename = HttpContext.Current.Session["guid"] + postedFile.FileName;
                    if (!Directory.Exists(savepath))
                        Directory.CreateDirectory(savepath);
                    postedFile.SaveAs(savepath + @"\" + filename);
                    contxt.Response.Write(filename);
                    FileName1 = tempPath + "/" + filename;
                    contxt.Response.StatusCode = 200;
                }

            }
            catch (Exception ex)
            {
                Constants.ErrorLog("uploadwork() ::: Error: " + ex.Message);
                contxt.Response.Write("Error: " + ex.Message);
            }
        }
        private string SalesDashboardTargetReadExcelFile(string FileName, string FileNamePath)
        {
            int currentYear = DateTime.Now.Year;
            int nextyear = currentYear + 1;
            DataSet dsR = new DataSet();
            try
            {
                #region Reading Excel To DataTable
                
                OleDbConnection con = new OleDbConnection();
                NameValueCollection _nv = new NameValueCollection();
                DAL dal = new DAL();
                string FilePath = @"C:\PocketDCR2\Excel\SalesDashboardTargetData\" + FileNamePath;
                string part1 = "Provider=Microsoft.ACE.OLEDB.12.0;";
                string part2 = @"Data Source=" + FilePath + ";";
                string part3 = "Extended Properties='Excel 12.0;HDR=YES;'";
                string connectionString = part1 + part2 + part3;
                con.ConnectionString = connectionString;
                FileInfo FIforexcel = new FileInfo(FilePath);
                ExcelPackage Ep = new ExcelPackage(FIforexcel);
                OleDbCommand cmnd = new OleDbCommand("Select * from [" + Ep.Workbook.Worksheets.FirstOrDefault().Name + "$A1:AC]", con);
                OleDbDataAdapter adapter = new OleDbDataAdapter(cmnd);
                con.Open();
                DataSet ds = new DataSet();
                adapter.Fill(ds);
                con.Close();
                #endregion



                DateTime createdate = DateTime.Now;

                DataTable dt = new DataTable();

                dt.Columns.Add(new DataColumn("Empid", typeof(string)));
                dt.Columns.Add(new DataColumn("Loginid", typeof(string)));
                dt.Columns.Add(new DataColumn("Empolyeename", typeof(string)));
                dt.Columns.Add(new DataColumn("BrandId", typeof(string)));
                dt.Columns.Add(new DataColumn("Brand", typeof(string)));
                dt.Columns.Add(new DataColumn("ProductId", typeof(string)));
                dt.Columns.Add(new DataColumn("ProductName", typeof(string)));
                dt.Columns.Add(new DataColumn("Status", typeof(int)));
                dt.Columns.Add(new DataColumn("Year", typeof(string)));
                dt.Columns.Add(new DataColumn("Month", typeof(string)));
                dt.Columns.Add(new DataColumn("Tp_Unit", typeof(int)));
                dt.Columns.Add(new DataColumn("CreatDatetime", typeof(DateTime)));
                dt.Columns.Add(new DataColumn("Ip_Unit", typeof(int)));
                dt.Columns.Add(new DataColumn("Flag", typeof(string)));





                int rowcount = 0;
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count != 0)
                    {


                        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                        {


                            int iterator = 7;

                            for (int j = 1; j <= 12; j++)
                            {
                                DataRow dr = dt.NewRow();
                                dr.BeginEdit();


                                // dr["Empid"] = "001";   //EMpid
                                dr["Empid"] = ds.Tables[0].Rows[i][6].ToString();   //EMpid
                                dr["Loginid"] = ds.Tables[0].Rows[i][5].ToString();     //LoginID
                                dr["Empolyeename"] = ds.Tables[0].Rows[i][7].ToString();     //EmpName
                                dr["BrandId"] = ds.Tables[0].Rows[i][9].ToString();         //BRandId
                                dr["Brand"] = ds.Tables[0].Rows[i][10].ToString();        //BrandName
                                dr["ProductId"] = ds.Tables[0].Rows[i][11].ToString();        //ProductId
                                dr["ProductName"] = ds.Tables[0].Rows[i][12].ToString();           //ProductName

                                var Status = 0;
                                object value = ds.Tables[0].Rows[i][15].ToString();

                                if (value is int || value is double || value is float || value is decimal)
                                {
                                    Status = Convert.ToInt32(ds.Tables[0].Rows[i][15]);
                                }
                                else if (value is string)
                                {
                                    if (ds.Tables[0].Rows[i][15].ToString() == "TRUE" || ds.Tables[0].Rows[i][15].ToString() == "True" || ds.Tables[0].Rows[i][15].ToString() == "1")
                                    {

                                        Status = 1;

                                    }
                                    else
                                    {
                                        Status = 0;


                                    }
                                }
                                else
                                {
                                    // It's neither a number nor a string
                                }

                                dr["Status"] = Status;  //Status


                                if (iterator > 12)
                                {
                                    iterator = 1;
                                }


                                if (j == 1)
                                {



                                    dr["Year"] = currentYear.ToString();         //Year
                                    dr["Month"] = iterator.ToString();            //Month
                                    dr["Tp_Unit"] = ds.Tables[0].Rows[i][16];      //TP_Unit
                                    dr["CreatDatetime"] = createdate;                    //CreateDateTime
                                    dr["Ip_Unit"] = ds.Tables[0].Rows[i + 1][16];  //IP_Unit
                                    dr["Flag"] = ds.Tables[0].Rows[i][28].ToString();   //Flag
                                }
                                if (j == 2)
                                {
                                    dr["Year"] = currentYear.ToString();
                                    dr["Month"] = iterator.ToString();
                                    dr["Tp_Unit"] = ds.Tables[0].Rows[i][17];
                                    dr["CreatDatetime"] = createdate;
                                    dr["Ip_Unit"] = ds.Tables[0].Rows[i + 1][17];
                                    dr["Flag"] = ds.Tables[0].Rows[i][28].ToString();
                                }
                                if (j == 3)
                                {
                                    dr["Year"] = currentYear.ToString();
                                    dr["Month"] = iterator.ToString();
                                    dr["Tp_Unit"] = ds.Tables[0].Rows[i][18];
                                    dr["CreatDatetime"] = createdate;
                                    dr["Ip_Unit"] = ds.Tables[0].Rows[i + 1][18];
                                    dr["Flag"] = ds.Tables[0].Rows[i][28].ToString();

                                }
                                if (j == 4)
                                {
                                    dr["Year"] = currentYear.ToString();
                                    dr["Month"] = iterator.ToString();
                                    dr["Tp_Unit"] = ds.Tables[0].Rows[i][19];
                                    dr["CreatDatetime"] = createdate;
                                    dr["Ip_Unit"] = ds.Tables[0].Rows[i + 1][19];
                                    dr["Flag"] = ds.Tables[0].Rows[i][28].ToString();

                                }
                                if (j == 5)
                                {
                                    dr["Year"] = currentYear.ToString();
                                    dr["Month"] = iterator.ToString();
                                    dr["Tp_Unit"] = ds.Tables[0].Rows[i][20];
                                    dr["CreatDatetime"] = createdate;
                                    dr["Ip_Unit"] = ds.Tables[0].Rows[i + 1][20];
                                    dr["Flag"] = ds.Tables[0].Rows[i][28].ToString();


                                }
                                if (j == 6)
                                {
                                    dr["Year"] = currentYear.ToString();
                                    dr["Month"] = iterator.ToString();
                                    dr["Tp_Unit"] = ds.Tables[0].Rows[i][21];
                                    dr["CreatDatetime"] = createdate;
                                    dr["Ip_Unit"] = ds.Tables[0].Rows[i + 1][21];
                                    dr["Flag"] = ds.Tables[0].Rows[i][28].ToString();

                                }
                                if (j == 7)
                                {
                                    dr["Year"] = nextyear.ToString();
                                    dr["Month"] = iterator.ToString();
                                    dr["Tp_Unit"] = ds.Tables[0].Rows[i][22];
                                    dr["CreatDatetime"] = createdate;
                                    dr["Ip_Unit"] = ds.Tables[0].Rows[i + 1][22];
                                    dr["Flag"] = ds.Tables[0].Rows[i][28].ToString();

                                }
                                if (j == 8)
                                {
                                    dr["Year"] = nextyear.ToString();
                                    dr["Month"] = iterator.ToString();
                                    dr["Tp_Unit"] = ds.Tables[0].Rows[i][23];
                                    dr["CreatDatetime"] = createdate;
                                    dr["Ip_Unit"] = ds.Tables[0].Rows[i + 1][23];
                                    dr["Flag"] = ds.Tables[0].Rows[i][28].ToString();

                                }
                                if (j == 9)
                                {
                                    dr["Year"] = nextyear.ToString();
                                    dr["Month"] = iterator.ToString();
                                    dr["Tp_Unit"] = ds.Tables[0].Rows[i][24];
                                    dr["CreatDatetime"] = createdate;
                                    dr["Ip_Unit"] = ds.Tables[0].Rows[i + 1][24];
                                    dr["Flag"] = ds.Tables[0].Rows[i][28].ToString();

                                }
                                if (j == 10)
                                {
                                    dr["Year"] = nextyear.ToString();
                                    dr["Month"] = iterator.ToString();
                                    dr["Tp_Unit"] = ds.Tables[0].Rows[i][25];
                                    dr["CreatDatetime"] = createdate;
                                    dr["Ip_Unit"] = ds.Tables[0].Rows[i + 1][25];
                                    dr["Flag"] = ds.Tables[0].Rows[i][28].ToString();

                                }

                                if (j == 11)
                                {
                                    dr["Year"] = nextyear.ToString();
                                    dr["Month"] = iterator.ToString();
                                    dr["Tp_Unit"] = ds.Tables[0].Rows[i][26];
                                    dr["CreatDatetime"] = createdate;
                                    dr["Ip_Unit"] = ds.Tables[0].Rows[i + 1][26];
                                    dr["Flag"] = ds.Tables[0].Rows[i][28].ToString();


                                }


                                if (j == 12)
                                {
                                    dr["Year"] = nextyear.ToString();
                                    dr["Month"] = iterator.ToString();
                                    dr["Tp_Unit"] = ds.Tables[0].Rows[i][27];
                                    dr["CreatDatetime"] = createdate;
                                    dr["Ip_Unit"] = ds.Tables[0].Rows[i + 1][27];
                                    dr["Flag"] = ds.Tables[0].Rows[i][28].ToString();

                                }

                                dr.EndEdit();
                                dt.Rows.Add(dr);
                                iterator++;


                            }



                            i++;



                        }



                       
                        #region oldcwork

                        //var Empid = ds.Tables[0].Rows[i][6].ToString();
                        //var LoginId = ds.Tables[0].Rows[i][5];
                        //var EmpName = ds.Tables[0].Rows[i][7];
                        //var BrandId = ds.Tables[0].Rows[i][9];
                        //var Brandname = ds.Tables[0].Rows[i][10];
                        //var ProductId = ds.Tables[0].Rows[i][11];
                        //var ProductName = ds.Tables[0].Rows[i][12];






                        //var Jul_unit_TP = ds.Tables[0].Rows[i][16];
                        //var Aug_unit_TP = ds.Tables[0].Rows[i][17];
                        //var Sep_unit_TP = ds.Tables[0].Rows[i][18];
                        //var Oct_unit_TP = ds.Tables[0].Rows[i][19];
                        //var Nov_unit_TP = ds.Tables[0].Rows[i][20];
                        //var Dec_unit_TP = ds.Tables[0].Rows[i][21];
                        //var Jan_unit_TP = ds.Tables[0].Rows[i][22];
                        //var Feb_unit_TP = ds.Tables[0].Rows[i][23];
                        //var Mar_unit_TP = ds.Tables[0].Rows[i][24];
                        //var Apr_unit_TP = ds.Tables[0].Rows[i][25];
                        //var May_unit_TP = ds.Tables[0].Rows[i][26];
                        //var Jun_unit_TP = ds.Tables[0].Rows[i][27];



                        //var Jul_unit_IP = ds.Tables[0].Rows[i+1][16];
                        //var Aug_unit_IP = ds.Tables[0].Rows[i+1][17];
                        //var Sep_unit_IP = ds.Tables[0].Rows[i+1][18];
                        //var Oct_unit_IP = ds.Tables[0].Rows[i+1][19];
                        //var Nov_unit_IP = ds.Tables[0].Rows[i+1][20];
                        //var Dec_unit_IP = ds.Tables[0].Rows[i+1][21];
                        //var Jan_unit_IP = ds.Tables[0].Rows[i+1][22];
                        //var Feb_unit_IP = ds.Tables[0].Rows[i+1][23];
                        //var Mar_unit_IP = ds.Tables[0].Rows[i+1][24];
                        //var Apr_unit_IP = ds.Tables[0].Rows[i+1][25];
                        //var May_unit_IP = ds.Tables[0].Rows[i+1][26];
                        //var Jun_unit_IP = ds.Tables[0].Rows[i+1][27];


                        //  var Flag = ds.Tables[0].Rows[i][28].ToString();




                        //if (Flag == "N")
                        //{

                        //    for (int j = 1; j <= 12; j++)
                        //    {
                        //        _nv.Clear();
                        //        _nv.Add("@Empid-int", Empid.ToString());
                        //        _nv.Add("@LoginId-varchar(200)", LoginId.ToString());
                        //        _nv.Add("@EmpName-varchar(200)", EmpName.ToString());
                        //        _nv.Add("@BrandId-int", BrandId.ToString());
                        //        _nv.Add("@Brandname-varchar(200)", Brandname.ToString());
                        //        _nv.Add("@ProductId-int", ProductId.ToString());
                        //        _nv.Add("@ProductName-varchar(200)", ProductName.ToString());
                        //        _nv.Add("@Status-bit", Status.ToString());

                        //        if (iterator > 12)
                        //        {
                        //            iterator = 1;
                        //        }
                        //        if (j == 1)
                        //        {
                        //            _nv.Add("@Year-int", currentYear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            _nv.Add("@IP_unit-float", Jul_unit_IP.ToString());
                        //            _nv.Add("@TP_unit-float", Jul_unit_TP.ToString());
                        //            dsR = dal.GetData("sp_UploadTarget", _nv);


                        //        }
                        //        else if (j == 2)
                        //        {
                        //            _nv.Add("@Year-int", currentYear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            _nv.Add("@IP_unit-float", Aug_unit_IP.ToString());
                        //            _nv.Add("@TP_unit-float", Aug_unit_TP.ToString());
                        //            dsR = dal.GetData("sp_UploadTarget", _nv);

                        //        }
                        //        else if (j == 3)
                        //        {
                        //            _nv.Add("@Year-int", currentYear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            _nv.Add("@IP_unit-float", Sep_unit_IP.ToString());
                        //            _nv.Add("@TP_unit-float", Sep_unit_TP.ToString());
                        //            dsR = dal.GetData("sp_UploadTarget", _nv);

                        //        }
                        //        else if (j == 4)
                        //        {
                        //            _nv.Add("@Year-int", currentYear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            _nv.Add("@IP_unit-float", Oct_unit_IP.ToString());
                        //            _nv.Add("@TP_unit-float", Oct_unit_TP.ToString());
                        //            dsR = dal.GetData("sp_UploadTarget", _nv);

                        //        }
                        //        else if (j == 5)
                        //        {
                        //            _nv.Add("@Year-int", currentYear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            _nv.Add("@IP_unit-float", Nov_unit_IP.ToString());
                        //            _nv.Add("@TP_unit-float", Nov_unit_TP.ToString());
                        //            dsR = dal.GetData("sp_UploadTarget", _nv);

                        //        }
                        //        else if (j == 6)
                        //        {
                        //            _nv.Add("@Year-int", currentYear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            _nv.Add("@IP_unit-float", Dec_unit_IP.ToString());
                        //            _nv.Add("@TP_unit-float", Dec_unit_TP.ToString());
                        //            dsR = dal.GetData("sp_UploadTarget", _nv);


                        //        }
                        //        else if (j == 7)
                        //        {
                        //            _nv.Add("@Year-int", nextyear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            _nv.Add("@IP_unit-float", Jan_unit_IP.ToString());
                        //            _nv.Add("@TP_unit-float", Jan_unit_TP.ToString());
                        //            dsR = dal.GetData("sp_UploadTarget", _nv);

                        //        }
                        //        else if (j == 8)
                        //        {
                        //            _nv.Add("@Year-int", nextyear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            _nv.Add("@IP_unit-float", Feb_unit_IP.ToString());
                        //            _nv.Add("@TP_unit-float", Feb_unit_TP.ToString());
                        //            dsR = dal.GetData("sp_UploadTarget", _nv);

                        //        }
                        //        else if (j == 9)
                        //        {
                        //            _nv.Add("@Year-int", nextyear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            _nv.Add("@IP_unit-float", Mar_unit_IP.ToString());
                        //            _nv.Add("@TP_unit-float", Mar_unit_TP.ToString());
                        //            dsR = dal.GetData("sp_UploadTarget", _nv);

                        //        }
                        //        else if (j == 10)
                        //        {
                        //            _nv.Add("@Year-int", nextyear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            _nv.Add("@IP_unit-float", Apr_unit_IP.ToString());
                        //            _nv.Add("@TP_unit-float", Apr_unit_TP.ToString());
                        //            dsR = dal.GetData("sp_UploadTarget", _nv);

                        //        }
                        //        else if (j == 11)
                        //        {
                        //            _nv.Add("@Year-int", nextyear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            _nv.Add("@IP_unit-float", May_unit_IP.ToString());
                        //            _nv.Add("@TP_unit-float", May_unit_TP.ToString());
                        //            dsR = dal.GetData("sp_UploadTarget", _nv);

                        //        }
                        //        else if (j == 12)
                        //        {
                        //            _nv.Add("@Year-int", nextyear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            _nv.Add("@IP_unit-float", Jun_unit_IP.ToString());
                        //            _nv.Add("@TP_unit-float", Jun_unit_TP.ToString());
                        //            dsR = dal.GetData("sp_UploadTarget", _nv);

                        //        }
                        //        iterator++;

                        //    }
                        //}
                        //else if (Flag == "D")
                        //{
                        //    for (int j = 1; j <= 12; j++)
                        //    {
                        //        _nv.Clear();
                        //        _nv.Add("@Empid-int", Empid.ToString());
                        //        _nv.Add("@LoginId-varchar(200)", LoginId.ToString());
                        //        _nv.Add("@BrandId-int", BrandId.ToString());
                        //        _nv.Add("@ProductId-int", ProductId.ToString());



                        //        if (iterator > 12)
                        //        {
                        //            iterator = 1;
                        //        }
                        //        if (j== 1)
                        //        {
                        //            _nv.Add("@Year-int", currentYear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            dsR = dal.GetData("sp_DeleteTargetRows", _nv);
                        //        }
                        //        else if (j == 2)
                        //        {
                        //            _nv.Add("@Year-int", currentYear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            dsR = dal.GetData("sp_DeleteTargetRows", _nv);
                        //        }
                        //        else if (j == 3)
                        //        {
                        //            _nv.Add("@Year-int", currentYear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            dsR = dal.GetData("sp_DeleteTargetRows", _nv);
                        //        }
                        //        else if (j == 4)
                        //        {
                        //            _nv.Add("@Year-int", currentYear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            dsR = dal.GetData("sp_DeleteTargetRows", _nv);
                        //        }
                        //        else if (j == 5)
                        //        {
                        //            _nv.Add("@Year-int", currentYear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            dsR = dal.GetData("sp_DeleteTargetRows", _nv);
                        //        }
                        //        else if (j == 6)
                        //        {
                        //            _nv.Add("@Year-int", currentYear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            dsR = dal.GetData("sp_DeleteTargetRows", _nv);

                        //        }
                        //        else if (j == 7)
                        //        {
                        //            _nv.Add("@Year-int", nextyear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            dsR = dal.GetData("sp_DeleteTargetRows", _nv);
                        //        }
                        //        else if (j == 8)
                        //        {
                        //            _nv.Add("@Year-int", nextyear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            dsR = dal.GetData("sp_DeleteTargetRows", _nv);
                        //        }
                        //        else if (j == 9)
                        //        {
                        //            _nv.Add("@Year-int", nextyear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            dsR = dal.GetData("sp_DeleteTargetRows", _nv);
                        //        }
                        //        else if (j == 10)
                        //        {
                        //            _nv.Add("@Year-int", nextyear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            dsR = dal.GetData("sp_DeleteTargetRows", _nv);
                        //        }
                        //        else if (j== 11)
                        //        {
                        //            _nv.Add("@Year-int", nextyear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            dsR = dal.GetData("sp_DeleteTargetRows", _nv);
                        //        }
                        //        else if (j == 12)
                        //        {
                        //            _nv.Add("@Year-int", nextyear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            dsR = dal.GetData("sp_DeleteTargetRows", _nv);
                        //        }
                        //        iterator++;
                        //    }

                        //}

                        //else if (Flag == "U")
                        //{
                        //    for (int j = 1; j <= 12; j++)
                        //    {
                        //        _nv.Clear();
                        //        _nv.Add("@Empid-int", Empid.ToString());
                        //        _nv.Add("@LoginId-varchar(200)", LoginId.ToString());
                        //        _nv.Add("@EmpName-varchar(200)", EmpName.ToString());
                        //        _nv.Add("@BrandId-int", BrandId.ToString());
                        //        _nv.Add("@Brandname-varchar(200)", Brandname.ToString());
                        //        _nv.Add("@ProductId-int", ProductId.ToString());
                        //        _nv.Add("@ProductName-varchar(200)", ProductName.ToString());
                        //        _nv.Add("@Status-bit", Status.ToString());

                        //        if (iterator > 12)
                        //        {
                        //            iterator = 1;
                        //        }
                        //        if (j == 1)
                        //        {
                        //            _nv.Add("@Year-int", currentYear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            _nv.Add("@IP_unit-float", Jul_unit_IP.ToString());
                        //            _nv.Add("@TP_unit-float", Jul_unit_TP.ToString());
                        //            dsR = dal.GetData("sp_UpdateTarget", _nv);
                        //        }
                        //        else if (j == 2)
                        //        {
                        //            _nv.Add("@Year-int", currentYear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            _nv.Add("@IP_unit-float", Aug_unit_IP.ToString());
                        //            _nv.Add("@TP_unit-float", Aug_unit_TP.ToString());
                        //            dsR = dal.GetData("sp_UpdateTarget", _nv);
                        //        }
                        //        else if (j == 3)
                        //        {
                        //            _nv.Add("@Year-int", currentYear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            _nv.Add("@IP_unit-float", Sep_unit_IP.ToString());
                        //            _nv.Add("@TP_unit-float", Sep_unit_TP.ToString());
                        //            dsR = dal.GetData("sp_UpdateTarget", _nv);
                        //        }
                        //        else if (j == 4)
                        //        {
                        //            _nv.Add("@Year-int", currentYear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            _nv.Add("@IP_unit-float", Oct_unit_IP.ToString());
                        //            _nv.Add("@TP_unit-float", Oct_unit_TP.ToString());
                        //            dsR = dal.GetData("sp_UpdateTarget", _nv);
                        //        }
                        //        else if (j == 5)
                        //        {
                        //            _nv.Add("@Year-int", currentYear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            _nv.Add("@IP_unit-float", Nov_unit_IP.ToString());
                        //            _nv.Add("@TP_unit-float", Nov_unit_TP.ToString());
                        //            dsR = dal.GetData("sp_UpdateTarget", _nv);
                        //        }
                        //        else if (j== 6)
                        //        {
                        //            _nv.Add("@Year-int", currentYear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            _nv.Add("@IP_unit-float", Dec_unit_IP.ToString());
                        //            _nv.Add("@TP_unit-float", Dec_unit_TP.ToString());
                        //            dsR = dal.GetData("sp_UpdateTarget", _nv);

                        //        }
                        //        else if (j == 7)
                        //        {
                        //            _nv.Add("@Year-int", nextyear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            _nv.Add("@IP_unit-float", Jan_unit_IP.ToString());
                        //            _nv.Add("@TP_unit-float", Jan_unit_TP.ToString());
                        //            dsR = dal.GetData("sp_UpdateTarget", _nv);
                        //        }
                        //        else if (j== 8)
                        //        {
                        //            _nv.Add("@Year-int", nextyear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            _nv.Add("@IP_unit-float", Feb_unit_IP.ToString());
                        //            _nv.Add("@TP_unit-float", Feb_unit_TP.ToString());
                        //            dsR = dal.GetData("sp_UpdateTarget", _nv);
                        //        }
                        //        else if (i == 9)
                        //        {
                        //            _nv.Add("@Year-int", nextyear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            _nv.Add("@IP_unit-float", Mar_unit_IP.ToString());
                        //            _nv.Add("@TP_unit-float", Mar_unit_TP.ToString());
                        //            dsR = dal.GetData("sp_UpdateTarget", _nv);
                        //        }
                        //        else if (j == 10)
                        //        {
                        //            _nv.Add("@Year-int", nextyear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            _nv.Add("@IP_unit-float", Apr_unit_IP.ToString());
                        //            _nv.Add("@TP_unit-float", Apr_unit_TP.ToString());
                        //            dsR = dal.GetData("sp_UpdateTarget", _nv);
                        //        }
                        //        else if (j == 11)
                        //        {
                        //            _nv.Add("@Year-int", nextyear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            _nv.Add("@IP_unit-float", May_unit_IP.ToString());
                        //            _nv.Add("@TP_unit-float", May_unit_TP.ToString());
                        //            dsR = dal.GetData("sp_UpdateTarget", _nv);
                        //        }
                        //        else if (j == 12)
                        //        {
                        //            _nv.Add("@Year-int", nextyear.ToString());
                        //            _nv.Add("@Month-int", iterator.ToString());
                        //            _nv.Add("@IP_unit-float", Jun_unit_IP.ToString());
                        //            _nv.Add("@TP_unit-float", Jun_unit_TP.ToString());
                        //            dsR = dal.GetData("sp_UpdateTarget", _nv);
                        //        }
                        //        iterator++;
                        //    }
                        //}

                        #endregion
                        #region OldUploadMethod
                        //foreach (DataTable dataTable in ds.Tables)
                        //{
                        //    foreach (DataRow dataRow in dataTable.Rows)
                        //    {
                        //        var Empid = dataRow.ItemArray[6];
                        //        var LoginId = dataRow.ItemArray[5];
                        //        var EmpName = dataRow.ItemArray[7];
                        //        var BrandId = dataRow.ItemArray[9];
                        //        var Brandname = dataRow.ItemArray[10];
                        //        var ProductId = dataRow.ItemArray[11];
                        //        var ProductName = dataRow.ItemArray[12];
                        //        var Status = 0;


                        //        object value = dataRow.ItemArray[15];

                        //        if (value is int || value is double || value is float || value is decimal)
                        //        {
                        //            Status = Convert.ToInt32(dataRow.ItemArray[15]);
                        //        }
                        //        else if (value is string)
                        //        {
                        //            if (dataRow.ItemArray[15].ToString() == "True" || dataRow.ItemArray[15].ToString() == "1")
                        //            {

                        //                Status = 1;

                        //            }
                        //            else
                        //            {
                        //                Status = 0;


                        //            }
                        //        }
                        //        else
                        //        {
                        //            // It's neither a number nor a string
                        //        }






                        //        var Flag = dataRow.ItemArray[40].ToString();

                        //        int iterator = 7;
                        //        if (Flag == "N")
                        //        {

                        //            for (int i = 1; i <= 12; i++)
                        //            {
                        //                _nv.Clear();
                        //                _nv.Add("@Empid-int", Empid.ToString());
                        //                _nv.Add("@LoginId-varchar(200)", LoginId.ToString());
                        //                _nv.Add("@EmpName-varchar(200)", EmpName.ToString());
                        //                _nv.Add("@BrandId-int", BrandId.ToString());
                        //                _nv.Add("@Brandname-varchar(200)", Brandname.ToString());
                        //                _nv.Add("@ProductId-int", ProductId.ToString());
                        //                _nv.Add("@ProductName-varchar(200)", ProductName.ToString());
                        //                _nv.Add("@Status-bit", Status.ToString());

                        //                if (iterator > 12)
                        //                {
                        //                    iterator = 1;
                        //                }
                        //                if (i == 1)
                        //                {
                        //                    _nv.Add("@Year-int", currentYear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    _nv.Add("@IP_unit-float", Jul_unit_IP.ToString());
                        //                    _nv.Add("@TP_unit-float", Jul_unit_TP.ToString());
                        //                    dsR = dal.GetData("sp_UploadTarget", _nv);
                        //                }
                        //                else if (i == 2)
                        //                {
                        //                    _nv.Add("@Year-int", currentYear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    _nv.Add("@IP_unit-float", Aug_unit_IP.ToString());
                        //                    _nv.Add("@TP_unit-float", Aug_unit_TP.ToString());
                        //                    dsR = dal.GetData("sp_UploadTarget", _nv);
                        //                }
                        //                else if (i == 3)
                        //                {
                        //                    _nv.Add("@Year-int", currentYear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    _nv.Add("@IP_unit-float", Sep_unit_IP.ToString());
                        //                    _nv.Add("@TP_unit-float", Sep_unit_TP.ToString());
                        //                    dsR = dal.GetData("sp_UploadTarget", _nv);
                        //                }
                        //                else if (i == 4)
                        //                {
                        //                    _nv.Add("@Year-int", currentYear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    _nv.Add("@IP_unit-float", Oct_unit_IP.ToString());
                        //                    _nv.Add("@TP_unit-float", Oct_unit_TP.ToString());
                        //                    dsR = dal.GetData("sp_UploadTarget", _nv);
                        //                }
                        //                else if (i == 5)
                        //                {
                        //                    _nv.Add("@Year-int", currentYear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    _nv.Add("@IP_unit-float", Nov_unit_IP.ToString());
                        //                    _nv.Add("@TP_unit-float", Nov_unit_TP.ToString());
                        //                    dsR = dal.GetData("sp_UploadTarget", _nv);
                        //                }
                        //                else if (i == 6)
                        //                {
                        //                    _nv.Add("@Year-int", currentYear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    _nv.Add("@IP_unit-float", Dec_unit_IP.ToString());
                        //                    _nv.Add("@TP_unit-float", Dec_unit_TP.ToString());
                        //                    dsR = dal.GetData("sp_UploadTarget", _nv);

                        //                }
                        //                else if (i == 7)
                        //                {
                        //                    _nv.Add("@Year-int", nextyear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    _nv.Add("@IP_unit-float", Jan_unit_IP.ToString());
                        //                    _nv.Add("@TP_unit-float", Jan_unit_TP.ToString());
                        //                    dsR = dal.GetData("sp_UploadTarget", _nv);
                        //                }
                        //                else if (i == 8)
                        //                {
                        //                    _nv.Add("@Year-int", nextyear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    _nv.Add("@IP_unit-float", Feb_unit_IP.ToString());
                        //                    _nv.Add("@TP_unit-float", Feb_unit_TP.ToString());
                        //                    dsR = dal.GetData("sp_UploadTarget", _nv);
                        //                }
                        //                else if (i == 9)
                        //                {
                        //                    _nv.Add("@Year-int", nextyear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    _nv.Add("@IP_unit-float", Mar_unit_IP.ToString());
                        //                    _nv.Add("@TP_unit-float", Mar_unit_TP.ToString());
                        //                    dsR = dal.GetData("sp_UploadTarget", _nv);
                        //                }
                        //                else if (i == 10)
                        //                {
                        //                    _nv.Add("@Year-int", nextyear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    _nv.Add("@IP_unit-float", Apr_unit_IP.ToString());
                        //                    _nv.Add("@TP_unit-float", Apr_unit_TP.ToString());
                        //                    dsR = dal.GetData("sp_UploadTarget", _nv);
                        //                }
                        //                else if (i == 11)
                        //                {
                        //                    _nv.Add("@Year-int", nextyear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    _nv.Add("@IP_unit-float", May_unit_IP.ToString());
                        //                    _nv.Add("@TP_unit-float", May_unit_TP.ToString());
                        //                    dsR = dal.GetData("sp_UploadTarget", _nv);
                        //                }
                        //                else if (i == 12)
                        //                {
                        //                    _nv.Add("@Year-int", nextyear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    _nv.Add("@IP_unit-float", Jun_unit_IP.ToString());
                        //                    _nv.Add("@TP_unit-float", Jun_unit_TP.ToString());
                        //                    dsR = dal.GetData("sp_UploadTarget", _nv);
                        //                }
                        //                iterator++;
                        //            }
                        //        }
                        //        else if (Flag == "D")
                        //        {
                        //            for (int i = 1; i <= 12; i++)
                        //            {
                        //                _nv.Clear();
                        //                _nv.Add("@Empid-int", Empid.ToString());
                        //                _nv.Add("@LoginId-varchar(200)", LoginId.ToString());
                        //                _nv.Add("@BrandId-int", BrandId.ToString());
                        //                _nv.Add("@ProductId-int", ProductId.ToString());



                        //                if (iterator > 12)
                        //                {
                        //                    iterator = 1;
                        //                }
                        //                if (i == 1)
                        //                {
                        // _nv.Clear();
                        //                _nv.Add("@Empid-int", Empid.ToString());
                        //                _nv.Add("@LoginId-varchar(200)", LoginId.ToString());
                        //                _nv.Add("@BrandId-int", BrandId.ToString());
                        //                _nv.Add("@ProductId-int", ProductId.ToString());
                        //                    _nv.Add("@Year-int", currentYear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    dsR = dal.GetData("sp_DeleteTargetRows", _nv);
                        //                }
                        //                else if (i == 2)
                        //                {
                        //                    _nv.Add("@Year-int", currentYear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    dsR = dal.GetData("sp_DeleteTargetRows", _nv);
                        //                }
                        //                else if (i == 3)
                        //                {
                        //                    _nv.Add("@Year-int", currentYear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    dsR = dal.GetData("sp_DeleteTargetRows", _nv);
                        //                }
                        //                else if (i == 4)
                        //                {
                        //                    _nv.Add("@Year-int", currentYear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    dsR = dal.GetData("sp_DeleteTargetRows", _nv);
                        //                }
                        //                else if (i == 5)
                        //                {
                        //                    _nv.Add("@Year-int", currentYear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    dsR = dal.GetData("sp_DeleteTargetRows", _nv);
                        //                }
                        //                else if (i == 6)
                        //                {
                        //                    _nv.Add("@Year-int", currentYear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    dsR = dal.GetData("sp_DeleteTargetRows", _nv);

                        //                }
                        //                else if (i == 7)
                        //                {
                        //                    _nv.Add("@Year-int", nextyear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    dsR = dal.GetData("sp_DeleteTargetRows", _nv);
                        //                }
                        //                else if (i == 8)
                        //                {
                        //                    _nv.Add("@Year-int", nextyear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    dsR = dal.GetData("sp_DeleteTargetRows", _nv);
                        //                }
                        //                else if (i == 9)
                        //                {
                        //                    _nv.Add("@Year-int", nextyear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    dsR = dal.GetData("sp_DeleteTargetRows", _nv);
                        //                }
                        //                else if (i == 10)
                        //                {
                        //                    _nv.Add("@Year-int", nextyear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    dsR = dal.GetData("sp_DeleteTargetRows", _nv);
                        //                }
                        //                else if (i == 11)
                        //                {
                        //                    _nv.Add("@Year-int", nextyear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    dsR = dal.GetData("sp_DeleteTargetRows", _nv);
                        //                }
                        //                else if (i == 12)
                        //                {
                        //                    _nv.Add("@Year-int", nextyear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    dsR = dal.GetData("sp_DeleteTargetRows", _nv);
                        //                }
                        //                iterator++;
                        //            }

                        //        }

                        //        else if (Flag == "U")
                        //        {
                        //            for (int i = 1; i <= 12; i++)
                        //            {
                        //                _nv.Clear();
                        //                _nv.Add("@Empid-int", Empid.ToString());
                        //                _nv.Add("@LoginId-varchar(200)", LoginId.ToString());
                        //                _nv.Add("@EmpName-varchar(200)", EmpName.ToString());
                        //                _nv.Add("@BrandId-int", BrandId.ToString());
                        //                _nv.Add("@Brandname-varchar(200)", Brandname.ToString());
                        //                _nv.Add("@ProductId-int", ProductId.ToString());
                        //                _nv.Add("@ProductName-varchar(200)", ProductName.ToString());
                        //                _nv.Add("@Status-bit", Status.ToString());

                        //                if (iterator > 12)
                        //                {
                        //                    iterator = 1;
                        //                }
                        //                if (i == 1)
                        //                {
                        //                    _nv.Add("@Year-int", currentYear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    _nv.Add("@IP_unit-float", Jul_unit_IP.ToString());
                        //                    _nv.Add("@TP_unit-float", Jul_unit_TP.ToString());
                        //                    dsR = dal.GetData("sp_UpdateTarget", _nv);
                        //                }
                        //                else if (i == 2)
                        //                {
                        //                    _nv.Add("@Year-int", currentYear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    _nv.Add("@IP_unit-float", Aug_unit_IP.ToString());
                        //                    _nv.Add("@TP_unit-float", Aug_unit_TP.ToString());
                        //                    dsR = dal.GetData("sp_UpdateTarget", _nv);
                        //                }
                        //                else if (i == 3)
                        //                {
                        //                    _nv.Add("@Year-int", currentYear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    _nv.Add("@IP_unit-float", Sep_unit_IP.ToString());
                        //                    _nv.Add("@TP_unit-float", Sep_unit_TP.ToString());
                        //                    dsR = dal.GetData("sp_UpdateTarget", _nv);
                        //                }
                        //                else if (i == 4)
                        //                {
                        //                    _nv.Add("@Year-int", currentYear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    _nv.Add("@IP_unit-float", Oct_unit_IP.ToString());
                        //                    _nv.Add("@TP_unit-float", Oct_unit_TP.ToString());
                        //                    dsR = dal.GetData("sp_UpdateTarget", _nv);
                        //                }
                        //                else if (i == 5)
                        //                {
                        //                    _nv.Add("@Year-int", currentYear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    _nv.Add("@IP_unit-float", Nov_unit_IP.ToString());
                        //                    _nv.Add("@TP_unit-float", Nov_unit_TP.ToString());
                        //                    dsR = dal.GetData("sp_UpdateTarget", _nv);
                        //                }
                        //                else if (i == 6)
                        //                {
                        //                    _nv.Add("@Year-int", currentYear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    _nv.Add("@IP_unit-float", Dec_unit_IP.ToString());
                        //                    _nv.Add("@TP_unit-float", Dec_unit_TP.ToString());
                        //                    dsR = dal.GetData("sp_UpdateTarget", _nv);

                        //                }
                        //                else if (i == 7)
                        //                {
                        //                    _nv.Add("@Year-int", nextyear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    _nv.Add("@IP_unit-float", Jan_unit_IP.ToString());
                        //                    _nv.Add("@TP_unit-float", Jan_unit_TP.ToString());
                        //                    dsR = dal.GetData("sp_UpdateTarget", _nv);
                        //                }
                        //                else if (i == 8)
                        //                {
                        //                    _nv.Add("@Year-int", nextyear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    _nv.Add("@IP_unit-float", Feb_unit_IP.ToString());
                        //                    _nv.Add("@TP_unit-float", Feb_unit_TP.ToString());
                        //                    dsR = dal.GetData("sp_UpdateTarget", _nv);
                        //                }
                        //                else if (i == 9)
                        //                {
                        //                    _nv.Add("@Year-int", nextyear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    _nv.Add("@IP_unit-float", Mar_unit_IP.ToString());
                        //                    _nv.Add("@TP_unit-float", Mar_unit_TP.ToString());
                        //                    dsR = dal.GetData("sp_UpdateTarget", _nv);
                        //                }
                        //                else if (i == 10)
                        //                {
                        //                    _nv.Add("@Year-int", nextyear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    _nv.Add("@IP_unit-float", Apr_unit_IP.ToString());
                        //                    _nv.Add("@TP_unit-float", Apr_unit_TP.ToString());
                        //                    dsR = dal.GetData("sp_UpdateTarget", _nv);
                        //                }
                        //                else if (i == 11)
                        //                {
                        //                    _nv.Add("@Year-int", nextyear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    _nv.Add("@IP_unit-float", May_unit_IP.ToString());
                        //                    _nv.Add("@TP_unit-float", May_unit_TP.ToString());
                        //                    dsR = dal.GetData("sp_UpdateTarget", _nv);
                        //                }
                        //                else if (i == 12)
                        //                {
                        //                    _nv.Add("@Year-int", nextyear.ToString());
                        //                    _nv.Add("@Month-int", iterator.ToString());
                        //                    _nv.Add("@IP_unit-float", Jun_unit_IP.ToString());
                        //                    _nv.Add("@TP_unit-float", Jun_unit_TP.ToString());
                        //                    dsR = dal.GetData("sp_UpdateTarget", _nv);
                        //                }
                        //                iterator++;
                        //            }
                        //        }


                        //    }
                        //}

                        #endregion

                        //insert into db

                        if (dt.Rows.Count > 0)
                        {
                            for (int i = 0; i < dt.Rows.Count; i++)
                            {
                                var Flag = dt.Rows[i][13].ToString();


                                if (Flag == "N")
                                {
                                    _nv.Clear();
                                    _nv.Add("@Empid-int", dt.Rows[i]["Empid"].ToString());
                                    _nv.Add("@LoginId-varchar(200)", dt.Rows[i]["Loginid"].ToString());
                                    _nv.Add("@EmpName-varchar(200)", dt.Rows[i]["Empolyeename"].ToString());
                                    _nv.Add("@BrandId-int", dt.Rows[i]["BrandId"].ToString());
                                    _nv.Add("@Brandname-varchar(200)", dt.Rows[i]["Brand"].ToString());
                                    _nv.Add("@ProductId-int", dt.Rows[i]["ProductId"].ToString());
                                    _nv.Add("@ProductName-varchar(200)", dt.Rows[i]["ProductName"].ToString());
                                    _nv.Add("@Status-bit", dt.Rows[i]["Status"].ToString());
                                    _nv.Add("@Year-int", dt.Rows[i]["Year"].ToString());
                                    _nv.Add("@Month-int", dt.Rows[i]["Month"].ToString());
                                    _nv.Add("@IP_unit-float", dt.Rows[i]["Ip_Unit"].ToString());
                                    _nv.Add("@TP_unit-float", dt.Rows[i]["Tp_Unit"].ToString());
                                    dsR = dal.GetData("sp_UploadTarget", _nv);
                                }
                                else if (Flag == "D")
                                {

                                    _nv.Clear();
                                    _nv.Add("@Empid-int", dt.Rows[i]["Empid"].ToString());
                                    _nv.Add("@LoginId-varchar(200)", dt.Rows[i]["Loginid"].ToString());
                                    _nv.Add("@BrandId-int", dt.Rows[i]["BrandId"].ToString());
                                    _nv.Add("@ProductId-int", dt.Rows[i]["ProductId"].ToString());
                                    _nv.Add("@Year-int", dt.Rows[i]["Year"].ToString());
                                    _nv.Add("@Month-int", dt.Rows[i]["Month"].ToString());
                                    dsR = dal.GetData("sp_DeleteTargetRows", _nv);

                                }
                                else if (Flag == "U")
                                {

                                    _nv.Clear();
                                    _nv.Add("@Empid-int", dt.Rows[i]["Empid"].ToString());
                                    _nv.Add("@LoginId-varchar(200)", dt.Rows[i]["Loginid"].ToString());
                                    _nv.Add("@EmpName-varchar(200)", dt.Rows[i]["Empolyeename"].ToString());
                                    _nv.Add("@BrandId-int", dt.Rows[i]["BrandId"].ToString());
                                    _nv.Add("@Brandname-varchar(200)", dt.Rows[i]["Brand"].ToString());
                                    _nv.Add("@ProductId-int", dt.Rows[i]["ProductId"].ToString());
                                    _nv.Add("@ProductName-varchar(200)", dt.Rows[i]["ProductName"].ToString());
                                    _nv.Add("@Status-bit", dt.Rows[i]["Status"].ToString());
                                    _nv.Add("@Year-int", dt.Rows[i]["Year"].ToString());
                                    _nv.Add("@Month-int", dt.Rows[i]["Month"].ToString());
                                    _nv.Add("@IP_unit-float", dt.Rows[i]["Ip_Unit"].ToString());
                                    _nv.Add("@TP_unit-float", dt.Rows[i]["Tp_Unit"].ToString());
                                    dsR = dal.GetData("sp_UpdateTarget", _nv);


                                }

                            }

                        }
                    }
                }
                int finalvalue = rowcount;
                return (dsR.Tables[0].Rows[0][0].ToString()).ToString();
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("SalesTargetData : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                return "Error Occured";
            }
        }

        private string StockReadExcelFile(string FileName, string FileNamePath)
        {
            int currentYear = DateTime.Now.Year;
            int nextyear = currentYear + 1;
            DataSet dsR = new DataSet();
            try
            {
                #region Reading Excel To DataTable

                OleDbConnection con = new OleDbConnection();
                NameValueCollection _nv = new NameValueCollection();
                DAL dal = new DAL();
                string FilePath = @"C:\PocketDCR2\Excel\SalesDashboardTargetData\" + FileNamePath;
                string part1 = "Provider=Microsoft.ACE.OLEDB.12.0;";
                string part2 = @"Data Source=" + FilePath + ";";
                string part3 = "Extended Properties='Excel 12.0;HDR=YES;'";
                string connectionString = part1 + part2 + part3;
                con.ConnectionString = connectionString;
                FileInfo FIforexcel = new FileInfo(FilePath);
                ExcelPackage Ep = new ExcelPackage(FIforexcel);
                OleDbCommand cmnd = new OleDbCommand("Select * from [" + Ep.Workbook.Worksheets.FirstOrDefault().Name + "$A0:AC]", con);
                OleDbDataAdapter adapter = new OleDbDataAdapter(cmnd);
                con.Open();
                DataSet ds = new DataSet();
                adapter.Fill(ds);
                con.Close();
                #endregion



                DateTime createdate = DateTime.Now;

                DataTable dt = new DataTable();

                dt.Columns.Add(new DataColumn("DistID", typeof(int)));
                dt.Columns.Add(new DataColumn("Productid", typeof(int)));
                dt.Columns.Add(new DataColumn("Product", typeof(string)));
                dt.Columns.Add(new DataColumn("BatchNo", typeof(string)));
                dt.Columns.Add(new DataColumn("Date", typeof(DateTime)));
                dt.Columns.Add(new DataColumn("OpeningStock", typeof(int)));
                dt.Columns.Add(new DataColumn("RecievedStock", typeof(int)));
                dt.Columns.Add(new DataColumn("Sales", typeof(int)));
                dt.Columns.Add(new DataColumn("BonusSales", typeof(int)));
                dt.Columns.Add(new DataColumn("Returns", typeof(int)));
                dt.Columns.Add(new DataColumn("ReturnsBonus", typeof(int)));
                dt.Columns.Add(new DataColumn("ClosingStock", typeof(int)));



                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {

                    DataRow dr = dt.NewRow();
                    dr.BeginEdit();
                    dr["DistID"]       = Convert.ToInt32(ds.Tables[0].Rows[i][0].ToString()) ;
                    dr["Productid"]    = ds.Tables[0].Rows[i][1].ToString() ;
                    dr["Product"]      = ds.Tables[0].Rows[i][2].ToString() ;
                    dr["BatchNo"]      = ds.Tables[0].Rows[i][3].ToString() ;
                    dr["Date"]        =  ds.Tables[0].Rows[i][4].ToString() ;
                    dr["OpeningStock"] = ds.Tables[0].Rows[i][5].ToString() ;
                    dr["RecievedStock"]= ds.Tables[0].Rows[i][6].ToString() ;
                    dr["Sales"]        = ds.Tables[0].Rows[i][7].ToString() ;
                    dr["BonusSales"]   = ds.Tables[0].Rows[i][8].ToString() ;
                    dr["Returns"]      = ds.Tables[0].Rows[i][9].ToString() ;
                    dr["ReturnsBonus"] = ds.Tables[0].Rows[i][10].ToString() ;
                    dr["ClosingStock"] = ds.Tables[0].Rows[i][11].ToString() ;

                    dr.EndEdit();
                    }

                if(dt.Rows.Count > 0)
                {



                }



                return (dsR.Tables[0].Rows[0][0].ToString()).ToString();
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("SalesTargetData : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                return "Error Occured";
            }
        }

        public void SalesDashboardTargetReadexcel(HttpContext context)
        {
            string result = string.Empty;
            try
            {
                string savepath = "";
                string tempPath = "";
                tempPath = @"C:\PocketDCR2\Excel\SalesDashboardTargetData";
                savepath = tempPath;
                string FileName = context.Request.QueryString["FileName"];
                string FileNamePath = context.Request.QueryString["PFileName"];
                result = SalesDashboardTargetReadExcelFile(FileName, FileNamePath);
                //if (result.Split(',')[0].ToString() == "Success")
                //{
                //context.Response.Write(result);
                //}
                //else
                //    result = "Your File Not Processed Successfully";
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("SalesDashboardTargetReadexcel() : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                result = ex.Message;
            }

            context.Response.Write(result);
        }


        public void StockDataReadexcel(HttpContext context)
        {
            string result = string.Empty;
            try
            {
                string savepath = "";
                string tempPath = "";
                tempPath = @"C:\PocketDCR2\Excel\SalesDashboardTargetData";
                savepath = tempPath;
                string FileName = context.Request.QueryString["FileName"];
                string FileNamePath = context.Request.QueryString["PFileName"];
                result = StockReadExcelFile(FileName, FileNamePath);
                //if (result.Split(',')[0].ToString() == "Success")
                //{
                //context.Response.Write(result);
                //}
                //else
                //    result = "Your File Not Processed Successfully";
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("SalesDashboardTargetReadexcel() : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                result = ex.Message;
            }

            context.Response.Write(result);
        }


        private void ProcessSalesDashboardTargetData(HttpContext context)
        {
            #region Commented
            string result = string.Empty;
            try
            {
                //Process Start Sp_ProcessSTBWDtemp
                _nv.Clear();
                _nv.Add("@FileID-varchar(200)", context.Request.QueryString["FileID"]);
                DataSet tempToSTBWD = DL.GetData("Sp_ProcessSalesDashboardTarget", _nv);
                if (tempToSTBWD != null && tempToSTBWD.Tables.Count > 0)
                {
                    if (tempToSTBWD.Tables[0].Rows.Count > 0)
                        result = "DSuccess";
                    else
                        result = "Error";
                }
                else
                    result = "Error";
                HttpContext.Current.Session["guid"] = "";
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("ProcessSalesDashboardTargetData : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                result = "Error Occured";
                HttpContext.Current.Session["guid"] = "";
            }
            #endregion

            context.Response.Write(result);
        }


        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
        public class RequestObjectClass
        {
            public string Date { get; set; }
            public string level5 { get; set; }
            public string EmployeeId { get; set; }
            public string type { get; set; }
        }

        public class Sku
        {

            public int ID { get; set; }

            public int Name { get; set; }
        }
    }
}
