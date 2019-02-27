import { Component, OnInit } from '@angular/core';
import { InvoicesSandbox } from "../invoices.sandbox";
import { CurrencyPipe } from '@angular/common';
import { TranslateService } from "@ngx-translate/core";
import { MatDialog } from "@angular/material";
import { InvoiceAnnulComponent } from "../invoice-annul/invoice-annul.component";
import { InvoicePaymentRegistryComponent } from "../invoice-payment-registry/invoice-payment-registry.component"

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private invoicesSandbox: InvoicesSandbox,
    private currencyPipe: CurrencyPipe,
    public translate: TranslateService
  ) { }

  ngOnInit() {
  }


  /**
   * Open de modal of InvoiceAnnulComponent
   */
  openAnnulInvoiceDialog() {
    let dialogOpen = this.dialog.open(InvoiceAnnulComponent, {
      disableClose: false
    });
  }

  /**
  * Open de modal of InvoiceRegistrationPago
  */
  private openInvoiceRegistroPagoDialog() {
    let dialogOpen = this.dialog.open(InvoicePaymentRegistryComponent, {
      disableClose: false
    });

  }

  /**
   * Open de modal of InvoiceRegistrationPago
   */


  /**
   * Set the text color of the invoice status
   * @param: statusCode: string: its the status code comming from the backend
   */

  setColorStatus(statusCode: string) {
    let resultColor: string = '#2f2f2f';

    if ((statusCode !== undefined) && (statusCode !== '') && (statusCode !== null)) {
      if (statusCode === '11') {
        resultColor = '#008023';
      } else if (statusCode === '10') {
        resultColor = '#C30000';
      } else if (statusCode === '12') {
        resultColor = '#8c5000';
      }
    }
    return resultColor;
  }


  /**
   * Set the background color of the invoice status
   * @param: statusCode: string: its the status code comming from the backend
   */
  setBackgroundColorStatus(statusCode: string) {
    let resultBGColor = '#ffffff';
    if ((statusCode !== undefined) && (statusCode !== '') && (statusCode !== null)) {
      if (statusCode === '11') {
        resultBGColor = '#e6f9eb';
      } else if (statusCode === '10') {
        resultBGColor = '#f9d4d4';
      } else if (statusCode === '12') {
        resultBGColor = '#fff1d6';
      }
    }
    return resultBGColor;
  }

  /**
   * Set the label for the traslation of the invoice status
   * @param: statusCode: string: its the status code comming from the backend
   */

  setTranslateLabelStatus(statusCode: string) {
    let resultLabel: string = 'Invoices.Status.NA';

    if ((statusCode !== undefined) && (statusCode !== '') && (statusCode !== null)) {
      if (statusCode === '1') {
        resultLabel = 'Invoices.Status.DRAFT';
      } else if (statusCode === '2') {
        resultLabel = 'Invoices.Status.CREATED';
      } else if (statusCode === '3') {
        resultLabel = 'Invoices.Status.SENT';
      } else if (statusCode === '4') {
        resultLabel = 'Invoices.Status.DELIVERED';
      } else if (statusCode === '5') {
        resultLabel = 'Invoices.Status.DELIVERY_FAILED';
      } else if (statusCode === '6') {
        resultLabel = 'Invoices.Status.MARKED_AS_SPAM';
      } else if (statusCode === '7') {
        resultLabel = 'Invoices.Status.OPENED';
      } else if (statusCode === '8') {
        resultLabel = 'Invoices.Status.CLICKED';
      } else if (statusCode === '9') {
        resultLabel = 'Invoices.Status.REMINDER_SENT';
      } else if (statusCode === '10') {
        resultLabel = 'Invoices.Status.INVOICE_OVERDUE';
      } else if (statusCode === '11') {
        resultLabel = 'Invoices.Status.PAID';
      } else if (statusCode === '12') {
        resultLabel = 'Invoices.Status.PARTIAL_PAYMENT';
      } else if (statusCode === '13') {
        resultLabel = 'Invoices.Status.PAYMENT_PROCESSING';
      } else if (statusCode === '14') {
        resultLabel = 'Invoices.Status.PARTIAL_PAYMENT_PROCESSING';
      } else if (statusCode === '15') {
        resultLabel = 'Invoices.Status.PAYMENT_DECLINED';
      } else if (statusCode === '16') {
        resultLabel = 'Invoices.Status.PARTIAL_PAYMENT_DECLINED';
      } else if (statusCode === '17') {
        resultLabel = 'Invoices.Status.REFUND_REQUESTED';
      } else if (statusCode === '18') {
        resultLabel = 'Invoices.Status.PARTIAL_REFUND_REQUESTED';
      } else if (statusCode === '19') {
        resultLabel = 'Invoices.Status.REFUND_PROCESSED';
      } else if (statusCode === '20') {
        resultLabel = 'Invoices.Status.PARTIAL_REFUND_PROCESSED';
      } else if (statusCode === '21') {
        resultLabel = 'Invoices.Status.REFUND_DECLINED';
      } else if (statusCode === '22') {
        resultLabel = 'Invoices.Status.PARITAL_REFUND_DECLINED';
      } else if (statusCode === '23') {
        resultLabel = 'Invoices.Status.Invoices_ANNULLED';
      }
    }
    return resultLabel;
  }


}
