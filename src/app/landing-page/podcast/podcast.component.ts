import { Component, ElementRef, inject, AfterViewInit } from '@angular/core';
import { SocialLinks } from '../../shared/components/social-links/social-links.enum';
import { IntersectionObserverService } from '../../shared/services/intersection-observer-service.service';

@Component({
  selector: 'app-podcast',
  standalone: true,
  imports: [],
  templateUrl: './podcast.component.html',
})
export class PodcastComponent implements AfterViewInit {
  socialLinks = SocialLinks;

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
