import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {
  InMemoryScrollingFeature,
  provideRouter,
  RouterConfigOptions,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routesConfig: RouterConfigOptions = {
  // onSameUrlNavigation: 'reload', // not working correctly
};

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling({
    // anchorScrolling: 'enabled', // not working correctly
  });

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule),
    provideRouter(
      routes,
      withRouterConfig(routesConfig),
      inMemoryScrollingFeature,
    ),
  ],
}).catch((err) => console.error(err));
