using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;

namespace PocketDCR2.Classes
{
    public class ExcelHelper
    {
        public static String DataTableToExcelForEmailResult(DataSet tableSet)
        {


            DataTable table = tableSet.Tables[1];

            MemoryStream Result = new MemoryStream();
            ExcelPackage pack = new ExcelPackage();
            ExcelWorksheet ws = pack.Workbook.Worksheets.Add("Monthly Doctors List");
            ws.View.FreezePanes(3, 1);



            //ws.Cells["D1"].Value = "Sheer For MonthYear: ";
            //ws.Cells["D1"].Style.Font.Bold = true;

            //ws.Cells["E1"].Value = MonthDate.ToString();

            ws.Cells["F1"].Value = "Email Address: ";
            ws.Cells["F1"].Style.Font.Bold = true;

            try
            {
                ws.Cells["G1"].Value = tableSet.Tables[0].Rows[0][1].ToString();
            }
            catch (Exception)
            {
                ws.Cells["G1"].Value = "Enter Email Here";
            }


            ws.Row(2).Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

            ws.Cells["A2"].Value = "Employee Data";
            ws.Cells["A2:B2"].Merge = true;

            ws.Column(3).Hidden = true;

            ws.Cells["C2"].Value = "Doctor System Related Data";
            ws.Cells["C2:E2"].Merge = true;

            ws.Cells["F2"].Value = "Doctor Location";
            ws.Cells["F2:L2"].Merge = true;

            ws.Cells["M2"].Value = "Doctor Merit";
            ws.Cells["M2:R2"].Merge = true;




            ws.Row(2).Height = 40;
            ws.Row(3).Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

            ws.Column(2 + 8).Width = 10;
            ws.Column(2 + 8).Width = 20;
            ws.Column(5 + 8).Width = 15;
            ws.Column(6 + 8).Width = 15;
            ws.Column(7 + 8).Width = 10;
            ws.Column(8 + 8).Width = 10;
            ws.Column(9 + 8).Width = 10;

            ws.Row(2).Style.Font.Bold = true;
            ws.Row(3).Style.Font.Bold = true;



            //ws.Cells["M1"].Style.WrapText = true;
            //ws.Cells["M1"].Style.Font.Bold = false;
            //ws.Cells["M1"].Style.Font.Size = 8;


            ws.Column(21).Hidden = false;

            #region // ************************ Start Sheet Headers ************************ //

            // Employee 
            ws.Cells["A3"].Value = "Employee Name";
            ws.Cells["B3"].Value = "LoginID";
            ws.Column(2).Hidden = true;
            ws.Column(2).Width = 20;
            ws.Column(1).Hidden = true;


            // System Related
            ws.Cells["C3"].Value = "DoctorID";
            ws.Cells["D3"].Value = "Doc Code";
            ws.Cells["E3"].Value = "Doctor Name";
            ws.Column(5).Width = 30; // DocName
            ws.Column(3).Hidden = true;


            // Doctor Location
            ws.Cells["F3"].Value = "City";
            ws.Column(6).Width = 15; // City
            ws.Cells["G3"].Value = "Address";
            ws.Column(7).Width = 30; // Address
            //ws.Column(7).Style.WrapText = true;
            ws.Cells["H3"].Value = "Brick";

            ws.Cells["I3"].Value = "Instiute";
            ws.Column(9).Hidden = true;

            ws.Cells["J3"].Value = "Mobile Number";
            ws.Cells["K3"].Value = "Latitude";
            ws.Cells["L3"].Value = "Longitude";





            // Doctor Merit
            ws.Cells["M3"].Value = "Speciality";
            ws.Cells["N3"].Value = "Class";
            ws.Cells["O3"].Value = "Frequency";
            ws.Cells["P3"].Value = "Qualification";
            ws.Cells["Q3"].Value = "Designation";
            ws.Cells["R3"].Value = "KOL";
            ws.Cells["S3"].Value = "Status";



            ws.Column(12).Width = 10;
            ws.Column(13).Width = 10;
            ws.Column(14).Width = 10;
            ws.Column(15).Width = 10;
            ws.Column(16).Width = 15;
            ws.Column(17).Width = 15;
            ws.Column(18).Width = 10;
            ws.Column(19).Width = 10;




            // Doctor Monthly Upload Stuff
            ws.Cells["T3"].Value = "Flag";
            ws.Cells["U3"].Value = "Remarks";






            #endregion // ********************** End Sheet Headers ********************** //


            #region // *************** Packing Datable Rows To Excel Workbook *************** //


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

            #endregion // *************** Packing Datable Rows To Excel Workbook *************** //

            //ws.Protection.SetPassword("!@#ExcelPassword");

            pack.SaveAs(Result);

            string savepath = @"C:\PocketDCR\Excel\ServerResponse\MonthlyDoctors\";

            //string filename = postedFile.FileName;
            if (!Directory.Exists(savepath))
                Directory.CreateDirectory(savepath);


            String fileName = @"C:\PocketDCR\Excel\ServerResponse\MonthlyDoctors\ServerGeneratedMonthlyDoctorsExcel-" + DateTime.Now.ToFileTime().ToString() + ".xlsx";
            FileStream file = new FileStream(fileName, FileMode.Create, FileAccess.Write);
            Result.WriteTo(file);

            file.Flush();
            file.Close();

            Result.Flush();
            Result.Close();



            return file.Name;
        }


