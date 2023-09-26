using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;
using OfficeOpenXml;
using PocketDCR2.Classes;

namespace PocketDCR2.BWSD.Report.ReportsHandler
{
    public class MDReportExcel : IHttpHandler
    {

        NameValueCollection _nv = new NameValueCollection();
        public DataSet GetData(String spName, NameValueCollection nv)
        {
            #region Initialization

            var connection = new SqlConnection();
            string dbTyper = "";

            #endregion

            try
            {
                #region Open Connection

                connection.ConnectionString = Constants.GetConnectionString();
                var dataSet = new DataSet();
                connection.Open();




                #endregion

                #region Get Store Procedure and Start Processing

                var command = new SqlCommand();
                command.CommandType = CommandType.StoredProcedure;
                command.Connection = connection;
                command.CommandText = spName;
                command.CommandTimeout = 20000;


                if (nv != null)
                {
                    #region Retreiving Data

                    for (int i = 0; i < nv.Count; i++)
                    {
                        string[] arraysplit = nv.Keys[i].Split('-');

                        if (arraysplit.Length > 2)
                        {
                            #region Code For Data Type Length

                            dbTyper = "SqlDbType." + arraysplit[1].ToString() + "," + arraysplit[2].ToString();

                            // command.Parameters.AddWithValue(arraysplit[0].ToString(), dbTyper).Value = nv[i].ToString();



                            if (nv[i].ToString() == "NULL")
                            {
                                command.Parameters.AddWithValue(arraysplit[0].ToString(), dbTyper).Value = DBNull.Value;

                            }
                            else
                            {
                                command.Parameters.AddWithValue(arraysplit[0].ToString(), dbTyper).Value = nv[i].ToString();

                            }


                            #endregion
                        }
                        else
                        {
                            #region Code For Int Values
                            dbTyper = "SqlDbType." + arraysplit[1].ToString();
                            // command.Parameters.AddWithValue(arraysplit[0].ToString(), dbTyper).Value = nv[i].ToString();

                            if (nv[i].ToString() == "NULL")
                            {
                                command.Parameters.AddWithValue(arraysplit[0].ToString(), dbTyper).Value = DBNull.Value;

                            }
                            else
                            {
                                command.Parameters.AddWithValue(arraysplit[0].ToString(), dbTyper).Value = nv[i].ToString();

                            }


                            #endregion
                        }
                    }

                    #endregion
                }

                #endregion

                #region Return DataSet

                var dataAdapter = new SqlDataAdapter();
                dataAdapter.SelectCommand = command;
                dataAdapter.Fill(dataSet);

                return dataSet;

                #endregion
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
                return null;
            }
            finally
            {
                #region Close Connection

                if (connection.State == ConnectionState.Open)
                {
                    connection.Close();
                }

                #endregion
            }
        }

