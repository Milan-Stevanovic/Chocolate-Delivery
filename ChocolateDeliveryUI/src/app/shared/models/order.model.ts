import { OrderProduct } from "./orderProduct";

export class Order
{
    id: number = -1;
    customerId: number = -1;
    delivererId: number = -1;
    orderState: string = "";
    address: string = "";
    comment: string = "";
    orderProducts: OrderProduct[] = [];
    price: number = 0;
}