import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MessageDialogComponent } from "src/app/dialogs/messageDialog/messageDialog.component";
import { Message } from "src/app/shared/models/message.model";
import { OrderDisplay } from "src/app/shared/models/orderDisplay.model";
import { DelivererService } from "src/app/shared/services/deliverer.service";

@Component({
    selector: 'app-myOrders',
    templateUrl: './myOrders.component.html',
    styleUrls: ['./myOrders.component.css']
})

export class MyOrdersComponent implements OnInit {
    
    myOrders : OrderDisplay[] = [];
    
    constructor(private delivererService : DelivererService, private matDialog: MatDialog) 
    {
        // get all past orders
        let token = localStorage.getItem('token');
        let delivererId : number = -1;
        if (token != null)
        {
            let decodedToken = JSON.parse(atob(token.split('.')[1]));
            delivererId = decodedToken.id;
        }
        this.delivererService.getAllPastOrders(+delivererId).subscribe
        (
            (data: OrderDisplay[]) => 
            {
                this.myOrders = data;
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


    ngOnInit(): void 
    {
    }
}