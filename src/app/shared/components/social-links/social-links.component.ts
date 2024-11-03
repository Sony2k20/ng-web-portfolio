import { Component } from '@angular/core';
import { SocialLinks } from '../../enums/social-links';

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [],
  templateUrl: './social-links.component.html',
})
export class SocialLinksComponent {
  socialLinks = SocialLinks;
}
