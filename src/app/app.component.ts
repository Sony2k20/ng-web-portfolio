import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FooterComponent } from './footer/footer.component';
import { gsap } from 'gsap';
import Draggable from 'gsap/Draggable';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
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

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100); // Timeout to ensure the DOM is updated
      }
    });
  }

  //move to service and refreh - see chatgpt
  ngOnInit() {
    gsap.registerPlugin(ScrollTrigger, Draggable);

    this.initScrollTriggers();

    //lenis init
    const lenis = new Lenis({});
    const animate = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
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
}