        public static String DataTableToExcelRTBDForEmailResult(DataTable table)
        {
            MemoryStream Result = new MemoryStream();
            ExcelPackage pack = new ExcelPackage();

            ExcelWorksheet ws = pack.Workbook.Worksheets.Add("SheetAt");
            ws.Column(1).Hidden = true;
            ws.Column(2).Hidden = true;
            ws.Column(3).Hidden = true;


            DateTime dt = DateTime.Now;


            ws.Cells["A1:T1"].Style.Font.Color.SetColor(Color.FromArgb(255, 255, 255));
            ws.Cells["A1:T1"].Style.Font.Bold = true;
            ws.Cells["A1:T1"].Style.Fill.PatternType = ExcelFillStyle.Solid;
            ws.Cells["A1:T1"].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(58, 58, 58));
            ws.Cells["A1:T1"].Style.Font.Name = "Arial";

            ws.Cells[1, 4].Value = "Region";
            ws.Cells[1, 5].Value = "SubRegion";
            ws.Cells[1, 6].Value = "District";
            ws.Cells[1, 7].Value = "CityCode";
            ws.Cells[1, 8].Value = "City";
            ws.Cells[1, 9].Value = "DSTBID";
            ws.Cells[1, 10].Value = "Distributor";
            ws.Cells[1, 11].Value = "DSTBCode";//DateTime.Now.ToString("y");
            ws.Cells[1, 12].Value = "TeamName";
            ws.Cells[1, 13].Value = "BrickCode";
            ws.Cells[1, 14].Value = "BrickName";
            ws.Cells[1, 15].Value = "TM_SAS_ID";
            ws.Cells[1, 16].Value = "Share";
            ws.Cells[1, 17].Value = "CRM_TM_IDS";
            ws.Cells[1, 18].Value = "Remarks";
            ws.Cells[1, 19].Value = "CreateDateSystem";
            ws.Cells[1, 20].Value = "Flag";

            //ws.Cells["H2:K2"].Merge = true;
            //ws.Cells[2, 7].Value = (new DateTime(dt.AddMonths(1).Year, dt.AddMonths(1).Month, 1)).ToString("y");
            //ws.Cells[2, 8].Value = (new DateTime(dt.AddMonths(2).Year, dt.AddMonths(2).Month, 1)).ToString("y");

            ws.Column(4).Style.Numberformat.Format = "@";
            ws.Column(5).Style.Numberformat.Format = "@";
            ws.Column(6).Style.Numberformat.Format = "@";


            //ws.Cells[2, 7].Value = "Flag";
            //ws.Row(2).Style.Font.Bold = true;
            int col = 1;
            int row = 2;

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
            pack.SaveAs(Result);

