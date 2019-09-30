
export class resizable
{
    constructor(){}
    beforeStart : boolean;
    afterEnd : boolean;    
}

export class AssignShift {
    constructor() { }
    
    id: number;
    title: string;
    StartTime : string;
    EndTime: string;
    starthour : number;
    startminute : number;
    endhour : number;
    endminute : number;
    startDelay : string ;
    region: resizable = new resizable(); 
    parkbanId : number;
    policeId : number;
    studentId: number;
}