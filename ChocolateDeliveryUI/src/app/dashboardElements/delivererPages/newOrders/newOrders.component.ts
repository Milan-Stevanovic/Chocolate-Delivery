import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageDialogComponent } from 'src/app/dialogs/messageDialog/messageDialog.component';
import { Message } from 'src/app/shared/models/message.model';
import { Order } from 'src/app/shared/models/order.model';
import { OrderDisplay } from 'src/app/shared/models/orderDisplay.model';
import { DelivererService } from 'src/app/shared/services/deliverer.service';

@Component({
  selector: 'app-newOrders',
  templateUrl: './newOrders.component.html',
  styleUrls: ['./newOrders.component.css']
})
export class NewOrdersComponent implements OnInit{
  
  orders : OrderDisplay[] = [];

  constructor(private delivererService: DelivererService, private matDialog: MatDialog, private router: Router)
  {
    let token = localStorage.getItem('token');
    let delivererId : number = -1;
    if (token != null)
    {
        let decodedToken = JSON.parse(atob(token.split('.')[1]));
        delivererId = decodedToken.id;
    }
    this.delivererService.checkIfOrderExists(+delivererId).subscribe(
      data => 
      {
        if(data == true)
        {
          this.router.navigateByUrl('/currentOrder');
        }
      }
    )

    this.delivererService.getAllOrders().subscribe(
      (data : OrderDisplay[]) =>
      {
        this.orders = data;
      },
      error =>
      {
        let message: Message = new Message();
        message.title = "Server Error";
        message.messageText = "Please try again later or contact site administrator."
        this.matDialog.open(MessageDialogComponent, { data: message })
      }
    )
  }


  ngOnInit(): void {}
}