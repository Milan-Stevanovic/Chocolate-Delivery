import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangePassword } from 'src/app/shared/models/changePassword.model';
import { Message } from 'src/app/shared/models/message.model';
import { MessageDialogComponent } from 'src/app/dialogs/messageDialog/messageDialog.component';

@Component({
  selector: 'app-changePassword',
  templateUrl: './changePassword.component.html',
  styleUrls: ['./changePassword.component.css']
})
export class ChangePasswordComponent implements OnInit {

  newPasswordInputText: string = "";

  constructor(private userService: UserService, private matDialog: MatDialog)
  {
  }

  changePasswordForm = new FormGroup({
    newPassword : new FormControl('' , [Validators.required, Validators.minLength(8)]),
    confirmNewPassword : new FormControl('', [Validators.required, this.mustMatch()]),
  })
 
  get newPassword() { return this.changePasswordForm.get('newPassword') as FormControl; } 
  get confirmNewPassword() { return this.changePasswordForm.get('confirmNewPassword') as FormControl; } 

  ngOnInit(): void {}

  ChangePassword()
  {
    if(this.changePasswordForm.valid)
    {
      let userId : number = -1;
      let token = localStorage.getItem('token');
      if(token != null)
      {
        let decodedToken = JSON.parse(atob(token.split('.')[1]));
        userId = decodedToken.id;
      }
  
      let changePassword: ChangePassword = new ChangePassword();
      changePassword.userId = userId;
      changePassword.newPassword = this.newPassword.value;
      changePassword.confirmNewPassword = this.confirmNewPassword.value;
      this.userService.changePassword(changePassword).subscribe(
        data =>
        {
          let message: Message = new Message();
          message.title = "Success";
          message.messageText = "Password changed successfully! Please log in with your new password."
          this.matDialog.open(MessageDialogComponent, { data: message })
        },
        error =>
        {
          let message: Message = new Message();
          message.title = "Server Error";
          message.messageText = "Please try again later or contact site administrator."
          this.matDialog.open(MessageDialogComponent, { data: message })
        }
      );
    }
    else
    {
      let message: Message = new Message();
          message.title = "Form invalid";
          message.messageText = "Please check if you entered valid data"
          this.matDialog.open(MessageDialogComponent, { data: message })
    }
  }

  mustMatch(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const passwordMatch = this.newPasswordInputText === control.value;
        return passwordMatch ? null : { mustMatch: {value: true} };
    };
  }
}