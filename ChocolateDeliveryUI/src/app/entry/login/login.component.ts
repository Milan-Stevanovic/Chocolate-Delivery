import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { MessageDialogComponent } from "src/app/dialogs/messageDialog/messageDialog.component";
import { Login } from "src/app/shared/models/login.model";
import { Message } from "src/app/shared/models/message.model";
import { Token } from "src/app/shared/models/token.model";
import { UserService } from "src/app/shared/services/user.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: []
})

export class LoginComponent implements OnInit{

    
    constructor(private service: UserService, private router: Router, private matDialog: MatDialog) { }
    
    ngOnInit(): void 
    {
        if (localStorage.getItem('token') != null)
            this.router.navigateByUrl('/dashboard');
    }
    
    loginForm = new FormGroup({
        email : new FormControl("", [Validators.required, Validators.email]),
        password : new FormControl("", Validators.required)
    })

    get email() { return this.loginForm.get('email') as FormControl; } 
    get password() { return this.loginForm.get('password') as FormControl; } 

    
    
    UserLogin()
    {
        if(this.loginForm.valid)
        {
            let login: Login = new Login();
            login.email = this.email.value;
            login.password = this.password.value;
            
            this.service.login(login).subscribe(
                (data: Token) => 
                {
                    localStorage.setItem('token', data.token);

                    this.router.navigateByUrl('/dashboard');

                    let message: Message = new Message();
                    message.title = "Successfully logged in";
                    message.messageText = "Welcome!"
                    this.matDialog.open(MessageDialogComponent,
                        {
                            data: message
                        })

                    // let decodedToken = JSON.parse(atob(data.token.split('.')[1]));
                },
                error => 
                {
                    let message: Message = new Message();
                    message.title = "Authentication Error";
                    message.messageText = "Please check if you entered your info correctly"
                    this.matDialog.open(MessageDialogComponent,
                        {
                            data: message
                        })
                }
            );
        }
        else
        {
            let message: Message = new Message();
            message.title = "Wrong Email or Password";
            message.messageText = "Please check if you entered your info correctly"
            this.matDialog.open(MessageDialogComponent,
                {
                    data: message
                })
        }
    }
}