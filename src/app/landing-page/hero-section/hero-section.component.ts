import { Component, inject } from '@angular/core';
import { Routes } from '../../shared/enums/routes.enum';
import { ScrollToSectionService } from '../../shared/services/scroll-to-section.service';
import { SecondaryButtonComponent } from '../../shared/components/secondary-button/secondary-button.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [SecondaryButtonComponent],
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent {
  routes = Routes;
  scroller = inject(ScrollToSectionService);
  scrollToSection(route: string, sectionId: string, event?: Event) {
    this.scroller.scrollToSection(route, sectionId, event);
  }
}
