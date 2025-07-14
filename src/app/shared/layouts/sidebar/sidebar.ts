import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { RolesEnum } from '@features/auth/config';
import { Auth } from '@features/auth/services';


import { dashboardRoutesConfig } from '@features/dashboard/config/';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class Sidebar {
  private router = inject(Router);
  private authService = inject(Auth);



  readonly dashboardRoutesConfig = dashboardRoutesConfig;
  dashboardChildRoutes = Object.values(this.dashboardRoutesConfig.children);


  goTo(path: string) {
    this.router.navigateByUrl(path);
  }

  get currentRoute(): string {
    return this.router.url;
  }

  get role(): string {
    return this.authService.getRole() || '';
  }

  get dashboardRoutesByRole(): { url: string; label: string }[] {
    return this.dashboardChildRoutes
      .filter(route => {
        // Solo admins pueden ver usuarios
        if (route.path === 'users' && this.role !== RolesEnum.ADMIN) {
          return false;
        }
        
        // Solo trabajadores pueden ver sus activos asignados
        if (route.path === 'my_assets' && this.role !== RolesEnum.WORKER) {
          return false;
        }
        
        // Los trabajadores no pueden ver la administración general de activos
        if (route.path === 'inventory_assets' && this.role === RolesEnum.WORKER) {
          return false;
        }
        
        // Los trabajadores no pueden administrar ubicaciones ni categorías
        if ((route.path === 'locations' || route.path === 'categories') && this.role === RolesEnum.WORKER) {
          return false;
        }
        
        return true;
      })
      .map(route => ({
        url: route.url,
        label: route.label
      }));
  }
}
