import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Developer } from '../model/developer';
import { Company } from "../../public/register/model/company";
import { Post } from '../../companies/model/post';

@Injectable({
  providedIn: 'root',
})
export class DevelopersService {


   //This is the main URL for the backend
   baseUrl = "https://backend-experimentos.azurewebsites.net/api/v1";

  BaseURL: string = `${this.baseUrl}/developers`;
  PostURL: string = `${this.baseUrl}/posts`;

  certificateUrl: string = `${this.baseUrl}/certificates`;
  studyCenterUrl: string = `${this.baseUrl}/study-centers`;
  databaseUrl: string = `${this.baseUrl}/databases`;
  frameworkUrl: string = `${this.baseUrl}/frameworks`;
  programingLanguagesUrl: string = `${this.baseUrl}/programmingLanguages`;
  projectsUrl: string = `${this.baseUrl}/projects`;
  socialNetworks = `${this.baseUrl}/socialNetworks`;


  digitalProfileUrl: string = `${this.baseUrl}/digital_profiles`;
  educationUrl: string = `${this.baseUrl}/educations`;

  urlCompany = `${this.baseUrl}/companies`;

  backURL: string = `${this.baseUrl}/users/searchByFrameworkAndProgrammingLanguageAndDatabase`;


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

  GetDevsByFrameworkAndLanguageAndDatabase(framework: string, language: string, database: string): Observable<object> {

    return this.http
      .get<object>(`${this.backURL}/${framework}&${language}&${database}`, this.httpOptions)
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

  GetAllPosts(): Observable<Post> {
    return this.http
      .get<Post>(this.PostURL, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetDigitalProfileByDeveloperId(developerId: number): Observable<object> {
    return this.http
      .get<object>(`${this.digitalProfileUrl}/developer/${developerId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetEducationByDigitalProfileId(digitalProfileId: number): Observable<object> {
    return this.http
      .get<object>(`${this.educationUrl}/digitalProfile/${digitalProfileId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetDatabaseByDigitalProfileId(digitalProfileId: number): Observable<object> {
    return this.http
      .get<object>(`${this.databaseUrl}/digitalProfile/${digitalProfileId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetFrameworkByDigitalProfileId(digitalProfileId: number): Observable<object> {
    return this.http
      .get<object>(`${this.frameworkUrl}/digitalProfile/${digitalProfileId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetProgrammingLanguagesByDigitalProfileId(digitalProfileId: number): Observable<object> {
    return this.http
      .get<object>(`${this.programingLanguagesUrl}/digitalProfile/${digitalProfileId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetCertificatesByEducationId(educationId: number): Observable<object> {
    return this.http
      .get<object>(`${this.certificateUrl}/education/${educationId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetStudyCentersByEducationId(educationId: number): Observable<object> {
    return this.http
      .get<object>(`${this.studyCenterUrl}/education/${educationId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  //////social networks section /////////
  GetSocialNetworkByUserId(id: number): Observable<object> {
    return this.http
      .get<object>(this.socialNetworks + '/user/' + id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetProjectsByDigitalProfileId(digitalProfileId: number): Observable<object> {
    return this.http
      .get<object>(`${this.projectsUrl}/digitalProfile/${digitalProfileId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }


  //////Messages Section /////////

  GetContacts(UserId:number): Observable<object> {
    return this.http
      .get<object>(`https://backend-experimentos.azurewebsites.net/api/v1/users/${UserId}/messages/LastMessageDeveloper`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetMessages(contactId: number, UserId:number): Observable<object> {
    return this.http
      .get(`https://backend-experimentos.azurewebsites.net/api/v1/users/${UserId}/messages/${contactId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  SendMessage(answer: object, contactId: number, UserId:number): Observable<object> {
    return this.http
      .post<object>(`https://backend-experimentos.azurewebsites.net/api/v1/users/${UserId}/messages/${contactId}`, answer, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  //////Notifications Section /////////

  GetNotificationsByUserId(id:number, UserId:number): Observable<object> {
    return this.http
      .get(`https://backend-experimentos.azurewebsites.net/api/v1/users/${UserId}/notifications/${id}`, this.httpOptions)
      .pipe(retry(2),catchError(this.handleError));
  }
  GetAllNotifications(UserId:number): Observable<object> {
    return this.http
      .get(`https://backend-experimentos.azurewebsites.net/api/v1/users/${UserId}/notifications`, this.httpOptions)
      .pipe(retry(2),catchError(this.handleError));
  }



  SendNotification(notification: object, UserId:number): Observable<object> {
    return this.http
      .post<object>(`https://backend-experimentos.azurewebsites.net/api/v1/users/${UserId}/notifications`, JSON.stringify(notification) , this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }


  DeleteNotificationById(id: number, UserId: number): Observable<object> {
    return this.http
      .delete(`https://backend-experimentos.azurewebsites.net/api/v1/users/${UserId}/notifications/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getCompanyAll(): Observable<Company> {
    return this.http
      .get<Company>(`${this.urlCompany}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