            String fileName = @"C:\PocketDCR2\Excel\SendingFile\" + DateTime.Now.ToFileTime().ToString() + ".xlsx";
            FileStream file = new FileStream(fileName, FileMode.Create, FileAccess.Write);
            Result.WriteTo(file);

            file.Flush();
            file.Close();

            Result.Flush();
            Result.Close();



            return file.Name;
        }


        public static String DataTableToExcelAddToListForEmailResult(DataSet tableSet, string ExcelName)
        {
            DataTable table = tableSet.Tables[0];
            MemoryStream Result = new MemoryStream();
            ExcelPackage pack = new ExcelPackage();
            //ExcelWorksheet ws = pack.Workbook.Worksheets.Add("Monthly Doctors List");
            ExcelWorksheet ws = pack.Workbook.Worksheets.Add(ExcelName);
            ws.View.FreezePanes(3, 1);

            #region // ************************ Start Sheet Headers ************************ //


            ws.Cells["B1"].Value = ExcelName;
            //ws.Cells["B1"].Style.Font.Color.SetColor(System.Drawing.Color.FromArgb(0, 0, 255));
            ws.Cells["B1"].Style.Font.Bold = true;
            ws.Cells["B1"].Style.Font.Size = 14f;

            ws.Cells[1, 2, 1, 7].Merge = true;
            ws.Cells[1, 2, 1, 7].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

            ws.Cells[3, 1].Style.Font.Bold = true;
            ws.Cells[3, 1].Style.Font.Size = 10f;
            ws.Cells[3, 1].AutoFitColumns();
            ws.Cells[3, 1].Style.Border.BorderAround(ExcelBorderStyle.Medium, Color.Black);
            ws.Cells[3, 1].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

            ws.Cells[3, 2].Style.Font.Bold = true;
            ws.Cells[3, 2].Style.Font.Size = 10f;
            ws.Cells[3, 2].AutoFitColumns();
            ws.Cells[3, 2].Style.Border.BorderAround(ExcelBorderStyle.Medium, Color.Black);
            ws.Cells[3, 2].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

            ws.Cells[3, 3].Style.Font.Bold = true;
            ws.Cells[3, 3].Style.Font.Size = 10f;
            ws.Cells[3, 3].AutoFitColumns();
            ws.Cells[3, 3].Style.Border.BorderAround(ExcelBorderStyle.Medium, Color.Black);
            ws.Cells[3, 3].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

            ws.Cells[3, 4].Style.Font.Bold = true;
            ws.Cells[3, 4].Style.Font.Size = 10f;
            ws.Cells[3, 4].AutoFitColumns();
            ws.Cells[3, 4].Style.Border.BorderAround(ExcelBorderStyle.Medium, Color.Black);
            ws.Cells[3, 4].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

            ws.Cells[3, 5].Style.Font.Bold = true;
            ws.Cells[3, 5].Style.Font.Size = 10f;
            ws.Cells[3, 5].AutoFitColumns();
            ws.Cells[3, 5].Style.Border.BorderAround(ExcelBorderStyle.Medium, Color.Black);
            ws.Cells[3, 5].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

            ws.Cells[3, 6].Style.Font.Bold = true;
            ws.Cells[3, 6].Style.Font.Size = 10f;
            ws.Cells[3, 6].AutoFitColumns();
            ws.Cells[3, 6].Style.Border.BorderAround(ExcelBorderStyle.Medium, Color.Black);
            ws.Cells[3, 6].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

            ws.Cells[3, 7].Style.Font.Bold = true;
            ws.Cells[3, 7].Style.Font.Size = 10f;
            ws.Cells[3, 7].AutoFitColumns();
            ws.Cells[3, 7].Style.Border.BorderAround(ExcelBorderStyle.Medium, Color.Black);
            ws.Cells[3, 7].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

            ws.Cells[3, 8].Style.Font.Bold = true;
            ws.Cells[3, 8].Style.Font.Size = 10f;
            ws.Cells[3, 8].AutoFitColumns();
            ws.Cells[3, 8].Style.Border.BorderAround(ExcelBorderStyle.Medium, Color.Black);
            ws.Cells[3, 8].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

            ws.Cells["A3"].Value = "Employee Name";
            ws.Cells["B3"].Value = "LoginID";
            ws.Cells["C3"].Value = "DoctorID";
            ws.Cells["D3"].Value = "Doc Code";
            ws.Cells["E3"].Value = "Doctor Name";
            ws.Cells["F3"].Value = "DSM Approval Status";
            ws.Cells["G3"].Value = "SM Approval Status";
            ws.Cells["H3"].Value = "Form Name";

            #endregion // ********************** End Sheet Headers ********************** //

            #region // *************** Packing Datable Rows To Excel Workbook *************** //

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

            #endregion // *************** Packing Datable Rows To Excel Workbook *************** //

            //ws.Protection.SetPassword("!@#ExcelPassword");

            ws.Cells.AutoFitColumns();

            pack.SaveAs(Result);
            string tes = "";
            string savepath = @"C:\PocketDCR\Excel\ServerResponse\" + ExcelName + "";

            //string filename = postedFile.FileName;
            if (!Directory.Exists(savepath))
                Directory.CreateDirectory(savepath);

            String fileName = @"C:\PocketDCR\Excel\ServerResponse\" + ExcelName + "\\ServerGenerated-" + ExcelName + "Excel-" + DateTime.Now.ToFileTime().ToString() + ".xlsx";
            FileStream file = new FileStream(fileName, FileMode.Create, FileAccess.Write);
            Result.WriteTo(file);

            file.Flush();
            file.Close();

            Result.Flush();
            Result.Close();

            return file.Name;
        }

