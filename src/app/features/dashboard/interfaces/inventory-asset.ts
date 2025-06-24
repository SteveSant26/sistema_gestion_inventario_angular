
import { IUser } from "@features/auth/interfaces";
import { ICategory } from "./category";
import { ILocation } from "./location";

export interface IInventoryAsset {
    id: string;
    name: string;
    description: string;
    categoryId: ICategory;
    locationId: ILocation;
    personInChargeEmail: IUser;
    status: string; 
    arrivalDate: string;
    quantity: number;

}
