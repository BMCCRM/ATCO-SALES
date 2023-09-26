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
using System.Text;
using System.Collections.Generic;
using System.Drawing;
using OfficeOpenXml.Style;

namespace PocketDCR2.Handler
{
    /// <summary>
    /// Summary description for AllocatedBricks
    /// </summary>


    public class DataEntry
    {
        public string SMName { get; set; }
        public string ASMName { get; set; }
        public DataSet Data { get; set; }
    }


    public class AllocatedBricks : IHttpHandler
    {

        NameValueCollection _nv = new NameValueCollection();
        static string DistId = string.Empty;
        static string empid = string.Empty;
        static string teamId = string.Empty;
        static string mode = string.Empty;
       
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


            empid = context.Request.QueryString["empid"];
            DistId = context.Request.QueryString["DistId"];
            teamId = context.Request.QueryString["TeamId"];

            _nv.Clear();

            _nv.Add("@empid-int", (empid));

            DataSet dsmode = GetData("GetRoleOfAnyEmployee", _nv);


            mode = dsmode.Tables[0].Rows[0][0].ToString();


            string FileName = "EmployeeBrickList-" + DateTime.Now.ToFileTime().ToString();
            DownloadSheet(context, FileName);
        }



        public static MemoryStream DataTableToExcelXlsxDSM_SPO(DataSet tableSet)
        {


            MemoryStream Result = new MemoryStream();
            ExcelPackage pack = new ExcelPackage();
            ExcelWorksheet ws = pack.Workbook.Worksheets.Add("Brick Allocation");


            int row = 1;
            row++;
            row++;
            ws.Cells[row, 1].Value = "DistributorName";
            ws.Column(1).Width = 10;
            ws.Cells[row, 2].Value = "BrickId";
            ws.Column(2).Width = 10;
            ws.Cells[row, 3].Value = "BrickName";
            ws.Column(3).Width = 12;
            ws.Cells[row, 4].Value = "BrickType";
            ws.Column(4).Width = 25;

            int startcolumn = 5;
            string Teamname = string.Empty;
           

            for (int j = 0; j < tableSet.Tables[1].Rows.Count; j++)
            {

                string[] terriotyarr = tableSet.Tables[1].Rows[j][0].ToString().Split('_'); ///territory is coming with team name Leopord_Landhi we need Landhi only

                string terrioty = terriotyarr[1];

                Teamname = terriotyarr[0];

                ws.Cells[row, startcolumn].Value = terrioty;

                //   ws.Cells[row, startcolumn].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[row, startcolumn].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                ws.Cells[row, startcolumn].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.Gray);
                ws.Cells[row, startcolumn].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                ws.Cells[row, startcolumn].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells[row, startcolumn].Style.WrapText = true;
                ws.Column(startcolumn).Width = 25;

                startcolumn++;

            }
           
            ws.Cells[row - 2, 1].Value = "Team :";
            ws.Cells[row - 2, 2].Value = Teamname;

            ws.Cells[row, startcolumn].Value = "Total";
            ws.Cells[row, startcolumn].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
            ws.Cells[row, startcolumn].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.Gray);
            ws.Cells[row, startcolumn].Style.Border.BorderAround(ExcelBorderStyle.Thin);
            ws.Cells[row, startcolumn].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
            ws.Cells[row, startcolumn].Style.WrapText = true;
            ws.Column(startcolumn).Width = 25;

            row++;

