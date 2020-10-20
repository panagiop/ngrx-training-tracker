import {
  UIActions,
  START_LOADING,
  STOP_LOADING,
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR
} from './ui.actions';

export interface State {
  isLoading: boolean,
  isSidebarOpen?: boolean
}

const initialState: State = {
  isLoading: false,
  isSidebarOpen: false
};

export function uiReducer(state = initialState, action: UIActions) {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case STOP_LOADING:
      return { ...state, isLoading: false };
    case OPEN_SIDEBAR:
      return { ...state, isSidebarOpen: true };
    case CLOSE_SIDEBAR:
      return { ...state, isSidebarOpen: false };
    default:
      return state;
  }
}

export const getIsLoading = (state: State) => state.isLoading;
export const getIsSidebarOpen = (state: State) => state.isSidebarOpen;
