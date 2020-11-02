import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concat, of } from 'rxjs';
import { catchError, map, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';

import * as trainingActions from './training.actions';
import * as uiActions from '../shared/ui.actions';
import * as fromTraining from './training.reducer';

import TrainingService from './training.service';
import UIService from '../shared/services/ui.service';

@Injectable()
export default class TrainingEffects {
  constructor(
    private actions: Actions,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromTraining.TrainingState>
  ) {}

  @Effect()
  fetchAvailableTrainings$ = this.actions.pipe(
    ofType(trainingActions.FETCH_AVAILABLE_TRAININGS),
    switchMap(() => concat(
      of(new uiActions.StartLoading()),
      this.trainingService.fetchAvailableExercises()
        .pipe(
          map((data) => new trainingActions.FetchAvailableTrainingsSuccess(data)),
          catchError(() => of(new trainingActions.FetchAvailableTrainingsError())),
          take(1) // NOTE: takeUntil(<unsubscribe_logic>) couldn't be easily tested
        )
    ))
  );

  @Effect()
  fetchAvailableAndFinishedTrainingsSuccess$ = this.actions.pipe(
    ofType(
      trainingActions.FETCH_AVAILABLE_TRAININGS_SUCCESS,
      trainingActions.FETCH_FINISHED_TRAININGS_SUCCESS
    ),
    map(() => new uiActions.StopLoading())
  );

  @Effect()
  fetchAvailableAndFinishedTrainingsError$ = this.actions.pipe(
    ofType(
      trainingActions.FETCH_AVAILABLE_TRAININGS_ERROR,
      trainingActions.FETCH_FINISHED_TRAININGS_ERROR
    ),
    map(() => new uiActions.StopLoading()),
    tap(() => this.uiService.showSnackBar('Fetching exercises failed', null, 3000))
  );

  @Effect()
  fetchFinishedTrainings$ = this.actions.pipe(
    ofType(trainingActions.FETCH_FINISHED_TRAININGS),
    switchMap(() => concat(
      of(new uiActions.StartLoading()),
      this.trainingService.fetchCompletedOrCancelledExercises()
        .pipe(
          map((data) => new trainingActions.FetchFinishedTrainingsSuccess(data)),
          catchError(() => of(new trainingActions.FetchFinishedTrainingsError())),
          take(1)
        )
    ))
  );

  @Effect()
  stopOrCompleteTraining$ = this.actions.pipe(
    ofType(trainingActions.STOP_OR_COMPLETE_TRAINING),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    map((action) => (action as any).payload),
    withLatestFrom(this.store.select(fromTraining.getActiveTraining)),
    switchMap(([action, activeTraining]) => this.trainingService.addExercise({
      ...activeTraining,
      duration: activeTraining.duration * (action.progress / 100),
      calories: activeTraining.duration * (action.progress / 100),
      date: new Date(),
      state: action.status
    })
      .then(() => new trainingActions.StopTrainingSuccess())
      .catch(() => new trainingActions.StopTrainingError()))
  );

  @Effect({ dispatch: false })
  stopOrCompleteTrainingSuccess$ = this.actions.pipe(
    ofType(trainingActions.STOP_OR_COMPLETE_TRAINING_SUCCESS),
    tap(() => this.uiService.showSnackBar('Training succesfully saved!', null, 3000))
  );

  @Effect({ dispatch: false })
  stopOrCompleteTrainingError$ = this.actions.pipe(
    ofType(trainingActions.STOP_OR_COMPLETE_TRAINING_ERROR),
    tap(() => this.uiService.showSnackBar('Saving training failed. Try again later', null, 3000))
  );
}
