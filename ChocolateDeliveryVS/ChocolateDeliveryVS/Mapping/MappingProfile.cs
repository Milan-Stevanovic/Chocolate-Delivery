using AutoMapper;
using ChocolateDeliveryVS.DTO;
using ChocolateDeliveryVS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChocolateDeliveryVS.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserRegisterDto>().ReverseMap();
            CreateMap<User, UserLoginDto>().ReverseMap();
            CreateMap<User, UserDisplayDto>().ReverseMap();
            CreateMap<User, UserProfileDto>().ReverseMap();

            CreateMap<Order, OrderDto>().ReverseMap();
            CreateMap<Order, OrderDisplayDto>().ReverseMap();

            CreateMap<Product, ProductDto>().ReverseMap();
        }
    }
}
