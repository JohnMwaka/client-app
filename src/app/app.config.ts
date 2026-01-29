import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth, LogLevel } from 'angular-auth-oidc-client';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAuth({
      config: {
        authority: 'http://10.6.0.138:9000', // Your Spring Boot Auth Server
        redirectUrl: window.location.origin + '/callback',
        postLogoutRedirectUri: window.location.origin + "/",
        clientId: 'automation-client',
        scope: 'openid profile email offline_access', // offline_access is for refresh tokens
        responseType: 'code', // Standard for PKCE
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Debug,
      },
    }),
  ]
};
