import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { delay } from 'rxjs';
import { DevelopersService } from '../../services/developers.service';
import { toInteger } from 'lodash';
import { Developer } from '../../model/developer';
import { DigitalProfile } from 'src/app/shared/model/digitalProfile';
import { Education } from '../../model/education';

@Component({
  selector: 'app-profile-developer',
  templateUrl: './profile-developer.component.html',
  styleUrls: ['./profile-developer.component.css'],
})
export class ProfileDeveloperComponent implements OnInit {

  @ViewChild(MatGridList)
  gridList!: MatGridList;

  @ViewChild('first')
  firstGridTile!: MatGridTile;

  @ViewChild('second')
  secondGridTile!: MatGridTile;

  certificates: Array<any> = [];
  studyCenters: Array<any> = [];
  socialNetworks: Array<any> = [];
  facebook : string = "none";
  twitter : string = "none";
  instagram : string = "none";
  technologies: Array<any> = [];
  projects: Array<any> = [];
  developer!: Developer;
  digitalProfile!: DigitalProfile;
  education!: Education;
  digitalProfileId: number = 0;
  educationId: number = 0;

  constructor(
    private observer: BreakpointObserver,
    private service: DevelopersService
  ) {}

  ngOnInit(): void {
    
    //getting id from localStorage
    const developerId = toInteger(localStorage.getItem("id"));

    this.getDeveloper(developerId);
    this.ngAfterViewInit();
    this.getDigitalProfile(developerId);
 
    this.digitalProfileId = toInteger(localStorage.getItem("digitalProfileId"));
    this.getEducation(this.digitalProfileId);

    this.educationId = toInteger(localStorage.getItem("educationId"));

    this.getTechnologies(this.digitalProfileId);
    this.getProjects(this.digitalProfileId);

    this.getCertificates(this.educationId);
    this.getStudyCenters(this.educationId);

    this.getSocialNetworks(developerId);
  }

  getEducation(id: number) {
    this.service.GetEducationByDigitalProfileId(id).subscribe((response: any) => {
      this.education = response;
      localStorage.setItem("educationId", this.education.id.toString());
    });
  }
  
  getDeveloper(id: number) {
    this.service.GetDeveloperById(id).subscribe((response) => {
      this.developer = response;
      console.log(this.developer);
    });
  }

  getDigitalProfile(id: number) {
    this.service.GetDigitalProfileByDeveloperId(id).subscribe((response : any) => {
      this.digitalProfile = response;
      localStorage.setItem("digitalProfileId", this.digitalProfile.id.toString());
    });
  }

  getCertificates(id: number) {
    this.service.GetCertificatesByEducationId(id).subscribe((response: any) => {
      this.certificates = response;
    });
  }

  getStudyCenters(id: number) {
    this.service.GetStudyCentersByEducationId(id).subscribe((response: any) => {
      this.studyCenters = response;
      console.log("EDUCATION:", this.studyCenters);
    });
  }

  getSocialNetworks(id: number) {
    // this.service.GetSocialNetworks(id).subscribe((response: any) => {
    //   this.socialNetworks = response;

    //   let i;
    //   for(i = 0; i < this.socialNetworks.length; i++){
    //     if(this.socialNetworks[i].name == "Facebook"){
    //       this.facebook = this.socialNetworks[i].user;
    //     }
    //     if(this.socialNetworks[i].name == "Twitter"){
    //       this.twitter = this.socialNetworks[i].user;
    //     }
    //     if(this.socialNetworks[i].name == "Instagram"){
    //       this.instagram = this.socialNetworks[i].user;
    //     }
    //   }
    // });
  }

  getTechnologies(id: number) {
    
    // add databases, frameworks and programming languages into technologies array 
    this.service.GetProgrammingLanguagesByDigitalProfileId(id).subscribe((response: any) => {
      this.technologies = response;
    });
    this.service.GetFrameworkByDigitalProfileId(id).subscribe((response: any) => {
      this.technologies = this.technologies.concat(response);
    });
    this.service.GetDatabaseByDigitalProfileId(id).subscribe((response: any) => {
      this.technologies = this.technologies.concat(response);
    });
    
  }

  getProjects(id: number) {
    this.service.GetProjectsByDigitalProfileId(id).subscribe((response: any) => {
      this.projects = response;
      console.log("PROJECTS:", this.projects);
    });
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 1215px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          //responsive
          this.gridList.rowHeight = '95vh';

          this.firstGridTile.colspan = 4;
          this.secondGridTile.colspan = 4;

          this.firstGridTile.rowspan = 1;
          this.secondGridTile.rowspan = 3;

        } else {
          //full -width
          this.gridList.rowHeight = '88vh';

          this.firstGridTile.colspan = 1;
          this.secondGridTile.colspan = 3;

          this.firstGridTile.rowspan = 1;
          this.secondGridTile.rowspan = 1;

        }
      });
  }
}
