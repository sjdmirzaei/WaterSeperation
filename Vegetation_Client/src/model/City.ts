import { Region } from "./Region";

export class City
{
    constructor(){}
    id : string;
    name : string; 
    regionId:number;  
    region: Region = new Region(); 
}