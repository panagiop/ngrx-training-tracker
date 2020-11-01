import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Exercise } from '../exercise.model';
import * as fromTraining from '../training.reducer';
import * as trainingActions from '../training.actions';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export default class PastTrainingsComponent implements OnInit {
  value: string = '';
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  pastExercises$: Subscription;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private store: Store<fromTraining.TrainingState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new trainingActions.FetchFinishedTrainings());
    this.pastExercises$ = this.store
      .select(fromTraining.getFinishedExercices)
      .subscribe((exercises) => {
        this.dataSource.data = exercises;
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.pastExercises$.unsubscribe();
  }
}
