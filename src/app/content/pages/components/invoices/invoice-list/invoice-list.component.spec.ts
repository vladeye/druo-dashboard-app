import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceListComponent } from './invoice-list.component';
import { Store, StoreModule } from '@ngrx/store';
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {async} from "@angular/core/testing";
import {DebugElement, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {MaterialCommonModule} from "../../../../../shared/material/material-common.module";
import {RouterTestingModule} from "@angular/router/testing";
import {InvoicesSandbox} from "../invoices.sandbox";
import {InvoicesApiClient} from "../invoicesApiClient.service";

describe('InvoiceListComponent', () => {
  let component: InvoiceListComponent;
  let fixture: ComponentFixture<InvoiceListComponent>;
  let store: Store<any>;
  let de: DebugElement;
  let el: HTMLElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InvoiceListComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialCommonModule,
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      providers: [
        InvoicesSandbox,
        { provide: InvoicesApiClient, useClass: InvoicesApiClientStub }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents().then(() => {
      /*
       * Create the fixture of the component
       */

      fixture = TestBed.createComponent(InvoiceListComponent);

      component = fixture.componentInstance;


      //de = fixture.debugElement.query(By.css('form'));
      //el = de.nativeElement;

      store = TestBed.get(Store);

      //spyOn(store, 'dispatch').and.callThrough();
      //fixture.detectChanges();

    });
  }));


});

let translations: any = {"CARDS_TITLE": "This is a test"};

export class InvoicesApiClientStub {

}
