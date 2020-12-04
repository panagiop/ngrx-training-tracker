import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
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

describe('TrainingService', () => {
  describe('fetch available exercises', () => {
    // stub snapshotChanges and collection methods of AngularFirestore
    const collectionSnapshotChangesStub = {
      snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(data)
    };
    const angularFirestoreSnapshotChangesStub = {
      collection: jasmine.createSpy('collection').and.returnValue(collectionSnapshotChangesStub)
    };
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

      trainingService = TestBed.inject(TrainingService);
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
    const collectionValueChangesStub = {
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
    };
    const angularFirestoreValueChangesStub = {
      collection: jasmine.createSpy('collection').and.returnValue(collectionValueChangesStub)
    };
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

      trainingService = TestBed.inject(TrainingService);
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
