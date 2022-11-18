import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { toInteger } from 'lodash';
import { DigitalProfile } from 'src/app/developers/model/digitalProfile';
import { Education } from 'src/app/developers/model/education';
import { StudyCenter } from 'src/app/developers/model/studyCenter';
import { ToolsService } from 'src/app/developers/services/tools.service';

@Component({
  selector: 'app-study-center',
  templateUrl: './study-center.component.html',
  styleUrls: ['./study-center.component.css']
})
export class StudyCenterComponent implements OnInit {

  TempStudyCenter : StudyCenter;
  registerFormStudyCenter!: FormGroup;
  formIsValid: boolean = false;
  digitalProfile!: DigitalProfile;
  education!: Education;
  entryDateS: string = "";
  graduationDateS: string = "";
  
  constructor(private formBuilder: FormBuilder, private service: ToolsService) { 
    this.TempStudyCenter = {} as StudyCenter;
    this.registerFormStudyCenter = this.formBuilder.group({
      name: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
      description: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
      iconUrl: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
      progress: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
      entryDate: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
      graduationDate: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
    });
  }

  ngOnInit(): void {
  }

  get name() {
    return this.registerFormStudyCenter.get('name');
  }

  get description(){
    return this.registerFormStudyCenter.get('description');
  }

  get iconUrl(){
    return this.registerFormStudyCenter.get('iconUrl');
  }

  get progress(){
    return this.registerFormStudyCenter.get('progress');
  }

  get obtainedDate(){
    return this.registerFormStudyCenter.get('obtainedDate');
  }

  get graduationDate(){
    return this.registerFormStudyCenter.get('graduationDate');
  }

  get entryDate(){
    return this.registerFormStudyCenter.get('entryDate');
  }


  dateChanged($event: any){
    //convert date to string
    console.log($event.target.value);

    //convert angular date to YYYY-MM-DD and if dont have two digits in month or day, add 0
    this.entryDateS = $event.target.value.getFullYear() + "-" + ("0" + ($event.target.value.getMonth() + 1)).slice(-2) + "-" + ("0" + $event.target.value.getDate()).slice(-2);
    console.log(this.entryDateS);  
  }

  dateChanged2($event: any){
    //convert date to string
    console.log($event.target.value);

    //convert angular date to YYYY-MM-DD and if dont have two digits in month or day, add 0
    this.graduationDateS = $event.target.value.getFullYear() + "-" + ("0" + ($event.target.value.getMonth() + 1)).slice(-2) + "-" + ("0" + $event.target.value.getDate()).slice(-2);
    console.log(this.graduationDateS);  
  }


  addStudyCenter(){
    this.TempStudyCenter = this.registerFormStudyCenter.value;
    this.TempStudyCenter.id = 0;
    this.TempStudyCenter.entryDate = this.entryDateS;
    this.TempStudyCenter.graduationDate = this.graduationDateS;
    this.TempStudyCenter.progress = toInteger(this.TempStudyCenter.progress);

   console.log(this.TempStudyCenter);

   //const userId = toInteger(localStorage.getItem("id"));
  //TODO: connectar por ID ABAJOW

    // get digittal profile by user id
    this.service.GetDigitalProfileByDevId(2).subscribe((data: any) => {
      this.digitalProfile = data;
      localStorage.setItem("digitalProfileId", this.digitalProfile.id.toString());
    });
    
    //get education by digital profile id
    this.service.GetEducationByDigitalProfileId(toInteger(localStorage.getItem("digitalProfileId"))).subscribe((data: any) => {
      this.education = data;
      localStorage.setItem("educationId", this.education.id.toString());
    });

    this.TempStudyCenter.education_id = toInteger(localStorage.getItem("educationId"));

    if(this.registerFormStudyCenter.valid){ 

      console.log(this.TempStudyCenter);
      //call the service to add the project
      this.service.createStudyCenter(this.TempStudyCenter, this.TempStudyCenter.education_id).subscribe((data) => {
        console.log(data);
      }
      );
    }
    else{
      alert("Please, fill all the fields");
    }

  }


}
