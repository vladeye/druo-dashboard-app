import { Action } from '@ngrx/store';
import { type } from "../../utility/utilityHelpers";

export const SettingsActionTypes = {
  SetLanguage: type('[Settings] SetLanguage'),
  SetCulture: type('[Settings] SetCulture')
}

/**
 * Settings Actions
 */
export class SetLanguageAction implements Action {
  readonly type = SettingsActionTypes.SetLanguage;

  constructor(public payload: string) { }
}

export class SetCultureAction implements Action {
  readonly type = SettingsActionTypes.SetCulture;

  constructor(public payload: string) { }
}

export type SettingsActions = SetLanguageAction | SetCultureAction;
