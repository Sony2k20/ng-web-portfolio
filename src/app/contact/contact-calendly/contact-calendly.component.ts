import { AfterViewInit, Component, Input } from '@angular/core'

@Component({
  selector: 'app-contact-calendly',
  imports: [],
  templateUrl: './contact-calendly.component.html',
})
export class ContactCalendlyComponent implements AfterViewInit {
  @Input() baseUrl?: string

  ngAfterViewInit(): void {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)
  }

  get fullCalendlyUrl(): string {
    return `${this.baseUrl}?hide_gdpr_banner=1&background_color=f4f0f7&text_color=3c382f&primary_color=8277a3`
  }
}
