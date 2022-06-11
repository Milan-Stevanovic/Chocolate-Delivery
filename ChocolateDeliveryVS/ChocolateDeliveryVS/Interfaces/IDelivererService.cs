using ChocolateDeliveryVS.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChocolateDeliveryVS.Interfaces
{
    public interface IDelivererService
    {
        List<OrderDisplayDto> GetAllOrders();
    }
}
