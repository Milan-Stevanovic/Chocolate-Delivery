import { Component, Input, OnInit } from "@angular/core";
import { OrderDisplay } from "src/app/shared/models/orderDisplay.model";

@Component({
    selector: 'app-pastOrderContainer',
    templateUrl: './pastOrderContainer.component.html',
    styleUrls: ['./pastOrderContainer.component.css']
})

export class PastOrderContainerComponent implements OnInit {
    
    @Input() order = new OrderDisplay();

    constructor() 
    {
    }

    ngOnInit(): void 
    {
    }
}