import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { MessageDialogComponent } from '../dialogs/messageDialog/messageDialog.component';
import { Message } from '../shared/models/message.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerAuthGuard implements CanActivate {


  constructor(private router: Router, private matDialog: MatDialog) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean 
    {
        let token = localStorage.getItem('token');
        if (token != null)
        {
            let decodedToken = JSON.parse(atob(token.split('.')[1]));
            if(decodedToken.role === 'CUSTOMER')
                return true;
            else
            {
                let message: Message = new Message();
                message.title = "Authorization Error";
                message.messageText = "Oops! It looks like you do not have permission to go there!"
                this.matDialog.open(MessageDialogComponent,
                    {
                        data: message
                    })
                return false;
            }
        }
        else 
        {
            this.router.navigate(['/entry']);
            return false;
        }
  }
}
