import { Subsystem } from "./Subsystem";

export class Menu
{
    constructor(){
        this.subsystem = new Subsystem();   
       
    }
    id : string;
    name : string;
    icon : string;
    title : string;
    url : string;        
    subsystem : Subsystem;
    parentmenuid: string;
   
}