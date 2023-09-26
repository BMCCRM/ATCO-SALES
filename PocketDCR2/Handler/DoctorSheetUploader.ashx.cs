using OfficeOpenXml;
using PocketDCR2.Classes;
using System;
using System.Collections.Specialized;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Script.Serialization;

namespace PocketDCR2.Handler
{

    public class DoctorSheetUploader : IHttpHandler
    {

        #region Variables Intialization

        private NameValueCollection _nv = new NameValueCollection();
        private DAL DL = new DAL();

        #endregion Variables Intialization

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

        // OverLoaded Method --Arsal
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


        #endregion Database Layer

        #region  Request Handler Methods

        public void ProcessRequest(HttpContext context)
        {

            RequestObjectClass requestResponse = new RequestObjectClass();
            requestResponse.level5 = context.Request["Level5"];
            requestResponse.type = context.Request["Type"];
            requestResponse.Date = context.Request["Date"];

            try
            {
                string FileName = "MonthlyDoctorsSheetUploader-" + requestResponse.Date;

                switch (requestResponse.type.ToUpper()[0])
                {
                    case 'D':
                        DownloadSheet(context, requestResponse, FileName);
                        break;

                    case 'U':
                        UploadSheet(context);
                        break;

                    default:
                        context.Response.Write("Corrupt Data Request");
                        break;
                }

            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Error On Monthly Doctor Upload Sheet ::: " + ex.Message);
                context.Response.Write("Error :" + ex.Message);
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

        #endregion Request Handler Methods

        #region Upload Doctor Sheet Methods
        private void UploadSheet(HttpContext contxt)
        {
            contxt.Response.ContentType = "text/plain";
            contxt.Response.Expires = -1;
            try
            {
                HttpPostedFile postedFile = contxt.Request.Files["file"];
                string savepath = "";

                savepath = @"C:\PocketDCR\Excel\MonthlyDoctorsUpload\";

                //string filename = postedFile.FileName;
                if (!Directory.Exists(savepath))
                    Directory.CreateDirectory(savepath);


                string Date = contxt.Request.QueryString["date"];
                string MonthName = Date.Split('-', ' ')[1];
                string year = Date.Split('-', ' ')[2];
                int i = Int32.Parse(MonthName);//DateTime.ParseExact(MonthName, "MMMM", CultureInfo.CurrentCulture).Month;
                string completedate = i + "/" + "1" + "/" + year + " " + DateTime.Now.TimeOfDay;
                DateTime MonthDate = Convert.ToDateTime(completedate);

                //date.Month + date.Year
                String fileName = @"MonthlyDoctorsUpload-" + DateTime.Now.ToFileTime() + ".xlsx";
                postedFile.SaveAs(savepath + fileName);

                string FileName = contxt.Request.QueryString["FileName"];

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

                //string sheetTypeCode = ds.Tables[0].Columns[9].ColumnName;

                string excelFileName, emailAddress;
                excelFileName = FileName;
                emailAddress = ds.Tables[0].Columns[6].ColumnName.Replace('#', '.');


                // Inserting Record That Is Added ---Arsal
                DataSet dsR = GetData("sp_GenerateMonthlyDoctorsUploadBatch", new NameValueCollection() { 
                { "@ExcelFileName-int", excelFileName }, 
                { "@ExcelForMonth-int", Date.ToString() }, 
                { "@EmailAddress-int", emailAddress } });

                string batchID = dsR.Tables[0].Rows[0][0].ToString();


                if (ds.Tables[0].Rows.Count != 0)
                {


                    DataTable dt = new DataTable();

                    dt.Columns.Add("batchID", typeof(Int32));
                    dt.Columns.Add("LoginID", typeof(string));
                    dt.Columns.Add("DocSPOID", typeof(string));
                    dt.Columns.Add("DocCode", typeof(string));
                    dt.Columns.Add("DoctorName", typeof(string));
                    dt.Columns.Add("City", typeof(string));
                    dt.Columns.Add("Address", typeof(string));
                    dt.Columns.Add("Brick", typeof(string));
                    dt.Columns.Add("Institute", typeof(string));

                    dt.Columns.Add("Mobile", typeof(string));
                    dt.Columns.Add("Latitude", typeof(string));
                    dt.Columns.Add("Longitude", typeof(string));
                    dt.Columns.Add("Speciality", typeof(string));
                    dt.Columns.Add("Class", typeof(string));
                    dt.Columns.Add("Frequency", typeof(string));
                    dt.Columns.Add("Qualification", typeof(string));
                    dt.Columns.Add("Designation", typeof(string));
                    dt.Columns.Add("KOL", typeof(string));
                    dt.Columns.Add("Status", typeof(string));
                    dt.Columns.Add("Flag", typeof(string));

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
                            string LoginID, DocSPOID, DocCode, DoctorName, City, Address, Brick, Institute, Mobile, Latitude, Longitude, Speciality, Class, Frequency, Qualification, Designation, KOL, Status, Flag;

                            LoginID = row[1].ToString();
                            DocSPOID = row[2].ToString();
                            DocCode = row[3].ToString();
                            DoctorName = row[4].ToString();
                            City = row[5].ToString();
                            Address = row[6].ToString();
                            Brick = row[7].ToString();
                            Institute = row[8].ToString();

                            Mobile = row[9].ToString();
                            Latitude = row[10].ToString();
                            Longitude = row[11].ToString();
                            Speciality = row[12].ToString();
                            Class = row[13].ToString();
                            Frequency = row[14].ToString() == "" ? null : row[14].ToString();
                            Qualification = row[15].ToString();
                            Designation = row[16].ToString();
                            KOL = (row[17].ToString().ToLower() == "true" ? "1" : "0");
                            Status = (row[18].ToString().ToLower() == "true" ? "1" : "0");
                            Flag = row[19].ToString();


                            if (Qualification == "")
                            {
                                Qualification = "DR";
                            }

                            if (Designation == "")
                            {
                                Designation = "DRs";
                            }

                            dt.Rows.Add(batchID, LoginID, DocSPOID, DocCode, DoctorName, City, Address, Brick, Institute, Mobile, Latitude, Longitude, Speciality,
                                Class, Frequency, Qualification, Designation, KOL, Status, Flag);
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
                    //command.Parameters.AddWithValue("DateMonth", );
                    //command.CommandType = CommandType.TableDirect;
                    var results = GetData("sp_CreateBatchRecordsForDoctorUploads", command, true);
                    MonthlyDoctorsBatchUploadHelper.Instance.Process();

                }
                ///runnerMethod = rowHandlerForHierarchy;

            }
            #endregion
        }
        #endregion

        #region Download Doctor Sheet Methods
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

            DataSet dsDoctorsRecord = GetData("sp_GetAllDoctorsForExcel", _nv);


            sheetCode = "Doctors";

            ms = DoctorSheetUploader.DataTableToExcelXlsx(dsDoctorsRecord);

            ms.WriteTo(context.Response.OutputStream);
            context.Response.ContentType = "application/vnd.ms-excel";
            context.Response.AddHeader("Content-Disposition", "attachment;filename=" + FileName.Replace(" ", string.Empty).Trim() + ".xlsx");
            context.Response.StatusCode = 200;

            //context.Response.End();
            HttpContext.Current.ApplicationInstance.CompleteRequest();



        }


        public static MemoryStream DataTableToExcelXlsx(DataSet tableSet)
        {



            DataTable table = tableSet.Tables[0];

            MemoryStream Result = new MemoryStream();
            ExcelPackage pack = new ExcelPackage();
            ExcelWorksheet ws = pack.Workbook.Worksheets.Add("Monthly Doctors List");
            ws.View.FreezePanes(4, 1);



            //ws.Cells["D1"].Value = "Sheer For MonthYear: ";
            //ws.Cells["D1"].Style.Font.Bold = true;

            //ws.Cells["E1"].Value = MonthDate.ToString();

            ws.Cells["F1"].Value = "Email Address: ";
            ws.Cells["F1"].Style.Font.Bold = true;
            
            try
            {
                ws.Cells["G1"].Value = tableSet.Tables[1].Rows[0][0].ToString();
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

            ws.Column(21).Hidden = true;

            //ws.Cells["M1"].Style.WrapText = true;
            //ws.Cells["M1"].Style.Font.Bold = false;
            //ws.Cells["M1"].Style.Font.Size = 8;



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

            return Result;
        }
        
        #endregion

        #region HelperClasses --Arsal

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