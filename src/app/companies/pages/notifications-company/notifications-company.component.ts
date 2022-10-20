import { Component, OnInit } from '@angular/core';
import {CompaniesService} from "../../services/companies.service";

@Component({
  selector: 'app-notifications-company',
  templateUrl: './notifications-company.component.html',
  styleUrls: ['./notifications-company.component.css']
})
export class NotificationsCompanyComponent implements OnInit {

  notifications:Array<any> = [];
  constructor(private service: CompaniesService) { }

  ngOnInit(): void {
    this.GetNotifications();
  }

  GetNotifications(){
    this.service.GetNotifications().subscribe((response:any)=> {
      this.notifications = response;
    });
  }

}
