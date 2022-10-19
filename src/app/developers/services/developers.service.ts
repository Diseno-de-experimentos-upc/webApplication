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


  ContactsURL: string = 'http://localhost:3000/contacts';
  MessagesURL: string = 'http://localhost:3000/messages';


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
   
  GetDeveloperById(id: number): Observable<Developer> {
    return this.http
      .get<Developer>(`${this.BaseURL}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  AddDev(dev: Developer): Observable<Developer> {
    return this.http
      .post<Developer>(this.BaseURL, JSON.stringify(dev), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetDevById(id: number): Observable<Developer> {
    return this.http
      .get<Developer>(`${this.BaseURL}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateDev(dev: Developer): Observable<Developer> {
    return this.http
      .put<Developer>(`${this.BaseURL}/${dev.id}`, JSON.stringify(dev), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetAllNews(): Observable<object> {
    return this.http
      .get<object>(this.NewsURL, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetCetificates(educationId: number): Observable<object> {
    return this.http
      .get<object>(`${this.educationUrl}/${educationId}/certificates`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetStudyCenters(educationId: number): Observable<object> {
    return this.http
      .get<object>(`${this.educationUrl}/${educationId}/study-centers`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetSocialNetworks(digitalProfileId: number): Observable<object> {
    return this.http
      .get<object>(`${this.digitalProfileUrl}/${digitalProfileId}/social-networks`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetTechnologies(digitalProfileId: number): Observable<object> {
    return this.http
      .get<object>(`${this.digitalProfileUrl}/${digitalProfileId}/technologies`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetProjects(digitalProfileId: number): Observable<object> {
    return this.http
      .get<object>(`${this.digitalProfileUrl}/${digitalProfileId}/projects`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }


  //////Messages Section /////////

  GetContacts(): Observable<object> {
    return this.http
      .get<object>(this.ContactsURL, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetMessages(): Observable<object> {
    return this.http
      .get(this.MessagesURL, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  SendMessage(answer: object): Observable<object> {
    return this.http
      .post<object>(this.MessagesURL, answer, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
