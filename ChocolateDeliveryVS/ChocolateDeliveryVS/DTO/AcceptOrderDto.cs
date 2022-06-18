using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChocolateDeliveryVS.DTO
{
    public class AcceptOrderDto
    {
        public int OrderId { get; set; }
        public int DelivererId { get; set; }
    }
}
