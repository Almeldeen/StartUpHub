using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Helper
{
  public static class EmailHelper
    {
        public static bool SendEmail(string userEmail, string confirmationLink)
        {
            try
            {
                MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress("almeldeen06@gmail.com", "StartUpHub"); //IMPORTANT: This must be same as your smtp authentication address.
            mailMessage.To.Add(userEmail);
        

            mailMessage.Subject = "Confirm your email";
            mailMessage.IsBodyHtml = true;
            mailMessage.Body = confirmationLink;

            SmtpClient smtp = new SmtpClient();

            //IMPORANT:  Your smtp login email MUST be same as your FROM address. 
            NetworkCredential Credentials = new NetworkCredential("almeldeen06@gmail.com", "dwepgdwtxmujjhig");
            smtp.Host = "smtp.gmail.com";
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = Credentials;
            smtp.Port = 587;    //alternative port number is 8889
            smtp.EnableSsl = true;
            smtp.Timeout = 100000;
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
            mailMessage.IsBodyHtml = true;
            mailMessage.BodyEncoding = UTF8Encoding.UTF8;
            smtp.Send(mailMessage);

            
                
            }
            catch (Exception ex)
            {
                // log exception
            }
            return false;
        }
    }
}
