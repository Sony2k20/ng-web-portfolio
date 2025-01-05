import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SnackbarComponent } from './shared/components/snackbar/component/snackbar.component';
import { CookieBannerComponent } from './shared/components/cookie-banner/cookie-banner.component';
import { CustomCookieService } from './shared/services/custom-cookie.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SnackbarComponent, CookieBannerComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'ng-web-portfolio';

  private customCookieService = inject(CustomCookieService);

  ngOnInit() {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit() {
    this.customCookieService.initializeCookieService();
  }
}
