import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CompaniesService } from '../../services/companies.service';

@Component({
  selector: 'app-messages-company',
  templateUrl: './messages-company.component.html',
  styleUrls: ['./messages-company.component.css']
})
export class MessagesCompanyComponent implements OnInit {

  messages: Array<any> = [];
  contacts: Array<any> = [];
  answer: string = "";
  show: boolean = false;
  mobile:boolean = false;


  constructor(private service: CompaniesService, private breakpoint: BreakpointObserver) { }

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
        "type": "comp",
        "message": this.answer
    }

    this.service.SendMessage(TempAnswer).subscribe(response => {                
        this.messages.push(response);
    });

    this.answer = "";
  }

}
