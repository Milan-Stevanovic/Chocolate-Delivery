import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MessageDialogComponent } from "src/app/dialogs/messageDialog/messageDialog.component";
import { Message } from "src/app/shared/models/message.model";
import { OrderDisplay } from "src/app/shared/models/orderDisplay.model";
import { AdminService } from "src/app/shared/services/admin.service";

@Component({
    selector: 'app-allOrders',
    templateUrl: './allOrders.component.html',
    styleUrls: ['./allOrders.component.css']
})

export class AllOrdersComponent implements OnInit {
    
    allOrders : OrderDisplay[] = [];
    
    constructor(private adminService : AdminService, private matDialog: MatDialog) 
    {
        this.adminService.getAllOrders().subscribe
        (
            (data: OrderDisplay[]) => 
            {
                this.allOrders = data;
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