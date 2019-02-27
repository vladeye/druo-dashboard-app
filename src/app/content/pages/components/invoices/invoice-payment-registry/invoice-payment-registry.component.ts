import { Component, OnInit } from '@angular/core';
import {ConfirmDialogService} from "../../../../../shared/services/confirm-dialog/confirm-dialog.service";

@Component({
  selector: 'invoice-payment-registry',
  templateUrl: 'invoice-payment-registry.component.html',
  styleUrls: ['invoice-payment-registry.component.css']
})
export class InvoicePaymentRegistryComponent implements OnInit {

  constructor(
    private dialogsService: ConfirmDialogService
  ) { }

  openConfirmation(){
    this.dialogsService
      .confirm(
        '¡Pago registrado con éxito!',
        'Has registrado el pago con referencia: 9303940384 a esta factura. ' +
        'Los estados de pago de esta factura han sido actualizado.',
        'Ver factura'
      )
      .subscribe((res) => {
        console.log(`We've annulled your invoice`);
      })
  }

  ngOnInit() {
  }

}
