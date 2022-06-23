import { Component, OnInit } from "@angular/core";
import { OrderDisplay } from "src/app/shared/models/orderDisplay.model";
import { DelivererService } from "src/app/shared/services/deliverer.service";

@Component({
    selector: 'app-myOrders',
    templateUrl: './myOrders.component.html',
    styleUrls: ['./myOrders.component.css']
})

export class MyOrdersComponent implements OnInit {
    
    myOrders : OrderDisplay[] = [];
    
    constructor(private delivererService : DelivererService) 
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
            }
        )
    }


    ngOnInit(): void 
    {
    }
}