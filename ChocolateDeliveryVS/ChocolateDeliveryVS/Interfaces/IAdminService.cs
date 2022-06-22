using ChocolateDeliveryVS.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChocolateDeliveryVS.Interfaces
{
    public interface IAdminService
    {
        bool VerifyUserById(int id);
        bool RejectUserById(int id);
        bool AddNewProduct(ProductDto productDto);
    }
}
