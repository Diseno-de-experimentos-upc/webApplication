import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { delay } from 'rxjs';
import { DevelopersService } from '../../services/developers.service';
import { ActivatedRoute } from '@angular/router';
import { toInteger } from 'lodash';
import { Developer } from '../../model/developer';

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

  constructor(
    private observer: BreakpointObserver,
    private service: DevelopersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    const id =  toInteger(this.route.parent?.snapshot.paramMap.get('id'));

    this.getDeveloper(id);
    this.ngAfterViewInit();
    this.getCertificates(id);
    this.getStudyCenters(id);
    this.getSocialNetworks(id);
    this.getTechnologies(id);
    this.getProjects(id);
  }

  getDeveloper(id: number) {
    this.service.GetDeveloperById(id).subscribe((response) => {
      this.developer = response;
      console.log(this.developer.image);
    });
  }

  getCertificates(id: number) {
    this.service.GetCetificates(id).subscribe((response: any) => {
      this.certificates = response;

    });
  }

  getStudyCenters(id: number) {
    this.service.GetStudyCenters(id).subscribe((response: any) => {
      this.studyCenters = response;

    });
  }

  getSocialNetworks(id: number) {
    this.service.GetSocialNetworks(id).subscribe((response: any) => {
      this.socialNetworks = response;

      let i;
      for(i = 0; i < this.socialNetworks.length; i++){
        if(this.socialNetworks[i].name == "Facebook"){
          this.facebook = this.socialNetworks[i].user;
        }
        if(this.socialNetworks[i].name == "Twitter"){
          this.twitter = this.socialNetworks[i].user;
        }
        if(this.socialNetworks[i].name == "Instagram"){
          this.instagram = this.socialNetworks[i].user;
        }
      }
    });
  }

  getTechnologies(id: number) {
    this.service.GetTechnologies(id).subscribe((response: any) => {
      this.technologies = response;

    });
  }

  getProjects(id: number) {
    this.service.GetProjects(id).subscribe((response: any) => {
      this.projects = response;

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
