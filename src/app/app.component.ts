import {
  Component,
  OnInit,
  AfterViewInit,
  inject,
  DestroyRef,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { gsap } from 'gsap';
import Draggable from 'gsap/Draggable';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { GoogleAnalyticsService } from './shared/services/google-analytics.service';
import { ScrollTriggerHeaderService } from './shared/services/scroll-trigger-header.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

gsap.registerPlugin(ScrollTrigger, Draggable);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'ng-web-portfolio';
  isReadyToRender$ = new BehaviorSubject<boolean>(false);

  private imageLoaded$ = new BehaviorSubject<boolean>(false);
  private fontLoaded$ = new BehaviorSubject<boolean>(false);

  private router = inject(Router);
  private googleAnalyticsService = inject(GoogleAnalyticsService);
  private scrollTriggerHeaderService = inject(ScrollTriggerHeaderService);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.googleAnalyticsService.trackPage(event.urlAfterRedirects);
      }
    });

    this.checkFontLoaded();
    combineLatest([this.imageLoaded$, this.fontLoaded$])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([isImageLoaded, isFontLoaded]) => {
        this.isReadyToRender$.next(isImageLoaded && isFontLoaded);
      });

    this.isReadyToRender$.subscribe((value) => {
      if (value) {
        setTimeout(() => {
          //Timeout to don't interfere with initial animation
          //ToDo make slideInFromTop with gsap
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

  ngAfterViewInit() {
    ScrollTrigger.refresh();
  }

  onImageLoad(): void {
    this.imageLoaded$.next(true);
  }

  checkFontLoaded(): void {
    document.fonts.load(`1em Eyesome`).then(() => {
      this.fontLoaded$.next(true);
    });
  }
}
