import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../services/companies.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeCompanyComponent implements OnInit {

  news:Array<any> = [];
  constructor(private service: CompaniesService) {
  }

  ngOnInit(): void {
    this.service.GetAllNews().subscribe((response:any)=>{
      this.news = response;
      console.log(this.news);
    });
  }
}
