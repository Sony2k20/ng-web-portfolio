import { Component, inject } from '@angular/core';
import { SocialLinksComponent } from '../social-links/social-links.component';
import { RouterModule } from '@angular/router';
import { Routes } from '../../enums/routes.enum';
import { ScrollToSectionService } from '../../services/scroll-to-section.service';
import { Contact } from '../../enums/contact.enum';
import { CustomCookieService } from '../../services/custom-cookie.service';

@Component({
  selector: 'app-footer',
  imports: [SocialLinksComponent, RouterModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  contact = Contact;
  routes = Routes;
  scroller = inject(ScrollToSectionService);
  customCookieService = inject(CustomCookieService);
}
