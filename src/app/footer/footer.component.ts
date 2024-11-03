import { Component } from '@angular/core';
import { SocialLinksComponent } from '../shared/components/social-links/social-links.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SocialLinksComponent],
  templateUrl: './footer.component.html',
})
export class FooterComponent {}
