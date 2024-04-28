import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { BlogPostService } from '../services/blog-post/blog-post.service';
import { map, switchMap } from 'rxjs';

export const BlogPostAccessGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const blogPostService = inject(BlogPostService);
  const userService = inject(UserService);
  const postId = route.paramMap.get('id');
  if (!postId) {
    return router.createUrlTree(['/']);
  }
  return blogPostService.getBlogPostById(+postId).pipe(
    switchMap(blogPost => {
      return userService.getCurrentUser().pipe(
        map(currentUser => {
          if (blogPost.userId === currentUser?.id) {
            return true;
          } else {
            router.navigate(['/']);
            return false;
          }
        })
      );
    })
  );
};
