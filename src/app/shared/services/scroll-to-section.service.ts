import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ScrollToSectionService {
  private router = inject(Router);

  scrollToSection(route: string, sectionId: string, event?: Event) {
    if (event) {
      event.preventDefault();
    }

    if (this.router.url !== route) {
      this.router.navigate([route]);
      this.scrollToSectionUtil(sectionId, 400);
    } else {
      this.scrollToSectionUtil(sectionId, 50);
    }
  }

  private scrollToSectionUtil(sectionId: string, waitTime: number) {
    setTimeout(() => {
      document.querySelector('#' + sectionId)!.scrollIntoView({
        behavior: 'smooth',
        block: 'start', // Aligns the top of the element to the top of the viewport
      });
    }, waitTime);
  }
}
