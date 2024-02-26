import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { getStoredToken } from '../utils/local-storage/utils';
import { Token } from '../types';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const accessToken = getStoredToken(Token.Access);

  if (accessToken) {
    // User is authenticated, allow navigation
    return true;
  } else {
    // User is not authenticated, redirect to home page
    router.navigate(['/']);
    return false;
  }
};
