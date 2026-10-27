import { Component, Input } from '@angular/core'
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
