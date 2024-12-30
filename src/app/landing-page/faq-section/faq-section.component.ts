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
      question: 'Für wen ist dein Coaching geeignet?',
      answer:
        'Das Coaching richtet sich an Menschen, die in ihrem Beruf oder Alltag keine Erfüllung mehr finden und nach mehr Sinn streben. Sie spüren, dass sie für etwas Größeres bestimmt sind, wissen aber noch nicht, wie sie dieses Ziel erreichen können. Sie sind bereit, sich selbst besser kennenzulernen und ihr Leben aktiv zu verändern.',
    },
    {
      question: 'Was, wenn ich gar nicht weiß, was meine Berufung ist?',
      answer:
        'Das ist völlig normal. Viele Menschen spüren, dass sie etwas ändern möchten, wissen aber nicht genau, wohin sie wollen. Genau hier setzen wir an: Gemeinsam bringen wir Klarheit in deine Wünsche und Stärken. Mit gezielten Übungen und Reflexionen findest du heraus, was dich wirklich erfüllt und was deine Berufung ist.',
    },
    {
      question: 'Wie weiß ich, ob dieses Coaching das Richtige für mich ist?',
      answer:
        'Dieses Coaching ist ideal für dich, wenn du spürst, dass du in deinem aktuellen Leben stagnierst und bereit bist, neue Wege zu gehen. Wenn du dir eine klare Vision wünschst und endlich Schritte in Richtung Selbstverwirklichung und Erfüllung machen möchtest, begleite ich dich dabei mit einem strukturierten und individuell angepassten Ansatz.',
    },
    {
      question: 'Was, wenn ich glaube, dass ich mich nicht ändern kann?',
      answer:
        'Wir alle haben diese Zweifel. Vor allem, wenn uns alte Glaubenssätze und Muster blockieren. Aber Veränderung ist möglich, wenn du bereit bist, dich darauf einzulassen. In meinem Coaching arbeiten wir gemeinsam daran, diese Hindernisse zu erkennen und Schritt für Schritt aufzulösen. Übernimm die Verantwortung und gestalte das erfüllte Leben, was du wirklich willst.',
    },
    {
      question:
        'Ich habe wenig Zeit, wie kann ich das Coaching in meinen Alltag integrieren?',
      answer:
        'Ich verstehe, dass der Alltag oft stressig ist. Deshalb ist mein Coaching so konzipiert, dass wir uns auf das Wesentliche konzentrieren. Zwischen den Sitzungen bekommst du klare, umsetzbare Aufgaben, die sich flexibel in deinen Alltag einfügen lassen. Außerdem begleite ich dich dabei, Prioritäten zu setzen und mehr Raum für dich selbst zu schaffen.',
    },
    {
      question:
        'Was ist, wenn ich unsicher bin, ob ich die Vision umsetzen kann?',
      answer:
        'Das ist eine berechtigte Sorge. Große Ziele können einschüchternd wirken. Gemeinsam entwickeln wir einen Schritt-für-Schritt-Plan, der dir Sicherheit gibt. Du musst nicht alles auf einmal schaffen; kleine, kontinuierliche Schritte führen zum Erfolg.',
    },
    {
      question: 'Was macht dein Coaching anders als andere Angebote?',
      answer:
        'Mein Coaching basiert nicht nur auf Techniken und Methoden, sondern auch auf meiner persönlichen Erfahrung. Nach einem schweren Motorradunfall musste ich mein Leben komplett neu gestalten. Heute lebe ich meine Berufung – und genau das möchte ich auch dir ermöglichen. Mit einer Mischung aus Empathie, Struktur und Praxisnähe begleite ich dich auf deinem Weg.',
    },
  ];

  toggleAccordion(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }
}
