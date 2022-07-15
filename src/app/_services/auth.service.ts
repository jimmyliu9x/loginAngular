import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global} from '../global';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) { }
  // login, register
  login(username: string, password: string): Observable<any> {
    return this.http.post(Global.API_URL + '/user/login', {
      username,
      password
    }, httpOptions);
  }
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(Global.API_URL + '/user/signup', {
      username,
      email,
      password
    }, httpOptions);
  }

  refreshToken(token: string) {
    return this.http.post(Global.API_URL + 'refreshtoken', {
      refreshToken: token
    }, httpOptions);
  }
}

