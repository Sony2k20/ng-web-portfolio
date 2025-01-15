import { inject, Injectable, NgZone } from '@angular/core'
import Lenis from 'lenis'

@Injectable({
  providedIn: 'root',
})
export class LenisService {
  lenis: Lenis | undefined
  private ngZone = inject(NgZone)

  private animationFrameId: number | undefined

  initLenis(): void {
    this.ngZone.runOutsideAngular(() => {
      this.lenis = new Lenis({})

      const raf = (time: number) => {
        if (this.lenis) {
          this.lenis.raf(time)
          this.animationFrameId = requestAnimationFrame(raf)
        }
      }

      this.animationFrameId = requestAnimationFrame(raf)
    })
  }

  // Clean up the requestAnimationFrame when the service is destroyed or no longer in use
  destroyLenis(): void {
    if (this.animationFrameId !== undefined) {
      cancelAnimationFrame(this.animationFrameId)
      this.animationFrameId = undefined
    }
    this.lenis = undefined
  }
}
