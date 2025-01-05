import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CustomCookieService } from '../../services/custom-cookie.service';
import { Routes } from '../../enums/routes.enum';
import { ScrollToSectionService } from '../../services/scroll-to-section.service';

@Component({
  selector: 'app-cookie-banner',
  imports: [CommonModule],
  templateUrl: './cookie-banner.component.html',
  styleUrl: './cookie-banner.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieBannerComponent {
  routes = Routes;
  scroller = inject(ScrollToSectionService);

  customCookieService = inject(CustomCookieService);

  acceptCookies() {
    const buttonElement = document.querySelector(
      '.cookie-banner',
    ) as HTMLElement;
    if (buttonElement) {
      buttonElement.classList.add('slideOutFromBot');
    }

    setTimeout(() => {
      this.customCookieService.acceptCookies();
      if (buttonElement) {
        buttonElement.classList.remove('slideOutFromBot');
      }
    }, 400);
  }

  declineCookies() {
    const buttonElement = document.querySelector(
      '.cookie-banner',
    ) as HTMLElement;
    if (buttonElement) {
      buttonElement.classList.add('slideOutFromBot');
    }

    setTimeout(() => {
      this.customCookieService.declineCookies();
      if (buttonElement) {
        buttonElement.classList.remove('slideOutFromBot');
      }
    }, 400);
  }
}
