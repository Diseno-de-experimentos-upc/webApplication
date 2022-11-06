import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,  HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Developer } from '../../developers/model/developer';
import { Company } from '../../companies/model/company';
import { User } from '../register/model/user';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  basePath = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) { }


  //http options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };
  //handle error
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

  getDeveloperAll(user_role : string): Observable<any> {
    return this.http
      .get<Developer>(`${this.basePath}/searchByRole/${user_role}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getCompanyAll(user_role : string): Observable<Company> {
    return this.http
      .get<Company>(`${this.basePath}/searchByRole/${user_role}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getUserAll(): Observable<object> {
    return this.http
      .get<object>(this.basePath, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  postUser(user: any): Observable<User> {
    return this.http
      .post<User>(this.basePath, JSON.stringify(user), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