        public static String DataTableToExcelLoctionApprovalListForEmailResult(DataSet tableSet, string ExcelName)
        {
            DataTable table = tableSet.Tables[1];
            MemoryStream Result = new MemoryStream();
            ExcelPackage pack = new ExcelPackage();
            //ExcelWorksheet ws = pack.Workbook.Worksheets.Add("Monthly Doctors List");
            ExcelWorksheet ws = pack.Workbook.Worksheets.Add(ExcelName);
            ws.View.FreezePanes(3, 1);

            #region // ************************ Start Sheet Headers ************************ //


            ws.Cells["B1"].Value = ExcelName;
            //ws.Cells["B1"].Style.Font.Color.SetColor(System.Drawing.Color.FromArgb(0, 0, 255));
            ws.Cells["B1"].Style.Font.Bold = true;
            ws.Cells["B1"].Style.Font.Size = 14f;

            ws.Cells[1, 2, 1, 7].Merge = true;
            ws.Cells[1, 2, 1, 7].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

            ws.Cells[3, 1].Style.Font.Bold = true;
            ws.Cells[3, 1].Style.Font.Size = 10f;
            ws.Cells[3, 1].AutoFitColumns();
            ws.Cells[3, 1].Style.Border.BorderAround(ExcelBorderStyle.Medium, Color.Black);
            ws.Cells[3, 1].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

            ws.Cells[3, 2].Style.Font.Bold = true;
            ws.Cells[3, 2].Style.Font.Size = 10f;
            ws.Cells[3, 2].AutoFitColumns();
            ws.Cells[3, 2].Style.Border.BorderAround(ExcelBorderStyle.Medium, Color.Black);
            ws.Cells[3, 2].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

            ws.Cells[3, 3].Style.Font.Bold = true;
            ws.Cells[3, 3].Style.Font.Size = 10f;
            ws.Cells[3, 3].AutoFitColumns();
            ws.Cells[3, 3].Style.Border.BorderAround(ExcelBorderStyle.Medium, Color.Black);
            ws.Cells[3, 3].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

            ws.Cells[3, 4].Style.Font.Bold = true;
            ws.Cells[3, 4].Style.Font.Size = 10f;
            ws.Cells[3, 4].AutoFitColumns();
            ws.Cells[3, 4].Style.Border.BorderAround(ExcelBorderStyle.Medium, Color.Black);
            ws.Cells[3, 4].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

            ws.Cells[3, 5].Style.Font.Bold = true;
            ws.Cells[3, 5].Style.Font.Size = 10f;
            ws.Cells[3, 5].AutoFitColumns();
            ws.Cells[3, 5].Style.Border.BorderAround(ExcelBorderStyle.Medium, Color.Black);
            ws.Cells[3, 5].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

            ws.Cells[3, 6].Style.Font.Bold = true;
            ws.Cells[3, 6].Style.Font.Size = 10f;
            ws.Cells[3, 6].AutoFitColumns();
            ws.Cells[3, 6].Style.Border.BorderAround(ExcelBorderStyle.Medium, Color.Black);
            ws.Cells[3, 6].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

            ws.Cells[3, 7].Style.Font.Bold = true;
            ws.Cells[3, 7].Style.Font.Size = 10f;
            ws.Cells[3, 7].AutoFitColumns();
            ws.Cells[3, 7].Style.Border.BorderAround(ExcelBorderStyle.Medium, Color.Black);
            ws.Cells[3, 7].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

            ws.Cells[3, 8].Style.Font.Bold = true;
            ws.Cells[3, 8].Style.Font.Size = 10f;
            ws.Cells[3, 8].AutoFitColumns();
            ws.Cells[3, 8].Style.Border.BorderAround(ExcelBorderStyle.Medium, Color.Black);
            ws.Cells[3, 8].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

            ws.Cells[3, 9].Style.Font.Bold = true;
            ws.Cells[3, 9].Style.Font.Size = 10f;
            ws.Cells[3, 9].AutoFitColumns();
            ws.Cells[3, 9].Style.Border.BorderAround(ExcelBorderStyle.Medium, Color.Black);
            ws.Cells[3, 9].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

            ws.Cells[3, 10].Style.Font.Bold = true;
            ws.Cells[3, 10].Style.Font.Size = 10f;
            ws.Cells[3, 10].AutoFitColumns();
            ws.Cells[3, 10].Style.Border.BorderAround(ExcelBorderStyle.Medium, Color.Black);
            ws.Cells[3, 10].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

            ws.Cells[3, 11].Style.Font.Bold = true;
            ws.Cells[3, 11].Style.Font.Size = 10f;
            ws.Cells[3, 11].AutoFitColumns();
            ws.Cells[3, 11].Style.Border.BorderAround(ExcelBorderStyle.Medium, Color.Black);
            ws.Cells[3, 11].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

            ws.Cells["A3"].Value = "Employee Name";
            ws.Cells["B3"].Value = "LoginID";
            ws.Cells["C3"].Value = "DoctorID";
            ws.Cells["D3"].Value = "Doc Code";
            ws.Cells["E3"].Value = "Doctor Name";
            ws.Cells["F3"].Value = "Latitude";
            ws.Cells["G3"].Value = "longitude";
            ws.Cells["H3"].Value = "Address";
            ws.Cells["I3"].Value = "DSM Approval Status";
            ws.Cells["J3"].Value = "SM Approval Status";
            ws.Cells["K3"].Value = "Form Name";

            #endregion // ********************** End Sheet Headers ********************** //

            #region // *************** Packing Datable Rows To Excel Workbook *************** //

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

            #endregion // *************** Packing Datable Rows To Excel Workbook *************** //

            //ws.Protection.SetPassword("!@#ExcelPassword");

            ws.Cells.AutoFitColumns();

            pack.SaveAs(Result);
            string tes = "";
            string savepath = @"C:\PocketDCR\Excel\ServerResponse\" + ExcelName + "";

            //string filename = postedFile.FileName;
            if (!Directory.Exists(savepath))
                Directory.CreateDirectory(savepath);

            String fileName = @"C:\PocketDCR\Excel\ServerResponse\" + ExcelName + "\\ServerGenerated-" + ExcelName + "Excel-" + DateTime.Now.ToFileTime().ToString() + ".xlsx";
            FileStream file = new FileStream(fileName, FileMode.Create, FileAccess.Write);
            Result.WriteTo(file);

            file.Flush();
            file.Close();

            Result.Flush();
            Result.Close();

            return file.Name;
        }
    }
}