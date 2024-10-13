import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-podcast',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './podcast.component.html',
})
export class PodcastComponent {}
