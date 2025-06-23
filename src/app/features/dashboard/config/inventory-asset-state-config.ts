import {InventoryAssetStates} from "../enums/inventory-asset-states";

export const InventoryAssetStatesConfig = {
    [InventoryAssetStates.AVAILABLE]: {
        label: 'Disponible',
        color: 'green',
    },
    [InventoryAssetStates.RESERVED]: {
        label: 'Reservado',
        color: 'blue',
    },
    [InventoryAssetStates.IN_TRANSIT]: {
        label: 'En tránsito',
        color: 'orange',
    },
    [InventoryAssetStates.LOST]: {
        label: 'Perdido',
        color: 'gray',
    },
    [InventoryAssetStates.DAMAGED]: {
        label: 'Dañado',
        color: 'red',
    },
};
