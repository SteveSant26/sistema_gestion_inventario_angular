import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@features/auth/services';
import { RolesEnum } from '@features/auth/config';

export const dashboardRedirectGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);
  
  const userRole = authService.getRole();
  
  // Redirigir según el rol del usuario
  switch (userRole) {
    case RolesEnum.WORKER:
      return router.parseUrl('/dashboard/my_assets');
    case RolesEnum.ADMIN:
    case RolesEnum.AUDITOR:
    default:
      return router.parseUrl('/dashboard/locations');
  }
};
