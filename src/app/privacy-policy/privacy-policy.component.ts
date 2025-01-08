import { AfterViewInit, Component, inject } from '@angular/core';

import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { Contact } from '../shared/enums/contact.enum';
import { CustomCookieService } from '../shared/services/custom-cookie.service';
import { ScrollToSectionService } from '../shared/services/scroll-to-section.service';
import { CommonModule } from '@angular/common';
import { ReadyToRenderService } from '../shared/services/ready-to-render.service';
@Component({
  selector: 'app-privacy-policy',
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './privacy-policy.component.html',
})
export class PrivacyPolicyComponent implements AfterViewInit {
  contact = Contact;
  customCookieService = inject(CustomCookieService);
  readyToRenderService = inject(ReadyToRenderService);

  private scrollToSectionService = inject(ScrollToSectionService);

  ngAfterViewInit(): void {
    this.scrollToSectionService.viewInitDone$.next(true);
  }
}
