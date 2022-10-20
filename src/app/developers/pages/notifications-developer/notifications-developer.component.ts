import { Component, OnInit } from '@angular/core';
import {DevelopersService} from "../../services/developers.service";

@Component({
  selector: 'app-notifications-developer',
  templateUrl: './notifications-developer.component.html',
  styleUrls: ['./notifications-developer.component.css']
})
export class NotificationsDeveloperComponent implements OnInit {

  notifications:Array<any> = [];
  constructor(private service: DevelopersService) { }

  ngOnInit(): void {
    this.GetNotifications();
  }
  GetNotifications(){
    this.service.GetNotifications().subscribe((response:any)=> {
      this.notifications = response;
    });
  }
}
