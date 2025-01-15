import { Injectable, ElementRef } from '@angular/core'

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
   * @param rootMargin - The intersection shift in y-axis (min should be '-180px').
   * @param delay - Delay for animation.
   */
  private observer: IntersectionObserver | null = null

  observeElements(
    elementRef: ElementRef,
    classNameToAdd: string,
    querySelectorClass: string,
    rootMargin = '-140px',
    delay = 100,
  ) {
    const elements = elementRef.nativeElement.querySelectorAll(
      `.${querySelectorClass}`,
    )

    if (elements.length === 0) {
      console.warn(`Elements with class "${querySelectorClass}" not found.`)
      return
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add(classNameToAdd)
            }, delay)
            this.observer?.unobserve(entry.target)
          }
        })
      },
      { rootMargin },
    )

    elements.forEach((element: Element) => this.observer!.observe(element))
  }

  ngOnDestroy() {
    this.observer?.disconnect()
  }
}
