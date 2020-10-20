import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from './app.reducer';
import * as authActions from './auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export default class AppComponent implements OnInit {
  title = 'ng-training';
  isOpen$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.store.dispatch(new authActions.CheckForLoggedinUser());
    this.isOpen$ = this.store.select(fromRoot.getIsSidebarOpen);
  }

  toggleSidenav() {
    this.isOpen$ = this.store.select(fromRoot.getIsSidebarOpen);
  }
}
