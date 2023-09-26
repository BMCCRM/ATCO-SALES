using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Threading;
using System.Globalization;
using System.Collections;
using System.Data.SqlClient;
using System.Collections.Specialized;
using DatabaseLayer.SQL;
using System.IO;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Net.Mime;

namespace PocketDCR2.Classes
{
    public class MonthlyDoctorsBatchUploadHelper
    {
        #region Private Members

        private DAL _dl = new DAL();
        private static readonly MonthlyDoctorsBatchUploadHelper _instance = new MonthlyDoctorsBatchUploadHelper();
        private readonly System.Timers.Timer _processTimer;
        private NameValueCollection _nvCollection = new NameValueCollection();
        private Boolean _status = true;


        private string smtphost = ConfigurationManager.AppSettings["AutoEmailSMTP"].ToString();
        private string smtpPort = ConfigurationManager.AppSettings["smtpPort"].ToString();
        private string fromAddress = ConfigurationManager.AppSettings["AutoEmailID"].ToString();
        private string smtppassword = ConfigurationManager.AppSettings["AutoEmailIDpass"].ToString();



        #endregion

        #region Contructor

        private MonthlyDoctorsBatchUploadHelper()
        {
            _processTimer = new System.Timers.Timer();
        }

        #endregion

        #region Database Layer

