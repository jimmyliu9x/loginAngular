import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Observable, of,throwError } from 'rxjs';
import { catchError,retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

interface RandomUser {
  gender: string;
  email: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
}
interface Hero {
  id: number;
  name: string;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
   // Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})



export class RdsService {

  randomUserUrl = 'https://api.randomuser.me/';

  userLoginUrl = 'https://api.randomuser.me/';
  
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
  ): Observable<{ results: RandomUser[] }> {

    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('results', `${pageSize}`)
      .append('sortField', `${sortField}`)
      .append('sortOrder', `${sortOrder}`);

    filters.forEach(filter => {
      filter.value.forEach(value => {
        params = params.append(filter.key, value);
      });
    });

    return this.http
      .get<{ results: RandomUser[] }>(`${this.randomUserUrl}`, { params })
      .pipe(catchError(() => of({ results: [] })));

  }


  /** POST: user login service by API */
  userLogin(hero: Hero): Observable<Hero> {
    return this.http
    .post< Hero>(this.userLoginUrl, hero, httpOptions)
    .pipe(
        //catchError( this.handleError('userLogin', hero) )
      );
  }


}
