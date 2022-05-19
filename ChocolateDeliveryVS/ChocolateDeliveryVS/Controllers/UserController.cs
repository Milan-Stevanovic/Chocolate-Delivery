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
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("getAllUsers")]
        public IActionResult GetAllUsers()
        {
            return Ok(_userService.GetAllUsers());
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] UserDto userDto)
        {
            if (_userService.Register(userDto))
                return Ok();
            else
                return Problem();
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] UserDto userDto)
        {
            TokenDto token = _userService.Login(userDto);
            if (token != null)
                return Ok(token);
            else
                return Problem();
        }
    }
}
