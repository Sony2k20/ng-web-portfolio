import {
  Component,
  ElementRef,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core'
import { IntersectionObserverService } from '../../../shared/services/intersection-observer-service.service'

@Component({
  selector: 'app-flip-card',
  imports: [],
  templateUrl: './flip-card.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './flip-card.component.css',
})
export class FlipCardComponent {
  private elementRef = inject(ElementRef)
  private intersectionObserverService = inject(IntersectionObserverService)

  ngAfterViewInit() {
    this.intersectionObserverService.observeElements(
      this.elementRef,
      'slideInFromBot',
      'animateB',
      '-170px',
    )

    this.intersectionObserverService.observeElements(
      this.elementRef,
      'slideInFromLeft',
      'animateL',
      '-170px',
    )

    this.intersectionObserverService.observeElements(
      this.elementRef,
      'slideInFromRight',
      'animateR',
      '-170px',
    )
  }
}
