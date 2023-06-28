export interface StockInfo {

    name : string;
    id : number;
    price : number;
    count : number;
    path ?: string;
    isIncr ?:boolean;
    description?: string;
}

