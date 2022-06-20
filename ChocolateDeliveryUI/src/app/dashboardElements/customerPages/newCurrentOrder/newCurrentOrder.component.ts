import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CustomerService } from "src/app/shared/services/customer.service";

@Component({
    selector: 'app-newCurrentOrder',
    templateUrl: './newCurrentOrder.component.html',
})

export class NewCurrentOrderComponent implements OnInit{
    
    constructor(private customerService: CustomerService, private router: Router) {}

    ngOnInit(): void 
    {
        let token = localStorage.getItem('token');
        let customerId : number = -1;
        if (token != null)
        {
            let decodedToken = JSON.parse(atob(token.split('.')[1]));
            customerId = decodedToken.id;
        }
        this.customerService.checkIfOrderExists(+customerId).subscribe(
          data => 
          {
            if(data == true)
            {
              this.router.navigateByUrl('/customerCurrentOrder');
            }
            else
            {
              this.router.navigateByUrl('/customerNewOrder');
            }
          }
        )
    }
    
}