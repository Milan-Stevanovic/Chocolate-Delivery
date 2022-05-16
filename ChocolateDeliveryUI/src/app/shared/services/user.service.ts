import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Registration } from '../models/registration.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {

    constructor( private http: HttpClient) { }

    register(registration: Registration): Observable<Object> {
        return this.http.post<Object>(environment.serverURL + '/api/users/register', registration);
    }
}
  