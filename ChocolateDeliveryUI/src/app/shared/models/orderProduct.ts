import { Order } from "./order.model";
import { Product } from "./product.model";

export class OrderProduct
{
    orderId : number = -1;
    order : Order = new Order();
    productId : number = -1;
    product : Product = new Product();
    quantity : number = 0;
}