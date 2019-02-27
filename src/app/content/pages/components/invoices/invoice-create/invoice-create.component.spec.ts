import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceCreateComponent } from './invoice-create.component';
import { FormsModule, ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { BrowserModule, By } from "@angular/platform-browser";
import { InvoicesSandbox } from "../invoices.sandbox";
import { Store } from '@ngrx/store';
import { StoreModule } from '@ngrx/store';
import { InvoicesApiClient } from "../invoicesApiClient.service";
import { DebugElement } from "@angular/core";
import * as fromRoot from '../../../../../shared/store';



/**
 * Unit test for InvoiceCreateComponent
 */
describe('InvoiceCreateComponent', () => {
  let component: InvoiceCreateComponent;
  let fixture: ComponentFixture<InvoiceCreateComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let store: Store<fromRoot.State>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({})
      ],
      declarations: [
        InvoiceCreateComponent
      ],
      providers: [
        InvoicesSandbox,
        { provide: InvoicesApiClient, useClass: InvoicesApiClientStub },
        FormBuilder,
        Store
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceCreateComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });
  /**
   * Test instance the component and check it's truthy
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test if the attribute title is 'Crear Factura'
   */
  it(`it should have as title 'Crear Factura'`, () => {
    expect(component.title).toEqual('Crear Factura');
  });

  /**
   * Test that onSubmit method shuldn't being called
   */
  it(`should call the onSubmit method`, () => {
    fixture.detectChanges();
    spyOn(component, 'onSubmit');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(0);
  });

  it(`form should be invalid`, () => {
    component.createInvoice.controls['customerEmail'].setValue('');
    component.createInvoice.controls['customerName'].setValue('');
    component.createInvoice.controls['invoiceNumber'].setValue('');
    expect(component.createInvoice.valid).toBeFalsy();
  });

  it(`form should be valid`, () => {
    component.createInvoice.controls['customerEmail'].setValue('asd@asd.com');
    component.createInvoice.controls['customerName'].setValue('aadaa');
    component.createInvoice.controls['invoiceNumber'].setValue('1-3115');
    expect(component.createInvoice.valid).toBeTruthy();
  });

});

export class InvoicesApiClientStub {

}
