import { AfterViewInit, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailService } from '../shared/services/email.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { ScrollToSectionService } from '../shared/services/scroll-to-section.service';
import { ReadyToRenderService } from '../shared/services/ready-to-render.service';
import { ContactTabsComponent } from './contact-tabs/contact-tabs.component';

@Component({
  selector: 'app-email',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    HeaderComponent,
    FooterComponent,
    ContactTabsComponent,
  ],
  templateUrl: './contact.component.html',
  providers: [EmailService],
})
export class ContactComponent implements AfterViewInit {
  readyToRenderService = inject(ReadyToRenderService);

  private scrollToSectionService = inject(ScrollToSectionService);

  ngAfterViewInit(): void {
    this.scrollToSectionService.viewInitDone$.next(true);
  }
}
