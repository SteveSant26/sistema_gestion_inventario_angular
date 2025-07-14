import { Injectable, Signal, signal, computed, inject } from '@angular/core';
import { Observable, catchError, map, throwError, of } from 'rxjs';
import { Data } from '@shared/services/data';
import { IUser } from '../interfaces';
import { RolesEnum } from '../config';
import { User } from '@features/dashboard/services';

const LOCAL_STORAGE_USER_KEY = 'user';

@Injectable({ providedIn: 'root' })
export class Auth {
  private userServices = inject(User);

  private userSignal = signal<IUser | null>(this.getStoredUser());
  private isAuthenticatedSignal = computed(() => !!this.userSignal());

  constructor() {
    console.log('[Auth] Usuario cargado:', this.userSignal());
  }

  login(email: string, password: string): Observable<IUser> {
    return of(this.userServices.getAll()).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) throw new Error('Correo o contraseña incorrectos');
        this.userSignal.set(user);
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
        return user;
      }),
      catchError(err => {
        const message = err instanceof Error ? err.message : 'Error de autenticación';
        return throwError(() => new Error(message));
      })
    );
  }

  logout(): void {
    this.userSignal.set(null);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  }

  getUser(): IUser | null {
    return this.userSignal();
  }

  isAuthenticated(): Signal<boolean> {
    return this.isAuthenticatedSignal;
  }

  getRole(): RolesEnum | null {
    return this.userSignal()?.role ?? null;
  }

  isAdmin(): boolean {
    return this.getRole() === RolesEnum.ADMIN;
  }

  getUserEmail(): string | null {
    return this.userSignal()?.email ?? null;
  }

  private getStoredUser(): IUser | null {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.warn('[Auth] Error al parsear usuario almacenado', e);
      return null;
    }
  }
}
