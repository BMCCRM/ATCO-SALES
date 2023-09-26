using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.UI;
using System.Web.Security;
using DatabaseLayer.SQL;
using PocketDCR2.Classes;
using System.Data.SqlClient;
using System.Configuration;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Net.Mime;
using System.Data;
using System.Collections.Specialized;

namespace PocketDCR2.Form
{
    public partial class RecoverPassword : Page
    {
        #region Private Members

        private DatabaseDataContext _dataContext;
        private SmsApi _sendSMS;
        private DAL dal;
        private NameValueCollection _nvCollection;
        List<DatabaseLayer.SQL.Employee> getEmployeeDetail;

        #endregion

        #region emailcred

        string smtphost = ConfigurationManager.AppSettings["AutoEmailSMTP"].ToString();
        string smtpPort = ConfigurationManager.AppSettings["smtpPort"].ToString();
        string fromAddress = ConfigurationManager.AppSettings["AutoEmailID"].ToString();
        string smtppassword = ConfigurationManager.AppSettings["AutoEmailIDpass"].ToString();
        //string ToAddress = ConfigurationManager.AppSettings["ToAddress"].ToString();

        #endregion

        #region Events

        protected void Page_Load(object sender, EventArgs e)
        {
            _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
            _sendSMS = new SmsApi();
            dal = new DAL();
            _nvCollection = new NameValueCollection();

        }

