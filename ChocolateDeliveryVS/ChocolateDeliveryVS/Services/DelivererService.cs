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
            List<OrderDisplayDto> allOrders = new List<OrderDisplayDto>();
            var allOrdersFromDb = _dbContext.Orders.ToList();

            foreach (var dbOrder in allOrdersFromDb)
            {
                var orderProducts = _dbContext.OrderProducts.Where(x => x.OrderId == dbOrder.Id);
                OrderDisplayDto order = new OrderDisplayDto();
                order.Id = dbOrder.Id;
                order.DeliveryTo = $"{_dbContext.Users.First(x => x.Id == dbOrder.CustomerId).FirstName} {_dbContext.Users.First(x => x.Id == dbOrder.CustomerId).LastName}";
                if (dbOrder.DelivererId == -1)
                    order.DeliveryBy = "-";
                else
                    order.DeliveryBy = $"{_dbContext.Users.First(x => x.Id == dbOrder.DelivererId).FirstName} {_dbContext.Users.First(x => x.Id == dbOrder.DelivererId).LastName}";
                order.Address = dbOrder.Address;
                order.Comment = dbOrder.Comment;
                order.OrderState = dbOrder.OrderState;
                order.Price = dbOrder.Price;
                order.DeliveryTime = dbOrder.DeliveryTime;
                foreach (var product in orderProducts)
                {
                    foreach (var loadedProduct in _dbContext.Products)
                    {
                        if (product.ProductId == loadedProduct.Id)
                        {
                            order.Products += $"[{loadedProduct.Name} X {product.Quantity}]\n";
                        }
                    }
                }
                allOrders.Add(order);
            }
            return allOrders;
        }

        public bool AcceptOrder(int orderId, int delivererId)
        {
            if (_dbContext.Users.Find(Convert.ToInt64(delivererId)).Verified != true) // check if deliverer is verified
                return false;

            IList<Order> orderList = _dbContext.Orders.ToList();

            // check if deliverer already has active delivery
            foreach (var orderItem in orderList)
            {
                if(orderItem.OrderState == "IN_DELIVERY" && orderItem.DelivererId == delivererId)
                    return false;
            }

            foreach (var orderItem in orderList)
            {
                if (orderItem.Id == orderId)
                {
                    orderItem.DelivererId = delivererId;
                    //orderItem.DeliveryTime = DateTime.Now.AddSeconds(new Random().Next(20, 30)); // TESTING
                    orderItem.DeliveryTime = DateTime.Now.AddMinutes(new Random().Next(25, 35));
                    orderItem.OrderState = "IN_DELIVERY";
                    _dbContext.SaveChanges();
                    return true;
                }
            }
            return false;
        }

        public List<OrderDisplayDto> GetAllPastOrders(int delivererId)
        {
            List<OrderDisplayDto> allOrders = new List<OrderDisplayDto>();
            var dbOrders = _dbContext.Orders.ToList().Where(x => x.DelivererId == delivererId && x.OrderState == "DELIVERED");

            foreach (var dbOrder in dbOrders)
            {
                var orderProducts = _dbContext.OrderProducts.Where(x => x.OrderId == dbOrder.Id);
                OrderDisplayDto order = new OrderDisplayDto();
                order.Id = dbOrder.Id;
                order.DeliveryTo = $"{_dbContext.Users.First(x => x.Id == dbOrder.CustomerId).FirstName} {_dbContext.Users.First(x => x.Id == dbOrder.CustomerId).LastName}";
                order.DeliveryBy = $"{_dbContext.Users.First(x => x.Id == dbOrder.DelivererId).FirstName} {_dbContext.Users.First(x => x.Id == dbOrder.DelivererId).LastName}";
                order.Address = dbOrder.Address;
                order.Comment = dbOrder.Comment;
                order.OrderState = dbOrder.OrderState;
                order.Price = dbOrder.Price;
                order.DeliveryTime = dbOrder.DeliveryTime;
                foreach (var product in orderProducts)
                {
                    foreach (var loadedProduct in _dbContext.Products)
                    {
                        if (product.ProductId == loadedProduct.Id)
                        {
                            order.Products += $"[{loadedProduct.Name} X {product.Quantity}]\n";
                        }
                    }
                }
                allOrders.Add(order);
            }
            return allOrders;
        }

        public bool CheckIfOrderExists(int delivererId)
        {
            foreach (var order in _dbContext.Orders)
            {
                if (order.DelivererId == delivererId)
                {
                    if (order.OrderState == "IN_DELIVERY")
                    {
                        return true;
                    }
                }
            }
            return false; // Order does not exist
        }

        public OrderStateDto GetOrderState(int delivererId)
        {
            OrderStateDto orderStateDto = new OrderStateDto();
            foreach (var orderItem in _dbContext.Orders)
            {
                if (orderItem.DelivererId == delivererId)
                {
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
