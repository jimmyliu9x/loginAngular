import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Observable, of,throwError } from 'rxjs';
import { catchError,retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

interface amazonSales {
  reportDate: string;
  amount: string;
  qty:string;
}

interface postData {
  Top:'20',
  UseId: '1'
}

@Injectable({
  providedIn: 'root'
})



export class RdsService {

  randomUserUrl = 'https://api.randomuser.me/';

  url = "https://flsoftdemo-apiv2.azurewebsites.net/dashboard";

  constructor( 
    private http: HttpClient
  ) { }



  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  /* a test function for http get method. */
  getUsers(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filters: Array<{ key: string; value: string[] }>
  ): Observable<{ results: amazonSales[] }> {

    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('results', `${pageSize}`)
      .append('Top', `20`)
      .append('UseId', `1`);

    filters.forEach(filter => {
      filter.value.forEach(value => {
        params = params.append(filter.key, value);
      });
    });

    return this.http
      .post<{ results: amazonSales[] }>(`${this.url}`, { params })
      .pipe(catchError(() => of({ results: [] })));

  }


  /* a test function for http post method. */
  post(
    Top: string,
    UserId: string
  ): Observable<any> 
  {


    return this.http
      .post(`${this.url}`,{Top,UserId}, httpOptions)
      .pipe(catchError(() => of({ results: [] })));

  }

}
