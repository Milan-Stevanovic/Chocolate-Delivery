import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Registration } from '../models/registration.model';
import { Login } from '../models/login.model';
import { Token } from '../models/token.model';
import { UserDisplay } from '../models/userDisplay.model';
import { UserProfile } from '../models/userProfile.model';
import { ChangePassword } from '../models/changePassword.model';

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

    getUserById(id: number): Observable<UserProfile> {
      return this.http.get<UserProfile>(environment.serverURL + `/api/users/getUserById/${id}`);
    }

    getAllUsers(): Observable<UserDisplay[]>{
      return this.http.get<UserDisplay[]>(environment.serverURL + '/api/users/getAllUsers');
    }

    upload(formData : any, progress :any): Observable<HttpEvent<Object>>{
      return this.http.post<HttpEvent<Object>>(environment.serverURL + '/api/users/upload', formData, {reportProgress: true, observe: 'events'})
    }

    updateUserProfile(userProfile: UserProfile): Observable<Object>{
      return this.http.post<Object>(environment.serverURL + '/api/users/updateUserProfile', userProfile);
    }

    changePassword(changePassword: ChangePassword): Observable<Object>{
      return this.http.post<Object>(environment.serverURL + '/api/users/changePassword', changePassword);
    }
}
  