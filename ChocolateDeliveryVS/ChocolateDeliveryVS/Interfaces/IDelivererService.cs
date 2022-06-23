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
        bool AcceptOrder(int orderId, int delivererId);
        List<OrderDisplayDto> GetAllPastOrders(int delivererId);
        bool CheckIfOrderExists(int delivererId);
        OrderStateDto GetOrderState(int delivererId);
    }
}
