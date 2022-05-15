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
  

  ngOnInit(): void {}

  ProfileEdit()
  {

  }

  TestPicture(){
    console.log(this.profileEditForm.controls['profilePicture'].value);
  }
}