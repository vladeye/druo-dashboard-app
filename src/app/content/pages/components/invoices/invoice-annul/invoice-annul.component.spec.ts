import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceAnnulComponent } from './invoice-annul.component';

describe('InvoiceAnnulComponent', () => {
  let component: InvoiceAnnulComponent;
  let fixture: ComponentFixture<InvoiceAnnulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceAnnulComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceAnnulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
