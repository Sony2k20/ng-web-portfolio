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
      import('./imprint/imprint.component').then((mod) => mod.ImprintComponent),
  },
  {
    path: RoutesEnums.PrivacyPolicy,
    loadComponent: () =>
      import('./privacy-policy/privacy-policy.component').then(
        (mod) => mod.PrivacyPolicyComponent,
      ),
  },
  {
    path: RoutesEnums.Contact,
    loadComponent: () =>
      import('./contact/contact.component').then((mod) => mod.ContactComponent),
  },
  {
    path: RoutesEnums.About,
    loadComponent: () =>
      import('./about/about.component').then((mod) => mod.AboutComponent),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
