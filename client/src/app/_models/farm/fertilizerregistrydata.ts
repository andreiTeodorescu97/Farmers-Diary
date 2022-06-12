import { Parcel } from "./parcel";

export interface IFertilizerRegistry {
    parcelId: Parcel;
    planned: number;
    fetilizerType: string;
    type: string;
    appliedWeightPerHa: number;
    dateApplied: Date;
    observations: string;
    appUserId: number;
    formatedDate: any
  }
  