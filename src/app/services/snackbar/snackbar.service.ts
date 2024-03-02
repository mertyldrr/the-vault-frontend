import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string, config?: MatSnackBarConfig) {
    this.snackBar.open(message, action, config);
  }

  dismissSnackbar() {
    this.snackBar.dismiss();
  }
}
