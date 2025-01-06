import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SnackbarComponent } from './shared/components/snackbar/component/snackbar.component';
import { CookieBannerComponent } from './shared/components/cookie-banner/cookie-banner.component';
import { CustomCookieService } from './shared/services/custom-cookie.service';
import { ReadyToRenderService } from './shared/services/ready-to-render.service';
import { filter, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SnackbarComponent, CookieBannerComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit {
  private customCookieService = inject(CustomCookieService);
  private readyToRenderService = inject(ReadyToRenderService);
  private router = inject(Router);

  ngOnInit() {
    gsap.registerPlugin(ScrollTrigger);
    this.readyToRenderService.loadFont();
  }

  ngAfterViewInit() {
    this.readyToRenderService.fontRdy$
      .pipe(
        filter((value) => value === true),
        take(1),
        // Check if the route is '/' before subscribing to heroImageRdy$
        switchMap(() => {
          if (this.router.url === '/') {
            return this.readyToRenderService.heroImageRdy$;
          }
          return []; // return an empty observable if not on the '/' route
        }),
        filter((value) => value === true),
        take(1),
      )
      .subscribe(() => {
        setTimeout(() => {
          this.customCookieService.initializeCookieService();
        }, 5500);
      });
  }
}
