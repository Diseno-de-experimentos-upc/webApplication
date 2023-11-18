import { set, toInteger, update } from 'lodash';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompaniesService } from 'src/app/companies/services/companies.service';
import { DevelopersService } from 'src/app/developers/services/developers.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})
export class SurveyComponent implements OnInit {
  developer: any;
  company: any;

  nuevoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private developerService: DevelopersService,
    private companiesService: CompaniesService,
    public dialogRef: MatDialogRef<SurveyComponent>,
    @Inject(MAT_DIALOG_DATA) public user: any
  ) {
    this.nuevoForm = this.formBuilder.group({
      rateForm: [
        '',
        {
          validators: [
            Validators.required
          ],
          updateOn: 'change',
        }
      ]
    });
  }

  ngOnInit(): void {

  }

  get rateForm() {
    return this.nuevoForm.get('rateForm');
  }

  submit() {
    if (this.user.user == 'developer') {
      const id = toInteger(localStorage.getItem('id'));
      this.getDeveloperById(id)

      //esperar 3 segundos para que se actualice el rate
      setTimeout(() => {
        this.developerService.updateDev(this.developer).subscribe((response: any) => {
          console.log(response);
        });
      }, 3000);

    }
    else {
      const id = toInteger(localStorage.getItem('id'));
      this.getCompanyById(id);

      //esperar 3 segundos para que se actualice el rate
      setTimeout(() => {
        this.companiesService.updateRec(id, this.company).subscribe((response: any) => {
          console.log(response);
        });
      }, 3000);

    }
    this.dialogRef.close();
  }

  async getCompanyById(id: number) {
    await this.companiesService.GetRecById(id)
      .subscribe((response: any) => {
        this.company = response;
        this.company.rate = this.nuevoForm.value.rateForm;//this.rate;
      });
  }

  async getDeveloperById(id: number) {

    await this.developerService.GetDeveloperById(id)
      .subscribe((response: any) => {
        this.developer = response;
        this.developer.rate = this.nuevoForm.value.rateForm;//this.rate;
      });
  }
}
