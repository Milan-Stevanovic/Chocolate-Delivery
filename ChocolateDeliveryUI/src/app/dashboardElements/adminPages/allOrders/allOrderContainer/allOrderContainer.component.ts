import { Component, Input, OnInit } from "@angular/core";
import { OrderDisplay } from "src/app/shared/models/orderDisplay.model";

@Component({
    selector: 'app-allOrderContainer',
    templateUrl: './allOrderContainer.component.html',
    styleUrls: ['./allOrderContainer.component.css']
})

export class AllOrderContainerComponent implements OnInit {
    
    @Input() order = new OrderDisplay();

    constructor() 
    {
    }

    ngOnInit(): void 
    {
    }
}