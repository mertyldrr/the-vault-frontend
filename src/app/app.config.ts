import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './routes';
import { ThemeService } from './theme/theme.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), ThemeService],
};
