import { Street } from "./Street";




export class Zone {
    constructor() {
      this.street=new Street();
    }
    id: string;
    name: string;
    street:Street;
    parkinglocation:string;
   

}