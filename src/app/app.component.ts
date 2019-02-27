import {
  Component,
  HostBinding,
  Input,
  AfterViewInit,
  OnInit,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';

import { AppSandbox } from "./app.sandbox";
import * as objectPath from 'object-path';
import { DomSanitizer } from "@angular/platform-browser";
import { LayoutConfigService } from "./core/services/layout-config.service";
import { ClassInitService } from "./core/services/class-init.service";
import {AuthService} from "./auth/auth.service";
import { Router, NavigationEnd } from '@angular/router';
import { filter } from "rxjs/operators";
import { PageConfigService } from "./core/services/page-config.service";
import { SplashScreenService } from "./core/services/splash-screen.service";

@Component({
  selector: 'body[m-root]',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [AppSandbox],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit, OnInit {

  @Input() attributes: any;

  @HostBinding('style') style: any;
  @HostBinding('class') classes: any = '';

  @ViewChild('splashScreen', { read: ElementRef })
  splashScreen: ElementRef;

  constructor(
      public appSandbox: AppSandbox,
      private layoutConfigService: LayoutConfigService,
      private classInitService: ClassInitService,
      private sanitizer: DomSanitizer,
      private router: Router,
      private pageConfigService: PageConfigService,
      private splashScreenService: SplashScreenService,
      public auth: AuthService
  ){
    //Handle authentication components
    auth.handleAuthentication();
    // subscribe to class update event
    this.classInitService.onClassesUpdated$.subscribe(classes => {
      // get body class array, join as string classes and pass to host binding class
      setTimeout(() => this.classes = classes.body.join(' '));
    });

    // subscribe to atrribute update event
    this.classInitService.onAttributeUpdated$.subscribe(attributes => {
      this.attributes = attributes.body;
      // TODO: print attribute to body
    });

    this.layoutConfigService.onLayoutConfigUpdated$.subscribe(model => {
      this.classInitService.setConfig(model);

      this.style = '';
      if (objectPath.get(model.config, 'self.layout') === 'boxed') {
        const backgroundImage = objectPath.get(model.config, 'self.background');
        if (backgroundImage) {
          this.style = this.sanitizer.bypassSecurityTrustStyle('background-image: url(' + objectPath.get(model.config, 'self.background') + ')');
        }
      }
    });

    // override config by router change from pages config
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        this.layoutConfigService.setModel({page: objectPath.get(this.pageConfigService.getCurrentPageConfig(), 'config')}, true);
      });
  }

  ngOnInit(){
    this.appSandbox.setupLanguage();
  }

  ngAfterViewInit(): void {
    if (this.splashScreen) {
      this.splashScreenService.init(this.splashScreen.nativeElement);
    }
  }
}
