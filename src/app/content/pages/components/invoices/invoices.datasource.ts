import { MatTableDataSource } from "@angular/material";
import { Observable, BehaviorSubject } from "rxjs";
import { IInvoice } from "../../../../shared/models/interfaces/invoice.moldel";
import { CollectionViewer, DataSource } from '@angular/cdk/collections'




export class InvoicesDatasource extends MatTableDataSource<IInvoice> {
  public constructor(private invoices$: Observable<IInvoice[]>) {
    super()
  }

  public connect(): BehaviorSubject<IInvoice[]> {
    const ELEMENT_DATA: IInvoice[] = [];
    let bSubject = new BehaviorSubject<IInvoice[]>(ELEMENT_DATA);
    this.invoices$.subscribe(bSubject);   // .do(console.log.bind(console))
    return bSubject;
  }

  public disconnect(): void {
  }
}
