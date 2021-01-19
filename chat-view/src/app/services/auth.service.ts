import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  sendLogin(data) {
    const url = `${ environment.urlBase }/api/auth/login`;
    return this.http.post(url, data);
  }

}
