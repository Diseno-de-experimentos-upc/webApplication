import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Developer } from '../model/developer';
import { User } from '../model/user';
import { DigitalProfile } from '../model/digitalprofile';
import { LoginService } from '../../services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxInvalidFormComponent } from '../dialog-box-invalid-form/dialog-box-invalid-form.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css'],
})
export class DeveloperComponent implements OnInit {

  mismatch: boolean = false;
  registered: boolean = false;
  TempDev: Developer;
  userDev: User;
  pass: string = '';
  registerForm!: FormGroup;
  users: Array<User> = [];
  digitalProfile: DigitalProfile;

  constructor(private service: LoginService, private formBuilder: FormBuilder, public dialog: MatDialog, private router: Router) {
    this.digitalProfile = {} as DigitalProfile;
    this.userDev = {} as User;
    this.TempDev = {} as Developer;
    this.registerForm = this.formBuilder.group({
      first_name: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
      last_name: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
      phone:new FormControl('', { validators:  [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]*$')], updateOn: 'change' }),
      email: new FormControl('', { validators:  [Validators.required, Validators.email, Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')], updateOn: 'change' }),
      password: new FormControl('', { validators:  [Validators.required, Validators.minLength(8), Validators.maxLength(16)], updateOn: 'change' }),
      password_confirm: new FormControl('', { validators: [Validators.required, Validators.minLength(8), Validators.maxLength(16)], updateOn: 'change' }),
    },
    {
      validators: this.MustMatch( 'password', 'password_confirm')
    },
    );
  }

  ngOnInit(): void {
    this.setEmailValidation();
    this.setPhoneValidation();
    this.setPaswordValidation();
    this.service.getAllUser().subscribe((response: any) => {
      this.users = response;
    });
    
  }

  AddDigitalProfile() {
    this.service.getUserByEmail(this.registerForm.get("email")?.value).subscribe((response: any) => {
      this.userDev = response;
      localStorage.setItem('id', this.userDev.id.toString());
      console.log('Get User by email');
      console.log(response);
      this.digitalProfile.name = "Digital Profile " + this.registerForm.get("first_name")?.value;
    
      this.service.postDigitalProfile(this.digitalProfile, this.userDev.id).subscribe((response:any) => {
        console.log('Post Digital Profile');
        console.log(response);
      });
    });
    
  }

  Add() {
    this.TempDev.firstName =  this.registerForm.get('first_name')?.value;
    this.TempDev.lastName =  this.registerForm.get('last_name')?.value;
    this.TempDev.phone =  this.registerForm.get('phone')?.value;
    this.TempDev.email =  this.registerForm.get('email')?.value;
    this.TempDev.password =  this.registerForm.get('password')?.value;
    this.TempDev.description =  'I am a developer';
    this.TempDev.role =  'developer';
    this.TempDev.image = 'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg';
    this.TempDev.bannerImage = 'https://thumbs.dreamstime.com/b/internet-information-technology-businessman-hand-showing-concept-75784736.jpg';

    this.service.postDeveloper(this.TempDev).subscribe((response:any) => {
      console.log('Post User Developer');
      this.users.push(response)
      console.log(response);
    });
  }
  
  openDialog() {
    if (this.registerForm.invalid) {
      if(this.registerForm.get('password')?.value !== this.registerForm.get('password_confirm')?.value) {
        this.dialog.open(DialogBoxInvalidFormComponent, { 
          data: {message: 'Please confirm the same password!'},
        });
      }
      else{
        this.dialog.open(DialogBoxInvalidFormComponent, { 
          data: {message: 'Please fill all the required fields!'},
        });
      }
    }
    else {
      this.verifyDeveloperUnregistered();
      if(!this.registered) {
        this.Add();
        this.registered = true;
        this.dialog.open(DialogBoxInvalidFormComponent, { 
          data: {message: 'You have registered successfully! Next page you can added some skills to your profile'},
          
        });
        this.dialog.afterAllClosed.subscribe(() => {
          this.AddDigitalProfile();
        });
        this.router.navigate(['/register/developer/languages']);
      }
      else {
        this.dialog.open(DialogBoxInvalidFormComponent, { 
          data: {message: 'This email is already registered!'},
        });
      }
      
    }
  }

  //Properties
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
    this.registerForm.get('password')?.valueChanges.subscribe(value => {
      if (value.length < 8 || value.length > 16) {
        this.registerForm.get('password')?.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(16)]);
      } else {
        this.registerForm.get('password')?.setValidators([Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,16}$')]);
      }
        this.registerForm.get('password')?.updateValueAndValidity();
    });
  }
  verifyDeveloperUnregistered() {
    this.users.forEach((user: any) => {
      if (user.email === this.registerForm.get('email')?.value) {
        this.registered = true;
        return;
      }
      else {
        this.registered = false;
      }
    });
    
  }
}