import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDetailsComponent } from './invoice-details.component';
import { Store, StoreModule } from '@ngrx/store';
import {ReactiveFormsModule, FormsModule, FormBuilder} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {InvoicesApiClient} from "../invoicesApiClient.service";
import {InvoicesSandbox} from "../invoices.sandbox";

describe('InvoiceDetailsComponent', () => {
  let component: InvoiceDetailsComponent;
  let fixture: ComponentFixture<InvoiceDetailsComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({})
      ],
      declarations: [
        InvoiceDetailsComponent
      ],
      providers: [
        InvoicesSandbox,
        { provide: InvoicesApiClient, useClass: InvoicesApiClientStub },
        FormBuilder,
        Store
      ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceDetailsComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

});


export class InvoicesApiClientStub {

}
