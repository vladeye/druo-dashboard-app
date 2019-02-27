import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicePaymentRegistryComponent } from './invoice-payment-registry.component';

describe('InvoicePaymentRegistryComponent', () => {
  let component: InvoicePaymentRegistryComponent;
  let fixture: ComponentFixture<InvoicePaymentRegistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicePaymentRegistryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicePaymentRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
