import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { FaqSectionComponent } from './faq-section/faq-section.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { PodcastComponent } from './podcast/podcast.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { BehaviorSubject } from 'rxjs';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { CoachingComponent } from './coaching/coaching.component';

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
    ],
    templateUrl: './landing-page.component.html'
})
export class LandingPageComponent {
  isContentLoaded = false;
  isFontLoaded = false;
  isImageLoaded = false;

  isReadyToRender$ = new BehaviorSubject<boolean>(false);

  //toDo refactor preloading
  onImageLoad(): void {
    this.isReadyToRender$.next(true);
  }
}
