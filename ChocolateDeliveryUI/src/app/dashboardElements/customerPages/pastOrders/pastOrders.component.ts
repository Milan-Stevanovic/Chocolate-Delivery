import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MessageDialogComponent } from "src/app/dialogs/messageDialog/messageDialog.component";
import { Message } from "src/app/shared/models/message.model";
import { OrderDisplay } from "src/app/shared/models/orderDisplay.model";
import { CustomerService } from "src/app/shared/services/customer.service";

@Component({
    selector: 'app-pastOrders',
    templateUrl: './pastOrders.component.html',
    styleUrls: ['./pastOrders.component.css']
})

export class PastOrdersComponent implements OnInit {
    
    pastOrders : OrderDisplay[] = [];
    
    constructor(private customerService : CustomerService, private matDialog: MatDialog) 
    {
        // get all past orders
        let token = localStorage.getItem('token');
        let customerId : number = -1;
        if (token != null)
        {
            let decodedToken = JSON.parse(atob(token.split('.')[1]));
            customerId = decodedToken.id;
        }
        this.customerService.getAllPastOrders(+customerId).subscribe
        (
            (data: OrderDisplay[]) => 
            {
                this.pastOrders = data;
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