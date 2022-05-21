import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/dialogs/messageDialog/messageDialog.component';
import { Message } from 'src/app/shared/models/message.model';
import { UserDisplay } from 'src/app/shared/models/userDisplay.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit{

  users: UserDisplay[] = [];
  
  constructor(private userService: UserService, private matDialog: MatDialog)
  { 
    this.userService.getAllUsers().subscribe(
      (data: UserDisplay[]) =>
      {
        this.users = data;
      },
      error =>
      {
        let message: Message = new Message();
        message.title = "Fetch Error";
        message.messageText = "Could not fetch users data from server!"
        this.matDialog.open(MessageDialogComponent,
            {
                data: message
            })
      }
    )
  }

  ngOnInit(): void {}
}