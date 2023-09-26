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
    public class GetExcel : IHttpHandler
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
                PocketDCR2.Classes.Constants.ErrorLog("Exception at Store Proc: "+SpName +" & Message: "+exception.Message.ToString() );
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
            //string EmployeeName = context.Request.QueryString["EmployeeName"];
           
            string Date = context.Request.QueryString["date"];
            string MonthName = Date.Split('-', ' ')[0];
            string year = Date.Split('-', ' ')[1];
            int i = DateTime.ParseExact(MonthName, "MMMM", CultureInfo.CurrentCulture).Month;
            string completedate = i + "/" + "1" + "/" + year + " " + DateTime.Now.TimeOfDay;
            DateTime MonthDate = Convert.ToDateTime(completedate);
            //string EmployeeID = "489";
          
            string type = context.Request.QueryString["Type"];
            string zone = context.Request.QueryString["zone"];
            string FileName =  "DoctorList-" + Date;

            if (type == "D")
            {
                #region Download Work
                _nv.Clear();
                _nv.Add("@Monthd-int", MonthDate.Month.ToString());
                _nv.Add("@Year-int", MonthDate.Year.ToString());
                _nv.Add("@Zone-int", zone.ToString());
                DataSet dsOldDoctors = GetData("MRDoctorExcelFile2", _nv);
                MemoryStream ms = GetExcel.DataTableToExcelXlsx(dsOldDoctors.Tables[0]);
                ms.WriteTo(context.Response.OutputStream);
                context.Response.ContentType = "application/vnd.ms-excel";
                context.Response.AddHeader("Content-Disposition", "attachment;filename=" + FileName.Replace(" ", string.Empty).Trim() + ".xlsx");
                context.Response.StatusCode = 200;
                context.Response.End();

                //_nv.Clear();
                //_nv.Add("@EmployeeID-INT", EmployeeID);
                //DataSet dsforemployee = DL.GetData("SELECTEMPLOYEE", _nv);
                //if (dsforemployee != null)
                //    if (dsforemployee.Tables[0].Rows.Count != 0)
                //    {
                //        EmployeeName = dsforemployee.Tables[0].Rows[0][0].ToString() + "-test";
                //        _nv.Clear();
                //        _nv.Add("@EmployeeID-INT", EmployeeID);
                //        DataSet dsOldDoctors = GetData("MRDoctorExcelFile2", _nv);
                //        MemoryStream ms = GetExcel.DataTableToExcelXlsx(dsOldDoctors.Tables[0]);
                //        ms.WriteTo(context.Response.OutputStream);
                //        context.Response.ContentType = "application/vnd.ms-excel";
                //        context.Response.AddHeader("Content-Disposition", "attachment;filename=" + EmployeeName.Replace(" ", string.Empty).Trim() + ".xlsx");
                //        context.Response.StatusCode = 200;
                //        context.Response.End();
                //    }
                #endregion
            }
            else if (type == "U")
            {
                #region Upload Work
                UploadWork(context);
                #endregion
            }
            else if (type == "PF")
            {
                ReadExcel(context);
            }
            else if (type == "ALL")
            {
                SqlConnection Con = new SqlConnection("Data Source=(local); Initial Catalog=PocketDCRNew; User ID=sa;Password=Pakistan1234");
                string Query = @"   Select DZR.DivisionID,Div.Name,DZR.ZoneID, Zn.Name,DZR.RegionID,Reg.Name,M.ID,M.Name as 'EMPName' 
                                    from DivZoneRegions DZR LEFT OUTER JOIN Divisions AS Div ON DZR.DivisionID = DIV.ID
                                    LEFT OUTER JOIN zones AS Zn ON DZR.ZoneID = ZN.ID 
                                    LEFT OUTER JOIN Regions AS Reg ON DZR.RegionID = Reg.ID 
                                    LEFT OUTER JOIN MRs M ON DZR.RegionID = M.RegionID;";
                SqlCommand cmnd = new SqlCommand(Query, Con);
                SqlDataAdapter adap = new SqlDataAdapter(cmnd);
                DataSet ds = new DataSet();
                adap.Fill(ds);
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    string Quer = "";
                    Quer = @"   SELECT Distinct DOC.ID AS DoctorId,
                                Cast(DOS.DocReferenceID as int) as DoctorCode,
                                --DOS.DoctorCode,
                                DOC.Name DoctorName, DOC.Qualification AS Qualification,DOC.Designation AS Designation,SPEC.Name AS Speciality,dc.Name AS Class,DOS.frequency as Frequency,DOC.[Address] AS 'Address',
                                DOC.City,DOC.Brick AS Brick,DOC.KOL,DOS.IsActive AS STATUS,'C' AS Flag
                                FROM MRDoctors DOS 
                                LEFT OUTER JOIN Doctors DOC ON DOS.DocID = DOC.ID LEFT OUTER JOIN
                                dbo.Specialty AS SPEC ON DOC.SpecialtyID = SPEC.ID LEFT OUTER JOIN
                                dbo.Class AS dc ON DOS.ClassID = dc.ID LEFT OUTER JOIN
                                dbo.Specialty AS s ON s.ID = DOC.SpecialtyID
                                WHERE DOS.MR_ID = " + dr["ID"].ToString() + "Order by Cast(DOS.DocReferenceID as int)";
                    cmnd = new SqlCommand(Quer, Con);
                    adap = new SqlDataAdapter(cmnd);
                    DataSet dsrecord = new DataSet();
                    adap.Fill(dsrecord);
                    GetExcel.DataTableToExcelXlsx2(dsrecord.Tables[0], dr["ID"].ToString().Trim(), dr["EMPName"].ToString().Trim());
                }
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
        public static MemoryStream DataTableToExcelXlsx(DataTable table)
        {
            MemoryStream Result = new MemoryStream();
            ExcelPackage pack = new ExcelPackage();
            ExcelWorksheet ws = pack.Workbook.Worksheets.Add("DoctorList");
            ws.View.FreezePanes(2, 15);
            ws.View.FreezePanes(3, 15);
            ws.Column(1).Hidden = true;
            ws.Cells[1, 2].Value = "NOTE: N= New Doctor U= Update Doctor D= Delete Doctor C=Continue (Flag must be provided,Otherwise System will not accept the record";
            ws.Cells["B1:O1"].Merge = true;
            ws.Cells[2, 1].Value = "DocSPOID";
            ws.Cells[2, 2].Value = "LoginID";
            ws.Cells[2, 3].Value = "EmployeeName";
            ws.Cells[2, 4].Value = "Doctor Code";
            //ws.Cells[2, 5].Value = "ProfessionalID";
            ws.Cells[2, 5].Value = "Doctor Name";
            ws.Cells[2, 6].Value = "Mobile Number";
            ws.Cells[2, 7].Value = "Qualification";
            ws.Cells[2, 8].Value = "Designation";
            ws.Cells[2, 9].Value = "Speciality";
            ws.Cells[2, 10].Value = "Class";
            ws.Cells[2, 11].Value = "CallObjective";
            //ws.Cells[2, 13].Value = "AccountID";
            //ws.Cells[2, 14].Value = "AccountName";
            //ws.Cells[2, 15].Value = "AccountType";
            //ws.Cells[2, 16].Value = "AccountSubType";
            ws.Cells[2, 12].Value = "Address";
            ws.Cells[2, 13].Value = "City";
            ws.Cells[2, 14].Value = "Brick";
            ws.Cells[2, 15].Value = "KOL";
            ws.Cells[2, 16].Value = "STATUS";
            //ws.Cells[2, 17].Value = "Potential";
            //ws.Cells[2, 18].Value = "Propensity";
            ws.Cells[2, 17].Value = "Latitude";
            ws.Cells[2, 18].Value = "Longitude";
            ws.Cells[2, 19].Value = "Address";
            ws.Cells[2, 20].Value = "Flag";
            ws.Cells[2, 21].Value = "Remarks";
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

        private void ReadExcelFile(string FileName, DateTime MonthDate)
        {
            #region Commented
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
            if (ds != null)
                if (ds.Tables[0].Rows.Count != 0)
                {
                    //_nv.Clear();
                    //_nv.Add("@EmployeeID-INT", employeeid);
                    //bool reslt = DL.InserData("PRO_DELETE_DOCTOR", _nv);
                    /*Deleteing Old Doctors of Mrs*/
                    /*Doctor Id	Doctor Code	Doctor Name	Qualification	Designation	Speciality	Class	Frequency	Address	City	Brick	KOL	STATUS	Flag*/
                    for (int i = 1; i < ds.Tables[0].Rows.Count; i++)
                    {
                        DataRow dr = ds.Tables[0].Rows[i];
                        string DocID = dr[0].ToString();
                        int doid = 0;
                        int row = 3;
                        if (DocID != string.Empty)
                        {
                            doid = Convert.ToInt32(dr[0].ToString());
                        }
                        else
                        {
                            doid = 0;
                        }      
                             
                        string remarks = ProcessTheDocor(doid, dr[1].ToString(), dr[3].ToString(), dr[4].ToString(), dr[5].ToString(), dr[6].ToString(), dr[7].ToString(), dr[8].ToString(), dr[9].ToString(), dr[10].ToString(), dr[11].ToString(), dr[12].ToString(), dr[13].ToString(), dr[14].ToString(), dr[15].ToString(), dr[16].ToString(), dr[17].ToString(), dr[18].ToString(), dr[19].ToString(), MonthDate);
                        FileInfo FI = new FileInfo(the);
                        using (ExcelPackage exp
                            = new ExcelPackage(FI))
                        {
                            ExcelWorksheet exlss = exp.Workbook.Worksheets.First();
                            exlss.Cells[row, 21].Value = remarks;
                            exp.Save();
                        }
                        row++;
                    }
                }
            #endregion
        }

        private string ProcessTheDocor(int doSPO, string LoginId, string Code, string DoctorName, string MobileNumber, string Qualification, string Designation, string Sepeciality, string Class, string Freq, string addres, string City, string Brik, string KOL, string Stat, string Latitude, string Longitude, string MapAddress, string Flag, DateTime MonthDate)
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
            _nv.Add("@DocSPO-INT", doSPO.ToString());
            _nv.Add("@Territory-VARCHAR(50)", LoginId.ToString());
            _nv.Add("@DocCode-VARCHAR(50)", Code.ToString());
            //_nv.Add("@ProfessionalID-VARCHAR(50)", professionalID.ToString());
            _nv.Add("@DocName-VARCHAR(50)", DoctorName.ToString());
            _nv.Add("@Mobile-VARCHAR(50)", MobileNumber.ToString());
            _nv.Add("@Qualification-VARCHAR(50)", Qualification.ToString());
            _nv.Add("@Designation-VARCHAR(50)", Designation.ToString());
            _nv.Add("@Speciality-VARCHAR(50)", Sepeciality.ToString());
            _nv.Add("@Class-VARCHAR(50)", Class.ToString());
            _nv.Add("@Frequency-VARCHAR(50)", Freq.ToString());
            //_nv.Add("@AccountID-VARCHAR(100)", accountID.ToString());
            //_nv.Add("@AccountName-VARCHAR(100)", AccountName.ToString());
            //_nv.Add("@AccountType-VARCHAR(100)", AccountType.ToString());
            //_nv.Add("@AccountSubType-VARCHAR(100)", AccountSubType.ToString());
            _nv.Add("@Address-VARCHAR(50)", addres.ToString());
            _nv.Add("@City-VARCHAR(50)", City.ToString());
            _nv.Add("@Brick-VARCHAR(50)", Brik.ToString());
            _nv.Add("@KOL-VARCHAR(50)", KOL.ToString());
            _nv.Add("@Status-VARCHAR(50)", Stat.ToString());
            _nv.Add("@Flag-VARCHAR(50)", Flag.ToString());
            //_nv.Add("@Potential-VARCHAR(50)", Potential.ToString());
            //_nv.Add("@Propensity-VARCHAR(50)", Propensity.ToString());
            _nv.Add("@Latitude-VARCHAR(50)", Latitude.ToString());
            _nv.Add("@Longitude-VARCHAR(50)", Longitude.ToString());
            _nv.Add("@MapAddress-VARCHAR(200)", MapAddress.ToString());
            _nv.Add("@month-VARCHAR(100)", MonthDate.ToString());

            DataSet ds = GetData("AddXLXDoctor2", _nv);
            if (ds != null)
                if (ds.Tables[0].Rows.Count != 0)
                {
                    reslt = ds.Tables[0].Rows[0][0].ToString();
                }
            return reslt;
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

        private void UploadWork(HttpContext contxt)
        {
            //employeeid = contxt.Request.QueryString["emp"];
            string Date = contxt.Request.QueryString["date"];
            DateTime MonthDate = Convert.ToDateTime(Date);

            contxt.Response.ContentType = "text/plain";
            contxt.Response.Expires = -1;
            try
            {
                HttpPostedFile postedFile = contxt.Request.Files["Filedata"];
                string savepath = "";
                string tempPath = "";
                tempPath = ConfigurationManager.AppSettings["Excel"].ToString();
                savepath = tempPath;
                string filename = postedFile.FileName;
                if (!Directory.Exists(savepath))
                    Directory.CreateDirectory(savepath);
                postedFile.SaveAs(savepath + @"\" + filename);
                contxt.Response.Write(tempPath + "/" + filename);
                filename1 = tempPath + "/" + filename;
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
    }
}