import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AuthForm } from '../../components/auth-form/auth-form';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IInputField } from '@shared/types';
import { authRoutesConfig } from '@features/auth/config';
import { Auth } from '@features/auth/services';
import { Router } from '@angular/router';
import { dashboardRoutesConfig } from '@features/dashboard/config';
import { User } from '@features/dashboard/services';

@Component({
  selector: 'app-login-page',
  imports: [AuthForm],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <app-auth-form [formGroup]="loginForm" 
  [inputFields]="loginFormInputFields"
   btnSubmitLabel="Login" 
   (formSubmit)="login()" [error_message]="errorMessage()"></app-auth-form>
  `,

})
export class LoginPage {
  loginForm!: FormGroup;
  loginFormInputFields!: IInputField[];
  errorMessage = signal('');

  readonly dashboardRoutesConfig = dashboardRoutesConfig;
  readonly authRoutesConfig = authRoutesConfig;



  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(Auth);
  private readonly userService = inject(User);
  

  ngOnInit() {
    this.initLoginForm();
    this.userService.loadJson('/json/users.json')

  }
  private initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.loginFormInputFields = [
      {
        name: 'email',
        label: 'Correo electrónico',
        type: 'text',
        placeholder: 'Correo electrónico',
        autocomplete: 'email',
        required: true,
        control: this.loginForm.get('email') as FormControl,
      },
      {
        name: 'password',
        label: 'Contraseña',
        type: 'password',
        placeholder: 'Ingresa tu contraseña',
        autocomplete: 'current-password',
        required: true,
        control: this.loginForm.get('password') as FormControl,
      },
    ];
  }

  login() {

    if (!this.loginForm.valid) {
      this.errorMessage.set('Por favor, rellena el formulario');
      this.loginForm.markAllAsTouched();

      return;
    }
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (data) => {
        this.errorMessage.set('');
        this.router.navigate([this.dashboardRoutesConfig.base.url]);

      },
      error: (error) => {
        this.errorMessage.set(error.message || 'Login fallido');

      },
    });
  }
}
