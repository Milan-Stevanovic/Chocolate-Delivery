import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MessageDialogComponent } from "../dialogs/messageDialog/messageDialog.component";
import { Message } from "../shared/models/message.model";
import { UserService } from "../shared/services/user.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit{
    
    constructor(private userService: UserService, private matDialog: MatDialog) {}

    ngOnInit(): void {}
    
    VerificationStatus()
    {
        let token = localStorage.getItem('token');
        let userId : number = -1;
        if (token != null)
        {
            let decodedToken = JSON.parse(atob(token.split('.')[1]));
            userId = decodedToken.id;
        }

        this.userService.verificationStatus(userId).subscribe(
            data => 
            {
                if(data == true)
                {
                    let message: Message = new Message();
                    message.title = "Verified";
                    message.messageText = "System Admin verified your account"
                    this.matDialog.open(MessageDialogComponent, { data: message })
                }
                else
                {
                    let message: Message = new Message();
                    message.title = "Not Verified";
                    message.messageText = "You must wait for System Admin to verify your account"
                    this.matDialog.open(MessageDialogComponent, { data: message })
                }
            },
            error =>
            {
                let message: Message = new Message();
                message.title = "Server Error";
                message.messageText = "Something went wrong!"
                this.matDialog.open(MessageDialogComponent, { data: message })
            }
        )
    }
}