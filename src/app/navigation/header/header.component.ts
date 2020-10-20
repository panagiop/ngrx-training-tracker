import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '../../app.reducer';
import * as authActions from '../../auth/auth.actions';
import * as uiActions from '../../shared/ui.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export default class HeaderComponent implements OnInit {
  isAuth$: Observable<boolean>;
  isSidebarOpen$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated);
    this.isSidebarOpen$ = this.store.select(fromRoot.getIsSidebarOpen);
  }

  onSidenavOpen() {
    this.store.dispatch(new uiActions.OpenSidebar());
  }

  onSidenavClose() {
    this.store.dispatch(new uiActions.CloseSidebar());
  }

  onLogout() {
    this.store.dispatch(new authActions.SetUnauthenticated());
  }
}
