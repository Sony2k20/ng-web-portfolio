import { Component, inject } from '@angular/core';
import { LoadingDotsComponent } from '../../component-library/loading-dots/loading-dots.component';
import { CommonModule } from '@angular/common';
import { ReadyToRenderService } from '../../services/ready-to-render.service';

@Component({
  selector: 'app-loading-screen',
  imports: [LoadingDotsComponent, CommonModule],
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.css',
})
export class LoadingScreenComponent {
  readyToRenderService = inject(ReadyToRenderService);
}
