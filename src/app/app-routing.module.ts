import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';
import { CompanyComponent } from "./public/register/company/company.component";
import { DeveloperComponent } from './public/register/developer/developer.component';
import { DevelopersComponent } from "./developers/developers.component";
import { CompaniesComponent } from './companies/companies.component';
import {ProfileDeveloperComponent} from "./profile-developer/profile-developer.component";

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path: 'register', component: RegisterComponent, children: [
      {path: 'developer', component: DeveloperComponent},
      {path: 'company', component: CompanyComponent},
    ]},
  {path: 'register-company', component:CompanyComponent},
  {path: 'home-developer', component:DevelopersComponent},
  {path: 'home-company', component:CompaniesComponent},
  {path: 'profile-developer', component:ProfileDeveloperComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
