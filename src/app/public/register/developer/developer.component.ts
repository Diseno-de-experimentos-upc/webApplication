import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Developer } from 'src/app/developers/model/developer';
import { DevelopersService } from 'src/app/developers/services/developers.service';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})
export class DeveloperComponent implements OnInit {

  devs:Array<any> = [];
  TempDev:Developer;
  pass:string = "";

  languages = new FormControl("");
  languagesList:Array<string> = ["JavaScript","Python","Java","C#","C++","TypeScript","Shell","C","Ruby"];

  databases = new FormControl("");
  databasesList:Array<string> = ["MySQL", "Oracle", "PostgreSQL", "Microsoft SQL Server", "MongoDB"];

  frameworks = new FormControl("");
  frameworksList:Array<string> = ["Angular", "ASP.NET Core", "Django", "React", "Vue.js"];

  constructor(private service:DevelopersService) { 
    this.TempDev = {} as Developer;
  }

  ngOnInit(): void {
  }

  Add(){
    this.TempDev.id = 0;
    this.service.AddDev(this.TempDev).subscribe((response:any) => {
      this.devs.push({...response});
      console.log(this.devs);
    });
  }
}
