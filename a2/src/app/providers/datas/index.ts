import {Field} from "./field";

export class Index extends Field{
    
    fields: Array<Field> = [];    
    method:string = "btree";

    constructor(args){
        super(args);
    }
}