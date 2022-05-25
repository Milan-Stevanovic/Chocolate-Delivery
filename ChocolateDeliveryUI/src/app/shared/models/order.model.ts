import { Product } from "./product.model";

export class Order
{
    id: number = -1;
    customerId: number = -1;
    delivererId: number = -1;
    address: string = "";
    comment: string = "";
    products: Product[] = [];
    price: number = 0;
}