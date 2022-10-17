import { Component, OnInit } from '@angular/core';
import { DevelopersService } from 'src/app/developers/services/developers.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  news:Array<any> = [];
  constructor(private service: DevelopersService) {
  }

  ngOnInit(): void {
    this.service.GetAllNews().subscribe((response:any)=>{
      this.news = response;
      console.log(this.news);
    });
  }
}
