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
        bool CheckIfOrderExists(int customerId);
    }
}
