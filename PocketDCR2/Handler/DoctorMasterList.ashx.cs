using OfficeOpenXml;
using PocketDCR2.Classes;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;
using LinqToExcel;
using System.Configuration;

namespace PocketDCR2.Handler
{
    /// <summary>
    /// Summary description for DoctorMasterList
    /// </summary>
    public class DoctorMasterList : IHttpHandler
    {

        #region Object Intialization
        NameValueCollection _nv = new NameValueCollection();
        DAL DL = new DAL();
        string employeeid = string.Empty;
        int EmployeeId = 0;
        #endregion


        public void ProcessRequest(HttpContext context)
        {

            string FileName = "MasterDoctorsList";
            string type = context.Request.QueryString["Type"];
            _nv.Clear();
            if (type == "D")
            {
                #region Download Work
                _nv.Clear();
                DataSet dsOldDoctors = new DataSet();
                dsOldDoctors = GetData("sp_SelectDoctorDetailExport_ForMultipleAddress", _nv);
                MemoryStream ms = DataTableToExcelXlsx(dsOldDoctors.Tables[0]);
                ms.WriteTo(context.Response.OutputStream);
                context.Response.ContentType = "application/vnd.ms-excel";
                context.Response.AddHeader("Content-Disposition", "attachment;filename=" + FileName.Replace(" ", string.Empty).Trim() + ".xlsx");
                context.Response.StatusCode = 200;
                context.Response.End();
                #endregion
            }
            else if (type == "U")
            {
                UploadExcel(context);
            }
            else if (type == "PF")
            {
                ReadExcel(context);
            }
        }

        #region Export Master List Doctor

        private static MemoryStream DataTableToExcelXlsx(DataTable dt)
        {
            MemoryStream Result = new MemoryStream();
            ExcelPackage pack = new ExcelPackage();
            ExcelWorksheet ws = pack.Workbook.Worksheets.Add("MasterDoctorsList");
            //ws.View.FreezePanes(2, 15);
            //ws.View.FreezePanes(3, 15);
            ws.Column(1).Hidden = true;
            ws.Cells[1, 2].Value = "NOTE: N= New Doctor U= Update Doctor D= Delete Doctor C=Continue (Flag must be provided,Otherwise System will not accept the record";
            ws.Cells["B1:O1"].Merge = true;
            ws.Cells[2, 1].Style.Font.Bold = true;
            //ws.Cells[2, 2].Style.Font.Bold = true;
            ws.Cells[2, 2].Style.Font.Bold = true;
            ws.Cells[2, 3].Style.Font.Bold = true;
            ws.Cells[2, 4].Style.Font.Bold = true;
            ws.Cells[2, 5].Style.Font.Bold = true;
            ws.Cells[2, 6].Style.Font.Bold = true;
            ws.Cells[2, 7].Style.Font.Bold = true;
            ws.Cells[2, 8].Style.Font.Bold = true;
            ws.Cells[2, 9].Style.Font.Bold = true;
            ws.Cells[2, 10].Style.Font.Bold = true;
            ws.Cells[2, 11].Style.Font.Bold = true;
            ws.Cells[2, 12].Style.Font.Bold = true;
            ws.Cells[2, 13].Style.Font.Bold = true;
            ws.Cells[2, 14].Style.Font.Bold = true;
            ws.Cells[2, 15].Style.Font.Bold = true;
            ws.Cells[2, 16].Style.Font.Bold = true;
            ws.Cells[2, 17].Style.Font.Bold = true;
            ws.Cells[2, 18].Style.Font.Bold = true;

            ws.Cells[2, 1].Value = "DoctorId";
            //ws.Cells[2, 2].Value = "Doctor ID";
            ws.Cells[2, 2].Value = "Doctor Name";
            ws.Cells[2, 3].Value = "Qualification";
            ws.Cells[2, 4].Value = "Designation";
            ws.Cells[2, 5].Value = "Speciality";
            ws.Cells[2, 6].Value = "Class";
            ws.Cells[2, 7].Value = "Frequency";
            ws.Cells[2, 8].Value = "Brick";
            ws.Cells[2, 9].Value = "City";
            ws.Cells[2, 10].Value = "MorningAddress";
            ws.Cells[2, 11].Value = "MorningLongitude";
            ws.Cells[2, 12].Value = "MorningLatitude";
            ws.Cells[2, 13].Value = "EveningAddress";
            ws.Cells[2, 14].Value = "EveningLongitude";
            ws.Cells[2, 15].Value = "EveningLatitude";
            ws.Cells[2, 16].Value = "KOL";
            ws.Cells[2, 17].Value = "Status";
            ws.Cells[2, 18].Value = "Flag";

            int col = 1;
            int row = 3;
            foreach (DataRow rw in dt.Rows)
            {
                foreach (DataColumn cl in dt.Columns)
                {
                    if (rw[cl.ColumnName] != DBNull.Value)
                        //if (cl.ColumnName != "DoctorId")
                        {
                            ws.Cells[row, col].Value = rw[cl.ColumnName].ToString();
                            col++;
                        }
                }
                ws.Cells[row, 18].Value = "C";
                row++;
                col = 1;
            }
            pack.SaveAs(Result);
            return Result;
        }

