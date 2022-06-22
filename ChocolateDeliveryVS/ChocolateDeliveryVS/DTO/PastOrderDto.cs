using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChocolateDeliveryVS.DTO
{
    public class PastOrderDto
    {
        public int OrderId { get; set; }
        public string DeliveredTo { get; set; }
        public string DeliveredBy { get; set; }
        public string OrderState { get; set; }
        public string Address { get; set; }
        public string Comment { get; set; }
        public string Products { get; set; }
        public double Price { get; set; }
        public DateTime DeliveryTime { get; set; }
    }
}
