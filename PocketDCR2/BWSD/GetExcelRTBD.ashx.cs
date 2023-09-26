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
    public class GetExcelRTBD : IHttpHandler, System.Web.SessionState.IRequiresSessionState
    {
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

        #region Object Intialization
        NameValueCollection _nv = new NameValueCollection();
        DAL DL = new DAL();
        private HudsonCRMEntities2 db = new HudsonCRMEntities2();
        string employeeid = string.Empty;
        string filename1 = string.Empty;
        string EmailAddress = string.Empty;
        string guid = string.Empty;
        string EmployeeId;

        #endregion

        public void ProcessRequest(HttpContext context)
        {

            string type = context.Request.QueryString["Type"];
            EmployeeId = context.Request.QueryString["EmployeeId"];
            string Level6Id = context.Request.QueryString["Level6Id"];
            string DistributorID = context.Request.QueryString["DistributorID"];

            if (type == "U")
            {
                uploadwork(context);
            }

            else if (type == "D")
            {
                #region Download Work
                MemoryStream ms = RTBDExcel();
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
                _nv.Add("@EmployeeID-Nvarchar(MAX)", EmployeeId.ToString());
                _nv.Add("@Level6Id-Nvarchar(MAX)", Level6Id.ToString());
                _nv.Add("@DistributorID-Nvarchar(MAX)", DistributorID.ToString());
                DataSet dsData = DL.GetData("sp_GetSPOwithSalesBricksData", _nv);
                MemoryStream ms = DataTableToExcel(dsData);
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
                HttpPostedFile postedFile = contxt.Request.Files["Filedata"];

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
            #region Commented
            try
            {
                #region Reading Excel To DataTable
                try
                {
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
                    ds.Tables[0].Columns.Remove("Total");


                    PocketDCR2.Classes.Constants.ErrorLog("CLOSE READING");
                #endregion

                    #region Working On Read Excel

                    if (ds != null)
                    {

                        PocketDCR2.Classes.Constants.ErrorLog("START PROC sp_GenerateSampleUploadBatch");

                        // string sheetTypeCode = ds.Tables[0].Columns[11].ColumnName;
                        string excelFileName, emailAddress, UserId, EmailStatus, Remarks;
                        excelFileName = FileName;
                        emailAddress = ds.Tables[0].Rows[0][3].ToString();
                        emailAddress = emailAddress.Replace('#', '.');
                        UserId = "1";
                        EmailStatus = "0";
                        Remarks = "NotProcess";

                        DataSet dsR = DL.GetData("sp_GenerateUploadDistributerToBricksMasterBatch", new NameValueCollection() {
                        { "@ExcelFileName-varchar(max)", excelFileName }, 
                        { "@EmailAddress-varchar(max)", emailAddress },
                        { "@UserId-varchar(max)", UserId },
                        { "@EmailStatus-varchar(max)", EmailStatus },
                        { "@Remarks-varchar(max)", Remarks }}
                        );
                        string batchID = dsR.Tables[0].Rows[0][0].ToString();

                        DataTable dt = new DataTable();

                        dt.Columns.Add("BatchID", typeof(Int32));
                        dt.Columns.Add("TeamName", typeof(String));
                        dt.Columns.Add("Region", typeof(String));
                        dt.Columns.Add("District", typeof(String));
                        dt.Columns.Add("DSTBCode", typeof(String));
                        dt.Columns.Add("Distributor", typeof(String));
                        dt.Columns.Add("BrickCode", typeof(String));
                        dt.Columns.Add("BrickName", typeof(String));
                        dt.Columns.Add("TM_SAS_ID", typeof(String));
                        dt.Columns.Add("Share", typeof(String));
                        dt.Columns.Add("Flag", typeof(String));

                        for (int i = 3; i < ds.Tables[0].Rows.Count; i++)
                        {
                            string TEAM = "", REGION = "", DISTRICT = "", DISTCODE = "", DISTNAME = "", BRICKCODE = "",
                                BRICKNAME = "", Territory = "", SalesPercentage = "";

                            DataRow dr = ds.Tables[0].Rows[i];
                            TEAM = dr[0].ToString();
                            REGION = dr[1].ToString();
                            DISTRICT = dr[2].ToString();
                            DISTCODE = dr[3].ToString();
                            DISTNAME = dr[4].ToString();
                            BRICKCODE = dr[5].ToString();
                            BRICKNAME = dr[6].ToString();

                            int rownum = i;
                            for (int j = 8; j < ds.Tables[0].Columns.Count; j++)
                            {
                                Territory = ds.Tables[0].Rows[1][j].ToString();
                                SalesPercentage = ds.Tables[0].Rows[rownum][j].ToString();

                                if (!(String.IsNullOrEmpty(SalesPercentage)))
                                {
                                    dt.Rows.Add(batchID, TEAM, REGION, DISTRICT, DISTCODE, DISTNAME, BRICKCODE, BRICKNAME, Territory, SalesPercentage, "U");
                                }
                            }
                        }

                        SqlCommand command = new SqlCommand();
                        command.Parameters.AddWithValue("RecordValues", dt);
                        var results = GetData("sp_CreateBatchRecordsForDistributerToBricksMasterData", command);
                        if (results != null)
                        {
                            BrickAllocationBatchUploadHelper.Instance.Process();
                        }
                    }
                    return "Success";
                }
                catch (Exception ex)
                {
                    PocketDCR2.Classes.Constants.ErrorLog("READ Exceptiion::" + ex.Message + " Stack Trace::" + ex.StackTrace.ToString());
                    return "Error";
                }
                //return "Success";
                    #endregion

                //currentUser = HttpContext.Current.Session["SystemUser"].ToString();
                //Email = HttpContext.Current.Session["Email"].ToString();
                //UserId = Convert.ToInt32(HttpContext.Current.Session["CurrentUserId"]);
                //var tempPath = @"C:\PocketDCR2\Excel\RTBD\";
                //tbl_UploadDistributerToBricksMaster uploadDistributerToBricksMaster = new tbl_UploadDistributerToBricksMaster();
                //uploadDistributerToBricksMaster.ExcelFileName = tempPath + @"\" + HttpContext.Current.Session["guid"] + FileName;
                //uploadDistributerToBricksMaster.FileName = HttpContext.Current.Session["guid"] + FileName;
                //uploadDistributerToBricksMaster.EmailAddress = Email;
                //uploadDistributerToBricksMaster.UserId = UserId;
                //uploadDistributerToBricksMaster.EmailStatus = "0";
                //uploadDistributerToBricksMaster.ProccessStatus = false;
                //uploadDistributerToBricksMaster.Remarks = "NotProcess";
                //uploadDistributerToBricksMaster.CreateDate = DateTime.Now;
                //db.tbl_UploadDistributerToBricksMaster.Add(uploadDistributerToBricksMaster);
                //db.SaveChanges();
                //lastInsertedId = uploadDistributerToBricksMaster.ID;

                //string sheetname = "Sheet1";
                //var excelFile = new ExcelQueryFactory(@"C:\PocketDCR2\Excel\RTBD\" + HttpContext.Current.Session["guid"] + FileName);
                //var newlist = (from a in excelFile.Worksheet<tbl_DistributerToBricksMasterDataTemp>(sheetname) select a).ToList();

                //newlist.ForEach(p =>
                //{
                //    p.DTBMID = lastInsertedId;
                //    p.CreateDateSystem = DateTime.Now;
                //    p.IsActive = false;
                //    p.flag = "U";
                //});
                //var batchlst = (newlist.AsQueryable().Partition(50000));
                //foreach (var list in batchlst)
                //{
                //    db.BulkInsert(list, operation => operation.BatchSize = 5000);
                //}

                //return "Success";
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("RTBD : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                return "Error Occured";
            }
            #endregion
        }

        private void RTBDDataProcess(HttpContext context)
        {
            #region Commented
            string result = string.Empty;
            try
            {
                //Process Start Sp_ProcessDSRtemp
                //_nv.Clear();
                //_nv.Add("@BatchID-INT", "1");
                //var temptodsr = DL.GetData("sp_BrickAllocationRequest", _nv);

                ////_nv.Clear();
                ////////_nv.Add("@DTBMID-INT", temptodsr.Tables[0].Rows[0].ItemArray[0].ToString());

                //////var updateDataUpload = DL.GetData("Sp_UploadDistributerToBricksMasterUAP", _nv);

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


        public static MemoryStream DataTableToExcel(DataSet ds)
        {

            int staticColumns = 9;
            MemoryStream Result = new MemoryStream();
            ExcelPackage pack = new ExcelPackage();
            ExcelWorksheet ws = pack.Workbook.Worksheets.Add("SpoBricksAllocation");
            var table = ds.Tables[0];
            //int col = 1;
            //int row = 2;

            //ws.Cells[1, 4, 1, 5].Merge = true;
            ws.Cells[1, 4].Value = "Email Address: ";
            ws.Cells[1, 4].AutoFitColumns();
            ws.Cells[2, 4].Style.Font.Bold = true;
            try
            {
                ws.Cells[2, 4].Value = ds.Tables[1].Rows[0][0].ToString();
            }
            catch (Exception)
            {
                ws.Cells[2, 4].Value = "Enter Email Here";
            }
            ws.Cells[2, 4].AutoFitColumns();



            ws.Cells[1, 4, 1, 5].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

            ws.Cells[1, staticColumns, 1, table.Columns.Count].Merge = true;
            ws.Cells[1, staticColumns].Value = "TERRITORIAL % SHARE";
            ws.Cells[1, staticColumns, 1, table.Columns.Count].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;



            for (int i = staticColumns; i <= table.Columns.Count; i++)
            {
                ws.Cells[2, i].Value = "TERRITORY-" + ((i - staticColumns) + 1);
                ws.Cells[3, i].Value = table.Columns[i - 1].ColumnName;

                ws.Cells[4, i].Value = table.Rows[0][i - 1].ToString();
            }

            for (int i = 1; i < staticColumns; i++)
            {
                ws.Cells[4, i].Value = table.Columns[i - 1].ColumnName;
            }

            ws.Cells[2, staticColumns, 2, table.Columns.Count].Style.Font.Bold = true;
            ws.Cells[2, staticColumns, 2, table.Columns.Count].Style.Fill.PatternType = ExcelFillStyle.Solid;
            ws.Cells[2, staticColumns, 2, table.Columns.Count].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(169, 208, 142));

            ws.Cells[3, staticColumns, 3, table.Columns.Count].Style.Font.Bold = true;
            ws.Cells[3, staticColumns, 3, table.Columns.Count].Style.Fill.PatternType = ExcelFillStyle.Solid;
            ws.Cells[3, staticColumns, 3, table.Columns.Count].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(255, 255, 0));

            ws.Cells[4, staticColumns, 4, table.Columns.Count].Style.Font.Bold = true;
            ws.Cells[4, staticColumns, 4, table.Columns.Count].Style.Fill.PatternType = ExcelFillStyle.Solid;
            ws.Cells[4, staticColumns, 4, table.Columns.Count].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(191, 191, 191));

            ws.Cells[1, table.Columns.Count + 1].Value = "Total";
            //ws.Cells[1, table.Columns.Count + 2].Value = "Totals";

            //for (int i = 5; i < table.Rows.Count; i++)
            //{
            //    ws.Cells[i, 8].Value = 0;
            //}

            for (int i = 5; i <= table.Rows.Count; i++)
            {


                for (int j = 1; j <= table.Columns.Count + 1; j++)
                {


                    if (j <= table.Columns.Count)
                    {
                        ws.Cells[i, j].Value = table.Rows[i - 1][j - 1];
                    }
                    else if (j == table.Columns.Count + 2)
                    {
                        ws.Cells[i, j].Formula = "=SUMPRODUCT((" + ws.Cells[i, staticColumns - 1].Address + ":" + ws.Cells[i, table.Columns.Count].Address + ")*1)";


                        //var conditionalFormattingRule01 = ws.ConditionalFormatting.AddExpression(ws.Cells[i, j]);
                        //conditionalFormattingRule01.Formula = "($" + ws.Cells[i, j].Address.ToString() + "<=100)";
                        //conditionalFormattingRule01.Style.Fill.PatternType = ExcelFillStyle.Solid;
                        //conditionalFormattingRule01.Style.Fill.BackgroundColor.Color = Color.FromArgb(112, 173, 71);

                        //var conditionalFormattingRule02 = ws.ConditionalFormatting.AddExpression(ws.Cells[i, j]);
                        //conditionalFormattingRule02.Formula = "($" + ws.Cells[i, j].Address.ToString() + ">100)";
                        //conditionalFormattingRule02.Style.Fill.PatternType = ExcelFillStyle.Solid;
                        //conditionalFormattingRule02.Style.Fill.BackgroundColor.Color = Color.FromArgb(255, 0, 0);

                    }

                    // validation conditions  

                    if (j == 9)
                    {
                        //var val3 = ws.DataValidations.AddIntegerValidation(ws.Cells[i, j].Address + ":" + ws.Cells[i, j].Address);

                        //if ((Convert.ToInt32(ws.Cells[i, j].Value.ToString()) + Convert.ToInt32(ws.Cells[i, table.Columns.Count].Value.ToString())) > 100)
                        //{
                        //    val3.ShowErrorMessage = true;
                        //    val3.Error = "The value must be an integer between 0 and 10";
                        //}



                        //ws.Cells[i, j].Formula = "=SUMPRODUCT((" + ws.Cells[i, staticColumns].Address + ":" + ws.Cells[i, table.Columns.Count].Address + ")*1)";

                    }


                }

                ws.Cells[i, table.Columns.Count + 1].Formula = "=SUMPRODUCT((" + ws.Cells[i, staticColumns].Address + ":" + ws.Cells[i, table.Columns.Count].Address + ")*1)";

                var conditionalFormattingRule03 = ws.ConditionalFormatting.AddExpression(ws.Cells[i, table.Columns.Count + 1]);
                conditionalFormattingRule03.Formula = "($" + ws.Cells[i, table.Columns.Count + 1].Address.ToString() + "<=100)";
                conditionalFormattingRule03.Style.Fill.PatternType = ExcelFillStyle.Solid;
                conditionalFormattingRule03.Style.Fill.BackgroundColor.Color = Color.FromArgb(112, 173, 71);

                var conditionalFormattingRule04 = ws.ConditionalFormatting.AddExpression(ws.Cells[i, table.Columns.Count + 1]);
                conditionalFormattingRule04.Formula = "($" + ws.Cells[i, table.Columns.Count + 1].Address.ToString() + ">100)";
                conditionalFormattingRule04.Style.Fill.PatternType = ExcelFillStyle.Solid;
                conditionalFormattingRule04.Style.Fill.BackgroundColor.Color = Color.FromArgb(255, 0, 0);

            }

            ws.Cells.AutoFitColumns();
            //ws.Column(8).Hidden = true;
            ws.Column(table.Columns.Count + 2).Hidden = true;


            pack.SaveAs(Result);
            return Result;
        }

        private static MemoryStream RTBDExcel()
        {
            MemoryStream Result = new MemoryStream();
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
            ws.Cells[1, 13].Style.Font.Bold = true;
            ws.Cells[1, 14].Style.Font.Bold = true;


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