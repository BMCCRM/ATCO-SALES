using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;

namespace PocketDCR2.Classes
{
    public class ExcelHelper_New
    {
        public static String DataTableToExcelForEmailResult(DataSet tableSet)
        {
            DataTable table = tableSet.Tables[1];
            //table.Columns.Remove("ID");
            MemoryStream Result = new MemoryStream();
            ExcelPackage pack = new ExcelPackage();
            ExcelWorksheet ws = pack.Workbook.Worksheets.Add("Monthly Doctors List");
            ws.View.FreezePanes(4, 1);

            ws.Cells["G1"].Value = "Email Address: ";
            ws.Cells["G1"].Style.Font.Bold = true;

            try
            {
                ws.Cells["H1"].Value = tableSet.Tables[1].Rows[0][0].ToString();
            }
            catch (Exception)
            {
                ws.Cells["H1"].Value = "Enter Email Here";
            }

            ws.Cells["A2"].Value = "NOTE: N= New Doctor U= Update Doctor D= Delete Doctor C=Continue (Flag must be provided,Otherwise System will not accept the record";
            ws.Cells["A2:O2"].Merge = true;


            ws.Column(2 + 8).Width = 10;
            ws.Column(2 + 8).Width = 20;
            ws.Column(5 + 8).Width = 15;
            ws.Column(6 + 8).Width = 15;
            ws.Column(7 + 8).Width = 10;
            ws.Column(8 + 8).Width = 10;
            ws.Column(9 + 8).Width = 10;

            ws.Row(2).Style.Font.Bold = true;
            ws.Row(3).Style.Font.Bold = true;


            #region // ************************ Start Sheet Headers ************************ //




            ws.Cells["A3"].Value = "Dist ID";
            ws.Cells["B3"].Value = "Distributor Name";
            ws.Cells["C3"].Value = "Dist Brick ID";
            ws.Cells["D3"].Value = "Distributor Bricks";
            ws.Column(1).Width = 10;
            ws.Column(2).Width = 20;
            ws.Column(3).Width = 15;
            ws.Column(4).Width = 20;


            ws.Cells["E3"].Value = "Distributor City";
            ws.Cells["F3"].Value = "Team";
            ws.Cells["G3"].Value = "DSM District";
            ws.Cells["H3"].Value = "Territory";
            ws.Column(5).Width = 20;
            ws.Column(6).Width = 20;
            ws.Column(7).Width = 20;
            ws.Column(8).Width = 30;


            ws.Cells["I3"].Value = "SPO HSMS CODE";
            ws.Column(9).Width = 15;
            ws.Cells["J3"].Value = "SPO Name";
            ws.Column(10).Width = 30;
            ws.Cells["K3"].Value = "Brick % of Share";
            ws.Column(11).Width = 15;
            ws.Cells["L3"].Value = "DocSPOID";
            ws.Column(12).Width = 15;
            ws.Column(12).Hidden = true;
            ws.Cells["M3"].Value = "DocCode";
            ws.Column(13).Width = 15;
            ws.Cells["N3"].Value = "Doctor Name";
            ws.Column(14).Width = 20;
            ws.Cells["O3"].Value = "Doctor Gender";
            ws.Column(15).Width = 15;
            ws.Cells["P3"].Value = "Doctor Qualification";
            ws.Cells["Q3"].Value = "Doctor Speciality";


            ws.Cells["R3"].Value = "Doctor Designation";
            ws.Cells["S3"].Value = "Doctor City";
            ws.Cells["T3"].Value = "Doctor Address";
            ws.Cells["U3"].Value = "PMDC No";
            ws.Cells["V3"].Value = "NIC No";
            ws.Cells["W3"].Value = "Mobile";
            ws.Cells["X3"].Value = "Dr PTCL No";
            ws.Cells["Y3"].Value = "Dr Email";
            ws.Cells["Z3"].Value = "DR Class";
            ws.Cells["AA3"].Value = "Frequency";
            ws.Cells["AB3"].Value = "Dr Brick";
            ws.Cells["AC3"].Value = "Selection of P-1 Product";
            ws.Cells["AD3"].Value = "Call in M/E";
            ws.Cells["AE3"].Value = "No of Pts. In Morning";
            ws.Cells["AF3"].Value = "No of Pts. In Evening";
            ws.Cells["AG3"].Value = "Potential";
            ws.Cells["AH3"].Value = "Propensity";
            ws.Cells["AI3"].Value = "KOL";
            ws.Cells["AJ3"].Value = "Status";
            ws.Cells["AK3"].Value = "Flag";
            ws.Cells["AL3"].Value = "Remarks";


            ws.Column(16).Width = 15;
            ws.Column(17).Width = 15;
            ws.Column(18).Width = 15;
            ws.Column(19).Width = 20;
            ws.Column(20).Width = 20;
            ws.Column(21).Width = 15;
            ws.Column(22).Width = 15;
            ws.Column(23).Width = 10;
            ws.Column(24).Width = 15;
            ws.Column(25).Width = 20;
            ws.Column(26).Width = 10;
            ws.Column(27).Width = 15;
            ws.Column(28).Width = 15;
            ws.Column(29).Width = 25;
            ws.Column(30).Width = 10;
            ws.Column(31).Width = 25;
            ws.Column(32).Width = 25;
            ws.Column(33).Width = 20;
            ws.Column(34).Width = 20;
            ws.Column(35).Width = 10;
            ws.Column(36).Width = 10;
            ws.Column(37).Width = 10;
            ws.Column(38).Width = 15;


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


    }
}