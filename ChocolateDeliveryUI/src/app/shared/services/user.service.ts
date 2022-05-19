import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Registration } from '../models/registration.model';
import { Login } from '../models/login.model';
import { Token } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {

    constructor( private http: HttpClient) { }

    register(registration: Registration): Observable<Object> {
      return this.http.post<Object>(environment.serverURL + '/api/users/register', registration);
    }

    login(login: Login): Observable<Token> {
      return this.http.post<Token>(environment.serverURL + '/api/users/login', login);
    }
}
  