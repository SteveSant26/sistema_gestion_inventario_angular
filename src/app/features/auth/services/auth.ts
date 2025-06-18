import { Injectable, Signal, signal, computed } from '@angular/core';
import User from '../models/user';
import RolesEnum from '../config/roles-enum';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private userSignal = signal<User | null>(this.getStoredUser());
  private isAuthenticatedSignal = computed(() => !!this.userSignal());

  constructor() {
    console.log('[Auth] Usuario cargado:', this.userSignal());
  }

  login(email: string, password: string): Observable<{ success: boolean, user: User }> {
    return from(
      fetch('/assets/users.json')
        .then(res => res.json())
        .then((users: User[]) => {
          const foundUser = users.find(u => u.email === email && u.password === password);

          if (foundUser) {
            this.userSignal.set(foundUser);
            localStorage.setItem('user', JSON.stringify(foundUser));
            return { success: true, user: foundUser };
          } else {
            throw new Error('Correo o contraseña incorrectos');
          }
        })
    );
  }

  logout(): void {
    this.userSignal.set(null);
    localStorage.removeItem('user');
  }

  getUser(): User | null {
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

  // Helpers
  private getStoredUser(): User | null {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
}
