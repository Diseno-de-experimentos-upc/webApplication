import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxInvalidFormComponent } from '../register/dialog-box-invalid-form/dialog-box-invalid-form.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loggedIn = false;
  loginForm: FormGroup = this.formBuilder.group({
    email : ["", {validators: [Validators.required, Validators.email], updateOn: 'change'}],
    password : ["", {validators: [Validators.required, Validators.minLength(8)], updateOn: 'change'}]
});
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.setEmailValidation();
  }

  //Properties
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  //Dyanmic validation setup
  setEmailValidation() {
    const emailControl = this.loginForm.get('email');
    //Default validation
    emailControl?.setValidators([Validators.required, Validators.email, Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')]);
    this.loginForm.get('email')?.valueChanges.subscribe(value => {
      if (value === 'admin@digitalmind.com') {
        this.loginForm.get('email')?.setValidators([Validators.required]);
      } else {
        this.loginForm.get('email')?.setValidators([Validators.required, Validators.email, Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')]);
      }
      this.loginForm.get('email')?.updateValueAndValidity();
    });
  }

  submitForm() {
    console.log(this.loginForm.valid);
    this.loggedIn = true;
  }

  back(): void {
    window.location.href = 'https://digitalmind-upc-pre-202202-si729-sw52.github.io';
  }

  openDialog() {
    if (this.loginForm.invalid) {
      this.dialog.open(DialogBoxInvalidFormComponent, { 
        data: 'registerForm',
      });
    }
    else {
      window.location.href = 'home-developer';
    }
  }
}
