import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';


import { dashboardRoutesConfig } from '@features/dashboard/config';
import { Button } from "@shared/components/button/button";

@Component({
  selector: 'app-not-found',
  imports: [Button],
  templateUrl: './not-found.html',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class NotFound {
  constructor(private router: Router) { }
  readonly dashboardRoutesConfig = dashboardRoutesConfig;


  goHome() {
    this.router.navigate([this.dashboardRoutesConfig.base.url]);
  }

}
