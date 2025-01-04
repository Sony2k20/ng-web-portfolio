import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { GoogleAnalyticsService } from './shared/services/google-analytics.service';
import { SnackbarComponent } from './shared/components/snackbar/component/snackbar.component';
import { environment } from '../environments/environment';
import { filter } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SnackbarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'ng-web-portfolio';
  private cookieService = inject(CookieService);
  private router = inject(Router);
  private googleAnalyticsService = inject(GoogleAnalyticsService);

  ngOnInit() {
    gsap.registerPlugin(ScrollTrigger);

    if (environment.prod) {
      this.router.events.subscribe((event) => {
        // Track initial page view
        this.googleAnalyticsService.trackPageView(window.location.pathname);

        // Track subsequent page views on route changes
        this.router.events
          .pipe(filter((event) => event instanceof NavigationEnd))
          .subscribe((event: NavigationEnd) => {
            this.googleAnalyticsService.trackPageView(event.urlAfterRedirects);
          });
      });
    }
  }
}
