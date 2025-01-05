import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CustomCookieService } from '../../services/custom-cookie.service';

@Component({
  selector: 'app-cookie-banner',
  imports: [CommonModule],
  templateUrl: './cookie-banner.component.html',
  styleUrl: './cookie-banner.component.css',
})
export class CookieBannerComponent {
  customCookieService = inject(CustomCookieService);

  acceptCookies() {
    this.customCookieService.acceptCookies();
  }

  declineCookies() {
    this.customCookieService.declineCookies();
  }
}
