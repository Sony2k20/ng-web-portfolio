import {
  Component,
  inject,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core'
import { Subscription } from 'rxjs'
import { SnackbarService } from '../service/snackbar.service'

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [],
})
export class SnackbarComponent implements OnInit, OnDestroy {
  private snackbarService = inject(SnackbarService)
  message: string | null = null
  private snackbarSubscription: Subscription | undefined

  ngOnInit() {
    this.snackbarSubscription = this.snackbarService.snackbar$.subscribe(
      (message) => {
        this.message = message
      },
    )
  }

  ngOnDestroy() {
    this.snackbarSubscription?.unsubscribe()
  }
}
