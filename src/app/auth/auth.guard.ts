import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';

@Injectable()
export default class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private store: Store<fromRoot.State>
  ) {}

  canActivate() {
    return this.store.select(fromRoot.getIsAuthenticated);
  }

  canLoad() {
    return this.store.select(fromRoot.getIsAuthenticated);
  }
}