        protected void ContinueButton_Click(object sender, EventArgs e)
        {
            try
            {
                MembershipUser membershipUser = Membership.GetUser(UserName.Text);
                string newPassword = string.Empty;
                List<DatabaseLayer.SQL.Employee> getEmployeeDetail;
                long employeeId = 0;

                if (membershipUser == null)
                {
                    FailureText.Text = "Password rest failed. Invalid information.";
                    return;
                }
                else
                {
                    newPassword = membershipUser.ResetPassword();
                    getEmployeeDetail = _dataContext.sp_EmployeeSelectByCredential(UserName.Text, null).ToList();

                    if (getEmployeeDetail.Count > 0)
                    {
                        #region Update Membership With FirstTime Login

                        employeeId = Convert.ToInt64(getEmployeeDetail[0].EmployeeId);
                        var updateCredential = _dataContext.sp_EmployeeMembershipUpdateFirstTime(employeeId, 1).ToList();

                        #endregion
                        _nvCollection.Clear();
                        _nvCollection.Add("@empid-INT", employeeId.ToString());
                        DataTable dtemail = dal.GetData("sp_GetEmail", _nvCollection).Tables[0];

                        var employeeName = getEmployeeDetail[0].FirstName + " " + getEmployeeDetail[0].MiddleName + " " + getEmployeeDetail[0].LastName;



                        switch (Classes.Constants.GetRecoveryMethod())
                        {
                            case RecoverMethod.Default:
                                goto DefaultBehavior;

                            case RecoverMethod.EmailOnly:
                            DefaultBehavior:

                                #region Email Only
                                dal = new DAL();
                                _nvCollection = new NameValueCollection();
                                _nvCollection.Clear();
                                _nvCollection.Add("@empid-int", employeeId.ToString());

                                if (dtemail.Rows.Count > 0)
                                {
                                    if (IsValidEmail(dtemail.Rows[0]["Email"].ToString()))
                                    {
                                        SendMail(smtphost, smtpPort, fromAddress, dtemail.Rows[0]["Email"].ToString(), smtppassword, getEmployeeDetail[0].LoginId, employeeName, newPassword);
                                        FailureText.Text = "Security Code send to your Email";
                                    }
                                }
                                else
                                {
                                    FailureText.Text = "Email not found";
                                }
                                FailureText.Text = "Password sent! Please check your email: " + dtemail.Rows[0]["Email"].ToString();

                                #endregion

                                break;
                            case RecoverMethod.EmailAndShow:

                                #region Email And Show

                                dal = new DAL();
                                _nvCollection = new NameValueCollection();
                                _nvCollection.Clear();
                                _nvCollection.Add("@empid-int", employeeId.ToString());
                                dtemail = dal.GetData("sp_GetEmail", _nvCollection).Tables[0];

                                employeeName = getEmployeeDetail[0].FirstName + " " + getEmployeeDetail[0].MiddleName + " " + getEmployeeDetail[0].LastName;

                                if (dtemail.Rows.Count > 0)
                                {
                                    if (IsValidEmail(dtemail.Rows[0]["Email"].ToString()))
                                    {
                                        SendMail(smtphost, smtpPort, fromAddress, dtemail.Rows[0]["Email"].ToString(), smtppassword, getEmployeeDetail[0].LoginId, employeeName, newPassword);
                                        FailureText.Text = "Security Code send to your Email";
                                    }
                                }
                                else
                                {
                                    FailureText.Text = "Email not found";
                                }
                                FailureText.Text = "Your New Password Generated As " + newPassword + " And Emailed At Your Email Address: " + dtemail.Rows[0]["Email"].ToString();

                                #endregion

                                break;
                            case RecoverMethod.EmailAndSMS:

                                #region Email And SMS

                                dal = new DAL();
                                _nvCollection = new NameValueCollection();
                                _nvCollection.Clear();
                                _nvCollection.Add("@empid-int", employeeId.ToString());

                                if (dtemail.Rows.Count > 0)
                                {
                                    if (IsValidEmail(dtemail.Rows[0]["Email"].ToString()))
                                    {
                                        SendMail(smtphost, smtpPort, fromAddress, dtemail.Rows[0]["Email"].ToString(), smtppassword, getEmployeeDetail[0].LoginId, employeeName, newPassword);
                                        FailureText.Text = "Security Code send to your Email";
                                    }
                                }
                                else
                                {
                                    FailureText.Text = "Email not found";
                                }


                                /// NOW SMS HERE /////////////////

                                var mobileNumber = getEmployeeDetail[0].MobileNumber;
                                var messageText = @"Dear " + employeeName + ", Your password is reset now and new password is" + "\r\n" +
                                    newPassword + "\r\n";


                                string returnRespnse = _sendSMS.SendMessage(mobileNumber, messageText);



                                if (returnRespnse.ToLower() == "sent.")
                                {
                                    FailureText.Text += ", And SMS with the credentials are also been sent.";
                                }
                                else
                                {
                                    FailureText.Text += ", But SMS With Credentials Failed To Deliver.";
                                }

                                //var insertSentMessage = _dataContext.sp_SmsSentInsert("mycrm", mobileNumber, messageText, DateTime.Now).ToList();

                                //if (insertSentMessage.Count > 0)
                                //{
                                //    long smsId = Convert.ToInt64(insertSentMessage[0].SmsId);
                                //    string returnRespnse = _sendSMS.SendMessage(mobileNumber, messageText);
                                //    var updateSentMessage = _dataContext.sp_SmsSentUpdate(smsId, returnRespnse).ToList();
                                //}


                                //FailureText.Text += "<br />Password sent! and Your new password is " + newPassword;
                                //employeeName += getEmployeeDetail[0].FirstName + " " + getEmployeeDetail[0].MiddleName + " " + getEmployeeDetail[0].LastName;
                                //mobileNumber += getEmployeeDetail[0].MobileNumber;
                                //messageText += @"<br />Dear " + employeeName + ", Your password is reset now and new password is" + "\r\n" +
                                //    newPassword + "\r\n";

                                ////var insertSentMessage = _dataContext.sp_SmsSentInsert("mycrm", mobileNumber, messageText, DateTime.Now).ToList();

                                //if (insertSentMessage.Count > 0)
                                //{
                                //    long smsId = Convert.ToInt64(insertSentMessage[0].SmsId);

                                //    var updateSentMessage = _dataContext.sp_SmsSentUpdate(smsId, returnRespnse).ToList();
                                //}


                                #endregion

                                break;

                            case RecoverMethod.ShowOnly:

                                FailureText.Text = "Your new password is " + newPassword;
                                break;

                            default:
                                goto DefaultBehavior;
                        }





                        /* //#region Provide Password According to parameters

                        //if (Constants.IsDsplayResetPassword)
                        //{
                        //    //FailureText.Text = "Your new password is " + newPassword;
                        //}
                        //else
                        //{


                        //    #region Password reset through email verification

                        //    dal = new DAL();
                        //    _nvCollection = new NameValueCollection();
                        //    _nvCollection.Clear();
                        //    _nvCollection.Add("@empid-int", employeeId.ToString());
                        //     dtemail = dal.GetData("sp_GetEmail", _nvCollection).Tables[0];

                        //    employeeName = getEmployeeDetail[0].FirstName + " " + getEmployeeDetail[0].MiddleName + " " + getEmployeeDetail[0].LastName;

                        //    if (dtemail.Rows.Count > 0)
                        //    {
                        //        if (IsValidEmail(dtemail.Rows[0]["Email"].ToString()))
                        //        {
                        //            SendMail(smtphost, smtpPort, fromAddress, dtemail.Rows[0]["Email"].ToString(), smtppassword, getEmployeeDetail[0].LoginId, employeeName, newPassword);
                        //            //SendMail(smtphost, smtpPort, fromAddress, "umer@bmcsolution.com", smtppassword, getEmployeeDetail[0].LoginId, employeeName , newPassword);

                        //            FailureText.Text = "Security Code send to your Email";
                        //        }
                        //    }
                        //    else
                        //    {
                        //        FailureText.Text = "Email not found";
                        //    }

                        //    //FailureText.Text = "Password sent! and Your new password is " + newPassword;
                        //    //FailureText.Text = "Password sent! Please check your email: umer@bmcsolution.com ";
                        //    FailureText.Text = "Password sent! Please check your email: " + dtemail.Rows[0]["Email"].ToString();

                        //    var mobileNumber = getEmployeeDetail[0].MobileNumber;
                        //    var messageText = @"Dear " + employeeName + ", Your password is reset now and new password is" + "\r\n" +
                        //        newPassword + "\r\n";

                        //    var insertSentMessage = _dataContext.sp_SmsSentInsert("mycrm", mobileNumber, messageText, DateTime.Now).ToList();

                        //    if (insertSentMessage.Count > 0)
                        //    {
                        //        long smsId = Convert.ToInt64(insertSentMessage[0].SmsId);
                        //        string returnRespnse = _sendSMS.SendMessage(mobileNumber, messageText);
                        //        var updateSentMessage = _dataContext.sp_SmsSentUpdate(smsId, returnRespnse).ToList();
                        //    }

                        //    #endregion

                        //    #region Old Passowrd reset code show method

                        //    FailureText.Text += "<br />Password sent! and Your new password is " + newPassword;
                        //    employeeName += getEmployeeDetail[0].FirstName + " " + getEmployeeDetail[0].MiddleName + " " + getEmployeeDetail[0].LastName;
                        //    mobileNumber += getEmployeeDetail[0].MobileNumber;
                        //    messageText += @"<br />Dear " + employeeName + ", Your password is reset now and new password is" + "\r\n" +
                        //        newPassword + "\r\n";

                        //    //var insertSentMessage = _dataContext.sp_SmsSentInsert("mycrm", mobileNumber, messageText, DateTime.Now).ToList();

                        //    if (insertSentMessage.Count > 0)
                        //    {
                        //        long smsId = Convert.ToInt64(insertSentMessage[0].SmsId);
                        //        string returnRespnse = _sendSMS.SendMessage(mobileNumber, messageText);
                        //        var updateSentMessage = _dataContext.sp_SmsSentUpdate(smsId, returnRespnse).ToList();
                        //    } 
                        //    #endregion


                        //}

                        //#endregion */
                    }
                }
            }
            catch (SqlException sqlException)
            {
                lblError.Text = sqlException.Message;
                mpError.Show();
            }
            catch (Exception exception)
            {
                lblError.Text = exception.Message;
                mpError.Show();
            }
        }

