using PocketDCR2.Classes;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using System.Configuration;
using System.IO;
using System.Web.Hosting;
using System.Web.Script.Serialization;
using Newtonsoft.Json;
namespace PocketDCR2.Handler
{
    /// <summary>
    /// Summary description for ExpenseHandler
    /// </summary>
    public class ExpenseHandler : IHttpHandler
    {
        string status = "";
        NameValueCollection nv = new NameValueCollection();
        DAL _dl = new DAL();
        public void ProcessRequest(HttpContext context)
        {

            string path = HostingEnvironment.MapPath("~/Uploads/ExpenseIndiviualImages");
            var returnString = "";
            string retrunstr = string.Empty;
            string type = context.Request.QueryString["Type"];
        

            HttpPostedFile postedFile = context.Request.Files["Filedata"];
            try{
            if (context.Request.Files.Count > 0)
            {
                HttpFileCollection UploadedFilesCollection = context.Request.Files;
                for (int i = 0; i < UploadedFilesCollection.Count; i++)
                {


                    System.Threading.Thread.Sleep(2000);
                    HttpPostedFile PostedFiles = UploadedFilesCollection[i];

                    string[] Attachdetail = UploadedFilesCollection.AllKeys[i].Split(':');
                    status = Attachdetail[7].ToString();

                    if (!Directory.Exists(path))
                        Directory.CreateDirectory(path);
                    string FilePath = path + @"\" + PostedFiles.FileName;
                    PostedFiles.SaveAs(FilePath);

                    if (type == "Reimbursement")
                    {
                        
                        nv.Clear();
                        nv.Add("@MonthlyExpenseId-int", Attachdetail[1].ToString());
                        nv.Add("@DailyId-varchar", Attachdetail[0].ToString());
                        nv.Add("@FileName-varchar", PostedFiles.FileName.ToString());
                        nv.Add("@Amount-int", Attachdetail[3].ToString());
                        nv.Add("@Feedback-varchar", Attachdetail[4].ToString());
                        nv.Add("@Reason-int", Attachdetail[5].ToString());
                        nv.Add("@EmpID-varchar", Attachdetail[6].ToString());
                        nv.Add("@DayOfExpense-date",Attachdetail[7].ToString());
                        nv.Add("@FileAttach-varchar", FilePath.ToString());

                        var ds = _dl.GetData("sp_InsertReimbursement", nv);
                        retrunstr =  ds.Tables[0].Rows[0][0].ToString();
                      
                    }
                    else {
                        nv.Clear();
                        nv.Add("@Dailyid-int", Attachdetail[0].ToString());
                        nv.Add("@Attached-varchar", FilePath.ToString());
                        nv.Add("@Amount-varchar", Attachdetail[2].ToString());
                        nv.Add("@Comment-varchar", Attachdetail[3].ToString());
                        nv.Add("@fk_ActivityId-int", Attachdetail[4].ToString());
                        nv.Add("@EmployeeId-int", Attachdetail[5].ToString());
                        nv.Add("@DailyExpenseDate-date", Attachdetail[6].ToString());
                        nv.Add("@Attachment_Name-varchar", PostedFiles.FileName.ToString());

                        var ds = _dl.GetData("sp_EmployeeExpenseAttachement", nv);
                    }

                    
                    
                }
                context.Response.StatusCode = 200;
                }
                    else
                {
                    System.Threading.Thread.Sleep(2000);


                    if (type == "UpdateAttach")
                    {
                        string[] Attachdetail = context.Request.Form.AllKeys[0].Split(':');

                        nv.Clear();
                        nv.Add("@ID-int", Attachdetail[0].ToString());
                        nv.Add("@Amount-varchar", Attachdetail[2].ToString());
                        nv.Add("@Comment-varchar", Attachdetail[3].ToString());
                        nv.Add("@fk_ActivityId-int", Attachdetail[4].ToString());
                        var ds = _dl.GetData("sp_UpdateExpenseAttachement", nv);
                    }
                    else
                    {
                        System.Threading.Thread.Sleep(2000);


                        if (type == "UpdateReiembresment")
                        {
                            string[] Attachdetail = context.Request.Form.AllKeys[0].Split(':');

                            nv.Clear();
                            nv.Add("@ID-int", Attachdetail[0].ToString());
                            nv.Add("@Amount-varchar", Attachdetail[2].ToString());
                            nv.Add("@Comment-varchar", Attachdetail[3].ToString());
                            nv.Add("@fk_ActivityId-int", Attachdetail[4].ToString());
                            nv.Add("@EmployeeId-int", Attachdetail[8].ToString());
                            nv.Add("@DateOfExpense-date", Attachdetail[9].ToString());
                            var ds = _dl.GetData("sp_UpdateExpenseReiembresment", nv);
                            retrunstr = ds.Tables[0].Rows[0][0].ToString();
                        }

                        context.Response.StatusCode = 200;
                    }
      
                }

        
            }

            
            catch (HttpException ex)
            {
                Constants.ErrorLog("Exception Raising From ExpenseHandler.ashx.cs WebMethod(UploadImage) In Project.aspx | " + ex.Message + " | Stack Trace : |" + ex.StackTrace);

                

            }

            //return (new JavaScriptSerializer().Serialize(retrunstr));
            context.Response.Write((retrunstr));
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