import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/* Angular Material Components */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {MatBadgeModule} from '@angular/material/badge';
/* Login Component */
import { LoginComponent } from './public/login/login.component';
/* Register Components */
import { RegisterComponent } from './public/register/register.component';
import { DeveloperComponent } from './public/register/developer/developer.component';
import { CompanyComponent } from './public/register/company/company.component';
import { DialogBoxComponent } from './public/register/dialog-box/dialog-box.component';
import { DialogBoxInvalidFormComponent } from './public/register/dialog-box-invalid-form/dialog-box-invalid-form.component';
/* Developer Components */
import { DevelopersComponent } from './developers/developers.component';
import { HomeComponent } from './developers/pages/home-developer/home.component';
import { MessagesComponent } from './developers/pages/messages-developer/messages.component';
import { SettingsDeveloperComponent } from './developers/pages/settings/settings.component';
import { ProfileDeveloperComponent } from './developers/pages/profile-developer/profile-developer.component';
import { DialogBoxSettingsDeveloperComponent } from './developers/pages/settings/dialog-box/dialog-box.component';
import { NotificationsDeveloperComponent } from './developers/pages/notifications-developer/notifications-developer.component';
/* Company Components */
import { CompaniesComponent } from './companies/companies.component';
import { HomeCompanyComponent } from './companies/pages/home-company/home-company.component';
import { MessagesCompanyComponent } from './companies/pages/messages-company/messages-company.component';
import { FindYourDevComponent } from './companies/pages/find-your-dev/find-your-dev.component';
import { ProfileCompanyComponent } from './companies/pages/profile-company/profile-company.component';
import { SettingsCompanyComponent } from './companies/pages/settings/settings.component';
import { DialogBoxSettingsComponent } from './companies/pages/settings/dialog-box/dialog-box.component';
import { DialogCancelComponent } from './companies/pages/settings/dialog-cancel/dialog-cancel.component';
import { DialogSaveComponent } from './companies/pages/settings/dialog-save/dialog-save.component';
import { NotificationsCompanyComponent } from './companies/pages/notifications-company/notifications-company.component';
/* Page Not Found Component */
import { PageNotFoundComponent } from './public/page-not-found/page-not-found.component';
import { ToolsDeveloperComponent } from './developers/pages/tools-developer/tools-developer.component';
import { ProjectComponent } from './developers/pages/tools-developer/project/project.component';
import { CertificateComponent } from './developers/pages/tools-developer/certificate/certificate.component';
import { DatabaseComponent } from './developers/pages/tools-developer/database/database.component';
import { ProgrammingLanguageComponent } from './developers/pages/tools-developer/programming-language/programming-language.component';
import { FrameworkComponent } from './developers/pages/tools-developer/framework/framework.component';
import { StudyCenterComponent } from './developers/pages/tools-developer/study-center/study-center.component';
import { MakePostComponent } from './companies/pages/make-post/make-post.component';


//Tools
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MessageDialogComponent } from './companies/pages/find-your-dev/message-dialog/message-dialog.component';


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



  ],
  imports: [
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
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
