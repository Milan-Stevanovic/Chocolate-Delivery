import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Registration } from '../models/registration.model';
import { Login } from '../models/login.model';
import { Token } from '../models/token.model';
import { UserDisplay } from '../models/userDisplay.model';

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
}
  