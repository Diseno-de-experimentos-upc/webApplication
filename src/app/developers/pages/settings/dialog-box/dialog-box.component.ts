import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxSettingsDeveloperComponent implements OnInit {

  toChange!: string;
  title!: string;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxSettingsDeveloperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  onNoClick(): void {
    console.log(this.data._text);
    this.dialogRef.close(this.toChange);
  }

  ngOnInit(): void {
    this.toChange = this.data._text;
    this.title = this.data._title;
  }

}
