import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/companies/model/post';
import { DevelopersService } from 'src/app/developers/services/developers.service';
import { MatDialog} from "@angular/material/dialog";
import {NotificationDialogComponent} from "src/app/companies/pages/home-company/notification-dialog/notification-dialog.component";
import {MessageDialogComponent} from "src/app/companies/pages/find-your-dev/message-dialog/message-dialog.component";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts:Array<Post> = [];
  constructor(private service: DevelopersService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.service.GetAllPosts().subscribe((response:any)=>{
      this.posts = response;
      console.log(this.posts);
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
