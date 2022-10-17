import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { delay } from 'rxjs';
import {CompaniesService} from '../companies/services/companies.service';
import { ActivatedRoute } from '@angular/router';
import { toInteger } from 'lodash';
import { Company } from '../companies/model/company'; 

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.css']
})
export class ProfileCompanyComponent implements OnInit {

  @ViewChild(MatGridList)
  gridList!: MatGridList;

  @ViewChild('first')
  firstGridTile!: MatGridTile;

  @ViewChild('second')
  secondGridTile!: MatGridTile;
  socialNetworks: Array<any> = [];
  facebook : string = "none";
  twitter : string = "none";
  instagram : string = "none";
  posts : Array<any> = []; 
  company!: Company;

  constructor(private observer: BreakpointObserver, private service: CompaniesService, private route : ActivatedRoute ) { }

  ngOnInit(): void {

    const id =  toInteger(this.route.parent?.snapshot.paramMap.get('id'));    

    this.ngAfterViewInit();
    this.getRecruiter(id);
    this.getSocialNetworks(id);
    this.getPosts(id);
  }

  getPosts(id: number) {
    this.service.GetPosts(id).subscribe((response: any) => {
      this.posts = response;
      console.log(this.posts);
    });
  }

  getRecruiter(id: number) {
    this.service.GetRecruiterById(id).subscribe((response: any) => {
      this.company = response;
      console.log(this.company);
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
