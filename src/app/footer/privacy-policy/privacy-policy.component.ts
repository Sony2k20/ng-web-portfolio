import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../footer.component';
@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css',
})
export class PrivacyPolicyComponent implements OnInit, AfterViewInit {
  @ViewChild('panelsContainer') panelsContainer!: ElementRef;
  private tween: gsap.core.Tween | undefined;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
  }

  ngAfterViewInit() {
    const panelsContainer =
      this.elementRef.nativeElement.querySelector('#panels-container');
    const panels = gsap.utils.toArray('.panel', panelsContainer);

    this.tween = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: panelsContainer,
        pin: true,
        start: 'top top',
        scrub: 1,
        snap: {
          snapTo: 1 / (panels.length - 1),
          inertia: false,
          duration: { min: 0.1, max: 0.1 },
        },
        end: () => `+=${panelsContainer.offsetWidth - window.innerWidth}`,
      },
    });

    // Add event listeners for navigation
    const anchors = this.elementRef.nativeElement.querySelectorAll('.anchor');
    anchors.forEach((anchor: Element) => {
      anchor.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const targetElem = document.querySelector(
          (e.target as HTMLAnchorElement).getAttribute('href')!,
        );
        let y: number | HTMLElement = targetElem as HTMLElement;
        if (
          targetElem &&
          panelsContainer.isSameNode(targetElem.parentElement)
        ) {
          const totalScroll =
            this.tween!.scrollTrigger!.end - this.tween!.scrollTrigger!.start;
          const totalMovement =
            (panels.length - 1) * (targetElem as HTMLElement).offsetWidth;
          y = Math.round(
            this.tween!.scrollTrigger!.start +
              ((targetElem as HTMLElement).offsetLeft / totalMovement) *
                totalScroll,
          );
        }
        gsap.to(window, {
          scrollTo: {
            y: y,
            autoKill: false,
          },
          duration: 1,
        });
      });
    });
  }
}
