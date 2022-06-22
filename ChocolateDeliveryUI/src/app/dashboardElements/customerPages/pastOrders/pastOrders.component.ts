import { Component, OnInit } from "@angular/core";
import { Order } from "src/app/shared/models/order.model";
import { PastOrder } from "src/app/shared/models/pastOrder.model";
import { CustomerService } from "src/app/shared/services/customer.service";

@Component({
    selector: 'app-pastOrders',
    templateUrl: './pastOrders.component.html',
    styleUrls: ['./pastOrders.component.css']
})

export class PastOrdersComponent implements OnInit {
    
    pastOrders : PastOrder[] = [];
    
    constructor(private customerService : CustomerService) 
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
            (data: PastOrder[]) => 
            {
                this.pastOrders = data;
            }
        )
    }


    ngOnInit(): void 
    {
    }
}