import { CommonModule } from '@angular/common'
import { Component, ElementRef, inject, ViewChild } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ReadyToRenderService } from '../../../shared/services/ready-to-render.service'
import { IntersectionObserverService } from '../../../shared/services/intersection-observer-service.service'

@Component({
  selector: 'app-video-reel',
  imports: [FormsModule, CommonModule],
  templateUrl: './video-reel.component.html',
  styleUrl: './video-reel.component.css',
})
export class VideoReelComponent {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>
  isMuted: boolean = true
  iconClicked = false
  readyToRenderService = inject(ReadyToRenderService)
  private _cleanupFns: Array<() => void> = []
  private elementRef = inject(ElementRef)
  private intersectionObserverService = inject(IntersectionObserverService)

  toggleMute() {
    this.isMuted = !this.isMuted
    this.iconClicked = true
  }

  ngAfterViewInit() {
    this.onVideoReelLoaded()
  }

  private onVideoReelLoaded() {
    const video: HTMLVideoElement = this.videoElement.nativeElement

    // Ensure the 'canplay' event is triggered before performing other actions
    video.addEventListener('canplay', this.onVideoCanPlay.bind(this))

    // Optionally, we can cleanup after 'ngOnDestroy' to prevent memory leaks.
    this._cleanupOnDestroy(() => {
      video.removeEventListener('canplay', this.onVideoCanPlay)
    })
  }

  private onVideoCanPlay() {
    this.observeElementWithAnimation('animate-visible', 'animate')
    this.observeElementWithAnimation('animate-invisible', 'animateOut')
  }

  private observeElementWithAnimation(
    visibleClass: string,
    animationClass: string,
  ) {
    this.intersectionObserverService.observeElements(
      this.elementRef,
      visibleClass,
      animationClass,
      '-170px',
      1500,
    )
  }

  private _cleanupOnDestroy(cleanupFn: () => void) {
    this._cleanupFns.push(cleanupFn)
  }

  ngOnDestroy() {
    // Clean up all registered event listeners and subscriptions.
    this._cleanupFns.forEach((fn) => fn())
    this._cleanupFns = []
  }
}
