import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
// to do - use gsap
export class IntersectionObserverService {
  /**
   * Observe multiple elements and add a class when they become visible.
   * @param elementRef - The ElementRef of the parent container.
   * @param classNameToAdd - The class name to be added when an element is visible.
   * @param querySelectorClass - The class name used to query the elements.
   * @param threshold - The intersection threshold (default is 0.1).
   */
  observeElements(
    elementRef: ElementRef,
    classNameToAdd: string,
    querySelectorClass: string,
    threshold = 0.1,
  ) {
    const elements = elementRef.nativeElement.querySelectorAll(
      `.${querySelectorClass}`,
    );

    if (elements.length === 0) {
      console.warn(`Elements with class "${querySelectorClass}" not found.`);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(classNameToAdd);
            observer.unobserve(entry.target); // Stop observing to optimize performance
          }
        });
      },
      { rootMargin: '-140px' },
    );

    elements.forEach((element: Element) => observer.observe(element));
  }
}
