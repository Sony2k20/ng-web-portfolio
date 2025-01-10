import {
  Component,
  ElementRef,
  AfterViewInit,
  inject,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { IntersectionObserverService } from '../../shared/services/intersection-observer-service.service';
import { SocialLinksComponent } from '../../shared/component-library/social-links/social-links.component';
import { Contact } from '../../shared/enums/contact.enum';
import { ScrollToSectionService } from '../../shared/services/scroll-to-section.service';
import { Routes } from '../../shared/enums/routes.enum';

@Component({
  selector: 'app-about-me',
  imports: [SocialLinksComponent],
  templateUrl: './about-me.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AboutMeComponent implements AfterViewInit {
  contact = Contact;
  routes = Routes;

  scroller = inject(ScrollToSectionService);

  private elementRef = inject(ElementRef);
  private intersectionObserverService = inject(IntersectionObserverService);

  ngAfterViewInit() {
    this.intersectionObserverService.observeElements(
      this.elementRef,
      'animate-visible',
      'animate',
    );
  }
}
