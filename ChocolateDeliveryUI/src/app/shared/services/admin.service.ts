import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { NewProduct } from '../models/newProduct.model';
import { OrderDisplay } from '../models/orderDisplay.model';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

    constructor( private http: HttpClient) { }

    verifyUserById(id: number): Observable<Object> {
      return this.http.post<Object>(environment.serverURL + '/api/admin/verifyUserById', id);
    }

    rejectUserById(id: number): Observable<Object> {
      return this.http.post<Object>(environment.serverURL + '/api/admin/rejectUserById', id);
    }

    addNewProduct(product: NewProduct): Observable<Object>{
      return this.http.post<Object>(environment.serverURL + '/api/admin/addNewProduct', product);
    }

    getAllOrders(): Observable<OrderDisplay[]>{
      return this.http.get<OrderDisplay[]>(environment.serverURL + '/api/deliverer/getAllOrders');
    }
}
  