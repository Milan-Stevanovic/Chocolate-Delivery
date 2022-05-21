import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  constructor(private http: HttpClient)
  {

  }

  imageSrc: string = "";
  fileName : string = "";

  profileEditForm = new FormGroup({
    profilePicture : new FormControl("", [Validators.required]),
    username : new FormControl("", Validators.required),
    email : new FormControl("", [Validators.required, Validators.email]),
    password : new FormControl("", [Validators.required]),
    confirmPassword : new FormControl("", [Validators.required]),
    firstName : new FormControl("", [Validators.required]),
    lastName : new FormControl("", [Validators.required]),
    dateOfBirth : new FormControl("", [Validators.required]),
    address : new FormControl("", [Validators.required])
  })

  get username() { return this.profileEditForm.get('username') as FormControl; } 
  get email() { return this.profileEditForm.get('email') as FormControl; } 
  get password() { return this.profileEditForm.get('password') as FormControl; } 
  get confirmPassword() { return this.profileEditForm.get('confirmPassword') as FormControl; } 
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