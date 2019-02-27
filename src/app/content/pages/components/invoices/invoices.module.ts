import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromInvoices from './store';
import { EffectsModule } from '@ngrx/effects';
import { InvoicesEffects } from './store/effects/invoices.effects';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { InvoicesResolver } from "./invoices.resolver";
import { InvoicesApiClient } from "./invoicesApiClient.service";
import { InvoicesService } from "./invoices.service";
import { InvoicesSandbox } from "./invoices.sandbox";
import { MaterialPreviewModule } from "../../../partials/content/general/material-preview/material-preivew.module";
import { MaterialCommonModule } from "../../../../shared/material/material-common.module";
import { InvoiceCreateComponent } from './invoice-create/invoice-create.component';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollContainerComponent } from "../../../../shared/components/scroll-container/scroll-container.component";
import { CurrencyPipe } from '@angular/common';
import { InvoiceConfirmComponent } from './invoice-confirm/invoice-confirm.component';
import { InvoicePaymentRegistryComponent } from './invoice-payment-registry/invoice-payment-registry.component';
import { InvoiceAnnulComponent } from './invoice-annul/invoice-annul.component';
import { InvoiceGenerateRefundComponent } from './invoice-generate-refund/invoice-generate-refund.component';

@NgModule({
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    MaterialPreviewModule,
    StoreModule.forFeature('allinvoices', fromInvoices.reducers),
    EffectsModule.forFeature([InvoicesEffects]),
    MaterialCommonModule,
    TranslateModule
  ],
  declarations: [
    InvoiceListComponent,
    InvoiceDetailsComponent,
    InvoiceCreateComponent,
    ScrollContainerComponent,
    InvoiceConfirmComponent,
    InvoicePaymentRegistryComponent,
    InvoiceAnnulComponent,
    InvoiceGenerateRefundComponent
  ],
  providers: [
    InvoicesSandbox,
    InvoicesService,
    InvoicesApiClient,
    InvoicesResolver,
    CurrencyPipe
  ],
  entryComponents: [
    InvoicePaymentRegistryComponent,
    InvoiceAnnulComponent,
    InvoiceGenerateRefundComponent
  ]
})
export class InvoicesModule { }
