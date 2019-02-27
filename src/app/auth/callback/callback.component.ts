import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'callback',
  templateUrl: './callback.component.html'
})
export class CallbackComponent {

  constructor(private router: Router) {
    this.router.navigate(['/home']);
  }


}
