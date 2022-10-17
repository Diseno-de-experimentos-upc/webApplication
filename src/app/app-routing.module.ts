import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';
/* Developers components */
import { DeveloperComponent } from './public/register/developer/developer.component';
import { DevelopersComponent } from './developers/developers.component';
import { MessagesComponent } from './developers/pages/messages-developer/messages.component';
import { HomeComponent } from './developers/pages/home-developer/home.component';
/* Companies components */
import { CompaniesComponent } from './companies/companies.component';
import { CompanyComponent } from './public/register/company/company.component';
import { HomeCompanyComponent } from './companies/pages/home-company/home-company.component';
import { MessagesCompanyComponent } from './companies/pages/messages-company/messages-company.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {
    path: 'register',
    component: RegisterComponent,
    children: [
      { path: 'developer', component: DeveloperComponent },
      { path: 'company', component: CompanyComponent },
    ],
  },

  {
    path: 'developers',
    component: DevelopersComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'messages', component: MessagesComponent },
    ],
  },
  {
    path: 'companies',
    component: CompaniesComponent,
    children: [
      { path: 'home', component: HomeCompanyComponent },
      { path: 'messages', component: MessagesCompanyComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
