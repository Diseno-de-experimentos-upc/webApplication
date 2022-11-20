import { Component, OnInit } from '@angular/core';
import {DevelopersService} from "../../services/developers.service";
import {forEach, toInteger} from "lodash";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-notifications-developer',
  templateUrl: './notifications-developer.component.html',
  styleUrls: ['./notifications-developer.component.css']
})
export class NotificationsDeveloperComponent implements OnInit {

  UserId:number = 0;
  Developer: any;
  notifications:Array<any> = [];
  constructor(private service: DevelopersService, private breakpoint: BreakpointObserver) { }

  ngOnInit(): void {
    this.UserId = toInteger(localStorage.getItem("id"));
    this.breakpoint.observe([Breakpoints.XSmall, Breakpoints.HandsetLandscape]).subscribe((response:any) => {
      console.log(response);
    });
    this.GetAllNotifications();

  }
  GetNotification(id:number){
    this.service.GetNotificationsByUserId(id, this.UserId).subscribe((response:any)=> {
      this.notifications = response;
    });
  }
  GetAllNotifications(){
    this.service.GetAllNotifications(this.UserId).subscribe((response:any)=> {
      this.notifications = response;
      console.log(this.notifications);
    });
  }
  DeleteNotificationById(id:number){
    this.service.DeleteNotificationById(id,this.UserId).subscribe((response:any)=> {
      this.GetNotification(this.UserId);
    });
  }

}
