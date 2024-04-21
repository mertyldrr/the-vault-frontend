import { Route } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginPage } from './pages/login/login-page.component';
import { SignupPage } from './pages/signup/signup-page.component';
import { CreatePostPage } from './pages/create-post/create-post-page.component';
import { AuthGuard } from './guards/auth.guard';
import { MyPostsPage } from './pages/my-posts/my-posts-page.component';
import { BlogPostPageComponent } from './pages/blog-post/blog-post-page.component';

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
    path: 'create-post',
    component: CreatePostPage,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-posts',
    component: MyPostsPage,
    canActivate: [AuthGuard],
  },
  {
    path: 'post/:id',
    component: BlogPostPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
