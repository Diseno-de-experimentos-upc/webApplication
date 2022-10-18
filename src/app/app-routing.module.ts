import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './public/register/register.component';
import { CompanyComponent } from "./public/register/company/company.component";
import { DeveloperComponent } from './public/register/developer/developer.component';
import { DevelopersComponent } from "./developers/developers.component";
import { CompaniesComponent } from './companies/companies.component';

import {ProfileDeveloperComponent} from "./profile-developer/profile-developer.component";

import { PageNotFoundComponent } from './public/page-not-found/page-not-found.component';
import { MessagesComponent } from './developers/pages/messages/messages.component';
import { HomeComponent } from './developers/pages/home/home.component';

import { FindYourDevComponent } from './companies/pages/find-your-dev/find-your-dev.component';
import { HomeCompanyComponent } from "./companies/pages/home/home.component";
import { SettingsDeveloperComponent } from './developers/pages/settings/settings.component';
import { SettingsCompanyComponent } from './companies/pages/settings/settings.component';

const routes: Routes = [
  {path:'', component:DevelopersComponent},
  //{path:'', component:LoginComponent},
  {path: 'register', component: RegisterComponent, children: [
      {path: 'developer', component: DeveloperComponent},
      {path: 'company', component: CompanyComponent},
    ]},
  {path: 'register-company', component:CompanyComponent},

  {path: 'profile-developer', component:ProfileDeveloperComponent},

  {path: 'company', component:CompaniesComponent, children: [
      {path: 'find-your-dev', component:FindYourDevComponent},
      {path: 'home', component:HomeCompanyComponent},
      {path: 'settings', component:SettingsCompanyComponent},
    ]},



  {path: 'developers', component:DevelopersComponent, children: [
    {path: 'home', component: HomeComponent},
    {path: 'messages', component: MessagesComponent},
    {path: 'settings', component: SettingsDeveloperComponent},
  ]},
  {path: 'home-company', component:CompaniesComponent},
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
