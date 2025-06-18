import { Injectable, Signal, signal, computed, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Data } from '@shared/services/data';
import User from '../models/user';
import RolesEnum from '../config/roles-enum';

const LOCAL_STORAGE_USER_KEY = 'user';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  // Signals
  private userSignal = signal<User | null>(this.getStoredUser());
  private isAuthenticatedSignal = computed(() => !!this.userSignal());

  private dataService = inject(Data);

  constructor() {
    console.log('[Auth] Usuario cargado:', this.userSignal());
  }

  /**
   * Inicia sesión validando las credenciales con los usuarios del JSON local.
   */
  login(email: string, password: string): Observable<User> {
    const usersJsonPath = 'assets/users.json';

    return this.dataService.getLocalJson(usersJsonPath).pipe(
      map((users: User[]) => {
        const user = users.find(
          (u) => u.email === email && u.password === password
        );

        if (!user) {
          throw new Error('Correo o contraseña incorrectos');
        }

        this.userSignal.set(user);
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
        return user;
      }),
      catchError((err) => {
        const message = err instanceof Error ? err.message : 'Error de autenticación';
        return throwError(() => new Error(message));
      })
    );
  }

  /**
   * Cierra sesión y limpia los datos del usuario.
   */
  logout(): void {
    this.userSignal.set(null);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  }

  /**
   * Devuelve el usuario autenticado actual.
   */
  getUser(): User | null {
    return this.userSignal();
  }

  /**
   * Devuelve una Signal booleana que indica si hay sesión activa.
   */
  isAuthenticated(): Signal<boolean> {
    return this.isAuthenticatedSignal;
  }

  /**
   * Devuelve el rol del usuario actual o null.
   */
  getRole(): RolesEnum | null {
    return this.userSignal()?.role ?? null;
  }

  /**
   * Verifica si el usuario autenticado es administrador.
   */
  isAdmin(): boolean {
    return this.getRole() === RolesEnum.ADMIN;
  }

  /**
   * Lee el usuario almacenado en localStorage (si existe).
   */
  private getStoredUser(): User | null {
    const userData = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    try {
      return userData ? JSON.parse(userData) : null;
    } catch (e) {
      console.warn('[Auth] Error al parsear el usuario almacenado', e);
      return null;
    }
  }
}
