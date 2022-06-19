using AutoMapper;
using ChocolateDeliveryVS.DTO;
using ChocolateDeliveryVS.Infrastructure;
using ChocolateDeliveryVS.Interfaces;
using ChocolateDeliveryVS.Models;
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
            IList<Order> orderList = _dbContext.Orders.ToList();
            foreach (var orderItem in orderList)
            {
                if (orderItem.Id == orderId)
                {
                    orderItem.DelivererId = delivererId;
                    //orderItem.DeliveryTime = DateTime.Now.AddSeconds(new Random().Next(20, 30)); // TESTING
                    orderItem.DeliveryTime = DateTime.Now.AddMinutes(new Random().Next(15, 25));
                    orderItem.OrderState = "IN_DELIVERY";
                    _dbContext.SaveChanges();
                    return true;
                }
            }
            return false;
        }
    }
}
