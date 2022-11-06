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

  loggedIn = false;
  registered = false;
  logger: string = 'developer';
  loginForm: FormGroup = this.formBuilder.group({
    email : ["", {validators: [Validators.required, Validators.email], updateOn: 'change'}],
    password : ["", {validators: [Validators.required, Validators.minLength(8)], updateOn: 'change'}],
  });



  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private router: Router, private service: LoginService) { }

  ngOnInit(): void {
    this.setEmailValidation();
    this.setPaswordValidation();
    this.service.getDeveloperAll('developer').subscribe((response: any) => {
      this.usersDeveloper = response;
      console.log(this.usersDeveloper);
    });
    this.service.getCompanyAll('company').subscribe((response: any) => {
      this.usersCompany = response;
      console.log(this.usersCompany);
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

  openDialog(): void {
    this.registered = false;
    if (this.loginForm.invalid) {
      if(this.loginForm.get('email')?.value === '' && this.loginForm.get('password')?.value === '') {
        this.dialog.open(DialogBoxInvalidFormComponent, {
          data: { message: 'Please fill all the required fields'},
        });
      }
      else if(this.loginForm.get('email')?.value === '' && this.loginForm.get('password')?.value !== '') {
        this.dialog.open(DialogBoxInvalidFormComponent, {
          data: { message: 'Please fill the email field'},
        });
      }
      else {
        this.dialog.open(DialogBoxInvalidFormComponent, {
          data: { message: 'Please fill the password field'},
        });
      }
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
    localStorage.setItem("id", id);
    this.router.navigate(['/developers/home']);
  }
  goUserCompany(id : any) {
    localStorage.setItem("id", id);
    this.router.navigate(['/companies/home']);
  }
  verifyAccount() {
    let email = this.loginForm.get('email')?.value;
    let password = this.loginForm.get('password')?.value;

    if (email!== null && password!== null) {
      if (this.logger === 'developer') {
        for (let i = 0; i < this.usersDeveloper.length; i++) {
          if (this.usersDeveloper[i].email === email && this.usersDeveloper[i].password === password) {
            this.goUserDeveloper(this.usersDeveloper[i].id);
            this.registered = true;
            break;
          }
        }
      }
      else{
        for (let i = 0; i < this.usersCompany.length; i++) {
          if (this.usersCompany[i].email === email && this.usersCompany[i].password === password) {
            this.goUserCompany(this.usersCompany[i].id);
            this.registered = true;
            break;
          }
        }

      }
    }
    if(!this.registered) {
      this.dialog.open(DialogBoxInvalidFormComponent, {
        data: { message: 'Email or password incorrect'},
      });
    }
  }
}
