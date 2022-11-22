import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/companies/model/post';
import { DevelopersService } from 'src/app/developers/services/developers.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts:Array<Post> = [];
  constructor(private service: DevelopersService) {
  }

  ngOnInit(): void {
    this.service.GetAllPosts().subscribe((response:any)=>{
      this.posts = response;
      console.log(this.posts);
    });
  }
}
