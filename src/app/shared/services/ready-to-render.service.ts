import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, of, switchMap, take } from 'rxjs';
import FontFaceObserver from 'fontfaceobserver';
import { NavigationEnd, Router } from '@angular/router';
import { CustomCookieService } from './custom-cookie.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ReadyToRenderService {
  heroImageRdy$ = new BehaviorSubject<boolean>(false);
  fontRdy$ = new BehaviorSubject<boolean>(false);
  isVideoReelLoaded$ = new BehaviorSubject<boolean>(false);
  private router = inject(Router);
  private customCookieService = inject(CustomCookieService);
  private destroyRef = inject(DestroyRef);

  initialize() {
    this.watchLoadingSubjects();
    this.loadFont();
  }

  private watchLoadingSubjects() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd), // Wait for a navigation end event
        take(1), // Only take the first navigation end event
        switchMap(() => {
          console.log('Navigation ended, checking font readiness...');
          return this.fontRdy$.pipe(
            filter((value) => value === true), // Wait for font readiness
            take(1), // Only take the first time font is ready
          );
        }),
        switchMap(() => {
          console.log('Router URL after navigation:', this.router.url);
          if (!this.router.url) return of(true);
          if (this.router.url === '/') {
            return this.heroImageRdy$; // Wait for hero image readiness if on home page
          }
          return of(true);
        }),
        filter((value) => value === true),
        take(1),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        document
          .querySelector('#loading-screen')!
          .classList.add('loading-sc-hidden');
        setTimeout(() => {
          this.customCookieService.initializeCookieService();
        }, 5500);
      });
  }

  private loadFont() {
    const eyesomeFont = new FontFaceObserver('Eyesome', {
      weight: 100,
    });

    eyesomeFont
      .load(null, 5000)
      .then(() => {
        this.fontRdy$.next(true);
      })
      .catch((error) => {
        console.error('Font failed to load', error);
      });
  }
}
