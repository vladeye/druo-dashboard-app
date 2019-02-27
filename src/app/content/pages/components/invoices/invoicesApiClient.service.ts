import { Injectable }       from '@angular/core';
import {
  HttpService,
  GET,
  Path,
  Adapter
}                           from '../../../../shared/asyncServices/http';
import { Observable, throwError }       from 'rxjs';
import { InvoicesService }  from './invoices.service';



import { environment } from "../../../../../environments/environment";

const API_URL = environment.apiUrl;

@Injectable()
export class InvoicesApiClient extends HttpService {

  /**
   * Retrieves all invoices
   */
  @GET("/invoice")
  @Adapter(InvoicesService.gridAdapter)
  public getInvoices(): Observable<any> { return null; };
  //public getInvoices(): Observable<any> {
  //  return this.http.get<Invoice[]>(API_URL + '/invoice')
  //    .pipe(
  //      catchError(this.handleError)
  //    );
  //}
  /**
   * Retrieves invoice details by a given id
   *
   * @param id
   */
  @GET("/invoice/{id}")
  @Adapter(InvoicesService.invoiceDetailsAdapter)
  public getInvoiceDetails(@Path("id") id: number): Observable<any> { return null; };


}
