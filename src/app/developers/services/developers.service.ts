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
  BaseURL: string = 'http://localhost:8080/api/v1/developers';
  NewsURL: string = 'http://localhost:3000/news-developers';

  certificateUrl: string = 'http://localhost:8080/api/v1/certificates';
  studyCenterUrl: string = 'http://localhost:8080/api/v1/study-centers';
  databaseUrl: string = 'http://localhost:8080/api/v1/databases';
  frameworkUrl: string = 'http://localhost:8080/api/v1/frameworks';
  programingLanguagesUrl: string = 'http://localhost:8080/api/v1/programmingLanguages';
  projectsUrl: string = 'http://localhost:8080/api/v1/projects';

  digitalProfileUrl: string = 'http://localhost:8080/api/v1/digital_profiles';
  educationUrl: string = 'http://localhost:8080/api/v1/educations';

  ContactsURL: string = 'http://localhost:3000/contacts';
  MessagesURL: string = 'http://localhost:3000/messages';

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

  // GetSocialNetworks(digitalProfileId: number): Observable<object> {
  //   return this.http
  //     .get<object>(`${this.digitalProfileUrl}/${digitalProfileId}/social-networks`, this.httpOptions)
  //     .pipe(retry(2), catchError(this.handleError));
  // }
 
  GetProjectsByDigitalProfileId(digitalProfileId: number): Observable<object> {
    return this.http
      .get<object>(`${this.projectsUrl}/digitalProfile/${digitalProfileId}`, this.httpOptions)
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
}
