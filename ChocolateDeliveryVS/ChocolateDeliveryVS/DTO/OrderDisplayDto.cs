using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChocolateDeliveryVS.DTO
{
    public class OrderDisplayDto
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int DelivererId { get; set; }
        public string OrderState { get; set; }
        public string Address { get; set; }
        public string Comment { get; set; }
        public double Price { get; set; }
        public DateTime DeliveryTime { get; set; }
    }
}
