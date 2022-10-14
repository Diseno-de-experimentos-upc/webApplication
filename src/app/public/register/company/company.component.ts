import { Component, OnInit } from '@angular/core';
import {Company} from "../../../companies/model/company";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CompaniesService} from "../../../companies/services/companies.service";
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxInvalidFormComponent } from '../dialog-box-invalid-form/dialog-box-invalid-form.component';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {


  comps:Array<any> = [];
  TempComp:Company;
  pass:string = "";

  registerForm!: FormGroup;

  constructor(private service:CompaniesService, private formBuilder: FormBuilder, public dialog: MatDialog) {
    this.TempComp = {} as Company;
    this.registerForm = this.formBuilder.group({
      first_name: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
      last_name: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
      phone:new FormControl('', { validators:  [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]*$')], updateOn: 'change' }),
      email: new FormControl('', { validators:  [Validators.required, Validators.email], updateOn: 'change' }),
      password: new FormControl('', { validators:  [Validators.required, Validators.minLength(8), Validators.maxLength(16)], updateOn: 'change' }),
      password_confirm: new FormControl('', { validators: [Validators.required, Validators.minLength(8), Validators.maxLength(16)], updateOn: 'change' }),
      company_name: ["", Validators.required],
      ruc: ["", Validators.required],
      owner_name: ["", Validators.required],
      address: ["", Validators.required],
      country: ["", Validators.required],
      city: ["", Validators.required]
    },
    {
      validators: this.MustMatch( 'password', 'password_confirm')
    },
    );
  }

  ngOnInit(): void {
    this.setEmailValidation();
    this. setPhoneValidation();
    this.setPaswordValidation();
  }

  Add(){
    this.TempComp = this.registerForm.value;
    this.TempComp.id = 0;
    this.service.AddRec(this.TempComp).subscribe((response:any) => {
      this.comps.push({...response});
      console.log(this.comps);
    });
  }

  openDialog() {
    if (this.registerForm.invalid) {
      this.dialog.open(DialogBoxInvalidFormComponent, { 
        data: 'registerForm',
      });
    }
    else {
      this.dialog.open(DialogBoxComponent, {
        data: 'registerForm',
      });
      this.Add();
    }
  }

  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get first_name() {
    return this.registerForm.get('first_name');
  }

  get password_confirm() {
    return this.registerForm.get('password_confirm');
  }
  
  get last_name() {
    return this.registerForm.get('last_name');
  }

  setEmailValidation() {
    const emailControl = this.registerForm.get('email');
      //Default validation
    emailControl?.setValidators([Validators.required, Validators.email, Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')]);
    this.registerForm.get('email')?.valueChanges.subscribe(value => {
      if (value === 'admin@digitalmind.com') {
        this.registerForm.get('email')?.setValidators([Validators.required]);
      } else {
        this.registerForm.get('email')?.setValidators([Validators.required, Validators.email, Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')]);
      }
        this.registerForm.get('email')?.updateValueAndValidity();
    });
  }

  setPhoneValidation() {
    const phoneControl = this.registerForm.get('phone');
    phoneControl?.setValidators([Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(9), Validators.maxLength(9)]);
    this.registerForm.get('phone')?.valueChanges.subscribe(value => {
      if (value.length < 9 || value.length > 9) {
        this.registerForm.get('phone')?.setValidators([Validators.required, Validators.minLength(9), Validators.maxLength(9)]);
      } else {
        this.registerForm.get('phone')?.setValidators([Validators.required, Validators.pattern('^[0-9]*$')]);
      }
        this.registerForm.get('phone')?.updateValueAndValidity();
    });
  }



  MustMatch( password: any, password_confirm: any) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const passwordConfirmControl = formGroup.controls[password_confirm];

      if (passwordConfirmControl.errors && !passwordConfirmControl.errors['mustMatch']) {
        return;
      }
      if (passwordControl.value !== passwordConfirmControl.value) {
        passwordConfirmControl.setErrors({ MustMatch: true });
      } else {
        passwordConfirmControl.setErrors(null);
      }
    };
  }
  
  setPaswordValidation() {
    const passwordControl = this.registerForm.get('password');

    this.registerForm.get('password')?.valueChanges.subscribe(value => {
      if (value.length < 8 || value.length > 16) {
        this.registerForm.get('password')?.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(16)]);
      } else {
        this.registerForm.get('password')?.setValidators([Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,16}$')]);
      }
        this.registerForm.get('password')?.updateValueAndValidity();
    });
  }
  
}
