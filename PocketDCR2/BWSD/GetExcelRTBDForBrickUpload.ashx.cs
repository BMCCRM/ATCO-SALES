using LinqToExcel;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using PocketDCR.CustomMembershipProvider;
using PocketDCR2.BWSD.Class;
using PocketDCR2.Classes;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;

namespace PocketDCR2.BWSD
{
    /// <summary>
    /// Summary description for GetExcelRTBD
    /// </summary>
    public class GetExcelRTBDForBrickUpload : IHttpHandler, System.Web.SessionState.IRequiresSessionState
    {
        #region Object Intialization

        NameValueCollection _nv = new NameValueCollection();
        DAL DL = new DAL();
        private HudsonCRMEntities2 db = new HudsonCRMEntities2();
        string employeeid = string.Empty;
        string filename1 = string.Empty;
        string EmailAddress = string.Empty;
        string guid = string.Empty;

        #endregion

        DAL dl = new DAL();

        private System.Data.DataSet GetData(String SpName, SqlCommand command)
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
                //PocketDCR2.Classes.Constants.SampleErrorLog("ERROR : Proc:" + SpName + "and MESSAGE::" + exception.Message + "STACK" + exception.StackTrace.ToString());

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
            string type = context.Request.QueryString["Type"];
            if (type == "U")
            {
                uploadwork(context);
            }

            else if (type == "D")
            {
                #region Download Work
                _nv.Clear();
                DataSet dsSPOsList = dl.GetData("Sp_city", _nv);
                MemoryStream ms = RTBDExcel(dsSPOsList);
                ms.WriteTo(context.Response.OutputStream);
                context.Response.ContentType = "application/vnd.ms-excel";
                context.Response.AddHeader("Content-Disposition", "attachment;filename=" + "RegionToBrickSheet".Replace(" ", string.Empty).Trim() + ".xlsx");
                context.Response.StatusCode = 200;
                context.Response.End();
                #endregion
            }
            else if (type == "DD")
            {
                #region Download Work
                _nv.Clear();
                //_nv.Add("@Monthd-int", MonthDate.Month.ToString());
                DataSet dsData = DL.GetData("sp_GetSPOwithBricks", _nv);
                MemoryStream ms = DataTableToExcel(dsData.Tables[0]);
                ms.WriteTo(context.Response.OutputStream);
                context.Response.ContentType = "application/vnd.ms-excel";
                context.Response.AddHeader("Content-Disposition", "attachment;filename=SpoBricks.xlsx");
                context.Response.StatusCode = 200;
                context.Response.End();


                #endregion
            }
            else if (type == "RTBD")
            {
                RTBDReadexcel(context);
            }
            else if (type == "RTBDProcess")
            {
                RTBDDataProcess(context);
            }
        }

