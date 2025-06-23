import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';


import { AuthButton } from "./auth-button/auth-button";
import { dashboardRoutesConfig } from '@features/dashboard/config';
@Component({
  selector: 'app-header',
  imports: [RouterLink, AuthButton],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class Header {
  readonly dashboardRoutesConfig = dashboardRoutesConfig;





}
