import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { SectionHeader } from "@features/dashboard/components/section-header/section-header";
import { AssetCard } from "@features/dashboard/components/asset-card";
import { InventoryAsset } from '@features/dashboard/services/inventory-asset';
import { Category, Location } from '@features/dashboard/services';
import { Auth } from '@features/auth/services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-assets',
  imports: [SectionHeader, AssetCard, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './my-assets.html'
})
export class MyAssets {

  readonly listErrorMessage = signal('');

  private readonly inventoryAssetService = inject(InventoryAsset);
  private readonly categoryService = inject(Category);
  private readonly locationService = inject(Location);
  private readonly authService = inject(Auth);

  // Obtener todos los activos
  private readonly allAssets = computed(() => this.inventoryAssetService.getAll());
  
  // Filtrar solo los activos asignados al usuario actual
  readonly myAssets = computed(() => {
    const userEmail = this.authService.getUserEmail();
    if (!userEmail) return [];
    
    return this.allAssets().filter(asset => {

      const assetEmail = typeof asset.personInChargeEmail === 'string' 
        ? asset.personInChargeEmail 
        : (asset.personInChargeEmail as any)?.email;
      return assetEmail === userEmail;
    });
  });

  // Obtener categorías para mostrar nombres en lugar de IDs
  readonly categories = computed(() => this.categoryService.getAll());
  
  // Obtener ubicaciones para mostrar nombres en lugar de IDs
  readonly locations = computed(() => this.locationService.getAll());



  // Método para obtener el nombre de la categoría
  getCategoryName(categoryId: any): string {
    const category = this.categories().find(cat => 
      cat.id === categoryId || cat.id === String(categoryId) || String(cat.id) === String(categoryId)
    );
    return category?.name || 'Sin categoría';
  }

  // Método para obtener el nombre de la ubicación
  getLocationName(locationId: any): string {
    const location = this.locations().find(loc => 
      loc.id === locationId || loc.id === String(locationId) || String(loc.id) === String(locationId)
    );
    return location?.name || 'Sin ubicación';
  }

  // Método para formatear la fecha
  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('es-ES');
  }
}
