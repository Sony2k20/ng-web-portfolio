import { bootstrapApplication } from '@angular/platform-browser'
import { AppComponent } from './app/app.component'
import {
  InMemoryScrollingFeature,
  provideRouter,
  RouterConfigOptions,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router'
import { routes } from './app/app.routes'
import { provideZoneChangeDetection } from '@angular/core'

const routesConfig: RouterConfigOptions = {
  // onSameUrlNavigation: 'reload', // not working correctly
}

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling({
    // anchorScrolling: 'enabled', // not working correctly
  })

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),
    provideRouter(
      routes,
      withRouterConfig(routesConfig),
      inMemoryScrollingFeature,
    ),
  ],
}).catch((err) => console.error(err))
