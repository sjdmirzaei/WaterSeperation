import { TransactionType } from "./TransactionType";

export class Transaction {
    constructor() {
    
    }
    id: number;
    title: string;
    value: string;
    transactionType=TransactionType;
    CarCode:string;
    selectitem:boolean;
    checkCode:boolean;
    registerDate:string;
    
}

