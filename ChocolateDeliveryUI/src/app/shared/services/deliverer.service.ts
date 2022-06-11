import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Registration } from '../models/registration.model';
import { Login } from '../models/login.model';
import { Token } from '../models/token.model';
import { UserDisplay } from '../models/userDisplay.model';
import { UserProfile } from '../models/userProfile.model';

@Injectable({
  providedIn: 'root'
})

export class DelivererService {

    constructor( private http: HttpClient) { }
}
  