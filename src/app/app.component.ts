import { AfterViewInit, Component, inject, NgZone, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { SnackbarComponent } from './shared/component-library/snackbar/component/snackbar.component'
import { CookieBannerComponent } from './shared/components/cookie-banner/cookie-banner.component'
import { ReadyToRenderService } from './shared/services/ready-to-render.service'
import { LenisService } from './shared/services/lenis.service'
import { CanonicalService } from './shared/services/canonical.service'
import { environment } from '../environments/environment'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SnackbarComponent, CookieBannerComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit {
  private readyToRenderService = inject(ReadyToRenderService)
  private lenisService = inject(LenisService)
  private canonicalService = inject(CanonicalService)

  ngOnInit() {
    gsap.registerPlugin(ScrollTrigger)
    this.canonicalService.setCanonicalURL(environment.url)
  }

  ngAfterViewInit() {
    this.readyToRenderService.initialize()
    this.lenisService.initLenis()
  }
}
