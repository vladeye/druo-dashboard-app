import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'auth',
  template: '<h1></h1>'
})
export class AuthComponent {

  constructor(private authService: AuthService) {
    this.authService.login();
  }

}
