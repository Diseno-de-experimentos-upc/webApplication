import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './public/register/register.component';
import { LoginComponent } from './public/login/login.component';
import { PageNotFoundComponent } from './public/page-not-found/page-not-found.component';
/* Developers components */
import { DeveloperComponent } from './public/register/developer/developer.component';
import { DevelopersComponent } from './developers/developers.component';
import { MessagesComponent } from './developers/pages/messages-developer/messages.component';
import { HomeComponent } from './developers/pages/home-developer/home.component';
import { ProfileDeveloperComponent } from './developers/pages/profile-developer/profile-developer.component';
import { SettingsDeveloperComponent } from './developers/pages/settings/settings.component';
import { NotificationsDeveloperComponent} from "./developers/pages/notifications-developer/notifications-developer.component";
/* Companies components */
import { CompanyComponent } from './public/register/company/company.component';
import { CompaniesComponent } from './companies/companies.component';
import { ProfileCompanyComponent } from './companies/pages/profile-company/profile-company.component';
import { FindYourDevComponent } from './companies/pages/find-your-dev/find-your-dev.component';
import { HomeCompanyComponent  } from './companies/pages/home-company/home-company.component';
import { MessagesCompanyComponent } from './companies/pages/messages-company/messages-company.component';
import { SettingsCompanyComponent } from './companies/pages/settings/settings.component';
import { NotificationsCompanyComponent } from './companies/pages/notifications-company/notifications-company.component';
const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'login', component:LoginComponent},
  {path: 'register', component: RegisterComponent, children: [
      {path: 'developer', component: DeveloperComponent},
      {path: 'company', component: CompanyComponent},
    ]
  },
  {
    path: 'developers',
    component: DevelopersComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'profile', component: ProfileDeveloperComponent },
      { path: 'settings', component: SettingsDeveloperComponent},
      {path: 'notifications', component: NotificationsDeveloperComponent},
    ],
  },
  {
    path: 'companies',
    component: CompaniesComponent,
    children: [
      { path: 'home', component: HomeCompanyComponent },
      { path: 'messages', component: MessagesCompanyComponent },
      { path: 'profile', component: ProfileCompanyComponent },
      { path: 'find', component: FindYourDevComponent },
      { path: 'settings', component:SettingsCompanyComponent},
      { path: 'notifications', component: NotificationsCompanyComponent},
      { path: 'find-devs', component: FindYourDevComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
