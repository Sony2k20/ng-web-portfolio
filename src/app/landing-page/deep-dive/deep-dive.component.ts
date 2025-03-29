import { Component, ElementRef, inject } from '@angular/core'
import { MainButtonComponent } from '../../shared/component-library/main-button/main-button.component'
import { Routes } from '../../shared/enums/routes.enum'
import { IntersectionObserverService } from '../../shared/services/intersection-observer-service.service'
import { ScrollToSectionService } from '../../shared/services/scroll-to-section.service'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-deep-dive',
  imports: [MainButtonComponent, CommonModule],
  templateUrl: './deep-dive.component.html',
})
export class DeepDiveComponent {
  private elementRef = inject(ElementRef)
  private intersectionObserverService = inject(IntersectionObserverService)

  routes = Routes
  scroller = inject(ScrollToSectionService)

  items = [
    { text: '16 Wochen intensive 1:1 Zusammenarbeit' },
    { text: '12 gemeinsame 90-minütige Calls' },
    { text: 'Worksheets und Aufgaben für Klarheit und Unterstützung' },
    { text: 'Konkreter Plan und Schritte zur beruflichen Erfüllung' },
    { text: 'Nachhaltige Routinen für langfristige Zufriedenheit' },
    { text: '16 Wochen voller WhatsApp-Support zwischen den Calls' },
  ]

  ngAfterViewInit() {
    this.intersectionObserverService.observeElements(
      this.elementRef,
      'animate-visible',
      'animate',
    )
  }

  trackByIndex(index: number, item: any): number {
    return index
  }
}
