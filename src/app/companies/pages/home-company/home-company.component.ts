import { Component, OnInit } from '@angular/core';
import { CompaniesService } from 'src/app/companies/services/companies.service';
import { Developer } from '../../../public/register/model/developer';
import { MessageDialogComponent } from '../find-your-dev/message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';
import { SurveyComponent } from 'src/app/public/survey/survey.component';
import { toInteger } from 'lodash';

@Component({
  selector: 'app-home-company',
  templateUrl: './home-company.component.html',
  styleUrls: ['./home-company.component.css'],
})
export class HomeCompanyComponent implements OnInit {
  Devs: Array<Developer> = [];

  constructor(private service: CompaniesService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.service.getDeveloperAll().subscribe((response: any) => {
      this.Devs = response;
      console.log(this.Devs);
    });

    const id = toInteger(localStorage.getItem('id'));
    let developer: any;
    this.service.GetRecById(id).subscribe((response: any) => {
      developer = response;
    });

    // if (developer.rate == null) this.openDialogSurvey();
  }
  openMessageDialog(id: number) {
    this.dialog.open(MessageDialogComponent, {
      data: id,
    });
  }
  openNotificationDialog(id: number) {
    this.dialog.open(NotificationDialogComponent, {
      data: id,
    });
  }
  openDialogSurvey() {
    this.dialog.open(SurveyComponent, {
      data: {
        user: 'company',
      },
    });
  }
}
