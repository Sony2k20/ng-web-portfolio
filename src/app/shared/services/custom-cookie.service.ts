import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GoogleAnalyticsService } from './google-analytics.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomCookieService {
  $showCookieBanner = new BehaviorSubject<boolean>(false);

  private cookieService = inject(CookieService);
  private googleAnalyticsService = inject(GoogleAnalyticsService);

  initializeCookieService() {
    if (environment.cookies === 'true') {
      const cookieConsent = this.cookieService.get('cookieConsent');
      if (cookieConsent === 'false') {
        const cookies = this.cookieService.getAll();
        Object.keys(cookies).forEach((value) => {
          if (value.includes('_ga')) {
            this.cookieService.delete(value);
          }
        });
      } else if (cookieConsent === 'true') {
        this.googleAnalyticsService.loadAnalyticsScript();
      } else {
        this.$showCookieBanner.next(true);
      }
    }
  }

  acceptCookies() {
    this.cookieService.set('cookieConsent', 'true');
    this.googleAnalyticsService.loadAnalyticsScript();

    const buttonElement = document.querySelector(
      '.cookie-banner',
    ) as HTMLElement;
    if (buttonElement) {
      buttonElement.classList.add('slideOutFromBot');
    }

    setTimeout(() => {
      if (buttonElement) {
        this.$showCookieBanner.next(false);
      }
    }, 400);
  }

  declineCookies() {
    this.cookieService.set('cookieConsent', 'false');

    const cookies = this.cookieService.getAll();
    Object.keys(cookies).forEach((value) => {
      if (value.includes('_ga')) {
        this.cookieService.delete(value);
      }
    });

    const buttonElement = document.querySelector(
      '.cookie-banner',
    ) as HTMLElement;
    if (buttonElement) {
      buttonElement.classList.add('slideOutFromBot');
    }

    setTimeout(() => {
      if (buttonElement) {
        this.$showCookieBanner.next(false);
      }
    }, 400);
  }
}
