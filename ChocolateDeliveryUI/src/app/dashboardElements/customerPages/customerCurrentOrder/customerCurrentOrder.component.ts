import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderState } from 'src/app/shared/models/orderState.model';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-customerCurrentOrder',
  templateUrl: './customerCurrentOrder.component.html',
  styleUrls: ['./customerCurrentOrder.component.css']
})
export class CustomerCurrentOrderComponent implements OnInit, OnDestroy {

  static orderState: OrderState = new OrderState();
  currentDate: any;
  targetDate: any;
  currentTime: any;
  targetTime: any;
  difference: any;
  seconds: any;
  minutes: any;
  static interval: any;

  get staticUrl() {
    return CustomerCurrentOrderComponent.orderState;
  }

  constructor(private customerService: CustomerService)
  {
  }

  ngOnDestroy(): void {
    clearInterval(CustomerCurrentOrderComponent.interval);
  }

  ngOnInit(): void 
  {
    let token = localStorage.getItem('token');
    let customerId : number = -1;
    if (token != null)
    {
        let decodedToken = JSON.parse(atob(token.split('.')[1]));
        customerId = decodedToken.id;
    }
    
    this.customerService.getOrderState(+customerId).subscribe(
      (data: OrderState) =>
      {
        CustomerCurrentOrderComponent.orderState = data;
      }
    )
    CustomerCurrentOrderComponent.interval = setInterval(this.Timer, 1000);
  }

  Timer() 
  {
    // console.log(CustomerCurrentOrderComponent.orderState);
    this.currentDate = new Date();
    this.targetDate = new Date(CustomerCurrentOrderComponent.orderState.deliveryTime);
    this.currentTime = this.currentDate.getTime();
    this.targetTime = this.targetDate.getTime();
    this.difference = this.targetTime - this.currentTime;
    this.seconds = Math.floor(this.difference / 1000);
    this.minutes = Math.floor(this.seconds / 60);

    this.minutes %= 60;
    this.seconds %= 60;
    this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
    this.seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds;

    const elementMinutes = document.getElementById("minutes");
    const elementSeconds = document.getElementById("seconds");

    if(elementMinutes !== null)
    elementMinutes.innerText = this.minutes;

    if(elementSeconds !== null)
    elementSeconds.innerText = this.seconds;

    if(this.minutes === '00' && this.seconds === '00')
    {
      console.log('clearInterval');
      clearInterval(CustomerCurrentOrderComponent.interval);
      return;
    }
  }
}