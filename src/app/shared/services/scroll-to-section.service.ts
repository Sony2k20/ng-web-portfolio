import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject, Subscription, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollToSectionService {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  private navigationEndSubscription$?: Subscription;
  viewInitDone$ = new Subject<boolean>();

  navigateAndWait(sectionId: string): void {
    this.navigationEndSubscription$ = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        switchMap(() => this.viewInitDone$.pipe(take(1))),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.scrollToSectionUtil(sectionId, 300);
      });
  }

  scrollToSection(route: string, sectionId: string, event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    if (
      //removes backslash
      this.router.url.replace(/^\/|\/$/g, '') === route.replace(/^\/|\/$/g, '')
    ) {
      this.scrollToSectionUtil(sectionId, 100);
    } else {
      this.navigateAndWait(sectionId);
      this.router.navigate([route]);
    }
  }

  private scrollToSectionUtil(sectionId: string, waitTime: number): void {
    setTimeout(() => {
      // let sectionElement = document.querySelector(`#${sectionId}`);

      // if (sectionElement) {
      //   sectionElement.scrollIntoView({
      //     behavior: 'smooth',
      //     block: 'start',
      //   });
      // }

      let attempts = 0;
      const interval = 100;
      const maxAttempts = 3;

      const checkAndScroll = setInterval(() => {
        const sectionElement = document.querySelector(`#${sectionId}`);

        if (sectionElement) {
          clearInterval(checkAndScroll); // Stop checking when element is found
          sectionElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        } else if (++attempts >= maxAttempts) {
          clearInterval(checkAndScroll); // Stop checking after maxAttempts
          console.warn(
            `Element with ID "${sectionId}" was not found after ${maxAttempts} attempts.`,
          );
        }
      }, interval);

      this.viewInitDone$.next(false);
      if (this.navigationEndSubscription$)
        this.navigationEndSubscription$?.unsubscribe();
    }, waitTime);
  }
}
