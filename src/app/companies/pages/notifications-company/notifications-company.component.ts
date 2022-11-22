import { Component, OnInit } from '@angular/core';
import {CompaniesService} from "../../services/companies.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {toInteger} from "lodash";

@Component({
  selector: 'app-notifications-company',
  templateUrl: './notifications-company.component.html',
  styleUrls: ['./notifications-company.component.css']
})
export class NotificationsCompanyComponent implements OnInit {

  UserId:number = 0;
  notifications:Array<any> = [];
  constructor(private service: CompaniesService, private breakpoint: BreakpointObserver) { }

  ngOnInit(): void {
    this.UserId = toInteger(localStorage.getItem("id"));
    this.breakpoint.observe([Breakpoints.XSmall, Breakpoints.HandsetLandscape]).subscribe((response:any) => {
      console.log(response);
    });
  }

  GetNotification(id:number){
    this.service.GetNotificationByUserId(id, this.UserId).subscribe((response:any)=> {
      this.notifications = response;
    });
  }


  DeleteNotificationById(id:number){
    this.service.DeleteNotificationById(id,this.UserId).subscribe((response:any)=> {
      this.GetNotification(this.UserId);
    });
    location.reload();
  }

}
