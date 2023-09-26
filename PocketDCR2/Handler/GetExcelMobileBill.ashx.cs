using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using OfficeOpenXml;
using PocketDCR2.Classes;
using PocketDCR2.Form;
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


namespace PocketDCR2.Handler
{
    /// <summary>
    /// Summary description for GetExcelMobileBill1
    /// </summary>
    public class GetExcelMobileBill1 : IHttpHandler
    {


        #region Object Intialization
        NameValueCollection _nv = new NameValueCollection();
        DAL DL = new DAL();
        string employeeid = string.Empty;
        string filename1 = string.Empty; 
        string date;
        #endregion

        #region Database Layer

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

        #endregion

        public void ProcessRequest(HttpContext context)
        {
            string FileName = "BillList";
            date = context.Request.QueryString["Date"];
            string type = context.Request.QueryString["Type"];

            if (type == "D")
            {
                #region Download Work
                


                #endregion
            }
            else if (type == "U")
            {
                uploadwork(context);
            }
            else if (type == "PF")
            {
                Readexcel(context);
            }
        }

       

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

        public void uploadwork(HttpContext contxt)
        {
            contxt.Response.ContentType = "text/plain";
            contxt.Response.Expires = -1;
            try
            {
                HttpPostedFile postedFile = contxt.Request.Files["Filedata"];
                string savepath = "";
                string tempPath = "";
                tempPath = @"C:\AtcoPharma\Excel";
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

        public void Readexcel(HttpContext context)
        {
            string result = string.Empty;
            try
            {
                string savepath = "";
                string tempPath = "";
                tempPath = @"C:\BayerPharma\Excel";
                savepath = tempPath;
                string FileName = context.Request.QueryString["FileName"];
                ReadExcelFile(savepath + @"\" + FileName);
                result = "Your File Has been Processed Successfully";
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }
            context.Response.Write(result);
        }

        private void ReadExcelFile(string FileName)
        {
            #region Commented
            OleDbConnection con = new OleDbConnection();
            DateTime datetime = DateTime.ParseExact(date, "MMMM-yyyy", CultureInfo.InvariantCulture);
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
                    _nv.Clear();
                    _nv.Add("@BillingMonth-Date", datetime.ToString());
                    GetData("sp_deleteMobileBill", _nv);
                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        DataRow dr = ds.Tables[0].Rows[i];
                        string LoginID = dr[0].ToString();
                        string bill = dr[1].ToString();
                        
                        _nv.Clear();
                        _nv.Add("@LoginID-varchar(50)", LoginID.ToString());
                        _nv.Add("@Amount-varchar(255)", bill);
                        _nv.Add("@BillingMonth-Date", datetime.ToString());
                        var data = GetData("sp_insertMobileBill", _nv);

                        FileInfo FI = new FileInfo(the);
                        using (ExcelPackage exp = new ExcelPackage(FI))
                        {
                            ExcelWorksheet exlss = exp.Workbook.Worksheets.First();
                            exlss.Cells[i, 22].Value = "OK"; //remarks;
                            exp.Save();
                        }
                    }
                }

            #endregion
        }
            
    }
}