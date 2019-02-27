import {Component, OnInit, Inject} from '@angular/core';
import {InvoicesSandbox} from "../invoices.sandbox";
import { ActivatedRoute } from "@angular/router";
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'invoice-confirm',
  templateUrl: './invoice-confirm.component.html',
  styleUrls: ['./invoice-confirm.component.css']
})
export class InvoiceConfirmComponent implements OnInit {

  private invoiceId: string;

  constructor(
    private invoicesSandbox: InvoicesSandbox,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: any
  ) {
    this.invoiceId = this.route.snapshot.paramMap.get("invoiceId");
  }

  ngOnInit() {
  }

  private paymentMethod(){
    this.document.location.href = 'https://pay.druo.com/payment/' + this.invoiceId + '/details';
  }

}
