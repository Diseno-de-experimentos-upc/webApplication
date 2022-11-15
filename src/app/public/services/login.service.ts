import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,  HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Developer } from '../../developers/model/developer';
import { Company } from '../../companies/model/company';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  developerURL = 'http://localhost:8080/api/v1/developers';
  companyURL = 'http://localhost:8080/api/v1/companies';
  usersURL = 'http://localhost:3000/users';
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

  getDeveloperAll(): Observable<Developer> {
    return this.http
      .get<Developer>(this.developerURL, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getCompanyAll(): Observable<Company> {
    return this.http
      .get<Company>(this.companyURL, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getUserAll(): Observable<object> {
    return this.http
      .get<object>(this.usersURL, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  postUser(user: any): Observable<object> {
    return this.http
      .post<object>(this.usersURL, user, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
