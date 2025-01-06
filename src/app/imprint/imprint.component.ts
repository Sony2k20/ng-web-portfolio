import { AfterViewInit, Component, inject } from '@angular/core';

import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { Contact } from '../shared/enums/contact.enum';
import { ScrollToSectionService } from '../shared/services/scroll-to-section.service';

@Component({
  selector: 'app-imprint',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './imprint.component.html',
})
export class ImprintComponent implements AfterViewInit {
  contact = Contact;

  private scrollToSectionService = inject(ScrollToSectionService);

  ngAfterViewInit(): void {
    this.scrollToSectionService.viewInitDone$.next(true);
  }
}
