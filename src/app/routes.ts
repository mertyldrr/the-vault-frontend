import { Route } from '@angular/router';
import { HomePage } from './pages/homepage/homepage.component';
import { LoginPage } from './pages/login/login-page.component';
import { SignupPage } from './pages/signup/signup-page.component';
import { CreatePostPage } from './pages/create-post/create-post-page.component';
import { AuthGuard } from './guards/auth.guard';
import { BlogPostPage } from './pages/blog-post/blog-post-page.component';
import { MyPostsPage } from './pages/my-posts/my-posts-page.component';
import { BlogPostAccessGuard } from './guards/blog-post-access.guard';
import { EditBlogPostPage } from './pages/edit-blog-post/edit-blog-post-page.component';

export const routes: Route[] = [
  {
    path: '',
    component: HomePage,
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
    path: 'post/:id/edit',
    component: EditBlogPostPage,
    canActivate: [AuthGuard, BlogPostAccessGuard],
  },
  {
    path: 'post/:id',
    component: BlogPostPage,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