        public void ProcessRequest(HttpContext context)
        {
            DateTime? startdt = null;
            string Date = context.Request.QueryString["date"];
            string type = context.Request.QueryString["Type"];


            string date = context.Request.QueryString["date"];
            string Level1 = context.Request.QueryString["Level1"];
            string Level2 = context.Request.QueryString["Level2"];
            string Level3 = context.Request.QueryString["Level3"];
            string Level4 = context.Request.QueryString["Level4"];
            string Level5 = context.Request.QueryString["Level5"];
            string Level6 = context.Request.QueryString["Level6"];
            if (date != "")
            {
                string year = date;
                int i = DateTime.ParseExact("July", "MMMM", CultureInfo.CurrentCulture).Month;
                string completedate = i + "/" + "1" + "/" + year + " " + DateTime.Now.TimeOfDay;
                startdt = Convert.ToDateTime(completedate);
            }
            else
            {
                startdt = DateTime.Now;
            }


            if (true || type == "D")
            {
                _nv.Clear();

                _nv.Add("date-var", startdt.ToString());
                _nv.Add("Level1-var",Level1);
                _nv.Add("Level2-var",Level2);
                _nv.Add("Level3-var",Level3);
                _nv.Add("Level4-var",Level4);
                _nv.Add("Level5-var",Level5);
                _nv.Add("Level6-var",Level6);

                DataSet report = GetData("sp_MDReport", _nv);
                MemoryStream ms;
                if(report == null)
                {
                    DataTable dummyTable = new DataTable();
                    dummyTable.Columns.Add("Division", typeof(string));
                    dummyTable.Columns.Add("Region", typeof(string));
                    dummyTable.Columns.Add("Zone", typeof(string));
                    dummyTable.Columns.Add("Territory", typeof(string));
                    dummyTable.Columns.Add("EmployeeName", typeof(string));
                    dummyTable.Columns.Add("Employee", typeof(string));

                    DataRow dummyRow = dummyTable.NewRow();
                    dummyRow["Division"] = "No Data Found!";
                    dummyRow["Region"] = "";
                    dummyRow["Zone"] = "";
                    dummyRow["Territory"] = "";
                    dummyRow["EmployeeName"] = "";
                    dummyRow["Employee"] = "";

                    dummyTable.Rows.Add(dummyRow);

                    ms = DataTableToMDReportExcel(dummyTable);
                }
                else
                {
                    ms = DataTableToMDReportExcel(report.Tables[0]);
                }
                
                ms.WriteTo(context.Response.OutputStream);
                context.Response.ContentType = "application/vnd.ms-excel";
                context.Response.AddHeader("Content-Disposition", "attachment;filename=MDReport.xlsx");
                context.Response.StatusCode = 200;
                context.Response.End();
            }
        }

