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
    [Route("api/deliverer")]
    [ApiController]
    public class DelivererController : ControllerBase
    {
        private readonly IDelivererService _delivererService;

        public DelivererController(IDelivererService delivererService)
        {
            _delivererService = delivererService;
        }

        [HttpGet("getAllOrders")]
        public IActionResult GetAllUsers()
        {
            return Ok(_delivererService.GetAllOrders());
        }

        [HttpPost("acceptOrder")]
        public IActionResult AcceptOrder([FromBody] AcceptOrderDto acceptOrderDto)
        {
            return Ok(_delivererService.AcceptOrder(acceptOrderDto.OrderId, acceptOrderDto.DelivererId));
        }

        [HttpPost("getAllPastOrders")]
        public IActionResult GetAllPastOrders([FromBody] int delivererId)
        {
            return Ok(_delivererService.GetAllPastOrders(delivererId));
        }

        [HttpPost("checkIfOrderExists")]
        public IActionResult CheckIfOrderExists([FromBody] int delivererId)
        {
            return Ok(_delivererService.CheckIfOrderExists(delivererId));
        }

        [HttpPost("getOrderState")]
        public IActionResult GetOrderState([FromBody] int delivererId)
        {
            return Ok(_delivererService.GetOrderState(delivererId));
        }
    }
}
