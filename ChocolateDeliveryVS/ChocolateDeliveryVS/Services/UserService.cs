using AutoMapper;
using ChocolateDeliveryVS.DTO;
using ChocolateDeliveryVS.Infrastructure;
using ChocolateDeliveryVS.Interfaces;
using ChocolateDeliveryVS.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ChocolateDeliveryVS.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly IConfigurationSection _secretKey;
        private readonly DeliveryDbContext _dbContext;

        public UserService(IMapper mapper, DeliveryDbContext dbContext, IConfiguration config)
        {
            _mapper = mapper;
            _dbContext = dbContext;
            _secretKey = config.GetSection("SecretKey");
        }

        public List<UserDisplayDto> GetAllUsers()
        {
            return _mapper.Map<List<UserDisplayDto>>(_dbContext.Users.ToList());
        }

        public bool Register(UserRegisterDto userDto)
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

        public TokenDto Login(UserLoginDto dto)
        {
            User user = null;
            try
            {
                user = _dbContext.Users.First(x => x.Email == dto.Email);
            }
            catch (Exception)
            {
                return null;
            }

            if (user == null)
                return null;

            if (BCrypt.Net.BCrypt.Verify(dto.Password, user.Password)) //Uporedjujemo hes pasvorda iz baze i unetog pasvorda
            {
                List<Claim> claims = new List<Claim>();
                //Mozemo dodati Claimove u token, oni ce biti vidljivi u tokenu i mozemo ih koristiti za autorizaciju
                if (user.Role== "ADMIN")
                    claims.Add(new Claim("role", "ADMIN")); //Add user type to claim
                if (user.Role == "CUSTOMER")
                    claims.Add(new Claim("role", "CUSTOMER")); //Add user type to claim
                if (user.Role == "DELIVERER")
                    claims.Add(new Claim("role", "DELIVERER")); //Add user type to claim

                claims.Add(new Claim("email", user.Email));

                //Kreiramo kredencijale za potpisivanje tokena. Token mora biti potpisan privatnim kljucem
                //kako bi se sprecile njegove neovlascene izmene
                SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokenOptions = new JwtSecurityToken(
                    issuer: "https://localhost:44398", //url servera koji je izdao token
                    claims: claims, //claimovi
                    expires: DateTime.Now.AddMinutes(15), //vazenje tokena u minutama
                    signingCredentials: signinCredentials //kredencijali za potpis
                );
                string tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                return new TokenDto { Token = tokenString };
            }
            else
            {
                return null;
            }
        }
    }
}
