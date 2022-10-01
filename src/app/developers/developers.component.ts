import {Component, OnInit, ViewChild} from '@angular/core';
import {delay} from "rxjs";
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import { DevelopersService } from './services/developers.service';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css']
})
export class DevelopersComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  news:Array<any> = [];
  constructor(private observer: BreakpointObserver, private service: DevelopersService) {
  }

  ngOnInit(): void {
    this.ngAfterViewInit();
    this.service.GetAllNews().subscribe((response:any)=>{
      this.news = response;
      console.log(this.news);
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

}
