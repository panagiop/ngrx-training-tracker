import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable()
export default class UIService {
  constructor(private snackbar: MatSnackBar) {}
  showSnackBar(
    message,
    action,
    duration,
    horizontalPosition: MatSnackBarHorizontalPosition = 'center',
    verticalPosition: MatSnackBarVerticalPosition = 'top'
  ) {
    this.snackbar.open(message, action, {
      duration,
      horizontalPosition,
      verticalPosition
    });
  }
}
