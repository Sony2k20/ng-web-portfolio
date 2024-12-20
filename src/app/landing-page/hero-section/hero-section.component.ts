import { Component, inject } from '@angular/core';
import { Routes } from '../../shared/enums/routes.enum';
import { ScrollToSectionService } from '../../shared/services/scroll-to-section.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [],
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent {
  routes = Routes;
  scroller = inject(ScrollToSectionService);
  scrollToSection(route: string, sectionId: string, event?: Event) {
    this.scroller.scrollToSection(route, sectionId, event);
  }
}
