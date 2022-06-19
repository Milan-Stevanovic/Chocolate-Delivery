using ChocolateDeliveryVS.Infrastructure;
using ChocolateDeliveryVS.Interfaces;
using ChocolateDeliveryVS.Models;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ChocolateDeliveryVS.Services
{
    public class DefaultScopedProcessingService : IScopedProcessingService
    {
        private readonly DeliveryDbContext _dbContext;

        public DefaultScopedProcessingService (DeliveryDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task DoWorkAsync(CancellationToken stoppingToken)
        {
            while (true)
            {
                IList<Order> orderList = _dbContext.Orders.ToList();
                foreach (var order in orderList)
                {
                    _dbContext.Entry(order).Reload();
                    int result = DateTime.Compare(order.DeliveryTime, DateTime.Now);
                    //System.Diagnostics.Debug.WriteLine($"{order.DeliveryTime} - {DateTime.Now}    =    result = {result}");
                    if (result < 0 && order.OrderState != "DELIVERED") // if order.DeliveryTime is earlier that DateTime.Now
                    {
                        order.OrderState = "DELIVERED";
                        await _dbContext.SaveChangesAsync();
                    }
                }
                await Task.Delay(1000);
            }
        }
    }
}
