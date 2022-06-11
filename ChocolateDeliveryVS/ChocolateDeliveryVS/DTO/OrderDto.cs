using ChocolateDeliveryVS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChocolateDeliveryVS.DTO
{
    public class OrderDto
    {
        public int CustomerId { get; set; }
        public string Address { get; set; }
        public string Comment { get; set; }
        public ICollection<OrderProduct> OrderProducts { get; set; }
        public double Price { get; set; }
    }
}
