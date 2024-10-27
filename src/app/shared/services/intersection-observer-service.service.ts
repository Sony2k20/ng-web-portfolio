import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IntersectionObserverService {
  /**
   * Observe an element and add a class when it becomes visible.
   * @param elementRef - The ElementRef of the target element.
   * @param classNameToAdd - The class name to be added when the element is visible.
   * @param querySelectorClass - The class name used to query the element.
   * @param threshold - The intersection threshold (default is 0.1).
   */
  observeElement(
    elementRef: ElementRef,
    classNameToAdd: string,
    querySelectorClass: string,
    threshold = 0.1,
  ) {
    const element = elementRef.nativeElement.querySelector(
      `.${querySelectorClass}`,
    );

    if (!element) {
      console.warn(`Element with class "${querySelectorClass}" not found.`);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(classNameToAdd);
            observer.unobserve(entry.target); // Stop observing for performance reasons
          }
        });
      },
      { threshold: threshold },
    );

    observer.observe(element);
  }
}
