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
  contactName: string = "Contact Name";
  contactDescription: string = "Contact Description";
  contactId: number = 0;


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
  }

  GetContacts(){
    this.service.GetContacts().subscribe((response:any) => {
      this.contacts = response;
    });
  }

  GetMessages(id: number){
    this.service.GetMessages(id).subscribe((response:any) => {
      this.messages = response;
    });
  }

  SendMessage(contactId: number){
    let TempAnswer:object = {
        "id":0,
        "message": this.answer,
        "emitter": {
          "id": 1
        },
        "receiver": {
            "id": contactId
        }
    }

    this.service.SendMessage(TempAnswer, contactId).subscribe(response => {                
        this.messages.push(response);
    });

    this.answer = "";
  }
}
