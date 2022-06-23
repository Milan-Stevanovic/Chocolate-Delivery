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
    [Route("api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpPost("verifyUserById")]
        public IActionResult VerifyUserById([FromBody] int id)
        {
            return Ok(_adminService.VerifyUserById(id));
        }

        [HttpPost("rejectUserById")]
        public IActionResult RejectUserById([FromBody] int id)
        {
            return Ok(_adminService.RejectUserById(id));
        }

        [HttpPost("addNewProduct")]
        public IActionResult AddNewProduct([FromBody] ProductDto productDto)
        {
            return Ok(_adminService.AddNewProduct(productDto));
        }

        [HttpGet("getAllOrders")]
        public IActionResult GetAllOrders()
        {
            return Ok(_adminService.GetAllOrders());
        }
    }
}
