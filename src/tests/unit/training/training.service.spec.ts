import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

import { Exercise } from 'src/app/training/exercise.model';
import TrainingService from '../../../app/training/training.service';

const input: Exercise[] = [
  { name: 'A', id: '1', calories: 1, duration: 1 },
  { name: 'B', id: '2', calories: 2, duration: 2 },
  { name: 'C', id: '3', calories: 3, duration: 3 }
];

const data = of(input);

let trainingService: TrainingService;
let httpMock: HttpTestingController;
let angularFirestore: AngularFirestore;

const collectionSnapshotChangesStub = {
  snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(data)
};

const collectionValueChangesStub = {
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
};

const angularFirestoreSnapshotChangesStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionSnapshotChangesStub)
};

const angularFirestoreValueChangesStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionValueChangesStub)
};

describe('TrainingService', () => {
  describe('fetch available exercises', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule
        ],
        providers: [
          TrainingService,
          { provide: AngularFirestore, useValue: angularFirestoreSnapshotChangesStub }
        ]
      });

      trainingService = TestBed.get(TrainingService);
      angularFirestore = TestBed.get(AngularFirestore);
      httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
      expect(trainingService).toBeTruthy();
    });

    it('should be called with the "availableExercises" collection', () => {
      trainingService.fetchAvailableExercises();
      expect(angularFirestoreSnapshotChangesStub.collection).toHaveBeenCalledWith('availableExercises');
    });
  });

  describe('fetch finished/cancelled exercises', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule
        ],
        providers: [
          TrainingService,
          { provide: AngularFirestore, useValue: angularFirestoreValueChangesStub }
        ]
      });

      trainingService = TestBed.get(TrainingService);
      angularFirestore = TestBed.get(AngularFirestore);
      httpMock = TestBed.get(HttpTestingController);
    });

    it('should be called with the "finishedExercises" collection', () => {
      trainingService.fetchCompletedOrCancelledExercises();
      expect(angularFirestoreValueChangesStub.collection).toHaveBeenCalledWith('finishedExercises');
    });

    it('should call fetchCompletedOrCancelledExercises and return 3 items as a result', () => {
      trainingService.fetchCompletedOrCancelledExercises().subscribe((finishedExercises) => {
        expect(finishedExercises.length).toBe(3);
      });
    });
  });
});