        #endregion

        #region Upload Master List Doctor

        private void UploadExcel(HttpContext contxt)
        {
            DateTime Date = DateTime.Now;

            contxt.Response.ContentType = "text/plain";
            contxt.Response.Expires = -1;
            try
            {
                HttpPostedFile postedFile = contxt.Request.Files["Filedata"];
                string savepath = "";
                string tempPath = "";
                tempPath = @ConfigurationManager.AppSettings["Excel"].ToString();
                savepath = tempPath;
                string filenamewithoutextension = System.IO.Path.GetFileNameWithoutExtension(postedFile.FileName);
                string extension = System.IO.Path.GetExtension(postedFile.FileName);
                string filename = filenamewithoutextension + Date.ToString("dd-MM-yyyyHHmmss") + extension;
                if (!Directory.Exists(savepath))
                    Directory.CreateDirectory(savepath);
                postedFile.SaveAs(savepath + @"\" + filename);
                contxt.Response.Write(tempPath + @"\" + filename);
                //filename1 = tempPath + "/" + filename;
                contxt.Response.StatusCode = 200;

            }
            catch (Exception ex)
            {
                contxt.Response.Write("Error: " + ex.Message);
                contxt.Response.StatusCode = 400;
            }
        }

        private void ReadExcel(HttpContext contxt)
        {
            string result = string.Empty;
            try
            {
                string savepath = "";
                string tempPath = "";
                tempPath = ConfigurationManager.AppSettings["Excel"].ToString();
                savepath = tempPath;
                string FileNameWithPath = contxt.Request.QueryString["FileName"];
                //ReadExcelFile(savepath + @"\" + FileName, MonthDate);
                ReadExcelFile(FileNameWithPath);
                result = "Your File Has been Processed Successfully";
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }
            contxt.Response.Write(result);
        }

        private void ReadExcelFile(string FileNameWithPath)
        {
            #region Commented

            /*string sheetname = "MasterDoctorsList";
            var excelFile = new ExcelQueryFactory(FileNameWithPath);

            var newlist = (from a in excelFile.Worksheet<MasterDoctorData>(sheetname) select a).ToList();
            if (newlist != null)
            {
                for (int i = 1; i < newlist.Count; i++)
                {

                }
            }*/
            OleDbConnection con = new OleDbConnection();

            string part1 = "Provider=Microsoft.ACE.OLEDB.12.0;";
            string part2 = @"Data Source=" + FileNameWithPath + ";";
            string part3 = "Extended Properties='Excel 12.0;HDR=YES;'";
            string connectionString = part1 + part2 + part3;
            con.ConnectionString = connectionString;
            FileInfo FIforexcel = new FileInfo(FileNameWithPath);
            ExcelPackage Ep = new ExcelPackage(FIforexcel);
            OleDbCommand cmnd = new OleDbCommand("Select * from [" + Ep.Workbook.Worksheets.FirstOrDefault().Name + "$]", con);
            OleDbDataAdapter adapter = new OleDbDataAdapter(cmnd);
            con.Open();
            DataSet ds = new DataSet();
            adapter.Fill(ds);
            con.Close();
            if (ds != null)
                if (ds.Tables[0].Rows.Count != 0)
                {
                    //_nv.Clear();
                    //_nv.Add("@EmployeeID-INT", employeeid);
                    //bool reslt = DL.InserData("PRO_DELETE_DOCTOR", _nv);
                    /*Deleteing Old Doctors of Mrs*/
                    /*Doctor Id	Doctor Code	Doctor Name	Qualification	Designation	Speciality	Class	Frequency	Address	City	Brick	KOL	STATUS	Flag*/
                    FileInfo FI = new FileInfo(FileNameWithPath);
                    for (int i = 1; i < ds.Tables[0].Rows.Count; i++)
                    {
                        DataRow dr = ds.Tables[0].Rows[i];
                        string DocID = dr[0].ToString();
                        int DoctorId = 0;
                        if (DocID != string.Empty)
                        {
                            try { DoctorId = Convert.ToInt32(dr[0].ToString()); }
                            catch (Exception e) { DoctorId = 0; }
                        }
                        else
                        {
                            DoctorId = 0;
                        }

                        //string DoctorCode = dr[1].ToString();
                        string DoctorName = dr[1].ToString();
                        string Qualification = dr[2].ToString();
                        string Designation = dr[3].ToString();
                        string Speciality = dr[4].ToString();
                        string Class = dr[5].ToString();
                        string Frequency = dr[6].ToString();
                        string Brick = dr[7].ToString();
                        string City = dr[8].ToString();

                        string MorningAddress = dr[9].ToString();
                        string MorningLongitude = dr[10].ToString();
                        string MorningLatitude = dr[11].ToString();
                        string EveningAddress = dr[12].ToString();
                        string EveningLongitude = dr[13].ToString();
                        string EveningLatitude = dr[14].ToString();



                        // string Address = dr[9].ToString();
                        string KOL = dr[15].ToString();
                        string isActive = dr[16].ToString();
                        //string Latitude = dr[12].ToString();
                        //string Longitude = dr[13].ToString();
                        //string GeoLocationAddress = dr[14].ToString();
                        string Flag = dr[17].ToString();

                        if (Flag != "")
                        {
                            string remarks = ProcessTheDoctor(DoctorId,
                                //DoctorCode, 
                                                DoctorName, Qualification,
                                                Designation, Speciality,
                                                Class, Frequency, Brick, City,
                                                MorningAddress, MorningLongitude, MorningLatitude,
                                                EveningAddress, EveningLongitude, EveningLatitude, KOL, isActive,
                                // Latitude, Longitude, GeoLocationAddress,
                                                Flag);
                            //using (ExcelPackage exp
                            //    = new ExcelPackage(FI))
                            //{
                            //    ExcelWorksheet exlss = exp.Workbook.Worksheets.First();
                            //    exlss.Cells[(i+2), 17].Value = "OK";
                            //    exp.Save();
                            //}
                        }

                    }
                }
            #endregion
        }



        private string ProcessTheDoctor(int DoctorId,
            //string Code,
             string DoctorName, string Qualification,
             string Designation, string Sepeciality,
             string Class, string Freq, string brick, string City,
             string MorningAddress, string MorningLongitude, string MorningLatitude,
             string EveningAddress, string EveningLongitude, string EveningLatitude, string KOL, string IsActive,
            // string Latitude, string Longitude, string GeoLocationAddress,
             string Flag)
        {
            if (Qualification == "")
            {
                Qualification = "DR";
            }
            if (Designation == "")
            {
                Designation = "DRs";
            }


            string reslt = string.Empty;
            _nv.Clear();
            _nv.Add("@DoctorId-INT", DoctorId.ToString());
            //_nv.Add("@DocCode-VARCHAR-50", Code.ToString());
            _nv.Add("@DocCode-VARCHAR-50", "0");
            _nv.Add("@DocName-VARCHAR-50", DoctorName.ToString());
            _nv.Add("@Qualification-VARCHAR-50", Qualification.ToString());
            _nv.Add("@Designation-VARCHAR-50", Designation.ToString());
            _nv.Add("@Speciality-VARCHAR-50", Sepeciality.ToString());
            _nv.Add("@Class-VARCHAR-50", Class.ToString());
            _nv.Add("@Frequency-VARCHAR-50", Freq.ToString());
            _nv.Add("@Brick-VARCHAR(250)", brick.ToString());
            _nv.Add("@City-VARCHAR-50", City.ToString());
            // _nv.Add("@Address-VARCHAR-50", address.ToString());
            //_nv.Add("@KOL-VARCHAR-50", KOL.ToString());
            //_nv.Add("@isActive-VARCHAR-50", IsActive.ToString());


            _nv.Add("@MorningAddress-VARCHAR-50", MorningAddress.ToString());
            _nv.Add("@MorningLongitude-VARCHAR-50", MorningLongitude.ToString());
            _nv.Add("@MorningLatitude-VARCHAR-50", MorningLatitude.ToString());
            _nv.Add("@EveningAddress-VARCHAR-50", EveningAddress.ToString());
            _nv.Add("@EveningLongitude-VARCHAR-50", EveningLongitude.ToString());
            _nv.Add("@EveningLatitude-VARCHAR-50", EveningLatitude.ToString());

            _nv.Add("@KOL-VARCHAR-50", KOL.ToString());
            _nv.Add("@isActive-VARCHAR-50", IsActive.ToString());
            //_nv.Add("@Latitude-VARCHAR-50", Latitude.ToString());
            //_nv.Add("@Longitude-VARCHAR-50", Longitude.ToString());
            //_nv.Add("@GeoLocationAddress-VARCHAR-MAX", GeoLocationAddress.ToString());
            _nv.Add("@Flag-VARCHAR-50", Flag.ToString());
            DataSet ds = GetData("AddXLXDoctorMasterList_ForMultipleAddress", _nv);
            if (ds != null)
                if (ds.Tables[0].Rows.Count != 0)
                {
                    reslt = ds.Tables[0].Rows[0][0].ToString();
                }
            return reslt;
        }
        #endregion

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

        public System.Data.DataSet GetData(String SpName, NameValueCollection NV)
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


        public class MasterDoctorData
        {
            public string DoctorId{ get; set; }
            public string DoctorCode{ get; set; }
            public string DoctorName{ get; set; }
            public string Qualification{ get; set; }
            public string Designation{ get; set; }
            public string Speciality{ get; set; }
            public string Class{ get; set; }
            public string Frequency{ get; set; }
            public string City{ get; set; }
            public string Address{ get; set; }
            public string KOL{ get; set; }
            public string Status{ get; set; }
            public string Latitude{ get; set; }
            public string Longitude{ get; set; }
            public string GeoLocationAddress{ get; set; }
            public string Flag { get; set; }

            
        }
        
    }
}