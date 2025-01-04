import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject } from '@angular/core';
import { IntersectionObserverService } from '../../../shared/services/intersection-observer-service.service';

@Component({
  selector: 'app-flip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flip-card.component.html',
  styleUrl: './flip-card.component.css',
})
export class FlipCardComponent {
  private elementRef = inject(ElementRef);
  private intersectionObserverService = inject(IntersectionObserverService);

  ngAfterViewInit() {
    this.intersectionObserverService.observeElements(
      this.elementRef,
      'slideInFromBot',
      'animateB',
      '-220px',
    );

    this.intersectionObserverService.observeElements(
      this.elementRef,
      'slideInFromLeft',
      'animateL',
      '-220px',
    );

    this.intersectionObserverService.observeElements(
      this.elementRef,
      'slideInFromRight',
      'animateR',
      '-220px',
    );
  }
}
