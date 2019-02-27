import { Injectable }    		from '@angular/core';
import { Sandbox }       		from './shared/sandbox/base.sandbox';
import { Store }         		from '@ngrx/store';
import * as fromRoot            from './shared/store';
import * as settingsActions     from './shared/store/actions/settings.actions';

import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class AppSandbox extends Sandbox {

  constructor(
    protected appState$: Store<fromRoot.State>,
  	private translate: TranslateService,
  ) {
    super(appState$);
  }

  /**
   * Sets up default language for the application. Uses browser default language.
   */
  public setupLanguage(): void {
    //let localization: any        = this.configService.get('localization');
    let localization =   {
      "languages": [
        {"code": "sp", "name": "SP", "culture": "sp-SP"},
        {"code": "en", "name": "EN", "culture": "en-EN"}
      ],
        "defaultLanguage": "sp"
    };
    let languages: Array<string> = localization.languages.map(lang => lang.code);
    let browserLang: string      = this.translate.getBrowserLang();

    this.translate.addLangs(languages);
    this.translate.setDefaultLang(localization.defaultLanguage);

    let selectedLang    = browserLang.match(/en|sp/) ? browserLang : localization.defaultLanguage;
    //let selectedLang    = "en";
    let selectedCulture = localization.languages.filter(lang => lang.code === selectedLang)[0].culture;

    this.translate.use(selectedLang);
    this.appState$.dispatch(new settingsActions.SetLanguageAction(selectedLang));
    this.appState$.dispatch(new settingsActions.SetCultureAction(selectedCulture));
  }

  /**
   * Returns global notification options
   */
  //public getNotificationOptions(): any {
  //	return this.configService.get('notifications').options;
  //}
}
