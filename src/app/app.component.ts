import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FooterComponent } from './footer/footer.component';
import { gsap } from 'gsap';
import Draggable from 'gsap/Draggable';
import ScrollTrigger from 'gsap/ScrollTrigger';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    LandingPageComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'ng-web-portfolio';

  ngOnInit() {
    gsap.registerPlugin(ScrollTrigger, Draggable);

    this.initScrollTriggers();
  }

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

  // Setting to scroll full height
  // @HostListener('wheel', ['$event'])
  // onScroll(event: WheelEvent) {
  //   event.preventDefault();
  //   const scrollAmount = window.innerHeight; // h-screen equivalent

  //   if (event.deltaY > 0) {
  //     // Scroll down
  //     window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
  //   } else {
  //     // Scroll up
  //     window.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
  //   }
  // }
}