        public void uploadwork(HttpContext contxt)
        {
            //string Date = contxt.Request.QueryString["date"];
            //DateTime MonthDate = Convert.ToDateTime(Date);

            HttpContext.Current.Session["guid"] = Guid.NewGuid().ToString();

            contxt.Response.ContentType = "text/plain";
            contxt.Response.Expires = -1;
            try
            {
                HttpPostedFile postedFile = contxt.Request.Files["file"];

                string savepath = "";
                string tempPath = "";
                tempPath = @"C:\PocketDCR2\Excel\RTBD";
                savepath = tempPath;
                string filename = HttpContext.Current.Session["guid"] + postedFile.FileName;
                if (!Directory.Exists(savepath))
                    Directory.CreateDirectory(savepath);
                postedFile.SaveAs(savepath + @"\" + filename);

                contxt.Response.Write(filename);
                filename1 = tempPath + "/" + filename;
                contxt.Response.StatusCode = 200;
            }
            catch (Exception ex)
            {
                contxt.Response.Write("Error: " + ex.Message);
            }
        }

        public void RTBDReadexcel(HttpContext context)
        {
            string result = string.Empty;
            try
            {
                string savepath = "";
                string tempPath = "";
                tempPath = @"C:\PocketDCR2\Excel\RTBD";
                savepath = tempPath;
                string FileName = context.Request.QueryString["PFileName"];
                result = RTBDReadExcelFile(savepath + @"\" + FileName);
                if (result == "Success")
                    result = "Your File Has been Processed Successfully";
                else
                    result = "Your File Not Processed Successfully";
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }
            context.Response.Write(result);
        }

        private string RTBDReadExcelFile(string FileName)
        {
            try
            {
                #region Reading Excel To DataTable

                PocketDCR2.Classes.Constants.ErrorLog("START READING");
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

                PocketDCR2.Classes.Constants.ErrorLog("CLOSE READING");
                #endregion

                #region Working On Read Excel

                if (ds != null)
                {
                    PocketDCR2.Classes.Constants.ErrorLog("START PROC ");

                    // string sheetTypeCode = ds.Tables[0].Columns[11].ColumnName;
                    string excelFileName, emailAddress, UserId, EmailStatus, Remarks;
                    excelFileName = FileName;
                    emailAddress = ds.Tables[0].Rows[0][3].ToString();
                    emailAddress = emailAddress.Replace('#', '.');
                    UserId = HttpContext.Current.Session["CurrentUserId"].ToString();
                    EmailStatus = "0";
                    Remarks = "NotProcess";

                    DataSet dsR = DL.GetData("sp_GenerateUploadDistributerToBricksMasterBatch_NEW", new NameValueCollection() {
                        { "@ExcelFileName-varchar(max)", excelFileName }, 
                        { "@EmailAddress-varchar(max)", emailAddress },
                        { "@UserId-varchar(max)", UserId },
                        { "@EmailStatus-varchar(max)", EmailStatus },
                        { "@Remarks-varchar(max)", Remarks }}
                    );
                    string batchID = dsR.Tables[0].Rows[0][0].ToString();

                    DataTable dt = new DataTable();

                    dt.Columns.Add("BatchID", typeof(Int32));
                    dt.Columns.Add("Region", typeof(String));
                    dt.Columns.Add("SubRegion", typeof(String));
                    dt.Columns.Add("District", typeof(String));
                    dt.Columns.Add("DSTBID", typeof(String));
                    dt.Columns.Add("Distributor", typeof(String));
                    dt.Columns.Add("DSTBCode", typeof(String));
                    dt.Columns.Add("Dist_CityCode", typeof(String));
                    dt.Columns.Add("DistributorCity", typeof(String));
                    dt.Columns.Add("BrickCode", typeof(String));
                    dt.Columns.Add("BrickName", typeof(String));
                    dt.Columns.Add("Brick_CityCode", typeof(String));
                    dt.Columns.Add("BrickCity", typeof(String));
                    dt.Columns.Add("Flag", typeof(String));

                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        string REGION = "", SUBREGION = "", DISTRICT = "", DSTBID = "", Distributor = "", DISTCODE = "", Dist_CityCode = "", DistributorCity = "", BRICKCODE = "", BRICKNAME = "", Brick_CityCode = "", BrickCity = "";

                        DataRow dr = ds.Tables[0].Rows[i];
                        REGION = dr[0].ToString();
                        SUBREGION = dr[1].ToString();
                        DISTRICT = dr[2].ToString();
                        DSTBID = dr[3].ToString();
                        Distributor = dr[4].ToString();
                        DISTCODE = dr[5].ToString();
                        Dist_CityCode = dr[6].ToString();
                        DistributorCity = dr[7].ToString();
                        BRICKCODE = dr[8].ToString();
                        BRICKNAME = dr[9].ToString();
                        Brick_CityCode = dr[10].ToString();
                        BrickCity = dr[11].ToString();

                        dt.Rows.Add(batchID, REGION, SUBREGION, DISTRICT, DSTBID, Distributor, DSTBID, DISTCODE, Dist_CityCode, BRICKCODE, BRICKNAME, Brick_CityCode, BrickCity, "U");

                    }

                    SqlCommand command = new SqlCommand();
                    command.Parameters.AddWithValue("RecordValues", dt);
                    var results = GetData("sp_CreateBatchRecordsForDistributerToBricksMasterData_New", command);

                    if (results != null)
                    {
                        _nv.Clear();
                        var temptodsr = DL.GetData("Sp_ProcessRTBDtemp", null);
                    }
                }
                return "Success";

                #endregion

                #region Commented
                //var currentUser = "";
                //int lastInsertedId = 0;
                //var Email = "";
                //int UserId = 0;
                //try
                //{
                //    currentUser = HttpContext.Current.Session["SystemUser"].ToString();
                //    Email = HttpContext.Current.Session["Email"].ToString();
                //    UserId = Convert.ToInt32(HttpContext.Current.Session["CurrentUserId"]);

                //    var tempPath = @"C:\PocketDCR2\Excel\RTBD\";

                //    tbl_UploadDistributerToBricksMaster uploadDistributerToBricksMaster = new tbl_UploadDistributerToBricksMaster();
                //    uploadDistributerToBricksMaster.ExcelFileName = tempPath + @"\" + HttpContext.Current.Session["guid"] + FileName;
                //    uploadDistributerToBricksMaster.FileName = HttpContext.Current.Session["guid"] + FileName;
                //    uploadDistributerToBricksMaster.EmailAddress = Email;
                //    uploadDistributerToBricksMaster.UserId = UserId;
                //    uploadDistributerToBricksMaster.EmailStatus = "0";
                //    uploadDistributerToBricksMaster.ProccessStatus = false;
                //    uploadDistributerToBricksMaster.Remarks = "NotProcess";
                //    uploadDistributerToBricksMaster.CreateDate = DateTime.Now;

                //    db.tbl_UploadDistributerToBricksMaster.Add(uploadDistributerToBricksMaster);
                //    db.SaveChanges();

                //    lastInsertedId = uploadDistributerToBricksMaster.ID;

                //    string sheetname = "Sheet1";

                //    var excelFile = new ExcelQueryFactory(@"C:\PocketDCR2\Excel\RTBD\" + HttpContext.Current.Session["guid"] + FileName);
                //    var newlist = (from a in excelFile.Worksheet<tbl_DistributerToBricksMasterDataTemp>(sheetname) select a).ToList();

                //    // var invdate = newlist.Select(m => m.InvoiceDate).Distinct().ToList();
                //    // var CompareDSR = db.tbl_DailySaleReport.Where(x => x.InvoiceDate == ); 
                //    // newlist.ToList()[0].Units = "";
                //    // var sqldsr = db.tbl_DailySaleReport.Where(x => x.InvoiceNo == newlist[0].InvoiceNo).ToList();

                //    newlist.ForEach(p =>
                //    {
                //        p.DTBMID = lastInsertedId;
                //        p.CreateDateSystem = DateTime.Now;
                //        p.IsActive = false;
                //        p.flag = "U";
                //    });
                //    var batchlst = (newlist.AsQueryable().Partition(50000));
                //    foreach (var list in batchlst)
                //    {
                //        db.BulkInsert(list, operation => operation.BatchSize = 5000);
                //    }

                //    return "Success";
                //}
                //catch (Exception ex)
                //{
                //    Constants.ErrorLog("RTBD : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                //    return "Error Occured";
                //}
                #endregion
            }
            catch (Exception ex)
            {
                PocketDCR2.Classes.Constants.ErrorLog("READ Exceptiion::" + ex.Message + " Stack Trace::" + ex.StackTrace.ToString());
                return "Error";
            }
        }

        private void RTBDDataProcess(HttpContext context)
        {
            #region Commented
            string result = string.Empty;
            try
            {
                //Process Start Sp_ProcessDSRtemp
                _nv.Clear();
                var temptodsr = DL.GetData("Sp_ProcessRTBDtemp", null);

                _nv.Clear();
                _nv.Add("@DTBMID-INT", temptodsr.Tables[0].Rows[0].ItemArray[0].ToString());

                var updateDataUpload = DL.GetData("Sp_UploadDistributerToBricksMasterUAP", _nv);

                //Process Start Sp_ProcessDSR
                //var pro = DL.GetData("Sp_ProcessDSR", null);

                result = "DSuccess";
                HttpContext.Current.Session["guid"] = "";
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("DSR : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                result = "Error Occured";
                HttpContext.Current.Session["guid"] = "";
            }
            #endregion

            context.Response.Write(result);
        }
        #region Export List

        public static MemoryStream DataTableToExcel(DataTable table)
        {
            MemoryStream Result = new MemoryStream();
            ExcelPackage pack = new ExcelPackage();
            ExcelWorksheet ws = pack.Workbook.Worksheets.Add("SpoBricks");

            int col = 1;
            int row = 2;

            ws.Cells[1, 1].Value = "Region";
            ws.Cells[1, 2].Value = "SubRegion";
            ws.Cells[1, 3].Value = "District";
            ws.Cells[1, 4].Value = "CityCode";
            ws.Cells[1, 5].Value = "City";
            ws.Cells[1, 6].Value = "DSTBID";
            ws.Cells[1, 7].Value = "Distributor";
            ws.Cells[1, 8].Value = "DSTBCode";
            ws.Cells[1, 9].Value = "TeamName";
            ws.Cells[1, 10].Value = "BrickCode";
            ws.Cells[1, 11].Value = "BrickName";
            ws.Cells[1, 12].Value = "TM_SAS_ID";
            ws.Cells[1, 13].Value = "Share";
            ws.Cells[1, 14].Value = "CRM_TM_IDS";
            //  ws.Cells[1, ].Value = "CRM_TM_IDS";
            ws.Cells[1, 14, 1, 14].Style.Font.Bold = true;

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

        private static MemoryStream RTBDExcel(DataSet tableSet)
        {
            DataTable table = tableSet.Tables[0];
            MemoryStream Result = new MemoryStream();            
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;


            ExcelPackage pack = new ExcelPackage();
            ExcelWorksheet ws = pack.Workbook.Worksheets.Add("Sheet1");

            ws.Cells[1, 1].Style.Font.Bold = true;
            ws.Cells[1, 2].Style.Font.Bold = true;
            ws.Cells[1, 3].Style.Font.Bold = true;
            ws.Cells[1, 4].Style.Font.Bold = true;
            ws.Cells[1, 5].Style.Font.Bold = true;
            ws.Cells[1, 6].Style.Font.Bold = true;
            ws.Cells[1, 7].Style.Font.Bold = true;
            ws.Cells[1, 8].Style.Font.Bold = true;
            ws.Cells[1, 9].Style.Font.Bold = true;
            ws.Cells[1, 10].Style.Font.Bold = true;
            ws.Cells[1, 11].Style.Font.Bold = true;
            ws.Cells[1, 12].Style.Font.Bold = true;

            ws.Cells[1, 1].Value = "Region";
            ws.Cells[1, 2].Value = "SubRegion";
            ws.Cells[1, 3].Value = "District";
            ws.Cells[1, 4].Value = "DSTBID";
            ws.Cells[1, 5].Value = "Distributor";
            ws.Cells[1, 6].Value = "DSTBCode";
            ws.Cells[1, 7].Value = "Distributor City Code";
            ws.Cells[1, 8].Value = "Distributor City";
            ws.Cells[1, 9].Value = "BrickCode";
            ws.Cells[1, 10].Value = "BrickName";
            ws.Cells[1, 11].Value = "Brick City Code";
            ws.Cells[1, 12].Value = "Brick City";
               
            var DCity = ws.Cells[2, 12, 50, 12].DataValidation.AddListDataValidation();
            DCity.ShowErrorMessage = true;
            DCity.Error = "Please Select Section Name from Supplied Dropdown";
            
            for (int i = 0; i < table.Rows.Count; i++)
            {
                DCity.Formula.Values.Add(table.Rows[i][0].ToString());
                //DCity.Formula.Values.Add(i.ToString());
               
            }

            pack.SaveAs(Result);
            return Result;
        }

        #endregion

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}