import { Action } from '@ngrx/store';

export const START_LOADING = '[UI] Start Loading';
export const STOP_LOADING = '[UI] Stop Loading';
export const OPEN_SIDEBAR = '[UI] Open Sidebar';
export const CLOSE_SIDEBAR = '[UI] Close Sidebar';

export class StartLoading implements Action {
  readonly type = START_LOADING;
}

export class StopLoading implements Action {
  readonly type = STOP_LOADING;
}

export class OpenSidebar implements Action {
  readonly type = OPEN_SIDEBAR;
}

export class CloseSidebar implements Action {
  readonly type = CLOSE_SIDEBAR;
}

export type UIActions
  = StartLoading
  | StopLoading
  | OpenSidebar
  | CloseSidebar;
