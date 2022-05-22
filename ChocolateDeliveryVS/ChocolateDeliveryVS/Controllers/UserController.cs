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

        [HttpGet("getUserById/{id}")]
        public IActionResult GetUserById(int id)
        {
            UserProfileDto user = _userService.GetUserById(id);
            if (user != null)
                return Ok(user);
            else
                return Problem();
        }

        [HttpGet("getAllUsers")]
        public IActionResult GetAllUsers()
        {
            return Ok(_userService.GetAllUsers());
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] UserRegisterDto userRegisterDto)
        {
            if (_userService.Register(userRegisterDto))
                return Ok();
            else
                return Problem();
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] UserLoginDto userLoginDto)
        {
            TokenDto token = _userService.Login(userLoginDto);
            if (token != null)
                return Ok(token);
            else
                return Problem();
        }
    }
}
