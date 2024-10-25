import { Component } from '@angular/core';
import { SocialLinks } from '../shared/enums/social-links';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  socialLinks = SocialLinks;
}
