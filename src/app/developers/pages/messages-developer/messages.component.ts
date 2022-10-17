import { Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DevelopersService } from '../../services/developers.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  messages: Array<any> = [];
  contacts: Array<any> = [];
  answer: string = "";
  show: boolean = false;
  mobile:boolean = false;


  constructor(private service: DevelopersService, private breakpoint: BreakpointObserver) { }

  ngOnInit(): void {
    this.breakpoint.observe([Breakpoints.XSmall, Breakpoints.HandsetLandscape]).subscribe((response: any) => {
      console.log(response);
      if (response.matches) {
        this.mobile = true;
      }
      else {
        this.mobile = false;
      }
    });
    this.GetContacts();
    this.GetMessages();
  }

  GetContacts(){
    this.service.GetContacts().subscribe((response:any) => {
      this.contacts = response;
    });
  }

  GetMessages(){
    this.service.GetMessages().subscribe((response:any) => {
      this.messages = response;
    });
  }

  SendMessage(){
    let TempAnswer:object = {
        "id":0,
        "type": "dev",
        "message": this.answer
    }

    this.service.SendMessage(TempAnswer).subscribe(response => {                
        this.messages.push(response);
    });

    this.answer = "";
  }
}
