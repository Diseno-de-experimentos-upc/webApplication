import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { toInteger } from 'lodash';
import { CompaniesService } from "src/app/companies/services/companies.service";
@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.css']
})
export class NotificationDialogComponent implements OnInit {

  answer: string = "";
  UserId: number = 0;
  constructor(public dialogRef: MatDialogRef<NotificationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private service: CompaniesService) { }

  ngOnInit(): void {
    this.UserId = toInteger(localStorage.getItem("id"));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  SendNotification(data: any) {
    let TempAnswer:object = {
      "id":0,
      "content": this.answer,
      "date": "2022-11-19T19:53:42.582Z",
      "emitter": {
        "id": this.UserId
      },
      "receiver": {
          "id": data
      }
    }
    this.service.SendNotification(TempAnswer, data, this.UserId).subscribe(response => {
      console.log(response);
    });

    this.answer = "";

    this.dialogRef.close(data);
  }
}
