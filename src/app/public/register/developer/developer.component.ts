import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Developer } from 'src/app/developers/model/developer';
import { DevelopersService } from 'src/app/developers/services/developers.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})
export class DeveloperComponent implements OnInit {

  devs:Array<any> = [];
  TempDev:Developer;
  pass:string = "";

  registerForm: FormGroup =this.formBuilder.group({
    first_name: ["",Validators.required],
    last_name: ["",Validators.required],
    phone: ["",Validators.required],
    email: ["",Validators.required],
    password: ["",Validators.required],
    languages: [""],
    databases: [""],
    frameworks: [""]
  });


  languagesList:Array<string> = ["JavaScript","Python","Java","C#","C++","TypeScript","Shell","C","Ruby"];
  databasesList:Array<string> = ["MySQL", "Oracle", "PostgreSQL", "Microsoft SQL Server", "MongoDB"];
  frameworksList:Array<string> = ["Angular", "ASP.NET Core", "Django", "React", "Vue.js"];

  constructor(private service:DevelopersService, private formBuilder: FormBuilder, public dialog: MatDialog) {
    this.TempDev = {} as Developer;
  }

  ngOnInit(): void {
  }

  Add(){
    this.TempDev = this.registerForm.value;
    this.TempDev.id = 0;
    this.service.AddDev(this.TempDev).subscribe((response:any) => {
      this.devs.push({...response});
      console.log(this.devs);
    });
  }

  openDialog() {
    this.dialog.open(DialogBoxComponent, {
      width: '550px',
      height: '150px',
      data: "right click"
    });
  }


}
