import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// custom modules
import { AppRoutingModule } from './app-routing.module';
import MaterialModule from './shared/material.module';
import AuthModule from './auth/auth.module';
// components
import AppComponent from './app.component';
import HeaderComponent from './navigation/header/header.component';
import SidenavComponent from './navigation/sidenav/sidenav.component';
// services
import AuthService from './auth/auth.service';
import TrainingService from './training/training.service';
import UIService from './shared/services/ui.service';

import { environment } from '../environments/environment';
import { reducers } from './app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'test app',
      logOnly: environment.production
    }),
    AppRoutingModule,
    AuthModule
  ],
  providers: [AuthService, TrainingService, UIService],
  bootstrap: [AppComponent]
})
export default class AppModule { }
