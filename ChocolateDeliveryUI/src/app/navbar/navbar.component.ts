import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
    
    loggedIn: boolean = false;
    
    constructor(private router: Router) 
    {
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