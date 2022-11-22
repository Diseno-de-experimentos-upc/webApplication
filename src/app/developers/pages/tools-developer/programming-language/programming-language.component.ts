import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { toInteger } from 'lodash';
import { DigitalProfile } from 'src/app/developers/model/digitalProfile';
import { ProgrammingLanguage } from 'src/app/developers/model/programmingLanguage';
import { ToolsService } from 'src/app/developers/services/tools.service';
import { DialogBoxInvalidFormComponent } from 'src/app/public/register/dialog-box-invalid-form/dialog-box-invalid-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-programming-language',
  templateUrl: './programming-language.component.html',
  styleUrls: ['./programming-language.component.css']
})
export class ProgrammingLanguageComponent implements OnInit {

  TempProgrammingLanguage : ProgrammingLanguage;
  registerFormProgrammingLanguage!: FormGroup;
  formIsValid: boolean = false;
  digitalProfile!: DigitalProfile;
  
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private service: ToolsService) { 
    this.TempProgrammingLanguage = {} as ProgrammingLanguage;
    this.registerFormProgrammingLanguage = this.formBuilder.group({
      name: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
      description: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
      iconLink: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
    });
  }

  ngOnInit(): void {
  }

  get name() {
    return this.registerFormProgrammingLanguage.get('name');
  }

  get description(){
    return this.registerFormProgrammingLanguage.get('description');
  }

  get iconLink(){
    return this.registerFormProgrammingLanguage.get('iconLink');
  }
  addProgrammingLanguage(){
    this.TempProgrammingLanguage = this.registerFormProgrammingLanguage.value;
    this.TempProgrammingLanguage.id = 0;

    
    this.TempProgrammingLanguage.digitalProfile_id = toInteger(localStorage.getItem("digitalProfileId"));

    if(this.registerFormProgrammingLanguage.valid){ 

      //call the service to add the project
      this.service.createProgrammingLanguage(this.TempProgrammingLanguage, this.TempProgrammingLanguage.digitalProfile_id).subscribe((data) => {
        console.log(data);
      }
      );
      this.dialog.open(DialogBoxInvalidFormComponent, {
        data: {message: "Programming Language added successfully"}
      });
      this.registerFormProgrammingLanguage.reset();
    }
    else{
      this.dialog.open(DialogBoxInvalidFormComponent, {
        data: {message: "Please, fill all the fields"}
      });
    }

  }


}
