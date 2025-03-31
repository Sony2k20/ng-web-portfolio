import { CommonModule, ViewportScroller } from '@angular/common'
import { AfterViewInit, Component, inject } from '@angular/core'
import { HeroSectionComponent } from './hero-section/hero-section.component'
import { FaqSectionComponent } from './faq-section/faq-section.component'
import { AboutMeComponent } from './about-me/about-me.component'
import { PodcastComponent } from './podcast/podcast.component'
import { HeaderComponent } from '../shared/components/header/header.component'
import { FooterComponent } from '../shared/components/footer/footer.component'
import { CoachingComponent } from './coaching/coaching.component'
import { ReadyToRenderService } from '../shared/services/ready-to-render.service'
import { ScrollToSectionService } from '../shared/services/scroll-to-section.service'
import { WorkbookComponent } from './workbook/workbook.component'
import { DeepDiveComponent } from './deep-dive/deep-dive.component'
import { ActivatedRoute, Router } from '@angular/router'
import { combineLatest, filter, switchMap, tap } from 'rxjs'

@Component({
  selector: 'app-landing-page',
  imports: [
    CommonModule,
    HeroSectionComponent,
    FaqSectionComponent,
    AboutMeComponent,
    PodcastComponent,
    HeaderComponent,
    FooterComponent,
    CoachingComponent,
    WorkbookComponent,
    DeepDiveComponent,
  ],
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent implements AfterViewInit {
  readyToRenderService = inject(ReadyToRenderService)
  private scrollToSectionService = inject(ScrollToSectionService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private viewportScroller = inject(ViewportScroller)
  fragment: string = ''

  ngAfterViewInit(): void {
    this.scrollToSectionService.viewInitDone$.next(true)
    this.readyToRenderService.isVideoReelLoaded$.next(true)

    this.route.fragment
      .pipe(
        filter((fragment) => !!fragment),
        tap((fragment) => {
          if (fragment) this.fragment = fragment
        }),
        switchMap(() =>
          combineLatest([
            this.readyToRenderService.heroImageRdy$,
            this.readyToRenderService.fontRdy$,
          ]),
        ),
        filter(([heroReady, fontReady]) => heroReady && fontReady), // Ensure both are true
      )
      .subscribe(() => {
        setTimeout(() => {
          this.scrollToFragment(this.fragment)
        }, 300)
      })
  }

  scrollToFragment(fragment: string) {
    try {
      this.viewportScroller.scrollToAnchor(fragment)
    } catch (e) {
      console.warn('Scroll to anchor failed, falling back to native scroll')
      const element = document.getElementById(fragment)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  onImageLoad(event: Event): void {
    this.readyToRenderService.heroImageRdy$.next(true)
  }
}
