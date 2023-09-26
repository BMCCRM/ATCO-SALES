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
    /// Summary description for CustomerBrickUploader
    /// </summary>
    public class CustomerBrickUploader : IHttpHandler
    {
        NameValueCollection _nv = new NameValueCollection();
        DAL DL = new DAL();

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
                PocketDCR2.Classes.Constants.ErrorLog("Exception at Store Proc: " + SpName + " & Message: " + exception.Message.ToString());
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
            string Date = context.Request.QueryString["date"];
            string MonthName = Date.Split('-', ' ')[0];
            string year = Date.Split('-', ' ')[1];
            int i = DateTime.ParseExact(MonthName, "MMMM", CultureInfo.CurrentCulture).Month;
            string completedate = i + "/" + "1" + "/" + year + " " + DateTime.Now.TimeOfDay;
            DateTime MonthDate = Convert.ToDateTime(completedate);
            //string EmployeeID = "489";

            string type = context.Request.QueryString["Type"];
            string zone = context.Request.QueryString["zone"];
            string FileName = "CustomerBrickUpload-" + Date;
            if(type == "U")
            {
                UploadWork(context);

            }
            else if (type == "PF")
            {
                ReadExcel(context);
            }
            //context.Response.ContentType = "text/plain";
            //context.Response.Write("Hello World");
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
                //string EmployeeID = contxt.Request.QueryString["emp"];savepath + @"\" +
                ReadExcelFile(savepath + @"\" + FileName, MonthDate);
                //ReadExcelFile(FileName, MonthDate);
                result = "Your File Has been Processed Successfully";
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }
            contxt.Response.Write(result);
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
                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        DataRow dr = ds.Tables[0].Rows[i];
                        //string DocID = dr[0].ToString();
                        //int doid = 0;
                        int row = 1;
                        //if (DocID != string.Empty)
                        //{
                        //    doid = Convert.ToInt32(dr[0].ToString());
                        //}
                        //else
                        //{
                        //    doid = 0;
                        //}

                        string remarks = ProcessTheCustomer(dr[0].ToString(), dr[1].ToString(), dr[2].ToString() , dr[3].ToString(), dr[4].ToString(), dr[5].ToString(), dr[6].ToString(), dr[7].ToString(), MonthDate);
                        FileInfo FI = new FileInfo(the);
                        using (ExcelPackage exp
                            = new ExcelPackage(FI))
                        {
                            ExcelWorksheet exlss = exp.Workbook.Worksheets.First();
                            exlss.Cells[row, 7].Value = remarks;
                            exp.Save();
                        }
                        row++;
                    }
                }
            #endregion
        }

        private string ProcessTheCustomer(string DSTBID, string CUSTID, string CT, string CUSTNAME, string ADDRESS, string City, string TOWNID, string TOWN, DateTime MonthDate)
        {
            //if (Qualification == "")
            //{
            //    Qualification = "DR";
            //}
            //if (Designation == "")
            //{
            //    Designation = "DRs";
            //}


            string reslt = string.Empty;
            _nv.Clear();
            _nv.Add("@DSTBID-varchar(100)", DSTBID.ToString());
            _nv.Add("@CUSTID-VARCHAR(100)", CUSTID.ToString());
            _nv.Add("@CT-VARCHAR(10)", CT.ToString());
            _nv.Add("@CUSTNAME-NVARCHAR(max)", CUSTNAME.ToString());
            _nv.Add("@ADDRESS -NVARCHAR(max)", ADDRESS.ToString());
            _nv.Add("@City-VARCHAR(200)", City.ToString());
            _nv.Add("@TOWNID-VARCHAR(200)", TOWNID.ToString());
            _nv.Add("@TOWN-VARCHAR(200)", TOWN.ToString());
            _nv.Add("@month-VARCHAR(100)", MonthDate.ToString());

            DataSet ds = GetData("sp_UploadCustomerBrickExcel", _nv);
            if (ds != null)
                if (ds.Tables[0].Rows.Count != 0)
                {
                    reslt = ds.Tables[0].Rows[0][0].ToString();
                }
            return reslt;
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
                contxt.Response.StatusCode = 200;

            }
            catch (Exception ex)
            {
                contxt.Response.Write("Error: " + ex.Message);
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