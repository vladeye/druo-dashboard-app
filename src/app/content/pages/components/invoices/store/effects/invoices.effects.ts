import { Injectable }               from '@angular/core';
import { Actions, Effect, ofType }  from '@ngrx/effects';
import { HttpClient }               from "@angular/common/http";
import {
  map,
  switchMap,
  catchError, exhaustMap
}                                   from "rxjs/internal/operators";
import * as invoicesActions          from '../actions/invoices.actions';
import {of, Observable}                       from "rxjs";
import {Action} from "@ngrx/store";
import {Invoicem} from "../../../../../../shared/models/invoicem.model";

@Injectable()
export class InvoicesEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}


  @Effect()
  loadInvoices$: Observable<Action> =  this.actions$.pipe(
    ofType(invoicesActions.InvoicesActionTypes.LoadInvoices),
    exhaustMap(() => (
      this.http.get<any>(`http://13.58.146.100:3000/invoices?_sort=id&_order=DESC`)
          .pipe(
            map(response =>
              (new invoicesActions.LoadInvoicesSuccess(response))
            ),
            catchError(error  => of(new invoicesActions.LoadInvoicesFail()))
          )
      )));


  @Effect()
  createInvoice$: Observable<Action> = this.actions$.pipe(
    ofType(invoicesActions.InvoicesActionTypes.CreateInvoice),
    exhaustMap((invoice: invoicesActions.CreateInvoice) => (
      this.http.post<any>(`http://13.58.146.100:3000/invoices/`, invoice.payload)
        .pipe(
          map(createdInvoice =>
            (new invoicesActions.CreateInvoiceSuccess(createdInvoice))
          ),
          catchError(error => of(new invoicesActions.CreateInvoiceFail()))
         )
    )));

}
