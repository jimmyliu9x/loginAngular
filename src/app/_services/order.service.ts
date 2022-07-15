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
export class OrderService {
  constructor(private http: HttpClient) { }
  
  getDropdownMenu(): Observable<any> {
    return this.http.get(Global.API_URL + 'Unshipped/ScreenDDL', { responseType: 'json' });
  }
  
  getUnShippedOrders(json:any): Observable<any> {
    return this.http.post(Global.API_URL + 'Unshipped/Search', json, httpOptions);
  }
}