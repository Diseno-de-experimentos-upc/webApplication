import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

import { RegisterComponent } from './public/register/register.component';
import { DeveloperComponent } from './public/register/developer/developer.component';
import { DevelopersComponent } from './developers/developers.component';
import { CompaniesComponent } from './companies/companies.component';
import { LoginComponent } from './public/login/login.component';
import { CompanyComponent } from './public/register/company/company.component';
import { DialogBoxComponent } from './public/register/dialog-box/dialog-box.component';
import { FindYourDevComponent } from './companies/pages/find-your-dev/find-your-dev.component';
import { ProfileDeveloperComponent } from './profile-developer/profile-developer.component';
import { HomeComponent } from './developers/pages/home-developer/home.component';
import { MessagesComponent } from './developers/pages/messages-developer/messages.component';
import { HomeCompanyComponent } from './companies/pages/home-company/home-company.component';
import { MessagesCompanyComponent } from './companies/pages/messages-company/messages-company.component';
import { PageNotFoundComponent } from './public/page-not-found/page-not-found.component';
import { DialogBoxInvalidFormComponent } from './public/register/dialog-box-invalid-form/dialog-box-invalid-form.component';
import { ProfileCompanyComponent } from './profile-company/profile-company.component'; 

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    DeveloperComponent,
    DevelopersComponent,
    CompaniesComponent,
    LoginComponent,
    CompanyComponent,
    DialogBoxComponent,
    FindYourDevComponent,
    ProfileDeveloperComponent,
    HomeComponent,
    MessagesComponent,
    HomeCompanyComponent,
    MessagesCompanyComponent,
    PageNotFoundComponent,
    DialogBoxInvalidFormComponent,
    ProfileCompanyComponent, 
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
