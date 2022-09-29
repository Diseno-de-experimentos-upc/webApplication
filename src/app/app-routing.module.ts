import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';
import {CompanyComponent} from "./public/register/company/company.component";

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'register-company', component:CompanyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
