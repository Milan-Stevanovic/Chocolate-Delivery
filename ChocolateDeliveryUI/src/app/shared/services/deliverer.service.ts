import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AcceptOrder } from '../models/acceptOrder.model';
import { OrderDisplay } from '../models/orderDisplay.model';
import { OrderState } from '../models/orderState.model';

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

    checkIfOrderExists(delivererId: number): Observable<Object>{
      return this.http.post<Object>(environment.serverURL + '/api/deliverer/checkIfOrderExists', delivererId);
    }

    getOrderState(delivererId: number): Observable<OrderState>{
      return this.http.post<OrderState>(environment.serverURL + '/api/deliverer/getOrderState', delivererId);
    }
}
  