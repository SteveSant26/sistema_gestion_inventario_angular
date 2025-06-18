import { Routes } from '@angular/router';
import dashboardRoutesConfig from './config/routes-config';
import { DashboardLayout } from './dashboard-layout';
import { isNotLoggedGuard } from '../auth/guards';

export const dashboardRoutes: Routes = [
  {
    path: dashboardRoutesConfig.base.path,
    component: DashboardLayout,
    children: [
      {
        path: dashboardRoutesConfig.children.locations.path, 
        // component: '',
        canActivate: [isNotLoggedGuard],
      },

    ],
  },
];
