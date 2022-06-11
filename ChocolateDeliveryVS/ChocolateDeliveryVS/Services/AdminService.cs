using AutoMapper;
using ChocolateDeliveryVS.Infrastructure;
using ChocolateDeliveryVS.Interfaces;
using ChocolateDeliveryVS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Text;
using System.Net;

namespace ChocolateDeliveryVS.Services
{
    public class AdminService : IAdminService
    {
        private readonly IMapper _mapper;
        private readonly DeliveryDbContext _dbContext;

        public AdminService(IMapper mapper, DeliveryDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public bool RejectUserById(int id)
        {
            User user = null;
            try
            {
                user = _dbContext.Users.First(x => x.Id == id);
            }
            catch (Exception)
            {
                return false;
            }

            if (user == null)
                return false;

            user.Verified = false;

            SendMail(user.Email, "Chocolate Delivery Verification", "You are not verified! :(");

            _dbContext.SaveChanges();
            return true;
        }

        public bool VerifyUserById(int id)
        {
            User user = null;
            try
            {
                user = _dbContext.Users.First(x => x.Id == id);
            }
            catch (Exception)
            {
                return false;
            }

            if (user == null)
                return false;

            user.Verified = true;

            SendMail(user.Email, "Chocolate Delivery Verification", "You are successfully verified!");

            _dbContext.SaveChanges();
            return true;
        }

        public void SendMail(string toEmail, string subject, string body)
        {
            try
            {
                MailMessage message = new MailMessage();
                SmtpClient smtp = new SmtpClient();
                message.From = new MailAddress("milanscontact908@gmail.com");
                message.To.Add(new MailAddress(toEmail));
                message.Subject = subject;
                message.IsBodyHtml = true; //to make message body as html  
                message.Body = $"<h1>{body}</h1>";
                smtp.Port = 587;
                smtp.Host = "smtp.gmail.com"; //for gmail host  
                smtp.EnableSsl = true;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new NetworkCredential("milanscontact908@gmail.com", "ncswvltmpdnijesg");
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Send(message);
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine("[ERROR] Failed to send email. " + e.Message);
            }
        }
    }
}
