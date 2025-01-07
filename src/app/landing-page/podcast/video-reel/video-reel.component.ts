import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-video-reel',
  imports: [FormsModule, CommonModule],
  templateUrl: './video-reel.component.html',
  styleUrl: './video-reel.component.css',
})
export class VideoReelComponent {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  volume: number = 0.5;
  isMuted: boolean = true;
  isPlaying = true;

  toggleMute() {
    this.isMuted = !this.isMuted;
  }

  setVolume(volume: number) {
    if (this.videoElement) {
      this.videoElement.nativeElement.volume = volume;
    }
  }

  togglePlayPause() {
    if (this.videoElement) {
      if (this.isPlaying) {
        this.videoElement.nativeElement.pause();
      } else {
        this.videoElement.nativeElement.play();
      }
      this.isPlaying = !this.isPlaying;
    }
  }

  onPlay() {
    this.isPlaying = true;
  }

  onPause() {
    this.isPlaying = false;
  }
}
