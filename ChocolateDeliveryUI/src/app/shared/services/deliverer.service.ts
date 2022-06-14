import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Registration } from '../models/registration.model';
import { Login } from '../models/login.model';
import { Token } from '../models/token.model';
import { UserDisplay } from '../models/userDisplay.model';
import { UserProfile } from '../models/userProfile.model';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})

export class DelivererService {

    constructor( private http: HttpClient) { }

    getAllOrders(): Observable<Order[]>{
      return this.http.get<Order[]>(environment.serverURL + '/api/deliverer/getAllOrders');
    }

    acceptOrder(orderId : number): Observable<Object>{
      return this.http.post<Object>(environment.serverURL + '/api/deliverer/acceptOrder', orderId)
    }
}
  