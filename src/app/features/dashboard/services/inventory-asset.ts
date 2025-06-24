import { Injectable } from '@angular/core';
import { BaseStorageService } from '@shared/services/data-manager';
import { IInventoryAsset } from '../interfaces';
import { StorageKeys } from '@shared/config';

@Injectable({
  providedIn: 'root'
})
export class InventoryAsset extends BaseStorageService<IInventoryAsset> {

  constructor() {
    super(StorageKeys.INVENTORY_ASSETS)
   }

}
