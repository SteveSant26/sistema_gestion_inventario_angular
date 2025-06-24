import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { authRoutesConfig } from '@features/auth/config/';
import { Auth } from '@features/auth/services';

@Component({
  selector: 'app-auth-button',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <div id="auth-actions" class="flex items-center gap-4 text-xl ">
        @if (isLogged()){
          <span class="text-white text-sm lg:text-xl">{{ userEmail ? userEmail : 'Guest' }}</span>
            <button class="bg-transparent border-none text-white p-5 cursor-pointer hover:underline text-sm lg:text-xl text-wrap" (click)="logOut()">Log out</button>
        }
        @else {
        <a [routerLink]="authRoutesConfig.login.url" class="text-white px-5 py-5 hover:underline text-sm lg:text-xl text-wrap">Log in</a>
        }
    </div>`,

})
export class AuthButton {

  readonly authRoutesConfig = authRoutesConfig;

  private authService = inject(Auth);
  private router = inject(Router);

  get isLogged() {
    return this.authService.isAuthenticated();
  }

  get userEmail() {
    return this.authService.getUser()?.email || '';
  }

  logOut() {
    this.authService.logout();
    this.router.navigate([this.authRoutesConfig.login.url]);
  }

}
