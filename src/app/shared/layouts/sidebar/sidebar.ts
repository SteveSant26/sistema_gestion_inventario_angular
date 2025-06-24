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

  get dashboardRoutes(): { url: string; label: string }[] {
    return this.dashboardChildRoutes
      .filter(route => {
        if (route.path === 'users' && this.role !== RolesEnum.ADMIN) {
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
