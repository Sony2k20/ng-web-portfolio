import {
  Component,
  ElementRef,
  AfterViewInit,
  inject,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { IntersectionObserverService } from '../../shared/services/intersection-observer-service.service';
import { SocialLinksComponent } from '../../shared/components/social-links/social-links.component';
import { Contact } from '../../shared/enums/contact.enum';
import { CarouselComponent } from '../../shared/components/carousel/carousel.component';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [SocialLinksComponent, CarouselComponent],
  templateUrl: './about-me.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AboutMeComponent implements AfterViewInit {
  contact = Contact;
  private elementRef = inject(ElementRef);
  private intersectionObserverService = inject(IntersectionObserverService);

  ngAfterViewInit() {
    this.intersectionObserverService.observeElements(
      this.elementRef,
      'animate-visible',
      'animate',
      1,
    );
  }

  onSlideChange(e: Event) {
    console.log('slide changed', (e as any).detail[0]);
  }
}
