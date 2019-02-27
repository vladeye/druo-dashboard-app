import * as actions from '../actions/settings.actions';


export interface State {
  selectedLanguage?:   string;
  selectedCulture?:    string;
  availableLanguages?: Array<any>
}

export const initialState: State = {
  selectedLanguage: '',
  selectedCulture:  '',
  availableLanguages: [
    {code: 'sp', name: 'SP', culture: 'sp-SP'},
    {code: 'en', name: 'EN', culture: 'en-EN'}
  ]
};

export function reducer(state = initialState, action: actions.SettingsActions): State {
  switch (action.type) {
    case actions.SettingsActionTypes.SetLanguage:
      return handleSetLanguage(state, action);

    case actions.SettingsActionTypes.SetCulture:
      return handleSetCulture(state, action);

    default: {
      return state;
    }

  }
}

function handleSetLanguage(state: State, action: actions.SetLanguageAction): State {
  return {
      ...state,
      selectedLanguage: action.payload
  };
}

function handleSetCulture(state: State, action: actions.SetCultureAction): State {
  return {
      ...state,
      selectedCulture: action.payload
  };
}

export const getSelectedLanguage   = (state: State) => state.selectedLanguage;
export const getSelectedCulture    = (state: State) => state.selectedCulture;
export const getAvailableLanguages = (state: State) => state.availableLanguages;