            for (int l = 0; l < tableSet.Tables[0].Rows.Count; l++)
            {
                DataRow dataRow = tableSet.Tables[0].Rows[l]; // Row from the first table
                string territory = dataRow["territory"].ToString();

                ws.Cells[row, 1].Value = dataRow["DistributorName"].ToString();
                ws.Cells[row, 2].Value = dataRow["BrickID"].ToString();
                ws.Cells[row, 3].Value = dataRow["BrickName"].ToString();
                ws.Cells[row, 4].Value = dataRow["TypeName"].ToString();

                int columnIndex = -1;

                double totalpercentage = 0;
                for (int k = 0; k < tableSet.Tables[1].Rows.Count; k++)
                {
                    columnIndex = k + 5;
                    if (tableSet.Tables[1].Rows[k][0].ToString() == territory)    //plotting territory
                    {

                        if (dataRow["SalesPercentage"].ToString() != string.Empty)
                        {
                            ws.Cells[row, columnIndex].Value = dataRow["SalesPercentage"];

                            totalpercentage += Convert.ToDouble(dataRow["SalesPercentage"].ToString());
                        }
                        else
                        {
                            ws.Cells[row, columnIndex].Value = "-";


                        }
                        // break;
                    }
                    else
                    {

                        ws.Cells[row, columnIndex].Value = "-";
                    }



                }

                // int totalcolumnindex = tableSet.Tables[1].Rows.Count + 1;
                ws.Cells[row, columnIndex + 1].Value = totalpercentage;





                if (l < tableSet.Tables[0].Rows.Count - 2)
                {

                    if (tableSet.Tables[0].Rows[l]["BrickName"].ToString() == tableSet.Tables[0].Rows[l + 1]["BrickName"].ToString())
                    {



                    }
                    else
                    {
                        row++;


                    }

                }

            }

            row++;
            row++;

            pack.SaveAs(Result);
            Result.Position = 0;

