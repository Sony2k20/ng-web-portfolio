import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReadyToRenderService } from '../../../shared/services/ready-to-render.service';
import { IntersectionObserverService } from '../../../shared/services/intersection-observer-service.service';

@Component({
  selector: 'app-video-reel',
  imports: [FormsModule, CommonModule],
  templateUrl: './video-reel.component.html',
  styleUrl: './video-reel.component.css',
})
export class VideoReelComponent {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  isMuted: boolean = true;
  iconClicked = false;
  readyToRenderService = inject(ReadyToRenderService);
  private elementRef = inject(ElementRef);
  private intersectionObserverService = inject(IntersectionObserverService);

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.iconClicked = true;
  }

  ngAfterViewInit() {
    this.intersectionObserverService.observeElements(
      this.elementRef,
      'animate-visible',
      'animate',
      '-170px',
      900,
    );

    this.intersectionObserverService.observeElements(
      this.elementRef,
      'animate-invisible',
      'animateOut',
      '-170px',
      900,
    );
  }
}
