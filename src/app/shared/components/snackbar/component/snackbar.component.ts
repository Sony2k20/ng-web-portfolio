import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SnackbarService } from '../service/snackbar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class SnackbarComponent implements OnInit, OnDestroy {
  message: string | null = null;
  private snackbarSubscription: Subscription | undefined;

  constructor(private snackbarService: SnackbarService) {}

  ngOnInit() {
    this.snackbarSubscription = this.snackbarService.snackbar$.subscribe(
      (message) => {
        this.message = message;
      },
    );
  }

  ngOnDestroy() {
    this.snackbarSubscription?.unsubscribe();
  }
}
