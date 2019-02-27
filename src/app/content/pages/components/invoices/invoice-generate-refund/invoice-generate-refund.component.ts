import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from "../../../../../shared/services/confirm-dialog/confirm-dialog.service";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: 'invoice-generate-refund',
  templateUrl: './invoice-generate-refund.component.html',
  styleUrls: ['./invoice-generate-refund.component.css']
})
export class InvoiceGenerateRefundComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }

}
