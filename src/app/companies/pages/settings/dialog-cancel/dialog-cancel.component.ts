import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-cancel',
  templateUrl: './dialog-cancel.component.html',
  styleUrls: ['./dialog-cancel.component.css']
})
export class DialogCancelComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogCancelComponent>,
  ) { }

  ngOnInit(): void {
  }

}
