import { Injectable } from '@angular/core';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

@Injectable({
  providedIn: 'root',
})
export class ScrollTriggerHeaderService {
  private smoothScroll() {
    // const scroller = document.documentElement;
    // let previousScroll = 0;
    // let targetScroll = window.scrollY;
    // let currentScroll = window.scrollY;
    // const scrollEase = 0.08; // Adjust for smoother or faster easing
    // const updateScroll = () => {
    //   targetScroll = window.scrollY; // Track target scroll position
    //   currentScroll += (targetScroll - currentScroll) * scrollEase;
    //   scroller.style.transform = `translateY(-${currentScroll}px)`; // Apply smooth transform
    //   // Prevent layout issues
    //   if (Math.abs(targetScroll - currentScroll) > 0.5) {
    //     requestAnimationFrame(updateScroll);
    //   } else {
    //     currentScroll = targetScroll;
    //     scroller.style.transform = `translateY(-${currentScroll}px)`;
    //   }
    // };
    // window.addEventListener('scroll', () => {
    //   if (Math.abs(targetScroll - currentScroll) > 0.5) {
    //     requestAnimationFrame(updateScroll);
    //   }
    // });
  }

  initScrollTriggers() {
    this.smoothScroll(); // Initialize custom smooth scroll

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
