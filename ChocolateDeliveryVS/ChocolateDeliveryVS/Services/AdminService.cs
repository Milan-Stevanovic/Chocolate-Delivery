﻿using AutoMapper;
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

            // TODO: Send Email Notification to user.Email
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

            // TODO: Send Email Notification to user.Email
            _dbContext.SaveChanges();
            return true;
        }
    }
}
