import { Component, inject } from '@angular/core';

import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { Contact } from '../shared/enums/contact.enum';
import { CustomCookieService } from '../shared/services/custom-cookie.service';
@Component({
  selector: 'app-privacy-policy',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './privacy-policy.component.html',
})
export class PrivacyPolicyComponent {
  contact = Contact;
  customCookieService = inject(CustomCookieService);
}
