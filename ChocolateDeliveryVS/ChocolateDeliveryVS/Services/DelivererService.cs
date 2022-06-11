using AutoMapper;
using ChocolateDeliveryVS.DTO;
using ChocolateDeliveryVS.Infrastructure;
using ChocolateDeliveryVS.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChocolateDeliveryVS.Services
{
    public class DelivererService : IDelivererService
    {
        private readonly IMapper _mapper;
        private readonly DeliveryDbContext _dbContext;

        public DelivererService(IMapper mapper, DeliveryDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public List<OrderDisplayDto> GetAllOrders()
        {
            return _mapper.Map<List<OrderDisplayDto>>(_dbContext.Orders.ToList());
        }
    }
}
