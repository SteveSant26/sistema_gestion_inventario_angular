import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import {dashboardRoutesConfig} from '../../dashboard/config';



export const isLoggedGuard: CanActivateFn = (route, state) => {
  const userService = inject(Auth);
  const router = inject(Router);
  const isAuthenticated = userService.isAuthenticated();

  console.log('Is authenticated: ',isAuthenticated());
  if (isAuthenticated()) {
    router.navigate([dashboardRoutesConfig.base.url]);
    return false;
  }

  return true;
};