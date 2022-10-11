import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';
import { CompanyComponent } from "./public/register/company/company.component";
import { DeveloperComponent } from './public/register/developer/developer.component';
import { DevelopersComponent } from "./developers/developers.component";
import { CompaniesComponent } from './companies/companies.component';
import { PageNotFoundComponent } from './public/page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path: 'register', component: RegisterComponent, children: [
      {path: 'developer', component: DeveloperComponent},
      {path: 'company', component: CompanyComponent},
    ]},
  {path: 'register-company', component:CompanyComponent},
  {path: 'home-developer', component:DevelopersComponent},
  {path: 'home-company', component:CompaniesComponent},
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
