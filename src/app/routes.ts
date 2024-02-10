import { Route } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginPage } from './pages/login/login-page.component';
import { SignupPage } from './pages/signup/signup-page.component';

export const routes: Route[] = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'signup',
    component: SignupPage,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
