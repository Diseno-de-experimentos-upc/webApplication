import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Developer } from '../model/developer';

@Injectable({
  providedIn: 'root',
})
export class DevelopersService {
  BaseURL: string = 'http://localhost:3000/developers';
  NewsURL: string = 'http://localhost:3000/news-developers';

  educationUrl: string = 'http://localhost:3000/education';
  digitalProfileUrl: string = 'http://localhost:3000/digital-profiles';
  
  NotificationsURL: string = 'http://localhost:3000/notifications-developers';



  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`An error occurred: ${error.error.message}`);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError(
      'something happened with request, please try again later'
    );
  }

  GetAllDevs(): Observable<Developer> {
    return this.http
      .get<Developer>(this.BaseURL, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  AddDev(dev: Developer): Observable<Developer> {
    return this.http
      .post<Developer>(this.BaseURL, JSON.stringify(dev), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetAllNews(): Observable<object> {
    return this.http
      .get<object>(this.NewsURL, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  //////Messages Section /////////

  GetContacts(): Observable<object> {
    return this.http
      .get<object>(`http://localhost:8080/api/v1/users/${2}/messages/LastMessageDeveloper`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  
  GetMessages(contactId: number): Observable<object> {
    return this.http
      .get(`http://localhost:8080/api/v1/users/${2}/messages/${contactId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  SendMessage(answer: object, contactId: number): Observable<object> {
    return this.http
      .post<object>(`http://localhost:8080/api/v1/users/${2}/messages/${contactId}`, answer, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
