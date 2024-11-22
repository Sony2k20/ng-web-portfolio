import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {
  InMemoryScrollingFeature,
  provideRouter,
  RouterConfigOptions,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';
import { routes } from './app/app.routes';

const routesConfig: RouterConfigOptions = {
  onSameUrlNavigation: 'reload',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling({
    anchorScrolling: 'enabled',
  });

// Bootstrap the application with the router, scrolling, and routesConfig
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      routes,
      withRouterConfig(routesConfig), // Apply the routesConfig here as a feature
      inMemoryScrollingFeature, // Apply the in-memory scrolling feature
    ),
  ],
}).catch((err) => console.error(err));
