import { Injectable } from "@angular/core";
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromSettings from './reducers/settings.reducer';
import { Params, RouterStateSnapshot } from "@angular/router";

import {
  RouterStateSerializer,
  routerReducer,
  RouterReducerState
} from "@ngrx/router-store";

export interface State {
  settings: fromSettings.State;
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  settings: fromSettings.reducer,
  router: routerReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}


@Injectable()
export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams }
    } = routerState;
    const { params } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams };
  }
}

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 */
/**
 * Settings store functions
 */
export const selectSettingsState = createFeatureSelector<fromSettings.State>('settings');
export const getSelectedLanguage = createSelector(selectSettingsState, fromSettings.getSelectedLanguage);
export const getSelectedCulture = createSelector(selectSettingsState, fromSettings.getSelectedCulture);
export const getAvailableLanguages = createSelector(selectSettingsState, fromSettings.getAvailableLanguages);

// Reducer selectors
export const selectReducerState = createFeatureSelector<
  RouterReducerState<RouterStateUrl>
  >("router");
export const getRouterInfo = createSelector(
  selectReducerState,
  state => state.state
);

