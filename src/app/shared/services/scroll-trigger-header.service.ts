import { Injectable } from '@angular/core';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import Lenis from 'lenis';

@Injectable({
  providedIn: 'root',
})
export class ScrollTriggerHeaderService {
  initScrollTriggers() {
    // Initialize Lenis
    const lenis = new Lenis({
      lerp: 0.1, // Adjust for smoother or faster scrolling (0 to 1)
    });

    function raf(time: number) {
      lenis.raf(time); // Update Lenis each frame
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP Animation
    const showAnim = gsap
      .fromTo(
        document.querySelector('#start'),
        {
          yPercent: -100,
          opacity: 1,
          paused: true,
        },
        {
          yPercent: 0,
          paused: true,
          duration: 0.2,
          opacity: 1.0,
        },
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

    // Notify ScrollTrigger about scroll changes with Lenis
    lenis.on('scroll', () => {
      ScrollTrigger.update(); // Synchronize ScrollTrigger with Lenis
    });
  }
}
