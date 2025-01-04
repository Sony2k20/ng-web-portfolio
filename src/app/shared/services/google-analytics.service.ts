import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

declare const gtag: (
  command: string,
  targetId: string,
  config?: Record<string, unknown>,
) => void;

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  private measurementId = 'G-W7LN7NPFVM';

  public trackPageView(url: string): void {
    if (typeof gtag === 'function') {
      gtag('config', this.measurementId, {
        page_path: url,
      });
    } else {
      console.error('gtag function is not available');
    }
  }

  // Track events
  public trackEvent(
    action: string,
    category: string,
    label: string,
    value: number,
  ): void {
    gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}
