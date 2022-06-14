import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageDialogComponent } from 'src/app/dialogs/messageDialog/messageDialog.component';
import { Message } from 'src/app/shared/models/message.model';
import { Order } from 'src/app/shared/models/order.model';
import { DelivererService } from 'src/app/shared/services/deliverer.service';

@Component({
  selector: 'app-orderContainer',
  templateUrl: './orderContainer.component.html',
  styleUrls: ['./orderContainer.component.css']
})
export class OrderContainerComponent implements OnInit{

    @Input() orderData: Order = new Order();

    constructor(private delivererService: DelivererService, private matDialog: MatDialog, private router: Router) { }


    ngOnInit(): void {}

    AcceptOrder(id: any)
    {
      this.delivererService.acceptOrder(id).subscribe(
        data =>
        {
            // User Successfully Verified
            window.location.reload();
        },
        error =>
        {
            let message: Message = new Message();
            message.title = "Error";
            message.messageText = "Could not accept order!"
            this.matDialog.open(MessageDialogComponent, { data: message })
        }
      )
    }
}