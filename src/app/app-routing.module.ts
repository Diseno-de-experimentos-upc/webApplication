import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';
import { CompanyComponent } from "./public/register/company/company.component";
import { DeveloperComponent } from './public/register/developer/developer.component';
import { DevelopersComponent } from "./developers/developers.component";
import { CompaniesComponent } from './companies/companies.component';
import { PageNotFoundComponent } from './public/page-not-found/page-not-found.component';
import { MessagesComponent } from './developers/pages/messages/messages.component';
import { HomeComponent } from './developers/pages/home/home.component';

const routes: Routes = [
  {path:'', component:DevelopersComponent},
  //{path:'', component:LoginComponent},
  {path: 'register', component: RegisterComponent, children: [
      {path: 'developer', component: DeveloperComponent},
      {path: 'company', component: CompanyComponent},
    ]},
  {path: 'register-company', component:CompanyComponent},
  
  {path: 'developers', component:DevelopersComponent, children: [
    {path: 'home', component: HomeComponent},
    {path: 'messages', component: MessagesComponent}
  ]},
  {path: 'home-company', component:CompaniesComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
