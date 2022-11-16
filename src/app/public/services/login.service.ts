import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,  HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Developer } from '../register/model/developer';
import { Company } from '../register/model/company';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  basePath = 'http://localhost:8080/api/v1/users';
  urlDeveloper = 'http://localhost:8080/api/v1/developers';
  urlCompany = 'http://localhost:8080/api/v1/companies';
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

  getDeveloperAll(): Observable<any> {
    return this.http
      .get<Developer>(`${this.urlDeveloper}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  postDeveloper(developer: Developer): Observable<Developer> {
    return this.http
      .post<Developer>(`${this.urlDeveloper}`, developer, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getCompanyAll(): Observable<Company> {
    return this.http
      .get<Company>(`${this.urlCompany}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  postCompany(company: Company): Observable<Company> {
    return this.http
      .post<Company>(`${this.urlCompany}`, company, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getUserAll(): Observable<object> {
    return this.http
      .get<object>(this.basePath, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
