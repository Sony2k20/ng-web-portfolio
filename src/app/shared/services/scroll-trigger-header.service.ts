import { Injectable } from '@angular/core';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);
@Injectable({
  providedIn: 'root',
})
export class ScrollTriggerHeaderService {
  initScrollTriggers() {
    const showAnim = gsap
      .fromTo(
        document.querySelector('#start'),
        {
          yPercent: -100,
          opacity: 1,
          paused: true,
        },
        { yPercent: 0, paused: true, duration: 0.2, opacity: 1.0 },
      )
      .progress(1);

    ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      markers: false,
      onUpdate: (self) => {
        if (self.direction === -1) {
          showAnim.play();
        } else {
          showAnim.reverse();
        }
      },
    });
  }
}
