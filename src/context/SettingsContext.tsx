import { createContext, ReactNode, useContext, useReducer } from 'react';

type Action = { type: string; payload: any };
type Dispatch = (action: Action) => void;
type State = {
  menuOpen: boolean;
};
type UserSettingsProviderProps = { children: ReactNode };

const settingsName = 'global-settings';
const INIT_SETTINGS = 'INIT';
const SET_MENU_STATE = 'SET_MENU_STATE';

const StateContext = createContext<State | undefined>(undefined);
const DispatchContext = createContext<Dispatch | undefined>(undefined);

const initialState: State = {
  menuOpen: true
};

function userSettingsReducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case INIT_SETTINGS: {
      return { ...state, ...action.payload };
    }
    case SET_MENU_STATE: {
      const settings = {
        ...state,
        menuOpen: action.payload.menuOpen
      };
      return settings;
    }
    default: {
      return state;
    }
  }
}

function UserSettingsProvider({ children }: UserSettingsProviderProps) {
  const [state, dispatch] = useReducer(userSettingsReducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  );
}

function useUserSettingsState() {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useUserSettingsState must be used within a UserSettingsProvider');
  }
  return context;
}

function useUserSettingsDispatch() {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    throw new Error('useUserSettingsDispatch must be used within a UserSettingsProvider');
  }
  return context;
}

function useUserSettings(): [State, Dispatch] {
  return [useUserSettingsState(), useUserSettingsDispatch()];
}

function initUserSettings(settings: State): Action {
  return { type: INIT_SETTINGS, payload: settings };
}

function setMenuOpen(menuOpen: boolean): Action {
  return { type: SET_MENU_STATE, payload: { menuOpen } };
}

export {
  initUserSettings,
  setMenuOpen,
  settingsName,
  UserSettingsProvider,
  useUserSettings,
  useUserSettingsDispatch,
  useUserSettingsState
};
