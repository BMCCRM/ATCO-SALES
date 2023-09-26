using DatabaseLayer.SQL;
using PocketDCR2.Classes;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using PocketDCR2.Classes;
using System.Data;
using System.Web.Script.Services;

using System.Data.SqlClient;
using iTextSharp.text.pdf;
using MediaToolkit.Model;
using MediaToolkit;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for PDFUploaderServicesNew
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class PDFUploaderServicesNew : System.Web.Services.WebService
    {


        #region Public Member

        readonly DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        readonly JavaScriptSerializer _jss = new JavaScriptSerializer();
        NameValueCollection nv = new NameValueCollection();
        DAL dl = new DAL();

        #endregion

        [WebMethod]
        public string GetTeams()
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@LevelId-int", "NULL");
                nv.Add("@LevelName-nvarchar(100)", "NULL");
                var data = dl.GetData("sp_HierarchyLevels3Select", nv);

                returnString = data.Tables[0].ToJsonString();

            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }



        [WebMethod]
        public string GetAllPDFMasterFiles()
        {
            string returnString = "";

            try
            {
                nv.Clear();
                var data = dl.GetData("sp_GetPDFMasterFiles", nv);

                returnString = data.Tables[0].ToJsonString();

            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UploadFile()
        {
            int type = 1;
            var fileName = HttpContext.Current.Request.Form[0];
            var teamId = HttpContext.Current.Request.Form[1];
            var productId = HttpContext.Current.Request.Form[2];
            var txtFileName = HttpContext.Current.Request.Form[3];
            var txtFileDescription = HttpContext.Current.Request.Form[4];
            var status = HttpContext.Current.Request.Form[5];
            var endDate = HttpContext.Current.Request.Form[6];
            var startDate = HttpContext.Current.Request.Form[7];
            string filepath = fileName.Split('.')[1].ToLower();
            int numberOfPages = 0;
            try
            {
                if (HttpContext.Current.Request.Files.AllKeys.Any())
                {
                    if (HttpContext.Current.Request.Files["UploadedFile"] != null)
                    {
                        var file = HttpContext.Current.Request.Files["UploadedFile"];

                        if (file != null)
                        {
                            if ((filepath.Contains("pdf")) || (filepath.Contains("mp4")) || (filepath.Contains("mpeg")))
                            {

                            }
                            else
                            {
                                return "Invalid file selected";
                            }



                            if (filepath.Contains("pdf"))
                            {

                                if (file.ContentLength > 31457280)
                                {
                                    return "PDF Size too large";
                                }
                            }
                            else if ((filepath.Contains("mp4")) || (filepath.Contains("mpeg")) || (filepath.Contains("mpg"))) 
                            {
                                if (file.ContentLength > 52428800)
                                {
                                    return "Video Size too large";
                                }
                            }


                            string EmpID = HttpContext.Current.Session["CurrentUserId"].ToString();

                            //create directory if doesnot exists
                            string path = HttpContext.Current.Server.MapPath("../Uploads/E-Detailing/");
                            if (!Directory.Exists(path))
                            {
                                DirectoryInfo di = Directory.CreateDirectory(path);
                            }

                            //filename name with employee IDataAdapter 
                            string fileNameWithEmpID = EmpID + "_" + fileName;

                            ////if filename exists then delete it
                            //if (File.Exists(path + @"\" + fileNameWithEmpID))
                            //{
                            //    File.Delete(path + @"\" + fileNameWithEmpID);
                            //}

                            //if file not already exists
                            if (!File.Exists(path + @"\" + fileNameWithEmpID))
                            {
                                var fileSavePath = Path.Combine(path, fileNameWithEmpID);
                                file.SaveAs(fileSavePath);


                                if (filepath.Contains("pdf"))
                                {
                                    type = 1;
                                    PdfReader pdfReader = new PdfReader(fileSavePath);
                                    numberOfPages = pdfReader.NumberOfPages;
                                    pdfReader.Dispose();
                                }

                                else if ((filepath.Contains("mp4")) || (filepath.Contains("mpg")))
                                {
                                    type = 2;
                                    var inputFile = new MediaFile { Filename = Server.MapPath("~/Uploads/E-Detailing/") + fileNameWithEmpID };
                                    using (var engine = new Engine())
                                    {
                                        engine.GetMetadata(inputFile);
                                    }
                                    numberOfPages = Convert.ToInt32(inputFile.Metadata.Duration.TotalSeconds);
                                }






                                //if filename is saved, insert into DB
                                if (File.Exists(path + @"\" + fileNameWithEmpID))
                                {
                                    nv.Clear();
                                    nv.Add("@FilePath-varchar-500", "/Uploads/E-Detailing/" + fileNameWithEmpID);
                                    nv.Add("@FileName-varchar-250", txtFileName.ToString());
                                    nv.Add("@Description-varchar-500", txtFileDescription.ToString());
                                    nv.Add("@NumOfPages-int", numberOfPages.ToString());
                                    nv.Add("@Status-bit", status.ToString());
                                    nv.Add("@ProductID-int", productId.ToString());
                                    nv.Add("@endDate-DateTime ", endDate.ToString());
                                    nv.Add("@startDate-DateTime", startDate.ToString());
                                    nv.Add("@type-int", type.ToString());
                                    nv.Add("@Level3Id-int", teamId.ToString());





                                    var isInsert = dl.InserData("sp_InsertPdfDetails", nv);



                                    if (isInsert == true)
                                    {
                                        return "Uploaded";
                                    }
                                    else
                                    {
                                        //if DatabaseLayer insertion failed then delete the saved file
                                        if (File.Exists(path + @"\" + fileNameWithEmpID))
                                        {
                                            File.Delete(path + @"\" + fileNameWithEmpID);
                                        }
                                        return "File not saved";
                                    }
                                }
                                else
                                {
                                    return "File not saved";
                                }
                            }
                            else
                            {
                                return "File already exists";
                            }

                        }


                    }
                    else
                    {
                        return "Select file";
                    }
                }

                return "Invalid input data";
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Error occured in PDF E-Detaililng file uplaod: " + ex.Message.ToString());
                return ex.Message.ToString();
            }

        }

        [WebMethod]
        public string UpdatePDFDetails(string Id, string TeamId, string ProductId, string FileName, string FileDescription, string Status, string EndDate, string StartDate)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@Id-int", Id.ToString());
                nv.Add("@TeamId-int", TeamId.ToString());
                nv.Add("@ProductId-int", ProductId.ToString());
                nv.Add("@FileName-varchar-250", FileName.ToString());
                nv.Add("@FileDescription-varchar-500", FileDescription.ToString());
                nv.Add("@Status-bit", Status.ToString());
                nv.Add("@EndDate-datetime", Convert.ToDateTime(EndDate).ToString());
                nv.Add("@StartDate-datetime", Convert.ToDateTime(StartDate).ToString());
                DataSet data = dl.GetData("sp_UpdatePdfDetails", nv);

                if (data.Tables[0].Rows.Count > 0)
                {
                    returnString = "Updated";
                }
                else
                {
                    returnString = "failed";
                }

            }
            catch (Exception exception)
            {
                Constants.ErrorLog("Error occured in PDF file update: " + exception.Message.ToString());
                returnString = exception.Message;
            }


            return returnString;
        }

        [WebMethod]
        public string DeletePdf(int id)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@id-int", id.ToString());
                var data = dl.GetData("sp_DeletePdfDetails", nv);

                if (data.Tables[0].Rows.Count > 0)
                {
                    //string fullpath = Server.MapPath(data.Tables[0].Rows[0][0].ToString());
                    string fullpath = data.Tables[0].Rows[0][0].ToString();
                    var path = @"C:/inetpub/wwwroot/AtcoCRM" + fullpath;
                    //var path = new Uri(@"C:\inetpub\wwwroot\BayerCRM" + fullpath, UriKind.Absolute);

                    if (File.Exists(path))
                    {
                        File.Delete(path.ToString());
                    }

                    returnString = "ok";
                }
                else
                {
                    returnString = "failed";
                }

            }
            catch (SqlException ex)
            {
                if (ex.Errors.Count > 0) // Assume the interesting stuff is in the first error
                {
                    switch (ex.Errors[0].Number)
                    {
                        case 547: // Foreign Key violation
                            returnString = "fk error";
                            break;
                    }
                }
                Constants.ErrorLog("Error occured in PDF file delete: " + ex.Message.ToString());
            }


            return returnString;
        }

        [WebMethod]
        public string GetPageDetails(string id)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@id-int", id.ToString());
                var data = dl.GetData("sp_GetPDFDetails", nv);

                returnString = data.Tables[0].ToJsonString();

            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        public string GetProductDetails(string id)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@level3id-int", id.ToString());
                var data = dl.GetData("sp_GetProductDetails", nv);

                returnString = data.Tables[0].ToJsonString();

            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }


        [WebMethod]
        public string GetSKUDetails(string id)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@id-int", id.ToString());
                var data = dl.GetData("sp_GetSKUDetails", nv);

                returnString = data.Tables[0].ToJsonString();

            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        public string InsertPageDetails(string id, string prodid, string SKUid)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@id-int", id.ToString());
                nv.Add("@Proid-int", prodid.ToString());
                nv.Add("@SKUid-int", SKUid.ToString());
                var data = dl.GetData("sp_insertPageDetails", nv);

                returnString = data.Tables[0].ToJsonString();

            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }


        [WebMethod(EnableSession = true)]

        public string getProductsAgainstTeam(string teamID)
        {
            string returnstring = "";

            try
            {
                nv.Clear();
                nv.Add("@id-int", teamID.ToString());
                var ds = dl.GetData("sp_getTeamProducts", nv);

                if (ds != null)
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnstring = ds.Tables[0].ToJsonString();
                    }
            }
            catch (Exception ex)
            {

                returnstring = ex.Message;
            }

            return returnstring;
        }


        [WebMethod(EnableSession = true)]

        public string getProducts()
        {
            string returnstring = "";

            try
            {
                nv.Clear();
                //  nv.Add("@id-int", teamID.ToString());
                var ds = dl.GetData("sp_GetAllProducts", nv);

                if (ds != null)
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnstring = ds.Tables[0].ToJsonString();
                    }
            }
            catch (Exception ex)
            {

                returnstring = ex.Message;
            }

            return returnstring;
        }




    }
}
