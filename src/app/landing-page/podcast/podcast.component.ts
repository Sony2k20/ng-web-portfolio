import { Component, ElementRef, inject, AfterViewInit } from '@angular/core';
import { SocialLinks } from '../../shared/enums/social-links.enum';
import { IntersectionObserverService } from '../../shared/services/intersection-observer-service.service';
import { FadeOutButtonComponent } from '../../shared/components/fade-out-button/fade-out-button.component';

@Component({
  selector: 'app-podcast',
  standalone: true,
  imports: [FadeOutButtonComponent],
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
