import { Injectable } from '@angular/core';
import { BaseStorageService } from '@shared/services/data-manager';
import { StorageKeys } from '@shared/config';
import { IUser } from '@features/auth/interfaces';

@Injectable({
  providedIn: 'root'
})
export class User extends BaseStorageService<IUser> {

  constructor() {
    super(StorageKeys.USERS);
  }

  deleteByEmail(email: string): boolean {

    const index = this.getDataSignal()().findIndex((user: IUser) => user.email === email);
    if (index !== -1) {
      this.getDataSignal()().splice(index, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  updateByEmail(email: string, updatedUser: IUser): boolean {
    const index = this.getAll().findIndex((user: IUser) => user.email === email);
    if (index !== -1) {
      this.getAll()[index] = updatedUser;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  existsByEmail(email: string): boolean {
    return this.getAll().some((user: IUser) => user.email === email);
  }

}
