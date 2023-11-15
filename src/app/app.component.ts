import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'digital-mind-project-web-application';


  constructor(private gtmService: GoogleTagManagerService, private router: Router) {
    gtmService.addGtmToDom();
   }
  ngOnInit(): void {
    this.router.events.forEach(item => {
      if (item instanceof NavigationEnd) {
          const gtmTag = {
              event: 'page',
              pageName: item.url
          };

          this.gtmService.pushTag(gtmTag);
      }
  });
  }

}
