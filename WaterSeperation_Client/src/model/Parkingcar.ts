import { Customer } from "./Customer";


export class Parkingcar {
    constructor() {
        this.customer=new Customer()
     }
    id: number;
    parkingID:number;
    carID:number;
    entrancedate:string;
    entrancetime:string;
    exitdate:string;
    exittime:string;
    pelaksection1:string;
    pelaksection2:string;
    pelaksection3:string;
    pelaksection4:string;
    hasCharge:boolean;
    customer:Customer;
    chargeamount:string;
    carNotFount:boolean=false;
    page:number;
    cardNo : string;
    
}