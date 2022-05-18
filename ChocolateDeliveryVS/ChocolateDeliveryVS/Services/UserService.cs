using AutoMapper;
using ChocolateDeliveryVS.DTO;
using ChocolateDeliveryVS.Infrastructure;
using ChocolateDeliveryVS.Interfaces;
using ChocolateDeliveryVS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChocolateDeliveryVS.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly DeliveryDbContext _dbContext;

        public UserService(IMapper mapper, DeliveryDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public List<UserDisplayDto> GetAllUsers()
        {
            return _mapper.Map<List<UserDisplayDto>>(_dbContext.Users.ToList());
        }

        public bool Register(UserDto userDto)
        {
            User user = _mapper.Map<User>(userDto);
            bool valid = true;

            // Validation
            if (userDto.Password != userDto.ConfirmPassword)
                valid = false;

            if (string.IsNullOrEmpty(user.Username) ||
                string.IsNullOrEmpty(user.Email) ||
                string.IsNullOrEmpty(user.Password) ||
                string.IsNullOrEmpty(user.FirstName) ||
                string.IsNullOrEmpty(user.LastName) ||
                string.IsNullOrEmpty(user.Address) ||
                string.IsNullOrEmpty(user.Role) ||
                string.IsNullOrEmpty(user.ProfilePicture))
            {
                valid = false;
            }


            foreach (var item in _dbContext.Users.ToList())
            {
                if (item.Email.Equals(user.Email) || item.Username.Equals(user.Username))
                {
                    // Username or Email not Unique
                    valid = false;
                }
            }


            if (valid)
            {
                // Valid
                if (user.Role.Equals("DELIVERER"))
                    user.Verified = false;
                else
                    user.Verified = true;

                // Hash Password that will be written in database
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

                _dbContext.Users.Add(user);
                _dbContext.SaveChanges();
                return true;
            }
            else
            {
                // Not Valid
                return false;
            }
        }

    }
}
