import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageDialogComponent } from 'src/app/dialogs/messageDialog/messageDialog.component';
import { AcceptOrder } from 'src/app/shared/models/acceptOrder.model';
import { Message } from 'src/app/shared/models/message.model';
import { Order } from 'src/app/shared/models/order.model';
import { OrderDisplay } from 'src/app/shared/models/orderDisplay.model';
import { DelivererService } from 'src/app/shared/services/deliverer.service';

@Component({
  selector: 'app-orderContainer',
  templateUrl: './orderContainer.component.html',
  styleUrls: ['./orderContainer.component.css']
})
export class OrderContainerComponent implements OnInit{

    @Input() orderData: OrderDisplay = new OrderDisplay();

    constructor(private delivererService: DelivererService, private matDialog: MatDialog, private router: Router) { }


    ngOnInit(): void {}

    AcceptOrder(orderId: any)
    {
      let token = localStorage.getItem('token');
      let delivererId : number = -1;
      if (token != null)
      {
          let decodedToken = JSON.parse(atob(token.split('.')[1]));
          delivererId = decodedToken.id;
      }

      let acceptOrderModel : AcceptOrder = new AcceptOrder();
      acceptOrderModel.orderId = orderId;
      acceptOrderModel.delivererId = delivererId;

      this.delivererService.acceptOrder(acceptOrderModel).subscribe(
        data =>
        {
          if(data == true)
          {
            // Order successfully accepted
            window.location.reload();
          }
          else
          {
            let message: Message = new Message();
            message.title = "Error";
            message.messageText = "Could not accept order!"
            this.matDialog.open(MessageDialogComponent, { data: message })
          }
        }
      )
    }
}