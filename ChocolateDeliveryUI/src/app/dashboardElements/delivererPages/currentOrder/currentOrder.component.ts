import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DelivererService } from "src/app/shared/services/deliverer.service";

@Component({
    selector: 'app-currentOrder',
    templateUrl: './currentOrder.component.html',
})

export class CurrentOrderComponent implements OnInit{
    
    constructor(private delivererService : DelivererService, private router: Router) {}

    ngOnInit(): void 
    {
        let token = localStorage.getItem('token');
        let delivererId : number = -1;
        if (token != null)
        {
            let decodedToken = JSON.parse(atob(token.split('.')[1]));
            delivererId = decodedToken.id;
        }
        this.delivererService.checkIfOrderExists(+delivererId).subscribe(
          data => 
          {
            if(data == true)
            {
              this.router.navigateByUrl('/delivererCurrentOrder');
            }
            else
            {
              this.router.navigateByUrl('/delivererNoOrder');
            }
          }
        )
    }
    
}