import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxInvalidFormComponent } from '../register/dialog-box-invalid-form/dialog-box-invalid-form.component';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usersDeveloper: Array<any> = [];
  usersCompany: Array<any> = [];
  users: Array<any> = [];
  loggedIn = false;
  loginForm: FormGroup = this.formBuilder.group({
    email : ["", {validators: [Validators.required, Validators.email], updateOn: 'change'}],
    password : ["", {validators: [Validators.required, Validators.minLength(8)], updateOn: 'change'}],
  });

  

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private router: Router, private service: LoginService) { }

  ngOnInit(): void {
    this.setEmailValidation();
    this.setPaswordValidation();
    this.service.getDeveloperAll().subscribe((response: any) => {
      this.usersDeveloper = response;
      console.log(this.usersDeveloper);
    });
    this.service.getCompanyAll().subscribe((response: any) => {
      this.usersCompany = response;
      console.log(this.usersCompany);
    });
    this.service.getUserAll().subscribe((response: any) => {
      this.users = response;
      console.log(this.users);
    });
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
      this.verifyAccount();
    }
  }

  setPaswordValidation() {
    this.loginForm.get('password')?.valueChanges.subscribe(value => {
      if (value.length < 8 || value.length > 16) {
        this.loginForm.get('password')?.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(16)]);
      } else {
        this.loginForm.get('password')?.setValidators([Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,16}$')]);
      }
        this.loginForm.get('password')?.updateValueAndValidity();
    });
  }
  goUserDeveloper(id : any) {
    this.router.navigate(['/home-developer/' + id]);
  }
  goUserCompany(id : any) {
    this.router.navigate(['/home-company/' + id]);
  }
  verifyAccount() {
    let email = this.loginForm.get('email')?.value;
    let password = this.loginForm.get('password')?.value;
    let user = this.users.find(user => user.email == email && user.password == password);
    if (user != null) {
      if (user.role == 'developer') {
        this.goUserDeveloper(user.id);
      }
      else{
        this.goUserCompany(user.id);
      }
    }
    else {
      alert('Invalid credentials');
    }
  }
}
