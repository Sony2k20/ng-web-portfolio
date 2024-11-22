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
  // onSameUrlNavigation: 'reload', // not working correctly
};

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling({
    // anchorScrolling: 'enabled', // not working correctly
  });

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      routes,
      withRouterConfig(routesConfig),
      inMemoryScrollingFeature,
    ),
  ],
}).catch((err) => console.error(err));
