import { Component } from '@angular/core';

@Component({
  selector: 'app-video-reel',
  imports: [],
  templateUrl: './video-reel.component.html',
  styleUrl: './video-reel.component.css',
})
export class VideoReelComponent {
  isMuted: boolean = true;

  toggleMute() {
    this.isMuted = !this.isMuted;
  }
}
