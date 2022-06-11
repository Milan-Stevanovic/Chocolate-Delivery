import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { MessageDialogComponent } from "src/app/dialogs/messageDialog/messageDialog.component";
import { Message } from "src/app/shared/models/message.model";
import { Registration } from "src/app/shared/models/registration.model";
import { UserService } from "src/app/shared/services/user.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: []
})

export class RegisterComponent implements OnInit{
    
    constructor(private userService: UserService, private router:Router, private matDialog: MatDialog) { }

    ngOnInit(): void {}
    
    passwordInputText?: string = "";
    response: {dbPath: ''} = {dbPath: ""};

    registerForm = new FormGroup({
        username : new FormControl("", Validators.required),
        email : new FormControl("", [Validators.required, Validators.email]),
        password : new FormControl("", [Validators.required]),
        confirmPassword : new FormControl("", [Validators.required, this.mustMatch()]),
        firstName : new FormControl("", [Validators.required]),
        lastName : new FormControl("", [Validators.required]),
        dateOfBirth : new FormControl("", [Validators.required]),
        address : new FormControl("", [Validators.required]),
        role: new FormControl("", [Validators.required])
    })


    public file: any;

    getfile(e: any)
    {
        const fileList: FileList = e.target.files;
        this.file = fileList[0];
        console.log(this.file);
    }

    get username() { return this.registerForm.get('username') as FormControl; } 
    get email() { return this.registerForm.get('email') as FormControl; } 
    get password() { return this.registerForm.get('password') as FormControl; } 
    get confirmPassword() { return this.registerForm.get('confirmPassword') as FormControl; } 
    get firstName() { return this.registerForm.get('firstName') as FormControl; } 
    get lastName() { return this.registerForm.get('lastName') as FormControl; } 
    get dateOfBirth() { return this.registerForm.get('dateOfBirth') as FormControl; } 
    get address() { return this.registerForm.get('address') as FormControl; } 
    get role() { return this.registerForm.get('role') as FormControl; } 
    
    uploadFinished = (event : any) => { 
        this.response = event; 
      }
    
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
            registration.role = this.role.value;
            registration.profilePicture = this.response.dbPath;

            this.userService.register(registration).subscribe(
                data => 
                {
                    let message: Message = new Message();
                    message.title = "Account successfully created";
                    message.messageText = "Please log in to continue!"
                    this.matDialog.open(MessageDialogComponent, { data: message })
                },
                error => 
                {
                    let message: Message = new Message();
                    message.title = "Error Occured";
                    message.messageText = "Something went wrong"
                    this.matDialog.open(MessageDialogComponent, { data: message })
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
    
    mustMatch(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const passwordMatch = this.passwordInputText === control.value;
            return passwordMatch ? null : { mustMatch: {value: true} };
        };
    }
}
