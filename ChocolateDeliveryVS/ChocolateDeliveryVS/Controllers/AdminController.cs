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
            if (_adminService.VerifyUserById(id))
                return Ok();
            else
                return Problem();
        }

        [HttpPost("rejectUserById")]
        public IActionResult RejectUserById([FromBody] int id)
        {
            if (_adminService.RejectUserById(id))
                return Ok();
            else
                return Problem();
        }
    }
}
