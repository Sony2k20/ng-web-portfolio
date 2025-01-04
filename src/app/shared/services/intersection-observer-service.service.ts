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
   * @param rootMargin - The intersection shift in y-axis (e.g. '-140px').
   */
  observeElements(
    elementRef: ElementRef,
    classNameToAdd: string,
    querySelectorClass: string,
    rootMargin = '-140px',
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
            setTimeout(() => {
              entry.target.classList.add(classNameToAdd);
            }, 100);
            observer.unobserve(entry.target); // Stop observing to optimize performance
          }
        });
      },
      { rootMargin: rootMargin },
    );

    elements.forEach((element: Element) => observer.observe(element));
  }
}
