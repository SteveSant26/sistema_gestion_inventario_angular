import { Injectable } from '@angular/core';
import { BaseStorageService } from '@shared/services/data-manager';
import {StorageKeys} from '@shared/config/';
import {ICategory} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class Category extends BaseStorageService<ICategory> {
  constructor() {
    super(StorageKeys.CATEGORIES);
  }

}
