import { Routes } from '@angular/router';
import { dashboardRoutesConfig } from './config';
import { DashboardLayout } from './dashboard-layout';
import { isNotLoggedGuard } from '../auth/guards';

export const dashboardRoutes: Routes = [
  {
    path: dashboardRoutesConfig.base.path,
    component: DashboardLayout,
    canActivate: [isNotLoggedGuard],
    canActivateChild: [isNotLoggedGuard],

    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: dashboardRoutesConfig.children.locations.path,
      },
      {
        path: dashboardRoutesConfig.children.locations.path,
        loadComponent: () => import('./pages/locations/locations').then(m => m.Locations),
      },
      {
        path: dashboardRoutesConfig.children.categories.path,
        loadComponent: () => import('./pages/categories/categories').then(m => m.Categories),
      },
      {
        path: dashboardRoutesConfig.children.inventory_assets.path,
        loadComponent: () => import('./pages/inventory-assets/inventory-assets').then(m => m.InventoryAssets),

      },
      {
        path: dashboardRoutesConfig.children.users.path,
        loadComponent: () => import('./pages/users/users').then(m => m.Users),
      },
    ],
  },
];
