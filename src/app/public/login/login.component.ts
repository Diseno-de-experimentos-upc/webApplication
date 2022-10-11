import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loggedIn = false;
  loginForm: FormGroup = this.formBuilder.group({
    email : ["", {validators: [Validators.required], updateOn: 'change'}],
    password : ["", {validators: [Validators.required, Validators.minLength(8)], updateOn: 'change'}]
});
  constructor(private formBuilder: FormBuilder) { }

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
    emailControl?.setValidators([Validators.required, Validators.email]);
    this.loginForm.get('email')?.valueChanges.subscribe(value => {
      if (value === 'admin') {
        this.loginForm.get('email')?.setValidators([Validators.required, Validators.email]);
      } else {
        this.loginForm.get('email')?.setValidators([Validators.required]);
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
}
