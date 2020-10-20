import { Routes, RouterModule } from '@angular/router';
import TrainingComponent from './training.component';

const routes: Routes = [
  { path: '', component: TrainingComponent }
];

export default RouterModule.forChild(routes);
