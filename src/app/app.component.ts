import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SnackbarComponent } from './shared/component-library/snackbar/component/snackbar.component';
import { CookieBannerComponent } from './shared/components/cookie-banner/cookie-banner.component';
import { CustomCookieService } from './shared/services/custom-cookie.service';
import { ReadyToRenderService } from './shared/services/ready-to-render.service';
import { filter, of, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SnackbarComponent, CookieBannerComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit {
  private readyToRenderService = inject(ReadyToRenderService);

  ngOnInit() {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit() {
    this.readyToRenderService.initialize();
  }
}
