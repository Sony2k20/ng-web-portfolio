import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ElementRef, inject } from '@angular/core';
import { IntersectionObserverService } from '../../shared/services/intersection-observer-service.service';
import { MainButtonComponent } from '../../shared/components/main-button/main-button.component';
import { Routes } from '../../shared/enums/routes.enum';
import { ScrollToSectionService } from '../../shared/services/scroll-to-section.service';

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [CommonModule, MainButtonComponent],
  templateUrl: './faq-section.component.html',
})
export class FaqSectionComponent implements AfterViewInit {
  // This will hold the state of the accordion items
  openIndex: number | null = null;
  routes = Routes;
  scroller = inject(ScrollToSectionService);
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

  accordionItems = [
    {
      question:
        'Woher weiß ich welches Coaching-Paket zu meinem Anliegen passt?',
      answer:
        'Wir beginnen mit einem kostenlosen Erstgespräch, in dem wir deine Ziele besprechen. In diesem Gespräch bekomme ich ein Gefühl für dein Anliegen, erkläre dir meine Coaching Pakete nochmal konkret und kann dir für dein Anliegen ein Paket empfehlen. Du selbst kannst jedoch nach diesem Gespräch entscheiden, welches Paket sich für dich richtig anfühlt.',
    },
    {
      question: 'In welchen Abständen finden unsere Termine statt?',
      answer:
        'Das gestalte ich von Coachee zu Coachee unterschiedlich, da Jeder andere Vorstellungen und Bedürfnisse hat. Daher erarbeiten wir gemeinsam einen Zeitplan der für dich passt.',
    },
    {
      question:
        'Begleitest du mich im Coaching-Prozess persönlich oder virtuell?',
      answer:
        'Je nach Standort und Möglichkeit, begleite ich meine Coachees gern persönlich auf ihrem Weg. Allerdings habe ich auch schon großartige Erfahrung mit online Coaching gemacht und empfinde daher beide Möglichkeiten als kraftvoll. Oft erarbeiten wir uns eine Kombination aus Online und Präsenz. Auch hier werden wir einen gemeinsamen Plan erstellen, je nachdem was die Gegebenheiten (Entfernung / Zeit ) hergeben.',
    },
  ];

  toggleAccordion(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }
}
