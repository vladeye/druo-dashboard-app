import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesComponent } from './pages.component';
import { HeaderComponent } from "../layout/header/header.component";
import { CoreModule } from "../../core/core.module";
import {LayoutModule} from "../layout/layout.module";
import {RouterModule} from "@angular/router";
import {PartialsModule} from "../partials/partials.module";
import {LayoutConfigService} from "../../core/services/layout-config.service";
import {RouterTestingModule} from "@angular/router/testing";
import {UtilsService} from "../../core/services/utils.service";
import {LayoutConfigStorageService} from "../../core/services/layout-config-storage.service";
import {LayoutConfig} from "../../config/layout";
import {Observable, BehaviorSubject} from "rxjs";
import {ClassInitService} from "../../core/services/class-init.service";
import {LayoutRefService} from "../../core/services/layout/layout-ref.service";
import {AnimationBuilder} from "@angular/animations";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TranslateService} from "@ngx-translate/core";
import {TranslationService} from "../../core/services/translation.service";
import {HeaderService} from "../../core/services/layout/header.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MenuAsideService} from "../../core/services/layout/menu-aside.service";
import {MenuConfigService} from "../../core/services/menu-config.service";
import {MenuHorizontalService} from "../../core/services/layout/menu-horizontal.service";
import {MessengerService} from "../../core/services/messenger.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('PagesComponent', () => {
  let component: PagesComponent;
  let fixture: ComponentFixture<PagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        LayoutModule,
        PartialsModule,
        RouterModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        NgbModule.forRoot(),
        HttpClientTestingModule
      ],
      declarations: [
        PagesComponent
      ],
      providers: [
        LayoutConfigService,
        { provide: UtilsService, useClass: UtilsServiceStub },
        { provide: LayoutConfigStorageService, useClass: LayoutConfigStorageServiceStub },
        { provide: ClassInitService, useClass: ClassInitServiceStub },
        { provide: LayoutRefService, useClass: LayoutRefServiceStub },
        { provide: TranslationService, useClass: TranslationServiceStub },
        HeaderService,
        MenuAsideService,
        MenuConfigService,
        MenuHorizontalService,
        MessengerService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

export class UtilsServiceStub {}

export class LayoutConfigStorageServiceStub {
  public loadConfig(): Observable<LayoutConfig>;
  public saveConfig(layoutConfig: LayoutConfig): void;
}

export class ClassInitServiceStub {
  public classes: any = {};
  public attributes: any = {};

  public onClassesUpdated$: BehaviorSubject<any>;
  public onAttributeUpdated$: BehaviorSubject<any>;

  constructor() {
    // scope list of classes
    this.classes = {
      body: [],
      brand: [],
      header: [],
      header_menu: [],
      header_menu_nav: [],
      header_menu_close: [],
      aside_menu: [],
      aside_menu_nav: [],
      aside_left: [],
      aside_left_close: []
    };
    // scope list of attributes
    this.attributes = {
      body: {},
      header: {},
      aside_menu: {}
    };

    this.onClassesUpdated$ = new BehaviorSubject(this.classes);
    this.onAttributeUpdated$ = new BehaviorSubject(this.attributes);
  }

}

export class LayoutRefServiceStub {
  public addElement(name, element) {}
}

export class TranslationServiceStub {
}

