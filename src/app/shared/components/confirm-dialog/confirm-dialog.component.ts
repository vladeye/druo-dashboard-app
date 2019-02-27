import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  public title: string;
  public message: string;
  public buttonLabel: string = "OK";
  public cancelLabel: string = "Cancel";
  public showCancel: boolean = false;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }


}
