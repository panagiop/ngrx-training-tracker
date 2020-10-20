/* eslint-disable max-len */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Exercise } from './exercise.model';
import {
  TrainingActions,
  FETCH_AVAILABLE_TRAININGS_SUCCESS,
  FETCH_FINISHED_TRAININGS_SUCCESS,
  START_TRAINING,
  STOP_OR_COMPLETE_TRAINING_SUCCESS
} from './training.actions';
import * as fromRoot from '../app.reducer';

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise;
}

export interface State extends fromRoot.State {
  trainingState: TrainingState;
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null
};

export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case FETCH_AVAILABLE_TRAININGS_SUCCESS:
      return { ...state, availableExercises: action.payload };
    case FETCH_FINISHED_TRAININGS_SUCCESS:
      return { ...state, finishedExercises: action.payload };
    case START_TRAINING:
      return { ...state, activeTraining: { ...state.availableExercises.find((exercise) => exercise.id === action.payload) } };
    case STOP_OR_COMPLETE_TRAINING_SUCCESS:
      return { ...state, activeTraining: null };
    default:
      return state;
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercices = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getFinishedExercices = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining != null);
