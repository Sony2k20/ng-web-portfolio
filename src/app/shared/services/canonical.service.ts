import { inject, Injectable } from '@angular/core'
import { Meta } from '@angular/platform-browser'

@Injectable({
  providedIn: 'root',
})
export class CanonicalService {
  private meta = inject(Meta)

  setCanonicalURL(url: string) {
    this.meta.updateTag({ rel: 'canonical', href: url })
  }
}
