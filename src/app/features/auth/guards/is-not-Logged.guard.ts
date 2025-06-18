import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import authRoutesConfig from '../../auth/config/routes-config';

export const isNotLoggedGuard: CanActivateFn = (route, state) => {
  const userService = inject(Auth)
  const router = inject(Router)
  const isAuthenticated = userService.isAuthenticated();

  if (!isAuthenticated()) {
    router.navigate([authRoutesConfig.login.url])
    return false
  }

  return true;
};
