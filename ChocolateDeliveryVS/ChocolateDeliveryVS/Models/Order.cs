using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChocolateDeliveryVS.Models
{
    public enum OrderState { PENDING, DELIVERED, IN_TRANSIT }

    public class Order
    {
        public int CustomerId { get; set; }
        public int Id { get; set; }
        public OrderState OrderState { get; set; }
        public string Address { get; set; }
        public string Comment { get; set; }
        public List<Product> Products { get; set; }
        public double Price { get; set; }
    }
}
