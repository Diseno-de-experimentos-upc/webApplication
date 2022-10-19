import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';
import { PageNotFoundComponent } from './public/page-not-found/page-not-found.component';
/* Developers components */
import { DeveloperComponent } from './public/register/developer/developer.component';
import { DevelopersComponent } from './developers/developers.component';
import { MessagesComponent } from './developers/pages/messages-developer/messages.component';
import { HomeComponent } from './developers/pages/home-developer/home.component';
import { ProfileDeveloperComponent } from './profile-developer/profile-developer.component';
/* Companies components */
import { CompanyComponent } from './public/register/company/company.component';
import { CompaniesComponent } from './companies/companies.component';
import { ProfileCompanyComponent } from './profile-company/profile-company.component';
import { FindYourDevComponent } from './companies/pages/find-your-dev/find-your-dev.component';
import { HomeCompanyComponent } from './companies/pages/home/home.component';
import { MessagesCompanyComponent } from './companies/pages/messages-company/messages-company.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'register',
    component: RegisterComponent,
    children: [
      { path: 'developer', component: DeveloperComponent },
      { path: 'company', component: CompanyComponent },
    ],
  },

  {
    path: 'developers/:id',
    component: DevelopersComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'profile', component: ProfileDeveloperComponent },
    ],
  },
  {
    path: 'companies/:id',
    component: CompaniesComponent,
    children: [
      { path: 'home', component: HomeCompanyComponent },
      { path: 'messages', component: MessagesCompanyComponent },
      { path: 'profile', component: ProfileCompanyComponent }
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
