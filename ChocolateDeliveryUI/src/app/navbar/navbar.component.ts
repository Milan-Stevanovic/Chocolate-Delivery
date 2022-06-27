import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
    
    loggedIn: boolean = false;
    username: string = "";
    role: string = "";

    constructor(private router: Router) 
    {
        let token = localStorage.getItem('token');
        if(token != null)
        {
        let decodedToken = JSON.parse(atob(token.split('.')[1]));
        this.username = decodedToken.username;
        this.role = decodedToken.role;
    }
    }


    ngOnInit(): void 
    {
        let token = localStorage.getItem('token')
        if(token != null)
        {
            this.loggedIn = true
        }
        else
        {
            this.loggedIn = false;
        }
    }

    UserLogout() {
        localStorage.removeItem('token');
        this.router.navigate(['/entry']);
        this.loggedIn = false;
    }
}