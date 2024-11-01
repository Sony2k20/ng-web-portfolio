import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, LandingPageComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'ng-web-portfolio';
  ngOnInit(): void {
    initFlowbite();
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
