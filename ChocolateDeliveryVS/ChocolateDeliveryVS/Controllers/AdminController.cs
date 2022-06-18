﻿using ChocolateDeliveryVS.Interfaces;
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
    }
}
