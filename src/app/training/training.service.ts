/* eslint-disable @typescript-eslint/dot-notation */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { Exercise } from './exercise.model';

@Injectable()
export default class TrainingService {
  constructor(public db: AngularFirestore) {}

  fetchAvailableExercises() {
    return this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(map((docArray) => docArray.map((doc) => ({
        id: doc.payload.doc.id,
        name: doc.payload.doc.data()['name'],
        calories: doc.payload.doc.data()['calories'],
        duration: doc.payload.doc.data()['duration']
      }))));
  }

  fetchCompletedOrCancelledExercises() {
    return this.db
      .collection('finishedExercises')
      .valueChanges();
  }

  addExercise(exercise: Exercise) {
    return this.db
      .collection('finishedExercises')
      .add(exercise);
  }
}
