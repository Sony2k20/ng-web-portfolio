import { Injectable } from '@angular/core';

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

  trackPage(pagePath: string): void {
    if (typeof gtag === 'function') {
      gtag('config', this.measurementId, { page_path: pagePath });
    } else {
      console.warn('gtag function is not available.');
    }
  }
}
