import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  RouterModule,
  provideRouter,
  withHashLocation,
  withViewTransitions,
} from '@angular/router';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { authInterceptor } from './services/interceptors/auth.interceptor';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';


const config: SocketIoConfig = { url: 'wss://api-geotracker.v-max.site/ws', options: {} };

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withHashLocation(),
      withViewTransitions({
        onViewTransitionCreated() {},
      })
    ),
    importProvidersFrom(
      HttpClientModule,
      BrowserModule,
      RouterModule,
      BrowserAnimationsModule,
      SocketIoModule.forRoot(config)
    ),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
