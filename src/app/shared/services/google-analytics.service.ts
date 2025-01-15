import { DestroyRef, inject, Injectable } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Router, NavigationEnd } from '@angular/router'
import { filter } from 'rxjs'

declare const gtag: (
  command: string,
  targetId: string,
  config?: Record<string, unknown>,
) => void

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  private measurementId = 'G-W7LN7NPFVM'
  private router = inject(Router)
  private destroyRef = inject(DestroyRef)

  loadAnalyticsScript(): void {
    const script = document.createElement('script')
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-W7LN7NPFVM'
    script.async = true
    document.head.appendChild(script)

    script.onload = () => {
      // Initialize gtag after the script has loaded
      ;(window as any).dataLayer = (window as any).dataLayer || []
      ;(window as any).gtag = function () {
        ;(window as any).dataLayer.push(arguments)
      }
      ;(window as any).gtag('js', new Date())
      ;(window as any).gtag('config', 'G-W7LN7NPFVM')
      this.initializeAnalyticsTracking()
    }
  }

  trackPageView(url: string): void {
    if (typeof gtag === 'function') {
      gtag('config', this.measurementId, {
        page_path: url,
      })
    } else {
      console.error('gtag function is not available')
    }
  }

  trackEvent(
    action: string,
    category: string,
    label: string,
    value: number,
  ): void {
    gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }

  private initializeAnalyticsTracking() {
    // Track initial page view
    this.trackPageView(window.location.pathname)
    // Track subsequent page views on route changes
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event: NavigationEnd) => {
        this.trackPageView(event.urlAfterRedirects)
      })
  }
}
