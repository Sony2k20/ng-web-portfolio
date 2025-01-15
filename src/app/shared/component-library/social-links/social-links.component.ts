import { Component, Input } from '@angular/core'
import { SocialLinks } from '../../enums/social-links.enum'
import { CommonModule } from '@angular/common'

export enum SocialPlatform {
  Youtube = 'youtube',
  Instagram = 'instagram',
  Spotify = 'spotify',
  TikTok = 'tiktok',
  Apple = 'apple',
}

@Component({
  selector: 'app-social-links',
  imports: [CommonModule],
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
