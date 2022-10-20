import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  currentRoute: string = "";
  homeLink: string = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    if (this.currentRoute.includes('developers'))
    {
        this.homeLink = '/developers/home';
    }
    else {
      this.homeLink = '/companies/home';
    }
  }

  goToLandingPage(): void {
    window.location.href = 'https://digitalmind-upc-pre-202202-si729-sw52.github.io/about-us.html';
  }
}
