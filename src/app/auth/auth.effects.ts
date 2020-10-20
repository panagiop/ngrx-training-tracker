import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { concat, of } from 'rxjs';
import { concatMapTo, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import * as authActions from './auth.actions';
import * as uiActions from '../shared/ui.actions';

import AuthService from './auth.service';
import UIService from '../shared/services/ui.service';

@Injectable()
export default class AuthEffects {
  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
    private uiService: UIService
  ) {}

  @Effect()
  checkForLoggedinUser$ = this.actions.pipe(
    ofType(authActions.CHECK_FOR_LOGGEDIN_USER),
    switchMap(() => this.authService.authListener()
      .pipe(
        map((data) => (data
          ? new authActions.SetAuthenticated()
          : new authActions.SetUnauthenticated()))
      ))
  );

  @Effect({ dispatch: false })
  userLoggedIn$ = this.actions.pipe(
    ofType(authActions.SET_AUTHENTICATED),
    tap(() => this.router.navigate(['/training']))
  );

  @Effect({ dispatch: false })
  userLoggedOut$ = this.actions.pipe(
    ofType(authActions.SET_UNAUTHENTICATED),
    tap(() => this.router.navigate(['/login']))
  );

  @Effect()
  login$ = this.actions.pipe(
    ofType(authActions.LOGIN),
    map((action) => (action as any).payload),
    switchMap((action) => concat(
      of(new uiActions.StartLoading()),
      this.authService.login(action)
        .then(() => new authActions.LoginSuccess())
        .catch((error) => new authActions.LoginError(error))
    ))
  );

  @Effect()
  loginAndRegisterSuccess$ = this.actions.pipe(
    ofType(authActions.LOGIN_SUCCESS, authActions.REGISTER_SUCCESS),
    concatMapTo([
      new uiActions.StopLoading(),
      new authActions.SetAuthenticated()
    ])
  );

  @Effect()
  loginAndRegisterError$ = this.actions.pipe(
    ofType(authActions.LOGIN_ERROR, authActions.REGISTER_ERROR),
    map((action) => (action as any)),
    map((error) => this.uiService.showSnackBar(error.payload.message, null, 3000)),
    map(() => new uiActions.StopLoading())
  );

  @Effect()
  register$ = this.actions.pipe(
    ofType(authActions.REGISTER),
    map((action) => (action as any).payload),
    switchMap((action) => concat(
      of(new uiActions.StartLoading()),
      this.authService.register(action)
        .then(() => new authActions.RegisterSuccess())
        .catch((error) => new authActions.RegisterError(error))
    ))
  );
}
