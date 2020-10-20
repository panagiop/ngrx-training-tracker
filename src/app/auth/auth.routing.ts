import { Routes, RouterModule } from '@angular/router';
import LoginComponent from './login/login.component';
import SignupComponent from './signup/signup.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent }
];

export default RouterModule.forChild(routes);
