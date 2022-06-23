import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AcceptOrder } from '../models/acceptOrder.model';
import { OrderDisplay } from '../models/orderDisplay.model';

@Injectable({
  providedIn: 'root'
})

export class DelivererService {

    constructor( private http: HttpClient) { }

    getAllOrders(): Observable<OrderDisplay[]>{
      return this.http.get<OrderDisplay[]>(environment.serverURL + '/api/deliverer/getAllOrders');
    }

    acceptOrder(acceptOrder: AcceptOrder): Observable<Object>{
      return this.http.post<Object>(environment.serverURL + '/api/deliverer/acceptOrder', acceptOrder)
    }

    getAllPastOrders(delivererId: number): Observable<OrderDisplay[]>{
      return this.http.post<OrderDisplay[]>(environment.serverURL + '/api/deliverer/getAllPastOrders', delivererId);
    }
}
  