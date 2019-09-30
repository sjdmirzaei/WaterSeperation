import { Customer } from "./Customer";
import { Car } from "./Car";


export class ListParkingcar {
    constructor() {
        this.customer=new Customer(),
        this.car=new Car()
     }
    id: number;
    parkingID:number;
    entrancedate:string;
    entrancetime:string;
    exitdate:string;
    exittime:string;
    customer:Customer;
    car:Car;
    
}