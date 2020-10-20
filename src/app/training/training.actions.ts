import { Action } from '@ngrx/store';
import { Exercise } from './exercise.model';

export const FETCH_AVAILABLE_TRAININGS = '[Training] Fetch Available Trainings';
export const FETCH_AVAILABLE_TRAININGS_SUCCESS = '[Training] Fetch Available Trainings Success';
export const FETCH_AVAILABLE_TRAININGS_ERROR = '[Training] Fetch Available Trainings Error';
export const FETCH_FINISHED_TRAININGS = '[Training] Fetch Finished Trainings';
export const FETCH_FINISHED_TRAININGS_SUCCESS = '[Training] Fetch Finished Trainings Success';
export const FETCH_FINISHED_TRAININGS_ERROR = '[Training] Fetch Finished Trainings Error';
export const START_TRAINING = '[Training] Start Training';
export const STOP_OR_COMPLETE_TRAINING = '[Training] Stop or Complete Training';
export const STOP_OR_COMPLETE_TRAINING_SUCCESS = '[Training] Stop or Complete Training Success';
export const STOP_OR_COMPLETE_TRAINING_ERROR = '[Training] Stop or Complete Training Error';

export class FetchAvailableTrainings implements Action {
  readonly type = FETCH_AVAILABLE_TRAININGS;
}

export class FetchAvailableTrainingsSuccess implements Action {
  readonly type = FETCH_AVAILABLE_TRAININGS_SUCCESS;
  constructor(public payload: Exercise[]) {}
}

export class FetchAvailableTrainingsError implements Action {
  readonly type = FETCH_AVAILABLE_TRAININGS_ERROR;
}

export class FetchFinishedTrainings implements Action {
  readonly type = FETCH_FINISHED_TRAININGS;
}

export class FetchFinishedTrainingsSuccess implements Action {
  readonly type = FETCH_FINISHED_TRAININGS_SUCCESS;
  constructor(public payload: unknown) {}
}

export class FetchFinishedTrainingsError implements Action {
  readonly type = FETCH_FINISHED_TRAININGS_ERROR;
}

export class StartTraining implements Action {
  readonly type = START_TRAINING;
  constructor(public payload: string) {}
}

export class StopTraining implements Action {
  readonly type = STOP_OR_COMPLETE_TRAINING;
  constructor(public payload: unknown = null) {}
}

export class StopTrainingSuccess implements Action {
  readonly type = STOP_OR_COMPLETE_TRAINING_SUCCESS;
}

export class StopTrainingError implements Action {
  readonly type = STOP_OR_COMPLETE_TRAINING_ERROR;
}

export type TrainingActions
  = FetchAvailableTrainings
  | FetchAvailableTrainingsSuccess
  | FetchAvailableTrainingsError
  | FetchFinishedTrainingsSuccess
  | FetchFinishedTrainingsError
  | StartTraining
  | StopTraining
  | StopTrainingSuccess;
