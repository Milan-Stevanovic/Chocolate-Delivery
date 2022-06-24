using ChocolateDeliveryVS.DTO;
using ChocolateDeliveryVS.Interfaces;
using Microsoft.AspNetCore.Authorization;
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
        [Authorize(Roles = "CUSTOMER")]
        public IActionResult GetAllProducts()
        {
            return Ok(_customerService.GetAllProducts());
        }

        [HttpPost("confirmOrder")]
        [Authorize(Roles = "CUSTOMER")]
        public IActionResult ConfirmOrder([FromBody] OrderDto orderDto)
        {
            return Ok(_customerService.ConfirmOrder(orderDto));
        }

        [HttpPost("checkIfOrderExists")]
        [Authorize(Roles = "CUSTOMER")]
        public IActionResult CheckIfOrderExists([FromBody] int customerId)
        {
            return Ok(_customerService.CheckIfOrderExists(customerId));
        }

        [HttpPost("getOrderState")]
        [Authorize(Roles = "CUSTOMER")]
        public IActionResult GetOrderState([FromBody] int customerId)
        {
            return Ok(_customerService.GetOrderState(customerId));
        }

        [HttpPost("getAllPastOrders")]
        [Authorize(Roles = "CUSTOMER")]
        public IActionResult GetAllPastOrders([FromBody] int customerId)
        {
            return Ok(_customerService.GetAllPastOrders(customerId));
        }
    }
}