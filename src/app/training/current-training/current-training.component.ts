import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { StopTrainingDialogComponent } from './stop-training-dialog/stop-training-dialog.component';

import * as trainingActions from '../training.actions';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export default class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: any;

  constructor(
    private dialog: MatDialog,
    private store: Store<fromTraining.TrainingState>
  ) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe((activeTraining) => {
      const step = (activeTraining.duration / 100) * 1000;
      this.timer = setInterval(() => {
        this.progress += 1;
        if (this.progress >= 100) {
          this.store.dispatch(new trainingActions.StopTraining({ progress: this.progress, status: 'completed' }));
          clearInterval(this.timer);
        }
      }, step);
    });
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingDialogComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(new trainingActions.StopTraining({ progress: this.progress, status: 'cancelled' }));
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
