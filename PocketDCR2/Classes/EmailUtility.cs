using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace PocketDCR2.Classes
{
    public class EmailUtility
    {
        #region Public Functions

        public static bool SendEmail(string recepient, string subject, string body) 
        {
            bool flag = false;

            //Replace this with your own Gmail address
            string from = Constants.SmtpSender;

            // Replace this with Email address to whom you want to send mail
            string to = recepient;

            var mail = new MailMessage();
            mail.To.Add(recepient);
            mail.From = new MailAddress(from, "PocketDCR", Encoding.UTF8);
            mail.Subject = subject;
            mail.SubjectEncoding = Encoding.UTF8;
            mail.Body = body;
            mail.BodyEncoding = Encoding.UTF8;
            mail.IsBodyHtml = true;
            mail.Priority = MailPriority.Normal;

            var smtpClient = new SmtpClient();
            if (Boolean.Parse(Constants.SmtpAuthonticate))
            {
                smtpClient.Credentials = new NetworkCredential(from, Constants.SmtpPassword);
            }
            else 
            {
                smtpClient.UseDefaultCredentials = true;
            }

            smtpClient.Port = int.Parse(Constants.SmtpPort);
            smtpClient.Host = Constants.SmtpServer;
            smtpClient.EnableSsl = Boolean.Parse(Constants.SmtpSsl);

            try
            {
                smtpClient.Send(mail);
                flag = true;
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
                flag = false;
            }

            return flag;
        }

        #endregion
    }
}