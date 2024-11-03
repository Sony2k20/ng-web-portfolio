import { Component, ElementRef, inject, AfterViewInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { IntersectionObserverService } from '../shared/services/intersection-observer-service.service';
import { SocialLinks } from '../shared/enums/social-links';

@Component({
  selector: 'app-podcast',
  standalone: true,
  imports: [HeaderComponent],
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
