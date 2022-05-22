import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from 'src/app/shared/models/userProfile.model';
import { Portal } from '@angular/cdk/portal';
import { UserService } from 'src/app/shared/services/user.service';
import { Message } from 'src/app/shared/models/message.model';
import { MessageDialogComponent } from 'src/app/dialogs/messageDialog/messageDialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  userId: number = -1;
  user: UserProfile = new UserProfile();

  constructor(private userService: UserService, private http: HttpClient, private matDialog: MatDialog)
  {
    let token = localStorage.getItem('token');
    if(token != null)
    {
      let decodedToken = JSON.parse(atob(token.split('.')[1]));
      this.userId = decodedToken.id;
    }

    this.userService.getUserById(this.userId).subscribe(
      (data: UserProfile) =>
      {
        this.user = data;
        
        this.user.dateOfBirth = this.user.dateOfBirth.split('T')[0];
      },
      error =>
      {
        let message: Message = new Message();
        message.title = "Fetch Error";
        message.messageText = "Could not fetch user data!"
        this.matDialog.open(MessageDialogComponent, { data: message })
      }
    )
  }

  imageSrc: string = "";
  fileName : string = "";

  profileEditForm = new FormGroup({
    profilePicture : new FormControl("", [Validators.required]),
    username : new FormControl("", Validators.required),
    email : new FormControl("", [Validators.required, Validators.email]),
    firstName : new FormControl("", [Validators.required]),
    lastName : new FormControl("", [Validators.required]),
    dateOfBirth : new FormControl("", [Validators.required]),
    address : new FormControl("", [Validators.required])
  })

  get username() { return this.profileEditForm.get('username') as FormControl; } 
  get email() { return this.profileEditForm.get('email') as FormControl; } 
  get firstName() { return this.profileEditForm.get('firstName') as FormControl; } 
  get lastName() { return this.profileEditForm.get('lastName') as FormControl; } 
  get dateOfBirth() { return this.profileEditForm.get('dateOfBirth') as FormControl; } 
  get address() { return this.profileEditForm.get('address') as FormControl; } 
  get profilePicture() { return this.profileEditForm.get('profilePicture') as FormControl; } 
  

  ngOnInit(): void {}

  ProfileEdit()
  {

  }

  TestPicture(){
    console.log(this.profileEditForm.controls['profilePicture'].value);
  }
}