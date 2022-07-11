import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageDialogComponent } from 'src/app/dialogs/messageDialog/messageDialog.component';
import { Message } from 'src/app/shared/models/message.model';
import { UserDisplay } from 'src/app/shared/models/userDisplay.model';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-userContainer',
  templateUrl: './userContainer.component.html',
  styleUrls: ['./userContainer.component.css']
})
export class UserContainerComponent implements OnInit{

    @Input() userData: UserDisplay = new UserDisplay();

    constructor(private adminService: AdminService, private matDialog: MatDialog, private router: Router) { }

    VerifyUser(id: any)
    {
        this.adminService.verifyUserById(id).subscribe(
            data =>
            {
                // User Successfully Verified
                if(data == true)
                    window.location.reload();
                else
                {
                    let message: Message = new Message();
                    message.title = "Error";
                    message.messageText = "Could not verify user!"
                    this.matDialog.open(MessageDialogComponent, { data: message })
                }
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

    RejectUser(id: any)
    {
        this.adminService.rejectUserById(id).subscribe(
            data =>
            {
                // User Rejected
                if(data == true)
                    window.location.reload();
                else
                {
                    let message: Message = new Message();
                    message.title = "Error";
                    message.messageText = "Could not reject user!"
                    this.matDialog.open(MessageDialogComponent, { data: message })
                }
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

    ngOnInit(): void {}
}