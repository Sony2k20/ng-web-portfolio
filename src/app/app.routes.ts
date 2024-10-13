import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  {
    path: 'podcast',
    loadComponent: () =>
      import('./podcast/podcast.component').then((mod) => mod.PodcastComponent),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
