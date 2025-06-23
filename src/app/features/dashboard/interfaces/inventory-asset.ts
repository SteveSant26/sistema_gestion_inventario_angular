
import { User } from "@features/auth/interfaces";
import { ICategory } from "./category";
import { ILocation } from "./location";

export interface IInventoryAsset {
    id: string;
    name: string;
    category: ICategory;
    location: ILocation;
    personInCharge: User;
    status: string;
    arrivalDate: string;
    quantity: number;

}
