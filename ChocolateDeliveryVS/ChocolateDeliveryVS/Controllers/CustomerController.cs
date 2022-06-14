using ChocolateDeliveryVS.DTO;
using ChocolateDeliveryVS.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChocolateDeliveryVS.Controllers
{
    [Route("api/customer")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet("getAllProducts")]
        public IActionResult GetAllProducts()
        {
            return Ok(_customerService.GetAllProducts());
        }

        [HttpPost("confirmOrder")]
        public IActionResult ConfirmOrder([FromBody] OrderDto orderDto)
        {
            if (_customerService.ConfirmOrder(orderDto))
                return Ok();
            else
                return Problem();
        }

        [HttpPost("checkIfOrderExists")]
        public IActionResult CheckIfOrderExists([FromBody] int customerId)
        {
            bool exists = _customerService.CheckIfOrderExists(customerId);
            if (!exists)
                return Ok(exists);
            else
                return Problem();
        }
    }
}