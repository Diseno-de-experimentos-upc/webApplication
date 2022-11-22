import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Company } from '../model/company';


@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  BaseURL: string = 'https://upc-si729-sw52-digitalmind.herokuapp.com/api/v1/companies';

  socialNetworks = 'https://upc-si729-sw52-digitalmind.herokuapp.com/api/v1/socialNetworks';
 
  NewsURL: string = 'http://localhost:3000/news-companies';
  NotificationsURL: string = 'http://localhost:3000/notifications-companies';
  basePath = 'https://upc-si729-sw52-digitalmind.herokuapp.com/api/v1/users';
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

  GetAllRec(): Observable<Company> {
    return this.http
      .get<Company>(this.BaseURL, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  GetRecById(id: number): Observable<Company> {
    return this.http
      .get<Company>(this.BaseURL + '/' + id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  updateRec(id: number, dev: Company): Observable<Company> {
    return this.http
      .put<Company>(this.BaseURL + '/' + id, JSON.stringify(dev), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  AddRec(dev: Company): Observable<Company> {
    return this.http
      .post<Company>(this.BaseURL, JSON.stringify(dev), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetRecruiterById(id: number): Observable<Company> {
    return this.http
      .get<Company>(this.BaseURL + '/' + id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetAllNews(): Observable<object> {
    return this.http
      .get<object>(this.NewsURL, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  //////Messages Section /////////

  GetContacts(UserId:number): Observable<object> {
    return this.http
      .get<object>(`https://upc-si729-sw52-digitalmind.herokuapp.com/api/v1/users/${UserId}/messages/LastMessageCompany`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetMessages(contactId: number, UserId:number): Observable<object> {
    return this.http
      .get(`https://upc-si729-sw52-digitalmind.herokuapp.com/api/v1/users/${UserId}/messages/${contactId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  SendMessage(answer: object, contactId:number, UserId:number): Observable<object> {
    return this.http
      .post<object>(`https://upc-si729-sw52-digitalmind.herokuapp.com/api/v1/users/${UserId}/messages/${contactId}`, answer, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetPosts(id: number): Observable<object> {
    return this.http
      .get<object>(this.BaseURL + '/' + id + '/posts', this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  DeletePost(id_user:number, id: number) {
    return this.http.delete(`${this.BaseURL}/${id_user}/posts/${id}` , this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetSocialNetworks(companyId: number): Observable<object> {
    return this.http
      .get<object>(`${this.BaseURL}/${companyId}/company-social-networks`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  //////social networks section /////////
  GetSocialNetworkByUserId(id: number): Observable<object> {
    return this.http
      .get<object>(this.socialNetworks + '/user/' + id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  //////Notifications Section /////////

  GetNotifications(): Observable<object> {
    return this.http
      .get(this.NotificationsURL, this.httpOptions)
      .pipe(retry(2),catchError(this.handleError));
  }
  DeleteNotificationById(id: number): Observable<object> {
    return this.http
      .delete(`${this.NotificationsURL}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetAllUsers(): Observable<object> {
    return this.http
      .get(this.basePath, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  AddUser(user: Company): Observable<Company> {
    return this.http
      .post<Company>(this.basePath, JSON.stringify(user), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}

