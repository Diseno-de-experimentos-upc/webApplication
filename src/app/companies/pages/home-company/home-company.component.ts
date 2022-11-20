import { Component, OnInit } from '@angular/core';
import { CompaniesService } from 'src/app/companies/services/companies.service';
import { Developer } from "../../../public/register/model/developer";
import {MessageDialogComponent} from "../find-your-dev/message-dialog/message-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {NotificationDialogComponent} from "./notification-dialog/notification-dialog.component";


@Component({
  selector: 'app-home-company',
  templateUrl: './home-company.component.html',
  styleUrls: ['./home-company.component.css']
})
export class HomeCompanyComponent implements OnInit {
  Devs:Array<Developer> = [];

  constructor(private service: CompaniesService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.service.getDeveloperAll().subscribe((response:any)=>{
      this.Devs = response;
      console.log(this.Devs);
    });
  }
  openMessageDialog(id:number) {
    this.dialog.open(MessageDialogComponent, {
      data: id,
    });
  }
  openNotificationDialog(id:number) {
    this.dialog.open(NotificationDialogComponent, {
      data: id,
    });
  }


}
