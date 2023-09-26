using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;

namespace PocketDCR2.BWSD.Class
{
    public class BWSDExcelHelper_New
    {
        public static String DataTableToExcelForEmailResult(DataSet tableSet)
        {
            DataTable table = tableSet.Tables[1];
            //table.Columns.Remove("ID");
            MemoryStream Result = new MemoryStream();
            ExcelPackage pack = new ExcelPackage();
            ExcelWorksheet ws = pack.Workbook.Worksheets.Add("Brick Allocation List");
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

            #region // ************************ Start Sheet Headers ************************ //


            ws.Cells["A3"].Value = "MD";
            ws.Cells["B3"].Value = "Director/GM";
            ws.Cells["C3"].Value = "BUH";
            ws.Cells["D3"].Value = "Team";
            ws.Cells["E3"].Value = "SM";
            ws.Cells["F3"].Value = "DSM";
            ws.Cells["G3"].Value = "Territory";
            ws.Cells["H3"].Value = "SPO Name";
            ws.Cells["I3"].Value = "SPO Login ID";            
            ws.Cells["J3"].Value = "Distributor Code";
            ws.Cells["K3"].Value = "Distributor Name";
            ws.Cells["L3"].Value = "Brick Code";
            ws.Cells["M3"].Value = "Brick Name";
            ws.Cells["N3"].Value = "Brick % of Share";
            ws.Cells["O3"].Value = "Remarks";

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

            string savepath = @"C:\PocketDCR\Excel\ServerResponse\BrickAllocation\";

            //string filename = postedFile.FileName;
            if (!Directory.Exists(savepath))
                Directory.CreateDirectory(savepath);

            String fileName = @"C:\PocketDCR\Excel\ServerResponse\BrickAllocation\ServerGeneratedBrickAllocationExcel-" + DateTime.Now.ToFileTime().ToString() + ".xlsx";
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