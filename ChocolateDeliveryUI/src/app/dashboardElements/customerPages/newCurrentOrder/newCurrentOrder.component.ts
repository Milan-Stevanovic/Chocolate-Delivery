import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order.model';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-newCurrentOrder',
  templateUrl: './newCurrentOrder.component.html',
  styleUrls: ['./newCurrentOrder.component.css']
})
export class NewCurrentOrderComponent implements OnInit{

    products: Product[] = 
    [
        { id : 2, name:"AAA", price:20, ingredients:"aaa", picture : "berries_cheesecake_1.jpg"},
        { id : 3, name:"BBB", price:30, ingredients:"bbb", picture : "classic_truffle_1.jpg"},
        { id : 4, name:"CCC", price:40, ingredients:"ccc", picture : "coconut_honey_1.jpg"},
        { id : 5, name:"DDD", price:50, ingredients:"ddd", picture : "hazelnut_espresso_1.jpg"},
        { id : 6, name:"EEE", price:60, ingredients:"eee", picture : "peppermint_cream_1.jpg"},
        { id : 7, name:"FFF", price:70, ingredients:"fff", picture : "salted_caramel_1.jpg"},
        { id : 8, name:"GGG", price:80, ingredients:"ggg", picture : "strawberry_orange_1.jpg"},
    ]

    order: Order = new Order()

    constructor()
    {
    }

    ngOnInit(): void {}


    AddProductToOrder(productToOrder : {order_product: Product, order_amount: number})
    {
      for (let i = 0; i < productToOrder.order_amount; i++) {
        this.order.products.push(productToOrder.order_product);
        this.order.price += productToOrder.order_product.price;
      }
    }
}