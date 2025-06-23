import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';


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



  readonly dashboardRoutesConfig = dashboardRoutesConfig;
  dashboardChildRoutes = Object.values(this.dashboardRoutesConfig.children);


  goTo(path: string) {
    this.router.navigateByUrl(path);
  }

  get currentRoute(): string {
    return this.router.url;
  }


}
