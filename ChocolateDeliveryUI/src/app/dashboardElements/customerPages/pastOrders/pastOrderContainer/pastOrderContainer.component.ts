import { Component, Input, OnInit } from "@angular/core";
import { Order } from "src/app/shared/models/order.model";
import { PastOrder } from "src/app/shared/models/pastOrder.model";
import { Product } from "src/app/shared/models/product.model";
import { CustomerService } from "src/app/shared/services/customer.service";

@Component({
    selector: 'app-pastOrderContainer',
    templateUrl: './pastOrderContainer.component.html',
    styleUrls: ['./pastOrderContainer.component.css']
})

export class PastOrderContainerComponent implements OnInit {
    
    @Input() order = new PastOrder();

    constructor(private customerService : CustomerService) 
    {
    }

    ngOnInit(): void 
    {
    }
}