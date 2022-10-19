import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-save',
  templateUrl: './dialog-save.component.html',
  styleUrls: ['./dialog-save.component.css']
})
export class DialogSaveComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogSaveComponent>,
  ) { }

  ngOnInit(): void {
  }

}
