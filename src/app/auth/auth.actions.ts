import { Action } from '@ngrx/store';
import { AuthData } from './auth-data.model';

export const LOGIN = '[Auth] Login';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_ERROR = '[Auth] Login Error';
export const REGISTER = '[Auth] Register';
export const REGISTER_SUCCESS = '[Auth] Register Success';
export const REGISTER_ERROR = '[Auth] Register Error';
export const SET_AUTHENTICATED = '[Auth] Set Authenticated';
export const SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';
export const CHECK_FOR_LOGGEDIN_USER = '[Auth] Check if user is logged in';

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: AuthData) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
}

export class LoginError implements Action {
  readonly type = LOGIN_ERROR;
  constructor(public payload: any) {}
}

export class Register implements Action {
  readonly type = REGISTER;
  constructor(public payload: AuthData) {}
}

export class RegisterSuccess implements Action {
  readonly type = REGISTER_SUCCESS;
}

export class RegisterError implements Action {
  readonly type = REGISTER_ERROR;
  constructor(public payload: any) {}
}

export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENTICATED;
}

export class SetUnauthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

export class CheckForLoggedinUser implements Action {
  readonly type = CHECK_FOR_LOGGEDIN_USER;
}

export type AuthActions
  = Login
  | LoginSuccess
  | LoginError
  | Register
  | RegisterSuccess
  | RegisterError
  | SetAuthenticated
  | SetUnauthenticated
  | CheckForLoggedinUser;
