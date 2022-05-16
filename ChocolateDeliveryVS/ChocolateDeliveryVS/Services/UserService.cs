using ChocolateDeliveryVS.DTO;
using ChocolateDeliveryVS.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChocolateDeliveryVS.Services
{
    public class UserService : IUserService
    {
        public string Register(RegisterDto registerDto)
        {
            System.Diagnostics.Debug.WriteLine("\n\nTESTING");
            System.Diagnostics.Debug.WriteLine(registerDto.Username + " | " + registerDto.Password + " | " + registerDto.DateOfBirth);
            return "";
        }
    }
}
