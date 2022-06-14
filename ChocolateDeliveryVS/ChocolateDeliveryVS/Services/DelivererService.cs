using AutoMapper;
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
        private readonly OrderData _orderData;

        public DelivererService(IMapper mapper, DeliveryDbContext dbContext, OrderData orderData)
        {
            _mapper = mapper;
            _dbContext = dbContext;
            _orderData = orderData;
        }

        public List<OrderDisplayDto> GetAllOrders()
        {
            return _mapper.Map<List<OrderDisplayDto>>(_dbContext.Orders.ToList());
        }

        public bool AcceptOrder(int orderId)
        {
            foreach (var order in _dbContext.Orders)
            {
                if(order.Id == orderId)
                {
                    order.OrderState = "IN_DELIVERY";
                    _orderData.ordersDict[order.CustomerId].Start();
                    return true;
                }
            }
            return false;
        }
    }
}
