import { Component, ElementRef, AfterViewInit, inject } from '@angular/core';
import { IntersectionObserverService } from '../../shared/services/intersection-observer-service.service';
import { SocialLinksComponent } from '../../shared/components/social-links/social-links.component';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [SocialLinksComponent],
  templateUrl: './about-me.component.html',
})
export class AboutMeComponent implements AfterViewInit {
  private elementRef = inject(ElementRef);
  private intersectionObserverService = inject(IntersectionObserverService);

  ngAfterViewInit() {
    this.intersectionObserverService.observeElements(
      this.elementRef,
      'animate-visible',
      'animate',
      1,
    );
  }
}
