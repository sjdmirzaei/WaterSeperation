import { TarrifCondition } from "./TarrifCondition";
import { TarrifConditionMargin } from "./TarrifConditionMargin";



export class Tarrif {
    constructor() { }
    id: number;
    name: string;
    parkingKind:number;
    RegisterFromDate:string;
    RegisterFromTime:string;
    RegisterToDate:string;
    RegisterToTime:string;
    fromTime:string;
    toTime:string;
    fixCost:number;
    intervalTime:number;
    percent:number;
}
    