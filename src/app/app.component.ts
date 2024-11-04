import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FooterComponent } from './footer/footer.component';

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
export class AppComponent {
  title = 'ng-web-portfolio';

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
