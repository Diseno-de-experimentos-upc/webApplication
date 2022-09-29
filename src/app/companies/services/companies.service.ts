import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import  {Company} from "../model/company";

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  BaseURL:string = "http://localhost:3000/companies";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http:HttpClient) { }

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

  GetAllRecs(): Observable<Company>{
    return this.http.get<Company>(this.BaseURL, this.httpOptions).pipe(retry(2), catchError(this.handleError));
  }
  AddRec(rec:Company): Observable<Company>{
    return this.http.post<Company>(this.BaseURL, JSON.stringify(rec), this.httpOptions).pipe(retry(2), catchError(this.handleError));
  }

}
