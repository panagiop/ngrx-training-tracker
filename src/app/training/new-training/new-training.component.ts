import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Exercise } from '../exercise.model';
import * as fromRoot from '../../app.reducer';
import * as fromTraining from '../training.reducer';
import * as trainingActions from '../training.actions';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})

export default class NewTrainingComponent implements OnInit {
  newTrainingForm: FormGroup;
  exercises$: Subscription;
  exercises: Exercise[];
  isLoading$: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromTraining.State>
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.newTrainingForm = this.formBuilder.group({ exercise: ['', Validators.required] });
    this.store.dispatch(new trainingActions.FetchAvailableTrainings());
    this.exercises$ = this.store
      .select(fromTraining.getAvailableExercices)
      .subscribe((exercises) => {
        this.exercises = exercises;
      });
  }

  onStartTraining(): void {
    this.store.dispatch(new trainingActions.StartTraining(this.newTrainingForm.value.exercise));
  }

  ngOnDestroy(): void {
    this.exercises$.unsubscribe();
  }
}
