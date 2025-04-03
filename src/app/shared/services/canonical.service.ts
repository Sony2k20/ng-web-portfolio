import { Injectable } from '@angular/core'
import { DomSanitizer, Meta } from '@angular/platform-browser'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class CanonicalService {
  constructor(
    private meta: Meta,
    private router: Router,
  ) {}

  setCanonicalURL(url?: string) {
    const canonicalURL = url || window.location.origin + this.router.url
    this.meta.updateTag({ rel: 'canonical', href: canonicalURL })
  }
}
