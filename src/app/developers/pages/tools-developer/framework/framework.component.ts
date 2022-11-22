import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { toInteger } from 'lodash';
import { DigitalProfile } from 'src/app/developers/model/digitalProfile';
import { Framework } from 'src/app/developers/model/framework';
import { ToolsService } from 'src/app/developers/services/tools.service';
import { DialogBoxInvalidFormComponent } from 'src/app/public/register/dialog-box-invalid-form/dialog-box-invalid-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.css']
})
export class FrameworkComponent implements OnInit {

  TempFramework : Framework;
  registerFormFramework!: FormGroup;
  formIsValid: boolean = false;
  digitalProfile!: DigitalProfile;
  
  constructor(private formBuilder: FormBuilder,  public dialog: MatDialog, private service: ToolsService) { 
    this.TempFramework = {} as Framework;
    this.registerFormFramework = this.formBuilder.group({
      name: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
      description: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
      iconLink: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
    });
  }

  ngOnInit(): void {
  }

  get name() {
    return this.registerFormFramework.get('name');
  }

  get description(){
    return this.registerFormFramework.get('description');
  }

  get iconLink(){
    return this.registerFormFramework.get('iconLink');
  }
  addFramework(){
    this.TempFramework = this.registerFormFramework.value;
    this.TempFramework.id = 0;
    
    this.TempFramework.digitalProfile_id = toInteger(localStorage.getItem("digitalProfileId"));
 

    if(this.registerFormFramework.valid){ 

      //call the service to add the project
      this.service.createFramework(this.TempFramework, this.TempFramework.digitalProfile_id).subscribe((data) => {
        console.log(data);
      }
      );
      this.dialog.open(DialogBoxInvalidFormComponent, {
        data: {message: "Framework added successfully!"}
      });
      this.registerFormFramework.reset();
    }
    else{
      this.dialog.open(DialogBoxInvalidFormComponent, {
        data: {message: "Please, fill all the fields"}
      });
    }

  }


}
