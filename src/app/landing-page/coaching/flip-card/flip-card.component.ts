import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-flip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flip-card.component.html',
  styleUrl: './flip-card.component.css',
})
export class FlipCardComponent {
  cards = [
    {
      modul: 'Modul 1: Klarheit schaffen – Dein Kompass für die Zukunft',
      erklarung: `Im ersten Schritt legen wir deinen persönlichen Kompass fest: Was ist dir wirklich wichtig, und wo willst du hin? 
      Was erfüllt dich wirklich? Gemeinsam entwickeln wir eine klare Vision für ein Leben voller Sinn und Erfüllung.`,
    },
    {
      modul: 'Modul 2: Blockaden lösen – Befreie dich von inneren Hindernissen',
      erklarung: `Hast du das Gefühl, dass etwas in dir dich zurückhält? In diesem Modul decken wir die Muster, Ängste und 
      limitierenden Glaubenssätze auf, die dich blockieren. Wir schaffen Raum, damit du dich von diesen Belastungen 
      befreien kannst und bereit bist, deinen Weg ohne innere Fesseln zu gehen.`,
    },
    {
      modul: 'Modul 3: Transformation – Dein neues Mindset',
      erklarung: `Jetzt ist es Zeit, dein inneres Fundament neu zu gestalten. Wir verwandeln alte, limitierende Gedanken 
      in kraftvolle, unterstützende Überzeugungen. Mit gezielten Übungen und einem stärkenden Mindset legst du die Grundlage 
      für deine persönliche Transformation.`,
    },
    {
      modul: 'Modul 4: Umsetzung – Deine Vision wird Realität',
      erklarung: `Die Theorie wird Praxis! Mit einem klaren Plan, messbaren Meilensteinen und ersten Schritten begleite ich dich 
      dabei, deine Berufung in die Realität umzusetzen und erste Erfolge zu feiern.`,
    },
    {
      modul:
        'Modul 5: Integration – Dein erfülltes Leben langfristig gestalten',
      erklarung: `Damit deine Veränderung nachhaltig bleibt, entwickeln wir neue Routinen und Strategien, die dich langfristig 
      unterstützen. Wir verankern deinen Fortschritt im Alltag, damit dein Leben dauerhaft von Sinn und Erfüllung geprägt ist.`,
    },
  ];
}
