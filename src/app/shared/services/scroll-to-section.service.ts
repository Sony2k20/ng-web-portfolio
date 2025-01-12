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

  private navigateAndWait(sectionId: string): void {
    this.navigationEndSubscription$ = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        switchMap(() => this.viewInitDone$.pipe(take(1))),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.scrollToSectionUtil(sectionId, 200);
      });
  }

  private scrollToSectionUtil(sectionId: string, waitTime: number): void {
    setTimeout(() => {
      let sectionElement = document.querySelector(`#${sectionId}`);

      if (sectionElement) {
        const topOffset =
          sectionElement.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: topOffset,
          behavior: 'smooth',
        });
      }

      this.viewInitDone$.next(false);
      if (this.navigationEndSubscription$)
        this.navigationEndSubscription$?.unsubscribe();
    }, waitTime);
  }
}
