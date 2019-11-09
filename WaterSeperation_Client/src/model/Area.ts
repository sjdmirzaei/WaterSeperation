import { City } from "./City";

export class Area
{
    constructor(){}
    id : string;
    name : string;
    cityId:number;
    city:City=new City()    
}