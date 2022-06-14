using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ChocolateDeliveryVS.Services
{
    public class OrderData
    {
        public Dictionary<long, Thread> ordersDict = new Dictionary<long, Thread>();

        [ThreadStatic]
        public int threadSpecificNumberOfSeconds;

        public void CounterThread(int customerId)
        {
            Random rand = new Random();
            int numberOfSec = rand.Next(100, 150);
            System.Diagnostics.Debug.WriteLine($"[ INFO ] Order for CustomerID [{customerId}] = {numberOfSec} seconds");
            while (numberOfSec > 0)
            {
                Thread.Sleep(1000);
                numberOfSec--;
                threadSpecificNumberOfSeconds = numberOfSec;
            }
            ordersDict.Remove(customerId);
            System.Diagnostics.Debug.WriteLine($"[ INFO ] Order for CustomerID [{customerId}] removed");
        }
    }
}
