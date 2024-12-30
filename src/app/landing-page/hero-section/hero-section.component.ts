import { Component, inject } from '@angular/core';
import { Routes } from '../../shared/enums/routes.enum';
import { ScrollToSectionService } from '../../shared/services/scroll-to-section.service';
import { MainButtonComponent } from '../../shared/components/main-button/main-button.component';
import { HandwritingAnimationComponent } from './handwriting-animation/handwriting-animation.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [MainButtonComponent, HandwritingAnimationComponent],
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent {
  routes = Routes;
  scroller = inject(ScrollToSectionService);
}
