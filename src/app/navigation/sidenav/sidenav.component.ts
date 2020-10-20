import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '../../app.reducer';
import * as authActions from '../../auth/auth.actions';
import * as uiActions from '../../shared/ui.actions';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export default class SidenavComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  isAuth$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated);
  }

  onSidenavClose() {
    this.store.dispatch(new uiActions.CloseSidebar());
  }

  onLogout() {
    this.store.dispatch(new authActions.SetUnauthenticated());
    this.store.dispatch(new uiActions.CloseSidebar());
  }
}
