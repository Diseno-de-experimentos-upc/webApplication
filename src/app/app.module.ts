import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
/* Angular Material Components */
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
/* Login Component */
import { LoginComponent } from './public/login/login.component';
/* Register Components */
import { CompanyComponent } from './public/register/company/company.component';
import { DeveloperComponent } from './public/register/developer/developer.component';
import { DialogBoxInvalidFormComponent } from './public/register/dialog-box-invalid-form/dialog-box-invalid-form.component';
import { RegisterComponent } from './public/register/register.component';
/* Developer Components */
import { DevelopersComponent } from './developers/developers.component';
import { HomeComponent } from './developers/pages/home-developer/home.component';
import { MessagesComponent } from './developers/pages/messages-developer/messages.component';
import { NotificationsDeveloperComponent } from './developers/pages/notifications-developer/notifications-developer.component';
import { ProfileDeveloperComponent } from './developers/pages/profile-developer/profile-developer.component';
import { DialogBoxSettingsDeveloperComponent } from './developers/pages/settings/dialog-box/dialog-box.component';
import { SettingsDeveloperComponent } from './developers/pages/settings/settings.component';
/* Company Components */
import { CompaniesComponent } from './companies/companies.component';
import { FindYourDevComponent } from './companies/pages/find-your-dev/find-your-dev.component';
import { HomeCompanyComponent } from './companies/pages/home-company/home-company.component';
import { MessagesCompanyComponent } from './companies/pages/messages-company/messages-company.component';
import { NotificationsCompanyComponent } from './companies/pages/notifications-company/notifications-company.component';
import { ProfileCompanyComponent } from './companies/pages/profile-company/profile-company.component';
import { DialogBoxSettingsComponent } from './companies/pages/settings/dialog-box/dialog-box.component';
import { DialogCancelComponent } from './companies/pages/settings/dialog-cancel/dialog-cancel.component';
import { DialogSaveComponent } from './companies/pages/settings/dialog-save/dialog-save.component';
import { SettingsCompanyComponent } from './companies/pages/settings/settings.component';
/* Page Not Found Component */
import { MakePostComponent } from './companies/pages/make-post/make-post.component';
import { CertificateComponent } from './developers/pages/tools-developer/certificate/certificate.component';
import { DatabaseComponent } from './developers/pages/tools-developer/database/database.component';
import { FrameworkComponent } from './developers/pages/tools-developer/framework/framework.component';
import { ProgrammingLanguageComponent } from './developers/pages/tools-developer/programming-language/programming-language.component';
import { ProjectComponent } from './developers/pages/tools-developer/project/project.component';
import { StudyCenterComponent } from './developers/pages/tools-developer/study-center/study-center.component';
import { ToolsDeveloperComponent } from './developers/pages/tools-developer/tools-developer.component';
import { PageNotFoundComponent } from './public/page-not-found/page-not-found.component';

//Tools
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MessageDialogComponent } from './companies/pages/find-your-dev/message-dialog/message-dialog.component';
import { NotificationDialogComponent } from './companies/pages/home-company/notification-dialog/notification-dialog.component';
import { SurveyComponent } from './public/survey/survey.component';


import { GoogleTagManagerModule } from 'angular-google-tag-manager';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DeveloperComponent,
    CompanyComponent,
    FindYourDevComponent,

    ProfileDeveloperComponent,

    PageNotFoundComponent,
    DialogBoxInvalidFormComponent,

    DevelopersComponent,
    HomeComponent,
    MessagesComponent,
    SettingsDeveloperComponent,
    ProfileDeveloperComponent,
    NotificationsDeveloperComponent,
    DialogBoxSettingsDeveloperComponent,

    CompaniesComponent,
    HomeCompanyComponent,
    MessagesCompanyComponent,
    FindYourDevComponent,
    ProfileCompanyComponent,
    SettingsCompanyComponent,
    NotificationsCompanyComponent,
    DialogBoxSettingsComponent,
    DialogCancelComponent,
    DialogSaveComponent,

    PageNotFoundComponent,
    ToolsDeveloperComponent,
    ProjectComponent,
    CertificateComponent,
    DatabaseComponent,
    ProgrammingLanguageComponent,
    FrameworkComponent,
    StudyCenterComponent,
    MakePostComponent,
    MessageDialogComponent,
    NotificationDialogComponent,
    SurveyComponent,
  ],
  imports: [
    MatSnackBarModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSortModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    MatRippleModule,
    ScrollingModule,
    MatSidenavModule,
    MatDividerModule,
    MatRippleModule,
    ScrollingModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    GoogleTagManagerModule.forRoot({
      id: 'GTM-N6RT3ND5',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
