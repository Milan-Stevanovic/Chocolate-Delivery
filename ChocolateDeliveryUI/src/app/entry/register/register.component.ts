import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Registration } from "src/app/shared/models/registration.model";
import { UserService } from "src/app/shared/services/user.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: []
})

export class RegisterComponent implements OnInit{
    
    constructor(private service: UserService, private router:Router) { }

    ngOnInit(): void {}
    
    
    registerForm = new FormGroup({
        username : new FormControl("", Validators.required),
        email : new FormControl("", [Validators.required, Validators.email]),
        password : new FormControl("", [Validators.required]),
        confirmPassword : new FormControl("", [Validators.required]),
        firstName : new FormControl("", [Validators.required]),
        lastName : new FormControl("", [Validators.required]),
        dateOfBirth : new FormControl("", [Validators.required]),
        address : new FormControl("", [Validators.required]),
        userType: new FormControl("", [Validators.required]),
        profilePicture : new FormControl("", [Validators.required])
    })

    get username() { return this.registerForm.get('username') as FormControl; } 
    get email() { return this.registerForm.get('email') as FormControl; } 
    get password() { return this.registerForm.get('password') as FormControl; } 
    get confirmPassword() { return this.registerForm.get('confirmPassword') as FormControl; } 
    get firstName() { return this.registerForm.get('firstName') as FormControl; } 
    get lastName() { return this.registerForm.get('lastName') as FormControl; } 
    get dateOfBirth() { return this.registerForm.get('dateOfBirth') as FormControl; } 
    get address() { return this.registerForm.get('address') as FormControl; } 
    get userType() { return this.registerForm.get('userType') as FormControl; } 
    get profilePicture() { return this.registerForm.get('profilePicture') as FormControl; } 
    
    
    UserRegister()
    {
        if(this.registerForm.valid)
        {
            let registration: Registration = new Registration();
            registration.username = this.username.value;
            registration.email = this.email.value;
            registration.password = this.password.value;
            registration.confirmPassword = this.confirmPassword.value;
            registration.firstName = this.firstName.value;
            registration.lastName = this.lastName.value;
            registration.dateOfBirth = this.dateOfBirth.value;
            registration.address = this.address.value;
            registration.userType = this.userType.value;
            registration.profilePicture = this.profilePicture.value;
            console.log(registration.username + " " + registration.password);

            this.service.register(registration).subscribe();
        }
    }
}