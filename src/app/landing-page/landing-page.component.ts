import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { FaqSectionComponent } from './faq-section/faq-section.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { PodcastComponent } from './podcast/podcast.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    FaqSectionComponent,
    AboutMeComponent,
    PodcastComponent,
  ],
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent {}
