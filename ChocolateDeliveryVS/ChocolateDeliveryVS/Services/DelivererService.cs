﻿using AutoMapper;
using ChocolateDeliveryVS.DTO;
using ChocolateDeliveryVS.Infrastructure;
using ChocolateDeliveryVS.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChocolateDeliveryVS.Services
{
    public class DelivererService : IDelivererService
    {
        private readonly IMapper _mapper;
        private readonly DeliveryDbContext _dbContext;

        public DelivererService(IMapper mapper, DeliveryDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public List<OrderDisplayDto> GetAllOrders()
        {
            return _mapper.Map<List<OrderDisplayDto>>(_dbContext.Orders.ToList());
        }

        public bool AcceptOrder(int orderId, int delivererId)
        {
            bool orderAccepted = false;
            foreach (var orderItem in _dbContext.Orders)
            {
                if (orderItem.Id == orderId)
                {
                    orderItem.DelivererId = delivererId;
                    orderItem.DeliveryTime = DateTime.Now.AddSeconds(new Random().Next(20, 30)); // TESTING
                    //orderItem.DeliveryTime = DateTime.Now.AddMinutes(new Random().Next(15, 20));
                    orderItem.OrderState = "IN_DELIVERY";
                    orderAccepted = true;
                }
            }
            _dbContext.SaveChanges();
            return orderAccepted;
        }
    }
}
