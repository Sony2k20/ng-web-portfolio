import { Component, Input, ChangeDetectionStrategy } from '@angular/core'
import { SocialLinks } from '../../enums/social-links.enum'

export enum SocialPlatform {
  Youtube = 'youtube',
  Instagram = 'instagram',
  Spotify = 'spotify',
  TikTok = 'tiktok',
  Apple = 'apple',
}

@Component({
  selector: 'app-social-links',
  imports: [],
  styleUrls: ['./social-links.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './social-links.component.html',
})
export class SocialLinksComponent {
  @Input() hiddenPlatforms: SocialPlatform[] = []
  socialLinks = SocialLinks
  platform = SocialPlatform

  isHidden(platform: SocialPlatform): boolean {
    return this.hiddenPlatforms.includes(platform)
  }
}