        private DataSet GetData(String spName, NameValueCollection nv)
        {
            var connection = new SqlConnection();
            string dbTyper = "";

            try
            {
                connection.ConnectionString = Classes.Constants.GetConnectionString();
                var dataSet = new DataSet();
                connection.Open();

                var command = new SqlCommand();
                command.CommandType = CommandType.StoredProcedure;
                command.Connection = connection;
                command.CommandText = spName;

                if (nv != null)
                {
                    //New code implemented for retrieving data
                    for (int i = 0; i < nv.Count; i++)
                    {
                        string[] arraySplit = nv.Keys[i].Split('-');

                        if (arraySplit.Length > 2)
                        {
                            //Run the code with datatype length.
                            dbTyper = "SqlDbType." + arraySplit[1].ToString() + "," + arraySplit[2].ToString();
                            command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = nv[i].ToString();
                        }
                        else
                        {
                            //Run the code for int values
                            dbTyper = "SqlDbType." + arraySplit[1].ToString();
                            command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = nv[i].ToString();
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

        #region Public Functions

        public static MonthlyDoctorsBatchUploadHelper Instance
        {
            get
            {
                return _instance;
            }
        }

        public Boolean ServerStatus
        {
            get
            {
                return _status;
            }

            set
            {
                _status = value;
            }
        }

        public void Start()
        {
            try
            {
                double timerInterval = 30 * 1000; // 300000 //60 * 60 * 1000; // One Hour Elapse Timer --Arsal;
                _processTimer.AutoReset = true;
                _processTimer.Elapsed += new System.Timers.ElapsedEventHandler(_processTimer_Elapsed);
                _processTimer.Interval = timerInterval;
                _processTimer.Start();

            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
        }

        void _processTimer_Elapsed(object sender, System.Timers.ElapsedEventArgs e)
        {
            try
            {
                ErrorLog("MONTHLY DOCTOR UPLOAD TIMER THREAD WORKER TICKS :: Time: " + DateTime.Now);
                _processTimer.Stop();
                _status = Process();
                _processTimer.Start();



            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
        }

        public void Stop()
        {
            try
            {
                _processTimer.Stop();
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
        }

        public Boolean Process()
        {

            try
            {
                DataSet queueList = _dl.GetData("sp_GetMonthlyDoctorsBatchQueue", null);

                var ids = queueList.Tables[0].AsEnumerable().Select(r => r.Field<int>("ID")).ToList();


                foreach (int batchID in ids)
                {


                    try
                    {
                        _nvCollection.Clear();
                        _nvCollection.Add("@BatchMasterID-int", batchID.ToString());

                        var result = _dl.GetData("sp_MonthlyDoctorsUploadBatchWorker", _nvCollection);

                        // WORK HERE FOR EMAIL SHEET
                        if (result != null)
                        {
                            if (result.Tables.Count > 0)
                            {
                                if (result.Tables[1].Rows.Count != 0)
                                {
                                    String excelURL = ExcelHelper_New.DataTableToExcelForEmailResult(result);
                                    string emailAddresses = result.Tables[0].Rows[0][1].ToString();

                                    foreach (String emailAddress in emailAddresses.Split(';'))
                                    {
                                        try
                                        {
                                            SendMonthlyDoctorsUploadedMail(emailAddress, excelURL);
                                            ErrorLog("SUCCESS :: Monthly Doctors Batch Proccessed And Email Send " + emailAddresses + ". Emailed Sheet Is:" + excelURL);
                                        }
                                        catch (Exception ex)
                                        {

                                            throw ex;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    catch (Exception exception)
                    {
                        ErrorLog("ERROR :: A Fatal Exception Occurred During Fetching List For Batch Monthly Doctors: " + exception.Message);
                    }
                }
            }
            catch (Exception exception)
            {
                ErrorLog("ERROR :: A Fatal Exception Occurred During Fetching List For Batch Monthly Doctors: " + exception.Message);
                return false;
            }

            return true;
        }

        public void InitializeSystem()
        {
            try
            {
                Start();
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
        }

        public void ShutDownSystem()
        {
            try
            {
                _processTimer.Stop();
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
        }

        #endregion

        #region Private Functions

        private void SendMonthlyDoctorsUploadedMail(String ToAddress, String excelUrl)
        {
            
            MailMessage mail = new MailMessage();
            mail.Subject = "Monthly Doctors Sheet Uploaded, Please Review";
            mail.From = new MailAddress(fromAddress);
            mail.To.Add(ToAddress);
           
            try
            {


                String EmailBody = @"<div style='background-color: #ffffff;'><table style='font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td><div style='margin: 0px auto; max-width: 600px;'><table style='font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0' align='center'><tbody><tr></tr></tbody></table></div></td></tr></tbody></table><table style='font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td><div style='margin: 0px auto; max-width: 600px;'><table style='font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0' align='center'><tbody><tr><td style='text-align: center; vertical-align: top; direction: ltr; font-size: 0px; padding: 9px 0px 9px 0px;'><div style='vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 100%;'><table border='0' width='100%' cellspacing='0' cellpadding='0'><tbody><tr><td style='word-wrap: break-word; font-size: 0px; padding: 0px 0px 0px 0px;' align='center'><table style='border-collapse: collapse; border-spacing: 0px;' border='0' cellspacing='0' cellpadding='0' align='center'><tbody><tr><td style='width: 198px;'><img style='border: none; border-radius: 0px; display: block; font-size: 13px; outline: none; text-decoration: none; width: 100%; height: auto;' title='' src='cid:Footer' alt='' width='198' height='auto'/></td></tr></tbody></table></td></tr></tbody></table></div></td></tr></tbody></table></div></td></tr></tbody></table><table style='font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td><div style='margin: 0px auto; max-width: 600px;'><table style='font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0' align='center'><tbody><tr><td style='text-align: center; vertical-align: top; direction: ltr; font-size: 0px; padding: 9px 0px 9px 0px;'><div style='vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 100%;'><table border='0' width='100%' cellspacing='0' cellpadding='0'><tbody><tr><td style='word-wrap: break-word; font-size: 0px;'></td></tr></tbody></table></div></td></tr></tbody></table></div></td></tr></tbody></table><table style='background: #e85034; font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0'><tbody><tr style='height: 371px;'><td style='height: 371px;'><div style='margin: 0px auto; max-width: 600px;'><table style='font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0' align='center'><tbody><tr><td style='text-align: center; vertical-align: top; direction: ltr; font-size: 0px; padding: 9px 0px 9px 0px;'><div style='vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 100%;'><table border='0' width='100%' cellspacing='0' cellpadding='0'><tbody><tr><td style='word-wrap: break-word; font-size: 0px; padding: 8px 20px 8px 20px;' align='center'><div style='cursor: auto; color: #000000; font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 11px; line-height: 22px; text-align: center;'><p><span style='color: #ffffff;'><span style='font-size: 20px;'>Your Monthly Doctors Uploaded Are Proccessed<strong>!</strong></span></span></p></div></td></tr><tr></tr><tr><td style='word-wrap: break-word; font-size: 0px; padding: 0px 20px 0px 20px;' align='left'><div style='cursor: auto; color: #ffffff; font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 11px; line-height: 22px; text-align: left;'><p><span style='font-size: 14px;'>Monthly Doctors Sheet Uploaded By You Has Been Proccessed Successfully, Please Find Excel File Attachment, With The Proccessed Data.</span></p><p><span style='font-size: 14px;'>Please Review That Monthy Doctors Excel Sheet And Upload Downloaded File Again If Any Changes Needed.&nbsp;</span></p><p><span style='font-size: 14px;'>Regards,<br/>Your Support Team</span><br/>&nbsp;</p></div></td></tr><tr><td style='word-wrap: break-word; font-size: 0px;'></td></tr></tbody></table></div></td></tr></tbody></table></div></td></tr></tbody></table><table style='font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td><div style='margin: 0px auto; max-width: 600px;'><table style='font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0' align='center'><tbody><tr><td style='text-align: center; vertical-align: top; direction: ltr; font-size: 0px; padding: 9px 0px 9px 0px;'><div style='vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 100%;'><table border='0' width='100%' cellspacing='0' cellpadding='0'><tbody><tr><td style='word-wrap: break-word; font-size: 0px;'></td></tr></tbody></table></div></td></tr></tbody></table></div></td></tr></tbody></table><table style='background: #E3E3E3; font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td><div style='margin: 0px auto; max-width: 600px;'><table style='font-size: 0px; width: 100%;' border='0' cellspacing='0' cellpadding='0' align='center'><tbody><tr><td style='text-align: center; vertical-align: top; direction: ltr; font-size: 0px; padding: 9px 0px 9px 0px;'><div style='vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 100%;'><table border='0' width='100%' cellspacing='0' cellpadding='0'><tbody><tr><td style='word-wrap: break-word; font-size: 0px; padding: 0px 20px 0px 20px;' align='center'><div style='cursor: auto; color: #000000; font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 11px; line-height: 22px; text-align: center;'><p>Thank you for using and supporting BMC Solution.</p></div></td></tr><tr><td style='word-wrap: break-word; font-size: 0px; padding: 0px 20px 0px 20px;' align='center'><div style='cursor: auto; color: #000000; font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 11px; line-height: 22px; text-align: center;'><p><a style='color: #e85034;' href='%5Bprofile_link%5D'>*** This is an system generated email, please do not reply ***</a></p></div></td></tr></tbody></table></div></td></tr></tbody></table></div></td></tr></tbody></table></div>";


                mail.Body = EmailBody;


                mail.IsBodyHtml = true;

                AlternateView avHtml = AlternateView.CreateAlternateViewFromString(mail.Body, Encoding.Default, MediaTypeNames.Text.Html);
                string path = System.AppDomain.CurrentDomain.BaseDirectory + "/Images/Bmclogo.png";
                //System.Web.HttpContext.Current.Server.MapPath("~/Images/Bmclogo.png");
                LinkedResource header = new LinkedResource(path, MediaTypeNames.Image.Jpeg);
                header.ContentId = "Footer";


                avHtml.LinkedResources.Add(header);

                System.Net.Mail.Attachment attachment;
                attachment = new System.Net.Mail.Attachment(excelUrl);
                mail.Attachments.Add(attachment);

                mail.AlternateViews.Add(avHtml);
                SmtpClient smtp = new SmtpClient(smtphost, Convert.ToInt32(smtpPort));
                smtp.EnableSsl = false;
                NetworkCredential netCre = new NetworkCredential(fromAddress, smtppassword);
                smtp.Credentials = netCre;

                smtp.Send(mail);

            }
            catch (Exception ex)
            {
                ErrorLog("EMAIL FAILURE :: Monthly Doctors Batch Proccessing ::: Failure While Sending Email To " + ToAddress + ". Excel Sheet URL Is:" + excelUrl);
                ErrorLog("STACKTRACE :: " + ex.StackTrace);
                throw ex;
                //ClientScript.RegisterStartupScript(GetType(), "alert", "alert('" + ex.ToString() + "');", true);
            }
        }


        private static void ErrorLog(string error)
        {
            try
            {
                if (!Directory.Exists(ConfigurationManager.AppSettings["Logs"].ToString()))
                {
                    Directory.CreateDirectory(ConfigurationManager.AppSettings["Logs"].ToString());
                }

                File.AppendAllText(ConfigurationManager.AppSettings[@"Logs\"].ToString() + "Log_MonthlyDoctorsProccessing" + DateTime.UtcNow.ToString("yyyy_MM_dd") + ".txt",
                    DateTime.Now + " : " + error + Environment.NewLine);
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
        }

        #endregion


    }
}