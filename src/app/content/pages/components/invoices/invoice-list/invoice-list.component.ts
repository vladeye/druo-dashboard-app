import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { InvoicesSandbox } from "../invoices.sandbox";
import {Invoice} from "../../../../../shared/models/invoice.model";
import {IInvoice} from "../../../../../shared/models/interfaces/invoice.moldel";
import {TranslateService} from "@ngx-translate/core";
import { noop as _noop } from 'lodash';



@Component({
  selector: 'm-material-table',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['invoice-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceListComponent implements OnInit {

  displayedColumns = ['id', 'status', 'due_date', 'date', 'customer_name','total_amount','type','actions','details'];
  dataSource: MatTableDataSource<IInvoice[]>;
  test: any;
  limit: number = 1000;
  full: boolean = true;
  invoices: IInvoice[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private invoicesSandbox: InvoicesSandbox,
    public translate: TranslateService
  ) {

    //this.dataSource = new MatTableDataSource(this.invoicesSandbox.invoices$);
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
  //  this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    console.log(filterValue);
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  handleScroll = (scrolled: boolean) => {
    console.timeEnd('lastScrolled');
    scrolled ? this.getData() : _noop();
    console.time('lastScrolled');
  }
  hasMore = () => !this.dataSource || this.dataSource.data.length < this.limit;

  getData() {
    const data: any = this.dataSource
      ? [...this.dataSource.data, ...this.invoices]
      : this.invoices;
    this.dataSource = new MatTableDataSource(data);
    //this.dataSource.sort = this.sort;
  }
  ngOnInit(){
    this.invoicesSandbox.invoices$
      .subscribe(invoices => {
        this.invoices = invoices;
        this.getData();
        //this.dataSource = new MatTableDataSource(invoices);
      })
  }


  /**
   * Set the text color of the invoice status
   * @param: statusCode: string: its the status code comming from the backend
   */

  setColorStatus(statusCode: string){
    let resultColor:string = '#2f2f2f';

    if((statusCode !== undefined) && (statusCode !== '') && (statusCode !== null)){
      if(statusCode === '11'){
        resultColor = '#008023';
      } else if(statusCode === '10'){
        resultColor = '#C30000';
      } else if(statusCode === '12'){
        resultColor = '#8c5000';
      }
    }
    return resultColor;
  }


  /**
   * Set the background color of the invoice status
   * @param: statusCode: string: its the status code comming from the backend
   */
  setBackgroundColorStatus(statusCode: string){
    let resultBGColor = '#ffffff';
    if((statusCode !== undefined) && (statusCode !== '') && (statusCode !== null)){
      if(statusCode === '11'){
        resultBGColor = '#e6f9eb';
      } else if(statusCode === '10'){
        resultBGColor = '#f9d4d4';
      } else if(statusCode === '12'){
        resultBGColor = '#fff1d6';
      }
    }
    return resultBGColor;
  }

  /**
   * Set the label for the traslation of the invoice status
   * @param: statusCode: string: its the status code comming from the backend
   */

  setTranslateLabelStatus(statusCode: string){
    let resultLabel:string = 'Invoices.Status.NA';

    if((statusCode !== undefined) && (statusCode !== '') && (statusCode !== null)){
      if(statusCode === '1'){
        resultLabel = 'Invoices.Status.DRAFT';
      } else if(statusCode === '2'){
        resultLabel = 'Invoices.Status.CREATED';
      } else if(statusCode === '3'){
        resultLabel = 'Invoices.Status.SENT';
      } else if(statusCode === '4'){
        resultLabel = 'Invoices.Status.DELIVERED';
      } else if(statusCode === '5'){
        resultLabel = 'Invoices.Status.DELIVERY_FAILED';
      } else if(statusCode === '6'){
        resultLabel = 'Invoices.Status.MARKED_AS_SPAM';
      } else if(statusCode === '7'){
        resultLabel = 'Invoices.Status.OPENED';
      } else if(statusCode === '8'){
        resultLabel = 'Invoices.Status.CLICKED';
      } else if(statusCode === '9'){
        resultLabel = 'Invoices.Status.REMINDER_SENT';
      } else if(statusCode === '10'){
        resultLabel = 'Invoices.Status.INVOICE_OVERDUE';
      } else if(statusCode === '11'){
        resultLabel = 'Invoices.Status.PAID';
      } else if(statusCode === '12'){
        resultLabel = 'Invoices.Status.PARTIAL_PAYMENT';
      } else if(statusCode === '13'){
        resultLabel = 'Invoices.Status.PAYMENT_PROCESSING';
      } else if(statusCode === '14'){
        resultLabel = 'Invoices.Status.PARTIAL_PAYMENT_PROCESSING';
      } else if(statusCode === '15'){
        resultLabel = 'Invoices.Status.PAYMENT_DECLINED';
      } else if(statusCode === '16'){
        resultLabel = 'Invoices.Status.PARTIAL_PAYMENT_DECLINED';
      } else if(statusCode === '17'){
        resultLabel = 'Invoices.Status.REFUND_REQUESTED';
      } else if(statusCode === '18'){
        resultLabel = 'Invoices.Status.PARTIAL_REFUND_REQUESTED';
      } else if(statusCode === '19'){
        resultLabel = 'Invoices.Status.REFUND_PROCESSED';
      } else if(statusCode === '20'){
        resultLabel = 'Invoices.Status.PARTIAL_REFUND_PROCESSED';
      } else if(statusCode === '21'){
        resultLabel = 'Invoices.Status.REFUND_DECLINED';
      } else if(statusCode === '22'){
        resultLabel = 'Invoices.Status.PARITAL_REFUND_DECLINED';
      } else if(statusCode === '23'){
        resultLabel = 'Invoices.Status.Invoices_ANNULLED';
      }
    }
    return resultLabel;
  }


}
