import {Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { delay } from "rxjs";
import { MatSidenav } from "@angular/material/sidenav";
import { BreakpointObserver } from "@angular/cdk/layout";
import { DevelopersService } from '../../../developers/services/developers.service';
import { MatDialog } from '@angular/material/dialog';

import { DialogBoxInvalidFormComponent } from '../../../public/register/dialog-box-invalid-form/dialog-box-invalid-form.component';

@Component({
  selector: 'app-find-your-dev',
  templateUrl: './find-your-dev.component.html',
  styleUrls: ['./find-your-dev.component.css']
})
export class FindYourDevComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isCheckedDatabase: boolean;
  isCheckedFramework: boolean;
  disableFramework = false;
  devs:Array<any> = [];
  filterForm: FormGroup = this.formBuilder.group({
    years_of_experience: ["", Validators.required],
    specialty_type: ["", Validators.required],
    level_of_study: ["", Validators.required],
    programming_languages: ["", Validators.required],
    frameworks: [""],
    databases: [""],
    check_framework: [""],
    check_database: [""],
  });
  yearsOfExperience: Array<number> = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  specialtyType: Array<string> = [
    "Frontend", "Backend", "Fullstack", "Mobile",
    "DevOps", "QA", "UX/UI", "Data Science",
    "Machine Learning", "Security", "Other"];

  levelOfStudy: Array<string> = [
    "High School", "Bachelor", "Master", "PhD"];

  programmingLanguages : Array<string> = [
    'JavaScript', 'Python', 'Java', 'C#',
    'C++', 'TypeScript', 'Shell',
    'C', 'Ruby',
  ];
  frameworkList: Array<string> = [
    'Angular', 'ASP.NET Core', 'Django',
    'React', 'Vue',
  ];
  databaseList: Array<string> = [
    'MySQL', 'Oracle', 'PostgreSQL',
    'Microsoft SQL Server', 'MongoDB',
  ];

  constructor(
    private observer: BreakpointObserver,
    private formBuilder: FormBuilder,
    private service: DevelopersService,
    public dialog: MatDialog,

  ) {
    this.isCheckedDatabase = false;
    this.isCheckedFramework = false;
  }
  changeValueDatabase() {
    this.isCheckedDatabase = !this.isCheckedDatabase;
  }
  changeValueFramework() {
    this.isCheckedFramework = !this.isCheckedFramework;
  }
  getDevs(): void {
    this.service.GetAllDevs().subscribe((data:any) => {
      this.devs = data;
      console.log(data);
    });
  }

  openDialog() {
    if (this.filterForm.invalid) {
      this.dialog.open(DialogBoxInvalidFormComponent, {
        data: 'registerForm',
      });
    }
    else {
      this.getDevs();
    }
  }

  ngOnInit(): void {
    this.ngAfterViewInit();
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      })
  }

}
