import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryAssetStates } from '@features/dashboard/enums/inventory-asset-states';
import { IInventoryAsset } from '@features/dashboard/interfaces';


@Component({
    selector: 'app-asset-card',
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './asset-card.html'
})
export class AssetCard {
    asset = input.required<IInventoryAsset>();
    categoryName = input.required<string>();
    locationName = input.required<string>();

    // Método para formatear la fecha
    formatDate(dateString: string): string {
        return new Date(dateString).toLocaleDateString('es-ES');
    }

    // Método para obtener la clase CSS según el estado
    getStatusClass(status: string): string {
        switch (status.toLowerCase()) {
            case InventoryAssetStates.AVAILABLE:
                return 'bg-green-100 text-green-800 border border-green-200';
            case InventoryAssetStates.IN_USE:
                return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
            case InventoryAssetStates.IN_MAINTENANCE:
                return 'bg-red-background-own text-secondary-btn-own border border-secondary-btn-own';
            default:
                return 'bg-hightlight text-secondary-btn-own border border-secondary-btn-own';
        }
    }
}
