import { toInteger } from 'lodash';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompaniesService } from 'src/app/companies/services/companies.service';
import { DevelopersService } from 'src/app/developers/services/developers.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})
export class SurveyComponent implements OnInit {
  rate = 0;

  constructor(
    private developerService: DevelopersService,
    private companiesService: CompaniesService,
    public dialogRef: MatDialogRef<SurveyComponent>,
    @Inject(MAT_DIALOG_DATA) public user: any
  ) {}

  ngOnInit(): void {}

  submit() {
    if (this.user == 'developer') {
      const id = toInteger(localStorage.getItem('id'));
      let developer: any;
      this.developerService.GetDeveloperById(id).subscribe((response: any) => {
        developer = response;
      });
      developer.rate = this.rate;
      this.developerService.updateDev(developer);
    } else {
      const id = toInteger(localStorage.getItem('id'));
      let company: any;
      this.companiesService.GetRecById(id).subscribe((response: any) => {
        company = response;
      });
      company.rate = this.rate;
      this.companiesService.updateRec(id, company);
    }
    this.dialogRef.close();
  }
}
