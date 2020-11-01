/* eslint-disable max-len */
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of, ReplaySubject, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { skip, take } from 'rxjs/operators';

import TrainingEffects from './training.effects';
import TrainingService from './training.service';
import { Exercise } from './exercise.model';
import {
  FetchAvailableTrainings,
  FetchAvailableTrainingsError,
  FetchAvailableTrainingsSuccess,
  FetchFinishedTrainings,
  FetchFinishedTrainingsError,
  FetchFinishedTrainingsSuccess
} from './training.actions';
import UIService from '../shared/services/ui.service';
import { StartLoading } from '../shared/ui.actions';

describe('TrainingEffects', () => {
  let actions$: ReplaySubject<any>;
  let effects: TrainingEffects;
  let trainingService: jasmine.SpyObj<TrainingService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TrainingEffects,
        provideMockActions(() => actions$),
        {
          provide: TrainingService,
          useValue: {
            fetchAvailableExercises: jasmine.createSpy(),
            fetchCompletedOrCancelledExercises: jasmine.createSpy()
          }
        },
        { provide: UIService, useValue: {} },
        { provide: Store },
        provideMockStore()
      ]
    });
    effects = TestBed.inject(TrainingEffects);
    trainingService = TestBed.get(TrainingService);
  });

  describe('fetch available exercises', () => {
    const availableExercises: Exercise[] = [];
    const fetchAvailableTrainingsAction = new FetchAvailableTrainings();
    const startLoadingAction = new StartLoading();
    const fetchAvailableTrainingsSuccessAction = new FetchAvailableTrainingsSuccess(availableExercises);
    const fetchAvailableTrainingsErrorAction = new FetchAvailableTrainingsError();
    // create a ReplaySubject
    actions$ = new ReplaySubject(1);
    // dispatch the FetchAvailableTrainings action
    actions$.next(fetchAvailableTrainingsAction);
    it('should dispatch the success action when "fetching" the available exercises', () => {
      // mock the TrainingService to prevent an HTTP request
      trainingService.fetchAvailableExercises.and.returnValue(of(availableExercises));
      effects.fetchAvailableTrainings$.pipe(take(1)).subscribe((result) => {
        expect(result).toEqual(startLoadingAction);
      });
      effects.fetchAvailableTrainings$.pipe(skip(1)).subscribe((result) => {
        expect(result).toEqual(fetchAvailableTrainingsSuccessAction);
      });
    });
    it('should dispatch the error action when "fetching" the available exercises', () => {
      trainingService.fetchAvailableExercises.and.returnValue(throwError(of(availableExercises)));
      effects.fetchAvailableTrainings$.pipe(take(1)).subscribe((result) => {
        expect(result).toEqual(startLoadingAction);
      });
      effects.fetchAvailableTrainings$.pipe(skip(1)).subscribe((result) => {
        expect(result).toEqual(fetchAvailableTrainingsErrorAction);
      });
    });
  });

  describe('fetch finished exercises', () => {
    const finishedExercises: Exercise[] = [];
    const fetchFinishedTrainingsAction = new FetchFinishedTrainings();
    const startLoadingAction = new StartLoading();
    const fetchFinishedTrainingsSuccessAction = new FetchFinishedTrainingsSuccess(finishedExercises);
    const fetchFinishedTrainingsErrorAction = new FetchFinishedTrainingsError();
    // create a ReplaySubject
    actions$ = new ReplaySubject(1);
    // dispatch the FetchFinishedTrainings action
    actions$.next(fetchFinishedTrainingsAction);
    it('should dispatch the success action when "fetching" the finished exercises', () => {
      // mock the TrainingService to prevent an HTTP request
      trainingService.fetchCompletedOrCancelledExercises.and.returnValue(of(finishedExercises));
      effects.fetchFinishedTrainings$.pipe(take(1)).subscribe((result) => {
        expect(result).toEqual(startLoadingAction);
      });
      effects.fetchFinishedTrainings$.pipe(skip(1)).subscribe((result) => {
        expect(result).toEqual(fetchFinishedTrainingsSuccessAction);
      });
    });
    it('should dispatch the error action when "fetching" the finished exercises', () => {
      // mock the TrainingService to prevent an HTTP request
      trainingService.fetchCompletedOrCancelledExercises.and.returnValue(throwError(of(finishedExercises)));
      effects.fetchFinishedTrainings$.pipe(take(1)).subscribe((result) => {
        expect(result).toEqual(startLoadingAction);
      });
      effects.fetchFinishedTrainings$.pipe(skip(1)).subscribe((result) => {
        expect(result).toEqual(fetchFinishedTrainingsErrorAction);
      });
    });
  });
});
