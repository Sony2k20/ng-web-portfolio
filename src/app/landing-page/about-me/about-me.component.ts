import { Component } from '@angular/core';
import { SocialLinks } from '../../shared/enums/social-links';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.component.html',
})
export class AboutMeComponent {
  socialLinks = SocialLinks;
}
