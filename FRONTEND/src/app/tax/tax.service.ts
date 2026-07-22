import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tax } from './tax';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  private apiURL = "http://localhost:8000/api/tax/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Tax[]> {
    return this.httpClient.get<Tax[]>(this.apiURL)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(tax): Observable<Tax> {
    return this.httpClient.post<Tax>(this.apiURL, JSON.stringify(tax), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  
  find(id): Observable<Tax> {
    return this.httpClient.get<Tax>(this.apiURL + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
 
  update(id, tax): Observable<Tax> {
    return this.httpClient.put<Tax>(this.apiURL + id, JSON.stringify(tax), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
 
  delete(id){
    return this.httpClient.delete<Tax>(this.apiURL + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
 
  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
