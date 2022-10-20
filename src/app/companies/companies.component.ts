import { Component, OnInit, ViewChild } from '@angular/core';
import { delay } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CompaniesService } from './services/companies.service';
import { Company } from './model/company';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { toInteger } from 'lodash';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  news: Array<any> = [];
  company!: Company;
  profile: boolean = false;
  currentRoute: string = '';

  constructor( private observer: BreakpointObserver, private service: CompaniesService, private route: ActivatedRoute,private router: Router ) {
     this.analizeRoot();
  }

  ngOnInit(): void {
    this.ngAfterViewInit();
    this.service.GetAllNews().subscribe((response: any) => {
      this.news = response;
      console.log(this.news);
    });

    const id = toInteger(this.route.snapshot.paramMap.get('id'));
    this.service.GetRecruiterById(id).subscribe((response: any) => {
      this.company = response;
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
      });
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
  disableOption() {
    this.profile = false;
  }
  
}
