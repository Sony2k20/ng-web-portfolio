import { Component, ElementRef, inject } from '@angular/core';
import { IntersectionObserverService } from '../../shared/services/intersection-observer-service.service';
import { MainButtonComponent } from '../../shared/components/main-button/main-button.component';
import { Routes } from '../../shared/enums/routes.enum';
import { ScrollToSectionService } from '../../shared/services/scroll-to-section.service';
import { FlipCardComponent } from './flip-card/flip-card.component';

@Component({
    selector: 'app-coaching',
    imports: [MainButtonComponent, FlipCardComponent],
    templateUrl: './coaching.component.html'
})
export class CoachingComponent {
  private elementRef = inject(ElementRef);
  private intersectionObserverService = inject(IntersectionObserverService);

  routes = Routes;
  scroller = inject(ScrollToSectionService);

  ngAfterViewInit() {
    this.intersectionObserverService.observeElements(
      this.elementRef,
      'animate-visible',
      'animate',
    );
  }
}
