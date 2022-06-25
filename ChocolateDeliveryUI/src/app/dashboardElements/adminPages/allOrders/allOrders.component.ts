import { Component, OnInit } from "@angular/core";
import { OrderDisplay } from "src/app/shared/models/orderDisplay.model";
import { AdminService } from "src/app/shared/services/admin.service";

@Component({
    selector: 'app-allOrders',
    templateUrl: './allOrders.component.html',
    styleUrls: ['./allOrders.component.css']
})

export class AllOrdersComponent implements OnInit {
    
    allOrders : OrderDisplay[] = [];
    
    constructor(private adminService : AdminService) 
    {
        this.adminService.getAllOrders().subscribe
        (
            (data: OrderDisplay[]) => 
            {
                this.allOrders = data;
            }
        )
    }


    ngOnInit(): void 
    {
    }
}