import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReadyToRenderService } from '../../../shared/services/ready-to-render.service';

@Component({
  selector: 'app-video-reel',
  imports: [FormsModule, CommonModule],
  templateUrl: './video-reel.component.html',
  styleUrl: './video-reel.component.css',
})
export class VideoReelComponent {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  isMuted: boolean = true;
  iconClicked = false;
  readyToRenderService = inject(ReadyToRenderService);

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.iconClicked = true;
  }
}
