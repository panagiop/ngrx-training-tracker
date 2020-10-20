import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { AuthData } from './auth-data.model';

@Injectable()
export default class AuthService {
  constructor(
    private afAuth: AngularFireAuth
  ) {}

  authListener() {
    return this.afAuth.authState;
  }

  register(data: AuthData) {
    return this.afAuth.createUserWithEmailAndPassword(data.email, data.password);
  }

  login(data: AuthData) {
    return this.afAuth.signInWithEmailAndPassword(data.email, data.password);
  }

  logout() {
    this.afAuth.signOut();
  }
}
