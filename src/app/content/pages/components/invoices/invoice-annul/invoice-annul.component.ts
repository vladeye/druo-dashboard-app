import { Component, OnInit } from '@angular/core';
import { InvoiceGenerateRefundComponent } from "../invoice-generate-refund/invoice-generate-refund.component";
import { MatDialog, MatDialogRef } from "@angular/material";
import { ConfirmDialogService } from "../../../../../shared/services/confirm-dialog/confirm-dialog.service";

@Component({
  selector: 'invoice-annul',
  templateUrl: './invoice-annul.component.html',
  styleUrls: ['./invoice-annul.component.css']
})
export class InvoiceAnnulComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private dialogsService: ConfirmDialogService,
    public dialogRef: MatDialogRef<InvoiceAnnulComponent>
  ) { }

  /**
   * Open de modal of InvoiceGenerateRefundComponent
   */
  openGenerateRefundDialog() {
    let dialogOpen = this.dialog.open(InvoiceGenerateRefundComponent, {
      disableClose: false
    });
  }

  openConfirmation(){
    this.dialogsService
      .confirm(
        '¡Tu factura ha sido anulada!',
        'Has procesado un reembolso por $200.000. ' +
        'Los pagos asociados a esta factura han sido eliminados.',
        'Ver facturas'
      )
      .subscribe((res) => {
        console.log(`We've annulled your invoice`);
      })
  }

  ngOnInit() {
  }

}
