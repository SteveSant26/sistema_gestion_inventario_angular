import { Routes } from '@angular/router';
import { isLoggedGuard } from '../auth/guards';
import authRoutesConfig from './config/routes-config';
import { LoginPage } from './pages/login/login.page';

export const authRoutes: Routes = [
  {
    path: authRoutesConfig.login.path,
    component: LoginPage,
    canActivate: [isLoggedGuard],


  },
];
