import { CommonModule } from '@angular/common'
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
  ],
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent implements AfterViewInit {
  readyToRenderService = inject(ReadyToRenderService)
  private scrollToSectionService = inject(ScrollToSectionService)

  ngAfterViewInit(): void {
    this.scrollToSectionService.viewInitDone$.next(true)
    this.readyToRenderService.isVideoReelLoaded$.next(true)
  }

  onImageLoad(event: Event): void {
    this.readyToRenderService.heroImageRdy$.next(true)
  }
}
