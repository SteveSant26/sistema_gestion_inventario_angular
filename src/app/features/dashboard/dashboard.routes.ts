import { Routes } from '@angular/router';
import { dashboardRoutesConfig } from './config';
import { DashboardLayout } from './dashboard-layout';
import { isNotLoggedGuard } from '../auth/guards';
import { dashboardRedirectGuard } from './guards';

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
        canActivate: [dashboardRedirectGuard],
        children: [],
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
      {
        path: dashboardRoutesConfig.children.my_assets.path,
        loadComponent: () => import('@features/dashboard/pages/my-assets/my-assets').then(m => m.MyAssets),
      },
    ],
  },
];
