import { Component, OnInit } from '@angular/core';
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
  selector: 'app-customerNewOrder',
  templateUrl: './customerNewOrder.component.html',
  styleUrls: ['./customerNewOrder.component.css']
})
export class CustomerNewOrderComponent implements OnInit {
  
  products: Product[] = []
  
  constructor(private customerService: CustomerService, private matDialog: MatDialog, private router: Router)
  {
    this.customerService.getAllProducts().subscribe
    (
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

  ngOnInit(): void { }

  confirmOrderForm = new FormGroup({
    address : new FormControl("", Validators.required),
    comment : new FormControl("", )
  })

  order: Order = new Order()

  AddProductToOrder(productToOrder : {order_product: Product, order_amount: number})
  {
    // check if product with same ID is already in cart (if yes, just change quantity and recalculate price)
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
        this.order.price = this.CalculateOrderTotalPrice();
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

    this.order.price = this.CalculateOrderTotalPrice();
  }

  CalculateOrderTotalPrice() : number 
  {
    let totalPrice : number = 0;

    for(let cartProduct of this.order.orderProducts)
    {
      for(let loadedProduct of this.products)
      {
        if(cartProduct.productId === loadedProduct.id)
        {
          for(let i = 0; i < cartProduct.quantity; i++)
          {
            totalPrice += loadedProduct.price;
          }
        }
      }
    }

    return totalPrice;
  }

  ConfirmOrder()
  {
    // will be used to check if customer already has pending order
    let token = localStorage.getItem('token');
    if (token != null)
    {
        var decodedToken = JSON.parse(atob(token.split('.')[1]));
    }
    this.order.customerId = decodedToken.id;

    // checking if cart is empty before confirming order
    if(this.order.orderProducts.length == 0)
    {
      let message: Message = new Message();
      message.title = "Error - Cart Empty";
      message.messageText = "Please add items to your cart before confirming order!"
      this.matDialog.open(MessageDialogComponent, { data: message })
      return;
    }

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
        if(data == true)
        {
          let message: Message = new Message();
          message.title = "Your order has been recorded!";
          message.messageText = "Waiting for deliverer to pick up your order!"
          this.matDialog.open(MessageDialogComponent, { data: message })
        }
        else
        {
          let message: Message = new Message();
          message.title = "Error! You already ordered!";
          message.messageText = "Please wait for your order to be delivered before you order again!"
          this.matDialog.open(MessageDialogComponent, { data: message })
        }
      }
    );
  }

  ClearOrder()
  {
    this.order.orderProducts = [];
    this.order.price = 0;
  }
}