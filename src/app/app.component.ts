import { Component, inject, OnInit, AfterViewInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { gsap } from 'gsap';
import Draggable from 'gsap/Draggable';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { GoogleAnalyticsService } from './shared/services/google-analytics.service';
import { ScrollTriggerHeaderService } from './shared/services/scroll-trigger-header.service';

gsap.registerPlugin(ScrollTrigger, Draggable);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'ng-web-portfolio';
  fontLoaded$ = new BehaviorSubject<boolean>(false);
  private lenis!: Lenis;

  private router = inject(Router);
  private googleAnalyticsService = inject(GoogleAnalyticsService);
  private scrollTriggerHeaderService = inject(ScrollTriggerHeaderService);

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.googleAnalyticsService.trackPage(event.urlAfterRedirects);

        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100); // Timeout to ensure the DOM is updated
      }
    });

    this.checkFontLoaded('Eyesome');

    this.fontLoaded$.subscribe((value) => {
      if (value) {
        setTimeout(() => {
          document.querySelector('#start')!.classList.remove('slideInFromTop');
          this.scrollTriggerHeaderService.initScrollTriggers();
        }, 1000);
      }
    });

    //lenis init
    // const lenis = new Lenis({});
    // const animate = (time: number) => {
    //   lenis.raf(time);
    //   requestAnimationFrame(animate);
    // };
    // requestAnimationFrame(animate);
  }

  checkFontLoaded(fontName: string): void {
    document.fonts.load(`1em ${fontName}`).then(() => {
      this.fontLoaded$.next(true);
    });
  }
}
