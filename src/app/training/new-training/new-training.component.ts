import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import SubscriptionService from 'src/app/shared/services/subscription.service';
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
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private subService: SubscriptionService,
    private store: Store<fromTraining.State>
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.newTrainingForm = this.formBuilder.group({ exercise: ['', Validators.required] });
    this.store.dispatch(new trainingActions.FetchAvailableTrainings());
    this.exercises$ = this.store.select(fromTraining.getAvailableExercices);
  }

  onStartTraining(): void {
    this.store.dispatch(new trainingActions.StartTraining(this.newTrainingForm.value.exercise));
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }
}
