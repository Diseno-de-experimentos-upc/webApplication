import { Component, OnInit} from '@angular/core';
import { DevelopersService } from '../../services/developers.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  messages: Array<any> = [];
  contacts: Array<any> = [];
  answer: string = ""

  constructor(private service: DevelopersService) { }

  ngOnInit(): void {
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