        public static MemoryStream DataTableToMDReportExcel(DataTable table)
        {

            table.Columns.RemoveAt(5);
            table.AcceptChanges();

            //table.Merge(table.Copy());
            //table.Merge(table.Copy());
            //table.Merge(table.Copy());
            //table.Merge(table.Copy());
            //for (int i = 0; i < 30; i++)
            //{
            //    table.Rows.Add(table.Rows[0].ItemArray);
            //}
            
            MemoryStream Result = new MemoryStream();
            ExcelPackage pack = new ExcelPackage();
            ExcelWorksheet ws = pack.Workbook.Worksheets.Add("MD Report");

            ws.View.FreezePanes(5, 6);

            
            ws.Cells[3, 1].Value = "Division";
            ws.Cells[3, 2].Value = "Region";
            ws.Cells[3, 3].Value = "Zone";
            ws.Cells[3, 4].Value = "Territory";
            ws.Cells[3, 5].Value = "Employee Name";

            ws.Row(4).Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            ws.Row(4).Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
            ws.Row(4).Style.Font.Size = 8;
            ws.Row(4).Style.WrapText = true;
            ws.Row(4).Height = 35;

            //ws.Row(3).Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thick, System.Drawing.Color.MidnightBlue);
            //ws.Row(3).Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
            //ws.Row(3).Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.AliceBlue);

            ws.Row(3).Style.Font.Bold = true;
            ws.Row(3).Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            
            ws.Column(1).Width = 15;
            ws.Column(2).Width = 15;
            ws.Column(3).Width = 15;
            ws.Column(4).Width = 15;
            ws.Column(5).Width = 15;

            string[] columnNames = table.Columns.Cast<DataColumn>()
                                 .Select(x => x.ColumnName)
                                 .ToArray();

            int colIndex = 6;
            for (int i = 5; i < columnNames.Length; i++)
            {
                ws.Cells[3, colIndex].Value = columnNames[i];
                ws.Cells[3, colIndex, 3, colIndex + 4].Merge = true;

                ws.Cells[4, colIndex].Value = "YTDAverageTarget";
                ws.Cells[4, colIndex + 1].Value = "SalesAchieved";
                ws.Cells[4, colIndex + 2].Value = "YTD % Achieved";
                ws.Cells[4, colIndex + 3].Value = "TargetSale";
                ws.Cells[4, colIndex + 4].Value = "Target & Achived Of The Year";


                colIndex += 5;
            }

            int col = 1;
            int row = 5;

            Func<string, int> convertToNumber = delegate(string source)
            {
                int convertedNumber;
                int.TryParse(source, out convertedNumber);
                return convertedNumber;
            };

            colIndex += 2;

            ws.Cells[3, colIndex ].Value = "Total Summation";
            ws.Cells[3, colIndex , 3, colIndex + 4].Merge = true;

            ws.Cells[4, colIndex].Value = "YTDAverageTarget";
            ws.Cells[4, colIndex + 1].Value = "SalesAchieved";
            ws.Cells[4, colIndex + 2].Value = "YTD % Achieved";
            ws.Cells[4, colIndex + 3].Value = "TargetSale";
            ws.Cells[4, colIndex + 4].Value = "Target & Achived Of The Year";


            //ws.Cells[4, ((table.Columns.Count - 5) * 5) + 3].Value = "";


            foreach (DataRow rw in table.Rows)
            {

                int YTDPercentAchievedTotal=0;	
                int TargetSaleTotal=0;	
                int TargetPercentAchivedForYearTotal=0;	
                int YTDAverageTargetTotal=0;	
                int SalesAchievedTotal=0;                                                

                foreach (DataColumn cl in table.Columns)
                {
                    if (col > 5)
                    {

                        if (rw[cl.ColumnName] != DBNull.Value)
                        {
                            var splitted = rw[cl.ColumnName].ToString().Split(new string[] { "||" }, StringSplitOptions.None);

                            ws.Cells[row, col].Value = splitted[0];
                            ws.Cells[row, col + 1].Value = splitted[1];
                            ws.Cells[row, col + 2].Value = splitted[2];
                            ws.Cells[row, col + 3].Value = splitted[3];
                            ws.Cells[row, col + 4].Value = splitted[4];
                            
                            YTDPercentAchievedTotal += convertToNumber(splitted[0]);
                            TargetSaleTotal += convertToNumber(splitted[1]);
                            TargetPercentAchivedForYearTotal+= convertToNumber(splitted[2]);
                            YTDAverageTargetTotal+= convertToNumber(splitted[3]);
                            SalesAchievedTotal+= convertToNumber(splitted[4]);
                            
                        }
                        else
                        {
                            ws.Cells[row, col].Value =     "0";
                            ws.Cells[row, col + 1].Value = "0";
                            ws.Cells[row, col + 2].Value = "0";
                            ws.Cells[row, col + 3].Value = "0";
                            ws.Cells[row, col + 4].Value = "0";
                        }
                        
                            col += 5;
                            continue;
                    }

                    if (rw[cl.ColumnName] != DBNull.Value)
                    {                        
                        ws.Cells[row, col].Value = rw[cl.ColumnName].ToString();
                        col++;
                    }

                }


                ws.Cells[row, colIndex].Value = YTDPercentAchievedTotal;
                ws.Cells[row, colIndex + 1].Value = TargetSaleTotal;
                ws.Cells[row, colIndex + 2].Value = TargetPercentAchivedForYearTotal;
                ws.Cells[row, colIndex + 3].Value = YTDAverageTargetTotal;
                ws.Cells[row, colIndex + 4].Value = SalesAchievedTotal;
                
                //ws.Cells[4, ((table.Columns.Count - 5) * 5) + 3].Value = "";



                YTDPercentAchievedTotal = 0;
                TargetSaleTotal = 0;
                TargetPercentAchivedForYearTotal = 0;
                YTDAverageTargetTotal = 0;
                SalesAchievedTotal = 0;                
                
                row++;
                col = 1;
            }

            pack.SaveAs(Result);
            return Result;
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