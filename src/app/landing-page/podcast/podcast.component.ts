import { Component, ElementRef, inject, AfterViewInit } from '@angular/core'
import { SocialLinks } from '../../shared/enums/social-links.enum'
import { IntersectionObserverService } from '../../shared/services/intersection-observer-service.service'
import { FadeOutButtonComponent } from '../../shared/component-library/fade-out-button/fade-out-button.component'
import { VideoReelComponent } from './video-reel/video-reel.component'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-podcast',
  imports: [FadeOutButtonComponent, VideoReelComponent, CommonModule],
  templateUrl: './podcast.component.html',
  styleUrl: './podcast.component.css',
})
export class PodcastComponent implements AfterViewInit {
  socialLinks = SocialLinks
  isVideoReelLoaded: boolean = false

  private elementRef = inject(ElementRef)
  private intersectionObserverService = inject(IntersectionObserverService)

  ngAfterViewInit() {
    this.intersectionObserverService.observeElements(
      this.elementRef,
      'animate-visible',
      'animate',
    )
  }
}
