import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { EffectsModule } from '@ngrx/effects';

import routing from './auth.routing';
import SharedModule from '../shared/shared.module';
import SignupComponent from './signup/signup.component';
import LoginComponent from './login/login.component';
import AuthEffects from './auth.effects';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    AngularFireAuthModule,
    routing,
    SharedModule,
    EffectsModule.forFeature([AuthEffects])
  ]
})
export default class AuthModule { }
