import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import SharedModule from '../shared/shared.module';
import routing from './training.routing';
import TrainingComponent from './training.component';
import NewTrainingComponent from './new-training/new-training.component';
import CurrentTrainingComponent from './current-training/current-training.component';
import PastTrainingsComponent from './past-trainings/past-trainings.component';
import { StopTrainingDialogComponent } from './current-training/stop-training-dialog/stop-training-dialog.component';
import { trainingReducer } from './training.reducer';
import TrainingEffects from './training.effects';

@NgModule({
  declarations: [
    TrainingComponent,
    NewTrainingComponent,
    CurrentTrainingComponent,
    PastTrainingsComponent,
    StopTrainingDialogComponent
  ],
  imports: [
    SharedModule,
    routing,
    EffectsModule.forFeature([TrainingEffects]),
    StoreModule.forFeature('training', trainingReducer)
  ]
})
// eslint-disable-next-line import/prefer-default-export
export class TrainingModule {}
