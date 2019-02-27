import { Injectable }       from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
}                           from '@angular/router';
import { InvoicesSandbox }  from './invoices.sandbox';

@Injectable()
export class InvoicesResolver implements Resolve<any> {

  private invoicesSubscription;

  constructor(public invoicesSandbox: InvoicesSandbox) {}

  /**
   * Triggered when application hits invoice details route.
   * It subscribes to product list data and finds one with id from the route params.
   *
   * @param route
   */
  public resolve(route: ActivatedRouteSnapshot) {
    if (this.invoicesSubscription) return;

  //  this.invoicesSubscription = this.invoicesSandbox.invoiceDetails$.subscribe(invoice => {
  //    if (!invoice) {
        //this.invoicesSandbox.loadInvoiceDetails(parseInt(route.params.id));
  //      return;
  //    }

  //    this.invoicesSandbox.selectInvoice(invoice);
  //  });
  }
}
