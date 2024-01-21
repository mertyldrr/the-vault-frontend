import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { getStoredToken, storeToken } from '../local-storage/utils';
import { Token } from '../../types';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the auth token from local storage
    const accessToken = getStoredToken(Token.Access);

    // Clone the request and set the new header in one step
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${accessToken}` },
    });

    // Intercept the response to handle token refresh and errors
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('Received 401 error, attempting to refresh token.');
          // Token expired or invalid, attempt to refresh
          return this.refreshTokenAndRetry(authReq, next);
        } else if (error.status === 403) {
          // Handle 403 (Forbidden) errors, possibly due to token issues or unauthorized access
          console.error('Received 403 error. Logging out.');
          this.authService.logout();
          // Propagate the error to be handled by the application
          return throwError(() => error);
        }

        // For other errors, pass them along to be handled by the application
        return throwError(() => error);
      })
    );
  }

  private refreshTokenAndRetry(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const refreshToken = getStoredToken(Token.Refresh);

    if (!refreshToken) {
      // Handle the case where there is no refresh token, possibly redirect to log in
      return throwError(() => 'No refresh token available');
    }

    // Call your token refresh endpoint to get a new access token
    return this.authService.refreshToken(refreshToken).pipe(
      switchMap(({ accessToken }) => {
        // Update the stored access token
        storeToken(Token.Access, accessToken);

        // Retry the original request with the new access token
        const authReqWithNewToken = req.clone({
          setHeaders: { Authorization: `Bearer ${accessToken}` },
        });

        return next.handle(authReqWithNewToken);
      }),
      catchError(refreshError => {
        // Handle refresh error, possibly redirect to log in
        console.error('Error refreshing token:', refreshError);
        this.authService.logout();
        return throwError(() => refreshError);
      })
    );
  }
}
