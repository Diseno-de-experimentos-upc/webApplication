import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { toInteger } from 'lodash';
import { DigitalProfile } from 'src/app/developers/model/digitalProfile';
import { Project } from 'src/app/developers/model/project';
import { ToolsService } from 'src/app/developers/services/tools.service';
 

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  
  TempProject :  Project;
  registerForm!: FormGroup;
  formIsValid: boolean = false;
  digitalProfile!: DigitalProfile;


  constructor(private formBuilder: FormBuilder, private service: ToolsService) {
      this.TempProject = {} as Project;
      this.registerForm = this.formBuilder.group({
        name: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
        description: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
        iconUrl: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
        projectUrl: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
      });
   }

  ngOnInit(): void {
  }

   
  get name() {
    return this.registerForm.get('name');
  }

  get description(){
    return this.registerForm.get('description');
  }

  get iconUrl(){
    return this.registerForm.get('iconUrl');
  }

  get projectUrl(){
    return this.registerForm.get('projectUrl');
  }

  //add new project with all attributes

  addProject(){
    this.TempProject = this.registerForm.value;
    this.TempProject.id = 0;

   //const userId = toInteger(localStorage.getItem("id"));
  //TODO: connectar por ID ABAJOW

    // get digittal profile by user id
    this.service.GetDigitalProfileByDevId(2).subscribe((data: any) => {
      this.digitalProfile = data;
      localStorage.setItem("digitalProfileId", this.digitalProfile.id.toString());
    });
    
    this.TempProject.digitalProfile_id = toInteger(localStorage.getItem("digitalProfileId"));
 

    if(this.registerForm.valid){ 

      //call the service to add the project
      this.service.createProject(this.TempProject, this.TempProject.digitalProfile_id).subscribe((data) => {
        console.log(data);
      }
      );
    }
    else{
      alert("Please, fill all the fields");
    }

  }

}

 

