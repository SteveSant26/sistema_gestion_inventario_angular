import { Routes } from '@angular/router';
import { dashboardRoutes } from '@features/dashboard/dashboard.routes';
import { authRoutes } from '@features/auth/auth.routes';
import { NotFound } from '@shared/layouts/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  ...authRoutes,
  ...dashboardRoutes,

  { path: '**', component: NotFound },
];
