import {Component, OnInit, ViewChild} from '@angular/core';
import {delay} from "rxjs";
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import { Router, ActivatedRoute } from '@angular/router';
import { toInteger } from 'lodash';
import { DevelopersService } from './services/developers.service';
import { Developer } from './model/developer';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css']
})
export class DevelopersComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  developer!: Developer;
  profile: boolean = false;
  currentRoute: string = '';
  notifications: Array<any> = [];

  constructor(private observer: BreakpointObserver, private router: Router, private route: ActivatedRoute, private service: DevelopersService) {
    this.analizeRoot();
  }


  ngOnInit(): void {
    this.ngAfterViewInit();
    this.GetAllNotifications();
    const id = toInteger(localStorage.getItem("id"));
    this.service.GetDeveloperById(id).subscribe((response:any)=>{
       this.developer = response;
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
      })
  }

  analizeRoot(){
    this.currentRoute = this.router.url;
    //find profile string in current route
    if (this.currentRoute.includes('profile')) {
      this.profile = true;
    }
    else
    {
      this.profile = false;
    }
  }

  setOption() {
    this.profile = true;
 }
 disableOption(){
  this.profile = false;
 }

  GetAllNotifications() {
    this.service.GetNotifications().subscribe((response: any) => {
      this.notifications = response;
      console.log(this.notifications.length);
    });

  }

}
