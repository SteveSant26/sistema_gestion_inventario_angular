import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import authRoutesConfig from '../../../features/auth/config/routes-config';
import dashboardRoutesConfig from '../../../features/dashboard/config/routes-config';
@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  readonly authRoutesConfig = authRoutesConfig;
  readonly dashboardRoutesConfig = dashboardRoutesConfig;

}
