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

            foreach (var item in _dbContext.Users.ToList())
            {
                if(item.Email.Equals(user.Email) || item.Username.Equals(user.Username))
                {
                    valid = false;
                }
            }

            if(valid)
            {
                _dbContext.Users.Add(user);
                _dbContext.SaveChanges();
                return true;
            }
            return false;
        }

    }
}
