using ChocolateDeliveryVS.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChocolateDeliveryVS.Interfaces
{
    public interface IUserService
    {
        UserProfileDto GetUserById(int id);
        List<UserDisplayDto> GetAllUsers();
        bool Register(UserRegisterDto userDto);
        TokenDto Login(UserLoginDto dto);
    }
}
