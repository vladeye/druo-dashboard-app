import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import {
  NgModule
} from '@angular/core';
import {
  HttpClientModule,
  HttpClient
} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers, CustomSerializer } from './shared/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

//Third party libraries
import { GestureConfig, MatProgressSpinnerModule } from '@angular/material';
import {
  SimpleNotificationsModule,
  NotificationsService
} from 'angular2-notifications';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';


//Services
import { SubheaderService } from "./core/services/layout/subheader.service";
import { PageConfigService } from "./core/services/page-config.service";
import { MessengerService } from "./core/services/messenger.service";
import { LayoutRefService } from "./core/services/layout/layout-ref.service";
import { MenuAsideService } from "./core/services/layout/menu-aside.service";
import { MenuHorizontalService } from "./core/services/layout/menu-horizontal.service";
import { MenuConfigService } from "./core/services/menu-config.service";
import { HeaderService } from "./core/services/layout/header.service";
import { ClassInitService } from "./core/services/class-init.service";
import { UtilsService } from "./core/services/utils.service";
import { QuickSearchService } from "./core/services/quick-search.service";
import { LogsService } from "./core/services/logs.service";
import { LayoutConfigStorageService } from "./core/services/layout-config-storage.service";
import { LayoutConfigService } from "./core/services/layout-config.service";
import { SplashScreenService } from "./core/services/splash-screen.service";
import { ConfirmDialogService } from "./shared/services/confirm-dialog/confirm-dialog.service";


import 'hammerjs';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

//Modules
import { LayoutModule } from "./content/layout/layout.module";
import { PartialsModule } from "./content/partials/partials.module";
import { HttpServiceModule } from "./shared/asyncServices/http/http.module";
import { ClipboardService } from "./core/services/clipboard.sevice";
import { RouterStateSerializer, StoreRouterConnectingModule } from "@ngrx/router-store";
import { AuthComponent } from './auth/auth/auth.component';
import { CallbackComponent } from './auth/callback/callback.component';
import { ConfirmDialogComponent } from "./shared/components/confirm-dialog/confirm-dialog.component";
import { MaterialCommonModule } from "./shared/material/material-common.module";


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  // suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CallbackComponent,
    ConfirmDialogComponent
  ],
  imports: [
    // Angular core dependencies
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    LayoutModule,
    PartialsModule,
    MaterialCommonModule,

    // Third party modules
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),

    !environment.production ? StoreDevtoolsModule.instrument() : [],

    SimpleNotificationsModule.forRoot(),
    NgbModule.forRoot(),
    MatProgressSpinnerModule,
    PerfectScrollbarModule,

    // App custom dependencies
    HttpServiceModule.forRoot(),
    StoreRouterConnectingModule
  ],
  exports: [
    ConfirmDialogComponent
  ],
  providers: [
    LayoutConfigService,
    LayoutConfigStorageService,
    LogsService,
    QuickSearchService,
    UtilsService,
    ClassInitService,
    ClipboardService,
    HeaderService,
    MenuConfigService,
    MenuHorizontalService,
    MenuAsideService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: GestureConfig
    },
    LayoutRefService,
    MessengerService,
    PageConfigService,
    SplashScreenService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    SubheaderService,
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    ConfirmDialogService
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
