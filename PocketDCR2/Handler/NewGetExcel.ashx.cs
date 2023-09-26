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

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for GetExcel
    /// </summary>
    public class NewGetExcel : IHttpHandler
    {
        #region Object Intialization
        NameValueCollection _nv = new NameValueCollection();
        DAL DL = new DAL();
        string employeeid = string.Empty;
        string filename1 = string.Empty;
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
                Constants.ErrorLog("Error While Dumping Monthly Doctors Sheet Records ::: Error: " + exception.Message);
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
            RequestObjectClass requestResponse = new RequestObjectClass();
            requestResponse.level5 = context.Request["Level5"];
            requestResponse.type = context.Request["Type"];
            requestResponse.Date = context.Request["Date"];
            DateTime MonthDate = Convert.ToDateTime(requestResponse.Date);
            string type = requestResponse.type;
            string zone = requestResponse.level5;

            if (type == "D")
            {
                #region Download Work
                 
                string FileName = "MonthlyDoctorsList-" + MonthDate.ToString();
                 DownloadSheet(context, requestResponse, FileName);

                #endregion
            }
            else if (type == "U")
            {
                #region Upload Work
                UploadWork(context);
                #endregion
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
        public static MemoryStream DataTableToExcelXlsx(DataSet tableSet)
        {

            DataTable table = tableSet.Tables[0];

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

            //ws.Row(2).Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

            //ws.Cells["A2"].Value = "Employee Data";
            //ws.Cells["A2:D2"].Merge = true;

            

            //ws.Cells["E2"].Value = "Doctor System Related Data";
            //ws.Cells["E2:G2"].Merge = true;

            //ws.Cells["H2"].Value = "Doctor Location";
            //ws.Cells["H2:N2"].Merge = true;

            //ws.Cells["O2"].Value = "Doctor Merit";
            //ws.Cells["O2:V2"].Merge = true;

            //ws.Cells["W2"].Value = "Other Details";
            //ws.Cells["W2:AA2"].Merge = true;

            //ws.Row(2).Height = 40;
            //ws.Row(3).Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

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



            // Employee 
            ws.Cells["A3"].Value = "Dist ID";
            ws.Cells["B3"].Value = "Distributor Name";
            ws.Cells["C3"].Value = "Dist Brick ID";
            ws.Cells["D3"].Value = "Distributor Bricks";
            ws.Column(1).Width = 10;
            ws.Column(2).Width = 20;
            ws.Column(3).Width = 15;
            ws.Column(4).Width = 20;


            // System Related
            ws.Cells["E3"].Value = "Distributor City";
            ws.Cells["F3"].Value = "Team";
            ws.Cells["G3"].Value = "DSM District";
            ws.Cells["H3"].Value = "Territory";
            ws.Column(5).Width = 20;
            ws.Column(6).Width = 20;
            ws.Column(7).Width = 20;
            ws.Column(8).Width = 30;


            // Doctor Location
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

            // Doctor Merit
            ws.Cells["R3"].Value = "Doctor Designation";
            ws.Cells["S3"].Value = "Doctor City";
            ws.Cells["T3"].Value = "Morning Address";
            ws.Cells["U3"].Value = "Evening Address";
            ws.Cells["V3"].Value = "PMDC No";
            ws.Cells["W3"].Value = "NIC No";
            ws.Cells["X3"].Value = "Mobile";
            ws.Cells["Y3"].Value = "Dr PTCL No";
            ws.Cells["Z3"].Value = "Dr Email";
            ws.Cells["AA3"].Value = "DR Class";
            ws.Cells["AB3"].Value = "Frequency";
            ws.Cells["AC3"].Value = "Dr Brick";
            ws.Cells["AD3"].Value = "Selection of P-1 Product";
            ws.Cells["AE3"].Value = "Call in M/E";
            ws.Cells["AF3"].Value = "No of Pts. In Morning";
            ws.Cells["AG3"].Value = "No of Pts. In Evening";
            ws.Cells["AH3"].Value = "Potential";
            ws.Cells["AI3"].Value = "Propensity";
            ws.Cells["AJ3"].Value = "KOL";
            ws.Cells["AK3"].Value = "Status";
            ws.Cells["AL3"].Value = "Flag";
            ws.Cells["AM3"].Value = "Remarks";


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
            ws.Column(39).Width = 15;
            //ws.Column(5).Hidden = true;
            //ws.Column(11).Hidden = true;
            //ws.Column(13).Hidden = true;
            //ws.Column(14).Hidden = true;
            //ws.Column(15).Hidden = true;
            //ws.Column(16).Hidden = true;
            //ws.Column(17).Hidden = true;
            //ws.Column(24).Hidden = true;
            //ws.Column(25).Hidden = true;

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

            return Result;
        }


        public static void DataTableToExcelXlsx2(DataTable table, string sheetName, string FileName)
        {

            ExcelPackage pack = new ExcelPackage();
            ExcelWorksheet ws = pack.Workbook.Worksheets.Add(sheetName);
            ws.View.FreezePanes(2, 15);
            ws.View.FreezePanes(3, 15);
            ws.Column(1).Hidden = true;
            ws.Cells[1, 2].Value = "NOTE: N= New Doctor U= Update Doctor D= Delete Doctor C=Continue (Flag must be provided,Otherwise System will not accept the record";
            ws.Cells["B1:O1"].Merge = true;
            ws.Cells[2, 1].Value = "Doctor Id";
            ws.Cells[2, 2].Value = "Doctor Code";
            ws.Cells[2, 3].Value = "Doctor Name";
            ws.Cells[2, 4].Value = "Qualification";
            ws.Cells[2, 5].Value = "Designation";
            ws.Cells[2, 6].Value = "Speciality";
            ws.Cells[2, 7].Value = "Class";
            ws.Cells[2, 8].Value = "Frequency";
            ws.Cells[2, 9].Value = "Address";
            ws.Cells[2, 10].Value = "City";
            ws.Cells[2, 11].Value = "Brick";
            ws.Cells[2, 12].Value = "KOL";
            ws.Cells[2, 13].Value = "STATUS";
            ws.Cells[2, 14].Value = "Flag";
            ws.Cells[2, 15].Value = "Remarks";
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
            FileName = FileName.Replace(@"/", "");
            pack.SaveAs(new FileInfo(@"D:\Downloads\Project-BMC\MyCRM\Novartis\Novartis Data Excels\NewExcls\" + FileName + ".xlsx"));

        }

        private void ReadExcelFile(string FileName, DateTime Date)
        {
            #region Reading Excel To DataTable

            OleDbConnection con = new OleDbConnection();

            string the = FileName;

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

            #endregion

            #region Working On Read Excel

            if (ds != null)
            {
                // Structured

                string excelFileName, emailAddress;
                excelFileName = FileName;
                emailAddress = ds.Tables[0].Columns[7].ColumnName.Replace('#', '.');


                // Inserting Record That Is Added ---Arsal
                DataSet dsR = GetData("sp_GenerateMonthlyDoctorsUploadBatch", new NameValueCollection() { 
                { "@ExcelFileName-int", excelFileName }, 
                { "@ExcelForMonth-int", Date.ToString() }, 
                { "@EmailAddress-int", emailAddress } });

                string batchID = dsR.Tables[0].Rows[0][0].ToString();


                if (ds.Tables[0].Rows.Count != 0)
                {


                    DataTable dt = new DataTable();

                    dt.Columns.Add("batchID", typeof(string));
                    dt.Columns.Add("DistID", typeof(string));
                    dt.Columns.Add("DistName", typeof(string));
                    dt.Columns.Add("DistBrickID", typeof(string));
                    dt.Columns.Add("DistBrick", typeof(string));
                    dt.Columns.Add("DistCity", typeof(string));
                    dt.Columns.Add("Team", typeof(string));
                    dt.Columns.Add("DSMDist", typeof(string));
                    dt.Columns.Add("LoginID", typeof(string));
                    dt.Columns.Add("Territory", typeof(string));
                    dt.Columns.Add("SPOName", typeof(string));
                    dt.Columns.Add("BrickShare", typeof(string));
                    dt.Columns.Add("DocSPOID", typeof(string));
                    dt.Columns.Add("DocCode", typeof(string));
                    dt.Columns.Add("DoctorName", typeof(string));
                    dt.Columns.Add("DocGender", typeof(string));
                    dt.Columns.Add("City", typeof(string));
                    dt.Columns.Add("Morning Address", typeof(string));
                    dt.Columns.Add("Evening Address", typeof(string));
                    dt.Columns.Add("Qualification", typeof(string));
                    dt.Columns.Add("Speciality", typeof(string));
                    dt.Columns.Add("Designation", typeof(string));
                    dt.Columns.Add("Class", typeof(string));
                    dt.Columns.Add("Frequency", typeof(string));
                    dt.Columns.Add("Potential", typeof(string));
                    dt.Columns.Add("Propensity", typeof(string));
                    dt.Columns.Add("DateofBirth", typeof(string));
                    dt.Columns.Add("PMDCNumber", typeof(string));
                    dt.Columns.Add("NICNumber", typeof(string));
                    dt.Columns.Add("Mobile", typeof(string));
                    dt.Columns.Add("PTCL_No", typeof(string));
                    dt.Columns.Add("Dr_Email", typeof(string));
                    dt.Columns.Add("Product_1", typeof(string));
                    dt.Columns.Add("Call_ME", typeof(string));
                    dt.Columns.Add("No_Pts_M", typeof(string));
                    dt.Columns.Add("No_Pts_E", typeof(string));
                    dt.Columns.Add("DocBrick", typeof(string));
                    dt.Columns.Add("KOL", typeof(string));
                    dt.Columns.Add("Status", typeof(string));
                    dt.Columns.Add("Flag", typeof(string));
                    


                    //dt.Columns.Add("batchID", typeof(string));
                    //dt.Columns.Add("LoginID", typeof(string));
                    //dt.Columns.Add("Territory", typeof(string));
                    //dt.Columns.Add("DocSPOID", typeof(string));
                    //dt.Columns.Add("DocCode", typeof(string));
                    //dt.Columns.Add("DoctorName", typeof(string));
                    //dt.Columns.Add("City", typeof(string));
                    //dt.Columns.Add("Address", typeof(string));
                    //dt.Columns.Add("Brick", typeof(string));
                    //dt.Columns.Add("Institute", typeof(string));
                    //dt.Columns.Add("Mobile", typeof(string));
                    //dt.Columns.Add("Latitude", typeof(string));
                    //dt.Columns.Add("Longitude", typeof(string));
                    //dt.Columns.Add("Speciality", typeof(string));
                    //dt.Columns.Add("Class", typeof(string));
                    //dt.Columns.Add("Frequency", typeof(string));
                    //dt.Columns.Add("Qualification", typeof(string));
                    //dt.Columns.Add("Designation", typeof(string));
                    //dt.Columns.Add("KOL", typeof(string));
                    //dt.Columns.Add("Status", typeof(string));
                    //dt.Columns.Add("Flag", typeof(string));
                    //dt.Columns.Add("DateofBirth", typeof(string));
                    //dt.Columns.Add("PMDCNumber", typeof(string));
                    //dt.Columns.Add("NICNumber", typeof(string));
                    //dt.Columns.Add("Potential", typeof(string));
                    //dt.Columns.Add("Propensity", typeof(string));
                  

                    //A = 1. B = 2. C = 3. D = 4. E = 5. F = 6. G = 7. H = 8. 
                    //I = 9. J = 10. K =11. L = 12. M = 13. N =14. O =15. P = 16. 
                    //Q =17. R =18. S = 19. T = 20. U =21. V =22. W = 23



                    var excelTable = ds.Tables[0];

                    excelTable.Rows.RemoveAt(0);
                    excelTable.Rows.RemoveAt(0);

                    foreach (DataRow row in ds.Tables[0].Rows)
                    {

                        try
                        {
                            string DistID, DistName, DistBrickID, DistBrick, DistCity, Team, DSMDist, LoginID, Territory, SPOName, BrickShare, DocSPOID, DocCode, DoctorName, DocGender, City,
                                MorningAddress, EveningAddress, Qualification,
                                Speciality, Designation, Class, Frequency, Potential, Propensity, DateofBirth, PMDCNumber, NICNumber, Mobile, PTCL_No, Dr_Email, Product_1, Call_ME, No_Pts_M, No_Pts_E, DocBrick, KOL, Status, Flag;

                            DistID = row[0].ToString();
                            DistName = row[1].ToString();
                            DistBrickID = row[2].ToString();
                            DistBrick = row[3].ToString();
                            DistCity = row[4].ToString();
                            Team = row[5].ToString();
                            DSMDist = row[6].ToString();
                            LoginID = row[8].ToString();
                            Territory = row[7].ToString();
                            SPOName = row[9].ToString();
                            BrickShare = row[10].ToString();
                            DocSPOID = row[11].ToString();
                            DocCode = row[12].ToString();
                            DoctorName = row[13].ToString();
                            DocGender = row[14].ToString();
                            City = row[18].ToString();
                            MorningAddress = row[19].ToString();
                            EveningAddress = row[20].ToString();
                            Qualification = row[15].ToString();
                            Speciality = row[16].ToString();
                            Designation = row[17].ToString();
                            Class = row[26].ToString();
                            Frequency = row[27].ToString() == "" ? null : row[27].ToString();
                            Potential = row[33].ToString();
                            Propensity = row[34].ToString();
                            DateofBirth = "";//row[25].ToString();
                            PMDCNumber = row[21].ToString();
                            NICNumber = row[22].ToString();
                            Mobile = row[23].ToString();
                            PTCL_No = row[24].ToString();
                            Dr_Email = row[25].ToString();
                            Product_1 = row[29].ToString();
                            Call_ME = row[30].ToString();
                            No_Pts_M = row[31].ToString();
                            No_Pts_E = row[32].ToString();
                            DocBrick = row[28].ToString();
                            //KOL = row[29].ToString();
                            //Status = row[30].ToString();
                            Flag = row[37].ToString();
                            
                            //LoginID = row[2].ToString();
                            //Territory = row[3].ToString();
                            //DocSPOID = row[4].ToString();
                            //DocCode = row[5].ToString();
                            //DoctorName = row[6].ToString();
                            //City = row[7].ToString();
                            //Address = row[8].ToString();
                            //Brick = row[9].ToString();
                            //Institute = row[10].ToString();
                            //Mobile = row[11].ToString();
                            //Latitude = row[12].ToString();
                            //Longitude = row[13].ToString();
                            //DateofBirth = row[14].ToString();
                            //PMDCNumber = row[15].ToString();
                            //NICNumber = row[16].ToString();
                            //Speciality = row[17].ToString();
                            //Class = row[18].ToString();
                            //Frequency = row[19].ToString() == "" ? null : row[19].ToString();
                            //Qualification = row[20].ToString();
                            //Designation = row[21].ToString();
                            //Propensity = row[24].ToString();
                            //Potential = row[23].ToString();
                            //Flag = row[26].ToString();
                            if (row[35].ToString().ToUpper() == "TRUE")
                            {
                                KOL = "TRUE";
                            }
                            else if (row[35].ToString().ToUpper() == "FALSE")
                            {
                                KOL = "FALSE";
                            }
                            else
                            {
                                KOL = row[35].ToString();
                            }
                            if (row[36].ToString().ToUpper() == "TRUE")
                            {
                                Status = "TRUE";
                            }
                            else if (row[36].ToString().ToUpper() == "FALSE")
                            {
                                Status = "FALSE";
                            }
                            else
                            {
                                Status = row[36].ToString();
                            }

                            dt.Rows.Add(batchID, DistID, DistName, DistBrickID, DistBrick, DistCity, Team, DSMDist, LoginID, Territory, SPOName, BrickShare, DocSPOID, DocCode, DoctorName,
                                DocGender, City, MorningAddress, EveningAddress, Qualification, Speciality, Designation, Class, Frequency, Potential, Propensity, DateofBirth, PMDCNumber, NICNumber,
                                Mobile, PTCL_No, Dr_Email, Product_1, Call_ME, No_Pts_M, No_Pts_E, DocBrick, KOL, Status, Flag);
                        }
                        catch (Exception)
                        {
                            // ~ ~ Breeze ~ ~
                        }



                    }
                    var cols = dt.Columns.SyncRoot;
                    cols.ToString();

                    SqlCommand command = new SqlCommand();
               
                    command.Parameters.AddWithValue("RecordValues", dt);

                    var results = GetData("sp_CreateBatchRecordsForDoctorUploads_ForMultipleAddress", command, true);
                    if (results != null)
                    {
                        MonthlyDoctorsBatchUploadHelper_New.Instance.Process();
                    }
                }

            }
            #endregion
        }

  

        private static DataTable WorksheetToDataTable(ExcelWorksheet worksheet)
        {
            // Vars
            var dt = new DataTable();
            var rowCnt = worksheet.Dimension.End.Row;
            var colCnt = worksheet.Dimension.End.Column + 1;
            worksheet.Column(1).Hidden = false;
            // Loop through Columns
            for (var c = 1; c < colCnt; c++)
            {
                // Add Column
                dt.Columns.Add(new DataColumn());
                // Loop through Rows
                for (var r = 1; r < rowCnt; r++)
                {
                    // Add Row
                    if (dt.Rows.Count < (rowCnt - 1))
                    {
                        dt.Rows.Add(dt.NewRow());
                    }
                    if (r == 1)
                    {
                        dt.Rows[r - 1][c - 1] = worksheet.Cells[r, c].Value.ToString();
                    }
                    else
                    {
                        dt.Rows[r - 1][c - 1] = worksheet.Cells[r, c].Value.ToString();
                    }
                }
            }
            // Return
            return dt;
        }

        private void DownloadSheet(HttpContext context, RequestObjectClass requestResponse, string FileName)
        {
           

            String sheetCode;

            MemoryStream ms = new MemoryStream();

            string Date = requestResponse.Date;
            string MonthName = Date.Split('-', ' ')[0];
            string year = Date.Split('-', ' ')[1];
            int day = DateTime.ParseExact(MonthName, "MMMM", CultureInfo.CurrentCulture).Month;
            string completedate = day + "/" + "1" + "/" + year + " " + DateTime.Now.TimeOfDay;
            DateTime MonthDate = Convert.ToDateTime(completedate);
            //string EmployeeID = "489";


            string zone = requestResponse.level5;


            _nv.Clear();
            _nv.Add("@Monthd-int", MonthDate.Month.ToString());
            _nv.Add("@Year-int", MonthDate.Year.ToString());
            _nv.Add("@Zone-int", zone.ToString());


            //New Doctor list Excel MR Doctors
            DataSet dsDoctorsRecord = GetData("sp_MRDoctorExcelFileNew_ForMultipleAddress", _nv);


            sheetCode = "Doctors";

            ms = NewGetExcel.DataTableToExcelXlsx(dsDoctorsRecord);

            ms.WriteTo(context.Response.OutputStream);
            context.Response.ContentType = "application/vnd.ms-excel";
            context.Response.AddHeader("Content-Disposition", "attachment;filename=" + FileName.Replace(" ", string.Empty).Trim() + ".xlsx");
            context.Response.StatusCode = 200;

            //context.Response.End();
            HttpContext.Current.ApplicationInstance.CompleteRequest();
        }
        private void UploadWork(HttpContext contxt)
        {

            contxt.Response.ContentType = "text/plain";
            contxt.Response.Expires = -1;
            try
            {
                HttpPostedFile postedFile = contxt.Request.Files["file"];
   
                string savepath = "";

                savepath = @"C:\PocketDCR\Excel\MonthlyDoctorsUpload\";

                if (!Directory.Exists(savepath))
                    Directory.CreateDirectory(savepath);


                string Date = contxt.Request.QueryString["date"];
                string MonthName = Date.Split('-')[0];
                string year = Date.Split('-')[1];
                string completedate = "1 " + MonthName + "-" + year + " " + DateTime.Now.TimeOfDay;
                DateTime MonthDate = Convert.ToDateTime(completedate);

                String fileName = @"MonthlyDoctorsUpload-" + DateTime.Now.ToFileTime() + ".xlsx";
                postedFile.SaveAs(savepath + fileName);
                
                ReadExcelFile(savepath + fileName, MonthDate);
                var result = "Your File Has been Processed Successfully";

                contxt.Response.ContentType = "text/plain";
                contxt.Response.Write(result);
                contxt.Response.StatusCode = 200;
            }
            catch (Exception ex)
            {
                contxt.Response.Write("Error: " + ex.Message);
            }
          
        }

        private void ReadExcel(HttpContext contxt)
        {
            string result = string.Empty;
            string Date = contxt.Request.QueryString["date"];
            string MonthName = Date.Split('-', ' ')[0];
            string year = Date.Split('-', ' ')[1];
            int i = DateTime.ParseExact(MonthName, "MMMM", CultureInfo.CurrentCulture).Month;
            string completedate = i + "/" + "1" + "/" + year + " " + DateTime.Now.TimeOfDay;
            DateTime MonthDate = Convert.ToDateTime(completedate);
            try
            {
                string savepath = "";
                string tempPath = "";
                tempPath = ConfigurationManager.AppSettings["Excel"].ToString();
                savepath = tempPath;
                string FileName = contxt.Request.QueryString["FileName"];
                //string EmployeeID = contxt.Request.QueryString["emp"];
                ReadExcelFile(savepath + @"\" + FileName, MonthDate);
                result = "Your File Has been Processed Successfully";
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }
            contxt.Response.Write(result);
        }
        #endregion


        #region HelperClasses --Fasih

        class RequestObjectClass
        {
            public string Date { get; set; }
            public string level5 { get; set; }
            public string EmployeeId { get; set; }
            public string type { get; set; }
        }

        #endregion
    }
}