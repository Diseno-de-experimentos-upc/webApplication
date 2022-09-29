import { Component, OnInit } from '@angular/core';
import {Company} from "../../../companies/model/company";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CompaniesService} from "../../../companies/services/companies.service";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  comps:Array<any> = [];
  TempComp:Company;
  pass:string = "";

    registerForm: FormGroup =this.formBuilder.group({
    recruiter_first_name: ["",Validators.required],
    recruiter_last_name: ["",Validators.required],
    recruiter_phone: ["",Validators.required],
    recruiter_email: ["",Validators.required],
    recruiter_password: ["",Validators.required],
    company_name: ["", Validators.required],
    ruc: ["", Validators.required],
    owner_name: ["", Validators.required],
    address: ["", Validators.required],
    locality: ["", Validators.required],
    city: ["", Validators.required]
  });

  constructor(private service:CompaniesService, private formBuilder: FormBuilder) {
    this.TempComp = {} as Company;
  }

  ngOnInit(): void {
  }

  Add(){
    this.TempComp = this.registerForm.value;
    this.TempComp.id = 0;
    this.service.AddRec(this.TempComp).subscribe((response:any) => {
      this.comps.push({...response});
      console.log(this.comps);
    });
  }
}
