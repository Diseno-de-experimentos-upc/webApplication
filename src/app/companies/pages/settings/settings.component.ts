import { Component, OnInit } from '@angular/core';
import { CompaniesService} from "../../services/companies.service";
import { Company } from "../../model/company";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogBoxSettingsComponent} from "./dialog-box/dialog-box.component";
import { DialogCancelComponent} from "./dialog-cancel/dialog-cancel.component";
import { DialogSaveComponent} from "./dialog-save/dialog-save.component";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsCompanyComponent implements OnInit {
  email: string = "Email";
  password: string = "Password";
  recruiter: Company = {} as Company;

  constructor(
    private service: CompaniesService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.service.GetRecById(3).subscribe((data: Company) => {
      this.recruiter = data;
      console.log(data);
    });
  }
  updateRec() {
    this.service.updateRec(this.recruiter.id, this.recruiter).subscribe((data: Company) => {
      console.log(data);
    });
  }
  openCancelDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(DialogCancelComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Restarting!");
        this.service.GetRecById(this.recruiter.id).subscribe((data: Company) => {
          this.recruiter = data;
        });
      }
      else {
        console.log("Not restarting!");
      }
    });
  }
  openSaveDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(DialogSaveComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Saving!");
        this.updateRec();
      }
      else {
        console.log("Not saving!");
      }
    });
  }
  openDialog(title: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    if (title == "Email") {
      dialogConfig.data = {
        _text: this.recruiter.recruiter_email,
        _title: title
      };
    }
    else {
      dialogConfig.data = {
        _text: this.recruiter.recruiter_password,
        _title: title
      };
    }
    const dialogRef = this.dialog.open(DialogBoxSettingsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (title == "Email") {
        this.recruiter.recruiter_email = result;
      }
      else {
        this.recruiter.recruiter_password = result;
      }
    });
  }
}
