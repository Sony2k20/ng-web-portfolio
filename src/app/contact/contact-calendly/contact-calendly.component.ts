import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-contact-calendly',
  imports: [],
  templateUrl: './contact-calendly.component.html',
})
export class ContactCalendlyComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
  }
}
