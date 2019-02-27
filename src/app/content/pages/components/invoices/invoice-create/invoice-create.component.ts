import { Component, OnInit } from '@angular/core';
import { InvoicesSandbox } from "../invoices.sandbox";
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from "@angular/forms";
import { Invoice } from "../../../../../shared/models/invoice.model";
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.css']
})
export class InvoiceCreateComponent implements OnInit {

  title = 'Crear Factura';
  invoice: Invoice;
  createInvoiceForm: FormGroup;
  submitted = false;
  subTotalSum: number = 0;
  totalSum: number = 0;
  taxPercentage: number = 19;
  tax: number = 0;
  totalDiscount: number = 0;
  subTotalSumDiscount: number = 0;
  taxDiscount: number = 0;
  totalSumDiscount: number = 0;

  constructor(
    private invoicesSandbox: InvoicesSandbox,
    private currencyPipe: CurrencyPipe,
    private router: Router
  ) {
    this.invoice = new Invoice();
    this.createForm();
  }

  /**
   * Create validators to the create invoice form
   */
  createForm() {
    this.createInvoiceForm = new FormGroup({
      'customerName':  new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(100)
      ]),
      'emailset': new FormArray([
        new FormGroup({
          'customerEmail': new FormControl('', [
            Validators.required,
            Validators.email
          ])
        })
      ]),
      'invoiceNumber':  new FormControl('0000', [
        Validators.required,
        Validators.minLength(4)
      ]),
      'invoiceMessage': new FormControl(''),
      'conceptset': new FormArray([
        new FormGroup({
          'itemDescription': new FormControl('', [
            Validators.required,
            Validators.minLength(1)
          ]),
          'itemUnitPrice': new FormControl('', [
            Validators.required
          ]),
          'itemQty': new FormControl(1, [
            Validators.required
          ]),
          'itemTotalPrice': new FormControl({value: '', disabled: true})
        })
      ]),
      'discountset': new FormArray([
      ]),
      'subTotalAmount': new FormControl(''),
      'tax': new FormControl(''),
      'totalAmount': new FormControl('')
    });

  }

  ngOnInit() {
    // initialize stream on units
    const conceptsetValueChanges$ = this.createInvoiceForm.controls['conceptset'].valueChanges;
    conceptsetValueChanges$.subscribe(conceptset => this.updateItemTotalPrice(conceptset));
    const discountsetValueChanges$ = this.createInvoiceForm.controls['discountset'].valueChanges;
    discountsetValueChanges$.subscribe(discountset => this.updateDiscountTotalPrice(discountset));

  }

  initEmail() {
    return new FormGroup({
      'customerEmail': new FormControl('', [
        Validators.required,
        Validators.email
      ])
    });
  }

  addEmail() {
    const control = <FormArray>this.createInvoiceForm.controls['emailset'];
    control.push(this.initEmail());
  }

  removeEmail(i: number) {
    const control = <FormArray>this.createInvoiceForm.controls['emailset'];
    control.removeAt(i);
  }

  initConcept() {
    return new FormGroup({
      'itemDescription': new FormControl('', [
        Validators.required,
        Validators.minLength(1)
      ]),
      'itemUnitPrice': new FormControl('', [
        Validators.required
      ]),
      'itemQty': new FormControl(1, [
        Validators.required
      ]),
      'itemTotalPrice': new FormControl({value: '', disabled: true})
    });
  }

  addConcept() {
    const control = <FormArray>this.createInvoiceForm.controls['conceptset'];
    control.push(this.initConcept());
  }

  removeConcept(i: number) {
    const control = <FormArray>this.createInvoiceForm.controls['conceptset'];
    control.removeAt(i);
  }

  initDiscount() {
    return new FormGroup({
      'discountDescription': new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      'discountValue': new FormControl('', [
        Validators.required
      ])
    });
  }

  addDiscount() {
    const control = <FormArray>this.createInvoiceForm.controls['discountset'];
    control.push(this.initDiscount());
  }

  removeDiscount(i: number) {
    const control = <FormArray>this.createInvoiceForm.controls['discountset'];
    control.removeAt(i);
  }

  private updateItemTotalPrice(conceptset: any) {
    // get our conceptset group controll
    const control = <FormArray>this.createInvoiceForm.controls['conceptset'];
    const totalControl = <FormGroup>this.createInvoiceForm;

    // before recount total price need to be reset.
    this.subTotalSum = 0;
    for (let i in conceptset) {
      let valueNum: string = "";
      conceptset[i].itemUnitPrice.split('').map(letter=> {
        if(!isNaN(letter)){
          valueNum += letter;
        }
      });
      conceptset[i].itemUnitPrice = valueNum;

      let itemTotalPrice = (conceptset[i].itemQty*conceptset[i].itemUnitPrice);
      // now format total price with angular currency pipe
      let itemTotalPriceFormatted = this.currencyPipe.transform(itemTotalPrice, 'COP', 'symbol-narrow', '1.0');
      // update total sum field on conceptset and do not emit event myFormValueChanges$ in this case on conceptset
      control.at(+i).get('itemTotalPrice').setValue(itemTotalPriceFormatted, {onlySelf: true, emitEvent: false});
      // update total price for all conceptset
      this.subTotalSum += itemTotalPrice;
      this.tax = this.subTotalSum * (this.taxPercentage / 100);
      this.totalSum = this.subTotalSum + this.tax;
      let itemTotalAmountFormatted = this.currencyPipe.transform(this.subTotalSum, 'COP', 'symbol-narrow', '1.0');
      totalControl.get('subTotalAmount').setValue(this.subTotalSum, {onlySelf: true, emitEvent: false});
      totalControl.get('tax').setValue(this.tax, {onlySelf: true, emitEvent: false});
      totalControl.get('totalAmount').setValue(this.totalSum, {onlySelf: true, emitEvent: false});

    }
  }

  private currencyInputChanged(event: any){
    let itemPriceFormatted: string = "";
    let valueTemp: any;
    valueTemp = event.target.value.replace(/[$,]/g, "");

    if(isNaN(valueTemp)){
      let valueNum: string = "";
      valueTemp.split('').map(letter=> {
        if(!isNaN(letter)){
          valueNum += letter;
        }
      });
      valueTemp = valueNum;
      if(valueTemp.length === 0){
        valueTemp = "0";
      }
    }

    itemPriceFormatted = this.currencyPipe.transform(Number(valueTemp), 'COP', 'symbol-narrow', '1.0');
    event.target.value = itemPriceFormatted;
  }




  private updateDiscountTotalPrice(discountset: any) {
    // get our discountset group controll
    const totalControl = <FormGroup>this.createInvoiceForm;


    this.totalDiscount = 0;
    for(let h in discountset){
      this.totalDiscount += discountset[h].discountValue;
    }
    if(this.totalDiscount <= 100){
      this.subTotalSumDiscount = this.subTotalSum * (this.totalDiscount / 100);
      this.taxDiscount = this.tax * (this.totalDiscount / 100);
      this.totalSumDiscount = this.totalSum * (this.totalDiscount / 100);
      totalControl.get('subTotalAmount').setValue(this.subTotalSum - this.subTotalSumDiscount, {onlySelf: true, emitEvent: false});
      totalControl.get('tax').setValue(this.tax - this.taxDiscount, {onlySelf: true, emitEvent: false});
      totalControl.get('totalAmount').setValue(this.totalSum - this.totalSumDiscount, {onlySelf: true, emitEvent: false});
    }

  }

  onSubmit(): void {
    this.submitted = true;
  }
  save(model: any, isValid: boolean, e: any) {
    e.preventDefault();
    this.invoicesSandbox.createInvoice(model);
    this.invoicesSandbox.currenntInvoiceId$
      .subscribe(selectedInvoiceId => {
        if (selectedInvoiceId !== undefined) {
          const pathIn = '/home/invoices/' + selectedInvoiceId + '/confirmation';
          this.router.navigate([pathIn])
        }
      });
    //alert('Form data are: '+JSON.stringify(model));
  }
}
