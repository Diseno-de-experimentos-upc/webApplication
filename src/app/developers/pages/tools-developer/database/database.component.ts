import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { toInteger } from 'lodash';
import { Database } from 'src/app/developers/model/database';
import { DigitalProfile } from 'src/app/developers/model/digitalProfile';
import { ToolsService } from 'src/app/developers/services/tools.service';
import { DialogBoxInvalidFormComponent } from 'src/app/public/register/dialog-box-invalid-form/dialog-box-invalid-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css'],
})
export class DatabaseComponent implements OnInit {
  TempDatabase: Database;
  registerFormDatabase!: FormGroup;
  formIsValid: boolean = false;
  digitalProfile!: DigitalProfile;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog,  private service: ToolsService) {
    this.TempDatabase = {} as Database;
    this.registerFormDatabase = this.formBuilder.group({
      name: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      description: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      iconLink: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
    });
  }

  ngOnInit(): void {}

  get name() {
    return this.registerFormDatabase.get('name');
  }

  get description() {
    return this.registerFormDatabase.get('description');
  }

  get iconLink() {
    return this.registerFormDatabase.get('iconLink');
  }
  addDatabase() {
    this.TempDatabase = this.registerFormDatabase.value;
    this.TempDatabase.id = 0;

    this.TempDatabase.digitalProfile_id = toInteger(
      localStorage.getItem('digitalProfileId')
    );

    if (this.registerFormDatabase.valid) {
      //call the service to add the project
      this.service
        .createDatabase(this.TempDatabase, this.TempDatabase.digitalProfile_id)
        .subscribe((data) => {
          console.log(data);
        });
      this.dialog.open(DialogBoxInvalidFormComponent, {
        data: {message: "Database added successfully!"}
      });
      this.registerFormDatabase.reset();
    } else {
      this.dialog.open(DialogBoxInvalidFormComponent, {
        data: {message: "Please, fill all the fields"}
      });
    }
  }
}
