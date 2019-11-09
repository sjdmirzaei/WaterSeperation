import { Area } from "./Area";
import { Storage } from "./Storage";
import { Zone } from "./Zone";


export class Street {
    constructor() {
        this.area=new Area();
        this.storage=new Storage();
        this.zones = new Array<Zone>();
    }
    id: string;
    name: string;
    area:Area;
    storage:Storage;
    zones : Array<Zone>;

   

}