import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Message } from "src/app/shared/models/message.model";

@Component({
    selector: 'app-messageDialog',
    templateUrl: './messageDialog.component.html',
    styleUrls: ['./messageDialog.component.css']
})

export class MessageDialogComponent implements OnInit{

    constructor(@Inject(MAT_DIALOG_DATA) private data: Message) {}

    messageTitle:string = this.data.title;
    messageText:string = this.data.messageText;

    ngOnInit(): void {
    }
    
    
}