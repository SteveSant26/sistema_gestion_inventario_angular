import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AuthForm } from '../../components/auth-form/auth-form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import IInputField from '@shared/types/input-field.type';
import authRoutesConfig from '@features/auth/config/routes-config';
import { Auth } from '@features/auth/services/auth';
import { NotificationsService } from '@shared/services/notificactions';
import NotificationType from '@shared/types/notification.type';

@Component({
  selector: 'app-login-page',
  imports: [AuthForm],
  template: `
  <app-auth-form [formGroup]="loginForm" 
  [inputFields]="loginFormInputFields"
   btnSubmitLabel="Login" 
   (formSubmit)="login()" [error_message]="errorMessage()"></app-auth-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class LoginPage {
  loginForm!: FormGroup;
  loginFormInputFields!: IInputField[];
  errorMessage = signal('');
  readonly authRoutesConfig = authRoutesConfig;



  private authSevice = inject(Auth);
  private notificationsService = inject(NotificationsService);

  private fb = inject(FormBuilder);
  ngOnInit() {
    this.initLoginForm();
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
      },
      {
        name: 'password',
        label: 'Contraseña',
        type: 'password',
        placeholder: 'Ingresa tu contraseña',
        autocomplete: 'current-password',
        required: true,
      },
    ];
  }

  login() {

    if (!this.loginForm.valid) {
      this.errorMessage.set('Please fill in the form');
      this.notificationsService.showAlert(
        this.errorMessage(),
        NotificationType.AlertError
      );
      return;
    }
    const { email, password } = this.loginForm.value;

    this.authSevice.login(email, password).subscribe({
      next: (data) => {
        this.errorMessage.set('');
        this.notificationsService.showAlert(
          'Login succesful',
          NotificationType.AlertSuccess
        );
      },
      error: (error) => {
        console.log(error);
        this.errorMessage.set(error.message || 'Login failed');
        this.notificationsService.showAlert(
          this.errorMessage(),
          NotificationType.AlertError
        );
      },
    });
  }
}
