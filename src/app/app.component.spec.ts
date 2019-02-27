import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppSandbox } from "./app.sandbox";
import { LayoutConfigService } from "./core/services/layout-config.service";
import { ClassInitService } from "./core/services/class-init.service";
import { DomSanitizer } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Store } from '@ngrx/store';
import { StoreModule } from '@ngrx/store';
import { TranslateService } from "@ngx-translate/core";
import {Observable, BehaviorSubject, of} from "rxjs";
import { UtilsService } from "./core/services/utils.service";
import {LayoutConfig} from "./config/layout";
import {Router, NavigationEnd, Scroll} from "@angular/router";
import {LayoutConfigStorageService} from "./core/services/layout-config-storage.service";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({})
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        AppSandbox,
        { provide: TranslateService, useClass: TranslateServiceStub },
        LayoutConfigService,
        { provide: Router, useValue: mockRouter },
        { provide: UtilsService, useClass: UtilsServiceStub },
        { provide: LayoutConfigStorageService, useClass: LayoutConfigStorageServiceStub },
        ClassInitService,
        DomSanitizer,
        Store,

      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});

let translations: any = {"CARDS_TITLE": "This is a test"};

export class TranslateServiceStub {

  public get(key: any): any {
    return Observable.of(key);
  }

  public getTranslation(lang: string): Observable<any> {
    return Observable.of(translations);
  }

  public getBrowserLang(): string {
    return "sp";
  };

  public addLangs(langs: Array<string>): void;

  public setDefaultLang(lang: string): void;

  public use(lang: string): void;
}

let mockRouter = {
  navigate: (commands: any[]) => { Promise.resolve(true); },
  events: of(new Scroll(new NavigationEnd(0, 'dummyUrl', 'dummyUrl'), [0, 0], 'dummyString'))
};

export class RouterStub implements Router {
  readonly events: Observable<Event>;
  constructor(){};
}

export class UtilsServiceStub {
  public onClassesUpdated$: BehaviorSubject<any>;
  public onAttributeUpdated$: BehaviorSubject<any>;
}

export class LayoutConfigStorageServiceStub {
  public loadConfig(): Observable<LayoutConfig>;
  public saveConfig(layoutConfig: LayoutConfig): void;
}
