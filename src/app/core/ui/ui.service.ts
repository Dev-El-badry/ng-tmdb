import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor(private snakbar: MatSnackBar) {}

  snackbar(msg, action, duration = 5000) {
    this.snakbar.open(msg, action, {
      duration,
    });
  }
}
