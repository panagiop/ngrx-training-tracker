import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import AuthGuard from './auth/auth.guard';

export const routes: Routes = [
  { path: 'training', loadChildren: () => import('./training/training.module').then((m) => m.TrainingModule), canLoad: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
