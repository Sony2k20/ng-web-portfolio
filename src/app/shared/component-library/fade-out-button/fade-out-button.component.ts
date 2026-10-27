import { CommonModule } from '@angular/common'
import { Component, Input, ChangeDetectionStrategy } from '@angular/core'
import {
  SocialLinksComponent,
  SocialPlatform,
} from '../social-links/social-links.component'

@Component({
  selector: 'app-fade-out-button',
  imports: [CommonModule, SocialLinksComponent],
  templateUrl: './fade-out-button.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './fade-out-button.component.css',
})
export class FadeOutButtonComponent {
  @Input() type = ''
  @Input() text = ''
  @Input() additionalClasses = ''
  platform = SocialPlatform
}
