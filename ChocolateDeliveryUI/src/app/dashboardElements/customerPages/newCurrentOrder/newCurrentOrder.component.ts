import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageDialogComponent } from 'src/app/dialogs/messageDialog/messageDialog.component';
import { Message } from 'src/app/shared/models/message.model';
import { Order } from 'src/app/shared/models/order.model';
import { OrderProduct } from 'src/app/shared/models/orderProduct';
import { Product } from 'src/app/shared/models/product.model';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-newCurrentOrder',
  templateUrl: './newCurrentOrder.component.html',
  styleUrls: ['./newCurrentOrder.component.css']
})
export class NewCurrentOrderComponent implements OnInit {
  
  products: Product[] = []
  
  constructor(private customerService: CustomerService, private matDialog: MatDialog, private router: Router)
  {
    this.customerService.getAllProducts().subscribe(
      (data: Product[]) =>
      {
        this.products = data;
      },
      error =>
      {
        let message: Message = new Message();
        message.title = "Fetch Error";
        message.messageText = "Could not fetch products data from server!"
        this.matDialog.open(MessageDialogComponent, { data: message })
      }
    )
  }

  confirmOrderForm = new FormGroup({
    address : new FormControl("", Validators.required),
    comment : new FormControl("", )
  })

  order: Order = new Order()


  ngOnInit(): void {
    let token = localStorage.getItem('token');
    let customerId : number = -1;
    if (token != null)
    {
        let decodedToken = JSON.parse(atob(token.split('.')[1]));
        customerId = decodedToken.id;
    }
    console.log("check " + customerId)
    this.customerService.checkIfOrderExists(+customerId).subscribe(
      data => { console.log("good") },
      error =>
      {
        console.log("error")
        this.router.navigateByUrl('/customerCurrentOrder');
      }
    )
  }


  AddProductToOrder(productToOrder : {order_product: Product, order_amount: number})
  {
    for(let product of this.order.orderProducts)
    {
      if(productToOrder.order_product.id == product.productId)
      {
        product.quantity = productToOrder.order_amount;

        if(productToOrder.order_amount <= 0)
        {
          const index = this.order.orderProducts.indexOf(product);

          if (index !== -1) 
          {
            this.order.orderProducts.splice(index, 1);
          }
        }
        return;
      }
    }

    if(productToOrder.order_amount <= 0)
      return;

    let orderProduct : OrderProduct = new OrderProduct();
    orderProduct.orderId = -1;
    orderProduct.productId = productToOrder.order_product.id;
    orderProduct.product = productToOrder.order_product;
    orderProduct.quantity = productToOrder.order_amount;

    this.order.orderProducts.push(orderProduct);

    for (let i = 0; i < productToOrder.order_amount; i++) {
      this.order.price += productToOrder.order_product.price;
    }
  }

  ConfirmOrder()
  {
    let token = localStorage.getItem('token');
    if (token != null)
    {
        var decodedToken = JSON.parse(atob(token.split('.')[1]));
    }
    this.order.customerId = decodedToken.id;

    if(this.confirmOrderForm.controls['address'].valid)
    {
      this.order.address = this.confirmOrderForm.controls['address'].value;
    }

    this.order.comment = this.confirmOrderForm.controls['comment'].value;

    this.order.orderState = "PENDING";

    this.customerService.confirmOrder(this.order).subscribe
    (
      data => 
      {
        let message: Message = new Message();
        message.title = "Your order has been recorded!";
        message.messageText = "Waiting for deliverer to pick up your order!"
        this.matDialog.open(MessageDialogComponent, { data: message })
      },
      error => 
      {
        let message: Message = new Message();
        message.title = "Error! You already ordered!";
        message.messageText = "Please wait for your order to be delivered before you order again!"
        this.matDialog.open(MessageDialogComponent, { data: message })
      }
    );
  }
}