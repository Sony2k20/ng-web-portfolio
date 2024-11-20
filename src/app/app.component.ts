import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { gsap } from 'gsap';
import Draggable from 'gsap/Draggable';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest } from 'rxjs';

gsap.registerPlugin(ScrollTrigger, Draggable);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'ng-web-portfolio';
  private imageLoaded$ = new BehaviorSubject<boolean>(false);
  private fontLoaded$ = new BehaviorSubject<boolean>(false);
  isReadyToRender$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        //set timeout to dont infer with css animation at start
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100); // Timeout to ensure the DOM is updated
      }
    });
  }

  //move to service and refresh
  ngOnInit() {
    this.checkFontLoaded('Eyesome');
    combineLatest([this.imageLoaded$, this.fontLoaded$]).subscribe(
      ([isImageLoaded, isFontLoaded]) => {
        this.isReadyToRender$.next(isImageLoaded && isFontLoaded);
      },
    );

    this.isReadyToRender$.subscribe((value) => {
      if (value) {
        setTimeout(() => {
          document.querySelector('#start')!.classList.remove('slideInFromTop');
          this.initScrollTriggers();
        }, 1000);
      }
    });

    //lenis init
    // const lenis = new Lenis({});
    // const animate = (time: number) => {
    //   lenis.raf(time);
    //   requestAnimationFrame(animate);
    // };
    // requestAnimationFrame(animate);
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

  onImageLoad(): void {
    this.imageLoaded$.next(true);
  }

  checkFontLoaded(fontName: string): void {
    document.fonts.load(`1em ${fontName}`).then(() => {
      this.fontLoaded$.next(true);
    });
  }
}
