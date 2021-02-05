import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
      this.myAppUrl = environment.appUrl;
      this.myApiUrl = 'Clientes/';
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.myAppUrl + this.myApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getClient(postId: number): Observable<Client> {
      return this.http.get<Client>(this.myAppUrl + this.myApiUrl + postId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveClient(client): Observable<Client> {
      return this.http.post<Client>(this.myAppUrl + this.myApiUrl, JSON.stringify(client), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateClient(client): Observable<Client> {
      return this.http.put<Client>(this.myAppUrl + this.myApiUrl, JSON.stringify(client), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteClient(postId: number): Observable<Client> {
      return this.http.delete<Client>(this.myAppUrl + this.myApiUrl + postId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
