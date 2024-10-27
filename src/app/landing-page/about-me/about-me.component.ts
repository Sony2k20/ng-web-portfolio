import { Component, ElementRef, AfterViewInit, inject } from '@angular/core';
import { SocialLinks } from '../../shared/enums/social-links';
import { IntersectionObserverService } from '../../shared/services/intersection-observer-service.service';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.component.html',
})
export class AboutMeComponent implements AfterViewInit {
  socialLinks = SocialLinks;

  private elementRef = inject(ElementRef);
  private intersectionObserverService = inject(IntersectionObserverService);

  ngAfterViewInit() {
    this.intersectionObserverService.observeElement(
      this.elementRef,
      'animate-visible',
      'animate',
      0.8,
    );
  }
}
