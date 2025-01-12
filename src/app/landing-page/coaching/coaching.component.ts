import { Component, ElementRef, inject } from '@angular/core';
import { IntersectionObserverService } from '../../shared/services/intersection-observer-service.service';
import { MainButtonComponent } from '../../shared/component-library/main-button/main-button.component';
import { Routes } from '../../shared/enums/routes.enum';
import { ScrollToSectionService } from '../../shared/services/scroll-to-section.service';
import { FlipCardComponent } from './flip-card/flip-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coaching',
  imports: [MainButtonComponent, FlipCardComponent, CommonModule],
  templateUrl: './coaching.component.html',
})
export class CoachingComponent {
  private elementRef = inject(ElementRef);
  private intersectionObserverService = inject(IntersectionObserverService);

  routes = Routes;
  scroller = inject(ScrollToSectionService);

  items = [
    { text: '16 Wochen intensive 1:1 Zusammenarbeit' },
    { text: '12 gemeinsame 90-minütige Calls' },
    { text: 'Worksheets und Aufgaben für Klarheit und Unterstützung' },
    { text: 'Konkreter Plan und Schritte zur beruflichen Erfüllung' },
    { text: 'Nachhaltige Routinen für langfristige Zufriedenheit' },
    { text: '16 Wochen voller WhatsApp-Support zwischen den Calls' },
  ];

  ngAfterViewInit() {
    this.intersectionObserverService.observeElements(
      this.elementRef,
      'animate-visible',
      'animate',
    );
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
}
