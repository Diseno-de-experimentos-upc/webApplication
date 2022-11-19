import { Component, OnInit } from '@angular/core';
import { DevelopersService} from "../../services/developers.service";
import { ToolsService } from '../../services/tools.service';
import { Developer } from "../../model/developer";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogBoxSettingsDeveloperComponent } from "./dialog-box/dialog-box.component";
import { DialogCancelComponent} from "../../../companies/pages/settings/dialog-cancel/dialog-cancel.component";
import { DialogSaveComponent} from "../../../companies/pages/settings/dialog-save/dialog-save.component";
import { toInteger } from 'lodash';
import { Framework } from '../../model/framework';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsDeveloperComponent implements OnInit {
  email: string = "Email";
  password: string = "Password";
  image:string = "";
  developer: Developer = {} as Developer;
  frameworkNames!: Array<string>;
  databaseNames!: Array<string>;

  constructor(
    private service: DevelopersService,
    private toolsService: ToolsService,
    private dialog: MatDialog
  ) {
    this.frameworkNames = [];
    this.databaseNames = [];
  }

  ngOnInit(): void {
    this.service.GetDevById(toInteger(localStorage.getItem("id"))).subscribe((data: Developer) => {
      this.developer = data;
      this.image = this.developer.image;
      console.log(data);
    });
    this.toolsService.GetFrameworkByDevId(toInteger(localStorage.getItem("id"))).subscribe((data2: any) => {
      this.developer.frameworks = data2;
      for (let i = 0; i < this.developer.frameworks.length; i++) {
        this.frameworkNames.push(this.developer.frameworks[i].name);
      }
      console.log(this.frameworkNames);
    });
    this.toolsService.GetDatabaseByDevId(toInteger(localStorage.getItem("id"))).subscribe((data3: any) => {
      this.developer.databases = data3;
      for (let i = 0; i < this.developer.databases.length; i++) {
        this.databaseNames.push(this.developer.databases[i].name);
      }
      console.log(this.databaseNames);
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
        location.reload();
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
    else if (title == "Password") {
      dialogConfig.data = {
        _text: this.developer.password,
        _title: title
      };
    } else {
      dialogConfig.width = "20%";
      dialogConfig.data = {
        _text: this.developer.image,
        _title: "Photo"
      };
    }
    const dialogRef = this.dialog.open(DialogBoxSettingsDeveloperComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (title == "Email") {
        this.developer.email = result;
      }
      else if (title == "Password") {
        this.developer.password = result;
      } else {
        this.developer.image = result;
      }
    });
  }
}
