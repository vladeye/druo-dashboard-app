import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceGenerateRefundComponent } from './invoice-generate-refund.component';

describe('InvoiceGenerateRefundComponent', () => {
  let component: InvoiceGenerateRefundComponent;
  let fixture: ComponentFixture<InvoiceGenerateRefundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceGenerateRefundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceGenerateRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
