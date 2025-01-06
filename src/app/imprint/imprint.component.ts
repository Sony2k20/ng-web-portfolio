import { AfterViewInit, Component, inject } from '@angular/core';

import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { Contact } from '../shared/enums/contact.enum';
import { ScrollToSectionService } from '../shared/services/scroll-to-section.service';
import { CommonModule } from '@angular/common';
import { ReadyToRenderService } from '../shared/services/ready-to-render.service';
import { LoadingDotsComponent } from "../shared/components/loading-dots/loading-dots.component";

@Component({
  selector: 'app-imprint',
  imports: [HeaderComponent, FooterComponent, CommonModule, LoadingDotsComponent],
  templateUrl: './imprint.component.html',
})
export class ImprintComponent implements AfterViewInit {
  contact = Contact;
  readyToRenderService = inject(ReadyToRenderService);

  private scrollToSectionService = inject(ScrollToSectionService);

  ngAfterViewInit(): void {
    this.scrollToSectionService.viewInitDone$.next(true);
  }
}
