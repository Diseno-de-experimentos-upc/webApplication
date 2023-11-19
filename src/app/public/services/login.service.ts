import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,  HttpEvent,  HttpHandler,  HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Developer } from '../register/model/developer';
import { Company } from '../register/model/company';
import { DigitalProfile } from '../register/model/digitalprofile';
@Injectable({
  providedIn: 'root'
})
export class LoginService {


  //This is the main URL for the backend
  baseUrl = "https://backend-experimentos.azurewebsites.net/api/v1";

  developerURL = this.baseUrl + '/developers';
  companyURL = this.baseUrl + '/companies';
  usersURL = this.baseUrl + '/users';

  basePath = this.baseUrl + '/users';
  urlDeveloper = this.baseUrl + '/developers';
  urlCompany = this.baseUrl + '/companies';
  urlDigitalProfile = this.baseUrl + "/digital_profiles";
  urlDatabase = this.baseUrl + '/databases';
  urlFrameworks = this.baseUrl + '/frameworks';
  urlLenguages = this.baseUrl + '/programmingLanguages';
  educationUrl: string = this.baseUrl + '/educations';

  constructor(private http: HttpClient) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    throw new Error('Method not implemented.');
  }


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

  getAllUser(): Observable<object> {
    return this.http
      .get<object>(this.basePath, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  postDigitalProfile(digitalProfile: object, id: number): Observable<object> {
    return this.http
      .post<object>(`${this.urlDigitalProfile}/${id}`, digitalProfile, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAllDigitalProfile(): Observable<object> {
    return this.http
      .get<object>(`${this.urlDigitalProfile}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getDigitalProfileByDeveloperId(id: number): Observable<Object> {
    return this.http
      .get<DigitalProfile>(`${this.urlDigitalProfile}/developer/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  GetEducationByDigitalProfileId(id: number): Observable<object> {
    return this.http
      .get(`${this.educationUrl}/digitalProfile/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  postDatabase(database: object, id: number): Observable<object> {
    return this.http
      .post<object>(`${this.urlDatabase}/${id}`, database, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  postFramework(framework: object, id: number): Observable<object> {
    return this.http
      .post<object>(`${this.urlFrameworks}/${id}`, framework, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  getAllFrameworks(): Observable<object> {
    return this.http
      .get<object>(`${this.urlFrameworks}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  postLenguage(lenguage: object, id: number): Observable<object> {
    return this.http
      .post<object>(`${this.urlLenguages}/${id}`, lenguage, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getUserByEmail(email: string): Observable<object> {
    return this.http
      .get<object>(`${this.basePath}/searchByEmail/${email}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getUserById(id: number): Observable<object> {
    return this.http
      .get<object>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  //create a post request to create a new education with specific digital profile id
  postEducation(education: object, id: number): Observable<object> {
    return this.http
      .post<object>(`${this.educationUrl}/${id}`, education, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  GetDigitalProfileByDevId(id: number): Observable<object> {
    return this.http
      .get(`${this.urlDigitalProfile}/developer/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}

