
import { Component, AfterViewInit, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { toInteger } from 'lodash';
import { LoginService } from 'src/app/public/services/login.service';
import { DialogBoxInvalidFormComponent } from '../dialog-box-invalid-form/dialog-box-invalid-form.component';
import { Database } from '../model/database';
import { Framework } from '../model/framework';
import { Language } from '../model/language';

@Component({
  selector: 'app-register-profile',
  templateUrl: './register-profile.component.html',
  styleUrls: ['./register-profile.component.css']
})
export class RegisterProfileComponent implements OnInit,AfterViewInit {

  registerForm!: FormGroup;
  userDev: any;
  language: Language;
  database: Database;
  frameWork: Framework;
  digitalProfile: any;
  languagesList: Array<string> = [
    'JavaScript',
    'Python',
    'Java',
    'C#',
    'C++',
    'TypeScript',
    'Shell',
    'C',
    'Ruby',
  ];
  databasesList: Array<string> = [
    'MySQL',
    'Oracle',
    'PostgreSQL',
    'Microsoft SQL Server',
    'MongoDB',
  ];
  frameworksList: Array<string> = [
    'Angular',
    'ASP.NET Core',
    'Django',
    'React',
    'Vue.js',
  ];

  constructor(private service: LoginService, private formBuilder: FormBuilder, public dialog: MatDialog, private router: Router) {
    this.digitalProfile = {} as any;
    this.language = {} as  Language;
    this.database = {} as Database;
    this.frameWork = {} as Framework;
    this.userDev = {} as any;
    
    this.registerForm = this.formBuilder.group({
      languages: [''],
      databases: [''],
      frameworks: [''],
    });
  }

  ngOnInit(): void {
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }    
  }

  ngAfterViewInit(): void {
    const id = toInteger(localStorage.getItem("id_register")??"");
    this.service.getDigitalProfileByDeveloperId(id).subscribe((response:any) => {
      this.digitalProfile = response;  
      console.log("Digital Profile Into Languages: " + JSON.stringify(this.digitalProfile));
    });
    this.service.getUserById(id).subscribe((response:any) => {
      this.userDev = response;
      console.log("Developer: " + JSON.stringify(this.userDev));
    });
  }

  

  getLanguages(){
    return this.registerForm.get('languages')?.value;
  }
  getDatabases(){
    return this.registerForm.get('databases')?.value;
  }

  getFrameworks(){
    return this.registerForm.get('frameworks')?.value;
  }

  async GetDigitalProfile(){
    const data = await this.service.getDigitalProfileByDeveloperId(this.userDev.id).toPromise();
    this.digitalProfile = data;
    console.log("Digital Profile: " + JSON.stringify(data));
  }


  AddProgrammingLanguages(){
    for (let i = 0; i < this.registerForm.get('languages')?.value.length; i++) {
      this.language.name = this.registerForm.get('languages')?.value.at(i);
      this.language.description = "I am expert with programming language " + this.registerForm.get('languages')?.value.at(i);
      if(this.language.name === 'JavaScript'){
        this.language.iconLink = "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg";
      }
      else if(this.language.name === 'Python'){
        this.language.iconLink = "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg";
      }
      else if (this.language.name === 'Java'){
        this.language.iconLink = "https://upload.wikimedia.org/wikipedia/commons/3/30/Java_programming_language_logo.svg";
      }
      else if (this.language.name === "C#"){
        this.language.iconLink = "https://upload.wikimedia.org/wikipedia/commons/0/0d/C_Sharp_wordmark.svg";
      }
      else if (this.language.name === 'C++'){
        this.language.iconLink = "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg";
      }
      else if (this.language.name === 'TypeScript'){
        this.language.iconLink = "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg";
      }
      else if (this.language.name === 'Shell'){
        this.language.iconLink = "https://upload.wikimedia.org/wikipedia/commons/4/4b/Bash_Logo_Colored.svg";
      }
      else if (this.language.name === 'C'){
        this.language.iconLink = "https://upload.wikimedia.org/wikipedia/commons/3/35/The_C_Programming_Language_logo.svg";
      }
      else {
        this.language.iconLink = "https://e7.pngegg.com/pngimages/383/488/png-clipart-ruby-on-rails-programming-language-computer-programming-logo-ruby-ruby-scripting-language-thumbnail.png";
      }
      this.service.postLenguage(this.language, this.digitalProfile.id).subscribe((response2:any) => {
        console.log(response2);
      });
    }
  }

  AddDatabases(){
    for (let i = 0; i < this.registerForm.get('databases')?.value.length; i++){
      this.database.name = this.registerForm.get('databases')?.value[i];
      this.database.description = "I am expert with database" + this.registerForm.get('databases')?.value[i];
      if(this.database.name === 'MySQL'){
        this.database.iconLink = "https://pngimg.com/uploads/mysql/mysql_PNG22.png";
      }
      else if(this.database.name === 'Oracle'){
        this.database.iconLink = "https://www.iconshock.com/image/Stroke/Database/oracle/";
      }
      else if (this.database.name === 'PostgreSQL'){
        this.database.iconLink = "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg";
      }
      else if (this.database.name === 'Microsoft SQL Server'){
        this.database.iconLink = "https://i.pinimg.com/originals/ae/09/c5/ae09c54080a6ae50d58459ea3193835c.png";
      }
      else {
        this.database.iconLink = "https://logodix.com/logo/2090013.jpg";
      }
      this.service.postDatabase(this.database, this.digitalProfile.id).subscribe((response:any) => {
        console.log(response);
      });    
    }
  }

  AddFrameworks(){
    for(let i= 0; i < this.registerForm.get('frameworks')?.value.length; i++){
      this.frameWork.name = this.registerForm.get('frameworks')?.value[i];
      this.frameWork.description = "I am expert with framework " + this.registerForm.get('frameworks')?.value[i];
      if(this.frameWork.name === 'Angular'){
        this.frameWork.iconLink = "https://upload.wikimedia.org/wikipedia/commons/c/ca/AngularJS_logo.svg";
      }
      else if(this.frameWork.name === 'ASP.NET Core'){
        this.frameWork.iconLink = "https://ih0.redbubble.net/image.366684650.5673/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg";
      }
      else if (this.frameWork.name === 'Django'){
        this.frameWork.iconLink = "https://th.bing.com/th/id/OIP.XltbHSe7XNacUtF12tymrgHaCl?pid=ImgDet&rs=1";
      }
      else if(this.frameWork.name === 'React'){
        this.frameWork.iconLink = "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg";
      }
      else if (this.frameWork.name === 'Vue.js'){
        this.frameWork.iconLink = "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg";
      }
      this.service.postFramework(this.frameWork, this.digitalProfile.id).subscribe((response:any) => {
        console.log(response);
      });
    }

    
  }
  
  openDialog() {
    this.GetDigitalProfile();
    if (this.registerForm.get('languages')?.value.length !== 0 && this.registerForm.get('databases')?.value.length !== 0 && 
        this.registerForm.get('frameworks')?.value.length !== 0){
      if(this.registerForm.get('languages')?.value.length > 0)
        this.AddProgrammingLanguages();
      
      if(this.registerForm.get('databases')?.value.length > 0)
        this.AddDatabases();
      
      if(this.registerForm.get('frameworks')?.value.length > 0)
        this.AddFrameworks();
      
      this.dialog.open(DialogBoxInvalidFormComponent, { 
        data: {message: 'You added data to your profile, You will be redirect to login!'},
      });
      localStorage.clear();
      this.router.navigate(['/login']);
    }
    else {
      this.dialog.open(DialogBoxInvalidFormComponent, { 
        data: {message: 'You did not select any language to your profile, You will be redirect to login!'},
      });
      localStorage.clear();
      this.router.navigate(['/login']);
      
    }
  }

  //Properties
  get languages() {
    return this.registerForm.get('languages');
  }

  get databases() {
    return this.registerForm.get('databases');
  }

  get frameworks() {
    return this.registerForm.get('frameworks');
  }

  back(): void {
    this.dialog.open(DialogBoxInvalidFormComponent, { 
      data: {message: 'You did not select any language to your profile, You will be redirect to login!'},
    });
    localStorage.clear();
    this.router.navigate(['/login']); 
  }
}
