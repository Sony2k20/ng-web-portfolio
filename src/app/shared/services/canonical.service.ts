import { Injectable } from '@angular/core'
import { Meta } from '@angular/platform-browser'

@Injectable({
  providedIn: 'root',
})
export class CanonicalService {
  constructor(private meta: Meta) {}

  setCanonicalURL(url: string) {
    this.meta.updateTag({ rel: 'canonical', href: url })
  }
}
