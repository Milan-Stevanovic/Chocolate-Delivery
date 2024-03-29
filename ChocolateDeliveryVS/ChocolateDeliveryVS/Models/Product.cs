﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChocolateDeliveryVS.Models
{
    public class Product
    {
        public ICollection<OrderProduct> OrderProducts { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Ingredients { get; set; }
        public string Picture { get; set; }
    }
}
