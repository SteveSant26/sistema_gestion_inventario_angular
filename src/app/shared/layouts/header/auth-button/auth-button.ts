import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import authRoutesConfig from '@features/auth/config/routes-config';
import { Auth } from '@features/auth/services/auth';

@Component({
  selector: 'app-auth-button',
  imports: [RouterLink],
  templateUrl: './auth-button.html'
})
export class AuthButton {

  readonly authRoutesConfig = authRoutesConfig;

  private authService = inject(Auth);

  get isLogged() {
    return this.authService.isAuthenticated();
  }

  logOut(){
    this.authService.logout();
    console.log('Log out');
  }

}
