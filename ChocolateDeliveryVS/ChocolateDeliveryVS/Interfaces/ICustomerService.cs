using ChocolateDeliveryVS.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChocolateDeliveryVS.Interfaces
{
    public interface ICustomerService
    {
        List<ProductDto> GetAllProducts();
        bool ConfirmOrder(OrderDto orderDto);
        /// <summary>
        /// Returns true if order (in_delivery or pending) does exist and false if it doesn't
        /// </summary>
        /// <param name="customerId"></param>
        /// <returns></returns>
        bool CheckIfOrderExists(int customerId);
        OrderStateDto GetOrderState(int customerId);

        List<PastOrderDto> GetAllPastOrders(int customerId);
    }
}
