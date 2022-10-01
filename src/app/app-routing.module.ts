import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DevelopersComponent} from "./developers/developers.component";

const routes: Routes = [

  {path: 'home-developer', component:DevelopersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
