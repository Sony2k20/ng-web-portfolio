import {
  AfterViewInit,
  Component,
  inject,
  NgZone,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SnackbarComponent } from './shared/component-library/snackbar/component/snackbar.component';
import { CookieBannerComponent } from './shared/components/cookie-banner/cookie-banner.component';
import { ReadyToRenderService } from './shared/services/ready-to-render.service';
import Lenis from 'lenis';
import { LenisService } from './shared/services/lenis.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SnackbarComponent, CookieBannerComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit {
  private readyToRenderService = inject(ReadyToRenderService);
  private lenisService = inject(LenisService);

  ngOnInit() {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit() {
    this.readyToRenderService.initialize();
    this.lenisService.initLenis();
  }
}
