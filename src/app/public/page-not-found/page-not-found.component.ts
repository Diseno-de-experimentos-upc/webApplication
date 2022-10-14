import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  goToLandingPage(): void {
    window.location.href = 'https://digitalmind-upc-pre-202202-si729-sw52.github.io/about-us.html';
  }
}