        protected void btnClose_Click(object sender, EventArgs e)
        {
            mpError.Hide();
        }

        #endregion

        #region Email

        private void SendMail(string smtphost, string smtpPort, string fromAddress, string ToAddress, string smtppassword, string username, string empName, string seccode)
        {

            MailMessage mail = new MailMessage();
            mail.Subject = "System Generated Code";
            mail.From = new MailAddress(fromAddress);
            mail.To.Add(ToAddress);
            //String Name = getEmployeeDetail[0].FirstName + " " + getEmployeeDetail[0].MiddleName + " " + getEmployeeDetail[0].LastName;
            mail.Body = @"<html><head><title></title></head><body><div style = 'border-top:3px solid #2484C6'>&nbsp;</div>
                           <span style = 'font-family:Arial;font-size:10pt'>Welcome !<br/><br/>Hi" + empName + " <br/><br/>User Name: " + username + "<br/><br/>As per your request, we have sent you the System generated code :  <b style = 'color: #ff3349 '>" + seccode + "</b><br/><br/>Thank you for using and supporting BMC Solution. <br /><br /><br />*** This is an system generated email, please do not reply ***<br /><br />Date : " + DateTime.Now + "  <br /> <br /> <br /><br />Warm Regards<br /><img src=\"cid:Footer\" /><br />BMC Support</span> </body></html>";

            mail.IsBodyHtml = true;

            AlternateView avHtml = AlternateView.CreateAlternateViewFromString(mail.Body, Encoding.Default, MediaTypeNames.Text.Html);
            string path = Server.MapPath("~/Images/Bmclogo.png");
            LinkedResource header = new LinkedResource(path, MediaTypeNames.Image.Jpeg);
            header.ContentId = "Footer";


            avHtml.LinkedResources.Add(header);

            mail.AlternateViews.Add(avHtml);
            SmtpClient smtp = new SmtpClient(smtphost, Convert.ToInt32(smtpPort));
            smtp.EnableSsl = false;
            NetworkCredential netCre = new NetworkCredential(fromAddress, smtppassword);
            smtp.Credentials = netCre;

            try
            {
                smtp.Send(mail);

            }
            catch (Exception ex)
            {
                ClientScript.RegisterStartupScript(GetType(), "alert", "alert('" + ex.ToString() + "');", true);
            }
        }

        bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        #endregion
    }
}