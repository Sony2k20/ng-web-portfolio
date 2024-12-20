import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { Routes as RoutesEnums } from './shared/enums/routes.enum';
import { imgLandingPageResolver } from './shared/resolvers/img-landing-page.resolver';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    pathMatch: 'full',
    resolve: {
      imagePath: imgLandingPageResolver,
    },
  },
  {
    path: 'podcast',
    loadComponent: () =>
      import('./landing-page/podcast/podcast.component').then(
        (mod) => mod.PodcastComponent,
      ),
  },
  {
    path: RoutesEnums.Imprint,
    loadComponent: () =>
      import('./footer/imprint/imprint.component').then(
        (mod) => mod.ImprintComponent,
      ),
  },
  {
    path: RoutesEnums.PrivacyPolicy,
    loadComponent: () =>
      import('./footer/privacy-policy/privacy-policy.component').then(
        (mod) => mod.PrivacyPolicyComponent,
      ),
  },
  {
    path: RoutesEnums.Contact,
    loadComponent: () =>
      import('./email/component/email.component').then(
        (mod) => mod.EmailComponent,
      ),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
