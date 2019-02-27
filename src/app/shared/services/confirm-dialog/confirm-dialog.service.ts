import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from "@angular/material";
import { Observable } from "rxjs";
import { ConfirmDialogComponent } from "../../components/confirm-dialog/confirm-dialog.component";


@Injectable()
export class ConfirmDialogService {

  constructor(private dialog: MatDialog) { }


  public confirm(
    title: string,
    message: string,
    buttonLabel: string = "OK",
    cancelLabel: string = "Cancel",
    showCancel: boolean = false,
    info: any = { width: '500px',
                  height: '418px',
                  disableClose: true}
  ): Observable<boolean>{

    let dialogRef: MatDialogRef<ConfirmDialogComponent>;

    dialogRef = this.dialog.open(ConfirmDialogComponent, info );
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.buttonLabel = buttonLabel;
    dialogRef.componentInstance.cancelLabel = cancelLabel;
    dialogRef.componentInstance.showCancel = showCancel;

    return dialogRef.afterClosed();
  }
}
