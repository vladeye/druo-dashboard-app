import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceListComponent } from "./invoice-list/invoice-list.component";
import { InvoiceDetailsComponent } from "./invoice-details/invoice-details.component";
import { InvoiceCreateComponent } from "./invoice-create/invoice-create.component";
import {InvoiceConfirmComponent} from "./invoice-confirm/invoice-confirm.component";

const routes: Routes = [
  {
    path: '',
    component: InvoiceListComponent
  },
  {
    path: ':invoiceId/detail',
    component: InvoiceDetailsComponent
  },
  {
    path: ':invoiceId/confirmation',
    component: InvoiceConfirmComponent
  },  {
    path: 'create',
    component: InvoiceCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
