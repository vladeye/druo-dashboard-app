import { Action } from '@ngrx/store';
import { type } from "../../../../../../shared/utility/utilityHelpers";
import { Invoice } from "../../../../../../shared/models/invoice.model";


export const InvoicesActionTypes = {
  LoadInvoices:         type('[Invoices] Load Invoices'),
  LoadInvoicesSuccess:  type('[Invoices] Load Invoices Success'),
  LoadInvoicesFail:     type('[Invoices] Load Invoices Fail'),
  CreateInvoice:        type('[Invoices] Create Invoice'),
  CreateInvoiceSuccess: type('[Invoices] Create Invoice Success'),
  CreateInvoiceFail: type('[Invoices] Create Invoice Fail')
};


export class LoadInvoices implements Action {
  readonly type = InvoicesActionTypes.LoadInvoices;

  constructor(public payload: any = null) { }
}

export class LoadInvoicesSuccess implements Action {
  readonly type = InvoicesActionTypes.LoadInvoicesSuccess;

  constructor(public payload: Array<Invoice>) { }
}

export class LoadInvoicesFail implements Action {
  readonly type = InvoicesActionTypes.LoadInvoicesFail;

  constructor(public payload: any = null) { }
}

export class CreateInvoice implements Action {
  readonly type = InvoicesActionTypes.CreateInvoice;
  constructor(public payload: any) {}
}

export class CreateInvoiceSuccess implements Action {
  readonly type = InvoicesActionTypes.CreateInvoiceSuccess;
  constructor(public payload: any) {}
}

export class CreateInvoiceFail implements Action {
  readonly type = InvoicesActionTypes.CreateInvoiceFail;
  constructor(public payload: any = null) {}
}


export type InvoicesActions = LoadInvoices |
                              LoadInvoicesSuccess |
                              LoadInvoicesFail |
                              CreateInvoice |
                              CreateInvoiceSuccess |
                              CreateInvoiceFail;
