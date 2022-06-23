import { Component, Input, OnInit } from "@angular/core";
import { OrderDisplay } from "src/app/shared/models/orderDisplay.model";

@Component({
    selector: 'app-myOrderContainer',
    templateUrl: './myOrderContainer.component.html',
    styleUrls: ['./myOrderContainer.component.css']
})

export class MyOrderContainerComponent implements OnInit {
    
    @Input() order = new OrderDisplay();

    constructor() 
    {
    }

    ngOnInit(): void 
    {
    }
}