import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  SocialLinksComponent,
  SocialPlatform,
} from '../social-links/social-links.component';

@Component({
  selector: 'app-fade-out-button',
  standalone: true,
  imports: [CommonModule, SocialLinksComponent],
  templateUrl: './fade-out-button.component.html',
  styleUrl: './fade-out-button.component.css',
})
export class FadeOutButtonComponent {
  @Input() type: string = '';
  @Input() text: string = '';
  @Input() additionalClasses: string = '';
  platform = SocialPlatform;
}