            return Result;

        }

        public static MemoryStream DataTableToExcelXlsx(List<DataEntry> dataEntries, string moder)
        {
            int row = 1;

            MemoryStream Result = new MemoryStream();
            ExcelPackage pack = new ExcelPackage();
            ExcelWorksheet ws = pack.Workbook.Worksheets.Add("Brick Allocation");
            if (moder == "AboveSM")
            {
                for (int i = 0; i < dataEntries.Count; i++)
                {

                    DataEntry entry = dataEntries[i];

                    // Access and use the properties of the DataEntry instance
                    string smName = entry.SMName;
                    string asmName = entry.ASMName;
                    DataSet tableSet = entry.Data;


                    ws.Cells[row, 1].Value = "SM: ";
                    ws.Cells[row, 2].Value = smName;
                    // ws.Cells[row, 1, row, 2].Merge = true;

                    row++;
                    ws.Cells[row, 1].Value = "DSM :";
                    ws.Cells[row, 2].Value = asmName;
                    row++;
                    row++;

                    ws.Cells[row, 1].Value = "DistributorName";
                    ws.Column(1).Width = 10;
                    ws.Cells[row, 2].Value = "BrickId";
                    ws.Column(2).Width = 10;
                    ws.Cells[row, 3].Value = "BrickName";
                    ws.Column(3).Width = 12;
                    ws.Cells[row, 4].Value = "BrickType";
                    ws.Column(4).Width = 25;

                    int startcolumn = 5;
                    for (int j = 0; j < tableSet.Tables[1].Rows.Count; j++)
                    {
                        ws.Cells[row, startcolumn].Value = tableSet.Tables[1].Rows[j][0].ToString();
                        ws.Column(startcolumn).Width = 25;

                        startcolumn++;

                    }

                    row++;

                    for (int l = 0; l < tableSet.Tables[0].Rows.Count; l++)
                    {
                        DataRow dataRow = tableSet.Tables[0].Rows[l]; // Row from the first table
                        string territory = dataRow["territory"].ToString();

                        ws.Cells[row, 1].Value = dataRow["DistributorName"].ToString();
                        ws.Cells[row, 2].Value = dataRow["BrickID"].ToString();
                        ws.Cells[row, 3].Value = dataRow["BrickName"].ToString();
                        ws.Cells[row, 4].Value = dataRow["TypeName"].ToString();

                        int columnIndex = -1;
                        for (int k = 0; k < tableSet.Tables[1].Rows.Count; k++)
                        {
                            columnIndex = k + 5;
                            if (tableSet.Tables[1].Rows[k][0].ToString() == territory)    //plotting territory
                            {

                                if (dataRow["SalesPercentage"].ToString() != string.Empty)
                                {
                                    ws.Cells[row, columnIndex].Value = dataRow["SalesPercentage"];
                                }
                                else
                                {
                                    ws.Cells[row, columnIndex].Value = "-";


                                }
                                // break;
                            }
                            else
                            {

                                ws.Cells[row, columnIndex].Value = "-";
                            }



                        }


                        if (l < tableSet.Tables[0].Rows.Count - 2)
                        {

                            if (tableSet.Tables[0].Rows[l]["BrickName"].ToString() == tableSet.Tables[0].Rows[l + 1]["BrickName"].ToString())
                            {



                            }
                            else
                            {
                                row++;


                            }

                        }

                    }

                    row++;
                    row++;



                }

            }
            else if (moder == "SM")
            {
                for (int i = 0; i < dataEntries.Count; i++)
                {

                    DataEntry entry = dataEntries[i];

                    // Access and use the properties of the DataEntry instance
                    string smName = entry.SMName;
                    string asmName = entry.ASMName;
                    DataSet tableSet = entry.Data;


                  
                    ws.Cells[row, 1].Value = "DSM :";
                    ws.Cells[row, 2].Value = asmName;
                    row++;
                    row++;
                    row++;

                    ws.Cells[row, 1].Value = "DistributorName";
                    ws.Column(1).Width = 10;
                    ws.Cells[row, 2].Value = "BrickId";
                    ws.Column(2).Width = 10;
                    ws.Cells[row, 3].Value = "BrickName";
                    ws.Column(3).Width = 12;
                    ws.Cells[row, 4].Value = "BrickType";
                    ws.Column(4).Width = 25;

                    string Teamname = string.Empty;

                    int startcolumn = 5;
                    for (int j = 0; j < tableSet.Tables[1].Rows.Count; j++)
                    {

                        string[] terriotyarr = tableSet.Tables[1].Rows[j][0].ToString().Split('_'); ///territory is coming with team name Leopord_Landhi we need Landhi only

                        string terrioty = terriotyarr[1];

                        Teamname = terriotyarr[0];

                        ws.Cells[row, startcolumn].Value = terrioty;
                       
                       //   ws.Cells[row, startcolumn].Style.Fill.PatternType = ExcelFillStyle.Solid;
                        ws.Cells[row, startcolumn].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;                      
                        ws.Cells[row, startcolumn].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.Gray);
                        ws.Cells[row, startcolumn].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                        ws.Cells[row, startcolumn].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                        ws.Cells[row, startcolumn].Style.WrapText = true;
                        ws.Cells[row, startcolumn].Style.Font.Bold = true;

                        ws.Column(startcolumn).Width = 25;

                        startcolumn++;

                    }

                    ws.Cells[row - 2, 1].Value = "Team :";
                    ws.Cells[row - 2, 2].Value = Teamname;

                    ws.Cells[row, startcolumn].Value = "Total";
                    ws.Cells[row, startcolumn].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                    ws.Cells[row, startcolumn].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.Gray);
                    ws.Cells[row, startcolumn].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                    ws.Cells[row, startcolumn].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    ws.Cells[row, startcolumn].Style.WrapText = true;
                    ws.Cells[row, startcolumn].Style.Font.Bold = true;

                    ws.Column(startcolumn).Width = 25;

                    row++;

                    for (int l = 0; l < tableSet.Tables[0].Rows.Count; l++)
                    {
                        DataRow dataRow = tableSet.Tables[0].Rows[l]; // Row from the first table
                        string territory = dataRow["territory"].ToString();

                        ws.Cells[row, 1].Value = dataRow["DistributorName"].ToString();
                        ws.Cells[row, 2].Value = dataRow["BrickID"].ToString();
                        ws.Cells[row, 3].Value = dataRow["BrickName"].ToString();
                        ws.Cells[row, 4].Value = dataRow["TypeName"].ToString();

                        int columnIndex = -1;

                        double totalpercentage = 0;
                        for (int k = 0; k < tableSet.Tables[1].Rows.Count; k++)
                        {
                            columnIndex = k + 5;
                            if (tableSet.Tables[1].Rows[k][0].ToString() == territory)    //plotting territory
                            {

                                if (dataRow["SalesPercentage"].ToString() != string.Empty)
                                {
                                    ws.Cells[row, columnIndex].Value = dataRow["SalesPercentage"];
                                    totalpercentage += Convert.ToDouble(dataRow["SalesPercentage"].ToString());
                                }
                                else
                                {
                                    ws.Cells[row, columnIndex].Value = "-";


                                }
                                // break;
                            }
                            else
                            {

                                ws.Cells[row, columnIndex].Value = "-";
                            }



                        }

                       // int totalcolumnindex = tableSet.Tables[1].Rows.Count + 1;
                         ws.Cells[row, columnIndex+ 1].Value = totalpercentage;

                       



                        if (l < tableSet.Tables[0].Rows.Count - 2)
                        {

                            if (tableSet.Tables[0].Rows[l]["BrickName"].ToString() == tableSet.Tables[0].Rows[l + 1]["BrickName"].ToString())
                            {



                            }
                            else
                            {
                                row++;


                            }

                        }

                    }

                    row++;
                    row++;



                }

            }
            else
            {

                for (int i = 0; i < dataEntries.Count; i++)
                {

                    DataEntry entry = dataEntries[i];

                    // Access and use the properties of the DataEntry instance
                    string smName = entry.SMName;
                    string asmName = entry.ASMName;
                    DataSet tableSet = entry.Data;



                    ws.Cells[row, 1].Value = "DSM :";
                    ws.Cells[row, 2].Value = asmName;
                    row++;
                    row++;
                    row++;

                    ws.Cells[row, 1].Value = "DistributorName";
                    ws.Column(1).Width = 10;
                    ws.Cells[row, 2].Value = "BrickId";
                    ws.Column(2).Width = 10;
                    ws.Cells[row, 3].Value = "BrickName";
                    ws.Column(3).Width = 12;
                    ws.Cells[row, 4].Value = "BrickType";
                    ws.Column(4).Width = 25;

                    string Teamname = string.Empty;

                    int startcolumn = 5;
                    for (int j = 0; j < tableSet.Tables[1].Rows.Count; j++)
                    {

                        string[] terriotyarr = tableSet.Tables[1].Rows[j][0].ToString().Split('_'); ///territory is coming with team name Leopord_Landhi we need Landhi only

                        string terrioty = terriotyarr[1];

                        Teamname = terriotyarr[0];

                        ws.Cells[row, startcolumn].Value = terrioty;

                        //   ws.Cells[row, startcolumn].Style.Fill.PatternType = ExcelFillStyle.Solid;
                        ws.Cells[row, startcolumn].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                        ws.Cells[row, startcolumn].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.Gray);
                        ws.Cells[row, startcolumn].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                        ws.Cells[row, startcolumn].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                        ws.Cells[row, startcolumn].Style.WrapText = true;
                        ws.Column(startcolumn).Width = 25;

                        startcolumn++;

                    }

                    ws.Cells[row - 2, 1].Value = "Team :";
                    ws.Cells[row - 2, 2].Value = Teamname;

                    ws.Cells[row, startcolumn].Value = "Total";
                    ws.Cells[row, startcolumn].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                    ws.Cells[row, startcolumn].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.Gray);
                    ws.Cells[row, startcolumn].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                    ws.Cells[row, startcolumn].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    ws.Cells[row, startcolumn].Style.WrapText = true;
                    ws.Column(startcolumn).Width = 25;

                    row++;

                    for (int l = 0; l < tableSet.Tables[0].Rows.Count; l++)
                    {
                        DataRow dataRow = tableSet.Tables[0].Rows[l]; // Row from the first table
                        string territory = dataRow["territory"].ToString();

                        ws.Cells[row, 1].Value = dataRow["DistributorName"].ToString();
                        ws.Cells[row, 2].Value = dataRow["BrickID"].ToString();
                        ws.Cells[row, 3].Value = dataRow["BrickName"].ToString();
                        ws.Cells[row, 4].Value = dataRow["TypeName"].ToString();

                        int columnIndex = -1;

                        double totalpercentage = 0;
                        for (int k = 0; k < tableSet.Tables[1].Rows.Count; k++)
                        {
                            columnIndex = k + 5;
                            if (tableSet.Tables[1].Rows[k][0].ToString() == territory)    //plotting territory
                            {

                                if (dataRow["SalesPercentage"].ToString() != string.Empty)
                                {
                                    ws.Cells[row, columnIndex].Value = dataRow["SalesPercentage"];

                                    totalpercentage += Convert.ToDouble(dataRow["SalesPercentage"].ToString());
                                }
                                else
                                {
                                    ws.Cells[row, columnIndex].Value = "-";


                                }
                                // break;
                            }
                            else
                            {

                                ws.Cells[row, columnIndex].Value = "-";
                            }



                        }

                        // int totalcolumnindex = tableSet.Tables[1].Rows.Count + 1;
                        ws.Cells[row, columnIndex + 1].Value = totalpercentage;





                        if (l < tableSet.Tables[0].Rows.Count - 2)
                        {

                            if (tableSet.Tables[0].Rows[l]["BrickName"].ToString() == tableSet.Tables[0].Rows[l + 1]["BrickName"].ToString())
                            {



                            }
                            else
                            {
                                row++;


                            }

                        }

                    }

                    row++;
                    row++;



                }


            }








            pack.SaveAs(Result);
            Result.Position = 0;

            return Result;







        }
        private void DownloadSheet(HttpContext context, string FileName)
        {
            String sheetCode = String.Empty;
            MemoryStream ms = new MemoryStream();

            List<DataEntry> dataEntries = new List<DataEntry>();
            string moder = string.Empty;

            if (mode != "L4" && mode != "L5" && mode != "L6")
            {
                moder = "AboveSM";
                _nv.Clear();
                _nv.Add("@empid-int", (empid));
                _nv.Add("@mode-nvarchar(2)", mode);

                DataSet DataSetSMs = GetData("GetAllSMs", _nv);


                int row = 1;

                using (ExcelPackage pack = new ExcelPackage())
                {
                    ExcelWorksheet ws = pack.Workbook.Worksheets.Add("Employee Brick List");

                    for (int i = 0; i < DataSetSMs.Tables[0].Rows.Count; i++)
                    {
                        string SM = DataSetSMs.Tables[0].Rows[i][1].ToString();
                        string SMID = DataSetSMs.Tables[0].Rows[i][0].ToString();
                        _nv.Clear();
                        _nv.Add("@empid-int", (SMID));

                        DataSet DataSetASMs = GetData("GetAllASMs", _nv);

                        for (int j = 0; j < DataSetASMs.Tables[0].Rows.Count; j++)
                        {
                            string ASM = DataSetASMs.Tables[0].Rows[j][1].ToString();
                            string ASMID = DataSetASMs.Tables[0].Rows[j][0].ToString();

                            _nv.Clear();
                            _nv.Add("@empid-int", (ASMID));
                            _nv.Add("@teamid-int", (teamId));
                            _nv.Add("@disid-int", (DistId));
                            DataSet DsBricks = GetData("sp_BricksOnASM", _nv);
                            sheetCode = "Bricks";
                            if (DsBricks.Tables[0].Rows.Count > 0)
                            {

                                DataEntry entry = new DataEntry
                                {
                                    SMName = SM,
                                    ASMName = ASM,
                                    Data = DsBricks
                                };


                                dataEntries.Add(entry);



                            }


                        }

                    }



                }


                ms = AllocatedBricks.DataTableToExcelXlsx(dataEntries, moder);
                ms.WriteTo(context.Response.OutputStream);
                context.Response.ContentType = "application/vnd.ms-excel";
                context.Response.AddHeader("Content-Disposition", "attachment;filename=" + FileName.Replace(" ", string.Empty).Trim() + ".xlsx");
                context.Response.StatusCode = 200;
                HttpContext.Current.ApplicationInstance.CompleteRequest();
            }

            else if (mode == "L4")
            {
                moder = "SM";
                _nv.Clear();
                _nv.Add("@empid-int", (empid));
                DataSet DataSetASMs = GetData("GetAllASMs", _nv);

                for (int j = 0; j < DataSetASMs.Tables[0].Rows.Count; j++)
                {
                    string ASM = DataSetASMs.Tables[0].Rows[j][1].ToString();
                    string ASMID = DataSetASMs.Tables[0].Rows[j][0].ToString();

                    _nv.Clear();
                    _nv.Add("@empid-int", (ASMID));
                    _nv.Add("@teamid-int", (teamId));
                    _nv.Add("@disid-int", (DistId));
                    DataSet DsBricks = GetData("sp_BricksOnASM", _nv);
                    sheetCode = "Bricks";
                    if (DsBricks.Tables[0].Rows.Count > 0)
                    {

                        DataEntry entry = new DataEntry
                        {
                            SMName = string.Empty,
                            ASMName = ASM,
                            Data = DsBricks
                        };


                        dataEntries.Add(entry);



                    }



                }


                ms = AllocatedBricks.DataTableToExcelXlsx(dataEntries, moder);

                /// _nv.Clear();
                /// _nv.Add("@distributorId-int",(DistId.ToString()));
                ms.WriteTo(context.Response.OutputStream);
                context.Response.ContentType = "application/vnd.ms-excel";
                context.Response.AddHeader("Content-Disposition", "attachment;filename=" + FileName.Replace(" ", string.Empty).Trim() + ".xlsx");
                context.Response.StatusCode = 200;
                HttpContext.Current.ApplicationInstance.CompleteRequest();


            }
            else if (mode == "L5")
            {
                string ASM = context.Request.QueryString["EmployeeName"];


                moder = "ASM";
                _nv.Clear();
                _nv.Add("@empid-int", (empid));
                _nv.Add("@teamid-int", (teamId));
                _nv.Add("@disid-int", (DistId));
                DataSet DsBricks = GetData("sp_BricksOnASM", _nv);
                sheetCode = "Bricks";
                if (DsBricks.Tables[0].Rows.Count > 0)
                {

                    DataEntry entry = new DataEntry
                    {
                        SMName = string.Empty,
                        ASMName = ASM,
                        Data = DsBricks
                    };


                    dataEntries.Add(entry);
                }

                ms = AllocatedBricks.DataTableToExcelXlsx(dataEntries, moder);

                /// _nv.Clear();
                /// _nv.Add("@distributorId-int",(DistId.ToString()));
                ms.WriteTo(context.Response.OutputStream);
                context.Response.ContentType = "application/vnd.ms-excel";
                context.Response.AddHeader("Content-Disposition", "attachment;filename=" + FileName.Replace(" ", string.Empty).Trim() + ".xlsx");
                context.Response.StatusCode = 200;
                HttpContext.Current.ApplicationInstance.CompleteRequest();


            }
            else
            {
                _nv.Clear();
                _nv.Add("@distributorId-int", (DistId.ToString()));
                _nv.Add("@empid-int", (empid));
                _nv.Add("@teamid-int", (teamId));
                DataSet dsContactPoints = GetData("sp_GetBrickAllocatedData", _nv);
                sheetCode = "Bricks";
                ms = AllocatedBricks.DataTableToExcelXlsxDSM_SPO(dsContactPoints);
                ms.WriteTo(context.Response.OutputStream);
                context.Response.ContentType = "application/vnd.ms-excel";
                context.Response.AddHeader("Content-Disposition", "attachment;filename=" + FileName.Replace(" ", string.Empty).Trim() + ".xlsx");
                context.Response.StatusCode = 200;
                HttpContext.Current.ApplicationInstance.CompleteRequest();


            }




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