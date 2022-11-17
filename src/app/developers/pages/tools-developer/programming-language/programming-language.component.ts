import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { toInteger } from 'lodash';
import { DigitalProfile } from 'src/app/developers/model/digitalProfile';
import { ProgrammingLanguage } from 'src/app/developers/model/programmingLanguage';
import { ToolsService } from 'src/app/developers/services/tools.service';

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
  
  constructor(private formBuilder: FormBuilder, private service: ToolsService) { 
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

   //const userId = toInteger(localStorage.getItem("id"));
  //TODO: connectar por ID ABAJOW

    // get digittal profile by user id
    this.service.GetDigitalProfileByDevId(2).subscribe((data: any) => {
      this.digitalProfile = data;
      localStorage.setItem("digitalProfileId", this.digitalProfile.id.toString());
    });
    
    this.TempProgrammingLanguage.digitalProfile_id = toInteger(localStorage.getItem("digitalProfileId"));

    if(this.registerFormProgrammingLanguage.valid){ 

      //call the service to add the project
      this.service.createProgrammingLanguage(this.TempProgrammingLanguage, this.TempProgrammingLanguage.digitalProfile_id).subscribe((data) => {
        console.log(data);
      }
      );
    }
    else{
      alert("Please, fill all the fields");
    }

  }


}
