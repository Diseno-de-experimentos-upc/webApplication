import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs';
import { DevelopersService } from '../developers/services/developers.service';

@Component({
  selector: 'app-profile-developer',
  templateUrl: './profile-developer.component.html',
  styleUrls: ['./profile-developer.component.css'],
})
export class ProfileDeveloperComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  @ViewChild(MatGridList)
  gridList!: MatGridList;

  @ViewChild('first')
  firstGridTile!: MatGridTile;

  @ViewChild('second')
  secondGridTile!: MatGridTile;

  certificates: Array<any> = [];
  studyCenters: Array<any> = [];
  socialNetworks: Array<any> = [];
  technologies: Array<any> = [];
  projects: Array<any> = [];

  constructor(
    private observer: BreakpointObserver,
    private service: DevelopersService
  ) {}

  ngOnInit(): void {
    this.ngAfterViewInit();
    this.getCertificates(1);
    this.getStudyCenters(1);
    this.getSocialNetworks(1);
    this.getTechnologies(1);
    this.getProjects(1);
  }

  getCertificates(id: number) {
    this.service.GetCetificates(id).subscribe((response: any) => {
      this.certificates = response;
      console.log(this.certificates);
    });
  }

  getStudyCenters(id: number) {
    this.service.GetStudyCenters(id).subscribe((response: any) => {
      this.studyCenters = response;
      console.log(this.studyCenters);
    });
  }

  getSocialNetworks(id: number) {
    this.service.GetSocialNetworks(id).subscribe((response: any) => {
      this.socialNetworks = response;
      console.log(this.socialNetworks);
    });
  }

  getTechnologies(id: number) {
    this.service.GetTechnologies(id).subscribe((response: any) => {
      this.technologies = response;
      console.log(this.technologies);
    });
  }

  getProjects(id: number) {
    this.service.GetProjects(id).subscribe((response: any) => {
      this.projects = response;
      console.log(this.projects);
    });
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

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
