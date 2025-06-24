import { Injectable } from '@angular/core';
import { BaseStorageService } from '@shared/services/data-manager';
import { ILocation } from '../interfaces';
import { StorageKeys } from '@shared/config';

@Injectable({
  providedIn: 'root'
})
export class Location extends BaseStorageService<ILocation > {

  constructor() { 
    super(StorageKeys.LOCATIONS);
  }
}
