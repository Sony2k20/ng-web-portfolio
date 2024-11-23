import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { FaqSectionComponent } from './faq-section/faq-section.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { PodcastComponent } from './podcast/podcast.component';
import { HeaderComponent } from '../header/header.component';
import { BehaviorSubject } from 'rxjs';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    FaqSectionComponent,
    AboutMeComponent,
    PodcastComponent,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent {
  isReadyToRender$ = new BehaviorSubject<boolean>(false);

  //toDo refactor preloading
  onImageLoad(): void {
    this.isReadyToRender$.next(true);
  }
}
