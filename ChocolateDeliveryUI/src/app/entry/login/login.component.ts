import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: []
})

export class LoginComponent implements OnInit{

    
    constructor() { }
    
    ngOnInit(): void {}
    
    loginForm = new FormGroup({
        email : new FormControl("", [Validators.required, Validators.email]),
        password : new FormControl("", Validators.required)
    })

    get email() { return this.loginForm.get('email') as FormControl; } 
    get password() { return this.loginForm.get('password') as FormControl; } 

    
    
    UserLogin()
    {
        
    }
}