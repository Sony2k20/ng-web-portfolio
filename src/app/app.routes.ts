import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PodcastComponent } from './podcast/podcast.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  {
    path: 'podcast',
    component: PodcastComponent,
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
