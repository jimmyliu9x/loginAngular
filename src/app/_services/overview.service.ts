import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Global} from '../global';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})


export class overviewService {
  constructor(private http: HttpClient) { }
  
  getDashboard(username: string, password: string): Observable<any> {
    return this.http.post(Global.API_URL + 'dashboard', {
        username,
        password
      }, httpOptions);
  }
  
}