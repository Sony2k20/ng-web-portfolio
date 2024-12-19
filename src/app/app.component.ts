import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { gsap } from 'gsap';
import Draggable from 'gsap/Draggable';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { GoogleAnalyticsService } from './shared/services/google-analytics.service';
import { environment } from '../environments/environment';

gsap.registerPlugin(ScrollTrigger, Draggable);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'ng-web-portfolio';
  fontLoaded$ = new BehaviorSubject<boolean>(false);

  private router = inject(Router);
  private googleAnalyticsService = inject(GoogleAnalyticsService);

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.googleAnalyticsService.trackPage(event.urlAfterRedirects);
      }
    });
    this.checkFontLoaded('Eyesome');
  }

  checkFontLoaded(fontName: string): void {
    document.fonts.load(`1em ${fontName}`).then(() => {
      this.fontLoaded$.next(true);
    });
  }
}
