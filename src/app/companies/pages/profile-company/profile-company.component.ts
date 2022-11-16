import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { delay } from 'rxjs';
import {CompaniesService} from '../../services/companies.service';
import { Company } from '../../model/company';
import {toInteger} from "lodash";

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
  isEmpty: boolean = true;
  isResponsive: boolean = false;

  constructor(private observer: BreakpointObserver, private service: CompaniesService) { }

  ngOnInit(): void {

    //getting id from localStorage
    const id = toInteger(localStorage.getItem("id"));
    this.ngAfterViewInit();
    
    this.getRecruiter(id);
    this.getSocialNetworks(id);
    this.getPosts(id);
  }

  getPosts(id: number) {
    this.service.GetPosts(id).subscribe((response: any) => {
      this.posts = response;
      console.log(this.posts);

      if(this.posts.length > 0){
        this.isEmpty = false;
      }
      else{
        this.isEmpty = true;
      }

    });
  }

  deletePost(id:number) {
    this.service.DeletePost(this.company.id, id).subscribe((response:any) => {
      this.posts = this.posts.filter((o: any) => {
        return o.id !==id ? o:false; 
      })
    });
  }

  getRecruiter(id: number) {
    this.service.GetRecruiterById(id).subscribe((response: any) => {
      this.company = response;
      console.log(this.company);
    });
  }

  getSocialNetworks(id: number) {

    this.service.GetSocialNetworkByUserId(id).subscribe((response: any) => {
      this.socialNetworks = response;
      console.log(this.socialNetworks);
      let i;
      for(i = 0; i < this.socialNetworks.length; i++){
        if(this.socialNetworks[i].nameSocialNetwork == "Facebook"){
          this.facebook = this.socialNetworks[i].urlSocialNetwork;
        }
        if(this.socialNetworks[i].nameSocialNetwork == "Twitter"){
          this.twitter = this.socialNetworks[i].urlSocialNetwork;
        }
        if(this.socialNetworks[i].nameSocialNetwork == "Instagram"){
          this.instagram = this.socialNetworks[i].urlSocialNetwork;
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

          this.isResponsive = true;

        } else {
          //full -width
          this.gridList.rowHeight = '88vh';

          this.firstGridTile.colspan = 1;
          this.secondGridTile.colspan = 3;

          this.firstGridTile.rowspan = 1;
          this.secondGridTile.rowspan = 1;

          this.isResponsive = false;
        }
      });
  }



}
