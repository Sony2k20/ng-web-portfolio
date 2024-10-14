import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, HeroSectionComponent],
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent {
  pages = new Array(10);
}
