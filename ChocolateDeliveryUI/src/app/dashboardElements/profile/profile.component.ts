import { AfterContentInit, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from 'src/app/shared/models/userProfile.model';
import { UserService } from 'src/app/shared/services/user.service';
import { Message } from 'src/app/shared/models/message.model';
import { MessageDialogComponent } from 'src/app/dialogs/messageDialog/messageDialog.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  response: {dbPath: ''} = {dbPath: ""};
  userProfilePicturePath: string = "";

  userId: number = -1;
  user: UserProfile = new UserProfile();

  constructor(private userService: UserService, private matDialog: MatDialog)
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

        this.userProfilePicturePath = this.createImgPath(this.user.profilePicture);
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

  uploadFinished = (event : any) => 
  { 
      this.response = event;
      this.userProfilePicturePath = this.createImgPath(this.response.dbPath);
  }

  profileEditForm = new FormGroup({
    username : new FormControl('' , [Validators.required]),
    firstName : new FormControl('', [Validators.required]),
    lastName : new FormControl('', [Validators.required]),
    dateOfBirth : new FormControl('', [Validators.required]),
    address : new FormControl('', [Validators.required]),
    profilePicture : new FormControl('', [])
  })

  get username() { return this.profileEditForm.get('username') as FormControl; } 
  get firstName() { return this.profileEditForm.get('firstName') as FormControl; } 
  get lastName() { return this.profileEditForm.get('lastName') as FormControl; } 
  get dateOfBirth() { return this.profileEditForm.get('dateOfBirth') as FormControl; } 
  get address() { return this.profileEditForm.get('address') as FormControl; } 
  get profilePicture() { return this.profileEditForm.get('profilePicture') as FormControl; } 

  ngOnInit(): void {}

  UpdateProfileInformation()
  {
    
    this.profileEditForm.controls['username'].markAsTouched;
    this.profileEditForm.controls['username'].markAsDirty;
    let userProfile: UserProfile = new UserProfile()
    userProfile.email = this.user.email;
    userProfile.username = this.profileEditForm.controls['username'].value;
    userProfile.firstName = this.firstName.value;
    userProfile.lastName = this.lastName.value;
    userProfile.address = this.address.value;
    userProfile.dateOfBirth = this.dateOfBirth.value;
    if(this.response.dbPath != '')
      userProfile.profilePicture = this.response.dbPath;
    else
      userProfile.profilePicture = this.user.profilePicture;
    
    console.log(userProfile)

    if(this.profileEditForm.valid)
    {
      this.userService.updateUserProfile(userProfile).subscribe
      (
        data => 
        {
            if(data == true)
            {
                let message: Message = new Message();
                message.title = "Update Successful";
                message.messageText = "Account information updated successfully!"
                this.matDialog.open(MessageDialogComponent, { data: message })
            }
            else
            {
                let message: Message = new Message();
                message.title = "Error";
                message.messageText = "Could not update account information."
                this.matDialog.open(MessageDialogComponent, { data: message })
            }
        }
      );
    }
    else
    {
        let message: Message = new Message();
        message.title = "Form Invalid";
        message.messageText = "Please check if fields are correctly filled"
        this.matDialog.open(MessageDialogComponent, { data: message })
    }
  }

  public createImgPath = (serverPath: string) => { 
    return environment.serverURL + '/' + serverPath; 
  }
}