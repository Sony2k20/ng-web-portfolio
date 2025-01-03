import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { GoogleAnalyticsService } from './shared/services/google-analytics.service';
import { SnackbarComponent } from './shared/components/snackbar/component/snackbar.component';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SnackbarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'ng-web-portfolio';

  private router = inject(Router);
  private googleAnalyticsService = inject(GoogleAnalyticsService);

  ngOnInit() {
    // swiper function
    register();
    gsap.registerPlugin(ScrollTrigger);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.googleAnalyticsService.trackPage(event.urlAfterRedirects);
      }
    });
  }
}
