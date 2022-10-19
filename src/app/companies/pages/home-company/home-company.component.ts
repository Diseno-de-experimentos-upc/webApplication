import { Component, OnInit } from '@angular/core';
import { CompaniesService } from 'src/app/companies/services/companies.service';

@Component({
  selector: 'app-home-company',
  templateUrl: './home-company.component.html',
  styleUrls: ['./home-company.component.css']
})
export class HomeCompanyComponent implements OnInit {
  news:Array<any> = [];

  constructor(private service: CompaniesService) { }

  ngOnInit(): void {
    this.service.GetAllNews().subscribe((response:any)=>{
      this.news = response;
      console.log(this.news);
    });
  }
}
