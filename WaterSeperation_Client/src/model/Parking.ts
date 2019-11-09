
import { ActivityScope } from "./ActivityScope";
import { ParkingUsageType } from "./ParkingUsageType";
import { ParkingType } from "./ParkingType";
import { ParkingOwner } from "./ParkingOwner";

export class Parking {
    constructor() { }
    id: number;
    name: string;
    phone: string;
    address: string;
    capacity: number;
    cartcount: number;
    ParkingOwnerId: number;
    ParkingTypeId: number;
    ParkingUsageTypeId: number;
    ActivityScopeId: number;
    owner: ParkingOwner = new ParkingOwner();
    type: ParkingType = new ParkingType();
    usageType: ParkingUsageType = new ParkingUsageType();
    scope: ActivityScope = new ActivityScope();
}