import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

    constructor( private http: HttpClient) { }

    getAllProducts(): Observable<Product[]>{
      return this.http.get<Product[]>(environment.serverURL + '/api/customer/getAllProducts');
    }

    confirmOrder(order: Order): Observable<Object> {
      return this.http.post<Object>(environment.serverURL + '/api/customer/confirmOrder', order);
    }
}
  