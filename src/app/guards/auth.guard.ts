import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { getStoredToken } from '../utils/local-storage/utils';
import { Token } from '../types';
import { AuthService } from '../services/auth/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const accessToken = getStoredToken(Token.Access);

  if (accessToken) {
    return true;
  } else {
    // User is not authenticated, logout the user
    authService.logout();
    return false;
  }
};
