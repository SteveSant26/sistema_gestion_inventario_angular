import { Routes } from '@angular/router';
import { dashboardRoutes } from '@features/dashboard/dashboard.routes';
import { authRoutes } from '@features/auth/auth.routes';

export const routes: Routes = [
  ...authRoutes,
  // ...dashboardRoutes,

//   { path: '**', component: NotFoundPage },
];
