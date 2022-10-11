import { Component, OnInit, ViewChild } from '@angular/core';
import { delay } from "rxjs";
import { MatSidenav } from "@angular/material/sidenav";
import { BreakpointObserver } from "@angular/cdk/layout";
import { CompaniesService } from './services/companies.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  news:Array<any> = [];
  constructor(private observer: BreakpointObserver, private service: CompaniesService) {
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
