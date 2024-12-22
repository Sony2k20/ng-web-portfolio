import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackbarSubject = new BehaviorSubject<string | null>(null);
  snackbar$ = this.snackbarSubject.asObservable();

  constructor() {}

  showSnackbar(message: string) {
    this.snackbarSubject.next(message);
    setTimeout(() => this.snackbarSubject.next(null), 3500);
  }
}
