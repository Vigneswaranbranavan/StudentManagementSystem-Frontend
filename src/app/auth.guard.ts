import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './Service/Auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true; // Allow access if the user is authenticated
  }

  // Redirect to login page if not authenticated
  router.navigate(['/login'], {
    queryParams: { returnUrl: state.url }, // Optional: Save the return URL
  });
  return false;
};