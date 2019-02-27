import {
  Injectable,
  Inject,
  forwardRef
}                           from '@angular/core';
import { Invoice } from "../../../../shared/models/invoice.model";
import { InvoicesSandbox }  from './invoices.sandbox';


@Injectable()
export class InvoicesService {

  private InvoicesSubscription;

  /**
   * Transforms grid data invoices recieved from the API into array of 'Invoice' instances
   *
   * @param Invoices
   */
  static gridAdapter(invoices: any): Array<Invoice> {
    return invoices.map(invoice => new Invoice(invoice));
  }

  /**
   * Transforms invoice details recieved from the API into instance of 'Invoice'
   *
   * @param invoice
   */
  static invoiceDetailsAdapter(invoice: any): Invoice {
    return new Invoice(invoice);
  }
}
