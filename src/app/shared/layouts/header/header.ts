import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';


import { AuthButton } from "./auth-button/auth-button";
import dashboardRoutesConfig from '@features/dashboard/config/routes-config';
@Component({
  selector: 'app-header',
  imports: [RouterLink, AuthButton],
  templateUrl: './header.html',
})
export class Header {
  readonly dashboardRoutesConfig = dashboardRoutesConfig;





}
