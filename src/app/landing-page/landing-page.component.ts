import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { FaqSectionComponent } from './faq-section/faq-section.component';
import { FooterComponent } from '../footer/footer.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { CoachingComponent } from './coaching/coaching.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroSectionComponent,
    FaqSectionComponent,
    FooterComponent,
    AboutMeComponent,
    CoachingComponent,
  ],
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent {}
