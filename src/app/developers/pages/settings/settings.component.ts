import { Component, OnInit } from '@angular/core';
import { DevelopersService} from "../../services/developers.service";
import { Developer } from "../../model/developer";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogBoxSettingsDeveloperComponent } from "./dialog-box/dialog-box.component";
import { DialogCancelComponent} from "../../../companies/pages/settings/dialog-cancel/dialog-cancel.component";
import { DialogSaveComponent} from "../../../companies/pages/settings/dialog-save/dialog-save.component";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsDeveloperComponent implements OnInit {
  email: string = "Email";
  password: string = "Password";
  developer: Developer = {} as Developer;

  constructor(
    private service: DevelopersService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.service.GetDevById(2).subscribe((data: Developer) => {
      this.developer = data;
      console.log(data);
    });
  }
  updateDev() {
    this.service.updateDev(this.developer).subscribe((data: Developer) => {
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
        this.service.GetDevById(this.developer.id).subscribe((data: Developer) => {
          this.developer = data;
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
        this.updateDev();
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
        _text: this.developer.email,
        _title: title
      };
    }
    else {
      dialogConfig.data = {
        _text: this.developer.password,
        _title: title
      };
    }
    const dialogRef = this.dialog.open(DialogBoxSettingsDeveloperComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (title == "Email") {
        this.developer.email = result;
      }
      else {
        this.developer.password = result;
      }
    });
  }
}
