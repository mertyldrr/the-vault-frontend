import { Route } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';

export const routes: Route[] = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
