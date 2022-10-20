import { Component, OnInit } from '@angular/core';
import { CompaniesService} from "../../services/companies.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

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
