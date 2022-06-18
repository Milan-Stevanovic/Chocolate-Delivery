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
            return Ok(_customerService.ConfirmOrder(orderDto));
        }

        [HttpPost("checkIfOrderExists")]
        public IActionResult CheckIfOrderExists([FromBody] int customerId)
        {
            return Ok(_customerService.CheckIfOrderExists(customerId));
        }

        [HttpPost("getOrderState")]
        public IActionResult GetOrderState([FromBody] int customerId)
        {
            return Ok(_customerService.GetOrderState(customerId));
        }
    }
}