import { Routes } from '@angular/router';
import { Routes as RoutesEnums } from './shared/enums/routes.enum';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./landing-page/landing-page.component').then(
        (mod) => mod.LandingPageComponent,
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
