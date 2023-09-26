using System;
using System.Linq;
using System.Web;
using System.IO;
using System.Data;
using OfficeOpenXml;
using System.Data.SqlClient;
using System.Collections.Specialized;
using System.Data.OleDb;
using PocketDCR2.Classes;
using System.Globalization;
using System.Configuration;

namespace PocketDCR2.Handler
{
    /// <summary>
    /// Summary description for DownloadEmployee
    /// </summary>
    public class DoctorAssign : IHttpHandler
    {
        NameValueCollection _nv = new NameValueCollection();
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

                    for (int i = 0; i < NV.Count; i++)
                    {
                        string[] arraySplit = NV.Keys[i].Split('-');

                        if (arraySplit.Length > 2)
                        {
                            dbTyper = "SqlDbType." + arraySplit[1].ToString() + "," + arraySplit[2].ToString();

                            if (NV[i].ToString() == "NULL" || NV[i].ToString() == "")
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

        public void ProcessRequest(HttpContext context)
        {
            //    context.Response.ContentType = "text/plain";
            //    context.Response.Write("Hello World");
            string FileName = "BrickAllocation" + DateTime.Now.ToFileTime().ToString();
            DownloadSheet(context, FileName);
        }
        public static MemoryStream DataTableToExcelXlsx(DataSet tableSet)
        {
            DataTable table = tableSet.Tables[0];
            MemoryStream Result = new MemoryStream();
            ExcelPackage pack = new ExcelPackage();
            ExcelWorksheet ws = pack.Workbook.Worksheets.Add("Brick Allocation");
            ws.Column(1).Hidden = true;
            ws.Cells[1, 2].Value = "";
            ws.Row(1).Style.Font.Bold = true;
            ws.Row(2).Style.Font.Bold = true;
            ws.Cells["B1:I1"].Merge = true;
            ws.Cells["B1:I1"].Style.WrapText = true;
            ws.Cells[2, 1].Value = "EmployeeId";
            ws.Column(1).Width = 10;
            ws.Cells[2, 2].Value = "GM";
            ws.Column(2).Width = 10;
            ws.Cells[2, 3].Value = "BUH";
            ws.Column(3).Width = 12;
            ws.Cells[2, 4].Value = "Region";
            ws.Column(4).Width = 25;
            ws.Cells[2, 5].Value = "Division";
            ws.Column(5).Width = 20;
            ws.Cells[2, 6].Value = "Zone";
            ws.Column(6).Width = 20;
            ws.Cells[2, 7].Value = "Territory";
            ws.Column(7).Width = 20;
            ws.Cells[2, 8].Value = "ManagerName";
            ws.Column(8).Width = 15;
            ws.Cells[2, 9].Value = "EmployeeName";
            ws.Column(9).Width = 15;
            ws.Cells[2, 10].Value = "Team";
            ws.Column(10).Width = 15;
            ws.Cells[2, 11].Value = "DistributorName";
            ws.Column(11).Width = 30;
            ws.Cells[2, 12].Value = "BrickName";
            ws.Column(12).Width = 30;
            ws.Cells[2, 13].Value = "SalesPercentage";
            ws.Column(13).Width = 10;
            ws.Cells[2, 14].Value = "Status";
            ws.Column(14).Width = 10;



            int col = 1;
            int row = 3;
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

            pack.SaveAs(Result);
            return Result;
        }
        private void DownloadSheet(HttpContext context, string FileName)
        {
            String sheetCode = String.Empty;
            MemoryStream ms = new MemoryStream();
            _nv.Clear();
            DataSet dsContactPoints = GetData("sp_GetAllBrickData_For_Excel", _nv);
            sheetCode = "Doctors";
            ms = DoctorAssign.DataTableToExcelXlsx(dsContactPoints);
            ms.WriteTo(context.Response.OutputStream);
            context.Response.ContentType = "application/vnd.ms-excel";
            context.Response.AddHeader("Content-Disposition", "attachment;filename=" + FileName.Replace(" ", string.Empty).Trim() + ".xlsx");
            context.Response.StatusCode = 200;
            HttpContext.Current.ApplicationInstance.CompleteRequest();
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}