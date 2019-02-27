import { Injectable }             from "@angular/core";
import { Store, select }          from '@ngrx/store';
import {
  Subscription,
  Observable
}                                 from "rxjs";
import { Sandbox } 			          from '../../../../shared/sandbox/base.sandbox';
import { InvoicesApiClient }      from './invoicesApiClient.service';
import * as invoicesActions       from './store/actions/invoices.actions';
import { Invoice }                from '../../../../shared/models';
import * as fromRoot              from '../../../../shared/store';
import * as fromStore             from './store';
import { IInvoice } from "../../../../shared/models/interfaces/invoice.moldel";
import { MatTableDataSource } from "@angular/material";
import { InvoicesDatasource } from "./invoices.datasource";
import {Invoicem} from "../../../../shared/models/invoicem.model";
import * as moment from 'moment-timezone';




@Injectable()
export class InvoicesSandbox extends Sandbox {

  public invoices$              = this.appState$.pipe(select(fromStore.getAllInvoices));
  public invoicesLoading$       = this.appState$.pipe(select(fromStore.getInvoicesLoading));
  public invoicesLoaded$        = this.appState$.pipe(select(fromStore.getInvoicesLoaded));
  public invoiceDetails$        = this.appState$.pipe(select(fromStore.getCurrentInvoice));
  public currenntInvoiceId$     = this.appState$.pipe(select(fromStore.getCurrentInvoiceId));
  public maxValueInvoice$       = this.appState$.pipe(select(fromStore.getMaxValueInvoice));

  public dataSource: InvoicesDatasource;

  //public loggedUser$            = this.appState$.pipe(select(store.getLoggedUser));

  private subscriptions: Array<Subscription> = [];



  constructor(
    protected appState$: Store<fromRoot.State>,
    private invoicesApiClient: InvoicesApiClient
  ) {
    super(appState$);
    this.dataSource = new InvoicesDatasource(this.invoices$);
    this.registerEvents();
  }

  /**
   * Loads invoices from the server
   */
  public loadInvoices(): void {
    this.appState$.dispatch(new invoicesActions.LoadInvoices());
  }
  /**
   * Create a new invoice
   * @param: invoice: the invoice to be created
   */
  public createInvoice(invoice: Invoicem) {
    let randomNumber = Math.floor(Math.random() * 3);
    let randomNumberBank = Math.floor(Math.random() * 4);
    let status: string = '10';
    let paymentMethod: string = '';
    if (randomNumber === 0){
      status = '10';
    } else if(randomNumber === 1){
      status = '11';
    } else if(randomNumber === 2){
      status = '12';
    }
    invoice.statusCode = status;

    if(randomNumberBank === 0){
      paymentMethod = "Tarjeta Visa *1519";
    } else if(randomNumberBank === 1){
      paymentMethod = "Tarjeta Master *5128";
    } else if(randomNumberBank === 2){
      paymentMethod = "Tarjeta Amex *1951";
    } else {
      paymentMethod = "Consignación Bancaria";
    }

    moment.tz.setDefault('America/Bogota');

    invoice.createDate = moment();
    invoice.dueDate = moment().add("days",30);

    this.appState$.dispatch(new invoicesActions.CreateInvoice(invoice));
  }


  /**
   * Unsubscribes from events
   */
  public unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Subscribes to events
   */
  private registerEvents(): void {
    // Subscribes to culture
    this.subscriptions.push(this.culture$.subscribe((culture: string) => this.culture = culture));

    this.subscriptions.push(this.invoices$.subscribe(() => this.loadInvoices()));

    //this.subscriptions.push(this.loggedUser$.subscribe((user: User) => {
    //  if (user.isLoggedIn) this.loadInvoices();
    //}))
  }
}
