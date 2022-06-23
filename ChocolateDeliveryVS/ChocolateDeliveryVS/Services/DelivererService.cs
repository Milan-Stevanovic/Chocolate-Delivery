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
                order.DeliveringTo = $"{_dbContext.Users.First(x => x.Id == dbOrder.CustomerId).FirstName} {_dbContext.Users.First(x => x.Id == dbOrder.CustomerId).LastName}";
                if (dbOrder.DelivererId == -1)
                    order.DeliveringBy = "-";
                else
                    order.DeliveringBy = $"{_dbContext.Users.First(x => x.Id == dbOrder.DelivererId).FirstName} {_dbContext.Users.First(x => x.Id == dbOrder.DelivererId).LastName}";
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
            IList<Order> orderList = _dbContext.Orders.ToList();
            foreach (var orderItem in orderList)
            {
                if (orderItem.Id == orderId)
                {
                    orderItem.DelivererId = delivererId;
                    orderItem.DeliveryTime = DateTime.Now.AddSeconds(new Random().Next(20, 30)); // TESTING
                    //orderItem.DeliveryTime = DateTime.Now.AddMinutes(new Random().Next(15, 25));
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
            var allOrdersFromDb = _dbContext.Orders.ToList().Where(x => x.DelivererId == delivererId && x.OrderState == "DELIVERED");

            foreach (var dbOrder in allOrdersFromDb)
            {
                var orderProducts = _dbContext.OrderProducts.Where(x => x.OrderId == dbOrder.Id);
                OrderDisplayDto order = new OrderDisplayDto();
                order.Id = dbOrder.Id;
                order.DeliveringTo = $"{_dbContext.Users.First(x => x.Id == dbOrder.CustomerId).FirstName} {_dbContext.Users.First(x => x.Id == dbOrder.CustomerId).LastName}";
                order.DeliveringBy = $"{_dbContext.Users.First(x => x.Id == dbOrder.DelivererId).FirstName} {_dbContext.Users.First(x => x.Id == dbOrder.DelivererId).LastName}";
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
    }
}
