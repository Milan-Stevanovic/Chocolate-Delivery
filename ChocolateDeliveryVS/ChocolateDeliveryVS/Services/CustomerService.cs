using AutoMapper;
using ChocolateDeliveryVS.DTO;
using ChocolateDeliveryVS.Infrastructure;
using ChocolateDeliveryVS.Interfaces;
using ChocolateDeliveryVS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ChocolateDeliveryVS.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly IMapper _mapper;
        private readonly DeliveryDbContext _dbContext;

        public CustomerService(IMapper mapper, DeliveryDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public List<ProductDto> GetAllProducts()
        {
            return _mapper.Map<List<ProductDto>>(_dbContext.Products.ToList());
        }

        public bool ConfirmOrder(OrderDto orderDto)
        {
            Order order = _mapper.Map<Order>(orderDto);

            foreach (var orderItem in _dbContext.Orders)
            {
                if (orderItem.CustomerId == order.CustomerId && orderItem.OrderState == "PENDING")
                    return false; // customer already has pending order
            }

            ICollection<OrderProduct> products = new List<OrderProduct>();
            // TODO : Logic for order
            foreach (var orderProduct in order.OrderProducts)
            {
                Product product = _dbContext.Products.Find(orderProduct.ProductId);
;               products.Add(new OrderProduct() 
                {   
                    Order = order,
                    Product = product, 
                    OrderId = order.Id, 
                    ProductId = orderProduct.ProductId, 
                    Quantity = orderProduct.Quantity
                });
            }
            order.OrderProducts = products;
            order.DelivererId = -1;
            order.OrderState = "PENDING";
            order.DeliveryTime = DateTime.Now;
            _dbContext.Orders.Add(order);
            _dbContext.SaveChanges();

            return true;
        }

        public bool CheckIfOrderExists(int customerId)
        {
            foreach (var orderItem in _dbContext.Orders)
            {
                if (orderItem.CustomerId == customerId)
                {
                    if(orderItem.OrderState == "PENDING" || orderItem.OrderState == "IN_DELIVERY")
                    {
                        return true;
                    }
                }
            }
            return false; // Order does not exist
        }

        public OrderStateDto GetOrderState(int customerId)
        {
            OrderStateDto orderStateDto = new OrderStateDto();
            foreach (var orderItem in _dbContext.Orders)
            {
                if (orderItem.CustomerId == customerId)
                {
                    if (orderItem.OrderState == "PENDING")
                    {
                        orderStateDto.OrderState = orderItem.OrderState;
                    }
                    if (orderItem.OrderState == "IN_DELIVERY")
                    {
                        orderStateDto.OrderState = orderItem.OrderState;
                        orderStateDto.DeliveryTime = orderItem.DeliveryTime;
                    }
                }
            }
            return orderStateDto;
        }
    }
}