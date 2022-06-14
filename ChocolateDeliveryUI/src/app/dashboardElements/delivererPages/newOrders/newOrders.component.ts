import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/dialogs/messageDialog/messageDialog.component';
import { Message } from 'src/app/shared/models/message.model';
import { Order } from 'src/app/shared/models/order.model';
import { DelivererService } from 'src/app/shared/services/deliverer.service';

@Component({
  selector: 'app-newOrders',
  templateUrl: './newOrders.component.html',
  styleUrls: ['./newOrders.component.css']
})
export class NewOrdersComponent implements OnInit{
  
  orders : Order[] = [];

  constructor(private delivererService: DelivererService, private matDialog: MatDialog)
  {
    this.delivererService.getAllOrders().subscribe(
      (data: Order[]) =>
      {
        this.orders = data;
      },
      error =>
      {
        let message: Message = new Message();
        message.title = "Fetch Error";
        message.messageText = "Could not fetch orders data from server!"
        this.matDialog.open(MessageDialogComponent, { data: message })
      }
    )
  }


  ngOnInit(): void {}
}