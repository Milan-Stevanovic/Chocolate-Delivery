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
            
            // If address is null or empty, use address provided during register
            if(String.IsNullOrEmpty(order.Address))
            {
                order.Address = _dbContext.Users.Find(Convert.ToInt64(order.CustomerId)).Address;
            }

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
            order.DeliveryTime = DateTime.MaxValue;
            order.Price += 250; // delivery fee
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

        public List<OrderDisplayDto> GetAllPastOrders(int customerId)
        {
            List<OrderDisplayDto> pastOrders = new List<OrderDisplayDto>();
            var customerPastOrders = _dbContext.Orders.Where(x => x.CustomerId == customerId && x.OrderState == "DELIVERED");

            foreach(var pastOrder in customerPastOrders)
            {
                var orderProducts = _dbContext.OrderProducts.Where(x => x.OrderId == pastOrder.Id);
                OrderDisplayDto order = new OrderDisplayDto();
                order.Id = pastOrder.Id;
                order.DeliveringTo = $"{_dbContext.Users.First(x => x.Id == customerId).FirstName} {_dbContext.Users.First(x => x.Id == customerId).LastName}";
                order.DeliveringBy = $"{_dbContext.Users.First(x => x.Id == pastOrder.DelivererId).FirstName} {_dbContext.Users.First(x => x.Id == pastOrder.DelivererId).LastName}";
                order.Address = pastOrder.Address;
                order.Comment = pastOrder.Comment;
                order.OrderState = pastOrder.OrderState;
                order.Price = pastOrder.Price;
                order.DeliveryTime = pastOrder.DeliveryTime;
                foreach(var product in orderProducts)
                {
                    foreach(var loadedProduct in _dbContext.Products)
                    {
                        if(product.ProductId == loadedProduct.Id)
                        {
                            order.Products += $"[{loadedProduct.Name} X {product.Quantity}]\n";
                        }
                    }
                }
                pastOrders.Add(order);
            }

            return pastOrders;
        }
    }
}