import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { toInteger } from 'lodash';
import { Certificate } from 'src/app/developers/model/certificate';
import { DigitalProfile } from 'src/app/developers/model/digitalProfile';
import { Education } from 'src/app/developers/model/education';
import { ToolsService } from 'src/app/developers/services/tools.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {

  TempCertificate : Certificate;
  registerFormCertificate!: FormGroup;
  formIsValid: boolean = false;
  digitalProfile!: DigitalProfile;
  education!: Education;
  obteinedDate: string = "";
  
  constructor(private formBuilder: FormBuilder, private service: ToolsService) { 
    this.TempCertificate = {} as Certificate;
    this.registerFormCertificate = this.formBuilder.group({
      title: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
      description: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
      iconUrl: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
      obtainedDate: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
    });
  }

  ngOnInit(): void {
  }

  get title() {
    return this.registerFormCertificate.get('title');
  }

  get description(){
    return this.registerFormCertificate.get('description');
  }

  get iconUrl(){
    return this.registerFormCertificate.get('iconUrl');
  }

  get obtainedDate(){
    return this.registerFormCertificate.get('obtainedDate');
  }


  dateChanged($event: any){
    //convert date to string
    console.log($event.target.value);

    //convert angular date to YYYY-MM-DD and if dont have two digits in month or day, add 0
    this.obteinedDate = $event.target.value.getFullYear() + "-" + ("0" + ($event.target.value.getMonth() + 1)).slice(-2) + "-" + ("0" + $event.target.value.getDate()).slice(-2);
    console.log(this.obteinedDate);  
  }

  addCertificate(){
    this.TempCertificate = this.registerFormCertificate.value;
    this.TempCertificate.id = 0;
    this.TempCertificate.obtainedDate = this.obteinedDate;

   console.log(this.TempCertificate);
 
  
    this.service.GetDigitalProfileByDevId(toInteger(localStorage.getItem("id"))).subscribe((data: any) => {
      this.digitalProfile = data;
      localStorage.setItem("digitalProfileId", this.digitalProfile.id.toString());
    });
    
    this.service.GetEducationByDigitalProfileId(toInteger(localStorage.getItem("digitalProfileId"))).subscribe((data: any) => {
      this.education = data;
      localStorage.setItem("educationId", this.education.id.toString());
    });

    this.TempCertificate.education_id = toInteger(localStorage.getItem("educationId"));

    if(this.registerFormCertificate.valid){ 

      console.log(this.TempCertificate);
      //call the service to add the project
      this.service.createCertificate(this.TempCertificate, this.TempCertificate.education_id).subscribe((data) => {
        console.log(data);
      }
      );
      alert("Certificate added successfully");
    }
    else{
      alert("Please, fill all the fields");
    }

  }

}
